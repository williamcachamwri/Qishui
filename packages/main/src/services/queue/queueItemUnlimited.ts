// src/services/queue/queueItemUnlimited.ts
// @ts-nocheck
import { protocolOf } from "../index";
import "../serviceId";
import "./type";
import { QueueItem } from "./queueItem";
import { mediaIdToPlayableKey } from "./playable/convert";

class UnlimitedQueueItem extends QueueItem {
        supportPlayOrder = [0 /* listLoop */, 1 /* singleLoop */];
        getNextTrackId(switchType, state = this.state.value) {
          const playableKeysWithSelf = state.playables.currentKeys.filter((t2) => this.checkPlayableSwitchable(t2, switchType) || t2 === state.currentPlayable.key);
          const nextTrackIndex = playableKeysWithSelf.findIndex((key) => key === state.currentPlayable.key) + 1;
          return playableKeysWithSelf[nextTrackIndex];
        }
        getPreviousTrackId(switchType, state = this.state.value) {
          const playableKeysWithSelf = state.playables.currentKeys.filter((t2) => this.checkPlayableSwitchable(t2, switchType) || t2 === state.currentPlayable.key);
          const previousTrackIndex = playableKeysWithSelf.findIndex((key) => key === state.currentPlayable.key) - 1;
          return playableKeysWithSelf[previousTrackIndex];
        }
        async getMediaPlayed() {
          const MAX_COUNT = 30;
          const state = this.state.value;
          const currentPlayableKey = state.currentPlayable.key;
          const currentPlayableKeys = state.playables.currentKeys;
          if (!currentPlayableKey) {
            return [];
          }
          const records = await protocolOf("player" /* player */).getPlayRecords();
          const currentTrackIndex = currentPlayableKeys.indexOf(currentPlayableKey);
          const unplayed = currentTrackIndex >= 0 ? currentPlayableKeys.slice(currentTrackIndex + 1).reverse().filter((key) => !!state.playables.byKey[key]).map((key) => ({
            type: state.playables.byKey[key].media_type,
            duration: state.playables.byKey[key].duration,
            media_id: state.playables.byKey[key].id,
            played_mills: -1
          })) : [];
          const played = records.slice().reverse().map((r2) => {
            const playableKey = mediaIdToPlayableKey(r2.mediaType, r2.mediaId);
            const playable = state.playables.byKey[playableKey];
            return {
              type: r2.mediaType,
              duration: playable?.duration ?? Math.floor(r2.durationMs / 1e3),
              media_id: r2.mediaId,
              played_mills: r2.playTimeMs
            };
          });
          const remain = Math.max(0, MAX_COUNT - unplayed.length);
          return remain > 0 ? [...unplayed, ...played.slice(0, remain)] : unplayed.slice(0, MAX_COUNT);
        }
        preserveCurrentTrackWhenSwitch() {
          return true;
        }
      }

export {
  UnlimitedQueueItem
};
