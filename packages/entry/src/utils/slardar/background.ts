// src/utils/slardar/background.ts
import { __toESM, require_index_cjs } from "../../../../vendor/index";
import { getFallbackDid } from "../fallbackDid";
import { sanitizeErrorMessage, shouldFilterError } from "./blacklist";
import { electronFetchTransport } from "./transports/electronFetch";

const slardarBase = __toESM(require_index_cjs()).default;

slardarBase.init({
  bid: "luna_pc",
  transport: electronFetchTransport,
  pid: "background",
  deviceId: getFallbackDid(),
  userId: getFallbackDid(),
  release: "3.7.0",
  env: "production"
});
slardarBase.start();

const originalConsoleError = console.error.bind(console);

process.on("uncaughtException", (error) => {
  originalConsoleError(error);
  collectError(error);
});

process.on("unhandledRejection", (error) => {
  originalConsoleError(error);
  collectError(error);
});

export function collectError(error: unknown): void {
  if (shouldFilterError(error)) return;
  if (error instanceof Error) {
    slardarBase.report({
      ev_type: "js_error",
      payload: {
        error: {
          name: error.name,
          message: sanitizeErrorMessage(error.message),
          stack: error.stack ? sanitizeErrorMessage(error.stack) : undefined
        },
        breadcrumbs: []
      }
    });
  }
}

export { slardarBase };
