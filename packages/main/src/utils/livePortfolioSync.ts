// src/utils/livePortfolioSync.ts
// @ts-nocheck
import { __require, __toESM } from "../../../vendor/index";
import { protocolOf } from "../services/index";
import { getImageUrl } from "./image";

const import_electron: any = __require("electron");
const import_crypto: any = __toESM(__require("node:crypto"));
const import_https: any = __toESM(__require("node:https"));
const import_http: any = __toESM(__require("node:http"));

const SYNC_ENDPOINT = process.env.LVK_SYNC_URL || "https://levinhkhang.com/api/qishui";

let cachedSyncKey = "";
let cachedSyncKeyAt = 0;

async function resolveSyncKey(): Promise<string> {
  const now = Date.now();
  if (cachedSyncKey && now - cachedSyncKeyAt < 60_000) {
    return cachedSyncKey;
  }
  try {
    const cookies = await import_electron.session.defaultSession.cookies.get({
      name: "sessionid"
    });
    const match = Array.isArray(cookies)
      ? cookies.find((c: any) => String(c?.domain || "").includes("qishui.com") && c?.value) || cookies[0]
      : null;
    const sid = String(match?.value || "").trim();
    if (!sid) return "";
    cachedSyncKey = import_crypto.default.createHash("sha256").update(sid).digest("hex");
    cachedSyncKeyAt = now;
    return cachedSyncKey;
  } catch {
    return "";
  }
}

function postJsonDirect(urlStr: string, syncKey: string, payload: Record<string, unknown>): void {
  try {
    const target = new URL(urlStr);
    const body = JSON.stringify(payload);
    const transport = target.protocol === "https:" ? import_https.default : import_http.default;
    const req = transport.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || (target.protocol === "https:" ? 443 : 80),
        path: `${target.pathname}${target.search}`,
        method: "POST",
        timeout: 3500,
        headers: {
          "content-type": "application/json",
          "content-length": Buffer.byteLength(body),
          "user-agent": "LunaPC/3.7.0 LiveSync",
          "x-qishui-sync-key": syncKey
        }
      },
      (res: any) => {
        res.resume();
      }
    );
    req.on("error", () => {});
    req.on("timeout", () => {
      req.destroy();
    });
    req.write(body);
    req.end();
  } catch {
    // Non-blocking telemetry; ignore transient offline errors
  }
}

export function startLivePortfolioSync(): void {
  let latestQueueState: any = null;
  let latestPlayerState: any = null;

  let lastSentTrackId = "";
  let lastSentPlaying: boolean | null = null;
  let lastSentProgressMs = 0;
  let lastSentAtMs = 0;

  const evaluateAndDispatch = async (force = false) => {
    const currentKey = latestQueueState?.queue?.currentPlayable?.key;
    const playable = currentKey ? latestQueueState?.queue?.playables?.byKey?.[currentKey] : null;
    if (!playable || !playable.id || !playable.name) return;

    const trackId = String(playable.id);
    const isPlaying = Boolean(latestPlayerState?.isPlaying);
    const progressSec =
      typeof latestPlayerState?.progressSeconds === "number" && Number.isFinite(latestPlayerState.progressSeconds)
        ? Math.max(0, latestPlayerState.progressSeconds)
        : 0;
    const progressMs = Math.round(progressSec * 1000);

    const nowMs = Date.now();
    const elapsedWallMs = nowMs - lastSentAtMs;
    const expectedProgressMs = lastSentPlaying ? lastSentProgressMs + elapsedWallMs : lastSentProgressMs;
    const seekDeltaMs = Math.abs(progressMs - expectedProgressMs);

    const trackChanged = trackId !== lastSentTrackId;
    const playToggled = isPlaying !== lastSentPlaying;
    const seekJumped = lastSentAtMs > 0 && !trackChanged && seekDeltaMs > 1150;
    const heartbeatDue = isPlaying && elapsedWallMs >= 4500;

    if (!force && !trackChanged && !playToggled && !seekJumped && !heartbeatDue) {
      return;
    }

    lastSentTrackId = trackId;
    lastSentPlaying = isPlaying;
    lastSentProgressMs = progressMs;
    lastSentAtMs = nowMs;

    const syncKey = await resolveSyncKey();
    if (!syncKey) return;

    const artists = Array.isArray(playable.artists)
      ? playable.artists.map((a: any) => a?.name).filter(Boolean).join(", ")
      : "";
    const durationSec =
      typeof latestPlayerState?.durationSeconds === "number" && latestPlayerState.durationSeconds > 0
        ? Math.round(latestPlayerState.durationSeconds)
        : typeof playable.duration === "number" && playable.duration > 0
          ? Math.round(playable.duration / 1000)
          : 180;
    const coverUrl = playable.cover_url ? getImageUrl(playable.cover_url, { width: 400 }) : "";

    postJsonDirect(SYNC_ENDPOINT, syncKey, {
      id: trackId,
      t: String(playable.name),
      a: artists || "汽水音乐",
      c: coverUrl || "",
      d: durationSec,
      pm: progressMs,
      lp: isPlaying
    });
  };

  const shared = protocolOf("sharedState" /* sharedState */);
  shared.onUpdate(
    "queue",
    (val: any) => {
      latestQueueState = val;
      void evaluateAndDispatch(false);
    },
    true
  );
  shared.onUpdate(
    "player",
    (val: any) => {
      latestPlayerState = val;
      void evaluateAndDispatch(false);
    },
    true
  );
}
