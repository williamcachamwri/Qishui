// src/utils/shortcut.ts
// @ts-nocheck
import { __toESM, require_lodash } from "../../../vendor/index";
import { protocolOf } from "../services/index";
import "../services/collect/type";
import "../services/queue/type";
import "../services/serviceId";
import "../services/shortcut/type";
import "../services/window/type";
import "./value";

function withRateLimit(fn2, minIntervalMs = 500) {
    let lastCallTime = 0;
    return ((...args) => {
      const now = Date.now();
      if (now - lastCallTime < minIntervalMs) {
        return;
      }
      lastCallTime = now;
      return fn2(...args);
    });
  }

function validateShortcutStr(shortcutStr, type) {
    if (shortcutStr === "") {
      return true;
    }
    const keys = shortcutStr.split("+");
    if (!keys.length) {
      return false;
    }
    if (keys.length === 1) {
      return type === "inApp" && normalKeys.includes(shortcutStr);
    }
    if (keys.every((k2) => specialKeys.includes(k2))) {
      return false;
    }
    if (!keys.every((k2, i2) => {
      if (i2 !== 0 && specialKeys.includes(k2) && normalKeys.includes(keys[i2 - 1])) {
        return false;
      }
      return true;
    })) {
      return false;
    }
    const specialKeysLength = keys.filter((k2) => specialKeys.includes(k2)).length;
    const normalKeysLength = keys.filter((k2) => normalKeys.includes(k2)).length;
    if (specialKeysLength === 0 || specialKeysLength > 4) {
      return false;
    }
    if (normalKeysLength !== 1) {
      return false;
    }
    return true;
  }

let import_lodash3: any = __toESM(require_lodash());

let specialKeys: any = ["Cmd", "Ctrl", "Shift", "Option", "Alt"];

let normalKeys: any = [
        ...import_lodash3.default.range(26).map((n2) => String.fromCharCode("A".charCodeAt(0) + n2)),
        // A~Z
        ...import_lodash3.default.range(10).map((n2) => String(n2)),
        // 0~9
        ...import_lodash3.default.range(0, 12).map((n2) => `F${String(n2 + 1)}`),
        // F1~F12
        "`",
        "-",
        "=",
        "[",
        "]",
        "\\",
        // "\"
        ";",
        "'",
        // "'"
        ",",
        ".",
        "/",
        "Up",
        "Down",
        "Left",
        "Right",
        "Space",
        "PageUp",
        "PageDown"
      ];

let allSupportedKeys: any = [...specialKeys, ...normalKeys];

let ShortcutActionFnMap: any = {
        ["PlayOrPause" /* PlayOrPause */]: withRateLimit(() => {
          protocolOf("player" /* player */).togglePlay({ audio_over_status: "hotkey_pause" });
        }),
        ["PrevTrack" /* PrevTrack */]: withRateLimit(() => {
          protocolOf("queue" /* queue */).playPrevious(10 /* hotKeyPrevious */, { audio_over_status: "hotkey_previous" });
        }),
        ["NextTrack" /* NextTrack */]: withRateLimit(() => {
          protocolOf("queue" /* queue */).playNext(9 /* hotkeyNext */, { audio_over_status: "hotkey_next" });
        }),
        ["VolumeUp" /* VolumeUp */]: withRateLimit(() => {
          protocolOf("player" /* player */).increaseVolume(0.05, { action_type: "hotkey" });
        }),
        ["VolumeDown" /* VolumeDown */]: withRateLimit(() => {
          protocolOf("player" /* player */).decreaseVolume(0.05, { action_type: "hotkey" });
        }),
        ["Like" /* Like */]: withRateLimit(() => {
          (async () => {
            const currentPlayable = await protocolOf("queue" /* queue */).getCurrentPlayable();
            const commonParams = await protocolOf("player" /* player */).getCurrentReportParams();
            if (!currentPlayable) {
              return;
            }
            const collectEntity = {
              type: "playable" /* playable */,
              id: currentPlayable.id,
              playable: currentPlayable
            };
            const like = async () => {
              await protocolOf("collect" /* collect */).setCollect([collectEntity], true, {
                event: "group_collect",
                params: {
                  ...commonParams,
                  action_type: "hotkey",
                  collect_type: "click_heart_from_player",
                  group_id: collectEntity.id
                }
              });
              protocolOf("renderer" /* renderer */).showToast({ message: '\u5DF2\u6DFB\u52A0\u5230"\u6211\u559C\u6B22\u7684\u97F3\u4E50"' });
            };
            if (!await protocolOf("user" /* user */).isLogged()) {
              const windowState = await protocolOf("sharedState" /* sharedState */).get("window");
              if (!windowState.windows["main" /* main */]?.isFocus) {
              } else {
                const logged = await protocolOf("user" /* user */).login({ waitComplete: true });
                if (!logged) {
                  return;
                }
                await like();
              }
              return;
            }
            await like();
          })();
        }),
        ["Dislike" /* Dislike */]: withRateLimit(() => {
          protocolOf("renderer" /* renderer */).dislike();
        })
      };

export {
  validateShortcutStr,
  ShortcutActionFnMap
};
