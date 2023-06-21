export type Message =
  | {
      type: 'SET_VOLUME' | 'SEND_VOLUME';
      tabId: number;
      volume: number;
    }
  | {
      type: 'LOAD_VOLUME';
      tabId: number;
    };

export type TabInfo = {
  initialVolume: number; // 0-1
  volume: number; // 0-100
};
