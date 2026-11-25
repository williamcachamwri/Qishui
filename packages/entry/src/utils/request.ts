// src/utils/request.ts
import { createHash } from "node:crypto";
import { Readable } from "node:stream";
import electron from "electron";
import { __toESM, require_ttnet, require_set_cookie } from "../../../vendor/index";

const ttnet = __toESM(require_ttnet());
const setCookieParser = __toESM(require_set_cookie());

export async function sendHttpRequest(req: Request): Promise<Response> {
  const requestHeaders: Record<string, string[]> = {};
  req.headers.forEach((value, key) => {
    if (!requestHeaders[key]) requestHeaders[key] = [];
    requestHeaders[key].push(value);
  });

  if (electron.app.isReady()) {
    try {
      const cookies = await electron.session.defaultSession.cookies.get({ url: req.url });
      if (cookies.length > 0) {
        requestHeaders.cookie = [cookies.map((c) => `${c.name}=${c.value}`).join("; ")];
      }
    } catch {}
  }

  let bodyBuffer: Buffer | null = null;
  if (req.body) {
    const ab = await req.arrayBuffer();
    bodyBuffer = Buffer.from(ab);
    if (!Object.keys(requestHeaders).some((k) => k.toLowerCase() === "x-ss-stub")) {
      requestHeaders["X-SS-STUB"] = [createHash("md5").update(bodyBuffer).digest("hex").toUpperCase()];
    }
  }

  const response = await ttnet.request({
    url: req.url,
    method: req.method,
    headers: requestHeaders,
    body: bodyBuffer,
    followRedirects: req.redirect !== "manual" && req.redirect !== "error",
    signal: req.signal,
    requestTimeout: 30000
  });

  const shouldHaveBody = response.statusCode !== 204 && response.statusCode !== 304 && response.statusCode !== 1223;
  const responseBody = shouldHaveBody ? (Readable.toWeb(response.body) as ReadableStream) : null;
  const headersObj = new Headers();
  for (const [k, vals] of Object.entries(response.headers as Record<string, string[]>)) {
    if (k.startsWith(":")) continue;
    for (const v of vals) headersObj.append(k.toLowerCase(), v);
  }
  return new Response(responseBody, { status: response.statusCode, headers: headersObj });
}

export async function electronFetch(input: string | URL | Request, init?: RequestInit): Promise<Response> {
  const req = typeof input === "string" || input instanceof URL ? new Request(input.toString(), init) : input;
  return sendHttpRequest(req);
}
