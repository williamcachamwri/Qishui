// src/services/window/builders/desktopLyrics.ts
// @ts-nocheck
import { __require } from "../../../../../vendor/index";
import { desktopLyricsFontSizeWidthMap } from "../../desktopLyrics/type";
import { protocolOf } from "../../index";
import "../../serviceId";

let import_electron15: any = __require("electron");

let desktopLyricsWindowBuilder: any = {
        build: async (context) => {
          let position5 = context.withDefaultPosition ? {
            x: context.defaultOptions.x ?? 0,
            y: context.defaultOptions.y ?? 0
          } : null;
          const desktopLyricsState = await protocolOf("sharedState" /* sharedState */).get("desktopLyrics");
          const width = desktopLyricsFontSizeWidthMap[desktopLyricsState.settings.textSize];
          const display = import_electron15.screen.getPrimaryDisplay();
          const defaultPosition = {
            x: display.bounds.x + (display.bounds.width / 2 - width / 2),
            y: Math.max(display.bounds.height - 400, 40)
          };
          if (position5) {
            const inBounds = import_electron15.screen.getAllDisplays().some((display2) => {
              if (!position5) {
                return false;
              }
              const xRightIn = position5.x + width < display2.bounds.x + display2.bounds.width;
              const xLeftIn = position5.x > display2.bounds.x;
              const yBottomIn = position5.y < display2.bounds.y + display2.bounds.height - 300;
              const yTopIn = position5.y > display2.bounds.y;
              return xRightIn && xLeftIn && yBottomIn && yTopIn;
            });
            if (!inBounds) {
              position5 = defaultPosition;
            }
          }
          const win = new import_electron15.BrowserWindow({
            ...context.defaultOptions,
            width,
            height: 300,
            ...position5 ? {
              x: position5.x,
              y: position5.y
            } : defaultPosition,
            show: false,
            title: "\u684C\u9762\u6B4C\u8BCD",
            resizable: false,
            maximizable: false,
            minimizable: false,
            skipTaskbar: true,
            fullscreenable: false,
            autoHideMenuBar: true,
            roundedCorners: false,
            hasShadow: false,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            ...process.platform === "darwin" ? { type: "panel" } : {},
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
        persistentPosition: true
      };

export {
  desktopLyricsWindowBuilder
};
