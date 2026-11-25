// packages/renderers/main/src/services/player.ts
// @ts-nocheck
import { h as xe, p as u, S as c, A as N, j as A, k as me, m as ge, n as p, o as ne, P as y, q as ve, t as ze, u as q, w as Ne, v as Pe, W as b, C as Oe, x as We, F as Fe, y as X, z as Qe, B as He, E as be, G as Ge, l as _e, H as ke, I as Je, s as Ue } from "../main";
import { S as Ye, a as Xe } from "./base";
class D {
  constructor(e) {
    this.key = e, this.value = xe[e];
    let t = false;
    u(c.sharedState).onUpdate(e, (i, a) => {
      const s = t ? a : void 0;
      t = true, this.value = i, this.callbacks.forEach((n) => n(i, s));
    }, true).then(() => {
      this.readyCell.resolve();
    });
  }
  callbacks = /* @__PURE__ */ new Set();
  readyCell = new N();
  value;
  async ready() {
    await this.readyCell.get();
  }
  onUpdate(e) {
    return this.callbacks.add(e), () => {
      this.callbacks.delete(e);
    };
  }
}
function _(r) {
  for (var e = arguments.length, t = Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) t[i - 1] = arguments[i];
  throw Error("[Immer] minified error nr: " + r + (t.length ? " " + t.map((function(a) {
    return "'" + a + "'";
  })).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function T(r) {
  return !!r && !!r[v];
}
function M(r) {
  var e;
  return !!r && ((function(t) {
    if (!t || typeof t != "object") return false;
    var i = Object.getPrototypeOf(t);
    if (i === null) return true;
    var a = Object.hasOwnProperty.call(i, "constructor") && i.constructor;
    return a === Object || typeof a == "function" && Function.toString.call(a) === nt;
  })(r) || Array.isArray(r) || !!r[Te] || !!(!((e = r.constructor) === null || e === void 0) && e[Te]) || oe(r) || le(r));
}
function O(r, e, t) {
  t === void 0 && (t = false), I(r) === 0 ? (t ? Object.keys : ye)(r).forEach((function(i) {
    t && typeof i == "symbol" || e(i, r[i], r);
  })) : r.forEach((function(i, a) {
    return e(a, i, r);
  }));
}
function I(r) {
  var e = r[v];
  return e ? e.i > 3 ? e.i - 4 : e.i : Array.isArray(r) ? 1 : oe(r) ? 2 : le(r) ? 3 : 0;
}
function Z(r, e) {
  return I(r) === 2 ? r.has(e) : Object.prototype.hasOwnProperty.call(r, e);
}
function Ze(r, e) {
  return I(r) === 2 ? r.get(e) : r[e];
}
function Ve(r, e, t) {
  var i = I(r);
  i === 2 ? r.set(e, t) : i === 3 ? r.add(t) : r[e] = t;
}
function et(r, e) {
  return r === e ? r !== 0 || 1 / r == 1 / e : r != r && e != e;
}
function oe(r) {
  return rt && r instanceof Map;
}
function le(r) {
  return st && r instanceof Set;
}
function C(r) {
  return r.o || r.t;
}
function ue(r) {
  if (Array.isArray(r)) return Array.prototype.slice.call(r);
  var e = ot(r);
  delete e[v];
  for (var t = ye(e), i = 0; i < t.length; i++) {
    var a = t[i], s = e[a];
    s.writable === false && (s.writable = true, s.configurable = true), (s.get || s.set) && (e[a] = { configurable: true, writable: true, enumerable: s.enumerable, value: r[a] });
  }
  return Object.create(Object.getPrototypeOf(r), e);
}
function ce(r, e) {
  return e === void 0 && (e = false), de(r) || T(r) || !M(r) || (I(r) > 1 && (r.set = r.add = r.clear = r.delete = tt), Object.freeze(r), e && O(r, (function(t, i) {
    return ce(i, true);
  }), true)), r;
}
function tt() {
  _(2);
}
function de(r) {
  return r == null || typeof r != "object" || Object.isFrozen(r);
}
function k(r) {
  var e = lt[r];
  return e || _(18, r), e;
}
function we() {
  return F;
}
function j(r, e) {
  e && (k("Patches"), r.u = [], r.s = [], r.v = e);
}
function V(r) {
  ee(r), r.p.forEach(it), r.p = null;
}
function ee(r) {
  r === F && (F = r.l);
}
function Ce(r) {
  return F = { p: [], l: F, h: r, m: true, _: 0 };
}
function it(r) {
  var e = r[v];
  e.i === 0 || e.i === 1 ? e.j() : e.g = true;
}
function z(r, e) {
  e._ = e.p.length;
  var t = e.p[0], i = r !== void 0 && r !== t;
  return e.h.O || k("ES5").S(e, r, i), i ? (t[v].P && (V(e), _(4)), M(r) && (r = B(e, r), e.l || K(e, r)), e.u && k("Patches").M(t[v].t, r, e.u, e.s)) : r = B(e, t, []), V(e), e.u && e.v(e.u, e.s), r !== Be ? r : void 0;
}
function B(r, e, t) {
  if (de(e)) return e;
  var i = e[v];
  if (!i) return O(e, (function(o, l) {
    return Se(r, i, e, o, l, t);
  }), true), e;
  if (i.A !== r) return e;
  if (!i.P) return K(r, i.t, true), i.t;
  if (!i.I) {
    i.I = true, i.A._--;
    var a = i.i === 4 || i.i === 5 ? i.o = ue(i.k) : i.o, s = a, n = false;
    i.i === 3 && (s = new Set(a), a.clear(), n = true), O(s, (function(o, l) {
      return Se(r, i, a, o, l, t, n);
    })), K(r, a, false), t && r.u && k("Patches").N(i, t, r.u, r.s);
  }
  return i.o;
}
function Se(r, e, t, i, a, s, n) {
  if (T(a)) {
    var o = B(r, a, s && e && e.i !== 3 && !Z(e.R, i) ? s.concat(i) : void 0);
    if (Ve(t, i, o), !T(o)) return;
    r.m = false;
  } else n && t.add(a);
  if (M(a) && !de(a)) {
    if (!r.h.D && r._ < 1) return;
    B(r, a), e && e.A.l || K(r, a);
  }
}
function K(r, e, t) {
  t === void 0 && (t = false), !r.l && r.h.D && r.m && ce(e, t);
}
function W(r, e) {
  var t = r[v];
  return (t ? C(t) : r)[e];
}
function Me(r, e) {
  if (e in r) for (var t = Object.getPrototypeOf(r); t; ) {
    var i = Object.getOwnPropertyDescriptor(t, e);
    if (i) return i;
    t = Object.getPrototypeOf(t);
  }
}
function te(r) {
  r.P || (r.P = true, r.l && te(r.l));
}
function H(r) {
  r.o || (r.o = ue(r.t));
}
function ie(r, e, t) {
  var i = oe(e) ? k("MapSet").F(e, t) : le(e) ? k("MapSet").T(e, t) : r.O ? (function(a, s) {
    var n = Array.isArray(a), o = { i: n ? 1 : 0, A: s ? s.A : we(), P: false, I: false, R: {}, l: s, t: a, k: null, o: null, j: null, C: false }, l = o, d = ae;
    n && (l = [o], d = x);
    var h = Proxy.revocable(l, d), f = h.revoke, m = h.proxy;
    return o.k = m, o.j = f, m;
  })(e, t) : k("ES5").J(e, t);
  return (t ? t.A : we()).p.push(i), i;
}
function at(r) {
  return T(r) || _(22, r), (function e(t) {
    if (!M(t)) return t;
    var i, a = t[v], s = I(t);
    if (a) {
      if (!a.P && (a.i < 4 || !k("ES5").K(a))) return a.t;
      a.I = true, i = Ee(t, s), a.I = false;
    } else i = Ee(t, s);
    return O(i, (function(n, o) {
      a && Ze(a.t, n) === o || Ve(i, n, e(o));
    })), s === 3 ? new Set(i) : i;
  })(r);
}
function Ee(r, e) {
  switch (e) {
    case 2:
      return new Map(r);
    case 3:
      return Array.from(r);
  }
  return ue(r);
}
var qe, F, he = typeof Symbol < "u" && typeof Symbol("x") == "symbol", rt = typeof Map < "u", st = typeof Set < "u", Re = typeof Proxy < "u" && Proxy.revocable !== void 0 && typeof Reflect < "u", Be = he ? Symbol.for("immer-nothing") : ((qe = {})["immer-nothing"] = true, qe), Te = he ? Symbol.for("immer-draftable") : "__$immer_draftable", v = he ? Symbol.for("immer-state") : "__$immer_state", nt = "" + Object.prototype.constructor, ye = typeof Reflect < "u" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(r) {
  return Object.getOwnPropertyNames(r).concat(Object.getOwnPropertySymbols(r));
} : Object.getOwnPropertyNames, ot = Object.getOwnPropertyDescriptors || function(r) {
  var e = {};
  return ye(r).forEach((function(t) {
    e[t] = Object.getOwnPropertyDescriptor(r, t);
  })), e;
}, lt = {}, ae = { get: function(r, e) {
  if (e === v) return r;
  var t = C(r);
  if (!Z(t, e)) return (function(a, s, n) {
    var o, l = Me(s, n);
    return l ? "value" in l ? l.value : (o = l.get) === null || o === void 0 ? void 0 : o.call(a.k) : void 0;
  })(r, t, e);
  var i = t[e];
  return r.I || !M(i) ? i : i === W(r.t, e) ? (H(r), r.o[e] = ie(r.A.h, i, r)) : i;
}, has: function(r, e) {
  return e in C(r);
}, ownKeys: function(r) {
  return Reflect.ownKeys(C(r));
}, set: function(r, e, t) {
  var i = Me(C(r), e);
  if (i?.set) return i.set.call(r.k, t), true;
  if (!r.P) {
    var a = W(C(r), e), s = a?.[v];
    if (s && s.t === t) return r.o[e] = t, r.R[e] = false, true;
    if (et(t, a) && (t !== void 0 || Z(r.t, e))) return true;
    H(r), te(r);
  }
  return r.o[e] === t && (t !== void 0 || e in r.o) || Number.isNaN(t) && Number.isNaN(r.o[e]) || (r.o[e] = t, r.R[e] = true), true;
}, deleteProperty: function(r, e) {
  return W(r.t, e) !== void 0 || e in r.t ? (r.R[e] = false, H(r), te(r)) : delete r.R[e], r.o && delete r.o[e], true;
}, getOwnPropertyDescriptor: function(r, e) {
  var t = C(r), i = Reflect.getOwnPropertyDescriptor(t, e);
  return i && { writable: true, configurable: r.i !== 1 || e !== "length", enumerable: i.enumerable, value: t[e] };
}, defineProperty: function() {
  _(11);
}, getPrototypeOf: function(r) {
  return Object.getPrototypeOf(r.t);
}, setPrototypeOf: function() {
  _(12);
} }, x = {};
O(ae, (function(r, e) {
  x[r] = function() {
    return arguments[0] = arguments[0][0], e.apply(this, arguments);
  };
})), x.deleteProperty = function(r, e) {
  return x.set.call(this, r, e, void 0);
}, x.set = function(r, e, t) {
  return ae.set.call(this, r[0], e, t, r[0]);
};
var ut = (function() {
  function r(t) {
    var i = this;
    this.O = Re, this.D = true, this.produce = function(a, s, n) {
      if (typeof a == "function" && typeof s != "function") {
        var o = s;
        s = a;
        var l = i;
        return function(w) {
          var $e = this;
          w === void 0 && (w = o);
          for (var $ = arguments.length, pe = Array($ > 1 ? $ - 1 : 0), Q = 1; Q < $; Q++) pe[Q - 1] = arguments[Q];
          return l.produce(w, (function(je) {
            var fe;
            return (fe = s).call.apply(fe, [$e, je].concat(pe));
          }));
        };
      }
      var d;
      if (typeof s != "function" && _(6), n !== void 0 && typeof n != "function" && _(7), M(a)) {
        var h = Ce(i), f = ie(i, a, void 0), m = true;
        try {
          d = s(f), m = false;
        } finally {
          m ? V(h) : ee(h);
        }
        return typeof Promise < "u" && d instanceof Promise ? d.then((function(w) {
          return j(h, n), z(w, h);
        }), (function(w) {
          throw V(h), w;
        })) : (j(h, n), z(d, h));
      }
      if (!a || typeof a != "object") {
        if ((d = s(a)) === void 0 && (d = a), d === Be && (d = void 0), i.D && ce(d, true), n) {
          var g = [], E = [];
          k("Patches").M(a, d, g, E), n(g, E);
        }
        return d;
      }
      _(21, a);
    }, this.produceWithPatches = function(a, s) {
      if (typeof a == "function") return function(d) {
        for (var h = arguments.length, f = Array(h > 1 ? h - 1 : 0), m = 1; m < h; m++) f[m - 1] = arguments[m];
        return i.produceWithPatches(d, (function(g) {
          return a.apply(void 0, [g].concat(f));
        }));
      };
      var n, o, l = i.produce(a, s, (function(d, h) {
        n = d, o = h;
      }));
      return typeof Promise < "u" && l instanceof Promise ? l.then((function(d) {
        return [d, n, o];
      })) : [l, n, o];
    }, typeof t?.useProxies == "boolean" && this.setUseProxies(t.useProxies), typeof t?.autoFreeze == "boolean" && this.setAutoFreeze(t.autoFreeze);
  }
  var e = r.prototype;
  return e.createDraft = function(t) {
    M(t) || _(8), T(t) && (t = at(t));
    var i = Ce(this), a = ie(this, t, void 0);
    return a[v].C = true, ee(i), a;
  }, e.finishDraft = function(t, i) {
    var a = t && t[v], s = a.A;
    return j(s, i), z(void 0, s);
  }, e.setAutoFreeze = function(t) {
    this.D = t;
  }, e.setUseProxies = function(t) {
    t && !Re && _(20), this.O = t;
  }, e.applyPatches = function(t, i) {
    var a;
    for (a = i.length - 1; a >= 0; a--) {
      var s = i[a];
      if (s.path.length === 0 && s.op === "replace") {
        t = s.value;
        break;
      }
    }
    a > -1 && (i = i.slice(a + 1));
    var n = k("Patches").$;
    return T(t) ? n(t, i) : this.produce(t, (function(o) {
      return n(o, i);
    }));
  }, r;
})(), P = new ut(), ct = P.produce;
P.produceWithPatches.bind(P);
P.setAutoFreeze.bind(P);
P.setUseProxies.bind(P);
P.applyPatches.bind(P);
P.createDraft.bind(P);
P.finishDraft.bind(P);
class dt {
  constructor(e) {
    this.value = e, this.previousValue = e;
  }
  callbacks = /* @__PURE__ */ new Set();
  batchedCallbacks = /* @__PURE__ */ new Set();
  previousValue;
  update(e) {
    const t = ct(this.value, (a) => e(a)), i = this.value;
    i !== t && (this.value = t, this.callbacks.forEach((a) => a(this.value, i))), queueMicrotask(() => {
      this.previousValue !== this.value && (this.batchedCallbacks.forEach((a) => {
        a(this.value, this.previousValue);
      }), this.previousValue = this.value);
    });
  }
  onUpdate(e, t) {
    return t && e(this.value, this.previousValue), this.callbacks.add(e), () => {
      this.callbacks.delete(e);
    };
  }
  onUpdateBatched(e, t) {
    return t && e(this.value, this.previousValue), this.batchedCallbacks.add(e), () => {
      this.batchedCallbacks.delete(e);
    };
  }
}
class G {
  constructor(e, t, i) {
    this.partition = e, this.key = t, this.defaultValue = i, this.initialize();
  }
  signalCell = new N();
  value = null;
  async initialize() {
    const e = await u(c.storage).get(this.partition, this.key);
    e ? this.value = e : this.value = this.defaultValue, this.signalCell.resolve();
  }
  set(e) {
    this.value = e, u(c.storage).set(this.partition, this.key, e);
  }
  get() {
    return this.value ?? this.defaultValue;
  }
  async getWhenReady() {
    return await this.whenReady(), this.value;
  }
  async whenReady() {
    await this.signalCell.get();
  }
}
var U = ((r) => (r.config = "Config", r.appSettingsCache = "AppSettingsCache", r.queueCache = "QueueCache", r.status = "Status", r.debug = "Debug", r.freqCtrl = "FreqCtrl", r))(U || {});
const S = "intelligent", J = "intelligent-audio-effect";
class ht {
  memoryCache = /* @__PURE__ */ new Map();
  pendingRequests = /* @__PURE__ */ new Map();
  onConfigReadyCallbacks = /* @__PURE__ */ new Set();
  cachePromise = caches.open(J);
  getCacheKey(e) {
    return `${e.media_type}/${e.id}`;
  }
  getCacheUrl(e) {
    return `https://intelligent-audio-effect.local/${e}`;
  }
  getUrlFromMediaDetail(e) {
    return e.response?.track_player?.audio_effects?.[S] ?? null;
  }
  async getConfig(e, t) {
    const i = this.getCacheKey(e), a = this.memoryCache.get(i);
    if (a) return a;
    const n = await (await this.cachePromise).match(this.getCacheUrl(i));
    if (n) {
      const h = await n.text();
      return this.memoryCache.set(i, h), h;
    }
    const o = this.pendingRequests.get(i);
    if (o) return o;
    const l = this.getUrlFromMediaDetail(t);
    if (!l) return null;
    const d = this.fetchAndCache(i, l);
    this.pendingRequests.set(i, d);
    try {
      return await d;
    } finally {
      this.pendingRequests.delete(i);
    }
  }
  async fetchAndCache(e, t) {
    try {
      const i = await fetch(t);
      if (!i.ok) return console.error(`Failed to fetch intelligent audio effect: ${i.status}`), null;
      const a = await i.text();
      return await (await this.cachePromise).put(this.getCacheUrl(e), new Response(a, { headers: { "Content-Type": "application/json" } })), this.memoryCache.set(e, a), a;
    } catch (i) {
      return console.error("Failed to fetch intelligent audio effect:", i), null;
    }
  }
  getCachedConfig(e) {
    const t = this.getCacheKey(e);
    return this.memoryCache.get(t) ?? null;
  }
  async clearCache() {
    this.memoryCache.clear(), await caches.delete(J), this.cachePromise = caches.open(J);
  }
  onConfigReady(e) {
    return this.onConfigReadyCallbacks.add(e), () => this.onConfigReadyCallbacks.delete(e);
  }
  prefetch(e, t) {
    const i = this.getCacheKey(e);
    if (this.memoryCache.has(i) || this.pendingRequests.has(i)) return;
    const a = this.getUrlFromMediaDetail(t);
    if (!a) return;
    const s = this.fetchAndCache(i, a).then((n) => (n && this.onConfigReadyCallbacks.forEach((o) => o(e, n)), n));
    this.pendingRequests.set(i, s), s.finally(() => this.pendingRequests.delete(i));
  }
  hasUrl(e) {
    return !!this.getUrlFromMediaDetail(e);
  }
}
const re = new ht(), yt = 1e3, pt = 5e3, Ie = 10, Ae = 1000005;
class Y extends Error {
  constructor(e, t, i) {
    super(i ?? `\u5A92\u4F53\u4E0D\u53EF\u64AD\u653E (status_code: ${t})`), this.playable = e, this.statusCode = t, this.name = "UnplayableError";
  }
}
class L {
  constructor(e, t) {
    this.playable = e, this.etParams = t, this.doRequest();
  }
  promiseResolver = Promise.withResolvers();
  get promise() {
    return this.promiseResolver.promise;
  }
  data = null;
  error = null;
  time = A();
  retryCount = 0;
  isRetrying = false;
  cancelled = false;
  requestId = 0;
  onRemove;
  get isExpired() {
    try {
      return this.data ? this.time.add(1, "hour").isBefore(A()) : false;
    } catch {
      return true;
    }
  }
  cancel() {
    this.cancelled = true, this.isRetrying = false;
  }
  removeSelf() {
    this.onRemove?.();
  }
  removeSelfIfNoData() {
    this.data || this.onRemove?.();
  }
  static fromDiskCache(e, t, i) {
    const a = Object.create(L.prototype);
    return a.promiseResolver = Promise.withResolvers(), a.playable = e, a.etParams = t, a.data = i, a.error = null, a.time = A(), a.retryCount = 0, a.isRetrying = false, a.cancelled = false, a.requestId = 0, a.promiseResolver.resolve(), a;
  }
  fillFromDiskCache(e) {
    this.data || (this.data = e, this.promiseResolver.resolve());
  }
  calculateRetryDelay() {
    const e = yt * this.retryCount;
    return Math.min(e, pt);
  }
  async doRequestForTrack() {
    const e = (await u(c.sharedState).get("queue")).queue?.playables.limitedFreeInfos[this.playable.key], t = await u(c.appSettings).getSetting("limited_free"), i = await u(c.request).request("GetTrackV2", { media_type: this.playable.media_type, track_id: this.playable.id, queue_type: this.etParams.queue_type ?? "", scene_name: this.etParams.scene_name, play_count: await u(c.player).getTrackPlayCountMap(this.playable.id), limited_free_param: e?.limited_free ? { from_other_queue: false, is_login_support: t?.is_login_support ?? false, is_logout_support: t?.is_logout_support ?? false, ...e } : void 0 });
    if (i.status_code === Ae) throw new Y(this.playable, i.status_code, i.status_info?.status_msg);
    if (!i.track_player) throw new Error("track_player \u4E3A\u7A7A");
    if (i.track_player.video_model) this.data = { video_model: JSON.parse(i.track_player.video_model), video_model_type: i.track_player.video_model_type ?? -1, playable: i.track ? me(i.track) : this.playable, lyrics: i.lyric, response: i };
    else if (i.track_player.url_player_info) {
      const s = (await u(c.request).requestHttp({ method: "GET", url: i.track_player.url_player_info, responseType: "json" })).data, n = s?.Result?.Data?.PlayInfoList;
      if (!n || n.length === 0) throw new Error("PlayInfoList \u4E3A\u7A7A");
      const o = { video_list: n.map((l) => {
        if (!l.MainPlayUrl) throw new Error("PlayInfoList \u4E2D\u5B58\u5728 MainPlayUrl \u4E3A\u7A7A\u7684\u9879");
        return { main_url: l.MainPlayUrl, backup_url: l.BackupPlayUrl, video_meta: { quality: l.Quality ?? "unknown", bitrate: l.Bitrate ?? 0 }, encrypt_info: l.PlayAuth ? { spade_a: l.PlayAuth } : void 0 };
      }) };
      this.data = { video_model: o, video_model_type: i.track_player.video_model_type ?? -1, playable: i.track ? me(i.track) : this.playable, lyrics: i.lyric, response: i, fallback_response: s };
    } else throw new Error("url_player_info \u4E3A\u7A7A");
    re.prefetch(this.playable, this.data);
  }
  async doRequestForVideo() {
    const e = await u(c.request).request("GetVideoV2", { video_id: this.playable.id, type: this.playable.media_type, queue_type: this.etParams.queue_type ?? "", scene_name: this.etParams.scene_name, play_count: await u(c.player).getTrackPlayCountMap(this.playable.id) });
    if (console.log("response", e), e.status_code === Ae) throw new Y(this.playable, e.status_code, e.status_info?.status_msg);
    const t = e.player_infos?.find((i) => i.video_model_type === 1);
    if (!t) throw new Error("video_player \u4E3A\u7A7A");
    if (t.video_model) this.data = { video_model: JSON.parse(t.video_model), video_model_type: t.video_model_type ?? -1, playable: e.video ? ge(e.video) : this.playable, response: e }, console.log("mediaDetail ori", this.data);
    else if (t.url_player_info) {
      const a = (await u(c.request).requestHttp({ method: "GET", url: t.url_player_info, responseType: "json" })).data, s = a?.Result?.Data?.PlayInfoList;
      if (!s || s.length === 0) throw new Error("PlayInfoList \u4E3A\u7A7A");
      const n = { video_list: s.map((o) => {
        if (!o.MainPlayUrl) throw new Error("PlayInfoList \u4E2D\u5B58\u5728 MainPlayUrl \u4E3A\u7A7A\u7684\u9879");
        return { main_url: o.MainPlayUrl, backup_url: o.BackupPlayUrl, video_meta: { quality: o.Quality ?? "unknown", bitrate: o.Bitrate ?? 0 }, encrypt_info: o.PlayAuth ? { spade_a: o.PlayAuth } : void 0 };
      }) };
      this.data = { video_model: n, video_model_type: t.video_model_type ?? -1, playable: e.video ? ge(e.video) : this.playable, response: e, fallback_response: a };
    } else throw new Error("url_player_info \u4E3A\u7A7A");
  }
  async doRequest() {
    this.requestId++;
    const e = this.requestId;
    for (; ; ) {
      if (this.cancelled || this.requestId !== e) {
        console.log(`\u8BF7\u6C42\u5DF2\u53D6\u6D88\u6216\u88AB\u65B0\u8BF7\u6C42\u66FF\u4EE3\uFF0C\u505C\u6B62\u91CD\u8BD5: ${this.playable.id}`), this.isRetrying = false, this.cancelled && !this.data && this.promiseResolver.reject(new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88")), this.cancelled && this.removeSelfIfNoData();
        return;
      }
      try {
        this.error = null, this.playable.type === p.Track ? await this.doRequestForTrack() : await this.doRequestForVideo(), this.time = A(), this.isRetrying = false, this.retryCount = 0, this.promiseResolver.resolve();
        return;
      } catch (t) {
        if (console.error(`\u83B7\u53D6 video_model \u5931\u8D25 (\u7B2C ${this.retryCount + 1} \u6B21\u5C1D\u8BD5):`, t), this.error = t, t instanceof Y) {
          console.warn(`\u5A92\u4F53\u4E0D\u53EF\u64AD\u653E\uFF0C\u505C\u6B62\u91CD\u8BD5: ${t.message}`), this.isRetrying = false, this.promiseResolver.reject(t), this.removeSelf(), this.handleUnplayable(t.playable);
          return;
        }
        if ((await u(c.sharedState).get("queue")).queue?.currentPlayable.key !== this.playable.key) {
          console.log(`\u6B4C\u66F2\u5DF2\u5207\u8D70\uFF0C\u505C\u6B62\u91CD\u8BD5: ${this.playable.id}`), this.isRetrying = false, this.data || this.promiseResolver.reject(new Error("\u6B4C\u66F2\u5DF2\u5207\u8D70")), this.removeSelfIfNoData();
          return;
        }
        const s = await u(c.sharedState).get("window"), n = s.windows.main;
        if ((n?.isMinimize || n?.isHidden || s.isInactive) && this.retryCount >= Ie) {
          console.log(`\u7A97\u53E3\u5728\u540E\u53F0\uFF0C\u91CD\u8BD5\u8FBE\u5230\u6700\u5927\u6B21\u6570 ${Ie}\uFF0C\u505C\u6B62\u91CD\u8BD5: ${this.playable.id}`), this.isRetrying = false, this.data || this.promiseResolver.reject(new Error("\u540E\u53F0\u91CD\u8BD5\u6B21\u6570\u5DF2\u8FBE\u4E0A\u9650")), this.removeSelfIfNoData();
          return;
        }
        this.retryCount++, this.isRetrying = true;
        const l = this.calculateRetryDelay();
        console.log(`${l}ms \u540E\u8FDB\u884C\u7B2C ${this.retryCount + 1} \u6B21\u91CD\u8BD5`), await ne(l);
      }
    }
  }
  async handleUnplayable(e) {
    try {
      if ((await u(c.sharedState).get("queue")).queue?.currentPlayable.key === e.key) {
        const { abroadType: a } = await u(c.sharedState).get("region"), s = e.type === p.Video ? "\u89C6\u9891" : "\u6B4C\u66F2", n = a === "2" ? `\u5F53\u524D${s}\u56E0\u7248\u6743\u9650\u5236\uFF0C\u6240\u5728\u56FD\u5BB6/\u5730\u533A\u4E0D\u652F\u6301\u64AD\u653E\uFF0C\u5DF2\u4E3A\u60A8\u81EA\u52A8\u8DF3\u8FC7` : `\u5F53\u524D${s}\u65E0\u6CD5\u64AD\u653E\uFF0C\u5DF2\u4E3A\u60A8\u81EA\u52A8\u8DF3\u8FC7`;
        u(c.renderer).showToast({ message: n }), await u(c.queue).playNext(y.auto);
      }
      await u(c.queue).removePlayable(e.key);
    } catch (t) {
      console.error("\u5904\u7406\u4E0D\u53EF\u64AD\u653E\u5A92\u4F53\u65F6\u51FA\u9519:", t);
    }
  }
  async refresh() {
    return this.error = null, this.time = A(), this.retryCount = 0, this.isRetrying = false, this.cancelled = false, this.promiseResolver = Promise.withResolvers(), await this.doRequest(), this.data;
  }
}
class ft {
  detailCache = /* @__PURE__ */ new Map();
  constructor() {
    setInterval(() => {
      for (const [e, t] of this.detailCache) t.isExpired && this.detailCache.delete(e);
    }, 6e4);
  }
  keyOf(e) {
    return `${e.media_type}/${e.id}`;
  }
  cacheOf(e) {
    const t = this.keyOf(e);
    return this.detailCache.get(t);
  }
  async getDetail(e, t) {
    const i = this.keyOf(e);
    let a = this.detailCache.get(i);
    if (a && !a.data && !a.isRetrying && a.error && (this.detailCache.delete(i), a = void 0), a || (a = new L(e, t), a.onRemove = () => this.detailCache.delete(i), this.detailCache.set(i, a)), a.data) return a.data;
    if (await a.promise, a.error) throw a.error;
    if (a.data) return a.data;
    throw new Error("\u5206\u652F\u5F02\u5E38");
  }
  tryGetDetail(e) {
    const t = this.keyOf(e);
    return this.detailCache.get(t)?.data ?? void 0;
  }
  deleteCache(e) {
    const t = this.keyOf(e);
    this.detailCache.get(t)?.cancel(), this.detailCache.delete(t);
  }
  async clear() {
    for (const e of this.detailCache.values()) e.cancel();
    this.detailCache.clear();
  }
  async refreshDetail(e) {
    const t = this.cacheOf(e);
    return t ? t.refresh() : null;
  }
  setDetailFromDiskCache(e, t, i, a) {
    const s = this.keyOf(e);
    let n = this.detailCache.get(s);
    n ? n.fillFromDiskCache(t) : (n = L.fromDiskCache(e, i, t), n.onRemove = () => this.detailCache.delete(s), this.detailCache.set(s, n)), n.refresh().then((o) => {
      o && a && a(o);
    }).catch((o) => {
      console.warn("stale-while-revalidate: \u540E\u53F0\u5237\u65B0\u5931\u8D25", o);
    });
  }
}
class mt {
  isCalcForeground = true;
  isPlaying = false;
  playStartTime = -1;
  playTotalTime = 0;
  foregroundTotalTime = 0;
  foregroundStartProgress = 0;
  backgroundTotalTime = 0;
  backgroundStartProgress = 0;
  reset(e) {
    this.playStartTime = this.isPlaying ? performance.now() : -1, this.playTotalTime = 0, this.isCalcForeground = e, this.foregroundStartProgress = 0, this.foregroundTotalTime = 0, this.backgroundStartProgress = 0, this.backgroundTotalTime = 0;
  }
  handleResume() {
    this.isPlaying || (this.isPlaying = true, this.playStartTime = performance.now());
  }
  handleSuspend() {
    this.isPlaying && (this.isPlaying = false, this.playStartTime !== -1 && (this.playTotalTime += performance.now() - this.playStartTime), this.playStartTime = -1);
  }
  getPlayingTimeMs() {
    return this.playStartTime === -1 ? this.playTotalTime : this.playTotalTime + (performance.now() - this.playStartTime);
  }
  handleToBackground() {
    this.isCalcForeground && (this.isCalcForeground = false, this.foregroundTotalTime += this.getPlayingTimeMs() - this.foregroundStartProgress, this.backgroundStartProgress = this.getPlayingTimeMs());
  }
  handleToForeground() {
    this.isCalcForeground || (this.isCalcForeground = true, this.backgroundTotalTime += this.getPlayingTimeMs() - this.backgroundStartProgress, this.foregroundStartProgress = this.getPlayingTimeMs());
  }
  getBackgroundMs() {
    return this.isCalcForeground ? this.backgroundTotalTime : this.backgroundTotalTime + (this.getPlayingTimeMs() - this.backgroundStartProgress);
  }
  getForegroundMs() {
    return this.isCalcForeground ? this.foregroundTotalTime + (this.getPlayingTimeMs() - this.foregroundStartProgress) : this.foregroundTotalTime;
  }
}
class gt {
  constructor(e) {
    this.service = e, this.setupMediaOverByFocusChangedReporter(), this.setupAudioFinishReporter();
  }
  reportWhenResume = false;
  isMediaSeeked = false;
  isMediaSeekedByLyrics = false;
  timeCalc = new mt();
  eventData = /* @__PURE__ */ new Map();
  sessionEventParams = {};
  cacheStatusParams = {};
  progressedReported = false;
  initTime = 0;
  bufferStartTime = 0;
  bufferingSessionId = "";
  bufferredSignal = new N();
  counter = 0;
  debouncedReportSeek = ve.debounce(({ src: e, srcPct: t, dst: i, dstPct: a, isFromLyrics: s }) => {
    const n = this.service.queueState.value.queue;
    if (!n || !n.currentPlayable.key) return {};
    const o = n.playables.byKey[n.currentPlayable.key];
    if (!o) return {};
    u(c.applog).report({ event: "progress_bar_move", params: { ...this.getPlayableCommonEtParams(o.id), end_place: i * 1e3, end_place_pct: a, start_place: e * 1e3, start_place_pct: t, from_action: s ? "click" : "progress_bar" } });
  }, 1e3);
  debouncedReportSetVolume = ve.debounce((e, t, i = {}) => {
    const a = this.service.queueState.value.queue;
    if (!a || !a.currentPlayable.key) return {};
    const s = a.playables.byKey[a.currentPlayable.key];
    if (!s) return {};
    u(c.applog).report({ event: "volume_change", params: { ...this.getPlayableCommonEtParams(s.id), direction: e > t ? "up" : "down", changed_pct: e, action_type: "player", ...i } });
  }, 1e3);
  createMediaCommonEtParams(e) {
    if (!e || !e.currentPlayable.key) return {};
    const t = e.playables.byKey[e.currentPlayable.key];
    let i = -1;
    const a = this.service.modelManager?.tryGetDetail(t);
    return a ? a.video_model_type === 2 ? i = 1 : i = 0 : this.service.commerceState.value.hasPlayEntitlement ? i = 0 : i = t.label_info?.only_vip_playable ? 1 : 0, { ...e.etParams ?? {}, group_type: t.type === p.Track ? "track" : "video", group_id: t.id, media_type: t.media_type, request_id: e.playables.requestIdMap[e.currentPlayable.key] ?? "", is_red_collected: Ne(this.service.collectState.value, { type: Oe.playable, id: t.id }) ? 1 : 0, media_start_play_mode: { [q.listLoop]: "loop", [q.singleLoop]: "single", [q.shuffle]: "shuffle" }[e.playback.playOrder], play_action_type: { [y.auto]: "auto_play", [y.skipFailed]: "auto_play", [y.userNext]: "next", [y.userPrevious]: "previous", [y.specific]: "click_list_item", [y.switchPlayable]: "click_sheet_queue", [y.list]: "click_button_all", [y.feedInit]: "reco_manual_play", [y.feedSwitch]: "reco_auto_play", [y.hotkeyNext]: "hotkey_next", [y.hotKeyPrevious]: "hotkey_previous" }[e.currentPlayable.switchType], risk_result: this.service.riskResultMap.get(t.id) ?? -1, is_preview: i, queue_play_index: e.playables.currentKeys.indexOf(e.currentPlayable.key), ...e.currentPlayable.playSourceParams, ...ze({ playable: t, queueState: this.service.queueState.value, commerceState: this.service.commerceState.value }) };
  }
  getPlayableCommonEtParams(e) {
    return { ...this.eventData.get(e), risk_result: this.service.riskResultMap.get(e) ?? -1, track_quality: this.service.state.value.playingQuality, user_selected_quality: this.service.getEffectiveQuality(), track_music_effect: this.service.state.value.currentAudioEffect ?? "" };
  }
  mergePlaySourceParams(e) {
    const t = this.service.queueState.value.queue;
    if (!t || !t.currentPlayable.key) return;
    const i = t.playables.byKey[t.currentPlayable.key];
    if (!i) return;
    const a = this.eventData.get(i.id);
    a && this.eventData.set(i.id, { ...a, ...e });
  }
  handleCurrentMediaChanged() {
    const e = this.service.queueState.value.queue;
    if (!e || !e.currentPlayable.key) return;
    const t = e.playables.byKey[e.currentPlayable.key];
    if (!t) return;
    const i = t.id, a = this.createMediaCommonEtParams(e);
    this.eventData.set(i, a), this.service.state.update((s) => {
      s.mediaEtParams = Object.fromEntries([...Object.entries(s.mediaEtParams).slice(-5), [i, a]]);
    }), this.service.modelManager?.getDetail(t, this.service.queueState.value.queue?.etParams ?? {}).then((s) => {
      this.service.queueState.value.queue?.currentPlayable.key === e.currentPlayable.key && this.eventData.set(i, { ...this.eventData.get(i), is_preview: s.video_model_type === 2 ? 1 : 0 });
    }), this.sessionEventParams = { session_id: Pe(), url: "", host: "" }, this.cacheStatusParams = {}, this.progressedReported = false, this.initTime = performance.now(), this.bufferStartTime = 0, this.bufferingSessionId = "", this.bufferredSignal = new N(), u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "init" } });
  }
  getCurrentReportCommonParams() {
    const e = this.service.queueState.value.queue;
    return this.createMediaCommonEtParams(e);
  }
  reportMediaPlay(e = {}) {
    const t = this.service.queueState.value.queue;
    if (!t || !t.currentPlayable.key) return {};
    const i = t.playables.byKey[t.currentPlayable.key];
    if (!i) return {};
    if (t.currentPlayable.switchType === y.feedSwitch && t.playback.isPlayed) {
      this.timeCalc.reset(this.service.windowState.value.windows[b.main]?.isFocus ?? false);
      return;
    }
    const a = this.getPlayableCommonEtParams(i.id);
    u(c.applog).report({ event: i.type === p.Track ? "audio_play" : "video_play", params: { ...a, ...e } });
  }
  getMetricsReportCommonParams() {
    const e = this.service.queueState.value.queue;
    if (!e || !e.currentPlayable.key) return;
    const t = e.playables.byKey[e.currentPlayable.key];
    if (!t) return;
    const i = this.getPlayableCommonEtParams(t.id);
    return { engine_version: "v4", enable_disk_cache: 1, enable_player_precreate: 1, ...this.sessionEventParams, ...i, ...this.cacheStatusParams, cost: performance.now() - this.initTime };
  }
  reportMetricsError(e) {
    u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "error", reason: e.message, extra_data: JSON.stringify(e) } });
  }
  reportMetricsModelError(e) {
    u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "model_error", reason: e.message, extra_data: JSON.stringify(e) } });
  }
  reportMetricsPoint(e, t) {
    u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "point", reason: e, extra_data: t } });
  }
  reportMetricsEOF(e) {
    u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "eof", reason: e } });
  }
  reportMetricsErrorEnd(e) {
    u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "error_end", reason: e } });
  }
  reportMetricsModelLoad(e) {
    this.sessionEventParams.url = e, this.sessionEventParams.host = new URL(e).hostname, u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "model_load", cost: performance.now() - this.initTime } });
  }
  reportMetricsPlayable() {
    console.log("playablecost", performance.now() - this.initTime), u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "playable", cost: performance.now() - this.initTime } });
  }
  async reportMetricsBufferStart() {
    const e = Pe();
    this.bufferingSessionId = e, this.bufferStartTime = performance.now(), this.bufferredSignal = new N(), await ne(300), this.bufferingSessionId === e && (this.bufferredSignal.tryGet().done || (u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), buffering_session_id: e, type: "buffer_start" } }), await this.bufferredSignal.get(), u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), buffering_session_id: e, type: "buffer_end", cost: performance.now() - this.bufferStartTime } })));
  }
  tryReportMetricsProgressed({ progress: e, duration: t }) {
    this.progressedReported || (u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "progressed", extra_data: String(e), duration: t } }), this.progressedReported = true);
  }
  tryNotifyBufferEnd() {
    this.bufferredSignal.resolve();
  }
  reportMediaOverBySuspend(e = {}) {
    const t = this.service.queueState.value.queue;
    if (!t || !t.currentPlayable.key) return;
    const i = t.playables.byKey[t.currentPlayable.key];
    i && u(c.applog).report({ event: i.type === p.Track ? "audio_over" : "video_over", params: { ...this.getPlayableCommonEtParams(i.id), [`${i.type === p.Track ? "audio" : "video"}_over_status`]: "pause", duration_pct: this.timeCalc.getPlayingTimeMs() / (this.service.state.value.durationSeconds * 1e3), duration: Math.round(this.timeCalc.getPlayingTimeMs()), ...e } });
  }
  reportPlayMode() {
    const e = this.service.queueState.value.queue;
    if (!e || !e.currentPlayable.key) return;
    const t = e.playables.byKey[e.currentPlayable.key];
    t && u(c.applog).report({ event: "play_mode", params: { ...this.getPlayableCommonEtParams(t.id), mode_status: { [q.listLoop]: "loop", [q.singleLoop]: "single", [q.shuffle]: "shuffle" }[e.playback.playOrder] } });
  }
  setupMediaOverByFocusChangedReporter() {
    this.service.windowState.onUpdate((e, t) => {
      if (!t || !this.service.state.value.isPlaying) return;
      let i = "";
      if (e.windows[b.main]?.isFocus && !t.windows[b.main]?.isFocus ? (this.timeCalc.handleToForeground(), i = "foreground_focus") : !e.windows[b.main]?.isMinimize && t.windows[b.main]?.isMinimize ? (this.timeCalc.handleToForeground(), i = "foreground_minimize") : !e.windows[b.main]?.isFocus && t.windows[b.main]?.isFocus ? (this.timeCalc.handleToBackground(), i = "background_lose_focus") : e.windows[b.main]?.isMinimize && !t.windows[b.main]?.isMinimize && (this.timeCalc.handleToBackground(), i = "background_minimize"), i) {
        const a = this.service.queueState.value.queue;
        if (!a || !a.currentPlayable.key) return;
        const s = a.playables.byKey[a.currentPlayable.key];
        if (!s) return;
        u(c.applog).report({ event: s.type === p.Track ? "audio_over" : "video_over", params: { ...this.getPlayableCommonEtParams(s.id), duration_pct: this.timeCalc.getPlayingTimeMs() / (this.service.state.value.durationSeconds * 1e3), duration: Math.round(this.timeCalc.getPlayingTimeMs()), [`${s.type === p.Track ? "audio" : "video"}_over_status`]: i } });
      }
    });
  }
  reportMediaFinish() {
    const e = this.service.queueState.value.queue;
    if (!e || !e.currentPlayable.id || !e.currentPlayable.key) return;
    const t = e.playables.byKey[e.currentPlayable.key];
    t && (u(c.applog).report({ event: t.type === p.Track ? "audio_over" : "video_over", params: { ...this.getPlayableCommonEtParams(e.currentPlayable.id ?? ""), [`${t.type === p.Track ? "audio" : "video"}_over_status`]: "finished", duration_pct: this.timeCalc.getPlayingTimeMs() / (this.service.state.value.durationSeconds * 1e3), duration: Math.round(this.timeCalc.getPlayingTimeMs()) } }), this.tryNotifyBufferEnd(), u(c.applog).report({ event: t.type === p.Track ? "audio_finish" : "video_finish", params: { ...this.getPlayableCommonEtParams(e.currentPlayable.id), duration_pct: this.timeCalc.getPlayingTimeMs() / (this.service.state.value.durationSeconds * 1e3), duration: Math.round(this.timeCalc.getPlayingTimeMs()), [`${t.type === p.Track ? "audio" : "video"}_finish_status`]: "finished", foreground_dur: Math.round(this.timeCalc.getForegroundMs()), background_dur: Math.round(this.timeCalc.getBackgroundMs()), is_lyrics_move: this.isMediaSeeked ? 1 : 0, is_progress_bar_move: this.isMediaSeekedByLyrics ? 1 : 0 } }), this.isMediaSeeked = false, this.isMediaSeekedByLyrics = false, this.timeCalc.reset(this.service.windowState.value.windows[b.main]?.isFocus ?? false));
  }
  setupAudioFinishReporter() {
    this.service.queueState.onUpdate((e, t) => {
      if (!t) return;
      const i = e.queue, a = t.queue;
      if (!(!i || !a || !a.currentPlayable.id)) {
        if (i.queueId !== a.queueId) {
          if (this.service.finishPlayRecord(), !a.currentPlayable.key) return;
          const s = a.playables.byKey[a.currentPlayable.key];
          if (!s) return;
          if (a.queueId === "feed") {
            this.timeCalc.reset(this.service.windowState.value.windows[b.main]?.isFocus ?? false), u(c.applog).report({ event: s.type === p.Track ? "audio_over" : "video_over", params: { ...this.getPlayableCommonEtParams(a.currentPlayable.id ?? ""), [`${s.type === p.Track ? "audio" : "video"}_over_status`]: "change_track_reco", duration_pct: this.timeCalc.getPlayingTimeMs() / (this.service.state.value.durationSeconds * 1e3), duration: Math.round(this.timeCalc.getPlayingTimeMs()) } });
            return;
          } else u(c.applog).report({ event: s.type === p.Track ? "audio_over" : "video_over", params: { ...this.getPlayableCommonEtParams(a.currentPlayable.id ?? ""), [`${s.type === p.Track ? "audio" : "video"}_over_status`]: "change_queue", duration_pct: this.timeCalc.getPlayingTimeMs() / (this.service.state.value.durationSeconds * 1e3), duration: Math.round(this.timeCalc.getPlayingTimeMs()) } });
          this.tryNotifyBufferEnd();
          const n = this.getPlayableCommonEtParams(a.currentPlayable.id ?? "");
          u(c.applog).report({ event: s.type === p.Track ? "audio_finish" : "video_finish", params: { ...n, duration_pct: this.timeCalc.getPlayingTimeMs() / (this.service.state.value.durationSeconds * 1e3), duration: Math.round(this.timeCalc.getPlayingTimeMs()), [`${s.type === p.Track ? "audio" : "video"}_finish_status`]: "change_queue", foreground_dur: Math.round(this.timeCalc.getForegroundMs()), background_dur: Math.round(this.timeCalc.getBackgroundMs()), is_lyrics_move: this.isMediaSeeked ? 1 : 0, is_progress_bar_move: this.isMediaSeekedByLyrics ? 1 : 0 } }), u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "finish", cost: this.timeCalc.getPlayingTimeMs(), extra_data: "" } });
        } else if (i.currentPlayable.id !== a.currentPlayable.id) {
          if (this.service.finishPlayRecord(), !a.currentPlayable.key) return;
          const s = a.playables.byKey[a.currentPlayable.key];
          if (!s) return;
          const n = this.getPlayableCommonEtParams(a.currentPlayable.id ?? "");
          u(c.applog).report({ event: s.type === p.Track ? "audio_over" : "video_over", params: { ...n, [`${s.type === p.Track ? "audio" : "video"}_over_status`]: { [y.auto]: "finished", [y.skipFailed]: "finished", [y.userNext]: "next", [y.userPrevious]: "previous", [y.specific]: "change_queue", [y.switchPlayable]: "shift", [y.feedInit]: "change_track_reco", [y.feedSwitch]: "change_track_reco", [y.list]: "change_queue", [y.hotkeyNext]: "hotkey_next", [y.hotKeyPrevious]: "hotkey_previous" }[i.currentPlayable.switchType], duration_pct: this.timeCalc.getPlayingTimeMs() / (this.service.state.value.durationSeconds * 1e3), duration: Math.round(this.timeCalc.getPlayingTimeMs()) } }), this.tryNotifyBufferEnd(), u(c.applog).report({ event: s.type === p.Track ? "audio_finish" : "video_finish", params: { ...this.getPlayableCommonEtParams(a.currentPlayable.id), duration_pct: this.timeCalc.getPlayingTimeMs() / (this.service.state.value.durationSeconds * 1e3), duration: Math.round(this.timeCalc.getPlayingTimeMs()), [`${s.type === p.Track ? "audio" : "video"}_finish_status`]: { [y.auto]: "finished", [y.skipFailed]: "finished", [y.userNext]: "next", [y.userPrevious]: "previous", [y.specific]: "change_queue", [y.switchPlayable]: "shift", [y.feedInit]: "change_queue", [y.feedSwitch]: "change_queue", [y.list]: "change_queue", [y.hotkeyNext]: "hotkey_next", [y.hotKeyPrevious]: "hotkey_previous" }[i.currentPlayable.switchType], foreground_dur: Math.round(this.timeCalc.getForegroundMs()), background_dur: Math.round(this.timeCalc.getBackgroundMs()), is_lyrics_move: this.isMediaSeeked ? 1 : 0, is_progress_bar_move: this.isMediaSeekedByLyrics ? 1 : 0 } }), u(c.applog).report({ event: "player_metrics", params: { ...this.getMetricsReportCommonParams(), type: "finish", cost: this.timeCalc.getPlayingTimeMs() } });
        }
        this.isMediaSeeked = false, this.isMediaSeekedByLyrics = false, this.timeCalc.reset(this.service.windowState.value.windows[b.main]?.isFocus ?? false);
      }
    });
  }
}
class vt {
  constructor(e) {
    this.service = e, this.bindEvents();
  }
  bindEvents() {
    navigator.mediaSession.setActionHandler("play", () => {
      u(c.player).resume({ audio_over_status: "hotkey_play" });
    }), navigator.mediaSession.setActionHandler("pause", () => {
      u(c.player).suspend({ audio_over_status: "hotkey_pause" });
    }), navigator.mediaSession.setActionHandler("stop", () => {
      u(c.player).suspend();
    }), navigator.mediaSession.setActionHandler("seekto", (e) => {
      typeof e.seekTime == "number" && u(c.player).seekSeconds(e.seekTime);
    }), navigator.mediaSession.setActionHandler("previoustrack", () => {
      u(c.queue).playPrevious(y.hotkeyNext, { audio_over_status: "hotkey_next" });
    }), navigator.mediaSession.setActionHandler("nexttrack", () => {
      u(c.queue).playNext(y.hotKeyPrevious, { audio_over_status: "hotkey_previous" });
    });
  }
  updatePlayable(e) {
    navigator.mediaSession.metadata = new MediaMetadata({ title: e.name, artist: e.artists?.map((t) => t.name).join(", "), album: e.album?.name, ...e.cover_url ? { artwork: [96, 128, 192, 256, 384, 512].map((t) => ({ src: We(e.cover_url, { width: t, height: t }), sizes: `${t}x${t}`, type: "image/jpeg" })) } : {} });
  }
}
class R {
  listeners = /* @__PURE__ */ new Map();
  constructor() {
  }
  on(e) {
    const t = Symbol("EventListener");
    return this.listeners.set(t, e), () => {
      this.listeners.delete(t);
    };
  }
  emit(e) {
    for (const t of this.listeners.values()) t(e);
  }
  attach(e) {
    return this.on((t) => e.emit(t));
  }
  clear() {
    this.listeners.clear();
  }
}
function Ke(r, e, t) {
  const i = e.find((o) => t(o) === r);
  if (i) return i;
  const a = Fe.map((o) => o.key), s = a.indexOf(r), n = s === -1 ? a : a.slice(s);
  for (const o of n) {
    const l = e.find((d) => t(d) === o);
    if (l) return l;
  }
  return e[0];
}
function De(r) {
  const e = r.playable.bit_rates?.map((i) => i.quality).filter((i) => !!i) ?? [], t = X(r.benefitQuality);
  return Qe(r.playable) ? se(e, t) : se(e.filter((i) => He(t, i)), t);
}
function se(r, e = Fe) {
  const t = e.map((i) => i.key);
  return [...r].sort((i, a) => t.indexOf(i) - t.indexOf(a));
}
class Pt {
  audioContext;
  gainNode;
  currentSourceNode = null;
  effectNode = null;
  sourceNodes = /* @__PURE__ */ new WeakMap();
  savedVolume = 1;
  isMuted = false;
  constructor() {
    this.audioContext = new AudioContext(), this.gainNode = this.audioContext.createGain(), this.gainNode.connect(this.audioContext.destination);
  }
  connectPlayer(e) {
    let t = this.sourceNodes.get(e);
    return t || (t = this.audioContext.createMediaElementSource(e), this.sourceNodes.set(e, t)), this.currentSourceNode && this.currentSourceNode !== t && this.currentSourceNode.disconnect(), this.currentSourceNode = t, this.rebuildConnection(), t;
  }
  rebuildConnection() {
    this.currentSourceNode && (this.currentSourceNode.disconnect(), this.effectNode ? (this.currentSourceNode.connect(this.effectNode), this.effectNode.connect(this.gainNode)) : this.currentSourceNode.connect(this.gainNode));
  }
  setVolume(e) {
    this.savedVolume = e, this.isMuted || (this.gainNode.gain.value = e);
  }
  setMuted(e) {
    this.isMuted = e, this.gainNode.gain.value = e ? 0 : this.savedVolume;
  }
  getAudioContext() {
    return this.audioContext;
  }
  insertEffectNode(e) {
    this.effectNode && this.effectNode.disconnect(), this.effectNode = e, this.rebuildConnection();
  }
  ensureResumed() {
    this.audioContext.state === "suspended" && this.audioContext.resume();
  }
}
const bt = "" + new URL("./audioEffectProcessor.js", import.meta.url).href, _t = "" + new URL("byte_audio_tuner_wasm-BOQqSFWE.wasm", import.meta.url).href;
class kt {
  constructor(e) {
    this.contextManager = e, this.initPromise = this.doInitWorklet();
  }
  workletNode = null;
  currentConfig = null;
  initPromise;
  async setConfig(e) {
    if (this.currentConfig === e) {
      console.log("[\u667A\u80FD\u97F3\u6548] \u914D\u7F6E\u672A\u53D8\u5316\uFF0C\u8DF3\u8FC7\u8BBE\u7F6E");
      return;
    }
    if (console.log("[\u667A\u80FD\u97F3\u6548] \u8BBE\u7F6E\u97F3\u6548\u914D\u7F6E:", e ? JSON.parse(e) : null), this.currentConfig = e, await this.initPromise, e === null) {
      this.contextManager.insertEffectNode(null), this.workletNode && this.workletNode.port.postMessage({ type: "setEnabled", data: { enabled: false } });
      return;
    }
    this.applyConfig(e);
  }
  applyConfig(e) {
    if (!this.workletNode) return;
    const t = this.contextManager.getAudioContext();
    this.workletNode.port.postMessage({ type: "loadConfig", data: { configJson: e } }), this.workletNode.port.postMessage({ type: "prepare", data: { sampleRate: t.sampleRate, channels: t.destination.maxChannelCount || 2 } }), this.workletNode.port.postMessage({ type: "setEnabled", data: { enabled: true } }), this.contextManager.insertEffectNode(this.workletNode);
  }
  getWorkletNode() {
    return this.workletNode;
  }
  getCurrentConfig() {
    return this.currentConfig;
  }
  async doInitWorklet() {
    const e = this.contextManager.getAudioContext();
    try {
      const [, t] = await Promise.all([e.audioWorklet.addModule(bt), fetch(_t).then((i) => i.arrayBuffer())]);
      this.workletNode = new AudioWorkletNode(e, "audio-effect-processor", { numberOfInputs: 1, numberOfOutputs: 1 }), await new Promise((i, a) => {
        const s = setTimeout(() => {
          a(new Error("AudioWorklet initialization timeout"));
        }, 1e4);
        this.workletNode.port.onmessage = (n) => {
          const o = n.data;
          o.type === "ready" ? (clearTimeout(s), i()) : o.type === "error" && (clearTimeout(s), a(new Error(o.error)));
        }, this.workletNode.port.postMessage({ type: "init", data: { wasmBinary: t } }, [t]);
      });
    } catch (t) {
      throw console.error("Failed to initialize AudioWorklet:", t), t;
    }
  }
}
class Le {
  constructor(e) {
    this.service = e, this.audioContextManager = new Pt(), this.audioEffectManager = new kt(this.audioContextManager);
  }
  player = document.createElement("video");
  previousPlayerRid = null;
  playerPool = {};
  preloadRids = [];
  loadState = "init";
  currentResourceId = null;
  cachedResourceId = null;
  playingChangedEvent = new R();
  readyEvent = new R();
  loadingChangedEvent = new R();
  finishedEvent = new R();
  playerErrorEvent = new R();
  modelErrorEvent = new R();
  cacheStatusPwr = Promise.withResolvers();
  playerNotifier = {};
  currentPlayable;
  isPlaying = false;
  muted = false;
  volume = 0;
  progress = 0;
  audioContextManager;
  audioEffectManager;
  initPlayer(e, t) {
    let i = false;
    const a = document.getElementById("player-recycle-bin");
    a.innerHTML = "", this.player.onplay = () => {
    }, this.player.onwaiting = () => {
    }, this.player.onplaying = () => {
    }, this.player.onended = () => {
    }, this.player.onerror = () => {
    }, this.player.pause();
    const s = this.player.getAttribute("data-rid");
    s && (this.playerPool[s] = this.player, this.previousPlayerRid = s);
    const n = this.playerPool[t];
    n && !n.error ? (console.log("playerdebug reuse", n), this.player = n, this.playerNotifier[e]?.forEach((l) => l(this.player)), i = true) : (this.player = document.createElement("video"), this.player.setAttribute("data-rid", t), this.player.setAttribute("data-playable-key", e), this.playerNotifier[e]?.forEach((l) => l(this.player)), i = false, console.log("playerdebug create", this.player)), this.player.currentTime = this.progress, this.audioContextManager.connectPlayer(this.player), this.player.oncanplay = () => {
      this.loadState === "fetch" && (this.loadState = "playable", this.readyEvent.emit());
    }, this.player.onwaiting = () => {
      this.loadState === "playable" && (this.loadState = "buffering", this.loadingChangedEvent.emit(true));
    }, this.player.onplaying = () => {
      this.loadState === "buffering" && (this.loadState = "playable", this.loadingChangedEvent.emit(false));
    }, this.player.onended = () => {
      this.finishedEvent.emit();
    }, this.player.onerror = async (l) => {
      this.log(`e:player:error with code=${this.player.error?.code} message=${this.player.error?.message}`);
      const d = { message: this.player.error?.message ?? "SOURCE_ERROR", src: this.player.src, code: this.player.error?.code };
      this.playerErrorEvent.emit(d), this.loadState = "mediaError", console.log("cachedResourceId", this.cachedResourceId), this.cachedResourceId && (console.log("removeCache"), await u(c.playerProxy).removeCache(this.cachedResourceId)), await ne(1e3), this.restart();
    };
    const o = /* @__PURE__ */ new Set();
    for (const l of this.preloadRids) o.add(l);
    this.previousPlayerRid && o.add(this.previousPlayerRid);
    for (const l of Object.keys(this.playerPool)) o.has(l) || (console.log("playerdebug clear", l), delete this.playerPool[l]);
    return console.log("playerdebug poolsize", Object.keys(this.playerPool).length), { fromCache: i };
  }
  get modelManager() {
    return this.service.modelManager;
  }
  getDuration() {
    return Number.isNaN(this.player.duration) ? 0 : this.player.duration;
  }
  getProgress() {
    return Number.isNaN(this.player.currentTime) ? 0 : this.player.currentTime;
  }
  setMuted(e) {
    this.muted = e, this.audioContextManager.setMuted(e);
  }
  setVolume(e) {
    this.volume = e, this.audioContextManager.setVolume(e);
  }
  setAudioEffectConfig(e) {
    this.audioEffectManager.setConfig(e);
  }
  seek(e) {
    this.progress = e, this.player.currentTime = e;
  }
  resume() {
    this.audioContextManager.ensureResumed(), this.isPlaying = true, this.playingChangedEvent.emit(true), this.player.play().catch((e) => {
      console.error(e);
    });
  }
  suspend() {
    this.isPlaying = false, this.playingChangedEvent.emit(false), this.player.pause();
  }
  reset() {
  }
  restart() {
    if (!this.currentPlayable) return;
    this.loadingChangedEvent.emit(true);
    const e = this.getProgress();
    this.setMedia(this.currentPlayable, [], e);
  }
  buildResourceId({ playable: e, quality: t, isPreview: i }) {
    return e.type === p.Video ? `${e.vid}_F_default` : `${e.vid}_${i ? "P" : "F"}_${t}`;
  }
  processRequestUrl({ playable: e, meta: t, isPreview: i }) {
    const a = new URL(t.urls[0]), s = this.buildResourceId({ playable: e, quality: t.quality, isPreview: i });
    return a.searchParams.append("_rid", s), { url: a.toString(), resourceId: s };
  }
  async getPlayablePlayInfo(e, t, i) {
    let a;
    try {
      if (!this.modelManager) throw new Error("modelManager is not initialized");
      const s = await this.modelManager.getDetail(e, this.service.queueState.value.queue?.etParams ?? {});
      console.log("promise ret mediaDetail", s);
      const n = s.video_model, o = s.video_model_type === 2, l = Ke(t, n.video_list, (E) => E.video_meta.quality);
      if (!l) throw this.modelManager.deleteCache(e), new Error("VideoModel \u4E2D\u6CA1\u6709\u53EF\u7528\u7684\u5A92\u4F53\u8D44\u6E90");
      if (!l.main_url) throw this.modelManager.deleteCache(e), new Error("VideoModel \u4E2D\u6CA1\u6709 URL");
      const d = l.encrypt_info?.spade_a ?? "", f = (await u(c.appSettings).getSetting("luna_pc_common_server_params"))?.player?.media_detail_cache !== false, m = { trackId: e.id, urls: [l.main_url, l.backup_url].filter(Boolean), spade: d, quality: l.video_meta?.quality ?? "unknown", bitrate: l.video_meta?.bitrate ?? 0, isPreview: o, mediaDetail: f ? s : void 0 }, g = this.processRequestUrl({ playable: e, meta: m, isPreview: o });
      return { url: g.url, spade: d, meta: m, resourceId: g.resourceId };
    } catch (s) {
      throw a = s, s;
    } finally {
      i || u(c.applog).report({ event: "player_metrics", params: { ...this.service.reporter.getCurrentReportCommonParams(), type: a ? "video_model_load_error" : "video_model_load_success", reason: a instanceof Error ? a.message : String(a) } });
    }
  }
  async lookupCacheForSpecificQuality({ playable: e, quality: t, isPreview: i }) {
    const a = this.buildResourceId({ playable: e, quality: t, isPreview: i });
    if (!e.track && !e.video || e.track && !this.service.checkPlayableQualityPlayable(e, t)) return null;
    const s = await u(c.playerProxy).peekCache(a);
    return s || null;
  }
  checkPlayableIsPreview(e) {
    return this.service.commerceState.value.hasPlayEntitlement ? false : e.label_info?.only_vip_playable ? this.service.queueState.value.queue?.playables.limitedFreeInfos[e.key]?.limited_free ? false : !this.service.commerceState.value.hasPlayEntitlement : false;
  }
  async setMedia(e, t, i) {
    console.log("setMedia", e.id), this.player.pause(), this.progress = i ?? 0, this.currentPlayable = e, this.cachedResourceId = null, this.cacheStatusPwr = Promise.withResolvers(), this.cacheStatusPwr.promise.then((h) => {
      this.service.reporter.cacheStatusParams = { cache_status: h.status, cache_size: h.cachedSize, cache_part: h.isCacheFull ? "full" : "partial", cache_quality: h.quality, cache_type: h.cacheType, cache_is_preview: h.isPreview ? 1 : 0 }, u(c.applog).report({ event: "player_metrics", params: { ...this.service.reporter.getMetricsReportCommonParams(), type: "cache_status" } });
    }), this.loadState = "fetch";
    const a = this.service.getEffectiveQuality(), s = this.checkPlayableIsPreview(e), n = this.buildResourceId({ playable: e, quality: a, isPreview: s });
    this.currentResourceId = n;
    let o;
    const l = await this.lookupCacheForSpecificQuality({ playable: e, quality: a, isPreview: s });
    if (l) this.service.state.update((h) => {
      h.cacheInfo = { isPreview: s };
    }), o = { url: l.url, spade: l.entry.info.spade, meta: l.entry.info, resourceId: l.entry.resourceId }, this.service.reporter.cacheStatusParams = { cache_status: "hit", cache_size: l.entry.size, cache_part: "full", cache_quality: l.entry.info.quality, cache_type: "disk", cache_is_preview: l.entry.info.isPreview ? 1 : 0 }, l.entry.info.mediaDetail && (this.service.state.update((h) => {
      h.mediaDetail = l.entry.info.mediaDetail;
    }), this.modelManager?.setDetailFromDiskCache && this.modelManager.setDetailFromDiskCache(e, l.entry.info.mediaDetail, this.service.queueState.value.queue?.etParams ?? {}, (h) => {
      e.id === this.service.state.value.mediaId && this.service.state.update((f) => {
        f.mediaDetail = h;
      });
    }));
    else {
      if (this.service.state.update((h) => {
        h.cacheInfo = void 0;
      }), o = await this.getPlayablePlayInfo(e, a, false), this.currentResourceId !== n) return;
      this.service.reporter.cacheStatusParams = { cache_status: "miss", cache_size: 0, cache_part: "partial", cache_quality: a, cache_type: "memory", cache_is_preview: s ? 1 : 0 };
    }
    u(c.applog).report({ event: "player_metrics", params: { ...this.service.reporter.getMetricsReportCommonParams(), type: "peek" } });
    const { fromCache: d } = this.initPlayer(e.key, o.resourceId);
    if (this.service.mediaSession.updatePlayable(e), !d && o.spade) {
      const h = await u(c.utils).decodeSpade(o.spade);
      if (this.currentResourceId !== n) return;
      console.log("decodedKey", h), TTCommon.executeWithElement(this.player, "setDemuxerArg", JSON.stringify({ key: "decryption_key", value: h }));
    }
    await u(c.playerProxy).registerMeta(o), this.cachedResourceId = o.resourceId, await u(c.playerProxy).setCurrentUrl(o.url), this.currentResourceId === n && (d || (this.player.src = o.url), this.isPlaying && this.resume(), Promise.all(t.map(async (h) => {
      const f = await this.lookupCacheForSpecificQuality({ playable: h, quality: this.service.getEffectiveQuality(), isPreview: this.checkPlayableIsPreview(h) });
      let m;
      if (f) m = { rid: f.entry.resourceId, url: f.url, spade: f.entry.info.spade };
      else {
        let g = await this.getPlayablePlayInfo(h, this.service.state.value.quality, true);
        await u(c.playerProxy).registerMeta(g), m = { rid: g.resourceId, url: g.url, spade: g.spade };
      }
      if (!this.playerPool[m.rid]) {
        const g = document.createElement("video");
        g.setAttribute("data-rid", m.rid), g.setAttribute("data-playable-key", h.key);
        const E = await u(c.utils).decodeSpade(m.spade);
        TTCommon.executeWithElement(g, "setDemuxerArg", JSON.stringify({ key: "decryption_key", value: E })), g.src = m.url, console.log("create preload player", g, g.src), this.playerPool[m.rid] = g, this.playerNotifier[h.key]?.forEach((w) => w(g));
      }
      return m;
    })).then((h) => {
      this.preloadRids = h.map((f) => f.rid), u(c.playerProxy).setPreloadUrls(h.map((f) => f.url));
    }));
  }
  log(e) {
    console.log(`[PlayerEngineV4] ${e}`);
  }
  removePreloadTrack(e) {
  }
  emitCacheStatus(e) {
    this.cacheStatusPwr.resolve(e);
  }
  subscribePlayerElement(e, t) {
    if (this.playerNotifier[e] || (this.playerNotifier[e] = /* @__PURE__ */ new Set()), this.playerNotifier[e].add(t), this.currentPlayable?.key === this.player.getAttribute("data-playable-key")) t(this.player);
    else {
      const i = Object.values(this.playerPool).find((a) => a.getAttribute("data-playable-key") === e);
      i && t(i);
    }
    return () => {
      this.playerNotifier[e]?.delete(t);
    };
  }
}
class St extends Ye {
  state = new dt(xe.player);
  userState = new D("user");
  queueState = new D("queue");
  commerceState = new D("commerce");
  windowState = new D("window");
  collectState = new D("collect");
  records = [];
  currentPlayRecord;
  cachedVolume = new G(U.config, "volume", 0.3);
  cachedQuality = new G(U.config, "playQuality", {});
  cachedAudioEffect = new G(U.config, "audioEffect", {});
  reporter = new gt(this);
  mediaSession = new vt(this);
  currentVid = "";
  riskResultMap = /* @__PURE__ */ new Map();
  audioEffectConfigs = {};
  isForbidden = false;
  forbiddenReason = "";
  isCheating = false;
  currentPlaying;
  engine;
  modelManager;
  constructor() {
    super(), this.state.onUpdateBatched((e) => {
      u(c.sharedState).update("player", e);
    }), this.modelManager = new ft(), this.engine = new Le(this), this.commerceState.onUpdate(() => {
      this.updateQualityStates(), this.updateDigitalAlbumQuality();
    });
  }
  computeAvailableQualities() {
    const { queue: e } = this.queueState.value;
    if (!e || !e.currentPlayable.key) return [];
    const t = e.playables.byKey[e.currentPlayable.key];
    if (!t) return [];
    const s = (this.state.value.mediaDetail?.playable?.bit_rates ?? t.bit_rates)?.map((d) => d.quality).filter((d) => !!d) ?? [], n = X(this.commerceState.value.commerceInfo?.benefit_base?.quality), o = new Set(n.map((d) => d.key)), l = s.filter((d) => o.has(d));
    return se(l, n);
  }
  checkPlayableQualityPlayable(e, t) {
    return De({ playable: e, benefitQuality: this.commerceState.value.commerceInfo?.benefit_base?.quality }).includes(t);
  }
  computePlayableQualities() {
    const { queue: e } = this.queueState.value;
    if (!e || !e.currentPlayable.key) return [];
    const t = e.playables.byKey[e.currentPlayable.key];
    if (!t) return [];
    const i = this.state.value.mediaDetail?.playable ?? t;
    return (i ? i.track : void 0) ? De({ playable: i, benefitQuality: this.commerceState.value.commerceInfo?.benefit_base?.quality }) : [];
  }
  updateDigitalAlbumQuality() {
    const { queue: e } = this.queueState.value;
    if (!e || !e.currentPlayable.key) return;
    const t = e.playables.byKey[e.currentPlayable.key], i = X(this.commerceState.value.commerceInfo?.benefit_base?.quality), a = i[i.length - 1]?.key;
    Qe(t) && a ? this.setOverrideQuality(a) : this.setOverrideQuality(void 0);
  }
  computePlayingQuality(e = this.state.value.availableQualities) {
    const t = this.getEffectiveQuality();
    return Ke(t, e, (i) => i) ?? be;
  }
  async updateQualityStates() {
    const e = this.computeAvailableQualities(), t = this.computePlayingQuality(e), i = this.computePlayableQualities();
    this.state.update((a) => {
      a.availableQualities = e, a.playingQuality = t, a.playableQualities = i;
    });
  }
  async handleQualityUpdated() {
    const e = (await this.cachedQuality.getWhenReady())[this.userState.value.info?.my_info.id ?? "guest"] ?? be;
    this.state.update((t) => {
      t.quality = e;
    }), await this.updateQualityStates();
  }
  async handleAudioEffectUpdated() {
    const e = await this.cachedAudioEffect.getWhenReady(), t = this.userState.value.info?.my_info.id ?? "guest", i = e[t] ?? null, a = this.commerceState.value.audioEffects ?? [], n = i && a.some((l) => l.key === i) && i in this.audioEffectConfigs ? i : null;
    if (this.state.update((l) => {
      l.currentAudioEffect = n;
    }), this.isCurrentPlayableVideo()) {
      this.engine.setAudioEffectConfig(null);
      return;
    }
    if (!n) {
      this.engine.setAudioEffectConfig(null);
      return;
    }
    if (n === S) {
      this.applyIntelligentAudioEffect();
      return;
    }
    const o = this.audioEffectConfigs[n];
    o && this.engine.setAudioEffectConfig(o);
  }
  isCurrentPlayableVideo() {
    const { queue: e } = this.queueState.value;
    return !e || !e.currentPlayable.key ? false : e.playables.byKey[e.currentPlayable.key]?.type === p.Video;
  }
  applyIntelligentAudioEffect() {
    const { queue: e } = this.queueState.value, t = e?.currentPlayable.key ? e.playables.byKey[e.currentPlayable.key] : null;
    if (!t) {
      console.log("[\u667A\u80FD\u97F3\u6548] \u65E0\u5F53\u524D\u64AD\u653E\u6B4C\u66F2\uFF0C\u8DF3\u8FC7"), this.engine.setAudioEffectConfig(null);
      return;
    }
    if (t.type === p.Video) {
      console.log("[\u667A\u80FD\u97F3\u6548] \u89C6\u9891\u4E0D\u4F7F\u7528\u97F3\u6548"), this.engine.setAudioEffectConfig(null);
      return;
    }
    const i = re.getCachedConfig(t);
    if (!i) {
      const a = this.audioEffectConfigs[S];
      if (!a) {
        console.log("[\u667A\u80FD\u97F3\u6548] \u65E0\u515C\u5E95\u914D\u7F6E\uFF0C\u8DF3\u8FC7"), this.engine.setAudioEffectConfig(null);
        return;
      }
      console.log(`[\u667A\u80FD\u97F3\u6548] \u4F7F\u7528\u515C\u5E95\u914D\u7F6E: ${t.media_type}/${t.id}`), this.engine.setAudioEffectConfig(a);
      return;
    }
    console.log(`[\u667A\u80FD\u97F3\u6548] \u4F7F\u7528\u6B4C\u66F2\u4E13\u5C5E\u914D\u7F6E: ${t.media_type}/${t.id}`), this.engine.setAudioEffectConfig(i);
  }
  isPreview() {
    const e = this.state.value.mediaDetail;
    if (e) return e.video_model_type === 2;
    const t = this.queueState.value.queue?.currentPlayable.key;
    if (!t) return false;
    const i = this.queueState.value.queue?.playables.byKey[t];
    if (!i) return false;
    const a = this.queueState.value.queue?.playables.limitedFreeInfos[t];
    return this.commerceState.value.hasPlayEntitlement || a?.limited_free ? false : i.label_info?.only_vip_playable ?? false;
  }
  pushProgress() {
    this.state.update((e) => {
      this.engine.getDuration() && (e.durationSeconds = this.engine.getDuration(), e.progressSeconds = this.engine.getProgress()), this.engine.getDuration() === 0 ? e.progressPercent = 0 : e.progressPercent = this.engine.getProgress() / this.engine.getDuration(), this.engine.getProgress() > 0 && this.engine.getDuration() > 0 && this.reporter.tryReportMetricsProgressed({ progress: this.engine.getProgress(), duration: this.engine.getDuration() });
    }), this.currentPlayRecord && this.engine.getDuration() > 0 && (this.currentPlayRecord.lastProgressSeconds = this.engine.getProgress(), this.currentPlayRecord.durationMs = this.engine.getDuration() * 1e3);
  }
  startPollProgress() {
    setInterval(() => {
      this.pushProgress();
    }, 1e3);
  }
  async initialize() {
    this.userState.onUpdate(() => {
      this.handleQualityUpdated();
    }), this.startPollProgress();
    const e = await this.cachedVolume.getWhenReady();
    this.state.update((t) => {
      t.volume = e;
    }), this.engine.setMuted(this.state.value.isMuted), this.engine.setVolume(this.state.value.volume), this.engine.playingChangedEvent.on((t) => {
      this.state.update((i) => {
        i.isPlaying = t;
      });
    }), this.engine.readyEvent.on(() => {
      this.state.update((t) => {
        t.isLoading = false;
      }), this.reporter.reportMetricsPlayable();
    }), this.engine.loadingChangedEvent.on((t) => {
      this.state.update((i) => {
        i.isLoading = t;
      }), t ? this.reporter.reportMetricsBufferStart() : this.reporter.tryNotifyBufferEnd();
    }), this.engine.finishedEvent.on(() => {
      u(c.queue).playNext(y.auto);
    }), this.engine.playerErrorEvent.on((t) => {
      this.reporter.reportMetricsError(t);
    }), this.engine.modelErrorEvent.on((t) => {
      this.reporter.reportMetricsModelError(t);
    }), await this.handleQualityUpdated(), this.audioEffectConfigs = await u(c.appSettings).getSetting("audio_effect") ?? {}, u(c.appSettings).onUpdate((t) => {
      this.audioEffectConfigs = t.audio_effect ?? {}, this.handleAudioEffectUpdated();
    }), this.handleAudioEffectUpdated(), this.userState.onUpdate(() => {
      this.handleAudioEffectUpdated();
    }), this.commerceState.onUpdate(() => {
      this.handleAudioEffectUpdated();
    }), re.onConfigReady((t, i) => {
      this.handleIntelligentEffectReady(t, i);
    }), this.handleQueueStateUpdate(this.queueState.value), this.queueState.onUpdate((t, i) => this.handleQueueStateUpdate(t, i)), this.windowState.onUpdate((t, i) => this.handleWindowStateUpdate(t, i));
  }
  handleIntelligentEffectReady(e, t) {
    if (this.state.value.currentAudioEffect !== S) return;
    const { queue: i } = this.queueState.value;
    !i || i.currentPlayable.key !== e.key || e.type !== p.Video && (console.log(`[\u667A\u80FD\u97F3\u6548] \u5207\u6362\u5230\u6B4C\u66F2\u4E13\u5C5E\u914D\u7F6E: ${e.media_type}/${e.id}`), this.engine.setAudioEffectConfig(t));
  }
  handleWindowStateUpdate(e, t) {
    const i = !t?.windows.main?.isMinimize && e.windows.main?.isMinimize, a = !t?.windows.main?.isHidden && e.windows.main?.isHidden, s = !t?.isInactive && e.isInactive;
    (i || s || a) && this.suspendIfBackgroundUnplayable();
  }
  async setQuality(e) {
    const t = this.getEffectiveQuality(), i = this.state.value.overrideQuality ?? e;
    this.cachedQuality.set({ ...this.cachedQuality.get(), [this.userState.value.info?.my_info.id ?? "guest"]: e }), this.state.update((a) => {
      a.quality = e;
    }), await this.updateQualityStates(), t !== i && this.engine?.restart();
  }
  async setOverrideQuality(e) {
    const t = this.getEffectiveQuality(), i = e ?? this.state.value.quality;
    this.state.update((a) => {
      a.overrideQuality = e;
    }), await this.updateQualityStates(), t !== i && this.engine?.restart();
  }
  async handleQueueStateUpdate(e, t) {
    t && this.state.update((l) => {
      l.isInitialPlay = false;
    });
    const i = e.queue?.queueId !== t?.queue?.queueId, a = e.queue?.playReason === Ge.sessionChanged, s = e.queue?.currentPlayable.key !== t?.queue?.currentPlayable.key;
    i && !a && (this.modelManager.clear(), this.engine.reset());
    const n = e.queue;
    if (!n || n.playables.currentKeys.length === 0) return;
    if (!n.currentPlayable.key) {
      this.engine.suspend();
      return;
    }
    const o = n.playables.byKey[n.currentPlayable.key];
    if (o) {
      if (!o.vid || o.status) return this.failedToSkip();
      (i || s) && (this.updateQualityStates(), this.updateDigitalAlbumQuality(), this.reporter.handleCurrentMediaChanged()), t?.queue && n.playback.playOrder !== t.queue.playback.playOrder && this.reporter.reportPlayMode(), !(!i && !s) && (i && a && !s || this.startPlayMedia(o, e.queue?.playback.startProgress));
    }
  }
  async checkPlayable(e, t) {
    try {
      const i = this.queueState.value.queue, a = i?.currentPlayable.key, s = a ? i?.playables.byKey[a] : void 0, n = a ? i?.playables.limitedFreeInfos[a] : void 0, o = await u(c.request).request("MCheckMedia", { media_list: [{ type: e, id: t, play_count: this.getTrackPlayCountMap(t), attr: { duration: s?.duration ?? 0 } }], limited_free_param_map: n ? { [t]: { limited_free: n.limited_free, expire_time: n.expire_time, sign: n.sign, sign_version: n.sign_version, limited_free_type: n.limited_free_type, rewind_prev_intercept_type: n.rewind_prev_intercept_type } } : {}, scene: 1, queue_type: i?.etParams.queue_type, scene_name: i?.etParams.scene_name });
      if (o.status_code === 1000062) {
        u(c.player).suspend(), this.isForbidden = true, this.forbiddenReason = o.status_info?.status_msg ?? "\u5F53\u524D\u6B4C\u66F2\u65E0\u6CD5\u64AD\u653E", u(c.renderer).showToast({ message: this.forbiddenReason });
        return;
      }
      const l = o.media_status?.find((f) => f.id === t && f.type === e);
      if (!l || (l.risk_result !== void 0 && this.riskResultMap.set(t, l.risk_result), t !== this.queueState.value.queue?.currentPlayable.id)) return;
      const d = l.status ?? 0;
      if (!(d === 0 || d === 40)) {
        const { abroadType: f } = await u(c.sharedState).get("region");
        return this.failedToSkip(f === "2" ? "\u56E0\u7248\u6743\u9650\u5236\uFF0C\u6240\u5728\u56FD\u5BB6/\u5730\u533A\u4E0D\u652F\u6301\u64AD\u653E" : "\u7248\u6743\u9650\u5236\uFF0C\u6682\u65E0\u6CD5\u64AD\u653E");
      }
      if (l.risk_result === 2) return this.failedToSkip();
      l.risk_result === 1 && (this.isCheating = true), this.isCheating || this.reportPlayAction();
    } catch (i) {
      _e.warn("player", (a) => a.text("mcheck failed").object(i)), this.reportPlayAction();
    }
  }
  reportPlayAction() {
    const e = this.queueState.value.queue;
    if (!e || !e.currentPlayable.key) return;
    const t = e.playables.byKey[e.currentPlayable.key];
    if (!t) return;
    const i = e.metaInfo.type === ke.feed || e.metaInfo.type === ke.feedMode, a = e.playables.requestIdMap[e.currentPlayable.key] ?? "";
    u(c.request).request("ReportAction", { actions: [{ action_type: "play", item_type: t.media_type, item_id: t.id, scene_name: e.etParams.scene_name, queue_type: e.etParams.queue_type, sub_queue_type: e.etParams.sub_queue_type ?? "", is_collected: Ne(this.collectState.value, { type: Oe.playable, id: t.id }), need_report_feed: i, feed_request_id: i ? a : "", is_listen_video: t.type === p.Video && !!t.label_info?.background_play }] });
  }
  startPlayMedia(e, t) {
    const i = this.queueState.value.queue;
    if (!i) return;
    this.isForbidden = false, this.forbiddenReason = "", this.isCheating = false, this.state.update((o) => {
      o.mediaId = e.id, o.cacheInfo = void 0, o.mediaDetail = void 0, o.isLoading = true, o.durationSeconds = 0, o.progressPercent = 0, o.progressSeconds = 0;
    }), this.state.value.currentAudioEffect === S && u(c.player).setAudioEffect(S), this.checkPlayable(e.media_type, e.id);
    const a = i.playables.currentKeys.indexOf(e.key), n = i.playables.currentKeys.slice(a + 1, a + 1 + 5).map((o) => i.playables.byKey[o]).filter(Boolean);
    this.currentPlaying = { playable: e, preloadPlayables: n }, this.engine.setMedia(e, n, t).catch((o) => {
      _e.warn("player", (d) => d.text("setMedia failed").object(o));
      const l = o?.message?.includes("\u6CA1\u6709\u53EF\u7528\u7684\u5A92\u4F53\u8D44\u6E90") || o?.message?.includes("\u6CA1\u6709 URL");
      this.failedToSkip(l ? "\u6682\u65E0\u97F3\u6E90" : "\u52A0\u8F7D\u5931\u8D25");
    }), this.toPlayerIfBackgroundUnplayable(), this.modelManager.getDetail(e, i.etParams ?? {}).then((o) => {
      e.id === this.state.value.mediaId && (this.state.update((l) => {
        l.mediaDetail = o;
      }), this.updateQualityStates());
    }), this.createPlayRecord(e), this.state.value.isPlaying ? this.reporter.reportMediaPlay() : this.reporter.reportWhenResume = true;
  }
  failedToSkip(e) {
    const t = this.currentPlaying?.playable.type === p.Video ? "\u89C6\u9891" : "\u6B4C\u66F2", i = e ? `\u5F53\u524D${t}${e}\uFF0C\u5DF2\u4E3A\u60A8\u81EA\u52A8\u8DF3\u8FC7` : `\u5F53\u524D${t}\u65E0\u6CD5\u64AD\u653E\uFF0C\u5DF2\u4E3A\u60A8\u81EA\u52A8\u8DF3\u8FC7`;
    u(c.renderer).showToast({ message: i }), setTimeout(() => {
      this.queueState.value.queue?.currentPlayable.switchType === y.userPrevious ? u(c.queue).playPrevious(y.skipFailed) : u(c.queue).playNext(y.skipFailed);
    }, 100);
  }
  async refreshCurrentMediaDetail() {
    if (!this.modelManager || !this.state.value.mediaDetail) return;
    const e = this.queueState.value.queue?.currentPlayable.key;
    if (!e) return;
    const t = this.queueState.value.queue?.playables.byKey[e];
    if (!t) return;
    const i = await this.modelManager.refreshDetail(t);
    this.queueState.value.queue?.currentPlayable.key === e && i && (this.state.update((a) => {
      a.mediaDetail = i;
    }), this.updateQualityStates());
  }
  getEffectiveQuality() {
    return this.state.value.overrideQuality ?? this.state.value.quality;
  }
  createPlayRecord(e) {
    const t = this.queueState.value.queue;
    t && (this.currentPlayRecord = { queueId: t.queueId, mediaId: e.id, mediaType: e.media_type, startTime: Date.now(), endTime: 0, durationMs: e.duration ?? 0, playTimeMs: 0, lastProgressSeconds: 0 });
  }
  finishPlayRecord() {
    if (!this.currentPlayRecord) return;
    const e = Date.now(), t = this.reporter.timeCalc.getPlayingTimeMs();
    this.currentPlayRecord.endTime = e, this.currentPlayRecord.playTimeMs = t, this.currentPlayRecord.lastProgressSeconds = this.state.value.progressSeconds, this.records.push({ ...this.currentPlayRecord }), this.records.length > 100 && this.records.shift(), this.currentPlayRecord = void 0;
  }
  getPlayRecords() {
    const e = [...this.records];
    if (this.currentPlayRecord) {
      const t = { ...this.currentPlayRecord, endTime: Date.now(), playTimeMs: this.reporter.timeCalc.getPlayingTimeMs(), lastProgressSeconds: this.state.value.progressSeconds };
      e.push(t);
    }
    return e;
  }
  getTrackPlayCountMap(e) {
    const t = this.getPlayRecords(), i = Date.now(), a = [600, 3600, 86400], s = {};
    return a.forEach((n) => {
      const o = i - n * 1e3, l = t.filter((d) => d.mediaId === e && d.endTime > 0 && d.endTime >= o).length;
      s[n] = l;
    }), s;
  }
  suspendIfBackgroundUnplayable() {
    this.currentPlaying?.playable.type === p.Video && !this.currentPlaying?.playable.label_info?.background_play && this.suspend();
  }
  checkBackgroundUnresumable() {
    const e = this.currentPlaying?.playable.type === p.Video && !this.currentPlaying?.playable.label_info?.background_play, t = this.windowState.value.windows.main?.isMinimize, i = this.windowState.value.windows.main?.isHidden, a = this.windowState.value.isInactive;
    return e && (t || a || i) ? (u(c.queue).playNext(y.auto), false) : true;
  }
  toPlayerIfBackgroundUnplayable() {
    this.currentPlaying?.playable.type === p.Video && !this.currentPlaying?.playable.label_info?.background_play && (this.queueState.value.appVisibility.isPlayerVisible || (Je.push({ path: "/player" }), Ue({ message: "\u5E94\u7248\u6743\u65B9\u8981\u6C42\uFF0C\u8BE5 MV \u4EC5\u652F\u6301\u5728\u524D\u53F0\u64AD\u653E" })));
  }
  suspend(e = {}) {
    this.reporter.timeCalc.handleSuspend(), this.reporter.reportMediaOverBySuspend(e), this.engine.suspend();
  }
  seekSeconds(e, t = false) {
    this.reporter.debouncedReportSeek({ src: this.state.value.progressSeconds, srcPct: this.state.value.progressSeconds / this.engine.getDuration(), dst: e, dstPct: e / this.engine.getDuration(), isFromLyrics: t }), this.engine.seek(e), this.resume(), this.state.update((i) => {
      i.progressSeconds = e, i.progressPercent = e / this.engine.getDuration();
    }), t ? this.reporter.isMediaSeekedByLyrics = true : this.reporter.isMediaSeeked = true;
  }
  replay() {
    this.currentPlaying && (this.reporter.reportMediaFinish(), this.finishPlayRecord(), this.reporter.handleCurrentMediaChanged(), this.startPlayMedia(this.currentPlaying.playable));
  }
  seekPercent(e) {
    this.seekSeconds(this.engine.getDuration() * e);
  }
  ensureCurrentMediaInitialized() {
    const e = this.queueState.value.queue, t = e?.currentPlayable.key, i = t ? e?.playables.byKey[t] : void 0;
    i && this.currentPlaying?.playable.key !== i.key && this.startPlayMedia(i, e?.playback.startProgress);
  }
  async resume(e = {}, t) {
    if (!this.checkBackgroundUnresumable()) return;
    if (this.isForbidden) {
      u(c.renderer).showToast({ message: this.forbiddenReason });
      return;
    }
    this.ensureCurrentMediaInitialized(), this.reporter.timeCalc.handleResume(), this.reporter.reportWhenResume && (this.reporter.reportWhenResume = false, t && this.reporter.mergePlaySourceParams(t), this.reporter.reportMediaPlay({ ...e, ...t }));
    const i = this.queueState.value.queue?.queueId;
    i && await u(c.queue).markPlayed(i), this.engine.resume(), u(c.notification).markBlocked("resume"), this.toPlayerIfBackgroundUnplayable();
  }
}
class Mt extends Xe {
  async resume(e = {}, t) {
    this.service.resume(e, t);
  }
  async suspend(e = {}) {
    this.service.suspend(e);
  }
  async togglePlay(e = {}, t) {
    this.service.state.value.isPlaying ? this.suspend(e) : this.resume(e, t);
  }
  async seekPercent(e) {
    this.service.seekPercent(e);
  }
  async replay() {
    this.service.replay();
  }
  async seekSeconds(e, t = false) {
    this.service.seekSeconds(e, t);
  }
  async toggleMuted() {
    this.service.engine.setMuted(!this.service.state.value.isMuted), this.service.state.update((e) => {
      e.isMuted = !e.isMuted;
    });
  }
  async increaseVolume(e = 0.05, t = {}) {
    await this.setVolume(this.service.state.value.volume + e, t);
  }
  async decreaseVolume(e = 0.05, t = {}) {
    await this.setVolume(this.service.state.value.volume - e, t);
  }
  async setVolume(e, t = {}) {
    e < 0 ? e = 0 : e > 1 && (e = 1), this.service.reporter.debouncedReportSetVolume(e, this.service.state.value.volume, t), this.service.state.value.isMuted && this.toggleMuted(), this.service.engine.setVolume(e), this.service.cachedVolume.set(e), this.service.state.update((i) => {
      i.volume = e;
    });
  }
  async setQuality(e) {
    this.service.setQuality(e);
  }
  async computeCurrentProgressOfAll(e) {
    const t = await this.getProcessSeconds();
    return this.service.isPreview() && e.preview?.start ? e.preview?.start / 1e3 + t : t;
  }
  async refresh() {
    if (!this.service.currentPlaying) return;
    this.service.modelManager.clear(), this.service.engine.reset();
    const e = this.service.currentPlaying.playable, t = await this.computeCurrentProgressOfAll(e);
    this.service.engine.setMedia(e, this.service.currentPlaying.preloadPlayables, t), this.service.modelManager.getDetail(e, this.service.queueState.value.queue?.etParams ?? {}).then((i) => {
      e.id === this.service.state.value.mediaId && (this.service.state.update((a) => {
        a.mediaDetail = i;
      }), this.service.updateQualityStates());
    });
  }
  async updateCurrentCommentCount(e, t) {
    !e || t === 0 || this.service.state.update((i) => {
      const s = i.mediaDetail?.playable;
      if (!s || s.id !== e || i.mediaId !== e) return;
      const n = Math.max(0, (s.stats?.count_comment ?? 0) + t);
      s.stats = { ...s.stats ?? {}, count_comment: n };
    });
  }
  async getCurrentReportParams() {
    return this.service.reporter.getCurrentReportCommonParams();
  }
  async getOutputDevices() {
    return [];
  }
  async getOutputDevice() {
    return "";
  }
  async setOutputDevice(e) {
  }
  async retryIfError() {
  }
  async reportHangAlert(e) {
    this.service.reporter.reportMetricsPoint(`hang_alert_${e}`, String(this.service.state.value.progressPercent));
  }
  async getProcessSeconds() {
    return this.service.state.value.progressSeconds;
  }
  removeTrackCache(e) {
    this.service.engine.removePreloadTrack(e), this.service.modelManager.deleteCache(e);
  }
  refreshCurrentMediaDetail() {
    this.service.refreshCurrentMediaDetail();
  }
  async setOverrideQuality(e) {
    this.service.setOverrideQuality(e);
  }
  async clearOverrideQuality() {
    this.service.setOverrideQuality(void 0);
  }
  async getEffectiveQuality() {
    return this.service.getEffectiveQuality();
  }
  async emitCacheStatus(e) {
    this.service.engine instanceof Le && this.service.engine.emitCacheStatus(e);
  }
  async getTrackPlayCountMap(e) {
    return this.service.getTrackPlayCountMap(e);
  }
  async getPlayRecords() {
    return this.service.getPlayRecords();
  }
  async handlePlayerToBackground() {
    this.service.currentPlaying?.playable.type === p.Video && !this.service.currentPlaying?.playable.label_info?.background_play && (Ue({ message: "\u5E94\u7248\u6743\u65B9\u8981\u6C42\uFF0C\u8BE5 MV \u4EC5\u652F\u6301\u5728\u524D\u53F0\u64AD\u653E" }), this.suspend({ audio_over_status: "" }));
  }
  async suspendIfBackgroundUnplayable() {
    this.service.suspendIfBackgroundUnplayable();
  }
  async setAudioEffect(e) {
    const t = this.service.userState.value.info?.my_info.id ?? "guest";
    if (this.service.cachedAudioEffect.set({ ...this.service.cachedAudioEffect.get(), [t]: e }), this.service.state.update((a) => {
      a.currentAudioEffect = e;
    }), !e) {
      this.service.engine.setAudioEffectConfig(null);
      return;
    }
    if (this.service.isCurrentPlayableVideo()) {
      this.service.engine.setAudioEffectConfig(null);
      return;
    }
    if (e === S) {
      this.service.applyIntelligentAudioEffect();
      return;
    }
    const i = this.service.audioEffectConfigs[e];
    if (!i) {
      this.service.engine.setAudioEffectConfig(null);
      return;
    }
    this.service.engine.setAudioEffectConfig(i);
  }
}
export { St as PlayerService, Mt as PlayerServiceProtocol };
