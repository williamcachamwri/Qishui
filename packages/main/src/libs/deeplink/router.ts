// src/libs/deeplink/router.ts
// @ts-nocheck
import { protocolOf } from "../../services/index";
import "../../services/serviceId";
import { logger } from "../../utils/logger";
import "../../services/window/type";

function createDeeplinkRouter() {
    return new DeeplinkRouter();
  }

class DeeplinkRouter {
        routes = [];
        handle(pattern, handler) {
          const paramNames = [];
          const regexStr = pattern.replace(/:(\w+)/g, (_6, name) => {
            paramNames.push(name);
            return "([^/]+)";
          });
          this.routes.push({
            pattern,
            regex: new RegExp(`^${regexStr}$`),
            paramNames,
            handler
          });
          return this;
        }
        createHandler() {
          return async (url2) => {
            try {
              logger.info("deeplink", (b2) => b2.text("handling deeplink:").text(url2));
              await protocolOf("window" /* window */).showWindowAndWaitForReady("main" /* main */);
              const urlInfo = new URL(url2);
              const pathname = urlInfo.pathname;
              for (const route of this.routes) {
                const match = pathname.match(route.regex);
                if (match) {
                  const params = Object.fromEntries(urlInfo.searchParams);
                  route.paramNames.forEach((name, index) => {
                    params[name] = match[index + 1];
                  });
                  await route.handler(params);
                  return;
                }
              }
              logger.warn("deeplink", (b2) => b2.text("unknown deeplink path:").text(pathname));
            } catch (error) {
              logger.error("deeplink", error);
            }
          };
        }
      }

export {
  createDeeplinkRouter
};
