// src/services/window/builders/update.ts
// @ts-nocheck
import { __require } from "../../../../../vendor/index";

let import_electron16: any = __require("electron");

let updateWindowBuilder: any = {
        build: async (context) => {
          const win = new import_electron16.BrowserWindow({
            ...context.defaultOptions,
            width: 640,
            height: 480,
            title: "\u66F4\u65B0"
          });
          win.loadURL(context.url);
          win.on("closed", () => {
            import_electron16.app.exit();
          });
          return win;
        },
        singleton: true,
        preset: "fixed-dialog"
      };

export {
  updateWindowBuilder
};
