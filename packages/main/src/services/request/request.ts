// src/services/request/request.ts
// @ts-nocheck
import { __require, __toESM, require_dayjs_min } from "../../../../vendor/index";
import { Service, ServiceProtocol } from "../base";
import { protocolOf } from "../index";
import "../serviceId";
import { getGlobalConfig } from "../../base/globalConfig/value";
import { logger } from "../../utils/logger";
import { SyncState } from "../sharedState/syncState";
import "../window/type";
import { idlMethods } from "./methods";
import { fetch2 } from "../../utils/request";

let import_node_os2: any = __toESM(__require("node:os"));

let import_dayjs: any = __toESM(require_dayjs_min());

class RequestService extends Service {
        mockNetworkError = false;
        windowState = new SyncState("window");
        userState = new SyncState("user");
        async initialize() {
          this.request("Launch", {});
        }
        apiCaller = async (data) => {
          const path17 = data.paths.find((p2) => p2.path.startsWith("/luna/pc/") && p2.method === idlMethods[data.name]?.method) ?? data.paths.find((p2) => p2.method === idlMethods[data.name]?.method) ?? data.paths[0];
          const headers = await this.getDefaultHeaders();
          const env = await protocolOf("debug" /* debug */).getSetting("env", "");
          if (path17.method === "POST") {
            for (const key of Object.keys(data.body)) {
              delete data.query[key];
            }
          }
          const response = await this.requestHttp({
            method: path17.method,
            url: `https://api.qishui.com${path17.path}`,
            query: data.query,
            body: data.body,
            responseType: "json",
            headers,
            withTTCommonParams: true,
            timeout: data.context?.timeout
          });
          const verifyRequest = response.headers["bdturing-verify"];
          if (verifyRequest) {
            const ok = await protocolOf("window" /* window */).showWindow("captcha" /* captcha */, {
              parentWindow: "main" /* main */,
              extra: {
                request: verifyRequest
              }
            });
            if (ok) {
              return this.apiCaller(data);
            }
          }
          const verifyPassportDecision = response.headers["x-tt-verify-passport-decision"];
          if (verifyPassportDecision) {
            const ok = await protocolOf("renderer" /* renderer */).secondVerify({ decision: verifyPassportDecision });
            if (ok) {
              return this.apiCaller(data);
            } else {
              throw new Error("\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
            }
          }
          const now = response.data?.status_info?.now;
          if (typeof now === "number") {
            if (false) {
              const timeMock = await protocolOf("debug" /* debug */).getSetting("timeMock", "");
              if (timeMock) {
                protocolOf("clock" /* appClock */).sync(dayjs(timeMock).valueOf());
              } else {
                protocolOf("clock" /* appClock */).sync(now * 1e3);
              }
            } else {
              protocolOf("clock" /* appClock */).sync(now * 1e3);
            }
          }
          logger.info(
            "request",
            (b2) => b2.text(path17.method).text(path17.path).text(`env=${env}`).text(`status=${response.status}`).text(`biz_code=${response.data.status_code ?? ""}`).text(`log_id=${response.headers["x-tt-logid"]}`)
          );
          if (response.data.status_code === 1000016) {
            protocolOf("user" /* user */).deleteUserInfo();
          }
          return { ...response.data, headers: response.headers };
        };
        async getTTCommonParams() {
          return {
            aid: String(386088),
            app_name: "luna_pc",
            region: "cn",
            geo_region: "cn",
            os_region: "cn",
            sim_region: "",
            device_id: getGlobalConfig().deviceId,
            cdid: "",
            iid: getGlobalConfig().installId,
            version_name: "3.7.0",
            version_code: "30070000",
            channel: getGlobalConfig().channel,
            build_mode: "master",
            network_carrier: "",
            ac: "wifi",
            tz_name: Intl.DateTimeFormat().resolvedOptions().timeZone,
            resolution: "",
            device_platform: process.platform === "darwin" ? "mac" : "windows",
            device_type: process.platform === "darwin" ? "MacOS" : "Windows",
            os_version: import_node_os2.default.version()
          };
        }
        async request(api, req, options) {
          const method = idlMethods[api].fn;
          const context = options ? { timeout: options.timeout } : {};
          return await method(this.apiCaller, req, context);
        }
        async requestHttp(options) {
          const urlObj = new URL(options.url);
          const queryParams = {
            ...options.withTTCommonParams ? await this.getTTCommonParams() : {},
            fp: getGlobalConfig().deviceId ?? "",
            ...options.query
          };
          for (const [key, value] of Object.entries(queryParams)) {
            if (Array.isArray(value)) {
              for (const item of value) {
                urlObj.searchParams.append(key, String(item));
              }
            } else {
              urlObj.searchParams.set(key, String(value));
            }
          }
          const headers = new Headers();
          for (const [key, value] of Object.entries(options.headers ?? {})) {
            headers.set(key, value);
          }
          if (options.forceWithQishuiCookies) {
            const qishuiCookies = await protocolOf("user" /* user */).getQishuiCookies();
            if (qishuiCookies) {
              headers.set("cookie", qishuiCookies);
            }
          }
          let body;
          if (!(options.method === "GET" || options.method === "HEAD")) {
            if (options.rawBody) {
              body = options.rawBody;
            } else if (options.body) {
              body = JSON.stringify(options.body);
              headers.set("content-type", "application/json; charset=utf-8");
            } else if (options.form) {
              body = new URLSearchParams(options.form);
              headers.set("content-type", "application/x-www-form-urlencoded");
            } else if (options.multipart) {
              const form = new FormData();
              for (const [key, value] of Object.entries(options.multipart)) {
                if (value.text) {
                  form.append(key, value.text);
                } else if (value.file) {
                  const fs20 = await import("node:fs");
                  const fileBuffer = await fs20.promises.readFile(value.file);
                  form.append(key, new Blob([new Uint8Array(fileBuffer)]));
                }
              }
              body = form;
            }
          }
          const signal = options.timeout && options.timeout > 0 ? AbortSignal.timeout(options.timeout) : void 0;
          const response = await fetch2(urlObj.toString(), {
            method: options.method,
            headers,
            body,
            signal
          }).catch((error) => {
            if (error.name === "AbortError") {
              throw new Error(`Request timeout after ${options.timeout}ms`);
            }
            throw error;
          });
          if (response.status < 200 || response.status >= 300) {
            throw new Error(`request (${options.url}) failed with status: ${response.status}`);
          }
          let data;
          if (options.responseType === "arraybuffer") {
            data = await response.arrayBuffer();
          } else if (options.responseType === "json") {
            const text = await response.text();
            data = text ? JSON.parse(text) : null;
          } else {
            data = await response.text();
          }
          return {
            status: response.status,
            headers: Object.fromEntries(response.headers.entries()),
            data
          };
        }
        async getDefaultHeaders() {
          const envType = await protocolOf("debug" /* debug */).getSetting(
            "envType",
            "" ? "ppe" : "prod"
          );
          const env = await protocolOf("debug" /* debug */).getSetting("env", "");
          const extraHeaders = {};
          if (false) {
            const ssoToken = await protocolOf("internalCheck" /* internalCheck */).ssoToken();
            if (ssoToken) {
              extraHeaders["x-luna-sso-token"] = ssoToken;
            }
            const testUserTierMode = await protocolOf("debug" /* debug */).getSetting(
              "testUserTierMode",
              void 0
            );
            if (testUserTierMode) {
              const item = {
                vip: "vip_user",
                svip: "svip_user",
                nonvip: "free_user",
                default: void 0
              }[testUserTierMode];
              if (item) {
                extraHeaders["x-luna-test-user-tier-mode"] = item;
              }
            }
            if (envType === "ppe") {
              extraHeaders["x-use-ppe"] = "1";
              extraHeaders["x-tt-env"] = env;
            } else if (envType === "boe") {
              extraHeaders["x-use-boe"] = "1";
              extraHeaders["x-tt-env"] = env;
            }
            const timeMock = await protocolOf("debug" /* debug */).getSetting(
              "timeMock",
              ""
            );
            if (timeMock) {
              const time = dayjs(timeMock);
              const seconds = Math.floor(time.valueOf() / 1e3);
              extraHeaders["x-luna-test-user-time-mock"] = String(seconds);
            }
            const apiVersion = await protocolOf("debug" /* debug */).getSetting(
              "apiVersion",
              ""
            );
            if (apiVersion) {
              extraHeaders["x-luna-api-version"] = apiVersion;
            }
          }
          let backgroundType = "";
          if (this.windowState.value.windows["main" /* main */]?.isFocus) {
            backgroundType = "foreground";
          } else if (this.windowState.value.windows["main" /* main */]?.isMinimize) {
            backgroundType = "minimize";
          } else {
            backgroundType = "blur";
          }
          return {
            // 'cookie': await protocolOf(ServiceId.user).getCookie(),
            "x-luna-background-type": backgroundType,
            "x-luna-is-background-req": this.windowState.value.windows["main" /* main */]?.isFocus ? "0" : "1",
            "x-luna-is-local-user": this.userState.value.info ? "1" : "0",
            ...extraHeaders
          };
        }
      }

class RequestServiceProtocol extends ServiceProtocol {
        request(api, req, options) {
          return this.service.request(api, req, options);
        }
        requestHttp(options) {
          return this.service.requestHttp(options);
        }
        setMockNetworkError(v2) {
          this.service.mockNetworkError = v2;
        }
      }

export {
  RequestService,
  RequestServiceProtocol
};
