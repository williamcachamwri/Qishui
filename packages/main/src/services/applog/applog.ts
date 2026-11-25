// src/services/applog/applog.ts
// @ts-nocheck
import { __require, __toESM, init_esm_node, require_lodash, v4_default } from "../../../../vendor/index";
import { protocolOf } from "../index";
import { getGlobalConfig } from "../../base/globalConfig/value";
import { StorageState } from "../../base/storage/storageState";
import { delay } from "../../utils/async";
import { logger } from "../../utils/logger";
import { getReadableOsVersion } from "../../utils/os";
import { Service, ServiceProtocol } from "../base";
import "../serviceId";
import { SyncState } from "../sharedState/syncState";
import "../storage/type";
import { fetch2, interceptBeforeRequest, interceptCompleted, interceptHeadersReceived } from "../../utils/request";
import "../window/type";
import { UsageTimeCalc } from "./timeCalc";
import { launchedAt } from "../../utils/launched";
import { perfData } from "../../utils/perf";

init_esm_node();
let import_node_os4: any = __toESM(__require("node:os"));

let import_lodash: any = __toESM(require_lodash());

let MCS_ENDPOINT: any = "mcs.zijieapi.com";

let notifyEventTrackVerify: any = import_lodash.default.once(() => logger.info("applog", (b2) => b2.text("et verify enabled")));

class ApplogService extends Service {
        userState = new SyncState("user");
        playerState = new SyncState("player");
        windowState = new SyncState("window");
        commerceState = new SyncState("commerce");
        enableVerify = new StorageState("Debug" /* debug */, "applogVerify", false);
        launchSessionId = v4_default();
        processCreationTime = process.getCreationTime() ?? 0;
        launchSessionStartTime = Date.now();
        timeCalc = new UsageTimeCalc();
        reportQueue = [];
        reportCounter = {};
        async initialize() {
          this.startUploadInterval();
          this.reportRequest();
          this.reportPcLaunchAndTerminate();
          this.reportLaunchMetrics();
          this.reportPcUsageTime();
          this.reportResourcesUsage();
        }
        async reportLaunchMetrics() {
          this.report({
            event: "performance_metrics",
            params: {
              type: "main_launched",
              cost: launchedAt - getGlobalConfig().mainProcessCreationTime
            }
          });
          this.report({
            event: "performance_metrics",
            params: {
              type: "main_initialize",
              cost: Date.now() - launchedAt
            }
          });
          await delay(1e4);
          for (const [key, value] of Object.entries(perfData)) {
            this.report({
              event: "performance_metrics",
              params: {
                type: `${key}_cost`,
                cost: value.fromPreviousTime
              }
            });
            this.report({
              event: "performance_metrics",
              params: {
                type: `${key}_timing`,
                cost: value.fromCreationTime
              }
            });
          }
        }
        async reportPcUsageTime() {
          this.windowState.onUpdate((state, oldState) => {
            if (!oldState) {
              return;
            }
            if (state.windows["main" /* main */]?.isFocus && !oldState.windows["main" /* main */]?.isFocus) {
              this.timeCalc.handleToForeground();
            } else if (!state.windows["main" /* main */]?.isFocus && oldState.windows["main" /* main */]?.isFocus) {
              this.timeCalc.handleToBackground();
            }
          });
          while (true) {
            await delay(6e4);
            this.report({
              event: "usage_statistics",
              params: {
                datetime: String(Date.now()),
                foreground_duration: this.timeCalc.getForegroundMs(),
                background_duration: this.timeCalc.getBackgroundMs(),
                duration: this.timeCalc.getTimeMs(),
                type: "tick"
              }
            });
            this.timeCalc.reset(!!this.windowState.value.windows["main" /* main */]?.isFocus);
          }
        }
        async reportResourcesUsage() {
          await delay(30 * 1e3);
          while (true) {
            const sessionId = v4_default();
            const appMetrics = await protocolOf("utils" /* utils */).getAppMetrics();
            for (const metrics of appMetrics) {
              this.report({
                event: "resources_usage",
                params: {
                  session_id: sessionId,
                  type: "memory",
                  sub_type: "workingSetSize",
                  process_type: metrics.type,
                  process_name: metrics.name,
                  value: metrics.memory.workingSetSize
                }
              });
              this.report({
                event: "resources_usage",
                params: {
                  session_id: sessionId,
                  type: "memory",
                  sub_type: "peakWorkingSetSize",
                  process_type: metrics.type,
                  process_name: metrics.name,
                  value: metrics.memory.peakWorkingSetSize
                }
              });
              this.report({
                event: "resources_usage",
                params: {
                  session_id: sessionId,
                  type: "cpu",
                  sub_type: "",
                  process_type: metrics.type,
                  process_name: metrics.name,
                  value: metrics.cpu.percentCPUUsage
                }
              });
            }
            await delay(10 * 60 * 1e3);
          }
        }
        async reportPcLaunchAndTerminate() {
          this.report({
            event: "pc_launch",
            params: {
              datetime: String(this.launchSessionStartTime),
              session_id: this.launchSessionId,
              local_time_ms: this.launchSessionStartTime,
              is_from_background: 0
            }
          });
          this.windowState.onUpdate((state, oldState) => {
            if (!oldState) {
              return;
            }
            if (state.windows["main" /* main */]?.isFocus && !oldState.windows["main" /* main */]?.isFocus) {
              this.report({
                event: "pc_launch",
                params: {
                  datetime: String(this.launchSessionStartTime),
                  session_id: this.launchSessionId,
                  local_time_ms: this.launchSessionStartTime,
                  is_from_background: 1,
                  duration: Date.now() - this.launchSessionStartTime
                }
              });
            } else if (!state.windows["main" /* main */]?.isFocus && oldState.windows["main" /* main */]?.isFocus) {
              this.report({
                event: "pc_terminate",
                params: {
                  datetime: String(this.launchSessionStartTime),
                  session_id: this.launchSessionId,
                  local_time_ms: this.launchSessionStartTime,
                  is_to_background: 1,
                  duration: Date.now() - this.launchSessionStartTime
                }
              });
            }
          });
        }
        async reportRequest() {
          const infoMap = /* @__PURE__ */ new Map();
          interceptBeforeRequest((params) => {
            infoMap.set(params.id, {
              timestamp: params.timestamp,
              method: params.method,
              resourceType: params.resourceType,
              referrer: params.referrer
            });
          });
          interceptHeadersReceived((params) => {
            const info = infoMap.get(params.id);
            if (info) {
              info.statusCode = params.statusCode;
              info.statusLine = params.statusLine;
            }
          });
          interceptCompleted((params) => {
            const url2 = params.url;
            if (url2.includes(MCS_ENDPOINT)) {
              return;
            }
            if (false) {
              return;
            }
            const info = infoMap.get(params.id);
            if (!info) {
              return;
            }
            infoMap.delete(params.id);
            const cost = Date.now() - info.timestamp;
            const urlObj = new URL(url2);
            this.report({
              event: "request_log",
              params: {
                resource_type: info.resourceType || "",
                url: url2,
                host: urlObj.hostname,
                path: urlObj.pathname,
                is_succeed: params.statusCode ? 1 : 0,
                error: params.error || "",
                cost,
                is_from_cache: params.fromCache ? 1 : 0,
                status_code: params.statusCode ? String(params.statusCode) : "",
                status_line: params.statusLine || "",
                referrer: info.referrer || "",
                method: info.method
              }
            });
          });
        }
        getBackgroundType() {
          if (!this.windowState.value.windows["main" /* main */]) {
            return "close";
          } else if (this.windowState.value.windows["main" /* main */]?.isMinimize) {
            return "minimize";
          } else if (this.windowState.value.windows["main" /* main */]?.isFocus) {
            return "foreground";
          } else {
            return "focus_loss";
          }
        }
        async createReportCommonBody() {
          const deviceId = getGlobalConfig().deviceId;
          const screenData = await protocolOf("window" /* window */).getPrimaryScreenData();
          const { channel, windowsDeviceId } = getGlobalConfig();
          const enablePurchase = await protocolOf("appSettings" /* appSettings */).getSetting("purchase");
          const trackExtraInfo = (await protocolOf("appSettings" /* appSettings */).getSetting("luna_pc_common_server_params"))?.track_extra_info;
          const vids = Object.values(trackExtraInfo ?? {}).join(",");
          return {
            caller: "luna.desktop.client",
            user: {
              // MCS 要求
              user_unique_id: deviceId,
              user_type: 12,
              user_id: this.userState.value.info?.my_info.id ?? "",
              user_is_auth: !!this.userState.value.info,
              user_is_login: !!this.userState.value.info,
              device_id: deviceId
              // web_id: '',
              // ip_addr_id: '',
            },
            header: {
              // MCS 要求
              app_id: 386088,
              // app_install_id: '',
              // app_package: '',
              app_channel: "master",
              channel: "master",
              pc_channel: channel,
              app_version: "3.7.0",
              os_name: process.platform === "darwin" ? "mac" : process.platform === "win32" ? "windows" : "unknown",
              os_version: import_node_os4.default.release(),
              // device_model: '',
              // ab_client: '',
              ab_version: await protocolOf("appSettings" /* appSettings */).getSetting("ab_version"),
              // traffic_type: '',
              // utm_source: '',
              // utm_medium: '',
              // utm_campaign: '',
              // client_ip: '',
              // TEA 可添加
              resolution: `${screenData.size.width}x${screenData.size.height}`,
              // 业务自定义
              custom: JSON.stringify({
                pc_channel: channel,
                wdid: windowsDeviceId,
                // 研发参数
                scale_factor: screenData.scaleFactor,
                readable_os_version: getReadableOsVersion(),
                // 业务参数
                is_playing: this.playerState.value.isPlaying,
                is_background: this.getBackgroundType() === "foreground" ? 0 : 1,
                background_type: this.getBackgroundType(),
                user_login_status: this.userState.value.info ? 1 : 0,
                user_vip_status: this.commerceState.value.isFreeVip ? 1 : this.commerceState.value.isVip ? 2 : 0,
                network_type: "",
                os_arch: process.arch,
                pc_channel_vip_buy_qualification: enablePurchase ? 1 : 0,
                auto_startup: process.argv.includes("--auto-startup") ? 1 : 0,
                running_duration: Math.floor(process.uptime()),
                // 实时实验进组参数
                track_extra_info: vids
              })
            }
          };
        }
        async report(options) {
          this.reportCounter[options.event] = (this.reportCounter[options.event] ?? 0) + 1;
          this.reportQueue.push({
            event: options.event,
            params: JSON.stringify({
              report_count: this.reportCounter[options.event],
              duration_from_launch: Date.now() - this.processCreationTime,
              ...options.params
            }),
            time: Math.floor(Date.now() / 1e3)
          });
        }
        async startUploadInterval() {
          const batchSize = 50;
          let retryDelay = 1e3;
          const maxRetryDelay = 6e4;
          while (true) {
            await delay(200);
            if (this.reportQueue.length > 0) {
              const events = this.reportQueue.splice(0, batchSize);
              try {
                const reportBody = {
                  ...await this.createReportCommonBody(),
                  events
                };
                const isVerify = await this.enableVerify.getWhenReady() || getGlobalConfig().verifyTrackEvent;
                if (isVerify) {
                  notifyEventTrackVerify();
                }
                await fetch2(`https://${MCS_ENDPOINT}/v1/json${isVerify ? "_test" : ""}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(reportBody)
                });
                retryDelay = 1e3;
              } catch (e) {
                console.error(e);
                this.reportQueue.unshift(...events);
                await delay(retryDelay);
                retryDelay = Math.min(retryDelay * 2, maxRetryDelay);
              }
            }
          }
        }
      }

class ApplogServiceProtocol extends ServiceProtocol {
        report(options) {
          return this.service.report(options);
        }
        async getVerifyStatus() {
          return await this.service.enableVerify.getWhenReady();
        }
        async setVerifyStatus(v2) {
          await this.service.enableVerify.set(v2);
        }
      }

export {
  ApplogService,
  ApplogServiceProtocol,
  MCS_ENDPOINT
};
