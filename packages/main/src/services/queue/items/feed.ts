// src/services/queue/items/feed.ts
// @ts-nocheck
import { protocolOf } from "../../index";
import { playableFromTrack, playableFromVideo } from "../playable/convert";
import "../../serviceId";
import { UnlimitedQueueItem } from "../queueItemUnlimited";
import "../type";
import { onEachDay } from "../../../utils/cron";
import "../../storage/type";

class FeedQueueItem extends UnlimitedQueueItem {
        constructor(params) {
          super("feed", params.playReason, params.preservePlayableInfo);
          this.params = params;
          onEachDay(() => {
            this.refresh();
          }, {
            randomSeconds: 3600
          });
        }
        async fetch({ isFirst, fetchCounter }) {
          let time = await protocolOf("storage" /* storage */).get("Status" /* status */, "did_first_use_time");
          let isDeviceFirst = false;
          if (!time) {
            isDeviceFirst = true;
            time = Math.floor(Date.now() / 1e3);
            await protocolOf("storage" /* storage */).set("Status" /* status */, "did_first_use_time", time);
          }
          const data = await protocolOf("request" /* request */).request("FeedSongTab", {
            played_media: await this.getMediaPlayed(),
            did_first_use_time: time,
            is_first_request: isFirst,
            is_did_first_request: isDeviceFirst,
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
          if (isFirst && this.params.preserveCurrentPlayable) {
            playables.unshift(this.params.preserveCurrentPlayable);
          }
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
          return "\u63A8\u8350";
        }
        getKey() {
          return "feed";
        }
        async getQueueCacheStrategy() {
          const userInfoState = await protocolOf("user" /* user */).getUserInfoState();
          const abParams = await protocolOf("appSettings" /* appSettings */).getSetting("luna_pc_common_server_params");
          return {
            key: `${userInfoState ? `u_${userInfoState.my_info.id}` : "guest"}:feed`,
            expireType: abParams?.queue?.feed_no_expire ? 0 /* never */ : 1 /* day */,
            preventLoad: true
          };
        }
        getMetaInfo() {
          return {
            type: "feed" /* feed */,
            id: "",
            etParams: {
              page: "track_reco",
              scene_name: "track_reco",
              queue_type: "daily_mix",
              from_group_type: "",
              from_group_id: ""
            }
          };
        }
        isMain() {
          return true;
        }
        initialEtParams() {
          return {
            scene_name: "track_reco"
          };
        }
      }

export {
  FeedQueueItem
};
