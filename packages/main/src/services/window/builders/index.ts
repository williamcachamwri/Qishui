// src/services/window/builders/index.ts
// @ts-nocheck
import "../type";
import { mainWindowBuilder } from "./main";
import { captchaWindowBuilder } from "./captcha";
import { desktopLyricsWindowBuilder } from "./desktopLyrics";
import { updateWindowBuilder } from "./update";
import { feedbackWindowBuilder } from "./feedback";
import { imagePreviewWindowBuilder } from "./imagePreview";
import { taskbarWidgetWindowBuilder } from "./taskbarWidget";
import { taskbarWidgetShadowWindowBuilder } from "./taskbarWidgetShadow";

let windowBuilders: any = {
        ["main" /* main */]: mainWindowBuilder,
        ["captcha" /* captcha */]: captchaWindowBuilder,
        ["desktopLyrics" /* desktopLyrics */]: desktopLyricsWindowBuilder,
        ["update" /* update */]: updateWindowBuilder,
        ["feedback" /* feedback */]: feedbackWindowBuilder,
        ["imagePreview" /* imagePreview */]: imagePreviewWindowBuilder,
        ["taskbarWidget" /* taskbarWidget */]: taskbarWidgetWindowBuilder,
        ["taskbarWidgetShadow" /* taskbarWidgetShadow */]: taskbarWidgetShadowWindowBuilder
      };

export {
  windowBuilders
};
