// src/utils/slardar/background.ts
// @ts-nocheck
import { __toESM, require_index_cjs } from "../../../../vendor/index";
import { getFallbackDid } from "../fallbackDid";
import { sanitizeErrorMessage, shouldFilterError } from "./blacklist";
import { electronFetchTransport } from "./transports/electronFetch";

function collectError(error) {
    if (shouldFilterError(error)) {
      return;
    }
    if (error instanceof Error) {
      import_base.default.report({
        ev_type: "js_error",
        payload: {
          error: {
            name: error.name,
            message: sanitizeErrorMessage(error.message),
            stack: error.stack ? sanitizeErrorMessage(error.stack) : void 0
          },
          breadcrumbs: []
        }
      });
    } else {
      import_base.default.report({
        ev_type: "js_error",
        payload: {
          error: {
            name: "Unknown Error",
            message: sanitizeErrorMessage(String(error))
          },
          breadcrumbs: []
        }
      });
    }
  }

var import_base = __toESM(require_index_cjs());

import_base.default.init({
    bid: "luna_pc",
    transport: electronFetchTransport,
    pid: "background",
    deviceId: getFallbackDid(),
    userId: getFallbackDid(),
    release: "3.7.0",
    env: false ? "development" : "production"
  });

import_base.default.start();

var originalConsoleError = console.error.bind(console);

process.on("uncaughtException", (error) => {
    originalConsoleError(error);
    collectError(error);
  });

process.on("unhandledRejection", (error) => {
    originalConsoleError(error);
    collectError(error);
  });

console.error = (...args) => {
    originalConsoleError(...args);
    for (const arg of args) {
      if (arg instanceof Error) {
        collectError(arg);
      }
    }
  };

