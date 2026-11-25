// src/utils/slardar/transports/electronFetch.ts
// @ts-nocheck
import { __require } from "../../../../../vendor/index";
import { fetch2 } from "../../request";

var import_electron2 = __require("electron");

var request = async (method, options) => {
    const { url: url2, data, success, fail, getResponseText, withCredentials } = options;
    try {
      let userAgent = "";
      try {
        import_electron2.session.defaultSession.getUserAgent();
      } catch {
      }
      const response = await fetch2(url2, {
        method,
        body: data,
        credentials: withCredentials ? "include" : "omit",
        headers: {
          "User-Agent": userAgent,
          "Content-Type": "application/json"
        }
      });
      if (response.status >= 400) {
        throw new Error(await response.text());
      }
      const text = await response.text();
      if (text) {
        success?.(JSON.parse(text));
      } else {
        success?.({});
      }
    } catch (e) {
      console.error(e);
      fail?.(e);
    }
  };

var electronFetchTransport = {
    get(options) {
      request("GET", options);
    },
    post(options) {
      request("POST", options);
    }
  };

export {
  electronFetchTransport
};
