// src/utils/slardar/blacklist.ts
// @ts-nocheck

function sanitizeErrorMessage(text) {
    let result = text;
    for (const rule of SANITIZE_RULES) {
      result = result.replace(rule.pattern, rule.replacement);
    }
    return result;
  }

function shouldFilterError(error) {
    if (ERROR_BLACKLIST.length === 0) {
      return false;
    }
    let errorString = "";
    if (error instanceof Error) {
      errorString = `${error.name} ${error.message} ${error.stack ?? ""}`;
    } else if (typeof error === "string") {
      errorString = error;
    } else {
      errorString = String(error);
    }
    return ERROR_BLACKLIST.some((keyword) => errorString.includes(keyword));
  }

var ERROR_BLACKLIST = [
    "RequestError",
    "AbortError",
    "TimeoutError",
    "cancelled",
    "Stream read timeout after",
    "get cert timeout",
    "internal/net",
    "unexcepted status code",
    "ETIMEDOUT",
    "ECONNRESET",
    "Invalid WebSocket frame",
    "WebSocket was closed",
    "/ws/lib/",
    "Request failed:"
  ];

var SANITIZE_RULES = [
    // Windows/Mac 用户路径: C:\Users\xxx\ 或 /Users/xxx/
    { pattern: /([/\\]Users[/\\])[^/\\]+([/\\])/gi, replacement: "$1[USERNAME]$2" },
    { pattern: /([/\\])\d+(?:\.\d+){1,}([/\\])/g, replacement: "$1[VERSION]$2" },
    // UUID 格式: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    { pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, replacement: "[UUID]" },
    // 文件大小: 2804185 bytes, 2.7 MiB, 100 KB 等
    { pattern: /[\d.]+ ?(bytes|[KMGT]i?B)\b/gi, replacement: "[SIZE] $1" },
    // 百分比: 80.7%
    { pattern: /[\d.]+%/g, replacement: "[PERCENT]" }
  ];

export {
  shouldFilterError,
  sanitizeErrorMessage
};
