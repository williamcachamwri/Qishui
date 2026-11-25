// src/services/window/builders/taskbarWidget.ts
// @ts-nocheck
import { __require } from "../../../../../vendor/index";

let import_electron19: any = __require("electron");

let taskbarWidgetWindowBuilder: any = {
        build: async (context) => {
          const isMac = process.platform === "darwin";
          const win = new import_electron19.BrowserWindow({
            ...context.defaultOptions,
            width: isMac ? 248 : 1,
            height: isMac ? 48 : 1,
            ...isMac ? {
              minWidth: 108,
              minHeight: 48,
              maxHeight: 48,
              movable: true,
              type: "panel"
            } : {},
            show: false,
            title: "",
            resizable: isMac,
            maximizable: false,
            minimizable: false,
            focusable: isMac,
            skipTaskbar: true,
            fullscreenable: false,
            autoHideMenuBar: true,
            roundedCorners: false,
            hasShadow: false,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            webPreferences: {
              ...context.defaultOptions.webPreferences,
              zoomFactor: 1
            }
          });
          if (process.platform === "win32") {
            const WM_INITMENU = 278;
            win.hookWindowMessage(WM_INITMENU, () => {
              win.setEnabled(false);
              win.setEnabled(true);
            });
          }
          win.loadURL(context.url);
          return win;
        },
        singleton: true
      };

export {
  taskbarWidgetWindowBuilder
};
