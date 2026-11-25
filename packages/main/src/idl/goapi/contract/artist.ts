// src/idl/goapi/contract/artist.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function GetArtistDetailRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, ["artist_id"]),
      query: fieldsAssign(data, ["user_id", "locate_item_id"]),
      body: fieldsAssign(data, [])
    };
  }

function ListArtistAlbumsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, ["artist_id"]),
      query: fieldsAssign(data, ["cursor", "count"]),
      body: fieldsAssign(data, [])
    };
  }

function ListArtistTracksRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, ["artist_id"]),
      query: fieldsAssign(data, ["cursor", "count", "sort_type"]),
      body: fieldsAssign(data, ["cursor", "count", "sort_type", "passthrough"])
    };
  }

export {
  GetArtistDetailRequestToRequestData,
  ListArtistAlbumsRequestToRequestData,
  ListArtistTracksRequestToRequestData
};
