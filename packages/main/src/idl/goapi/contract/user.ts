// src/idl/goapi/contract/user.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function GetFollowListRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, ["user_id"]),
      query: fieldsAssign(data, ["cursor", "count", "scene"]),
      body: fieldsAssign(data, [])
    };
  }

function GetUserInfoRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, ["user_id"]),
      query: fieldsAssign(data, ["user_id", "sec_uid"]),
      body: fieldsAssign(data, [])
    };
  }

function GetUserMixedCollectionsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["user_id", "item_types", "cursor", "count", "sec_uid"]),
      body: fieldsAssign(data, [])
    };
  }

function GetUserPlaylistsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["user_id", "cursor", "count", "sec_uid", "scene"]),
      body: fieldsAssign(data, ["user_id", "cursor", "count", "sec_uid", "ab_param", "scene"])
    };
  }

export {
  GetFollowListRequestToRequestData,
  GetUserInfoRequestToRequestData,
  GetUserMixedCollectionsRequestToRequestData,
  GetUserPlaylistsRequestToRequestData
};
