// packages/renderers/taskbarWidget/src/taskbarWidget.ts
// @ts-nocheck
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const i of s) if (i.type === "childList") for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && n(o);
  }).observe(document, { childList: true, subtree: true });
  function r(s) {
    const i = {};
    return s.integrity && (i.integrity = s.integrity), s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? i.credentials = "include" : s.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
  }
  function n(s) {
    if (s.ep) return;
    s.ep = true;
    const i = r(s);
    fetch(s.href, i);
  }
})();
function mn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const z = {}, xt = [], Be = () => {
}, Fs = () => false, Cr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), _n = (e) => e.startsWith("onUpdate:"), me = Object.assign, vn = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, ao = Object.prototype.hasOwnProperty, $ = (e, t) => ao.call(e, t), q = Array.isArray, Pt = (e) => Sr(e) === "[object Map]", qs = (e) => Sr(e) === "[object Set]", L = (e) => typeof e == "function", re = (e) => typeof e == "string", lt = (e) => typeof e == "symbol", J = (e) => e !== null && typeof e == "object", Ns = (e) => (J(e) || L(e)) && L(e.then) && L(e.catch), Ws = Object.prototype.toString, Sr = (e) => Ws.call(e), co = (e) => Sr(e).slice(8, -1), Bs = (e) => Sr(e) === "[object Object]", yn = (e) => re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, qt = mn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Er = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, uo = /-\w/g, Te = Er((e) => e.replace(uo, (t) => t.slice(1).toUpperCase())), fo = /\B([A-Z])/g, mt = Er((e) => e.replace(fo, "-$1").toLowerCase()), Ir = Er((e) => e.charAt(0).toUpperCase() + e.slice(1)), Nr = Er((e) => e ? `on${Ir(e)}` : ""), st = (e, t) => !Object.is(e, t), Wr = (e, ...t) => {
  for (let r = 0; r < e.length; r++) e[r](...t);
}, Us = (e, t, r, n = false) => {
  Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: n, value: r });
}, po = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let $n;
const Ar = () => $n || ($n = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Tr(e) {
  if (q(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], s = re(n) ? _o(n) : Tr(n);
      if (s) for (const i in s) t[i] = s[i];
    }
    return t;
  } else if (re(e) || J(e)) return e;
}
const ho = /;(?![^(]*\))/g, go = /:([^]+)/, mo = /\/\*[^]*?\*\//g;
function _o(e) {
  const t = {};
  return e.replace(mo, "").split(ho).forEach((r) => {
    if (r) {
      const n = r.split(go);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function gt(e) {
  let t = "";
  if (re(e)) t = e;
  else if (q(e)) for (let r = 0; r < e.length; r++) {
    const n = gt(e[r]);
    n && (t += n + " ");
  }
  else if (J(e)) for (const r in e) e[r] && (t += r + " ");
  return t.trim();
}
const vo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", yo = mn(vo);
function Hs(e) {
  return !!e || e === "";
}
const $s = (e) => !!(e && e.__v_isRef === true), gr = (e) => re(e) ? e : e == null ? "" : q(e) || J(e) && (e.toString === Ws || !L(e.toString)) ? $s(e) ? gr(e.value) : JSON.stringify(e, Ks, 2) : String(e), Ks = (e, t) => $s(t) ? Ks(e, t.value) : Pt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((r, [n, s], i) => (r[Br(n, i) + " =>"] = s, r), {}) } : qs(t) ? { [`Set(${t.size})`]: [...t.values()].map((r) => Br(r)) } : lt(t) ? Br(t) : J(t) && !q(t) && !Bs(t) ? String(t) : t, Br = (e, t = "") => {
  var r;
  return lt(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e;
};
let fe;
class bo {
  constructor(t = false) {
    this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = fe, !t && fe && (this.index = (fe.scopes || (fe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let t, r;
      if (this.scopes) for (t = 0, r = this.scopes.length; t < r; t++) this.scopes[t].pause();
      for (t = 0, r = this.effects.length; t < r; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = false;
      let t, r;
      if (this.scopes) for (t = 0, r = this.scopes.length; t < r; t++) this.scopes[t].resume();
      for (t = 0, r = this.effects.length; t < r; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const r = fe;
      try {
        return fe = this, t();
      } finally {
        fe = r;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = fe, fe = this);
  }
  off() {
    this._on > 0 && --this._on === 0 && (fe = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = false;
      let r, n;
      for (r = 0, n = this.effects.length; r < n; r++) this.effects[r].stop();
      for (this.effects.length = 0, r = 0, n = this.cleanups.length; r < n; r++) this.cleanups[r]();
      if (this.cleanups.length = 0, this.scopes) {
        for (r = 0, n = this.scopes.length; r < n; r++) this.scopes[r].stop(true);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function js() {
  return fe;
}
function Gs(e, t = false) {
  fe && fe.cleanups.push(e);
}
let Q;
const Ur = /* @__PURE__ */ new WeakSet();
class Qs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, fe && fe.active && fe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ur.has(this) && (Ur.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ys(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Kn(this), Xs(this);
    const t = Q, r = De;
    Q = this, De = true;
    try {
      return this.fn();
    } finally {
      Js(this), Q = t, De = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) xn(t);
      this.deps = this.depsTail = void 0, Kn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ur.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    Jr(this) && this.run();
  }
  get dirty() {
    return Jr(this);
  }
}
let zs = 0, Nt, Wt;
function Ys(e, t = false) {
  if (e.flags |= 8, t) {
    e.next = Wt, Wt = e;
    return;
  }
  e.next = Nt, Nt = e;
}
function bn() {
  zs++;
}
function wn() {
  if (--zs > 0) return;
  if (Wt) {
    let t = Wt;
    for (Wt = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; Nt; ) {
    let t = Nt;
    for (Nt = void 0; t; ) {
      const r = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (n) {
        e || (e = n);
      }
      t = r;
    }
  }
  if (e) throw e;
}
function Xs(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Js(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const s = n.prevDep;
    n.version === -1 ? (n === r && (r = s), xn(n), wo(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = s;
  }
  e.deps = t, e.depsTail = r;
}
function Jr(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Zs(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e._dirty;
}
function Zs(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Qt) || (e.globalVersion = Qt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Jr(e)))) return;
  e.flags |= 2;
  const t = e.dep, r = Q, n = De;
  Q = e, De = true;
  try {
    Xs(e);
    const s = e.fn(e._value);
    (t.version === 0 || st(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    Q = r, De = n, Js(e), e.flags &= -3;
  }
}
function xn(e, t = false) {
  const { dep: r, prevSub: n, nextSub: s } = e;
  if (n && (n.nextSub = s, e.prevSub = void 0), s && (s.prevSub = n, e.nextSub = void 0), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let i = r.computed.deps; i; i = i.nextDep) xn(i, true);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function wo(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
let De = true;
const ei = [];
function Ge() {
  ei.push(De), De = false;
}
function Qe() {
  const e = ei.pop();
  De = e === void 0 ? true : e;
}
function Kn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = Q;
    Q = void 0;
    try {
      t();
    } finally {
      Q = r;
    }
  }
}
let Qt = 0;
class xo {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Pn {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
  }
  track(t) {
    if (!Q || !De || Q === this.computed) return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== Q) r = this.activeLink = new xo(Q, this), Q.deps ? (r.prevDep = Q.depsTail, Q.depsTail.nextDep = r, Q.depsTail = r) : Q.deps = Q.depsTail = r, ti(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const n = r.nextDep;
      n.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = n), r.prevDep = Q.depsTail, r.nextDep = void 0, Q.depsTail.nextDep = r, Q.depsTail = r, Q.deps === r && (Q.deps = n);
    }
    return r;
  }
  trigger(t) {
    this.version++, Qt++, this.notify(t);
  }
  notify(t) {
    bn();
    try {
      for (let r = this.subs; r; r = r.prevSub) r.sub.notify() && r.sub.dep.notify();
    } finally {
      wn();
    }
  }
}
function ti(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep) ti(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const Zr = /* @__PURE__ */ new WeakMap(), ht = Symbol(""), en = Symbol(""), zt = Symbol("");
function pe(e, t, r) {
  if (De && Q) {
    let n = Zr.get(e);
    n || Zr.set(e, n = /* @__PURE__ */ new Map());
    let s = n.get(r);
    s || (n.set(r, s = new Pn()), s.map = n, s.key = r), s.track();
  }
}
function je(e, t, r, n, s, i) {
  const o = Zr.get(e);
  if (!o) {
    Qt++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (bn(), t === "clear") o.forEach(l);
  else {
    const a = q(e), p = a && yn(r);
    if (a && r === "length") {
      const u = Number(n);
      o.forEach((d, g) => {
        (g === "length" || g === zt || !lt(g) && g >= u) && l(d);
      });
    } else switch ((r !== void 0 || o.has(void 0)) && l(o.get(r)), p && l(o.get(zt)), t) {
      case "add":
        a ? p && l(o.get("length")) : (l(o.get(ht)), Pt(e) && l(o.get(en)));
        break;
      case "delete":
        a || (l(o.get(ht)), Pt(e) && l(o.get(en)));
        break;
      case "set":
        Pt(e) && l(o.get(ht));
        break;
    }
  }
  wn();
}
function yt(e) {
  const t = H(e);
  return t === e ? t : (pe(t, "iterate", zt), Re(e) ? t : t.map(ze));
}
function Cn(e) {
  return pe(e = H(e), "iterate", zt), e;
}
function Ze(e, t) {
  return it(e) ? Ct(e) ? Yt(ze(t)) : Yt(t) : ze(t);
}
const Po = { __proto__: null, [Symbol.iterator]() {
  return Hr(this, Symbol.iterator, (e) => Ze(this, e));
}, concat(...e) {
  return yt(this).concat(...e.map((t) => q(t) ? yt(t) : t));
}, entries() {
  return Hr(this, "entries", (e) => (e[1] = Ze(this, e[1]), e));
}, every(e, t) {
  return $e(this, "every", e, t, void 0, arguments);
}, filter(e, t) {
  return $e(this, "filter", e, t, (r) => r.map((n) => Ze(this, n)), arguments);
}, find(e, t) {
  return $e(this, "find", e, t, (r) => Ze(this, r), arguments);
}, findIndex(e, t) {
  return $e(this, "findIndex", e, t, void 0, arguments);
}, findLast(e, t) {
  return $e(this, "findLast", e, t, (r) => Ze(this, r), arguments);
}, findLastIndex(e, t) {
  return $e(this, "findLastIndex", e, t, void 0, arguments);
}, forEach(e, t) {
  return $e(this, "forEach", e, t, void 0, arguments);
}, includes(...e) {
  return $r(this, "includes", e);
}, indexOf(...e) {
  return $r(this, "indexOf", e);
}, join(e) {
  return yt(this).join(e);
}, lastIndexOf(...e) {
  return $r(this, "lastIndexOf", e);
}, map(e, t) {
  return $e(this, "map", e, t, void 0, arguments);
}, pop() {
  return Vt(this, "pop");
}, push(...e) {
  return Vt(this, "push", e);
}, reduce(e, ...t) {
  return jn(this, "reduce", e, t);
}, reduceRight(e, ...t) {
  return jn(this, "reduceRight", e, t);
}, shift() {
  return Vt(this, "shift");
}, some(e, t) {
  return $e(this, "some", e, t, void 0, arguments);
}, splice(...e) {
  return Vt(this, "splice", e);
}, toReversed() {
  return yt(this).toReversed();
}, toSorted(e) {
  return yt(this).toSorted(e);
}, toSpliced(...e) {
  return yt(this).toSpliced(...e);
}, unshift(...e) {
  return Vt(this, "unshift", e);
}, values() {
  return Hr(this, "values", (e) => Ze(this, e));
} };
function Hr(e, t, r) {
  const n = Cn(e), s = n[t]();
  return n !== e && !Re(e) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.done || (i.value = r(i.value)), i;
  }), s;
}
const Co = Array.prototype;
function $e(e, t, r, n, s, i) {
  const o = Cn(e), l = o !== e && !Re(e), a = o[t];
  if (a !== Co[t]) {
    const d = a.apply(e, i);
    return l ? ze(d) : d;
  }
  let p = r;
  o !== e && (l ? p = function(d, g) {
    return r.call(this, Ze(e, d), g, e);
  } : r.length > 2 && (p = function(d, g) {
    return r.call(this, d, g, e);
  }));
  const u = a.call(o, p, n);
  return l && s ? s(u) : u;
}
function jn(e, t, r, n) {
  const s = Cn(e);
  let i = r;
  return s !== e && (Re(e) ? r.length > 3 && (i = function(o, l, a) {
    return r.call(this, o, l, a, e);
  }) : i = function(o, l, a) {
    return r.call(this, o, Ze(e, l), a, e);
  }), s[t](i, ...n);
}
function $r(e, t, r) {
  const n = H(e);
  pe(n, "iterate", zt);
  const s = n[t](...r);
  return (s === -1 || s === false) && In(r[0]) ? (r[0] = H(r[0]), n[t](...r)) : s;
}
function Vt(e, t, r = []) {
  Ge(), bn();
  const n = H(e)[t].apply(e, r);
  return wn(), Qe(), n;
}
const So = mn("__proto__,__v_isRef,__isVue"), ri = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(lt));
function Eo(e) {
  lt(e) || (e = String(e));
  const t = H(this);
  return pe(t, "has", e), t.hasOwnProperty(e);
}
class ni {
  constructor(t = false, r = false) {
    this._isReadonly = t, this._isShallow = r;
  }
  get(t, r, n) {
    if (r === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, i = this._isShallow;
    if (r === "__v_isReactive") return !s;
    if (r === "__v_isReadonly") return s;
    if (r === "__v_isShallow") return i;
    if (r === "__v_raw") return n === (s ? i ? Lo : li : i ? oi : ii).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = q(t);
    if (!s) {
      let a;
      if (o && (a = Po[r])) return a;
      if (r === "hasOwnProperty") return Eo;
    }
    const l = Reflect.get(t, r, he(t) ? t : n);
    if ((lt(r) ? ri.has(r) : So(r)) || (s || pe(t, "get", r), i)) return l;
    if (he(l)) {
      const a = o && yn(r) ? l : l.value;
      return s && J(a) ? mr(a) : a;
    }
    return J(l) ? s ? mr(l) : _t(l) : l;
  }
}
class si extends ni {
  constructor(t = false) {
    super(false, t);
  }
  set(t, r, n, s) {
    let i = t[r];
    const o = q(t) && yn(r);
    if (!this._isShallow) {
      const p = it(i);
      if (!Re(n) && !it(n) && (i = H(i), n = H(n)), !o && he(i) && !he(n)) return p || (i.value = n), true;
    }
    const l = o ? Number(r) < t.length : $(t, r), a = Reflect.set(t, r, n, he(t) ? t : s);
    return t === H(s) && (l ? st(n, i) && je(t, "set", r, n) : je(t, "add", r, n)), a;
  }
  deleteProperty(t, r) {
    const n = $(t, r);
    t[r];
    const s = Reflect.deleteProperty(t, r);
    return s && n && je(t, "delete", r, void 0), s;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!lt(r) || !ri.has(r)) && pe(t, "has", r), n;
  }
  ownKeys(t) {
    return pe(t, "iterate", q(t) ? "length" : ht), Reflect.ownKeys(t);
  }
}
class Io extends ni {
  constructor(t = false) {
    super(true, t);
  }
  set(t, r) {
    return true;
  }
  deleteProperty(t, r) {
    return true;
  }
}
const Ao = new si(), To = new Io(), Oo = new si(true);
const tn = (e) => e, ir = (e) => Reflect.getPrototypeOf(e);
function Do(e, t, r) {
  return function(...n) {
    const s = this.__v_raw, i = H(s), o = Pt(i), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, p = s[e](...n), u = r ? tn : t ? Yt : ze;
    return !t && pe(i, "iterate", a ? en : ht), { next() {
      const { value: d, done: g } = p.next();
      return g ? { value: d, done: g } : { value: l ? [u(d[0]), u(d[1])] : u(d), done: g };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function or(e) {
  return function(...t) {
    return e === "delete" ? false : e === "clear" ? void 0 : this;
  };
}
function Ro(e, t) {
  const r = { get(s) {
    const i = this.__v_raw, o = H(i), l = H(s);
    e || (st(s, l) && pe(o, "get", s), pe(o, "get", l));
    const { has: a } = ir(o), p = t ? tn : e ? Yt : ze;
    if (a.call(o, s)) return p(i.get(s));
    if (a.call(o, l)) return p(i.get(l));
    i !== o && i.get(s);
  }, get size() {
    const s = this.__v_raw;
    return !e && pe(H(s), "iterate", ht), s.size;
  }, has(s) {
    const i = this.__v_raw, o = H(i), l = H(s);
    return e || (st(s, l) && pe(o, "has", s), pe(o, "has", l)), s === l ? i.has(s) : i.has(s) || i.has(l);
  }, forEach(s, i) {
    const o = this, l = o.__v_raw, a = H(l), p = t ? tn : e ? Yt : ze;
    return !e && pe(a, "iterate", ht), l.forEach((u, d) => s.call(i, p(u), p(d), o));
  } };
  return me(r, e ? { add: or("add"), set: or("set"), delete: or("delete"), clear: or("clear") } : { add(s) {
    !t && !Re(s) && !it(s) && (s = H(s));
    const i = H(this);
    return ir(i).has.call(i, s) || (i.add(s), je(i, "add", s, s)), this;
  }, set(s, i) {
    !t && !Re(i) && !it(i) && (i = H(i));
    const o = H(this), { has: l, get: a } = ir(o);
    let p = l.call(o, s);
    p || (s = H(s), p = l.call(o, s));
    const u = a.call(o, s);
    return o.set(s, i), p ? st(i, u) && je(o, "set", s, i) : je(o, "add", s, i), this;
  }, delete(s) {
    const i = H(this), { has: o, get: l } = ir(i);
    let a = o.call(i, s);
    a || (s = H(s), a = o.call(i, s)), l && l.call(i, s);
    const p = i.delete(s);
    return a && je(i, "delete", s, void 0), p;
  }, clear() {
    const s = H(this), i = s.size !== 0, o = s.clear();
    return i && je(s, "clear", void 0, void 0), o;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    r[s] = Do(s, e, t);
  }), r;
}
function Sn(e, t) {
  const r = Ro(e, t);
  return (n, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? n : Reflect.get($(r, s) && s in n ? r : n, s, i);
}
const Mo = { get: Sn(false, false) }, ko = { get: Sn(false, true) }, Vo = { get: Sn(true, false) };
const ii = /* @__PURE__ */ new WeakMap(), oi = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), Lo = /* @__PURE__ */ new WeakMap();
function Fo(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function qo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Fo(co(e));
}
function _t(e) {
  return it(e) ? e : En(e, false, Ao, Mo, ii);
}
function No(e) {
  return En(e, false, Oo, ko, oi);
}
function mr(e) {
  return En(e, true, To, Vo, li);
}
function En(e, t, r, n, s) {
  if (!J(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const i = qo(e);
  if (i === 0) return e;
  const o = s.get(e);
  if (o) return o;
  const l = new Proxy(e, i === 2 ? n : r);
  return s.set(e, l), l;
}
function Ct(e) {
  return it(e) ? Ct(e.__v_raw) : !!(e && e.__v_isReactive);
}
function it(e) {
  return !!(e && e.__v_isReadonly);
}
function Re(e) {
  return !!(e && e.__v_isShallow);
}
function In(e) {
  return e ? !!e.__v_raw : false;
}
function H(e) {
  const t = e && e.__v_raw;
  return t ? H(t) : e;
}
function Wo(e) {
  return !$(e, "__v_skip") && Object.isExtensible(e) && Us(e, "__v_skip", true), e;
}
const ze = (e) => J(e) ? _t(e) : e, Yt = (e) => J(e) ? mr(e) : e;
function he(e) {
  return e ? e.__v_isRef === true : false;
}
function se(e) {
  return ci(e, false);
}
function ai(e) {
  return ci(e, true);
}
function ci(e, t) {
  return he(e) ? e : new Bo(e, t);
}
class Bo {
  constructor(t, r) {
    this.dep = new Pn(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = r ? t : H(t), this._value = r ? t : ze(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, n = this.__v_isShallow || Re(t) || it(t);
    t = n ? t : H(t), st(t, r) && (this._rawValue = t, this._value = n ? t : ze(t), this.dep.trigger());
  }
}
function ee(e) {
  return he(e) ? e.value : e;
}
const Uo = { get: (e, t, r) => t === "__v_raw" ? e : ee(Reflect.get(e, t, r)), set: (e, t, r, n) => {
  const s = e[t];
  return he(s) && !he(r) ? (s.value = r, true) : Reflect.set(e, t, r, n);
} };
function ui(e) {
  return Ct(e) ? e : new Proxy(e, Uo);
}
class Ho {
  constructor(t, r, n) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new Pn(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Qt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && Q !== this) return Ys(this, true), true;
  }
  get value() {
    const t = this.dep.track();
    return Zs(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function $o(e, t, r = false) {
  let n, s;
  return L(e) ? n = e : (n = e.get, s = e.set), new Ho(n, s, r);
}
const lr = {}, _r = /* @__PURE__ */ new WeakMap();
let dt;
function Ko(e, t = false, r = dt) {
  if (r) {
    let n = _r.get(r);
    n || _r.set(r, n = []), n.push(e);
  }
}
function jo(e, t, r = z) {
  const { immediate: n, deep: s, once: i, scheduler: o, augmentJob: l, call: a } = r, p = (C) => s ? C : Re(C) || s === false || s === 0 ? rt(C, 1) : rt(C);
  let u, d, g, x, T = false, O = false;
  if (he(e) ? (d = () => e.value, T = Re(e)) : Ct(e) ? (d = () => p(e), T = true) : q(e) ? (O = true, T = e.some((C) => Ct(C) || Re(C)), d = () => e.map((C) => {
    if (he(C)) return C.value;
    if (Ct(C)) return p(C);
    if (L(C)) return a ? a(C, 2) : C();
  })) : L(e) ? t ? d = a ? () => a(e, 2) : e : d = () => {
    if (g) {
      Ge();
      try {
        g();
      } finally {
        Qe();
      }
    }
    const C = dt;
    dt = u;
    try {
      return a ? a(e, 3, [x]) : e(x);
    } finally {
      dt = C;
    }
  } : d = Be, t && s) {
    const C = d, N = s === true ? 1 / 0 : s;
    d = () => rt(C(), N);
  }
  const U = js(), E = () => {
    u.stop(), U && U.active && vn(U.effects, u);
  };
  if (i && t) {
    const C = t;
    t = (...N) => {
      C(...N), E();
    };
  }
  let R = O ? new Array(e.length).fill(lr) : lr;
  const k = (C) => {
    if (!(!(u.flags & 1) || !u.dirty && !C)) if (t) {
      const N = u.run();
      if (s || T || (O ? N.some((ce, ne) => st(ce, R[ne])) : st(N, R))) {
        g && g();
        const ce = dt;
        dt = u;
        try {
          const ne = [N, R === lr ? void 0 : O && R[0] === lr ? [] : R, x];
          R = N, a ? a(t, 3, ne) : t(...ne);
        } finally {
          dt = ce;
        }
      }
    } else u.run();
  };
  return l && l(k), u = new Qs(d), u.scheduler = o ? () => o(k, false) : k, x = (C) => Ko(C, false, u), g = u.onStop = () => {
    const C = _r.get(u);
    if (C) {
      if (a) a(C, 4);
      else for (const N of C) N();
      _r.delete(u);
    }
  }, t ? n ? k(true) : R = u.run() : o ? o(k.bind(null, true), true) : u.run(), E.pause = u.pause.bind(u), E.resume = u.resume.bind(u), E.stop = E, E;
}
function rt(e, t = 1 / 0, r) {
  if (t <= 0 || !J(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t)) return e;
  if (r.set(e, t), t--, he(e)) rt(e.value, t, r);
  else if (q(e)) for (let n = 0; n < e.length; n++) rt(e[n], t, r);
  else if (qs(e) || Pt(e)) e.forEach((n) => {
    rt(n, t, r);
  });
  else if (Bs(e)) {
    for (const n in e) rt(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, n) && rt(e[n], t, r);
  }
  return e;
}
function er(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (s) {
    Or(s, t, r);
  }
}
function Ue(e, t, r, n) {
  if (L(e)) {
    const s = er(e, t, r, n);
    return s && Ns(s) && s.catch((i) => {
      Or(i, t, r);
    }), s;
  }
  if (q(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++) s.push(Ue(e[i], t, r, n));
    return s;
  }
}
function Or(e, t, r, n = true) {
  const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || z;
  if (t) {
    let l = t.parent;
    const a = t.proxy, p = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let d = 0; d < u.length; d++) if (u[d](e, a, p) === false) return;
      }
      l = l.parent;
    }
    if (i) {
      Ge(), er(i, null, 10, [e, a, p]), Qe();
      return;
    }
  }
  Go(e, r, s, n, o);
}
function Go(e, t, r, n = true, s = false) {
  if (s) throw e;
  console.error(e);
}
const ye = [];
let qe = -1;
const St = [];
let et = null, wt = 0;
const fi = Promise.resolve();
let vr = null;
function yr(e) {
  const t = vr || fi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Qo(e) {
  let t = qe + 1, r = ye.length;
  for (; t < r; ) {
    const n = t + r >>> 1, s = ye[n], i = Xt(s);
    i < e || i === e && s.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function An(e) {
  if (!(e.flags & 1)) {
    const t = Xt(e), r = ye[ye.length - 1];
    !r || !(e.flags & 2) && t >= Xt(r) ? ye.push(e) : ye.splice(Qo(t), 0, e), e.flags |= 1, pi();
  }
}
function pi() {
  vr || (vr = fi.then(hi));
}
function zo(e) {
  q(e) ? St.push(...e) : et && e.id === -1 ? et.splice(wt + 1, 0, e) : e.flags & 1 || (St.push(e), e.flags |= 1), pi();
}
function Gn(e, t, r = qe + 1) {
  for (; r < ye.length; r++) {
    const n = ye[r];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      ye.splice(r, 1), r--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function di(e) {
  if (St.length) {
    const t = [...new Set(St)].sort((r, n) => Xt(r) - Xt(n));
    if (St.length = 0, et) {
      et.push(...t);
      return;
    }
    for (et = t, wt = 0; wt < et.length; wt++) {
      const r = et[wt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    et = null, wt = 0;
  }
}
const Xt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function hi(e) {
  try {
    for (qe = 0; qe < ye.length; qe++) {
      const t = ye[qe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), er(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; qe < ye.length; qe++) {
      const t = ye[qe];
      t && (t.flags &= -2);
    }
    qe = -1, ye.length = 0, di(), vr = null, (ye.length || St.length) && hi();
  }
}
let Oe = null, gi = null;
function br(e) {
  const t = Oe;
  return Oe = e, gi = e && e.type.__scopeId || null, t;
}
function Yo(e, t = Oe, r) {
  if (!t || e._n) return e;
  const n = (...s) => {
    n._d && ss(-1);
    const i = br(t);
    let o;
    try {
      o = e(...s);
    } finally {
      br(i), n._d && ss(1);
    }
    return o;
  };
  return n._n = true, n._c = true, n._d = true, n;
}
function ft(e, t, r, n) {
  const s = e.dirs, i = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    i && (l.oldValue = i[o].value);
    let a = l.dir[n];
    a && (Ge(), Ue(a, r, 8, [e.el, l, e, t]), Qe());
  }
}
function Xo(e, t) {
  if (de) {
    let r = de.provides;
    const n = de.parent && de.parent.provides;
    n === r && (r = de.provides = Object.create(n)), r[e] = t;
  }
}
function pr(e, t, r = false) {
  const n = Ui();
  if (n || Et) {
    let s = Et ? Et._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return r && L(t) ? t.call(n && n.proxy) : t;
  }
}
const Jo = Symbol.for("v-scx"), Zo = () => pr(Jo);
function ge(e, t, r) {
  return mi(e, t, r);
}
function mi(e, t, r = z) {
  const { immediate: n, deep: s, flush: i, once: o } = r, l = me({}, r), a = t && n || !t && i !== "post";
  let p;
  if (Zt) {
    if (i === "sync") {
      const x = Zo();
      p = x.__watcherHandles || (x.__watcherHandles = []);
    } else if (!a) {
      const x = () => {
      };
      return x.stop = Be, x.resume = Be, x.pause = Be, x;
    }
  }
  const u = de;
  l.call = (x, T, O) => Ue(x, u, T, O);
  let d = false;
  i === "post" ? l.scheduler = (x) => {
    Se(x, u && u.suspense);
  } : i !== "sync" && (d = true, l.scheduler = (x, T) => {
    T ? x() : An(x);
  }), l.augmentJob = (x) => {
    t && (x.flags |= 4), d && (x.flags |= 2, u && (x.id = u.uid, x.i = u));
  };
  const g = jo(e, t, l);
  return Zt && (p ? p.push(g) : a && g()), g;
}
function el(e, t, r) {
  const n = this.proxy, s = re(e) ? e.includes(".") ? _i(n, e) : () => n[e] : e.bind(n, n);
  let i;
  L(t) ? i = t : (i = t.handler, r = t);
  const o = tr(this), l = mi(s, i.bind(n), r);
  return o(), l;
}
function _i(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let s = 0; s < r.length && n; s++) n = n[r[s]];
    return n;
  };
}
const tl = Symbol("_vte"), rl = (e) => e.__isTeleport, nl = Symbol("_leaveCb");
function Tn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Tn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Tt(e, t) {
  return L(e) ? me({ name: e.name }, t, { setup: e }) : e;
}
function vi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const wr = /* @__PURE__ */ new WeakMap();
function Bt(e, t, r, n, s = false) {
  if (q(e)) {
    e.forEach((T, O) => Bt(T, t && (q(t) ? t[O] : t), r, n, s));
    return;
  }
  if (Ut(n) && !s) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Bt(e, t, r, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? Vn(n.component) : n.el, o = s ? null : i, { i: l, r: a } = e, p = t && t.r, u = l.refs === z ? l.refs = {} : l.refs, d = l.setupState, g = H(d), x = d === z ? Fs : (T) => $(g, T);
  if (p != null && p !== a) {
    if (Qn(t), re(p)) u[p] = null, x(p) && (d[p] = null);
    else if (he(p)) {
      p.value = null;
      const T = t;
      T.k && (u[T.k] = null);
    }
  }
  if (L(a)) er(a, l, 12, [o, u]);
  else {
    const T = re(a), O = he(a);
    if (T || O) {
      const U = () => {
        if (e.f) {
          const E = T ? x(a) ? d[a] : u[a] : a.value;
          if (s) q(E) && vn(E, i);
          else if (q(E)) E.includes(i) || E.push(i);
          else if (T) u[a] = [i], x(a) && (d[a] = u[a]);
          else {
            const R = [i];
            a.value = R, e.k && (u[e.k] = R);
          }
        } else T ? (u[a] = o, x(a) && (d[a] = o)) : O && (a.value = o, e.k && (u[e.k] = o));
      };
      if (o) {
        const E = () => {
          U(), wr.delete(e);
        };
        E.id = -1, wr.set(e, E), Se(E, r);
      } else Qn(e), U();
    }
  }
}
function Qn(e) {
  const t = wr.get(e);
  t && (t.flags |= 8, wr.delete(e));
}
Ar().requestIdleCallback;
Ar().cancelIdleCallback;
const Ut = (e) => !!e.type.__asyncLoader, yi = (e) => e.type.__isKeepAlive;
function sl(e, t) {
  bi(e, "a", t);
}
function il(e, t) {
  bi(e, "da", t);
}
function bi(e, t, r = de) {
  const n = e.__wdc || (e.__wdc = () => {
    let s = r;
    for (; s; ) {
      if (s.isDeactivated) return;
      s = s.parent;
    }
    return e();
  });
  if (Dr(t, n, r), r) {
    let s = r.parent;
    for (; s && s.parent; ) yi(s.parent.vnode) && ol(n, t, r, s), s = s.parent;
  }
}
function ol(e, t, r, n) {
  const s = Dr(t, e, n, true);
  Rr(() => {
    vn(n[t], s);
  }, r);
}
function Dr(e, t, r = de, n = false) {
  if (r) {
    const s = r[e] || (r[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Ge();
      const l = tr(r), a = Ue(t, r, e, o);
      return l(), Qe(), a;
    });
    return n ? s.unshift(i) : s.push(i), i;
  }
}
const Ye = (e) => (t, r = de) => {
  (!Zt || e === "sp") && Dr(e, (...n) => t(...n), r);
}, ll = Ye("bm"), On = Ye("m"), al = Ye("bu"), cl = Ye("u"), ul = Ye("bum"), Rr = Ye("um"), fl = Ye("sp"), pl = Ye("rtg"), dl = Ye("rtc");
function hl(e, t = de) {
  Dr("ec", e, t);
}
const gl = "components", wi = Symbol.for("v-ndc");
function ml(e) {
  return re(e) ? _l(gl, e, false) || e : e || wi;
}
function _l(e, t, r = true, n = false) {
  const s = Oe || de;
  if (s) {
    const i = s.type;
    {
      const l = ra(i, false);
      if (l && (l === t || l === Te(t) || l === Ir(Te(t)))) return i;
    }
    const o = zn(s[e] || i[e], t) || zn(s.appContext[e], t);
    return !o && n ? i : o;
  }
}
function zn(e, t) {
  return e && (e[t] || e[Te(t)] || e[Ir(Te(t))]);
}
const rn = (e) => e ? Hi(e) ? Vn(e) : rn(e.parent) : null, Ht = me(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => rn(e.parent), $root: (e) => rn(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Pi(e), $forceUpdate: (e) => e.f || (e.f = () => {
  An(e.update);
}), $nextTick: (e) => e.n || (e.n = yr.bind(e.proxy)), $watch: (e) => el.bind(e) }), Kr = (e, t) => e !== z && !e.__isScriptSetup && $(e, t), vl = { get({ _: e }, t) {
  if (t === "__v_skip") return true;
  const { ctx: r, setupState: n, data: s, props: i, accessCache: o, type: l, appContext: a } = e;
  if (t[0] !== "$") {
    const g = o[t];
    if (g !== void 0) switch (g) {
      case 1:
        return n[t];
      case 2:
        return s[t];
      case 4:
        return r[t];
      case 3:
        return i[t];
    }
    else {
      if (Kr(n, t)) return o[t] = 1, n[t];
      if (s !== z && $(s, t)) return o[t] = 2, s[t];
      if ($(i, t)) return o[t] = 3, i[t];
      if (r !== z && $(r, t)) return o[t] = 4, r[t];
      nn && (o[t] = 0);
    }
  }
  const p = Ht[t];
  let u, d;
  if (p) return t === "$attrs" && pe(e.attrs, "get", ""), p(e);
  if ((u = l.__cssModules) && (u = u[t])) return u;
  if (r !== z && $(r, t)) return o[t] = 4, r[t];
  if (d = a.config.globalProperties, $(d, t)) return d[t];
}, set({ _: e }, t, r) {
  const { data: n, setupState: s, ctx: i } = e;
  return Kr(s, t) ? (s[t] = r, true) : n !== z && $(n, t) ? (n[t] = r, true) : $(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (i[t] = r, true);
}, has({ _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: s, props: i, type: o } }, l) {
  let a;
  return !!(r[l] || e !== z && l[0] !== "$" && $(e, l) || Kr(t, l) || $(i, l) || $(n, l) || $(Ht, l) || $(s.config.globalProperties, l) || (a = o.__cssModules) && a[l]);
}, defineProperty(e, t, r) {
  return r.get != null ? e._.accessCache[t] = 0 : $(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
} };
function Yn(e) {
  return q(e) ? e.reduce((t, r) => (t[r] = null, t), {}) : e;
}
let nn = true;
function yl(e) {
  const t = Pi(e), r = e.proxy, n = e.ctx;
  nn = false, t.beforeCreate && Xn(t.beforeCreate, e, "bc");
  const { data: s, computed: i, methods: o, watch: l, provide: a, inject: p, created: u, beforeMount: d, mounted: g, beforeUpdate: x, updated: T, activated: O, deactivated: U, beforeDestroy: E, beforeUnmount: R, destroyed: k, unmounted: C, render: N, renderTracked: ce, renderTriggered: ne, errorCaptured: ie, serverPrefetch: He, expose: Ae, inheritAttrs: Y, components: be, directives: at, filters: vt } = t;
  if (p && bl(p, n, null), o) for (const X in o) {
    const j = o[X];
    L(j) && (n[X] = j.bind(r));
  }
  if (s) {
    const X = s.call(r, r);
    J(X) && (e.data = _t(X));
  }
  if (nn = true, i) for (const X in i) {
    const j = i[X], ct = L(j) ? j.bind(r, r) : L(j.get) ? j.get.bind(r, r) : Be, nr = !L(j) && L(j.set) ? j.set.bind(r) : Be, ut = F({ get: ct, set: nr });
    Object.defineProperty(n, X, { enumerable: true, configurable: true, get: () => ut.value, set: (Me) => ut.value = Me });
  }
  if (l) for (const X in l) xi(l[X], n, r, X);
  if (a) {
    const X = L(a) ? a.call(r) : a;
    Reflect.ownKeys(X).forEach((j) => {
      Xo(j, X[j]);
    });
  }
  u && Xn(u, e, "c");
  function _e(X, j) {
    q(j) ? j.forEach((ct) => X(ct.bind(r))) : j && X(j.bind(r));
  }
  if (_e(ll, d), _e(On, g), _e(al, x), _e(cl, T), _e(sl, O), _e(il, U), _e(hl, ie), _e(dl, ce), _e(pl, ne), _e(ul, R), _e(Rr, C), _e(fl, He), q(Ae)) if (Ae.length) {
    const X = e.exposed || (e.exposed = {});
    Ae.forEach((j) => {
      Object.defineProperty(X, j, { get: () => r[j], set: (ct) => r[j] = ct, enumerable: true });
    });
  } else e.exposed || (e.exposed = {});
  N && e.render === Be && (e.render = N), Y != null && (e.inheritAttrs = Y), be && (e.components = be), at && (e.directives = at), He && vi(e);
}
function bl(e, t, r = Be) {
  q(e) && (e = sn(e));
  for (const n in e) {
    const s = e[n];
    let i;
    J(s) ? "default" in s ? i = pr(s.from || n, s.default, true) : i = pr(s.from || n) : i = pr(s), he(i) ? Object.defineProperty(t, n, { enumerable: true, configurable: true, get: () => i.value, set: (o) => i.value = o }) : t[n] = i;
  }
}
function Xn(e, t, r) {
  Ue(q(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function xi(e, t, r, n) {
  let s = n.includes(".") ? _i(r, n) : () => r[n];
  if (re(e)) {
    const i = t[e];
    L(i) && ge(s, i);
  } else if (L(e)) ge(s, e.bind(r));
  else if (J(e)) if (q(e)) e.forEach((i) => xi(i, t, r, n));
  else {
    const i = L(e.handler) ? e.handler.bind(r) : t[e.handler];
    L(i) && ge(s, i, e);
  }
}
function Pi(e) {
  const t = e.type, { mixins: r, extends: n } = t, { mixins: s, optionsCache: i, config: { optionMergeStrategies: o } } = e.appContext, l = i.get(t);
  let a;
  return l ? a = l : !s.length && !r && !n ? a = t : (a = {}, s.length && s.forEach((p) => xr(a, p, o, true)), xr(a, t, o)), J(t) && i.set(t, a), a;
}
function xr(e, t, r, n = false) {
  const { mixins: s, extends: i } = t;
  i && xr(e, i, r, true), s && s.forEach((o) => xr(e, o, r, true));
  for (const o in t) if (!(n && o === "expose")) {
    const l = wl[o] || r && r[o];
    e[o] = l ? l(e[o], t[o]) : t[o];
  }
  return e;
}
const wl = { data: Jn, props: Zn, emits: Zn, methods: Ft, computed: Ft, beforeCreate: ve, created: ve, beforeMount: ve, mounted: ve, beforeUpdate: ve, updated: ve, beforeDestroy: ve, beforeUnmount: ve, destroyed: ve, unmounted: ve, activated: ve, deactivated: ve, errorCaptured: ve, serverPrefetch: ve, components: Ft, directives: Ft, watch: Pl, provide: Jn, inject: xl };
function Jn(e, t) {
  return t ? e ? function() {
    return me(L(e) ? e.call(this, this) : e, L(t) ? t.call(this, this) : t);
  } : t : e;
}
function xl(e, t) {
  return Ft(sn(e), sn(t));
}
function sn(e) {
  if (q(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
    return t;
  }
  return e;
}
function ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ft(e, t) {
  return e ? me(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Zn(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : me(/* @__PURE__ */ Object.create(null), Yn(e), Yn(t ?? {})) : t;
}
function Pl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = me(/* @__PURE__ */ Object.create(null), e);
  for (const n in t) r[n] = ve(e[n], t[n]);
  return r;
}
function Ci() {
  return { app: null, config: { isNativeTag: Fs, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let Cl = 0;
function Sl(e, t) {
  return function(n, s = null) {
    L(n) || (n = me({}, n)), s != null && !J(s) && (s = null);
    const i = Ci(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = false;
    const p = i.app = { _uid: Cl++, _component: n, _props: s, _container: null, _context: i, _instance: null, version: sa, get config() {
      return i.config;
    }, set config(u) {
    }, use(u, ...d) {
      return o.has(u) || (u && L(u.install) ? (o.add(u), u.install(p, ...d)) : L(u) && (o.add(u), u(p, ...d))), p;
    }, mixin(u) {
      return i.mixins.includes(u) || i.mixins.push(u), p;
    }, component(u, d) {
      return d ? (i.components[u] = d, p) : i.components[u];
    }, directive(u, d) {
      return d ? (i.directives[u] = d, p) : i.directives[u];
    }, mount(u, d, g) {
      if (!a) {
        const x = p._ceVNode || Z(n, s);
        return x.appContext = i, g === true ? g = "svg" : g === false && (g = void 0), e(x, u, g), a = true, p._container = u, u.__vue_app__ = p, Vn(x.component);
      }
    }, onUnmount(u) {
      l.push(u);
    }, unmount() {
      a && (Ue(l, p._instance, 16), e(null, p._container), delete p._container.__vue_app__);
    }, provide(u, d) {
      return i.provides[u] = d, p;
    }, runWithContext(u) {
      const d = Et;
      Et = p;
      try {
        return u();
      } finally {
        Et = d;
      }
    } };
    return p;
  };
}
let Et = null;
const El = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Te(t)}Modifiers`] || e[`${mt(t)}Modifiers`];
function Il(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || z;
  let s = r;
  const i = t.startsWith("update:"), o = i && El(n, t.slice(7));
  o && (o.trim && (s = r.map((u) => re(u) ? u.trim() : u)), o.number && (s = r.map(po)));
  let l, a = n[l = Nr(t)] || n[l = Nr(Te(t))];
  !a && i && (a = n[l = Nr(mt(t))]), a && Ue(a, e, 6, s);
  const p = n[l + "Once"];
  if (p) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    e.emitted[l] = true, Ue(p, e, 6, s);
  }
}
const Al = /* @__PURE__ */ new WeakMap();
function Si(e, t, r = false) {
  const n = r ? Al : t.emitsCache, s = n.get(e);
  if (s !== void 0) return s;
  const i = e.emits;
  let o = {}, l = false;
  if (!L(e)) {
    const a = (p) => {
      const u = Si(p, t, true);
      u && (l = true, me(o, u));
    };
    !r && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !l ? (J(e) && n.set(e, null), null) : (q(i) ? i.forEach((a) => o[a] = null) : me(o, i), J(e) && n.set(e, o), o);
}
function Mr(e, t) {
  return !e || !Cr(t) ? false : (t = t.slice(2).replace(/Once$/, ""), $(e, t[0].toLowerCase() + t.slice(1)) || $(e, mt(t)) || $(e, t));
}
function es(e) {
  const { type: t, vnode: r, proxy: n, withProxy: s, propsOptions: [i], slots: o, attrs: l, emit: a, render: p, renderCache: u, props: d, data: g, setupState: x, ctx: T, inheritAttrs: O } = e, U = br(e);
  let E, R;
  try {
    if (r.shapeFlag & 4) {
      const C = s || n, N = C;
      E = We(p.call(N, C, u, d, x, g, T)), R = l;
    } else {
      const C = t;
      E = We(C.length > 1 ? C(d, { attrs: l, slots: o, emit: a }) : C(d, null)), R = t.props ? l : Tl(l);
    }
  } catch (C) {
    $t.length = 0, Or(C, e, 1), E = Z(ot);
  }
  let k = E;
  if (R && O !== false) {
    const C = Object.keys(R), { shapeFlag: N } = k;
    C.length && N & 7 && (i && C.some(_n) && (R = Ol(R, i)), k = It(k, R, false, true));
  }
  return r.dirs && (k = It(k, null, false, true), k.dirs = k.dirs ? k.dirs.concat(r.dirs) : r.dirs), r.transition && Tn(k, r.transition), E = k, br(U), E;
}
const Tl = (e) => {
  let t;
  for (const r in e) (r === "class" || r === "style" || Cr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, Ol = (e, t) => {
  const r = {};
  for (const n in e) (!_n(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function Dl(e, t, r) {
  const { props: n, children: s, component: i } = e, { props: o, children: l, patchFlag: a } = t, p = i.emitsOptions;
  if (t.dirs || t.transition) return true;
  if (r && a >= 0) {
    if (a & 1024) return true;
    if (a & 16) return n ? ts(n, o, p) : !!o;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        const g = u[d];
        if (o[g] !== n[g] && !Mr(p, g)) return true;
      }
    }
  } else return (s || l) && (!l || !l.$stable) ? true : n === o ? false : n ? o ? ts(n, o, p) : true : !!o;
  return false;
}
function ts(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return true;
  for (let s = 0; s < n.length; s++) {
    const i = n[s];
    if (t[i] !== e[i] && !Mr(r, i)) return true;
  }
  return false;
}
function Rl({ vnode: e, parent: t }, r) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e) (e = t.vnode).el = r, t = t.parent;
    else break;
  }
}
const Ei = {}, Ii = () => Object.create(Ei), Ai = (e) => Object.getPrototypeOf(e) === Ei;
function Ml(e, t, r, n = false) {
  const s = {}, i = Ii();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ti(e, t, s, i);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  r ? e.props = n ? s : No(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function kl(e, t, r, n) {
  const { props: s, attrs: i, vnode: { patchFlag: o } } = e, l = H(s), [a] = e.propsOptions;
  let p = false;
  if ((n || o > 0) && !(o & 16)) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        let g = u[d];
        if (Mr(e.emitsOptions, g)) continue;
        const x = t[g];
        if (a) if ($(i, g)) x !== i[g] && (i[g] = x, p = true);
        else {
          const T = Te(g);
          s[T] = on(a, l, T, x, e, false);
        }
        else x !== i[g] && (i[g] = x, p = true);
      }
    }
  } else {
    Ti(e, t, s, i) && (p = true);
    let u;
    for (const d in l) (!t || !$(t, d) && ((u = mt(d)) === d || !$(t, u))) && (a ? r && (r[d] !== void 0 || r[u] !== void 0) && (s[d] = on(a, l, d, void 0, e, true)) : delete s[d]);
    if (i !== l) for (const d in i) (!t || !$(t, d)) && (delete i[d], p = true);
  }
  p && je(e.attrs, "set", "");
}
function Ti(e, t, r, n) {
  const [s, i] = e.propsOptions;
  let o = false, l;
  if (t) for (let a in t) {
    if (qt(a)) continue;
    const p = t[a];
    let u;
    s && $(s, u = Te(a)) ? !i || !i.includes(u) ? r[u] = p : (l || (l = {}))[u] = p : Mr(e.emitsOptions, a) || (!(a in n) || p !== n[a]) && (n[a] = p, o = true);
  }
  if (i) {
    const a = H(r), p = l || z;
    for (let u = 0; u < i.length; u++) {
      const d = i[u];
      r[d] = on(s, a, d, p[d], e, !$(p, d));
    }
  }
  return o;
}
function on(e, t, r, n, s, i) {
  const o = e[r];
  if (o != null) {
    const l = $(o, "default");
    if (l && n === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && L(a)) {
        const { propsDefaults: p } = s;
        if (r in p) n = p[r];
        else {
          const u = tr(s);
          n = p[r] = a.call(null, t), u();
        }
      } else n = a;
      s.ce && s.ce._setProp(r, n);
    }
    o[0] && (i && !l ? n = false : o[1] && (n === "" || n === mt(r)) && (n = true));
  }
  return n;
}
const Vl = /* @__PURE__ */ new WeakMap();
function Oi(e, t, r = false) {
  const n = r ? Vl : t.propsCache, s = n.get(e);
  if (s) return s;
  const i = e.props, o = {}, l = [];
  let a = false;
  if (!L(e)) {
    const u = (d) => {
      a = true;
      const [g, x] = Oi(d, t, true);
      me(o, g), x && l.push(...x);
    };
    !r && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a) return J(e) && n.set(e, xt), xt;
  if (q(i)) for (let u = 0; u < i.length; u++) {
    const d = Te(i[u]);
    rs(d) && (o[d] = z);
  }
  else if (i) for (const u in i) {
    const d = Te(u);
    if (rs(d)) {
      const g = i[u], x = o[d] = q(g) || L(g) ? { type: g } : me({}, g), T = x.type;
      let O = false, U = true;
      if (q(T)) for (let E = 0; E < T.length; ++E) {
        const R = T[E], k = L(R) && R.name;
        if (k === "Boolean") {
          O = true;
          break;
        } else k === "String" && (U = false);
      }
      else O = L(T) && T.name === "Boolean";
      x[0] = O, x[1] = U, (O || $(x, "default")) && l.push(d);
    }
  }
  const p = [o, l];
  return J(e) && n.set(e, p), p;
}
function rs(e) {
  return e[0] !== "$" && !qt(e);
}
const Dn = (e) => e === "_" || e === "_ctx" || e === "$stable", Rn = (e) => q(e) ? e.map(We) : [We(e)], Ll = (e, t, r) => {
  if (t._n) return t;
  const n = Yo((...s) => Rn(t(...s)), r);
  return n._c = false, n;
}, Di = (e, t, r) => {
  const n = e._ctx;
  for (const s in e) {
    if (Dn(s)) continue;
    const i = e[s];
    if (L(i)) t[s] = Ll(s, i, n);
    else if (i != null) {
      const o = Rn(i);
      t[s] = () => o;
    }
  }
}, Ri = (e, t) => {
  const r = Rn(t);
  e.slots.default = () => r;
}, Mi = (e, t, r) => {
  for (const n in t) (r || !Dn(n)) && (e[n] = t[n]);
}, Fl = (e, t, r) => {
  const n = e.slots = Ii();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Mi(n, t, r), r && Us(n, "_", s, true)) : Di(t, n);
  } else t && Ri(e, t);
}, ql = (e, t, r) => {
  const { vnode: n, slots: s } = e;
  let i = true, o = z;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? r && l === 1 ? i = false : Mi(s, t, r) : (i = !t.$stable, Di(t, s)), o = t;
  } else t && (Ri(e, t), o = { default: 1 });
  if (i) for (const l in s) !Dn(l) && o[l] == null && delete s[l];
}, Se = Hl;
function Nl(e) {
  return Wl(e);
}
function Wl(e, t) {
  const r = Ar();
  r.__VUE__ = true;
  const { insert: n, remove: s, patchProp: i, createElement: o, createText: l, createComment: a, setText: p, setElementText: u, parentNode: d, nextSibling: g, setScopeId: x = Be, insertStaticContent: T } = e, O = (c, f, h, y = null, m = null, _ = null, P = void 0, w = null, b = !!f.dynamicChildren) => {
    if (c === f) return;
    c && !Lt(c, f) && (y = sr(c), Me(c, m, _, true), c = null), f.patchFlag === -2 && (b = false, f.dynamicChildren = null);
    const { type: v, ref: M, shapeFlag: S } = f;
    switch (v) {
      case kr:
        U(c, f, h, y);
        break;
      case ot:
        E(c, f, h, y);
        break;
      case Gr:
        c == null && R(f, h, y, P);
        break;
      case Ne:
        be(c, f, h, y, m, _, P, w, b);
        break;
      default:
        S & 1 ? N(c, f, h, y, m, _, P, w, b) : S & 6 ? at(c, f, h, y, m, _, P, w, b) : (S & 64 || S & 128) && v.process(c, f, h, y, m, _, P, w, b, Mt);
    }
    M != null && m ? Bt(M, c && c.ref, _, f || c, !f) : M == null && c && c.ref != null && Bt(c.ref, null, _, c, true);
  }, U = (c, f, h, y) => {
    if (c == null) n(f.el = l(f.children), h, y);
    else {
      const m = f.el = c.el;
      f.children !== c.children && p(m, f.children);
    }
  }, E = (c, f, h, y) => {
    c == null ? n(f.el = a(f.children || ""), h, y) : f.el = c.el;
  }, R = (c, f, h, y) => {
    [c.el, c.anchor] = T(c.children, f, h, y, c.el, c.anchor);
  }, k = ({ el: c, anchor: f }, h, y) => {
    let m;
    for (; c && c !== f; ) m = g(c), n(c, h, y), c = m;
    n(f, h, y);
  }, C = ({ el: c, anchor: f }) => {
    let h;
    for (; c && c !== f; ) h = g(c), s(c), c = h;
    s(f);
  }, N = (c, f, h, y, m, _, P, w, b) => {
    if (f.type === "svg" ? P = "svg" : f.type === "math" && (P = "mathml"), c == null) ce(f, h, y, m, _, P, w, b);
    else {
      const v = c.el && c.el._isVueCE ? c.el : null;
      try {
        v && v._beginPatch(), He(c, f, m, _, P, w, b);
      } finally {
        v && v._endPatch();
      }
    }
  }, ce = (c, f, h, y, m, _, P, w) => {
    let b, v;
    const { props: M, shapeFlag: S, transition: D, dirs: V } = c;
    if (b = c.el = o(c.type, _, M && M.is, M), S & 8 ? u(b, c.children) : S & 16 && ie(c.children, b, null, y, m, jr(c, _), P, w), V && ft(c, null, y, "created"), ne(b, c, c.scopeId, P, y), M) {
      for (const G in M) G !== "value" && !qt(G) && i(b, G, null, M[G], _, y);
      "value" in M && i(b, "value", null, M.value, _), (v = M.onVnodeBeforeMount) && Fe(v, y, c);
    }
    V && ft(c, null, y, "beforeMount");
    const W = Bl(m, D);
    W && D.beforeEnter(b), n(b, f, h), ((v = M && M.onVnodeMounted) || W || V) && Se(() => {
      v && Fe(v, y, c), W && D.enter(b), V && ft(c, null, y, "mounted");
    }, m);
  }, ne = (c, f, h, y, m) => {
    if (h && x(c, h), y) for (let _ = 0; _ < y.length; _++) x(c, y[_]);
    if (m) {
      let _ = m.subTree;
      if (f === _ || Fi(_.type) && (_.ssContent === f || _.ssFallback === f)) {
        const P = m.vnode;
        ne(c, P, P.scopeId, P.slotScopeIds, m.parent);
      }
    }
  }, ie = (c, f, h, y, m, _, P, w, b = 0) => {
    for (let v = b; v < c.length; v++) {
      const M = c[v] = w ? tt(c[v]) : We(c[v]);
      O(null, M, f, h, y, m, _, P, w);
    }
  }, He = (c, f, h, y, m, _, P) => {
    const w = f.el = c.el;
    let { patchFlag: b, dynamicChildren: v, dirs: M } = f;
    b |= c.patchFlag & 16;
    const S = c.props || z, D = f.props || z;
    let V;
    if (h && pt(h, false), (V = D.onVnodeBeforeUpdate) && Fe(V, h, f, c), M && ft(f, c, h, "beforeUpdate"), h && pt(h, true), (S.innerHTML && D.innerHTML == null || S.textContent && D.textContent == null) && u(w, ""), v ? Ae(c.dynamicChildren, v, w, h, y, jr(f, m), _) : P || j(c, f, w, null, h, y, jr(f, m), _, false), b > 0) {
      if (b & 16) Y(w, S, D, h, m);
      else if (b & 2 && S.class !== D.class && i(w, "class", null, D.class, m), b & 4 && i(w, "style", S.style, D.style, m), b & 8) {
        const W = f.dynamicProps;
        for (let G = 0; G < W.length; G++) {
          const K = W[G], we = S[K], xe = D[K];
          (xe !== we || K === "value") && i(w, K, we, xe, m, h);
        }
      }
      b & 1 && c.children !== f.children && u(w, f.children);
    } else !P && v == null && Y(w, S, D, h, m);
    ((V = D.onVnodeUpdated) || M) && Se(() => {
      V && Fe(V, h, f, c), M && ft(f, c, h, "updated");
    }, y);
  }, Ae = (c, f, h, y, m, _, P) => {
    for (let w = 0; w < f.length; w++) {
      const b = c[w], v = f[w], M = b.el && (b.type === Ne || !Lt(b, v) || b.shapeFlag & 198) ? d(b.el) : h;
      O(b, v, M, null, y, m, _, P, true);
    }
  }, Y = (c, f, h, y, m) => {
    if (f !== h) {
      if (f !== z) for (const _ in f) !qt(_) && !(_ in h) && i(c, _, f[_], null, m, y);
      for (const _ in h) {
        if (qt(_)) continue;
        const P = h[_], w = f[_];
        P !== w && _ !== "value" && i(c, _, w, P, m, y);
      }
      "value" in h && i(c, "value", f.value, h.value, m);
    }
  }, be = (c, f, h, y, m, _, P, w, b) => {
    const v = f.el = c ? c.el : l(""), M = f.anchor = c ? c.anchor : l("");
    let { patchFlag: S, dynamicChildren: D, slotScopeIds: V } = f;
    V && (w = w ? w.concat(V) : V), c == null ? (n(v, h, y), n(M, h, y), ie(f.children || [], h, M, m, _, P, w, b)) : S > 0 && S & 64 && D && c.dynamicChildren && c.dynamicChildren.length === D.length ? (Ae(c.dynamicChildren, D, h, m, _, P, w), (f.key != null || m && f === m.subTree) && ki(c, f, true)) : j(c, f, h, M, m, _, P, w, b);
  }, at = (c, f, h, y, m, _, P, w, b) => {
    f.slotScopeIds = w, c == null ? f.shapeFlag & 512 ? m.ctx.activate(f, h, y, P, b) : vt(f, h, y, m, _, P, b) : Fr(c, f, b);
  }, vt = (c, f, h, y, m, _, P) => {
    const w = c.component = Xl(c, y, m);
    if (yi(c) && (w.ctx.renderer = Mt), Jl(w, false, P), w.asyncDep) {
      if (m && m.registerDep(w, _e, P), !c.el) {
        const b = w.subTree = Z(ot);
        E(null, b, f, h), c.placeholder = b.el;
      }
    } else _e(w, c, f, h, m, _, P);
  }, Fr = (c, f, h) => {
    const y = f.component = c.component;
    if (Dl(c, f, h)) if (y.asyncDep && !y.asyncResolved) {
      X(y, f, h);
      return;
    } else y.next = f, y.update();
    else f.el = c.el, y.vnode = f;
  }, _e = (c, f, h, y, m, _, P) => {
    const w = () => {
      if (c.isMounted) {
        let { next: S, bu: D, u: V, parent: W, vnode: G } = c;
        {
          const Ve = Vi(c);
          if (Ve) {
            S && (S.el = G.el, X(c, S, P)), Ve.asyncDep.then(() => {
              c.isUnmounted || w();
            });
            return;
          }
        }
        let K = S, we;
        pt(c, false), S ? (S.el = G.el, X(c, S, P)) : S = G, D && Wr(D), (we = S.props && S.props.onVnodeBeforeUpdate) && Fe(we, W, S, G), pt(c, true);
        const xe = es(c), ke = c.subTree;
        c.subTree = xe, O(ke, xe, d(ke.el), sr(ke), c, m, _), S.el = xe.el, K === null && Rl(c, xe.el), V && Se(V, m), (we = S.props && S.props.onVnodeUpdated) && Se(() => Fe(we, W, S, G), m);
      } else {
        let S;
        const { el: D, props: V } = f, { bm: W, m: G, parent: K, root: we, type: xe } = c, ke = Ut(f);
        pt(c, false), W && Wr(W), !ke && (S = V && V.onVnodeBeforeMount) && Fe(S, K, f), pt(c, true);
        {
          we.ce && we.ce._def.shadowRoot !== false && we.ce._injectChildStyle(xe);
          const Ve = c.subTree = es(c);
          O(null, Ve, h, y, c, m, _), f.el = Ve.el;
        }
        if (G && Se(G, m), !ke && (S = V && V.onVnodeMounted)) {
          const Ve = f;
          Se(() => Fe(S, K, Ve), m);
        }
        (f.shapeFlag & 256 || K && Ut(K.vnode) && K.vnode.shapeFlag & 256) && c.a && Se(c.a, m), c.isMounted = true, f = h = y = null;
      }
    };
    c.scope.on();
    const b = c.effect = new Qs(w);
    c.scope.off();
    const v = c.update = b.run.bind(b), M = c.job = b.runIfDirty.bind(b);
    M.i = c, M.id = c.uid, b.scheduler = () => An(M), pt(c, true), v();
  }, X = (c, f, h) => {
    f.component = c;
    const y = c.vnode.props;
    c.vnode = f, c.next = null, kl(c, f.props, y, h), ql(c, f.children, h), Ge(), Gn(c), Qe();
  }, j = (c, f, h, y, m, _, P, w, b = false) => {
    const v = c && c.children, M = c ? c.shapeFlag : 0, S = f.children, { patchFlag: D, shapeFlag: V } = f;
    if (D > 0) {
      if (D & 128) {
        nr(v, S, h, y, m, _, P, w, b);
        return;
      } else if (D & 256) {
        ct(v, S, h, y, m, _, P, w, b);
        return;
      }
    }
    V & 8 ? (M & 16 && Rt(v, m, _), S !== v && u(h, S)) : M & 16 ? V & 16 ? nr(v, S, h, y, m, _, P, w, b) : Rt(v, m, _, true) : (M & 8 && u(h, ""), V & 16 && ie(S, h, y, m, _, P, w, b));
  }, ct = (c, f, h, y, m, _, P, w, b) => {
    c = c || xt, f = f || xt;
    const v = c.length, M = f.length, S = Math.min(v, M);
    let D;
    for (D = 0; D < S; D++) {
      const V = f[D] = b ? tt(f[D]) : We(f[D]);
      O(c[D], V, h, null, m, _, P, w, b);
    }
    v > M ? Rt(c, m, _, true, false, S) : ie(f, h, y, m, _, P, w, b, S);
  }, nr = (c, f, h, y, m, _, P, w, b) => {
    let v = 0;
    const M = f.length;
    let S = c.length - 1, D = M - 1;
    for (; v <= S && v <= D; ) {
      const V = c[v], W = f[v] = b ? tt(f[v]) : We(f[v]);
      if (Lt(V, W)) O(V, W, h, null, m, _, P, w, b);
      else break;
      v++;
    }
    for (; v <= S && v <= D; ) {
      const V = c[S], W = f[D] = b ? tt(f[D]) : We(f[D]);
      if (Lt(V, W)) O(V, W, h, null, m, _, P, w, b);
      else break;
      S--, D--;
    }
    if (v > S) {
      if (v <= D) {
        const V = D + 1, W = V < M ? f[V].el : y;
        for (; v <= D; ) O(null, f[v] = b ? tt(f[v]) : We(f[v]), h, W, m, _, P, w, b), v++;
      }
    } else if (v > D) for (; v <= S; ) Me(c[v], m, _, true), v++;
    else {
      const V = v, W = v, G = /* @__PURE__ */ new Map();
      for (v = W; v <= D; v++) {
        const Ce = f[v] = b ? tt(f[v]) : We(f[v]);
        Ce.key != null && G.set(Ce.key, v);
      }
      let K, we = 0;
      const xe = D - W + 1;
      let ke = false, Ve = 0;
      const kt = new Array(xe);
      for (v = 0; v < xe; v++) kt[v] = 0;
      for (v = V; v <= S; v++) {
        const Ce = c[v];
        if (we >= xe) {
          Me(Ce, m, _, true);
          continue;
        }
        let Le;
        if (Ce.key != null) Le = G.get(Ce.key);
        else for (K = W; K <= D; K++) if (kt[K - W] === 0 && Lt(Ce, f[K])) {
          Le = K;
          break;
        }
        Le === void 0 ? Me(Ce, m, _, true) : (kt[Le - W] = v + 1, Le >= Ve ? Ve = Le : ke = true, O(Ce, f[Le], h, null, m, _, P, w, b), we++);
      }
      const Bn = ke ? Ul(kt) : xt;
      for (K = Bn.length - 1, v = xe - 1; v >= 0; v--) {
        const Ce = W + v, Le = f[Ce], Un = f[Ce + 1], Hn = Ce + 1 < M ? Un.el || Li(Un) : y;
        kt[v] === 0 ? O(null, Le, h, Hn, m, _, P, w, b) : ke && (K < 0 || v !== Bn[K] ? ut(Le, h, Hn, 2) : K--);
      }
    }
  }, ut = (c, f, h, y, m = null) => {
    const { el: _, type: P, transition: w, children: b, shapeFlag: v } = c;
    if (v & 6) {
      ut(c.component.subTree, f, h, y);
      return;
    }
    if (v & 128) {
      c.suspense.move(f, h, y);
      return;
    }
    if (v & 64) {
      P.move(c, f, h, Mt);
      return;
    }
    if (P === Ne) {
      n(_, f, h);
      for (let S = 0; S < b.length; S++) ut(b[S], f, h, y);
      n(c.anchor, f, h);
      return;
    }
    if (P === Gr) {
      k(c, f, h);
      return;
    }
    if (y !== 2 && v & 1 && w) if (y === 0) w.beforeEnter(_), n(_, f, h), Se(() => w.enter(_), m);
    else {
      const { leave: S, delayLeave: D, afterLeave: V } = w, W = () => {
        c.ctx.isUnmounted ? s(_) : n(_, f, h);
      }, G = () => {
        _._isLeaving && _[nl](true), S(_, () => {
          W(), V && V();
        });
      };
      D ? D(_, W, G) : G();
    }
    else n(_, f, h);
  }, Me = (c, f, h, y = false, m = false) => {
    const { type: _, props: P, ref: w, children: b, dynamicChildren: v, shapeFlag: M, patchFlag: S, dirs: D, cacheIndex: V } = c;
    if (S === -2 && (m = false), w != null && (Ge(), Bt(w, null, h, c, true), Qe()), V != null && (f.renderCache[V] = void 0), M & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const W = M & 1 && D, G = !Ut(c);
    let K;
    if (G && (K = P && P.onVnodeBeforeUnmount) && Fe(K, f, c), M & 6) lo(c.component, h, y);
    else {
      if (M & 128) {
        c.suspense.unmount(h, y);
        return;
      }
      W && ft(c, null, f, "beforeUnmount"), M & 64 ? c.type.remove(c, f, h, Mt, y) : v && !v.hasOnce && (_ !== Ne || S > 0 && S & 64) ? Rt(v, f, h, false, true) : (_ === Ne && S & 384 || !m && M & 16) && Rt(b, f, h), y && Nn(c);
    }
    (G && (K = P && P.onVnodeUnmounted) || W) && Se(() => {
      K && Fe(K, f, c), W && ft(c, null, f, "unmounted");
    }, h);
  }, Nn = (c) => {
    const { type: f, el: h, anchor: y, transition: m } = c;
    if (f === Ne) {
      oo(h, y);
      return;
    }
    if (f === Gr) {
      C(c);
      return;
    }
    const _ = () => {
      s(h), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (c.shapeFlag & 1 && m && !m.persisted) {
      const { leave: P, delayLeave: w } = m, b = () => P(h, _);
      w ? w(c.el, _, b) : b();
    } else _();
  }, oo = (c, f) => {
    let h;
    for (; c !== f; ) h = g(c), s(c), c = h;
    s(f);
  }, lo = (c, f, h) => {
    const { bum: y, scope: m, job: _, subTree: P, um: w, m: b, a: v } = c;
    ns(b), ns(v), y && Wr(y), m.stop(), _ && (_.flags |= 8, Me(P, c, f, h)), w && Se(w, f), Se(() => {
      c.isUnmounted = true;
    }, f);
  }, Rt = (c, f, h, y = false, m = false, _ = 0) => {
    for (let P = _; P < c.length; P++) Me(c[P], f, h, y, m);
  }, sr = (c) => {
    if (c.shapeFlag & 6) return sr(c.component.subTree);
    if (c.shapeFlag & 128) return c.suspense.next();
    const f = g(c.anchor || c.el), h = f && f[tl];
    return h ? g(h) : f;
  };
  let qr = false;
  const Wn = (c, f, h) => {
    let y;
    c == null ? f._vnode && (Me(f._vnode, null, null, true), y = f._vnode.component) : O(f._vnode || null, c, f, null, null, null, h), f._vnode = c, qr || (qr = true, Gn(y), di(), qr = false);
  }, Mt = { p: O, um: Me, m: ut, r: Nn, mt: vt, mc: ie, pc: j, pbc: Ae, n: sr, o: e };
  return { render: Wn, hydrate: void 0, createApp: Sl(Wn) };
}
function jr({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function pt({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Bl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ki(e, t, r = false) {
  const n = e.children, s = t.children;
  if (q(n) && q(s)) for (let i = 0; i < n.length; i++) {
    const o = n[i];
    let l = s[i];
    l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[i] = tt(s[i]), l.el = o.el), !r && l.patchFlag !== -2 && ki(o, l)), l.type === kr && (l.patchFlag !== -1 ? l.el = o.el : l.__elIndex = i + (e.type === Ne ? 1 : 0)), l.type === ot && !l.el && (l.el = o.el);
  }
}
function Ul(e) {
  const t = e.slice(), r = [0];
  let n, s, i, o, l;
  const a = e.length;
  for (n = 0; n < a; n++) {
    const p = e[n];
    if (p !== 0) {
      if (s = r[r.length - 1], e[s] < p) {
        t[n] = s, r.push(n);
        continue;
      }
      for (i = 0, o = r.length - 1; i < o; ) l = i + o >> 1, e[r[l]] < p ? i = l + 1 : o = l;
      p < e[r[i]] && (i > 0 && (t[n] = r[i - 1]), r[i] = n);
    }
  }
  for (i = r.length, o = r[i - 1]; i-- > 0; ) r[i] = o, o = t[o];
  return r;
}
function Vi(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Vi(t);
}
function ns(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Li(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Li(t.subTree) : null;
}
const Fi = (e) => e.__isSuspense;
function Hl(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : zo(e);
}
const Ne = Symbol.for("v-fgt"), kr = Symbol.for("v-txt"), ot = Symbol.for("v-cmt"), Gr = Symbol.for("v-stc"), $t = [];
let Ee = null;
function te(e = false) {
  $t.push(Ee = e ? null : []);
}
function $l() {
  $t.pop(), Ee = $t[$t.length - 1] || null;
}
let Jt = 1;
function ss(e, t = false) {
  Jt += e, e < 0 && Ee && t && (Ee.hasOnce = true);
}
function qi(e) {
  return e.dynamicChildren = Jt > 0 ? Ee || xt : null, $l(), Jt > 0 && Ee && Ee.push(e), e;
}
function ae(e, t, r, n, s, i) {
  return qi(B(e, t, r, n, s, i, true));
}
function Mn(e, t, r, n, s) {
  return qi(Z(e, t, r, n, s, true));
}
function Ni(e) {
  return e ? e.__v_isVNode === true : false;
}
function Lt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Wi = ({ key: e }) => e ?? null, dr = ({ ref: e, ref_key: t, ref_for: r }) => (typeof e == "number" && (e = "" + e), e != null ? re(e) || he(e) || L(e) ? { i: Oe, r: e, k: t, f: !!r } : e : null);
function B(e, t = null, r = null, n = 0, s = null, i = e === Ne ? 0 : 1, o = false, l = false) {
  const a = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && Wi(t), ref: t && dr(t), scopeId: gi, slotScopeIds: null, children: r, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: i, patchFlag: n, dynamicProps: s, dynamicChildren: null, appContext: null, ctx: Oe };
  return l ? (kn(a, r), i & 128 && e.normalize(a)) : r && (a.shapeFlag |= re(r) ? 8 : 16), Jt > 0 && !o && Ee && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && Ee.push(a), a;
}
const Z = Kl;
function Kl(e, t = null, r = null, n = 0, s = null, i = false) {
  if ((!e || e === wi) && (e = ot), Ni(e)) {
    const l = It(e, t, true);
    return r && kn(l, r), Jt > 0 && !i && Ee && (l.shapeFlag & 6 ? Ee[Ee.indexOf(e)] = l : Ee.push(l)), l.patchFlag = -2, l;
  }
  if (na(e) && (e = e.__vccOpts), t) {
    t = jl(t);
    let { class: l, style: a } = t;
    l && !re(l) && (t.class = gt(l)), J(a) && (In(a) && !q(a) && (a = me({}, a)), t.style = Tr(a));
  }
  const o = re(e) ? 1 : Fi(e) ? 128 : rl(e) ? 64 : J(e) ? 4 : L(e) ? 2 : 0;
  return B(e, t, r, n, s, o, i, true);
}
function jl(e) {
  return e ? In(e) || Ai(e) ? me({}, e) : e : null;
}
function It(e, t, r = false, n = false) {
  const { props: s, ref: i, patchFlag: o, children: l, transition: a } = e, p = t ? Ql(s || {}, t) : s, u = { __v_isVNode: true, __v_skip: true, type: e.type, props: p, key: p && Wi(p), ref: t && t.ref ? r && i ? q(i) ? i.concat(dr(t)) : [i, dr(t)] : dr(t) : i, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: l, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== Ne ? o === -1 ? 16 : o | 16 : o, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: a, component: e.component, suspense: e.suspense, ssContent: e.ssContent && It(e.ssContent), ssFallback: e.ssFallback && It(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
  return a && n && Tn(u, a.clone(u)), u;
}
function Bi(e = " ", t = 0) {
  return Z(kr, null, e, t);
}
function Gl(e = "", t = false) {
  return t ? (te(), Mn(ot, null, e)) : Z(ot, null, e);
}
function We(e) {
  return e == null || typeof e == "boolean" ? Z(ot) : q(e) ? Z(Ne, null, e.slice()) : Ni(e) ? tt(e) : Z(kr, null, String(e));
}
function tt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : It(e);
}
function kn(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (q(t)) r = 16;
  else if (typeof t == "object") if (n & 65) {
    const s = t.default;
    s && (s._c && (s._d = false), kn(e, s()), s._c && (s._d = true));
    return;
  } else {
    r = 32;
    const s = t._;
    !s && !Ai(t) ? t._ctx = Oe : s === 3 && Oe && (Oe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else L(t) ? (t = { default: t, _ctx: Oe }, r = 32) : (t = String(t), n & 64 ? (r = 16, t = [Bi(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function Ql(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const s in n) if (s === "class") t.class !== n.class && (t.class = gt([t.class, n.class]));
    else if (s === "style") t.style = Tr([t.style, n.style]);
    else if (Cr(s)) {
      const i = t[s], o = n[s];
      o && i !== o && !(q(i) && i.includes(o)) && (t[s] = i ? [].concat(i, o) : o);
    } else s !== "" && (t[s] = n[s]);
  }
  return t;
}
function Fe(e, t, r, n = null) {
  Ue(e, t, 7, [r, n]);
}
const zl = Ci();
let Yl = 0;
function Xl(e, t, r) {
  const n = e.type, s = (t ? t.appContext : e.appContext) || zl, i = { uid: Yl++, vnode: e, type: n, parent: t, appContext: s, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new bo(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(s.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: Oi(n, s), emitsOptions: Si(n, s), emit: null, emitted: null, propsDefaults: z, inheritAttrs: n.inheritAttrs, ctx: z, data: z, props: z, attrs: z, slots: z, refs: z, setupState: z, setupContext: null, suspense: r, suspenseId: r ? r.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Il.bind(null, i), e.ce && e.ce(i), i;
}
let de = null;
const Ui = () => de || Oe;
let Pr, ln;
{
  const e = Ar(), t = (r, n) => {
    let s;
    return (s = e[r]) || (s = e[r] = []), s.push(n), (i) => {
      s.length > 1 ? s.forEach((o) => o(i)) : s[0](i);
    };
  };
  Pr = t("__VUE_INSTANCE_SETTERS__", (r) => de = r), ln = t("__VUE_SSR_SETTERS__", (r) => Zt = r);
}
const tr = (e) => {
  const t = de;
  return Pr(e), e.scope.on(), () => {
    e.scope.off(), Pr(t);
  };
}, is = () => {
  de && de.scope.off(), Pr(null);
};
function Hi(e) {
  return e.vnode.shapeFlag & 4;
}
let Zt = false;
function Jl(e, t = false, r = false) {
  t && ln(t);
  const { props: n, children: s } = e.vnode, i = Hi(e);
  Ml(e, n, i, t), Fl(e, s, r || t);
  const o = i ? Zl(e, t) : void 0;
  return t && ln(false), o;
}
function Zl(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, vl);
  const { setup: n } = r;
  if (n) {
    Ge();
    const s = e.setupContext = n.length > 1 ? ta(e) : null, i = tr(e), o = er(n, e, 0, [e.props, s]), l = Ns(o);
    if (Qe(), i(), (l || e.sp) && !Ut(e) && vi(e), l) {
      if (o.then(is, is), t) return o.then((a) => {
        os(e, a);
      }).catch((a) => {
        Or(a, e, 0);
      });
      e.asyncDep = o;
    } else os(e, o);
  } else $i(e);
}
function os(e, t, r) {
  L(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : J(t) && (e.setupState = ui(t)), $i(e);
}
function $i(e, t, r) {
  const n = e.type;
  e.render || (e.render = n.render || Be);
  {
    const s = tr(e);
    Ge();
    try {
      yl(e);
    } finally {
      Qe(), s();
    }
  }
}
const ea = { get(e, t) {
  return pe(e, "get", ""), e[t];
} };
function ta(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return { attrs: new Proxy(e.attrs, ea), slots: e.slots, emit: e.emit, expose: t };
}
function Vn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ui(Wo(e.exposed)), { get(t, r) {
    if (r in t) return t[r];
    if (r in Ht) return Ht[r](e);
  }, has(t, r) {
    return r in t || r in Ht;
  } })) : e.proxy;
}
function ra(e, t = true) {
  return L(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function na(e) {
  return L(e) && "__vccOpts" in e;
}
const F = (e, t) => $o(e, t, Zt), sa = "3.5.26";
let an;
const ls = typeof window < "u" && window.trustedTypes;
if (ls) try {
  an = ls.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
const Ki = an ? (e) => an.createHTML(e) : (e) => e, ia = "http://www.w3.org/2000/svg", oa = "http://www.w3.org/1998/Math/MathML", Ke = typeof document < "u" ? document : null, as = Ke && Ke.createElement("template"), la = { insert: (e, t, r) => {
  t.insertBefore(e, r || null);
}, remove: (e) => {
  const t = e.parentNode;
  t && t.removeChild(e);
}, createElement: (e, t, r, n) => {
  const s = t === "svg" ? Ke.createElementNS(ia, e) : t === "mathml" ? Ke.createElementNS(oa, e) : r ? Ke.createElement(e, { is: r }) : Ke.createElement(e);
  return e === "select" && n && n.multiple != null && s.setAttribute("multiple", n.multiple), s;
}, createText: (e) => Ke.createTextNode(e), createComment: (e) => Ke.createComment(e), setText: (e, t) => {
  e.nodeValue = t;
}, setElementText: (e, t) => {
  e.textContent = t;
}, parentNode: (e) => e.parentNode, nextSibling: (e) => e.nextSibling, querySelector: (e) => Ke.querySelector(e), setScopeId(e, t) {
  e.setAttribute(t, "");
}, insertStaticContent(e, t, r, n, s, i) {
  const o = r ? r.previousSibling : t.lastChild;
  if (s && (s === i || s.nextSibling)) for (; t.insertBefore(s.cloneNode(true), r), !(s === i || !(s = s.nextSibling)); ) ;
  else {
    as.innerHTML = Ki(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
    const l = as.content;
    if (n === "svg" || n === "mathml") {
      const a = l.firstChild;
      for (; a.firstChild; ) l.appendChild(a.firstChild);
      l.removeChild(a);
    }
    t.insertBefore(l, r);
  }
  return [o ? o.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild];
} }, aa = Symbol("_vtc");
function ca(e, t, r) {
  const n = e[aa];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const cs = Symbol("_vod"), ua = Symbol("_vsh"), fa = Symbol(""), pa = /(?:^|;)\s*display\s*:/;
function da(e, t, r) {
  const n = e.style, s = re(r);
  let i = false;
  if (r && !s) {
    if (t) if (re(t)) for (const o of t.split(";")) {
      const l = o.slice(0, o.indexOf(":")).trim();
      r[l] == null && hr(n, l, "");
    }
    else for (const o in t) r[o] == null && hr(n, o, "");
    for (const o in r) o === "display" && (i = true), hr(n, o, r[o]);
  } else if (s) {
    if (t !== r) {
      const o = n[fa];
      o && (r += ";" + o), n.cssText = r, i = pa.test(r);
    }
  } else t && e.removeAttribute("style");
  cs in e && (e[cs] = i ? n.display : "", e[ua] && (n.display = "none"));
}
const us = /\s*!important$/;
function hr(e, t, r) {
  if (q(r)) r.forEach((n) => hr(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--")) e.setProperty(t, r);
  else {
    const n = ha(e, t);
    us.test(r) ? e.setProperty(mt(n), r.replace(us, ""), "important") : e[n] = r;
  }
}
const fs = ["Webkit", "Moz", "ms"], Qr = {};
function ha(e, t) {
  const r = Qr[t];
  if (r) return r;
  let n = Te(t);
  if (n !== "filter" && n in e) return Qr[t] = n;
  n = Ir(n);
  for (let s = 0; s < fs.length; s++) {
    const i = fs[s] + n;
    if (i in e) return Qr[t] = i;
  }
  return t;
}
const ps = "http://www.w3.org/1999/xlink";
function ds(e, t, r, n, s, i = yo(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(ps, t.slice(6, t.length)) : e.setAttributeNS(ps, t, r) : r == null || i && !Hs(r) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : lt(r) ? String(r) : r);
}
function hs(e, t, r, n, s) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? Ki(r) : r);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = r == null ? e.type === "checkbox" ? "on" : "" : String(r);
    (l !== a || !("_value" in e)) && (e.value = a), r == null && e.removeAttribute(t), e._value = r;
    return;
  }
  let o = false;
  if (r === "" || r == null) {
    const l = typeof e[t];
    l === "boolean" ? r = Hs(r) : r == null && l === "string" ? (r = "", o = true) : l === "number" && (r = 0, o = true);
  }
  try {
    e[t] = r;
  } catch {
  }
  o && e.removeAttribute(s || t);
}
function ga(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function ma(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
const gs = Symbol("_vei");
function _a(e, t, r, n, s = null) {
  const i = e[gs] || (e[gs] = {}), o = i[t];
  if (n && o) o.value = n;
  else {
    const [l, a] = va(t);
    if (n) {
      const p = i[t] = wa(n, s);
      ga(e, l, p, a);
    } else o && (ma(e, l, o, a), i[t] = void 0);
  }
}
const ms = /(?:Once|Passive|Capture)$/;
function va(e) {
  let t;
  if (ms.test(e)) {
    t = {};
    let n;
    for (; n = e.match(ms); ) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = true;
  }
  return [e[2] === ":" ? e.slice(3) : mt(e.slice(2)), t];
}
let zr = 0;
const ya = Promise.resolve(), ba = () => zr || (ya.then(() => zr = 0), zr = Date.now());
function wa(e, t) {
  const r = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= r.attached) return;
    Ue(xa(n, r.value), t, 5, [n]);
  };
  return r.value = e, r.attached = ba(), r;
}
function xa(e, t) {
  if (q(t)) {
    const r = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      r.call(e), e._stopped = true;
    }, t.map((n) => (s) => !s._stopped && n && n(s));
  } else return t;
}
const _s = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Pa = (e, t, r, n, s, i) => {
  const o = s === "svg";
  t === "class" ? ca(e, n, o) : t === "style" ? da(e, r, n) : Cr(t) ? _n(t) || _a(e, t, r, n, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : Ca(e, t, n, o)) ? (hs(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ds(e, t, n, o, i, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !re(n)) ? hs(e, Te(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), ds(e, t, n, o));
};
function Ca(e, t, r, n) {
  if (n) return !!(t === "innerHTML" || t === "textContent" || t in e && _s(t) && L(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return false;
  }
  return _s(t) && re(r) ? false : t in e;
}
const Sa = ["ctrl", "shift", "alt", "meta"], Ea = { stop: (e) => e.stopPropagation(), prevent: (e) => e.preventDefault(), self: (e) => e.target !== e.currentTarget, ctrl: (e) => !e.ctrlKey, shift: (e) => !e.shiftKey, alt: (e) => !e.altKey, meta: (e) => !e.metaKey, left: (e) => "button" in e && e.button !== 0, middle: (e) => "button" in e && e.button !== 1, right: (e) => "button" in e && e.button !== 2, exact: (e, t) => Sa.some((r) => e[`${r}Key`] && !t.includes(r)) }, ji = (e, t) => {
  const r = e._withMods || (e._withMods = {}), n = t.join(".");
  return r[n] || (r[n] = ((s, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = Ea[t[o]];
      if (l && l(s, t)) return;
    }
    return e(s, ...i);
  }));
}, Ia = me({ patchProp: Pa }, la);
let vs;
function Aa() {
  return vs || (vs = Nl(Ia));
}
const Ta = ((...e) => {
  const t = Aa().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const s = Da(n);
    if (!s) return;
    const i = t._component;
    !L(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const o = r(s, false, Oa(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, t;
});
function Oa(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Da(e) {
  return re(e) ? document.querySelector(e) : e;
}
const cn = { value: null };
function Ra() {
  if (!cn.value) throw new Error("global config is unset");
  return cn.value;
}
function Ma(e) {
  cn.value = e;
}
function ka() {
  const t = `
@font-face {
  font-family: "MiSans";
  src: url("${Ra().fontPrefix.replaceAll("\\", "/")}/MiSansVF.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
}`, r = document.createElement("style");
  r.textContent = t, document.head.appendChild(r);
}
class ys {
  logText = [];
  time(t) {
    return this.logText.push(`${t.toFixed(1)}ms`), this;
  }
  text(t) {
    return this.logText.push(t), this;
  }
  object(t) {
    return this.logText.push(JSON.stringify(t, void 0, 2)), this;
  }
  bold(t) {
    return this.logText.push(t), this;
  }
  build() {
    return this.logText.join(" ");
  }
}
class Va {
  info(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} INFO [${t}] ${r(new ys()).build()}`);
  }
  warn(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} WARN [${t}] ${r(new ys()).build()}`);
  }
  error(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} ERROR [${t}] ${r.stack ?? JSON.stringify(r)}`);
  }
}
const nt = new Va();
class La {
  constructor(t) {
    this.options = t;
  }
  serviceCtors = /* @__PURE__ */ new Map();
  protocolCtors = /* @__PURE__ */ new Map();
  instances = /* @__PURE__ */ new Map();
  instnacePWRs = /* @__PURE__ */ new Map();
  protocols = /* @__PURE__ */ new Map();
  transport;
  async initialize() {
    this.transport = this.options.transport(this), this.transport.notifyWorkerStartup(), await this.options.initialize?.(this);
  }
  async register(t, r) {
    const n = await r, s = Object.keys(n).find((a) => a.endsWith("Service")) ?? "", i = Object.keys(n).find((a) => a.endsWith("Protocol")) ?? "", o = n[s], l = n[i];
    if (!o) throw new Error(`not service defined in register service file: ${t}`);
    if (!l) throw new Error(`not protocol defined in register service file: ${t}`);
    this.serviceCtors.set(t, o), this.protocolCtors.set(t, l), await this.transport.notifyServiceReady(t), this.initializeWithMetrics(t);
  }
  getService(t) {
    if (!this.serviceCtors.has(t)) throw new Error(`service "${t}" is not belongs to this worker (with services: ${[...this.serviceCtors.keys()].join(",")}), use "getServiceProtocol" instead`);
    let r = this.instances.get(t);
    if (!r) {
      const n = this.serviceCtors.get(t);
      if (!n) throw new Error("service is not registered");
      r = new n(), this.instances.set(t, r), this.instnacePWRs.has(t) || this.instnacePWRs.set(t, Promise.withResolvers()), this.instnacePWRs.get(t).resolve(r);
    }
    return r;
  }
  async getServiceWhenReady(t) {
    return this.instnacePWRs.has(t) || this.instnacePWRs.set(t, Promise.withResolvers()), await this.instnacePWRs.get(t).promise;
  }
  getServiceProtocol(t) {
    if (this.serviceCtors.get(t)) {
      let r = this.protocols.get(t);
      if (!r) {
        const n = this.protocolCtors.get(t);
        if (!n) throw new Error("service protocol is not registered");
        const s = this.getService(t);
        if (!s) throw new Error("service instance not found when create service protocol");
        r = new n(s), this.protocols.set(t, r);
      }
      return r;
    } else {
      if (!this.transport) throw new Error("transport is uninitialized");
      return this.transport.getProxy(t);
    }
  }
  async initializeWithMetrics(t) {
    const r = this.getService(t), n = performance.now();
    nt.info("service_init", (s) => s.bold(t).text("start init..."));
    try {
      await r.initialize();
    } catch (s) {
      nt.error("service_init", s);
    }
    nt.info("service_init", (s) => s.bold(t).text("init cost").time(performance.now() - n));
  }
}
var Gi = ((e) => (e.main = "main", e.rendererMain = "rendererMain", e.rendererLyrics = "rendererLyrics", e.rendererUpdate = "rendererUpdate", e.rendererFeedback = "rendererFeedback", e.rendererImagePreview = "rendererImagePreview", e.rendererTaskbarWidget = "rendererTaskbarWidget", e.rendererTaskbarWidgetShadow = "rendererTaskbarWidgetShadow", e))(Gi || {});
let un = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, r) => (r &= 63, r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r > 62 ? t += "-" : t += "_", t), "");
class Kt {
  _promise;
  _resolve;
  _reject;
  _isDone;
  _isError;
  _error;
  _value;
  constructor(t) {
    this._isDone = false, this._isError = false, this._promise = t ?? new Promise((r, n) => {
      this._resolve = r, this._reject = n;
    });
  }
  static createPending() {
    return new Kt();
  }
  static createDone(t) {
    const r = new Kt();
    return r.resolve(t), r;
  }
  static createAsync(t) {
    return new Kt(t());
  }
  resolve(t) {
    if (this._isError) throw new Error("cannot resolve a error promise");
    this._value = t, this._isDone = true, this._resolve(t);
  }
  reject(t) {
    if (this._isDone) throw new Error("cannot reject a resolved promise");
    this._error = t, this._isError = true, this._reject(t);
  }
  async get() {
    return await this._promise, this._value;
  }
  tryGet() {
    if (this._isDone) return { done: true, value: this._value };
    if (this._isError) throw this._error;
    return { done: false, value: void 0 };
  }
  isDone() {
    return this._isDone;
  }
  isError() {
    return this._isError;
  }
}
class Fa {
  constructor(t) {
    this.initializer = t, this.handleReceive();
  }
  proxies = /* @__PURE__ */ new Map();
  requests = /* @__PURE__ */ new Map();
  callbacks = /* @__PURE__ */ new Map();
  async notifyWorkerStartup() {
    await this.send({ type: "worker.startup", workerId: this.currentWorker });
  }
  async notifyServiceReady(t) {
    await this.send({ type: "worker.serviceAvailable", workerId: this.currentWorker, serviceId: t });
  }
  receive(t) {
    this.handleReceivedMessage(t);
  }
  getProxy(t) {
    let r = this.proxies.get(t);
    return r || (r = new Proxy({}, { get: (n, s) => {
      if (typeof s != "string") throw new TypeError(`service protocol method name(${String(s)}) must be a string`);
      return async (...i) => {
        const o = un(), l = new Kt();
        this.requests.set(o, l);
        const a = {};
        for (const [u, d] of i.entries()) if (d instanceof Function) {
          const g = un();
          this.callbacks.set(g, i[u]), i[u] = null, a[u] = g;
        }
        await this.send({ type: "method.invoke", fromWorkerId: this.currentWorker, toServiceId: t, methodName: s, requestId: o, arguments: i, callbacks: a });
        const p = await l.get();
        if (p.type !== "method.return") throw new Error("internal error: request proxy receive an invoke message as result");
        if (p.return.type === "error") throw new Error(p.return.error);
        return p.return.result;
      };
    } }), this.proxies.set(t, r)), r;
  }
  async handleReceivedMessage(t) {
    switch (t.type) {
      case "method.invoke": {
        const r = [...t.arguments];
        for (const [s, i] of Object.entries(t.callbacks)) {
          const o = Number.parseInt(s);
          r[o] = async (...l) => {
            await this.send({ type: "method.callback", fromWorkerId: this.currentWorker, toWorkerId: t.fromWorkerId, serviceId: t.toServiceId, callbackId: i, arguments: l });
          };
        }
        const n = this.initializer.getServiceProtocol(t.toServiceId);
        try {
          const s = await n[t.methodName](...r);
          await this.send({ type: "method.return", fromServiceId: t.toServiceId, toWorkerId: t.fromWorkerId, methodName: t.methodName, requestId: t.requestId, return: { type: "success", result: s } });
        } catch (s) {
          console.error(s), await this.send({ type: "method.return", fromServiceId: t.toServiceId, toWorkerId: t.fromWorkerId, methodName: t.methodName, requestId: t.requestId, return: { type: "error", error: s instanceof Error ? s.message : String(s) } });
        }
        break;
      }
      case "method.return": {
        const r = this.requests.get(t.requestId);
        if (!r) {
          console.warn(new Error(`request(id:${t.requestId}) is not belongs to this worker`));
          return;
        }
        r.resolve(t), this.requests.delete(t.requestId);
        break;
      }
      case "method.callback": {
        const r = this.callbacks.get(t.callbackId);
        if (!r) return;
        r(...t.arguments);
        break;
      }
    }
  }
}
class qa extends Fa {
  constructor(t) {
    super(t), this.initializer = t, window.transportPort.registerTransport(this.currentWorker);
  }
  get currentWorker() {
    return this.initializer.options.workerId;
  }
  async handleReceive() {
    window.transportPort.receiveTransport((t) => {
      this.receive(t);
    });
  }
  async send(t) {
    window.transportPort.sendTransport(JSON.parse(JSON.stringify(t)));
  }
}
globalThis.createServiceInitializer = () => new La({ workerId: Gi.rendererTaskbarWidget, transport: (e) => new qa(e) });
const Qi = createServiceInitializer(), Na = 300;
function bs(e) {
  return `${e.type}:${e.id}`;
}
function Wa(e, t, r) {
  return { seq: (e?.seq ?? 0) + 1, entityKey: t, toCollected: r };
}
function Ba({ animationKey: e, isCollected: t, animationCommand: r }) {
  const n = se(false), s = se(""), i = se("");
  let o, l = 0;
  function a() {
    o && (clearTimeout(o), o = void 0);
  }
  function p() {
    s.value = "", i.value = "";
  }
  function u() {
    l += 1, a(), p(), n.value = t();
  }
  function d(g) {
    g.entityKey === e() && (l = g.seq, a(), p(), n.value = g.toCollected, g.toCollected ? (s.value = "heart-in", i.value = "heart-out") : (s.value = "heart-out", i.value = "heart-in"), o = setTimeout(() => {
      l === g.seq && (o = void 0, p(), n.value = t());
    }, Na));
  }
  return ge(e, () => {
    u();
  }, { immediate: true }), ge(t, (g) => {
    o || (n.value = g);
  }, { immediate: true }), ge(() => r()?.seq, (g, x) => {
    if (g == null || g === x) return;
    const T = r();
    T && d(T);
  }), Rr(() => {
    a();
  }), { displayCollected: n, solidAnimationClass: s, outlineAnimationClass: i };
}
function A(e) {
  return Qi.getServiceProtocol(e);
}
var I = ((e) => (e.storage = "storage", e.sharedState = "sharedState", e.request = "request", e.queue = "queue", e.player = "player", e.window = "window", e.user = "user", e.collect = "collect", e.internalCheck = "internalCheck", e.update = "update", e.appSettings = "appSettings", e.utils = "utils", e.debug = "debug", e.applog = "applog", e.renderer = "renderer", e.commerce = "commerce", e.serverPush = "serverPush", e.shortcut = "shortcut", e.desktopLyrics = "desktopLyrics", e.startup = "startup", e.notification = "notification", e.freqCtrl = "freqCtrl", e.resPreload = "resPreload", e.playerProxy = "playerProxy", e.imagePreviewer = "imagePreviewer", e.appClock = "clock", e.taskbarWidget = "taskbarWidget", e))(I || {}), le = ((e) => (e.playable = "playable", e.album = "album", e.playlist = "playlist", e.artist = "artist", e.user = "user", e))(le || {});
function Ot() {
  return Date.now() / 1e3;
}
function Ua(e, t = Ot()) {
  if (e && !(e.release.type === "until" && e.release.expiresAt <= t)) return e;
}
function Vr(e, t = Ot()) {
  if (!e) return;
  const r = { server: e.server, override: Ua(e.override, t) };
  if (!(!r.server && !r.override)) return r;
}
function zi(e, t = Ot()) {
  const r = Vr(e, t);
  return r?.override?.value ?? r?.server?.value;
}
function Ha(e, t = Ot()) {
  return Vr(e, t)?.server?.value;
}
function $a(e, t = Ot()) {
  return !!Vr(e, t)?.server;
}
function Ka(e, t = Ot()) {
  return Vr(e, t)?.override?.phase === "inflight";
}
function rr(e, t) {
  return e[t.type][t.id];
}
function ja(e, t) {
  return zi(rr(e, t))?.isCollected ?? false;
}
function Ga(e, t) {
  return zi(rr(e, t))?.customStatus;
}
function Qa(e, t) {
  return Ha(rr(e, t))?.isCollected ?? false;
}
function za(e, t) {
  return $a(rr(e, t));
}
function Ya(e, t) {
  return Ka(rr(e, t));
}
const bt = _t([]);
function Pe(e) {
  const t = un();
  if (e.mutexKey) for (let r = bt.length - 1; r >= 0; r--) bt[r].mutexKey === e.mutexKey && bt.splice(r, 1);
  bt.push({ ...e, id: t }), setTimeout(() => {
    const r = bt.findIndex((n) => n.id === t);
    r !== -1 && bt.splice(r, 1);
  }, e.timeout ?? 4e3);
}
var Yi = ((e) => (e[e.PreSale = 1] = "PreSale", e[e.InSale = 2] = "InSale", e[e.OffShelf = 3] = "OffShelf", e))(Yi || {});
function Xi(e = null) {
  if (!(e instanceof Node)) return {};
  const t = [];
  let r = e;
  if (r) for (; r; ) {
    if (r instanceof Element) {
      const n = r.getAttribute("data-et-params");
      n && t.push(Object.fromEntries(new URLSearchParams(n).entries()));
    }
    r = r.parentNode;
  }
  return Object.assign({}, ...t.reverse());
}
function Xa({ playable: e, queueState: t, commerceState: r }) {
  let n = "1.0";
  e.digital_track_info?.sale_period === Yi.InSale ? n = "4.0" : e.label_info?.only_vip_playable ? n = "3.0" : e.label_info?.only_vip_download && (n = "2.0");
  const s = t?.queue?.playables.limitedFreeInfos[e.key]?.limited_free ?? e.limited_free_info?.limited_free ?? false, i = r?.hasPlayEntitlement ?? false;
  return { group_payment_level: n, is_limit: e?.label_info?.only_vip_playable ? !i && s ? "1" : "0" : "" };
}
let ar;
const Ja = new Uint8Array(16);
function Za() {
  if (!ar && (ar = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !ar)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return ar(Ja);
}
const oe = [];
for (let e = 0; e < 256; ++e) oe.push((e + 256).toString(16).slice(1));
function ec(e, t = 0) {
  return oe[e[t + 0]] + oe[e[t + 1]] + oe[e[t + 2]] + oe[e[t + 3]] + "-" + oe[e[t + 4]] + oe[e[t + 5]] + "-" + oe[e[t + 6]] + oe[e[t + 7]] + "-" + oe[e[t + 8]] + oe[e[t + 9]] + "-" + oe[e[t + 10]] + oe[e[t + 11]] + oe[e[t + 12]] + oe[e[t + 13]] + oe[e[t + 14]] + oe[e[t + 15]];
}
const tc = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ws = { randomUUID: tc };
function xs(e, t, r) {
  if (ws.randomUUID && !e) return ws.randomUUID();
  e = e || {};
  const n = e.random || (e.rng || Za)();
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, ec(n);
}
var At = ((e) => (e.main = "main", e.desktopLyrics = "desktopLyrics", e.captcha = "captcha", e.update = "update", e.feedback = "feedback", e.imagePreview = "imagePreview", e.taskbarWidget = "taskbarWidget", e.taskbarWidgetShadow = "taskbarWidgetShadow", e))(At || {}), Je = ((e) => (e.PlayOrPause = "PlayOrPause", e.PrevTrack = "PrevTrack", e.NextTrack = "NextTrack", e.VolumeUp = "VolumeUp", e.VolumeDown = "VolumeDown", e.Like = "Like", e.Dislike = "Dislike", e))(Je || {});
const Ps = "higher", rc = { queue: { appVisibility: { isPlayerVisible: true }, queue: null }, player: { isPlaying: false, isLoading: false, isMuted: false, volume: 0.3, quality: Ps, playingQuality: Ps, availableQualities: [], playableQualities: [], overrideQuality: void 0, progressPercent: 0, progressSeconds: 0, durationSeconds: 0, mediaEtParams: {}, isInitialPlay: true, currentAudioEffect: null }, user: { isLoading: false, info: null }, collect: { playable: {}, playlist: {}, album: {}, artist: {}, user: {} }, internalCheck: { isPassed: false }, debug: { updateProgress: "", latestTronBuildId: "", latestVersion: "" }, window: { windows: {}, isInactive: false, closeActionType: "exit" }, commerce: { commerceInfo: void 0, purchasedDigitalAlbumsIds: [], isAdFree: false, isVip: false, isFreeVip: false, vipExpireAt: 0, hasPlayEntitlement: false, type: "free", audioEffects: [] }, update: { isUpdateButtonVisible: false, isUpdateDialogVisible: false, updateType: false, isUpdating: false, isFailed: false }, shortcut: { isGlobalShortcutEnabled: false, shortcuts: { [Je.PlayOrPause]: { inApp: "", global: "" }, [Je.PrevTrack]: { inApp: "", global: "" }, [Je.NextTrack]: { inApp: "", global: "" }, [Je.VolumeUp]: { inApp: "", global: "" }, [Je.VolumeDown]: { inApp: "", global: "" }, [Je.Like]: { inApp: "", global: "" }, [Je.Dislike]: { inApp: "", global: "" } } }, desktopLyrics: { settings: { enabled: false, textSize: 24, textColor: "light", showTranslation: true, isLocked: false }, hover: false, menuVisible: false }, startup: { isAutoStartup: false }, notification: { isNotificationEnabled: true }, taskbarWidget: { enabled: false, autoStart: true, preferredSide: void 0, widgetState: "docked", isDragging: false, inDragRegion: false, snapStage: null, dockedStyle: "nano", theme: "dark", hover: false }, region: { abroadType: "0" } }, Cs = _t(/* @__PURE__ */ new Map());
function Ji(e) {
  let t = Cs.get(e);
  return t || (t = ai(rc[e]), Cs.set(e, t), A(I.sharedState).get(e).then((r) => {
    t.value = r;
  }), A(I.sharedState).onUpdate(e, (r) => {
    t.value = r;
  })), t;
}
function Ie(e) {
  return Ji(e);
}
function ue(e) {
  return Ji(e).value;
}
let Xe;
function Ln() {
  return Xe || (Xe = { callbacks: /* @__PURE__ */ new Map(), value: void 0 }, A(I.appSettings).getAllSettings().then((e) => {
    e && (Xe.value = e, Xe.callbacks.forEach((t) => {
      try {
        t(e);
      } catch (r) {
        console.error("[AppSettings] callback error:", r);
      }
    }));
  }), A(I.appSettings).onUpdate((e) => {
    Xe.value = e, Xe.callbacks.forEach((t) => {
      try {
        t(e);
      } catch (r) {
        console.error("[AppSettings] callback error:", r);
      }
    });
  }), Xe);
}
function nc(e) {
  const t = Ln();
  if (e) {
    const r = Symbol("AppSettingsListener");
    return t.callbacks.set(r, e), () => {
      t.callbacks.delete(r);
    };
  }
}
function Fn() {
  const e = Ln(), t = ai(e.value), r = nc((n) => {
    t.value = n;
  });
  return Rr(() => {
    r?.();
  }), t;
}
function cr() {
  return Ln().value;
}
const jt = "svip";
async function sc(e) {
  const t = await A(I.sharedState).get("commerce"), r = t.commerceInfo?.offers?.scene_offer_list?.[e]?.offer_snapshot_ids;
  if (!r || r.length === 0) {
    console.error(`Failed to get offer snapshot ids for offer group \`${e}\``);
    return;
  }
  const n = [];
  for (const o of r) {
    const l = t.commerceInfo?.offers?.offer_map?.[o];
    l?.membership_type && n.push(l.membership_type);
  }
  if (n.length === 0) {
    console.error(`Failed to get membership types for offer group \`${e}\``);
    return;
  }
  const s = n[0];
  return n.every((o) => o === s) ? s === jt ? "sell_svip" : "sell" : s === jt ? "sell_mix_svip" : "sell_mix_vip";
}
async function Ss(e) {
  let t;
  if (e) {
    const r = await A(I.sharedState).get("commerce"), { upsell: n } = r, s = (n?.upsell_map ?? {})[e];
    if (!s || !s.pc_popup?.pc_popup_sku_lit?.offer_group) return console.error(`Failed to get upsell item offer group \`${e}\` when calling \`getSellContentType\``), "sell";
    t = s.pc_popup?.pc_popup_sku_lit?.offer_group;
  } else t = "mixed_vip_center";
  return await sc(t) ?? "sell";
}
async function fn() {
  const e = await A(I.sharedState).get("commerce"), t = e?.commerceInfo?.membership, r = e?.commerceInfo?.trade;
  return t?.is_membership ? t.membership_type === jt ? "svip_buy" : "vip_buy" : r?.has_paid_order ? t?.last_membership_type === jt ? "svip_end" : "vip_end" : t?.last_membership_type === jt ? "svip_fresh" : "vip_fresh";
}
class ic {
  currentPopupUniqueName = null;
  visible = false;
  async init() {
    if (A(I.user).onLogin(() => {
      this.close();
    }), !(await A(I.user).getUserInfoState())?.my_info) return;
    const { upsell: t } = await A(I.sharedState).get("commerce"), r = t?.cold_launch_timing?.upsell_item_unique_names;
    if (!r) {
      nt.info("cold_launch_popup", (n) => n.text("cold launch timing is undefined, exit"));
      return;
    }
    for (const n of r) {
      const s = t.upsell_map?.[n];
      if (!s) {
        nt.info("cold_launch_popup", (a) => a.text("upsell item").bold(n).text("not found in upsell map"));
        continue;
      }
      if (!s.pc_popup?.pc_popup_pure_notification) {
        nt.info("cold_launch_popup", (a) => a.text("upsell item").bold(n).text("is not a PCPopupPureNotification type"));
        continue;
      }
      const i = s.freq_ctrl_key_read, o = s.freq_ctrl_key_write;
      if (!i) {
        nt.info("cold_launch_popup", (a) => a.text("upsell item").bold(n).text("freq_ctrl_key_read is undefined"));
        continue;
      }
      if (nt.info("cold_launch_popup", (a) => a.text("upsell item").bold(n).text("freq_ctrl_key_read").object(i).text("freq_ctrl_key_write").object(o)), await A(I.freqCtrl).check(i)) {
        const a = s.pc_popup.event?.params;
        this.show(n, a), o && A(I.freqCtrl).update(o);
        break;
      }
    }
  }
  async show(t, r) {
    this.currentPopupUniqueName = t, this.visible = true, A(I.applog).report({ event: "pop_up_show", params: { from_action: "first_update_music_quality_cold", content_type: "cold_music_quality", page: "track_reco", scene_name: "track_reco", sell_vip_type: await fn(), ...r } });
  }
  close() {
    this.currentPopupUniqueName = null, this.visible = false;
  }
}
const ur = _t(new ic());
class oc {
  favoritesPlaylistId = "";
  douyinPlaylistId = "";
  ownedPlaylistIds = [];
  commentPanelTrackInfo = null;
  commentPanelOpenTime = void 0;
  isCommentPanelVisible = false;
  isQueueVisible = false;
  isSoundQualityPanelVisible = false;
  soundQualityPanelDefaultTab = null;
  soundQualityPanelEtParams = {};
  isDebuggerVisible = false;
  isSearchVisible = false;
  isPlayerFullView = false;
  isVIPDialogVisible = false;
  isVIPDialogWaitingLogin = false;
  isNewVIPDialogVisible = false;
  newVipDialogUpsellKey;
  newVipDialogEtParams;
  newVipDialogOfferGroup;
  newVipDialogInterceptPlayable;
  isFeedbackVisible = false;
  isCreatePlaylistVisible = false;
  isDeleteDialogVisible = false;
  vipDialogUpsellKey;
  vipDialogEtParams;
  vipDialogInterceptPlayable;
  vipDialogOfferGroup;
  get currentVipDialogUpsellKey() {
    return cr()?.luna_pc_common_server_params?.vip?.vip_center_style ? this.newVipDialogUpsellKey : this.vipDialogUpsellKey;
  }
  isReportVisible = false;
  reportPlayable;
  reportEtParams = {};
  queueEtParams = {};
  canBack = false;
  canForward = false;
  scrollTop = 0;
  isBottomPlayerHidden = false;
  isGoingWhenTransition = false;
  isCommentReportDialogVisible = false;
  commentReportDialogParams;
  currentPageEtParams = {};
  currentPlayableListForCreatePlaylist = [];
  createPlaylistEtParams = {};
  openQueue({ etParams: t }) {
    this.isQueueVisible = true, this.queueEtParams = t, A(I.applog).report({ event: "action_panel_show", params: { ...t, action_panel_name: "player_queue_panel", enter_method: "click" } });
  }
  closeQueue(t) {
    this.isQueueVisible = false, A(I.applog).report({ event: "action_panel_close", params: { ...this.queueEtParams, action_panel_name: "player_queue_panel", close_method: { blur: "blank", click: "close", esc: "close" }[t] } });
  }
  showSoundQualityPanel({ defaultTab: t, etParams: r }) {
    this.soundQualityPanelDefaultTab = t ?? null, this.soundQualityPanelEtParams = r, this.isSoundQualityPanelVisible = true, A(I.applog).report({ event: "action_panel_show", params: { ...r, action_panel_name: "music_quality_effect_taste_presentation", enter_method: "click" } });
  }
  closeSoundQualityPanel(t = "click") {
    this.isSoundQualityPanelVisible = false, A(I.applog).report({ event: "action_panel_close", params: { ...this.soundQualityPanelEtParams, action_panel_name: "music_quality_effect_taste_presentation", close_method: { blur: "blank", click: "close", esc: "close" }[t] } }), this.soundQualityPanelDefaultTab = null, this.soundQualityPanelEtParams = {};
  }
  toggleDebugger(t) {
    typeof t == "boolean" ? this.isDebuggerVisible = t : this.isDebuggerVisible = !this.isDebuggerVisible;
  }
  async handleClickCommentIcon(t) {
    this.isCommentPanelVisible ? this.closeCommentPanel("click") : this.openCommentPanel(t), A(I.applog).report({ event: "view_click", params: { ...this.currentPageEtParams, ...await A(I.player).getCurrentReportParams(), type: "comment_icon" } });
  }
  async openCommentPanel(t) {
    this.isQueueVisible && this.closeQueue("blur"), this.isCommentPanelVisible = true, this.commentPanelTrackInfo = t, this.commentPanelOpenTime = Date.now(), A(I.applog).report({ event: "action_panel_show", params: { ...this.currentPageEtParams, ...await A(I.player).getCurrentReportParams(), action_panel_name: "comment_panel", enter_method: "click" } });
  }
  async closeCommentPanel(t) {
    this.isCommentPanelVisible = false, this.commentPanelTrackInfo = null;
    const r = this.commentPanelOpenTime && Date.now() - this.commentPanelOpenTime;
    A(I.applog).report({ event: "action_panel_close", params: { ...this.currentPageEtParams, ...await A(I.player).getCurrentReportParams(), action_panel_name: "comment_panel", close_method: t, stay_time: r } });
  }
  toggleSearch(t) {
    typeof t == "boolean" ? this.isSearchVisible = t : this.isSearchVisible = !this.isSearchVisible;
  }
  togglePlayerFullView(t) {
    typeof t == "boolean" ? this.isPlayerFullView = t : this.isPlayerFullView = !this.isPlayerFullView, this.isBottomPlayerHidden = false;
  }
  toggleBottomBarHidden() {
    this.isBottomPlayerHidden = !this.isBottomPlayerHidden;
  }
  showCreatePlaylistDialog(t = [], r = {}) {
    this.currentPlayableListForCreatePlaylist = t, this.createPlaylistEtParams = r, this.isCreatePlaylistVisible = true;
  }
  closeCreatePlaylistDialog() {
    this.currentPlayableListForCreatePlaylist = [], this.isCreatePlaylistVisible = false;
  }
  async showVipDialog({ eventParams: t, upsellKey: r, offerGroup: n, purchaseId: s }) {
    if (cr()?.luna_pc_common_server_params?.vip?.vip_center_style) return this.showNewVipDialog({ eventParams: t, upsellKey: r, offerGroup: n, purchaseId: s });
    if (ue("player")?.isInitialPlay && ur.visible && r === "preview_popup_vip") return;
    if (ur.close(), !(await ue("user"))?.info) {
      if (!await ue("window")?.windows[At.main]?.isFocus) return;
      this.isVIPDialogWaitingLogin = true;
      const d = await A(I.user).login({ waitComplete: true, etParams: { scene_name: this.currentPageEtParams.scene_name, enter_from_page: this.currentPageEtParams.page, enter_method: "vip_intercept" } });
      if (this.isVIPDialogWaitingLogin = false, !d) return;
    }
    if (!ue("user")?.info) return;
    const i = ue("queue"), o = i?.queue?.currentPlayable.key, l = o ? i?.queue?.playables.byKey[o] : void 0;
    l && (this.vipDialogInterceptPlayable = l), this.vipDialogUpsellKey = r;
    const a = ue("commerce");
    t.content_type = await Ss(this.vipDialogUpsellKey), t.purchase_id = s ?? xs(), t.sell_vip_type = await fn(), t.page = t.page ?? this.currentPageEtParams.page, t.scene_name = t.scene_name ?? this.currentPageEtParams.scene_name, t.request_id = t.request_id ?? this.currentPageEtParams.request_id, a?.commerceInfo?.membership?.is_membership ? a?.commerceInfo.membership.is_about_to_expire ? t.user_status = "3" : t.user_status = "2" : a?.commerceInfo?.trade?.has_paid_order ? t.user_status = "4" : t.user_status = "1";
    const p = await A(I.sharedState).get("player"), u = p.mediaId && p.mediaEtParams[p.mediaId];
    u && (t.group_id = u.group_id, t.group_type = u.group_type, t.group_payment_level = u.group_payment_level, t.request_id = t.request_id ?? u.request_id), this.vipDialogEtParams = t, this.vipDialogOfferGroup = n, this.isVIPDialogVisible = true, A(I.applog).report({ event: "pop_up_show", params: { ...t } });
  }
  async closeVipDialog() {
    if (cr()?.luna_pc_common_server_params?.vip?.vip_center_style) return this.closeNewVipDialog();
    this.isVIPDialogWaitingLogin && A(I.renderer).closeDouyinLoginPanel(), this.isVIPDialogVisible = false;
  }
  async showNewVipDialog({ eventParams: t = {}, upsellKey: r, offerGroup: n, purchaseId: s } = {}) {
    if (ue("player")?.isInitialPlay && ur.visible && r === "preview_popup_vip") return;
    if (ur.close(), !ue("user")?.info) {
      if (!ue("window")?.windows[At.main]?.isFocus) return;
      this.isVIPDialogWaitingLogin = true;
      const d = await A(I.user).login({ waitComplete: true, etParams: { scene_name: this.currentPageEtParams.scene_name, enter_from_page: this.currentPageEtParams.page, enter_method: "vip_intercept" } });
      if (this.isVIPDialogWaitingLogin = false, !d) return;
    }
    if (!ue("user")?.info) return;
    const i = ue("queue"), o = i?.queue?.currentPlayable.key, l = o ? i?.queue?.playables.byKey[o] : void 0;
    l && (this.newVipDialogInterceptPlayable = l), this.newVipDialogUpsellKey = r;
    const a = ue("commerce");
    t.content_type = await Ss(this.newVipDialogUpsellKey), t.purchase_id = s ?? xs(), t.sell_vip_type = await fn(), t.page = t.page ?? this.currentPageEtParams.page, t.scene_name = t.scene_name ?? this.currentPageEtParams.scene_name, t.request_id = t.request_id ?? this.currentPageEtParams.request_id, a?.commerceInfo?.membership?.is_membership ? a?.commerceInfo.membership.is_about_to_expire ? t.user_status = "3" : t.user_status = "2" : a?.commerceInfo?.trade?.has_paid_order ? t.user_status = "4" : t.user_status = "1";
    const p = await A(I.sharedState).get("player"), u = p.mediaId && p.mediaEtParams[p.mediaId];
    u && (t.group_id = u.group_id, t.group_type = u.group_type, t.group_payment_level = u.group_payment_level, t.request_id = t.request_id ?? u.request_id), this.newVipDialogEtParams = t, this.newVipDialogOfferGroup = n, this.isNewVIPDialogVisible = true, A(I.applog).report({ event: "pop_up_show", params: { ...t } });
  }
  closeNewVipDialog() {
    this.isVIPDialogWaitingLogin && A(I.renderer).closeDouyinLoginPanel(), this.isNewVIPDialogVisible = false;
  }
  async showReportDialog({ playable: t, etParams: r } = {}) {
    !(await ue("user"))?.info && !await A(I.user).login({ waitComplete: true, etParams: { scene_name: this.currentPageEtParams.scene_name, enter_from_page: this.currentPageEtParams.page, enter_method: "report" } }) || (this.reportEtParams = { ...r ?? {}, content_type: "report_feedback" }, A(I.applog).report({ event: "pop_up_show", params: this.reportEtParams }), this.isReportVisible = true, this.reportPlayable = t);
  }
  async closeReportDialog(t) {
    delete this.reportPlayable, this.isReportVisible = false, A(I.applog).report({ event: "pop_confirm", params: { ...this.reportEtParams, confirm_choice: { close: "close_btn", cancel: "cancel", submit: "submit" }[t] } });
  }
  async showCommentReportDialog(t) {
    if (!cr()?.comment_report?.enable_comment_report) {
      Pe({ message: "\u8BF7\u524D\u5F80 \u8BBE\u7F6E-\u4F7F\u7528\u76F8\u5173-\u5E2E\u52A9\u4E0E\u53CD\u9988 \u8FDB\u884C\u4E3E\u62A5" });
      return;
    }
    !(await ue("user"))?.info && !await A(I.user).login({ waitComplete: true, etParams: { scene_name: this.currentPageEtParams.scene_name, enter_from_page: this.currentPageEtParams.page, enter_method: "report_comment" } }) || (this.commentReportDialogParams = t, this.isCommentReportDialogVisible = true);
  }
  async closeCommentReportDialog() {
    this.isCommentReportDialogVisible = false;
  }
}
const pn = _t(new oc());
addEventListener("popstate", (e) => {
  pn.canBack = !!e.state?.back, pn.canForward = !!e.state?.forward;
});
function lc({ entity: e, onToggle: t }) {
  const r = Ie("collect"), n = Ie("user");
  let s = false;
  const i = F(() => e.value ? ja(r.value, e.value) : false), o = F(() => {
    if (e.value) return Ga(r.value, e.value);
  }), l = F(() => e.value ? za(r.value, e.value) : false), a = F(() => e.value ? Ya(r.value, e.value) : false), p = F(() => e.value ? Qa(r.value, e.value) : false);
  async function u(d, g, x = {}) {
    const T = { ...Xi(g), ...x };
    if (!e.value || a.value) return;
    if (!n.value.info) {
      let E;
      if (e.value.type === le.user ? e.value.isArtist ? E = "artist_user" : E = "user" : E = e.value.type, !await A(I.user).login({ waitComplete: true, etParams: { scene_name: T.scene_name, enter_from_page: pn.currentPageEtParams.page, enter_method: `group_collect_${E}` } })) return;
    }
    if (s) return;
    s = true, t?.({ entity: e.value, isCollected: d });
    const O = await A(I.collect).setCollect([e.value], d), U = [le.artist, le.user].includes(e.value?.type ?? le.playable) ? "\u5173\u6CE8" : "\u6536\u85CF";
    if (s = false, A(I.applog).report({ event: d ? "group_collect" : "group_cancel_collect", params: { group_type: { [le.album]: "album", [le.playlist]: "playlist", [le.artist]: "artist", [le.playable]: "track", [le.user]: "user" }[e.value.type], group_id: e.value.id, collect_type: "click", action_type: "player", status: O.error ? "fail" : "success", ...e.value.type === le.playable && e.value.playable ? Xa({ playable: e.value.playable, queueState: ue("queue"), commerceState: ue("commerce") }) : {}, ...T } }), O.error) Pe(d ? { message: `${U}\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5` } : { message: `\u53D6\u6D88${U}\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5` });
    else switch (e.value.type) {
      case le.playable: {
        Pe(d ? { message: "\u5DF2\u6DFB\u52A0\u5230\u201C\u6211\u559C\u6B22\u7684\u97F3\u4E50\u201D", mutexKey: "collect_track" } : { message: "\u5DF2\u53D6\u6D88\u559C\u6B22", mutexKey: "collect_track" });
        break;
      }
      case le.artist: {
        O.isSilence || Pe(d ? { message: "\u6210\u529F\u5173\u6CE8\u97F3\u4E50\u4EBA" } : { message: "\u5DF2\u4E0D\u518D\u5173\u6CE8\u8BE5\u97F3\u4E50\u4EBA" });
        break;
      }
      case le.album: {
        Pe(d ? { message: "\u6210\u529F\u6536\u85CF\u4E13\u8F91" } : { message: "\u5DF2\u4E0D\u518D\u6536\u85CF\u8BE5\u4E13\u8F91" });
        break;
      }
      case le.playlist: {
        Pe(d ? { message: "\u6210\u529F\u6536\u85CF\u6B4C\u5355" } : { message: "\u5DF2\u4E0D\u518D\u6536\u85CF\u8BE5\u6B4C\u5355" });
        break;
      }
      case le.user: {
        d ? O.customStatus === 4 || O.customStatus === 5 ? Pe({ message: "\u5DF2\u53D1\u9001\u5173\u6CE8\u8BF7\u6C42" }) : Pe({ message: "\u6210\u529F\u5173\u6CE8\u7528\u6237" }) : Pe({ message: "\u5DF2\u4E0D\u518D\u5173\u6CE8\u8BE5\u7528\u6237" });
        break;
      }
    }
    return O;
  }
  return { isCollected: i, customStatus: o, isLoaded: l, isPending: a, serverCollected: p, toggleCollect: u };
}
function Zi({ preserveLatest: e = false } = {}) {
  const t = Ie("queue");
  if (e) {
    const r = se();
    return t.value.queue?.currentPlayable.key && (r.value = t.value.queue?.playables.byKey[t.value.queue?.currentPlayable.key]), ge(() => t.value.queue?.currentPlayable.key, (n) => {
      n && (r.value = t.value.queue?.playables.byKey[n]);
    }), r;
  } else return F(() => {
    const r = t.value.queue?.currentPlayable.key;
    return r ? t.value.queue?.playables.byKey[r] : void 0;
  });
}
function eo() {
  const e = Ie("player"), t = Ie("queue"), r = Ie("commerce"), n = Fn(), s = F(() => {
    const p = t.value.queue?.currentPlayable.key;
    return p ? t.value.queue?.playables.byKey[p] : void 0;
  }), i = F(() => e.value.mediaDetail), o = F(() => {
    const p = t.value.queue?.currentPlayable.key;
    return p ? t.value.queue?.playables.limitedFreeInfos[p] : void 0;
  });
  function l(p) {
    return r.value.commerceInfo ? e.value.cacheInfo?.isPreview || p?.video_model_type === 2 ? true : r.value.hasPlayEntitlement || o.value?.limited_free ? false : p?.playable.label_info?.only_vip_playable ?? s.value?.label_info?.only_vip_playable ?? false : false;
  }
  const a = F(() => l(i.value));
  return { checkIsPreviewPlayable: l, limitedFreeInfo: o, isPreviewPlayable: a, isLimitedFree: F(() => r.value.hasPlayEntitlement || !s.value?.label_info?.only_vip_playable || a.value ? false : o.value?.limited_free ?? false), interceptPopupEnabled: F(() => {
    const p = t.value.queue?.metaInfo.type;
    if (!p) return false;
    const u = n.value?.luna_pc_common_server_params?.client_intercept_strategy?.[p];
    return u ? u.should_intercept_with_popup ?? false : true;
  }) };
}
var dn = ((e) => (e[e.userNext = 0] = "userNext", e[e.userPrevious = 1] = "userPrevious", e[e.specific = 2] = "specific", e[e.switchPlayable = 3] = "switchPlayable", e[e.auto = 4] = "auto", e[e.skipFailed = 5] = "skipFailed", e[e.list = 6] = "list", e[e.feedInit = 7] = "feedInit", e[e.feedSwitch = 8] = "feedSwitch", e[e.hotkeyNext = 9] = "hotkeyNext", e[e.hotKeyPrevious = 10] = "hotKeyPrevious", e))(dn || {});
const ac = { xmlns: "http://www.w3.org/2000/svg", width: "17", height: "6", fill: "none", viewBox: "0 0 17 6" };
function cc(e, t) {
  return te(), ae("svg", ac, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M9.502 6H7.819V.017h1.684zM14.131.017c1.22 0 2.212 1.042 2.213 2.324s-.993 2.325-2.213 2.325H12.02V6h-1.683V.017zM3.128 3.383C3.931 2.298 4.61 1.13 5.345 0h2.067l-3.69 5.314c-.372.567-.925.79-1.491.597-.574-.194-.891-.72-.887-1.411.009-1.622 0-2.878 0-4.5h1.784zm8.892-.466h2.11a.564.564 0 0 0 .549-.576.563.563 0 0 0-.548-.575H12.02z", "clip-rule": "evenodd" }, null, -1)])]);
}
const uc = { render: cc };
var hn = ((e) => (e.Track = "track", e.Video = "video", e.Unsupported = "unsupported", e))(hn || {});
const gn = "computer_desktop", Yr = "110055", fc = ["data-variant"], pc = { key: 0, class: "vip-badge--preview" }, dc = { key: 1, class: "vip-badge--vip" }, hc = Tt({ __name: "VipBadge", setup(e) {
  const t = Fn(), r = F(() => t.value?.luna_pc_common_server_params?.win_widget?.vip_variant ?? 1), n = Ie("queue"), s = Ie("player"), i = Zi(), { isLimitedFree: o, isPreviewPlayable: l } = eo();
  function a() {
    const E = i.value?.id, R = n.value.queue?.currentPlayable.key;
    return (E ? s.value.mediaEtParams[E]?.request_id : void 0) ?? (R ? n.value.queue?.playables.requestIdMap[R] : void 0) ?? "";
  }
  function p(E, R) {
    const k = { ...Xi(E.currentTarget), ...R, from_action: l.value ? "foreground_play_vip_track" : o.value ? "click_playpage_free_icon" : "click_playpage_vip_icon" };
    return l.value ? { eventParams: k, upsellKey: "preview_popup_vip" } : { eventParams: k };
  }
  const u = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), g = F(() => i.value ? `${i.value.id}:${r.value}:${l.value ? 1 : 0}` : "");
  async function x() {
    const E = g.value;
    if (!E || !i.value || document.hidden) return;
    const R = i.value, k = { page: gn, group_id: R.id, group_type: R.type === hn.Track ? "track" : "video", queue_type: n.value.queue?.etParams.queue_type ?? "", request_id: a() }, C = await A(I.taskbarWidget).getReportContext();
    g.value === E && (u.has(E) || (A(I.applog).report({ event: "view_show", params: { ...C, ...k, type: "broadcast_control_widget_vip" } }), u.add(E)), r.value === 2 && !d.has(E) && (A(I.applog).report({ event: "commercial_entry_show", params: { ...C, ...k, creator_id: Yr, action_type: "top_level_entrance" } }), d.add(E)));
  }
  ge(g, x, { immediate: true });
  function T() {
    document.hidden ? (u.clear(), d.clear()) : x();
  }
  document.addEventListener("visibilitychange", T), Gs(() => {
    document.removeEventListener("visibilitychange", T);
  });
  let O = false;
  async function U(E) {
    if (!(r.value !== 2 || O || !i.value)) {
      O = true;
      try {
        const R = await A(I.taskbarWidget).getReportContext(), k = i.value, C = { page: gn, group_id: k.id, group_type: k.type === hn.Track ? "track" : "video", queue_type: n.value.queue?.etParams.queue_type ?? "", request_id: a() }, N = { ...R, ...C, creator_id: Yr };
        A(I.applog).report({ event: "view_click", params: { ...R, ...C, type: "broadcast_control_widget_vip" } }), A(I.applog).report({ event: "commercial_entry_click", params: { ...R, ...C, creator_id: Yr, action_type: "top_level_entrance", entry_type: "vip_entry" } }), await A(I.window).showWindowAndWaitForReady(At.main), await A(I.renderer).showVipDialog(p(E, N));
      } finally {
        O = false;
      }
    }
  }
  return (E, R) => (te(), ae("div", { class: "vip-badge", "data-variant": r.value, onClick: U }, [r.value === 2 && ee(l) ? (te(), ae("div", pc, [Z(ee(uc)), R[0] || (R[0] = Bi(" \u542C\u5168\u66F2 ", -1))])) : (te(), ae("div", dc, " VIP "))], 8, fc));
} }), Dt = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, s] of t) r[n] = s;
  return r;
}, gc = Dt(hc, [["__scopeId", "data-v-20fe6902"]]), mc = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function _c(e, t) {
  return te(), ae("svg", mc, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M3.334 17.292V2.708c0-1.472 1.684-2.368 2.98-1.585L17.84 8.098a1.834 1.834 0 0 1 .065 3.128l-11.528 7.61c-1.29.851-3.044-.038-3.044-1.544" }, null, -1)])]);
}
const vc = { render: _c }, yc = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function bc(e, t) {
  return te(), ae("svg", yc, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M3.333 3.25c0-.7 0-1.05.136-1.317a1.25 1.25 0 0 1 .547-.547c.267-.136.617-.136 1.317-.136h.583c.7 0 1.05 0 1.318.136.235.12.426.311.546.547.136.267.136.617.136 1.317v13.5c0 .7 0 1.05-.136 1.317a1.25 1.25 0 0 1-.546.547c-.268.136-.618.136-1.318.136h-.583c-.7 0-1.05 0-1.317-.136a1.25 1.25 0 0 1-.547-.547c-.136-.267-.136-.617-.136-1.317zm8.75 0c0-.7 0-1.05.136-1.317a1.25 1.25 0 0 1 .547-.547c.267-.136.617-.136 1.317-.136h.583c.7 0 1.05 0 1.318.136.235.12.426.311.546.547.136.267.136.617.136 1.317v13.5c0 .7 0 1.05-.136 1.317a1.25 1.25 0 0 1-.546.547c-.268.136-.618.136-1.318.136h-.583c-.7 0-1.05 0-1.318-.136a1.25 1.25 0 0 1-.546-.547c-.136-.267-.136-.617-.136-1.317z" }, null, -1)])]);
}
const wc = { render: bc }, xc = { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "none", viewBox: "0 0 16 16" };
function Pc(e, t) {
  return te(), ae("svg", xc, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M2 2.869c0-1.074 1.204-1.708 2.089-1.1l7.048 4.846c.751.516.774 1.618.045 2.166l-7.048 5.286C3.254 14.726 2 14.099 2 13zm12.333.464c.368 0 .667.3.667.667v8a.667.667 0 0 1-1.333 0V4c0-.368.298-.666.666-.667", "clip-rule": "evenodd" }, null, -1)])]);
}
const Cc = { render: Pc }, Sc = { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "none", viewBox: "0 0 16 16" };
function Ec(e, t) {
  return te(), ae("svg", Sc, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M11.866 1.933C12.746 1.273 14 1.902 14 3v10.132a1.334 1.334 0 0 1-2.089 1.099L4.863 9.385a1.333 1.333 0 0 1-.045-2.165zm-10.199 1.4c.368 0 .666.3.666.667v8A.666.666 0 0 1 1 12V4c0-.368.299-.667.667-.667", "clip-rule": "evenodd" }, null, -1)])]);
}
const Ic = { render: Ec }, Ac = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Tc(e, t) {
  return te(), ae("svg", Ac, [...t[0] || (t[0] = [B("path", { stroke: "currentColor", "stroke-linejoin": "round", "stroke-width": "1.667", d: "M13.333 2.917c-1.667 0-2.709 1.041-3.334 1.666-.625-.625-1.666-1.666-3.333-1.666-2.083 0-3.333.833-4.167 2.083s-1.329 3.873.417 6.667c2.083 3.333 5.417 5.416 7.083 6.25 1.667-.834 5-2.917 7.084-6.25 1.9-3.04 1.25-5.417.416-6.667-.833-1.25-2.083-2.083-4.166-2.083Z" }, null, -1)])]);
}
const to = { render: Tc }, Oc = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Dc(e, t) {
  return te(), ae("svg", Oc, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M18.748 7.945a5.58 5.58 0 0 0-2.989-4.811 5.56 5.56 0 0 0-5.346.105l-.06.036-.137.086a.4.4 0 0 1-.43 0l-.1-.063-.08-.049a5.56 5.56 0 0 0-5.366-.115A5.58 5.58 0 0 0 1.25 8.08l.002.195c.059 2.163 1.402 4.486 3.554 6.668.444.45.915.883 1.386 1.281l.257.214q.193.157.385.306l.254.194q.315.237.62.444l.24.16c.307.2.598.373.866.511l.185.093.086.04q.383.148.915.147l.13-.002q.449-.015.782-.143a9 9 0 0 0 1.14-.646l.24-.16.204-.141q.206-.146.416-.303l.254-.194.192-.15.193-.156.257-.214.283-.243c.376-.329.748-.678 1.103-1.038 2.152-2.182 3.495-4.505 3.554-6.668l.002-.195z" }, null, -1)])]);
}
const ro = { render: Dc }, Rc = Tt({ __name: "ActionButton", props: { variant: {} }, emits: ["click"], setup(e, { emit: t }) {
  const r = t, n = { play: vc, pause: wc, next: Cc, prev: Ic, heartOutline: to, heartFilled: ro };
  return (s, i) => (te(), ae("button", { class: gt(["action-button", { "action-button--playback": ["play", "pause"].includes(e.variant), "action-button--heart-filled": e.variant === "heartFilled" }]), onClick: i[0] || (i[0] = ji((o) => r("click", o), ["stop"])) }, [(te(), Mn(ml(n[e.variant])))], 2));
} }), Xr = Dt(Rc, [["__scopeId", "data-v-dd6343c6"]]), Mc = Tt({ __name: "CollectButton", props: { isCollected: { type: Boolean }, animationKey: { default: "" }, animationCommand: { default: null } }, emits: ["click"], setup(e, { emit: t }) {
  const r = e, n = t, { displayCollected: s, solidAnimationClass: i, outlineAnimationClass: o } = Ba({ animationKey: () => r.animationKey, isCollected: () => r.isCollected, animationCommand: () => r.animationCommand });
  function l(a) {
    n("click", a);
  }
  return (a, p) => (te(), ae("button", { class: "collect-button", onClick: ji(l, ["stop"]) }, [Z(ee(ro), { class: gt(["icon", [ee(s) && "show", ee(i)]]) }, null, 8, ["class"]), Z(ee(to), { class: gt(["icon", [!ee(s) && "show", ee(o)]]) }, null, 8, ["class"])]));
} }), kc = Dt(Mc, [["__scopeId", "data-v-57cd6c73"]]);
function Vc(e, t, r) {
  const n = t?.width, s = t?.height;
  switch (r) {
    case "crop-center":
      return `${e.template_prefix}-crop-center:${n}:${s}.${t?.extname}`;
    case "resize":
      return `${e.template_prefix}-resize:${n}:${s}.${t?.extname}`;
    default:
      return `${e.template_prefix}-crop-center:${n}:${s}.${t?.extname}`;
  }
}
function Lc(e, t, r) {
  if (e && e.uri) {
    const n = t?.extname, s = t?.width, i = t?.height, o = Vc(e, t, "crop-center");
    return `${e?.urls?.[0]}${e.uri}~${e.template_prefix ? o : `c5_${s}x${i}.${n}`}`;
  } else return e?.urls?.[0] ? e.urls[0] : "";
}
const Fc = { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "none", viewBox: "0 0 16 16" };
function qc(e, t) {
  return te(), ae("svg", Fc, [...t[0] || (t[0] = [B("g", { "clip-path": "url(#clip0_2994_87481)" }, [B("path", { fill: "currentColor", d: "M10.139 9.195a.668.668 0 0 0-.944.943l3.196 3.195h-1.724a.667.667 0 0 0 0 1.334H14a.667.667 0 0 0 .667-.667v-3.333a.667.667 0 0 0-1.333 0v1.723zM2 1.333A.667.667 0 0 0 1.334 2v3.333a.668.668 0 0 0 1.333 0V3.61l3.195 3.195a.668.668 0 0 0 .944-.943L3.61 2.667h1.723a.668.668 0 0 0 0-1.334z" })], -1), B("defs", null, [B("clipPath", { id: "clip0_2994_87481" }, [B("path", { fill: "currentColor", d: "M16 0H0v16h16z" })])], -1)])]);
}
const Nc = { render: qc }, Es = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAC99JREFUeAHtXEuMXEcVvfW65/9xT/yb2HFmMpHjmM/M8GeBZoaPQALJtpQdi3jhRXaJZIltQrJhA16EJSsbNqywkSIEEpE7kUhYWMEhxhEixMYwjmdsz9gePJ/X7xW37r1Vr15nEBGKu6rhnahS79tu3VP33M97PQoANFQIhgQqBEVFQGBUBARGRUBgVAQERkVAYFQEBEZFQGBUBARGRUBgVAQERkVAYFQEBEZFQGBUBARGRUBgVAQERkVAYFQEBEYdIsZQoweGG/wVlQzwZmjb3+682ma/HaurLRwphEDUBHz96YfhmVNPQk1rqKHpaqAh0fillaIvXvOG2U9krrtjSma8H++rKT5mzvtEvPzjq3Dy5LsQAlFL0JvnlmELjbeF1qIZzZbK9iae36RjQGNTZn+bZ3Otkm0l9wGkSIhGIpFbmP70CIRC1AQsXV2HFZSGwrBicDTclmz7hqd97Rtaw4a9Tyl3/6ZmUs2c4fH5hYeggXIXAtEH4TfQC4xRadWa1e+8wRpde3PhLXbFW5LI6JYYQ4bWRMimXDs9E8YLoifgcnNFVr230nXbqi95Axs0BY8czfdvWpLMNcp6Cl/z7aN7IASiDsIGl19bIeOZYJqBBFizT0FVUYDNcDs3x9GguQm4OHLcTnCmQKyA93VOklOXgJ7JeTN/ae4hCIHoPeDWlXX4AEdJbmRFb2mRGtW2+j29d16i7HHAuKBdMLYSdHB6GEYDxIGuKMTe+uWSGFIVuq0tGZoIYcnh2Z3zJGYLV7+VJnstB3O5Dgn65pHd0Gl0BQHXLq6VNR0NlyZoPKWLlW+9wI8VLjZolzm5lU/E6ZIXHJodhU6jKwi4dG6Jjam9jEcCcdpm8E3dTgIUngKq+By7+lUR2OcqD9geG9gquHbxHmk4S4hNI9ulxCNElclh7xDD+8WcR+quiQEY6XAc6Jpm3F8xHS30W7ttV/VqW2wVRrUFV6lI07pEliXTkjjfYS/oGgLexYIslRzezKkqSOD9ohgz8cE3fqrKnsFDefGhuHdmvrPpaPR1gMUNkiCgZpzJ+XM0YK55BZk6wOT1pklnagV73OT+PztxCd44vQixoms8YBPjwPvnVyXVVE5KyAOMN9CKVk56Uun1TM01IGZ01QOZv2EcaEE5BhTbLE3mfOpJz8T8GMSMriLgHyYQK5BYAEUcUOUCK/Wq4OHJARib7IdY0VUE3MI4sLaSOoMbGSLDa0+KQEu6qh0hh4+EabR9FHQVAVsYB5bfXvMyH1V4gGQ1qfSIWsDnjCTtnh2GWNFVBAyhlCzaQCzGd5Ut9nqc0f2UFPenAlS4HxVRp6FjC2Ow98guGD+6G0bQ+Ga1JCI3mXlOrEBazZxyZtSK5tZ1AiBtaZzxwf6emWFYwp5SbIiOgDoaa99zB+DAswegD7eNIZUYnQhQhYHNT/yNgTN6UM/HcxmJPBOwNcN+LLBiJMC8HBDNnyrY8+wjcOCFKehp1MTIyhmbVjR+W5VrehBjjyW62LcPaQoPkPM4f/DaHfjF1y5AbIjCA4xE7Dt1EHYeH6fVYLQ8R8MlSlNly4bkJ2Jc4fIKZ1L42poqJKguT8Psveb6xkycgTh4EO5BbX/01c/AKBrfGCxD47VMFqM4g6HCCqDYd8eVnDPX8nYms1+o2ZRVIcnjERZlQQlIsPV74LdfhN6ZUTJ8RqtcCxE8WqWhyvvaDOVIKg0iQzIlSU33zsfXlggqQXtOTaMHGKO0qImQqZZIjwRYzUHXSIjZV/JmXK74TblEtD8XObIxwwyt+WE9ZUpG0vCeXeQB70NMCEbAjuOP43iCuzcaTaTwq2gUFJXhym+xwdFobHgmgIytypkOEQFFUEaHgEwCtUtRhdRhLMh60OvSQO+BbocgEtQzOQI7X/gCmq8P93AoO5ueDY8cTUuy5KQJZJ+3XePNa8LRvi5iga2EbdwwcWBHZME4CAG7nv8y1Cd2ojn73TAEMCG9KB+9QgYeQ88gg5LeaxcXcvACtLaEIBm6CMClIA5MxPixuKrijktQ0uiHgYUpMKuc1y0qtk5YgoypSIrQlLpFip7nOCusaTE+ZLr1IUnigkyTDJEsKZCXs4qXtRSSYooxEz8Gp4cgJnScgJFjh3H17xEDo/mU6D+wwY3x2Wx1vCZ15+irmiBNMaNFWk8GJ31XRAgNqQvY+BKgVUHYDmxv9KAUpastiAEdr4T7Zh5GL+gD5f5ZTf9ZE/bN7oSBub0wtDCOmp14iaeXlBqSFAtR4jIg+TGG9tsVyjtfVMjvPPU2LJ+9CTGg4x6wefF6ab9ncgwG5ydgYP4RGD46heTwW6AKsyFa6fQA0r4ZKkmmsj/JYI/Ideb6RLTaNWdDRnpsCyOxjTn8tFFMR/9vCUgagyhD09A7PQ7Dxz4BPRPmtXBvhaMxaXXrwuAux9FifEpbsWSj2MHbOYXgvCQ5SmYtaSrHAg39mAn1b/OUrP3nTOlq9sBT1gcuQUljCPpnJ2DwyGdhcOEgStA+MbJZ5TbYZjTTMbAEFKRIo4FigquJlVnPqXhJiz1GrlMiTeQBSeI8wR81VztoJ085Gvuf2DFdOb8CK807cAsfgT5ofOwEJA1cXbNT0D/3KTT4J1FaDgMbModCx1leyGgiNW52q92SxOQYsvI8LRFUGJ2JpG3VkmqhxZUzrX9u5tG+Uq7FbaRprbkKG2j022eXYQ3nVoeD88dKwMDCLK7wxyHZMUgfaypZykPwaZWRA5P7jz49x8aWskqLITVYo9oMv+XO+RLFPc+U941HkNcUHqLcZ7ecdBmPsAZvXdmAe+duouFXyPhZ4Gyoo1lQ3+xj8OiFH8GHPaLwClCFoUvntvEeLRJkSbKeUlyXQn7HGHwR1pu3cV5GmYkj/bToaBBOryyhkbBbr+h9Ni6wMJByMM1cMabl9ysgP04lYxqD54lIkD2fUOHmCjo8nmHg3Gguw/3mdTT4Nfw370PM6HgdMPneaUw9TTvAbzqzN9hVr608kSylIkt2laeeTGVeTcD7rSurvK3KHsXX8r9398w1uPniXyAGdDwNXW9egvrkN7z+pa1+0ROUPWb0nD2EVruTmRofsyueDO39XBvvqU/uhCIbskRw9qRF2jYuhvlR9nboeDNuvflH/H8PGoMHtxhM881s9xZDcXPODJXYZl2vDOmeSvOOZ2zquW4q7mtp7mn7Odz0y1cVrJ29DrGg4wSsnXsdjWB+u95Lg4xPRBhC6m7bDc3dUd/oqmT4Ymj/mPKP9cs9/RgXliAmGN/9PnQQemMLO82mI/o54BBkAqv5kwFShxoZwm0O1Lzv5EonfN7t83VaZtqmTyu9S1G6fvGp3+AC2IJYEOR5wOrLPwe9ug4kP7rOUqTavaHwglyLZygrUeIJqp89Q1Z7nvf+W+8wUnT3zHuYFd2DmNBxDzAwXqA3Uxj61lek+WJ7mbLalYJiBYN4gT1fk2t5VsrrhYrXUA9U++cSSK/egxsnXiH5iwlBCDDY+P07mLHsx+LsSbAyVLTCatzO9CVIuYYz+IS1j5LxvXtunDgLG2/+HWJDEAmyuHnyh7B10eTjJtXkLqf7az+K5UdZSdJFgPaDtdY2e7JB1wvKFMD74NZLTcx8LkOMCP5qYtIYgf2v/gR7SIeokc9vQsh7D9hDApXzMSmiqAjTmVesZfIwkmuHxC/acNx68SzcfukViBXBCbDYdep7MPbcd+XL2NdueeY/weHPTAYXa9bgduZj2cpdWD55Bu6efh1iRrAY0I77v/4dtK5ex5hwCL3C/MmA0oNGecTVFgOUHzv4mNH/+80/weJ3foBFX5yy4yMaD/AxevwIjD3/DPQ+tp9kib+grHLzvFHZV7NyeV7AMrTefAsl56dSbXcHoiTAYmD+8zB09KsYH55gz9gxxE9SxPitq4uw9Yc/w/3zFzDH/xWmmPG9//+fEDUB26Fnch+2nO+hseMqqP5bdB0B/2sIWgdUqAgIjoqAwKgICIyKgMCoCAiMioDAqAgIjIqAwKgICIyKgMCoCAiMioDAqAgIjIqAwKgICIyKgMCoCAiMioDA+BfDG1eg4zrCCgAAAABJRU5ErkJggg==", Wc = ["src"], Bc = { class: "cover-mask" }, Uc = Tt({ __name: "WidgetCover", props: { src: {} }, setup(e) {
  const t = e, r = F(() => Lc(t.src, { width: 96, height: 96, extname: "webp" })), n = se(false), s = se(false), i = F(() => s.value ? Es : r.value ?? Es);
  ge(r, () => {
    n.value = false, s.value = false;
  }, { immediate: true });
  function o() {
    n.value = true;
  }
  function l() {
    n.value = false, s.value = true;
  }
  function a() {
    A(I.window).showWindow(At.main);
  }
  return (p, u) => (te(), ae("div", { class: "cover", onClick: a }, [u[0] || (u[0] = B("div", { class: "cover-placeholder" }, null, -1)), B("img", { class: gt({ visible: n.value }), src: i.value, onLoad: o, onError: l }, null, 42, Wc), B("div", Bc, [Z(ee(Nc))])]));
} }), Hc = Dt(Uc, [["__scopeId", "data-v-cfc97b0b"]]);
var Is;
const no = typeof window < "u";
no && ((Is = window?.navigator) != null && Is.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function $c(e) {
  return typeof e == "function" ? e() : ee(e);
}
function Kc(e) {
  return e;
}
function qn(e) {
  return js() ? (Gs(e), true) : false;
}
function jc(e, t = true) {
  Ui() ? On(e) : t ? e() : yr(e);
}
function Gt(e) {
  var t;
  const r = $c(e);
  return (t = r?.$el) != null ? t : r;
}
const Lr = no ? window : void 0;
function so(e, t = false) {
  const r = se(), n = () => r.value = !!e();
  return n(), jc(n, t), r;
}
const As = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ts = "__vueuse_ssr_handlers__";
As[Ts] = As[Ts] || {};
var Os = Object.getOwnPropertySymbols, Gc = Object.prototype.hasOwnProperty, Qc = Object.prototype.propertyIsEnumerable, zc = (e, t) => {
  var r = {};
  for (var n in e) Gc.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Os) for (var n of Os(e)) t.indexOf(n) < 0 && Qc.call(e, n) && (r[n] = e[n]);
  return r;
};
function Yc(e, t, r = {}) {
  const n = r, { window: s = Lr } = n, i = zc(n, ["window"]);
  let o;
  const l = so(() => s && "ResizeObserver" in s), a = () => {
    o && (o.disconnect(), o = void 0);
  }, p = ge(() => Gt(e), (d) => {
    a(), l.value && s && d && (o = new ResizeObserver(t), o.observe(d, i));
  }, { immediate: true, flush: "post" }), u = () => {
    a(), p();
  };
  return qn(u), { isSupported: l, stop: u };
}
function io(e, t = {}) {
  const { immediate: r = true, window: n = Lr } = t, s = se(false);
  let i = 0, o = null;
  function l(u) {
    if (!s.value || !n) return;
    const d = u - i;
    e({ delta: d, timestamp: u }), i = u, o = n.requestAnimationFrame(l);
  }
  function a() {
    !s.value && n && (s.value = true, o = n.requestAnimationFrame(l));
  }
  function p() {
    s.value = false, o != null && n && (n.cancelAnimationFrame(o), o = null);
  }
  return r && a(), qn(p), { isActive: mr(s), pause: p, resume: a };
}
function Xc(e, t = { width: 0, height: 0 }, r = {}) {
  const { window: n = Lr, box: s = "content-box" } = r, i = F(() => {
    var a, p;
    return (p = (a = Gt(e)) == null ? void 0 : a.namespaceURI) == null ? void 0 : p.includes("svg");
  }), o = se(t.width), l = se(t.height);
  return Yc(e, ([a]) => {
    const p = s === "border-box" ? a.borderBoxSize : s === "content-box" ? a.contentBoxSize : a.devicePixelContentBoxSize;
    if (n && i.value) {
      const u = Gt(e);
      if (u) {
        const d = n.getComputedStyle(u);
        o.value = parseFloat(d.width), l.value = parseFloat(d.height);
      }
    } else if (p) {
      const u = Array.isArray(p) ? p : [p];
      o.value = u.reduce((d, { inlineSize: g }) => d + g, 0), l.value = u.reduce((d, { blockSize: g }) => d + g, 0);
    } else o.value = a.contentRect.width, l.value = a.contentRect.height;
  }, r), ge(() => Gt(e), (a) => {
    o.value = a ? t.width : 0, l.value = a ? t.height : 0;
  }), { width: o, height: l };
}
var Ds = Object.getOwnPropertySymbols, Jc = Object.prototype.hasOwnProperty, Zc = Object.prototype.propertyIsEnumerable, eu = (e, t) => {
  var r = {};
  for (var n in e) Jc.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Ds) for (var n of Ds(e)) t.indexOf(n) < 0 && Zc.call(e, n) && (r[n] = e[n]);
  return r;
};
function tu(e, t, r = {}) {
  const n = r, { window: s = Lr } = n, i = eu(n, ["window"]);
  let o;
  const l = so(() => s && "MutationObserver" in s), a = () => {
    o && (o.disconnect(), o = void 0);
  }, p = ge(() => Gt(e), (d) => {
    a(), l.value && s && d && (o = new MutationObserver(t), o.observe(d, i));
  }, { immediate: true }), u = () => {
    a(), p();
  };
  return qn(u), { isSupported: l, stop: u };
}
var Rs;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(Rs || (Rs = {}));
var ru = Object.defineProperty, Ms = Object.getOwnPropertySymbols, nu = Object.prototype.hasOwnProperty, su = Object.prototype.propertyIsEnumerable, ks = (e, t, r) => t in e ? ru(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, iu = (e, t) => {
  for (var r in t || (t = {})) nu.call(t, r) && ks(e, r, t[r]);
  if (Ms) for (var r of Ms(t)) su.call(t, r) && ks(e, r, t[r]);
  return e;
};
const ou = { easeInSine: [0.12, 0, 0.39, 0], easeOutSine: [0.61, 1, 0.88, 1], easeInOutSine: [0.37, 0, 0.63, 1], easeInQuad: [0.11, 0, 0.5, 0], easeOutQuad: [0.5, 1, 0.89, 1], easeInOutQuad: [0.45, 0, 0.55, 1], easeInCubic: [0.32, 0, 0.67, 0], easeOutCubic: [0.33, 1, 0.68, 1], easeInOutCubic: [0.65, 0, 0.35, 1], easeInQuart: [0.5, 0, 0.75, 0], easeOutQuart: [0.25, 1, 0.5, 1], easeInOutQuart: [0.76, 0, 0.24, 1], easeInQuint: [0.64, 0, 0.78, 0], easeOutQuint: [0.22, 1, 0.36, 1], easeInOutQuint: [0.83, 0, 0.17, 1], easeInExpo: [0.7, 0, 0.84, 0], easeOutExpo: [0.16, 1, 0.3, 1], easeInOutExpo: [0.87, 0, 0.13, 1], easeInCirc: [0.55, 0, 1, 0.45], easeOutCirc: [0, 0.55, 0.45, 1], easeInOutCirc: [0.85, 0, 0.15, 1], easeInBack: [0.36, 0, 0.66, -0.56], easeOutBack: [0.34, 1.56, 0.64, 1], easeInOutBack: [0.68, -0.6, 0.32, 1.6] };
iu({ linear: Kc }, ou);
function lu(e) {
  const t = se(), r = se(0);
  return tu(e, (n) => {
    n.some((s) => ["style", "class"].includes(s.attributeName ?? "")) && r.value++;
  }, { attributes: true }), ge([e, r], ([n]) => {
    n && (t.value = getComputedStyle(n));
  }, { immediate: true }), t;
}
function au() {
  const e = Ie("player"), t = se(0);
  return ge(() => e.value.progressSeconds, (r) => {
    r < t.value && t.value - r < 0.5 || (t.value = r);
  }, { immediate: true }), io(({ delta: r }) => {
    e.value.isPlaying && !e.value.isLoading && t.value !== 0 && (t.value += r / 1e3);
  }), t;
}
const fr = /* @__PURE__ */ new Map(), cu = document.createElement("canvas");
function uu(e, t) {
  const r = fr.get(t)?.get(e);
  if (r) return r;
  const n = cu.getContext("2d");
  n.font = t;
  const i = n.measureText(e).width;
  return fr.has(t) || fr.set(t, /* @__PURE__ */ new Map()), fr.get(t).set(e, i), i;
}
function fu(e, t) {
  let r = 0;
  const n = [];
  for (const s of Array.from(e)) {
    const i = uu(s, t);
    r += i, n.push(i);
  }
  return { width: r, subWidths: n };
}
const Vs = /* @__PURE__ */ new Map();
function Ls(e) {
  const [t, r, n] = e.split(/[:.]/), s = Number.parseInt(t, 10), i = Number.parseInt(r, 10), o = Number.parseInt(n, 10);
  return [s, i, o].some(Number.isNaN) ? null : s * 60 * 1e3 + i * 1e3 + o;
}
function pu(e) {
  if (!e?.content) return [];
  const t = e.content, r = Vs.get(t);
  if (r) return r;
  const n = e.content.split(`
`), s = n.map((i) => i.trim()).filter(Boolean).map((i, o) => {
    if (/^\[\d+,/.test(i)) {
      const [g = "", x = ""] = i.split("]"), [T = "0", O = "0"] = g.slice(1).split(","), U = Number.parseInt(T, 10), E = Number.parseInt(O, 10), R = x.split("<").filter(Boolean).flatMap((k) => {
        const [C = "", N = ""] = k.split(">"), [ce = "0", ne = "0"] = C.split(","), ie = [...N];
        if (!ie.length) return [];
        const He = Number.parseInt(ne, 10) / ie.length;
        let Ae = Number.parseInt(ce, 10);
        return ie.map((Y) => {
          const be = { startTime: Ae, duration: He, char: Y };
          return Ae += He, be;
        });
      }).filter((k) => k.char.length > 0);
      return Number.isNaN(U) || Number.isNaN(E) || !R.length ? null : { startTime: U, duration: E, isKRC: true, chars: R };
    }
    const [l = "", a = ""] = i.split("]"), p = Ls(l.slice(1));
    if (p === null) return null;
    let u = p + 1e4;
    const d = n[o + 1]?.trim();
    if (d) {
      const g = Ls(d.split("]")[0]?.slice(1) ?? "");
      g !== null && (u = g);
    }
    return { startTime: p, duration: u - p, isLRC: true, chars: [...a].map((g) => ({ startTime: -1, duration: -1, char: g })) };
  }).filter((i) => !!i?.chars.length);
  return Vs.set(t, s), s;
}
function du(e) {
  return e?.chars.map((t) => t.char).join("") ?? "";
}
function hu(e, t) {
  if (e.length) {
    if (t <= e[0].startTime) return e[0];
    for (let r = 0; r < e.length; r++) {
      const n = e[r], i = e[r + 1]?.startTime ?? n.startTime + n.duration;
      if (t >= n.startTime && t < i) return n;
    }
    return e[e.length - 1];
  }
}
function gu(e, t, r, n) {
  const s = au(), i = F(() => s.value * 1e3 + n.value), o = F(() => pu(e.value)), l = F(() => hu(o.value, i.value)), a = F(() => du(l.value) || t.value), p = F(() => l.value ? `${l.value.startTime}-${a.value}` : t.value), u = F(() => !r.value || !a.value ? { width: 0, subWidths: [] } : fu(a.value, r.value)), d = F(() => {
    const x = l.value;
    if (!x || !r.value || i.value <= x.startTime) return 0;
    if (x.isLRC) return u.value.width;
    let T = 0;
    for (const [O, U] of x.chars.entries()) {
      const E = u.value.subWidths[O] ?? 0, R = x.startTime + U.startTime, k = R + U.duration;
      if (i.value <= R) break;
      if (i.value >= k) {
        T += E;
        continue;
      }
      const C = (i.value - R) / U.duration;
      T += E * C;
      break;
    }
    return Math.max(0, Math.min(T, u.value.width));
  }), g = F(() => {
    const x = l.value;
    return !x || !r.value || i.value <= x.startTime || x.isLRC ? 0 : d.value;
  });
  return { currentLine: l, currentLineKey: p, currentLineText: a, playedWidth: d, scrollAnchorX: g, totalWidth: F(() => u.value.width) };
}
const mu = { class: "lyric-wrapper" }, _u = { class: "lyric-track" }, vu = 0.9, yu = 0.1, bu = Tt({ __name: "WidgetLyric", props: { playable: { default: void 0 }, mediaDetail: { default: void 0 } }, setup(e) {
  const t = e, { isPreviewPlayable: r } = eo(), n = F(() => r.value ? t.playable?.preview?.start ?? 0 : 0), s = se(), i = se(), o = lu(i), l = se(0), a = se(0), p = F(() => {
    if (!(!t.playable || !t.mediaDetail) && t.mediaDetail.playable.key === t.playable.key) return t.mediaDetail;
  }), u = F(() => t.playable ? p.value ? t.playable.track?.vocal === 2 ? "\u7EAF\u97F3\u4E50\uFF0C\u8BF7\u6B23\u8D4F" : "\u6682\u65E0\u6B4C\u8BCD\uFF0C\u8BF7\u6B23\u8D4F" : "" : "\u968F\u65F6\u968F\u5730 \u61C2\u4F60\u60F3\u542C"), { currentLineKey: d, currentLineText: g, playedWidth: x, scrollAnchorX: T, totalWidth: O } = gu(F(() => p.value?.lyrics), u, F(() => o.value?.font), n), { width: U } = Xc(s);
  function E(k, C, N) {
    return Math.min(Math.max(k, C), N);
  }
  function R() {
    const k = s.value;
    if (!k) return;
    const C = Math.max(0, O.value - k.clientWidth);
    if (C <= 0) {
      a.value = 0;
      return;
    }
    const N = T.value, ce = N - l.value, ne = k.clientWidth * vu, ie = k.clientWidth * yu;
    if (N < l.value) {
      a.value = E(N - ie, 0, C);
      return;
    }
    if (ce > ne) {
      a.value = E(N - ie, 0, C);
      return;
    }
    a.value = E(a.value, 0, C);
  }
  return ge(() => d.value, async () => {
    await yr(), l.value = 0, a.value = 0, s.value?.scrollTo({ left: 0 });
  }, { immediate: true }), ge([() => d.value, () => T.value, () => O.value, () => U.value], async () => {
    await yr(), R();
  }, { immediate: true }), io(({ delta: k }) => {
    const C = s.value;
    if (!C) return;
    const N = a.value - l.value;
    if (Math.abs(N) < 0.5) {
      l.value = a.value, C.scrollLeft = a.value;
      return;
    }
    const ce = k / 1e3, ne = 1 - Math.exp(-5 * ce);
    l.value += N * ne, C.scrollLeft = l.value;
  }), (k, C) => (te(), ae("div", mu, [B("div", { ref_key: "lyricViewport", ref: s, class: "lyric-viewport" }, [B("div", _u, [B("div", { ref_key: "lyricTextBase", ref: i, class: "lyric lyric--base" }, gr(ee(g)), 513), B("div", { class: "lyric lyric--played", style: Tr({ width: `${ee(x)}px` }) }, gr(ee(g)), 5)])], 512)]));
} }), wu = Dt(bu, [["__scopeId", "data-v-1e0112be"]]), xu = { xmlns: "http://www.w3.org/2000/svg", width: "6", height: "6", fill: "none", viewBox: "0 0 6 6" };
function Pu(e, t) {
  return te(), ae("svg", xu, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M4.654.904a.312.312 0 1 1 .441.442L3.441 3l1.654 1.654a.312.312 0 1 1-.441.442L3 3.44 1.345 5.096a.312.312 0 1 1-.441-.442L2.558 3 .904 1.346a.312.312 0 1 1 .441-.442L3 2.56z" }, null, -1)])]);
}
const Cu = { render: Pu }, Su = ["data-theme", "data-widget-state", "data-hover", "data-in-drag-region", "data-variant"], Eu = { class: "container" }, Iu = { class: "cover-wrapper" }, Au = { class: "main-wrapper" }, Tu = { class: "info-wrapper" }, Ou = { class: "title-wrapper" }, Du = { class: "title" }, Ru = { class: "action-wrapper" }, Mu = { class: "side-wrapper" }, ku = { class: "close-wrapper" }, Vu = Tt({ __name: "Widget", setup(e) {
  const t = Ie("taskbarWidget"), r = F(() => t.value.theme === "dark"), n = F(() => t.value.hover), s = F(() => t.value.widgetState === "free"), i = F(() => t.value.inDragRegion), o = Ie("user"), l = Ie("player"), a = Ie("queue"), p = Zi({ preserveLatest: true }), u = Fn(), d = F(() => u.value?.luna_pc_common_server_params?.win_widget?.variant ?? 1), g = F(() => p.value ? { type: le.playable, id: p.value.id, playable: p.value } : null), x = F(() => g.value ? bs(g.value) : "empty"), T = se(null), { isCollected: O, isPending: U, toggleCollect: E } = lc({ entity: g, onToggle: ({ entity: Y, isCollected: be }) => {
    T.value = Wa(T.value, bs(Y), be);
  } }), R = F(() => p.value ? [p.value.name, p.value.artists?.map((Y) => Y.name).join(", ")].filter(Boolean).join("-") : "\u6C7D\u6C34\u97F3\u4E50"), k = F(() => p.value?.label_info?.only_vip_playable);
  async function C() {
    return A(I.taskbarWidget).getPlaySourceParams();
  }
  async function N() {
    const Y = await C();
    A(I.queue).playPrevious(dn.userPrevious, {}, 0, Y);
  }
  async function ce() {
    const Y = await C();
    A(I.player).togglePlay({}, Y);
  }
  async function ne() {
    const Y = await C();
    A(I.queue).playNext(dn.userNext, {}, Y);
  }
  On(async () => {
    const Y = await A(I.taskbarWidget).getReportContext();
    A(I.applog).report({ event: "widget_show", params: { ...Y, widget_type: "broadcast_control_widget" } });
  });
  async function ie(Y) {
    if (U.value) return;
    const be = await A(I.taskbarWidget).getReportContext();
    if (!o.value.info && (await A(I.window).showWindowAndWaitForReady(At.main), !await A(I.user).login({ waitComplete: true, etParams: { scene_name: be.scene_name, enter_from_page: gn, enter_method: "group_collect_playable" } }))) return;
    const at = p.value?.id, vt = a.value.queue?.currentPlayable.key;
    await E(!O.value, Y.currentTarget, { queue_type: a.value.queue?.etParams.queue_type ?? "", request_id: (at ? l.value.mediaEtParams[at]?.request_id : void 0) ?? (vt ? a.value.queue?.playables.requestIdMap[vt] : void 0) ?? "", ...be });
  }
  async function He() {
    const Y = await A(I.taskbarWidget).getReportContext();
    A(I.applog).report({ event: "widget_close", params: { ...Y, close_type: "click_close", widget_type: "broadcast_control_widget" } }), A(I.taskbarWidget).setEnabled(false);
  }
  function Ae(Y) {
  }
  return (Y, be) => (te(), ae("div", { class: "wrapper", "data-theme": r.value ? "dark" : "light", "data-widget-state": s.value ? "free" : null, "data-hover": n.value ? "" : null, "data-in-drag-region": i.value ? "" : null, "data-variant": d.value }, [B("div", Eu, [be[0] || (be[0] = B("div", { class: "drag-handler-wrapper" }, [B("div", { class: "drag-handler" })], -1)), B("div", Iu, [Z(Hc, { src: ee(p)?.cover_url }, null, 8, ["src"])]), B("div", Au, [B("div", Tu, [B("div", Ou, [B("div", Du, gr(R.value), 1), k.value ? (te(), Mn(gc, { key: 0 })) : Gl("", true)]), Z(wu, { playable: ee(p), "media-detail": ee(l).mediaDetail }, null, 8, ["playable", "media-detail"])]), B("div", Ru, [Z(Xr, { variant: "prev", onClick: N }), Z(Xr, { variant: ee(l).isPlaying ? "pause" : "play", onClick: ce }, null, 8, ["variant"]), Z(Xr, { variant: "next", onClick: ne })])]), B("div", Mu, [Z(kc, { "animation-key": x.value, "animation-command": T.value, "is-collected": ee(O), onClick: ie }, null, 8, ["animation-key", "animation-command", "is-collected"])]), B("div", ku, [Z(ee(Cu), { onClick: He, onContextmenu: Ae })])])], 8, Su));
} }), Lu = Dt(Vu, [["__scopeId", "data-v-a0ffdce9"]]);
async function Fu() {
  const t = new URLSearchParams(window.location.search).get("global_config"), r = JSON.parse(t ?? "{}");
  Ma(r), await Qi.initialize(), ka(), Ta(Lu).mount("#app");
}
Fu();
