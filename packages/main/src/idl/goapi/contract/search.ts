// src/idl/goapi/contract/search.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function SearchRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, ["search_type"]),
      query: fieldsAssign(data, ["q", "cursor", "search_id", "search_method", "debug_params", "from_search_id", "search_scene", "scene_name", "transit"]),
      body: fieldsAssign(data, ["q", "cursor", "search_id", "search_method", "debug_params", "from_search_id", "search_scene", "ab_param", "last_viewed_media", "scene_name", "transit", "limited_free_scene"])
    };
  }

function SugRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["q", "sug_scene", "sug_search_id"]),
      body: fieldsAssign(data, [])
    };
  }

export {
  SearchRequestToRequestData,
  SugRequestToRequestData
};
