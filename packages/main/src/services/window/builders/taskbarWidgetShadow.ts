// src/services/window/builders/taskbarWidgetShadow.ts
// @ts-nocheck
import { __require } from "../../../../../vendor/index";

let import_electron20: any = __require("electron");

let taskbarWidgetShadowWindowBuilder: any = {
        build: async (context) => {
          const win = new import_electron20.BrowserWindow({
            ...context.defaultOptions,
            width: 1,
            height: 1,
            show: false,
            title: "",
            resizable: false,
            maximizable: false,
            minimizable: false,
            focusable: false,
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
  taskbarWidgetShadowWindowBuilder
};
