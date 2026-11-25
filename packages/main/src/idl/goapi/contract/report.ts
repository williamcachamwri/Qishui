// src/idl/goapi/contract/report.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function GetReportReasonRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["report_type"]),
      body: fieldsAssign(data, [])
    };
  }

function ReportRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["content_id", "report_type", "report_reason_code", "description", "image_uris"])
    };
  }

export {
  GetReportReasonRequestToRequestData,
  ReportRequestToRequestData
};
