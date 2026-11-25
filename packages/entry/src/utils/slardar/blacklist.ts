// src/utils/slardar/blacklist.ts
export const ERROR_BLACKLIST: string[] = [
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

export const SANITIZE_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /([/\\]Users[/\\])[^/\\]+([/\\])/gi, replacement: "$1[USERNAME]$2" },
  { pattern: /([/\\])\d+(?:\.\d+){1,}([/\\])/g, replacement: "$1[VERSION]$2" },
  { pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, replacement: "[UUID]" },
  { pattern: /[\d.]+ ?(bytes|[KMGT]i?B)\b/gi, replacement: "[SIZE] $1" },
  { pattern: /[\d.]+%/g, replacement: "[PERCENT]" }
];

export function sanitizeErrorMessage(text: string): string {
  let result = text;
  for (const rule of SANITIZE_RULES) {
    result = result.replace(rule.pattern, rule.replacement);
  }
  return result;
}

export function shouldFilterError(error: unknown): boolean {
  if (ERROR_BLACKLIST.length === 0) return false;
  let errorString = "";
  if (error instanceof Error) {
    errorString = `${error.name} ${error.message} ${error.stack ?? ""}`;
  } else {
    errorString = String(error);
  }
  return ERROR_BLACKLIST.some((keyword) => errorString.includes(keyword));
}
