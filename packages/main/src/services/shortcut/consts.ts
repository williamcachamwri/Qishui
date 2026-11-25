// src/services/shortcut/consts.ts
// @ts-nocheck
import { getValueByPlatform } from "../../utils/value";
import "./type";

let defaultShortcutSettings: any = {
        isGlobalShortcutEnabled: false,
        get shortcuts() {
          return {
            ["PlayOrPause" /* PlayOrPause */]: {
              inApp: getValueByPlatform("Space", "Space"),
              global: getValueByPlatform("Ctrl+Alt+P", "Cmd+Option+P")
            },
            ["PrevTrack" /* PrevTrack */]: {
              inApp: getValueByPlatform("Ctrl+Left", "Cmd+Left"),
              global: getValueByPlatform("Ctrl+Alt+Left", "Cmd+Option+Left")
            },
            ["NextTrack" /* NextTrack */]: {
              inApp: getValueByPlatform("Ctrl+Right", "Cmd+Right"),
              global: getValueByPlatform("Ctrl+Alt+Right", "Cmd+Option+Right")
            },
            ["VolumeUp" /* VolumeUp */]: {
              inApp: getValueByPlatform("Ctrl+Up", "Cmd+Up"),
              global: getValueByPlatform("Ctrl+Alt+Up", "Cmd+Option+Up")
            },
            ["VolumeDown" /* VolumeDown */]: {
              inApp: getValueByPlatform("Ctrl+Down", "Cmd+Down"),
              global: getValueByPlatform("Ctrl+Alt+Down", "Cmd+Option+Down")
            },
            ["Like" /* Like */]: {
              inApp: getValueByPlatform("Ctrl+L", "Cmd+L"),
              global: getValueByPlatform("Ctrl+Alt+L", "Cmd+Option+L")
            },
            ["Dislike" /* Dislike */]: {
              inApp: getValueByPlatform("Ctrl+D", "Cmd+D"),
              global: ""
            }
          };
        }
      };

let shortcutStrBlockList: any = [
        "Ctrl+C",
        "Ctrl+X",
        "Ctrl+V",
        "Cmd+C",
        "Cmd+X",
        "Cmd+V"
      ];

export {
  defaultShortcutSettings,
  shortcutStrBlockList
};
