// src/libs/alog/index.ts
// @ts-nocheck
import { __require, __toESM } from "../../../../vendor/index";

function setupAlog() {
    const originalConsole = {
      log: console.log.bind(console),
      debug: console.debug.bind(console),
      info: console.info.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    };
    const patches = {
      log(...args) {
        originalConsole.log(...args);
        import_electron10.parfait.writeAlog(2, "main", import_node_util.default.format(...args)).catch(() => {
        });
      },
      debug(...args) {
        originalConsole.debug(...args);
        import_electron10.parfait.writeAlog(0, "main", import_node_util.default.format(...args)).catch(() => {
        });
      },
      info(...args) {
        originalConsole.info(...args);
        import_electron10.parfait.writeAlog(2, "main", import_node_util.default.format(...args)).catch(() => {
        });
      },
      warn(...args) {
        originalConsole.warn(...args);
        import_electron10.parfait.writeAlog(3, "main", import_node_util.default.format(...args)).catch(() => {
        });
      },
      error(...args) {
        originalConsole.error(...args);
        import_electron10.parfait.writeAlog(4, "main", import_node_util.default.format(...args)).catch(() => {
        });
      }
    };
    Object.assign(console, patches);
    import_electron10.app.on("web-contents-created", (_6, webContents) => {
      let tag = "renderer:unknown";
      webContents.addListener("did-start-navigation", (details) => {
        tag = `renderer:${URL.parse(details.url)?.pathname ?? "unknown"}`;
      });
      webContents.on("console-message", (_7, level, message, line, sourceId) => {
        import_electron10.parfait.writeAlog(LEVEL_MAP[level], tag, message + `

[at ${sourceId}:${line}]`).catch(() => {
        });
      });
    });
  }

let import_electron10: any = __require("electron");

let import_node_util: any = __toESM(__require("node:util"));

let LEVEL_MAP: any = {
        0: 0,
        1: 2,
        2: 3,
        3: 4
      };

export {
  setupAlog
};
