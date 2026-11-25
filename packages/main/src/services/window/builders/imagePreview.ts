// src/services/window/builders/imagePreview.ts
// @ts-nocheck
import { __require } from "../../../../../vendor/index";

let import_electron18: any = __require("electron");

let imagePreviewWindowBuilder: any = {
        build: async (context) => {
          const win = new import_electron18.BrowserWindow({
            ...context.defaultOptions,
            minWidth: 800,
            minHeight: 600,
            width: 800,
            height: 600,
            backgroundColor: "#121212",
            title: "\u9884\u89C8\u56FE\u7247",
            resizable: true,
            skipTaskbar: true
          });
          win.webContents.on("context-menu", () => {
            const url2 = new URL(win.webContents.getURL());
            const imgUrl = url2.searchParams.get("img") || "";
            const template = [
              {
                label: "\u5728\u6D4F\u89C8\u5668\u4E2D\u6253\u5F00",
                click: () => {
                  if (imgUrl) import_electron18.shell.openExternal(imgUrl);
                }
              },
              {
                label: "\u4E0B\u8F7D\u56FE\u7247",
                click: () => {
                  if (!imgUrl) return;
                  win.webContents.downloadURL(imgUrl);
                }
              }
            ];
            const menu = import_electron18.Menu.buildFromTemplate(template);
            menu.popup({ window: win });
          });
          win.loadURL(context.url);
          return win;
        },
        singleton: true,
        preset: "fixed-dialog-with-titlebar"
      };

export {
  imagePreviewWindowBuilder
};
