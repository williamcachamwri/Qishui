// src/idl/commerce/main.ts
// @ts-nocheck
import { fieldsAssign, mergeRequestData } from "../_common";

async function GetMySubscription(caller, req, context) {
    const requestData = mergeRequestData([
      GetMySubscriptionRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetMySubscription",
      paths: [{ method: "GET", path: `/luna/commerce/me/subscription` }, { method: "GET", path: `/luna/pc/commerce/me/subscription` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetPurchaseOfferToken(caller, req, context) {
    const requestData = mergeRequestData([
      GetPurchaseOfferTokenRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetPurchaseOfferToken",
      paths: [{ method: "POST", path: `/luna/pc/commerce/offers/tokens` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function QueryTokenStatus(caller, req, context) {
    const requestData = mergeRequestData([
      QueryTokenStatusRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "QueryTokenStatus",
      paths: [{ method: "GET", path: `/luna/pc/commerce/offers/tokens/status` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

function GetMySubscriptionRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["redeem_token", "first_req"]),
      body: fieldsAssign(data, [])
    };
  }

function GetPurchaseOfferTokenRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["offer_id", "report_param"])
    };
  }

function QueryTokenStatusRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["token"]),
      body: fieldsAssign(data, [])
    };
  }

export {
  GetMySubscription,
  GetPurchaseOfferToken,
  QueryTokenStatus
};
