/* eslint-disable no-case-declarations */
import browser from 'webextension-polyfill';
import { Message, TabInfo } from '../app/scheme';
import { getBucket } from '@extend-chrome/storage';

// show welcome page on new install
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    //show the welcome page
    const url = browser.runtime.getURL('welcome/welcome.html');
    await browser.tabs.create({ url });
  }
});

// Handle messages from popup
browser.runtime.onMessage.addListener(async (message: Message, sender, sendResponse) => {
  try {
    const bucket = getBucket<TabInfo>(message.tabId.toString());
    const tabInfo = await getTabInfoSafely(message.tabId);

    switch (message.type) {
      case 'LOAD_VOLUME':
        console.info('LOAD_VOLUME', message);
        bucket.set(tabInfo);
        console.info('tabInfo', tabInfo);
        break;
      case 'SET_VOLUME':
        console.info('SET_VOLUME', message);
        setVolume(message, tabInfo);
        bucket.set((prev) => ({
          ...prev,
          volume: message.volume,
        }));
        break;
      default:
        throw new Error('Unknown message type');
    }
  } catch (e) {
    console.warn(e);
  }
});

// Cleanup tabs
browser.tabs.onRemoved.addListener((tabId) => {
  const bucket = getBucket<TabInfo>(tabId.toString());
  bucket.clear();
});

const getTabInfoSafely = async (tabId: number): Promise<TabInfo> => {
  const bucket = getBucket<TabInfo>(tabId.toString());
  const initialVolume = await getInitialVolume(tabId);
  if (!initialVolume) {
    throw new Error('This tab has no media elements');
  }
  const tabInfo = await bucket.get({
    initialVolume,
    volume: 100,
  });
  return tabInfo;
};

/*
 * Set the volume of all media elements in the tab.
 */
const setVolume = async (message: Message, tabInfo: TabInfo) => {
  if (tabInfo && message.type === 'SET_VOLUME') {
    const toSetVolume = tabInfo.initialVolume * (message.volume / 100);
    console.info('setVolume to ', toSetVolume, ' from ', tabInfo.initialVolume);
    await browser.scripting.executeScript({
      target: { tabId: message.tabId },
      func: ({ toSetVolume }) => {
        const mediaElements: HTMLMediaElement[] = Array.from(
          document.querySelectorAll('video, audio')
        );
        mediaElements.forEach((media) => {
          media.volume = toSetVolume;
        });
      },
      args: [{ toSetVolume }],
    });
  }
};

/*
 * Get the initial volume of the first media element in the tab.
 */
const getInitialVolume = async (tabId: number): Promise<number | null> => {
  const injectionResult = await browser.scripting.executeScript({
    target: { tabId },
    func: () => {
      const media: HTMLMediaElement | null =
        document.querySelector('video') ?? document.querySelector('audio');
      if (!media) {
        return null;
      }
      return media.volume;
    },
  });
  return injectionResult[0].result as number | null;
};
