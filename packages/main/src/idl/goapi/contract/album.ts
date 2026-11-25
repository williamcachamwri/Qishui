// src/idl/goapi/contract/album.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function GetAlbumDetailRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, ["album_id"]),
      query: fieldsAssign(data, ["ignore_tracks"]),
      body: fieldsAssign(data, [])
    };
  }

export {
  GetAlbumDetailRequestToRequestData
};
