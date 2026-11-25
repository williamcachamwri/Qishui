// src/services/serverPush/serverPush.ts
// @ts-nocheck
import { __require, __toESM, require_fws } from "../../../../vendor/index";
import { Service, ServiceProtocol } from "../base";
import { getGlobalConfig } from "../../base/globalConfig/value";
import { protocolOf } from "../index";
import "../serviceId";
import { logger } from "../../utils/logger";

let import_node_crypto5: any = __require("node:crypto");

let import_frontier_web_sdk: any = __toESM(require_fws());

let import_ws: any = __toESM(__require("ws"));

class ServerPushService extends Service {
        fws;
        async initialize() {
          await this.setupPush();
          protocolOf("user" /* user */).onSessionChanged(() => {
            this.setupPush();
          });
        }
        async setupPush() {
          if (this.fws) {
            logger.info("frontier", (b2) => b2.text("close previous fws"));
            this.fws.close();
            delete this.fws;
          }
          const sessionId = await protocolOf("user" /* user */).getSessionId();
          logger.info("frontier", (b2) => b2.text("initializing with session id").text(sessionId ?? ""));
          const appKey = "617cf554b0b990d92661d4f50b4b5d89";
          const salt = "f8a69f1719916z";
          const fpID = "835";
          const deviceID = getGlobalConfig().deviceId;
          this.fws = new import_frontier_web_sdk.FWS({
            fpID,
            aID: String(386088),
            accessKey: (0, import_node_crypto5.createHash)("md5").update(`${fpID}${appKey}${deviceID}${salt}`).digest("hex"),
            deviceID,
            url: "ws://frontier100-normal.zijieapi.com",
            customParams: {
              sid: sessionId ?? "",
              version_code: "30070000"
            },
            ws: import_ws.default,
            maxRetries: Number.POSITIVE_INFINITY
          });
          this.fws.addEventListener("open", () => {
            logger.info("frontier", (b2) => b2.text("opened"));
          });
          this.fws.addEventListener("message", (e) => {
            if (false) {
              protocolOf("renderer" /* renderer */).showToast({
                message: "\u63A5\u53D7\u5230\u63A8\u9001\u4FE1\u606F"
              });
            }
            if (!e.message.payload) {
              logger.info("frontier", (b2) => b2.text("message without payload received"));
              return;
            }
            const data = Buffer.from(e.message.payload).toString();
            logger.info("frontier", (b2) => b2.text("message received").text(data));
            const content = JSON.parse(data);
            switch (content.message_type) {
              case "subscribe_vip":
              case "play_entitlement": {
                protocolOf("commerce" /* commerce */).refreshCommerceInfo("server-push");
                break;
              }
            }
          });
          this.fws.addEventListener("error", (e) => {
            logger.error("frontier", e);
          });
          this.fws.addEventListener("close", () => {
            logger.info("frontier", (b2) => b2.text("closed"));
            delete this.fws;
          });
        }
      }

class ServerPushServiceProtocol extends ServiceProtocol {
      }

export {
  ServerPushService,
  ServerPushServiceProtocol
};
