// src/libs/bdticket/index.ts
// @ts-nocheck
import { __require, __toESM, require_bdticket_pc, require_set_cookie } from "../../../../vendor/index";
import { logger } from "../../utils/logger";
import { getClientCert } from "./utils";
import { DEFAULT_SETTINGS } from "./config";
import "../../services/serviceId";
import { protocolOf } from "../../services/index";

async function initBdticket() {
    logger.info("bdticketSwitch", (b2) => b2.text("start checking bdticket switch without using cache"));
    const bdticketSwitch = await protocolOf("appSettings" /* appSettings */).getSetting("bdticket_switch");
    if (bdticketSwitch?.enable_bdticket === false) {
      logger.info("bdticketSwitch", (b2) => b2.text("bdticket switch is disabled"));
      return;
    }
    logger.info("bdticketSwitch", (b2) => b2.text("bdticket switch is enabled"));
    const bdticketModule = require_bdticket_pc();
    bdticketModule.init();
    bdticket = bdticketModule;
    logger.info("bdticketSwitch", (b2) => b2.text("bdticket is initialized"));
    bdticket.on("log_debug", (message) => {
      logger.info("bdticket", (b2) => b2.bold("debug").text(message));
    }).on("log_info", (message) => {
      logger.info("bdticket", (b2) => b2.bold("info").text(message));
    }).on("log_error", (message) => {
      logger.warn("bdticket", (b2) => b2.bold("error").text(message));
    }).on("track", async (data) => {
      const { protocolOf: protocolOf2 } = await import("../../services/index");
      logger.info("bdticket", (b2) => b2.bold("track").text(JSON.stringify(data)));
      protocolOf2("applog" /* applog */).report(
        {
          event: data.event_name,
          params: data.params
        }
      );
    }).on("pc_request_cert", (data, callback) => {
      console.log("[bdticket] pc_request_cert callback", data);
      getClientCert(data, callback);
    });
    bdticket.refreshSettings(DEFAULT_SETTINGS);
    bdticket.startBDTicket(import_electron33.app.getPath("userData"));
  }

async function getBdticketSignedHeaders(v2) {
    if (!bdticket) {
      return {};
    }
    const urlObj = new URL(v2.url);
    const { host, pathname } = urlObj;
    const cookies = await v2.cookies.get({ domain: ".qishui.com" });
    const sessionID = cookies.find((c2) => c2.name === "sessionid")?.value || "";
    const sessionSS = cookies.find((c2) => c2.name === "sessionid_ss")?.value || "";
    try {
      const result = bdticket.handleRequest(host, pathname, v2.headers, sessionID, sessionSS);
      requestInfoMap.set(v2.id, {
        headers: v2.headers,
        sessionID,
        sessionSS,
        associated: result.associated || {}
      });
      return result.headers;
    } catch (error) {
      logger.warn("bdticket", (b2) => b2.text("Failed to sign request with bdticket").bold(String(error)));
    }
  }

function bdticketHandleResponse(args) {
    if (!bdticket) {
      return;
    }
    const { id, url: url2, responseHeaders = {} } = args;
    const urlObj = new URL(url2);
    const { host, pathname } = urlObj;
    let responseSessionId = "";
    if (responseHeaders["set-cookie"]) {
      const cookies = (0, import_set_cookie_parser.parse)(responseHeaders["set-cookie"], {
        map: true
      });
      responseSessionId = cookies["sessionid"]?.value ?? "";
    }
    const requestInfo = requestInfoMap.get(id);
    if (requestInfo) {
      const { headers: requestHeaders, sessionID: requestSessionId, sessionSS: requestSessionSS, associated: associatedValues } = requestInfo;
      try {
        bdticket.handleResponse(host, pathname, responseHeaders, responseSessionId, requestHeaders, requestSessionId, requestSessionSS, associatedValues);
      } catch (error) {
        logger.warn("bdticket", (b2) => b2.text("Failed to handle response with bdticket").bold(String(error)));
      }
      requestInfoMap.delete(args.id);
    }
  }

function updateBdticketSettings(settings) {
    if (!bdticket) {
      return;
    }
    bdticket.refreshSettings(settings);
  }

let import_electron33: any = __require("electron");

let import_set_cookie_parser: any = __toESM(require_set_cookie());

let bdticket: any = null;

let requestInfoMap: any = new Map();

export {
  updateBdticketSettings,
  initBdticket,
  getBdticketSignedHeaders,
  bdticketHandleResponse
};
