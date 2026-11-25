// src/services/queue/items/feedmode.ts
// @ts-nocheck
import { protocolOf } from "../../index";
import { playableFromTrack, playableFromVideo } from "../playable/convert";
import "../../serviceId";
import { UnlimitedQueueItem } from "../queueItemUnlimited";
import "../type";

class FeedModeQueueItem extends UnlimitedQueueItem {
        constructor(params) {
          super();
          this.params = params;
        }
        async fetch({ isFirst, fetchCounter }) {
          const { scene_mode_id = -1, sub_queue_type = "" } = this.params?.feedMode?.entity?.feed_scene_mode ?? {};
          const data = await protocolOf("request" /* request */).request("FeedSongTab", {
            played_media: await this.getMediaPlayed(),
            is_first_request: isFirst,
            is_did_first_request: false,
            feed_preference: scene_mode_id === -1 ? { preference_mode: sub_queue_type } : { scene_mode_id },
            feed_counts: {
              mix_session_count: fetchCounter
            }
          });
          const playables = [];
          for (const item of data.items ?? []) {
            if (item.type === "track" && item.entity?.track_wrapper?.track) {
              playables.push(playableFromTrack(item.entity.track_wrapper.track));
            }
            if (item.type === "video_track_mix" && item.entity?.video) {
              playables.push(playableFromVideo(item.entity.video));
            }
          }
          await this.updateCollectInfo(playables, data.status_info?.now);
          const limitedFreeInfos = {};
          for (const item of data.items ?? []) {
            if (item.entity?.track_wrapper?.limited_free_info && item.entity.track_wrapper.track) {
              const playable = playableFromTrack(item.entity.track_wrapper.track);
              limitedFreeInfos[playable.key] = item.entity.track_wrapper.limited_free_info;
            }
          }
          return {
            playables,
            hasMore: true,
            cursor: null,
            requestId: data.status_info?.log_id,
            limitedFreeInfos
          };
        }
        createInitializeCustomState() {
          return {};
        }
        getTitle() {
          return this.params.feedMode?.text ?? "";
        }
        getKey() {
          return `feedMode_${this.params.feedMode?.entity?.feed_scene_mode?.sub_queue_type ?? ""}`;
        }
        async getQueueCacheStrategy() {
          const userInfoState = await protocolOf("user" /* user */).getUserInfoState();
          return {
            key: `${userInfoState ? `u_${userInfoState.my_info.id}` : "guest"}:feedMode:${this.getKey()}`,
            expireType: 1 /* day */,
            preventLoad: true
          };
        }
        getMetaInfo() {
          return {
            type: "feedMode" /* feedMode */,
            id: this.params?.feedMode?.entity?.feed_scene_mode?.sub_queue_type ?? "",
            scene: "sceneMode" /* sceneMode */,
            etParams: {
              scene_name: "scene_mode",
              from_group_type: "scene_mode",
              from_group_id: "",
              sub_queue_type: this.params?.feedMode?.entity?.feed_scene_mode?.sub_queue_type ?? ""
            }
          };
        }
        isMain() {
          return false;
        }
        initialEtParams() {
          return {
            scene_name: "scene_mode"
          };
        }
      }

export {
  FeedModeQueueItem
};
