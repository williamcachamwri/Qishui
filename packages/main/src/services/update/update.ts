// src/services/update/update.ts
// @ts-nocheck
import { __require, __toESM, axios_default, init_axios2, init_nanoid, nanoid, require_progress_stream, require_semver2 } from "../../../../vendor/index";
import { protocolOf } from "../index";
import { State } from "../../base/state/state";
import { logger } from "../../utils/logger";
import { Service, ServiceProtocol } from "../base";
import "../serviceId";
import { initialSharedState } from "../sharedState/initialState";
import "../window/type";
import { SmallUpdate } from "./small";

init_nanoid();
init_axios2();
let import_node_child_process: any = __toESM(__require("node:child_process"));

let import_node_fs10: any = __toESM(__require("node:fs"));

let import_node_os5: any = __toESM(__require("node:os"));

let import_node_path9: any = __toESM(__require("node:path"));

let import_node_util2: any = __toESM(__require("node:util"));

let import_promises3: any = __require("node:stream/promises");

let import_electron28: any = __require("electron");

let semver2: any = __toESM(require_semver2());

let import_progress_stream2: any = __toESM(require_progress_stream());

class UpdateService extends Service {
        state = new State(initialSharedState.update);
        smallUpdate = new SmallUpdate(this);
        allowForceUpdateAtLaunch = true;
        updaterDirPath = import_node_path9.default.resolve(import_node_os5.default.tmpdir(), "SodaMusicUpdater");
        constructor() {
          super();
          this.state.onUpdateBatched((s2) => {
            protocolOf("sharedState" /* sharedState */).update("update", s2);
          });
          setTimeout(() => {
            this.allowForceUpdateAtLaunch = false;
          }, 1e4);
        }
        async initialize() {
          if (process.mas) {
            protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "MAS \u7981\u7528\u66F4\u65B0");
            return;
          }
          if (false) {
            protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "\u672C\u5730\u5F00\u53D1\uFF0C\u7981\u7528\u66F4\u65B0");
            return;
          }
          this.smallUpdate.reportSmallPackage();
          this.checkUpdate(false);
          setInterval(() => {
            this.checkUpdate(false);
          }, 10 * 60 * 1e3);
          this.tryRemoveOldVersion();
          this.smallUpdate.tryRemoveOldVersion();
          this.tryRemoveOldPackage();
        }
        async tryRemoveOldVersion() {
          console.log("removing old versions");
          try {
            const multiVersionDir = import_node_path9.default.dirname(import_node_path9.default.dirname(import_electron28.app.getPath("exe")));
            const multiVersionDirFiles = await import_node_fs10.default.promises.readdir(multiVersionDir);
            logger.info("update", (b2) => b2.text("scanned multi-version dir").object(multiVersionDirFiles));
            if (!multiVersionDirFiles.includes("SodaMusicLauncher.exe")) {
              return;
            }
            const versionDirs = multiVersionDirFiles.filter((t2) => /^\d+\.\d+\.\d+$/.test(t2));
            const versionsToRemove = versionDirs.filter((t2) => semver2.compare(globalThis.shellVersion, t2) === 1);
            logger.info("update", (b2) => b2.text("remove old versions").object(versionsToRemove));
            for (const version2 of versionsToRemove) {
              try {
                await import_node_fs10.default.promises.rm(import_node_path9.default.resolve(multiVersionDir, version2), { recursive: true, force: true });
              } catch {
              }
            }
          } catch (e) {
            console.error(e);
          }
        }
        async ignoreUpdate() {
          this.state.update(() => ({
            ...this.state.value,
            isUpdateDialogVisible: false,
            isUpdateButtonVisible: true
          }));
        }
        async restartAndInstall(isAuto) {
          logger.info("update", (b2) => b2.text("restart and install"));
          const { updateType } = this.state.value;
          if (isAuto) {
            protocolOf("applog" /* applog */).report({
              event: "update_metrics",
              params: {
                type: "auto_confirm"
              }
            });
          } else {
            protocolOf("applog" /* applog */).report({
              event: "update_metrics",
              params: {
                type: "user_confirm"
              }
            });
          }
          await protocolOf("window" /* window */).markExiting();
          switch (updateType) {
            case "full": {
              if (process.platform === "darwin") {
                import_electron28.autoUpdater.quitAndInstall();
              } else if (process.platform === "win32") {
                this.relaunchWithLauncher();
              }
              break;
            }
            case "small": {
              if (process.platform === "darwin") {
                import_electron28.app.relaunch();
                import_electron28.app.exit();
              } else if (process.platform === "win32") {
                this.relaunchWithLauncher();
              }
              break;
            }
          }
        }
        relaunchWithLauncher() {
          const launcherPath = import_node_path9.default.resolve(import_electron28.app.getPath("exe"), "../../SodaMusicLauncher.exe");
          logger.info("update", (b2) => b2.bold("launcherPath: ").text(launcherPath));
          try {
            import_node_fs10.default.accessSync(launcherPath);
            import_electron28.app.relaunch({ execPath: launcherPath });
          } catch {
            import_electron28.app.relaunch();
          }
          import_electron28.app.exit();
        }
        async checkUpdate(manually) {
          const startTime = performance.now();
          if (!manually && this.state.value.isUpdating) {
            logger.info("update", (b2) => b2.text("is waiting for update"));
            protocolOf("applog" /* applog */).report({
              event: "update_metrics",
              params: {
                type: "updating_lock",
                cost: performance.now() - startTime
              }
            });
            return false;
          }
          this.state.update((state) => {
            state.isUpdating = true;
            state.isFailed = false;
            delete state.updatingVersion;
            delete state.progress;
          });
          protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "\u68C0\u6D4B\u4E2D");
          let updateInfo = await protocolOf("appSettings" /* appSettings */).getSetting("update_info", true);
          if (!updateInfo) {
            logger.info("update", (b2) => b2.text("is latest"));
            protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "\u65E0\u65B0\u7248\u672C");
            this.state.update(() => ({ ...initialSharedState.update }));
            return false;
          }
          if (updateInfo.version === "3.7.0") {
            logger.info("update", (b2) => b2.text("same version, skip update"));
            protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "\u76F8\u540C\u7248\u672C\uFF0C\u8DF3\u8FC7\u66F4\u65B0");
            protocolOf("applog" /* applog */).report({
              event: "update_metrics",
              params: {
                type: "latest_same_version",
                cost: performance.now() - startTime,
                target_version: updateInfo.version
              }
            });
            this.state.update(() => ({ ...initialSharedState.update }));
            return false;
          }
          logger.info("update", (b2) => b2.bold("settings: ").object(updateInfo));
          protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "\u6709\u65B0\u7248\u672C");
          protocolOf("applog" /* applog */).report({
            event: "update_metrics",
            params: {
              type: "available",
              cost: performance.now() - startTime,
              target_version: updateInfo.version
            }
          });
          this.state.update((state) => {
            state.updatingVersion = updateInfo.version;
          });
          let doUpdateResult = false;
          const isPlaying = (await protocolOf("sharedState" /* sharedState */).get("player")).isPlaying;
          if (updateInfo.mode === "force" && isPlaying) {
            updateInfo = {
              ...updateInfo,
              mode: "regular"
            };
          }
          const isForce = ["force", "force-interrupt"].includes(updateInfo.mode ?? "") || updateInfo.mode === "force-launch" && (this.allowForceUpdateAtLaunch || manually);
          if (isForce) {
            protocolOf("player" /* player */).suspend();
            protocolOf("window" /* window */).showWindow("update" /* update */);
            protocolOf("window" /* window */).preventShow("main" /* main */);
          }
          if (process.platform === "win32") {
            if (!updateInfo.win32?.[process.arch]) {
              protocolOf("applog" /* applog */).report({
                event: "update_metrics",
                params: {
                  type: "error",
                  reason: "Windows \u67B6\u6784\u5F02\u5E38",
                  cost: performance.now() - startTime,
                  target_version: updateInfo.version
                }
              });
              this.state.update(() => ({ ...initialSharedState.update }));
              return false;
            }
            doUpdateResult = await this.smallUpdate.updateWithSmallPackage(updateInfo.win32[process.arch], startTime, updateInfo.version);
            if (!doUpdateResult) {
              doUpdateResult = await this.doUpdateWindows(updateInfo.win32[process.arch], startTime, updateInfo.version);
            }
          }
          if (process.platform === "darwin") {
            if (!updateInfo.darwin?.[process.arch]) {
              protocolOf("applog" /* applog */).report({
                event: "update_metrics",
                params: {
                  type: "error",
                  reason: "MacOS \u67B6\u6784\u5F02\u5E38",
                  cost: performance.now() - startTime,
                  target_version: updateInfo.version
                }
              });
              this.state.update(() => ({ ...initialSharedState.update }));
              return false;
            }
            doUpdateResult = await this.smallUpdate.updateWithSmallPackage(updateInfo.darwin[process.arch], startTime, updateInfo.version);
            if (!doUpdateResult) {
              this.state.update((state) => {
                delete state.progress;
              });
              doUpdateResult = await this.doUpdateMac(updateInfo.darwin[process.arch], startTime, updateInfo.version);
            }
          }
          protocolOf("applog" /* applog */).report({
            event: "update_metrics",
            params: {
              type: "do_updated",
              cost: performance.now() - startTime,
              is_succeed: doUpdateResult ? 1 : 0,
              target_version: updateInfo.version
            }
          });
          logger.info("update", (b2) => b2.text("do update result").bold(String(doUpdateResult)));
          if (doUpdateResult) {
            this.state.update(() => ({
              ...this.state.value,
              isUpdateDialogVisible: true,
              isUpdateButtonVisible: true,
              layoutInfo: updateInfo.layoutInfo,
              updateType: doUpdateResult
            }));
            if (isForce) {
              this.restartAndInstall(true);
            }
          } else {
            this.state.update((state) => {
              state.isFailed = true;
            });
          }
          return doUpdateResult;
        }
        async tryRemoveOldPackage() {
          try {
            const files = await import_node_fs10.default.promises.readdir(this.updaterDirPath);
            for (const file of files) {
              try {
                const oldPath = import_node_path9.default.resolve(this.updaterDirPath, file);
                await import_node_fs10.default.promises.rm(oldPath, { recursive: true, force: true });
              } catch {
              }
            }
          } catch {
          }
          try {
            const tempFiles = await import_node_fs10.default.promises.readdir(import_node_os5.default.tmpdir());
            const updateFiles = tempFiles.filter((t2) => t2.startsWith("SodaMusicNew_"));
            for (const file of updateFiles) {
              try {
                const oldPath = import_node_path9.default.resolve(import_node_os5.default.tmpdir(), file);
                await import_node_fs10.default.promises.rm(oldPath, { recursive: true, force: true });
              } catch {
              }
            }
          } catch {
          }
        }
        async doUpdateWindows(info, startTime, targetVersion) {
          logger.info("update", (b2) => b2.text("start full package download"));
          protocolOf("applog" /* applog */).report({
            event: "update_metrics",
            params: {
              type: "start_update",
              cost: performance.now() - startTime,
              target_version: targetVersion
            }
          });
          protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "\u4E0B\u8F7D\u4E2D");
          let updaterPath;
          try {
            await import_node_fs10.default.promises.mkdir(this.updaterDirPath, { recursive: true });
            updaterPath = import_node_path9.default.join(this.updaterDirPath, `SodaMusicNew_${nanoid()}.exe`);
            const response = await axios_default.get(info.url, { responseType: "stream" });
            const p2 = (0, import_progress_stream2.default)({
              length: Number.parseInt(response.headers["content-length"]?.toString() ?? "0", 10),
              time: 32
            });
            p2.on("progress", (progress3) => {
              this.state.update((state) => {
                state.progress = { ...progress3 };
              });
            });
            await (0, import_promises3.pipeline)(response.data, p2, import_node_fs10.default.createWriteStream(updaterPath, { flags: "a+" }));
            protocolOf("applog" /* applog */).report({
              event: "update_metrics",
              params: {
                type: "downloaded",
                cost: performance.now() - startTime,
                target_version: targetVersion
              }
            });
          } catch (e) {
            protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "\u4E0B\u8F7D\u5931\u8D25");
            logger.error("update", e);
            protocolOf("applog" /* applog */).report({
              event: "update_metrics",
              params: {
                type: "download_error",
                cost: performance.now() - startTime,
                reason: e.message,
                target_version: targetVersion
              }
            });
            return false;
          }
          protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "\u6267\u884C\u5B89\u88C5\u7A0B\u5E8F");
          try {
            const { stdout, stderr } = await import_node_util2.default.promisify(import_node_child_process.default.execFile)(updaterPath, ["/VERYSILENT"]);
            logger.info("update", (b2) => b2.bold("exec updater.exe").text(`stdout: ${stdout}`).text(`stderr: ${stderr}`));
            protocolOf("applog" /* applog */).report({
              event: "update_metrics",
              params: {
                type: "installed",
                cost: performance.now() - startTime,
                target_version: targetVersion
              }
            });
          } catch (e) {
            protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "\u5B89\u88C5\u5931\u8D25");
            logger.error("update", e);
            protocolOf("applog" /* applog */).report({
              event: "update_metrics",
              params: {
                type: "install_error",
                cost: performance.now() - startTime,
                reason: e.message,
                target_version: targetVersion
              }
            });
            return false;
          }
          return "full";
        }
        async doUpdateMac(info, startTime, targetVersion) {
          logger.info("update", (b2) => b2.text("start full package download with squirrel"));
          protocolOf("applog" /* applog */).report({
            event: "update_metrics",
            params: {
              type: "squirrel_start_update",
              cost: performance.now() - startTime,
              target_version: targetVersion
            }
          });
          import_electron28.autoUpdater.removeAllListeners();
          protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "update with autoUpdater");
          return await new Promise((resolve) => {
            import_electron28.autoUpdater.on("error", (error) => {
              protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "autoUpdater \u66F4\u65B0\u5931\u8D25");
              logger.error("update", error);
              protocolOf("applog" /* applog */).report({
                event: "update_metrics",
                params: {
                  type: "squirrel_error",
                  reason: `:${error.message}`,
                  cost: performance.now() - startTime,
                  target_version: targetVersion
                }
              });
              resolve(false);
            });
            import_electron28.autoUpdater.once("update-available", () => {
              protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "autoUpdater \u5373\u5C06\u62C9\u53D6\u66F4\u65B0");
              protocolOf("applog" /* applog */).report({
                event: "update_metrics",
                params: {
                  type: "squirrel_available",
                  cost: performance.now() - startTime,
                  target_version: targetVersion
                }
              });
              logger.info("update", (b2) => b2.text("autoUpdater: update available"));
            });
            import_electron28.autoUpdater.once("checking-for-update", () => {
              protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "autoUpdater \u68C0\u67E5\u66F4\u65B0\u4E2D");
              protocolOf("applog" /* applog */).report({
                event: "update_metrics",
                params: {
                  type: "squirrel_checking",
                  cost: performance.now() - startTime,
                  target_version: targetVersion
                }
              });
              logger.info("update", (b2) => b2.text("autoUpdater: checking for update"));
            });
            import_electron28.autoUpdater.once("update-not-available", () => {
              protocolOf("applog" /* applog */).report({
                event: "update_metrics",
                params: {
                  type: "squirrel_not_available",
                  cost: performance.now() - startTime,
                  target_version: targetVersion
                }
              });
              logger.info("update", (b2) => b2.text("autoUpdater: update not available"));
              resolve(false);
            });
            import_electron28.autoUpdater.once("update-downloaded", () => {
              protocolOf("sharedState" /* sharedState */).updateDebug("updateProgress", "autoUpdater \u4E0B\u8F7D\u5B8C\u6210\uFF0C\u53EF\u66F4\u65B0");
              protocolOf("applog" /* applog */).report({
                event: "update_metrics",
                params: {
                  type: "squirrel_downloaded",
                  cost: performance.now() - startTime,
                  target_version: targetVersion
                }
              });
              resolve("full");
            });
            if (info.feedUrl) {
              import_electron28.autoUpdater.setFeedURL({ url: info.feedUrl });
              import_electron28.autoUpdater.checkForUpdates();
            } else {
              protocolOf("applog" /* applog */).report({
                event: "update_metrics",
                params: {
                  type: "squirrel_no_feed",
                  cost: performance.now() - startTime,
                  target_version: targetVersion
                }
              });
            }
          });
        }
      }

class UpdateServiceProtocol extends ServiceProtocol {
        checkUpdate() {
          return this.service.checkUpdate(true);
        }
        ignoreUpdate() {
          return this.service.ignoreUpdate();
        }
        restartAndInstall() {
          return this.service.restartAndInstall(false);
        }
      }

export {
  UpdateService,
  UpdateServiceProtocol
};
