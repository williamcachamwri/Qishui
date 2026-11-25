// src/services/window/builders/feedback.ts
// @ts-nocheck
import { __require } from "../../../../../vendor/index";

let import_electron17: any = __require("electron");

let feedbackWindowBuilder: any = {
        build: async (context) => {
          const win = new import_electron17.BrowserWindow({
            ...context.defaultOptions,
            width: 600,
            height: 680,
            title: "\u7528\u6237\u53CD\u9988",
            backgroundColor: "#292929"
          });
          win.loadURL(context.url);
          return win;
        },
        singleton: true,
        preset: "fixed-dialog"
      };

export {
  feedbackWindowBuilder
};
