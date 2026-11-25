// src/utils/request.ts
// @ts-nocheck
import { __require, __toESM, require_set_cookie, require_ttnet } from "../../../vendor/index";

function interceptBeforeSendHeaders(interceptor) {
    beforeSendHeadersInterceptors.push(interceptor);
  }

function interceptHeadersReceived(interceptor) {
    headersReceivedInterceptors.push(interceptor);
  }

function interceptCompleted(interceptor) {
    completedInterceptors.push(interceptor);
  }

function interceptBeforeRequest(interceptor) {
    beforeRequestInterceptors.push(interceptor);
  }

function convertSameSiteValue(sameSite) {
    const normalizedValue = sameSite.toLowerCase();
    switch (normalizedValue) {
      case "none":
        return "no_restriction";
      case "lax":
        return "lax";
      case "strict":
        return "strict";
      default:
        return "unspecified";
    }
  }

function mergeCookieHeaders(requestCookie, sessionCookie) {
    const parseCookies = (cookieStr) => {
      if (!cookieStr) return {};
      const cookies = {};
      cookieStr.split(";").forEach((part) => {
        const [name, value] = part.trim().split("=");
        if (name && value) {
          cookies[name.trim()] = value.trim();
        }
      });
      return cookies;
    };
    const sessionCookies = parseCookies(sessionCookie);
    const requestCookies = parseCookies(requestCookie);
    const mergedCookies = { ...sessionCookies, ...requestCookies };
    const cookieParts = Object.entries(mergedCookies).map(([name, value]) => `${name}=${value}`);
    return cookieParts.length > 0 ? cookieParts.join("; ") : void 0;
  }

function hasHeader(headers, name) {
    const normalizedName = name.toLowerCase();
    return Object.keys(headers).some((key) => key.toLowerCase() === normalizedName);
  }

function setBodyMd5Header(headers, bodyMd5) {
    if (!bodyMd5 || hasHeader(headers, "x-ss-stub")) return;
    headers["X-SS-STUB"] = [bodyMd5];
  }

function toBufferView(chunk) {
    return Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
  }

async function sendHttpRequest(req) {
    const requestId = ++requestIdCounter;
    const startTimestamp = Date.now();
    try {
      for (const interceptor of beforeRequestInterceptors) {
        interceptor({
          id: requestId,
          url: req.url,
          method: req.method,
          timestamp: startTimestamp,
          referrer: req.referrer
        });
      }
      let requestHeaders = {};
      for (const [key, value] of req.headers.entries()) {
        if (!requestHeaders[key]) {
          requestHeaders[key] = [];
        }
        requestHeaders[key].push(value);
      }
      const sessionCookieHeader = await getCookiesHeader(req.url);
      const mergedCookie = mergeCookieHeaders(requestHeaders.cookie?.[0], sessionCookieHeader ?? void 0);
      if (mergedCookie) {
        requestHeaders.cookie = [mergedCookie];
      }
      let bodyBuffer = null;
      let bodyMd5 = null;
      if (req.body) {
        const chunks = [];
        const shouldComputeBodyMd5 = !hasHeader(requestHeaders, "x-ss-stub");
        const bodyHash = shouldComputeBodyMd5 ? (0, import_node_crypto.createHash)("md5") : null;
        let totalLength = 0;
        const reader = req.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            totalLength += value.byteLength;
            bodyHash?.update(value);
          }
        }
        bodyBuffer = chunks.length === 1 ? toBufferView(chunks[0]) : Buffer.concat(chunks, totalLength);
        bodyMd5 = bodyHash?.digest("hex").toUpperCase() ?? null;
      }
      setBodyMd5Header(requestHeaders, bodyMd5);
      for (const interceptor of beforeSendHeadersInterceptors) {
        const modifiedHeaders = await interceptor({
          id: requestId,
          url: req.url,
          method: req.method,
          timestamp: startTimestamp,
          referrer: req.referrer,
          requestHeaders
        });
        requestHeaders = modifiedHeaders;
      }
      const response = await (0, import_ttnet.request)({
        url: req.url,
        method: req.method,
        headers: requestHeaders,
        body: bodyBuffer,
        followRedirects: req.redirect !== "manual" && req.redirect !== "error",
        signal: req.signal,
        requestTimeout: 3e4
        // 30秒超时
      });
      const filteredHeaders = {};
      for (const [key, value] of Object.entries(response.headers)) {
        if (!key.startsWith(":")) {
          filteredHeaders[key.toLowerCase()] = value;
        }
      }
      response.headers = filteredHeaders;
      for (const interceptor of headersReceivedInterceptors) {
        interceptor({
          id: requestId,
          url: req.url,
          method: req.method,
          timestamp: startTimestamp,
          referrer: req.referrer,
          statusCode: response.statusCode,
          statusLine: "",
          responseHeaders: response.headers
        });
      }
      if (response.headers["set-cookie"]) {
        await saveCookiesWithHeader(req.url, response.headers["set-cookie"]);
      }
      for (const interceptor of completedInterceptors) {
        interceptor({
          id: requestId,
          url: req.url,
          method: req.method,
          timestamp: startTimestamp,
          referrer: req.referrer,
          statusCode: response.statusCode,
          statusLine: "",
          fromCache: response.wasCached || false
        });
      }
      const shouldHaveBody = response.statusCode !== 204 && response.statusCode !== 304 && response.statusCode !== 1223;
      const responseBody = shouldHaveBody ? import_stream.Readable.toWeb(response.body) : null;
      const responseHeadersObj = new Headers();
      for (const [key, values] of Object.entries(response.headers)) {
        for (const value of values) {
          responseHeadersObj.append(key, value);
        }
      }
      return new Response(responseBody, {
        status: response.statusCode,
        statusText: "",
        headers: responseHeadersObj
      });
    } catch (error) {
      for (const interceptor of completedInterceptors) {
        interceptor({
          id: requestId,
          url: req.url,
          method: req.method,
          timestamp: startTimestamp,
          referrer: req.referrer,
          fromCache: false,
          error: error instanceof Error ? error.message : String(error)
        });
      }
      throw error;
    }
  }

async function fetch2(input, init2) {
    let request2;
    if (typeof input === "string" || input instanceof URL) {
      request2 = new Request(input.toString(), init2);
    } else {
      request2 = input;
    }
    return sendHttpRequest(request2);
  }

async function getCookiesHeader(url2) {
    if (!import_electron.app.isReady()) {
      return null;
    }
    try {
      const cookies = await import_electron.session.defaultSession.cookies.get({ url: url2 });
      const cookieHeader = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
      return cookieHeader;
    } catch (error) {
      console.warn("Failed to get session cookies:", error);
      return null;
    }
  }

async function saveCookiesWithHeader(url2, setCookieHeaders) {
    if (!import_electron.app.isReady()) {
      return;
    }
    try {
      const parsedCookies = setCookieParser.parse(setCookieHeaders, { map: false });
      for (const cookie of parsedCookies) {
        const attributes = {
          url: url2,
          name: cookie.name,
          value: cookie.value
        };
        if (cookie.domain) {
          attributes.domain = cookie.domain;
        }
        if (cookie.path) {
          attributes.path = cookie.path;
        }
        if (cookie.httpOnly) {
          attributes.httpOnly = true;
        }
        if (cookie.secure) {
          attributes.secure = true;
        }
        if (cookie.sameSite) {
          attributes.sameSite = convertSameSiteValue(cookie.sameSite);
        }
        if (cookie.expires) {
          attributes.expirationDate = Math.floor(cookie.expires.getTime() / 1e3);
        } else if (cookie.maxAge) {
          attributes.expirationDate = Math.floor(Date.now() / 1e3) + cookie.maxAge;
        }
        try {
          await import_electron.session.defaultSession.cookies.set(attributes);
        } catch (cookieError) {
          console.warn("Failed to set cookie:", attributes, cookieError);
        }
      }
    } catch (parseError) {
      console.warn("Failed to parse set-cookie headers:", setCookieHeaders, parseError);
    }
  }

let import_node_crypto: any = __require("node:crypto");

let import_electron: any = __require("electron");

let import_ttnet: any = __toESM(require_ttnet());

let setCookieParser: any = __toESM(require_set_cookie());

let import_stream: any = __require("stream");

let beforeSendHeadersInterceptors: any = [];

let headersReceivedInterceptors: any = [];

let completedInterceptors: any = [];

let beforeRequestInterceptors: any = [];

let requestIdCounter: any = 0;

export {
  fetch2,
  interceptBeforeRequest,
  interceptHeadersReceived,
  interceptCompleted,
  sendHttpRequest,
  interceptBeforeSendHeaders
};
