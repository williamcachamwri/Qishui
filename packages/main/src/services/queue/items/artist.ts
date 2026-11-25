// src/services/queue/items/artist.ts
// @ts-nocheck
import { protocolOf } from "../../index";
import { playableFromTrack, playableFromVideo } from "../playable/convert";
import "../../serviceId";
import { LimitedQueueItem } from "../queueItemLimited";
import "../type";

class ArtistQueueItem extends LimitedQueueItem {
        constructor(params) {
          super();
          this.params = params;
        }
        createInitializeCustomState() {
          return {};
        }
        async fetch({ isFirst }) {
          if (isFirst && this.params.artistDetailResponse) {
            return await this.handleDetailResponse(this.params.artistDetailResponse);
          } else if (isFirst && this.params.artistTracksResponse) {
            return await this.handleListTracksResponse(this.params.artistTracksResponse);
          } else {
            const data = await protocolOf("request" /* request */).request(
              "ListArtistTracks",
              {
                artist_id: this.params.artist.id ?? "",
                cursor: this.state.value.pagination.cursor ?? "",
                count: "50",
                sort_type: 0
              }
            );
            return await this.handleListTracksResponse(data);
          }
        }
        async handleDetailResponse(response) {
          const mvs = response.hot_mvs ?? [];
          const tracks = response.hot_tracks ?? [];
          const playables = [
            ...mvs.map((video) => playableFromVideo(video)),
            ...tracks.map((track) => playableFromTrack(track))
          ];
          await this.updateCollectInfo(playables, response.status_info?.now);
          return {
            playables,
            hasMore: true,
            cursor: String((response.hot_tracks?.length ?? 0) + (response.hot_mvs?.length ?? 0)) ?? null,
            loadNextImmediately: true,
            requestId: response.status_info?.log_id
          };
        }
        async handleListTracksResponse(response) {
          const playables = [
            ...response.tracks?.map((track) => playableFromTrack(track)) ?? [],
            ...response.mvs?.map((video) => playableFromVideo(video)) ?? []
          ];
          await this.updateCollectInfo(playables, response.status_info?.now);
          return {
            playables,
            hasMore: response.has_more ?? false,
            cursor: response.next_cursor ?? null,
            requestId: response.status_info?.log_id
          };
        }
        getTitle() {
          return this.params.artist.name ?? "\u97F3\u4E50\u4EBA";
        }
        getKey() {
          return `artist_${this.params.artist.id}`;
        }
        getMetaInfo() {
          return {
            type: "artist" /* artist */,
            id: this.params.artist.id ?? "",
            etParams: {
              queue_type: "artist",
              from_group_type: "artist",
              from_group_id: this.params.artist.id
            }
          };
        }
      }

export {
  ArtistQueueItem
};
