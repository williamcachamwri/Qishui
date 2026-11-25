// src/utils/offlineCacheRules.ts
// @ts-nocheck
import { __require, __toESM } from "../../../vendor/index";

function generateResourceId(url2) {
    return import_node_crypto6.default.createHash("sha256").update(url2).digest("hex").slice(0, 32);
  }

function matchesOfflineCache(url2) {
    return offlineCacheRules.some((rule) => url2 === rule.url);
  }

let import_node_crypto6: any = __toESM(__require("node:crypto"));

let offlineCacheRules: any = [
        {
          url: "https://lf-headquarters-speed.yhgfb-cn-static.com/obj/rc-client-security/web/glue/1.0.0.36/sdk-glue.js"
        },
        {
          url: "https://lf-headquarters-speed.yhgfb-cn-static.com/obj/rc-client-security/web/stable/1.0.0.41/bdms.js"
        },
        {
          url: "https://lf3-short.ibytedapm.com/slardar/fe/sdk-web/plugins/common-monitors.1.13.1.js"
        },
        {
          url: "https://lf-ucenter-web.yhgfb-cn-static.com/obj/passport-fe/ucenter_fe/@byted/uc-secure-monitor-base/1.0.4/dist/index.umd.production.js"
        },
        {
          url: "https://lf3-short.ibytedapm.com/slardar/fe/sdk-web/plugins/blank-screen.1.13.1.js"
        }
      ];

export {
  generateResourceId,
  matchesOfflineCache
};
