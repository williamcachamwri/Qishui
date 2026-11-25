// src/services/window/builders/captcha.ts
// @ts-nocheck
import { __require } from "../../../../../vendor/index";

let import_electron14: any = __require("electron");

let captchaWindowBuilder: any = {
        build: async (context) => {
          const win = new import_electron14.BrowserWindow({
            ...context.defaultOptions,
            width: 500,
            height: 500,
            title: "\u5B89\u5168\u9A8C\u8BC1"
          });
          win.webContents.on("will-navigate", (e, url2) => {
            if (url2.endsWith("succeed")) {
              context.setResult(true);
              win.close();
            } else if (url2.endsWith("failed")) {
              context.setResult(false);
              win.close();
            } else {
              if (true) {
                win.close();
              }
            }
          });
          win.loadURL(context.url);
          return win;
        },
        singleton: true,
        preset: "fixed-dialog-with-titlebar"
      };

export {
  captchaWindowBuilder
};
