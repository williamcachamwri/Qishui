// packages/renderers/imagePreview/src/imagePreview.ts
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
var A = function() {
  return A = Object.assign || function(t) {
    for (var r, n = 1, i = arguments.length; n < i; n++) {
      r = arguments[n];
      for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
    return t;
  }, A.apply(this, arguments);
};
function ua(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++) t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]]);
  return r;
}
function ca(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == "number") return { next: function() {
    return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
  } };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function N(e, t) {
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
function he(e, t, r) {
  if (arguments.length === 2) for (var n = 0, i = t.length, o; n < i; n++) (o || !(n in t)) && (o || (o = Array.prototype.slice.call(t, 0, n)), o[n] = t[n]);
  return e.concat(o || Array.prototype.slice.call(t));
}
var la = 10, fa = 1e3, go = function(e) {
  return JSON.stringify({ ev_type: "batch", list: e });
};
function da(e) {
  var t = e.transport, r = e.endpoint, n = e.size, i = n === void 0 ? la : n, o = e.wait, s = o === void 0 ? fa : o, a = [], u = 0, l, c, d = { getSize: function() {
    return i;
  }, getWait: function() {
    return s;
  }, setSize: function(g) {
    i = g;
  }, setWait: function(g) {
    s = g;
  }, getEndpoint: function() {
    return r;
  }, setEndpoint: function(g) {
    r = g;
  }, send: function(g) {
    a.push(g), a.length >= i && h.call(this), clearTimeout(u), u = setTimeout(h.bind(this), s);
  }, flush: function() {
    clearTimeout(u), h.call(this);
  }, getBatchData: function() {
    return a.length ? go(a) : "";
  }, clear: function() {
    clearTimeout(u), a = [];
  }, fail: function(g) {
    l = g;
  }, success: function(g) {
    c = g;
  } };
  function h() {
    if (a.length) {
      var g = this.getBatchData();
      t.post({ url: r, data: g, fail: function(x) {
        l && l(x, g);
      }, success: function() {
        c && c(g);
      } }), a = [];
    }
  }
  return d;
}
var ee = function() {
  return {};
};
function bn(e) {
  return e;
}
function te(e) {
  return typeof e == "object" && e !== null;
}
function pa(e) {
  return e === void 0;
}
function ha(e, t) {
  try {
    return e instanceof t;
  } catch {
    return false;
  }
}
var Qr = Object.prototype;
function yn(e) {
  if (te(e)) {
    if (typeof Object.getPrototypeOf == "function") {
      var t = Object.getPrototypeOf(e);
      return t === Qr || t === null;
    }
    return Qr.toString.call(e) === "[object Object]";
  }
  return false;
}
function Ye(e) {
  return Qr.toString.call(e) === "[object Array]";
}
function _t(e) {
  return typeof e == "function";
}
function va(e) {
  return typeof e == "boolean";
}
function Sr(e) {
  return typeof e == "number";
}
function Me(e) {
  return typeof e == "string";
}
function ga(e) {
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
function _a(e) {
  return typeof Event < "u" && ha(e, Event);
}
function ma(e) {
  return Object.prototype.toString.call(e) === "[object ErrorEvent]";
}
function ba(e) {
  return Object.prototype.toString.call(e) === "[object PromiseRejectionEvent]";
}
function ya(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ea() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  for (var r = {}, n = 0; n < e.length; ) r = En(r, e[n++]);
  return r;
}
function En(e, t) {
  var r = A({}, e);
  for (var n in t) ya(t, n) && t[n] !== void 0 && (te(t[n]) && yn(t[n]) ? r[n] = En(te(e[n]) ? e[n] : {}, t[n]) : Ye(t[n]) && Ye(e[n]) ? r[n] = _o(e[n], t[n]) : r[n] = t[n]);
  return r;
}
function _o(e, t) {
  var r = Ye(e) ? e : [], n = Ye(t) ? t : [];
  return Array.prototype.concat.call(r, n).map(function(i) {
    return i instanceof RegExp ? i : te(i) && yn(i) ? En({}, i) : Ye(i) ? _o([], i) : i;
  });
}
function mt(e, t) {
  if (!Ye(e) || e.length === 0) return false;
  for (var r = 0; r < e.length; ) {
    if (e[r] === t) return true;
    r++;
  }
  return false;
}
var Sn = function(e, t) {
  if (!Ye(e)) return e;
  var r = e.indexOf(t);
  if (r >= 0) {
    var n = e.slice();
    return n.splice(r, 1), n;
  }
  return e;
}, dr = function(e, t, r) {
  for (var n, i, o = t.split("."), s = N(o), a = s[0], u = s.slice(1); e && u.length > 0; ) e = e[a], n = u, i = N(n), a = i[0], u = i.slice(1);
  if (e) return r(e, a);
}, Sa = function(e, t, r) {
  return dr(e, t, function(n, i) {
    if (n && i in n && _t(n[i])) try {
      return n[i].apply(n, r);
    } catch {
      return;
    }
  });
}, wa = function(e, t) {
  return !e || !te(e) ? e : t.reduce(function(r, n) {
    return r[n] = e[n], r;
  }, {});
}, xa = function(e) {
  return e.replace(/([a-z])([A-Z])/g, function(t, r, n) {
    return r + "-" + n.toLowerCase();
  });
};
function Oa(e) {
  return Ye(e) && e.length ? Ta(e) : null;
}
function Ta(e) {
  for (var t = [], r = e.length, n = 0; n < r; n++) {
    var i = e[n];
    Me(i) ? t.push(i.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1")) : i && i.source && t.push(i.source);
  }
  return new RegExp(t.join("|"), "i");
}
var wn = function(e, t) {
  var r = Oa(e || []);
  return !!r && r.test(t);
};
function bt(e) {
  try {
    return Me(e) ? e : JSON.stringify(e);
  } catch (t) {
    return "[FAILED_TO_STRINGIFY]:" + String(t);
  }
}
function Pa() {
  var e = {}, t = {}, r = { set: function(n, i) {
    return e[n] = i, t[n] = bt(i), r;
  }, merge: function(n) {
    return e = A(A({}, e), n), Object.keys(n).forEach(function(i) {
      t[i] = bt(n[i]);
    }), r;
  }, delete: function(n) {
    return delete e[n], delete t[n], r;
  }, clear: function() {
    return e = {}, t = {}, r;
  }, get: function(n) {
    return t[n];
  }, toString: function() {
    return A({}, t);
  } };
  return r;
}
var Zr = function(e, t, r, n) {
  return n === void 0 && (n = true), function() {
    for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
    if (!e) return ee;
    var s = e[t], a = r.apply(void 0, he([s], N(i), false)), u = a;
    return _t(u) && n && (u = function() {
      for (var l = [], c = 0; c < arguments.length; c++) l[c] = arguments[c];
      try {
        return a.apply(this, l);
      } catch {
        return _t(s) && s.apply(this, l);
      }
    }), e[t] = u, function(l) {
      l || (u === e[t] ? e[t] = s : a = s);
    };
  };
}, Nt = function(e, t, r) {
  return function() {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    if (!e) return ee;
    var o = e[t], s = r.apply(void 0, he([o], N(n), false)), a = s;
    return _t(a) && (a = function() {
      for (var u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
      return s.apply(this, u);
    }), e[t] = a, function() {
      a === e[t] ? e[t] = o : s = o;
    };
  };
}, Ra = function() {
  return "".padStart ? function(e, t) {
    return t === void 0 && (t = 8), e.padStart(t, " ");
  } : function(e) {
    return e;
  };
}, mo = Ra(), Ca = 0, bo = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  console.error.apply(console, he(["[SDK]", Date.now(), mo("" + Ca++)], N(e), false));
}, Ia = 0, pr = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  console.warn.apply(console, he(["[SDK]", Date.now(), mo("" + Ia++)], N(e), false));
}, xn = function(e) {
  return Math.random() < Number(e);
}, Aa = function(e, t) {
  return e < Number(t);
}, Ct = function(e) {
  return function(t) {
    for (var r = t, n = 0; n < e.length && r; n++) try {
      r = e[n](r);
    } catch (i) {
      bo(i);
    }
    return r;
  };
}, Ma = function(e) {
  return function(t) {
    for (var r = true, n = 0; n < e.length && r; n++) try {
      r = e[n](t);
    } catch (i) {
      bo(i);
    }
    return r;
  };
};
function Da() {
  for (var e = new Array(16), t = 0, r = 0; r < 16; r++) (r & 3) === 0 && (t = Math.random() * 4294967296), e[r] = t >>> ((r & 3) << 3) & 255;
  return e;
}
function Na(e) {
  for (var t = [], r = 0; r < 256; ++r) t[r] = (r + 256).toString(16).substr(1);
  var n = 0, i = t;
  return [i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]]].join("");
}
function en() {
  var e = Da();
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, Na(e);
}
var La = 3e5, ja = function(e, t, r) {
  var n = 0;
  return r === -1 ? ee : function() {
    if (e()) {
      n && clearTimeout(n), n = 0;
      return;
    }
    n === 0 && (n = setTimeout(t, r));
  };
}, yo = function(e, t) {
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
    return yo(n, r);
  };
}, Ua = function(e) {
  e === void 0 && (e = La);
  var t = [], r = [], n = false, i, o = ja(function() {
    return !!t.length;
  }, function() {
    n = true, i && i[0](), r.forEach(function(a) {
      return a();
    }), r.length = 0, i = void 0;
  }, e), s = function(a) {
    t = Sn(t, a), !n && o();
  };
  return { next: function(a) {
    return yo(a, t);
  }, complete: function(a) {
    r.push(a);
  }, attach: function(a, u) {
    i = [a, u];
  }, subscribe: function(a) {
    if (n) throw new Error("Observer is closed");
    return t.push(a), i && i[1] && i[1](a), o(), function() {
      return s(a);
    };
  }, unsubscribe: s };
}, wr = function(e, t, r) {
  var n = Ua(r);
  try {
    e(n.next, n.attach), t && n.complete(t);
  } catch {
  }
  return [n.subscribe, n.unsubscribe];
}, Fa = function(e, t) {
  var r = N(e, 1), n = r[0], i = function(o, s) {
    var a = n(function(u) {
      var l = Ma(t)(u);
      return l ? o(u) : ee;
    });
    s(function() {
      a();
    });
  };
  return i;
};
function Ha() {
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
var hr = function(e, t, r, n) {
  return e.destroyAgent.set(t, r, n);
}, Ba = 500, Wa = 50;
function $a(e, t, r) {
  if (t.push(r), !(t.length < Ba)) {
    var n = t.splice(0, Wa);
    e.savePreStartDataToDb && e.savePreStartDataToDb(n);
  }
}
function Va(e) {
  var t = e.getPreStartQueue();
  t.forEach(function(r) {
    return e.build(r);
  }), t.length = 0;
}
var ka = ["init", "start", "config", "beforeDestroy", "provide", "beforeReport", "report", "beforeBuild", "build", "beforeSend", "send", "beforeConfig"];
function qa(e) {
  var t = e.builder, r = e.createSender, n = e.createDefaultConfig, i = e.createConfigManager, o = e.userConfigNormalizer, s = e.initConfigNormalizer, a = e.validateInitConfig, u, l, c = {};
  ka.forEach(function(m) {
    return c[m] = [];
  });
  var d = false, h = false, g = false, x = [], T = [], j = Ha(), R = { getBuilder: function() {
    return t;
  }, getSender: function() {
    return u;
  }, getPreStartQueue: function() {
    return x;
  }, init: function(m) {
    if (d) {
      pr("already inited");
      return;
    }
    if (m && te(m) && a(m)) {
      var S = n(m);
      if (!S) throw new Error("defaultConfig missing");
      var H = s(m);
      if (l = i(S), l.setConfig(H), l.onChange(function() {
        I("config");
      }), u = r(l.getConfig()), !u) throw new Error("sender missing");
      d = true, I("init", true);
    } else throw new Error("invalid InitConfig, init failed");
  }, set: function(m) {
    d && m && te(m) && (I("beforeConfig", false, m), l?.setConfig(m));
  }, config: function(m) {
    if (d) return m && te(m) && (I("beforeConfig", false, m), l?.setConfig(o(m))), l?.getConfig();
  }, provide: function(m, S) {
    if (mt(T, m)) {
      pr("cannot provide " + m + ", reserved");
      return;
    }
    R[m] = S, I("provide", false, m);
  }, start: function() {
    d && (h || l?.onReady(function() {
      h = true, I("start", true), Va(R);
    }));
  }, report: function(m) {
    if (m) {
      var S = Ct(c.beforeReport)(m);
      if (S) {
        var H = Ct(c.report)(S);
        H && (h ? this.build(H) : $a(R, x, H));
      }
    }
  }, build: function(m) {
    if (h) {
      var S = Ct(c.beforeBuild)(m);
      if (S) {
        var H = t.build(S);
        if (H) {
          var W = Ct(c.build)(H);
          W && this.send(W);
        }
      }
    }
  }, send: function(m) {
    if (h) {
      var S = Ct(c.beforeSend)(m);
      S && (u.send(S), I("send", false, S));
    }
  }, destroy: function() {
    j.clear(), g = true, x.length = 0, I("beforeDestroy", true);
  }, on: function(m, S) {
    if (m === "init" && d || m === "start" && h || m === "beforeDestroy" && g) try {
      S();
    } catch {
    }
    else c[m] && c[m].push(S);
  }, off: function(m, S) {
    c[m] && (c[m] = Sn(c[m], S));
  }, destroyAgent: j };
  return T = Object.keys(R), R;
  function I(m, S) {
    S === void 0 && (S = false);
    for (var H = [], W = 2; W < arguments.length; W++) H[W - 2] = arguments[W];
    c[m].forEach(function(re) {
      try {
        re.apply(void 0, he([], N(H), false));
      } catch {
      }
    }), S && (c[m].length = 0);
  }
}
var Ka = function(e) {
  var t = Pa();
  e.provide("context", t), e.on("report", function(r) {
    return r.extra || (r.extra = {}), r.extra.context = t.toString(), r;
  });
}, Ga = function(e, t, r) {
  var n = {}, i = function() {
    for (var s, a = [], u = 0; u < arguments.length; u++) a[u] = arguments[u];
    var l = a[0];
    if (l) {
      var c = l.split(".")[0];
      if (!(c in i)) {
        var d = n[c] || [], h = (s = t?.(e)) !== null && s !== void 0 ? s : {};
        d.push(he([h], N(a), false)), n[c] = d;
        return;
      }
      return Sa(i, l, [].slice.call(a, 1));
    }
  };
  Zr(e, "provide", function(s) {
    return function(a, u) {
      i[a] = u, s.call(e, a, u);
    };
  })();
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (i[o] = e[o]);
  return e.on("provide", function(s) {
    n[s] && (n[s].forEach(function(a) {
      var u = N(a), l = u[0], c = u.slice(1);
      r?.(e, l, c);
    }), n[s] = null);
  }), i;
};
function za(e, t) {
  e.on("init", function() {
    var r = [], n = function(o) {
      o.forEach(function(s) {
        var a = s.name;
        mt(r, a) || (r.push(a), s.setup(e), t && t(a, s.setup), e.destroyAgent.set(a, a, [function() {
          r = Sn(r, a), s.tearDown && s.tearDown();
        }]));
      });
    };
    e.provide("applyIntegrations", n);
    var i = e.config();
    i && i.integrations && n(i.integrations);
  });
}
var Ja = "_", Ya = function(e) {
  return e.split(Ja)[0];
};
function Xa(e, t) {
  var r = t || {}, n = {}, i = function(s, a) {
    n[s] || (n[s] = []), n[s].push(a);
  }, o = function(s) {
    var a = N(s, 2), u = a[0], l = a[1], c = Ya(u), d = !!c && n[c];
    return r[u] || (r[u] = wr(l, function() {
      r[u] = void 0;
    })), d ? Eo(e, [u, Fa(r[u], d)]) : r[u];
  };
  e.provide("setFilter", i), e.provide("initSubject", o), e.provide("getSubject", function(s) {
    return r[s];
  }), e.provide("privateSubject", {});
}
function yt(e, t) {
  return e.initSubject(t);
}
function Eo(e, t, r) {
  var n = N(t, 2), i = n[0], o = n[1], s = e.privateSubject || {};
  return s[i] || (s[i] = wr(o, function() {
    s[i] = void 0;
  }, r)), s[i];
}
var Qa = function(e) {
  try {
    typeof window == "object" && te(window) && window.__SLARDAR_DEVTOOLS_GLOBAL_HOOK__ && window.__SLARDAR_DEVTOOLS_GLOBAL_HOOK__.push(e);
  } catch {
  }
}, X = function() {
  return Date.now();
};
function Q() {
  if (typeof window == "object" && te(window)) return window;
}
function at() {
  if (typeof document == "object" && te(document)) return document;
}
function So() {
  return Q() && window.location;
}
function Za() {
  return Q() && window.history;
}
function eu() {
  if (typeof XMLHttpRequest == "function" && _t(XMLHttpRequest)) return XMLHttpRequest;
}
function tu() {
  if (Q() && _t(window.PerformanceObserver)) return window.PerformanceObserver;
}
function ru() {
  if (Q() && "navigator" in window) return window.navigator;
}
function wo() {
  var e = ru();
  if (e) return e.connection || e.mozConnection || e.webkitConnection;
}
function tn(e) {
  return e?.effectiveType || e?.type || "";
}
function nu() {
  var e = wo(), t = tn(e);
  return mt(["slow-2g", "2g"], t);
}
function xr(e) {
  var t = at();
  if (!t || !e) return "";
  var r = t.createElement("a");
  return r.href = e, r.href;
}
function ui(e) {
  var t = at();
  if (!t || !e) return { url: e, protocol: "", domain: "", query: "", path: "", hash: "" };
  var r = t.createElement("a");
  r.href = e;
  var n = r.pathname || "/";
  return n[0] !== "/" && (n = "/" + n), { url: r.href, protocol: r.protocol.slice(0, -1), domain: r.hostname, query: r.search.substring(1), path: n, hash: r.hash };
}
function On() {
  var e = Q() && So();
  return e ? e.href : "";
}
var iu = function(e) {
  return { pid: e.pid, view_id: e.viewId, url: On() };
}, xo = function(e) {
  var t = e.config(), r = iu(t);
  return r.context = e.context ? e.context.toString() : {}, r;
}, Oo = function(e, t) {
  var r = xo(e);
  return r.timestamp = X(), function(n) {
    e.report(A(A({}, n), { overrides: r }));
  };
}, ou = "f_view_0", su = function(e) {
  return function(t, r) {
    var n = xo(e);
    r(ee, function(i) {
      n && i(n);
    });
  };
}, St = function(e) {
  if (e) return e.__SLARDAR_REGISTRY__ || (e.__SLARDAR_REGISTRY__ = { Slardar: { plugins: [], errors: [], subject: {} } }), e.__SLARDAR_REGISTRY__.Slardar;
}, To = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var r = St(Q());
  r && (r.errors || (r.errors = []), r.errors.push(e));
}, Po = function(e) {
  var t = { url: On(), timestamp: X() }, r = e.config();
  return r?.pid && (t.pid = r.pid), e?.context && (t.context = e.context.toString()), t;
}, Tn = function(e, t) {
  return function(r) {
    var n = function(i) {
      return i.overrides = t, i;
    };
    e.on("report", n), r(), e.off("report", n);
  };
}, We = function(e, t, r, n) {
  return n === void 0 && (n = false), e.addEventListener(t, r, n), function() {
    e.removeEventListener(t, r, n);
  };
}, Ro = function(e, t, r, n) {
  return e.addEventListener(t, r, n), function() {
    e.removeEventListener(t, r, n);
  };
};
function au(e) {
  var t = Q(), r = at();
  if (!(!t || !r)) {
    if (r.readyState === "complete") {
      e();
      return;
    }
    We(t, "load", function() {
      setTimeout(function() {
        e();
      }, 0);
    }, false);
  }
}
var Co = function(e) {
  var t = false, r = function(n) {
    t || (t = true, e && e(n));
  };
  return [r];
}, uu = function(e) {
  var t = Q();
  if (t) {
    var r = N(Co(e), 1), n = r[0];
    ["unload", "beforeunload", "pagehide"].forEach(function(i) {
      We(t, i, n, false);
    });
  }
}, cu = function(e) {
  var t = at(), r = Q();
  if (!(!t || !r)) {
    var n = ee, i = function() {
      t.visibilityState === "visible" && (e(), n());
    };
    n = Ro(t, "visibilitychange", i, true);
  }
}, lu = function(e, t) {
  var r, n = at();
  if (n) {
    var i = n.createElement("script");
    i.src = e, i.crossOrigin = "anonymous", i.onload = t, (r = n.head) === null || r === void 0 || r.appendChild(i);
  }
}, Or = function(e, t) {
  return te(e) ? A(A({}, t), e) : e ? t : false;
}, Pn = function() {
  return !!btoa && !!atob;
};
function fu(e) {
  return Pn() ? btoa(encodeURI(e)) : e;
}
function du(e) {
  return Pn() ? decodeURI(atob(e)) : e;
}
var Io = function(e) {
  try {
    var t = localStorage.getItem(e), r = t;
    t && typeof t == "string" && (r = JSON.parse(du(t)));
    var n = r, i = n.expires, o = ua(n, ["expires"]);
    return i >= X() ? o : void 0;
  } catch {
    return;
  }
}, Rn = function(e, t, r) {
  if (!(r <= 0)) try {
    localStorage.setItem(e, fu(JSON.stringify(A(A({}, t), { expires: X() + r }))));
  } catch {
  }
}, pu = 2160 * 60 * 60 * 1e3, Ao = function(e) {
  return e === false ? 0 : e === true || e === void 0 || !Sr(e) ? pu : e;
}, hu = function(e) {
  var t;
  if (!(typeof window != "object" || !window.__perfsee__)) {
    var r = {};
    return (t = Error.captureStackTrace) === null || t === void 0 || t.call(Error, r, e), r.stack;
  }
};
function vu() {
  var e = Q();
  return e && "navigator" in e && "onLine" in e.navigator ? function() {
    return !e.navigator.onLine;
  } : function() {
    return false;
  };
}
function gu(e) {
  var t = Q();
  return t && "addEventListener" in t ? We(t, "online", e) : function() {
  };
}
var _u = "xhr_0", Mo = function() {
  var e = new RegExp("\\/monitor_web\\/collect|\\/monitor_browser\\/collect\\/batch", "i");
  return function(t) {
    return e.test(t);
  };
}, mu = function(e) {
  return function() {
    for (var t, r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
    return t = N(r, 2), this._method = t[0], this._url = t[1], e.apply(this, r);
  };
}, bu = function(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
    this._reqHeaders = this._reqHeaders || {};
    var n = N(t, 2), i = n[0], o = n[1];
    return this._reqHeaders[i] = o, e && e.apply(this, t);
  };
}, yu = function(e, t) {
  return Nt(e, "onreadystatechange", function(r) {
    return function() {
      for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
      return this.readyState === 4 && t(e), r && r.apply(this, n);
    };
  });
}, Eu = function(e, t) {
  var r = Mo();
  return function() {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    if (this._start = X(), this._data = n?.[0], !r(this._url)) {
      var o = t([this._method, this._url, this._start, this]);
      yu(this, o)();
    }
    return e.apply(this, n);
  };
}, ci = function(e) {
  return function(t, r) {
    if (e) {
      var n = [];
      n.push(Nt(e, "open", mu)()), n.push(Nt(e, "setRequestHeader", bu)()), n.push(Nt(e, "send", Eu)(t)), r(function() {
        n.forEach(function(i) {
          return i();
        });
      });
    }
  };
}, Su = "fetch_0", Do = function(e, t) {
  return function(r, n) {
    n === void 0 && (n = {});
    var i = t([r, n]), o = e(r, n);
    return o.then(function(s) {
      i(s);
    }, function() {
      i(void 0);
    }), o;
  };
}, wu = function(e, t) {
  var r = Q();
  if (!(!r || !fetch)) {
    var n = [];
    n.push(Nt(r, "fetch", Do)(e)), t(function() {
      n.forEach(function(i) {
        return i();
      });
    });
  }
}, xu = [Su, wu], Ou = ["resource"], Tu = function(e, t, r) {
  var n = e && new e(function(a, u) {
    a.getEntries && a.getEntries().forEach(function(l, c, d) {
      return t(l, c, d, u);
    });
  }), i = function(a) {
    if (!e || !n) return r && r();
    try {
      n.observe({ entryTypes: a });
    } catch {
      return r && r();
    }
  }, o = function(a, u) {
    if (!e || !n) return r && r();
    try {
      var l = { type: a, buffered: true };
      !pa(u) && (l.durationThreshold = u), n.observe(l);
    } catch {
      return r && r();
    }
    n.observe({ type: a, buffered: false });
  }, s = function() {
    return n && n.disconnect();
  };
  return [i, o, s];
}, Pu = function(e, t, r) {
  var n = N(Tu(e, t), 3), i = n[0], o = n[2];
  return i(r), o;
}, Ru = "resource_0", Cu = function(e, t) {
  var r = tu();
  if (r) {
    var n = Mo();
    t(Pu(r, function(i) {
      !n(i.name) && e(i);
    }, Ou));
  }
}, No = [Ru, Cu], Lo = "pageview", jo = "session", Uo = "js_error", Xt = "http", Iu = "resource_error", Au = "resource", li = "custom", Mu = "performance", Du = "performance_longtask", Nu = "blank_screen", Fo = "action", Lu = "03", ju = "01", Uu = "traceparent", Fu = { sampleRate: 1, origins: [] }, fi = function() {
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
}, Ho = function(e) {
  var t = Or(e, Fu);
  if (t) {
    var r = xn(t.sampleRate);
    if (r) return function(n, i) {
      var o = t.origins;
      o.length && wn(o, n) && i(Uu, Lu + "-" + fi() + "-" + fi().substring(16) + "-" + ju);
    };
  }
}, Hu = new RegExp("(cookie|auth|jwt|token|key|ticket|secret|credential|session|password)", "i"), Bu = new RegExp("(bearer|session)", "i"), Cn = function(e, t) {
  return !e || !t ? true : Hu.test(e) || Bu.test(t);
}, Wu = function(e) {
  var t = false;
  return function(r) {
    t || (t = true, e(r));
  };
}, Bo = function(e, t) {
  try {
    if (t) {
      var r = e.request.url, n = t(r);
      if (!n) return;
      e.request.url = n, e.extra = A(A({}, e.extra), { original_url: r });
    }
  } catch {
  }
}, di = function(e, t, r) {
  var n = N(t, 2), i = n[0], o = n[1], s = r.setTraceHeader, a = r.ignoreUrls, u = r.setContextAtReq, l = r.extractUrl;
  e.push(i[0](function(c) {
    var d = N(c, 4);
    d[0];
    var h = d[1];
    d[2];
    var g = d[3];
    if (!h) return ee;
    var x = xr(h), T;
    if (wn(a, x)) return ee;
    s && s(x, function(m, S) {
      return g.setRequestHeader(m, S);
    });
    var j = u(), R = void 0, I = o()[0](function(m) {
      (x === m.name || T && T === m.name) && !R && (R = m);
    });
    return function(m) {
      T = m.responseURL;
      var S = ku(m, r);
      setTimeout(function() {
        R && (S.response.timing = R), Bo(S, l), j && j({ ev_type: Xt, payload: S }), I();
      }, 100);
    };
  }));
};
function $u(e) {
  return Me(e) && e ? e.split(`\r
`).reduce(function(t, r) {
    if (Me(r)) {
      var n = N(r.split(": "), 2), i = n[0], o = n[1];
      !Cn(i, o) && (t[i.toLowerCase()] = o);
    }
    return t;
  }, {}) : {};
}
function Vu(e) {
  return Object.keys(e).reduce(function(t, r) {
    return !Cn(r, e[r]) && (t[r.toLowerCase()] = e[r]), t;
  }, {});
}
var ku = function(e, t) {
  var r = e._method, n = e._reqHeaders, i = e._url, o = e._start, s = e._data, a = xr(i), u = { api: "xhr", request: { url: a, method: (r || "").toLowerCase(), headers: n && Vu(n), timestamp: o }, response: { status: e.status || 0, is_custom_error: false, timestamp: X() }, duration: X() - o };
  typeof e.getAllResponseHeaders == "function" && (u.response.headers = $u(e.getAllResponseHeaders()));
  var l = u.response.status, c = t.collectBodyOnError, d = t.extraExtractor;
  try {
    var h = d?.(e.response, u, s);
    h && (u.extra = h), h && (u.response.is_custom_error = true), c && (h || l >= 400) && (u.request.body = s ? "" + s : void 0, u.response.body = e.response ? "" + e.response : void 0);
  } catch {
  }
  return u;
}, In = "ajax", qu = { autoWrap: true, setContextAtReq: function() {
  return bn;
}, ignoreUrls: [], collectBodyOnError: false };
function Ku(e, t) {
  var r = Or(t, qu);
  if (r) {
    var n = [], i = A(A({}, r), { setContextAtReq: function() {
      return Oo(e);
    }, setTraceHeader: Ho(r.trace) }), o = function() {
      return yt(e, No);
    };
    i.autoWrap && di(n, [yt(e, [_u, ci(XMLHttpRequest && XMLHttpRequest.prototype)]), o], i), hr(e, In, Xt, n), e.provide("wrapXhr", function(s) {
      function a() {
        var u = new s();
        return di(n, [wr(ci(u)), o], i), u;
      }
      return a.prototype = new s(), ["DONE", "HEADERS_RECIEVED", "LOADING", "OPENED", "UNSENT"].forEach(function(u) {
        a[u] = s[u];
      }), a;
    });
  }
}
function Gu(e) {
  e.on("init", function() {
    var t, r = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[In];
    Ku(e, r);
  });
}
var pi = function(e, t, r) {
  var n = N(t, 2), i = n[0], o = n[1], s = r.setTraceHeader, a = r.ignoreUrls, u = r.setContextAtReq, l = r.extractUrl, c = window.Headers, d = window.Request;
  !d || !c || e.push(i[0](function(h) {
    var g = N(h, 2), x = g[0], T = g[1], j = xr(x instanceof d ? x.url : x), R;
    if (!zu(j) || wn(a, j)) return ee;
    s && s(j, function(W, re) {
      return Ju(W, re, x, T, d, c);
    });
    var I = u(), m = X(), S = void 0, H = o()[0](function(W) {
      (j === W.name || R && R === W.name) && !S && (S = W);
    });
    return function(W) {
      R = W && W.url;
      var re = Xu(x, T, W, d, c, r, m), ve = Wu(function(Se) {
        S && (Se.response.timing = S), Bo(Se, l), I && I({ ev_type: Xt, payload: Se }), H();
      });
      setTimeout(function() {
        ve(re);
      }, 1e3);
    };
  }));
}, zu = function(e) {
  if (!Me(e)) return false;
  var t = N(e.split(":"), 2), r = t[0], n = t[1];
  return !n || r === "http" || r === "https";
}, An = function(e, t) {
  return e instanceof t;
}, Ju = function(e, t, r, n, i, o) {
  var s;
  An(r, i) ? r.headers.set(e, t) : n.headers instanceof o ? n.headers.set(e, t) : n.headers = A(A({}, n.headers), (s = {}, s[e] = t, s));
}, Yu = function(e, t, r) {
  var n = t && t.method || "get";
  return An(e, r) && (n = e.method || n), n.toLowerCase();
}, hi = function(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  try {
    return t.reduce(function(n, i) {
      return new e(i || {}).forEach(function(o, s) {
        return !Cn(s, o) && (n[s] = o);
      }), n;
    }, {});
  } catch {
    return {};
  }
}, vi = function(e, t, r) {
  return An(e, r) ? e.body : t?.body;
}, Xu = function(e, t, r, n, i, o, s) {
  var a = { api: "fetch", request: { method: Yu(e, t, n), timestamp: s, url: xr(e instanceof n ? e.url : e), headers: hi(i, e.headers, t.headers) }, response: { status: r && r.status || 0, is_custom_error: false, timestamp: X() }, duration: X() - s }, u = o.collectBodyOnError, l = o.extraExtractor, c = function() {
    var h;
    u && (a.request.body = (h = vi(e, t, n)) === null || h === void 0 ? void 0 : h.toString());
  };
  if (r) try {
    var d = hi(i, r.headers);
    a.response.headers = d;
    try {
      (d["content-type"] || "").indexOf("application/json") !== -1 && l && r.clone().json().catch(function() {
        return r.clone().text();
      }).then(function(h) {
        var g, x = l(h, a, (g = vi(e, t, n)) === null || g === void 0 ? void 0 : g.toString());
        x && (a.extra = x, a.response.is_custom_error = true, c());
      }).catch(ee);
    } catch {
    }
    r.status >= 400 && c();
  } catch {
  }
  else c();
  return a;
}, Mn = "fetch", Qu = { autoWrap: true, setContextAtReq: function() {
  return bn;
}, ignoreUrls: [], collectBodyOnError: false };
function Zu(e, t) {
  var r = Or(t, Qu);
  if (r) {
    var n = [], i = A(A({}, r), { setContextAtReq: function() {
      return Oo(e);
    }, setTraceHeader: Ho(r.trace) }), o = function() {
      return yt(e, No);
    };
    i.autoWrap && pi(n, [yt(e, xu), o], i), hr(e, Mn, Xt, n), e.provide("wrapFetch", function(s) {
      var a = void 0;
      return pi(n, [wr(function(u) {
        a = Do(s, u);
      }), o], i), a;
    });
  }
}
function ec(e) {
  e.on("init", function() {
    var t, r = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[Mn];
    Zu(e, r);
  });
}
var tc = ["name", "message", "stack", "filename", "lineno", "colno"], Dn = function(e) {
  var t;
  return ga(e) ? t = wa(e, tc) : (yn(e) || _a(e) || Me(e)) && (t = { message: bt(e) }), t;
}, rc = function(e) {
  var t = Dn(e.error);
  if (!t) return t;
  var r = e.colno, n = e.lineno, i = e.filename;
  return r && !t.colno && (t.colno = String(r)), n && !t.lineno && (t.lineno = String(n)), i && !t.filename && (t.filename = i), t;
}, nc = function(e) {
  var t;
  try {
    var r = void 0;
    if ("reason" in e ? r = e.reason : "detail" in e && "reason" in e.detail && (r = e.detail.reason), r) {
      var n = Dn(r);
      return A(A({}, n), { name: (t = n && n.name) !== null && t !== void 0 ? t : "UnhandledRejection" });
    }
  } catch {
  }
}, ic = function(e) {
  return ma(e) ? rc(e) : ba(e) ? nc(e) : Dn(e);
}, gi = "jsError", oc = "hidden_3", _i = function(e) {
  return e.visibilityState === "hidden";
}, sc = function(e, t) {
  var r = at(), n = Q();
  if (!(!r || !n)) {
    var i = function(a) {
      e(a.type === "pagehide" || _i(r));
    }, o = Ro(r, "visibilitychange", i, true), s = We(n, "pagehide", i, true);
    t(function() {
      o(), s();
    }, function(a) {
      a(_i(r));
    });
  }
}, ac = [oc, sc], uc = function(e) {
  return e.readyState === "complete";
}, cc = "unload_0", lc = function(e, t) {
  var r = Q();
  if (r) {
    var n = N(Co(e), 1), i = n[0], o = ["unload", "beforeunload", "pagehide"], s = function() {
      i();
    }, a = [];
    o.forEach(function(u) {
      a.push(We(r, u, s, false));
    }), t(function() {
      a.forEach(function(u) {
        return u();
      });
    });
  }
}, fc = [cc, lc], dc = "history_0", pc = "hash_0", hc = function(e, t) {
  var r = Za(), n = Q();
  if (!(!r || !n)) {
    var i = [], o = function() {
      return e(location.href);
    }, s = function(a) {
      return function() {
        for (var u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
        try {
          a.apply(r, u);
        } finally {
          o();
        }
      };
    };
    i.push(Zr(r, "pushState", s)(), Zr(r, "replaceState", s)()), i.push(We(n, "popstate", o, true)), t(function() {
      i.forEach(function(a) {
        return a();
      });
    });
  }
}, vc = function(e, t) {
  var r = Q();
  if (r) {
    var n = function() {
      return e(location.href);
    }, i = We(r, "hashchange", n, true);
    t(function() {
      i();
    });
  }
}, gc = [pc, vc], _c = [dc, hc], mc = function(e) {
  return function(t) {
    var r;
    return e === "hash" ? ((r = ui(t).hash) === null || r === void 0 ? void 0 : r.replace(/^#/, "")) || "/" : ui(t).path;
  };
}, Wo = function(e) {
  return $o(e, X());
}, $o = function(e, t) {
  return e + "_" + t;
}, bc = function(e, t, r, n) {
  var i = r, o = t;
  n && n(t);
  var s = function(u, l, c) {
    u !== "user_set" && l !== i ? (i = l, o = c ?? i, n && n(o), e(u, o)) : u === "user_set" && l !== o && (o = l, n && n(o), e(u, o));
  }, a = function() {
    t && e("init", t);
  };
  return [s, a];
}, yc = function(e, t) {
  var r = t, n = function(i, o) {
    o !== r && (r = o, e(i, r));
  };
  return [n];
}, Ec = function(e, t) {
  return { ev_type: Lo, payload: { pid: t, source: e } };
}, Sc = function(e) {
  return function(t, r) {
    e(Ec(t, r));
  };
}, rn = function(e) {
  return e === "manual";
}, rr = "error_weight", Ur = "duration_apdex", kt = "perf_apdex", wc = "action", xc = function() {
  var e;
  return e = { error_count: [0, 0, 0, 0], duration_count: [0, 0, 0] }, e[kt] = {}, e;
}, mi = function(e, t) {
  var r = e[0] + e[1] + e[2], n = e[0] / r, i = e[2] / r;
  return i > t.frustrating_threshold ? 2 : n > t.satisfying_threshold || r === 0 ? 0 : 1;
}, Oc = function() {
  var e = 0, t = void 0, r = function(i) {
    if (i) {
      if (!t) return;
      e += X() - t, t = void 0;
    } else t = X();
  }, n = function() {
    t && (e += X() - t);
    var i = e;
    return e = 0, t = X(), i;
  };
  return [r, n];
}, bi = function(e, t) {
  return function(r, n) {
    var i = r.payload;
    switch (r.ev_type) {
      case Mu:
        var o = i.name;
        i.isSupport && e(n[kt], o, i.value);
        break;
      case Fo:
        e(n[kt], wc, i.duration || 0);
        break;
      case Uo:
        t(n[rr], 0);
        break;
      case Xt:
        if (i.response.is_custom_error || i.response.status >= 400) t(n[rr], 1);
        else {
          var s = i.response.timing;
          s && e(n[Ur], 0, s.duration);
        }
        break;
      case Iu:
        t(n[rr], 2);
        break;
      case Nu:
        t(n[rr], 3);
        break;
      case Au:
        e(n[Ur], 1, i.duration);
        break;
      case Du:
        i.longtasks.forEach(function(a) {
          e(n[Ur], 2, a.duration);
        });
        break;
    }
  };
}, yi = function() {
  var e, t, r = function() {
    e = [0, 0, 0], t = xc();
  };
  r();
  var n = function(s, a, u) {
    var l = s && s[a];
    if (!(!l || u <= 0)) {
      var c = u < (l[0].threshold || 0) ? 0 : u > (l[1].threshold || 0) ? 2 : 1;
      if (e[c] += l[c].weight, typeof a == "string") {
        var d = $o(a, c), h = t[kt][d];
        t[kt][d] = (h || 0) + 1;
      } else c === 2 && (t.duration_count[a] += 1);
    }
  }, i = function(s, a) {
    s && (e[2] += s[a], t.error_count[a] += 1);
  }, o = function() {
    return [e, t];
  };
  return [n, i, o, r];
}, Tc = function() {
  var e = { start: X(), end: 0, time_spent: 0, is_bounced: false, entry: "", exit: "", p_count: 0, a_count: 0 }, t = function(s, a) {
    var u = N(s, 3), l = u[0], c = u[1], d = u[2];
    e.end = X(), e.time_spent += a && a.time_spent || 0, e.last_page = a, e.p_count += 1, e.rank = l, e.apdex = c, e.apdex_detail = d;
    var h = at();
    h && (e.is_bounced = !uc(h));
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
}, Pc = function(e, t, r, n) {
  var i = n.sendInit, o = n.initPid, s = n.routeMode, a = n.extractPid, u = n.onPidUpdate, l = rn(s) ? function() {
    return "";
  } : mc(s), c = a || (function() {
  }), d = function(R) {
    var I;
    return (I = c(R)) !== null && I !== void 0 ? I : l(R);
  }, h = N(bc(Sc(e), o || d(location.href), l(location.href), u), 2), g = h[0], x = h[1];
  if (!rn(s)) {
    var T = N(yc(function(R, I) {
      return g(R, l(I), c(I));
    }, ""), 1), j = T[0];
    r.length && r.forEach(function(R) {
      return t.push(R[0](function(I) {
        return j(s, I);
      }));
    });
  }
  return i && x(), [g.bind(null, "user_set")];
}, Rc = function(e, t, r, n) {
  var i = N(r, 2), o = i[0], s = i[1], a = n.apdex === 2, u = void 0, l = void 0, c = void 0, d = false, h = N(yi(), 4), g = h[0], x = h[1], T = h[2], j = h[3], R = N(yi(), 4), I = R[0], m = R[1], S = R[2], H = R[3], W = N(Tc(), 5), re = W[0], ve = W[1], Se = W[2], Ne = W[3], tt = W[4], rt = N(Oc(), 2), ct = rt[0], xt = rt[1];
  t.push(o[0](ct)), !a && t.push(s[0](function() {
    if (d) {
      var $ = N(S(), 2), ge = $[0], Ot = $[1], Lr = mi(ge, c);
      re([Lr, ge, Ot], q()), e({ ev_type: jo, payload: tt() }), H();
    }
  }));
  var er = bi(g, x), ie = bi(I, m), Y = function($) {
    d && (a || (ie($, c), $.ev_type === Fo && Se()), $.common.pid === u[1] && er($, c));
  }, q = function() {
    var $ = N(T(), 2), ge = $[0], Ot = $[1];
    return { start: u[0], pid: u[1], view_id: u[2], end: X(), time_spent: xt(), apdex: ge, rank: mi(ge, c), detail: Ot };
  }, Le = function($, ge) {
    if (!u) {
      u = [X(), $, ge], Ne($), d = !!(c && u);
      return;
    }
    d && (l = q(), ve(l, $)), u = [X(), $, ge], j();
  }, lt = function($) {
    d && ($.payload.last = l), e($);
  }, je = function($) {
    if (!$) {
      t.forEach(function(ge) {
        return ge();
      }), t.length = 0;
      return;
    }
    c = $, d = !!(c && u);
  };
  return t.push(function() {
    d = false;
  }), [Le, Y, lt, je];
}, vr = "pageview", Cc = { sendInit: true, routeMode: "history", apdex: 2 };
function Ic(e, t) {
  var r, n = Or(t, Cc);
  if (!(!n || !So())) {
    var i = n.routeMode, o = n.apdex, s = e.report.bind(e), a = ee;
    if (o) {
      var u = [], l = N(Rc(e.report.bind(e), u, [yt(e, ac), yt(e, fc)], n), 4), c = l[0], d = l[1], h = l[2], g = l[3];
      s = h, a = c, e.on("send", d), u.push(function() {
        return e.off("send", d);
      }), e.on("start", function() {
        g(e.config().apdex);
      }), hr(e, vr, jo, u);
    }
    var x = [], T = N(Pc(s, x, rn(i) ? [] : [e.initSubject(gc), e.initSubject(_c)], A(A({}, n), { initPid: (r = e.config()) === null || r === void 0 ? void 0 : r.pid, onPidUpdate: function(I) {
      var m = Wo(I);
      a(I, m), e.set({ pid: I, viewId: m, actionId: void 0 });
    } })), 1), j = T[0];
    Eo(e, [ou, su(e)], -1);
    var R = function() {
      j(e.config().pid);
    };
    e.on("config", R), x.push(function() {
      return e.off("config", R);
    }), hr(e, vr, Lo, x), e.provide("sendPageview", j);
  }
}
function Ac(e) {
  e.on("init", function() {
    var t, r = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[vr];
    Ic(e, r);
  });
}
var Mc = "event", Dc = "log", Nc = function(e) {
  if (!(!e || !te(e)) && !(!e.name || !Me(e.name))) {
    var t = { name: e.name, type: Mc };
    if ("metrics" in e && te(e.metrics)) {
      var r = e.metrics, n = {};
      for (var i in r) Sr(r[i]) && (n[i] = r[i]);
      t.metrics = n;
    }
    if ("categories" in e && te(e.categories)) {
      var o = e.categories, s = {};
      for (var i in o) s[i] = bt(o[i]);
      t.categories = s;
    }
    return "attached_log" in e && Me(e.attached_log) && (t.attached_log = e.attached_log), t;
  }
}, Lc = function(e) {
  if (!(!e || !te(e)) && !(!e.content || !Me(e.content))) {
    var t = e.content, r = { content: bt(t), type: Dc, level: "info" };
    if ("level" in e && (r.level = e.level), "extra" in e && te(e.extra)) {
      var n = e.extra, i = {}, o = {};
      for (var s in n) Sr(n[s]) ? i[s] = n[s] : o[s] = bt(n[s]);
      r.metrics = i, r.categories = o;
    }
    return "attached_log" in e && Me(e.attached_log) && (r.attached_log = e.attached_log), r;
  }
}, jc = function(e) {
  var t = function(n) {
    var i = Nc(n);
    if (i) {
      var o = hu(t);
      o && (i.stacks = o), e.report({ ev_type: li, payload: i, extra: { timestamp: X() } });
    }
  }, r = function(n) {
    var i = Lc(n);
    i && e.report({ ev_type: li, payload: i, extra: { timestamp: X() } });
  };
  e.provide("sendEvent", t), e.provide("sendLog", r);
}, Uc = function(e) {
  var t = wo(), r = tn(t);
  t && (t.onchange = function() {
    r = tn(t);
  }), e.on("report", function(n) {
    return A(A({}, n), { extra: A(A({}, n.extra || {}), { network_type: r }) });
  });
}, nr = function(e, t) {
  var r = e.common || {};
  return r.sample_rate = t, e.common = r, e;
}, nn = function(e, t, r, n, i) {
  return e ? /* @__PURE__ */ (function(o) {
    return function() {
      return o;
    };
  })(i(n, t)) : function() {
    return r(t);
  };
}, Fc = function(e, t) {
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
}, Hc = function(e, t, r) {
  switch (r) {
    case "eq":
      return mt(t, e);
    case "neq":
      return !mt(t, e);
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
}, Bc = function(e, t, r, n) {
  var i = dr(e, t, function(s, a) {
    return s[a];
  });
  if (i === void 0) return false;
  var o = va(i) ? "bool" : Sr(i) ? "number" : "string";
  return Hc(i, Fc(n, o), r);
}, on = function(e, t) {
  try {
    return t.type === "rule" ? Bc(e, t.field, t.op, t.values) : t.type === "and" ? t.children.every(function(r) {
      return on(e, r);
    }) : t.children.some(function(r) {
      return on(e, r);
    });
  } catch (r) {
    return To(r), false;
  }
}, Wc = function(e, t, r, n, i, o) {
  var s = {};
  return Object.keys(e).forEach(function(a) {
    var u = e[a], l = u.enable, c = u.sample_rate, d = u.conditional_sample_rules;
    l ? (s[a] = { enable: l, sample_rate: c, effectiveSampleRate: c * r, hit: nn(t, c, n, i, o) }, d && (s[a].conditional_hit_rules = d.map(function(h) {
      var g = h.sample_rate, x = h.filter;
      return { sample_rate: g, hit: nn(t, g, n, i, o), effectiveSampleRate: g * r, filter: x };
    }))) : s[a] = { enable: l, hit: function() {
      return false;
    }, sample_rate: 0, effectiveSampleRate: 0 };
  }), s;
}, $c = function(e, t, r, n, i) {
  if (!t) return bn;
  var o = t.sample_rate, s = t.include_users, a = t.sample_granularity, u = t.rules, l = t.r, c = l === void 0 ? Math.random() : l, d = mt(s, e);
  if (d) return function(T) {
    return nr(T, 1);
  };
  var h = a === "session", g = nn(h, o, r, c, n), x = Wc(u, h, o, r, c, n);
  return function(T) {
    var j;
    if (!g()) return h && i[0](), false;
    if (!(T.ev_type in x)) return nr(T, o);
    if (!x[T.ev_type].enable) return h && i[1](T.ev_type), false;
    if (!((j = T.common) === null || j === void 0) && j.sample_rate) return T;
    var R = x[T.ev_type], I = R.conditional_hit_rules;
    if (I) {
      for (var m = 0; m < I.length; m++) if (on(T, I[m].filter)) return I[m].hit() ? nr(T, I[m].effectiveSampleRate) : false;
    }
    return R.hit() ? nr(T, R.effectiveSampleRate) : (!(I && I.length) && h && i[1](T.ev_type), false);
  };
}, Vc = function(e) {
  e.on("start", function() {
    var t = e.config(), r = t.userId, n = t.sample, i = [function() {
      e.destroy();
    }, function(s) {
      e.destroyAgent.removeByEvType(s);
    }], o = $c(r, n, xn, Aa, i);
    e.on("build", o);
  });
}, kc = function() {
  var e = Q();
  return e && e.navigator.sendBeacon ? { get: function() {
  }, post: function(t, r) {
    e.navigator.sendBeacon(t, r);
  } } : { get: ee, post: ee };
};
function qc(e) {
  var t = new Error(e);
  return t.name = "ReqeustServerError", t;
}
function Ei(e) {
  var t = new Error(e);
  return t.name = "RequestNetworkError", t;
}
var Si = function(e, t, r) {
  var n = t.url, i = t.data, o = t.success, s = o === void 0 ? ee : o, a = t.fail, u = a === void 0 ? ee : a, l = t.getResponseText, c = l === void 0 ? ee : l, d = t.withCredentials, h = d === void 0 ? false : d, g = new r();
  g.withCredentials = h, g.open(e, n, true), g.setRequestHeader("Content-Type", "application/json"), g.onload = function() {
    c?.(this.responseText);
    try {
      if (this.status >= 400) u(qc(this.responseText || this.statusText));
      else if (this.responseText) {
        var x = JSON.parse(this.responseText);
        s(x);
      } else s({});
    } catch (T) {
      u(T);
    }
  }, g.onerror = function() {
    u(Ei("Network request failed"));
  }, g.onabort = function() {
    u(Ei("Network request aborted"));
  }, g.send(i);
}, Kc = function() {
  var e = eu();
  return e ? { useBeacon: true, get: function(t) {
    Si("GET", t, e);
  }, post: function(t) {
    Si("POST", t, e);
  } } : { get: ee, post: ee };
};
function Gc(e) {
  var t = da(e), r = t.send;
  return uu(function() {
    if (e.transport.useBeacon) {
      var n = kc(), i = t.getBatchData();
      i && (n.post(t.getEndpoint(), i), t.clear()), t.send = function(o) {
        n.post(t.getEndpoint(), go([o]));
      }, cu(function() {
        t.send = r;
      });
    } else t.flush();
  }), t;
}
var zc = "mon.zijieapi.com", Jc = "https://lf3-short.ibytedapm.com/slardar/fe/sdk-web/plugins", Tr = "1.16.4", Yc = "SDK_SLARDAR_WEB", Vo = "/monitor_web/settings/browser-settings", ko = "/monitor_browser/collect/batch/", qo = "SLARDAR", wi = ["/log/sentry/", ko, Vo], Ko = "session", Xc = ["blankScreen", "action"], Qc = { sample_rate: 1, include_users: [], sample_granularity: Ko, rules: {} }, Zc = 20, el = "";
function tl(e, t, r) {
  r === void 0 && (r = nl), au(function() {
    e.on("init", function() {
      r(e, t);
    });
  });
}
var Go = function(e, t, r, n) {
  n === void 0 && (n = Nn);
  var i = t.config(), o = i.plugins, s = i.pluginBundle, a = e.filter(function(l) {
    return o[l] && !t.destroyAgent.has(l);
  }), u = function() {
    return a.forEach(function(l) {
      return sn(t, l, r);
    });
  };
  a.every(function(l) {
    return Jo(l, r);
  }) ? u() : n(t, { name: s.name }, u);
}, zo = function(e, t, r, n) {
  n === void 0 && (n = Nn);
  var i = t.config().plugins;
  e.filter(function(o) {
    return i[o] && !t.destroyAgent.has(o);
  }).forEach(function(o) {
    Jo(o, r) ? sn(t, o, r) : n(t, { name: o, config: i[o] }, function() {
      return sn(t, o, r);
    });
  });
}, rl = function(e) {
  return function(t, r) {
    var n, i = e.config().pluginBundle;
    e.destroyAgent.has(t) && e.destroyAgent.remove(t), r !== void 0 && e.set({ plugins: A(A({}, e.config().plugins), (n = {}, n[t] = r, n)) }), i && ~i.plugins.indexOf(t) ? Go([t], e) : zo([t], e);
  };
};
function nl(e, t, r) {
  r === void 0 && (r = Nn);
  var n = e.config().pluginBundle, i = n ? n.plugins : [];
  Go(i, e, t, r), zo(Xc, e, t, r), e.provide("reloadPlugin", rl(e));
}
function Nn(e, t, r, n) {
  var i = t.name, o = t.config;
  n === void 0 && (n = lu);
  var s = il(e, i, o);
  n(s, function() {
    r();
  });
}
function il(e, t, r) {
  var n;
  return (n = r?.path) !== null && n !== void 0 ? n : e.config().pluginPathPrefix + "/" + xa(t) + "." + Tr + "." + el + "js";
}
function sn(e, t, r) {
  if (r === void 0 && (r = St(Q())), !!r) {
    var n = Ln(r, t);
    if (!n) {
      pr("[loader].applyPlugin not found", t);
      return;
    }
    try {
      if (e.destroyAgent.has(t)) return;
      n.apply(e);
    } catch (i) {
      To(i), pr("[loader].applyPlugin failed", t, i);
    }
  }
}
function Ln(e, t) {
  return e.plugins.filter(function(r) {
    return r.name === t && r.version === Tr;
  })[0];
}
function Jo(e, t) {
  return t === void 0 && (t = St(Q())), !t || !t.plugins ? false : !!Ln(t, e);
}
function Yo(e, t, r) {
  r === void 0 && (r = St(Q())), !(!r || !r.plugins) && (Ln(r, e) || r.plugins.push({ name: e, version: Tr, apply: t }));
}
function Xo(e) {
  var t, r, n = ["userId", "deviceId", "sessionId", "env"];
  try {
    for (var i = ca(n), o = i.next(); !o.done; o = i.next()) {
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
function ol(e) {
  var t = e.plugins || {};
  for (var r in t) t[r] && !te(t[r]) && (t[r] = {});
  return Xo(A(A({}, e), { plugins: t }));
}
function sl(e) {
  return te(e) && "bid" in e;
}
function al(e) {
  return Xo(A({}, e));
}
function ul(e) {
  var t;
  if (!e) return {};
  var r = e.sample, n = e.plugins, i = e.timestamp, o = e.quota_rate, s = o === void 0 ? 1 : o, a = e.apdex;
  if (!r) return {};
  var u = r.sample_rate, l = r.sample_granularity, c = l === void 0 ? Ko : l, d = r.include_users, h = r.rules, g = h === void 0 ? [] : h;
  return { sample: { include_users: d, sample_rate: u * s, sample_granularity: c, rules: g.reduce(function(x, T) {
    var j = T.name, R = T.enable, I = T.sample_rate, m = T.conditional_sample_rules;
    return x[j] = { enable: R, sample_rate: I, conditional_sample_rules: m }, x;
  }, {}) }, plugins: { heatmap: (t = n?.heatmap) !== null && t !== void 0 ? t : false }, apdex: a, serverTimestamp: i };
}
var cl = function(e, t) {
  return t === void 0 && (t = ko), (e && e.indexOf("//") >= 0 ? "" : "https://") + e + t;
}, ll = function(e, t) {
  return t === void 0 && (t = Vo), (e && e.indexOf("//") >= 0 ? "" : "https://") + e + t;
}, fl = function() {
  return en();
}, dl = function(e) {
  var t = [];
  return e.observe = function(r) {
    t.push(r);
  }, e.push = function() {
    for (var r, n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    return n.forEach(function(o) {
      t.forEach(function(s) {
        return s(o);
      });
    }), (r = [].push).call.apply(r, he([e], N(n), false));
  }, e;
}, Qo = function(e) {
  return qo + e;
}, Zo = function(e, t) {
  return qo + e + "::setting::" + t;
}, pl = function(e, t) {
  try {
    var r = localStorage.getItem(e);
    if (!r || !Pn() || r[0] !== "{") return;
    Rn(e, JSON.parse(r), t);
  } catch {
  }
}, hl = function(e, t) {
  e === void 0 && (e = "");
  var r = { userId: en(), deviceId: en() };
  if (t <= 0) return r;
  var n = Qo(e);
  pl(n, t);
  var i = Io(n);
  return { userId: i?.userId || r.userId, deviceId: i?.deviceId || r.deviceId };
}, vl = function(e) {
  var t = e.bid, r = e.userId, n = e.deviceId, i = e.storageExpires, o = Qo(t);
  Rn(o, { userId: r, deviceId: n }, Ao(i));
}, gl = function(e, t) {
  var r = Zo(e, t);
  return Io(r);
}, _l = function(e, t, r, n) {
  var i = Zo(t, r);
  Rn(i, e, n);
}, ml = { get: function() {
  return this.__SLARDAR__REPALCE__HOLDER__;
} }, bl = function(e) {
  var t = e, r, n = {}, i = ml.get(), o, s = ee, a = ee;
  return { getConfig: function() {
    return t;
  }, setConfig: function(c) {
    return n = A(A({}, n), c || {}), u(), r || (r = c, t.useLocalConfig || !t.bid ? (o = {}, s()) : i ? l() : yl(t.transport, t.domain, t.bid, function(d) {
      i = d, l();
    }, t.serverSettingStorageExpires)), t;
  }, onChange: function(c) {
    a = c;
  }, onReady: function(c) {
    s = function() {
      vl(t), c();
    }, o && s();
  } };
  function u() {
    var c = A(A(A({}, e), o || {}), n);
    c.plugins = Ea(e.plugins, o?.plugins || {}, n.plugins || {}), c.sample = xi(xi(e.sample, o?.sample), n.sample), t = c, a();
  }
  function l() {
    o = ul(i), u(), s();
  }
};
function yl(e, t, r, n, i) {
  i === void 0 && (i = 0);
  var o = 3, s = 2e3, a = 1e-3, u = Q(), l = gl(r, t), c = vu(), d = 0, h = false, g;
  if (c()) return I();
  x();
  function x() {
    d++, e.get({ withCredentials: true, url: ll(t) + "?bid=" + r + "&store=1", success: function(m) {
      T(m.data || {}, true);
    }, fail: j });
  }
  function T(m, S) {
    h || (h = true, S && i && _l(m, r, t, i), g && (g(), g = void 0), n(m));
  }
  function j(m) {
    if (l) return T(l, false);
    if (R(m) && u) {
      u.setTimeout(x, s);
      return;
    }
    return T({ sample: { sample_rate: a } }, false);
  }
  function R(m) {
    return d >= o || m.name !== "RequestNetworkError" ? false : nu();
  }
  function I() {
    if (l) return T(l, false);
    g = gu(x);
  }
}
function xi(e, t) {
  if (!e || !t) return e || t;
  var r = A(A({}, e), t);
  return r.include_users = he(he([], N(e.include_users || []), false), N(t.include_users || []), false), r.rules = he(he([], N(Object.keys(e.rules || {})), false), N(Object.keys(t.rules || {})), false).reduce(function(n, i) {
    var o, s;
    return i in n || (i in (e.rules || {}) && i in (t.rules || {}) ? (n[i] = A(A({}, e.rules[i]), t.rules[i]), n[i].conditional_sample_rules = he(he([], N(e.rules[i].conditional_sample_rules || []), false), N(t.rules[i].conditional_sample_rules || []), false)) : n[i] = ((o = e.rules) === null || o === void 0 ? void 0 : o[i]) || ((s = t.rules) === null || s === void 0 ? void 0 : s[i])), n;
  }, {}), r;
}
var El = { build: function(e) {
  return { ev_type: e.ev_type, payload: e.payload, common: A(A({}, e.extra || {}), e.overrides || {}) };
} }, Sl = function(e, t) {
  var r = t || {}, n = r.pid, i = n === void 0 ? "" : n, o = r.viewId, s = o === void 0 ? "" : o, a = { url: On(), timestamp: X(), sdk_version: Tr, sdk_name: Yc, pid: i, view_id: s };
  return A(A({}, e), { extra: A(A({}, a), e.extra || {}) });
}, wl = function(e) {
  e.on("report", function(t) {
    return Sl(t, e.config());
  }), e.on("init", function() {
    var t = e.config(), r = t.pid, n = t.viewId, i = e.getPreStartQueue();
    i.forEach(function(o, s) {
      var a = o.extra || {};
      i[s] = A(A({}, o), { extra: A(A({}, a), { pid: a.pid || r, view_id: a.view_id || n }) });
    });
  });
}, xl = { sri: "reportSri", st: "reportResourceError", err: "captureException", reject: "captureException" }, Ol = function(e) {
  return Object.keys(e).reduce(function(t, r) {
    return t[r] = [], t;
  }, {});
}, Tl = function(e) {
  return Object.keys(e).reduce(function(t, r) {
    return t[e[r]] ? t[e[r]].push(r) : t[e[r]] = [r], t;
  }, {});
}, Pl = function(e, t, r) {
  return function(n, i, o, s) {
    var a;
    o === void 0 && (o = X()), s === void 0 && (s = location.href);
    var u = A(A({}, Po(e)), { url: s, timestamp: o });
    t[n] && (e[r[n]] ? Tn(e, u)(function() {
      e[r[n]](i);
    }) : (a = t[n]) === null || a === void 0 || a.push([i, u]));
  };
}, Rl = function(e, t, r) {
  return function(n) {
    n in r && r[n].forEach(function(i) {
      var o;
      (o = t[i]) === null || o === void 0 || o.forEach(function(s) {
        var a = N(s, 2), u = a[0], l = a[1];
        Tn(e, l)(function() {
          e[n](u);
        });
      }), t[i] = null;
    });
  };
}, Fr = function(e, t) {
  return t === "err" ? dr(e, "plugins." + gi + ".onerror", function(r, n) {
    return r[n];
  }) !== false : t === "reject" ? dr(e, "plugins." + gi + ".onunhandledrejection", function(r, n) {
    return r[n];
  }) !== false : true;
}, Cl = function(e, t) {
  var r;
  t === void 0 && (t = xl);
  var n = Ol(t), i = Tl(t), o = Pl(e, n, t);
  !((r = e.p) === null || r === void 0) && r.a && "observe" in e.p.a && e.p.a.observe(function(s) {
    var a = N(s, 5);
    a[0];
    var u = a[1], l = a[2], c = a[3], d = a[4], h = e.config();
    Fr(h, u) && o(u, l, c, d);
  }), e.on("init", function() {
    var s, a = e.config();
    (s = e.p) === null || s === void 0 || s.a.forEach(function(u) {
      var l = N(u, 5);
      l[0];
      var c = l[1], d = l[2], h = l[3], g = l[4];
      Fr(a, c) && o(c, d, h, g);
    }), e.p && e.p.a && (e.p.a.length = 0), e.provide("precollect", function(u, l, c, d) {
      c === void 0 && (c = X()), d === void 0 && (d = location.href), Fr(a, u) && o(u, l, c, d);
    });
  }), e.on("provide", Rl(e, n, i));
}, Oi = function(e) {
  var t = N(e, 2), r = t[0], n = t[1];
  return { ev_type: Uo, payload: { error: ic(r), breadcrumbs: [], extra: n || {} }, extra: { bid: "slardar_sdk" } };
}, Il = 1e-3, Al = function(e, t) {
  t === void 0 && (t = Il);
  var r = St(Q());
  r && (r.errors || (r.errors = []), !("observe" in r.errors) && xn(t) && (r.errors = dl(r.errors), r.errors.forEach(function(n) {
    e.report(Oi(n));
  }), r.errors.observe(function(n) {
    e.report(Oi(n));
  })));
}, Ml = 700, Dl = function(e) {
  var t, r = false;
  e.on("init", function() {
    t = (/* @__PURE__ */ new Date()).getTime(), e.on("config", function() {
      var n, i = (n = e.config()) === null || n === void 0 ? void 0 : n.serverTimestamp;
      if (!(isNaN(i) || Number(i) <= 0 || r)) {
        r = true;
        var o = (/* @__PURE__ */ new Date()).getTime(), s = o - t;
        if (s < Ml && i) {
          var a = i - (o + t) / 2;
          !isNaN(a) && (a > 0 || a < -6e5) && e.on("beforeBuild", function(u) {
            var l;
            return A(A({}, u), { extra: A(A({}, (l = u.extra) !== null && l !== void 0 ? l : {}), { sdk_offset: a ?? 0 }) });
          });
        }
      }
    });
  });
}, Nl = function(e, t) {
  var r = {};
  return r.bid = t.bid, r.user_id = t.userId, r.device_id = t.deviceId, r.session_id = t.sessionId, r.release = t.release, r.env = t.env, A(A({}, e), { extra: A(A({}, r), e.extra || {}) });
}, Ll = function(e) {
  e.on("beforeBuild", function(t) {
    return Nl(t, e.config());
  });
}, jl = function(e) {
  e.on("start", function() {
    var t = e.config().bid, r = e.getSender();
    r.setEndpoint(r.getEndpoint() + ("?biz_id=" + t));
  });
}, Ul = function(e) {
  var t = Ao(e.storageExpires), r = hl(e.bid, t);
  return { bid: "", pid: "", viewId: Wo("_"), userId: r.userId, deviceId: r.deviceId, storageExpires: t, serverSettingStorageExpires: 0, sessionId: fl(), domain: zc, pluginBundle: { name: "commonMonitors", plugins: ["breadcrumb", "jsError", "performance", "resourceError", "resource"] }, pluginPathPrefix: Jc, plugins: { ajax: { ignoreUrls: wi }, fetch: { ignoreUrls: wi }, breadcrumb: {}, pageview: {}, jsError: {}, resource: {}, resourceError: {}, performance: {}, tti: {}, fmp: {}, blankScreen: false, heatmap: false }, release: "", env: "production", sample: Qc, transport: Kc() };
}, Fl = function(e) {
  var t = e === void 0 ? {} : e, r = t.createSender, n = r === void 0 ? function(d) {
    return Gc({ size: Zc, endpoint: cl(d.domain), transport: d.transport });
  } : r, i = t.builder, o = i === void 0 ? El : i, s = t.createDefaultConfig, a = s === void 0 ? Ul : s, u = qa({ validateInitConfig: sl, initConfigNormalizer: ol, userConfigNormalizer: al, createSender: n, builder: o, createDefaultConfig: a, createConfigManager: bl });
  Al(u), Ka(u);
  var l = St(Q());
  Xa(u, l && l.subject), Dl(u), Ll(u), wl(u), Uc(u), jl(u);
  var c = Ga(u, Po, function(d, h, g) {
    return Tn(d, h)(function() {
      var x = N(g), T = x[0], j = x.slice(1);
      u[T].apply(u, he([], N(j), false));
    });
  });
  return za(c, Yo), Qa(c), c;
}, It, Hr = (It = {}, It[vr] = Ac, It[In] = Gu, It[Mn] = ec, It), es = function(e) {
  e === void 0 && (e = {});
  var t = Fl(e);
  return Vc(t), Cl(t), jc(t), Object.keys(Hr).forEach(function(r) {
    Yo(r, Hr[r]), Hr[r](t);
  }), tl(t), t.provide("create", es), t;
}, Br = "precollect", Ti = 1e3 * 60 * 5;
function Hl(e, t) {
  if ("addEventListener" in e) {
    t.pcErr = function(n) {
      n = n || e.event;
      var i = n.target || n.srcElement || {};
      i instanceof Element || i instanceof HTMLElement ? t(Br, "st", { tagName: i.tagName, url: i.getAttribute("href") || i.getAttribute("src") }) : t(Br, "err", n.error);
    }, t.pcRej = function(n) {
      n = n || e.event, t(Br, "reject", n.reason || n.detail && n.detail.reason);
    };
    var r = [];
    r.push(We(e, "error", t.pcErr, true)), r.push(We(e, "unhandledrejection", t.pcRej, true)), setTimeout(function() {
      r.forEach(function(n) {
        return n();
      });
    }, Ti);
  }
  "PerformanceObserver" in e && "PerformanceLongTaskTiming" in e && (t.pp = { entries: [] }, t.pp.observer = new PerformanceObserver(function(n) {
    t.pp.entries = t.pp.entries.concat(n.getEntries());
  }), t.pp.observer.observe({ entryTypes: ["longtask"] }), setTimeout(function() {
    t.pp.observer.disconnect();
  }, Ti));
}
var ar = es(), Pi = Q();
Pi && Hl(Pi, ar);
const Ri = ["RequestError", "AbortError", "TimeoutError", "cancelled", "Stream read timeout after", "get cert timeout", "internal/net", "unexcepted status code", "ETIMEDOUT", "ECONNRESET", "Invalid WebSocket frame", "WebSocket was closed", "/ws/lib/", "Request failed:"], Bl = [{ pattern: /([/\\]Users[/\\])[^/\\]+([/\\])/gi, replacement: "$1[USERNAME]$2" }, { pattern: /([/\\])\d+(?:\.\d+){1,}([/\\])/g, replacement: "$1[VERSION]$2" }, { pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, replacement: "[UUID]" }, { pattern: /[\d.]+ ?(bytes|[KMGT]i?B)\b/gi, replacement: "[SIZE] $1" }, { pattern: /[\d.]+%/g, replacement: "[PERCENT]" }];
function Ci(e) {
  let t = e;
  for (const r of Bl) t = t.replace(r.pattern, r.replacement);
  return t;
}
function Wl(e) {
  if (Ri.length === 0) return false;
  let t = "";
  return e instanceof Error ? t = `${e.name} ${e.message} ${e.stack ?? ""}` : typeof e == "string" ? t = e : t = String(e), Ri.some((r) => t.includes(r));
}
function $l(e) {
  const r = new URLSearchParams(window.location.search).get("global_config"), n = JSON.parse(r ?? "{}");
  ar.on("beforeSend", (i) => {
    const s = i?.payload?.error;
    if (s) {
      const a = { name: s.name ?? "", message: s.message ?? "", stack: s.stack ?? "" };
      if (Wl(a)) return false;
      s.message && (s.message = Ci(s.message)), s.stack && (s.stack = Ci(s.stack));
    }
    return i;
  }), ar.init({ bid: "luna_pc", deviceId: n.deviceId, userId: n.deviceId, pid: e, release: "3.7.0", env: "production" }), ar.start();
}
$l("imagePreview");
function jn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const J = {}, pt = [], Ae = () => {
}, ts = () => false, Pr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Un = (e) => e.startsWith("onUpdate:"), ue = Object.assign, Fn = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, Vl = Object.prototype.hasOwnProperty, k = (e, t) => Vl.call(e, t), F = Array.isArray, Lt = (e) => Rr(e) === "[object Map]", kl = (e) => Rr(e) === "[object Set]", U = (e) => typeof e == "function", ne = (e) => typeof e == "string", wt = (e) => typeof e == "symbol", Z = (e) => e !== null && typeof e == "object", rs = (e) => (Z(e) || U(e)) && U(e.then) && U(e.catch), ql = Object.prototype.toString, Rr = (e) => ql.call(e), Kl = (e) => Rr(e).slice(8, -1), Gl = (e) => Rr(e) === "[object Object]", Hn = (e) => ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, jt = jn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Cr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, zl = /-\w/g, Qe = Cr((e) => e.replace(zl, (t) => t.slice(1).toUpperCase())), Jl = /\B([A-Z])/g, ut = Cr((e) => e.replace(Jl, "-$1").toLowerCase()), ns = Cr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Wr = Cr((e) => e ? `on${ns(e)}` : ""), Xe = (e, t) => !Object.is(e, t), $r = (e, ...t) => {
  for (let r = 0; r < e.length; r++) e[r](...t);
}, is = (e, t, r, n = false) => {
  Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: n, value: r });
}, Yl = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ii;
const Ir = () => Ii || (Ii = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Bn(e) {
  if (F(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], i = ne(n) ? ef(n) : Bn(n);
      if (i) for (const o in i) t[o] = i[o];
    }
    return t;
  } else if (ne(e) || Z(e)) return e;
}
const Xl = /;(?![^(]*\))/g, Ql = /:([^]+)/, Zl = /\/\*[^]*?\*\//g;
function ef(e) {
  const t = {};
  return e.replace(Zl, "").split(Xl).forEach((r) => {
    if (r) {
      const n = r.split(Ql);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Wn(e) {
  let t = "";
  if (ne(e)) t = e;
  else if (F(e)) for (let r = 0; r < e.length; r++) {
    const n = Wn(e[r]);
    n && (t += n + " ");
  }
  else if (Z(e)) for (const r in e) e[r] && (t += r + " ");
  return t.trim();
}
const tf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", rf = jn(tf);
function os(e) {
  return !!e || e === "";
}
let oe;
class nf {
  constructor(t = false) {
    this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = oe, !t && oe && (this.index = (oe.scopes || (oe.scopes = [])).push(this) - 1);
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
      const r = oe;
      try {
        return oe = this, t();
      } finally {
        oe = r;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = oe, oe = this);
  }
  off() {
    this._on > 0 && --this._on === 0 && (oe = this.prevScope, this.prevScope = void 0);
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
function ss() {
  return oe;
}
function of(e, t = false) {
  oe && oe.cleanups.push(e);
}
let z;
const Vr = /* @__PURE__ */ new WeakSet();
class as {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, oe && oe.active && oe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Vr.has(this) && (Vr.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || cs(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Ai(this), ls(this);
    const t = z, r = ye;
    z = this, ye = true;
    try {
      return this.fn();
    } finally {
      fs(this), z = t, ye = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) kn(t);
      this.deps = this.depsTail = void 0, Ai(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Vr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    an(this) && this.run();
  }
  get dirty() {
    return an(this);
  }
}
let us = 0, Ut, Ft;
function cs(e, t = false) {
  if (e.flags |= 8, t) {
    e.next = Ft, Ft = e;
    return;
  }
  e.next = Ut, Ut = e;
}
function $n() {
  us++;
}
function Vn() {
  if (--us > 0) return;
  if (Ft) {
    let t = Ft;
    for (Ft = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; Ut; ) {
    let t = Ut;
    for (Ut = void 0; t; ) {
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
function ls(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function fs(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === r && (r = i), kn(n), sf(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = r;
}
function an(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (ds(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e._dirty;
}
function ds(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qt) || (e.globalVersion = qt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !an(e)))) return;
  e.flags |= 2;
  const t = e.dep, r = z, n = ye;
  z = e, ye = true;
  try {
    ls(e);
    const i = e.fn(e._value);
    (t.version === 0 || Xe(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    z = r, ye = n, fs(e), e.flags &= -3;
  }
}
function kn(e, t = false) {
  const { dep: r, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let o = r.computed.deps; o; o = o.nextDep) kn(o, true);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function sf(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
let ye = true;
const ps = [];
function $e() {
  ps.push(ye), ye = false;
}
function Ve() {
  const e = ps.pop();
  ye = e === void 0 ? true : e;
}
function Ai(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = z;
    z = void 0;
    try {
      t();
    } finally {
      z = r;
    }
  }
}
let qt = 0;
class af {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class qn {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
  }
  track(t) {
    if (!z || !ye || z === this.computed) return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== z) r = this.activeLink = new af(z, this), z.deps ? (r.prevDep = z.depsTail, z.depsTail.nextDep = r, z.depsTail = r) : z.deps = z.depsTail = r, hs(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const n = r.nextDep;
      n.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = n), r.prevDep = z.depsTail, r.nextDep = void 0, z.depsTail.nextDep = r, z.depsTail = r, z.deps === r && (z.deps = n);
    }
    return r;
  }
  trigger(t) {
    this.version++, qt++, this.notify(t);
  }
  notify(t) {
    $n();
    try {
      for (let r = this.subs; r; r = r.prevSub) r.sub.notify() && r.sub.dep.notify();
    } finally {
      Vn();
    }
  }
}
function hs(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep) hs(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const un = /* @__PURE__ */ new WeakMap(), st = Symbol(""), cn = Symbol(""), Kt = Symbol("");
function se(e, t, r) {
  if (ye && z) {
    let n = un.get(e);
    n || un.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(r);
    i || (n.set(r, i = new qn()), i.map = n, i.key = r), i.track();
  }
}
function He(e, t, r, n, i, o) {
  const s = un.get(e);
  if (!s) {
    qt++;
    return;
  }
  const a = (u) => {
    u && u.trigger();
  };
  if ($n(), t === "clear") s.forEach(a);
  else {
    const u = F(e), l = u && Hn(r);
    if (u && r === "length") {
      const c = Number(n);
      s.forEach((d, h) => {
        (h === "length" || h === Kt || !wt(h) && h >= c) && a(d);
      });
    } else switch ((r !== void 0 || s.has(void 0)) && a(s.get(r)), l && a(s.get(Kt)), t) {
      case "add":
        u ? l && a(s.get("length")) : (a(s.get(st)), Lt(e) && a(s.get(cn)));
        break;
      case "delete":
        u || (a(s.get(st)), Lt(e) && a(s.get(cn)));
        break;
      case "set":
        Lt(e) && a(s.get(st));
        break;
    }
  }
  Vn();
}
function ft(e) {
  const t = V(e);
  return t === e ? t : (se(t, "iterate", Kt), Ee(e) ? t : t.map(ke));
}
function Kn(e) {
  return se(e = V(e), "iterate", Kt), e;
}
function Ke(e, t) {
  return Ze(e) ? ht(e) ? Gt(ke(t)) : Gt(t) : ke(t);
}
const uf = { __proto__: null, [Symbol.iterator]() {
  return kr(this, Symbol.iterator, (e) => Ke(this, e));
}, concat(...e) {
  return ft(this).concat(...e.map((t) => F(t) ? ft(t) : t));
}, entries() {
  return kr(this, "entries", (e) => (e[1] = Ke(this, e[1]), e));
}, every(e, t) {
  return Ue(this, "every", e, t, void 0, arguments);
}, filter(e, t) {
  return Ue(this, "filter", e, t, (r) => r.map((n) => Ke(this, n)), arguments);
}, find(e, t) {
  return Ue(this, "find", e, t, (r) => Ke(this, r), arguments);
}, findIndex(e, t) {
  return Ue(this, "findIndex", e, t, void 0, arguments);
}, findLast(e, t) {
  return Ue(this, "findLast", e, t, (r) => Ke(this, r), arguments);
}, findLastIndex(e, t) {
  return Ue(this, "findLastIndex", e, t, void 0, arguments);
}, forEach(e, t) {
  return Ue(this, "forEach", e, t, void 0, arguments);
}, includes(...e) {
  return qr(this, "includes", e);
}, indexOf(...e) {
  return qr(this, "indexOf", e);
}, join(e) {
  return ft(this).join(e);
}, lastIndexOf(...e) {
  return qr(this, "lastIndexOf", e);
}, map(e, t) {
  return Ue(this, "map", e, t, void 0, arguments);
}, pop() {
  return At(this, "pop");
}, push(...e) {
  return At(this, "push", e);
}, reduce(e, ...t) {
  return Mi(this, "reduce", e, t);
}, reduceRight(e, ...t) {
  return Mi(this, "reduceRight", e, t);
}, shift() {
  return At(this, "shift");
}, some(e, t) {
  return Ue(this, "some", e, t, void 0, arguments);
}, splice(...e) {
  return At(this, "splice", e);
}, toReversed() {
  return ft(this).toReversed();
}, toSorted(e) {
  return ft(this).toSorted(e);
}, toSpliced(...e) {
  return ft(this).toSpliced(...e);
}, unshift(...e) {
  return At(this, "unshift", e);
}, values() {
  return kr(this, "values", (e) => Ke(this, e));
} };
function kr(e, t, r) {
  const n = Kn(e), i = n[t]();
  return n !== e && !Ee(e) && (i._next = i.next, i.next = () => {
    const o = i._next();
    return o.done || (o.value = r(o.value)), o;
  }), i;
}
const cf = Array.prototype;
function Ue(e, t, r, n, i, o) {
  const s = Kn(e), a = s !== e && !Ee(e), u = s[t];
  if (u !== cf[t]) {
    const d = u.apply(e, o);
    return a ? ke(d) : d;
  }
  let l = r;
  s !== e && (a ? l = function(d, h) {
    return r.call(this, Ke(e, d), h, e);
  } : r.length > 2 && (l = function(d, h) {
    return r.call(this, d, h, e);
  }));
  const c = u.call(s, l, n);
  return a && i ? i(c) : c;
}
function Mi(e, t, r, n) {
  const i = Kn(e);
  let o = r;
  return i !== e && (Ee(e) ? r.length > 3 && (o = function(s, a, u) {
    return r.call(this, s, a, u, e);
  }) : o = function(s, a, u) {
    return r.call(this, s, Ke(e, a), u, e);
  }), i[t](o, ...n);
}
function qr(e, t, r) {
  const n = V(e);
  se(n, "iterate", Kt);
  const i = n[t](...r);
  return (i === -1 || i === false) && Yn(r[0]) ? (r[0] = V(r[0]), n[t](...r)) : i;
}
function At(e, t, r = []) {
  $e(), $n();
  const n = V(e)[t].apply(e, r);
  return Vn(), Ve(), n;
}
const lf = jn("__proto__,__v_isRef,__isVue"), vs = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(wt));
function ff(e) {
  wt(e) || (e = String(e));
  const t = V(this);
  return se(t, "has", e), t.hasOwnProperty(e);
}
class gs {
  constructor(t = false, r = false) {
    this._isReadonly = t, this._isShallow = r;
  }
  get(t, r, n) {
    if (r === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, o = this._isShallow;
    if (r === "__v_isReactive") return !i;
    if (r === "__v_isReadonly") return i;
    if (r === "__v_isShallow") return o;
    if (r === "__v_raw") return n === (i ? o ? Ef : ys : o ? bs : ms).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const s = F(t);
    if (!i) {
      let u;
      if (s && (u = uf[r])) return u;
      if (r === "hasOwnProperty") return ff;
    }
    const a = Reflect.get(t, r, ae(t) ? t : n);
    if ((wt(r) ? vs.has(r) : lf(r)) || (i || se(t, "get", r), o)) return a;
    if (ae(a)) {
      const u = s && Hn(r) ? a : a.value;
      return i && Z(u) ? fn(u) : u;
    }
    return Z(a) ? i ? fn(a) : zn(a) : a;
  }
}
class _s extends gs {
  constructor(t = false) {
    super(false, t);
  }
  set(t, r, n, i) {
    let o = t[r];
    const s = F(t) && Hn(r);
    if (!this._isShallow) {
      const l = Ze(o);
      if (!Ee(n) && !Ze(n) && (o = V(o), n = V(n)), !s && ae(o) && !ae(n)) return l || (o.value = n), true;
    }
    const a = s ? Number(r) < t.length : k(t, r), u = Reflect.set(t, r, n, ae(t) ? t : i);
    return t === V(i) && (a ? Xe(n, o) && He(t, "set", r, n) : He(t, "add", r, n)), u;
  }
  deleteProperty(t, r) {
    const n = k(t, r);
    t[r];
    const i = Reflect.deleteProperty(t, r);
    return i && n && He(t, "delete", r, void 0), i;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!wt(r) || !vs.has(r)) && se(t, "has", r), n;
  }
  ownKeys(t) {
    return se(t, "iterate", F(t) ? "length" : st), Reflect.ownKeys(t);
  }
}
class df extends gs {
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
const pf = new _s(), hf = new df(), vf = new _s(true);
const ln = (e) => e, ir = (e) => Reflect.getPrototypeOf(e);
function gf(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, o = V(i), s = Lt(o), a = e === "entries" || e === Symbol.iterator && s, u = e === "keys" && s, l = i[e](...n), c = r ? ln : t ? Gt : ke;
    return !t && se(o, "iterate", u ? cn : st), { next() {
      const { value: d, done: h } = l.next();
      return h ? { value: d, done: h } : { value: a ? [c(d[0]), c(d[1])] : c(d), done: h };
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
function _f(e, t) {
  const r = { get(i) {
    const o = this.__v_raw, s = V(o), a = V(i);
    e || (Xe(i, a) && se(s, "get", i), se(s, "get", a));
    const { has: u } = ir(s), l = t ? ln : e ? Gt : ke;
    if (u.call(s, i)) return l(o.get(i));
    if (u.call(s, a)) return l(o.get(a));
    o !== s && o.get(i);
  }, get size() {
    const i = this.__v_raw;
    return !e && se(V(i), "iterate", st), i.size;
  }, has(i) {
    const o = this.__v_raw, s = V(o), a = V(i);
    return e || (Xe(i, a) && se(s, "has", i), se(s, "has", a)), i === a ? o.has(i) : o.has(i) || o.has(a);
  }, forEach(i, o) {
    const s = this, a = s.__v_raw, u = V(a), l = t ? ln : e ? Gt : ke;
    return !e && se(u, "iterate", st), a.forEach((c, d) => i.call(o, l(c), l(d), s));
  } };
  return ue(r, e ? { add: or("add"), set: or("set"), delete: or("delete"), clear: or("clear") } : { add(i) {
    !t && !Ee(i) && !Ze(i) && (i = V(i));
    const o = V(this);
    return ir(o).has.call(o, i) || (o.add(i), He(o, "add", i, i)), this;
  }, set(i, o) {
    !t && !Ee(o) && !Ze(o) && (o = V(o));
    const s = V(this), { has: a, get: u } = ir(s);
    let l = a.call(s, i);
    l || (i = V(i), l = a.call(s, i));
    const c = u.call(s, i);
    return s.set(i, o), l ? Xe(o, c) && He(s, "set", i, o) : He(s, "add", i, o), this;
  }, delete(i) {
    const o = V(this), { has: s, get: a } = ir(o);
    let u = s.call(o, i);
    u || (i = V(i), u = s.call(o, i)), a && a.call(o, i);
    const l = o.delete(i);
    return u && He(o, "delete", i, void 0), l;
  }, clear() {
    const i = V(this), o = i.size !== 0, s = i.clear();
    return o && He(i, "clear", void 0, void 0), s;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    r[i] = gf(i, e, t);
  }), r;
}
function Gn(e, t) {
  const r = _f(e, t);
  return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(k(r, i) && i in n ? r : n, i, o);
}
const mf = { get: Gn(false, false) }, bf = { get: Gn(false, true) }, yf = { get: Gn(true, false) };
const ms = /* @__PURE__ */ new WeakMap(), bs = /* @__PURE__ */ new WeakMap(), ys = /* @__PURE__ */ new WeakMap(), Ef = /* @__PURE__ */ new WeakMap();
function Sf(e) {
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
function wf(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Sf(Kl(e));
}
function zn(e) {
  return Ze(e) ? e : Jn(e, false, pf, mf, ms);
}
function xf(e) {
  return Jn(e, false, vf, bf, bs);
}
function fn(e) {
  return Jn(e, true, hf, yf, ys);
}
function Jn(e, t, r, n, i) {
  if (!Z(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = wf(e);
  if (o === 0) return e;
  const s = i.get(e);
  if (s) return s;
  const a = new Proxy(e, o === 2 ? n : r);
  return i.set(e, a), a;
}
function ht(e) {
  return Ze(e) ? ht(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ze(e) {
  return !!(e && e.__v_isReadonly);
}
function Ee(e) {
  return !!(e && e.__v_isShallow);
}
function Yn(e) {
  return e ? !!e.__v_raw : false;
}
function V(e) {
  const t = e && e.__v_raw;
  return t ? V(t) : e;
}
function Of(e) {
  return !k(e, "__v_skip") && Object.isExtensible(e) && is(e, "__v_skip", true), e;
}
const ke = (e) => Z(e) ? zn(e) : e, Gt = (e) => Z(e) ? fn(e) : e;
function ae(e) {
  return e ? e.__v_isRef === true : false;
}
function Tf(e) {
  return Pf(e, false);
}
function Pf(e, t) {
  return ae(e) ? e : new Rf(e, t);
}
class Rf {
  constructor(t, r) {
    this.dep = new qn(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = r ? t : V(t), this._value = r ? t : ke(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, n = this.__v_isShallow || Ee(t) || Ze(t);
    t = n ? t : V(t), Xe(t, r) && (this._rawValue = t, this._value = n ? t : ke(t), this.dep.trigger());
  }
}
function Es(e) {
  return ae(e) ? e.value : e;
}
const Cf = { get: (e, t, r) => t === "__v_raw" ? e : Es(Reflect.get(e, t, r)), set: (e, t, r, n) => {
  const i = e[t];
  return ae(i) && !ae(r) ? (i.value = r, true) : Reflect.set(e, t, r, n);
} };
function Ss(e) {
  return ht(e) ? e : new Proxy(e, Cf);
}
class If {
  constructor(t, r, n) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new qn(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && z !== this) return cs(this, true), true;
  }
  get value() {
    const t = this.dep.track();
    return ds(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Af(e, t, r = false) {
  let n, i;
  return U(e) ? n = e : (n = e.get, i = e.set), new If(n, i, r);
}
const sr = {}, gr = /* @__PURE__ */ new WeakMap();
let ot;
function Mf(e, t = false, r = ot) {
  if (r) {
    let n = gr.get(r);
    n || gr.set(r, n = []), n.push(e);
  }
}
function Df(e, t, r = J) {
  const { immediate: n, deep: i, once: o, scheduler: s, augmentJob: a, call: u } = r, l = (S) => i ? S : Ee(S) || i === false || i === 0 ? Je(S, 1) : Je(S);
  let c, d, h, g, x = false, T = false;
  if (ae(e) ? (d = () => e.value, x = Ee(e)) : ht(e) ? (d = () => l(e), x = true) : F(e) ? (T = true, x = e.some((S) => ht(S) || Ee(S)), d = () => e.map((S) => {
    if (ae(S)) return S.value;
    if (ht(S)) return l(S);
    if (U(S)) return u ? u(S, 2) : S();
  })) : U(e) ? t ? d = u ? () => u(e, 2) : e : d = () => {
    if (h) {
      $e();
      try {
        h();
      } finally {
        Ve();
      }
    }
    const S = ot;
    ot = c;
    try {
      return u ? u(e, 3, [g]) : e(g);
    } finally {
      ot = S;
    }
  } : d = Ae, t && i) {
    const S = d, H = i === true ? 1 / 0 : i;
    d = () => Je(S(), H);
  }
  const j = ss(), R = () => {
    c.stop(), j && j.active && Fn(j.effects, c);
  };
  if (o && t) {
    const S = t;
    t = (...H) => {
      S(...H), R();
    };
  }
  let I = T ? new Array(e.length).fill(sr) : sr;
  const m = (S) => {
    if (!(!(c.flags & 1) || !c.dirty && !S)) if (t) {
      const H = c.run();
      if (i || x || (T ? H.some((W, re) => Xe(W, I[re])) : Xe(H, I))) {
        h && h();
        const W = ot;
        ot = c;
        try {
          const re = [H, I === sr ? void 0 : T && I[0] === sr ? [] : I, g];
          I = H, u ? u(t, 3, re) : t(...re);
        } finally {
          ot = W;
        }
      }
    } else c.run();
  };
  return a && a(m), c = new as(d), c.scheduler = s ? () => s(m, false) : m, g = (S) => Mf(S, false, c), h = c.onStop = () => {
    const S = gr.get(c);
    if (S) {
      if (u) u(S, 4);
      else for (const H of S) H();
      gr.delete(c);
    }
  }, t ? n ? m(true) : I = c.run() : s ? s(m.bind(null, true), true) : c.run(), R.pause = c.pause.bind(c), R.resume = c.resume.bind(c), R.stop = R, R;
}
function Je(e, t = 1 / 0, r) {
  if (t <= 0 || !Z(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t)) return e;
  if (r.set(e, t), t--, ae(e)) Je(e.value, t, r);
  else if (F(e)) for (let n = 0; n < e.length; n++) Je(e[n], t, r);
  else if (kl(e) || Lt(e)) e.forEach((n) => {
    Je(n, t, r);
  });
  else if (Gl(e)) {
    for (const n in e) Je(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, n) && Je(e[n], t, r);
  }
  return e;
}
function Qt(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    Ar(i, t, r);
  }
}
function De(e, t, r, n) {
  if (U(e)) {
    const i = Qt(e, t, r, n);
    return i && rs(i) && i.catch((o) => {
      Ar(o, t, r);
    }), i;
  }
  if (F(e)) {
    const i = [];
    for (let o = 0; o < e.length; o++) i.push(De(e[o], t, r, n));
    return i;
  }
}
function Ar(e, t, r, n = true) {
  const i = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = t && t.appContext.config || J;
  if (t) {
    let a = t.parent;
    const u = t.proxy, l = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; a; ) {
      const c = a.ec;
      if (c) {
        for (let d = 0; d < c.length; d++) if (c[d](e, u, l) === false) return;
      }
      a = a.parent;
    }
    if (o) {
      $e(), Qt(o, null, 10, [e, u, l]), Ve();
      return;
    }
  }
  Nf(e, r, i, n, s);
}
function Nf(e, t, r, n = true, i = false) {
  if (i) throw e;
  console.error(e);
}
const le = [];
let Pe = -1;
const vt = [];
let Ge = null, dt = 0;
const ws = Promise.resolve();
let _r = null;
function Lf(e) {
  const t = _r || ws;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function jf(e) {
  let t = Pe + 1, r = le.length;
  for (; t < r; ) {
    const n = t + r >>> 1, i = le[n], o = zt(i);
    o < e || o === e && i.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function Xn(e) {
  if (!(e.flags & 1)) {
    const t = zt(e), r = le[le.length - 1];
    !r || !(e.flags & 2) && t >= zt(r) ? le.push(e) : le.splice(jf(t), 0, e), e.flags |= 1, xs();
  }
}
function xs() {
  _r || (_r = ws.then(Ts));
}
function Uf(e) {
  F(e) ? vt.push(...e) : Ge && e.id === -1 ? Ge.splice(dt + 1, 0, e) : e.flags & 1 || (vt.push(e), e.flags |= 1), xs();
}
function Di(e, t, r = Pe + 1) {
  for (; r < le.length; r++) {
    const n = le[r];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      le.splice(r, 1), r--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function Os(e) {
  if (vt.length) {
    const t = [...new Set(vt)].sort((r, n) => zt(r) - zt(n));
    if (vt.length = 0, Ge) {
      Ge.push(...t);
      return;
    }
    for (Ge = t, dt = 0; dt < Ge.length; dt++) {
      const r = Ge[dt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    Ge = null, dt = 0;
  }
}
const zt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ts(e) {
  try {
    for (Pe = 0; Pe < le.length; Pe++) {
      const t = le[Pe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Qt(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Pe < le.length; Pe++) {
      const t = le[Pe];
      t && (t.flags &= -2);
    }
    Pe = -1, le.length = 0, Os(), _r = null, (le.length || vt.length) && Ts();
  }
}
let Ie = null, Ps = null;
function mr(e) {
  const t = Ie;
  return Ie = e, Ps = e && e.type.__scopeId || null, t;
}
function Ff(e, t = Ie, r) {
  if (!t || e._n) return e;
  const n = (...i) => {
    n._d && Vi(-1);
    const o = mr(t);
    let s;
    try {
      s = e(...i);
    } finally {
      mr(o), n._d && Vi(1);
    }
    return s;
  };
  return n._n = true, n._c = true, n._d = true, n;
}
function nt(e, t, r, n) {
  const i = e.dirs, o = t && t.dirs;
  for (let s = 0; s < i.length; s++) {
    const a = i[s];
    o && (a.oldValue = o[s].value);
    let u = a.dir[n];
    u && ($e(), De(u, r, 8, [e.el, a, e, t]), Ve());
  }
}
function Hf(e, t) {
  if (fe) {
    let r = fe.provides;
    const n = fe.parent && fe.parent.provides;
    n === r && (r = fe.provides = Object.create(n)), r[e] = t;
  }
}
function ur(e, t, r = false) {
  const n = Wd();
  if (n || gt) {
    let i = gt ? gt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i) return i[e];
    if (arguments.length > 1) return r && U(t) ? t.call(n && n.proxy) : t;
  }
}
const Bf = Symbol.for("v-scx"), Wf = () => ur(Bf);
function cr(e, t, r) {
  return Rs(e, t, r);
}
function Rs(e, t, r = J) {
  const { immediate: n, deep: i, flush: o, once: s } = r, a = ue({}, r), u = t && n || !t && o !== "post";
  let l;
  if (Yt) {
    if (o === "sync") {
      const g = Wf();
      l = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!u) {
      const g = () => {
      };
      return g.stop = Ae, g.resume = Ae, g.pause = Ae, g;
    }
  }
  const c = fe;
  a.call = (g, x, T) => De(g, c, x, T);
  let d = false;
  o === "post" ? a.scheduler = (g) => {
    me(g, c && c.suspense);
  } : o !== "sync" && (d = true, a.scheduler = (g, x) => {
    x ? g() : Xn(g);
  }), a.augmentJob = (g) => {
    t && (g.flags |= 4), d && (g.flags |= 2, c && (g.id = c.uid, g.i = c));
  };
  const h = Df(e, t, a);
  return Yt && (l ? l.push(h) : u && h()), h;
}
function $f(e, t, r) {
  const n = this.proxy, i = ne(e) ? e.includes(".") ? Cs(n, e) : () => n[e] : e.bind(n, n);
  let o;
  U(t) ? o = t : (o = t.handler, r = t);
  const s = Zt(this), a = Rs(i, o.bind(n), r);
  return s(), a;
}
function Cs(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < r.length && n; i++) n = n[r[i]];
    return n;
  };
}
const Vf = Symbol("_vte"), kf = (e) => e.__isTeleport, qf = Symbol("_leaveCb");
function Qn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Qn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Kf(e, t) {
  return U(e) ? ue({ name: e.name }, t, { setup: e }) : e;
}
function Is(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const br = /* @__PURE__ */ new WeakMap();
function Ht(e, t, r, n, i = false) {
  if (F(e)) {
    e.forEach((x, T) => Ht(x, t && (F(t) ? t[T] : t), r, n, i));
    return;
  }
  if (Bt(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Ht(e, t, r, n.component.subTree);
    return;
  }
  const o = n.shapeFlag & 4 ? ni(n.component) : n.el, s = i ? null : o, { i: a, r: u } = e, l = t && t.r, c = a.refs === J ? a.refs = {} : a.refs, d = a.setupState, h = V(d), g = d === J ? ts : (x) => k(h, x);
  if (l != null && l !== u) {
    if (Ni(t), ne(l)) c[l] = null, g(l) && (d[l] = null);
    else if (ae(l)) {
      l.value = null;
      const x = t;
      x.k && (c[x.k] = null);
    }
  }
  if (U(u)) Qt(u, a, 12, [s, c]);
  else {
    const x = ne(u), T = ae(u);
    if (x || T) {
      const j = () => {
        if (e.f) {
          const R = x ? g(u) ? d[u] : c[u] : u.value;
          if (i) F(R) && Fn(R, o);
          else if (F(R)) R.includes(o) || R.push(o);
          else if (x) c[u] = [o], g(u) && (d[u] = c[u]);
          else {
            const I = [o];
            u.value = I, e.k && (c[e.k] = I);
          }
        } else x ? (c[u] = s, g(u) && (d[u] = s)) : T && (u.value = s, e.k && (c[e.k] = s));
      };
      if (s) {
        const R = () => {
          j(), br.delete(e);
        };
        R.id = -1, br.set(e, R), me(R, r);
      } else Ni(e), j();
    }
  }
}
function Ni(e) {
  const t = br.get(e);
  t && (t.flags |= 8, br.delete(e));
}
Ir().requestIdleCallback;
Ir().cancelIdleCallback;
const Bt = (e) => !!e.type.__asyncLoader, As = (e) => e.type.__isKeepAlive;
function Gf(e, t) {
  Ms(e, "a", t);
}
function zf(e, t) {
  Ms(e, "da", t);
}
function Ms(e, t, r = fe) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = r;
    for (; i; ) {
      if (i.isDeactivated) return;
      i = i.parent;
    }
    return e();
  });
  if (Mr(t, n, r), r) {
    let i = r.parent;
    for (; i && i.parent; ) As(i.parent.vnode) && Jf(n, t, r, i), i = i.parent;
  }
}
function Jf(e, t, r, n) {
  const i = Mr(t, e, n, true);
  Zn(() => {
    Fn(n[t], i);
  }, r);
}
function Mr(e, t, r = fe, n = false) {
  if (r) {
    const i = r[e] || (r[e] = []), o = t.__weh || (t.__weh = (...s) => {
      $e();
      const a = Zt(r), u = De(t, r, e, s);
      return a(), Ve(), u;
    });
    return n ? i.unshift(o) : i.push(o), o;
  }
}
const qe = (e) => (t, r = fe) => {
  (!Yt || e === "sp") && Mr(e, (...n) => t(...n), r);
}, Yf = qe("bm"), Ds = qe("m"), Xf = qe("bu"), Qf = qe("u"), Zf = qe("bum"), Zn = qe("um"), ed = qe("sp"), td = qe("rtg"), rd = qe("rtc");
function nd(e, t = fe) {
  Mr("ec", e, t);
}
const id = Symbol.for("v-ndc"), dn = (e) => e ? ea(e) ? ni(e) : dn(e.parent) : null, Wt = ue(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => dn(e.parent), $root: (e) => dn(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Ls(e), $forceUpdate: (e) => e.f || (e.f = () => {
  Xn(e.update);
}), $nextTick: (e) => e.n || (e.n = Lf.bind(e.proxy)), $watch: (e) => $f.bind(e) }), Kr = (e, t) => e !== J && !e.__isScriptSetup && k(e, t), od = { get({ _: e }, t) {
  if (t === "__v_skip") return true;
  const { ctx: r, setupState: n, data: i, props: o, accessCache: s, type: a, appContext: u } = e;
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
      if (Kr(n, t)) return s[t] = 1, n[t];
      if (i !== J && k(i, t)) return s[t] = 2, i[t];
      if (k(o, t)) return s[t] = 3, o[t];
      if (r !== J && k(r, t)) return s[t] = 4, r[t];
      pn && (s[t] = 0);
    }
  }
  const l = Wt[t];
  let c, d;
  if (l) return t === "$attrs" && se(e.attrs, "get", ""), l(e);
  if ((c = a.__cssModules) && (c = c[t])) return c;
  if (r !== J && k(r, t)) return s[t] = 4, r[t];
  if (d = u.config.globalProperties, k(d, t)) return d[t];
}, set({ _: e }, t, r) {
  const { data: n, setupState: i, ctx: o } = e;
  return Kr(i, t) ? (i[t] = r, true) : n !== J && k(n, t) ? (n[t] = r, true) : k(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (o[t] = r, true);
}, has({ _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: i, props: o, type: s } }, a) {
  let u;
  return !!(r[a] || e !== J && a[0] !== "$" && k(e, a) || Kr(t, a) || k(o, a) || k(n, a) || k(Wt, a) || k(i.config.globalProperties, a) || (u = s.__cssModules) && u[a]);
}, defineProperty(e, t, r) {
  return r.get != null ? e._.accessCache[t] = 0 : k(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
} };
function Li(e) {
  return F(e) ? e.reduce((t, r) => (t[r] = null, t), {}) : e;
}
let pn = true;
function sd(e) {
  const t = Ls(e), r = e.proxy, n = e.ctx;
  pn = false, t.beforeCreate && ji(t.beforeCreate, e, "bc");
  const { data: i, computed: o, methods: s, watch: a, provide: u, inject: l, created: c, beforeMount: d, mounted: h, beforeUpdate: g, updated: x, activated: T, deactivated: j, beforeDestroy: R, beforeUnmount: I, destroyed: m, unmounted: S, render: H, renderTracked: W, renderTriggered: re, errorCaptured: ve, serverPrefetch: Se, expose: Ne, inheritAttrs: tt, components: rt, directives: ct, filters: xt } = t;
  if (l && ad(l, n, null), s) for (const Y in s) {
    const q = s[Y];
    U(q) && (n[Y] = q.bind(r));
  }
  if (i) {
    const Y = i.call(r, r);
    Z(Y) && (e.data = zn(Y));
  }
  if (pn = true, o) for (const Y in o) {
    const q = o[Y], Le = U(q) ? q.bind(r, r) : U(q.get) ? q.get.bind(r, r) : Ae, lt = !U(q) && U(q.set) ? q.set.bind(r) : Ae, je = ra({ get: Le, set: lt });
    Object.defineProperty(n, Y, { enumerable: true, configurable: true, get: () => je.value, set: ($) => je.value = $ });
  }
  if (a) for (const Y in a) Ns(a[Y], n, r, Y);
  if (u) {
    const Y = U(u) ? u.call(r) : u;
    Reflect.ownKeys(Y).forEach((q) => {
      Hf(q, Y[q]);
    });
  }
  c && ji(c, e, "c");
  function ie(Y, q) {
    F(q) ? q.forEach((Le) => Y(Le.bind(r))) : q && Y(q.bind(r));
  }
  if (ie(Yf, d), ie(Ds, h), ie(Xf, g), ie(Qf, x), ie(Gf, T), ie(zf, j), ie(nd, ve), ie(rd, W), ie(td, re), ie(Zf, I), ie(Zn, S), ie(ed, Se), F(Ne)) if (Ne.length) {
    const Y = e.exposed || (e.exposed = {});
    Ne.forEach((q) => {
      Object.defineProperty(Y, q, { get: () => r[q], set: (Le) => r[q] = Le, enumerable: true });
    });
  } else e.exposed || (e.exposed = {});
  H && e.render === Ae && (e.render = H), tt != null && (e.inheritAttrs = tt), rt && (e.components = rt), ct && (e.directives = ct), Se && Is(e);
}
function ad(e, t, r = Ae) {
  F(e) && (e = hn(e));
  for (const n in e) {
    const i = e[n];
    let o;
    Z(i) ? "default" in i ? o = ur(i.from || n, i.default, true) : o = ur(i.from || n) : o = ur(i), ae(o) ? Object.defineProperty(t, n, { enumerable: true, configurable: true, get: () => o.value, set: (s) => o.value = s }) : t[n] = o;
  }
}
function ji(e, t, r) {
  De(F(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function Ns(e, t, r, n) {
  let i = n.includes(".") ? Cs(r, n) : () => r[n];
  if (ne(e)) {
    const o = t[e];
    U(o) && cr(i, o);
  } else if (U(e)) cr(i, e.bind(r));
  else if (Z(e)) if (F(e)) e.forEach((o) => Ns(o, t, r, n));
  else {
    const o = U(e.handler) ? e.handler.bind(r) : t[e.handler];
    U(o) && cr(i, o, e);
  }
}
function Ls(e) {
  const t = e.type, { mixins: r, extends: n } = t, { mixins: i, optionsCache: o, config: { optionMergeStrategies: s } } = e.appContext, a = o.get(t);
  let u;
  return a ? u = a : !i.length && !r && !n ? u = t : (u = {}, i.length && i.forEach((l) => yr(u, l, s, true)), yr(u, t, s)), Z(t) && o.set(t, u), u;
}
function yr(e, t, r, n = false) {
  const { mixins: i, extends: o } = t;
  o && yr(e, o, r, true), i && i.forEach((s) => yr(e, s, r, true));
  for (const s in t) if (!(n && s === "expose")) {
    const a = ud[s] || r && r[s];
    e[s] = a ? a(e[s], t[s]) : t[s];
  }
  return e;
}
const ud = { data: Ui, props: Fi, emits: Fi, methods: Dt, computed: Dt, beforeCreate: ce, created: ce, beforeMount: ce, mounted: ce, beforeUpdate: ce, updated: ce, beforeDestroy: ce, beforeUnmount: ce, destroyed: ce, unmounted: ce, activated: ce, deactivated: ce, errorCaptured: ce, serverPrefetch: ce, components: Dt, directives: Dt, watch: ld, provide: Ui, inject: cd };
function Ui(e, t) {
  return t ? e ? function() {
    return ue(U(e) ? e.call(this, this) : e, U(t) ? t.call(this, this) : t);
  } : t : e;
}
function cd(e, t) {
  return Dt(hn(e), hn(t));
}
function hn(e) {
  if (F(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
    return t;
  }
  return e;
}
function ce(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Dt(e, t) {
  return e ? ue(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Fi(e, t) {
  return e ? F(e) && F(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ue(/* @__PURE__ */ Object.create(null), Li(e), Li(t ?? {})) : t;
}
function ld(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = ue(/* @__PURE__ */ Object.create(null), e);
  for (const n in t) r[n] = ce(e[n], t[n]);
  return r;
}
function js() {
  return { app: null, config: { isNativeTag: ts, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let fd = 0;
function dd(e, t) {
  return function(n, i = null) {
    U(n) || (n = ue({}, n)), i != null && !Z(i) && (i = null);
    const o = js(), s = /* @__PURE__ */ new WeakSet(), a = [];
    let u = false;
    const l = o.app = { _uid: fd++, _component: n, _props: i, _container: null, _context: o, _instance: null, version: Gd, get config() {
      return o.config;
    }, set config(c) {
    }, use(c, ...d) {
      return s.has(c) || (c && U(c.install) ? (s.add(c), c.install(l, ...d)) : U(c) && (s.add(c), c(l, ...d))), l;
    }, mixin(c) {
      return o.mixins.includes(c) || o.mixins.push(c), l;
    }, component(c, d) {
      return d ? (o.components[c] = d, l) : o.components[c];
    }, directive(c, d) {
      return d ? (o.directives[c] = d, l) : o.directives[c];
    }, mount(c, d, h) {
      if (!u) {
        const g = l._ceVNode || Be(n, i);
        return g.appContext = o, h === true ? h = "svg" : h === false && (h = void 0), e(g, c, h), u = true, l._container = c, c.__vue_app__ = l, ni(g.component);
      }
    }, onUnmount(c) {
      a.push(c);
    }, unmount() {
      u && (De(a, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
    }, provide(c, d) {
      return o.provides[c] = d, l;
    }, runWithContext(c) {
      const d = gt;
      gt = l;
      try {
        return c();
      } finally {
        gt = d;
      }
    } };
    return l;
  };
}
let gt = null;
const pd = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Qe(t)}Modifiers`] || e[`${ut(t)}Modifiers`];
function hd(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || J;
  let i = r;
  const o = t.startsWith("update:"), s = o && pd(n, t.slice(7));
  s && (s.trim && (i = r.map((c) => ne(c) ? c.trim() : c)), s.number && (i = r.map(Yl)));
  let a, u = n[a = Wr(t)] || n[a = Wr(Qe(t))];
  !u && o && (u = n[a = Wr(ut(t))]), u && De(u, e, 6, i);
  const l = n[a + "Once"];
  if (l) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    e.emitted[a] = true, De(l, e, 6, i);
  }
}
const vd = /* @__PURE__ */ new WeakMap();
function Us(e, t, r = false) {
  const n = r ? vd : t.emitsCache, i = n.get(e);
  if (i !== void 0) return i;
  const o = e.emits;
  let s = {}, a = false;
  if (!U(e)) {
    const u = (l) => {
      const c = Us(l, t, true);
      c && (a = true, ue(s, c));
    };
    !r && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !o && !a ? (Z(e) && n.set(e, null), null) : (F(o) ? o.forEach((u) => s[u] = null) : ue(s, o), Z(e) && n.set(e, s), s);
}
function Dr(e, t) {
  return !e || !Pr(t) ? false : (t = t.slice(2).replace(/Once$/, ""), k(e, t[0].toLowerCase() + t.slice(1)) || k(e, ut(t)) || k(e, t));
}
function Hi(e) {
  const { type: t, vnode: r, proxy: n, withProxy: i, propsOptions: [o], slots: s, attrs: a, emit: u, render: l, renderCache: c, props: d, data: h, setupState: g, ctx: x, inheritAttrs: T } = e, j = mr(e);
  let R, I;
  try {
    if (r.shapeFlag & 4) {
      const S = i || n, H = S;
      R = Ce(l.call(H, S, c, d, g, h, x)), I = a;
    } else {
      const S = t;
      R = Ce(S.length > 1 ? S(d, { attrs: a, slots: s, emit: u }) : S(d, null)), I = t.props ? a : gd(a);
    }
  } catch (S) {
    $t.length = 0, Ar(S, e, 1), R = Be(et);
  }
  let m = R;
  if (I && T !== false) {
    const S = Object.keys(I), { shapeFlag: H } = m;
    S.length && H & 7 && (o && S.some(Un) && (I = _d(I, o)), m = Et(m, I, false, true));
  }
  return r.dirs && (m = Et(m, null, false, true), m.dirs = m.dirs ? m.dirs.concat(r.dirs) : r.dirs), r.transition && Qn(m, r.transition), R = m, mr(j), R;
}
const gd = (e) => {
  let t;
  for (const r in e) (r === "class" || r === "style" || Pr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, _d = (e, t) => {
  const r = {};
  for (const n in e) (!Un(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function md(e, t, r) {
  const { props: n, children: i, component: o } = e, { props: s, children: a, patchFlag: u } = t, l = o.emitsOptions;
  if (t.dirs || t.transition) return true;
  if (r && u >= 0) {
    if (u & 1024) return true;
    if (u & 16) return n ? Bi(n, s, l) : !!s;
    if (u & 8) {
      const c = t.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const h = c[d];
        if (s[h] !== n[h] && !Dr(l, h)) return true;
      }
    }
  } else return (i || a) && (!a || !a.$stable) ? true : n === s ? false : n ? s ? Bi(n, s, l) : true : !!s;
  return false;
}
function Bi(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return true;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (t[o] !== e[o] && !Dr(r, o)) return true;
  }
  return false;
}
function bd({ vnode: e, parent: t }, r) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e) (e = t.vnode).el = r, t = t.parent;
    else break;
  }
}
const Fs = {}, Hs = () => Object.create(Fs), Bs = (e) => Object.getPrototypeOf(e) === Fs;
function yd(e, t, r, n = false) {
  const i = {}, o = Hs();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ws(e, t, i, o);
  for (const s in e.propsOptions[0]) s in i || (i[s] = void 0);
  r ? e.props = n ? i : xf(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function Ed(e, t, r, n) {
  const { props: i, attrs: o, vnode: { patchFlag: s } } = e, a = V(i), [u] = e.propsOptions;
  let l = false;
  if ((n || s > 0) && !(s & 16)) {
    if (s & 8) {
      const c = e.vnode.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        let h = c[d];
        if (Dr(e.emitsOptions, h)) continue;
        const g = t[h];
        if (u) if (k(o, h)) g !== o[h] && (o[h] = g, l = true);
        else {
          const x = Qe(h);
          i[x] = vn(u, a, x, g, e, false);
        }
        else g !== o[h] && (o[h] = g, l = true);
      }
    }
  } else {
    Ws(e, t, i, o) && (l = true);
    let c;
    for (const d in a) (!t || !k(t, d) && ((c = ut(d)) === d || !k(t, c))) && (u ? r && (r[d] !== void 0 || r[c] !== void 0) && (i[d] = vn(u, a, d, void 0, e, true)) : delete i[d]);
    if (o !== a) for (const d in o) (!t || !k(t, d)) && (delete o[d], l = true);
  }
  l && He(e.attrs, "set", "");
}
function Ws(e, t, r, n) {
  const [i, o] = e.propsOptions;
  let s = false, a;
  if (t) for (let u in t) {
    if (jt(u)) continue;
    const l = t[u];
    let c;
    i && k(i, c = Qe(u)) ? !o || !o.includes(c) ? r[c] = l : (a || (a = {}))[c] = l : Dr(e.emitsOptions, u) || (!(u in n) || l !== n[u]) && (n[u] = l, s = true);
  }
  if (o) {
    const u = V(r), l = a || J;
    for (let c = 0; c < o.length; c++) {
      const d = o[c];
      r[d] = vn(i, u, d, l[d], e, !k(l, d));
    }
  }
  return s;
}
function vn(e, t, r, n, i, o) {
  const s = e[r];
  if (s != null) {
    const a = k(s, "default");
    if (a && n === void 0) {
      const u = s.default;
      if (s.type !== Function && !s.skipFactory && U(u)) {
        const { propsDefaults: l } = i;
        if (r in l) n = l[r];
        else {
          const c = Zt(i);
          n = l[r] = u.call(null, t), c();
        }
      } else n = u;
      i.ce && i.ce._setProp(r, n);
    }
    s[0] && (o && !a ? n = false : s[1] && (n === "" || n === ut(r)) && (n = true));
  }
  return n;
}
const Sd = /* @__PURE__ */ new WeakMap();
function $s(e, t, r = false) {
  const n = r ? Sd : t.propsCache, i = n.get(e);
  if (i) return i;
  const o = e.props, s = {}, a = [];
  let u = false;
  if (!U(e)) {
    const c = (d) => {
      u = true;
      const [h, g] = $s(d, t, true);
      ue(s, h), g && a.push(...g);
    };
    !r && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !u) return Z(e) && n.set(e, pt), pt;
  if (F(o)) for (let c = 0; c < o.length; c++) {
    const d = Qe(o[c]);
    Wi(d) && (s[d] = J);
  }
  else if (o) for (const c in o) {
    const d = Qe(c);
    if (Wi(d)) {
      const h = o[c], g = s[d] = F(h) || U(h) ? { type: h } : ue({}, h), x = g.type;
      let T = false, j = true;
      if (F(x)) for (let R = 0; R < x.length; ++R) {
        const I = x[R], m = U(I) && I.name;
        if (m === "Boolean") {
          T = true;
          break;
        } else m === "String" && (j = false);
      }
      else T = U(x) && x.name === "Boolean";
      g[0] = T, g[1] = j, (T || k(g, "default")) && a.push(d);
    }
  }
  const l = [s, a];
  return Z(e) && n.set(e, l), l;
}
function Wi(e) {
  return e[0] !== "$" && !jt(e);
}
const ei = (e) => e === "_" || e === "_ctx" || e === "$stable", ti = (e) => F(e) ? e.map(Ce) : [Ce(e)], wd = (e, t, r) => {
  if (t._n) return t;
  const n = Ff((...i) => ti(t(...i)), r);
  return n._c = false, n;
}, Vs = (e, t, r) => {
  const n = e._ctx;
  for (const i in e) {
    if (ei(i)) continue;
    const o = e[i];
    if (U(o)) t[i] = wd(i, o, n);
    else if (o != null) {
      const s = ti(o);
      t[i] = () => s;
    }
  }
}, ks = (e, t) => {
  const r = ti(t);
  e.slots.default = () => r;
}, qs = (e, t, r) => {
  for (const n in t) (r || !ei(n)) && (e[n] = t[n]);
}, xd = (e, t, r) => {
  const n = e.slots = Hs();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (qs(n, t, r), r && is(n, "_", i, true)) : Vs(t, n);
  } else t && ks(e, t);
}, Od = (e, t, r) => {
  const { vnode: n, slots: i } = e;
  let o = true, s = J;
  if (n.shapeFlag & 32) {
    const a = t._;
    a ? r && a === 1 ? o = false : qs(i, t, r) : (o = !t.$stable, Vs(t, i)), s = t;
  } else t && (ks(e, t), s = { default: 1 });
  if (o) for (const a in i) !ei(a) && s[a] == null && delete i[a];
}, me = Id;
function Td(e) {
  return Pd(e);
}
function Pd(e, t) {
  const r = Ir();
  r.__VUE__ = true;
  const { insert: n, remove: i, patchProp: o, createElement: s, createText: a, createComment: u, setText: l, setElementText: c, parentNode: d, nextSibling: h, setScopeId: g = Ae, insertStaticContent: x } = e, T = (f, p, v, E = null, _ = null, b = null, P = void 0, O = null, w = !!p.dynamicChildren) => {
    if (f === p) return;
    f && !Mt(f, p) && (E = tr(f), $(f, _, b, true), f = null), p.patchFlag === -2 && (w = false, p.dynamicChildren = null);
    const { type: y, ref: D, shapeFlag: C } = p;
    switch (y) {
      case Nr:
        j(f, p, v, E);
        break;
      case et:
        R(f, p, v, E);
        break;
      case zr:
        f == null && I(p, v, E, P);
        break;
      case Re:
        rt(f, p, v, E, _, b, P, O, w);
        break;
      default:
        C & 1 ? H(f, p, v, E, _, b, P, O, w) : C & 6 ? ct(f, p, v, E, _, b, P, O, w) : (C & 64 || C & 128) && y.process(f, p, v, E, _, b, P, O, w, Pt);
    }
    D != null && _ ? Ht(D, f && f.ref, b, p || f, !p) : D == null && f && f.ref != null && Ht(f.ref, null, b, f, true);
  }, j = (f, p, v, E) => {
    if (f == null) n(p.el = a(p.children), v, E);
    else {
      const _ = p.el = f.el;
      p.children !== f.children && l(_, p.children);
    }
  }, R = (f, p, v, E) => {
    f == null ? n(p.el = u(p.children || ""), v, E) : p.el = f.el;
  }, I = (f, p, v, E) => {
    [f.el, f.anchor] = x(f.children, p, v, E, f.el, f.anchor);
  }, m = ({ el: f, anchor: p }, v, E) => {
    let _;
    for (; f && f !== p; ) _ = h(f), n(f, v, E), f = _;
    n(p, v, E);
  }, S = ({ el: f, anchor: p }) => {
    let v;
    for (; f && f !== p; ) v = h(f), i(f), f = v;
    i(p);
  }, H = (f, p, v, E, _, b, P, O, w) => {
    if (p.type === "svg" ? P = "svg" : p.type === "math" && (P = "mathml"), f == null) W(p, v, E, _, b, P, O, w);
    else {
      const y = f.el && f.el._isVueCE ? f.el : null;
      try {
        y && y._beginPatch(), Se(f, p, _, b, P, O, w);
      } finally {
        y && y._endPatch();
      }
    }
  }, W = (f, p, v, E, _, b, P, O) => {
    let w, y;
    const { props: D, shapeFlag: C, transition: M, dirs: L } = f;
    if (w = f.el = s(f.type, b, D && D.is, D), C & 8 ? c(w, f.children) : C & 16 && ve(f.children, w, null, E, _, Gr(f, b), P, O), L && nt(f, null, E, "created"), re(w, f, f.scopeId, P, E), D) {
      for (const G in D) G !== "value" && !jt(G) && o(w, G, null, D[G], b, E);
      "value" in D && o(w, "value", null, D.value, b), (y = D.onVnodeBeforeMount) && Te(y, E, f);
    }
    L && nt(f, null, E, "beforeMount");
    const B = Rd(_, M);
    B && M.beforeEnter(w), n(w, p, v), ((y = D && D.onVnodeMounted) || B || L) && me(() => {
      y && Te(y, E, f), B && M.enter(w), L && nt(f, null, E, "mounted");
    }, _);
  }, re = (f, p, v, E, _) => {
    if (v && g(f, v), E) for (let b = 0; b < E.length; b++) g(f, E[b]);
    if (_) {
      let b = _.subTree;
      if (p === b || Js(b.type) && (b.ssContent === p || b.ssFallback === p)) {
        const P = _.vnode;
        re(f, P, P.scopeId, P.slotScopeIds, _.parent);
      }
    }
  }, ve = (f, p, v, E, _, b, P, O, w = 0) => {
    for (let y = w; y < f.length; y++) {
      const D = f[y] = O ? ze(f[y]) : Ce(f[y]);
      T(null, D, p, v, E, _, b, P, O);
    }
  }, Se = (f, p, v, E, _, b, P) => {
    const O = p.el = f.el;
    let { patchFlag: w, dynamicChildren: y, dirs: D } = p;
    w |= f.patchFlag & 16;
    const C = f.props || J, M = p.props || J;
    let L;
    if (v && it(v, false), (L = M.onVnodeBeforeUpdate) && Te(L, v, p, f), D && nt(p, f, v, "beforeUpdate"), v && it(v, true), (C.innerHTML && M.innerHTML == null || C.textContent && M.textContent == null) && c(O, ""), y ? Ne(f.dynamicChildren, y, O, v, E, Gr(p, _), b) : P || q(f, p, O, null, v, E, Gr(p, _), b, false), w > 0) {
      if (w & 16) tt(O, C, M, v, _);
      else if (w & 2 && C.class !== M.class && o(O, "class", null, M.class, _), w & 4 && o(O, "style", C.style, M.style, _), w & 8) {
        const B = p.dynamicProps;
        for (let G = 0; G < B.length; G++) {
          const K = B[G], de = C[K], pe = M[K];
          (pe !== de || K === "value") && o(O, K, de, pe, _, v);
        }
      }
      w & 1 && f.children !== p.children && c(O, p.children);
    } else !P && y == null && tt(O, C, M, v, _);
    ((L = M.onVnodeUpdated) || D) && me(() => {
      L && Te(L, v, p, f), D && nt(p, f, v, "updated");
    }, E);
  }, Ne = (f, p, v, E, _, b, P) => {
    for (let O = 0; O < p.length; O++) {
      const w = f[O], y = p[O], D = w.el && (w.type === Re || !Mt(w, y) || w.shapeFlag & 198) ? d(w.el) : v;
      T(w, y, D, null, E, _, b, P, true);
    }
  }, tt = (f, p, v, E, _) => {
    if (p !== v) {
      if (p !== J) for (const b in p) !jt(b) && !(b in v) && o(f, b, p[b], null, _, E);
      for (const b in v) {
        if (jt(b)) continue;
        const P = v[b], O = p[b];
        P !== O && b !== "value" && o(f, b, O, P, _, E);
      }
      "value" in v && o(f, "value", p.value, v.value, _);
    }
  }, rt = (f, p, v, E, _, b, P, O, w) => {
    const y = p.el = f ? f.el : a(""), D = p.anchor = f ? f.anchor : a("");
    let { patchFlag: C, dynamicChildren: M, slotScopeIds: L } = p;
    L && (O = O ? O.concat(L) : L), f == null ? (n(y, v, E), n(D, v, E), ve(p.children || [], v, D, _, b, P, O, w)) : C > 0 && C & 64 && M && f.dynamicChildren && f.dynamicChildren.length === M.length ? (Ne(f.dynamicChildren, M, v, _, b, P, O), (p.key != null || _ && p === _.subTree) && Ks(f, p, true)) : q(f, p, v, D, _, b, P, O, w);
  }, ct = (f, p, v, E, _, b, P, O, w) => {
    p.slotScopeIds = O, f == null ? p.shapeFlag & 512 ? _.ctx.activate(p, v, E, P, w) : xt(p, v, E, _, b, P, w) : er(f, p, w);
  }, xt = (f, p, v, E, _, b, P) => {
    const O = f.component = Bd(f, E, _);
    if (As(f) && (O.ctx.renderer = Pt), $d(O, false, P), O.asyncDep) {
      if (_ && _.registerDep(O, ie, P), !f.el) {
        const w = O.subTree = Be(et);
        R(null, w, p, v), f.placeholder = w.el;
      }
    } else ie(O, f, p, v, _, b, P);
  }, er = (f, p, v) => {
    const E = p.component = f.component;
    if (md(f, p, v)) if (E.asyncDep && !E.asyncResolved) {
      Y(E, p, v);
      return;
    } else E.next = p, E.update();
    else p.el = f.el, E.vnode = p;
  }, ie = (f, p, v, E, _, b, P) => {
    const O = () => {
      if (f.isMounted) {
        let { next: C, bu: M, u: L, parent: B, vnode: G } = f;
        {
          const xe = Gs(f);
          if (xe) {
            C && (C.el = G.el, Y(f, C, P)), xe.asyncDep.then(() => {
              f.isUnmounted || O();
            });
            return;
          }
        }
        let K = C, de;
        it(f, false), C ? (C.el = G.el, Y(f, C, P)) : C = G, M && $r(M), (de = C.props && C.props.onVnodeBeforeUpdate) && Te(de, B, C, G), it(f, true);
        const pe = Hi(f), we = f.subTree;
        f.subTree = pe, T(we, pe, d(we.el), tr(we), f, _, b), C.el = pe.el, K === null && bd(f, pe.el), L && me(L, _), (de = C.props && C.props.onVnodeUpdated) && me(() => Te(de, B, C, G), _);
      } else {
        let C;
        const { el: M, props: L } = p, { bm: B, m: G, parent: K, root: de, type: pe } = f, we = Bt(p);
        it(f, false), B && $r(B), !we && (C = L && L.onVnodeBeforeMount) && Te(C, K, p), it(f, true);
        {
          de.ce && de.ce._def.shadowRoot !== false && de.ce._injectChildStyle(pe);
          const xe = f.subTree = Hi(f);
          T(null, xe, v, E, f, _, b), p.el = xe.el;
        }
        if (G && me(G, _), !we && (C = L && L.onVnodeMounted)) {
          const xe = p;
          me(() => Te(C, K, xe), _);
        }
        (p.shapeFlag & 256 || K && Bt(K.vnode) && K.vnode.shapeFlag & 256) && f.a && me(f.a, _), f.isMounted = true, p = v = E = null;
      }
    };
    f.scope.on();
    const w = f.effect = new as(O);
    f.scope.off();
    const y = f.update = w.run.bind(w), D = f.job = w.runIfDirty.bind(w);
    D.i = f, D.id = f.uid, w.scheduler = () => Xn(D), it(f, true), y();
  }, Y = (f, p, v) => {
    p.component = f;
    const E = f.vnode.props;
    f.vnode = p, f.next = null, Ed(f, p.props, E, v), Od(f, p.children, v), $e(), Di(f), Ve();
  }, q = (f, p, v, E, _, b, P, O, w = false) => {
    const y = f && f.children, D = f ? f.shapeFlag : 0, C = p.children, { patchFlag: M, shapeFlag: L } = p;
    if (M > 0) {
      if (M & 128) {
        lt(y, C, v, E, _, b, P, O, w);
        return;
      } else if (M & 256) {
        Le(y, C, v, E, _, b, P, O, w);
        return;
      }
    }
    L & 8 ? (D & 16 && Tt(y, _, b), C !== y && c(v, C)) : D & 16 ? L & 16 ? lt(y, C, v, E, _, b, P, O, w) : Tt(y, _, b, true) : (D & 8 && c(v, ""), L & 16 && ve(C, v, E, _, b, P, O, w));
  }, Le = (f, p, v, E, _, b, P, O, w) => {
    f = f || pt, p = p || pt;
    const y = f.length, D = p.length, C = Math.min(y, D);
    let M;
    for (M = 0; M < C; M++) {
      const L = p[M] = w ? ze(p[M]) : Ce(p[M]);
      T(f[M], L, v, null, _, b, P, O, w);
    }
    y > D ? Tt(f, _, b, true, false, C) : ve(p, v, E, _, b, P, O, w, C);
  }, lt = (f, p, v, E, _, b, P, O, w) => {
    let y = 0;
    const D = p.length;
    let C = f.length - 1, M = D - 1;
    for (; y <= C && y <= M; ) {
      const L = f[y], B = p[y] = w ? ze(p[y]) : Ce(p[y]);
      if (Mt(L, B)) T(L, B, v, null, _, b, P, O, w);
      else break;
      y++;
    }
    for (; y <= C && y <= M; ) {
      const L = f[C], B = p[M] = w ? ze(p[M]) : Ce(p[M]);
      if (Mt(L, B)) T(L, B, v, null, _, b, P, O, w);
      else break;
      C--, M--;
    }
    if (y > C) {
      if (y <= M) {
        const L = M + 1, B = L < D ? p[L].el : E;
        for (; y <= M; ) T(null, p[y] = w ? ze(p[y]) : Ce(p[y]), v, B, _, b, P, O, w), y++;
      }
    } else if (y > M) for (; y <= C; ) $(f[y], _, b, true), y++;
    else {
      const L = y, B = y, G = /* @__PURE__ */ new Map();
      for (y = B; y <= M; y++) {
        const _e = p[y] = w ? ze(p[y]) : Ce(p[y]);
        _e.key != null && G.set(_e.key, y);
      }
      let K, de = 0;
      const pe = M - B + 1;
      let we = false, xe = 0;
      const Rt = new Array(pe);
      for (y = 0; y < pe; y++) Rt[y] = 0;
      for (y = L; y <= C; y++) {
        const _e = f[y];
        if (de >= pe) {
          $(_e, _, b, true);
          continue;
        }
        let Oe;
        if (_e.key != null) Oe = G.get(_e.key);
        else for (K = B; K <= M; K++) if (Rt[K - B] === 0 && Mt(_e, p[K])) {
          Oe = K;
          break;
        }
        Oe === void 0 ? $(_e, _, b, true) : (Rt[Oe - B] = y + 1, Oe >= xe ? xe = Oe : we = true, T(_e, p[Oe], v, null, _, b, P, O, w), de++);
      }
      const oi = we ? Cd(Rt) : pt;
      for (K = oi.length - 1, y = pe - 1; y >= 0; y--) {
        const _e = B + y, Oe = p[_e], si = p[_e + 1], ai = _e + 1 < D ? si.el || zs(si) : E;
        Rt[y] === 0 ? T(null, Oe, v, ai, _, b, P, O, w) : we && (K < 0 || y !== oi[K] ? je(Oe, v, ai, 2) : K--);
      }
    }
  }, je = (f, p, v, E, _ = null) => {
    const { el: b, type: P, transition: O, children: w, shapeFlag: y } = f;
    if (y & 6) {
      je(f.component.subTree, p, v, E);
      return;
    }
    if (y & 128) {
      f.suspense.move(p, v, E);
      return;
    }
    if (y & 64) {
      P.move(f, p, v, Pt);
      return;
    }
    if (P === Re) {
      n(b, p, v);
      for (let C = 0; C < w.length; C++) je(w[C], p, v, E);
      n(f.anchor, p, v);
      return;
    }
    if (P === zr) {
      m(f, p, v);
      return;
    }
    if (E !== 2 && y & 1 && O) if (E === 0) O.beforeEnter(b), n(b, p, v), me(() => O.enter(b), _);
    else {
      const { leave: C, delayLeave: M, afterLeave: L } = O, B = () => {
        f.ctx.isUnmounted ? i(b) : n(b, p, v);
      }, G = () => {
        b._isLeaving && b[qf](true), C(b, () => {
          B(), L && L();
        });
      };
      M ? M(b, B, G) : G();
    }
    else n(b, p, v);
  }, $ = (f, p, v, E = false, _ = false) => {
    const { type: b, props: P, ref: O, children: w, dynamicChildren: y, shapeFlag: D, patchFlag: C, dirs: M, cacheIndex: L } = f;
    if (C === -2 && (_ = false), O != null && ($e(), Ht(O, null, v, f, true), Ve()), L != null && (p.renderCache[L] = void 0), D & 256) {
      p.ctx.deactivate(f);
      return;
    }
    const B = D & 1 && M, G = !Bt(f);
    let K;
    if (G && (K = P && P.onVnodeBeforeUnmount) && Te(K, p, f), D & 6) Lr(f.component, v, E);
    else {
      if (D & 128) {
        f.suspense.unmount(v, E);
        return;
      }
      B && nt(f, null, p, "beforeUnmount"), D & 64 ? f.type.remove(f, p, v, Pt, E) : y && !y.hasOnce && (b !== Re || C > 0 && C & 64) ? Tt(y, p, v, false, true) : (b === Re && C & 384 || !_ && D & 16) && Tt(w, p, v), E && ge(f);
    }
    (G && (K = P && P.onVnodeUnmounted) || B) && me(() => {
      K && Te(K, p, f), B && nt(f, null, p, "unmounted");
    }, v);
  }, ge = (f) => {
    const { type: p, el: v, anchor: E, transition: _ } = f;
    if (p === Re) {
      Ot(v, E);
      return;
    }
    if (p === zr) {
      S(f);
      return;
    }
    const b = () => {
      i(v), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (f.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: P, delayLeave: O } = _, w = () => P(v, b);
      O ? O(f.el, b, w) : w();
    } else b();
  }, Ot = (f, p) => {
    let v;
    for (; f !== p; ) v = h(f), i(f), f = v;
    i(p);
  }, Lr = (f, p, v) => {
    const { bum: E, scope: _, job: b, subTree: P, um: O, m: w, a: y } = f;
    $i(w), $i(y), E && $r(E), _.stop(), b && (b.flags |= 8, $(P, f, p, v)), O && me(O, p), me(() => {
      f.isUnmounted = true;
    }, p);
  }, Tt = (f, p, v, E = false, _ = false, b = 0) => {
    for (let P = b; P < f.length; P++) $(f[P], p, v, E, _);
  }, tr = (f) => {
    if (f.shapeFlag & 6) return tr(f.component.subTree);
    if (f.shapeFlag & 128) return f.suspense.next();
    const p = h(f.anchor || f.el), v = p && p[Vf];
    return v ? h(v) : p;
  };
  let jr = false;
  const ii = (f, p, v) => {
    let E;
    f == null ? p._vnode && ($(p._vnode, null, null, true), E = p._vnode.component) : T(p._vnode || null, f, p, null, null, null, v), p._vnode = f, jr || (jr = true, Di(E), Os(), jr = false);
  }, Pt = { p: T, um: $, m: je, r: ge, mt: xt, mc: ve, pc: q, pbc: Ne, n: tr, o: e };
  return { render: ii, hydrate: void 0, createApp: dd(ii) };
}
function Gr({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function it({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Rd(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ks(e, t, r = false) {
  const n = e.children, i = t.children;
  if (F(n) && F(i)) for (let o = 0; o < n.length; o++) {
    const s = n[o];
    let a = i[o];
    a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[o] = ze(i[o]), a.el = s.el), !r && a.patchFlag !== -2 && Ks(s, a)), a.type === Nr && (a.patchFlag !== -1 ? a.el = s.el : a.__elIndex = o + (e.type === Re ? 1 : 0)), a.type === et && !a.el && (a.el = s.el);
  }
}
function Cd(e) {
  const t = e.slice(), r = [0];
  let n, i, o, s, a;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const l = e[n];
    if (l !== 0) {
      if (i = r[r.length - 1], e[i] < l) {
        t[n] = i, r.push(n);
        continue;
      }
      for (o = 0, s = r.length - 1; o < s; ) a = o + s >> 1, e[r[a]] < l ? o = a + 1 : s = a;
      l < e[r[o]] && (o > 0 && (t[n] = r[o - 1]), r[o] = n);
    }
  }
  for (o = r.length, s = r[o - 1]; o-- > 0; ) r[o] = s, s = t[s];
  return r;
}
function Gs(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Gs(t);
}
function $i(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function zs(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? zs(t.subTree) : null;
}
const Js = (e) => e.__isSuspense;
function Id(e, t) {
  t && t.pendingBranch ? F(e) ? t.effects.push(...e) : t.effects.push(e) : Uf(e);
}
const Re = Symbol.for("v-fgt"), Nr = Symbol.for("v-txt"), et = Symbol.for("v-cmt"), zr = Symbol.for("v-stc"), $t = [];
let be = null;
function gn(e = false) {
  $t.push(be = e ? null : []);
}
function Ad() {
  $t.pop(), be = $t[$t.length - 1] || null;
}
let Jt = 1;
function Vi(e, t = false) {
  Jt += e, e < 0 && be && t && (be.hasOnce = true);
}
function Ys(e) {
  return e.dynamicChildren = Jt > 0 ? be || pt : null, Ad(), Jt > 0 && be && be.push(e), e;
}
function ki(e, t, r, n, i, o) {
  return Ys(Zs(e, t, r, n, i, o, true));
}
function Md(e, t, r, n, i) {
  return Ys(Be(e, t, r, n, i, true));
}
function Xs(e) {
  return e ? e.__v_isVNode === true : false;
}
function Mt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Qs = ({ key: e }) => e ?? null, lr = ({ ref: e, ref_key: t, ref_for: r }) => (typeof e == "number" && (e = "" + e), e != null ? ne(e) || ae(e) || U(e) ? { i: Ie, r: e, k: t, f: !!r } : e : null);
function Zs(e, t = null, r = null, n = 0, i = null, o = e === Re ? 0 : 1, s = false, a = false) {
  const u = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && Qs(t), ref: t && lr(t), scopeId: Ps, slotScopeIds: null, children: r, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o, patchFlag: n, dynamicProps: i, dynamicChildren: null, appContext: null, ctx: Ie };
  return a ? (ri(u, r), o & 128 && e.normalize(u)) : r && (u.shapeFlag |= ne(r) ? 8 : 16), Jt > 0 && !s && be && (u.patchFlag > 0 || o & 6) && u.patchFlag !== 32 && be.push(u), u;
}
const Be = Dd;
function Dd(e, t = null, r = null, n = 0, i = null, o = false) {
  if ((!e || e === id) && (e = et), Xs(e)) {
    const a = Et(e, t, true);
    return r && ri(a, r), Jt > 0 && !o && be && (a.shapeFlag & 6 ? be[be.indexOf(e)] = a : be.push(a)), a.patchFlag = -2, a;
  }
  if (Kd(e) && (e = e.__vccOpts), t) {
    t = Nd(t);
    let { class: a, style: u } = t;
    a && !ne(a) && (t.class = Wn(a)), Z(u) && (Yn(u) && !F(u) && (u = ue({}, u)), t.style = Bn(u));
  }
  const s = ne(e) ? 1 : Js(e) ? 128 : kf(e) ? 64 : Z(e) ? 4 : U(e) ? 2 : 0;
  return Zs(e, t, r, n, i, s, o, true);
}
function Nd(e) {
  return e ? Yn(e) || Bs(e) ? ue({}, e) : e : null;
}
function Et(e, t, r = false, n = false) {
  const { props: i, ref: o, patchFlag: s, children: a, transition: u } = e, l = t ? Ud(i || {}, t) : i, c = { __v_isVNode: true, __v_skip: true, type: e.type, props: l, key: l && Qs(l), ref: t && t.ref ? r && o ? F(o) ? o.concat(lr(t)) : [o, lr(t)] : lr(t) : o, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: a, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== Re ? s === -1 ? 16 : s | 16 : s, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: u, component: e.component, suspense: e.suspense, ssContent: e.ssContent && Et(e.ssContent), ssFallback: e.ssFallback && Et(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
  return u && n && Qn(c, u.clone(c)), c;
}
function Ld(e = " ", t = 0) {
  return Be(Nr, null, e, t);
}
function jd(e = "", t = false) {
  return t ? (gn(), Md(et, null, e)) : Be(et, null, e);
}
function Ce(e) {
  return e == null || typeof e == "boolean" ? Be(et) : F(e) ? Be(Re, null, e.slice()) : Xs(e) ? ze(e) : Be(Nr, null, String(e));
}
function ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Et(e);
}
function ri(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (F(t)) r = 16;
  else if (typeof t == "object") if (n & 65) {
    const i = t.default;
    i && (i._c && (i._d = false), ri(e, i()), i._c && (i._d = true));
    return;
  } else {
    r = 32;
    const i = t._;
    !i && !Bs(t) ? t._ctx = Ie : i === 3 && Ie && (Ie.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else U(t) ? (t = { default: t, _ctx: Ie }, r = 32) : (t = String(t), n & 64 ? (r = 16, t = [Ld(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function Ud(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const i in n) if (i === "class") t.class !== n.class && (t.class = Wn([t.class, n.class]));
    else if (i === "style") t.style = Bn([t.style, n.style]);
    else if (Pr(i)) {
      const o = t[i], s = n[i];
      s && o !== s && !(F(o) && o.includes(s)) && (t[i] = o ? [].concat(o, s) : s);
    } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function Te(e, t, r, n = null) {
  De(e, t, 7, [r, n]);
}
const Fd = js();
let Hd = 0;
function Bd(e, t, r) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || Fd, o = { uid: Hd++, vnode: e, type: n, parent: t, appContext: i, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new nf(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(i.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: $s(n, i), emitsOptions: Us(n, i), emit: null, emitted: null, propsDefaults: J, inheritAttrs: n.inheritAttrs, ctx: J, data: J, props: J, attrs: J, slots: J, refs: J, setupState: J, setupContext: null, suspense: r, suspenseId: r ? r.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = hd.bind(null, o), e.ce && e.ce(o), o;
}
let fe = null;
const Wd = () => fe || Ie;
let Er, _n;
{
  const e = Ir(), t = (r, n) => {
    let i;
    return (i = e[r]) || (i = e[r] = []), i.push(n), (o) => {
      i.length > 1 ? i.forEach((s) => s(o)) : i[0](o);
    };
  };
  Er = t("__VUE_INSTANCE_SETTERS__", (r) => fe = r), _n = t("__VUE_SSR_SETTERS__", (r) => Yt = r);
}
const Zt = (e) => {
  const t = fe;
  return Er(e), e.scope.on(), () => {
    e.scope.off(), Er(t);
  };
}, qi = () => {
  fe && fe.scope.off(), Er(null);
};
function ea(e) {
  return e.vnode.shapeFlag & 4;
}
let Yt = false;
function $d(e, t = false, r = false) {
  t && _n(t);
  const { props: n, children: i } = e.vnode, o = ea(e);
  yd(e, n, o, t), xd(e, i, r || t);
  const s = o ? Vd(e, t) : void 0;
  return t && _n(false), s;
}
function Vd(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, od);
  const { setup: n } = r;
  if (n) {
    $e();
    const i = e.setupContext = n.length > 1 ? qd(e) : null, o = Zt(e), s = Qt(n, e, 0, [e.props, i]), a = rs(s);
    if (Ve(), o(), (a || e.sp) && !Bt(e) && Is(e), a) {
      if (s.then(qi, qi), t) return s.then((u) => {
        Ki(e, u);
      }).catch((u) => {
        Ar(u, e, 0);
      });
      e.asyncDep = s;
    } else Ki(e, s);
  } else ta(e);
}
function Ki(e, t, r) {
  U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Z(t) && (e.setupState = Ss(t)), ta(e);
}
function ta(e, t, r) {
  const n = e.type;
  e.render || (e.render = n.render || Ae);
  {
    const i = Zt(e);
    $e();
    try {
      sd(e);
    } finally {
      Ve(), i();
    }
  }
}
const kd = { get(e, t) {
  return se(e, "get", ""), e[t];
} };
function qd(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return { attrs: new Proxy(e.attrs, kd), slots: e.slots, emit: e.emit, expose: t };
}
function ni(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ss(Of(e.exposed)), { get(t, r) {
    if (r in t) return t[r];
    if (r in Wt) return Wt[r](e);
  }, has(t, r) {
    return r in t || r in Wt;
  } })) : e.proxy;
}
function Kd(e) {
  return U(e) && "__vccOpts" in e;
}
const ra = (e, t) => Af(e, t, Yt), Gd = "3.5.26";
let mn;
const Gi = typeof window < "u" && window.trustedTypes;
if (Gi) try {
  mn = Gi.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
const na = mn ? (e) => mn.createHTML(e) : (e) => e, zd = "http://www.w3.org/2000/svg", Jd = "http://www.w3.org/1998/Math/MathML", Fe = typeof document < "u" ? document : null, zi = Fe && Fe.createElement("template"), Yd = { insert: (e, t, r) => {
  t.insertBefore(e, r || null);
}, remove: (e) => {
  const t = e.parentNode;
  t && t.removeChild(e);
}, createElement: (e, t, r, n) => {
  const i = t === "svg" ? Fe.createElementNS(zd, e) : t === "mathml" ? Fe.createElementNS(Jd, e) : r ? Fe.createElement(e, { is: r }) : Fe.createElement(e);
  return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
}, createText: (e) => Fe.createTextNode(e), createComment: (e) => Fe.createComment(e), setText: (e, t) => {
  e.nodeValue = t;
}, setElementText: (e, t) => {
  e.textContent = t;
}, parentNode: (e) => e.parentNode, nextSibling: (e) => e.nextSibling, querySelector: (e) => Fe.querySelector(e), setScopeId(e, t) {
  e.setAttribute(t, "");
}, insertStaticContent(e, t, r, n, i, o) {
  const s = r ? r.previousSibling : t.lastChild;
  if (i && (i === o || i.nextSibling)) for (; t.insertBefore(i.cloneNode(true), r), !(i === o || !(i = i.nextSibling)); ) ;
  else {
    zi.innerHTML = na(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
    const a = zi.content;
    if (n === "svg" || n === "mathml") {
      const u = a.firstChild;
      for (; u.firstChild; ) a.appendChild(u.firstChild);
      a.removeChild(u);
    }
    t.insertBefore(a, r);
  }
  return [s ? s.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild];
} }, Xd = Symbol("_vtc");
function Qd(e, t, r) {
  const n = e[Xd];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const Ji = Symbol("_vod"), Zd = Symbol("_vsh"), ep = Symbol(""), tp = /(?:^|;)\s*display\s*:/;
function rp(e, t, r) {
  const n = e.style, i = ne(r);
  let o = false;
  if (r && !i) {
    if (t) if (ne(t)) for (const s of t.split(";")) {
      const a = s.slice(0, s.indexOf(":")).trim();
      r[a] == null && fr(n, a, "");
    }
    else for (const s in t) r[s] == null && fr(n, s, "");
    for (const s in r) s === "display" && (o = true), fr(n, s, r[s]);
  } else if (i) {
    if (t !== r) {
      const s = n[ep];
      s && (r += ";" + s), n.cssText = r, o = tp.test(r);
    }
  } else t && e.removeAttribute("style");
  Ji in e && (e[Ji] = o ? n.display : "", e[Zd] && (n.display = "none"));
}
const Yi = /\s*!important$/;
function fr(e, t, r) {
  if (F(r)) r.forEach((n) => fr(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--")) e.setProperty(t, r);
  else {
    const n = np(e, t);
    Yi.test(r) ? e.setProperty(ut(n), r.replace(Yi, ""), "important") : e[n] = r;
  }
}
const Xi = ["Webkit", "Moz", "ms"], Jr = {};
function np(e, t) {
  const r = Jr[t];
  if (r) return r;
  let n = Qe(t);
  if (n !== "filter" && n in e) return Jr[t] = n;
  n = ns(n);
  for (let i = 0; i < Xi.length; i++) {
    const o = Xi[i] + n;
    if (o in e) return Jr[t] = o;
  }
  return t;
}
const Qi = "http://www.w3.org/1999/xlink";
function Zi(e, t, r, n, i, o = rf(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(Qi, t.slice(6, t.length)) : e.setAttributeNS(Qi, t, r) : r == null || o && !os(r) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : wt(r) ? String(r) : r);
}
function eo(e, t, r, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? na(r) : r);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
    const a = o === "OPTION" ? e.getAttribute("value") || "" : e.value, u = r == null ? e.type === "checkbox" ? "on" : "" : String(r);
    (a !== u || !("_value" in e)) && (e.value = u), r == null && e.removeAttribute(t), e._value = r;
    return;
  }
  let s = false;
  if (r === "" || r == null) {
    const a = typeof e[t];
    a === "boolean" ? r = os(r) : r == null && a === "string" ? (r = "", s = true) : a === "number" && (r = 0, s = true);
  }
  try {
    e[t] = r;
  } catch {
  }
  s && e.removeAttribute(i || t);
}
function ip(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function op(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
const to = Symbol("_vei");
function sp(e, t, r, n, i = null) {
  const o = e[to] || (e[to] = {}), s = o[t];
  if (n && s) s.value = n;
  else {
    const [a, u] = ap(t);
    if (n) {
      const l = o[t] = lp(n, i);
      ip(e, a, l, u);
    } else s && (op(e, a, s, u), o[t] = void 0);
  }
}
const ro = /(?:Once|Passive|Capture)$/;
function ap(e) {
  let t;
  if (ro.test(e)) {
    t = {};
    let n;
    for (; n = e.match(ro); ) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = true;
  }
  return [e[2] === ":" ? e.slice(3) : ut(e.slice(2)), t];
}
let Yr = 0;
const up = Promise.resolve(), cp = () => Yr || (up.then(() => Yr = 0), Yr = Date.now());
function lp(e, t) {
  const r = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= r.attached) return;
    De(fp(n, r.value), t, 5, [n]);
  };
  return r.value = e, r.attached = cp(), r;
}
function fp(e, t) {
  if (F(t)) {
    const r = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      r.call(e), e._stopped = true;
    }, t.map((n) => (i) => !i._stopped && n && n(i));
  } else return t;
}
const no = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, dp = (e, t, r, n, i, o) => {
  const s = i === "svg";
  t === "class" ? Qd(e, n, s) : t === "style" ? rp(e, r, n) : Pr(t) ? Un(t) || sp(e, t, r, n, o) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : pp(e, t, n, s)) ? (eo(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Zi(e, t, n, s, o, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !ne(n)) ? eo(e, Qe(t), n, o, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Zi(e, t, n, s));
};
function pp(e, t, r, n) {
  if (n) return !!(t === "innerHTML" || t === "textContent" || t in e && no(t) && U(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE") return false;
  }
  return no(t) && ne(r) ? false : t in e;
}
const hp = ue({ patchProp: dp }, Yd);
let io;
function vp() {
  return io || (io = Td(hp));
}
const gp = ((...e) => {
  const t = vp().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const i = mp(n);
    if (!i) return;
    const o = t._component;
    !U(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const s = r(i, false, _p(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), s;
  }, t;
});
function _p(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function mp(e) {
  return ne(e) ? document.querySelector(e) : e;
}
class oo {
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
class bp {
  info(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} INFO [${t}] ${r(new oo()).build()}`);
  }
  warn(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} WARN [${t}] ${r(new oo()).build()}`);
  }
  error(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} ERROR [${t}] ${r.stack ?? JSON.stringify(r)}`);
  }
}
const Xr = new bp();
class yp {
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
    const n = await r, i = Object.keys(n).find((u) => u.endsWith("Service")) ?? "", o = Object.keys(n).find((u) => u.endsWith("Protocol")) ?? "", s = n[i], a = n[o];
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
    Xr.info("service_init", (i) => i.bold(t).text("start init..."));
    try {
      await r.initialize();
    } catch (i) {
      Xr.error("service_init", i);
    }
    Xr.info("service_init", (i) => i.bold(t).text("init cost").time(performance.now() - n));
  }
}
var ia = ((e) => (e.main = "main", e.rendererMain = "rendererMain", e.rendererLyrics = "rendererLyrics", e.rendererUpdate = "rendererUpdate", e.rendererFeedback = "rendererFeedback", e.rendererImagePreview = "rendererImagePreview", e.rendererTaskbarWidget = "rendererTaskbarWidget", e.rendererTaskbarWidgetShadow = "rendererTaskbarWidgetShadow", e))(ia || {});
let so = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, r) => (r &= 63, r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r > 62 ? t += "-" : t += "_", t), "");
class Vt {
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
    return new Vt();
  }
  static createDone(t) {
    const r = new Vt();
    return r.resolve(t), r;
  }
  static createAsync(t) {
    return new Vt(t());
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
class Ep {
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
        const s = so(), a = new Vt();
        this.requests.set(s, a);
        const u = {};
        for (const [c, d] of o.entries()) if (d instanceof Function) {
          const h = so();
          this.callbacks.set(h, o[c]), o[c] = null, u[c] = h;
        }
        await this.send({ type: "method.invoke", fromWorkerId: this.currentWorker, toServiceId: t, methodName: i, requestId: s, arguments: o, callbacks: u });
        const l = await a.get();
        if (l.type !== "method.return") throw new Error("internal error: request proxy receive an invoke message as result");
        if (l.return.type === "error") throw new Error(l.return.error);
        return l.return.result;
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
class Sp extends Ep {
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
globalThis.createServiceInitializer = () => new yp({ workerId: ia.rendererImagePreview, transport: (e) => new Sp(e) });
const wp = createServiceInitializer();
var ao;
const oa = typeof window < "u", xp = (e) => typeof e == "string", Op = () => {
};
oa && ((ao = window?.navigator) != null && ao.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function sa(e) {
  return typeof e == "function" ? e() : Es(e);
}
function Tp(e) {
  return e;
}
function Pp(e) {
  return ss() ? (of(e), true) : false;
}
function Rp(e) {
  var t;
  const r = sa(e);
  return (t = r?.$el) != null ? t : r;
}
const aa = oa ? window : void 0;
function Cp(...e) {
  let t, r, n, i;
  if (xp(e[0]) || Array.isArray(e[0]) ? ([r, n, i] = e, t = aa) : [t, r, n, i] = e, !t) return Op;
  Array.isArray(r) || (r = [r]), Array.isArray(n) || (n = [n]);
  const o = [], s = () => {
    o.forEach((c) => c()), o.length = 0;
  }, a = (c, d, h, g) => (c.addEventListener(d, h, g), () => c.removeEventListener(d, h, g)), u = cr(() => [Rp(t), sa(i)], ([c, d]) => {
    s(), c && o.push(...r.flatMap((h) => n.map((g) => a(c, h, g, d))));
  }, { immediate: true, flush: "post" }), l = () => {
    u(), s();
  };
  return Pp(l), l;
}
var Ip = Object.defineProperty, Ap = Object.defineProperties, Mp = Object.getOwnPropertyDescriptors, uo = Object.getOwnPropertySymbols, Dp = Object.prototype.hasOwnProperty, Np = Object.prototype.propertyIsEnumerable, co = (e, t, r) => t in e ? Ip(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, Lp = (e, t) => {
  for (var r in t || (t = {})) Dp.call(t, r) && co(e, r, t[r]);
  if (uo) for (var r of uo(t)) Np.call(t, r) && co(e, r, t[r]);
  return e;
}, jp = (e, t) => Ap(e, Mp(t));
const Up = (e) => typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => true;
function Fp(...e) {
  let t, r, n = {};
  e.length === 3 ? (t = e[0], r = e[1], n = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = true, r = e[0], n = e[1]) : (t = e[0], r = e[1]) : (t = true, r = e[0]);
  const { target: i = aa, eventName: o = "keydown", passive: s = false } = n, a = Up(t);
  return Cp(i, o, (l) => {
    a(l) && r(l);
  }, s);
}
function Hp(e, t, r = {}) {
  return Fp(e, t, jp(Lp({}, r), { eventName: "keydown" }));
}
const lo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, fo = "__vueuse_ssr_handlers__";
lo[fo] = lo[fo] || {};
var po;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(po || (po = {}));
var Bp = Object.defineProperty, ho = Object.getOwnPropertySymbols, Wp = Object.prototype.hasOwnProperty, $p = Object.prototype.propertyIsEnumerable, vo = (e, t, r) => t in e ? Bp(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, Vp = (e, t) => {
  for (var r in t || (t = {})) Wp.call(t, r) && vo(e, r, t[r]);
  if (ho) for (var r of ho(t)) $p.call(t, r) && vo(e, r, t[r]);
  return e;
};
const kp = { easeInSine: [0.12, 0, 0.39, 0], easeOutSine: [0.61, 1, 0.88, 1], easeInOutSine: [0.37, 0, 0.63, 1], easeInQuad: [0.11, 0, 0.5, 0], easeOutQuad: [0.5, 1, 0.89, 1], easeInOutQuad: [0.45, 0, 0.55, 1], easeInCubic: [0.32, 0, 0.67, 0], easeOutCubic: [0.33, 1, 0.68, 1], easeInOutCubic: [0.65, 0, 0.35, 1], easeInQuart: [0.5, 0, 0.75, 0], easeOutQuart: [0.25, 1, 0.5, 1], easeInOutQuart: [0.76, 0, 0.24, 1], easeInQuint: [0.64, 0, 0.78, 0], easeOutQuint: [0.22, 1, 0.36, 1], easeInOutQuint: [0.83, 0, 0.17, 1], easeInExpo: [0.7, 0, 0.84, 0], easeOutExpo: [0.16, 1, 0.3, 1], easeInOutExpo: [0.87, 0, 0.13, 1], easeInCirc: [0.55, 0, 1, 0.45], easeOutCirc: [0, 0.55, 0.45, 1], easeInOutCirc: [0.85, 0, 0.15, 1], easeInBack: [0.36, 0, 0.66, -0.56], easeOutBack: [0.34, 1.56, 0.64, 1], easeInOutBack: [0.68, -0.6, 0.32, 1.6] };
Vp({ linear: Tp }, kp);
function qp() {
  const e = Tf(window.__injected_data__), t = () => {
    e.value = window.__injected_data__;
  };
  return Ds(() => {
    document.addEventListener("injected-data-updated", t);
  }), Zn(() => {
    document.removeEventListener("injected-data-updated", t);
  }), e;
}
const Kp = { class: "container" }, Gp = ["src"], zp = Kf({ __name: "App", setup(e) {
  const t = qp(), r = ra(() => t.value?.img || "");
  return Hp("Escape", () => {
    window.close();
  }), (n, i) => (gn(), ki("div", Kp, [r.value ? (gn(), ki("img", { key: 0, class: "preview", src: r.value }, null, 8, Gp)) : jd("", true)]));
} }), Jp = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, i] of t) r[n] = i;
  return r;
}, Yp = Jp(zp, [["__scopeId", "data-v-8c7f1796"]]);
async function Xp() {
  const t = new URLSearchParams(window.location.search).get("global_config");
  JSON.parse(t ?? "{}"), await wp.initialize(), gp(Yp).mount("#app");
}
Xp();
