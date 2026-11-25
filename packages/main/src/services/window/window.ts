// src/services/window/window.ts
// @ts-nocheck
import { __require, __toESM } from "../../../../vendor/index";
import { getGlobalConfig } from "../../base/globalConfig/value";
import { Service, ServiceProtocol } from "../base";
import { StorageState } from "../../base/storage/storageState";
import "../storage/type";
import { logger } from "../../utils/logger";
import { initialSharedState } from "../sharedState/initialState";
import { State } from "../../base/state/state";
import { protocolOf } from "../index";
import "../serviceId";
import { AsyncCell } from "../../utils/asyncCell";
import "./type";
import { windowBuilders } from "./builders/index";
import { getResourcesPath } from "../../utils/resources";
import { handleDeeplink } from "../../libs/deeplink/handlers";
import { tryHandleColdStartDeeplink } from "../../libs/deeplink/utils";

let import_node_path4: any = __toESM(__require("node:path"));

let import_node_fs4: any = __toESM(__require("node:fs"));

let import_node_url: any = __require("node:url");

let import_electron22: any = __require("electron");

let FORCE_ENABLE_DEVTOOLS: any = import_electron22.app.commandLine.hasSwitch("dangerously-enable-top-secret-devtool");

let DEVTOOLS_ENABLED: any = FORCE_ENABLE_DEVTOOLS || process.env.QISHUI_DEV === "1";

let WINDOW_CLOSED_BEFORE_READY_ERROR_PREFIX: any = "window closed before ready:";

class WindowService extends Service {
        tray;
        isExiting = false;
        loginCookieUpdateHandlers = [];
        closeActionType = new StorageState("Config" /* config */, "closeActionType", "tray");
        state = new State(initialSharedState.window);
        windows = /* @__PURE__ */ new Map();
        preventShowWindows = /* @__PURE__ */ new Set();
        pendingCloseWindows = /* @__PURE__ */ new Set();
        constructor() {
          super();
          this.state.onUpdateBatched((state) => {
            protocolOf("sharedState" /* sharedState */).update("window", state);
          });
          import_electron22.app.on("second-instance", (e, argv) => {
            const url2 = argv[argv.length - 1];
            if (url2.startsWith("luna://")) {
              const urlInfo = new import_node_url.URL(url2);
              if (urlInfo.pathname === "/sso") {
                const code = urlInfo.searchParams.get("code");
                if (code) {
                  protocolOf("internalCheck" /* internalCheck */).receiveCode(code);
                }
                return;
              }
              handleDeeplink(url2);
              return;
            }
            this.showOrCreate("main" /* main */);
            const lastArg = argv[argv.length - 1];
            if (lastArg?.startsWith("luna:action=")) {
              protocolOf("notification" /* notification */).handleNotificationAction(lastArg.split("=")[1]);
            }
          });
          import_electron22.app.on("open-url", (event, url2) => {
            const urlInfo = new import_node_url.URL(url2);
            if (urlInfo.pathname === "/sso") {
              const code = urlInfo.searchParams.get("code");
              if (code) {
                protocolOf("internalCheck" /* internalCheck */).receiveCode(code);
              }
              return;
            }
            handleDeeplink(url2);
          });
          import_electron22.app.on("before-quit", () => {
            this.isExiting = true;
          });
          import_electron22.app.on("window-all-closed", () => {
          });
          import_electron22.powerMonitor.on("lock-screen", () => {
            this.state.update((state) => {
              state.isInactive = true;
            });
          });
          import_electron22.powerMonitor.on("unlock-screen", () => {
            this.state.update((state) => {
              state.isInactive = false;
            });
          });
        }
        async initialize() {
          await import_electron22.app.whenReady();
          import_electron22.nativeTheme.themeSource = "dark";
          this.setupResourceInterceptor();
          this.setupTrayIcon();
          this.setupMenu();
          tryHandleColdStartDeeplink();
          const closeActionType = await this.closeActionType.getWhenReady();
          this.state.update((state) => {
            state.closeActionType = closeActionType;
          });
        }
        setupMenu() {
          if (process.platform !== "darwin") {
            return;
          }
          const menu = import_electron22.Menu.buildFromTemplate([
            {
              label: "\u6C7D\u6C34\u97F3\u4E50",
              submenu: [
                { role: "about", label: "\u5173\u4E8E" },
                { type: "separator" },
                { role: "quit", label: "\u9000\u51FA\u6C7D\u6C34\u97F3\u4E50" }
              ]
            },
            {
              label: "\u6587\u4EF6",
              submenu: [
                { label: "\u663E\u793A\u6C7D\u6C34\u97F3\u4E50", click: () => this.showOrCreate("main" /* main */) },
                { type: "separator" },
                { role: "close", label: "\u5173\u95ED\u7A97\u53E3" }
              ]
            },
            // { role: 'editMenu' }
            {
              label: "\u7F16\u8F91",
              submenu: [
                { role: "undo", label: "\u64A4\u9500" },
                { role: "redo", label: "\u91CD\u505A" },
                { type: "separator" },
                { role: "cut", label: "\u526A\u5207" },
                { role: "copy", label: "\u62F7\u8D1D" },
                { role: "paste", label: "\u7C98\u8D34" },
                { role: "delete", label: "\u5220\u9664" },
                { role: "selectAll", label: "\u5168\u9009" }
              ]
            },
            // { role: 'viewMenu' }
            {
              label: "\u89C6\u56FE",
              submenu: [
                { role: "togglefullscreen", label: "\u8FDB\u5165\u5168\u5C4F\u5E55" },
                ...DEVTOOLS_ENABLED ? [{ role: "toggleDevTools" }] : []
              ]
            },
            // { role: 'windowMenu' }
            {
              label: "\u7A97\u53E3",
              submenu: [
                { role: "minimize", label: "\u6700\u5C0F\u5316" },
                { role: "hide", label: "\u9690\u85CF" },
                { type: "separator" },
                { role: "front", label: "\u524D\u7F6E\u5168\u90E8\u7A97\u53E3" }
              ]
            },
            {
              role: "help",
              label: "\u5E2E\u52A9",
              submenu: [
                {
                  label: "\u6C7D\u6C34\u97F3\u4E50\u5B98\u7F51",
                  click: async () => {
                    import_electron22.shell.openExternal("https://qishui.com");
                  }
                }
              ]
            }
          ]);
          import_electron22.Menu.setApplicationMenu(menu);
        }
        setupTrayIcon() {
          if (process.platform === "win32") {
            this.tray = new import_electron22.Tray(false ? import_node_path4.default.resolve("resources/icon.ico") : import_node_path4.default.resolve(import_electron22.app.getAppPath(), "../icon.ico"));
            const contextMenu = import_electron22.Menu.buildFromTemplate([
              {
                label: "\u6253\u5F00\u6C7D\u6C34\u97F3\u4E50",
                click: () => this.showOrCreate("main" /* main */)
              },
              { label: "\u9000\u51FA", click: () => import_electron22.app.exit() }
            ]);
            this.tray.setToolTip("\u6C7D\u6C34\u97F3\u4E50");
            this.tray.setContextMenu(contextMenu);
            this.tray.on("click", () => this.showOrCreate("main" /* main */));
          }
        }
        setupResourceInterceptor() {
          import_electron22.session.defaultSession.protocol.registerFileProtocol("app", async (request2, callback) => {
            const requestUrl = new import_node_url.URL(request2.url);
            if (requestUrl.hostname === "resources") {
              const relativePath = requestUrl.pathname.slice(1);
              callback({
                path: await getResourcesPath(relativePath)
              });
              return;
            }
            callback({
              error: 404
            });
          });
        }
        getRendererResourceUrl(id) {
          if (false) {
            return `http://127.0.0.1:${process.env.PORT ?? "7777"}/${id}.html`;
          } else {
            return `app://resources/${id}.asar/${id}.html`;
          }
        }
        createOrUpdatePreloadScript(id, args) {
          const preloadPath = import_node_path4.default.join(import_electron22.app.getPath("temp"), "sodamusic-preloads", `${id}.js`);
          import_node_fs4.default.mkdirSync(import_node_path4.default.dirname(preloadPath), { recursive: true });
          import_node_fs4.default.rmSync(preloadPath, { force: true });
          const script = `const channel = new MessageChannel()
window.processCreationTime = process.getCreationTime()
window.transportPort = {
  registerTransport: (namespace) => require('electron').ipcRenderer.postMessage(namespace + '.port', null, [channel.port2]),
  sendTransport: (data) => channel.port1.postMessage(data),
  receiveTransport: (callback) => {
    channel.port1.onmessage = (e) => {
      callback(e.data)
    }
  },
}
window.onkeydown = (e) => {
  if ((e.code == "Minus" || e.code == "Equal") && (e.ctrlKey || e.metaKey)) {e.preventDefault()}
}
window.__injected_data__ = ${JSON.stringify(args.injectedData)}
`;
          import_node_fs4.default.writeFileSync(preloadPath, script);
          return preloadPath;
        }
        updateInjectedData(id, injectedData) {
          const win = this.windows.get(id);
          if (!win) {
            logger.error("window", `failed to handle injected data change, window \`${id}\` not found`);
            return;
          }
          this.createOrUpdatePreloadScript(id, { injectedData });
          win.browserWindow?.webContents.executeJavaScript(`window.__injected_data__ = ${JSON.stringify(injectedData)}`);
          win.browserWindow?.webContents.executeJavaScript(`document.dispatchEvent(new Event('injected-data-updated'))`);
        }
        buildWindowUrl(id, options = {}) {
          const url2 = new import_node_url.URL(this.getRendererResourceUrl(id));
          url2.searchParams.set("global_config", JSON.stringify(getGlobalConfig()));
          if (options.eventParams) {
            url2.searchParams.set("et_params", JSON.stringify(options.eventParams));
          }
          for (const [key, value] of Object.entries(options.extra ?? {})) {
            url2.searchParams.set(key, String(value));
          }
          return url2.toString();
        }
        async createWindow(id, options = {}, createBehavior = {}) {
          const builder = windowBuilders[id];
          const info = { ready: new AsyncCell() };
          this.windows.set(id, info);
          try {
            const urlStr = this.buildWindowUrl(id, options);
            const sizePersistentKey = `windowSize:${id}`;
            const positionPersistentKey = `windowPosition:${id}`;
            const persistentSize = await protocolOf("storage" /* storage */).get("Config" /* config */, sizePersistentKey);
            const persistentPosition = await protocolOf("storage" /* storage */).get("Config" /* config */, positionPersistentKey);
            let result;
            const closeSignal = new AsyncCell();
            const win = await builder.build({
              url: urlStr,
              windowService: this,
              defaultOptions: {
                show: false,
                ...persistentSize ? {
                  width: persistentSize.width,
                  height: persistentSize.height
                } : {},
                ...persistentPosition ? {
                  x: persistentPosition.x,
                  y: persistentPosition.y
                } : {},
                ...builder.preset === "fixed-dialog" ? {
                  resizable: false,
                  maximizable: false,
                  minimizable: false,
                  parent: options.parentWindow ? this.getBrowserWindow(options.parentWindow) : void 0,
                  fullscreenable: false,
                  autoHideMenuBar: true,
                  titleBarStyle: process.platform === "win32" ? "hidden" : "hiddenInset"
                } : builder.preset === "fixed-dialog-with-titlebar" ? {
                  resizable: false,
                  maximizable: false,
                  minimizable: false,
                  parent: options.parentWindow ? this.getBrowserWindow(options.parentWindow) : void 0,
                  fullscreenable: false,
                  autoHideMenuBar: true
                } : {},
                webPreferences: {
                  devTools: DEVTOOLS_ENABLED,
                  contextIsolation: false,
                  preload: this.createOrUpdatePreloadScript(id, { injectedData: options.injectedData }),
                  webSecurity: false
                }
              },
              setResult: (v2) => result = v2,
              withDefaultPosition: !!persistentPosition,
              withDefaultSize: !!persistentSize
            });
            if (this.preventShowWindows.has(id)) {
              logger.info("window", (b2) => b2.bold(id).text("is prevent show, closing..."));
              info.ready?.reject(new Error(`window ${id} prevented from showing`));
              win.destroy();
              this.windows.delete(id);
              return;
            }
            if (this.pendingCloseWindows.has(id)) {
              logger.info("window", (b2) => b2.bold(id).text("was requested to close before ready, destroying..."));
              this.pendingCloseWindows.delete(id);
              info.ready?.reject(new Error(`${WINDOW_CLOSED_BEFORE_READY_ERROR_PREFIX}${id}`));
              win.destroy();
              this.windows.delete(id);
              return;
            }
            info.browserWindow = win;
            info.ready?.resolve(win);
            this.state.update((state) => {
              state.windows[id] = {
                isFullScreen: win.isFullScreen(),
                isMaximize: win.isMaximized(),
                isMinimize: win.isMinimized(),
                isFocus: win.isFocused(),
                isMaximizable: win.isMaximizable(),
                isMinimizable: win.isMinimizable(),
                isClosable: win.isClosable(),
                isHidden: win.isVisible()
              };
            });
            win.webContents.setWindowOpenHandler((e) => {
              import_electron22.shell.openExternal(e.url);
              return {
                action: "deny"
              };
            });
            if (builder.persistentSize) {
              win.on("resized", () => {
                const [width, height] = win.getSize();
                if (!win.isFullScreen()) {
                  protocolOf("storage" /* storage */).set("Config" /* config */, sizePersistentKey, { width, height });
                }
              });
            }
            if (builder.persistentPosition) {
              win.on("moved", () => {
                const [x2, y2] = win.getPosition();
                if (!win.isFullScreen()) {
                  protocolOf("storage" /* storage */).set("Config" /* config */, positionPersistentKey, { x: x2, y: y2 });
                }
              });
            }
            win.on("focus", () => {
              this.state.update((state) => {
                state.isInactive = false;
                const winState = state.windows[id];
                if (!winState) {
                  return;
                }
                winState.isFocus = true;
              });
            });
            win.on("blur", () => {
              this.state.update((state) => {
                const winState = state.windows[id];
                if (!winState) {
                  return;
                }
                winState.isFocus = false;
              });
            });
            win.on("minimize", () => {
              this.state.update((state) => {
                const winState = state.windows[id];
                if (!winState) {
                  return;
                }
                winState.isMinimize = true;
              });
            });
            win.on("restore", () => {
              this.state.update((state) => {
                const winState = state.windows[id];
                if (!winState) {
                  return;
                }
                winState.isMinimize = false;
              });
            });
            win.on("maximize", () => {
              this.state.update((state) => {
                const winState = state.windows[id];
                if (!winState) {
                  return;
                }
                winState.isMaximize = true;
              });
            });
            win.on("unmaximize", () => {
              this.state.update((state) => {
                const winState = state.windows[id];
                if (!winState) {
                  return;
                }
                winState.isMaximize = false;
              });
            });
            win.on("hide", () => {
              console.log("winhide");
              this.state.update((state) => {
                const winState = state.windows[id];
                if (!winState) {
                  return;
                }
                winState.isHidden = true;
              });
            });
            win.on("show", () => {
              this.state.update((state) => {
                const winState = state.windows[id];
                if (!winState) {
                  return;
                }
                winState.isHidden = false;
              });
            });
            win.on("closed", () => {
              this.state.update((state) => {
                delete state.windows[id];
              });
              this.windows.delete(id);
              closeSignal.resolve();
            });
            if (createBehavior.autoShow !== false) {
              if (false) {
                win.show();
              } else {
                win.on("ready-to-show", () => {
                  logger.info("window renderer", (b2) => b2.text("event: ready-to-show"));
                  win.show();
                });
              }
            }
            await closeSignal.get();
            return result;
          } catch (error) {
            if (!info.ready?.isDone() && !info.ready?.isError()) {
              info.ready?.reject(error);
            }
            this.windows.delete(id);
            throw error;
          }
        }
        getBrowserWindow(id) {
          return this.windows.get(id)?.browserWindow;
        }
        async waitForWindow(id) {
          const info = this.windows.get(id);
          if (!info?.ready) return null;
          return info.ready.get();
        }
        async showOrCreateAndWaitForReady(id, params = {}) {
          const showTask = this.showOrCreate(id, params);
          showTask.catch(() => {
          });
          try {
            return await this.waitForWindow(id);
          } catch (error) {
            if (error instanceof Error && error.message === `${WINDOW_CLOSED_BEFORE_READY_ERROR_PREFIX}${id}`) {
              return null;
            }
            throw error;
          }
        }
        async createOrWaitForReady(id, params = {}) {
          if (this.preventShowWindows.has(id)) {
            logger.info("window", (b2) => b2.text("prevent create").bold(id));
            return null;
          }
          this.pendingCloseWindows.delete(id);
          const win = this.windows.get(id);
          if (win) {
            if (win.browserWindow) {
              this.updateInjectedData(id, params.injectedData);
            }
          } else {
            const createTask = this.createWindow(id, params, { autoShow: false });
            createTask.catch(() => {
            });
          }
          try {
            return await this.waitForWindow(id);
          } catch (error) {
            if (error instanceof Error && error.message === `${WINDOW_CLOSED_BEFORE_READY_ERROR_PREFIX}${id}`) {
              return null;
            }
            throw error;
          }
        }
        async showOrCreate(id, params = {}) {
          if (this.preventShowWindows.has(id)) {
            logger.info("window", (b2) => b2.text("prevent show").bold(id));
            return;
          }
          this.pendingCloseWindows.delete(id);
          const win = this.windows.get(id);
          if (win) {
            logger.info("window", (b2) => b2.text("show exists window").bold(id).text(win.browserWindow ? "success" : "fail"));
            if (!win.browserWindow) {
              return;
            }
            this.updateInjectedData(id, params.injectedData);
            if (win.browserWindow.isMinimized()) {
              win.browserWindow.restore();
            }
            win.browserWindow.setAlwaysOnTop(true);
            import_electron22.app.focus();
            win.browserWindow.setAlwaysOnTop(false);
            win.browserWindow.show();
          } else {
            logger.info("window", (b2) => b2.text("create new window").bold(id));
            await this.createWindow(id, params);
          }
        }
        markExiting() {
          logger.info("window", (b2) => b2.text("mark exiting"));
          this.isExiting = true;
        }
      }

class WindowServiceProtocol extends ServiceProtocol {
        async showWindow(id, options = {}) {
          return this.service.showOrCreate(id, options);
        }
        async showWindowAndWaitForReady(id, options = {}) {
          await this.service.showOrCreateAndWaitForReady(id, options);
        }
        async handleLoginCookieUpdate(handler) {
          this.service.loginCookieUpdateHandlers.push(handler);
        }
        async openDevTools(id) {
          if (!DEVTOOLS_ENABLED) {
            return;
          }
          this.service.getBrowserWindow(id)?.webContents.openDevTools({
            mode: "detach"
          });
        }
        // async reloadRenderer() {
        //   this.service.rendererWindow?.reload()
        // }
        async relaunchApp() {
          import_electron22.app.relaunch();
          import_electron22.app.exit();
        }
        async setFullscreen(id, v2) {
          this.service.getBrowserWindow(id)?.setFullScreen(v2);
        }
        async unmaximize(id) {
          this.service.getBrowserWindow(id)?.unmaximize();
        }
        async maximize(id) {
          this.service.getBrowserWindow(id)?.maximize();
        }
        async restore(id) {
          this.service.getBrowserWindow(id)?.restore();
        }
        async minimize(id) {
          this.service.getBrowserWindow(id)?.minimize();
        }
        async close(id) {
          const win = this.service.getBrowserWindow(id);
          logger.info("window", (b2) => b2.text("close").bold(id).text(win ? "with window" : "without window"));
          if (win) {
            this.service.pendingCloseWindows.delete(id);
            win.close();
            return;
          }
          this.service.pendingCloseWindows.add(id);
        }
        async destroy(id) {
          const win = this.service.getBrowserWindow(id);
          logger.info("window", (b2) => b2.text("destroy").bold(id).text(win ? "with window" : "without window"));
          win?.destroy();
        }
        async preventShow(id) {
          logger.info("window", (b2) => b2.text("prevent show").bold(id));
          this.service.preventShowWindows.add(id);
          this.destroy(id);
        }
        async getPrimaryScreenData() {
          return import_electron22.screen.getPrimaryDisplay();
        }
        async setCloseActionType(type) {
          this.service.closeActionType.set(type);
          this.service.state.update((state) => {
            state.closeActionType = type;
          });
        }
        async exitApp() {
          import_electron22.app.exit();
        }
        async markExiting() {
          this.service.markExiting();
        }
      }

export {
  WindowService,
  WindowServiceProtocol
};
