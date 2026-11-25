// src/services/utils/utils.ts
// @ts-nocheck
import { __require, __toESM, require_bdms, require_device } from "../../../../vendor/index";
import { Service, ServiceProtocol } from "../base";
import { protocolOf } from "../index";
import "../serviceId";
import { delay } from "../../utils/async";
import "../window/type";
import { handleDeeplink } from "../../libs/deeplink/handlers";

let import_node_crypto4: any = __toESM(__require("node:crypto"));

let import_node_fs5: any = __toESM(__require("node:fs"));

let import_promises: any = __require("node:stream/promises");

let bdms3: any = __toESM(require_bdms());

let import_electron23: any = __require("electron");

let import_device3: any = __toESM(require_device());

class UtilsService extends Service {
        isOnline = false;
        isLaunchPerformanceMetricsReported = false;
        async initialize() {
          this.pollOnlineState();
        }
        async pollOnlineState() {
          this.isOnline = import_electron23.net.isOnline();
          while (true) {
            await delay(1e3);
            const isOnline = import_electron23.net.isOnline();
            if (isOnline !== this.isOnline) {
              if (isOnline) {
                console.log("to online");
                protocolOf("player" /* player */).retryIfError();
              } else {
                console.log("to offline");
              }
            }
            this.isOnline = isOnline;
          }
        }
      }

class UtilsServiceProtocol extends ServiceProtocol {
        async writeAlog(_level, _tag, _msg) {
        }
        async reportBDMS(scene) {
          bdms3.report(scene);
        }
        async copyToClipboard(text) {
          import_electron23.clipboard.writeText(text);
        }
        async openUrl(url2, etParams) {
          if (url2.startsWith("luna://")) {
            const urlObj = new URL(url2);
            if (etParams) {
              urlObj.searchParams.set("et_params", JSON.stringify({
                ...JSON.parse(urlObj.searchParams.get("et_params") ?? "{}"),
                ...etParams
              }));
            }
            await handleDeeplink(urlObj.toString());
            return;
          }
          await import_electron23.shell.openExternal(url2);
        }
        async calculateSHA256(filePath) {
          const hash = import_node_crypto4.default.createHash("sha256");
          const fileStream = import_node_fs5.default.createReadStream(filePath);
          await (0, import_promises.pipeline)(fileStream, hash);
          return hash.digest("hex");
        }
        async reportLaunchPerformanceMetrics(cost) {
          if (this.service.isLaunchPerformanceMetricsReported) {
            return;
          }
          protocolOf("applog" /* applog */).report({
            event: "performance_metrics",
            params: {
              type: "launch",
              cost
            }
          });
          this.service.isLaunchPerformanceMetricsReported = true;
        }
        async getAppMetrics() {
          return import_electron23.app.getAppMetrics();
        }
        async showOpenDialog(options) {
          return await import_electron23.dialog.showOpenDialog(options);
        }
        async decodeSpade(spade) {
          return (0, import_device3.decodeSpade)(spade);
        }
        async showFeedback(input = { type: "setting", etParams: {} }) {
          const isLogin = !!(await protocolOf("sharedState" /* sharedState */).get("user")).info;
          const allowGuestFeedback = await protocolOf("appSettings" /* appSettings */).getSetting("allow_guest_feedback") ?? false;
          if (!allowGuestFeedback && !isLogin) {
            const logged = await protocolOf("user" /* user */).login({
              waitComplete: true,
              etParams: {
                scene_name: input.etParams?.scene_name,
                enter_from_page: input.etParams?.enter_from_page,
                enter_method: input.etParams?.enter_method
              }
            });
            if (!logged) {
              return;
            }
          }
          const finalEtParams = {
            ...input.etParams ?? {},
            from_action: {
              login: "click_login",
              setting: "click_settings",
              track: "player_more_menu",
              ugc: "player_more_menu",
              mv: "player_more_menu"
            }[input.type],
            type: {
              setting: "click_settings",
              login: "click_login",
              track: "player_more_menu_track",
              ugc: "player_more_menu_ugc",
              mv: "player_more_menu_mv"
            }[input.type],
            content_type: "error_info_feedback"
          };
          protocolOf("applog" /* applog */).report({
            event: "pop_up_show",
            params: finalEtParams
          });
          let config;
          if (input.type === "track") {
            config = {
              type: "track",
              ctx: {
                playable: input.args.playable,
                etParams: finalEtParams
              }
            };
          } else if (input.type === "ugc") {
            config = {
              type: "ugc",
              ctx: {
                playable: input.args.playable,
                etParams: finalEtParams
              }
            };
          } else if (input.type === "mv") {
            config = {
              type: "mv",
              ctx: {
                playable: input.args.playable,
                etParams: finalEtParams
              }
            };
          } else {
            config = {
              type: "setting",
              ctx: {
                etParams: finalEtParams
              }
            };
          }
          protocolOf("window" /* window */).showWindow("feedback" /* feedback */, {
            injectedData: {
              config
            }
          });
        }
      }

export {
  UtilsService,
  UtilsServiceProtocol
};
