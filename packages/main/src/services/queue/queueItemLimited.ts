// src/services/queue/queueItemLimited.ts
// @ts-nocheck
import { QueueItem } from "./queueItem";
import "./type";

class LimitedQueueItem extends QueueItem {
        supportPlayOrder = [0 /* listLoop */, 1 /* singleLoop */, 2 /* shuffle */];
        getNextTrackId(switchType, state = this.state.value) {
          const playableKeysWithSelf = state.playables.currentKeys.filter((t2) => this.checkPlayableSwitchable(t2, switchType) || t2 === state.currentPlayable.key);
          const nextTrackIndex = playableKeysWithSelf.findIndex((key) => key === state.currentPlayable.key) + 1;
          const nextTrackKey = playableKeysWithSelf[nextTrackIndex];
          if (nextTrackKey) {
            return nextTrackKey;
          } else if (state.pagination.hasMore) {
            return null;
          } else if (playableKeysWithSelf[0] !== state.currentPlayable.key) {
            return playableKeysWithSelf[0];
          } else {
            return null;
          }
        }
        getPreviousTrackId(switchType, state = this.state.value) {
          const playableKeysWithSelf = state.playables.currentKeys.filter((t2) => this.checkPlayableSwitchable(t2, switchType) || t2 === state.currentPlayable.key);
          const previousTrackIndex = playableKeysWithSelf.findIndex((key) => key === state.currentPlayable.key) - 1;
          const previousTrackKey = playableKeysWithSelf[previousTrackIndex];
          if (previousTrackKey) {
            return previousTrackKey;
          } else if (playableKeysWithSelf[playableKeysWithSelf.length - 1] !== state.currentPlayable.key) {
            return playableKeysWithSelf[playableKeysWithSelf.length - 1];
          } else {
            return null;
          }
        }
        preserveCurrentTrackWhenSwitch() {
          return false;
        }
      }

export {
  LimitedQueueItem
};
