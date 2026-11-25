// src/idl/goapi/contract/share.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function GetShareInfoRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["item_type", "item_id", "open_anchor_info", "extra", "scene"]),
      body: fieldsAssign(data, [])
    };
  }

function ShareCountRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["items", "share_platform"])
    };
  }

export {
  GetShareInfoRequestToRequestData,
  ShareCountRequestToRequestData
};
