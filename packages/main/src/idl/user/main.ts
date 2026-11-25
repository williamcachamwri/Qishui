// src/idl/user/main.ts
// @ts-nocheck
import { mergeRequestData } from "../_common";
import "./contract/evaluation";
import { UpdatePrivacySettingRequestToRequestData } from "./contract/me";
import "./contract/resource";
import "./contract/school";

async function UpdateMyPrivacySetting(caller, req, context) {
    const requestData = mergeRequestData([
      UpdatePrivacySettingRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "UpdateMyPrivacySetting",
      paths: [{ method: "POST", path: `/luna/user/me/privacy/setting` }, { method: "POST", path: `/luna/pc/user/me/privacy/setting` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

export {
  UpdateMyPrivacySetting
};
