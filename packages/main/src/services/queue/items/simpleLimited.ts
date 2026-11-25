// src/services/queue/items/simpleLimited.ts
// @ts-nocheck
import { LimitedQueueItem } from "../queueItemLimited";
import "../type";

class SimpleLimietedQueueItem extends LimitedQueueItem {
        constructor(params) {
          super();
          this.params = params;
        }
        createInitializeCustomState() {
          return {};
        }
        async fetch() {
          return {
            playables: this.params.playables,
            hasMore: false,
            cursor: null,
            requestId: this.params.requestId
          };
        }
        getTitle() {
          return this.params.title;
        }
        getKey() {
          return `simpleLimited_${this.params.key}`;
        }
        getMetaInfo() {
          return {
            type: "simpleLimited" /* simpleLimited */,
            id: this.params.key,
            etParams: this.params.etParams
          };
        }
        async reportRecentlyPlayed(key) {
          if (!this.params.noReportRecentlyPlayed) {
            super.reportRecentlyPlayed(key);
          }
        }
      }

export {
  SimpleLimietedQueueItem
};
