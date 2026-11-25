// packages/renderers/desktopLyrics/src/desktopLyrics.ts
// @ts-nocheck
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i);
  new MutationObserver((i) => {
    for (const o of i) if (o.type === "childList") for (const s of o.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && n(s);
  }).observe(document, { childList: true, subtree: true });
  function r(i) {
    const o = {};
    return i.integrity && (o.integrity = i.integrity), i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? o.credentials = "include" : i.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function n(i) {
    if (i.ep) return;
    i.ep = true;
    const o = r(i);
    fetch(i.href, o);
  }
})();
var k = function() {
  return k = Object.assign || function(t) {
    for (var r, n = 1, i = arguments.length; n < i; n++) {
      r = arguments[n];
      for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
    return t;
  }, k.apply(this, arguments);
};
function wl(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++) t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]]);
  return r;
}
function xl(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == "number") return { next: function() {
    return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
  } };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function H(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var n = r.call(e), i, o = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; ) o.push(i.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      i && !i.done && (r = n.return) && r.call(n);
    } finally {
      if (s) throw s.error;
    }
  }
  return o;
}
function Be(e, t, r) {
  if (arguments.length === 2) for (var n = 0, i = t.length, o; n < i; n++) (o || !(n in t)) && (o || (o = Array.prototype.slice.call(t, 0, n)), o[n] = t[n]);
  return e.concat(o || Array.prototype.slice.call(t));
}
var Sl = 10, El = 1e3, hs = function(e) {
  return JSON.stringify({ ev_type: "batch", list: e });
};
function Pl(e) {
  var t = e.transport, r = e.endpoint, n = e.size, i = n === void 0 ? Sl : n, o = e.wait, s = o === void 0 ? El : o, a = [], l = 0, c, u, f = { getSize: function() {
    return i;
  }, getWait: function() {
    return s;
  }, setSize: function(v) {
    i = v;
  }, setWait: function(v) {
    s = v;
  }, getEndpoint: function() {
    return r;
  }, setEndpoint: function(v) {
    r = v;
  }, send: function(v) {
    a.push(v), a.length >= i && h.call(this), clearTimeout(l), l = setTimeout(h.bind(this), s);
  }, flush: function() {
    clearTimeout(l), h.call(this);
  }, getBatchData: function() {
    return a.length ? hs(a) : "";
  }, clear: function() {
    clearTimeout(l), a = [];
  }, fail: function(v) {
    c = v;
  }, success: function(v) {
    u = v;
  } };
  function h() {
    if (a.length) {
      var v = this.getBatchData();
      t.post({ url: r, data: v, fail: function(S) {
        c && c(S, v);
      }, success: function() {
        u && u(v);
      } }), a = [];
    }
  }
  return f;
}
var ge = function() {
  return {};
};
function ci(e) {
  return e;
}
function me(e) {
  return typeof e == "object" && e !== null;
}
function Cl(e) {
  return e === void 0;
}
function Tl(e, t) {
  try {
    return e instanceof t;
  } catch {
    return false;
  }
}
var jn = Object.prototype;
function fi(e) {
  if (me(e)) {
    if (typeof Object.getPrototypeOf == "function") {
      var t = Object.getPrototypeOf(e);
      return t === jn || t === null;
    }
    return jn.toString.call(e) === "[object Object]";
  }
  return false;
}
function Ct(e) {
  return jn.toString.call(e) === "[object Array]";
}
function Qt(e) {
  return typeof e == "function";
}
function Ol(e) {
  return typeof e == "boolean";
}
function ln(e) {
  return typeof e == "number";
}
function st(e) {
  return typeof e == "string";
}
function Il(e) {
  switch (Object.prototype.toString.call(e)) {
    case "[object Error]":
      return true;
    case "[object Exception]":
      return true;
    case "[object DOMError]":
      return true;
    case "[object DOMException]":
      return true;
    default:
      return e instanceof Error;
  }
}
function Rl(e) {
  return typeof Event < "u" && Tl(e, Event);
}
function Al(e) {
  return Object.prototype.toString.call(e) === "[object ErrorEvent]";
}
function kl(e) {
  return Object.prototype.toString.call(e) === "[object PromiseRejectionEvent]";
}
function Dl(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ml() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  for (var r = {}, n = 0; n < e.length; ) r = di(r, e[n++]);
  return r;
}
function di(e, t) {
  var r = k({}, e);
  for (var n in t) Dl(t, n) && t[n] !== void 0 && (me(t[n]) && fi(t[n]) ? r[n] = di(me(e[n]) ? e[n] : {}, t[n]) : Ct(t[n]) && Ct(e[n]) ? r[n] = vs(e[n], t[n]) : r[n] = t[n]);
  return r;
}
function vs(e, t) {
  var r = Ct(e) ? e : [], n = Ct(t) ? t : [];
  return Array.prototype.concat.call(r, n).map(function(i) {
    return i instanceof RegExp ? i : me(i) && fi(i) ? di({}, i) : Ct(i) ? vs([], i) : i;
  });
}
function Jt(e, t) {
  if (!Ct(e) || e.length === 0) return false;
  for (var r = 0; r < e.length; ) {
    if (e[r] === t) return true;
    r++;
  }
  return false;
}
var pi = function(e, t) {
  if (!Ct(e)) return e;
  var r = e.indexOf(t);
  if (r >= 0) {
    var n = e.slice();
    return n.splice(r, 1), n;
  }
  return e;
}, Gr = function(e, t, r) {
  for (var n, i, o = t.split("."), s = H(o), a = s[0], l = s.slice(1); e && l.length > 0; ) e = e[a], n = l, i = H(n), a = i[0], l = i.slice(1);
  if (e) return r(e, a);
}, Ll = function(e, t, r) {
  return Gr(e, t, function(n, i) {
    if (n && i in n && Qt(n[i])) try {
      return n[i].apply(n, r);
    } catch {
      return;
    }
  });
}, Nl = function(e, t) {
  return !e || !me(e) ? e : t.reduce(function(r, n) {
    return r[n] = e[n], r;
  }, {});
}, $l = function(e) {
  return e.replace(/([a-z])([A-Z])/g, function(t, r, n) {
    return r + "-" + n.toLowerCase();
  });
};
function Vl(e) {
  return Ct(e) && e.length ? Fl(e) : null;
}
function Fl(e) {
  for (var t = [], r = e.length, n = 0; n < r; n++) {
    var i = e[n];
    st(i) ? t.push(i.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1")) : i && i.source && t.push(i.source);
  }
  return new RegExp(t.join("|"), "i");
}
var hi = function(e, t) {
  var r = Vl(e || []);
  return !!r && r.test(t);
};
function Yt(e) {
  try {
    return st(e) ? e : JSON.stringify(e);
  } catch (t) {
    return "[FAILED_TO_STRINGIFY]:" + String(t);
  }
}
function jl() {
  var e = {}, t = {}, r = { set: function(n, i) {
    return e[n] = i, t[n] = Yt(i), r;
  }, merge: function(n) {
    return e = k(k({}, e), n), Object.keys(n).forEach(function(i) {
      t[i] = Yt(n[i]);
    }), r;
  }, delete: function(n) {
    return delete e[n], delete t[n], r;
  }, clear: function() {
    return e = {}, t = {}, r;
  }, get: function(n) {
    return t[n];
  }, toString: function() {
    return k({}, t);
  } };
  return r;
}
var Un = function(e, t, r, n) {
  return n === void 0 && (n = true), function() {
    for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
    if (!e) return ge;
    var s = e[t], a = r.apply(void 0, Be([s], H(i), false)), l = a;
    return Qt(l) && n && (l = function() {
      for (var c = [], u = 0; u < arguments.length; u++) c[u] = arguments[u];
      try {
        return a.apply(this, c);
      } catch {
        return Qt(s) && s.apply(this, c);
      }
    }), e[t] = l, function(c) {
      c || (l === e[t] ? e[t] = s : a = s);
    };
  };
}, dr = function(e, t, r) {
  return function() {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    if (!e) return ge;
    var o = e[t], s = r.apply(void 0, Be([o], H(n), false)), a = s;
    return Qt(a) && (a = function() {
      for (var l = [], c = 0; c < arguments.length; c++) l[c] = arguments[c];
      return s.apply(this, l);
    }), e[t] = a, function() {
      a === e[t] ? e[t] = o : s = o;
    };
  };
}, Ul = function() {
  return "".padStart ? function(e, t) {
    return t === void 0 && (t = 8), e.padStart(t, " ");
  } : function(e) {
    return e;
  };
}, gs = Ul(), Hl = 0, ms = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  console.error.apply(console, Be(["[SDK]", Date.now(), gs("" + Hl++)], H(e), false));
}, Bl = 0, Qr = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  console.warn.apply(console, Be(["[SDK]", Date.now(), gs("" + Bl++)], H(e), false));
}, vi = function(e) {
  return Math.random() < Number(e);
}, ql = function(e, t) {
  return e < Number(t);
}, ar = function(e) {
  return function(t) {
    for (var r = t, n = 0; n < e.length && r; n++) try {
      r = e[n](r);
    } catch (i) {
      ms(i);
    }
    return r;
  };
}, Wl = function(e) {
  return function(t) {
    for (var r = true, n = 0; n < e.length && r; n++) try {
      r = e[n](t);
    } catch (i) {
      ms(i);
    }
    return r;
  };
};
function zl() {
  for (var e = new Array(16), t = 0, r = 0; r < 16; r++) (r & 3) === 0 && (t = Math.random() * 4294967296), e[r] = t >>> ((r & 3) << 3) & 255;
  return e;
}
function Kl(e) {
  for (var t = [], r = 0; r < 256; ++r) t[r] = (r + 256).toString(16).substr(1);
  var n = 0, i = t;
  return [i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]]].join("");
}
function Hn() {
  var e = zl();
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, Kl(e);
}
var Gl = 3e5, Ql = function(e, t, r) {
  var n = 0;
  return r === -1 ? ge : function() {
    if (e()) {
      n && clearTimeout(n), n = 0;
      return;
    }
    n === 0 && (n = setTimeout(t, r));
  };
}, _s = function(e, t) {
  var r = [];
  try {
    r = t.reduce(function(n, i) {
      try {
        var o = i(e);
        typeof o == "function" && n.push(o);
      } catch {
      }
      return n;
    }, []);
  } catch {
  }
  return function(n) {
    return _s(n, r);
  };
}, Jl = function(e) {
  e === void 0 && (e = Gl);
  var t = [], r = [], n = false, i, o = Ql(function() {
    return !!t.length;
  }, function() {
    n = true, i && i[0](), r.forEach(function(a) {
      return a();
    }), r.length = 0, i = void 0;
  }, e), s = function(a) {
    t = pi(t, a), !n && o();
  };
  return { next: function(a) {
    return _s(a, t);
  }, complete: function(a) {
    r.push(a);
  }, attach: function(a, l) {
    i = [a, l];
  }, subscribe: function(a) {
    if (n) throw new Error("Observer is closed");
    return t.push(a), i && i[1] && i[1](a), o(), function() {
      return s(a);
    };
  }, unsubscribe: s };
}, un = function(e, t, r) {
  var n = Jl(r);
  try {
    e(n.next, n.attach), t && n.complete(t);
  } catch {
  }
  return [n.subscribe, n.unsubscribe];
}, Yl = function(e, t) {
  var r = H(e, 1), n = r[0], i = function(o, s) {
    var a = n(function(l) {
      var c = Wl(t)(l);
      return c ? o(l) : ge;
    });
    s(function() {
      a();
    });
  };
  return i;
};
function Xl() {
  var e = false, t = {}, r = function(o) {
    o.length && o.forEach(function(s) {
      try {
        s();
      } catch {
      }
    }), o.length = 0;
  }, n = function(o) {
    t[o] && t[o].forEach(function(s) {
      r(s[1]);
    }), t[o] = void 0;
  }, i = function(o) {
    Object.keys(t).forEach(function(s) {
      t[s] && t[s].forEach(function(a) {
        a[0] === o && r(a[1]);
      });
    });
  };
  return { set: function(o, s, a) {
    t[o] ? t[o].push([s, a]) : t[o] = [[s, a]], e && r(a);
  }, has: function(o) {
    return !!t[o];
  }, remove: n, removeByEvType: i, clear: function() {
    e = true, Object.keys(t).forEach(function(o) {
      n(o);
    });
  } };
}
var Jr = function(e, t, r, n) {
  return e.destroyAgent.set(t, r, n);
}, Zl = 500, eu = 50;
function tu(e, t, r) {
  if (t.push(r), !(t.length < Zl)) {
    var n = t.splice(0, eu);
    e.savePreStartDataToDb && e.savePreStartDataToDb(n);
  }
}
function ru(e) {
  var t = e.getPreStartQueue();
  t.forEach(function(r) {
    return e.build(r);
  }), t.length = 0;
}
var nu = ["init", "start", "config", "beforeDestroy", "provide", "beforeReport", "report", "beforeBuild", "build", "beforeSend", "send", "beforeConfig"];
function iu(e) {
  var t = e.builder, r = e.createSender, n = e.createDefaultConfig, i = e.createConfigManager, o = e.userConfigNormalizer, s = e.initConfigNormalizer, a = e.validateInitConfig, l, c, u = {};
  nu.forEach(function(m) {
    return u[m] = [];
  });
  var f = false, h = false, v = false, S = [], w = [], $ = Xl(), P = { getBuilder: function() {
    return t;
  }, getSender: function() {
    return l;
  }, getPreStartQueue: function() {
    return S;
  }, init: function(m) {
    if (f) {
      Qr("already inited");
      return;
    }
    if (m && me(m) && a(m)) {
      var E = n(m);
      if (!E) throw new Error("defaultConfig missing");
      var D = s(m);
      if (c = i(E), c.setConfig(D), c.onChange(function() {
        I("config");
      }), l = r(c.getConfig()), !l) throw new Error("sender missing");
      f = true, I("init", true);
    } else throw new Error("invalid InitConfig, init failed");
  }, set: function(m) {
    f && m && me(m) && (I("beforeConfig", false, m), c?.setConfig(m));
  }, config: function(m) {
    if (f) return m && me(m) && (I("beforeConfig", false, m), c?.setConfig(o(m))), c?.getConfig();
  }, provide: function(m, E) {
    if (Jt(w, m)) {
      Qr("cannot provide " + m + ", reserved");
      return;
    }
    P[m] = E, I("provide", false, m);
  }, start: function() {
    f && (h || c?.onReady(function() {
      h = true, I("start", true), ru(P);
    }));
  }, report: function(m) {
    if (m) {
      var E = ar(u.beforeReport)(m);
      if (E) {
        var D = ar(u.report)(E);
        D && (h ? this.build(D) : tu(P, S, D));
      }
    }
  }, build: function(m) {
    if (h) {
      var E = ar(u.beforeBuild)(m);
      if (E) {
        var D = t.build(E);
        if (D) {
          var W = ar(u.build)(D);
          W && this.send(W);
        }
      }
    }
  }, send: function(m) {
    if (h) {
      var E = ar(u.beforeSend)(m);
      E && (l.send(E), I("send", false, E));
    }
  }, destroy: function() {
    $.clear(), v = true, S.length = 0, I("beforeDestroy", true);
  }, on: function(m, E) {
    if (m === "init" && f || m === "start" && h || m === "beforeDestroy" && v) try {
      E();
    } catch {
    }
    else u[m] && u[m].push(E);
  }, off: function(m, E) {
    u[m] && (u[m] = pi(u[m], E));
  }, destroyAgent: $ };
  return w = Object.keys(P), P;
  function I(m, E) {
    E === void 0 && (E = false);
    for (var D = [], W = 2; W < arguments.length; W++) D[W - 2] = arguments[W];
    u[m].forEach(function(G) {
      try {
        G.apply(void 0, Be([], H(D), false));
      } catch {
      }
    }), E && (u[m].length = 0);
  }
}
var ou = function(e) {
  var t = jl();
  e.provide("context", t), e.on("report", function(r) {
    return r.extra || (r.extra = {}), r.extra.context = t.toString(), r;
  });
}, su = function(e, t, r) {
  var n = {}, i = function() {
    for (var s, a = [], l = 0; l < arguments.length; l++) a[l] = arguments[l];
    var c = a[0];
    if (c) {
      var u = c.split(".")[0];
      if (!(u in i)) {
        var f = n[u] || [], h = (s = t?.(e)) !== null && s !== void 0 ? s : {};
        f.push(Be([h], H(a), false)), n[u] = f;
        return;
      }
      return Ll(i, c, [].slice.call(a, 1));
    }
  };
  Un(e, "provide", function(s) {
    return function(a, l) {
      i[a] = l, s.call(e, a, l);
    };
  })();
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (i[o] = e[o]);
  return e.on("provide", function(s) {
    n[s] && (n[s].forEach(function(a) {
      var l = H(a), c = l[0], u = l.slice(1);
      r?.(e, c, u);
    }), n[s] = null);
  }), i;
};
function au(e, t) {
  e.on("init", function() {
    var r = [], n = function(o) {
      o.forEach(function(s) {
        var a = s.name;
        Jt(r, a) || (r.push(a), s.setup(e), t && t(a, s.setup), e.destroyAgent.set(a, a, [function() {
          r = pi(r, a), s.tearDown && s.tearDown();
        }]));
      });
    };
    e.provide("applyIntegrations", n);
    var i = e.config();
    i && i.integrations && n(i.integrations);
  });
}
var lu = "_", uu = function(e) {
  return e.split(lu)[0];
};
function cu(e, t) {
  var r = t || {}, n = {}, i = function(s, a) {
    n[s] || (n[s] = []), n[s].push(a);
  }, o = function(s) {
    var a = H(s, 2), l = a[0], c = a[1], u = uu(l), f = !!u && n[u];
    return r[l] || (r[l] = un(c, function() {
      r[l] = void 0;
    })), f ? bs(e, [l, Yl(r[l], f)]) : r[l];
  };
  e.provide("setFilter", i), e.provide("initSubject", o), e.provide("getSubject", function(s) {
    return r[s];
  }), e.provide("privateSubject", {});
}
function Xt(e, t) {
  return e.initSubject(t);
}
function bs(e, t, r) {
  var n = H(t, 2), i = n[0], o = n[1], s = e.privateSubject || {};
  return s[i] || (s[i] = un(o, function() {
    s[i] = void 0;
  }, r)), s[i];
}
var fu = function(e) {
  try {
    typeof window == "object" && me(window) && window.__SLARDAR_DEVTOOLS_GLOBAL_HOOK__ && window.__SLARDAR_DEVTOOLS_GLOBAL_HOOK__.push(e);
  } catch {
  }
}, le = function() {
  return Date.now();
};
function ce() {
  if (typeof window == "object" && me(window)) return window;
}
function Mt() {
  if (typeof document == "object" && me(document)) return document;
}
function ys() {
  return ce() && window.location;
}
function du() {
  return ce() && window.history;
}
function pu() {
  if (typeof XMLHttpRequest == "function" && Qt(XMLHttpRequest)) return XMLHttpRequest;
}
function hu() {
  if (ce() && Qt(window.PerformanceObserver)) return window.PerformanceObserver;
}
function vu() {
  if (ce() && "navigator" in window) return window.navigator;
}
function ws() {
  var e = vu();
  if (e) return e.connection || e.mozConnection || e.webkitConnection;
}
function Bn(e) {
  return e?.effectiveType || e?.type || "";
}
function gu() {
  var e = ws(), t = Bn(e);
  return Jt(["slow-2g", "2g"], t);
}
function cn(e) {
  var t = Mt();
  if (!t || !e) return "";
  var r = t.createElement("a");
  return r.href = e, r.href;
}
function Yi(e) {
  var t = Mt();
  if (!t || !e) return { url: e, protocol: "", domain: "", query: "", path: "", hash: "" };
  var r = t.createElement("a");
  r.href = e;
  var n = r.pathname || "/";
  return n[0] !== "/" && (n = "/" + n), { url: r.href, protocol: r.protocol.slice(0, -1), domain: r.hostname, query: r.search.substring(1), path: n, hash: r.hash };
}
function gi() {
  var e = ce() && ys();
  return e ? e.href : "";
}
var mu = function(e) {
  return { pid: e.pid, view_id: e.viewId, url: gi() };
}, xs = function(e) {
  var t = e.config(), r = mu(t);
  return r.context = e.context ? e.context.toString() : {}, r;
}, Ss = function(e, t) {
  var r = xs(e);
  return r.timestamp = le(), function(n) {
    e.report(k(k({}, n), { overrides: r }));
  };
}, _u = "f_view_0", bu = function(e) {
  return function(t, r) {
    var n = xs(e);
    r(ge, function(i) {
      n && i(n);
    });
  };
}, tr = function(e) {
  if (e) return e.__SLARDAR_REGISTRY__ || (e.__SLARDAR_REGISTRY__ = { Slardar: { plugins: [], errors: [], subject: {} } }), e.__SLARDAR_REGISTRY__.Slardar;
}, Es = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var r = tr(ce());
  r && (r.errors || (r.errors = []), r.errors.push(e));
}, Ps = function(e) {
  var t = { url: gi(), timestamp: le() }, r = e.config();
  return r?.pid && (t.pid = r.pid), e?.context && (t.context = e.context.toString()), t;
}, mi = function(e, t) {
  return function(r) {
    var n = function(i) {
      return i.overrides = t, i;
    };
    e.on("report", n), r(), e.off("report", n);
  };
}, ft = function(e, t, r, n) {
  return n === void 0 && (n = false), e.addEventListener(t, r, n), function() {
    e.removeEventListener(t, r, n);
  };
}, Cs = function(e, t, r, n) {
  return e.addEventListener(t, r, n), function() {
    e.removeEventListener(t, r, n);
  };
};
function yu(e) {
  var t = ce(), r = Mt();
  if (!(!t || !r)) {
    if (r.readyState === "complete") {
      e();
      return;
    }
    ft(t, "load", function() {
      setTimeout(function() {
        e();
      }, 0);
    }, false);
  }
}
var Ts = function(e) {
  var t = false, r = function(n) {
    t || (t = true, e && e(n));
  };
  return [r];
}, wu = function(e) {
  var t = ce();
  if (t) {
    var r = H(Ts(e), 1), n = r[0];
    ["unload", "beforeunload", "pagehide"].forEach(function(i) {
      ft(t, i, n, false);
    });
  }
}, xu = function(e) {
  var t = Mt(), r = ce();
  if (!(!t || !r)) {
    var n = ge, i = function() {
      t.visibilityState === "visible" && (e(), n());
    };
    n = Cs(t, "visibilitychange", i, true);
  }
}, Su = function(e, t) {
  var r, n = Mt();
  if (n) {
    var i = n.createElement("script");
    i.src = e, i.crossOrigin = "anonymous", i.onload = t, (r = n.head) === null || r === void 0 || r.appendChild(i);
  }
}, fn = function(e, t) {
  return me(e) ? k(k({}, t), e) : e ? t : false;
}, _i = function() {
  return !!btoa && !!atob;
};
function Eu(e) {
  return _i() ? btoa(encodeURI(e)) : e;
}
function Pu(e) {
  return _i() ? decodeURI(atob(e)) : e;
}
var Os = function(e) {
  try {
    var t = localStorage.getItem(e), r = t;
    t && typeof t == "string" && (r = JSON.parse(Pu(t)));
    var n = r, i = n.expires, o = wl(n, ["expires"]);
    return i >= le() ? o : void 0;
  } catch {
    return;
  }
}, bi = function(e, t, r) {
  if (!(r <= 0)) try {
    localStorage.setItem(e, Eu(JSON.stringify(k(k({}, t), { expires: le() + r }))));
  } catch {
  }
}, Cu = 2160 * 60 * 60 * 1e3, Is = function(e) {
  return e === false ? 0 : e === true || e === void 0 || !ln(e) ? Cu : e;
}, Tu = function(e) {
  var t;
  if (!(typeof window != "object" || !window.__perfsee__)) {
    var r = {};
    return (t = Error.captureStackTrace) === null || t === void 0 || t.call(Error, r, e), r.stack;
  }
};
function Ou() {
  var e = ce();
  return e && "navigator" in e && "onLine" in e.navigator ? function() {
    return !e.navigator.onLine;
  } : function() {
    return false;
  };
}
function Iu(e) {
  var t = ce();
  return t && "addEventListener" in t ? ft(t, "online", e) : function() {
  };
}
var Ru = "xhr_0", Rs = function() {
  var e = new RegExp("\\/monitor_web\\/collect|\\/monitor_browser\\/collect\\/batch", "i");
  return function(t) {
    return e.test(t);
  };
}, Au = function(e) {
  return function() {
    for (var t, r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
    return t = H(r, 2), this._method = t[0], this._url = t[1], e.apply(this, r);
  };
}, ku = function(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
    this._reqHeaders = this._reqHeaders || {};
    var n = H(t, 2), i = n[0], o = n[1];
    return this._reqHeaders[i] = o, e && e.apply(this, t);
  };
}, Du = function(e, t) {
  return dr(e, "onreadystatechange", function(r) {
    return function() {
      for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
      return this.readyState === 4 && t(e), r && r.apply(this, n);
    };
  });
}, Mu = function(e, t) {
  var r = Rs();
  return function() {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    if (this._start = le(), this._data = n?.[0], !r(this._url)) {
      var o = t([this._method, this._url, this._start, this]);
      Du(this, o)();
    }
    return e.apply(this, n);
  };
}, Xi = function(e) {
  return function(t, r) {
    if (e) {
      var n = [];
      n.push(dr(e, "open", Au)()), n.push(dr(e, "setRequestHeader", ku)()), n.push(dr(e, "send", Mu)(t)), r(function() {
        n.forEach(function(i) {
          return i();
        });
      });
    }
  };
}, Lu = "fetch_0", As = function(e, t) {
  return function(r, n) {
    n === void 0 && (n = {});
    var i = t([r, n]), o = e(r, n);
    return o.then(function(s) {
      i(s);
    }, function() {
      i(void 0);
    }), o;
  };
}, Nu = function(e, t) {
  var r = ce();
  if (!(!r || !fetch)) {
    var n = [];
    n.push(dr(r, "fetch", As)(e)), t(function() {
      n.forEach(function(i) {
        return i();
      });
    });
  }
}, $u = [Lu, Nu], Vu = ["resource"], Fu = function(e, t, r) {
  var n = e && new e(function(a, l) {
    a.getEntries && a.getEntries().forEach(function(c, u, f) {
      return t(c, u, f, l);
    });
  }), i = function(a) {
    if (!e || !n) return r && r();
    try {
      n.observe({ entryTypes: a });
    } catch {
      return r && r();
    }
  }, o = function(a, l) {
    if (!e || !n) return r && r();
    try {
      var c = { type: a, buffered: true };
      !Cl(l) && (c.durationThreshold = l), n.observe(c);
    } catch {
      return r && r();
    }
    n.observe({ type: a, buffered: false });
  }, s = function() {
    return n && n.disconnect();
  };
  return [i, o, s];
}, ju = function(e, t, r) {
  var n = H(Fu(e, t), 3), i = n[0], o = n[2];
  return i(r), o;
}, Uu = "resource_0", Hu = function(e, t) {
  var r = hu();
  if (r) {
    var n = Rs();
    t(ju(r, function(i) {
      !n(i.name) && e(i);
    }, Vu));
  }
}, ks = [Uu, Hu], Ds = "pageview", Ms = "session", Ls = "js_error", Tr = "http", Bu = "resource_error", qu = "resource", Zi = "custom", Wu = "performance", zu = "performance_longtask", Ku = "blank_screen", Ns = "action", Gu = "03", Qu = "01", Ju = "traceparent", Yu = { sampleRate: 1, origins: [] }, eo = function() {
  var e = window && (window.crypto || window.msCrypto);
  if (e !== void 0 && e.getRandomValues) {
    var t = new Uint16Array(8);
    e.getRandomValues(t);
    var r = function(n) {
      for (var i = n.toString(16); i.length < 4; ) i = "0" + i;
      return i;
    };
    return r(t[0]) + r(t[1]) + r(t[2]) + r(t[3]) + r(t[4]) + r(t[5]) + r(t[6]) + r(t[7]);
  }
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, function() {
    var n = Math.random() * 16 | 0;
    return n.toString(16);
  });
}, $s = function(e) {
  var t = fn(e, Yu);
  if (t) {
    var r = vi(t.sampleRate);
    if (r) return function(n, i) {
      var o = t.origins;
      o.length && hi(o, n) && i(Ju, Gu + "-" + eo() + "-" + eo().substring(16) + "-" + Qu);
    };
  }
}, Xu = new RegExp("(cookie|auth|jwt|token|key|ticket|secret|credential|session|password)", "i"), Zu = new RegExp("(bearer|session)", "i"), yi = function(e, t) {
  return !e || !t ? true : Xu.test(e) || Zu.test(t);
}, ec = function(e) {
  var t = false;
  return function(r) {
    t || (t = true, e(r));
  };
}, Vs = function(e, t) {
  try {
    if (t) {
      var r = e.request.url, n = t(r);
      if (!n) return;
      e.request.url = n, e.extra = k(k({}, e.extra), { original_url: r });
    }
  } catch {
  }
}, to = function(e, t, r) {
  var n = H(t, 2), i = n[0], o = n[1], s = r.setTraceHeader, a = r.ignoreUrls, l = r.setContextAtReq, c = r.extractUrl;
  e.push(i[0](function(u) {
    var f = H(u, 4);
    f[0];
    var h = f[1];
    f[2];
    var v = f[3];
    if (!h) return ge;
    var S = cn(h), w;
    if (hi(a, S)) return ge;
    s && s(S, function(m, E) {
      return v.setRequestHeader(m, E);
    });
    var $ = l(), P = void 0, I = o()[0](function(m) {
      (S === m.name || w && w === m.name) && !P && (P = m);
    });
    return function(m) {
      w = m.responseURL;
      var E = nc(m, r);
      setTimeout(function() {
        P && (E.response.timing = P), Vs(E, c), $ && $({ ev_type: Tr, payload: E }), I();
      }, 100);
    };
  }));
};
function tc(e) {
  return st(e) && e ? e.split(`\r
`).reduce(function(t, r) {
    if (st(r)) {
      var n = H(r.split(": "), 2), i = n[0], o = n[1];
      !yi(i, o) && (t[i.toLowerCase()] = o);
    }
    return t;
  }, {}) : {};
}
function rc(e) {
  return Object.keys(e).reduce(function(t, r) {
    return !yi(r, e[r]) && (t[r.toLowerCase()] = e[r]), t;
  }, {});
}
var nc = function(e, t) {
  var r = e._method, n = e._reqHeaders, i = e._url, o = e._start, s = e._data, a = cn(i), l = { api: "xhr", request: { url: a, method: (r || "").toLowerCase(), headers: n && rc(n), timestamp: o }, response: { status: e.status || 0, is_custom_error: false, timestamp: le() }, duration: le() - o };
  typeof e.getAllResponseHeaders == "function" && (l.response.headers = tc(e.getAllResponseHeaders()));
  var c = l.response.status, u = t.collectBodyOnError, f = t.extraExtractor;
  try {
    var h = f?.(e.response, l, s);
    h && (l.extra = h), h && (l.response.is_custom_error = true), u && (h || c >= 400) && (l.request.body = s ? "" + s : void 0, l.response.body = e.response ? "" + e.response : void 0);
  } catch {
  }
  return l;
}, wi = "ajax", ic = { autoWrap: true, setContextAtReq: function() {
  return ci;
}, ignoreUrls: [], collectBodyOnError: false };
function oc(e, t) {
  var r = fn(t, ic);
  if (r) {
    var n = [], i = k(k({}, r), { setContextAtReq: function() {
      return Ss(e);
    }, setTraceHeader: $s(r.trace) }), o = function() {
      return Xt(e, ks);
    };
    i.autoWrap && to(n, [Xt(e, [Ru, Xi(XMLHttpRequest && XMLHttpRequest.prototype)]), o], i), Jr(e, wi, Tr, n), e.provide("wrapXhr", function(s) {
      function a() {
        var l = new s();
        return to(n, [un(Xi(l)), o], i), l;
      }
      return a.prototype = new s(), ["DONE", "HEADERS_RECIEVED", "LOADING", "OPENED", "UNSENT"].forEach(function(l) {
        a[l] = s[l];
      }), a;
    });
  }
}
function sc(e) {
  e.on("init", function() {
    var t, r = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[wi];
    oc(e, r);
  });
}
var ro = function(e, t, r) {
  var n = H(t, 2), i = n[0], o = n[1], s = r.setTraceHeader, a = r.ignoreUrls, l = r.setContextAtReq, c = r.extractUrl, u = window.Headers, f = window.Request;
  !f || !u || e.push(i[0](function(h) {
    var v = H(h, 2), S = v[0], w = v[1], $ = cn(S instanceof f ? S.url : S), P;
    if (!ac($) || hi(a, $)) return ge;
    s && s($, function(W, G) {
      return lc(W, G, S, w, f, u);
    });
    var I = l(), m = le(), E = void 0, D = o()[0](function(W) {
      ($ === W.name || P && P === W.name) && !E && (E = W);
    });
    return function(W) {
      P = W && W.url;
      var G = cc(S, w, W, f, u, r, m), re = ec(function(Ce) {
        E && (Ce.response.timing = E), Vs(Ce, c), I && I({ ev_type: Tr, payload: Ce }), D();
      });
      setTimeout(function() {
        re(G);
      }, 1e3);
    };
  }));
}, ac = function(e) {
  if (!st(e)) return false;
  var t = H(e.split(":"), 2), r = t[0], n = t[1];
  return !n || r === "http" || r === "https";
}, xi = function(e, t) {
  return e instanceof t;
}, lc = function(e, t, r, n, i, o) {
  var s;
  xi(r, i) ? r.headers.set(e, t) : n.headers instanceof o ? n.headers.set(e, t) : n.headers = k(k({}, n.headers), (s = {}, s[e] = t, s));
}, uc = function(e, t, r) {
  var n = t && t.method || "get";
  return xi(e, r) && (n = e.method || n), n.toLowerCase();
}, no = function(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  try {
    return t.reduce(function(n, i) {
      return new e(i || {}).forEach(function(o, s) {
        return !yi(s, o) && (n[s] = o);
      }), n;
    }, {});
  } catch {
    return {};
  }
}, io = function(e, t, r) {
  return xi(e, r) ? e.body : t?.body;
}, cc = function(e, t, r, n, i, o, s) {
  var a = { api: "fetch", request: { method: uc(e, t, n), timestamp: s, url: cn(e instanceof n ? e.url : e), headers: no(i, e.headers, t.headers) }, response: { status: r && r.status || 0, is_custom_error: false, timestamp: le() }, duration: le() - s }, l = o.collectBodyOnError, c = o.extraExtractor, u = function() {
    var h;
    l && (a.request.body = (h = io(e, t, n)) === null || h === void 0 ? void 0 : h.toString());
  };
  if (r) try {
    var f = no(i, r.headers);
    a.response.headers = f;
    try {
      (f["content-type"] || "").indexOf("application/json") !== -1 && c && r.clone().json().catch(function() {
        return r.clone().text();
      }).then(function(h) {
        var v, S = c(h, a, (v = io(e, t, n)) === null || v === void 0 ? void 0 : v.toString());
        S && (a.extra = S, a.response.is_custom_error = true, u());
      }).catch(ge);
    } catch {
    }
    r.status >= 400 && u();
  } catch {
  }
  else u();
  return a;
}, Si = "fetch", fc = { autoWrap: true, setContextAtReq: function() {
  return ci;
}, ignoreUrls: [], collectBodyOnError: false };
function dc(e, t) {
  var r = fn(t, fc);
  if (r) {
    var n = [], i = k(k({}, r), { setContextAtReq: function() {
      return Ss(e);
    }, setTraceHeader: $s(r.trace) }), o = function() {
      return Xt(e, ks);
    };
    i.autoWrap && ro(n, [Xt(e, $u), o], i), Jr(e, Si, Tr, n), e.provide("wrapFetch", function(s) {
      var a = void 0;
      return ro(n, [un(function(l) {
        a = As(s, l);
      }), o], i), a;
    });
  }
}
function pc(e) {
  e.on("init", function() {
    var t, r = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[Si];
    dc(e, r);
  });
}
var hc = ["name", "message", "stack", "filename", "lineno", "colno"], Ei = function(e) {
  var t;
  return Il(e) ? t = Nl(e, hc) : (fi(e) || Rl(e) || st(e)) && (t = { message: Yt(e) }), t;
}, vc = function(e) {
  var t = Ei(e.error);
  if (!t) return t;
  var r = e.colno, n = e.lineno, i = e.filename;
  return r && !t.colno && (t.colno = String(r)), n && !t.lineno && (t.lineno = String(n)), i && !t.filename && (t.filename = i), t;
}, gc = function(e) {
  var t;
  try {
    var r = void 0;
    if ("reason" in e ? r = e.reason : "detail" in e && "reason" in e.detail && (r = e.detail.reason), r) {
      var n = Ei(r);
      return k(k({}, n), { name: (t = n && n.name) !== null && t !== void 0 ? t : "UnhandledRejection" });
    }
  } catch {
  }
}, mc = function(e) {
  return Al(e) ? vc(e) : kl(e) ? gc(e) : Ei(e);
}, oo = "jsError", _c = "hidden_3", so = function(e) {
  return e.visibilityState === "hidden";
}, bc = function(e, t) {
  var r = Mt(), n = ce();
  if (!(!r || !n)) {
    var i = function(a) {
      e(a.type === "pagehide" || so(r));
    }, o = Cs(r, "visibilitychange", i, true), s = ft(n, "pagehide", i, true);
    t(function() {
      o(), s();
    }, function(a) {
      a(so(r));
    });
  }
}, yc = [_c, bc], wc = function(e) {
  return e.readyState === "complete";
}, xc = "unload_0", Sc = function(e, t) {
  var r = ce();
  if (r) {
    var n = H(Ts(e), 1), i = n[0], o = ["unload", "beforeunload", "pagehide"], s = function() {
      i();
    }, a = [];
    o.forEach(function(l) {
      a.push(ft(r, l, s, false));
    }), t(function() {
      a.forEach(function(l) {
        return l();
      });
    });
  }
}, Ec = [xc, Sc], Pc = "history_0", Cc = "hash_0", Tc = function(e, t) {
  var r = du(), n = ce();
  if (!(!r || !n)) {
    var i = [], o = function() {
      return e(location.href);
    }, s = function(a) {
      return function() {
        for (var l = [], c = 0; c < arguments.length; c++) l[c] = arguments[c];
        try {
          a.apply(r, l);
        } finally {
          o();
        }
      };
    };
    i.push(Un(r, "pushState", s)(), Un(r, "replaceState", s)()), i.push(ft(n, "popstate", o, true)), t(function() {
      i.forEach(function(a) {
        return a();
      });
    });
  }
}, Oc = function(e, t) {
  var r = ce();
  if (r) {
    var n = function() {
      return e(location.href);
    }, i = ft(r, "hashchange", n, true);
    t(function() {
      i();
    });
  }
}, Ic = [Cc, Oc], Rc = [Pc, Tc], Ac = function(e) {
  return function(t) {
    var r;
    return e === "hash" ? ((r = Yi(t).hash) === null || r === void 0 ? void 0 : r.replace(/^#/, "")) || "/" : Yi(t).path;
  };
}, Fs = function(e) {
  return js(e, le());
}, js = function(e, t) {
  return e + "_" + t;
}, kc = function(e, t, r, n) {
  var i = r, o = t;
  n && n(t);
  var s = function(l, c, u) {
    l !== "user_set" && c !== i ? (i = c, o = u ?? i, n && n(o), e(l, o)) : l === "user_set" && c !== o && (o = c, n && n(o), e(l, o));
  }, a = function() {
    t && e("init", t);
  };
  return [s, a];
}, Dc = function(e, t) {
  var r = t, n = function(i, o) {
    o !== r && (r = o, e(i, r));
  };
  return [n];
}, Mc = function(e, t) {
  return { ev_type: Ds, payload: { pid: t, source: e } };
}, Lc = function(e) {
  return function(t, r) {
    e(Mc(t, r));
  };
}, qn = function(e) {
  return e === "manual";
}, Mr = "error_weight", Cn = "duration_apdex", wr = "perf_apdex", Nc = "action", $c = function() {
  var e;
  return e = { error_count: [0, 0, 0, 0], duration_count: [0, 0, 0] }, e[wr] = {}, e;
}, ao = function(e, t) {
  var r = e[0] + e[1] + e[2], n = e[0] / r, i = e[2] / r;
  return i > t.frustrating_threshold ? 2 : n > t.satisfying_threshold || r === 0 ? 0 : 1;
}, Vc = function() {
  var e = 0, t = void 0, r = function(i) {
    if (i) {
      if (!t) return;
      e += le() - t, t = void 0;
    } else t = le();
  }, n = function() {
    t && (e += le() - t);
    var i = e;
    return e = 0, t = le(), i;
  };
  return [r, n];
}, lo = function(e, t) {
  return function(r, n) {
    var i = r.payload;
    switch (r.ev_type) {
      case Wu:
        var o = i.name;
        i.isSupport && e(n[wr], o, i.value);
        break;
      case Ns:
        e(n[wr], Nc, i.duration || 0);
        break;
      case Ls:
        t(n[Mr], 0);
        break;
      case Tr:
        if (i.response.is_custom_error || i.response.status >= 400) t(n[Mr], 1);
        else {
          var s = i.response.timing;
          s && e(n[Cn], 0, s.duration);
        }
        break;
      case Bu:
        t(n[Mr], 2);
        break;
      case Ku:
        t(n[Mr], 3);
        break;
      case qu:
        e(n[Cn], 1, i.duration);
        break;
      case zu:
        i.longtasks.forEach(function(a) {
          e(n[Cn], 2, a.duration);
        });
        break;
    }
  };
}, uo = function() {
  var e, t, r = function() {
    e = [0, 0, 0], t = $c();
  };
  r();
  var n = function(s, a, l) {
    var c = s && s[a];
    if (!(!c || l <= 0)) {
      var u = l < (c[0].threshold || 0) ? 0 : l > (c[1].threshold || 0) ? 2 : 1;
      if (e[u] += c[u].weight, typeof a == "string") {
        var f = js(a, u), h = t[wr][f];
        t[wr][f] = (h || 0) + 1;
      } else u === 2 && (t.duration_count[a] += 1);
    }
  }, i = function(s, a) {
    s && (e[2] += s[a], t.error_count[a] += 1);
  }, o = function() {
    return [e, t];
  };
  return [n, i, o, r];
}, Fc = function() {
  var e = { start: le(), end: 0, time_spent: 0, is_bounced: false, entry: "", exit: "", p_count: 0, a_count: 0 }, t = function(s, a) {
    var l = H(s, 3), c = l[0], u = l[1], f = l[2];
    e.end = le(), e.time_spent += a && a.time_spent || 0, e.last_page = a, e.p_count += 1, e.rank = c, e.apdex = u, e.apdex_detail = f;
    var h = Mt();
    h && (e.is_bounced = !wc(h));
  }, r = function(s, a) {
    e.time_spent += s.time_spent, e.p_count += 1, e.exit = a;
  }, n = function() {
    e.a_count += 1;
  }, i = function(s) {
    e.entry = s, e.exit = s;
  }, o = function() {
    return e;
  };
  return [t, r, n, i, o];
}, jc = function(e, t, r, n) {
  var i = n.sendInit, o = n.initPid, s = n.routeMode, a = n.extractPid, l = n.onPidUpdate, c = qn(s) ? function() {
    return "";
  } : Ac(s), u = a || (function() {
  }), f = function(P) {
    var I;
    return (I = u(P)) !== null && I !== void 0 ? I : c(P);
  }, h = H(kc(Lc(e), o || f(location.href), c(location.href), l), 2), v = h[0], S = h[1];
  if (!qn(s)) {
    var w = H(Dc(function(P, I) {
      return v(P, c(I), u(I));
    }, ""), 1), $ = w[0];
    r.length && r.forEach(function(P) {
      return t.push(P[0](function(I) {
        return $(s, I);
      }));
    });
  }
  return i && S(), [v.bind(null, "user_set")];
}, Uc = function(e, t, r, n) {
  var i = H(r, 2), o = i[0], s = i[1], a = n.apdex === 2, l = void 0, c = void 0, u = void 0, f = false, h = H(uo(), 4), v = h[0], S = h[1], w = h[2], $ = h[3], P = H(uo(), 4), I = P[0], m = P[1], E = P[2], D = P[3], W = H(Fc(), 5), G = W[0], re = W[1], Ce = W[2], ye = W[3], Me = W[4], Y = H(Vc(), 2), de = Y[0], _e = Y[1];
  t.push(o[0](de)), !a && t.push(s[0](function() {
    if (f) {
      var Q = H(E(), 2), ve = Q[0], _t = Q[1], nr = ao(ve, u);
      G([nr, ve, _t], F()), e({ ev_type: Ms, payload: Me() }), D();
    }
  }));
  var Fe = lo(v, S), ie = lo(I, m), J = function(Q) {
    f && (a || (ie(Q, u), Q.ev_type === Ns && Ce()), Q.common.pid === l[1] && Fe(Q, u));
  }, F = function() {
    var Q = H(w(), 2), ve = Q[0], _t = Q[1];
    return { start: l[0], pid: l[1], view_id: l[2], end: le(), time_spent: _e(), apdex: ve, rank: ao(ve, u), detail: _t };
  }, pe = function(Q, ve) {
    if (!l) {
      l = [le(), Q, ve], ye(Q), f = !!(u && l);
      return;
    }
    f && (c = F(), re(c, Q)), l = [le(), Q, ve], $();
  }, we = function(Q) {
    f && (Q.payload.last = c), e(Q);
  }, xe = function(Q) {
    if (!Q) {
      t.forEach(function(ve) {
        return ve();
      }), t.length = 0;
      return;
    }
    u = Q, f = !!(u && l);
  };
  return t.push(function() {
    f = false;
  }), [pe, J, we, xe];
}, Yr = "pageview", Hc = { sendInit: true, routeMode: "history", apdex: 2 };
function Bc(e, t) {
  var r, n = fn(t, Hc);
  if (!(!n || !ys())) {
    var i = n.routeMode, o = n.apdex, s = e.report.bind(e), a = ge;
    if (o) {
      var l = [], c = H(Uc(e.report.bind(e), l, [Xt(e, yc), Xt(e, Ec)], n), 4), u = c[0], f = c[1], h = c[2], v = c[3];
      s = h, a = u, e.on("send", f), l.push(function() {
        return e.off("send", f);
      }), e.on("start", function() {
        v(e.config().apdex);
      }), Jr(e, Yr, Ms, l);
    }
    var S = [], w = H(jc(s, S, qn(i) ? [] : [e.initSubject(Ic), e.initSubject(Rc)], k(k({}, n), { initPid: (r = e.config()) === null || r === void 0 ? void 0 : r.pid, onPidUpdate: function(I) {
      var m = Fs(I);
      a(I, m), e.set({ pid: I, viewId: m, actionId: void 0 });
    } })), 1), $ = w[0];
    bs(e, [_u, bu(e)], -1);
    var P = function() {
      $(e.config().pid);
    };
    e.on("config", P), S.push(function() {
      return e.off("config", P);
    }), Jr(e, Yr, Ds, S), e.provide("sendPageview", $);
  }
}
function qc(e) {
  e.on("init", function() {
    var t, r = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[Yr];
    Bc(e, r);
  });
}
var Wc = "event", zc = "log", Kc = function(e) {
  if (!(!e || !me(e)) && !(!e.name || !st(e.name))) {
    var t = { name: e.name, type: Wc };
    if ("metrics" in e && me(e.metrics)) {
      var r = e.metrics, n = {};
      for (var i in r) ln(r[i]) && (n[i] = r[i]);
      t.metrics = n;
    }
    if ("categories" in e && me(e.categories)) {
      var o = e.categories, s = {};
      for (var i in o) s[i] = Yt(o[i]);
      t.categories = s;
    }
    return "attached_log" in e && st(e.attached_log) && (t.attached_log = e.attached_log), t;
  }
}, Gc = function(e) {
  if (!(!e || !me(e)) && !(!e.content || !st(e.content))) {
    var t = e.content, r = { content: Yt(t), type: zc, level: "info" };
    if ("level" in e && (r.level = e.level), "extra" in e && me(e.extra)) {
      var n = e.extra, i = {}, o = {};
      for (var s in n) ln(n[s]) ? i[s] = n[s] : o[s] = Yt(n[s]);
      r.metrics = i, r.categories = o;
    }
    return "attached_log" in e && st(e.attached_log) && (r.attached_log = e.attached_log), r;
  }
}, Qc = function(e) {
  var t = function(n) {
    var i = Kc(n);
    if (i) {
      var o = Tu(t);
      o && (i.stacks = o), e.report({ ev_type: Zi, payload: i, extra: { timestamp: le() } });
    }
  }, r = function(n) {
    var i = Gc(n);
    i && e.report({ ev_type: Zi, payload: i, extra: { timestamp: le() } });
  };
  e.provide("sendEvent", t), e.provide("sendLog", r);
}, Jc = function(e) {
  var t = ws(), r = Bn(t);
  t && (t.onchange = function() {
    r = Bn(t);
  }), e.on("report", function(n) {
    return k(k({}, n), { extra: k(k({}, n.extra || {}), { network_type: r }) });
  });
}, Lr = function(e, t) {
  var r = e.common || {};
  return r.sample_rate = t, e.common = r, e;
}, Wn = function(e, t, r, n, i) {
  return e ? /* @__PURE__ */ (function(o) {
    return function() {
      return o;
    };
  })(i(n, t)) : function() {
    return r(t);
  };
}, Yc = function(e, t) {
  return e.map(function(r) {
    switch (t) {
      case "number":
        return Number(r);
      case "boolean":
        return r === "1";
      default:
        return String(r);
    }
  });
}, Xc = function(e, t, r) {
  switch (r) {
    case "eq":
      return Jt(t, e);
    case "neq":
      return !Jt(t, e);
    case "gt":
      return e > t[0];
    case "gte":
      return e >= t[0];
    case "lt":
      return e < t[0];
    case "lte":
      return e <= t[0];
    case "regex":
      return !!e.match(new RegExp(t.join("|")));
    case "not_regex":
      return !e.match(new RegExp(t.join("|")));
    default:
      return false;
  }
}, Zc = function(e, t, r, n) {
  var i = Gr(e, t, function(s, a) {
    return s[a];
  });
  if (i === void 0) return false;
  var o = Ol(i) ? "bool" : ln(i) ? "number" : "string";
  return Xc(i, Yc(n, o), r);
}, zn = function(e, t) {
  try {
    return t.type === "rule" ? Zc(e, t.field, t.op, t.values) : t.type === "and" ? t.children.every(function(r) {
      return zn(e, r);
    }) : t.children.some(function(r) {
      return zn(e, r);
    });
  } catch (r) {
    return Es(r), false;
  }
}, ef = function(e, t, r, n, i, o) {
  var s = {};
  return Object.keys(e).forEach(function(a) {
    var l = e[a], c = l.enable, u = l.sample_rate, f = l.conditional_sample_rules;
    c ? (s[a] = { enable: c, sample_rate: u, effectiveSampleRate: u * r, hit: Wn(t, u, n, i, o) }, f && (s[a].conditional_hit_rules = f.map(function(h) {
      var v = h.sample_rate, S = h.filter;
      return { sample_rate: v, hit: Wn(t, v, n, i, o), effectiveSampleRate: v * r, filter: S };
    }))) : s[a] = { enable: c, hit: function() {
      return false;
    }, sample_rate: 0, effectiveSampleRate: 0 };
  }), s;
}, tf = function(e, t, r, n, i) {
  if (!t) return ci;
  var o = t.sample_rate, s = t.include_users, a = t.sample_granularity, l = t.rules, c = t.r, u = c === void 0 ? Math.random() : c, f = Jt(s, e);
  if (f) return function(w) {
    return Lr(w, 1);
  };
  var h = a === "session", v = Wn(h, o, r, u, n), S = ef(l, h, o, r, u, n);
  return function(w) {
    var $;
    if (!v()) return h && i[0](), false;
    if (!(w.ev_type in S)) return Lr(w, o);
    if (!S[w.ev_type].enable) return h && i[1](w.ev_type), false;
    if (!(($ = w.common) === null || $ === void 0) && $.sample_rate) return w;
    var P = S[w.ev_type], I = P.conditional_hit_rules;
    if (I) {
      for (var m = 0; m < I.length; m++) if (zn(w, I[m].filter)) return I[m].hit() ? Lr(w, I[m].effectiveSampleRate) : false;
    }
    return P.hit() ? Lr(w, P.effectiveSampleRate) : (!(I && I.length) && h && i[1](w.ev_type), false);
  };
}, rf = function(e) {
  e.on("start", function() {
    var t = e.config(), r = t.userId, n = t.sample, i = [function() {
      e.destroy();
    }, function(s) {
      e.destroyAgent.removeByEvType(s);
    }], o = tf(r, n, vi, ql, i);
    e.on("build", o);
  });
}, nf = function() {
  var e = ce();
  return e && e.navigator.sendBeacon ? { get: function() {
  }, post: function(t, r) {
    e.navigator.sendBeacon(t, r);
  } } : { get: ge, post: ge };
};
function of(e) {
  var t = new Error(e);
  return t.name = "ReqeustServerError", t;
}
function co(e) {
  var t = new Error(e);
  return t.name = "RequestNetworkError", t;
}
var fo = function(e, t, r) {
  var n = t.url, i = t.data, o = t.success, s = o === void 0 ? ge : o, a = t.fail, l = a === void 0 ? ge : a, c = t.getResponseText, u = c === void 0 ? ge : c, f = t.withCredentials, h = f === void 0 ? false : f, v = new r();
  v.withCredentials = h, v.open(e, n, true), v.setRequestHeader("Content-Type", "application/json"), v.onload = function() {
    u?.(this.responseText);
    try {
      if (this.status >= 400) l(of(this.responseText || this.statusText));
      else if (this.responseText) {
        var S = JSON.parse(this.responseText);
        s(S);
      } else s({});
    } catch (w) {
      l(w);
    }
  }, v.onerror = function() {
    l(co("Network request failed"));
  }, v.onabort = function() {
    l(co("Network request aborted"));
  }, v.send(i);
}, sf = function() {
  var e = pu();
  return e ? { useBeacon: true, get: function(t) {
    fo("GET", t, e);
  }, post: function(t) {
    fo("POST", t, e);
  } } : { get: ge, post: ge };
};
function af(e) {
  var t = Pl(e), r = t.send;
  return wu(function() {
    if (e.transport.useBeacon) {
      var n = nf(), i = t.getBatchData();
      i && (n.post(t.getEndpoint(), i), t.clear()), t.send = function(o) {
        n.post(t.getEndpoint(), hs([o]));
      }, xu(function() {
        t.send = r;
      });
    } else t.flush();
  }), t;
}
var lf = "mon.zijieapi.com", uf = "https://lf3-short.ibytedapm.com/slardar/fe/sdk-web/plugins", dn = "1.16.4", cf = "SDK_SLARDAR_WEB", Us = "/monitor_web/settings/browser-settings", Hs = "/monitor_browser/collect/batch/", Bs = "SLARDAR", po = ["/log/sentry/", Hs, Us], qs = "session", ff = ["blankScreen", "action"], df = { sample_rate: 1, include_users: [], sample_granularity: qs, rules: {} }, pf = 20, hf = "";
function vf(e, t, r) {
  r === void 0 && (r = mf), yu(function() {
    e.on("init", function() {
      r(e, t);
    });
  });
}
var Ws = function(e, t, r, n) {
  n === void 0 && (n = Pi);
  var i = t.config(), o = i.plugins, s = i.pluginBundle, a = e.filter(function(c) {
    return o[c] && !t.destroyAgent.has(c);
  }), l = function() {
    return a.forEach(function(c) {
      return Kn(t, c, r);
    });
  };
  a.every(function(c) {
    return Ks(c, r);
  }) ? l() : n(t, { name: s.name }, l);
}, zs = function(e, t, r, n) {
  n === void 0 && (n = Pi);
  var i = t.config().plugins;
  e.filter(function(o) {
    return i[o] && !t.destroyAgent.has(o);
  }).forEach(function(o) {
    Ks(o, r) ? Kn(t, o, r) : n(t, { name: o, config: i[o] }, function() {
      return Kn(t, o, r);
    });
  });
}, gf = function(e) {
  return function(t, r) {
    var n, i = e.config().pluginBundle;
    e.destroyAgent.has(t) && e.destroyAgent.remove(t), r !== void 0 && e.set({ plugins: k(k({}, e.config().plugins), (n = {}, n[t] = r, n)) }), i && ~i.plugins.indexOf(t) ? Ws([t], e) : zs([t], e);
  };
};
function mf(e, t, r) {
  r === void 0 && (r = Pi);
  var n = e.config().pluginBundle, i = n ? n.plugins : [];
  Ws(i, e, t, r), zs(ff, e, t, r), e.provide("reloadPlugin", gf(e));
}
function Pi(e, t, r, n) {
  var i = t.name, o = t.config;
  n === void 0 && (n = Su);
  var s = _f(e, i, o);
  n(s, function() {
    r();
  });
}
function _f(e, t, r) {
  var n;
  return (n = r?.path) !== null && n !== void 0 ? n : e.config().pluginPathPrefix + "/" + $l(t) + "." + dn + "." + hf + "js";
}
function Kn(e, t, r) {
  if (r === void 0 && (r = tr(ce())), !!r) {
    var n = Ci(r, t);
    if (!n) {
      Qr("[loader].applyPlugin not found", t);
      return;
    }
    try {
      if (e.destroyAgent.has(t)) return;
      n.apply(e);
    } catch (i) {
      Es(i), Qr("[loader].applyPlugin failed", t, i);
    }
  }
}
function Ci(e, t) {
  return e.plugins.filter(function(r) {
    return r.name === t && r.version === dn;
  })[0];
}
function Ks(e, t) {
  return t === void 0 && (t = tr(ce())), !t || !t.plugins ? false : !!Ci(t, e);
}
function Gs(e, t, r) {
  r === void 0 && (r = tr(ce())), !(!r || !r.plugins) && (Ci(r, e) || r.plugins.push({ name: e, version: dn, apply: t }));
}
function Qs(e) {
  var t, r, n = ["userId", "deviceId", "sessionId", "env"];
  try {
    for (var i = xl(n), o = i.next(); !o.done; o = i.next()) {
      var s = o.value;
      e[s] || delete e[s];
    }
  } catch (a) {
    t = { error: a };
  } finally {
    try {
      o && !o.done && (r = i.return) && r.call(i);
    } finally {
      if (t) throw t.error;
    }
  }
  return e;
}
function bf(e) {
  var t = e.plugins || {};
  for (var r in t) t[r] && !me(t[r]) && (t[r] = {});
  return Qs(k(k({}, e), { plugins: t }));
}
function yf(e) {
  return me(e) && "bid" in e;
}
function wf(e) {
  return Qs(k({}, e));
}
function xf(e) {
  var t;
  if (!e) return {};
  var r = e.sample, n = e.plugins, i = e.timestamp, o = e.quota_rate, s = o === void 0 ? 1 : o, a = e.apdex;
  if (!r) return {};
  var l = r.sample_rate, c = r.sample_granularity, u = c === void 0 ? qs : c, f = r.include_users, h = r.rules, v = h === void 0 ? [] : h;
  return { sample: { include_users: f, sample_rate: l * s, sample_granularity: u, rules: v.reduce(function(S, w) {
    var $ = w.name, P = w.enable, I = w.sample_rate, m = w.conditional_sample_rules;
    return S[$] = { enable: P, sample_rate: I, conditional_sample_rules: m }, S;
  }, {}) }, plugins: { heatmap: (t = n?.heatmap) !== null && t !== void 0 ? t : false }, apdex: a, serverTimestamp: i };
}
var Sf = function(e, t) {
  return t === void 0 && (t = Hs), (e && e.indexOf("//") >= 0 ? "" : "https://") + e + t;
}, Ef = function(e, t) {
  return t === void 0 && (t = Us), (e && e.indexOf("//") >= 0 ? "" : "https://") + e + t;
}, Pf = function() {
  return Hn();
}, Cf = function(e) {
  var t = [];
  return e.observe = function(r) {
    t.push(r);
  }, e.push = function() {
    for (var r, n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    return n.forEach(function(o) {
      t.forEach(function(s) {
        return s(o);
      });
    }), (r = [].push).call.apply(r, Be([e], H(n), false));
  }, e;
}, Js = function(e) {
  return Bs + e;
}, Ys = function(e, t) {
  return Bs + e + "::setting::" + t;
}, Tf = function(e, t) {
  try {
    var r = localStorage.getItem(e);
    if (!r || !_i() || r[0] !== "{") return;
    bi(e, JSON.parse(r), t);
  } catch {
  }
}, Of = function(e, t) {
  e === void 0 && (e = "");
  var r = { userId: Hn(), deviceId: Hn() };
  if (t <= 0) return r;
  var n = Js(e);
  Tf(n, t);
  var i = Os(n);
  return { userId: i?.userId || r.userId, deviceId: i?.deviceId || r.deviceId };
}, If = function(e) {
  var t = e.bid, r = e.userId, n = e.deviceId, i = e.storageExpires, o = Js(t);
  bi(o, { userId: r, deviceId: n }, Is(i));
}, Rf = function(e, t) {
  var r = Ys(e, t);
  return Os(r);
}, Af = function(e, t, r, n) {
  var i = Ys(t, r);
  bi(i, e, n);
}, kf = { get: function() {
  return this.__SLARDAR__REPALCE__HOLDER__;
} }, Df = function(e) {
  var t = e, r, n = {}, i = kf.get(), o, s = ge, a = ge;
  return { getConfig: function() {
    return t;
  }, setConfig: function(u) {
    return n = k(k({}, n), u || {}), l(), r || (r = u, t.useLocalConfig || !t.bid ? (o = {}, s()) : i ? c() : Mf(t.transport, t.domain, t.bid, function(f) {
      i = f, c();
    }, t.serverSettingStorageExpires)), t;
  }, onChange: function(u) {
    a = u;
  }, onReady: function(u) {
    s = function() {
      If(t), u();
    }, o && s();
  } };
  function l() {
    var u = k(k(k({}, e), o || {}), n);
    u.plugins = Ml(e.plugins, o?.plugins || {}, n.plugins || {}), u.sample = ho(ho(e.sample, o?.sample), n.sample), t = u, a();
  }
  function c() {
    o = xf(i), l(), s();
  }
};
function Mf(e, t, r, n, i) {
  i === void 0 && (i = 0);
  var o = 3, s = 2e3, a = 1e-3, l = ce(), c = Rf(r, t), u = Ou(), f = 0, h = false, v;
  if (u()) return I();
  S();
  function S() {
    f++, e.get({ withCredentials: true, url: Ef(t) + "?bid=" + r + "&store=1", success: function(m) {
      w(m.data || {}, true);
    }, fail: $ });
  }
  function w(m, E) {
    h || (h = true, E && i && Af(m, r, t, i), v && (v(), v = void 0), n(m));
  }
  function $(m) {
    if (c) return w(c, false);
    if (P(m) && l) {
      l.setTimeout(S, s);
      return;
    }
    return w({ sample: { sample_rate: a } }, false);
  }
  function P(m) {
    return f >= o || m.name !== "RequestNetworkError" ? false : gu();
  }
  function I() {
    if (c) return w(c, false);
    v = Iu(S);
  }
}
function ho(e, t) {
  if (!e || !t) return e || t;
  var r = k(k({}, e), t);
  return r.include_users = Be(Be([], H(e.include_users || []), false), H(t.include_users || []), false), r.rules = Be(Be([], H(Object.keys(e.rules || {})), false), H(Object.keys(t.rules || {})), false).reduce(function(n, i) {
    var o, s;
    return i in n || (i in (e.rules || {}) && i in (t.rules || {}) ? (n[i] = k(k({}, e.rules[i]), t.rules[i]), n[i].conditional_sample_rules = Be(Be([], H(e.rules[i].conditional_sample_rules || []), false), H(t.rules[i].conditional_sample_rules || []), false)) : n[i] = ((o = e.rules) === null || o === void 0 ? void 0 : o[i]) || ((s = t.rules) === null || s === void 0 ? void 0 : s[i])), n;
  }, {}), r;
}
var Lf = { build: function(e) {
  return { ev_type: e.ev_type, payload: e.payload, common: k(k({}, e.extra || {}), e.overrides || {}) };
} }, Nf = function(e, t) {
  var r = t || {}, n = r.pid, i = n === void 0 ? "" : n, o = r.viewId, s = o === void 0 ? "" : o, a = { url: gi(), timestamp: le(), sdk_version: dn, sdk_name: cf, pid: i, view_id: s };
  return k(k({}, e), { extra: k(k({}, a), e.extra || {}) });
}, $f = function(e) {
  e.on("report", function(t) {
    return Nf(t, e.config());
  }), e.on("init", function() {
    var t = e.config(), r = t.pid, n = t.viewId, i = e.getPreStartQueue();
    i.forEach(function(o, s) {
      var a = o.extra || {};
      i[s] = k(k({}, o), { extra: k(k({}, a), { pid: a.pid || r, view_id: a.view_id || n }) });
    });
  });
}, Vf = { sri: "reportSri", st: "reportResourceError", err: "captureException", reject: "captureException" }, Ff = function(e) {
  return Object.keys(e).reduce(function(t, r) {
    return t[r] = [], t;
  }, {});
}, jf = function(e) {
  return Object.keys(e).reduce(function(t, r) {
    return t[e[r]] ? t[e[r]].push(r) : t[e[r]] = [r], t;
  }, {});
}, Uf = function(e, t, r) {
  return function(n, i, o, s) {
    var a;
    o === void 0 && (o = le()), s === void 0 && (s = location.href);
    var l = k(k({}, Ps(e)), { url: s, timestamp: o });
    t[n] && (e[r[n]] ? mi(e, l)(function() {
      e[r[n]](i);
    }) : (a = t[n]) === null || a === void 0 || a.push([i, l]));
  };
}, Hf = function(e, t, r) {
  return function(n) {
    n in r && r[n].forEach(function(i) {
      var o;
      (o = t[i]) === null || o === void 0 || o.forEach(function(s) {
        var a = H(s, 2), l = a[0], c = a[1];
        mi(e, c)(function() {
          e[n](l);
        });
      }), t[i] = null;
    });
  };
}, Tn = function(e, t) {
  return t === "err" ? Gr(e, "plugins." + oo + ".onerror", function(r, n) {
    return r[n];
  }) !== false : t === "reject" ? Gr(e, "plugins." + oo + ".onunhandledrejection", function(r, n) {
    return r[n];
  }) !== false : true;
}, Bf = function(e, t) {
  var r;
  t === void 0 && (t = Vf);
  var n = Ff(t), i = jf(t), o = Uf(e, n, t);
  !((r = e.p) === null || r === void 0) && r.a && "observe" in e.p.a && e.p.a.observe(function(s) {
    var a = H(s, 5);
    a[0];
    var l = a[1], c = a[2], u = a[3], f = a[4], h = e.config();
    Tn(h, l) && o(l, c, u, f);
  }), e.on("init", function() {
    var s, a = e.config();
    (s = e.p) === null || s === void 0 || s.a.forEach(function(l) {
      var c = H(l, 5);
      c[0];
      var u = c[1], f = c[2], h = c[3], v = c[4];
      Tn(a, u) && o(u, f, h, v);
    }), e.p && e.p.a && (e.p.a.length = 0), e.provide("precollect", function(l, c, u, f) {
      u === void 0 && (u = le()), f === void 0 && (f = location.href), Tn(a, l) && o(l, c, u, f);
    });
  }), e.on("provide", Hf(e, n, i));
}, vo = function(e) {
  var t = H(e, 2), r = t[0], n = t[1];
  return { ev_type: Ls, payload: { error: mc(r), breadcrumbs: [], extra: n || {} }, extra: { bid: "slardar_sdk" } };
}, qf = 1e-3, Wf = function(e, t) {
  t === void 0 && (t = qf);
  var r = tr(ce());
  r && (r.errors || (r.errors = []), !("observe" in r.errors) && vi(t) && (r.errors = Cf(r.errors), r.errors.forEach(function(n) {
    e.report(vo(n));
  }), r.errors.observe(function(n) {
    e.report(vo(n));
  })));
}, zf = 700, Kf = function(e) {
  var t, r = false;
  e.on("init", function() {
    t = (/* @__PURE__ */ new Date()).getTime(), e.on("config", function() {
      var n, i = (n = e.config()) === null || n === void 0 ? void 0 : n.serverTimestamp;
      if (!(isNaN(i) || Number(i) <= 0 || r)) {
        r = true;
        var o = (/* @__PURE__ */ new Date()).getTime(), s = o - t;
        if (s < zf && i) {
          var a = i - (o + t) / 2;
          !isNaN(a) && (a > 0 || a < -6e5) && e.on("beforeBuild", function(l) {
            var c;
            return k(k({}, l), { extra: k(k({}, (c = l.extra) !== null && c !== void 0 ? c : {}), { sdk_offset: a ?? 0 }) });
          });
        }
      }
    });
  });
}, Gf = function(e, t) {
  var r = {};
  return r.bid = t.bid, r.user_id = t.userId, r.device_id = t.deviceId, r.session_id = t.sessionId, r.release = t.release, r.env = t.env, k(k({}, e), { extra: k(k({}, r), e.extra || {}) });
}, Qf = function(e) {
  e.on("beforeBuild", function(t) {
    return Gf(t, e.config());
  });
}, Jf = function(e) {
  e.on("start", function() {
    var t = e.config().bid, r = e.getSender();
    r.setEndpoint(r.getEndpoint() + ("?biz_id=" + t));
  });
}, Yf = function(e) {
  var t = Is(e.storageExpires), r = Of(e.bid, t);
  return { bid: "", pid: "", viewId: Fs("_"), userId: r.userId, deviceId: r.deviceId, storageExpires: t, serverSettingStorageExpires: 0, sessionId: Pf(), domain: lf, pluginBundle: { name: "commonMonitors", plugins: ["breadcrumb", "jsError", "performance", "resourceError", "resource"] }, pluginPathPrefix: uf, plugins: { ajax: { ignoreUrls: po }, fetch: { ignoreUrls: po }, breadcrumb: {}, pageview: {}, jsError: {}, resource: {}, resourceError: {}, performance: {}, tti: {}, fmp: {}, blankScreen: false, heatmap: false }, release: "", env: "production", sample: df, transport: sf() };
}, Xf = function(e) {
  var t = e === void 0 ? {} : e, r = t.createSender, n = r === void 0 ? function(f) {
    return af({ size: pf, endpoint: Sf(f.domain), transport: f.transport });
  } : r, i = t.builder, o = i === void 0 ? Lf : i, s = t.createDefaultConfig, a = s === void 0 ? Yf : s, l = iu({ validateInitConfig: yf, initConfigNormalizer: bf, userConfigNormalizer: wf, createSender: n, builder: o, createDefaultConfig: a, createConfigManager: Df });
  Wf(l), ou(l);
  var c = tr(ce());
  cu(l, c && c.subject), Kf(l), Qf(l), $f(l), Jc(l), Jf(l);
  var u = su(l, Ps, function(f, h, v) {
    return mi(f, h)(function() {
      var S = H(v), w = S[0], $ = S.slice(1);
      l[w].apply(l, Be([], H($), false));
    });
  });
  return au(u, Gs), fu(u), u;
}, lr, On = (lr = {}, lr[Yr] = qc, lr[wi] = sc, lr[Si] = pc, lr), Xs = function(e) {
  e === void 0 && (e = {});
  var t = Xf(e);
  return rf(t), Bf(t), Qc(t), Object.keys(On).forEach(function(r) {
    Gs(r, On[r]), On[r](t);
  }), vf(t), t.provide("create", Xs), t;
}, In = "precollect", go = 1e3 * 60 * 5;
function Zf(e, t) {
  if ("addEventListener" in e) {
    t.pcErr = function(n) {
      n = n || e.event;
      var i = n.target || n.srcElement || {};
      i instanceof Element || i instanceof HTMLElement ? t(In, "st", { tagName: i.tagName, url: i.getAttribute("href") || i.getAttribute("src") }) : t(In, "err", n.error);
    }, t.pcRej = function(n) {
      n = n || e.event, t(In, "reject", n.reason || n.detail && n.detail.reason);
    };
    var r = [];
    r.push(ft(e, "error", t.pcErr, true)), r.push(ft(e, "unhandledrejection", t.pcRej, true)), setTimeout(function() {
      r.forEach(function(n) {
        return n();
      });
    }, go);
  }
  "PerformanceObserver" in e && "PerformanceLongTaskTiming" in e && (t.pp = { entries: [] }, t.pp.observer = new PerformanceObserver(function(n) {
    t.pp.entries = t.pp.entries.concat(n.getEntries());
  }), t.pp.observer.observe({ entryTypes: ["longtask"] }), setTimeout(function() {
    t.pp.observer.disconnect();
  }, go));
}
var Br = Xs(), mo = ce();
mo && Zf(mo, Br);
const _o = ["RequestError", "AbortError", "TimeoutError", "cancelled", "Stream read timeout after", "get cert timeout", "internal/net", "unexcepted status code", "ETIMEDOUT", "ECONNRESET", "Invalid WebSocket frame", "WebSocket was closed", "/ws/lib/", "Request failed:"], ed = [{ pattern: /([/\\]Users[/\\])[^/\\]+([/\\])/gi, replacement: "$1[USERNAME]$2" }, { pattern: /([/\\])\d+(?:\.\d+){1,}([/\\])/g, replacement: "$1[VERSION]$2" }, { pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, replacement: "[UUID]" }, { pattern: /[\d.]+ ?(bytes|[KMGT]i?B)\b/gi, replacement: "[SIZE] $1" }, { pattern: /[\d.]+%/g, replacement: "[PERCENT]" }];
function bo(e) {
  let t = e;
  for (const r of ed) t = t.replace(r.pattern, r.replacement);
  return t;
}
function td(e) {
  if (_o.length === 0) return false;
  let t = "";
  return e instanceof Error ? t = `${e.name} ${e.message} ${e.stack ?? ""}` : typeof e == "string" ? t = e : t = String(e), _o.some((r) => t.includes(r));
}
function rd(e) {
  const r = new URLSearchParams(window.location.search).get("global_config"), n = JSON.parse(r ?? "{}");
  Br.on("beforeSend", (i) => {
    const s = i?.payload?.error;
    if (s) {
      const a = { name: s.name ?? "", message: s.message ?? "", stack: s.stack ?? "" };
      if (td(a)) return false;
      s.message && (s.message = bo(s.message)), s.stack && (s.stack = bo(s.stack));
    }
    return i;
  }), Br.init({ bid: "luna_pc", deviceId: n.deviceId, userId: n.deviceId, pid: e, release: "3.7.0", env: "production" }), Br.start();
}
rd("lyrics");
function Ti(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const ae = {}, Ut = [], ot = () => {
}, Zs = () => false, pn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Oi = (e) => e.startsWith("onUpdate:"), De = Object.assign, Ii = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, nd = Object.prototype.hasOwnProperty, te = (e, t) => nd.call(e, t), K = Array.isArray, Ht = (e) => hn(e) === "[object Map]", ea = (e) => hn(e) === "[object Set]", z = (e) => typeof e == "function", he = (e) => typeof e == "string", gt = (e) => typeof e == "symbol", ue = (e) => e !== null && typeof e == "object", ta = (e) => (ue(e) || z(e)) && z(e.then) && z(e.catch), ra = Object.prototype.toString, hn = (e) => ra.call(e), id = (e) => hn(e).slice(8, -1), na = (e) => hn(e) === "[object Object]", Ri = (e) => he(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, pr = Ti(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), vn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, od = /-\w/g, Je = vn((e) => e.replace(od, (t) => t.slice(1).toUpperCase())), sd = /\B([A-Z])/g, Lt = vn((e) => e.replace(sd, "-$1").toLowerCase()), gn = vn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Rn = vn((e) => e ? `on${gn(e)}` : ""), Tt = (e, t) => !Object.is(e, t), An = (e, ...t) => {
  for (let r = 0; r < e.length; r++) e[r](...t);
}, ia = (e, t, r, n = false) => {
  Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: n, value: r });
}, ad = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let yo;
const mn = () => yo || (yo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ke(e) {
  if (K(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], i = he(n) ? fd(n) : Ke(n);
      if (i) for (const o in i) t[o] = i[o];
    }
    return t;
  } else if (he(e) || ue(e)) return e;
}
const ld = /;(?![^(]*\))/g, ud = /:([^]+)/, cd = /\/\*[^]*?\*\//g;
function fd(e) {
  const t = {};
  return e.replace(cd, "").split(ld).forEach((r) => {
    if (r) {
      const n = r.split(ud);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Pe(e) {
  let t = "";
  if (he(e)) t = e;
  else if (K(e)) for (let r = 0; r < e.length; r++) {
    const n = Pe(e[r]);
    n && (t += n + " ");
  }
  else if (ue(e)) for (const r in e) e[r] && (t += r + " ");
  return t.trim();
}
const dd = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", pd = Ti(dd);
function oa(e) {
  return !!e || e === "";
}
const sa = (e) => !!(e && e.__v_isRef === true), Bt = (e) => he(e) ? e : e == null ? "" : K(e) || ue(e) && (e.toString === ra || !z(e.toString)) ? sa(e) ? Bt(e.value) : JSON.stringify(e, aa, 2) : String(e), aa = (e, t) => sa(t) ? aa(e, t.value) : Ht(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((r, [n, i], o) => (r[kn(n, o) + " =>"] = i, r), {}) } : ea(t) ? { [`Set(${t.size})`]: [...t.values()].map((r) => kn(r)) } : gt(t) ? kn(t) : ue(t) && !K(t) && !na(t) ? String(t) : t, kn = (e, t = "") => {
  var r;
  return gt(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e;
};
let Oe;
class hd {
  constructor(t = false) {
    this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = Oe, !t && Oe && (this.index = (Oe.scopes || (Oe.scopes = [])).push(this) - 1);
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
      const r = Oe;
      try {
        return Oe = this, t();
      } finally {
        Oe = r;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = Oe, Oe = this);
  }
  off() {
    this._on > 0 && --this._on === 0 && (Oe = this.prevScope, this.prevScope = void 0);
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
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function la() {
  return Oe;
}
function vd(e, t = false) {
  Oe && Oe.cleanups.push(e);
}
let se;
const Dn = /* @__PURE__ */ new WeakSet();
class ua {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Oe && Oe.active && Oe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Dn.has(this) && (Dn.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || fa(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, wo(this), da(this);
    const t = se, r = Ye;
    se = this, Ye = true;
    try {
      return this.fn();
    } finally {
      pa(this), se = t, Ye = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Di(t);
      this.deps = this.depsTail = void 0, wo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Dn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    Gn(this) && this.run();
  }
  get dirty() {
    return Gn(this);
  }
}
let ca = 0, hr, vr;
function fa(e, t = false) {
  if (e.flags |= 8, t) {
    e.next = vr, vr = e;
    return;
  }
  e.next = hr, hr = e;
}
function Ai() {
  ca++;
}
function ki() {
  if (--ca > 0) return;
  if (vr) {
    let t = vr;
    for (vr = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; hr; ) {
    let t = hr;
    for (hr = void 0; t; ) {
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
function da(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function pa(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === r && (r = i), Di(n), gd(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = r;
}
function Gn(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (ha(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e._dirty;
}
function ha(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === xr) || (e.globalVersion = xr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Gn(e)))) return;
  e.flags |= 2;
  const t = e.dep, r = se, n = Ye;
  se = e, Ye = true;
  try {
    da(e);
    const i = e.fn(e._value);
    (t.version === 0 || Tt(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    se = r, Ye = n, pa(e), e.flags &= -3;
  }
}
function Di(e, t = false) {
  const { dep: r, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let o = r.computed.deps; o; o = o.nextDep) Di(o, true);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function gd(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
let Ye = true;
const va = [];
function dt() {
  va.push(Ye), Ye = false;
}
function pt() {
  const e = va.pop();
  Ye = e === void 0 ? true : e;
}
function wo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = se;
    se = void 0;
    try {
      t();
    } finally {
      se = r;
    }
  }
}
let xr = 0;
class md {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Mi {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
  }
  track(t) {
    if (!se || !Ye || se === this.computed) return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== se) r = this.activeLink = new md(se, this), se.deps ? (r.prevDep = se.depsTail, se.depsTail.nextDep = r, se.depsTail = r) : se.deps = se.depsTail = r, ga(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const n = r.nextDep;
      n.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = n), r.prevDep = se.depsTail, r.nextDep = void 0, se.depsTail.nextDep = r, se.depsTail = r, se.deps === r && (se.deps = n);
    }
    return r;
  }
  trigger(t) {
    this.version++, xr++, this.notify(t);
  }
  notify(t) {
    Ai();
    try {
      for (let r = this.subs; r; r = r.prevSub) r.sub.notify() && r.sub.dep.notify();
    } finally {
      ki();
    }
  }
}
function ga(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep) ga(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const Qn = /* @__PURE__ */ new WeakMap(), At = Symbol(""), Jn = Symbol(""), Sr = Symbol("");
function Ie(e, t, r) {
  if (Ye && se) {
    let n = Qn.get(e);
    n || Qn.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(r);
    i || (n.set(r, i = new Mi()), i.map = n, i.key = r), i.track();
  }
}
function ct(e, t, r, n, i, o) {
  const s = Qn.get(e);
  if (!s) {
    xr++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (Ai(), t === "clear") s.forEach(a);
  else {
    const l = K(e), c = l && Ri(r);
    if (l && r === "length") {
      const u = Number(n);
      s.forEach((f, h) => {
        (h === "length" || h === Sr || !gt(h) && h >= u) && a(f);
      });
    } else switch ((r !== void 0 || s.has(void 0)) && a(s.get(r)), c && a(s.get(Sr)), t) {
      case "add":
        l ? c && a(s.get("length")) : (a(s.get(At)), Ht(e) && a(s.get(Jn)));
        break;
      case "delete":
        l || (a(s.get(At)), Ht(e) && a(s.get(Jn)));
        break;
      case "set":
        Ht(e) && a(s.get(At));
        break;
    }
  }
  ki();
}
function Vt(e) {
  const t = ee(e);
  return t === e ? t : (Ie(t, "iterate", Sr), Ge(e) ? t : t.map(Xe));
}
function _n(e) {
  return Ie(e = ee(e), "iterate", Sr), e;
}
function wt(e, t) {
  return ht(e) ? kt(e) ? Zt(Xe(t)) : Zt(t) : Xe(t);
}
const _d = { __proto__: null, [Symbol.iterator]() {
  return Mn(this, Symbol.iterator, (e) => wt(this, e));
}, concat(...e) {
  return Vt(this).concat(...e.map((t) => K(t) ? Vt(t) : t));
}, entries() {
  return Mn(this, "entries", (e) => (e[1] = wt(this, e[1]), e));
}, every(e, t) {
  return lt(this, "every", e, t, void 0, arguments);
}, filter(e, t) {
  return lt(this, "filter", e, t, (r) => r.map((n) => wt(this, n)), arguments);
}, find(e, t) {
  return lt(this, "find", e, t, (r) => wt(this, r), arguments);
}, findIndex(e, t) {
  return lt(this, "findIndex", e, t, void 0, arguments);
}, findLast(e, t) {
  return lt(this, "findLast", e, t, (r) => wt(this, r), arguments);
}, findLastIndex(e, t) {
  return lt(this, "findLastIndex", e, t, void 0, arguments);
}, forEach(e, t) {
  return lt(this, "forEach", e, t, void 0, arguments);
}, includes(...e) {
  return Ln(this, "includes", e);
}, indexOf(...e) {
  return Ln(this, "indexOf", e);
}, join(e) {
  return Vt(this).join(e);
}, lastIndexOf(...e) {
  return Ln(this, "lastIndexOf", e);
}, map(e, t) {
  return lt(this, "map", e, t, void 0, arguments);
}, pop() {
  return ur(this, "pop");
}, push(...e) {
  return ur(this, "push", e);
}, reduce(e, ...t) {
  return xo(this, "reduce", e, t);
}, reduceRight(e, ...t) {
  return xo(this, "reduceRight", e, t);
}, shift() {
  return ur(this, "shift");
}, some(e, t) {
  return lt(this, "some", e, t, void 0, arguments);
}, splice(...e) {
  return ur(this, "splice", e);
}, toReversed() {
  return Vt(this).toReversed();
}, toSorted(e) {
  return Vt(this).toSorted(e);
}, toSpliced(...e) {
  return Vt(this).toSpliced(...e);
}, unshift(...e) {
  return ur(this, "unshift", e);
}, values() {
  return Mn(this, "values", (e) => wt(this, e));
} };
function Mn(e, t, r) {
  const n = _n(e), i = n[t]();
  return n !== e && !Ge(e) && (i._next = i.next, i.next = () => {
    const o = i._next();
    return o.done || (o.value = r(o.value)), o;
  }), i;
}
const bd = Array.prototype;
function lt(e, t, r, n, i, o) {
  const s = _n(e), a = s !== e && !Ge(e), l = s[t];
  if (l !== bd[t]) {
    const f = l.apply(e, o);
    return a ? Xe(f) : f;
  }
  let c = r;
  s !== e && (a ? c = function(f, h) {
    return r.call(this, wt(e, f), h, e);
  } : r.length > 2 && (c = function(f, h) {
    return r.call(this, f, h, e);
  }));
  const u = l.call(s, c, n);
  return a && i ? i(u) : u;
}
function xo(e, t, r, n) {
  const i = _n(e);
  let o = r;
  return i !== e && (Ge(e) ? r.length > 3 && (o = function(s, a, l) {
    return r.call(this, s, a, l, e);
  }) : o = function(s, a, l) {
    return r.call(this, s, wt(e, a), l, e);
  }), i[t](o, ...n);
}
function Ln(e, t, r) {
  const n = ee(e);
  Ie(n, "iterate", Sr);
  const i = n[t](...r);
  return (i === -1 || i === false) && $i(r[0]) ? (r[0] = ee(r[0]), n[t](...r)) : i;
}
function ur(e, t, r = []) {
  dt(), Ai();
  const n = ee(e)[t].apply(e, r);
  return ki(), pt(), n;
}
const yd = Ti("__proto__,__v_isRef,__isVue"), ma = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(gt));
function wd(e) {
  gt(e) || (e = String(e));
  const t = ee(this);
  return Ie(t, "has", e), t.hasOwnProperty(e);
}
class _a {
  constructor(t = false, r = false) {
    this._isReadonly = t, this._isShallow = r;
  }
  get(t, r, n) {
    if (r === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, o = this._isShallow;
    if (r === "__v_isReactive") return !i;
    if (r === "__v_isReadonly") return i;
    if (r === "__v_isShallow") return o;
    if (r === "__v_raw") return n === (i ? o ? Ad : xa : o ? wa : ya).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const s = K(t);
    if (!i) {
      let l;
      if (s && (l = _d[r])) return l;
      if (r === "hasOwnProperty") return wd;
    }
    const a = Reflect.get(t, r, Ae(t) ? t : n);
    if ((gt(r) ? ma.has(r) : yd(r)) || (i || Ie(t, "get", r), o)) return a;
    if (Ae(a)) {
      const l = s && Ri(r) ? a : a.value;
      return i && ue(l) ? Xr(l) : l;
    }
    return ue(a) ? i ? Xr(a) : Nt(a) : a;
  }
}
class ba extends _a {
  constructor(t = false) {
    super(false, t);
  }
  set(t, r, n, i) {
    let o = t[r];
    const s = K(t) && Ri(r);
    if (!this._isShallow) {
      const c = ht(o);
      if (!Ge(n) && !ht(n) && (o = ee(o), n = ee(n)), !s && Ae(o) && !Ae(n)) return c || (o.value = n), true;
    }
    const a = s ? Number(r) < t.length : te(t, r), l = Reflect.set(t, r, n, Ae(t) ? t : i);
    return t === ee(i) && (a ? Tt(n, o) && ct(t, "set", r, n) : ct(t, "add", r, n)), l;
  }
  deleteProperty(t, r) {
    const n = te(t, r);
    t[r];
    const i = Reflect.deleteProperty(t, r);
    return i && n && ct(t, "delete", r, void 0), i;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!gt(r) || !ma.has(r)) && Ie(t, "has", r), n;
  }
  ownKeys(t) {
    return Ie(t, "iterate", K(t) ? "length" : At), Reflect.ownKeys(t);
  }
}
class xd extends _a {
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
const Sd = new ba(), Ed = new xd(), Pd = new ba(true);
const Yn = (e) => e, Nr = (e) => Reflect.getPrototypeOf(e);
function Cd(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, o = ee(i), s = Ht(o), a = e === "entries" || e === Symbol.iterator && s, l = e === "keys" && s, c = i[e](...n), u = r ? Yn : t ? Zt : Xe;
    return !t && Ie(o, "iterate", l ? Jn : At), { next() {
      const { value: f, done: h } = c.next();
      return h ? { value: f, done: h } : { value: a ? [u(f[0]), u(f[1])] : u(f), done: h };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function $r(e) {
  return function(...t) {
    return e === "delete" ? false : e === "clear" ? void 0 : this;
  };
}
function Td(e, t) {
  const r = { get(i) {
    const o = this.__v_raw, s = ee(o), a = ee(i);
    e || (Tt(i, a) && Ie(s, "get", i), Ie(s, "get", a));
    const { has: l } = Nr(s), c = t ? Yn : e ? Zt : Xe;
    if (l.call(s, i)) return c(o.get(i));
    if (l.call(s, a)) return c(o.get(a));
    o !== s && o.get(i);
  }, get size() {
    const i = this.__v_raw;
    return !e && Ie(ee(i), "iterate", At), i.size;
  }, has(i) {
    const o = this.__v_raw, s = ee(o), a = ee(i);
    return e || (Tt(i, a) && Ie(s, "has", i), Ie(s, "has", a)), i === a ? o.has(i) : o.has(i) || o.has(a);
  }, forEach(i, o) {
    const s = this, a = s.__v_raw, l = ee(a), c = t ? Yn : e ? Zt : Xe;
    return !e && Ie(l, "iterate", At), a.forEach((u, f) => i.call(o, c(u), c(f), s));
  } };
  return De(r, e ? { add: $r("add"), set: $r("set"), delete: $r("delete"), clear: $r("clear") } : { add(i) {
    !t && !Ge(i) && !ht(i) && (i = ee(i));
    const o = ee(this);
    return Nr(o).has.call(o, i) || (o.add(i), ct(o, "add", i, i)), this;
  }, set(i, o) {
    !t && !Ge(o) && !ht(o) && (o = ee(o));
    const s = ee(this), { has: a, get: l } = Nr(s);
    let c = a.call(s, i);
    c || (i = ee(i), c = a.call(s, i));
    const u = l.call(s, i);
    return s.set(i, o), c ? Tt(o, u) && ct(s, "set", i, o) : ct(s, "add", i, o), this;
  }, delete(i) {
    const o = ee(this), { has: s, get: a } = Nr(o);
    let l = s.call(o, i);
    l || (i = ee(i), l = s.call(o, i)), a && a.call(o, i);
    const c = o.delete(i);
    return l && ct(o, "delete", i, void 0), c;
  }, clear() {
    const i = ee(this), o = i.size !== 0, s = i.clear();
    return o && ct(i, "clear", void 0, void 0), s;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    r[i] = Cd(i, e, t);
  }), r;
}
function Li(e, t) {
  const r = Td(e, t);
  return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(te(r, i) && i in n ? r : n, i, o);
}
const Od = { get: Li(false, false) }, Id = { get: Li(false, true) }, Rd = { get: Li(true, false) };
const ya = /* @__PURE__ */ new WeakMap(), wa = /* @__PURE__ */ new WeakMap(), xa = /* @__PURE__ */ new WeakMap(), Ad = /* @__PURE__ */ new WeakMap();
function kd(e) {
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
function Dd(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : kd(id(e));
}
function Nt(e) {
  return ht(e) ? e : Ni(e, false, Sd, Od, ya);
}
function Md(e) {
  return Ni(e, false, Pd, Id, wa);
}
function Xr(e) {
  return Ni(e, true, Ed, Rd, xa);
}
function Ni(e, t, r, n, i) {
  if (!ue(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = Dd(e);
  if (o === 0) return e;
  const s = i.get(e);
  if (s) return s;
  const a = new Proxy(e, o === 2 ? n : r);
  return i.set(e, a), a;
}
function kt(e) {
  return ht(e) ? kt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ht(e) {
  return !!(e && e.__v_isReadonly);
}
function Ge(e) {
  return !!(e && e.__v_isShallow);
}
function $i(e) {
  return e ? !!e.__v_raw : false;
}
function ee(e) {
  const t = e && e.__v_raw;
  return t ? ee(t) : e;
}
function Ld(e) {
  return !te(e, "__v_skip") && Object.isExtensible(e) && ia(e, "__v_skip", true), e;
}
const Xe = (e) => ue(e) ? Nt(e) : e, Zt = (e) => ue(e) ? Xr(e) : e;
function Ae(e) {
  return e ? e.__v_isRef === true : false;
}
function ke(e) {
  return Ea(e, false);
}
function Sa(e) {
  return Ea(e, true);
}
function Ea(e, t) {
  return Ae(e) ? e : new Nd(e, t);
}
class Nd {
  constructor(t, r) {
    this.dep = new Mi(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = r ? t : ee(t), this._value = r ? t : Xe(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, n = this.__v_isShallow || Ge(t) || ht(t);
    t = n ? t : ee(t), Tt(t, r) && (this._rawValue = t, this._value = n ? t : Xe(t), this.dep.trigger());
  }
}
function M(e) {
  return Ae(e) ? e.value : e;
}
const $d = { get: (e, t, r) => t === "__v_raw" ? e : M(Reflect.get(e, t, r)), set: (e, t, r, n) => {
  const i = e[t];
  return Ae(i) && !Ae(r) ? (i.value = r, true) : Reflect.set(e, t, r, n);
} };
function Pa(e) {
  return kt(e) ? e : new Proxy(e, $d);
}
class Vd {
  constructor(t, r, n) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new Mi(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = xr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && se !== this) return fa(this, true), true;
  }
  get value() {
    const t = this.dep.track();
    return ha(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Fd(e, t, r = false) {
  let n, i;
  return z(e) ? n = e : (n = e.get, i = e.set), new Vd(n, i, r);
}
const Vr = {}, Zr = /* @__PURE__ */ new WeakMap();
let Rt;
function jd(e, t = false, r = Rt) {
  if (r) {
    let n = Zr.get(r);
    n || Zr.set(r, n = []), n.push(e);
  }
}
function Ud(e, t, r = ae) {
  const { immediate: n, deep: i, once: o, scheduler: s, augmentJob: a, call: l } = r, c = (E) => i ? E : Ge(E) || i === false || i === 0 ? Et(E, 1) : Et(E);
  let u, f, h, v, S = false, w = false;
  if (Ae(e) ? (f = () => e.value, S = Ge(e)) : kt(e) ? (f = () => c(e), S = true) : K(e) ? (w = true, S = e.some((E) => kt(E) || Ge(E)), f = () => e.map((E) => {
    if (Ae(E)) return E.value;
    if (kt(E)) return c(E);
    if (z(E)) return l ? l(E, 2) : E();
  })) : z(e) ? t ? f = l ? () => l(e, 2) : e : f = () => {
    if (h) {
      dt();
      try {
        h();
      } finally {
        pt();
      }
    }
    const E = Rt;
    Rt = u;
    try {
      return l ? l(e, 3, [v]) : e(v);
    } finally {
      Rt = E;
    }
  } : f = ot, t && i) {
    const E = f, D = i === true ? 1 / 0 : i;
    f = () => Et(E(), D);
  }
  const $ = la(), P = () => {
    u.stop(), $ && $.active && Ii($.effects, u);
  };
  if (o && t) {
    const E = t;
    t = (...D) => {
      E(...D), P();
    };
  }
  let I = w ? new Array(e.length).fill(Vr) : Vr;
  const m = (E) => {
    if (!(!(u.flags & 1) || !u.dirty && !E)) if (t) {
      const D = u.run();
      if (i || S || (w ? D.some((W, G) => Tt(W, I[G])) : Tt(D, I))) {
        h && h();
        const W = Rt;
        Rt = u;
        try {
          const G = [D, I === Vr ? void 0 : w && I[0] === Vr ? [] : I, v];
          I = D, l ? l(t, 3, G) : t(...G);
        } finally {
          Rt = W;
        }
      }
    } else u.run();
  };
  return a && a(m), u = new ua(f), u.scheduler = s ? () => s(m, false) : m, v = (E) => jd(E, false, u), h = u.onStop = () => {
    const E = Zr.get(u);
    if (E) {
      if (l) l(E, 4);
      else for (const D of E) D();
      Zr.delete(u);
    }
  }, t ? n ? m(true) : I = u.run() : s ? s(m.bind(null, true), true) : u.run(), P.pause = u.pause.bind(u), P.resume = u.resume.bind(u), P.stop = P, P;
}
function Et(e, t = 1 / 0, r) {
  if (t <= 0 || !ue(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t)) return e;
  if (r.set(e, t), t--, Ae(e)) Et(e.value, t, r);
  else if (K(e)) for (let n = 0; n < e.length; n++) Et(e[n], t, r);
  else if (ea(e) || Ht(e)) e.forEach((n) => {
    Et(n, t, r);
  });
  else if (na(e)) {
    for (const n in e) Et(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, n) && Et(e[n], t, r);
  }
  return e;
}
function Or(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    bn(i, t, r);
  }
}
function at(e, t, r, n) {
  if (z(e)) {
    const i = Or(e, t, r, n);
    return i && ta(i) && i.catch((o) => {
      bn(o, t, r);
    }), i;
  }
  if (K(e)) {
    const i = [];
    for (let o = 0; o < e.length; o++) i.push(at(e[o], t, r, n));
    return i;
  }
}
function bn(e, t, r, n = true) {
  const i = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = t && t.appContext.config || ae;
  if (t) {
    let a = t.parent;
    const l = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; a; ) {
      const u = a.ec;
      if (u) {
        for (let f = 0; f < u.length; f++) if (u[f](e, l, c) === false) return;
      }
      a = a.parent;
    }
    if (o) {
      dt(), Or(o, null, 10, [e, l, c]), pt();
      return;
    }
  }
  Hd(e, r, i, n, s);
}
function Hd(e, t, r, n = true, i = false) {
  if (i) throw e;
  console.error(e);
}
const Ne = [];
let nt = -1;
const qt = [];
let xt = null, jt = 0;
const Ca = Promise.resolve();
let en = null;
function Ta(e) {
  const t = en || Ca;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Bd(e) {
  let t = nt + 1, r = Ne.length;
  for (; t < r; ) {
    const n = t + r >>> 1, i = Ne[n], o = Er(i);
    o < e || o === e && i.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function Vi(e) {
  if (!(e.flags & 1)) {
    const t = Er(e), r = Ne[Ne.length - 1];
    !r || !(e.flags & 2) && t >= Er(r) ? Ne.push(e) : Ne.splice(Bd(t), 0, e), e.flags |= 1, Oa();
  }
}
function Oa() {
  en || (en = Ca.then(Ra));
}
function qd(e) {
  K(e) ? qt.push(...e) : xt && e.id === -1 ? xt.splice(jt + 1, 0, e) : e.flags & 1 || (qt.push(e), e.flags |= 1), Oa();
}
function So(e, t, r = nt + 1) {
  for (; r < Ne.length; r++) {
    const n = Ne[r];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      Ne.splice(r, 1), r--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function Ia(e) {
  if (qt.length) {
    const t = [...new Set(qt)].sort((r, n) => Er(r) - Er(n));
    if (qt.length = 0, xt) {
      xt.push(...t);
      return;
    }
    for (xt = t, jt = 0; jt < xt.length; jt++) {
      const r = xt[jt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    xt = null, jt = 0;
  }
}
const Er = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ra(e) {
  try {
    for (nt = 0; nt < Ne.length; nt++) {
      const t = Ne[nt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Or(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; nt < Ne.length; nt++) {
      const t = Ne[nt];
      t && (t.flags &= -2);
    }
    nt = -1, Ne.length = 0, Ia(), en = null, (Ne.length || qt.length) && Ra();
  }
}
let $e = null, Aa = null;
function tn(e) {
  const t = $e;
  return $e = e, Aa = e && e.type.__scopeId || null, t;
}
function ka(e, t = $e, r) {
  if (!t || e._n) return e;
  const n = (...i) => {
    n._d && Lo(-1);
    const o = tn(t);
    let s;
    try {
      s = e(...i);
    } finally {
      tn(o), n._d && Lo(1);
    }
    return s;
  };
  return n._n = true, n._c = true, n._d = true, n;
}
function Ot(e, t, r, n) {
  const i = e.dirs, o = t && t.dirs;
  for (let s = 0; s < i.length; s++) {
    const a = i[s];
    o && (a.oldValue = o[s].value);
    let l = a.dir[n];
    l && (dt(), at(l, r, 8, [e.el, a, e, t]), pt());
  }
}
function Wd(e, t) {
  if (Re) {
    let r = Re.provides;
    const n = Re.parent && Re.parent.provides;
    n === r && (r = Re.provides = Object.create(n)), r[e] = t;
  }
}
function qr(e, t, r = false) {
  const n = sl();
  if (n || zt) {
    let i = zt ? zt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i) return i[e];
    if (arguments.length > 1) return r && z(t) ? t.call(n && n.proxy) : t;
  }
}
const zd = Symbol.for("v-scx"), Kd = () => qr(zd);
function Ve(e, t, r) {
  return Da(e, t, r);
}
function Da(e, t, r = ae) {
  const { immediate: n, deep: i, flush: o, once: s } = r, a = De({}, r), l = t && n || !t && o !== "post";
  let c;
  if (Cr) {
    if (o === "sync") {
      const v = Kd();
      c = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!l) {
      const v = () => {
      };
      return v.stop = ot, v.resume = ot, v.pause = ot, v;
    }
  }
  const u = Re;
  a.call = (v, S, w) => at(v, u, S, w);
  let f = false;
  o === "post" ? a.scheduler = (v) => {
    We(v, u && u.suspense);
  } : o !== "sync" && (f = true, a.scheduler = (v, S) => {
    S ? v() : Vi(v);
  }), a.augmentJob = (v) => {
    t && (v.flags |= 4), f && (v.flags |= 2, u && (v.id = u.uid, v.i = u));
  };
  const h = Ud(e, t, a);
  return Cr && (c ? c.push(h) : l && h()), h;
}
function Gd(e, t, r) {
  const n = this.proxy, i = he(e) ? e.includes(".") ? Ma(n, e) : () => n[e] : e.bind(n, n);
  let o;
  z(t) ? o = t : (o = t.handler, r = t);
  const s = Ir(this), a = Da(i, o.bind(n), r);
  return s(), a;
}
function Ma(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < r.length && n; i++) n = n[r[i]];
    return n;
  };
}
const Qd = Symbol("_vte"), Jd = (e) => e.__isTeleport, Yd = Symbol("_leaveCb");
function Fi(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Fi(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function $t(e, t) {
  return z(e) ? De({ name: e.name }, t, { setup: e }) : e;
}
function La(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const rn = /* @__PURE__ */ new WeakMap();
function gr(e, t, r, n, i = false) {
  if (K(e)) {
    e.forEach((S, w) => gr(S, t && (K(t) ? t[w] : t), r, n, i));
    return;
  }
  if (Wt(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && gr(e, t, r, n.component.subTree);
    return;
  }
  const o = n.shapeFlag & 4 ? Wi(n.component) : n.el, s = i ? null : o, { i: a, r: l } = e, c = t && t.r, u = a.refs === ae ? a.refs = {} : a.refs, f = a.setupState, h = ee(f), v = f === ae ? Zs : (S) => te(h, S);
  if (c != null && c !== l) {
    if (Eo(t), he(c)) u[c] = null, v(c) && (f[c] = null);
    else if (Ae(c)) {
      c.value = null;
      const S = t;
      S.k && (u[S.k] = null);
    }
  }
  if (z(l)) Or(l, a, 12, [s, u]);
  else {
    const S = he(l), w = Ae(l);
    if (S || w) {
      const $ = () => {
        if (e.f) {
          const P = S ? v(l) ? f[l] : u[l] : l.value;
          if (i) K(P) && Ii(P, o);
          else if (K(P)) P.includes(o) || P.push(o);
          else if (S) u[l] = [o], v(l) && (f[l] = u[l]);
          else {
            const I = [o];
            l.value = I, e.k && (u[e.k] = I);
          }
        } else S ? (u[l] = s, v(l) && (f[l] = s)) : w && (l.value = s, e.k && (u[e.k] = s));
      };
      if (s) {
        const P = () => {
          $(), rn.delete(e);
        };
        P.id = -1, rn.set(e, P), We(P, r);
      } else Eo(e), $();
    }
  }
}
function Eo(e) {
  const t = rn.get(e);
  t && (t.flags |= 8, rn.delete(e));
}
mn().requestIdleCallback;
mn().cancelIdleCallback;
const Wt = (e) => !!e.type.__asyncLoader, Na = (e) => e.type.__isKeepAlive;
function Xd(e, t) {
  $a(e, "a", t);
}
function Zd(e, t) {
  $a(e, "da", t);
}
function $a(e, t, r = Re) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = r;
    for (; i; ) {
      if (i.isDeactivated) return;
      i = i.parent;
    }
    return e();
  });
  if (yn(t, n, r), r) {
    let i = r.parent;
    for (; i && i.parent; ) Na(i.parent.vnode) && e0(n, t, r, i), i = i.parent;
  }
}
function e0(e, t, r, n) {
  const i = yn(t, e, n, true);
  ji(() => {
    Ii(n[t], i);
  }, r);
}
function yn(e, t, r = Re, n = false) {
  if (r) {
    const i = r[e] || (r[e] = []), o = t.__weh || (t.__weh = (...s) => {
      dt();
      const a = Ir(r), l = at(t, r, e, s);
      return a(), pt(), l;
    });
    return n ? i.unshift(o) : i.push(o), o;
  }
}
const mt = (e) => (t, r = Re) => {
  (!Cr || e === "sp") && yn(e, (...n) => t(...n), r);
}, t0 = mt("bm"), Va = mt("m"), r0 = mt("bu"), n0 = mt("u"), i0 = mt("bum"), ji = mt("um"), o0 = mt("sp"), s0 = mt("rtg"), a0 = mt("rtc");
function l0(e, t = Re) {
  yn("ec", e, t);
}
const u0 = "components", Fa = Symbol.for("v-ndc");
function c0(e) {
  return he(e) ? f0(u0, e, false) || e : e || Fa;
}
function f0(e, t, r = true, n = false) {
  const i = $e || Re;
  if (i) {
    const o = i.type;
    {
      const a = J0(o, false);
      if (a && (a === t || a === Je(t) || a === gn(Je(t)))) return o;
    }
    const s = Po(i[e] || o[e], t) || Po(i.appContext[e], t);
    return !s && n ? o : s;
  }
}
function Po(e, t) {
  return e && (e[t] || e[Je(t)] || e[gn(Je(t))]);
}
function d0(e, t, r, n) {
  let i;
  const o = r, s = K(e);
  if (s || he(e)) {
    const a = s && kt(e);
    let l = false, c = false;
    a && (l = !Ge(e), c = ht(e), e = _n(e)), i = new Array(e.length);
    for (let u = 0, f = e.length; u < f; u++) i[u] = t(l ? c ? Zt(Xe(e[u])) : Xe(e[u]) : e[u], u, void 0, o);
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let a = 0; a < e; a++) i[a] = t(a + 1, a, void 0, o);
  } else if (ue(e)) if (e[Symbol.iterator]) i = Array.from(e, (a, l) => t(a, l, void 0, o));
  else {
    const a = Object.keys(e);
    i = new Array(a.length);
    for (let l = 0, c = a.length; l < c; l++) {
      const u = a[l];
      i[l] = t(e[u], u, l, o);
    }
  }
  else i = [];
  return i;
}
function Co(e, t, r = {}, n, i) {
  if ($e.ce || $e.parent && Wt($e.parent) && $e.parent.ce) {
    const c = Object.keys(r).length > 0;
    return t !== "default" && (r.name = t), N(), Dt(be, null, [fe("slot", r, n)], c ? -2 : 64);
  }
  let o = e[t];
  o && o._c && (o._d = false), N();
  const s = o && ja(o(r)), a = r.key || s && s.key, l = Dt(be, { key: (a && !gt(a) ? a : `_${t}`) + (!s && n ? "_fb" : "") }, s || [], s && e._ === 1 ? 64 : -2);
  return o && o._c && (o._d = true), l;
}
function ja(e) {
  return e.some((t) => Bi(t) ? !(t.type === vt || t.type === be && !ja(t.children)) : true) ? e : null;
}
const Xn = (e) => e ? al(e) ? Wi(e) : Xn(e.parent) : null, mr = De(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => Xn(e.parent), $root: (e) => Xn(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Ha(e), $forceUpdate: (e) => e.f || (e.f = () => {
  Vi(e.update);
}), $nextTick: (e) => e.n || (e.n = Ta.bind(e.proxy)), $watch: (e) => Gd.bind(e) }), Nn = (e, t) => e !== ae && !e.__isScriptSetup && te(e, t), p0 = { get({ _: e }, t) {
  if (t === "__v_skip") return true;
  const { ctx: r, setupState: n, data: i, props: o, accessCache: s, type: a, appContext: l } = e;
  if (t[0] !== "$") {
    const h = s[t];
    if (h !== void 0) switch (h) {
      case 1:
        return n[t];
      case 2:
        return i[t];
      case 4:
        return r[t];
      case 3:
        return o[t];
    }
    else {
      if (Nn(n, t)) return s[t] = 1, n[t];
      if (i !== ae && te(i, t)) return s[t] = 2, i[t];
      if (te(o, t)) return s[t] = 3, o[t];
      if (r !== ae && te(r, t)) return s[t] = 4, r[t];
      Zn && (s[t] = 0);
    }
  }
  const c = mr[t];
  let u, f;
  if (c) return t === "$attrs" && Ie(e.attrs, "get", ""), c(e);
  if ((u = a.__cssModules) && (u = u[t])) return u;
  if (r !== ae && te(r, t)) return s[t] = 4, r[t];
  if (f = l.config.globalProperties, te(f, t)) return f[t];
}, set({ _: e }, t, r) {
  const { data: n, setupState: i, ctx: o } = e;
  return Nn(i, t) ? (i[t] = r, true) : n !== ae && te(n, t) ? (n[t] = r, true) : te(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (o[t] = r, true);
}, has({ _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: i, props: o, type: s } }, a) {
  let l;
  return !!(r[a] || e !== ae && a[0] !== "$" && te(e, a) || Nn(t, a) || te(o, a) || te(n, a) || te(mr, a) || te(i.config.globalProperties, a) || (l = s.__cssModules) && l[a]);
}, defineProperty(e, t, r) {
  return r.get != null ? e._.accessCache[t] = 0 : te(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
} };
function To(e) {
  return K(e) ? e.reduce((t, r) => (t[r] = null, t), {}) : e;
}
let Zn = true;
function h0(e) {
  const t = Ha(e), r = e.proxy, n = e.ctx;
  Zn = false, t.beforeCreate && Oo(t.beforeCreate, e, "bc");
  const { data: i, computed: o, methods: s, watch: a, provide: l, inject: c, created: u, beforeMount: f, mounted: h, beforeUpdate: v, updated: S, activated: w, deactivated: $, beforeDestroy: P, beforeUnmount: I, destroyed: m, unmounted: E, render: D, renderTracked: W, renderTriggered: G, errorCaptured: re, serverPrefetch: Ce, expose: ye, inheritAttrs: Me, components: Y, directives: de, filters: _e } = t;
  if (c && v0(c, n, null), s) for (const J in s) {
    const F = s[J];
    z(F) && (n[J] = F.bind(r));
  }
  if (i) {
    const J = i.call(r, r);
    ue(J) && (e.data = Nt(J));
  }
  if (Zn = true, o) for (const J in o) {
    const F = o[J], pe = z(F) ? F.bind(r, r) : z(F.get) ? F.get.bind(r, r) : ot, we = !z(F) && z(F.set) ? F.set.bind(r) : ot, xe = Z({ get: pe, set: we });
    Object.defineProperty(n, J, { enumerable: true, configurable: true, get: () => xe.value, set: (Q) => xe.value = Q });
  }
  if (a) for (const J in a) Ua(a[J], n, r, J);
  if (l) {
    const J = z(l) ? l.call(r) : l;
    Reflect.ownKeys(J).forEach((F) => {
      Wd(F, J[F]);
    });
  }
  u && Oo(u, e, "c");
  function ie(J, F) {
    K(F) ? F.forEach((pe) => J(pe.bind(r))) : F && J(F.bind(r));
  }
  if (ie(t0, f), ie(Va, h), ie(r0, v), ie(n0, S), ie(Xd, w), ie(Zd, $), ie(l0, re), ie(a0, W), ie(s0, G), ie(i0, I), ie(ji, E), ie(o0, Ce), K(ye)) if (ye.length) {
    const J = e.exposed || (e.exposed = {});
    ye.forEach((F) => {
      Object.defineProperty(J, F, { get: () => r[F], set: (pe) => r[F] = pe, enumerable: true });
    });
  } else e.exposed || (e.exposed = {});
  D && e.render === ot && (e.render = D), Me != null && (e.inheritAttrs = Me), Y && (e.components = Y), de && (e.directives = de), Ce && La(e);
}
function v0(e, t, r = ot) {
  K(e) && (e = ei(e));
  for (const n in e) {
    const i = e[n];
    let o;
    ue(i) ? "default" in i ? o = qr(i.from || n, i.default, true) : o = qr(i.from || n) : o = qr(i), Ae(o) ? Object.defineProperty(t, n, { enumerable: true, configurable: true, get: () => o.value, set: (s) => o.value = s }) : t[n] = o;
  }
}
function Oo(e, t, r) {
  at(K(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function Ua(e, t, r, n) {
  let i = n.includes(".") ? Ma(r, n) : () => r[n];
  if (he(e)) {
    const o = t[e];
    z(o) && Ve(i, o);
  } else if (z(e)) Ve(i, e.bind(r));
  else if (ue(e)) if (K(e)) e.forEach((o) => Ua(o, t, r, n));
  else {
    const o = z(e.handler) ? e.handler.bind(r) : t[e.handler];
    z(o) && Ve(i, o, e);
  }
}
function Ha(e) {
  const t = e.type, { mixins: r, extends: n } = t, { mixins: i, optionsCache: o, config: { optionMergeStrategies: s } } = e.appContext, a = o.get(t);
  let l;
  return a ? l = a : !i.length && !r && !n ? l = t : (l = {}, i.length && i.forEach((c) => nn(l, c, s, true)), nn(l, t, s)), ue(t) && o.set(t, l), l;
}
function nn(e, t, r, n = false) {
  const { mixins: i, extends: o } = t;
  o && nn(e, o, r, true), i && i.forEach((s) => nn(e, s, r, true));
  for (const s in t) if (!(n && s === "expose")) {
    const a = g0[s] || r && r[s];
    e[s] = a ? a(e[s], t[s]) : t[s];
  }
  return e;
}
const g0 = { data: Io, props: Ro, emits: Ro, methods: fr, computed: fr, beforeCreate: Le, created: Le, beforeMount: Le, mounted: Le, beforeUpdate: Le, updated: Le, beforeDestroy: Le, beforeUnmount: Le, destroyed: Le, unmounted: Le, activated: Le, deactivated: Le, errorCaptured: Le, serverPrefetch: Le, components: fr, directives: fr, watch: _0, provide: Io, inject: m0 };
function Io(e, t) {
  return t ? e ? function() {
    return De(z(e) ? e.call(this, this) : e, z(t) ? t.call(this, this) : t);
  } : t : e;
}
function m0(e, t) {
  return fr(ei(e), ei(t));
}
function ei(e) {
  if (K(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
    return t;
  }
  return e;
}
function Le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function fr(e, t) {
  return e ? De(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ro(e, t) {
  return e ? K(e) && K(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : De(/* @__PURE__ */ Object.create(null), To(e), To(t ?? {})) : t;
}
function _0(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = De(/* @__PURE__ */ Object.create(null), e);
  for (const n in t) r[n] = Le(e[n], t[n]);
  return r;
}
function Ba() {
  return { app: null, config: { isNativeTag: Zs, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let b0 = 0;
function y0(e, t) {
  return function(n, i = null) {
    z(n) || (n = De({}, n)), i != null && !ue(i) && (i = null);
    const o = Ba(), s = /* @__PURE__ */ new WeakSet(), a = [];
    let l = false;
    const c = o.app = { _uid: b0++, _component: n, _props: i, _container: null, _context: o, _instance: null, version: X0, get config() {
      return o.config;
    }, set config(u) {
    }, use(u, ...f) {
      return s.has(u) || (u && z(u.install) ? (s.add(u), u.install(c, ...f)) : z(u) && (s.add(u), u(c, ...f))), c;
    }, mixin(u) {
      return o.mixins.includes(u) || o.mixins.push(u), c;
    }, component(u, f) {
      return f ? (o.components[u] = f, c) : o.components[u];
    }, directive(u, f) {
      return f ? (o.directives[u] = f, c) : o.directives[u];
    }, mount(u, f, h) {
      if (!l) {
        const v = c._ceVNode || fe(n, i);
        return v.appContext = o, h === true ? h = "svg" : h === false && (h = void 0), e(v, u, h), l = true, c._container = u, u.__vue_app__ = c, Wi(v.component);
      }
    }, onUnmount(u) {
      a.push(u);
    }, unmount() {
      l && (at(a, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
    }, provide(u, f) {
      return o.provides[u] = f, c;
    }, runWithContext(u) {
      const f = zt;
      zt = c;
      try {
        return u();
      } finally {
        zt = f;
      }
    } };
    return c;
  };
}
let zt = null;
const w0 = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Je(t)}Modifiers`] || e[`${Lt(t)}Modifiers`];
function x0(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || ae;
  let i = r;
  const o = t.startsWith("update:"), s = o && w0(n, t.slice(7));
  s && (s.trim && (i = r.map((u) => he(u) ? u.trim() : u)), s.number && (i = r.map(ad)));
  let a, l = n[a = Rn(t)] || n[a = Rn(Je(t))];
  !l && o && (l = n[a = Rn(Lt(t))]), l && at(l, e, 6, i);
  const c = n[a + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    e.emitted[a] = true, at(c, e, 6, i);
  }
}
const S0 = /* @__PURE__ */ new WeakMap();
function qa(e, t, r = false) {
  const n = r ? S0 : t.emitsCache, i = n.get(e);
  if (i !== void 0) return i;
  const o = e.emits;
  let s = {}, a = false;
  if (!z(e)) {
    const l = (c) => {
      const u = qa(c, t, true);
      u && (a = true, De(s, u));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !o && !a ? (ue(e) && n.set(e, null), null) : (K(o) ? o.forEach((l) => s[l] = null) : De(s, o), ue(e) && n.set(e, s), s);
}
function wn(e, t) {
  return !e || !pn(t) ? false : (t = t.slice(2).replace(/Once$/, ""), te(e, t[0].toLowerCase() + t.slice(1)) || te(e, Lt(t)) || te(e, t));
}
function Ao(e) {
  const { type: t, vnode: r, proxy: n, withProxy: i, propsOptions: [o], slots: s, attrs: a, emit: l, render: c, renderCache: u, props: f, data: h, setupState: v, ctx: S, inheritAttrs: w } = e, $ = tn(e);
  let P, I;
  try {
    if (r.shapeFlag & 4) {
      const E = i || n, D = E;
      P = it(c.call(D, E, u, f, v, h, S)), I = a;
    } else {
      const E = t;
      P = it(E.length > 1 ? E(f, { attrs: a, slots: s, emit: l }) : E(f, null)), I = t.props ? a : E0(a);
    }
  } catch (E) {
    _r.length = 0, bn(E, e, 1), P = fe(vt);
  }
  let m = P;
  if (I && w !== false) {
    const E = Object.keys(I), { shapeFlag: D } = m;
    E.length && D & 7 && (o && E.some(Oi) && (I = P0(I, o)), m = er(m, I, false, true));
  }
  return r.dirs && (m = er(m, null, false, true), m.dirs = m.dirs ? m.dirs.concat(r.dirs) : r.dirs), r.transition && Fi(m, r.transition), P = m, tn($), P;
}
const E0 = (e) => {
  let t;
  for (const r in e) (r === "class" || r === "style" || pn(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, P0 = (e, t) => {
  const r = {};
  for (const n in e) (!Oi(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function C0(e, t, r) {
  const { props: n, children: i, component: o } = e, { props: s, children: a, patchFlag: l } = t, c = o.emitsOptions;
  if (t.dirs || t.transition) return true;
  if (r && l >= 0) {
    if (l & 1024) return true;
    if (l & 16) return n ? ko(n, s, c) : !!s;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const h = u[f];
        if (s[h] !== n[h] && !wn(c, h)) return true;
      }
    }
  } else return (i || a) && (!a || !a.$stable) ? true : n === s ? false : n ? s ? ko(n, s, c) : true : !!s;
  return false;
}
function ko(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return true;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (t[o] !== e[o] && !wn(r, o)) return true;
  }
  return false;
}
function T0({ vnode: e, parent: t }, r) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e) (e = t.vnode).el = r, t = t.parent;
    else break;
  }
}
const Wa = {}, za = () => Object.create(Wa), Ka = (e) => Object.getPrototypeOf(e) === Wa;
function O0(e, t, r, n = false) {
  const i = {}, o = za();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ga(e, t, i, o);
  for (const s in e.propsOptions[0]) s in i || (i[s] = void 0);
  r ? e.props = n ? i : Md(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function I0(e, t, r, n) {
  const { props: i, attrs: o, vnode: { patchFlag: s } } = e, a = ee(i), [l] = e.propsOptions;
  let c = false;
  if ((n || s > 0) && !(s & 16)) {
    if (s & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let h = u[f];
        if (wn(e.emitsOptions, h)) continue;
        const v = t[h];
        if (l) if (te(o, h)) v !== o[h] && (o[h] = v, c = true);
        else {
          const S = Je(h);
          i[S] = ti(l, a, S, v, e, false);
        }
        else v !== o[h] && (o[h] = v, c = true);
      }
    }
  } else {
    Ga(e, t, i, o) && (c = true);
    let u;
    for (const f in a) (!t || !te(t, f) && ((u = Lt(f)) === f || !te(t, u))) && (l ? r && (r[f] !== void 0 || r[u] !== void 0) && (i[f] = ti(l, a, f, void 0, e, true)) : delete i[f]);
    if (o !== a) for (const f in o) (!t || !te(t, f)) && (delete o[f], c = true);
  }
  c && ct(e.attrs, "set", "");
}
function Ga(e, t, r, n) {
  const [i, o] = e.propsOptions;
  let s = false, a;
  if (t) for (let l in t) {
    if (pr(l)) continue;
    const c = t[l];
    let u;
    i && te(i, u = Je(l)) ? !o || !o.includes(u) ? r[u] = c : (a || (a = {}))[u] = c : wn(e.emitsOptions, l) || (!(l in n) || c !== n[l]) && (n[l] = c, s = true);
  }
  if (o) {
    const l = ee(r), c = a || ae;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      r[f] = ti(i, l, f, c[f], e, !te(c, f));
    }
  }
  return s;
}
function ti(e, t, r, n, i, o) {
  const s = e[r];
  if (s != null) {
    const a = te(s, "default");
    if (a && n === void 0) {
      const l = s.default;
      if (s.type !== Function && !s.skipFactory && z(l)) {
        const { propsDefaults: c } = i;
        if (r in c) n = c[r];
        else {
          const u = Ir(i);
          n = c[r] = l.call(null, t), u();
        }
      } else n = l;
      i.ce && i.ce._setProp(r, n);
    }
    s[0] && (o && !a ? n = false : s[1] && (n === "" || n === Lt(r)) && (n = true));
  }
  return n;
}
const R0 = /* @__PURE__ */ new WeakMap();
function Qa(e, t, r = false) {
  const n = r ? R0 : t.propsCache, i = n.get(e);
  if (i) return i;
  const o = e.props, s = {}, a = [];
  let l = false;
  if (!z(e)) {
    const u = (f) => {
      l = true;
      const [h, v] = Qa(f, t, true);
      De(s, h), v && a.push(...v);
    };
    !r && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!o && !l) return ue(e) && n.set(e, Ut), Ut;
  if (K(o)) for (let u = 0; u < o.length; u++) {
    const f = Je(o[u]);
    Do(f) && (s[f] = ae);
  }
  else if (o) for (const u in o) {
    const f = Je(u);
    if (Do(f)) {
      const h = o[u], v = s[f] = K(h) || z(h) ? { type: h } : De({}, h), S = v.type;
      let w = false, $ = true;
      if (K(S)) for (let P = 0; P < S.length; ++P) {
        const I = S[P], m = z(I) && I.name;
        if (m === "Boolean") {
          w = true;
          break;
        } else m === "String" && ($ = false);
      }
      else w = z(S) && S.name === "Boolean";
      v[0] = w, v[1] = $, (w || te(v, "default")) && a.push(f);
    }
  }
  const c = [s, a];
  return ue(e) && n.set(e, c), c;
}
function Do(e) {
  return e[0] !== "$" && !pr(e);
}
const Ui = (e) => e === "_" || e === "_ctx" || e === "$stable", Hi = (e) => K(e) ? e.map(it) : [it(e)], A0 = (e, t, r) => {
  if (t._n) return t;
  const n = ka((...i) => Hi(t(...i)), r);
  return n._c = false, n;
}, Ja = (e, t, r) => {
  const n = e._ctx;
  for (const i in e) {
    if (Ui(i)) continue;
    const o = e[i];
    if (z(o)) t[i] = A0(i, o, n);
    else if (o != null) {
      const s = Hi(o);
      t[i] = () => s;
    }
  }
}, Ya = (e, t) => {
  const r = Hi(t);
  e.slots.default = () => r;
}, Xa = (e, t, r) => {
  for (const n in t) (r || !Ui(n)) && (e[n] = t[n]);
}, k0 = (e, t, r) => {
  const n = e.slots = za();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (Xa(n, t, r), r && ia(n, "_", i, true)) : Ja(t, n);
  } else t && Ya(e, t);
}, D0 = (e, t, r) => {
  const { vnode: n, slots: i } = e;
  let o = true, s = ae;
  if (n.shapeFlag & 32) {
    const a = t._;
    a ? r && a === 1 ? o = false : Xa(i, t, r) : (o = !t.$stable, Ja(t, i)), s = t;
  } else t && (Ya(e, t), s = { default: 1 });
  if (o) for (const a in i) !Ui(a) && s[a] == null && delete i[a];
}, We = V0;
function M0(e) {
  return L0(e);
}
function L0(e, t) {
  const r = mn();
  r.__VUE__ = true;
  const { insert: n, remove: i, patchProp: o, createElement: s, createText: a, createComment: l, setText: c, setElementText: u, parentNode: f, nextSibling: h, setScopeId: v = ot, insertStaticContent: S } = e, w = (d, p, g, x = null, _ = null, b = null, O = void 0, T = null, C = !!p.dynamicChildren) => {
    if (d === p) return;
    d && !cr(d, p) && (x = Dr(d), Q(d, _, b, true), d = null), p.patchFlag === -2 && (C = false, p.dynamicChildren = null);
    const { type: y, ref: V, shapeFlag: R } = p;
    switch (y) {
      case xn:
        $(d, p, g, x);
        break;
      case vt:
        P(d, p, g, x);
        break;
      case Wr:
        d == null && I(p, g, x, O);
        break;
      case be:
        Y(d, p, g, x, _, b, O, T, C);
        break;
      default:
        R & 1 ? D(d, p, g, x, _, b, O, T, C) : R & 6 ? de(d, p, g, x, _, b, O, T, C) : (R & 64 || R & 128) && y.process(d, p, g, x, _, b, O, T, C, or);
    }
    V != null && _ ? gr(V, d && d.ref, b, p || d, !p) : V == null && d && d.ref != null && gr(d.ref, null, b, d, true);
  }, $ = (d, p, g, x) => {
    if (d == null) n(p.el = a(p.children), g, x);
    else {
      const _ = p.el = d.el;
      p.children !== d.children && c(_, p.children);
    }
  }, P = (d, p, g, x) => {
    d == null ? n(p.el = l(p.children || ""), g, x) : p.el = d.el;
  }, I = (d, p, g, x) => {
    [d.el, d.anchor] = S(d.children, p, g, x, d.el, d.anchor);
  }, m = ({ el: d, anchor: p }, g, x) => {
    let _;
    for (; d && d !== p; ) _ = h(d), n(d, g, x), d = _;
    n(p, g, x);
  }, E = ({ el: d, anchor: p }) => {
    let g;
    for (; d && d !== p; ) g = h(d), i(d), d = g;
    i(p);
  }, D = (d, p, g, x, _, b, O, T, C) => {
    if (p.type === "svg" ? O = "svg" : p.type === "math" && (O = "mathml"), d == null) W(p, g, x, _, b, O, T, C);
    else {
      const y = d.el && d.el._isVueCE ? d.el : null;
      try {
        y && y._beginPatch(), Ce(d, p, _, b, O, T, C);
      } finally {
        y && y._endPatch();
      }
    }
  }, W = (d, p, g, x, _, b, O, T) => {
    let C, y;
    const { props: V, shapeFlag: R, transition: L, dirs: q } = d;
    if (C = d.el = s(d.type, b, V && V.is, V), R & 8 ? u(C, d.children) : R & 16 && re(d.children, C, null, x, _, $n(d, b), O, T), q && Ot(d, null, x, "created"), G(C, d, d.scopeId, O, x), V) {
      for (const oe in V) oe !== "value" && !pr(oe) && o(C, oe, null, V[oe], b, x);
      "value" in V && o(C, "value", null, V.value, b), (y = V.onVnodeBeforeMount) && rt(y, x, d);
    }
    q && Ot(d, null, x, "beforeMount");
    const X = N0(_, L);
    X && L.beforeEnter(C), n(C, p, g), ((y = V && V.onVnodeMounted) || X || q) && We(() => {
      y && rt(y, x, d), X && L.enter(C), q && Ot(d, null, x, "mounted");
    }, _);
  }, G = (d, p, g, x, _) => {
    if (g && v(d, g), x) for (let b = 0; b < x.length; b++) v(d, x[b]);
    if (_) {
      let b = _.subTree;
      if (p === b || rl(b.type) && (b.ssContent === p || b.ssFallback === p)) {
        const O = _.vnode;
        G(d, O, O.scopeId, O.slotScopeIds, _.parent);
      }
    }
  }, re = (d, p, g, x, _, b, O, T, C = 0) => {
    for (let y = C; y < d.length; y++) {
      const V = d[y] = T ? St(d[y]) : it(d[y]);
      w(null, V, p, g, x, _, b, O, T);
    }
  }, Ce = (d, p, g, x, _, b, O) => {
    const T = p.el = d.el;
    let { patchFlag: C, dynamicChildren: y, dirs: V } = p;
    C |= d.patchFlag & 16;
    const R = d.props || ae, L = p.props || ae;
    let q;
    if (g && It(g, false), (q = L.onVnodeBeforeUpdate) && rt(q, g, p, d), V && Ot(p, d, g, "beforeUpdate"), g && It(g, true), (R.innerHTML && L.innerHTML == null || R.textContent && L.textContent == null) && u(T, ""), y ? ye(d.dynamicChildren, y, T, g, x, $n(p, _), b) : O || F(d, p, T, null, g, x, $n(p, _), b, false), C > 0) {
      if (C & 16) Me(T, R, L, g, _);
      else if (C & 2 && R.class !== L.class && o(T, "class", null, L.class, _), C & 4 && o(T, "style", R.style, L.style, _), C & 8) {
        const X = p.dynamicProps;
        for (let oe = 0; oe < X.length; oe++) {
          const ne = X[oe], je = R[ne], Ue = L[ne];
          (Ue !== je || ne === "value") && o(T, ne, je, Ue, _, g);
        }
      }
      C & 1 && d.children !== p.children && u(T, p.children);
    } else !O && y == null && Me(T, R, L, g, _);
    ((q = L.onVnodeUpdated) || V) && We(() => {
      q && rt(q, g, p, d), V && Ot(p, d, g, "updated");
    }, x);
  }, ye = (d, p, g, x, _, b, O) => {
    for (let T = 0; T < p.length; T++) {
      const C = d[T], y = p[T], V = C.el && (C.type === be || !cr(C, y) || C.shapeFlag & 198) ? f(C.el) : g;
      w(C, y, V, null, x, _, b, O, true);
    }
  }, Me = (d, p, g, x, _) => {
    if (p !== g) {
      if (p !== ae) for (const b in p) !pr(b) && !(b in g) && o(d, b, p[b], null, _, x);
      for (const b in g) {
        if (pr(b)) continue;
        const O = g[b], T = p[b];
        O !== T && b !== "value" && o(d, b, T, O, _, x);
      }
      "value" in g && o(d, "value", p.value, g.value, _);
    }
  }, Y = (d, p, g, x, _, b, O, T, C) => {
    const y = p.el = d ? d.el : a(""), V = p.anchor = d ? d.anchor : a("");
    let { patchFlag: R, dynamicChildren: L, slotScopeIds: q } = p;
    q && (T = T ? T.concat(q) : q), d == null ? (n(y, g, x), n(V, g, x), re(p.children || [], g, V, _, b, O, T, C)) : R > 0 && R & 64 && L && d.dynamicChildren && d.dynamicChildren.length === L.length ? (ye(d.dynamicChildren, L, g, _, b, O, T), (p.key != null || _ && p === _.subTree) && Za(d, p, true)) : F(d, p, g, V, _, b, O, T, C);
  }, de = (d, p, g, x, _, b, O, T, C) => {
    p.slotScopeIds = T, d == null ? p.shapeFlag & 512 ? _.ctx.activate(p, g, x, O, C) : _e(p, g, x, _, b, O, C) : Fe(d, p, C);
  }, _e = (d, p, g, x, _, b, O) => {
    const T = d.component = W0(d, x, _);
    if (Na(d) && (T.ctx.renderer = or), z0(T, false, O), T.asyncDep) {
      if (_ && _.registerDep(T, ie, O), !d.el) {
        const C = T.subTree = fe(vt);
        P(null, C, p, g), d.placeholder = C.el;
      }
    } else ie(T, d, p, g, _, b, O);
  }, Fe = (d, p, g) => {
    const x = p.component = d.component;
    if (C0(d, p, g)) if (x.asyncDep && !x.asyncResolved) {
      J(x, p, g);
      return;
    } else x.next = p, x.update();
    else p.el = d.el, x.vnode = p;
  }, ie = (d, p, g, x, _, b, O) => {
    const T = () => {
      if (d.isMounted) {
        let { next: R, bu: L, u: q, parent: X, vnode: oe } = d;
        {
          const et = el(d);
          if (et) {
            R && (R.el = oe.el, J(d, R, O)), et.asyncDep.then(() => {
              d.isUnmounted || T();
            });
            return;
          }
        }
        let ne = R, je;
        It(d, false), R ? (R.el = oe.el, J(d, R, O)) : R = oe, L && An(L), (je = R.props && R.props.onVnodeBeforeUpdate) && rt(je, X, R, oe), It(d, true);
        const Ue = Ao(d), Ze = d.subTree;
        d.subTree = Ue, w(Ze, Ue, f(Ze.el), Dr(Ze), d, _, b), R.el = Ue.el, ne === null && T0(d, Ue.el), q && We(q, _), (je = R.props && R.props.onVnodeUpdated) && We(() => rt(je, X, R, oe), _);
      } else {
        let R;
        const { el: L, props: q } = p, { bm: X, m: oe, parent: ne, root: je, type: Ue } = d, Ze = Wt(p);
        It(d, false), X && An(X), !Ze && (R = q && q.onVnodeBeforeMount) && rt(R, ne, p), It(d, true);
        {
          je.ce && je.ce._def.shadowRoot !== false && je.ce._injectChildStyle(Ue);
          const et = d.subTree = Ao(d);
          w(null, et, g, x, d, _, b), p.el = et.el;
        }
        if (oe && We(oe, _), !Ze && (R = q && q.onVnodeMounted)) {
          const et = p;
          We(() => rt(R, ne, et), _);
        }
        (p.shapeFlag & 256 || ne && Wt(ne.vnode) && ne.vnode.shapeFlag & 256) && d.a && We(d.a, _), d.isMounted = true, p = g = x = null;
      }
    };
    d.scope.on();
    const C = d.effect = new ua(T);
    d.scope.off();
    const y = d.update = C.run.bind(C), V = d.job = C.runIfDirty.bind(C);
    V.i = d, V.id = d.uid, C.scheduler = () => Vi(V), It(d, true), y();
  }, J = (d, p, g) => {
    p.component = d;
    const x = d.vnode.props;
    d.vnode = p, d.next = null, I0(d, p.props, x, g), D0(d, p.children, g), dt(), So(d), pt();
  }, F = (d, p, g, x, _, b, O, T, C = false) => {
    const y = d && d.children, V = d ? d.shapeFlag : 0, R = p.children, { patchFlag: L, shapeFlag: q } = p;
    if (L > 0) {
      if (L & 128) {
        we(y, R, g, x, _, b, O, T, C);
        return;
      } else if (L & 256) {
        pe(y, R, g, x, _, b, O, T, C);
        return;
      }
    }
    q & 8 ? (V & 16 && ir(y, _, b), R !== y && u(g, R)) : V & 16 ? q & 16 ? we(y, R, g, x, _, b, O, T, C) : ir(y, _, b, true) : (V & 8 && u(g, ""), q & 16 && re(R, g, x, _, b, O, T, C));
  }, pe = (d, p, g, x, _, b, O, T, C) => {
    d = d || Ut, p = p || Ut;
    const y = d.length, V = p.length, R = Math.min(y, V);
    let L;
    for (L = 0; L < R; L++) {
      const q = p[L] = C ? St(p[L]) : it(p[L]);
      w(d[L], q, g, null, _, b, O, T, C);
    }
    y > V ? ir(d, _, b, true, false, R) : re(p, g, x, _, b, O, T, C, R);
  }, we = (d, p, g, x, _, b, O, T, C) => {
    let y = 0;
    const V = p.length;
    let R = d.length - 1, L = V - 1;
    for (; y <= R && y <= L; ) {
      const q = d[y], X = p[y] = C ? St(p[y]) : it(p[y]);
      if (cr(q, X)) w(q, X, g, null, _, b, O, T, C);
      else break;
      y++;
    }
    for (; y <= R && y <= L; ) {
      const q = d[R], X = p[L] = C ? St(p[L]) : it(p[L]);
      if (cr(q, X)) w(q, X, g, null, _, b, O, T, C);
      else break;
      R--, L--;
    }
    if (y > R) {
      if (y <= L) {
        const q = L + 1, X = q < V ? p[q].el : x;
        for (; y <= L; ) w(null, p[y] = C ? St(p[y]) : it(p[y]), g, X, _, b, O, T, C), y++;
      }
    } else if (y > L) for (; y <= R; ) Q(d[y], _, b, true), y++;
    else {
      const q = y, X = y, oe = /* @__PURE__ */ new Map();
      for (y = X; y <= L; y++) {
        const qe = p[y] = C ? St(p[y]) : it(p[y]);
        qe.key != null && oe.set(qe.key, y);
      }
      let ne, je = 0;
      const Ue = L - X + 1;
      let Ze = false, et = 0;
      const sr = new Array(Ue);
      for (y = 0; y < Ue; y++) sr[y] = 0;
      for (y = q; y <= R; y++) {
        const qe = d[y];
        if (je >= Ue) {
          Q(qe, _, b, true);
          continue;
        }
        let tt;
        if (qe.key != null) tt = oe.get(qe.key);
        else for (ne = X; ne <= L; ne++) if (sr[ne - X] === 0 && cr(qe, p[ne])) {
          tt = ne;
          break;
        }
        tt === void 0 ? Q(qe, _, b, true) : (sr[tt - X] = y + 1, tt >= et ? et = tt : Ze = true, w(qe, p[tt], g, null, _, b, O, T, C), je++);
      }
      const Gi = Ze ? $0(sr) : Ut;
      for (ne = Gi.length - 1, y = Ue - 1; y >= 0; y--) {
        const qe = X + y, tt = p[qe], Qi = p[qe + 1], Ji = qe + 1 < V ? Qi.el || tl(Qi) : x;
        sr[y] === 0 ? w(null, tt, g, Ji, _, b, O, T, C) : Ze && (ne < 0 || y !== Gi[ne] ? xe(tt, g, Ji, 2) : ne--);
      }
    }
  }, xe = (d, p, g, x, _ = null) => {
    const { el: b, type: O, transition: T, children: C, shapeFlag: y } = d;
    if (y & 6) {
      xe(d.component.subTree, p, g, x);
      return;
    }
    if (y & 128) {
      d.suspense.move(p, g, x);
      return;
    }
    if (y & 64) {
      O.move(d, p, g, or);
      return;
    }
    if (O === be) {
      n(b, p, g);
      for (let R = 0; R < C.length; R++) xe(C[R], p, g, x);
      n(d.anchor, p, g);
      return;
    }
    if (O === Wr) {
      m(d, p, g);
      return;
    }
    if (x !== 2 && y & 1 && T) if (x === 0) T.beforeEnter(b), n(b, p, g), We(() => T.enter(b), _);
    else {
      const { leave: R, delayLeave: L, afterLeave: q } = T, X = () => {
        d.ctx.isUnmounted ? i(b) : n(b, p, g);
      }, oe = () => {
        b._isLeaving && b[Yd](true), R(b, () => {
          X(), q && q();
        });
      };
      L ? L(b, X, oe) : oe();
    }
    else n(b, p, g);
  }, Q = (d, p, g, x = false, _ = false) => {
    const { type: b, props: O, ref: T, children: C, dynamicChildren: y, shapeFlag: V, patchFlag: R, dirs: L, cacheIndex: q } = d;
    if (R === -2 && (_ = false), T != null && (dt(), gr(T, null, g, d, true), pt()), q != null && (p.renderCache[q] = void 0), V & 256) {
      p.ctx.deactivate(d);
      return;
    }
    const X = V & 1 && L, oe = !Wt(d);
    let ne;
    if (oe && (ne = O && O.onVnodeBeforeUnmount) && rt(ne, p, d), V & 6) nr(d.component, g, x);
    else {
      if (V & 128) {
        d.suspense.unmount(g, x);
        return;
      }
      X && Ot(d, null, p, "beforeUnmount"), V & 64 ? d.type.remove(d, p, g, or, x) : y && !y.hasOnce && (b !== be || R > 0 && R & 64) ? ir(y, p, g, false, true) : (b === be && R & 384 || !_ && V & 16) && ir(C, p, g), x && ve(d);
    }
    (oe && (ne = O && O.onVnodeUnmounted) || X) && We(() => {
      ne && rt(ne, p, d), X && Ot(d, null, p, "unmounted");
    }, g);
  }, ve = (d) => {
    const { type: p, el: g, anchor: x, transition: _ } = d;
    if (p === be) {
      _t(g, x);
      return;
    }
    if (p === Wr) {
      E(d);
      return;
    }
    const b = () => {
      i(g), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (d.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: O, delayLeave: T } = _, C = () => O(g, b);
      T ? T(d.el, b, C) : C();
    } else b();
  }, _t = (d, p) => {
    let g;
    for (; d !== p; ) g = h(d), i(d), d = g;
    i(p);
  }, nr = (d, p, g) => {
    const { bum: x, scope: _, job: b, subTree: O, um: T, m: C, a: y } = d;
    Mo(C), Mo(y), x && An(x), _.stop(), b && (b.flags |= 8, Q(O, d, p, g)), T && We(T, p), We(() => {
      d.isUnmounted = true;
    }, p);
  }, ir = (d, p, g, x = false, _ = false, b = 0) => {
    for (let O = b; O < d.length; O++) Q(d[O], p, g, x, _);
  }, Dr = (d) => {
    if (d.shapeFlag & 6) return Dr(d.component.subTree);
    if (d.shapeFlag & 128) return d.suspense.next();
    const p = h(d.anchor || d.el), g = p && p[Qd];
    return g ? h(g) : p;
  };
  let Pn = false;
  const Ki = (d, p, g) => {
    let x;
    d == null ? p._vnode && (Q(p._vnode, null, null, true), x = p._vnode.component) : w(p._vnode || null, d, p, null, null, null, g), p._vnode = d, Pn || (Pn = true, So(x), Ia(), Pn = false);
  }, or = { p: w, um: Q, m: xe, r: ve, mt: _e, mc: re, pc: F, pbc: ye, n: Dr, o: e };
  return { render: Ki, hydrate: void 0, createApp: y0(Ki) };
}
function $n({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function It({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function N0(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Za(e, t, r = false) {
  const n = e.children, i = t.children;
  if (K(n) && K(i)) for (let o = 0; o < n.length; o++) {
    const s = n[o];
    let a = i[o];
    a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[o] = St(i[o]), a.el = s.el), !r && a.patchFlag !== -2 && Za(s, a)), a.type === xn && (a.patchFlag !== -1 ? a.el = s.el : a.__elIndex = o + (e.type === be ? 1 : 0)), a.type === vt && !a.el && (a.el = s.el);
  }
}
function $0(e) {
  const t = e.slice(), r = [0];
  let n, i, o, s, a;
  const l = e.length;
  for (n = 0; n < l; n++) {
    const c = e[n];
    if (c !== 0) {
      if (i = r[r.length - 1], e[i] < c) {
        t[n] = i, r.push(n);
        continue;
      }
      for (o = 0, s = r.length - 1; o < s; ) a = o + s >> 1, e[r[a]] < c ? o = a + 1 : s = a;
      c < e[r[o]] && (o > 0 && (t[n] = r[o - 1]), r[o] = n);
    }
  }
  for (o = r.length, s = r[o - 1]; o-- > 0; ) r[o] = s, s = t[s];
  return r;
}
function el(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : el(t);
}
function Mo(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function tl(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? tl(t.subTree) : null;
}
const rl = (e) => e.__isSuspense;
function V0(e, t) {
  t && t.pendingBranch ? K(e) ? t.effects.push(...e) : t.effects.push(e) : qd(e);
}
const be = Symbol.for("v-fgt"), xn = Symbol.for("v-txt"), vt = Symbol.for("v-cmt"), Wr = Symbol.for("v-stc"), _r = [];
let ze = null;
function N(e = false) {
  _r.push(ze = e ? null : []);
}
function F0() {
  _r.pop(), ze = _r[_r.length - 1] || null;
}
let Pr = 1;
function Lo(e, t = false) {
  Pr += e, e < 0 && ze && t && (ze.hasOnce = true);
}
function nl(e) {
  return e.dynamicChildren = Pr > 0 ? ze || Ut : null, F0(), Pr > 0 && ze && ze.push(e), e;
}
function B(e, t, r, n, i, o) {
  return nl(A(e, t, r, n, i, o, true));
}
function Dt(e, t, r, n, i) {
  return nl(fe(e, t, r, n, i, true));
}
function Bi(e) {
  return e ? e.__v_isVNode === true : false;
}
function cr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const il = ({ key: e }) => e ?? null, zr = ({ ref: e, ref_key: t, ref_for: r }) => (typeof e == "number" && (e = "" + e), e != null ? he(e) || Ae(e) || z(e) ? { i: $e, r: e, k: t, f: !!r } : e : null);
function A(e, t = null, r = null, n = 0, i = null, o = e === be ? 0 : 1, s = false, a = false) {
  const l = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && il(t), ref: t && zr(t), scopeId: Aa, slotScopeIds: null, children: r, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o, patchFlag: n, dynamicProps: i, dynamicChildren: null, appContext: null, ctx: $e };
  return a ? (qi(l, r), o & 128 && e.normalize(l)) : r && (l.shapeFlag |= he(r) ? 8 : 16), Pr > 0 && !s && ze && (l.patchFlag > 0 || o & 6) && l.patchFlag !== 32 && ze.push(l), l;
}
const fe = j0;
function j0(e, t = null, r = null, n = 0, i = null, o = false) {
  if ((!e || e === Fa) && (e = vt), Bi(e)) {
    const a = er(e, t, true);
    return r && qi(a, r), Pr > 0 && !o && ze && (a.shapeFlag & 6 ? ze[ze.indexOf(e)] = a : ze.push(a)), a.patchFlag = -2, a;
  }
  if (Y0(e) && (e = e.__vccOpts), t) {
    t = U0(t);
    let { class: a, style: l } = t;
    a && !he(a) && (t.class = Pe(a)), ue(l) && ($i(l) && !K(l) && (l = De({}, l)), t.style = Ke(l));
  }
  const s = he(e) ? 1 : rl(e) ? 128 : Jd(e) ? 64 : ue(e) ? 4 : z(e) ? 2 : 0;
  return A(e, t, r, n, i, s, o, true);
}
function U0(e) {
  return e ? $i(e) || Ka(e) ? De({}, e) : e : null;
}
function er(e, t, r = false, n = false) {
  const { props: i, ref: o, patchFlag: s, children: a, transition: l } = e, c = t ? ol(i || {}, t) : i, u = { __v_isVNode: true, __v_skip: true, type: e.type, props: c, key: c && il(c), ref: t && t.ref ? r && o ? K(o) ? o.concat(zr(t)) : [o, zr(t)] : zr(t) : o, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: a, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== be ? s === -1 ? 16 : s | 16 : s, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: l, component: e.component, suspense: e.suspense, ssContent: e.ssContent && er(e.ssContent), ssFallback: e.ssFallback && er(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
  return l && n && Fi(u, l.clone(u)), u;
}
function on(e = " ", t = 0) {
  return fe(xn, null, e, t);
}
function H0(e, t) {
  const r = fe(Wr, null, e);
  return r.staticCount = t, r;
}
function Kt(e = "", t = false) {
  return t ? (N(), Dt(vt, null, e)) : fe(vt, null, e);
}
function it(e) {
  return e == null || typeof e == "boolean" ? fe(vt) : K(e) ? fe(be, null, e.slice()) : Bi(e) ? St(e) : fe(xn, null, String(e));
}
function St(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : er(e);
}
function qi(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (K(t)) r = 16;
  else if (typeof t == "object") if (n & 65) {
    const i = t.default;
    i && (i._c && (i._d = false), qi(e, i()), i._c && (i._d = true));
    return;
  } else {
    r = 32;
    const i = t._;
    !i && !Ka(t) ? t._ctx = $e : i === 3 && $e && ($e.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else z(t) ? (t = { default: t, _ctx: $e }, r = 32) : (t = String(t), n & 64 ? (r = 16, t = [on(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function ol(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const i in n) if (i === "class") t.class !== n.class && (t.class = Pe([t.class, n.class]));
    else if (i === "style") t.style = Ke([t.style, n.style]);
    else if (pn(i)) {
      const o = t[i], s = n[i];
      s && o !== s && !(K(o) && o.includes(s)) && (t[i] = o ? [].concat(o, s) : s);
    } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function rt(e, t, r, n = null) {
  at(e, t, 7, [r, n]);
}
const B0 = Ba();
let q0 = 0;
function W0(e, t, r) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || B0, o = { uid: q0++, vnode: e, type: n, parent: t, appContext: i, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new hd(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(i.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: Qa(n, i), emitsOptions: qa(n, i), emit: null, emitted: null, propsDefaults: ae, inheritAttrs: n.inheritAttrs, ctx: ae, data: ae, props: ae, attrs: ae, slots: ae, refs: ae, setupState: ae, setupContext: null, suspense: r, suspenseId: r ? r.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = x0.bind(null, o), e.ce && e.ce(o), o;
}
let Re = null;
const sl = () => Re || $e;
let sn, ri;
{
  const e = mn(), t = (r, n) => {
    let i;
    return (i = e[r]) || (i = e[r] = []), i.push(n), (o) => {
      i.length > 1 ? i.forEach((s) => s(o)) : i[0](o);
    };
  };
  sn = t("__VUE_INSTANCE_SETTERS__", (r) => Re = r), ri = t("__VUE_SSR_SETTERS__", (r) => Cr = r);
}
const Ir = (e) => {
  const t = Re;
  return sn(e), e.scope.on(), () => {
    e.scope.off(), sn(t);
  };
}, No = () => {
  Re && Re.scope.off(), sn(null);
};
function al(e) {
  return e.vnode.shapeFlag & 4;
}
let Cr = false;
function z0(e, t = false, r = false) {
  t && ri(t);
  const { props: n, children: i } = e.vnode, o = al(e);
  O0(e, n, o, t), k0(e, i, r || t);
  const s = o ? K0(e, t) : void 0;
  return t && ri(false), s;
}
function K0(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, p0);
  const { setup: n } = r;
  if (n) {
    dt();
    const i = e.setupContext = n.length > 1 ? Q0(e) : null, o = Ir(e), s = Or(n, e, 0, [e.props, i]), a = ta(s);
    if (pt(), o(), (a || e.sp) && !Wt(e) && La(e), a) {
      if (s.then(No, No), t) return s.then((l) => {
        $o(e, l);
      }).catch((l) => {
        bn(l, e, 0);
      });
      e.asyncDep = s;
    } else $o(e, s);
  } else ll(e);
}
function $o(e, t, r) {
  z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ue(t) && (e.setupState = Pa(t)), ll(e);
}
function ll(e, t, r) {
  const n = e.type;
  e.render || (e.render = n.render || ot);
  {
    const i = Ir(e);
    dt();
    try {
      h0(e);
    } finally {
      pt(), i();
    }
  }
}
const G0 = { get(e, t) {
  return Ie(e, "get", ""), e[t];
} };
function Q0(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return { attrs: new Proxy(e.attrs, G0), slots: e.slots, emit: e.emit, expose: t };
}
function Wi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Pa(Ld(e.exposed)), { get(t, r) {
    if (r in t) return t[r];
    if (r in mr) return mr[r](e);
  }, has(t, r) {
    return r in t || r in mr;
  } })) : e.proxy;
}
function J0(e, t = true) {
  return z(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Y0(e) {
  return z(e) && "__vccOpts" in e;
}
const Z = (e, t) => Fd(e, t, Cr), X0 = "3.5.26";
let ni;
const Vo = typeof window < "u" && window.trustedTypes;
if (Vo) try {
  ni = Vo.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
const ul = ni ? (e) => ni.createHTML(e) : (e) => e, Z0 = "http://www.w3.org/2000/svg", ep = "http://www.w3.org/1998/Math/MathML", ut = typeof document < "u" ? document : null, Fo = ut && ut.createElement("template"), tp = { insert: (e, t, r) => {
  t.insertBefore(e, r || null);
}, remove: (e) => {
  const t = e.parentNode;
  t && t.removeChild(e);
}, createElement: (e, t, r, n) => {
  const i = t === "svg" ? ut.createElementNS(Z0, e) : t === "mathml" ? ut.createElementNS(ep, e) : r ? ut.createElement(e, { is: r }) : ut.createElement(e);
  return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
}, createText: (e) => ut.createTextNode(e), createComment: (e) => ut.createComment(e), setText: (e, t) => {
  e.nodeValue = t;
}, setElementText: (e, t) => {
  e.textContent = t;
}, parentNode: (e) => e.parentNode, nextSibling: (e) => e.nextSibling, querySelector: (e) => ut.querySelector(e), setScopeId(e, t) {
  e.setAttribute(t, "");
}, insertStaticContent(e, t, r, n, i, o) {
  const s = r ? r.previousSibling : t.lastChild;
  if (i && (i === o || i.nextSibling)) for (; t.insertBefore(i.cloneNode(true), r), !(i === o || !(i = i.nextSibling)); ) ;
  else {
    Fo.innerHTML = ul(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
    const a = Fo.content;
    if (n === "svg" || n === "mathml") {
      const l = a.firstChild;
      for (; l.firstChild; ) a.appendChild(l.firstChild);
      a.removeChild(l);
    }
    t.insertBefore(a, r);
  }
  return [s ? s.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild];
} }, rp = Symbol("_vtc");
function np(e, t, r) {
  const n = e[rp];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const jo = Symbol("_vod"), ip = Symbol("_vsh"), op = Symbol(""), sp = /(?:^|;)\s*display\s*:/;
function ap(e, t, r) {
  const n = e.style, i = he(r);
  let o = false;
  if (r && !i) {
    if (t) if (he(t)) for (const s of t.split(";")) {
      const a = s.slice(0, s.indexOf(":")).trim();
      r[a] == null && Kr(n, a, "");
    }
    else for (const s in t) r[s] == null && Kr(n, s, "");
    for (const s in r) s === "display" && (o = true), Kr(n, s, r[s]);
  } else if (i) {
    if (t !== r) {
      const s = n[op];
      s && (r += ";" + s), n.cssText = r, o = sp.test(r);
    }
  } else t && e.removeAttribute("style");
  jo in e && (e[jo] = o ? n.display : "", e[ip] && (n.display = "none"));
}
const Uo = /\s*!important$/;
function Kr(e, t, r) {
  if (K(r)) r.forEach((n) => Kr(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--")) e.setProperty(t, r);
  else {
    const n = lp(e, t);
    Uo.test(r) ? e.setProperty(Lt(n), r.replace(Uo, ""), "important") : e[n] = r;
  }
}
const Ho = ["Webkit", "Moz", "ms"], Vn = {};
function lp(e, t) {
  const r = Vn[t];
  if (r) return r;
  let n = Je(t);
  if (n !== "filter" && n in e) return Vn[t] = n;
  n = gn(n);
  for (let i = 0; i < Ho.length; i++) {
    const o = Ho[i] + n;
    if (o in e) return Vn[t] = o;
  }
  return t;
}
const Bo = "http://www.w3.org/1999/xlink";
function qo(e, t, r, n, i, o = pd(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(Bo, t.slice(6, t.length)) : e.setAttributeNS(Bo, t, r) : r == null || o && !oa(r) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : gt(r) ? String(r) : r);
}
function Wo(e, t, r, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? ul(r) : r);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
    const a = o === "OPTION" ? e.getAttribute("value") || "" : e.value, l = r == null ? e.type === "checkbox" ? "on" : "" : String(r);
    (a !== l || !("_value" in e)) && (e.value = l), r == null && e.removeAttribute(t), e._value = r;
    return;
  }
  let s = false;
  if (r === "" || r == null) {
    const a = typeof e[t];
    a === "boolean" ? r = oa(r) : r == null && a === "string" ? (r = "", s = true) : a === "number" && (r = 0, s = true);
  }
  try {
    e[t] = r;
  } catch {
  }
  s && e.removeAttribute(i || t);
}
function up(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function cp(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
const zo = Symbol("_vei");
function fp(e, t, r, n, i = null) {
  const o = e[zo] || (e[zo] = {}), s = o[t];
  if (n && s) s.value = n;
  else {
    const [a, l] = dp(t);
    if (n) {
      const c = o[t] = vp(n, i);
      up(e, a, c, l);
    } else s && (cp(e, a, s, l), o[t] = void 0);
  }
}
const Ko = /(?:Once|Passive|Capture)$/;
function dp(e) {
  let t;
  if (Ko.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Ko); ) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = true;
  }
  return [e[2] === ":" ? e.slice(3) : Lt(e.slice(2)), t];
}
let Fn = 0;
const pp = Promise.resolve(), hp = () => Fn || (pp.then(() => Fn = 0), Fn = Date.now());
function vp(e, t) {
  const r = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= r.attached) return;
    at(gp(n, r.value), t, 5, [n]);
  };
  return r.value = e, r.attached = hp(), r;
}
function gp(e, t) {
  if (K(t)) {
    const r = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      r.call(e), e._stopped = true;
    }, t.map((n) => (i) => !i._stopped && n && n(i));
  } else return t;
}
const Go = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, mp = (e, t, r, n, i, o) => {
  const s = i === "svg";
  t === "class" ? np(e, n, s) : t === "style" ? ap(e, r, n) : pn(t) ? Oi(t) || fp(e, t, r, n, o) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : _p(e, t, n, s)) ? (Wo(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && qo(e, t, n, s, o, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !he(n)) ? Wo(e, Je(t), n, o, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), qo(e, t, n, s));
};
function _p(e, t, r, n) {
  if (n) return !!(t === "innerHTML" || t === "textContent" || t in e && Go(t) && z(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE") return false;
  }
  return Go(t) && he(r) ? false : t in e;
}
const bp = ["ctrl", "shift", "alt", "meta"], yp = { stop: (e) => e.stopPropagation(), prevent: (e) => e.preventDefault(), self: (e) => e.target !== e.currentTarget, ctrl: (e) => !e.ctrlKey, shift: (e) => !e.shiftKey, alt: (e) => !e.altKey, meta: (e) => !e.metaKey, left: (e) => "button" in e && e.button !== 0, middle: (e) => "button" in e && e.button !== 1, right: (e) => "button" in e && e.button !== 2, exact: (e, t) => bp.some((r) => e[`${r}Key`] && !t.includes(r)) }, ii = (e, t) => {
  const r = e._withMods || (e._withMods = {}), n = t.join(".");
  return r[n] || (r[n] = ((i, ...o) => {
    for (let s = 0; s < t.length; s++) {
      const a = yp[t[s]];
      if (a && a(i, t)) return;
    }
    return e(i, ...o);
  }));
}, wp = De({ patchProp: mp }, tp);
let Qo;
function xp() {
  return Qo || (Qo = M0(wp));
}
const Sp = ((...e) => {
  const t = xp().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const i = Pp(n);
    if (!i) return;
    const o = t._component;
    !z(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const s = r(i, false, Ep(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), s;
  }, t;
});
function Ep(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Pp(e) {
  return he(e) ? document.querySelector(e) : e;
}
const oi = { value: null };
function Cp() {
  if (!oi.value) throw new Error("global config is unset");
  return oi.value;
}
function Tp(e) {
  oi.value = e;
}
class Jo {
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
class Op {
  info(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} INFO [${t}] ${r(new Jo()).build()}`);
  }
  warn(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} WARN [${t}] ${r(new Jo()).build()}`);
  }
  error(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} ERROR [${t}] ${r.stack ?? JSON.stringify(r)}`);
  }
}
const Pt = new Op();
class Ip {
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
    const n = await r, i = Object.keys(n).find((l) => l.endsWith("Service")) ?? "", o = Object.keys(n).find((l) => l.endsWith("Protocol")) ?? "", s = n[i], a = n[o];
    if (!s) throw new Error(`not service defined in register service file: ${t}`);
    if (!a) throw new Error(`not protocol defined in register service file: ${t}`);
    this.serviceCtors.set(t, s), this.protocolCtors.set(t, a), await this.transport.notifyServiceReady(t), this.initializeWithMetrics(t);
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
        const i = this.getService(t);
        if (!i) throw new Error("service instance not found when create service protocol");
        r = new n(i), this.protocols.set(t, r);
      }
      return r;
    } else {
      if (!this.transport) throw new Error("transport is uninitialized");
      return this.transport.getProxy(t);
    }
  }
  async initializeWithMetrics(t) {
    const r = this.getService(t), n = performance.now();
    Pt.info("service_init", (i) => i.bold(t).text("start init..."));
    try {
      await r.initialize();
    } catch (i) {
      Pt.error("service_init", i);
    }
    Pt.info("service_init", (i) => i.bold(t).text("init cost").time(performance.now() - n));
  }
}
var cl = ((e) => (e.main = "main", e.rendererMain = "rendererMain", e.rendererLyrics = "rendererLyrics", e.rendererUpdate = "rendererUpdate", e.rendererFeedback = "rendererFeedback", e.rendererImagePreview = "rendererImagePreview", e.rendererTaskbarWidget = "rendererTaskbarWidget", e.rendererTaskbarWidgetShadow = "rendererTaskbarWidgetShadow", e))(cl || {});
let si = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, r) => (r &= 63, r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r > 62 ? t += "-" : t += "_", t), "");
class br {
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
    return new br();
  }
  static createDone(t) {
    const r = new br();
    return r.resolve(t), r;
  }
  static createAsync(t) {
    return new br(t());
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
class Rp {
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
    return r || (r = new Proxy({}, { get: (n, i) => {
      if (typeof i != "string") throw new TypeError(`service protocol method name(${String(i)}) must be a string`);
      return async (...o) => {
        const s = si(), a = new br();
        this.requests.set(s, a);
        const l = {};
        for (const [u, f] of o.entries()) if (f instanceof Function) {
          const h = si();
          this.callbacks.set(h, o[u]), o[u] = null, l[u] = h;
        }
        await this.send({ type: "method.invoke", fromWorkerId: this.currentWorker, toServiceId: t, methodName: i, requestId: s, arguments: o, callbacks: l });
        const c = await a.get();
        if (c.type !== "method.return") throw new Error("internal error: request proxy receive an invoke message as result");
        if (c.return.type === "error") throw new Error(c.return.error);
        return c.return.result;
      };
    } }), this.proxies.set(t, r)), r;
  }
  async handleReceivedMessage(t) {
    switch (t.type) {
      case "method.invoke": {
        const r = [...t.arguments];
        for (const [i, o] of Object.entries(t.callbacks)) {
          const s = Number.parseInt(i);
          r[s] = async (...a) => {
            await this.send({ type: "method.callback", fromWorkerId: this.currentWorker, toWorkerId: t.fromWorkerId, serviceId: t.toServiceId, callbackId: o, arguments: a });
          };
        }
        const n = this.initializer.getServiceProtocol(t.toServiceId);
        try {
          const i = await n[t.methodName](...r);
          await this.send({ type: "method.return", fromServiceId: t.toServiceId, toWorkerId: t.fromWorkerId, methodName: t.methodName, requestId: t.requestId, return: { type: "success", result: i } });
        } catch (i) {
          console.error(i), await this.send({ type: "method.return", fromServiceId: t.toServiceId, toWorkerId: t.fromWorkerId, methodName: t.methodName, requestId: t.requestId, return: { type: "error", error: i instanceof Error ? i.message : String(i) } });
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
class Ap extends Rp {
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
globalThis.createServiceInitializer = () => new Ip({ workerId: cl.rendererLyrics, transport: (e) => new Ap(e) });
const fl = createServiceInitializer();
function kp() {
  const t = `
@font-face {
  font-family: "MiSans";
  src: url("${Cp().fontPrefix.replaceAll("\\", "/")}/MiSansVF.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
}`, r = document.createElement("style");
  r.textContent = t, document.head.appendChild(r);
}
var Yo;
const dl = typeof window < "u", Dp = (e) => typeof e == "string", Mp = () => {
};
dl && ((Yo = window?.navigator) != null && Yo.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function pl(e) {
  return typeof e == "function" ? e() : M(e);
}
function Lp(e) {
  return e;
}
function Sn(e) {
  return la() ? (vd(e), true) : false;
}
function Np(e, t = true) {
  sl() ? Va(e) : t ? e() : Ta(e);
}
function Gt(e) {
  var t;
  const r = pl(e);
  return (t = r?.$el) != null ? t : r;
}
const Rr = dl ? window : void 0;
function Xo(...e) {
  let t, r, n, i;
  if (Dp(e[0]) || Array.isArray(e[0]) ? ([r, n, i] = e, t = Rr) : [t, r, n, i] = e, !t) return Mp;
  Array.isArray(r) || (r = [r]), Array.isArray(n) || (n = [n]);
  const o = [], s = () => {
    o.forEach((u) => u()), o.length = 0;
  }, a = (u, f, h, v) => (u.addEventListener(f, h, v), () => u.removeEventListener(f, h, v)), l = Ve(() => [Gt(t), pl(i)], ([u, f]) => {
    s(), u && o.push(...r.flatMap((h) => n.map((v) => a(u, h, v, f))));
  }, { immediate: true, flush: "post" }), c = () => {
    l(), s();
  };
  return Sn(c), c;
}
function hl(e, t = false) {
  const r = ke(), n = () => r.value = !!e();
  return n(), Np(n, t), r;
}
const Zo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, es = "__vueuse_ssr_handlers__";
Zo[es] = Zo[es] || {};
var ts = Object.getOwnPropertySymbols, $p = Object.prototype.hasOwnProperty, Vp = Object.prototype.propertyIsEnumerable, Fp = (e, t) => {
  var r = {};
  for (var n in e) $p.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && ts) for (var n of ts(e)) t.indexOf(n) < 0 && Vp.call(e, n) && (r[n] = e[n]);
  return r;
};
function jp(e, t, r = {}) {
  const n = r, { window: i = Rr } = n, o = Fp(n, ["window"]);
  let s;
  const a = hl(() => i && "ResizeObserver" in i), l = () => {
    s && (s.disconnect(), s = void 0);
  }, c = Ve(() => Gt(e), (f) => {
    l(), a.value && i && f && (s = new ResizeObserver(t), s.observe(f, o));
  }, { immediate: true, flush: "post" }), u = () => {
    l(), c();
  };
  return Sn(u), { isSupported: a, stop: u };
}
function Up(e, t = {}) {
  const { immediate: r = true, window: n = Rr } = t, i = ke(false);
  let o = 0, s = null;
  function a(u) {
    if (!i.value || !n) return;
    const f = u - o;
    e({ delta: f, timestamp: u }), o = u, s = n.requestAnimationFrame(a);
  }
  function l() {
    !i.value && n && (i.value = true, s = n.requestAnimationFrame(a));
  }
  function c() {
    i.value = false, s != null && n && (n.cancelAnimationFrame(s), s = null);
  }
  return r && l(), Sn(c), { isActive: Xr(i), pause: c, resume: l };
}
function Hp(e, t = {}) {
  const r = t ? t.delayEnter : 0, n = t ? t.delayLeave : 0, i = ke(false);
  let o;
  const s = (a) => {
    const l = a ? r : n;
    o && (clearTimeout(o), o = void 0), l ? o = setTimeout(() => i.value = a, l) : i.value = a;
  };
  return window && (Xo(e, "mouseenter", () => s(true), { passive: true }), Xo(e, "mouseleave", () => s(false), { passive: true })), i;
}
function vl(e, t = { width: 0, height: 0 }, r = {}) {
  const { window: n = Rr, box: i = "content-box" } = r, o = Z(() => {
    var l, c;
    return (c = (l = Gt(e)) == null ? void 0 : l.namespaceURI) == null ? void 0 : c.includes("svg");
  }), s = ke(t.width), a = ke(t.height);
  return jp(e, ([l]) => {
    const c = i === "border-box" ? l.borderBoxSize : i === "content-box" ? l.contentBoxSize : l.devicePixelContentBoxSize;
    if (n && o.value) {
      const u = Gt(e);
      if (u) {
        const f = n.getComputedStyle(u);
        s.value = parseFloat(f.width), a.value = parseFloat(f.height);
      }
    } else if (c) {
      const u = Array.isArray(c) ? c : [c];
      s.value = u.reduce((f, { inlineSize: h }) => f + h, 0), a.value = u.reduce((f, { blockSize: h }) => f + h, 0);
    } else s.value = l.contentRect.width, a.value = l.contentRect.height;
  }, r), Ve(() => Gt(e), (l) => {
    s.value = l ? t.width : 0, a.value = l ? t.height : 0;
  }), { width: s, height: a };
}
var rs = Object.getOwnPropertySymbols, Bp = Object.prototype.hasOwnProperty, qp = Object.prototype.propertyIsEnumerable, Wp = (e, t) => {
  var r = {};
  for (var n in e) Bp.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && rs) for (var n of rs(e)) t.indexOf(n) < 0 && qp.call(e, n) && (r[n] = e[n]);
  return r;
};
function zp(e, t, r = {}) {
  const n = r, { window: i = Rr } = n, o = Wp(n, ["window"]);
  let s;
  const a = hl(() => i && "MutationObserver" in i), l = () => {
    s && (s.disconnect(), s = void 0);
  }, c = Ve(() => Gt(e), (f) => {
    l(), a.value && i && f && (s = new MutationObserver(t), s.observe(f, o));
  }, { immediate: true }), u = () => {
    l(), c();
  };
  return Sn(u), { isSupported: a, stop: u };
}
var ns;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(ns || (ns = {}));
var Kp = Object.defineProperty, is = Object.getOwnPropertySymbols, Gp = Object.prototype.hasOwnProperty, Qp = Object.prototype.propertyIsEnumerable, os = (e, t, r) => t in e ? Kp(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, Jp = (e, t) => {
  for (var r in t || (t = {})) Gp.call(t, r) && os(e, r, t[r]);
  if (is) for (var r of is(t)) Qp.call(t, r) && os(e, r, t[r]);
  return e;
};
const Yp = { easeInSine: [0.12, 0, 0.39, 0], easeOutSine: [0.61, 1, 0.88, 1], easeInOutSine: [0.37, 0, 0.63, 1], easeInQuad: [0.11, 0, 0.5, 0], easeOutQuad: [0.5, 1, 0.89, 1], easeInOutQuad: [0.45, 0, 0.55, 1], easeInCubic: [0.32, 0, 0.67, 0], easeOutCubic: [0.33, 1, 0.68, 1], easeInOutCubic: [0.65, 0, 0.35, 1], easeInQuart: [0.5, 0, 0.75, 0], easeOutQuart: [0.25, 1, 0.5, 1], easeInOutQuart: [0.76, 0, 0.24, 1], easeInQuint: [0.64, 0, 0.78, 0], easeOutQuint: [0.22, 1, 0.36, 1], easeInOutQuint: [0.83, 0, 0.17, 1], easeInExpo: [0.7, 0, 0.84, 0], easeOutExpo: [0.16, 1, 0.3, 1], easeInOutExpo: [0.87, 0, 0.13, 1], easeInCirc: [0.55, 0, 1, 0.45], easeOutCirc: [0, 0.55, 0.45, 1], easeInOutCirc: [0.85, 0, 0.15, 1], easeInBack: [0.36, 0, 0.66, -0.56], easeOutBack: [0.34, 1.56, 0.64, 1], easeInOutBack: [0.68, -0.6, 0.32, 1.6] };
Jp({ linear: Lp }, Yp);
function U(e) {
  return fl.getServiceProtocol(e);
}
var j = ((e) => (e.storage = "storage", e.sharedState = "sharedState", e.request = "request", e.queue = "queue", e.player = "player", e.window = "window", e.user = "user", e.collect = "collect", e.internalCheck = "internalCheck", e.update = "update", e.appSettings = "appSettings", e.utils = "utils", e.debug = "debug", e.applog = "applog", e.renderer = "renderer", e.commerce = "commerce", e.serverPush = "serverPush", e.shortcut = "shortcut", e.desktopLyrics = "desktopLyrics", e.startup = "startup", e.notification = "notification", e.freqCtrl = "freqCtrl", e.resPreload = "resPreload", e.playerProxy = "playerProxy", e.imagePreviewer = "imagePreviewer", e.appClock = "clock", e.taskbarWidget = "taskbarWidget", e))(j || {}), yt = ((e) => (e.PlayOrPause = "PlayOrPause", e.PrevTrack = "PrevTrack", e.NextTrack = "NextTrack", e.VolumeUp = "VolumeUp", e.VolumeDown = "VolumeDown", e.Like = "Like", e.Dislike = "Dislike", e))(yt || {});
const ss = "higher", Xp = { queue: { appVisibility: { isPlayerVisible: true }, queue: null }, player: { isPlaying: false, isLoading: false, isMuted: false, volume: 0.3, quality: ss, playingQuality: ss, availableQualities: [], playableQualities: [], overrideQuality: void 0, progressPercent: 0, progressSeconds: 0, durationSeconds: 0, mediaEtParams: {}, isInitialPlay: true, currentAudioEffect: null }, user: { isLoading: false, info: null }, collect: { playable: {}, playlist: {}, album: {}, artist: {}, user: {} }, internalCheck: { isPassed: false }, debug: { updateProgress: "", latestTronBuildId: "", latestVersion: "" }, window: { windows: {}, isInactive: false, closeActionType: "exit" }, commerce: { commerceInfo: void 0, purchasedDigitalAlbumsIds: [], isAdFree: false, isVip: false, isFreeVip: false, vipExpireAt: 0, hasPlayEntitlement: false, type: "free", audioEffects: [] }, update: { isUpdateButtonVisible: false, isUpdateDialogVisible: false, updateType: false, isUpdating: false, isFailed: false }, shortcut: { isGlobalShortcutEnabled: false, shortcuts: { [yt.PlayOrPause]: { inApp: "", global: "" }, [yt.PrevTrack]: { inApp: "", global: "" }, [yt.NextTrack]: { inApp: "", global: "" }, [yt.VolumeUp]: { inApp: "", global: "" }, [yt.VolumeDown]: { inApp: "", global: "" }, [yt.Like]: { inApp: "", global: "" }, [yt.Dislike]: { inApp: "", global: "" } } }, desktopLyrics: { settings: { enabled: false, textSize: 24, textColor: "light", showTranslation: true, isLocked: false }, hover: false, menuVisible: false }, startup: { isAutoStartup: false }, notification: { isNotificationEnabled: true }, taskbarWidget: { enabled: false, autoStart: true, preferredSide: void 0, widgetState: "docked", isDragging: false, inDragRegion: false, snapStage: null, dockedStyle: "nano", theme: "dark", hover: false }, region: { abroadType: "0" } }, as = Nt(/* @__PURE__ */ new Map());
function gl(e) {
  let t = as.get(e);
  return t || (t = Sa(Xp[e]), as.set(e, t), U(j.sharedState).get(e).then((r) => {
    t.value = r;
  }), U(j.sharedState).onUpdate(e, (r) => {
    t.value = r;
  })), t;
}
function Qe(e) {
  return gl(e);
}
function Te(e) {
  return gl(e).value;
}
var ai = ((e) => (e[e.userNext = 0] = "userNext", e[e.userPrevious = 1] = "userPrevious", e[e.specific = 2] = "specific", e[e.switchPlayable = 3] = "switchPlayable", e[e.auto = 4] = "auto", e[e.skipFailed = 5] = "skipFailed", e[e.list = 6] = "list", e[e.feedInit = 7] = "feedInit", e[e.feedSwitch = 8] = "feedSwitch", e[e.hotkeyNext = 9] = "hotkeyNext", e[e.hotKeyPrevious = 10] = "hotKeyPrevious", e))(ai || {});
const Zp = 2, eh = 5, th = 4, rh = 3, ls = 1, us = 0;
function cs(e) {
  return `${e.type}:${e.id}`;
}
function nh(e, t, r) {
  return { seq: (e?.seq ?? 0) + 1, entityKey: t, toCollected: r };
}
var Ee = ((e) => (e.playable = "playable", e.album = "album", e.playlist = "playlist", e.artist = "artist", e.user = "user", e))(Ee || {});
function rr() {
  return Date.now() / 1e3;
}
function ih(e, t = rr()) {
  if (e && !(e.release.type === "until" && e.release.expiresAt <= t)) return e;
}
function En(e, t = rr()) {
  if (!e) return;
  const r = { server: e.server, override: ih(e.override, t) };
  if (!(!r.server && !r.override)) return r;
}
function ml(e, t = rr()) {
  const r = En(e, t);
  return r?.override?.value ?? r?.server?.value;
}
function oh(e, t = rr()) {
  return En(e, t)?.server?.value;
}
function sh(e, t = rr()) {
  return !!En(e, t)?.server;
}
function ah(e, t = rr()) {
  return En(e, t)?.override?.phase === "inflight";
}
function Ar(e, t) {
  return e[t.type][t.id];
}
function lh(e, t) {
  return ml(Ar(e, t))?.isCollected ?? false;
}
function uh(e, t) {
  return ml(Ar(e, t))?.customStatus;
}
function ch(e, t) {
  return oh(Ar(e, t))?.isCollected ?? false;
}
function fh(e, t) {
  return sh(Ar(e, t));
}
function dh(e, t) {
  return ah(Ar(e, t));
}
const Ft = Nt([]);
function He(e) {
  const t = si();
  if (e.mutexKey) for (let r = Ft.length - 1; r >= 0; r--) Ft[r].mutexKey === e.mutexKey && Ft.splice(r, 1);
  Ft.push({ ...e, id: t }), setTimeout(() => {
    const r = Ft.findIndex((n) => n.id === t);
    r !== -1 && Ft.splice(r, 1);
  }, e.timeout ?? 4e3);
}
var _l = ((e) => (e[e.PreSale = 1] = "PreSale", e[e.InSale = 2] = "InSale", e[e.OffShelf = 3] = "OffShelf", e))(_l || {});
function ph(e = null) {
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
function hh({ playable: e, queueState: t, commerceState: r }) {
  let n = "1.0";
  e.digital_track_info?.sale_period === _l.InSale ? n = "4.0" : e.label_info?.only_vip_playable ? n = "3.0" : e.label_info?.only_vip_download && (n = "2.0");
  const i = t?.queue?.playables.limitedFreeInfos[e.key]?.limited_free ?? e.limited_free_info?.limited_free ?? false, o = r?.hasPlayEntitlement ?? false;
  return { group_payment_level: n, is_limit: e?.label_info?.only_vip_playable ? !o && i ? "1" : "0" : "" };
}
let Fr;
const vh = new Uint8Array(16);
function gh() {
  if (!Fr && (Fr = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Fr)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Fr(vh);
}
const Se = [];
for (let e = 0; e < 256; ++e) Se.push((e + 256).toString(16).slice(1));
function mh(e, t = 0) {
  return Se[e[t + 0]] + Se[e[t + 1]] + Se[e[t + 2]] + Se[e[t + 3]] + "-" + Se[e[t + 4]] + Se[e[t + 5]] + "-" + Se[e[t + 6]] + Se[e[t + 7]] + "-" + Se[e[t + 8]] + Se[e[t + 9]] + "-" + Se[e[t + 10]] + Se[e[t + 11]] + Se[e[t + 12]] + Se[e[t + 13]] + Se[e[t + 14]] + Se[e[t + 15]];
}
const _h = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), fs = { randomUUID: _h };
function ds(e, t, r) {
  if (fs.randomUUID && !e) return fs.randomUUID();
  e = e || {};
  const n = e.random || (e.rng || gh)();
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, mh(n);
}
var an = ((e) => (e.main = "main", e.desktopLyrics = "desktopLyrics", e.captcha = "captcha", e.update = "update", e.feedback = "feedback", e.imagePreview = "imagePreview", e.taskbarWidget = "taskbarWidget", e.taskbarWidgetShadow = "taskbarWidgetShadow", e))(an || {});
let bt;
function zi() {
  return bt || (bt = { callbacks: /* @__PURE__ */ new Map(), value: void 0 }, U(j.appSettings).getAllSettings().then((e) => {
    e && (bt.value = e, bt.callbacks.forEach((t) => {
      try {
        t(e);
      } catch (r) {
        console.error("[AppSettings] callback error:", r);
      }
    }));
  }), U(j.appSettings).onUpdate((e) => {
    bt.value = e, bt.callbacks.forEach((t) => {
      try {
        t(e);
      } catch (r) {
        console.error("[AppSettings] callback error:", r);
      }
    });
  }), bt);
}
function bh(e) {
  const t = zi();
  if (e) {
    const r = Symbol("AppSettingsListener");
    return t.callbacks.set(r, e), () => {
      t.callbacks.delete(r);
    };
  }
}
function yh() {
  const e = zi(), t = Sa(e.value), r = bh((n) => {
    t.value = n;
  });
  return ji(() => {
    r?.();
  }), t;
}
function jr() {
  return zi().value;
}
const yr = "svip";
async function wh(e) {
  const t = await U(j.sharedState).get("commerce"), r = t.commerceInfo?.offers?.scene_offer_list?.[e]?.offer_snapshot_ids;
  if (!r || r.length === 0) {
    console.error(`Failed to get offer snapshot ids for offer group \`${e}\``);
    return;
  }
  const n = [];
  for (const s of r) {
    const a = t.commerceInfo?.offers?.offer_map?.[s];
    a?.membership_type && n.push(a.membership_type);
  }
  if (n.length === 0) {
    console.error(`Failed to get membership types for offer group \`${e}\``);
    return;
  }
  const i = n[0];
  return n.every((s) => s === i) ? i === yr ? "sell_svip" : "sell" : i === yr ? "sell_mix_svip" : "sell_mix_vip";
}
async function ps(e) {
  let t;
  if (e) {
    const r = await U(j.sharedState).get("commerce"), { upsell: n } = r, i = (n?.upsell_map ?? {})[e];
    if (!i || !i.pc_popup?.pc_popup_sku_lit?.offer_group) return console.error(`Failed to get upsell item offer group \`${e}\` when calling \`getSellContentType\``), "sell";
    t = i.pc_popup?.pc_popup_sku_lit?.offer_group;
  } else t = "mixed_vip_center";
  return await wh(t) ?? "sell";
}
async function li() {
  const e = await U(j.sharedState).get("commerce"), t = e?.commerceInfo?.membership, r = e?.commerceInfo?.trade;
  return t?.is_membership ? t.membership_type === yr ? "svip_buy" : "vip_buy" : r?.has_paid_order ? t?.last_membership_type === yr ? "svip_end" : "vip_end" : t?.last_membership_type === yr ? "svip_fresh" : "vip_fresh";
}
class xh {
  currentPopupUniqueName = null;
  visible = false;
  async init() {
    if (U(j.user).onLogin(() => {
      this.close();
    }), !(await U(j.user).getUserInfoState())?.my_info) return;
    const { upsell: t } = await U(j.sharedState).get("commerce"), r = t?.cold_launch_timing?.upsell_item_unique_names;
    if (!r) {
      Pt.info("cold_launch_popup", (n) => n.text("cold launch timing is undefined, exit"));
      return;
    }
    for (const n of r) {
      const i = t.upsell_map?.[n];
      if (!i) {
        Pt.info("cold_launch_popup", (l) => l.text("upsell item").bold(n).text("not found in upsell map"));
        continue;
      }
      if (!i.pc_popup?.pc_popup_pure_notification) {
        Pt.info("cold_launch_popup", (l) => l.text("upsell item").bold(n).text("is not a PCPopupPureNotification type"));
        continue;
      }
      const o = i.freq_ctrl_key_read, s = i.freq_ctrl_key_write;
      if (!o) {
        Pt.info("cold_launch_popup", (l) => l.text("upsell item").bold(n).text("freq_ctrl_key_read is undefined"));
        continue;
      }
      if (Pt.info("cold_launch_popup", (l) => l.text("upsell item").bold(n).text("freq_ctrl_key_read").object(o).text("freq_ctrl_key_write").object(s)), await U(j.freqCtrl).check(o)) {
        const l = i.pc_popup.event?.params;
        this.show(n, l), s && U(j.freqCtrl).update(s);
        break;
      }
    }
  }
  async show(t, r) {
    this.currentPopupUniqueName = t, this.visible = true, U(j.applog).report({ event: "pop_up_show", params: { from_action: "first_update_music_quality_cold", content_type: "cold_music_quality", page: "track_reco", scene_name: "track_reco", sell_vip_type: await li(), ...r } });
  }
  close() {
    this.currentPopupUniqueName = null, this.visible = false;
  }
}
const Ur = Nt(new xh());
class Sh {
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
    return jr()?.luna_pc_common_server_params?.vip?.vip_center_style ? this.newVipDialogUpsellKey : this.vipDialogUpsellKey;
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
    this.isQueueVisible = true, this.queueEtParams = t, U(j.applog).report({ event: "action_panel_show", params: { ...t, action_panel_name: "player_queue_panel", enter_method: "click" } });
  }
  closeQueue(t) {
    this.isQueueVisible = false, U(j.applog).report({ event: "action_panel_close", params: { ...this.queueEtParams, action_panel_name: "player_queue_panel", close_method: { blur: "blank", click: "close", esc: "close" }[t] } });
  }
  showSoundQualityPanel({ defaultTab: t, etParams: r }) {
    this.soundQualityPanelDefaultTab = t ?? null, this.soundQualityPanelEtParams = r, this.isSoundQualityPanelVisible = true, U(j.applog).report({ event: "action_panel_show", params: { ...r, action_panel_name: "music_quality_effect_taste_presentation", enter_method: "click" } });
  }
  closeSoundQualityPanel(t = "click") {
    this.isSoundQualityPanelVisible = false, U(j.applog).report({ event: "action_panel_close", params: { ...this.soundQualityPanelEtParams, action_panel_name: "music_quality_effect_taste_presentation", close_method: { blur: "blank", click: "close", esc: "close" }[t] } }), this.soundQualityPanelDefaultTab = null, this.soundQualityPanelEtParams = {};
  }
  toggleDebugger(t) {
    typeof t == "boolean" ? this.isDebuggerVisible = t : this.isDebuggerVisible = !this.isDebuggerVisible;
  }
  async handleClickCommentIcon(t) {
    this.isCommentPanelVisible ? this.closeCommentPanel("click") : this.openCommentPanel(t), U(j.applog).report({ event: "view_click", params: { ...this.currentPageEtParams, ...await U(j.player).getCurrentReportParams(), type: "comment_icon" } });
  }
  async openCommentPanel(t) {
    this.isQueueVisible && this.closeQueue("blur"), this.isCommentPanelVisible = true, this.commentPanelTrackInfo = t, this.commentPanelOpenTime = Date.now(), U(j.applog).report({ event: "action_panel_show", params: { ...this.currentPageEtParams, ...await U(j.player).getCurrentReportParams(), action_panel_name: "comment_panel", enter_method: "click" } });
  }
  async closeCommentPanel(t) {
    this.isCommentPanelVisible = false, this.commentPanelTrackInfo = null;
    const r = this.commentPanelOpenTime && Date.now() - this.commentPanelOpenTime;
    U(j.applog).report({ event: "action_panel_close", params: { ...this.currentPageEtParams, ...await U(j.player).getCurrentReportParams(), action_panel_name: "comment_panel", close_method: t, stay_time: r } });
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
  async showVipDialog({ eventParams: t, upsellKey: r, offerGroup: n, purchaseId: i }) {
    if (jr()?.luna_pc_common_server_params?.vip?.vip_center_style) return this.showNewVipDialog({ eventParams: t, upsellKey: r, offerGroup: n, purchaseId: i });
    if (Te("player")?.isInitialPlay && Ur.visible && r === "preview_popup_vip") return;
    if (Ur.close(), !(await Te("user"))?.info) {
      if (!await Te("window")?.windows[an.main]?.isFocus) return;
      this.isVIPDialogWaitingLogin = true;
      const f = await U(j.user).login({ waitComplete: true, etParams: { scene_name: this.currentPageEtParams.scene_name, enter_from_page: this.currentPageEtParams.page, enter_method: "vip_intercept" } });
      if (this.isVIPDialogWaitingLogin = false, !f) return;
    }
    if (!Te("user")?.info) return;
    const o = Te("queue"), s = o?.queue?.currentPlayable.key, a = s ? o?.queue?.playables.byKey[s] : void 0;
    a && (this.vipDialogInterceptPlayable = a), this.vipDialogUpsellKey = r;
    const l = Te("commerce");
    t.content_type = await ps(this.vipDialogUpsellKey), t.purchase_id = i ?? ds(), t.sell_vip_type = await li(), t.page = t.page ?? this.currentPageEtParams.page, t.scene_name = t.scene_name ?? this.currentPageEtParams.scene_name, t.request_id = t.request_id ?? this.currentPageEtParams.request_id, l?.commerceInfo?.membership?.is_membership ? l?.commerceInfo.membership.is_about_to_expire ? t.user_status = "3" : t.user_status = "2" : l?.commerceInfo?.trade?.has_paid_order ? t.user_status = "4" : t.user_status = "1";
    const c = await U(j.sharedState).get("player"), u = c.mediaId && c.mediaEtParams[c.mediaId];
    u && (t.group_id = u.group_id, t.group_type = u.group_type, t.group_payment_level = u.group_payment_level, t.request_id = t.request_id ?? u.request_id), this.vipDialogEtParams = t, this.vipDialogOfferGroup = n, this.isVIPDialogVisible = true, U(j.applog).report({ event: "pop_up_show", params: { ...t } });
  }
  async closeVipDialog() {
    if (jr()?.luna_pc_common_server_params?.vip?.vip_center_style) return this.closeNewVipDialog();
    this.isVIPDialogWaitingLogin && U(j.renderer).closeDouyinLoginPanel(), this.isVIPDialogVisible = false;
  }
  async showNewVipDialog({ eventParams: t = {}, upsellKey: r, offerGroup: n, purchaseId: i } = {}) {
    if (Te("player")?.isInitialPlay && Ur.visible && r === "preview_popup_vip") return;
    if (Ur.close(), !Te("user")?.info) {
      if (!Te("window")?.windows[an.main]?.isFocus) return;
      this.isVIPDialogWaitingLogin = true;
      const f = await U(j.user).login({ waitComplete: true, etParams: { scene_name: this.currentPageEtParams.scene_name, enter_from_page: this.currentPageEtParams.page, enter_method: "vip_intercept" } });
      if (this.isVIPDialogWaitingLogin = false, !f) return;
    }
    if (!Te("user")?.info) return;
    const o = Te("queue"), s = o?.queue?.currentPlayable.key, a = s ? o?.queue?.playables.byKey[s] : void 0;
    a && (this.newVipDialogInterceptPlayable = a), this.newVipDialogUpsellKey = r;
    const l = Te("commerce");
    t.content_type = await ps(this.newVipDialogUpsellKey), t.purchase_id = i ?? ds(), t.sell_vip_type = await li(), t.page = t.page ?? this.currentPageEtParams.page, t.scene_name = t.scene_name ?? this.currentPageEtParams.scene_name, t.request_id = t.request_id ?? this.currentPageEtParams.request_id, l?.commerceInfo?.membership?.is_membership ? l?.commerceInfo.membership.is_about_to_expire ? t.user_status = "3" : t.user_status = "2" : l?.commerceInfo?.trade?.has_paid_order ? t.user_status = "4" : t.user_status = "1";
    const c = await U(j.sharedState).get("player"), u = c.mediaId && c.mediaEtParams[c.mediaId];
    u && (t.group_id = u.group_id, t.group_type = u.group_type, t.group_payment_level = u.group_payment_level, t.request_id = t.request_id ?? u.request_id), this.newVipDialogEtParams = t, this.newVipDialogOfferGroup = n, this.isNewVIPDialogVisible = true, U(j.applog).report({ event: "pop_up_show", params: { ...t } });
  }
  closeNewVipDialog() {
    this.isVIPDialogWaitingLogin && U(j.renderer).closeDouyinLoginPanel(), this.isNewVIPDialogVisible = false;
  }
  async showReportDialog({ playable: t, etParams: r } = {}) {
    !(await Te("user"))?.info && !await U(j.user).login({ waitComplete: true, etParams: { scene_name: this.currentPageEtParams.scene_name, enter_from_page: this.currentPageEtParams.page, enter_method: "report" } }) || (this.reportEtParams = { ...r ?? {}, content_type: "report_feedback" }, U(j.applog).report({ event: "pop_up_show", params: this.reportEtParams }), this.isReportVisible = true, this.reportPlayable = t);
  }
  async closeReportDialog(t) {
    delete this.reportPlayable, this.isReportVisible = false, U(j.applog).report({ event: "pop_confirm", params: { ...this.reportEtParams, confirm_choice: { close: "close_btn", cancel: "cancel", submit: "submit" }[t] } });
  }
  async showCommentReportDialog(t) {
    if (!jr()?.comment_report?.enable_comment_report) {
      He({ message: "\u8BF7\u524D\u5F80 \u8BBE\u7F6E-\u4F7F\u7528\u76F8\u5173-\u5E2E\u52A9\u4E0E\u53CD\u9988 \u8FDB\u884C\u4E3E\u62A5" });
      return;
    }
    !(await Te("user"))?.info && !await U(j.user).login({ waitComplete: true, etParams: { scene_name: this.currentPageEtParams.scene_name, enter_from_page: this.currentPageEtParams.page, enter_method: "report_comment" } }) || (this.commentReportDialogParams = t, this.isCommentReportDialogVisible = true);
  }
  async closeCommentReportDialog() {
    this.isCommentReportDialogVisible = false;
  }
}
const ui = Nt(new Sh());
addEventListener("popstate", (e) => {
  ui.canBack = !!e.state?.back, ui.canForward = !!e.state?.forward;
});
function Eh({ entity: e, onToggle: t }) {
  const r = Qe("collect"), n = Qe("user");
  let i = false;
  const o = Z(() => e.value ? lh(r.value, e.value) : false), s = Z(() => {
    if (e.value) return uh(r.value, e.value);
  }), a = Z(() => e.value ? fh(r.value, e.value) : false), l = Z(() => e.value ? dh(r.value, e.value) : false), c = Z(() => e.value ? ch(r.value, e.value) : false);
  async function u(f, h, v = {}) {
    const S = { ...ph(h), ...v };
    if (!e.value || l.value) return;
    if (!n.value.info) {
      let P;
      if (e.value.type === Ee.user ? e.value.isArtist ? P = "artist_user" : P = "user" : P = e.value.type, !await U(j.user).login({ waitComplete: true, etParams: { scene_name: S.scene_name, enter_from_page: ui.currentPageEtParams.page, enter_method: `group_collect_${P}` } })) return;
    }
    if (i) return;
    i = true, t?.({ entity: e.value, isCollected: f });
    const w = await U(j.collect).setCollect([e.value], f), $ = [Ee.artist, Ee.user].includes(e.value?.type ?? Ee.playable) ? "\u5173\u6CE8" : "\u6536\u85CF";
    if (i = false, U(j.applog).report({ event: f ? "group_collect" : "group_cancel_collect", params: { group_type: { [Ee.album]: "album", [Ee.playlist]: "playlist", [Ee.artist]: "artist", [Ee.playable]: "track", [Ee.user]: "user" }[e.value.type], group_id: e.value.id, collect_type: "click", action_type: "player", status: w.error ? "fail" : "success", ...e.value.type === Ee.playable && e.value.playable ? hh({ playable: e.value.playable, queueState: Te("queue"), commerceState: Te("commerce") }) : {}, ...S } }), w.error) He(f ? { message: `${$}\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5` } : { message: `\u53D6\u6D88${$}\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5` });
    else switch (e.value.type) {
      case Ee.playable: {
        He(f ? { message: "\u5DF2\u6DFB\u52A0\u5230\u201C\u6211\u559C\u6B22\u7684\u97F3\u4E50\u201D", mutexKey: "collect_track" } : { message: "\u5DF2\u53D6\u6D88\u559C\u6B22", mutexKey: "collect_track" });
        break;
      }
      case Ee.artist: {
        w.isSilence || He(f ? { message: "\u6210\u529F\u5173\u6CE8\u97F3\u4E50\u4EBA" } : { message: "\u5DF2\u4E0D\u518D\u5173\u6CE8\u8BE5\u97F3\u4E50\u4EBA" });
        break;
      }
      case Ee.album: {
        He(f ? { message: "\u6210\u529F\u6536\u85CF\u4E13\u8F91" } : { message: "\u5DF2\u4E0D\u518D\u6536\u85CF\u8BE5\u4E13\u8F91" });
        break;
      }
      case Ee.playlist: {
        He(f ? { message: "\u6210\u529F\u6536\u85CF\u6B4C\u5355" } : { message: "\u5DF2\u4E0D\u518D\u6536\u85CF\u8BE5\u6B4C\u5355" });
        break;
      }
      case Ee.user: {
        f ? w.customStatus === 4 || w.customStatus === 5 ? He({ message: "\u5DF2\u53D1\u9001\u5173\u6CE8\u8BF7\u6C42" }) : He({ message: "\u6210\u529F\u5173\u6CE8\u7528\u6237" }) : He({ message: "\u5DF2\u4E0D\u518D\u5173\u6CE8\u8BE5\u7528\u6237" });
        break;
      }
    }
    return w;
  }
  return { isCollected: o, customStatus: s, isLoaded: a, isPending: l, serverCollected: c, toggleCollect: u };
}
function Ph(e) {
  if (!(!e || e === 0)) return e >= 1 && e <= 9999 ? String(e) : e >= 1e4 && e <= 99999 ? `${Math.floor(e / 1e4)}w+` : e >= 1e5 && e <= 999999 ? `${Math.floor(e / 1e5)}0w+` : e >= 1e6 && e <= 999e4 ? `${Math.floor(e / 1e6)}00w+` : e > 999e4 ? "999w+" : String(e);
}
const Ch = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function Th(e, t) {
  return N(), B("svg", Ch, [...t[0] || (t[0] = [A("path", { fill: "currentColor", d: "M44.996 19.068A13.4 13.4 0 0 0 37.823 7.52a13.34 13.34 0 0 0-12.832.252l-.145.086-.327.206a.96.96 0 0 1-1.032 0l-.24-.15-.194-.117a13.34 13.34 0 0 0-12.876-.277A13.4 13.4 0 0 0 3 19.392l.005.468c.14 5.192 3.365 10.766 8.53 16.003a50 50 0 0 0 3.326 3.075l.617.512q.464.379.923.736l.609.465q.759.57 1.488 1.066l.575.384c.738.481 1.439.895 2.08 1.227l.444.222.208.098Q22.725 44 24 44l.313-.005q1.074-.038 1.877-.345c.81-.37 1.74-.898 2.737-1.549l.575-.384.489-.339q.494-.347.999-.727l.61-.465.46-.363.462-.373.617-.512.678-.583a49 49 0 0 0 2.648-2.492c5.164-5.237 8.39-10.811 8.53-16.003l.005-.468z" }, null, -1)])]);
}
const Oh = { render: Th }, Ih = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function Rh(e, t) {
  return N(), B("svg", Ih, [...t[0] || (t[0] = [A("path", { stroke: "currentColor", "stroke-linejoin": "round", "stroke-width": "4", d: "M32 7c-4 0-6.5 2.5-8 4-1.5-1.5-4-4-8-4-5 0-8 2-10 5s-3.19 9.296 1 16c5 8 13 13 17 15 4-2 12-7 17-15 4.559-7.295 3-13 1-16s-5-5-10-5Z" }, null, -1)])]);
}
const Ah = { render: Rh }, kh = { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "none", viewBox: "0 0 20 20" };
function Dh(e, t) {
  return N(), B("svg", kh, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-opacity": ".85", d: "M7.917 8.333c.46 0 .833.373.833.834v4.583a.833.833 0 0 1-1.667 0V9.167c0-.46.373-.834.834-.834m4.166 0c.46 0 .834.373.834.834v4.583a.833.833 0 0 1-1.667 0V9.167c0-.46.373-.834.833-.834" }, null, -1), A("path", { fill: "currentColor", "fill-opacity": ".85", "fill-rule": "evenodd", d: "M17.917 4.167a.833.833 0 0 1 0 1.666h-1.25v8.82c0 2.29-1.919 4.097-4.218 4.097H7.55c-2.3 0-4.218-1.807-4.218-4.097v-8.82h-1.25a.833.833 0 0 1 0-1.666zM5 14.653c0 1.313 1.114 2.43 2.551 2.43h4.898c1.437 0 2.551-1.117 2.551-2.43v-8.82H5z", "clip-rule": "evenodd" }, null, -1), A("path", { fill: "currentColor", "fill-opacity": ".85", d: "M11.667 1.667a.833.833 0 0 1 0 1.666H8.333a.833.833 0 0 1 0-1.666z" }, null, -1)])]);
}
const Mh = { render: Dh }, Lh = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function Nh(e, t) {
  return N(), B("svg", Lh, [...t[0] || (t[0] = [A("path", { fill: "currentColor", d: "M11 40.407V9.24c0-3.147 3.465-5.061 6.129-3.387L40.844 20.76c2.436 1.531 2.507 5.058.133 6.685L17.262 43.706c-2.654 1.82-6.262-.08-6.262-3.299" }, null, -1)])]);
}
const $h = { render: Nh }, Vh = { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", fill: "none", viewBox: "0 0 12 12" };
function Fh(e, t) {
  return N(), B("svg", Vh, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M6 1a.75.75 0 0 0-.75.75v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5A.75.75 0 0 0 6 1", "clip-rule": "evenodd" }, null, -1)])]);
}
const jh = { render: Fh }, Uh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Hh(e, t) {
  return N(), B("svg", Uh, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M2.917 2.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m4.166.417a.833.833 0 1 0 0 1.666h10a.833.833 0 1 0 0-1.666zM1.667 10a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0m1.25 5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m3.333-5c0-.46.373-.833.833-.833h10a.833.833 0 1 1 0 1.666h-10A.833.833 0 0 1 6.25 10m.833 5.417a.833.833 0 1 0 0 1.666h10a.833.833 0 1 0 0-1.666z", "clip-rule": "evenodd" }, null, -1)])]);
}
const Bh = { render: Hh }, qh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Wh(e, t) {
  return N(), B("svg", qh, [...t[0] || (t[0] = [A("circle", { cx: "15.834", cy: "10", r: "1.25", fill: "currentColor" }, null, -1), A("circle", { cx: "10.001", cy: "10", r: "1.25", fill: "currentColor" }, null, -1), A("circle", { cx: "4.167", cy: "10", r: "1.25", fill: "currentColor" }, null, -1)])]);
}
const zh = { render: Wh }, Kh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Gh(e, t) {
  return N(), B("svg", Kh, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-opacity": ".85", "fill-rule": "evenodd", d: "M7.5 5a2.5 2.5 0 0 1 5 0v1.667h-5zM5.833 6.669v-1.67a4.167 4.167 0 1 1 8.334 0v1.67q.32.003.579.023c.33.027.657.086.972.247a2.5 2.5 0 0 1 1.093 1.093c.16.315.22.643.247.972.025.312.025.691.025 1.13V15.7c0 .439 0 .818-.025 1.13-.027.33-.087.657-.247.973a2.5 2.5 0 0 1-1.093 1.092c-.315.16-.643.22-.972.247-.312.026-.691.026-1.13.026H6.383c-.439 0-.818 0-1.13-.026-.33-.027-.657-.086-.972-.247a2.5 2.5 0 0 1-1.093-1.092c-.16-.316-.22-.643-.247-.973a15 15 0 0 1-.025-1.13v-5.565c0-.439 0-.818.025-1.13.027-.33.086-.657.247-.972A2.5 2.5 0 0 1 4.281 6.94c.315-.16.643-.22.972-.247q.26-.02.58-.023m-.795 1.755c.042-.02.125-.052.352-.07.236-.02.546-.02 1.027-.02h7.166c.48 0 .791 0 1.027.02.226.018.31.05.352.07.156.08.284.207.364.364.02.041.052.125.07.352.02.236.02.546.02 1.027v5.5c0 .48 0 .79-.02 1.026-.018.227-.05.31-.07.352a.83.83 0 0 1-.364.364c-.042.021-.126.053-.352.071-.236.02-.546.02-1.027.02H6.417c-.48 0-.791 0-1.027-.02-.227-.018-.31-.05-.352-.07a.83.83 0 0 1-.364-.365c-.02-.041-.052-.125-.07-.352-.02-.236-.02-.546-.02-1.026v-5.5c0-.48 0-.791.02-1.027.018-.227.05-.31.07-.352a.83.83 0 0 1 .364-.364m5.795 4.686a1.666 1.666 0 1 0-1.666 0V15a.833.833 0 1 0 1.666 0z", "clip-rule": "evenodd" }, null, -1)])]);
}
const Qh = { render: Gh }, Jh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Yh(e, t) {
  return N(), B("svg", Jh, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M2.5 9.999a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0M10 .832a9.167 9.167 0 1 0 0 18.333A9.167 9.167 0 0 0 10 .832m0 7.083a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083m0 1.252c.46 0 .833.373.833.833v3.75a.833.833 0 0 1-1.666 0V10c0-.46.373-.833.833-.833", "clip-rule": "evenodd" }, null, -1)])]);
}
const Xh = { render: Yh }, Zh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function ev(e, t) {
  return N(), B("svg", Zh, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M10.342 3.049a.83.83 0 0 0-.684 0c-.037.016-.15.085-.378.415-.225.326-.489.791-.877 1.48l-4.6 8.155c-.377.668-.63 1.119-.788 1.47-.16.353-.16.482-.156.524.026.233.15.445.34.582.034.025.147.087.534.122.382.035.9.036 1.666.036h9.202c.766 0 1.284 0 1.666-.036.387-.035.5-.097.534-.122a.83.83 0 0 0 .34-.582c.005-.042.003-.17-.156-.525-.157-.35-.41-.801-.787-1.469l-4.601-8.156c-.388-.688-.652-1.153-.877-1.479-.229-.33-.341-.399-.378-.415m-1.368-1.52a2.5 2.5 0 0 1 2.052 0c.462.208.789.588 1.065.987.274.397.575.93.937 1.573l.02.035 4.601 8.156.02.035c.352.624.644 1.142.837 1.57.194.434.347.9.291 1.393a2.5 2.5 0 0 1-1.02 1.749c-.404.29-.884.386-1.357.43-.468.043-1.063.043-1.779.043H5.36c-.716 0-1.31 0-1.779-.043-.473-.044-.953-.14-1.356-.43a2.5 2.5 0 0 1-1.021-1.749c-.056-.494.097-.96.292-1.392.192-.43.484-.947.836-1.57l.02-.036 4.6-8.156.02-.035c.364-.644.664-1.176.938-1.573.276-.399.603-.78 1.065-.987m.193 5.554a.833.833 0 1 1 1.666 0v3.333a.833.833 0 0 1-1.666 0zM10 12.5a.833.833 0 1 0 0 1.666.833.833 0 0 0 0-1.666", "clip-rule": "evenodd" }, null, -1)])]);
}
const tv = { render: ev }, rv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function nv(e, t) {
  return N(), B("svg", rv, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M13.606 13.733a6.667 6.667 0 1 0-7.213 0 11.1 11.1 0 0 0-4.731 3.221.833.833 0 0 0 1.26 1.091c1.73-1.998 4.261-3.254 7.078-3.254s5.347 1.256 7.078 3.254a.833.833 0 1 0 1.26-1.091 11.1 11.1 0 0 0-4.732-3.221M5 8.125a5 5 0 1 1 10 0 5 5 0 0 1-10 0", "clip-rule": "evenodd" }, null, -1)])]);
}
const iv = { render: nv }, ov = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function sv(e, t) {
  return N(), B("svg", ov, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-opacity": ".85", "fill-rule": "evenodd", d: "m10 2.757 6.272 3.622v7.242L10 17.24l-6.272-3.62V6.379zm-.833-1.443a1.67 1.67 0 0 1 1.666 0l6.272 3.621c.516.298.833.848.833 1.444v7.242c0 .595-.317 1.145-.833 1.443l-6.272 3.621a1.67 1.67 0 0 1-1.666 0l-6.272-3.62a1.67 1.67 0 0 1-.834-1.444V6.379c0-.596.318-1.146.834-1.444zM8.333 10a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0M10 6.666a3.333 3.333 0 1 0 0 6.667 3.333 3.333 0 0 0 0-6.667", "clip-rule": "evenodd" }, null, -1)])]);
}
const av = { render: sv }, lv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function uv(e, t) {
  return N(), B("svg", lv, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m1.667 0A9.167 9.167 0 1 1 .833 10a9.167 9.167 0 0 1 18.334 0M8.257 7.568a.833.833 0 1 0-1.514.698l2.311 5.007c.373.807 1.52.807 1.892 0l2.31-5.007a.833.833 0 0 0-1.513-.698L10 11.345z", "clip-rule": "evenodd" }, null, -1), on(">", -1)])]);
}
const cv = { render: uv }, fv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function dv(e, t) {
  return N(), B("svg", fv, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M5.134 1.666h9.731c.44 0 .819 0 1.13.025.33.027.658.087.973.247a2.5 2.5 0 0 1 1.093 1.093c.16.315.22.643.247.972.025.313.025.692.025 1.13v.283a.833.833 0 0 1-1.666 0v-.25c0-.48-.001-.79-.02-1.027-.019-.226-.05-.31-.071-.351a.83.83 0 0 0-.364-.364c-.042-.021-.126-.053-.352-.071-.236-.02-.546-.02-1.027-.02H5.167c-.481 0-.791 0-1.027.02-.227.018-.31.05-.352.07a.83.83 0 0 0-.364.365c-.021.04-.052.125-.07.351-.02.236-.02.547-.02 1.027v9.667c0 .48 0 .79.02 1.027.018.226.049.31.07.351.08.157.207.284.364.364.041.021.125.053.352.071.236.02.546.02 1.027.02h9.666c.48 0 .79 0 1.027-.02.226-.018.31-.05.352-.07a.83.83 0 0 0 .364-.365c.02-.041.052-.125.07-.351.02-.237.02-.547.02-1.027v-.25a.833.833 0 1 1 1.667 0v.282c0 .44 0 .818-.025 1.13-.027.33-.087.657-.247.973a2.5 2.5 0 0 1-1.093 1.092c-.315.16-.643.22-.972.247-.312.026-.691.026-1.13.026H5.133c-.439 0-.818 0-1.13-.026-.33-.027-.657-.086-.972-.247a2.5 2.5 0 0 1-1.093-1.092c-.16-.316-.22-.643-.247-.973-.026-.312-.026-.69-.025-1.13V5.134c0-.44 0-.818.025-1.13.027-.33.086-.658.247-.973a2.5 2.5 0 0 1 1.093-1.093c.315-.16.643-.22.972-.247.312-.025.691-.025 1.13-.025m5.484 11.899a.833.833 0 0 1-1.178 0l-2.946-2.947a.833.833 0 0 1 0-1.178L9.44 6.494a.833.833 0 0 1 1.178 1.178L9.124 9.166H17.5a.833.833 0 1 1 0 1.667H9.065l1.553 1.553a.833.833 0 0 1 0 1.179", "clip-rule": "evenodd" }, null, -1)])]);
}
const pv = { render: dv }, hv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function vv(e, t) {
  return N(), B("svg", hv, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15m0 1.667A9.167 9.167 0 1 0 10 .833a9.167 9.167 0 0 0 0 18.334m0-7.5a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334m0 1.666a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666M5.619 8.486q.055-.084.095-.179l.006-.015a4.6 4.6 0 0 1 3.15-2.76l.016-.004q.098-.026.189-.07c.336-.163.574-.495.547-.874-.031-.452-.425-.799-.87-.708a6.25 6.25 0 0 0-4.66 4.082c-.147.429.144.865.589.956.372.076.732-.116.938-.428", "clip-rule": "evenodd" }, null, -1)])]);
}
const gv = { render: vv }, mv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function _v(e, t) {
  return N(), B("svg", mv, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M11.128 3.556a.417.417 0 0 0-.712.295v1.747c0 .773-.528 1.423-1.243 1.62-2.318.644-3.793 1.49-4.767 2.713s-1.537 2.933-1.79 5.499c2.431-1.62 4.25-2.59 6.484-2.223.827.136 1.316.869 1.316 1.593v1.029c0 .366.44.554.705.301l5.82-5.555a.833.833 0 0 0 .013-1.192zm-2.378.295c0-1.856 2.244-2.785 3.556-1.473l5.827 5.827a2.5 2.5 0 0 1-.042 3.576l-5.82 5.555c-1.325 1.265-3.521.326-3.521-1.507v-.99c-1.497-.218-2.814.38-5.236 1.995-1.107.739-2.701-.06-2.563-1.502.263-2.739.878-4.842 2.151-6.44 1.28-1.606 3.134-2.588 5.626-3.28a.04.04 0 0 0 .02-.012l.002-.003z", "clip-rule": "evenodd" }, null, -1)])]);
}
const bv = { render: _v }, yv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function wv(e, t) {
  return N(), B("svg", yv, [...t[0] || (t[0] = [A("path", { fill: "currentColor", d: "M10 1.042a5.208 5.208 0 1 0 0 10.416 5.208 5.208 0 0 0 0-10.416M6.46 6.25a3.542 3.542 0 1 1 7.083 0 3.542 3.542 0 0 1-7.083 0m11.47 4.197a.8.8 0 0 0-.324-.024l-1.667.208a.834.834 0 0 0-.73.827v4.375a1.458 1.458 0 1 1-1.458-1.458.833.833 0 0 0 0-1.667 3.124 3.124 0 1 0 3.118 3.339 1 1 0 0 0 .007-.11v-3.743l.937-.117a.833.833 0 0 0 .117-1.63M5.625 12.708a4.167 4.167 0 0 0-4.166 4.167v1.25a.833.833 0 0 0 1.666 0v-1.25a2.5 2.5 0 0 1 2.5-2.5h3.75a.834.834 0 0 0 0-1.667z" }, null, -1)])]);
}
const xv = { render: wv }, Sv = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function Ev(e, t) {
  return N(), B("svg", Sv, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M10.482 11.405A5 5 0 0 1 15.361 7.5h14.897v18.558a7 7 0 0 0-5.887 5.244l-2.209 8.834a2.46 2.46 0 0 1-4.792-1.112l1.714-8A2.5 2.5 0 0 0 16.64 28h-3.636c-3.203 0-5.58-2.97-4.879-6.095zM34.258 26H39a1 1 0 0 0 1-1V9.5a2 2 0 0 0-2-2h-3.742zM15.361 3.5a9 9 0 0 0-8.782 7.029l-2.357 10.5C2.96 26.654 7.238 32 13.004 32h1.78l-1.325 6.186C12.597 42.208 15.663 46 19.776 46a6.46 6.46 0 0 0 6.267-4.894l2.209-8.834A3 3 0 0 1 31.162 30H39a5 5 0 0 0 5-5V9.5a6 6 0 0 0-6-6z", "clip-rule": "evenodd" }, null, -1)])]);
}
const Pv = { render: Ev }, Cv = $t({ __name: "Icon", props: { name: {} }, setup(e) {
  const t = e, r = { "collect-button": Oh, "collect-button-outline": Ah, plus: jh, playlist: Bh, "three-points": zh, delete: Mh, "play-button": $h, lock: Qh, info: Xh, report: tv, me: iv, settings: av, vip: cv, logout: pv, album: gv, share: bv, artist: xv, dislike: Pv }, n = Z(() => r[t.name]);
  return (i, o) => (N(), Dt(c0(n.value)));
} }), Tv = { key: 1, class: "placeholder" }, Ov = { key: 2, class: "content" }, Iv = $t({ __name: "Button", props: { type: { default: "primary" }, icon: {}, iconStyle: {}, disabled: { type: Boolean }, defaultPlaceholder: { type: Boolean } }, emits: ["click"], setup(e, { emit: t }) {
  const r = t;
  return (n, i) => (N(), B("div", { class: Pe(["button", { [e.type]: true, disabled: e.disabled, "with-placeholder": e.defaultPlaceholder }]), onClick: i[0] || (i[0] = ii((o) => e.disabled ? void 0 : r("click", o), ["stop"])), onDblclick: i[1] || (i[1] = ii(() => {
  }, ["stop"])) }, [e.icon ? (N(), B("div", { key: 0, class: "icon", style: Ke(e.iconStyle) }, [fe(Cv, { name: e.icon }, null, 8, ["name"])], 4)) : Kt("", true), e.defaultPlaceholder ? (N(), B("div", Tv, [Co(n.$slots, "placeholder", {}, void 0)])) : Kt("", true), e.type !== "icon" ? (N(), B("div", Ov, [Co(n.$slots, "default", {}, void 0)])) : Kt("", true)], 34));
} }), kr = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, i] of t) r[n] = i;
  return r;
}, Rv = kr(Iv, [["__scopeId", "data-v-9694af45"]]), Av = "" + new URL("collect-sprite-dW27ds63.png", import.meta.url).href, kv = $t({ __name: "CollectHeart", props: { isCollected: { type: Boolean }, animationKey: { default: "" }, animationCommand: { default: null }, size: { default: 24 } }, setup(e) {
  const t = e, r = ke(0);
  let n = 0, i = false;
  Ve(() => t.animationKey, () => {
    n += 1, i = false, s(t.isCollected ? 64 : 0);
  }, { immediate: true }), Ve(() => t.isCollected, (a) => {
    i || s(a ? 64 : 0);
  }, { immediate: true }), Ve(() => t.animationCommand?.seq, async (a, l) => {
    if (a == null || a === l) return;
    const c = t.animationCommand;
    if (!c || c.entityKey !== t.animationKey) return;
    const u = ++n;
    i = true, c.toCollected ? await o(0, 64, u) : await o(65, 86, u), u === n && (i = false, s(t.isCollected ? 64 : 0));
  });
  async function o(a, l, c) {
    r.value = a;
    const f = (l - a) * (1e3 / 60), h = performance.now(), v = h + f;
    for (; performance.now() < v; ) {
      if (c !== n || (await new Promise(($) => requestAnimationFrame(() => $())), c !== n)) return;
      const S = performance.now() - h, w = Math.floor(S / f * (l - a));
      r.value = a + w;
    }
    c === n && (r.value = l);
  }
  function s(a) {
    r.value = a;
  }
  return (a, l) => (N(), B("div", { class: "collect-container", style: Ke({ width: `${e.size}px`, height: `${e.size}px` }) }, [A("div", { class: "collect-heart", style: Ke({ width: `${e.size}px`, height: `${e.size}px`, backgroundImage: `url(${M(Av)})`, backgroundPositionX: `-${e.size * r.value}px`, backgroundPositionY: 0, backgroundSize: `${e.size * 86}px ${e.size}px` }) }, null, 4)], 4));
} }), Dv = kr(kv, [["__scopeId", "data-v-5eb9ad39"]]), Mv = $t({ __name: "CollectButton", props: { buttonProps: {}, entity: {}, count: {}, disabled: { type: Boolean } }, emits: ["click"], setup(e, { emit: t }) {
  const r = e, n = t, i = ke(null), { isCollected: o, customStatus: s, isPending: a, toggleCollect: l } = Eh({ entity: Z(() => r.entity), onToggle: ({ entity: S, isCollected: w }) => {
    i.value = nh(i.value, cs(S), w);
  } }), c = Z(() => r.disabled || r.buttonProps?.disabled), u = Z(() => ({ ...r.buttonProps, disabled: c.value })), f = Z(() => s.value ?? (o.value ? ls : us)), h = Z(() => cs(r.entity));
  function v(S) {
    c.value || a.value || (n("click", S), l(!o.value, S.currentTarget));
  }
  return (S, w) => (N(), Dt(Rv, ol(u.value, { icon: u.value?.type === "icon" ? M(o) ? "collect-button" : "collect-button-outline" : void 0, "icon-style": u.value?.type === "icon" ? M(o) ? { color: "rgba(224, 33, 79, 1)" } : {} : {}, onClick: ii(v, ["stop"]) }), { default: ka(() => [u.value?.type === "ghost" ? (N(), B(be, { key: 0 }, [fe(Dv, { "animation-key": h.value, "animation-command": i.value, "is-collected": M(o) }, null, 8, ["animation-key", "animation-command", "is-collected"]), on(" " + Bt(M(Ph)(e.count) ?? ""), 1)], 64)) : u.value?.type === "icon" ? (N(), B(be, { key: 1 }, [], 64)) : (N(), B(be, { key: 2 }, [on(Bt(M(s) ? { [M(Zp)]: "\u4E92\u76F8\u5173\u6CE8", [M(eh)]: "\u8BF7\u6C42\u4E2D", [M(th)]: "\u8BF7\u6C42\u4E2D", [M(rh)]: "\u56DE\u5173", [M(ls)]: "\u5DF2\u5173\u6CE8", [M(us)]: "\u5173\u6CE8" }[f.value] : M(o) ? "\u5DF2\u5173\u6CE8" : "\u5173\u6CE8"), 1)], 64))]), _: 1 }, 16, ["icon", "icon-style"]));
} }), Lv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Nv(e, t) {
  return N(), B("svg", Lv, [...t[0] || (t[0] = [A("path", { fill: "currentColor", d: "M18.606 12.724h-3.41a6 6 0 0 0-.138-.749l-1.706-6.704h4.168L16.392.834H7.75l1.72 6.775c-.45.005-.905.065-1.36.19-2.018.537-3.496 2.115-4.036 4.024h3.48L.834 13.62h3.023c.01.428.074.862.18 1.296.795 3.12 3.903 4.985 6.948 4.171 2.203-.585 3.766-2.419 4.163-4.572h-3.262l6.725-1.796z" }, null, -1)])]);
}
const $v = { render: Nv }, Vv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Fv(e, t) {
  return N(), B("svg", Vv, [...t[0] || (t[0] = [A("g", { fill: "#fff", "clip-path": "url(#clip0_4799_40152)" }, [A("path", { d: "M2.917 1.667c-.69 0-1.25.56-1.25 1.25v14.166a1.25 1.25 0 0 0 2.5 0V2.917c0-.69-.56-1.25-1.25-1.25m15.416 2.335v12.665c0 1.373-1.567 2.157-2.666 1.333l-8.81-6.608a1.667 1.667 0 0 1 .055-2.707l8.81-6.057c1.106-.76 2.611.032 2.611 1.374" })], -1), A("defs", null, [A("clipPath", { id: "clip0_4799_40152" }, [A("path", { fill: "#fff", d: "M0 0h20v20H0z" })])], -1)])]);
}
const jv = { render: Fv }, Uv = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function Hv(e, t) {
  return N(), B("svg", Uv, [...t[0] || (t[0] = [A("path", { fill: "currentColor", d: "M11 40.407V9.24c0-3.147 3.465-5.061 6.129-3.387L40.844 20.76c2.436 1.531 2.507 5.058.133 6.685L17.262 43.706c-2.654 1.82-6.262-.08-6.262-3.299" }, null, -1)])]);
}
const Bv = { render: Hv }, qv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Wv(e, t) {
  return N(), B("svg", qv, [...t[0] || (t[0] = [A("g", { fill: "#fff", "clip-path": "url(#clip0_4799_40156)" }, [A("path", { d: "M3.333 2.834c0-.7 0-1.05.136-1.318A1.25 1.25 0 0 1 4.016.97c.267-.137.617-.137 1.317-.137h1c.7 0 1.05 0 1.318.137.235.12.426.31.546.546.136.267.136.617.136 1.318v14.333c0 .7 0 1.05-.136 1.317a1.25 1.25 0 0 1-.546.547c-.268.136-.618.136-1.318.136h-1c-.7 0-1.05 0-1.317-.136a1.25 1.25 0 0 1-.547-.547c-.136-.267-.136-.617-.136-1.317zm8.334 0c0-.7 0-1.05.136-1.318a1.25 1.25 0 0 1 .546-.546c.268-.137.617-.137 1.318-.137h1c.7 0 1.05 0 1.317.137.235.12.426.31.546.546.137.267.137.617.137 1.318v14.333c0 .7 0 1.05-.137 1.317a1.25 1.25 0 0 1-.546.547c-.267.136-.617.136-1.317.136h-1c-.7 0-1.05 0-1.318-.136a1.25 1.25 0 0 1-.546-.547c-.136-.267-.136-.617-.136-1.317z" })], -1), A("defs", null, [A("clipPath", { id: "clip0_4799_40156" }, [A("path", { fill: "#fff", d: "M0 0h20v20H0z" })])], -1)])]);
}
const zv = { render: Wv }, Kv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Gv(e, t) {
  return N(), B("svg", Kv, [...t[0] || (t[0] = [A("g", { fill: "#fff", "clip-path": "url(#clip0_4799_40154)" }, [A("path", { d: "M17.083 1.667c-.69 0-1.25.56-1.25 1.25v14.166a1.25 1.25 0 0 0 2.5 0V2.917c0-.69-.56-1.25-1.25-1.25M1.667 4.002v12.665c0 1.373 1.568 2.157 2.666 1.333l8.81-6.608a1.667 1.667 0 0 0-.055-2.707l-8.81-6.057c-1.106-.76-2.611.032-2.611 1.374" })], -1), A("defs", null, [A("clipPath", { id: "clip0_4799_40154" }, [A("path", { fill: "#fff", d: "M0 0h20v20H0z" })])], -1)])]);
}
const Qv = { render: Gv }, Jv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Yv(e, t) {
  return N(), B("svg", Jv, [...t[0] || (t[0] = [H0('<g stroke="#fff" stroke-linecap="round" stroke-width="1.667" clip-path="url(#clip0_4818_45086)"><path d="M8.75 2.1a2.5 2.5 0 0 1 2.5 0l4.966 2.867a2.5 2.5 0 0 1 1.25 2.165v5.735a2.5 2.5 0 0 1-1.25 2.165l-4.966 2.867a2.5 2.5 0 0 1-2.5 0l-4.966-2.867a2.5 2.5 0 0 1-1.25-2.165V7.132a2.5 2.5 0 0 1 1.25-2.165z"></path><circle cx="10" cy="9.999" r="3.333"></circle></g><defs><clipPath id="clip0_4818_45086"><path fill="#fff" d="M0 0h20v20H0z"></path></clipPath></defs>', 2)])]);
}
const Xv = { render: Yv }, Zv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function eg(e, t) {
  return N(), B("svg", Zv, [...t[0] || (t[0] = [A("g", { "clip-path": "url(#clip0_4799_40158)" }, [A("path", { fill: "#fff", "fill-rule": "evenodd", d: "M17.083 5a2.5 2.5 0 0 0-5 0v1.67q.32.002.58.022c.329.027.657.087.972.247a2.5 2.5 0 0 1 1.092 1.093c.161.315.22.643.247.972.026.312.026.691.026 1.13V15.7c0 .44 0 .818-.026 1.13-.027.33-.086.657-.247.973a2.5 2.5 0 0 1-1.092 1.092c-.315.161-.643.22-.973.247-.312.026-.69.026-1.13.026H4.301c-.44 0-.818 0-1.13-.026-.33-.027-.657-.086-.973-.247a2.5 2.5 0 0 1-1.092-1.092c-.16-.316-.22-.643-.247-.973-.026-.312-.026-.69-.026-1.13v-5.564c0-.44 0-.819.026-1.13.027-.33.086-.658.247-.973A2.5 2.5 0 0 1 2.198 6.94c.316-.16.643-.22.973-.247.312-.025.69-.025 1.13-.025h6.116V5a4.167 4.167 0 0 1 8.333 0v2.917a.833.833 0 1 1-1.667 0zM2.955 8.424c.041-.02.125-.052.351-.07.237-.02.547-.02 1.027-.02H11.5c.48 0 .79 0 1.027.02.226.018.31.05.351.07.157.08.284.208.364.365.021.04.053.125.071.351.02.236.02.546.02 1.027v5.5c0 .48 0 .79-.02 1.027-.018.226-.05.31-.07.351a.83.83 0 0 1-.365.364c-.041.021-.125.053-.351.071-.236.02-.547.02-1.027.02H4.333c-.48 0-.79 0-1.027-.02-.226-.018-.31-.05-.351-.07a.83.83 0 0 1-.364-.365c-.021-.041-.053-.125-.071-.351a14 14 0 0 1-.02-1.027v-5.5c0-.48 0-.79.02-1.027.018-.226.05-.31.07-.351a.83.83 0 0 1 .365-.365m5.795 4.687a1.666 1.666 0 1 0-1.667 0V15a.833.833 0 0 0 1.667 0z", "clip-rule": "evenodd" })], -1), A("defs", null, [A("clipPath", { id: "clip0_4799_40158" }, [A("path", { fill: "#fff", d: "M0 0h20v20H0z" })])], -1)])]);
}
const tg = { render: eg }, rg = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function ng(e, t) {
  return N(), B("svg", rg, [...t[0] || (t[0] = [A("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M7.5 5a2.5 2.5 0 0 1 5 0v1.667h-5zM5.833 6.669v-1.67a4.167 4.167 0 0 1 8.334 0v1.67q.32.003.579.023c.33.027.657.086.972.247a2.5 2.5 0 0 1 1.093 1.093c.16.315.22.643.247.972.025.312.025.691.025 1.13V15.7c0 .439 0 .818-.025 1.13-.027.33-.086.657-.247.973a2.5 2.5 0 0 1-1.093 1.092c-.315.16-.643.22-.972.247-.312.026-.691.026-1.13.026H6.385c-.44 0-.819 0-1.13-.026-.33-.027-.658-.086-.973-.247a2.5 2.5 0 0 1-1.093-1.092c-.16-.316-.22-.643-.247-.973a15 15 0 0 1-.025-1.13v-5.565c0-.439 0-.818.025-1.13.027-.33.087-.657.247-.972A2.5 2.5 0 0 1 4.282 6.94c.315-.16.643-.22.972-.247q.26-.02.58-.023m-.795 1.755c.042-.02.126-.052.352-.07.236-.02.546-.02 1.027-.02h7.166c.48 0 .791 0 1.027.02.227.018.31.05.352.07.156.08.284.207.364.364.02.041.052.125.07.352.02.236.02.546.02 1.027v5.5c0 .48 0 .79-.02 1.026-.018.227-.05.31-.07.352a.83.83 0 0 1-.364.364c-.041.021-.125.053-.352.071-.236.02-.546.02-1.027.02H6.417c-.48 0-.79 0-1.027-.02-.226-.018-.31-.05-.352-.07a.83.83 0 0 1-.364-.365c-.02-.041-.052-.125-.07-.352-.02-.236-.02-.546-.02-1.026v-5.5c0-.48 0-.791.02-1.027.018-.227.05-.31.07-.352a.83.83 0 0 1 .364-.364m5.795 4.686a1.666 1.666 0 1 0-1.666 0V15a.833.833 0 1 0 1.666 0z", "clip-rule": "evenodd" }, null, -1)])]);
}
const ig = { render: ng }, og = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function sg(e, t) {
  return N(), B("svg", og, [...t[0] || (t[0] = [A("path", { fill: "#fff", "fill-rule": "evenodd", d: "M4.34 3.16a.833.833 0 0 0-1.18 1.18L8.822 10 3.16 15.66a.833.833 0 1 0 1.178 1.179L10 11.178l5.66 5.66a.833.833 0 0 0 1.18-1.178L11.178 10l5.66-5.661A.833.833 0 1 0 15.66 3.16L10 8.82z", "clip-rule": "evenodd" }, null, -1)])]);
}
const ag = { render: sg };
function bl({ preserveLatest: e = false } = {}) {
  const t = Qe("queue");
  if (e) {
    const r = ke();
    return t.value.queue?.currentPlayable.key && (r.value = t.value.queue?.playables.byKey[t.value.queue?.currentPlayable.key]), Ve(() => t.value.queue?.currentPlayable.key, (n) => {
      n && (r.value = t.value.queue?.playables.byKey[n]);
    }), r;
  } else return Z(() => {
    const r = t.value.queue?.currentPlayable.key;
    return r ? t.value.queue?.playables.byKey[r] : void 0;
  });
}
function lg() {
  const e = Qe("player"), t = Qe("queue"), r = Qe("commerce"), n = yh(), i = Z(() => {
    const c = t.value.queue?.currentPlayable.key;
    return c ? t.value.queue?.playables.byKey[c] : void 0;
  }), o = Z(() => e.value.mediaDetail), s = Z(() => {
    const c = t.value.queue?.currentPlayable.key;
    return c ? t.value.queue?.playables.limitedFreeInfos[c] : void 0;
  });
  function a(c) {
    return r.value.commerceInfo ? e.value.cacheInfo?.isPreview || c?.video_model_type === 2 ? true : r.value.hasPlayEntitlement || s.value?.limited_free ? false : c?.playable.label_info?.only_vip_playable ?? i.value?.label_info?.only_vip_playable ?? false : false;
  }
  const l = Z(() => a(o.value));
  return { checkIsPreviewPlayable: a, limitedFreeInfo: s, isPreviewPlayable: l, isLimitedFree: Z(() => r.value.hasPlayEntitlement || !i.value?.label_info?.only_vip_playable || l.value ? false : s.value?.limited_free ?? false), interceptPopupEnabled: Z(() => {
    const c = t.value.queue?.metaInfo.type;
    if (!c) return false;
    const u = n.value?.luna_pc_common_server_params?.client_intercept_strategy?.[c];
    return u ? u.should_intercept_with_popup ?? false : true;
  }) };
}
const ug = { class: "left" }, cg = { class: "center" }, fg = { class: "right" }, dg = $t({ __name: "Controls", props: { visible: { type: Boolean } }, setup(e) {
  const t = Qe("player"), r = Qe("desktopLyrics"), n = bl(), i = ke(), o = Hp(i);
  Ve(o, (c) => {
    r.value.settings.isLocked && U(j.desktopLyrics).setLyricsClickable(c);
  });
  function s(c) {
    if (!(c.currentTarget instanceof HTMLElement)) return;
    const u = c.currentTarget.getBoundingClientRect();
    U(j.desktopLyrics).showMenu({ x: Math.round(u.right), y: Math.round(u.bottom) });
  }
  function a() {
    U(j.desktopLyrics).toggleLocked();
  }
  function l() {
    U(j.desktopLyrics).toggleDesktopLyrics();
  }
  return (c, u) => (N(), B("div", { class: Pe(["controls", { visible: e.visible }]) }, [A("div", ug, [A("div", { class: Pe(["button", { locked: M(r).settings.isLocked }]), onClick: u[0] || (u[0] = (f) => M(U)(M(j).window).showWindow(M(an).main)) }, [fe(M($v))], 2), A("div", { class: Pe(["button", { locked: M(r).settings.isLocked }]) }, [fe(Mv, { "button-props": { type: "ghost" }, disabled: !M(n), entity: { type: M(Ee).playable, id: M(n)?.id, playable: M(n) } }, null, 8, ["disabled", "entity"])], 2)]), A("div", cg, [A("div", { class: Pe(["button", { locked: M(r).settings.isLocked }]), onClick: u[1] || (u[1] = (f) => M(U)(M(j).queue).playPrevious(M(ai).userPrevious)) }, [fe(M(jv))], 2), M(t).isPlaying ? (N(), B("div", { key: 0, class: Pe(["button", { locked: M(r).settings.isLocked }]), onClick: u[2] || (u[2] = (f) => M(U)(M(j).player).togglePlay()) }, [fe(M(zv))], 2)) : (N(), B("div", { key: 1, class: Pe(["button", { locked: M(r).settings.isLocked }]), onClick: u[3] || (u[3] = (f) => M(U)(M(j).player).togglePlay()) }, [fe(M(Bv))], 2)), A("div", { class: Pe(["button", { locked: M(r).settings.isLocked }]), onClick: u[4] || (u[4] = (f) => M(U)(M(j).queue).playNext(M(ai).userNext)) }, [fe(M(Qv))], 2)]), A("div", fg, [M(r).settings.isLocked ? Kt("", true) : (N(), B("div", { key: 0, class: Pe(["button", { locked: M(r).settings.isLocked }]), onClick: s }, [fe(M(Xv))], 2)), A("div", { ref_key: "lockButton", ref: i, class: Pe(["button", { locker: M(r).settings.isLocked }]), onClick: a }, [M(r).settings.isLocked ? (N(), Dt(M(ig), { key: 0 })) : (N(), Dt(M(tg), { key: 1 }))], 2), A("div", { class: Pe(["button", { locked: M(r).settings.isLocked }]), onClick: l }, [fe(M(ag))], 2)])], 2));
} }), pg = kr(dg, [["__scopeId", "data-v-50efc004"]]);
function hg(e) {
  const t = ke(), r = ke(0);
  return zp(e, (n) => {
    n.some((i) => ["style", "class"].includes(i.attributeName ?? "")) && r.value++;
  }, { attributes: true }), Ve([e, r], ([n]) => {
    n && (t.value = getComputedStyle(n));
  }, { immediate: true }), t;
}
function vg(e) {
  const t = /[\u4e00-\u9fa5\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]|\s+/g, r = [];
  let n = 0, i;
  for (; (i = t.exec(e)) !== null; ) {
    if (i.index > n && r.push(e.slice(n, i.index)), i[0].trim() === "") r.push(i[0]);
    else for (const o of i[0]) r.push(o);
    n = i.index + i[0].length;
  }
  return n < e.length && r.push(e.slice(n)), r.filter(Boolean);
}
const Hr = /* @__PURE__ */ new Map(), gg = document.createElement("canvas");
function mg(e, t) {
  const r = Hr.get(t)?.get(e);
  if (r) return r;
  const n = gg.getContext("2d");
  n.font = t;
  const o = n.measureText(e).width;
  return Hr.has(t) || Hr.set(t, /* @__PURE__ */ new Map()), Hr.get(t).set(e, o), o;
}
function _g(e, t) {
  let r = 0;
  const n = [];
  for (const i of Array.from(e)) {
    const o = mg(i, t);
    r += o, n.push(o);
  }
  return { width: r, subWidths: n };
}
function bg(e, t = 0, r) {
  if (t <= 0 || !r) return [];
  const n = vg(e), i = [], o = n.map((a) => _g(a, r));
  let s = 0;
  for (; s < n.length; ) {
    let a = 0;
    const l = [], c = [];
    let u = s;
    for (; u < n.length; ) {
      const { width: f, subWidths: h } = o[u];
      if (a + f > t && f <= t) break;
      a += f, l.push(n[u]), c.push(...h), u++;
    }
    i.push({ text: l.join(""), charWidths: c }), s = u;
  }
  return i;
}
const yg = [{ label: "\u767E\u642D\u7070", key: "gray", focusColor: "rgba(153, 255, 170, 1)", blurColor: "rgba(179, 179, 179, 1)" }, { label: "\u660E\u4EAE\u767D", key: "light", focusColor: "rgba(153, 255, 170, 1)", blurColor: "white", filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.6))" }, { label: "\u6DF1\u6C89\u9ED1", key: "dark", focusColor: "rgba(44, 197, 19, 1)", blurColor: "rgba(0, 0, 0, 0.8)", dark: true }];
function wg() {
  const e = Qe("player"), t = ke(0);
  return Ve(() => e.value.progressSeconds, (r) => {
    r < t.value && t.value - r < 0.5 || (t.value = r);
  }, { immediate: true }), Up(({ delta: r }) => {
    e.value.isPlaying && !e.value.isLoading && t.value !== 0 && (t.value += r / 1e3);
  }), t;
}
var yl = ((e) => (e.Track = "track", e.Video = "video", e.Unsupported = "unsupported", e))(yl || {});
const xg = $t({ __name: "Lyrics", setup(e) {
  const t = ke(), r = ke(), n = hg(r), i = Qe("player"), o = Qe("desktopLyrics"), s = Z(() => o.value.settings.textSize * 1.5), a = bl(), l = Z(() => i.value.mediaDetail?.lyrics), c = ke(null), u = Z(() => {
    if (i.value.mediaDetail?.playable.type === yl.Video) return "\u6682\u65E0\u6B4C\u8BCD\uFF0C\u8BF7\u6B23\u8D4F";
    if (l.value) {
      if (!l.value.content) return a.value?.vocal === 2 ? "\u7EAF\u97F3\u4E50\uFF0C\u8BF7\u6B23\u8D4F" : "\u6682\u65E0\u6B4C\u8BCD\uFF0C\u8BF7\u6B23\u8D4F";
    } else return c.value ? "\u5F53\u524D\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u5C1D\u8BD5\u91CD\u65B0\u64AD\u653E\u8BE5\u6B4C\u66F2" : "\u6B63\u5728\u52A0\u8F7D\u6B4C\u8BCD";
    return null;
  }), f = Z(() => {
    const D = l.value?.content?.split(`
`), W = l.value?.translations?.cn?.split(`
`).map((Y) => Y.split("]")[1]), G = D?.map((Y) => Y.trim()).filter((Y) => Y).map((Y, de) => {
      if (/^\[\d+,/.test(Y)) {
        Y = Y.trim();
        const _e = Y.slice(1).split("]")[0].split(","), ie = Y.split("]")[1].split("<").filter((J) => J.trim()).map((J) => {
          const [F, pe] = J.split(">"), we = F.split(","), xe = [...pe], Q = Number.parseInt(we[1]) / xe.length;
          let ve = Number.parseInt(we[0]);
          return xe.map((_t) => {
            const nr = { startTime: ve, duration: Q, char: _t };
            return ve += Q, nr;
          });
        }).flat();
        return { startTime: Number.parseInt(_e[0]), duration: Number.parseInt(_e[1]), translation: ie.map((J) => J.char).join("") === W?.[de] ? "" : W?.[de], chars: ie };
      } else {
        const _e = (F) => {
          const pe = F.split("]")[0].slice(1), we = F.split("]")[1], [xe, Q, ve] = pe.split(/[:.]/);
          return [Number.parseInt(xe) * 60 * 1e3 + Number.parseInt(Q) * 1e3 + Number.parseInt(ve), we];
        }, [Fe, ie] = _e(Y);
        let J = Fe + 1e4;
        return D[de + 1] && (J = _e(D[de + 1])[0]), { startTime: Fe, duration: J - Fe, isLRC: true, translation: ie === W?.[de] ? "" : W?.[de], chars: [...ie].map((F) => ({ startTime: -1, duration: -1, char: F })) };
      }
    }).filter((Y) => Y.chars.length > 0), re = [];
    a.value?.song_maker_team?.lyricists && re.push(`\u4F5C\u8BCD\uFF1A${a.value.song_maker_team.lyricists.map((Y) => Y.name).join(", ")}`), a.value?.song_maker_team?.composers && re.push(`\u4F5C\u66F2\uFF1A${a.value.song_maker_team.composers.map((Y) => Y.name).join(", ")}`);
    const ye = (G?.[0].startTime ?? 0) / re.length;
    for (const [Y, de] of re.entries()) G?.splice(Y, 0, { startTime: ye * Y, duration: ye, isLRC: true, translation: "", disableClick: true, chars: de.split("").map((_e) => ({ startTime: -1, duration: -1, char: _e })) });
    const Me = [];
    l.value?.lyric_contributor?.user?.nickname && Me.push(`\u6B4C\u8BCD\u8D21\u732E\u8005\uFF1A${l.value?.lyric_contributor.user.nickname}`);
    for (const Y of Me) G?.push({ startTime: Number.POSITIVE_INFINITY, duration: 0, isLRC: true, translation: "", disableClick: true, chars: Y.split("").map((de) => ({ startTime: -1, duration: -1, char: de })) });
    return G;
  }), { isPreviewPlayable: h } = lg(), v = Z(() => h.value ? (a.value?.preview?.start ?? 0) / 1e3 : 0), S = wg(), w = Z(() => (S.value + (v.value ?? 0)) * 1e3), { width: $ } = vl(t, { width: 0, height: 0 }, { box: "content-box" }), P = Z(() => f.value?.map((D, W) => {
    const G = f.value?.[W + 1], re = w.value >= D.startTime, Ce = re && w.value < (G ? G.startTime : D.startTime + D.duration), ye = D.chars.map((F) => F.char).join("");
    let Me = 0;
    const Y = n.value?.font.split(" ") ?? [];
    for (const [F, pe] of Y.entries()) pe.endsWith("px") && (Y[F] = `${o.value.settings.textSize}px`);
    const de = bg(ye, Number.POSITIVE_INFINITY, Y.join(" "))[0], _e = de.charWidths.reduce((F, pe) => F + pe, 0);
    let Fe = 0;
    if (D.isLRC) Fe = re ? _e : 0;
    else for (let F = 0; F < [...de.text].length; F++) {
      const pe = D.chars[Me], we = D.startTime + pe.startTime, xe = pe.duration, Q = de.charWidths[F];
      if (w.value < we) break;
      if (w.value > we + xe) Fe += Q;
      else {
        const ve = (w.value - we) / xe;
        Fe += Q * ve;
      }
      Me += 1;
    }
    let ie = 0;
    const J = _e > $.value;
    if (J) {
      const F = J ? (_e - $.value) / 2 : 0;
      if (Ce) {
        const pe = _e - $.value, we = Math.max(Math.min((w.value - D.startTime) / D.duration, 1), 0);
        ie = F - pe * we;
      } else ie = F;
    }
    return { text: de.text, width: Fe, offset: ie, startTime: D.startTime, duration: D.duration, translation: D.translation, disableClick: D.disableClick ?? false, isActive: Ce, isPassed: re };
  })), I = Z(() => o.value.settings.showTranslation && l.value?.translations), m = Z(() => {
    const D = P.value?.findIndex((G) => G.isActive) ?? -1, W = P.value?.[D];
    if (W) {
      if (I.value) return [W];
      {
        const G = P.value?.[D + 1];
        return [W, G];
      }
    } else {
      const G = P.value?.findLastIndex((Me) => Me.isPassed) ?? -1, re = P.value?.[G + 1], Ce = P.value?.[G + 2], ye = P.value?.[P.value.length - 1];
      return re ? I.value ? [re, Ce] : [re] : ye ? [ye] : [];
    }
  }), E = Z(() => yg.find((D) => D.key === o.value.settings.textColor));
  return (D, W) => (N(), B("div", { ref_key: "container", ref: t, class: "lyrics", style: Ke({ height: `${2 * s.value}px` }) }, [A("div", { ref_key: "textContainer", ref: r, class: "placeholder paragraph" }, null, 512), u.value ? (N(), B("div", { key: 0, style: Ke({ fontSize: `${M(o).settings.textSize}px` }), class: Pe(["paragraph no-lyric", { [M(o).settings.textColor]: true }]) }, [A("div", { class: "line", style: Ke({ lineHeight: `${s.value}px`, color: E.value?.blurColor, filter: E.value?.filter }) }, Bt(u.value), 5)], 6)) : (N(true), B(be, { key: 1 }, d0(m.value, (G, re) => (N(), B("div", { key: G?.startTime ?? `empty-${re}`, class: Pe(["paragraph", { [M(o).settings.textColor]: true }]), style: Ke({ fontSize: `${M(o).settings.textSize}px`, transform: `translate(${G?.offset ?? 0}px, 0)`, top: `${re * s.value * (I.value ? 2 : 1)}px`, lineHeight: `${s.value}px` }) }, [A("div", { class: "line", style: Ke({ backgroundImage: `linear-gradient(to right, ${E.value?.blurColor} 50%, ${E.value?.focusColor} 50%)`, backgroundPositionX: `${G?.width ?? 0}px`, filter: E.value?.filter }) }, Bt(G?.text), 5), I.value ? (N(), B(be, { key: 0 }, [G?.translation ? (N(), B("div", { key: 0, class: "translation", style: Ke({ color: E.value?.blurColor, filter: E.value?.filter }) }, Bt(G.translation), 5)) : Kt("", true)], 64)) : Kt("", true)], 6))), 128))], 4));
} }), Sg = kr(xg, [["__scopeId", "data-v-69a2e8b5"]]), Eg = $t({ __name: "Frame", setup(e) {
  const t = Qe("desktopLyrics"), r = ke(), n = vl(r, void 0, { box: "border-box" });
  Ve(() => n.height.value, (o) => {
    U(j.desktopLyrics).updateHeight(o);
  });
  const i = Z(() => t.value.hover || t.value.menuVisible);
  return (o, s) => (N(), B("div", { ref_key: "frame", ref: r, class: Pe(["frame", { hover: i.value, locked: M(t).settings.isLocked }]), "data-clickable": "" }, [s[0] || (s[0] = A("div", { class: "dragarea" }, null, -1)), fe(pg, { visible: i.value }, null, 8, ["visible"]), fe(Sg)], 2));
} }), Pg = kr(Eg, [["__scopeId", "data-v-accbb10c"]]);
async function Cg() {
  const t = new URLSearchParams(window.location.search).get("global_config"), r = JSON.parse(t ?? "{}");
  Tp(r), await fl.initialize(), kp(), Sp(Pg).mount("#app");
}
Cg();
