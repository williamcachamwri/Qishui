// src/services/desktopLyrics/desktopLyrics.ts
// @ts-nocheck
import { __require } from "../../../../vendor/index";
import { Service, ServiceProtocol } from "../base";
import { protocolOf, serviceOf } from "../index";
import "../serviceId";
import { State } from "../../base/state/state";
import { initialSharedState } from "../sharedState/initialState";
import "../storage/type";
import { AsyncCell } from "../../utils/asyncCell";
import { isPopularOS } from "../../utils/os";
import "../window/type";
import { desktopLyricsColorSet, desktopLyricsFontSizeSet, desktopLyricsFontSizeWidthMap } from "./type";

let import_electron29: any = __require("electron");

class DesktopLyricsService extends Service {
        state = new State(initialSharedState.desktopLyrics);
        initialized = new AsyncCell();
        height = 0;
        constructor() {
          super();
          this.state.onUpdateBatched((state) => {
            protocolOf("sharedState" /* sharedState */).update("desktopLyrics", state);
            protocolOf("storage" /* storage */).set("Config" /* config */, "desktopLyrics", state.settings);
          });
        }
        async initialize() {
          const settings = await protocolOf("storage" /* storage */).get("Config" /* config */, "desktopLyrics");
          if (settings) {
            this.state.update((state) => {
              state.settings = settings;
            });
          }
          this.initialized.resolve();
          if (!isPopularOS()) {
            return;
          }
          setInterval(() => {
            if (!this.state.value.settings.enabled) {
              return;
            }
            const win = serviceOf("window" /* window */).getBrowserWindow("desktopLyrics" /* desktopLyrics */);
            if (!win) {
              return;
            }
            const bounds = win.getBounds();
            const cursor = import_electron29.screen.getCursorScreenPoint();
            const inRect = cursor.x > bounds.x && cursor.x < bounds.x + bounds.width && cursor.y > bounds.y && cursor.y < bounds.y + this.height;
            if (inRect) {
              if (!this.state.value.hover) {
                win.setIgnoreMouseEvents(this.state.value.settings.isLocked, { forward: true });
                this.state.update((state) => {
                  state.hover = true;
                });
              }
            } else {
              if (this.state.value.hover) {
                win.setIgnoreMouseEvents(true, { forward: true });
                this.state.update((state) => {
                  state.hover = false;
                });
              }
            }
          }, 30);
          setInterval(() => {
            const win = serviceOf("window" /* window */).getBrowserWindow("desktopLyrics" /* desktopLyrics */);
            if (!win) {
              return;
            }
            win.setAlwaysOnTop(true);
          }, 1e3);
          if (this.state.value.settings.enabled) {
            this.show();
          }
        }
        show() {
          protocolOf("window" /* window */).showWindow("desktopLyrics" /* desktopLyrics */);
          this.state.update((state) => {
            state.settings.enabled = true;
          });
        }
        hide() {
          protocolOf("window" /* window */).close("desktopLyrics" /* desktopLyrics */);
          this.state.update((state) => {
            state.settings.enabled = false;
          });
        }
      }

class DesktopLyricsServiceProtocol extends ServiceProtocol {
        async toggleDesktopLyrics() {
          if (this.service.state.value.settings.enabled) {
            this.service.hide();
          } else {
            this.service.show();
          }
        }
        async setSettings(key, value) {
          this.service.state.update((state) => {
            state.settings[key] = value;
          });
          if (key === "textSize") {
            const win = serviceOf("window" /* window */).getBrowserWindow("desktopLyrics" /* desktopLyrics */);
            if (!win) {
              return;
            }
            win.setBounds({
              width: desktopLyricsFontSizeWidthMap[this.service.state.value.settings.textSize]
            });
          }
        }
        async showMenu(position5) {
          const menu = import_electron29.Menu.buildFromTemplate([
            {
              label: "\u5B57\u4F53\u5927\u5C0F",
              submenu: desktopLyricsFontSizeSet.map((size) => ({
                type: "radio",
                label: String(size),
                checked: this.service.state.value.settings.textSize === size,
                click: () => this.setSettings("textSize", size)
              }))
            },
            {
              label: "\u6587\u5B57\u989C\u8272",
              submenu: desktopLyricsColorSet.map(({ label, key }) => ({
                type: "radio",
                label,
                checked: this.service.state.value.settings.textColor === key,
                click: () => this.setSettings("textColor", key)
              }))
            },
            {
              type: "checkbox",
              label: "\u7FFB\u8BD1\u6B4C\u8BCD",
              checked: this.service.state.value.settings.showTranslation,
              click: () => this.setSettings("showTranslation", !this.service.state.value.settings.showTranslation)
            }
          ]);
          this.service.state.update((state) => {
            state.menuVisible = true;
          });
          const win = serviceOf("window" /* window */).getBrowserWindow("desktopLyrics" /* desktopLyrics */);
          if (!win) {
            return;
          }
          menu.popup({
            window: win,
            x: position5.x,
            y: position5.y,
            callback: () => {
              this.service.state.update((state) => {
                state.menuVisible = false;
              });
            }
          });
        }
        async toggleLocked() {
          this.service.state.update((state) => {
            state.settings.isLocked = !state.settings.isLocked;
          });
          this.setLyricsClickable(!this.service.state.value.settings.isLocked);
        }
        async resetToDefault() {
          this.service.state.update((state) => {
            delete state.settings.position;
            state.settings.showTranslation = initialSharedState.desktopLyrics.settings.showTranslation;
            state.settings.textColor = initialSharedState.desktopLyrics.settings.textColor;
            state.settings.textSize = initialSharedState.desktopLyrics.settings.textSize;
            state.settings.isLocked = initialSharedState.desktopLyrics.settings.isLocked;
          });
        }
        async updateHeight(height) {
          this.service.height = height;
        }
        async setLyricsClickable(v2) {
          const win = serviceOf("window" /* window */).getBrowserWindow("desktopLyrics" /* desktopLyrics */);
          if (!win) {
            return;
          }
          win.setIgnoreMouseEvents(!v2, { forward: true });
        }
      }

export {
  DesktopLyricsService,
  DesktopLyricsServiceProtocol
};
