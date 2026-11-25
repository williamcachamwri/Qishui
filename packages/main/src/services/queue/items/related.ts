// src/services/queue/items/related.ts
// @ts-nocheck
import { UnlimitedQueueItem } from "../queueItemUnlimited";
import { protocolOf } from "../../index";
import "../../serviceId";
import { playablesFromMediaResourceLikes } from "../playable/convert";
import "../type";

class RelatedQueueItem extends UnlimitedQueueItem {
        constructor(params) {
          super();
          this.params = params;
        }
        isFirst = true;
        async fetch() {
          const data = await protocolOf("request" /* request */).request("GetRelatedMedia", {
            media_list: [
              {
                id: this.params.playable.id,
                type: "track"
              }
            ],
            scene_name: "search",
            played_media: await this.getMediaPlayed(),
            artist_ids: this.params.playable.artists?.map((a2) => a2.id ?? "").filter((t2) => t2) ?? [],
            feed_related_media_extra: {
              search_click_time: this.params.extraParams.searchItemClickTime
            },
            search_query: this.params.extraParams.searchQuery,
            search_related_info: this.params.extraParams.searchRelatedInfo
          });
          const playables = playablesFromMediaResourceLikes(data.items);
          if (this.isFirst) {
            playables.unshift(this.params.playable);
            this.isFirst = false;
          }
          await this.updateCollectInfo(playables, data.status_info?.now);
          return {
            playables,
            hasMore: true,
            cursor: null,
            requestId: data.status_info?.log_id
          };
        }
        createInitializeCustomState() {
          return {};
        }
        getTitle() {
          return "\u641C\u7D22\u63A8\u8350";
        }
        getKey() {
          return `related_${this.params.playable.id}`;
        }
        getMetaInfo() {
          return {
            type: "related" /* related */,
            id: this.params.playable.id,
            etParams: {
              queue_type: "search_one_track",
              from_group_type: "track",
              from_group_id: this.params.playable.id
            }
          };
        }
      }

export {
  RelatedQueueItem
};
