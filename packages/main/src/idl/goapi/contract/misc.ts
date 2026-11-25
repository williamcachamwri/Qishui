// src/idl/goapi/contract/misc.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function LaunchRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, [])
    };
  }

function ReportActionsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["actions", "report_action_extra"])
    };
  }

export {
  LaunchRequestToRequestData,
  ReportActionsRequestToRequestData
};
