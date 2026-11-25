// src/idl/commerce_membership/main.ts
// @ts-nocheck
import { fieldsAssign, mergeRequestData } from "../_common";

async function GetCommerceConfig(caller, req, context) {
    const requestData = mergeRequestData([
      GetCommerceConfigRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetCommerceConfig",
      paths: [{ method: "POST", path: `/luna/commerce/v2/commerce_config` }, { method: "POST", path: `/luna/pc/commerce/v2/commerce_config` }, { method: "POST", path: `/luna/h5/commerce/v2/commerce_config` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetCommerceInfo(caller, req, context) {
    const requestData = mergeRequestData([
      GetCommerceInfoRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetCommerceInfo",
      paths: [{ method: "POST", path: `/luna/commerce/v2/commerce_info` }, { method: "POST", path: `/luna/pc/commerce/v2/commerce_info` }, { method: "POST", path: `/luna/h5/commerce/v2/commerce_info` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetOffersTokensForPC(caller, req, context) {
    const requestData = mergeRequestData([
      GetOffersTokensForPCRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetOffersTokensForPC",
      paths: [{ method: "POST", path: `/luna/pc/commerce/v2/offers/tokens` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetOffersTokensStatusForPC(caller, req, context) {
    const requestData = mergeRequestData([
      GetOffersTokensStatusForPCRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetOffersTokensStatusForPC",
      paths: [{ method: "POST", path: `/luna/pc/commerce/v2/offers/tokens/status` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetUpsell(caller, req, context) {
    const requestData = mergeRequestData([
      GetUpsellRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetUpsell",
      paths: [{ method: "GET", path: `/luna/commerce/v2/upsell` }, { method: "GET", path: `/luna/pc/commerce/v2/upsell` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

function GetCommerceConfigRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, [])
    };
  }

function GetCommerceInfoRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["includes"])
    };
  }

function GetOffersTokensForPCRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["offer_snapshot_id", "report_param"])
    };
  }

function GetOffersTokensStatusForPCRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["token"])
    };
  }

function GetUpsellRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, [])
    };
  }

export {
  GetCommerceInfo,
  GetOffersTokensForPC,
  GetOffersTokensStatusForPC,
  GetUpsell,
  GetCommerceConfig
};
