// src/idl/goapi/contract/dislike.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function DislikeRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["item_id", "author_ids", "dislike_item_type", "action_type"])
    };
  }

export {
  DislikeRequestToRequestData
};
