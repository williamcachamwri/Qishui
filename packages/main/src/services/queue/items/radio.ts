// src/services/queue/items/radio.ts
// @ts-nocheck
import { UnlimitedQueueItem } from "../queueItemUnlimited";
import { protocolOf } from "../../index";
import "../../serviceId";
import { playablesFromMediaResourceLikes } from "../playable/convert";
import "../type";

class RadioQueueItem extends UnlimitedQueueItem {
        constructor(params) {
          super();
          this.params = params;
        }
        async fetch() {
          const radio_id = this.params.radioInnerBlockData?.resources?.[0]?.resource_id ?? "";
          const { search } = new URL(this.params.radioInnerBlockData?.resources?.[0]?.style?.link ?? "");
          const searchParams = new URLSearchParams(search);
          const data = await protocolOf("request" /* request */).request("FeedRadioTracks", {
            radio_id,
            cursor: this.state.value.pagination.cursor ?? "",
            flow_type: +(searchParams.get("flow_type") ?? "2"),
            trigger_info: searchParams.get("trigger_info") ?? ""
          });
          const playables = playablesFromMediaResourceLikes(data.items);
          await this.updateCollectInfo(playables, data.status_info?.now);
          return {
            playables,
            hasMore: true,
            cursor: data.next_cursor ?? null,
            requestId: data.status_info?.log_id
          };
        }
        createInitializeCustomState() {
          return {};
        }
        getTitle() {
          return this.params.radioInnerBlockData?.resources?.[0]?.style?.title ?? "\u7535\u53F0";
        }
        getKey() {
          return `radio_${this.params.radioInnerBlockData?.resources?.[0]?.resource_id ?? ""}`;
        }
        getMetaInfo() {
          const id = this.params.radioInnerBlockData?.resources?.[0]?.resource_id ?? "";
          return {
            type: "radio" /* radio */,
            id,
            scene: "sceneMode" /* sceneMode */,
            etParams: {
              scene_name: "discovery_radio",
              from_group_type: "radio",
              from_group_id: id
            }
          };
        }
      }

export {
  RadioQueueItem
};
