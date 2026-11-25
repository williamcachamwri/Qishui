// src/services/notification/notification.ts
// @ts-nocheck
import { __require, __toESM, axios_default, init_axios2, require_dayjs_min } from "../../../../vendor/index";
import { protocolOf } from "../index";
import { Service, ServiceProtocol } from "../base";
import "../serviceId";
import { delay } from "../../utils/async";
import { SyncState } from "../sharedState/syncState";
import { StorageState } from "../../base/storage/storageState";
import "../storage/type";
import { State } from "../../base/state/state";
import { initialSharedState } from "../sharedState/initialState";
import { getImageUrl } from "../../utils/image";

init_axios2();
let import_electron31: any = __require("electron");

let import_dayjs4: any = __toESM(require_dayjs_min());

let import_path4: any = __toESM(__require("path"));

let import_promises4: any = __toESM(__require("fs/promises"));

class NotificationService extends Service {
        state = new State(initialSharedState.notification);
        queueState = new SyncState("queue");
        playerState = new SyncState("player");
        launchTime = (0, import_dayjs4.default)();
        previousNotificationTime = new StorageState("Status" /* status */, "previousNotificationDate", null);
        previousBlockTime = null;
        previousBlockReason = null;
        async initialize() {
          this.state.onUpdateBatched((state) => {
            protocolOf("sharedState" /* sharedState */).update("notification", state);
          });
          const shouldEnableByDefault = (await protocolOf("appSettings" /* appSettings */).getSetting("luna_pc_common_server_params"))?.notification?.enable_by_default;
          const enabledFromConfig = await protocolOf("storage" /* storage */).get("Config" /* config */, "notification_enable");
          if (enabledFromConfig === null) {
            this.state.update((state) => {
              state.isNotificationEnabled = shouldEnableByDefault ?? false;
            });
          } else {
            this.state.update((state) => {
              state.isNotificationEnabled = enabledFromConfig;
            });
          }
          protocolOf("applog" /* applog */).report({
            event: "notification_info",
            params: {
              type: "check",
              status: this.state.value.isNotificationEnabled ? "enabled" : "disabled"
            }
          });
          this.handleLaunch();
          this.setupPowerMonitor();
        }
        async handleLaunch() {
          if (!this.state.value.isNotificationEnabled) {
            return;
          }
          const notificationDelay = (await protocolOf("appSettings" /* appSettings */).getSetting("luna_pc_common_server_params"))?.notification?.track_recommendation?.delay_seconds;
          if (!notificationDelay) {
            protocolOf("applog" /* applog */).report({
              event: "notification_info",
              params: {
                type: "launch_miss",
                reason: "no_delay"
              }
            });
            return;
          }
          await delay(notificationDelay * 1e3);
          const previousBlockDate = this.previousBlockTime?.format("YYYY-MM-DD");
          const previousNotifyDate = (0, import_dayjs4.default)(await this.previousNotificationTime.getWhenReady()).format("YYYY-MM-DD");
          const currentDate = (0, import_dayjs4.default)().format("YYYY-MM-DD");
          if (previousBlockDate === currentDate) {
            protocolOf("applog" /* applog */).report({
              event: "notification_info",
              params: {
                type: "launch_miss",
                reason: `blocked_${this.previousBlockReason ?? "unknown"}`
              }
            });
            return;
          }
          if (previousNotifyDate === currentDate) {
            protocolOf("applog" /* applog */).report({
              event: "notification_info",
              params: {
                type: "launch_miss",
                reason: "day_limit"
              }
            });
            return;
          }
          const now = (0, import_dayjs4.default)();
          this.previousNotificationTime.set(now.valueOf());
          await this.showTrackRecommendationNotification();
        }
        setupPowerMonitor() {
          import_electron31.powerMonitor.on("resume", async () => {
            this.handleLaunch();
          });
        }
        async showTrackRecommendationNotification() {
          if (!this.state.value.isNotificationEnabled) {
            protocolOf("applog" /* applog */).report({
              event: "notification_info",
              params: {
                type: "show_miss",
                reason: "disabled"
              }
            });
            return;
          }
          const { contents, actions = [] } = (await protocolOf("appSettings" /* appSettings */).getSetting("luna_pc_common_server_params"))?.notification?.track_recommendation ?? {};
          if (!contents || contents.length === 0) {
            protocolOf("applog" /* applog */).report({
              event: "notification_info",
              params: {
                type: "show_miss",
                reason: "no_contents"
              }
            });
            return;
          }
          const content = contents[Math.floor(Math.random() * contents.length)];
          if (!content || !content.title || !content.body) {
            protocolOf("applog" /* applog */).report({
              event: "notification_info",
              params: {
                type: "show_miss",
                reason: "content_invalid"
              }
            });
            return;
          }
          const currentKey = this.queueState.value.queue?.currentPlayable.key;
          const playable = currentKey ? this.queueState.value.queue?.playables.byKey[currentKey] : void 0;
          if (!playable || !playable.name || !playable.artists || playable.artists.length === 0) {
            return null;
          }
          const title = this.processContentText(content.title, playable);
          const body = this.processContentText(content.body, playable);
          if (!title || !body) {
            protocolOf("applog" /* applog */).report({
              event: "notification_info",
              params: {
                type: "show_miss",
                reason: "processed_content_invalid"
              }
            });
            return;
          }
          protocolOf("applog" /* applog */).report({
            event: "notification_info",
            params: {
              type: "show",
              title,
              body,
              actions: actions.map((t2) => t2.text).join(",")
            }
          });
          let icon;
          const iconUrl = getImageUrl(playable.cover_url, { width: 200 });
          try {
            const res = await axios_default.get(iconUrl, { responseType: "arraybuffer" });
            const buffer = Buffer.from(res.data);
            const saveTo = import_path4.default.join(import_electron31.app.getPath("temp"), "notification_icon.jpg");
            await import_promises4.default.writeFile(saveTo, buffer);
            if (process.platform === "darwin") {
              icon = import_electron31.nativeImage.createFromPath(saveTo);
            } else {
              icon = saveTo;
            }
            console.log(icon);
          } catch (e) {
            console.error(e);
            protocolOf("applog" /* applog */).report({
              event: "notification_info",
              params: {
                type: "icon_load_failed",
                reason: e.error
              }
            });
          }
          this.showNotification({
            title,
            body,
            icon,
            actions: actions.map((t2) => {
              return {
                text: t2.text,
                action: t2.action
              };
            }).filter((t2) => {
              if (process.platform === "darwin") {
                return t2.action === "play";
              }
              return true;
            })
          });
        }
        processContentText(template, playable) {
          const artists = (playable.artists?.length ?? 0) > 1 ? `${playable.artists?.[0]?.name}\u7B49\u4EBA` : playable.artists?.[0]?.name ?? "";
          return template.replaceAll("{track}", playable.name ?? "").replaceAll("{artist}", artists).replaceAll("{album}", playable.album?.name ?? "");
        }
        showNotification({ title, body, icon, actions }) {
          const notification = new import_electron31.Notification({
            title,
            body,
            icon,
            // <audio silent="true" />
            // silent: true,
            toastXml: `
    <toast launch="luna:action=show" activationType="protocol">
      <visual>
          <binding template="ToastGeneric">
              <text>${title}</text>
              <text>${body}</text>
              <image placement="appLogoOverride" src="${icon}" />
          </binding>
      </visual>
      <actions>
    ${actions.map((action) => `
      <action
          content="${action.text}"
          arguments="luna:action=${action.action}"
          activationType="protocol"/>
    `.trim()).join("\n")}
      </actions>
    </toast>
    `.trim(),
            actions: actions.map((action) => ({
              type: "button",
              text: action.text
            }))
          });
          notification.show();
          if (process.platform === "darwin") {
            notification.on("action", (e, i2) => {
              this.handleNotificationAction(actions[i2].action);
            });
            notification.on("click", () => {
              this.handleNotificationAction("show");
            });
          }
        }
        handleNotificationAction(action) {
          protocolOf("applog" /* applog */).report({
            event: "notification_info",
            params: {
              type: "click",
              action
            }
          });
          if (action === "play") {
            protocolOf("player" /* player */).resume({
              play_action_type: "notification"
            });
          }
        }
      }

class NotificationServiceProtocol extends ServiceProtocol {
        async showTrackRecommendationNotification() {
          return this.service.showTrackRecommendationNotification();
        }
        async markBlocked(reason) {
          this.service.previousBlockTime = (0, import_dayjs4.default)();
          this.service.previousBlockReason = reason;
        }
        async handleNotificationAction(action) {
          this.service.handleNotificationAction(action);
        }
        async setNotificationEnabled(enabled) {
          await protocolOf("storage" /* storage */).set("Config" /* config */, "notification_enable", enabled);
          this.service.state.update((state) => {
            state.isNotificationEnabled = enabled;
          });
        }
        async clearDayFreqControl() {
          this.service.previousNotificationTime.set(null);
        }
      }

export {
  NotificationService,
  NotificationServiceProtocol
};
