// src/services/window/builders/main.ts
// @ts-nocheck
import { __require, __toESM, require_bdms } from "../../../../../vendor/index";

let import_electron13: any = __require("electron");

let bdms2: any = __toESM(require_bdms());

let mainWindowBuilder: any = {
        build: async (context) => {
          const win = new import_electron13.BrowserWindow({
            width: 1100,
            height: 720,
            ...context.defaultOptions,
            minWidth: 1e3,
            minHeight: 600,
            backgroundColor: "rgb(18, 18, 18)",
            title: "\u6C7D\u6C34\u97F3\u4E50",
            ...process.platform === "darwin" ? {
              titleBarStyle: "hiddenInset"
            } : {
              titleBarStyle: "hidden",
              autoHideMenuBar: true
            }
          });
          win.webContents.session.webRequest.onHeadersReceived(
            {
              urls: ["*://*/*"]
            },
            async (detail, callback) => {
              if (!detail.responseHeaders) {
                callback(detail);
                return;
              }
              detail.responseHeaders = Object.fromEntries(Object.entries(detail.responseHeaders).map(([key, value]) => [key.toLowerCase(), value]));
              const cookie = detail.responseHeaders["set-cookie"] ?? [];
              for (const [index, item] of cookie.entries()) {
                if (!item.toLowerCase().includes("SameSite=None".toLowerCase())) {
                  cookie[index] = `${item}; SameSite=None; Secure`;
                }
              }
              detail.responseHeaders["access-control-allow-origin"] = ["*"];
              detail.responseHeaders["access-control-expose-headers"] = ["*"];
              if (cookie) {
                for (const handler of context.windowService.loginCookieUpdateHandlers) {
                  handler(cookie, detail);
                }
              }
              callback(detail);
            }
          );
          win.on("focus", () => {
            bdms2.report("switch_foreground");
          });
          win.on("close", (e) => {
            if (process.platform === "darwin") {
              if (!context.windowService.isExiting) {
                if (win.isFullScreen()) {
                  win.once("leave-full-screen", () => win.hide());
                  win.setFullScreen(false);
                } else {
                  win.hide();
                }
                e.preventDefault();
              }
            } else {
              if (context.windowService.state.value.closeActionType === "exit") {
                import_electron13.app.quit();
              } else {
                if (!context.windowService.isExiting) {
                  win.hide();
                  e.preventDefault();
                }
              }
            }
          });
          win.on("page-title-updated", (e) => e.preventDefault());
          win.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
            return callback(true);
          });
          win.webContents.session.setPermissionCheckHandler((weContents, permission) => {
            return true;
          });
          win.loadURL(context.url);
          return win;
        },
        singleton: true,
        persistentSize: true
      };

export {
  mainWindowBuilder
};
