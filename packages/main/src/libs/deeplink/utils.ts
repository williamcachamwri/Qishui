// src/libs/deeplink/utils.ts
// @ts-nocheck
import { __require } from "../../../../vendor/index";

let coldStartDeeplink: any;

function collectColdStartDeeplink(url2) {
    coldStartDeeplink = url2;
  }

function collectColdStartDeeplinkFromArgv() {
    if (process.platform === "win32") {
      const deeplinkArg = process.argv.find((arg) => arg.startsWith("luna://"));
      if (deeplinkArg) {
        coldStartDeeplink = deeplinkArg;
      }
    }
  }

function handleOpenUrl(_6, url2) {
    collectColdStartDeeplink(url2);
  }

function setupColdStartDeeplinkCollector() {
    collectColdStartDeeplinkFromArgv();
    import_electron5.app.once("open-url", handleOpenUrl);
  }

function cleanupColdStartDeeplinkCollector() {
    import_electron5.app.off("open-url", handleOpenUrl);
  }

async function tryHandleColdStartDeeplink() {
    if (!coldStartDeeplink) {
      return;
    }
    const { handleDeeplink: handleDeeplink2 } = await import("./handlers");
    await handleDeeplink2(coldStartDeeplink);
  }

let import_electron5: any = __require("electron");

export {
  setupColdStartDeeplinkCollector,
  tryHandleColdStartDeeplink,
  cleanupColdStartDeeplinkCollector
};
