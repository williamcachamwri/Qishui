// src/services/queue/items/album.ts
// @ts-nocheck
import { protocolOf } from "../../index";
import { playableFromTrack } from "../playable/convert";
import "../../serviceId";
import { LimitedQueueItem } from "../queueItemLimited";
import "../type";

class AlbumQueueItem extends LimitedQueueItem {
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
              "GetAlbumDetail",
              {
                album_id: this.params.album.id ?? "",
                ignore_tracks: false
              }
            );
            return await this.handleResponse(data);
          }
        }
        async handleResponse(response) {
          const tracks = response.tracks ?? [];
          const playables = tracks.map((track) => playableFromTrack(track));
          await this.updateCollectInfo(playables, response.status_info?.now);
          return {
            playables,
            hasMore: false,
            cursor: null,
            requestId: response.status_info?.log_id
          };
        }
        getTitle() {
          return this.params.album.name;
        }
        getKey() {
          return `album_${this.params.album.id}`;
        }
        getMetaInfo() {
          return {
            type: "album" /* album */,
            id: this.params.album.id,
            etParams: {
              queue_type: "album",
              from_group_type: "album",
              from_group_id: this.params.album.id
            }
          };
        }
      }

export {
  AlbumQueueItem
};
