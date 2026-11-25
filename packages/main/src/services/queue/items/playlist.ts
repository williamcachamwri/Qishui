// src/services/queue/items/playlist.ts
// @ts-nocheck
import { protocolOf } from "../../index";
import { playablesFromMediaResourceLikes } from "../playable/convert";
import "../../serviceId";
import { LimitedQueueItem } from "../queueItemLimited";
import "../type";

class PlaylistQueueItem extends LimitedQueueItem {
        constructor(params) {
          super();
          this.params = params;
        }
        createInitializeCustomState() {
          return {};
        }
        async fetch({ isFirst }) {
          if (isFirst && this.params.response) {
            return await this.handleResponse(this.params.response);
          } else {
            const data = await protocolOf("request" /* request */).request(
              "GetPlaylistDetail",
              // @ts-expect-error
              {
                playlist_id: this.params.playlist.id ?? "",
                cursor: this.state.value.pagination.cursor ?? "",
                count: 50
              }
            );
            return await this.handleResponse(data);
          }
        }
        async handleResponse(response) {
          const playables = playablesFromMediaResourceLikes(response.media_resources);
          await this.updateCollectInfo(playables, response.status_info?.now);
          return {
            playables,
            hasMore: response.has_more ?? false,
            cursor: response.next_cursor ?? null,
            requestId: response.status_info?.log_id
          };
        }
        getTitle() {
          return this.params.playlist.title ?? "\u6B4C\u5355";
        }
        getKey() {
          return `playlist_${this.params.playlist.id}`;
        }
        // protected getQueueCacheStrategy(): QueueCacheStrategy | null {
        //   return null
        //   // if (this.playlist === 'favorite') {
        //   //   return {
        //   //     key: 'favorite',
        //   //     expireType: QueueCacheExpireType.never,
        //   //   }
        //   // } else {
        //   //   return null
        //   // }
        // }
        getMetaInfo() {
          const isOwned = this.manager?.userState.value.info?.my_info.id === this.params.playlist.owner?.id;
          return {
            type: "playlist" /* playlist */,
            id: this.params.playlist.id ?? "",
            scene: this.params?.scene ?? "unknown" /* unknown */,
            etParams: {
              queue_type: isOwned ? {
                1: "favorite_track_playlist",
                4: "douyin_favorite_track_playlist"
              }[this.params.playlist.type] ?? "self_playlist" : "other_playlist",
              from_group_type: "playlist",
              from_group_id: this.params.playlist.id
            }
          };
        }
      }

export {
  PlaylistQueueItem
};
