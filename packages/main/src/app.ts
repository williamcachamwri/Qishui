// src/app.ts
// @ts-nocheck
import { __require, __toESM, require_bdms } from "../../vendor/index";
import "./services/initializerMainProcess";
import { serviceInitializer } from "./services/singleton";
import { protocolOf, serviceOf } from "./services/index";
import "./services/serviceId";
import "./services/window/type";
import { bdticketHandleResponse, getBdticketSignedHeaders, initBdticket } from "./libs/bdticket/index";
import { setupBdticketSettingsUpdater } from "./libs/bdticket/updater";
import { handleOfflineCacheRequest } from "./utils/offlineCache";
import { collectPerf } from "./utils/perf";
import { interceptBeforeSendHeaders, interceptCompleted, interceptHeadersReceived, sendHttpRequest } from "./utils/request";
import { matchesOfflineCache } from "./utils/offlineCacheRules";

let import_electron34: any = __require("electron");

let bdms6: any = __toESM(require_bdms());

class AppInstance {
        async start() {
          collectPerf("init_0");
          await serviceInitializer.initialize();
          import_electron34.protocol.handle("https", async (req) => {
            const url2 = new URL(req.url);
            if (matchesOfflineCache(url2.toString())) {
              return handleOfflineCacheRequest(req);
            }
            if (url2.searchParams.has("_rid")) {
              return protocolOf("playerProxy" /* playerProxy */).handleRequest(req);
            }
            return sendHttpRequest(req);
          });
          collectPerf("init_1");
          await import_electron34.app.whenReady();
          collectPerf("init_2");
          import_electron34.TTChromiumNetwork.startHttpDns({
            host: "dig.bdurl.net",
            blockList: "dig.bdurl.net##dns.google.com",
            allowList: "",
            fallbackList: ".*"
          });
          initBdticket();
          setupBdticketSettingsUpdater();
          interceptBeforeSendHeaders(async (params) => {
            const headers = { ...params.requestHeaders };
            delete headers.origin;
            delete headers.referer;
            if (params.url.includes("qishui.com") && !params.url.includes("/passport/") && !params.url.includes("/ttwid/")) {
              headers["user-agent"] = [`LunaPC/${"3.7.0"}(${"452316191"})`];
              const headerLines = [];
              for (const [key, values] of Object.entries(headers)) {
                for (const value of values) {
                  headerLines.push(`${key}\r
${value}`);
                }
              }
              const signatureData = bdms6.generateHttpSignatureHeaders(params.url, headerLines.join("\r\n")).split("\r\n").filter((t2) => t2.trim());
              for (let i2 = 0; i2 < signatureData.length / 2; i2++) {
                headers[signatureData[i2 * 2]] = [signatureData[i2 * 2 + 1]];
              }
            }
            const flatHeaders = {};
            for (const [key, values] of Object.entries(headers)) {
              flatHeaders[key] = values[0] ?? "";
            }
            const bdticketSignedHeaders = await getBdticketSignedHeaders({
              cookies: import_electron34.session.defaultSession.cookies,
              url: params.url,
              headers: flatHeaders,
              id: params.id
            });
            if (bdticketSignedHeaders) {
              for (const [key, value] of Object.entries(bdticketSignedHeaders)) {
                headers[key] = [value];
              }
            }
            return headers;
          });
          interceptCompleted((params) => {
            bdticketHandleResponse({
              id: params.id,
              url: params.url,
              responseHeaders: params.responseHeaders ?? {}
            });
          });
          let lastAbroadType = "";
          interceptHeadersReceived(({ responseHeaders }) => {
            const abroadType = responseHeaders["luna-abroad-type"]?.[0];
            if (!abroadType || abroadType === lastAbroadType) return;
            if (abroadType !== "0" && abroadType !== "1" && abroadType !== "2") return;
            lastAbroadType = abroadType;
            protocolOf("sharedState" /* sharedState */).update("region", { abroadType });
          });
          const windowService = serviceOf("window" /* window */);
          collectPerf("init_3");
          await protocolOf("internalCheck" /* internalCheck */).showSSOLogin();
          windowService.showOrCreate("main" /* main */);
          import_electron34.app.on("activate", () => {
            windowService.showOrCreate("main" /* main */);
          });
          collectPerf("init_4");
        }
      }

export {
  AppInstance
};
