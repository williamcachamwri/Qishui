// src/beforeReady.ts
// @ts-nocheck
import { __require } from "../../vendor/index";
import { isSquirrelRequestExit } from "./handleSquirrel";
import { setupColdStartDeeplinkCollector } from "./libs/deeplink/utils";

function hasArgSwitch(name) {
    return process.argv.some((arg) => arg === `--${name}` || arg.startsWith(`--${name}=`));
  }

function beforeReady() {
    if (["inspect", "inspect-brk", "remote-debugging-port"].some(hasArgSwitch)) {
      process.crash();
      return;
    }
    if (isSquirrelRequestExit()) {
      return;
    }
    if (true) {
      import_electron6.app.commandLine.appendSwitch("no-proxy-server");
    }
    import_electron6.app.commandLine.appendSwitch("no-sandbox");
    import_electron6.app.commandLine.appendSwitch("disable-pinch");
    import_electron6.app.commandLine.appendSwitch("lang", "en-US");
    import_electron6.app.commandLine.appendSwitch("disable-gpu-sandbox");
    import_electron6.app.commandLine.appendSwitch("disable-site-isolation-trials");
    import_electron6.app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors,UserAgentClientHint,BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights");
    import_electron6.app.setAsDefaultProtocolClient("luna");
    import_electron6.app.setAppUserModelId("\u6C7D\u6C34\u97F3\u4E50");
    import_electron6.protocol.registerSchemesAsPrivileged([
      {
        scheme: "app",
        privileges: {
          standard: true,
          secure: true,
          supportFetchAPI: true,
          corsEnabled: true,
          allowServiceWorkers: true
        }
      }
    ]);
    setupColdStartDeeplinkCollector();
  }

let import_electron6: any = __require("electron");

export {
  beforeReady
};
