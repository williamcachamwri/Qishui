// src/idl/user/contract/me.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function UpdatePrivacySettingRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["follow_info_visibility", "sync_video_to_luna", "my_favorite_visibility", "music_wall_visibility"])
    };
  }

export {
  UpdatePrivacySettingRequestToRequestData
};
