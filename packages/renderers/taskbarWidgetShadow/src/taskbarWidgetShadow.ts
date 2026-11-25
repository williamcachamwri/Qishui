// packages/renderers/taskbarWidgetShadow/src/taskbarWidgetShadow.ts
// @ts-nocheck
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) r(n);
  new MutationObserver((n) => {
    for (const i of n) if (i.type === "childList") for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: true, subtree: true });
  function s(n) {
    const i = {};
    return n.integrity && (i.integrity = n.integrity), n.referrerPolicy && (i.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? i.credentials = "include" : n.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
  }
  function r(n) {
    if (n.ep) return;
    n.ep = true;
    const i = s(n);
    fetch(n.href, i);
  }
})();
function Ds(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const V = {}, Xe = [], fe = () => {
}, Yr = () => false, Yt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ns = (e) => e.startsWith("onUpdate:"), Y = Object.assign, $s = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, ci = Object.prototype.hasOwnProperty, $ = (e, t) => ci.call(e, t), R = Array.isArray, ht = (e) => Xt(e) === "[object Map]", fi = (e) => Xt(e) === "[object Set]", I = (e) => typeof e == "function", z = (e) => typeof e == "string", rt = (e) => typeof e == "symbol", K = (e) => e !== null && typeof e == "object", Xr = (e) => (K(e) || I(e)) && I(e.then) && I(e.catch), ui = Object.prototype.toString, Xt = (e) => ui.call(e), ai = (e) => Xt(e).slice(8, -1), hi = (e) => Xt(e) === "[object Object]", Ls = (e) => z(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, dt = Ds(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Zt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, di = /-\w/g, je = Zt((e) => e.replace(di, (t) => t.slice(1).toUpperCase())), pi = /\B([A-Z])/g, Ge = Zt((e) => e.replace(pi, "-$1").toLowerCase()), Zr = Zt((e) => e.charAt(0).toUpperCase() + e.slice(1)), cs = Zt((e) => e ? `on${Zr(e)}` : ""), Le = (e, t) => !Object.is(e, t), fs = (e, ...t) => {
  for (let s = 0; s < e.length; s++) e[s](...t);
}, en = (e, t, s, r = false) => {
  Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: r, value: s });
}, gi = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ur;
const es = () => ur || (ur = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function js(e) {
  if (R(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const r = e[s], n = z(r) ? vi(r) : js(r);
      if (n) for (const i in n) t[i] = n[i];
    }
    return t;
  } else if (z(e) || K(e)) return e;
}
const mi = /;(?![^(]*\))/g, _i = /:([^]+)/, bi = /\/\*[^]*?\*\//g;
function vi(e) {
  const t = {};
  return e.replace(bi, "").split(mi).forEach((s) => {
    if (s) {
      const r = s.split(_i);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Ws(e) {
  let t = "";
  if (z(e)) t = e;
  else if (R(e)) for (let s = 0; s < e.length; s++) {
    const r = Ws(e[s]);
    r && (t += r + " ");
  }
  else if (K(e)) for (const s in e) e[s] && (t += s + " ");
  return t.trim();
}
const yi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", wi = Ds(yi);
function tn(e) {
  return !!e || e === "";
}
function xi(e) {
  return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e);
}
let G;
class Si {
  constructor(t = false) {
    this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = G, !t && G && (this.index = (G.scopes || (G.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let t, s;
      if (this.scopes) for (t = 0, s = this.scopes.length; t < s; t++) this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = false;
      let t, s;
      if (this.scopes) for (t = 0, s = this.scopes.length; t < s; t++) this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = G;
      try {
        return G = this, t();
      } finally {
        G = s;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = G, G = this);
  }
  off() {
    this._on > 0 && --this._on === 0 && (G = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = false;
      let s, r;
      for (s = 0, r = this.effects.length; s < r; s++) this.effects[s].stop();
      for (this.effects.length = 0, s = 0, r = this.cleanups.length; s < r; s++) this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, r = this.scopes.length; s < r; s++) this.scopes[s].stop(true);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const n = this.parent.scopes.pop();
        n && n !== this && (this.parent.scopes[this.index] = n, n.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function sn() {
  return G;
}
function Oi(e, t = false) {
  G && G.cleanups.push(e);
}
let H;
const us = /* @__PURE__ */ new WeakSet();
class rn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, G && G.active && G.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, us.has(this) && (us.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || on(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, ar(this), ln(this);
    const t = H, s = ue;
    H = this, ue = true;
    try {
      return this.fn();
    } finally {
      cn(this), H = t, ue = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Us(t);
      this.deps = this.depsTail = void 0, ar(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? us.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    bs(this) && this.run();
  }
  get dirty() {
    return bs(this);
  }
}
let nn = 0, pt, gt;
function on(e, t = false) {
  if (e.flags |= 8, t) {
    e.next = gt, gt = e;
    return;
  }
  e.next = pt, pt = e;
}
function Hs() {
  nn++;
}
function Vs() {
  if (--nn > 0) return;
  if (gt) {
    let t = gt;
    for (gt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; pt; ) {
    let t = pt;
    for (pt = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (r) {
        e || (e = r);
      }
      t = s;
    }
  }
  if (e) throw e;
}
function ln(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function cn(e) {
  let t, s = e.depsTail, r = s;
  for (; r; ) {
    const n = r.prevDep;
    r.version === -1 ? (r === s && (s = n), Us(r), Pi(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = n;
  }
  e.deps = t, e.depsTail = s;
}
function bs(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (fn(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e._dirty;
}
function fn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === xt) || (e.globalVersion = xt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !bs(e)))) return;
  e.flags |= 2;
  const t = e.dep, s = H, r = ue;
  H = e, ue = true;
  try {
    ln(e);
    const n = e.fn(e._value);
    (t.version === 0 || Le(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
  } catch (n) {
    throw t.version++, n;
  } finally {
    H = s, ue = r, cn(e), e.flags &= -3;
  }
}
function Us(e, t = false) {
  const { dep: s, prevSub: r, nextSub: n } = e;
  if (r && (r.nextSub = n, e.prevSub = void 0), n && (n.prevSub = r, e.nextSub = void 0), s.subs === e && (s.subs = r, !r && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep) Us(i, true);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Pi(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let ue = true;
const un = [];
function Te() {
  un.push(ue), ue = false;
}
function Ee() {
  const e = un.pop();
  ue = e === void 0 ? true : e;
}
function ar(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = H;
    H = void 0;
    try {
      t();
    } finally {
      H = s;
    }
  }
}
let xt = 0;
class Ti {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ks {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
  }
  track(t) {
    if (!H || !ue || H === this.computed) return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== H) s = this.activeLink = new Ti(H, this), H.deps ? (s.prevDep = H.depsTail, H.depsTail.nextDep = s, H.depsTail = s) : H.deps = H.depsTail = s, an(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const r = s.nextDep;
      r.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = r), s.prevDep = H.depsTail, s.nextDep = void 0, H.depsTail.nextDep = s, H.depsTail = s, H.deps === s && (H.deps = r);
    }
    return s;
  }
  trigger(t) {
    this.version++, xt++, this.notify(t);
  }
  notify(t) {
    Hs();
    try {
      for (let s = this.subs; s; s = s.prevSub) s.sub.notify() && s.sub.dep.notify();
    } finally {
      Vs();
    }
  }
}
function an(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) an(r);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const vs = /* @__PURE__ */ new WeakMap(), ze = Symbol(""), ys = Symbol(""), St = Symbol("");
function J(e, t, s) {
  if (ue && H) {
    let r = vs.get(e);
    r || vs.set(e, r = /* @__PURE__ */ new Map());
    let n = r.get(s);
    n || (r.set(s, n = new ks()), n.map = r, n.key = s), n.track();
  }
}
function Oe(e, t, s, r, n, i) {
  const o = vs.get(e);
  if (!o) {
    xt++;
    return;
  }
  const l = (f) => {
    f && f.trigger();
  };
  if (Hs(), t === "clear") o.forEach(l);
  else {
    const f = R(e), d = f && Ls(s);
    if (f && s === "length") {
      const a = Number(r);
      o.forEach((p, S) => {
        (S === "length" || S === St || !rt(S) && S >= a) && l(p);
      });
    } else switch ((s !== void 0 || o.has(void 0)) && l(o.get(s)), d && l(o.get(St)), t) {
      case "add":
        f ? d && l(o.get("length")) : (l(o.get(ze)), ht(e) && l(o.get(ys)));
        break;
      case "delete":
        f || (l(o.get(ze)), ht(e) && l(o.get(ys)));
        break;
      case "set":
        ht(e) && l(o.get(ze));
        break;
    }
  }
  Vs();
}
function Je(e) {
  const t = N(e);
  return t === e ? t : (J(t, "iterate", St), ae(e) ? t : t.map(Ce));
}
function Bs(e) {
  return J(e = N(e), "iterate", St), e;
}
function Fe(e, t) {
  return We(e) ? Ze(e) ? Ot(Ce(t)) : Ot(t) : Ce(t);
}
const Ei = { __proto__: null, [Symbol.iterator]() {
  return as(this, Symbol.iterator, (e) => Fe(this, e));
}, concat(...e) {
  return Je(this).concat(...e.map((t) => R(t) ? Je(t) : t));
}, entries() {
  return as(this, "entries", (e) => (e[1] = Fe(this, e[1]), e));
}, every(e, t) {
  return xe(this, "every", e, t, void 0, arguments);
}, filter(e, t) {
  return xe(this, "filter", e, t, (s) => s.map((r) => Fe(this, r)), arguments);
}, find(e, t) {
  return xe(this, "find", e, t, (s) => Fe(this, s), arguments);
}, findIndex(e, t) {
  return xe(this, "findIndex", e, t, void 0, arguments);
}, findLast(e, t) {
  return xe(this, "findLast", e, t, (s) => Fe(this, s), arguments);
}, findLastIndex(e, t) {
  return xe(this, "findLastIndex", e, t, void 0, arguments);
}, forEach(e, t) {
  return xe(this, "forEach", e, t, void 0, arguments);
}, includes(...e) {
  return hs(this, "includes", e);
}, indexOf(...e) {
  return hs(this, "indexOf", e);
}, join(e) {
  return Je(this).join(e);
}, lastIndexOf(...e) {
  return hs(this, "lastIndexOf", e);
}, map(e, t) {
  return xe(this, "map", e, t, void 0, arguments);
}, pop() {
  return ct(this, "pop");
}, push(...e) {
  return ct(this, "push", e);
}, reduce(e, ...t) {
  return hr(this, "reduce", e, t);
}, reduceRight(e, ...t) {
  return hr(this, "reduceRight", e, t);
}, shift() {
  return ct(this, "shift");
}, some(e, t) {
  return xe(this, "some", e, t, void 0, arguments);
}, splice(...e) {
  return ct(this, "splice", e);
}, toReversed() {
  return Je(this).toReversed();
}, toSorted(e) {
  return Je(this).toSorted(e);
}, toSpliced(...e) {
  return Je(this).toSpliced(...e);
}, unshift(...e) {
  return ct(this, "unshift", e);
}, values() {
  return as(this, "values", (e) => Fe(this, e));
} };
function as(e, t, s) {
  const r = Bs(e), n = r[t]();
  return r !== e && !ae(e) && (n._next = n.next, n.next = () => {
    const i = n._next();
    return i.done || (i.value = s(i.value)), i;
  }), n;
}
const Ci = Array.prototype;
function xe(e, t, s, r, n, i) {
  const o = Bs(e), l = o !== e && !ae(e), f = o[t];
  if (f !== Ci[t]) {
    const p = f.apply(e, i);
    return l ? Ce(p) : p;
  }
  let d = s;
  o !== e && (l ? d = function(p, S) {
    return s.call(this, Fe(e, p), S, e);
  } : s.length > 2 && (d = function(p, S) {
    return s.call(this, p, S, e);
  }));
  const a = f.call(o, d, r);
  return l && n ? n(a) : a;
}
function hr(e, t, s, r) {
  const n = Bs(e);
  let i = s;
  return n !== e && (ae(e) ? s.length > 3 && (i = function(o, l, f) {
    return s.call(this, o, l, f, e);
  }) : i = function(o, l, f) {
    return s.call(this, o, Fe(e, l), f, e);
  }), n[t](i, ...r);
}
function hs(e, t, s) {
  const r = N(e);
  J(r, "iterate", St);
  const n = r[t](...s);
  return (n === -1 || n === false) && zs(s[0]) ? (s[0] = N(s[0]), r[t](...s)) : n;
}
function ct(e, t, s = []) {
  Te(), Hs();
  const r = N(e)[t].apply(e, s);
  return Vs(), Ee(), r;
}
const Ii = Ds("__proto__,__v_isRef,__isVue"), hn = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(rt));
function Ri(e) {
  rt(e) || (e = String(e));
  const t = N(this);
  return J(t, "has", e), t.hasOwnProperty(e);
}
class dn {
  constructor(t = false, s = false) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, r) {
    if (s === "__v_skip") return t.__v_skip;
    const n = this._isReadonly, i = this._isShallow;
    if (s === "__v_isReactive") return !n;
    if (s === "__v_isReadonly") return n;
    if (s === "__v_isShallow") return i;
    if (s === "__v_raw") return r === (n ? i ? Hi : _n : i ? mn : gn).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const o = R(t);
    if (!n) {
      let f;
      if (o && (f = Ei[s])) return f;
      if (s === "hasOwnProperty") return Ri;
    }
    const l = Reflect.get(t, s, Q(t) ? t : r);
    if ((rt(s) ? hn.has(s) : Ii(s)) || (n || J(t, "get", s), i)) return l;
    if (Q(l)) {
      const f = o && Ls(s) ? l : l.value;
      return n && K(f) ? xs(f) : f;
    }
    return K(l) ? n ? xs(l) : ts(l) : l;
  }
}
class pn extends dn {
  constructor(t = false) {
    super(false, t);
  }
  set(t, s, r, n) {
    let i = t[s];
    const o = R(t) && Ls(s);
    if (!this._isShallow) {
      const d = We(i);
      if (!ae(r) && !We(r) && (i = N(i), r = N(r)), !o && Q(i) && !Q(r)) return d || (i.value = r), true;
    }
    const l = o ? Number(s) < t.length : $(t, s), f = Reflect.set(t, s, r, Q(t) ? t : n);
    return t === N(n) && (l ? Le(r, i) && Oe(t, "set", s, r) : Oe(t, "add", s, r)), f;
  }
  deleteProperty(t, s) {
    const r = $(t, s);
    t[s];
    const n = Reflect.deleteProperty(t, s);
    return n && r && Oe(t, "delete", s, void 0), n;
  }
  has(t, s) {
    const r = Reflect.has(t, s);
    return (!rt(s) || !hn.has(s)) && J(t, "has", s), r;
  }
  ownKeys(t) {
    return J(t, "iterate", R(t) ? "length" : ze), Reflect.ownKeys(t);
  }
}
class Ai extends dn {
  constructor(t = false) {
    super(true, t);
  }
  set(t, s) {
    return true;
  }
  deleteProperty(t, s) {
    return true;
  }
}
const Mi = new pn(), Fi = new Ai(), Di = new pn(true);
const ws = (e) => e, Nt = (e) => Reflect.getPrototypeOf(e);
function Ni(e, t, s) {
  return function(...r) {
    const n = this.__v_raw, i = N(n), o = ht(i), l = e === "entries" || e === Symbol.iterator && o, f = e === "keys" && o, d = n[e](...r), a = s ? ws : t ? Ot : Ce;
    return !t && J(i, "iterate", f ? ys : ze), { next() {
      const { value: p, done: S } = d.next();
      return S ? { value: p, done: S } : { value: l ? [a(p[0]), a(p[1])] : a(p), done: S };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function $t(e) {
  return function(...t) {
    return e === "delete" ? false : e === "clear" ? void 0 : this;
  };
}
function $i(e, t) {
  const s = { get(n) {
    const i = this.__v_raw, o = N(i), l = N(n);
    e || (Le(n, l) && J(o, "get", n), J(o, "get", l));
    const { has: f } = Nt(o), d = t ? ws : e ? Ot : Ce;
    if (f.call(o, n)) return d(i.get(n));
    if (f.call(o, l)) return d(i.get(l));
    i !== o && i.get(n);
  }, get size() {
    const n = this.__v_raw;
    return !e && J(N(n), "iterate", ze), n.size;
  }, has(n) {
    const i = this.__v_raw, o = N(i), l = N(n);
    return e || (Le(n, l) && J(o, "has", n), J(o, "has", l)), n === l ? i.has(n) : i.has(n) || i.has(l);
  }, forEach(n, i) {
    const o = this, l = o.__v_raw, f = N(l), d = t ? ws : e ? Ot : Ce;
    return !e && J(f, "iterate", ze), l.forEach((a, p) => n.call(i, d(a), d(p), o));
  } };
  return Y(s, e ? { add: $t("add"), set: $t("set"), delete: $t("delete"), clear: $t("clear") } : { add(n) {
    !t && !ae(n) && !We(n) && (n = N(n));
    const i = N(this);
    return Nt(i).has.call(i, n) || (i.add(n), Oe(i, "add", n, n)), this;
  }, set(n, i) {
    !t && !ae(i) && !We(i) && (i = N(i));
    const o = N(this), { has: l, get: f } = Nt(o);
    let d = l.call(o, n);
    d || (n = N(n), d = l.call(o, n));
    const a = f.call(o, n);
    return o.set(n, i), d ? Le(i, a) && Oe(o, "set", n, i) : Oe(o, "add", n, i), this;
  }, delete(n) {
    const i = N(this), { has: o, get: l } = Nt(i);
    let f = o.call(i, n);
    f || (n = N(n), f = o.call(i, n)), l && l.call(i, n);
    const d = i.delete(n);
    return f && Oe(i, "delete", n, void 0), d;
  }, clear() {
    const n = N(this), i = n.size !== 0, o = n.clear();
    return i && Oe(n, "clear", void 0, void 0), o;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((n) => {
    s[n] = Ni(n, e, t);
  }), s;
}
function Ks(e, t) {
  const s = $i(e, t);
  return (r, n, i) => n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? r : Reflect.get($(s, n) && n in r ? s : r, n, i);
}
const Li = { get: Ks(false, false) }, ji = { get: Ks(false, true) }, Wi = { get: Ks(true, false) };
const gn = /* @__PURE__ */ new WeakMap(), mn = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap(), Hi = /* @__PURE__ */ new WeakMap();
function Vi(e) {
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
function Ui(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Vi(ai(e));
}
function ts(e) {
  return We(e) ? e : qs(e, false, Mi, Li, gn);
}
function ki(e) {
  return qs(e, false, Di, ji, mn);
}
function xs(e) {
  return qs(e, true, Fi, Wi, _n);
}
function qs(e, t, s, r, n) {
  if (!K(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const i = Ui(e);
  if (i === 0) return e;
  const o = n.get(e);
  if (o) return o;
  const l = new Proxy(e, i === 2 ? r : s);
  return n.set(e, l), l;
}
function Ze(e) {
  return We(e) ? Ze(e.__v_raw) : !!(e && e.__v_isReactive);
}
function We(e) {
  return !!(e && e.__v_isReadonly);
}
function ae(e) {
  return !!(e && e.__v_isShallow);
}
function zs(e) {
  return e ? !!e.__v_raw : false;
}
function N(e) {
  const t = e && e.__v_raw;
  return t ? N(t) : e;
}
function Bi(e) {
  return !$(e, "__v_skip") && Object.isExtensible(e) && en(e, "__v_skip", true), e;
}
const Ce = (e) => K(e) ? ts(e) : e, Ot = (e) => K(e) ? xs(e) : e;
function Q(e) {
  return e ? e.__v_isRef === true : false;
}
function Ss(e) {
  return bn(e, false);
}
function Ki(e) {
  return bn(e, true);
}
function bn(e, t) {
  return Q(e) ? e : new qi(e, t);
}
class qi {
  constructor(t, s) {
    this.dep = new ks(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = s ? t : N(t), this._value = s ? t : Ce(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, r = this.__v_isShallow || ae(t) || We(t);
    t = r ? t : N(t), Le(t, s) && (this._rawValue = t, this._value = r ? t : Ce(t), this.dep.trigger());
  }
}
function vn(e) {
  return Q(e) ? e.value : e;
}
const zi = { get: (e, t, s) => t === "__v_raw" ? e : vn(Reflect.get(e, t, s)), set: (e, t, s, r) => {
  const n = e[t];
  return Q(n) && !Q(s) ? (n.value = s, true) : Reflect.set(e, t, s, r);
} };
function yn(e) {
  return Ze(e) ? e : new Proxy(e, zi);
}
class Gi {
  constructor(t, s, r) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new ks(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = xt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = r;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && H !== this) return on(this, true), true;
  }
  get value() {
    const t = this.dep.track();
    return fn(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Ji(e, t, s = false) {
  let r, n;
  return I(e) ? r = e : (r = e.get, n = e.set), new Gi(r, n, s);
}
const Lt = {}, Bt = /* @__PURE__ */ new WeakMap();
let qe;
function Qi(e, t = false, s = qe) {
  if (s) {
    let r = Bt.get(s);
    r || Bt.set(s, r = []), r.push(e);
  }
}
function Yi(e, t, s = V) {
  const { immediate: r, deep: n, once: i, scheduler: o, augmentJob: l, call: f } = s, d = (E) => n ? E : ae(E) || n === false || n === 0 ? $e(E, 1) : $e(E);
  let a, p, S, O, A = false, F = false;
  if (Q(e) ? (p = () => e.value, A = ae(e)) : Ze(e) ? (p = () => d(e), A = true) : R(e) ? (F = true, A = e.some((E) => Ze(E) || ae(E)), p = () => e.map((E) => {
    if (Q(E)) return E.value;
    if (Ze(E)) return d(E);
    if (I(E)) return f ? f(E, 2) : E();
  })) : I(e) ? t ? p = f ? () => f(e, 2) : e : p = () => {
    if (S) {
      Te();
      try {
        S();
      } finally {
        Ee();
      }
    }
    const E = qe;
    qe = a;
    try {
      return f ? f(e, 3, [O]) : e(O);
    } finally {
      qe = E;
    }
  } : p = fe, t && n) {
    const E = p, q = n === true ? 1 / 0 : n;
    p = () => $e(E(), q);
  }
  const X = sn(), D = () => {
    a.stop(), X && X.active && $s(X.effects, a);
  };
  if (i && t) {
    const E = t;
    t = (...q) => {
      E(...q), D();
    };
  }
  let U = F ? new Array(e.length).fill(Lt) : Lt;
  const B = (E) => {
    if (!(!(a.flags & 1) || !a.dirty && !E)) if (t) {
      const q = a.run();
      if (n || A || (F ? q.some((Re, he) => Le(Re, U[he])) : Le(q, U))) {
        S && S();
        const Re = qe;
        qe = a;
        try {
          const he = [q, U === Lt ? void 0 : F && U[0] === Lt ? [] : U, O];
          U = q, f ? f(t, 3, he) : t(...he);
        } finally {
          qe = Re;
        }
      }
    } else a.run();
  };
  return l && l(B), a = new rn(p), a.scheduler = o ? () => o(B, false) : B, O = (E) => Qi(E, false, a), S = a.onStop = () => {
    const E = Bt.get(a);
    if (E) {
      if (f) f(E, 4);
      else for (const q of E) q();
      Bt.delete(a);
    }
  }, t ? r ? B(true) : U = a.run() : o ? o(B.bind(null, true), true) : a.run(), D.pause = a.pause.bind(a), D.resume = a.resume.bind(a), D.stop = D, D;
}
function $e(e, t = 1 / 0, s) {
  if (t <= 0 || !K(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t)) return e;
  if (s.set(e, t), t--, Q(e)) $e(e.value, t, s);
  else if (R(e)) for (let r = 0; r < e.length; r++) $e(e[r], t, s);
  else if (fi(e) || ht(e)) e.forEach((r) => {
    $e(r, t, s);
  });
  else if (hi(e)) {
    for (const r in e) $e(e[r], t, s);
    for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && $e(e[r], t, s);
  }
  return e;
}
function Ct(e, t, s, r) {
  try {
    return r ? e(...r) : e();
  } catch (n) {
    ss(n, t, s);
  }
}
function we(e, t, s, r) {
  if (I(e)) {
    const n = Ct(e, t, s, r);
    return n && Xr(n) && n.catch((i) => {
      ss(i, t, s);
    }), n;
  }
  if (R(e)) {
    const n = [];
    for (let i = 0; i < e.length; i++) n.push(we(e[i], t, s, r));
    return n;
  }
}
function ss(e, t, s, r = true) {
  const n = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || V;
  if (t) {
    let l = t.parent;
    const f = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let p = 0; p < a.length; p++) if (a[p](e, f, d) === false) return;
      }
      l = l.parent;
    }
    if (i) {
      Te(), Ct(i, null, 10, [e, f, d]), Ee();
      return;
    }
  }
  Xi(e, s, n, r, o);
}
function Xi(e, t, s, r = true, n = false) {
  if (n) throw e;
  console.error(e);
}
const te = [];
let be = -1;
const et = [];
let De = null, Ye = 0;
const wn = Promise.resolve();
let Kt = null;
function xn(e) {
  const t = Kt || wn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zi(e) {
  let t = be + 1, s = te.length;
  for (; t < s; ) {
    const r = t + s >>> 1, n = te[r], i = Pt(n);
    i < e || i === e && n.flags & 2 ? t = r + 1 : s = r;
  }
  return t;
}
function Gs(e) {
  if (!(e.flags & 1)) {
    const t = Pt(e), s = te[te.length - 1];
    !s || !(e.flags & 2) && t >= Pt(s) ? te.push(e) : te.splice(Zi(t), 0, e), e.flags |= 1, Sn();
  }
}
function Sn() {
  Kt || (Kt = wn.then(Tn));
}
function On(e) {
  R(e) ? et.push(...e) : De && e.id === -1 ? De.splice(Ye + 1, 0, e) : e.flags & 1 || (et.push(e), e.flags |= 1), Sn();
}
function dr(e, t, s = be + 1) {
  for (; s < te.length; s++) {
    const r = te[s];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      te.splice(s, 1), s--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Pn(e) {
  if (et.length) {
    const t = [...new Set(et)].sort((s, r) => Pt(s) - Pt(r));
    if (et.length = 0, De) {
      De.push(...t);
      return;
    }
    for (De = t, Ye = 0; Ye < De.length; Ye++) {
      const s = De[Ye];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    De = null, Ye = 0;
  }
}
const Pt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Tn(e) {
  try {
    for (be = 0; be < te.length; be++) {
      const t = te[be];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ct(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; be < te.length; be++) {
      const t = te[be];
      t && (t.flags &= -2);
    }
    be = -1, te.length = 0, Pn(), Kt = null, (te.length || et.length) && Tn();
  }
}
let ye = null, En = null;
function qt(e) {
  const t = ye;
  return ye = e, En = e && e.type.__scopeId || null, t;
}
function eo(e, t = ye, s) {
  if (!t || e._n) return e;
  const r = (...n) => {
    r._d && Sr(-1);
    const i = qt(t);
    let o;
    try {
      o = e(...n);
    } finally {
      qt(i), r._d && Sr(1);
    }
    return o;
  };
  return r._n = true, r._c = true, r._d = true, r;
}
function Be(e, t, s, r) {
  const n = e.dirs, i = t && t.dirs;
  for (let o = 0; o < n.length; o++) {
    const l = n[o];
    i && (l.oldValue = i[o].value);
    let f = l.dir[r];
    f && (Te(), we(f, s, 8, [e.el, l, e, t]), Ee());
  }
}
function to(e, t) {
  if (se) {
    let s = se.provides;
    const r = se.parent && se.parent.provides;
    r === s && (s = se.provides = Object.create(r)), s[e] = t;
  }
}
function Wt(e, t, s = false) {
  const r = sr();
  if (r || tt) {
    let n = tt ? tt._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (n && e in n) return n[e];
    if (arguments.length > 1) return s && I(t) ? t.call(r && r.proxy) : t;
  }
}
const so = Symbol.for("v-scx"), ro = () => Wt(so);
function mt(e, t, s) {
  return Cn(e, t, s);
}
function Cn(e, t, s = V) {
  const { immediate: r, deep: n, flush: i, once: o } = s, l = Y({}, s), f = t && r || !t && i !== "post";
  let d;
  if (Et) {
    if (i === "sync") {
      const O = ro();
      d = O.__watcherHandles || (O.__watcherHandles = []);
    } else if (!f) {
      const O = () => {
      };
      return O.stop = fe, O.resume = fe, O.pause = fe, O;
    }
  }
  const a = se;
  l.call = (O, A, F) => we(O, a, A, F);
  let p = false;
  i === "post" ? l.scheduler = (O) => {
    oe(O, a && a.suspense);
  } : i !== "sync" && (p = true, l.scheduler = (O, A) => {
    A ? O() : Gs(O);
  }), l.augmentJob = (O) => {
    t && (O.flags |= 4), p && (O.flags |= 2, a && (O.id = a.uid, O.i = a));
  };
  const S = Yi(e, t, l);
  return Et && (d ? d.push(S) : f && S()), S;
}
function no(e, t, s) {
  const r = this.proxy, n = z(e) ? e.includes(".") ? In(r, e) : () => r[e] : e.bind(r, r);
  let i;
  I(t) ? i = t : (i = t.handler, s = t);
  const o = It(this), l = Cn(n, i.bind(r), s);
  return o(), l;
}
function In(e, t) {
  const s = t.split(".");
  return () => {
    let r = e;
    for (let n = 0; n < s.length && r; n++) r = r[s[n]];
    return r;
  };
}
const io = Symbol("_vte"), oo = (e) => e.__isTeleport, lo = Symbol("_leaveCb");
function Js(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Js(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function co(e, t) {
  return I(e) ? Y({ name: e.name }, t, { setup: e }) : e;
}
function Rn(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const zt = /* @__PURE__ */ new WeakMap();
function _t(e, t, s, r, n = false) {
  if (R(e)) {
    e.forEach((A, F) => _t(A, t && (R(t) ? t[F] : t), s, r, n));
    return;
  }
  if (bt(r) && !n) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && _t(e, t, s, r.component.subTree);
    return;
  }
  const i = r.shapeFlag & 4 ? rr(r.component) : r.el, o = n ? null : i, { i: l, r: f } = e, d = t && t.r, a = l.refs === V ? l.refs = {} : l.refs, p = l.setupState, S = N(p), O = p === V ? Yr : (A) => $(S, A);
  if (d != null && d !== f) {
    if (pr(t), z(d)) a[d] = null, O(d) && (p[d] = null);
    else if (Q(d)) {
      d.value = null;
      const A = t;
      A.k && (a[A.k] = null);
    }
  }
  if (I(f)) Ct(f, l, 12, [o, a]);
  else {
    const A = z(f), F = Q(f);
    if (A || F) {
      const X = () => {
        if (e.f) {
          const D = A ? O(f) ? p[f] : a[f] : f.value;
          if (n) R(D) && $s(D, i);
          else if (R(D)) D.includes(i) || D.push(i);
          else if (A) a[f] = [i], O(f) && (p[f] = a[f]);
          else {
            const U = [i];
            f.value = U, e.k && (a[e.k] = U);
          }
        } else A ? (a[f] = o, O(f) && (p[f] = o)) : F && (f.value = o, e.k && (a[e.k] = o));
      };
      if (o) {
        const D = () => {
          X(), zt.delete(e);
        };
        D.id = -1, zt.set(e, D), oe(D, s);
      } else pr(e), X();
    }
  }
}
function pr(e) {
  const t = zt.get(e);
  t && (t.flags |= 8, zt.delete(e));
}
es().requestIdleCallback;
es().cancelIdleCallback;
const bt = (e) => !!e.type.__asyncLoader, An = (e) => e.type.__isKeepAlive;
function fo(e, t) {
  Mn(e, "a", t);
}
function uo(e, t) {
  Mn(e, "da", t);
}
function Mn(e, t, s = se) {
  const r = e.__wdc || (e.__wdc = () => {
    let n = s;
    for (; n; ) {
      if (n.isDeactivated) return;
      n = n.parent;
    }
    return e();
  });
  if (rs(t, r, s), s) {
    let n = s.parent;
    for (; n && n.parent; ) An(n.parent.vnode) && ao(r, t, s, n), n = n.parent;
  }
}
function ao(e, t, s, r) {
  const n = rs(t, e, r, true);
  Ys(() => {
    $s(r[t], n);
  }, s);
}
function rs(e, t, s = se, r = false) {
  if (s) {
    const n = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Te();
      const l = It(s), f = we(t, s, e, o);
      return l(), Ee(), f;
    });
    return r ? n.unshift(i) : n.push(i), i;
  }
}
const Ie = (e) => (t, s = se) => {
  (!Et || e === "sp") && rs(e, (...r) => t(...r), s);
}, ho = Ie("bm"), Qs = Ie("m"), Fn = Ie("bu"), po = Ie("u"), go = Ie("bum"), Ys = Ie("um"), mo = Ie("sp"), _o = Ie("rtg"), bo = Ie("rtc");
function vo(e, t = se) {
  rs("ec", e, t);
}
const yo = Symbol.for("v-ndc"), Os = (e) => e ? Zn(e) ? rr(e) : Os(e.parent) : null, vt = Y(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => Os(e.parent), $root: (e) => Os(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Nn(e), $forceUpdate: (e) => e.f || (e.f = () => {
  Gs(e.update);
}), $nextTick: (e) => e.n || (e.n = xn.bind(e.proxy)), $watch: (e) => no.bind(e) }), ds = (e, t) => e !== V && !e.__isScriptSetup && $(e, t), wo = { get({ _: e }, t) {
  if (t === "__v_skip") return true;
  const { ctx: s, setupState: r, data: n, props: i, accessCache: o, type: l, appContext: f } = e;
  if (t[0] !== "$") {
    const S = o[t];
    if (S !== void 0) switch (S) {
      case 1:
        return r[t];
      case 2:
        return n[t];
      case 4:
        return s[t];
      case 3:
        return i[t];
    }
    else {
      if (ds(r, t)) return o[t] = 1, r[t];
      if (n !== V && $(n, t)) return o[t] = 2, n[t];
      if ($(i, t)) return o[t] = 3, i[t];
      if (s !== V && $(s, t)) return o[t] = 4, s[t];
      Ps && (o[t] = 0);
    }
  }
  const d = vt[t];
  let a, p;
  if (d) return t === "$attrs" && J(e.attrs, "get", ""), d(e);
  if ((a = l.__cssModules) && (a = a[t])) return a;
  if (s !== V && $(s, t)) return o[t] = 4, s[t];
  if (p = f.config.globalProperties, $(p, t)) return p[t];
}, set({ _: e }, t, s) {
  const { data: r, setupState: n, ctx: i } = e;
  return ds(n, t) ? (n[t] = s, true) : r !== V && $(r, t) ? (r[t] = s, true) : $(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (i[t] = s, true);
}, has({ _: { data: e, setupState: t, accessCache: s, ctx: r, appContext: n, props: i, type: o } }, l) {
  let f;
  return !!(s[l] || e !== V && l[0] !== "$" && $(e, l) || ds(t, l) || $(i, l) || $(r, l) || $(vt, l) || $(n.config.globalProperties, l) || (f = o.__cssModules) && f[l]);
}, defineProperty(e, t, s) {
  return s.get != null ? e._.accessCache[t] = 0 : $(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
} };
function gr(e) {
  return R(e) ? e.reduce((t, s) => (t[s] = null, t), {}) : e;
}
let Ps = true;
function xo(e) {
  const t = Nn(e), s = e.proxy, r = e.ctx;
  Ps = false, t.beforeCreate && mr(t.beforeCreate, e, "bc");
  const { data: n, computed: i, methods: o, watch: l, provide: f, inject: d, created: a, beforeMount: p, mounted: S, beforeUpdate: O, updated: A, activated: F, deactivated: X, beforeDestroy: D, beforeUnmount: U, destroyed: B, unmounted: E, render: q, renderTracked: Re, renderTriggered: he, errorCaptured: Ae, serverPrefetch: Rt, expose: Ve, inheritAttrs: nt, components: At, directives: Mt, filters: os } = t;
  if (d && So(d, r, null), o) for (const k in o) {
    const j = o[k];
    I(j) && (r[k] = j.bind(s));
  }
  if (n) {
    const k = n.call(s, s);
    K(k) && (e.data = ts(k));
  }
  if (Ps = true, i) for (const k in i) {
    const j = i[k], Ue = I(j) ? j.bind(s, s) : I(j.get) ? j.get.bind(s, s) : fe, Ft = !I(j) && I(j.set) ? j.set.bind(s) : fe, ke = Ut({ get: Ue, set: Ft });
    Object.defineProperty(r, k, { enumerable: true, configurable: true, get: () => ke.value, set: (de) => ke.value = de });
  }
  if (l) for (const k in l) Dn(l[k], r, s, k);
  if (f) {
    const k = I(f) ? f.call(s) : f;
    Reflect.ownKeys(k).forEach((j) => {
      to(j, k[j]);
    });
  }
  a && mr(a, e, "c");
  function Z(k, j) {
    R(j) ? j.forEach((Ue) => k(Ue.bind(s))) : j && k(j.bind(s));
  }
  if (Z(ho, p), Z(Qs, S), Z(Fn, O), Z(po, A), Z(fo, F), Z(uo, X), Z(vo, Ae), Z(bo, Re), Z(_o, he), Z(go, U), Z(Ys, E), Z(mo, Rt), R(Ve)) if (Ve.length) {
    const k = e.exposed || (e.exposed = {});
    Ve.forEach((j) => {
      Object.defineProperty(k, j, { get: () => s[j], set: (Ue) => s[j] = Ue, enumerable: true });
    });
  } else e.exposed || (e.exposed = {});
  q && e.render === fe && (e.render = q), nt != null && (e.inheritAttrs = nt), At && (e.components = At), Mt && (e.directives = Mt), Rt && Rn(e);
}
function So(e, t, s = fe) {
  R(e) && (e = Ts(e));
  for (const r in e) {
    const n = e[r];
    let i;
    K(n) ? "default" in n ? i = Wt(n.from || r, n.default, true) : i = Wt(n.from || r) : i = Wt(n), Q(i) ? Object.defineProperty(t, r, { enumerable: true, configurable: true, get: () => i.value, set: (o) => i.value = o }) : t[r] = i;
  }
}
function mr(e, t, s) {
  we(R(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function Dn(e, t, s, r) {
  let n = r.includes(".") ? In(s, r) : () => s[r];
  if (z(e)) {
    const i = t[e];
    I(i) && mt(n, i);
  } else if (I(e)) mt(n, e.bind(s));
  else if (K(e)) if (R(e)) e.forEach((i) => Dn(i, t, s, r));
  else {
    const i = I(e.handler) ? e.handler.bind(s) : t[e.handler];
    I(i) && mt(n, i, e);
  }
}
function Nn(e) {
  const t = e.type, { mixins: s, extends: r } = t, { mixins: n, optionsCache: i, config: { optionMergeStrategies: o } } = e.appContext, l = i.get(t);
  let f;
  return l ? f = l : !n.length && !s && !r ? f = t : (f = {}, n.length && n.forEach((d) => Gt(f, d, o, true)), Gt(f, t, o)), K(t) && i.set(t, f), f;
}
function Gt(e, t, s, r = false) {
  const { mixins: n, extends: i } = t;
  i && Gt(e, i, s, true), n && n.forEach((o) => Gt(e, o, s, true));
  for (const o in t) if (!(r && o === "expose")) {
    const l = Oo[o] || s && s[o];
    e[o] = l ? l(e[o], t[o]) : t[o];
  }
  return e;
}
const Oo = { data: _r, props: br, emits: br, methods: ut, computed: ut, beforeCreate: ee, created: ee, beforeMount: ee, mounted: ee, beforeUpdate: ee, updated: ee, beforeDestroy: ee, beforeUnmount: ee, destroyed: ee, unmounted: ee, activated: ee, deactivated: ee, errorCaptured: ee, serverPrefetch: ee, components: ut, directives: ut, watch: To, provide: _r, inject: Po };
function _r(e, t) {
  return t ? e ? function() {
    return Y(I(e) ? e.call(this, this) : e, I(t) ? t.call(this, this) : t);
  } : t : e;
}
function Po(e, t) {
  return ut(Ts(e), Ts(t));
}
function Ts(e) {
  if (R(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
    return t;
  }
  return e;
}
function ee(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ut(e, t) {
  return e ? Y(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function br(e, t) {
  return e ? R(e) && R(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Y(/* @__PURE__ */ Object.create(null), gr(e), gr(t ?? {})) : t;
}
function To(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = Y(/* @__PURE__ */ Object.create(null), e);
  for (const r in t) s[r] = ee(e[r], t[r]);
  return s;
}
function $n() {
  return { app: null, config: { isNativeTag: Yr, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let Eo = 0;
function Co(e, t) {
  return function(r, n = null) {
    I(r) || (r = Y({}, r)), n != null && !K(n) && (n = null);
    const i = $n(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let f = false;
    const d = i.app = { _uid: Eo++, _component: r, _props: n, _container: null, _context: i, _instance: null, version: ll, get config() {
      return i.config;
    }, set config(a) {
    }, use(a, ...p) {
      return o.has(a) || (a && I(a.install) ? (o.add(a), a.install(d, ...p)) : I(a) && (o.add(a), a(d, ...p))), d;
    }, mixin(a) {
      return i.mixins.includes(a) || i.mixins.push(a), d;
    }, component(a, p) {
      return p ? (i.components[a] = p, d) : i.components[a];
    }, directive(a, p) {
      return p ? (i.directives[a] = p, d) : i.directives[a];
    }, mount(a, p, S) {
      if (!f) {
        const O = d._ceVNode || Pe(r, n);
        return O.appContext = i, S === true ? S = "svg" : S === false && (S = void 0), e(O, a, S), f = true, d._container = a, a.__vue_app__ = d, rr(O.component);
      }
    }, onUnmount(a) {
      l.push(a);
    }, unmount() {
      f && (we(l, d._instance, 16), e(null, d._container), delete d._container.__vue_app__);
    }, provide(a, p) {
      return i.provides[a] = p, d;
    }, runWithContext(a) {
      const p = tt;
      tt = d;
      try {
        return a();
      } finally {
        tt = p;
      }
    } };
    return d;
  };
}
let tt = null;
const Io = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${je(t)}Modifiers`] || e[`${Ge(t)}Modifiers`];
function Ro(e, t, ...s) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || V;
  let n = s;
  const i = t.startsWith("update:"), o = i && Io(r, t.slice(7));
  o && (o.trim && (n = s.map((a) => z(a) ? a.trim() : a)), o.number && (n = s.map(gi)));
  let l, f = r[l = cs(t)] || r[l = cs(je(t))];
  !f && i && (f = r[l = cs(Ge(t))]), f && we(f, e, 6, n);
  const d = r[l + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    e.emitted[l] = true, we(d, e, 6, n);
  }
}
const Ao = /* @__PURE__ */ new WeakMap();
function Ln(e, t, s = false) {
  const r = s ? Ao : t.emitsCache, n = r.get(e);
  if (n !== void 0) return n;
  const i = e.emits;
  let o = {}, l = false;
  if (!I(e)) {
    const f = (d) => {
      const a = Ln(d, t, true);
      a && (l = true, Y(o, a));
    };
    !s && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !i && !l ? (K(e) && r.set(e, null), null) : (R(i) ? i.forEach((f) => o[f] = null) : Y(o, i), K(e) && r.set(e, o), o);
}
function ns(e, t) {
  return !e || !Yt(t) ? false : (t = t.slice(2).replace(/Once$/, ""), $(e, t[0].toLowerCase() + t.slice(1)) || $(e, Ge(t)) || $(e, t));
}
function vr(e) {
  const { type: t, vnode: s, proxy: r, withProxy: n, propsOptions: [i], slots: o, attrs: l, emit: f, render: d, renderCache: a, props: p, data: S, setupState: O, ctx: A, inheritAttrs: F } = e, X = qt(e);
  let D, U;
  try {
    if (s.shapeFlag & 4) {
      const E = n || r, q = E;
      D = ve(d.call(q, E, a, p, O, S, A)), U = l;
    } else {
      const E = t;
      D = ve(E.length > 1 ? E(p, { attrs: l, slots: o, emit: f }) : E(p, null)), U = t.props ? l : Mo(l);
    }
  } catch (E) {
    yt.length = 0, ss(E, e, 1), D = Pe(He);
  }
  let B = D;
  if (U && F !== false) {
    const E = Object.keys(U), { shapeFlag: q } = B;
    E.length && q & 7 && (i && E.some(Ns) && (U = Fo(U, i)), B = st(B, U, false, true));
  }
  return s.dirs && (B = st(B, null, false, true), B.dirs = B.dirs ? B.dirs.concat(s.dirs) : s.dirs), s.transition && Js(B, s.transition), D = B, qt(X), D;
}
const Mo = (e) => {
  let t;
  for (const s in e) (s === "class" || s === "style" || Yt(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Fo = (e, t) => {
  const s = {};
  for (const r in e) (!Ns(r) || !(r.slice(9) in t)) && (s[r] = e[r]);
  return s;
};
function Do(e, t, s) {
  const { props: r, children: n, component: i } = e, { props: o, children: l, patchFlag: f } = t, d = i.emitsOptions;
  if (t.dirs || t.transition) return true;
  if (s && f >= 0) {
    if (f & 1024) return true;
    if (f & 16) return r ? yr(r, o, d) : !!o;
    if (f & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const S = a[p];
        if (o[S] !== r[S] && !ns(d, S)) return true;
      }
    }
  } else return (n || l) && (!l || !l.$stable) ? true : r === o ? false : r ? o ? yr(r, o, d) : true : !!o;
  return false;
}
function yr(e, t, s) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return true;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (t[i] !== e[i] && !ns(s, i)) return true;
  }
  return false;
}
function No({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) (e = t.vnode).el = s, t = t.parent;
    else break;
  }
}
const jn = {}, Wn = () => Object.create(jn), Hn = (e) => Object.getPrototypeOf(e) === jn;
function $o(e, t, s, r = false) {
  const n = {}, i = Wn();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Vn(e, t, n, i);
  for (const o in e.propsOptions[0]) o in n || (n[o] = void 0);
  s ? e.props = r ? n : ki(n) : e.type.props ? e.props = n : e.props = i, e.attrs = i;
}
function Lo(e, t, s, r) {
  const { props: n, attrs: i, vnode: { patchFlag: o } } = e, l = N(n), [f] = e.propsOptions;
  let d = false;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let S = a[p];
        if (ns(e.emitsOptions, S)) continue;
        const O = t[S];
        if (f) if ($(i, S)) O !== i[S] && (i[S] = O, d = true);
        else {
          const A = je(S);
          n[A] = Es(f, l, A, O, e, false);
        }
        else O !== i[S] && (i[S] = O, d = true);
      }
    }
  } else {
    Vn(e, t, n, i) && (d = true);
    let a;
    for (const p in l) (!t || !$(t, p) && ((a = Ge(p)) === p || !$(t, a))) && (f ? s && (s[p] !== void 0 || s[a] !== void 0) && (n[p] = Es(f, l, p, void 0, e, true)) : delete n[p]);
    if (i !== l) for (const p in i) (!t || !$(t, p)) && (delete i[p], d = true);
  }
  d && Oe(e.attrs, "set", "");
}
function Vn(e, t, s, r) {
  const [n, i] = e.propsOptions;
  let o = false, l;
  if (t) for (let f in t) {
    if (dt(f)) continue;
    const d = t[f];
    let a;
    n && $(n, a = je(f)) ? !i || !i.includes(a) ? s[a] = d : (l || (l = {}))[a] = d : ns(e.emitsOptions, f) || (!(f in r) || d !== r[f]) && (r[f] = d, o = true);
  }
  if (i) {
    const f = N(s), d = l || V;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      s[p] = Es(n, f, p, d[p], e, !$(d, p));
    }
  }
  return o;
}
function Es(e, t, s, r, n, i) {
  const o = e[s];
  if (o != null) {
    const l = $(o, "default");
    if (l && r === void 0) {
      const f = o.default;
      if (o.type !== Function && !o.skipFactory && I(f)) {
        const { propsDefaults: d } = n;
        if (s in d) r = d[s];
        else {
          const a = It(n);
          r = d[s] = f.call(null, t), a();
        }
      } else r = f;
      n.ce && n.ce._setProp(s, r);
    }
    o[0] && (i && !l ? r = false : o[1] && (r === "" || r === Ge(s)) && (r = true));
  }
  return r;
}
const jo = /* @__PURE__ */ new WeakMap();
function Un(e, t, s = false) {
  const r = s ? jo : t.propsCache, n = r.get(e);
  if (n) return n;
  const i = e.props, o = {}, l = [];
  let f = false;
  if (!I(e)) {
    const a = (p) => {
      f = true;
      const [S, O] = Un(p, t, true);
      Y(o, S), O && l.push(...O);
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !f) return K(e) && r.set(e, Xe), Xe;
  if (R(i)) for (let a = 0; a < i.length; a++) {
    const p = je(i[a]);
    wr(p) && (o[p] = V);
  }
  else if (i) for (const a in i) {
    const p = je(a);
    if (wr(p)) {
      const S = i[a], O = o[p] = R(S) || I(S) ? { type: S } : Y({}, S), A = O.type;
      let F = false, X = true;
      if (R(A)) for (let D = 0; D < A.length; ++D) {
        const U = A[D], B = I(U) && U.name;
        if (B === "Boolean") {
          F = true;
          break;
        } else B === "String" && (X = false);
      }
      else F = I(A) && A.name === "Boolean";
      O[0] = F, O[1] = X, (F || $(O, "default")) && l.push(p);
    }
  }
  const d = [o, l];
  return K(e) && r.set(e, d), d;
}
function wr(e) {
  return e[0] !== "$" && !dt(e);
}
const Xs = (e) => e === "_" || e === "_ctx" || e === "$stable", Zs = (e) => R(e) ? e.map(ve) : [ve(e)], Wo = (e, t, s) => {
  if (t._n) return t;
  const r = eo((...n) => Zs(t(...n)), s);
  return r._c = false, r;
}, kn = (e, t, s) => {
  const r = e._ctx;
  for (const n in e) {
    if (Xs(n)) continue;
    const i = e[n];
    if (I(i)) t[n] = Wo(n, i, r);
    else if (i != null) {
      const o = Zs(i);
      t[n] = () => o;
    }
  }
}, Bn = (e, t) => {
  const s = Zs(t);
  e.slots.default = () => s;
}, Kn = (e, t, s) => {
  for (const r in t) (s || !Xs(r)) && (e[r] = t[r]);
}, Ho = (e, t, s) => {
  const r = e.slots = Wn();
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (Kn(r, t, s), s && en(r, "_", n, true)) : kn(t, r);
  } else t && Bn(e, t);
}, Vo = (e, t, s) => {
  const { vnode: r, slots: n } = e;
  let i = true, o = V;
  if (r.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? i = false : Kn(n, t, s) : (i = !t.$stable, kn(t, n)), o = t;
  } else t && (Bn(e, t), o = { default: 1 });
  if (i) for (const l in n) !Xs(l) && o[l] == null && delete n[l];
}, oe = qo;
function Uo(e) {
  return ko(e);
}
function ko(e, t) {
  const s = es();
  s.__VUE__ = true;
  const { insert: r, remove: n, patchProp: i, createElement: o, createText: l, createComment: f, setText: d, setElementText: a, parentNode: p, nextSibling: S, setScopeId: O = fe, insertStaticContent: A } = e, F = (c, u, h, b = null, g = null, m = null, w = void 0, y = null, v = !!u.dynamicChildren) => {
    if (c === u) return;
    c && !ft(c, u) && (b = Dt(c), de(c, g, m, true), c = null), u.patchFlag === -2 && (v = false, u.dynamicChildren = null);
    const { type: _, ref: T, shapeFlag: x } = u;
    switch (_) {
      case is:
        X(c, u, h, b);
        break;
      case He:
        D(c, u, h, b);
        break;
      case Ht:
        c == null && U(u, h, b, w);
        break;
      case le:
        At(c, u, h, b, g, m, w, y, v);
        break;
      default:
        x & 1 ? q(c, u, h, b, g, m, w, y, v) : x & 6 ? Mt(c, u, h, b, g, m, w, y, v) : (x & 64 || x & 128) && _.process(c, u, h, b, g, m, w, y, v, ot);
    }
    T != null && g ? _t(T, c && c.ref, m, u || c, !u) : T == null && c && c.ref != null && _t(c.ref, null, m, c, true);
  }, X = (c, u, h, b) => {
    if (c == null) r(u.el = l(u.children), h, b);
    else {
      const g = u.el = c.el;
      u.children !== c.children && d(g, u.children);
    }
  }, D = (c, u, h, b) => {
    c == null ? r(u.el = f(u.children || ""), h, b) : u.el = c.el;
  }, U = (c, u, h, b) => {
    [c.el, c.anchor] = A(c.children, u, h, b, c.el, c.anchor);
  }, B = ({ el: c, anchor: u }, h, b) => {
    let g;
    for (; c && c !== u; ) g = S(c), r(c, h, b), c = g;
    r(u, h, b);
  }, E = ({ el: c, anchor: u }) => {
    let h;
    for (; c && c !== u; ) h = S(c), n(c), c = h;
    n(u);
  }, q = (c, u, h, b, g, m, w, y, v) => {
    if (u.type === "svg" ? w = "svg" : u.type === "math" && (w = "mathml"), c == null) Re(u, h, b, g, m, w, y, v);
    else {
      const _ = c.el && c.el._isVueCE ? c.el : null;
      try {
        _ && _._beginPatch(), Rt(c, u, g, m, w, y, v);
      } finally {
        _ && _._endPatch();
      }
    }
  }, Re = (c, u, h, b, g, m, w, y) => {
    let v, _;
    const { props: T, shapeFlag: x, transition: P, dirs: C } = c;
    if (v = c.el = o(c.type, m, T && T.is, T), x & 8 ? a(v, c.children) : x & 16 && Ae(c.children, v, null, b, g, ps(c, m), w, y), C && Be(c, null, b, "created"), he(v, c, c.scopeId, w, b), T) {
      for (const W in T) W !== "value" && !dt(W) && i(v, W, null, T[W], m, b);
      "value" in T && i(v, "value", null, T.value, m), (_ = T.onVnodeBeforeMount) && _e(_, b, c);
    }
    C && Be(c, null, b, "beforeMount");
    const M = Bo(g, P);
    M && P.beforeEnter(v), r(v, u, h), ((_ = T && T.onVnodeMounted) || M || C) && oe(() => {
      _ && _e(_, b, c), M && P.enter(v), C && Be(c, null, b, "mounted");
    }, g);
  }, he = (c, u, h, b, g) => {
    if (h && O(c, h), b) for (let m = 0; m < b.length; m++) O(c, b[m]);
    if (g) {
      let m = g.subTree;
      if (u === m || Jn(m.type) && (m.ssContent === u || m.ssFallback === u)) {
        const w = g.vnode;
        he(c, w, w.scopeId, w.slotScopeIds, g.parent);
      }
    }
  }, Ae = (c, u, h, b, g, m, w, y, v = 0) => {
    for (let _ = v; _ < c.length; _++) {
      const T = c[_] = y ? Ne(c[_]) : ve(c[_]);
      F(null, T, u, h, b, g, m, w, y);
    }
  }, Rt = (c, u, h, b, g, m, w) => {
    const y = u.el = c.el;
    let { patchFlag: v, dynamicChildren: _, dirs: T } = u;
    v |= c.patchFlag & 16;
    const x = c.props || V, P = u.props || V;
    let C;
    if (h && Ke(h, false), (C = P.onVnodeBeforeUpdate) && _e(C, h, u, c), T && Be(u, c, h, "beforeUpdate"), h && Ke(h, true), (x.innerHTML && P.innerHTML == null || x.textContent && P.textContent == null) && a(y, ""), _ ? Ve(c.dynamicChildren, _, y, h, b, ps(u, g), m) : w || j(c, u, y, null, h, b, ps(u, g), m, false), v > 0) {
      if (v & 16) nt(y, x, P, h, g);
      else if (v & 2 && x.class !== P.class && i(y, "class", null, P.class, g), v & 4 && i(y, "style", x.style, P.style, g), v & 8) {
        const M = u.dynamicProps;
        for (let W = 0; W < M.length; W++) {
          const L = M[W], re = x[L], ne = P[L];
          (ne !== re || L === "value") && i(y, L, re, ne, g, h);
        }
      }
      v & 1 && c.children !== u.children && a(y, u.children);
    } else !w && _ == null && nt(y, x, P, h, g);
    ((C = P.onVnodeUpdated) || T) && oe(() => {
      C && _e(C, h, u, c), T && Be(u, c, h, "updated");
    }, b);
  }, Ve = (c, u, h, b, g, m, w) => {
    for (let y = 0; y < u.length; y++) {
      const v = c[y], _ = u[y], T = v.el && (v.type === le || !ft(v, _) || v.shapeFlag & 198) ? p(v.el) : h;
      F(v, _, T, null, b, g, m, w, true);
    }
  }, nt = (c, u, h, b, g) => {
    if (u !== h) {
      if (u !== V) for (const m in u) !dt(m) && !(m in h) && i(c, m, u[m], null, g, b);
      for (const m in h) {
        if (dt(m)) continue;
        const w = h[m], y = u[m];
        w !== y && m !== "value" && i(c, m, y, w, g, b);
      }
      "value" in h && i(c, "value", u.value, h.value, g);
    }
  }, At = (c, u, h, b, g, m, w, y, v) => {
    const _ = u.el = c ? c.el : l(""), T = u.anchor = c ? c.anchor : l("");
    let { patchFlag: x, dynamicChildren: P, slotScopeIds: C } = u;
    C && (y = y ? y.concat(C) : C), c == null ? (r(_, h, b), r(T, h, b), Ae(u.children || [], h, T, g, m, w, y, v)) : x > 0 && x & 64 && P && c.dynamicChildren && c.dynamicChildren.length === P.length ? (Ve(c.dynamicChildren, P, h, g, m, w, y), (u.key != null || g && u === g.subTree) && qn(c, u, true)) : j(c, u, h, T, g, m, w, y, v);
  }, Mt = (c, u, h, b, g, m, w, y, v) => {
    u.slotScopeIds = y, c == null ? u.shapeFlag & 512 ? g.ctx.activate(u, h, b, w, v) : os(u, h, b, g, m, w, v) : nr(c, u, v);
  }, os = (c, u, h, b, g, m, w) => {
    const y = c.component = tl(c, b, g);
    if (An(c) && (y.ctx.renderer = ot), sl(y, false, w), y.asyncDep) {
      if (g && g.registerDep(y, Z, w), !c.el) {
        const v = y.subTree = Pe(He);
        D(null, v, u, h), c.placeholder = v.el;
      }
    } else Z(y, c, u, h, g, m, w);
  }, nr = (c, u, h) => {
    const b = u.component = c.component;
    if (Do(c, u, h)) if (b.asyncDep && !b.asyncResolved) {
      k(b, u, h);
      return;
    } else b.next = u, b.update();
    else u.el = c.el, b.vnode = u;
  }, Z = (c, u, h, b, g, m, w) => {
    const y = () => {
      if (c.isMounted) {
        let { next: x, bu: P, u: C, parent: M, vnode: W } = c;
        {
          const ge = zn(c);
          if (ge) {
            x && (x.el = W.el, k(c, x, w)), ge.asyncDep.then(() => {
              c.isUnmounted || y();
            });
            return;
          }
        }
        let L = x, re;
        Ke(c, false), x ? (x.el = W.el, k(c, x, w)) : x = W, P && fs(P), (re = x.props && x.props.onVnodeBeforeUpdate) && _e(re, M, x, W), Ke(c, true);
        const ne = vr(c), pe = c.subTree;
        c.subTree = ne, F(pe, ne, p(pe.el), Dt(pe), c, g, m), x.el = ne.el, L === null && No(c, ne.el), C && oe(C, g), (re = x.props && x.props.onVnodeUpdated) && oe(() => _e(re, M, x, W), g);
      } else {
        let x;
        const { el: P, props: C } = u, { bm: M, m: W, parent: L, root: re, type: ne } = c, pe = bt(u);
        Ke(c, false), M && fs(M), !pe && (x = C && C.onVnodeBeforeMount) && _e(x, L, u), Ke(c, true);
        {
          re.ce && re.ce._def.shadowRoot !== false && re.ce._injectChildStyle(ne);
          const ge = c.subTree = vr(c);
          F(null, ge, h, b, c, g, m), u.el = ge.el;
        }
        if (W && oe(W, g), !pe && (x = C && C.onVnodeMounted)) {
          const ge = u;
          oe(() => _e(x, L, ge), g);
        }
        (u.shapeFlag & 256 || L && bt(L.vnode) && L.vnode.shapeFlag & 256) && c.a && oe(c.a, g), c.isMounted = true, u = h = b = null;
      }
    };
    c.scope.on();
    const v = c.effect = new rn(y);
    c.scope.off();
    const _ = c.update = v.run.bind(v), T = c.job = v.runIfDirty.bind(v);
    T.i = c, T.id = c.uid, v.scheduler = () => Gs(T), Ke(c, true), _();
  }, k = (c, u, h) => {
    u.component = c;
    const b = c.vnode.props;
    c.vnode = u, c.next = null, Lo(c, u.props, b, h), Vo(c, u.children, h), Te(), dr(c), Ee();
  }, j = (c, u, h, b, g, m, w, y, v = false) => {
    const _ = c && c.children, T = c ? c.shapeFlag : 0, x = u.children, { patchFlag: P, shapeFlag: C } = u;
    if (P > 0) {
      if (P & 128) {
        Ft(_, x, h, b, g, m, w, y, v);
        return;
      } else if (P & 256) {
        Ue(_, x, h, b, g, m, w, y, v);
        return;
      }
    }
    C & 8 ? (T & 16 && it(_, g, m), x !== _ && a(h, x)) : T & 16 ? C & 16 ? Ft(_, x, h, b, g, m, w, y, v) : it(_, g, m, true) : (T & 8 && a(h, ""), C & 16 && Ae(x, h, b, g, m, w, y, v));
  }, Ue = (c, u, h, b, g, m, w, y, v) => {
    c = c || Xe, u = u || Xe;
    const _ = c.length, T = u.length, x = Math.min(_, T);
    let P;
    for (P = 0; P < x; P++) {
      const C = u[P] = v ? Ne(u[P]) : ve(u[P]);
      F(c[P], C, h, null, g, m, w, y, v);
    }
    _ > T ? it(c, g, m, true, false, x) : Ae(u, h, b, g, m, w, y, v, x);
  }, Ft = (c, u, h, b, g, m, w, y, v) => {
    let _ = 0;
    const T = u.length;
    let x = c.length - 1, P = T - 1;
    for (; _ <= x && _ <= P; ) {
      const C = c[_], M = u[_] = v ? Ne(u[_]) : ve(u[_]);
      if (ft(C, M)) F(C, M, h, null, g, m, w, y, v);
      else break;
      _++;
    }
    for (; _ <= x && _ <= P; ) {
      const C = c[x], M = u[P] = v ? Ne(u[P]) : ve(u[P]);
      if (ft(C, M)) F(C, M, h, null, g, m, w, y, v);
      else break;
      x--, P--;
    }
    if (_ > x) {
      if (_ <= P) {
        const C = P + 1, M = C < T ? u[C].el : b;
        for (; _ <= P; ) F(null, u[_] = v ? Ne(u[_]) : ve(u[_]), h, M, g, m, w, y, v), _++;
      }
    } else if (_ > P) for (; _ <= x; ) de(c[_], g, m, true), _++;
    else {
      const C = _, M = _, W = /* @__PURE__ */ new Map();
      for (_ = M; _ <= P; _++) {
        const ie = u[_] = v ? Ne(u[_]) : ve(u[_]);
        ie.key != null && W.set(ie.key, _);
      }
      let L, re = 0;
      const ne = P - M + 1;
      let pe = false, ge = 0;
      const lt = new Array(ne);
      for (_ = 0; _ < ne; _++) lt[_] = 0;
      for (_ = C; _ <= x; _++) {
        const ie = c[_];
        if (re >= ne) {
          de(ie, g, m, true);
          continue;
        }
        let me;
        if (ie.key != null) me = W.get(ie.key);
        else for (L = M; L <= P; L++) if (lt[L - M] === 0 && ft(ie, u[L])) {
          me = L;
          break;
        }
        me === void 0 ? de(ie, g, m, true) : (lt[me - M] = _ + 1, me >= ge ? ge = me : pe = true, F(ie, u[me], h, null, g, m, w, y, v), re++);
      }
      const lr = pe ? Ko(lt) : Xe;
      for (L = lr.length - 1, _ = ne - 1; _ >= 0; _--) {
        const ie = M + _, me = u[ie], cr = u[ie + 1], fr = ie + 1 < T ? cr.el || Gn(cr) : b;
        lt[_] === 0 ? F(null, me, h, fr, g, m, w, y, v) : pe && (L < 0 || _ !== lr[L] ? ke(me, h, fr, 2) : L--);
      }
    }
  }, ke = (c, u, h, b, g = null) => {
    const { el: m, type: w, transition: y, children: v, shapeFlag: _ } = c;
    if (_ & 6) {
      ke(c.component.subTree, u, h, b);
      return;
    }
    if (_ & 128) {
      c.suspense.move(u, h, b);
      return;
    }
    if (_ & 64) {
      w.move(c, u, h, ot);
      return;
    }
    if (w === le) {
      r(m, u, h);
      for (let x = 0; x < v.length; x++) ke(v[x], u, h, b);
      r(c.anchor, u, h);
      return;
    }
    if (w === Ht) {
      B(c, u, h);
      return;
    }
    if (b !== 2 && _ & 1 && y) if (b === 0) y.beforeEnter(m), r(m, u, h), oe(() => y.enter(m), g);
    else {
      const { leave: x, delayLeave: P, afterLeave: C } = y, M = () => {
        c.ctx.isUnmounted ? n(m) : r(m, u, h);
      }, W = () => {
        m._isLeaving && m[lo](true), x(m, () => {
          M(), C && C();
        });
      };
      P ? P(m, M, W) : W();
    }
    else r(m, u, h);
  }, de = (c, u, h, b = false, g = false) => {
    const { type: m, props: w, ref: y, children: v, dynamicChildren: _, shapeFlag: T, patchFlag: x, dirs: P, cacheIndex: C } = c;
    if (x === -2 && (g = false), y != null && (Te(), _t(y, null, h, c, true), Ee()), C != null && (u.renderCache[C] = void 0), T & 256) {
      u.ctx.deactivate(c);
      return;
    }
    const M = T & 1 && P, W = !bt(c);
    let L;
    if (W && (L = w && w.onVnodeBeforeUnmount) && _e(L, u, c), T & 6) li(c.component, h, b);
    else {
      if (T & 128) {
        c.suspense.unmount(h, b);
        return;
      }
      M && Be(c, null, u, "beforeUnmount"), T & 64 ? c.type.remove(c, u, h, ot, b) : _ && !_.hasOnce && (m !== le || x > 0 && x & 64) ? it(_, u, h, false, true) : (m === le && x & 384 || !g && T & 16) && it(v, u, h), b && ir(c);
    }
    (W && (L = w && w.onVnodeUnmounted) || M) && oe(() => {
      L && _e(L, u, c), M && Be(c, null, u, "unmounted");
    }, h);
  }, ir = (c) => {
    const { type: u, el: h, anchor: b, transition: g } = c;
    if (u === le) {
      oi(h, b);
      return;
    }
    if (u === Ht) {
      E(c);
      return;
    }
    const m = () => {
      n(h), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (c.shapeFlag & 1 && g && !g.persisted) {
      const { leave: w, delayLeave: y } = g, v = () => w(h, m);
      y ? y(c.el, m, v) : v();
    } else m();
  }, oi = (c, u) => {
    let h;
    for (; c !== u; ) h = S(c), n(c), c = h;
    n(u);
  }, li = (c, u, h) => {
    const { bum: b, scope: g, job: m, subTree: w, um: y, m: v, a: _ } = c;
    xr(v), xr(_), b && fs(b), g.stop(), m && (m.flags |= 8, de(w, c, u, h)), y && oe(y, u), oe(() => {
      c.isUnmounted = true;
    }, u);
  }, it = (c, u, h, b = false, g = false, m = 0) => {
    for (let w = m; w < c.length; w++) de(c[w], u, h, b, g);
  }, Dt = (c) => {
    if (c.shapeFlag & 6) return Dt(c.component.subTree);
    if (c.shapeFlag & 128) return c.suspense.next();
    const u = S(c.anchor || c.el), h = u && u[io];
    return h ? S(h) : u;
  };
  let ls = false;
  const or = (c, u, h) => {
    let b;
    c == null ? u._vnode && (de(u._vnode, null, null, true), b = u._vnode.component) : F(u._vnode || null, c, u, null, null, null, h), u._vnode = c, ls || (ls = true, dr(b), Pn(), ls = false);
  }, ot = { p: F, um: de, m: ke, r: ir, mt: os, mc: Ae, pc: j, pbc: Ve, n: Dt, o: e };
  return { render: or, hydrate: void 0, createApp: Co(or) };
}
function ps({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function Ke({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Bo(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function qn(e, t, s = false) {
  const r = e.children, n = t.children;
  if (R(r) && R(n)) for (let i = 0; i < r.length; i++) {
    const o = r[i];
    let l = n[i];
    l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = n[i] = Ne(n[i]), l.el = o.el), !s && l.patchFlag !== -2 && qn(o, l)), l.type === is && (l.patchFlag !== -1 ? l.el = o.el : l.__elIndex = i + (e.type === le ? 1 : 0)), l.type === He && !l.el && (l.el = o.el);
  }
}
function Ko(e) {
  const t = e.slice(), s = [0];
  let r, n, i, o, l;
  const f = e.length;
  for (r = 0; r < f; r++) {
    const d = e[r];
    if (d !== 0) {
      if (n = s[s.length - 1], e[n] < d) {
        t[r] = n, s.push(r);
        continue;
      }
      for (i = 0, o = s.length - 1; i < o; ) l = i + o >> 1, e[s[l]] < d ? i = l + 1 : o = l;
      d < e[s[i]] && (i > 0 && (t[r] = s[i - 1]), s[i] = r);
    }
  }
  for (i = s.length, o = s[i - 1]; i-- > 0; ) s[i] = o, o = t[o];
  return s;
}
function zn(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : zn(t);
}
function xr(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Gn(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Gn(t.subTree) : null;
}
const Jn = (e) => e.__isSuspense;
function qo(e, t) {
  t && t.pendingBranch ? R(e) ? t.effects.push(...e) : t.effects.push(e) : On(e);
}
const le = Symbol.for("v-fgt"), is = Symbol.for("v-txt"), He = Symbol.for("v-cmt"), Ht = Symbol.for("v-stc"), yt = [];
let ce = null;
function at(e = false) {
  yt.push(ce = e ? null : []);
}
function zo() {
  yt.pop(), ce = yt[yt.length - 1] || null;
}
let Tt = 1;
function Sr(e, t = false) {
  Tt += e, e < 0 && ce && t && (ce.hasOnce = true);
}
function Qn(e) {
  return e.dynamicChildren = Tt > 0 ? ce || Xe : null, zo(), Tt > 0 && ce && ce.push(e), e;
}
function jt(e, t, s, r, n, i) {
  return Qn(er(e, t, s, r, n, i, true));
}
function Go(e, t, s, r, n) {
  return Qn(Pe(e, t, s, r, n, true));
}
function Yn(e) {
  return e ? e.__v_isVNode === true : false;
}
function ft(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Xn = ({ key: e }) => e ?? null, Vt = ({ ref: e, ref_key: t, ref_for: s }) => (typeof e == "number" && (e = "" + e), e != null ? z(e) || Q(e) || I(e) ? { i: ye, r: e, k: t, f: !!s } : e : null);
function er(e, t = null, s = null, r = 0, n = null, i = e === le ? 0 : 1, o = false, l = false) {
  const f = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && Xn(t), ref: t && Vt(t), scopeId: En, slotScopeIds: null, children: s, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: i, patchFlag: r, dynamicProps: n, dynamicChildren: null, appContext: null, ctx: ye };
  return l ? (tr(f, s), i & 128 && e.normalize(f)) : s && (f.shapeFlag |= z(s) ? 8 : 16), Tt > 0 && !o && ce && (f.patchFlag > 0 || i & 6) && f.patchFlag !== 32 && ce.push(f), f;
}
const Pe = Jo;
function Jo(e, t = null, s = null, r = 0, n = null, i = false) {
  if ((!e || e === yo) && (e = He), Yn(e)) {
    const l = st(e, t, true);
    return s && tr(l, s), Tt > 0 && !i && ce && (l.shapeFlag & 6 ? ce[ce.indexOf(e)] = l : ce.push(l)), l.patchFlag = -2, l;
  }
  if (ol(e) && (e = e.__vccOpts), t) {
    t = Qo(t);
    let { class: l, style: f } = t;
    l && !z(l) && (t.class = Ws(l)), K(f) && (zs(f) && !R(f) && (f = Y({}, f)), t.style = js(f));
  }
  const o = z(e) ? 1 : Jn(e) ? 128 : oo(e) ? 64 : K(e) ? 4 : I(e) ? 2 : 0;
  return er(e, t, s, r, n, o, i, true);
}
function Qo(e) {
  return e ? zs(e) || Hn(e) ? Y({}, e) : e : null;
}
function st(e, t, s = false, r = false) {
  const { props: n, ref: i, patchFlag: o, children: l, transition: f } = e, d = t ? Xo(n || {}, t) : n, a = { __v_isVNode: true, __v_skip: true, type: e.type, props: d, key: d && Xn(d), ref: t && t.ref ? s && i ? R(i) ? i.concat(Vt(t)) : [i, Vt(t)] : Vt(t) : i, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: l, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== le ? o === -1 ? 16 : o | 16 : o, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: f, component: e.component, suspense: e.suspense, ssContent: e.ssContent && st(e.ssContent), ssFallback: e.ssFallback && st(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
  return f && r && Js(a, f.clone(a)), a;
}
function Cs(e = " ", t = 0) {
  return Pe(is, null, e, t);
}
function Yo(e = "", t = false) {
  return t ? (at(), Go(He, null, e)) : Pe(He, null, e);
}
function ve(e) {
  return e == null || typeof e == "boolean" ? Pe(He) : R(e) ? Pe(le, null, e.slice()) : Yn(e) ? Ne(e) : Pe(is, null, String(e));
}
function Ne(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : st(e);
}
function tr(e, t) {
  let s = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (R(t)) s = 16;
  else if (typeof t == "object") if (r & 65) {
    const n = t.default;
    n && (n._c && (n._d = false), tr(e, n()), n._c && (n._d = true));
    return;
  } else {
    s = 32;
    const n = t._;
    !n && !Hn(t) ? t._ctx = ye : n === 3 && ye && (ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else I(t) ? (t = { default: t, _ctx: ye }, s = 32) : (t = String(t), r & 64 ? (s = 16, t = [Cs(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Xo(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    for (const n in r) if (n === "class") t.class !== r.class && (t.class = Ws([t.class, r.class]));
    else if (n === "style") t.style = js([t.style, r.style]);
    else if (Yt(n)) {
      const i = t[n], o = r[n];
      o && i !== o && !(R(i) && i.includes(o)) && (t[n] = i ? [].concat(i, o) : o);
    } else n !== "" && (t[n] = r[n]);
  }
  return t;
}
function _e(e, t, s, r = null) {
  we(e, t, 7, [s, r]);
}
const Zo = $n();
let el = 0;
function tl(e, t, s) {
  const r = e.type, n = (t ? t.appContext : e.appContext) || Zo, i = { uid: el++, vnode: e, type: r, parent: t, appContext: n, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new Si(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(n.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: Un(r, n), emitsOptions: Ln(r, n), emit: null, emitted: null, propsDefaults: V, inheritAttrs: r.inheritAttrs, ctx: V, data: V, props: V, attrs: V, slots: V, refs: V, setupState: V, setupContext: null, suspense: s, suspenseId: s ? s.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Ro.bind(null, i), e.ce && e.ce(i), i;
}
let se = null;
const sr = () => se || ye;
let Jt, Is;
{
  const e = es(), t = (s, r) => {
    let n;
    return (n = e[s]) || (n = e[s] = []), n.push(r), (i) => {
      n.length > 1 ? n.forEach((o) => o(i)) : n[0](i);
    };
  };
  Jt = t("__VUE_INSTANCE_SETTERS__", (s) => se = s), Is = t("__VUE_SSR_SETTERS__", (s) => Et = s);
}
const It = (e) => {
  const t = se;
  return Jt(e), e.scope.on(), () => {
    e.scope.off(), Jt(t);
  };
}, Or = () => {
  se && se.scope.off(), Jt(null);
};
function Zn(e) {
  return e.vnode.shapeFlag & 4;
}
let Et = false;
function sl(e, t = false, s = false) {
  t && Is(t);
  const { props: r, children: n } = e.vnode, i = Zn(e);
  $o(e, r, i, t), Ho(e, n, s || t);
  const o = i ? rl(e, t) : void 0;
  return t && Is(false), o;
}
function rl(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, wo);
  const { setup: r } = s;
  if (r) {
    Te();
    const n = e.setupContext = r.length > 1 ? il(e) : null, i = It(e), o = Ct(r, e, 0, [e.props, n]), l = Xr(o);
    if (Ee(), i(), (l || e.sp) && !bt(e) && Rn(e), l) {
      if (o.then(Or, Or), t) return o.then((f) => {
        Pr(e, f);
      }).catch((f) => {
        ss(f, e, 0);
      });
      e.asyncDep = o;
    } else Pr(e, o);
  } else ei(e);
}
function Pr(e, t, s) {
  I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : K(t) && (e.setupState = yn(t)), ei(e);
}
function ei(e, t, s) {
  const r = e.type;
  e.render || (e.render = r.render || fe);
  {
    const n = It(e);
    Te();
    try {
      xo(e);
    } finally {
      Ee(), n();
    }
  }
}
const nl = { get(e, t) {
  return J(e, "get", ""), e[t];
} };
function il(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return { attrs: new Proxy(e.attrs, nl), slots: e.slots, emit: e.emit, expose: t };
}
function rr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(yn(Bi(e.exposed)), { get(t, s) {
    if (s in t) return t[s];
    if (s in vt) return vt[s](e);
  }, has(t, s) {
    return s in t || s in vt;
  } })) : e.proxy;
}
function ol(e) {
  return I(e) && "__vccOpts" in e;
}
const Ut = (e, t) => Ji(e, t, Et), ll = "3.5.26";
let Rs;
const Tr = typeof window < "u" && window.trustedTypes;
if (Tr) try {
  Rs = Tr.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
const ti = Rs ? (e) => Rs.createHTML(e) : (e) => e, cl = "http://www.w3.org/2000/svg", fl = "http://www.w3.org/1998/Math/MathML", Se = typeof document < "u" ? document : null, Er = Se && Se.createElement("template"), ul = { insert: (e, t, s) => {
  t.insertBefore(e, s || null);
}, remove: (e) => {
  const t = e.parentNode;
  t && t.removeChild(e);
}, createElement: (e, t, s, r) => {
  const n = t === "svg" ? Se.createElementNS(cl, e) : t === "mathml" ? Se.createElementNS(fl, e) : s ? Se.createElement(e, { is: s }) : Se.createElement(e);
  return e === "select" && r && r.multiple != null && n.setAttribute("multiple", r.multiple), n;
}, createText: (e) => Se.createTextNode(e), createComment: (e) => Se.createComment(e), setText: (e, t) => {
  e.nodeValue = t;
}, setElementText: (e, t) => {
  e.textContent = t;
}, parentNode: (e) => e.parentNode, nextSibling: (e) => e.nextSibling, querySelector: (e) => Se.querySelector(e), setScopeId(e, t) {
  e.setAttribute(t, "");
}, insertStaticContent(e, t, s, r, n, i) {
  const o = s ? s.previousSibling : t.lastChild;
  if (n && (n === i || n.nextSibling)) for (; t.insertBefore(n.cloneNode(true), s), !(n === i || !(n = n.nextSibling)); ) ;
  else {
    Er.innerHTML = ti(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
    const l = Er.content;
    if (r === "svg" || r === "mathml") {
      const f = l.firstChild;
      for (; f.firstChild; ) l.appendChild(f.firstChild);
      l.removeChild(f);
    }
    t.insertBefore(l, s);
  }
  return [o ? o.nextSibling : t.firstChild, s ? s.previousSibling : t.lastChild];
} }, al = Symbol("_vtc");
function hl(e, t, s) {
  const r = e[al];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Cr = Symbol("_vod"), dl = Symbol("_vsh"), si = Symbol("");
function pl(e) {
  const t = sr();
  if (!t) return;
  const s = t.ut = (n = e(t.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((i) => Qt(i, n));
  }, r = () => {
    const n = e(t.proxy);
    t.ce ? Qt(t.ce, n) : As(t.subTree, n), s(n);
  };
  Fn(() => {
    On(r);
  }), Qs(() => {
    mt(r, fe, { flush: "post" });
    const n = new MutationObserver(r);
    n.observe(t.subTree.el.parentNode, { childList: true }), Ys(() => n.disconnect());
  });
}
function As(e, t) {
  if (e.shapeFlag & 128) {
    const s = e.suspense;
    e = s.activeBranch, s.pendingBranch && !s.isHydrating && s.effects.push(() => {
      As(s.activeBranch, t);
    });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) Qt(e.el, t);
  else if (e.type === le) e.children.forEach((s) => As(s, t));
  else if (e.type === Ht) {
    let { el: s, anchor: r } = e;
    for (; s && (Qt(s, t), s !== r); ) s = s.nextSibling;
  }
}
function Qt(e, t) {
  if (e.nodeType === 1) {
    const s = e.style;
    let r = "";
    for (const n in t) {
      const i = xi(t[n]);
      s.setProperty(`--${n}`, i), r += `--${n}: ${i};`;
    }
    s[si] = r;
  }
}
const gl = /(?:^|;)\s*display\s*:/;
function ml(e, t, s) {
  const r = e.style, n = z(s);
  let i = false;
  if (s && !n) {
    if (t) if (z(t)) for (const o of t.split(";")) {
      const l = o.slice(0, o.indexOf(":")).trim();
      s[l] == null && kt(r, l, "");
    }
    else for (const o in t) s[o] == null && kt(r, o, "");
    for (const o in s) o === "display" && (i = true), kt(r, o, s[o]);
  } else if (n) {
    if (t !== s) {
      const o = r[si];
      o && (s += ";" + o), r.cssText = s, i = gl.test(s);
    }
  } else t && e.removeAttribute("style");
  Cr in e && (e[Cr] = i ? r.display : "", e[dl] && (r.display = "none"));
}
const Ir = /\s*!important$/;
function kt(e, t, s) {
  if (R(s)) s.forEach((r) => kt(e, t, r));
  else if (s == null && (s = ""), t.startsWith("--")) e.setProperty(t, s);
  else {
    const r = _l(e, t);
    Ir.test(s) ? e.setProperty(Ge(r), s.replace(Ir, ""), "important") : e[r] = s;
  }
}
const Rr = ["Webkit", "Moz", "ms"], gs = {};
function _l(e, t) {
  const s = gs[t];
  if (s) return s;
  let r = je(t);
  if (r !== "filter" && r in e) return gs[t] = r;
  r = Zr(r);
  for (let n = 0; n < Rr.length; n++) {
    const i = Rr[n] + r;
    if (i in e) return gs[t] = i;
  }
  return t;
}
const Ar = "http://www.w3.org/1999/xlink";
function Mr(e, t, s, r, n, i = wi(t)) {
  r && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(Ar, t.slice(6, t.length)) : e.setAttributeNS(Ar, t, s) : s == null || i && !tn(s) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : rt(s) ? String(s) : s);
}
function Fr(e, t, s, r, n) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? ti(s) : s);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, f = s == null ? e.type === "checkbox" ? "on" : "" : String(s);
    (l !== f || !("_value" in e)) && (e.value = f), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let o = false;
  if (s === "" || s == null) {
    const l = typeof e[t];
    l === "boolean" ? s = tn(s) : s == null && l === "string" ? (s = "", o = true) : l === "number" && (s = 0, o = true);
  }
  try {
    e[t] = s;
  } catch {
  }
  o && e.removeAttribute(n || t);
}
function bl(e, t, s, r) {
  e.addEventListener(t, s, r);
}
function vl(e, t, s, r) {
  e.removeEventListener(t, s, r);
}
const Dr = Symbol("_vei");
function yl(e, t, s, r, n = null) {
  const i = e[Dr] || (e[Dr] = {}), o = i[t];
  if (r && o) o.value = r;
  else {
    const [l, f] = wl(t);
    if (r) {
      const d = i[t] = Ol(r, n);
      bl(e, l, d, f);
    } else o && (vl(e, l, o, f), i[t] = void 0);
  }
}
const Nr = /(?:Once|Passive|Capture)$/;
function wl(e) {
  let t;
  if (Nr.test(e)) {
    t = {};
    let r;
    for (; r = e.match(Nr); ) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = true;
  }
  return [e[2] === ":" ? e.slice(3) : Ge(e.slice(2)), t];
}
let ms = 0;
const xl = Promise.resolve(), Sl = () => ms || (xl.then(() => ms = 0), ms = Date.now());
function Ol(e, t) {
  const s = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= s.attached) return;
    we(Pl(r, s.value), t, 5, [r]);
  };
  return s.value = e, s.attached = Sl(), s;
}
function Pl(e, t) {
  if (R(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = true;
    }, t.map((r) => (n) => !n._stopped && r && r(n));
  } else return t;
}
const $r = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Tl = (e, t, s, r, n, i) => {
  const o = n === "svg";
  t === "class" ? hl(e, r, o) : t === "style" ? ml(e, s, r) : Yt(t) ? Ns(t) || yl(e, t, s, r, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : El(e, t, r, o)) ? (Fr(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Mr(e, t, r, o, i, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !z(r)) ? Fr(e, je(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Mr(e, t, r, o));
};
function El(e, t, s, r) {
  if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && $r(t) && I(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
  if (t === "width" || t === "height") {
    const n = e.tagName;
    if (n === "IMG" || n === "VIDEO" || n === "CANVAS" || n === "SOURCE") return false;
  }
  return $r(t) && z(s) ? false : t in e;
}
const Cl = Y({ patchProp: Tl }, ul);
let Lr;
function Il() {
  return Lr || (Lr = Uo(Cl));
}
const Rl = ((...e) => {
  const t = Il().createApp(...e), { mount: s } = t;
  return t.mount = (r) => {
    const n = Ml(r);
    if (!n) return;
    const i = t._component;
    !I(i) && !i.render && !i.template && (i.template = n.innerHTML), n.nodeType === 1 && (n.textContent = "");
    const o = s(n, false, Al(n));
    return n instanceof Element && (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")), o;
  }, t;
});
function Al(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Ml(e) {
  return z(e) ? document.querySelector(e) : e;
}
const Ms = { value: null };
function Fl() {
  if (!Ms.value) throw new Error("global config is unset");
  return Ms.value;
}
function Dl(e) {
  Ms.value = e;
}
function Nl() {
  const t = `
@font-face {
  font-family: "MiSans";
  src: url("${Fl().fontPrefix.replaceAll("\\", "/")}/MiSansVF.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
}`, s = document.createElement("style");
  s.textContent = t, document.head.appendChild(s);
}
class jr {
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
class $l {
  info(t, s) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} INFO [${t}] ${s(new jr()).build()}`);
  }
  warn(t, s) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} WARN [${t}] ${s(new jr()).build()}`);
  }
  error(t, s) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} ERROR [${t}] ${s.stack ?? JSON.stringify(s)}`);
  }
}
const _s = new $l();
class Ll {
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
  async register(t, s) {
    const r = await s, n = Object.keys(r).find((f) => f.endsWith("Service")) ?? "", i = Object.keys(r).find((f) => f.endsWith("Protocol")) ?? "", o = r[n], l = r[i];
    if (!o) throw new Error(`not service defined in register service file: ${t}`);
    if (!l) throw new Error(`not protocol defined in register service file: ${t}`);
    this.serviceCtors.set(t, o), this.protocolCtors.set(t, l), await this.transport.notifyServiceReady(t), this.initializeWithMetrics(t);
  }
  getService(t) {
    if (!this.serviceCtors.has(t)) throw new Error(`service "${t}" is not belongs to this worker (with services: ${[...this.serviceCtors.keys()].join(",")}), use "getServiceProtocol" instead`);
    let s = this.instances.get(t);
    if (!s) {
      const r = this.serviceCtors.get(t);
      if (!r) throw new Error("service is not registered");
      s = new r(), this.instances.set(t, s), this.instnacePWRs.has(t) || this.instnacePWRs.set(t, Promise.withResolvers()), this.instnacePWRs.get(t).resolve(s);
    }
    return s;
  }
  async getServiceWhenReady(t) {
    return this.instnacePWRs.has(t) || this.instnacePWRs.set(t, Promise.withResolvers()), await this.instnacePWRs.get(t).promise;
  }
  getServiceProtocol(t) {
    if (this.serviceCtors.get(t)) {
      let s = this.protocols.get(t);
      if (!s) {
        const r = this.protocolCtors.get(t);
        if (!r) throw new Error("service protocol is not registered");
        const n = this.getService(t);
        if (!n) throw new Error("service instance not found when create service protocol");
        s = new r(n), this.protocols.set(t, s);
      }
      return s;
    } else {
      if (!this.transport) throw new Error("transport is uninitialized");
      return this.transport.getProxy(t);
    }
  }
  async initializeWithMetrics(t) {
    const s = this.getService(t), r = performance.now();
    _s.info("service_init", (n) => n.bold(t).text("start init..."));
    try {
      await s.initialize();
    } catch (n) {
      _s.error("service_init", n);
    }
    _s.info("service_init", (n) => n.bold(t).text("init cost").time(performance.now() - r));
  }
}
var ri = ((e) => (e.main = "main", e.rendererMain = "rendererMain", e.rendererLyrics = "rendererLyrics", e.rendererUpdate = "rendererUpdate", e.rendererFeedback = "rendererFeedback", e.rendererImagePreview = "rendererImagePreview", e.rendererTaskbarWidget = "rendererTaskbarWidget", e.rendererTaskbarWidgetShadow = "rendererTaskbarWidgetShadow", e))(ri || {});
let Wr = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, s) => (s &= 63, s < 36 ? t += s.toString(36) : s < 62 ? t += (s - 26).toString(36).toUpperCase() : s > 62 ? t += "-" : t += "_", t), "");
class wt {
  _promise;
  _resolve;
  _reject;
  _isDone;
  _isError;
  _error;
  _value;
  constructor(t) {
    this._isDone = false, this._isError = false, this._promise = t ?? new Promise((s, r) => {
      this._resolve = s, this._reject = r;
    });
  }
  static createPending() {
    return new wt();
  }
  static createDone(t) {
    const s = new wt();
    return s.resolve(t), s;
  }
  static createAsync(t) {
    return new wt(t());
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
class jl {
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
    let s = this.proxies.get(t);
    return s || (s = new Proxy({}, { get: (r, n) => {
      if (typeof n != "string") throw new TypeError(`service protocol method name(${String(n)}) must be a string`);
      return async (...i) => {
        const o = Wr(), l = new wt();
        this.requests.set(o, l);
        const f = {};
        for (const [a, p] of i.entries()) if (p instanceof Function) {
          const S = Wr();
          this.callbacks.set(S, i[a]), i[a] = null, f[a] = S;
        }
        await this.send({ type: "method.invoke", fromWorkerId: this.currentWorker, toServiceId: t, methodName: n, requestId: o, arguments: i, callbacks: f });
        const d = await l.get();
        if (d.type !== "method.return") throw new Error("internal error: request proxy receive an invoke message as result");
        if (d.return.type === "error") throw new Error(d.return.error);
        return d.return.result;
      };
    } }), this.proxies.set(t, s)), s;
  }
  async handleReceivedMessage(t) {
    switch (t.type) {
      case "method.invoke": {
        const s = [...t.arguments];
        for (const [n, i] of Object.entries(t.callbacks)) {
          const o = Number.parseInt(n);
          s[o] = async (...l) => {
            await this.send({ type: "method.callback", fromWorkerId: this.currentWorker, toWorkerId: t.fromWorkerId, serviceId: t.toServiceId, callbackId: i, arguments: l });
          };
        }
        const r = this.initializer.getServiceProtocol(t.toServiceId);
        try {
          const n = await r[t.methodName](...s);
          await this.send({ type: "method.return", fromServiceId: t.toServiceId, toWorkerId: t.fromWorkerId, methodName: t.methodName, requestId: t.requestId, return: { type: "success", result: n } });
        } catch (n) {
          console.error(n), await this.send({ type: "method.return", fromServiceId: t.toServiceId, toWorkerId: t.fromWorkerId, methodName: t.methodName, requestId: t.requestId, return: { type: "error", error: n instanceof Error ? n.message : String(n) } });
        }
        break;
      }
      case "method.return": {
        const s = this.requests.get(t.requestId);
        if (!s) {
          console.warn(new Error(`request(id:${t.requestId}) is not belongs to this worker`));
          return;
        }
        s.resolve(t), this.requests.delete(t.requestId);
        break;
      }
      case "method.callback": {
        const s = this.callbacks.get(t.callbackId);
        if (!s) return;
        s(...t.arguments);
        break;
      }
    }
  }
}
class Wl extends jl {
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
globalThis.createServiceInitializer = () => new Ll({ workerId: ri.rendererTaskbarWidgetShadow, transport: (e) => new Wl(e) });
const ni = createServiceInitializer();
var Hr;
const ii = typeof window < "u";
ii && ((Hr = window?.navigator) != null && Hr.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Hl(e) {
  return typeof e == "function" ? e() : vn(e);
}
function Vl(e) {
  return e;
}
function Ul(e) {
  return sn() ? (Oi(e), true) : false;
}
function kl(e, t = true) {
  sr() ? Qs(e) : t ? e() : xn(e);
}
function Bl(e) {
  var t;
  const s = Hl(e);
  return (t = s?.$el) != null ? t : s;
}
const Kl = ii ? window : void 0;
function ql(e, t = false) {
  const s = Ss(), r = () => s.value = !!e();
  return r(), kl(r, t), s;
}
const Vr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ur = "__vueuse_ssr_handlers__";
Vr[Ur] = Vr[Ur] || {};
var kr = Object.getOwnPropertySymbols, zl = Object.prototype.hasOwnProperty, Gl = Object.prototype.propertyIsEnumerable, Jl = (e, t) => {
  var s = {};
  for (var r in e) zl.call(e, r) && t.indexOf(r) < 0 && (s[r] = e[r]);
  if (e != null && kr) for (var r of kr(e)) t.indexOf(r) < 0 && Gl.call(e, r) && (s[r] = e[r]);
  return s;
};
function Ql(e, t, s = {}) {
  const r = s, { window: n = Kl } = r, i = Jl(r, ["window"]);
  let o;
  const l = ql(() => n && "ResizeObserver" in n), f = () => {
    o && (o.disconnect(), o = void 0);
  }, d = mt(() => Bl(e), (p) => {
    f(), l.value && n && p && (o = new ResizeObserver(t), o.observe(p, i));
  }, { immediate: true, flush: "post" }), a = () => {
    f(), d();
  };
  return Ul(a), { isSupported: l, stop: a };
}
var Br;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(Br || (Br = {}));
var Yl = Object.defineProperty, Kr = Object.getOwnPropertySymbols, Xl = Object.prototype.hasOwnProperty, Zl = Object.prototype.propertyIsEnumerable, qr = (e, t, s) => t in e ? Yl(e, t, { enumerable: true, configurable: true, writable: true, value: s }) : e[t] = s, ec = (e, t) => {
  for (var s in t || (t = {})) Xl.call(t, s) && qr(e, s, t[s]);
  if (Kr) for (var s of Kr(t)) Zl.call(t, s) && qr(e, s, t[s]);
  return e;
};
const tc = { easeInSine: [0.12, 0, 0.39, 0], easeOutSine: [0.61, 1, 0.88, 1], easeInOutSine: [0.37, 0, 0.63, 1], easeInQuad: [0.11, 0, 0.5, 0], easeOutQuad: [0.5, 1, 0.89, 1], easeInOutQuad: [0.45, 0, 0.55, 1], easeInCubic: [0.32, 0, 0.67, 0], easeOutCubic: [0.33, 1, 0.68, 1], easeInOutCubic: [0.65, 0, 0.35, 1], easeInQuart: [0.5, 0, 0.75, 0], easeOutQuart: [0.25, 1, 0.5, 1], easeInOutQuart: [0.76, 0, 0.24, 1], easeInQuint: [0.64, 0, 0.78, 0], easeOutQuint: [0.22, 1, 0.36, 1], easeInOutQuint: [0.83, 0, 0.17, 1], easeInExpo: [0.7, 0, 0.84, 0], easeOutExpo: [0.16, 1, 0.3, 1], easeInOutExpo: [0.87, 0, 0.13, 1], easeInCirc: [0.55, 0, 1, 0.45], easeOutCirc: [0, 0.55, 0.45, 1], easeInOutCirc: [0.85, 0, 0.15, 1], easeInBack: [0.36, 0, 0.66, -0.56], easeOutBack: [0.34, 1.56, 0.64, 1], easeInOutBack: [0.68, -0.6, 0.32, 1.6] };
ec({ linear: Vl }, tc);
function zr(e) {
  return ni.getServiceProtocol(e);
}
var Fs = ((e) => (e.storage = "storage", e.sharedState = "sharedState", e.request = "request", e.queue = "queue", e.player = "player", e.window = "window", e.user = "user", e.collect = "collect", e.internalCheck = "internalCheck", e.update = "update", e.appSettings = "appSettings", e.utils = "utils", e.debug = "debug", e.applog = "applog", e.renderer = "renderer", e.commerce = "commerce", e.serverPush = "serverPush", e.shortcut = "shortcut", e.desktopLyrics = "desktopLyrics", e.startup = "startup", e.notification = "notification", e.freqCtrl = "freqCtrl", e.resPreload = "resPreload", e.playerProxy = "playerProxy", e.imagePreviewer = "imagePreviewer", e.appClock = "clock", e.taskbarWidget = "taskbarWidget", e))(Fs || {}), Me = ((e) => (e.PlayOrPause = "PlayOrPause", e.PrevTrack = "PrevTrack", e.NextTrack = "NextTrack", e.VolumeUp = "VolumeUp", e.VolumeDown = "VolumeDown", e.Like = "Like", e.Dislike = "Dislike", e))(Me || {});
const Gr = "higher", sc = { queue: { appVisibility: { isPlayerVisible: true }, queue: null }, player: { isPlaying: false, isLoading: false, isMuted: false, volume: 0.3, quality: Gr, playingQuality: Gr, availableQualities: [], playableQualities: [], overrideQuality: void 0, progressPercent: 0, progressSeconds: 0, durationSeconds: 0, mediaEtParams: {}, isInitialPlay: true, currentAudioEffect: null }, user: { isLoading: false, info: null }, collect: { playable: {}, playlist: {}, album: {}, artist: {}, user: {} }, internalCheck: { isPassed: false }, debug: { updateProgress: "", latestTronBuildId: "", latestVersion: "" }, window: { windows: {}, isInactive: false, closeActionType: "exit" }, commerce: { commerceInfo: void 0, purchasedDigitalAlbumsIds: [], isAdFree: false, isVip: false, isFreeVip: false, vipExpireAt: 0, hasPlayEntitlement: false, type: "free", audioEffects: [] }, update: { isUpdateButtonVisible: false, isUpdateDialogVisible: false, updateType: false, isUpdating: false, isFailed: false }, shortcut: { isGlobalShortcutEnabled: false, shortcuts: { [Me.PlayOrPause]: { inApp: "", global: "" }, [Me.PrevTrack]: { inApp: "", global: "" }, [Me.NextTrack]: { inApp: "", global: "" }, [Me.VolumeUp]: { inApp: "", global: "" }, [Me.VolumeDown]: { inApp: "", global: "" }, [Me.Like]: { inApp: "", global: "" }, [Me.Dislike]: { inApp: "", global: "" } } }, desktopLyrics: { settings: { enabled: false, textSize: 24, textColor: "light", showTranslation: true, isLocked: false }, hover: false, menuVisible: false }, startup: { isAutoStartup: false }, notification: { isNotificationEnabled: true }, taskbarWidget: { enabled: false, autoStart: true, preferredSide: void 0, widgetState: "docked", isDragging: false, inDragRegion: false, snapStage: null, dockedStyle: "nano", theme: "dark", hover: false }, region: { abroadType: "0" } }, Jr = ts(/* @__PURE__ */ new Map());
function rc(e) {
  let t = Jr.get(e);
  return t || (t = Ki(sc[e]), Jr.set(e, t), zr(Fs.sharedState).get(e).then((s) => {
    t.value = s;
  }), zr(Fs.sharedState).onUpdate(e, (s) => {
    t.value = s;
  })), t;
}
function nc(e) {
  return rc(e);
}
const ic = ["data-theme", "data-snap-stage"], oc = ["viewBox", "width", "height"], lc = ["x", "y", "width", "height", "rx", "ry"], Qr = 8, Qe = 1, cc = "4 4", fc = co({ __name: "Shadow", setup(e) {
  pl((l) => ({ v279b8e0b: Qr }));
  const t = nc("taskbarWidget"), s = Ut(() => t.value.theme === "dark"), r = Ut(() => t.value.snapStage), n = Ss(), i = Ss({ width: 0, height: 0 });
  Ql(n, (l) => {
    const f = l[0];
    f && (i.value = { width: f.contentRect.width, height: f.contentRect.height });
  });
  const o = Ut(() => {
    const l = i.value.width, f = i.value.height, d = Qe / 2;
    return { viewBox: `0 0 ${l} ${f}`, x: d, y: d, width: Math.max(l - Qe, 0), height: Math.max(f - Qe, 0), rx: Math.max(Qr - d, 0) };
  });
  return (l, f) => (at(), jt("div", { ref_key: "indicatorRef", ref: n, class: "shadow-indicator", "data-theme": s.value ? "dark" : "light", "data-snap-stage": r.value, style: {} }, [o.value.width > 0 && o.value.height > 0 ? (at(), jt("svg", { key: 0, class: "outline", viewBox: o.value.viewBox, width: o.value.width + Qe, height: o.value.height + Qe, "aria-hidden": "true" }, [er("rect", { x: o.value.x, y: o.value.y, width: o.value.width, height: o.value.height, rx: o.value.rx, ry: o.value.rx, fill: "none", "stroke-width": Qe, "stroke-dasharray": cc, stroke: "currentColor" }, null, 8, lc)], 8, oc)) : Yo("", true), r.value === "confirm" ? (at(), jt(le, { key: 1 }, [Cs(" \u677E\u624B\u56FA\u5B9A\u64AD\u63A7 ")], 64)) : (at(), jt(le, { key: 2 }, [Cs(" \u5C06\u64AD\u63A7\u79FB\u52A8\u5230\u6B64\u5904 ")], 64))], 8, ic));
} }), uc = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, n] of t) s[r] = n;
  return s;
}, ac = uc(fc, [["__scopeId", "data-v-908b8b14"]]);
async function hc() {
  const t = new URLSearchParams(window.location.search).get("global_config"), s = JSON.parse(t ?? "{}");
  Dl(s), await ni.initialize(), Nl(), Rl(ac).mount("#app");
}
hc();
