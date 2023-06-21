import { Slider } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { Message, TabInfo } from '../../scheme';
import browser from 'webextension-polyfill';
import { getBucket } from '@extend-chrome/storage';

const getActiveTabId = async () => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (tabs.length > 0) {
    const tab = tabs[0];
    if (tab.id) {
      return tab.id;
    } else {
      throw new Error('Tab id is undefined');
    }
  } else {
    throw new Error('No active tab');
  }
};

export const VolumeSlider: FC = () => {
  const [volume, setVolume] = useState(100);
  const [enabled, setEnabled] = useState(false);

  // * Get volume on active tab
  useEffect(() => {
    getActiveTabId().then((tabId) => {
      const message: Message = { type: 'LOAD_VOLUME', tabId };
      browser.runtime.sendMessage(message).then(() => {
        const bucket = getBucket<TabInfo>(tabId.toString());
        bucket
          .get({
            initialVolume: -1,
            volume: 100,
          })
          .then((tabInfo) => {
            if (tabInfo.initialVolume != -1) {
              setVolume(tabInfo.volume);
              setEnabled(true);
            }
          });
      });
    });
  }, []);

  // * Send volume changes to background script
  useEffect(() => {
    if (!enabled) return;
    getActiveTabId().then((tabId) => {
      const message: Message = { type: 'SET_VOLUME', tabId, volume };
      browser.runtime.sendMessage(message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  return (
    <>
      <Slider
        marks={[
          { value: 50, label: '50%' },
          { value: 100, label: '100%' },
          { value: 150, label: '150%' },
        ]}
        value={volume}
        min={0}
        max={200}
        onChange={setVolume}
        disabled={!enabled}
        w="100%"
      />
    </>
  );
};
