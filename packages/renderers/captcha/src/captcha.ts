// packages/renderers/captcha/src/captcha.ts
// @ts-nocheck
(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) n(a);
  new MutationObserver((a) => {
    for (const o of a) if (o.type === "childList") for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: true, subtree: true });
  function t(a) {
    const o = {};
    return a.integrity && (o.integrity = a.integrity), a.referrerPolicy && (o.referrerPolicy = a.referrerPolicy), a.crossOrigin === "use-credentials" ? o.credentials = "include" : a.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function n(a) {
    if (a.ep) return;
    a.ep = true;
    const o = t(a);
    fetch(a.href, o);
  }
})();
var b = function() {
  return b = Object.assign || function(e) {
    for (var t, n = 1, a = arguments.length; n < a; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, b.apply(this, arguments);
};
function ki(r, e) {
  var t = {};
  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && e.indexOf(n) < 0 && (t[n] = r[n]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(r); a < n.length; a++) e.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[a]) && (t[n[a]] = r[n[a]]);
  return t;
}
function Bi(r) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && r[e], n = 0;
  if (t) return t.call(r);
  if (r && typeof r.length == "number") return { next: function() {
    return r && n >= r.length && (r = void 0), { value: r && r[n++], done: !r };
  } };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function S(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t) return r;
  var n = t.call(r), a, o = [], i;
  try {
    for (; (e === void 0 || e-- > 0) && !(a = n.next()).done; ) o.push(a.value);
  } catch (u) {
    i = { error: u };
  } finally {
    try {
      a && !a.done && (t = n.return) && t.call(n);
    } finally {
      if (i) throw i.error;
    }
  }
  return o;
}
function U(r, e, t) {
  if (arguments.length === 2) for (var n = 0, a = e.length, o; n < a; n++) (o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]);
  return r.concat(o || Array.prototype.slice.call(e));
}
var Gi = 10, Hi = 1e3, Wa = function(r) {
  return JSON.stringify({ ev_type: "batch", list: r });
};
function Vi(r) {
  var e = r.transport, t = r.endpoint, n = r.size, a = n === void 0 ? Gi : n, o = r.wait, i = o === void 0 ? Hi : o, u = [], s = 0, f, c, v = { getSize: function() {
    return a;
  }, getWait: function() {
    return i;
  }, setSize: function(d) {
    a = d;
  }, setWait: function(d) {
    i = d;
  }, getEndpoint: function() {
    return t;
  }, setEndpoint: function(d) {
    t = d;
  }, send: function(d) {
    u.push(d), u.length >= a && l.call(this), clearTimeout(s), s = setTimeout(l.bind(this), i);
  }, flush: function() {
    clearTimeout(s), l.call(this);
  }, getBatchData: function() {
    return u.length ? Wa(u) : "";
  }, clear: function() {
    clearTimeout(s), u = [];
  }, fail: function(d) {
    f = d;
  }, success: function(d) {
    c = d;
  } };
  function l() {
    if (u.length) {
      var d = this.getBatchData();
      e.post({ url: t, data: d, fail: function(g) {
        f && f(g, d);
      }, success: function() {
        c && c(d);
      } }), u = [];
    }
  }
  return v;
}
var x = function() {
  return {};
};
function Ut(r) {
  return r;
}
function j(r) {
  return typeof r == "object" && r !== null;
}
function Wi(r) {
  return r === void 0;
}
function qi(r, e) {
  try {
    return r instanceof e;
  } catch {
    return false;
  }
}
var lt = Object.prototype;
function Ft(r) {
  if (j(r)) {
    if (typeof Object.getPrototypeOf == "function") {
      var e = Object.getPrototypeOf(r);
      return e === lt || e === null;
    }
    return lt.toString.call(r) === "[object Object]";
  }
  return false;
}
function or(r) {
  return lt.toString.call(r) === "[object Array]";
}
function Tr(r) {
  return typeof r == "function";
}
function zi(r) {
  return typeof r == "boolean";
}
function $e(r) {
  return typeof r == "number";
}
function J(r) {
  return typeof r == "string";
}
function Yi(r) {
  switch (Object.prototype.toString.call(r)) {
    case "[object Error]":
      return true;
    case "[object Exception]":
      return true;
    case "[object DOMError]":
      return true;
    case "[object DOMException]":
      return true;
    default:
      return r instanceof Error;
  }
}
function Ji(r) {
  return typeof Event < "u" && qi(r, Event);
}
function Ki(r) {
  return Object.prototype.toString.call(r) === "[object ErrorEvent]";
}
function Xi(r) {
  return Object.prototype.toString.call(r) === "[object PromiseRejectionEvent]";
}
function Qi(r, e) {
  return Object.prototype.hasOwnProperty.call(r, e);
}
function Zi() {
  for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
  for (var t = {}, n = 0; n < r.length; ) t = kt(t, r[n++]);
  return t;
}
function kt(r, e) {
  var t = b({}, r);
  for (var n in e) Qi(e, n) && e[n] !== void 0 && (j(e[n]) && Ft(e[n]) ? t[n] = kt(j(r[n]) ? r[n] : {}, e[n]) : or(e[n]) && or(r[n]) ? t[n] = qa(r[n], e[n]) : t[n] = e[n]);
  return t;
}
function qa(r, e) {
  var t = or(r) ? r : [], n = or(e) ? e : [];
  return Array.prototype.concat.call(t, n).map(function(a) {
    return a instanceof RegExp ? a : j(a) && Ft(a) ? kt({}, a) : or(a) ? qa([], a) : a;
  });
}
function wr(r, e) {
  if (!or(r) || r.length === 0) return false;
  for (var t = 0; t < r.length; ) {
    if (r[t] === e) return true;
    t++;
  }
  return false;
}
var Bt = function(r, e) {
  if (!or(r)) return r;
  var t = r.indexOf(e);
  if (t >= 0) {
    var n = r.slice();
    return n.splice(t, 1), n;
  }
  return r;
}, Ee = function(r, e, t) {
  for (var n, a, o = e.split("."), i = S(o), u = i[0], s = i.slice(1); r && s.length > 0; ) r = r[u], n = s, a = S(n), u = a[0], s = a.slice(1);
  if (r) return t(r, u);
}, ru = function(r, e, t) {
  return Ee(r, e, function(n, a) {
    if (n && a in n && Tr(n[a])) try {
      return n[a].apply(n, t);
    } catch {
      return;
    }
  });
}, eu = function(r, e) {
  return !r || !j(r) ? r : e.reduce(function(t, n) {
    return t[n] = r[n], t;
  }, {});
}, tu = function(r) {
  return r.replace(/([a-z])([A-Z])/g, function(e, t, n) {
    return t + "-" + n.toLowerCase();
  });
};
function nu(r) {
  return or(r) && r.length ? au(r) : null;
}
function au(r) {
  for (var e = [], t = r.length, n = 0; n < t; n++) {
    var a = r[n];
    J(a) ? e.push(a.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1")) : a && a.source && e.push(a.source);
  }
  return new RegExp(e.join("|"), "i");
}
var Gt = function(r, e) {
  var t = nu(r || []);
  return !!t && t.test(e);
};
function Rr(r) {
  try {
    return J(r) ? r : JSON.stringify(r);
  } catch (e) {
    return "[FAILED_TO_STRINGIFY]:" + String(e);
  }
}
function ou() {
  var r = {}, e = {}, t = { set: function(n, a) {
    return r[n] = a, e[n] = Rr(a), t;
  }, merge: function(n) {
    return r = b(b({}, r), n), Object.keys(n).forEach(function(a) {
      e[a] = Rr(n[a]);
    }), t;
  }, delete: function(n) {
    return delete r[n], delete e[n], t;
  }, clear: function() {
    return r = {}, e = {}, t;
  }, get: function(n) {
    return e[n];
  }, toString: function() {
    return b({}, e);
  } };
  return t;
}
var dt = function(r, e, t, n) {
  return n === void 0 && (n = true), function() {
    for (var a = [], o = 0; o < arguments.length; o++) a[o] = arguments[o];
    if (!r) return x;
    var i = r[e], u = t.apply(void 0, U([i], S(a), false)), s = u;
    return Tr(s) && n && (s = function() {
      for (var f = [], c = 0; c < arguments.length; c++) f[c] = arguments[c];
      try {
        return u.apply(this, f);
      } catch {
        return Tr(i) && i.apply(this, f);
      }
    }), r[e] = s, function(f) {
      f || (s === r[e] ? r[e] = i : u = i);
    };
  };
}, Mr = function(r, e, t) {
  return function() {
    for (var n = [], a = 0; a < arguments.length; a++) n[a] = arguments[a];
    if (!r) return x;
    var o = r[e], i = t.apply(void 0, U([o], S(n), false)), u = i;
    return Tr(u) && (u = function() {
      for (var s = [], f = 0; f < arguments.length; f++) s[f] = arguments[f];
      return i.apply(this, s);
    }), r[e] = u, function() {
      u === r[e] ? r[e] = o : i = o;
    };
  };
}, iu = function() {
  return "".padStart ? function(r, e) {
    return e === void 0 && (e = 8), r.padStart(e, " ");
  } : function(r) {
    return r;
  };
}, za = iu(), uu = 0, Ya = function() {
  for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
  console.error.apply(console, U(["[SDK]", Date.now(), za("" + uu++)], S(r), false));
}, su = 0, be = function() {
  for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
  console.warn.apply(console, U(["[SDK]", Date.now(), za("" + su++)], S(r), false));
}, Ht = function(r) {
  return Math.random() < Number(r);
}, fu = function(r, e) {
  return r < Number(e);
}, jr = function(r) {
  return function(e) {
    for (var t = e, n = 0; n < r.length && t; n++) try {
      t = r[n](t);
    } catch (a) {
      Ya(a);
    }
    return t;
  };
}, cu = function(r) {
  return function(e) {
    for (var t = true, n = 0; n < r.length && t; n++) try {
      t = r[n](e);
    } catch (a) {
      Ya(a);
    }
    return t;
  };
};
function vu() {
  for (var r = new Array(16), e = 0, t = 0; t < 16; t++) (t & 3) === 0 && (e = Math.random() * 4294967296), r[t] = e >>> ((t & 3) << 3) & 255;
  return r;
}
function lu(r) {
  for (var e = [], t = 0; t < 256; ++t) e[t] = (t + 256).toString(16).substr(1);
  var n = 0, a = e;
  return [a[r[n++]], a[r[n++]], a[r[n++]], a[r[n++]], "-", a[r[n++]], a[r[n++]], "-", a[r[n++]], a[r[n++]], "-", a[r[n++]], a[r[n++]], "-", a[r[n++]], a[r[n++]], a[r[n++]], a[r[n++]], a[r[n++]], a[r[n++]]].join("");
}
function pt() {
  var r = vu();
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, lu(r);
}
var du = 3e5, pu = function(r, e, t) {
  var n = 0;
  return t === -1 ? x : function() {
    if (r()) {
      n && clearTimeout(n), n = 0;
      return;
    }
    n === 0 && (n = setTimeout(e, t));
  };
}, Ja = function(r, e) {
  var t = [];
  try {
    t = e.reduce(function(n, a) {
      try {
        var o = a(r);
        typeof o == "function" && n.push(o);
      } catch {
      }
      return n;
    }, []);
  } catch {
  }
  return function(n) {
    return Ja(n, t);
  };
}, gu = function(r) {
  r === void 0 && (r = du);
  var e = [], t = [], n = false, a, o = pu(function() {
    return !!e.length;
  }, function() {
    n = true, a && a[0](), t.forEach(function(u) {
      return u();
    }), t.length = 0, a = void 0;
  }, r), i = function(u) {
    e = Bt(e, u), !n && o();
  };
  return { next: function(u) {
    return Ja(u, e);
  }, complete: function(u) {
    t.push(u);
  }, attach: function(u, s) {
    a = [u, s];
  }, subscribe: function(u) {
    if (n) throw new Error("Observer is closed");
    return e.push(u), a && a[1] && a[1](u), o(), function() {
      return i(u);
    };
  }, unsubscribe: i };
}, Le = function(r, e, t) {
  var n = gu(t);
  try {
    r(n.next, n.attach), e && n.complete(e);
  } catch {
  }
  return [n.subscribe, n.unsubscribe];
}, hu = function(r, e) {
  var t = S(r, 1), n = t[0], a = function(o, i) {
    var u = n(function(s) {
      var f = cu(e)(s);
      return f ? o(s) : x;
    });
    i(function() {
      u();
    });
  };
  return a;
};
function mu() {
  var r = false, e = {}, t = function(o) {
    o.length && o.forEach(function(i) {
      try {
        i();
      } catch {
      }
    }), o.length = 0;
  }, n = function(o) {
    e[o] && e[o].forEach(function(i) {
      t(i[1]);
    }), e[o] = void 0;
  }, a = function(o) {
    Object.keys(e).forEach(function(i) {
      e[i] && e[i].forEach(function(u) {
        u[0] === o && t(u[1]);
      });
    });
  };
  return { set: function(o, i, u) {
    e[o] ? e[o].push([i, u]) : e[o] = [[i, u]], r && t(u);
  }, has: function(o) {
    return !!e[o];
  }, remove: n, removeByEvType: a, clear: function() {
    r = true, Object.keys(e).forEach(function(o) {
      n(o);
    });
  } };
}
var Se = function(r, e, t, n) {
  return r.destroyAgent.set(e, t, n);
}, yu = 500, _u = 50;
function Eu(r, e, t) {
  if (e.push(t), !(e.length < yu)) {
    var n = e.splice(0, _u);
    r.savePreStartDataToDb && r.savePreStartDataToDb(n);
  }
}
function bu(r) {
  var e = r.getPreStartQueue();
  e.forEach(function(t) {
    return r.build(t);
  }), e.length = 0;
}
var Su = ["init", "start", "config", "beforeDestroy", "provide", "beforeReport", "report", "beforeBuild", "build", "beforeSend", "send", "beforeConfig"];
function Ou(r) {
  var e = r.builder, t = r.createSender, n = r.createDefaultConfig, a = r.createConfigManager, o = r.userConfigNormalizer, i = r.initConfigNormalizer, u = r.validateInitConfig, s, f, c = {};
  Su.forEach(function(m) {
    return c[m] = [];
  });
  var v = false, l = false, d = false, g = [], h = [], E = mu(), p = { getBuilder: function() {
    return e;
  }, getSender: function() {
    return s;
  }, getPreStartQueue: function() {
    return g;
  }, init: function(m) {
    if (v) {
      be("already inited");
      return;
    }
    if (m && j(m) && u(m)) {
      var O = n(m);
      if (!O) throw new Error("defaultConfig missing");
      var D = i(m);
      if (f = a(O), f.setConfig(D), f.onChange(function() {
        y("config");
      }), s = t(f.getConfig()), !s) throw new Error("sender missing");
      v = true, y("init", true);
    } else throw new Error("invalid InitConfig, init failed");
  }, set: function(m) {
    v && m && j(m) && (y("beforeConfig", false, m), f?.setConfig(m));
  }, config: function(m) {
    if (v) return m && j(m) && (y("beforeConfig", false, m), f?.setConfig(o(m))), f?.getConfig();
  }, provide: function(m, O) {
    if (wr(h, m)) {
      be("cannot provide " + m + ", reserved");
      return;
    }
    p[m] = O, y("provide", false, m);
  }, start: function() {
    v && (l || f?.onReady(function() {
      l = true, y("start", true), bu(p);
    }));
  }, report: function(m) {
    if (m) {
      var O = jr(c.beforeReport)(m);
      if (O) {
        var D = jr(c.report)(O);
        D && (l ? this.build(D) : Eu(p, g, D));
      }
    }
  }, build: function(m) {
    if (l) {
      var O = jr(c.beforeBuild)(m);
      if (O) {
        var D = e.build(O);
        if (D) {
          var R = jr(c.build)(D);
          R && this.send(R);
        }
      }
    }
  }, send: function(m) {
    if (l) {
      var O = jr(c.beforeSend)(m);
      O && (s.send(O), y("send", false, O));
    }
  }, destroy: function() {
    E.clear(), d = true, g.length = 0, y("beforeDestroy", true);
  }, on: function(m, O) {
    if (m === "init" && v || m === "start" && l || m === "beforeDestroy" && d) try {
      O();
    } catch {
    }
    else c[m] && c[m].push(O);
  }, off: function(m, O) {
    c[m] && (c[m] = Bt(c[m], O));
  }, destroyAgent: E };
  return h = Object.keys(p), p;
  function y(m, O) {
    O === void 0 && (O = false);
    for (var D = [], R = 2; R < arguments.length; R++) D[R - 2] = arguments[R];
    c[m].forEach(function(sr) {
      try {
        sr.apply(void 0, U([], S(D), false));
      } catch {
      }
    }), O && (c[m].length = 0);
  }
}
var Tu = function(r) {
  var e = ou();
  r.provide("context", e), r.on("report", function(t) {
    return t.extra || (t.extra = {}), t.extra.context = e.toString(), t;
  });
}, wu = function(r, e, t) {
  var n = {}, a = function() {
    for (var i, u = [], s = 0; s < arguments.length; s++) u[s] = arguments[s];
    var f = u[0];
    if (f) {
      var c = f.split(".")[0];
      if (!(c in a)) {
        var v = n[c] || [], l = (i = e?.(r)) !== null && i !== void 0 ? i : {};
        v.push(U([l], S(u), false)), n[c] = v;
        return;
      }
      return ru(a, f, [].slice.call(u, 1));
    }
  };
  dt(r, "provide", function(i) {
    return function(u, s) {
      a[u] = s, i.call(r, u, s);
    };
  })();
  for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (a[o] = r[o]);
  return r.on("provide", function(i) {
    n[i] && (n[i].forEach(function(u) {
      var s = S(u), f = s[0], c = s.slice(1);
      t?.(r, f, c);
    }), n[i] = null);
  }), a;
};
function Ru(r, e) {
  r.on("init", function() {
    var t = [], n = function(o) {
      o.forEach(function(i) {
        var u = i.name;
        wr(t, u) || (t.push(u), i.setup(r), e && e(u, i.setup), r.destroyAgent.set(u, u, [function() {
          t = Bt(t, u), i.tearDown && i.tearDown();
        }]));
      });
    };
    r.provide("applyIntegrations", n);
    var a = r.config();
    a && a.integrations && n(a.integrations);
  });
}
var Pu = "_", Iu = function(r) {
  return r.split(Pu)[0];
};
function Cu(r, e) {
  var t = e || {}, n = {}, a = function(i, u) {
    n[i] || (n[i] = []), n[i].push(u);
  }, o = function(i) {
    var u = S(i, 2), s = u[0], f = u[1], c = Iu(s), v = !!c && n[c];
    return t[s] || (t[s] = Le(f, function() {
      t[s] = void 0;
    })), v ? Ka(r, [s, hu(t[s], v)]) : t[s];
  };
  r.provide("setFilter", a), r.provide("initSubject", o), r.provide("getSubject", function(i) {
    return t[i];
  }), r.provide("privateSubject", {});
}
function Pr(r, e) {
  return r.initSubject(e);
}
function Ka(r, e, t) {
  var n = S(e, 2), a = n[0], o = n[1], i = r.privateSubject || {};
  return i[a] || (i[a] = Le(o, function() {
    i[a] = void 0;
  }, t)), i[a];
}
var Au = function(r) {
  try {
    typeof window == "object" && j(window) && window.__SLARDAR_DEVTOOLS_GLOBAL_HOOK__ && window.__SLARDAR_DEVTOOLS_GLOBAL_HOOK__.push(r);
  } catch {
  }
}, T = function() {
  return Date.now();
};
function P() {
  if (typeof window == "object" && j(window)) return window;
}
function gr() {
  if (typeof document == "object" && j(document)) return document;
}
function Xa() {
  return P() && window.location;
}
function xu() {
  return P() && window.history;
}
function ju() {
  if (typeof XMLHttpRequest == "function" && Tr(XMLHttpRequest)) return XMLHttpRequest;
}
function Du() {
  if (P() && Tr(window.PerformanceObserver)) return window.PerformanceObserver;
}
function Nu() {
  if (P() && "navigator" in window) return window.navigator;
}
function Qa() {
  var r = Nu();
  if (r) return r.connection || r.mozConnection || r.webkitConnection;
}
function gt(r) {
  return r?.effectiveType || r?.type || "";
}
function $u() {
  var r = Qa(), e = gt(r);
  return wr(["slow-2g", "2g"], e);
}
function Me(r) {
  var e = gr();
  if (!e || !r) return "";
  var t = e.createElement("a");
  return t.href = r, t.href;
}
function Tn(r) {
  var e = gr();
  if (!e || !r) return { url: r, protocol: "", domain: "", query: "", path: "", hash: "" };
  var t = e.createElement("a");
  t.href = r;
  var n = t.pathname || "/";
  return n[0] !== "/" && (n = "/" + n), { url: t.href, protocol: t.protocol.slice(0, -1), domain: t.hostname, query: t.search.substring(1), path: n, hash: t.hash };
}
function Vt() {
  var r = P() && Xa();
  return r ? r.href : "";
}
var Lu = function(r) {
  return { pid: r.pid, view_id: r.viewId, url: Vt() };
}, Za = function(r) {
  var e = r.config(), t = Lu(e);
  return t.context = r.context ? r.context.toString() : {}, t;
}, ro = function(r, e) {
  var t = Za(r);
  return t.timestamp = T(), function(n) {
    r.report(b(b({}, n), { overrides: t }));
  };
}, Mu = "f_view_0", Uu = function(r) {
  return function(e, t) {
    var n = Za(r);
    t(x, function(a) {
      n && a(n);
    });
  };
}, Ar = function(r) {
  if (r) return r.__SLARDAR_REGISTRY__ || (r.__SLARDAR_REGISTRY__ = { Slardar: { plugins: [], errors: [], subject: {} } }), r.__SLARDAR_REGISTRY__.Slardar;
}, eo = function() {
  for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
  var t = Ar(P());
  t && (t.errors || (t.errors = []), t.errors.push(r));
}, to = function(r) {
  var e = { url: Vt(), timestamp: T() }, t = r.config();
  return t?.pid && (e.pid = t.pid), r?.context && (e.context = r.context.toString()), e;
}, Wt = function(r, e) {
  return function(t) {
    var n = function(a) {
      return a.overrides = e, a;
    };
    r.on("report", n), t(), r.off("report", n);
  };
}, rr = function(r, e, t, n) {
  return n === void 0 && (n = false), r.addEventListener(e, t, n), function() {
    r.removeEventListener(e, t, n);
  };
}, no = function(r, e, t, n) {
  return r.addEventListener(e, t, n), function() {
    r.removeEventListener(e, t, n);
  };
};
function Fu(r) {
  var e = P(), t = gr();
  if (!(!e || !t)) {
    if (t.readyState === "complete") {
      r();
      return;
    }
    rr(e, "load", function() {
      setTimeout(function() {
        r();
      }, 0);
    }, false);
  }
}
var ao = function(r) {
  var e = false, t = function(n) {
    e || (e = true, r && r(n));
  };
  return [t];
}, ku = function(r) {
  var e = P();
  if (e) {
    var t = S(ao(r), 1), n = t[0];
    ["unload", "beforeunload", "pagehide"].forEach(function(a) {
      rr(e, a, n, false);
    });
  }
}, Bu = function(r) {
  var e = gr(), t = P();
  if (!(!e || !t)) {
    var n = x, a = function() {
      e.visibilityState === "visible" && (r(), n());
    };
    n = no(e, "visibilitychange", a, true);
  }
}, Gu = function(r, e) {
  var t, n = gr();
  if (n) {
    var a = n.createElement("script");
    a.src = r, a.crossOrigin = "anonymous", a.onload = e, (t = n.head) === null || t === void 0 || t.appendChild(a);
  }
}, Ue = function(r, e) {
  return j(r) ? b(b({}, e), r) : r ? e : false;
}, qt = function() {
  return !!btoa && !!atob;
};
function Hu(r) {
  return qt() ? btoa(encodeURI(r)) : r;
}
function Vu(r) {
  return qt() ? decodeURI(atob(r)) : r;
}
var oo = function(r) {
  try {
    var e = localStorage.getItem(r), t = e;
    e && typeof e == "string" && (t = JSON.parse(Vu(e)));
    var n = t, a = n.expires, o = ki(n, ["expires"]);
    return a >= T() ? o : void 0;
  } catch {
    return;
  }
}, zt = function(r, e, t) {
  if (!(t <= 0)) try {
    localStorage.setItem(r, Hu(JSON.stringify(b(b({}, e), { expires: T() + t }))));
  } catch {
  }
}, Wu = 2160 * 60 * 60 * 1e3, io = function(r) {
  return r === false ? 0 : r === true || r === void 0 || !$e(r) ? Wu : r;
}, qu = function(r) {
  var e;
  if (!(typeof window != "object" || !window.__perfsee__)) {
    var t = {};
    return (e = Error.captureStackTrace) === null || e === void 0 || e.call(Error, t, r), t.stack;
  }
};
function zu() {
  var r = P();
  return r && "navigator" in r && "onLine" in r.navigator ? function() {
    return !r.navigator.onLine;
  } : function() {
    return false;
  };
}
function Yu(r) {
  var e = P();
  return e && "addEventListener" in e ? rr(e, "online", r) : function() {
  };
}
var Ju = "xhr_0", uo = function() {
  var r = new RegExp("\\/monitor_web\\/collect|\\/monitor_browser\\/collect\\/batch", "i");
  return function(e) {
    return r.test(e);
  };
}, Ku = function(r) {
  return function() {
    for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return e = S(t, 2), this._method = e[0], this._url = e[1], r.apply(this, t);
  };
}, Xu = function(r) {
  return function() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    this._reqHeaders = this._reqHeaders || {};
    var n = S(e, 2), a = n[0], o = n[1];
    return this._reqHeaders[a] = o, r && r.apply(this, e);
  };
}, Qu = function(r, e) {
  return Mr(r, "onreadystatechange", function(t) {
    return function() {
      for (var n = [], a = 0; a < arguments.length; a++) n[a] = arguments[a];
      return this.readyState === 4 && e(r), t && t.apply(this, n);
    };
  });
}, Zu = function(r, e) {
  var t = uo();
  return function() {
    for (var n = [], a = 0; a < arguments.length; a++) n[a] = arguments[a];
    if (this._start = T(), this._data = n?.[0], !t(this._url)) {
      var o = e([this._method, this._url, this._start, this]);
      Qu(this, o)();
    }
    return r.apply(this, n);
  };
}, wn = function(r) {
  return function(e, t) {
    if (r) {
      var n = [];
      n.push(Mr(r, "open", Ku)()), n.push(Mr(r, "setRequestHeader", Xu)()), n.push(Mr(r, "send", Zu)(e)), t(function() {
        n.forEach(function(a) {
          return a();
        });
      });
    }
  };
}, rs = "fetch_0", so = function(r, e) {
  return function(t, n) {
    n === void 0 && (n = {});
    var a = e([t, n]), o = r(t, n);
    return o.then(function(i) {
      a(i);
    }, function() {
      a(void 0);
    }), o;
  };
}, es = function(r, e) {
  var t = P();
  if (!(!t || !fetch)) {
    var n = [];
    n.push(Mr(t, "fetch", so)(r)), e(function() {
      n.forEach(function(a) {
        return a();
      });
    });
  }
}, ts = [rs, es], ns = ["resource"], as = function(r, e, t) {
  var n = r && new r(function(u, s) {
    u.getEntries && u.getEntries().forEach(function(f, c, v) {
      return e(f, c, v, s);
    });
  }), a = function(u) {
    if (!r || !n) return t && t();
    try {
      n.observe({ entryTypes: u });
    } catch {
      return t && t();
    }
  }, o = function(u, s) {
    if (!r || !n) return t && t();
    try {
      var f = { type: u, buffered: true };
      !Wi(s) && (f.durationThreshold = s), n.observe(f);
    } catch {
      return t && t();
    }
    n.observe({ type: u, buffered: false });
  }, i = function() {
    return n && n.disconnect();
  };
  return [a, o, i];
}, os = function(r, e, t) {
  var n = S(as(r, e), 3), a = n[0], o = n[2];
  return a(t), o;
}, is = "resource_0", us = function(r, e) {
  var t = Du();
  if (t) {
    var n = uo();
    e(os(t, function(a) {
      !n(a.name) && r(a);
    }, ns));
  }
}, fo = [is, us], co = "pageview", vo = "session", lo = "js_error", Zr = "http", ss = "resource_error", fs = "resource", Rn = "custom", cs = "performance", vs = "performance_longtask", ls = "blank_screen", po = "action", ds = "03", ps = "01", gs = "traceparent", hs = { sampleRate: 1, origins: [] }, Pn = function() {
  var r = window && (window.crypto || window.msCrypto);
  if (r !== void 0 && r.getRandomValues) {
    var e = new Uint16Array(8);
    r.getRandomValues(e);
    var t = function(n) {
      for (var a = n.toString(16); a.length < 4; ) a = "0" + a;
      return a;
    };
    return t(e[0]) + t(e[1]) + t(e[2]) + t(e[3]) + t(e[4]) + t(e[5]) + t(e[6]) + t(e[7]);
  }
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, function() {
    var n = Math.random() * 16 | 0;
    return n.toString(16);
  });
}, go = function(r) {
  var e = Ue(r, hs);
  if (e) {
    var t = Ht(e.sampleRate);
    if (t) return function(n, a) {
      var o = e.origins;
      o.length && Gt(o, n) && a(gs, ds + "-" + Pn() + "-" + Pn().substring(16) + "-" + ps);
    };
  }
}, ms = new RegExp("(cookie|auth|jwt|token|key|ticket|secret|credential|session|password)", "i"), ys = new RegExp("(bearer|session)", "i"), Yt = function(r, e) {
  return !r || !e ? true : ms.test(r) || ys.test(e);
}, _s = function(r) {
  var e = false;
  return function(t) {
    e || (e = true, r(t));
  };
}, ho = function(r, e) {
  try {
    if (e) {
      var t = r.request.url, n = e(t);
      if (!n) return;
      r.request.url = n, r.extra = b(b({}, r.extra), { original_url: t });
    }
  } catch {
  }
}, In = function(r, e, t) {
  var n = S(e, 2), a = n[0], o = n[1], i = t.setTraceHeader, u = t.ignoreUrls, s = t.setContextAtReq, f = t.extractUrl;
  r.push(a[0](function(c) {
    var v = S(c, 4);
    v[0];
    var l = v[1];
    v[2];
    var d = v[3];
    if (!l) return x;
    var g = Me(l), h;
    if (Gt(u, g)) return x;
    i && i(g, function(m, O) {
      return d.setRequestHeader(m, O);
    });
    var E = s(), p = void 0, y = o()[0](function(m) {
      (g === m.name || h && h === m.name) && !p && (p = m);
    });
    return function(m) {
      h = m.responseURL;
      var O = Ss(m, t);
      setTimeout(function() {
        p && (O.response.timing = p), ho(O, f), E && E({ ev_type: Zr, payload: O }), y();
      }, 100);
    };
  }));
};
function Es(r) {
  return J(r) && r ? r.split(`\r
`).reduce(function(e, t) {
    if (J(t)) {
      var n = S(t.split(": "), 2), a = n[0], o = n[1];
      !Yt(a, o) && (e[a.toLowerCase()] = o);
    }
    return e;
  }, {}) : {};
}
function bs(r) {
  return Object.keys(r).reduce(function(e, t) {
    return !Yt(t, r[t]) && (e[t.toLowerCase()] = r[t]), e;
  }, {});
}
var Ss = function(r, e) {
  var t = r._method, n = r._reqHeaders, a = r._url, o = r._start, i = r._data, u = Me(a), s = { api: "xhr", request: { url: u, method: (t || "").toLowerCase(), headers: n && bs(n), timestamp: o }, response: { status: r.status || 0, is_custom_error: false, timestamp: T() }, duration: T() - o };
  typeof r.getAllResponseHeaders == "function" && (s.response.headers = Es(r.getAllResponseHeaders()));
  var f = s.response.status, c = e.collectBodyOnError, v = e.extraExtractor;
  try {
    var l = v?.(r.response, s, i);
    l && (s.extra = l), l && (s.response.is_custom_error = true), c && (l || f >= 400) && (s.request.body = i ? "" + i : void 0, s.response.body = r.response ? "" + r.response : void 0);
  } catch {
  }
  return s;
}, Jt = "ajax", Os = { autoWrap: true, setContextAtReq: function() {
  return Ut;
}, ignoreUrls: [], collectBodyOnError: false };
function Ts(r, e) {
  var t = Ue(e, Os);
  if (t) {
    var n = [], a = b(b({}, t), { setContextAtReq: function() {
      return ro(r);
    }, setTraceHeader: go(t.trace) }), o = function() {
      return Pr(r, fo);
    };
    a.autoWrap && In(n, [Pr(r, [Ju, wn(XMLHttpRequest && XMLHttpRequest.prototype)]), o], a), Se(r, Jt, Zr, n), r.provide("wrapXhr", function(i) {
      function u() {
        var s = new i();
        return In(n, [Le(wn(s)), o], a), s;
      }
      return u.prototype = new i(), ["DONE", "HEADERS_RECIEVED", "LOADING", "OPENED", "UNSENT"].forEach(function(s) {
        u[s] = i[s];
      }), u;
    });
  }
}
function ws(r) {
  r.on("init", function() {
    var e, t = (e = r.config()) === null || e === void 0 ? void 0 : e.plugins[Jt];
    Ts(r, t);
  });
}
var Cn = function(r, e, t) {
  var n = S(e, 2), a = n[0], o = n[1], i = t.setTraceHeader, u = t.ignoreUrls, s = t.setContextAtReq, f = t.extractUrl, c = window.Headers, v = window.Request;
  !v || !c || r.push(a[0](function(l) {
    var d = S(l, 2), g = d[0], h = d[1], E = Me(g instanceof v ? g.url : g), p;
    if (!Rs(E) || Gt(u, E)) return x;
    i && i(E, function(R, sr) {
      return Ps(R, sr, g, h, v, c);
    });
    var y = s(), m = T(), O = void 0, D = o()[0](function(R) {
      (E === R.name || p && p === R.name) && !O && (O = R);
    });
    return function(R) {
      p = R && R.url;
      var sr = Cs(g, h, R, v, c, t, m), oe = _s(function(xr) {
        O && (xr.response.timing = O), ho(xr, f), y && y({ ev_type: Zr, payload: xr }), D();
      });
      setTimeout(function() {
        oe(sr);
      }, 1e3);
    };
  }));
}, Rs = function(r) {
  if (!J(r)) return false;
  var e = S(r.split(":"), 2), t = e[0], n = e[1];
  return !n || t === "http" || t === "https";
}, Kt = function(r, e) {
  return r instanceof e;
}, Ps = function(r, e, t, n, a, o) {
  var i;
  Kt(t, a) ? t.headers.set(r, e) : n.headers instanceof o ? n.headers.set(r, e) : n.headers = b(b({}, n.headers), (i = {}, i[r] = e, i));
}, Is = function(r, e, t) {
  var n = e && e.method || "get";
  return Kt(r, t) && (n = r.method || n), n.toLowerCase();
}, An = function(r) {
  for (var e = [], t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
  try {
    return e.reduce(function(n, a) {
      return new r(a || {}).forEach(function(o, i) {
        return !Yt(i, o) && (n[i] = o);
      }), n;
    }, {});
  } catch {
    return {};
  }
}, xn = function(r, e, t) {
  return Kt(r, t) ? r.body : e?.body;
}, Cs = function(r, e, t, n, a, o, i) {
  var u = { api: "fetch", request: { method: Is(r, e, n), timestamp: i, url: Me(r instanceof n ? r.url : r), headers: An(a, r.headers, e.headers) }, response: { status: t && t.status || 0, is_custom_error: false, timestamp: T() }, duration: T() - i }, s = o.collectBodyOnError, f = o.extraExtractor, c = function() {
    var l;
    s && (u.request.body = (l = xn(r, e, n)) === null || l === void 0 ? void 0 : l.toString());
  };
  if (t) try {
    var v = An(a, t.headers);
    u.response.headers = v;
    try {
      (v["content-type"] || "").indexOf("application/json") !== -1 && f && t.clone().json().catch(function() {
        return t.clone().text();
      }).then(function(l) {
        var d, g = f(l, u, (d = xn(r, e, n)) === null || d === void 0 ? void 0 : d.toString());
        g && (u.extra = g, u.response.is_custom_error = true, c());
      }).catch(x);
    } catch {
    }
    t.status >= 400 && c();
  } catch {
  }
  else c();
  return u;
}, Xt = "fetch", As = { autoWrap: true, setContextAtReq: function() {
  return Ut;
}, ignoreUrls: [], collectBodyOnError: false };
function xs(r, e) {
  var t = Ue(e, As);
  if (t) {
    var n = [], a = b(b({}, t), { setContextAtReq: function() {
      return ro(r);
    }, setTraceHeader: go(t.trace) }), o = function() {
      return Pr(r, fo);
    };
    a.autoWrap && Cn(n, [Pr(r, ts), o], a), Se(r, Xt, Zr, n), r.provide("wrapFetch", function(i) {
      var u = void 0;
      return Cn(n, [Le(function(s) {
        u = so(i, s);
      }), o], a), u;
    });
  }
}
function js(r) {
  r.on("init", function() {
    var e, t = (e = r.config()) === null || e === void 0 ? void 0 : e.plugins[Xt];
    xs(r, t);
  });
}
var Ds = ["name", "message", "stack", "filename", "lineno", "colno"], Qt = function(r) {
  var e;
  return Yi(r) ? e = eu(r, Ds) : (Ft(r) || Ji(r) || J(r)) && (e = { message: Rr(r) }), e;
}, Ns = function(r) {
  var e = Qt(r.error);
  if (!e) return e;
  var t = r.colno, n = r.lineno, a = r.filename;
  return t && !e.colno && (e.colno = String(t)), n && !e.lineno && (e.lineno = String(n)), a && !e.filename && (e.filename = a), e;
}, $s = function(r) {
  var e;
  try {
    var t = void 0;
    if ("reason" in r ? t = r.reason : "detail" in r && "reason" in r.detail && (t = r.detail.reason), t) {
      var n = Qt(t);
      return b(b({}, n), { name: (e = n && n.name) !== null && e !== void 0 ? e : "UnhandledRejection" });
    }
  } catch {
  }
}, Ls = function(r) {
  return Ki(r) ? Ns(r) : Xi(r) ? $s(r) : Qt(r);
}, jn = "jsError", Ms = "hidden_3", Dn = function(r) {
  return r.visibilityState === "hidden";
}, Us = function(r, e) {
  var t = gr(), n = P();
  if (!(!t || !n)) {
    var a = function(u) {
      r(u.type === "pagehide" || Dn(t));
    }, o = no(t, "visibilitychange", a, true), i = rr(n, "pagehide", a, true);
    e(function() {
      o(), i();
    }, function(u) {
      u(Dn(t));
    });
  }
}, Fs = [Ms, Us], ks = function(r) {
  return r.readyState === "complete";
}, Bs = "unload_0", Gs = function(r, e) {
  var t = P();
  if (t) {
    var n = S(ao(r), 1), a = n[0], o = ["unload", "beforeunload", "pagehide"], i = function() {
      a();
    }, u = [];
    o.forEach(function(s) {
      u.push(rr(t, s, i, false));
    }), e(function() {
      u.forEach(function(s) {
        return s();
      });
    });
  }
}, Hs = [Bs, Gs], Vs = "history_0", Ws = "hash_0", qs = function(r, e) {
  var t = xu(), n = P();
  if (!(!t || !n)) {
    var a = [], o = function() {
      return r(location.href);
    }, i = function(u) {
      return function() {
        for (var s = [], f = 0; f < arguments.length; f++) s[f] = arguments[f];
        try {
          u.apply(t, s);
        } finally {
          o();
        }
      };
    };
    a.push(dt(t, "pushState", i)(), dt(t, "replaceState", i)()), a.push(rr(n, "popstate", o, true)), e(function() {
      a.forEach(function(u) {
        return u();
      });
    });
  }
}, zs = function(r, e) {
  var t = P();
  if (t) {
    var n = function() {
      return r(location.href);
    }, a = rr(t, "hashchange", n, true);
    e(function() {
      a();
    });
  }
}, Ys = [Ws, zs], Js = [Vs, qs], Ks = function(r) {
  return function(e) {
    var t;
    return r === "hash" ? ((t = Tn(e).hash) === null || t === void 0 ? void 0 : t.replace(/^#/, "")) || "/" : Tn(e).path;
  };
}, mo = function(r) {
  return yo(r, T());
}, yo = function(r, e) {
  return r + "_" + e;
}, Xs = function(r, e, t, n) {
  var a = t, o = e;
  n && n(e);
  var i = function(s, f, c) {
    s !== "user_set" && f !== a ? (a = f, o = c ?? a, n && n(o), r(s, o)) : s === "user_set" && f !== o && (o = f, n && n(o), r(s, o));
  }, u = function() {
    e && r("init", e);
  };
  return [i, u];
}, Qs = function(r, e) {
  var t = e, n = function(a, o) {
    o !== t && (t = o, r(a, t));
  };
  return [n];
}, Zs = function(r, e) {
  return { ev_type: co, payload: { pid: e, source: r } };
}, rf = function(r) {
  return function(e, t) {
    r(Zs(e, t));
  };
}, ht = function(r) {
  return r === "manual";
}, ie = "error_weight", qe = "duration_apdex", kr = "perf_apdex", ef = "action", tf = function() {
  var r;
  return r = { error_count: [0, 0, 0, 0], duration_count: [0, 0, 0] }, r[kr] = {}, r;
}, Nn = function(r, e) {
  var t = r[0] + r[1] + r[2], n = r[0] / t, a = r[2] / t;
  return a > e.frustrating_threshold ? 2 : n > e.satisfying_threshold || t === 0 ? 0 : 1;
}, nf = function() {
  var r = 0, e = void 0, t = function(a) {
    if (a) {
      if (!e) return;
      r += T() - e, e = void 0;
    } else e = T();
  }, n = function() {
    e && (r += T() - e);
    var a = r;
    return r = 0, e = T(), a;
  };
  return [t, n];
}, $n = function(r, e) {
  return function(t, n) {
    var a = t.payload;
    switch (t.ev_type) {
      case cs:
        var o = a.name;
        a.isSupport && r(n[kr], o, a.value);
        break;
      case po:
        r(n[kr], ef, a.duration || 0);
        break;
      case lo:
        e(n[ie], 0);
        break;
      case Zr:
        if (a.response.is_custom_error || a.response.status >= 400) e(n[ie], 1);
        else {
          var i = a.response.timing;
          i && r(n[qe], 0, i.duration);
        }
        break;
      case ss:
        e(n[ie], 2);
        break;
      case ls:
        e(n[ie], 3);
        break;
      case fs:
        r(n[qe], 1, a.duration);
        break;
      case vs:
        a.longtasks.forEach(function(u) {
          r(n[qe], 2, u.duration);
        });
        break;
    }
  };
}, Ln = function() {
  var r, e, t = function() {
    r = [0, 0, 0], e = tf();
  };
  t();
  var n = function(i, u, s) {
    var f = i && i[u];
    if (!(!f || s <= 0)) {
      var c = s < (f[0].threshold || 0) ? 0 : s > (f[1].threshold || 0) ? 2 : 1;
      if (r[c] += f[c].weight, typeof u == "string") {
        var v = yo(u, c), l = e[kr][v];
        e[kr][v] = (l || 0) + 1;
      } else c === 2 && (e.duration_count[u] += 1);
    }
  }, a = function(i, u) {
    i && (r[2] += i[u], e.error_count[u] += 1);
  }, o = function() {
    return [r, e];
  };
  return [n, a, o, t];
}, af = function() {
  var r = { start: T(), end: 0, time_spent: 0, is_bounced: false, entry: "", exit: "", p_count: 0, a_count: 0 }, e = function(i, u) {
    var s = S(i, 3), f = s[0], c = s[1], v = s[2];
    r.end = T(), r.time_spent += u && u.time_spent || 0, r.last_page = u, r.p_count += 1, r.rank = f, r.apdex = c, r.apdex_detail = v;
    var l = gr();
    l && (r.is_bounced = !ks(l));
  }, t = function(i, u) {
    r.time_spent += i.time_spent, r.p_count += 1, r.exit = u;
  }, n = function() {
    r.a_count += 1;
  }, a = function(i) {
    r.entry = i, r.exit = i;
  }, o = function() {
    return r;
  };
  return [e, t, n, a, o];
}, of = function(r, e, t, n) {
  var a = n.sendInit, o = n.initPid, i = n.routeMode, u = n.extractPid, s = n.onPidUpdate, f = ht(i) ? function() {
    return "";
  } : Ks(i), c = u || (function() {
  }), v = function(p) {
    var y;
    return (y = c(p)) !== null && y !== void 0 ? y : f(p);
  }, l = S(Xs(rf(r), o || v(location.href), f(location.href), s), 2), d = l[0], g = l[1];
  if (!ht(i)) {
    var h = S(Qs(function(p, y) {
      return d(p, f(y), c(y));
    }, ""), 1), E = h[0];
    t.length && t.forEach(function(p) {
      return e.push(p[0](function(y) {
        return E(i, y);
      }));
    });
  }
  return a && g(), [d.bind(null, "user_set")];
}, uf = function(r, e, t, n) {
  var a = S(t, 2), o = a[0], i = a[1], u = n.apdex === 2, s = void 0, f = void 0, c = void 0, v = false, l = S(Ln(), 4), d = l[0], g = l[1], h = l[2], E = l[3], p = S(Ln(), 4), y = p[0], m = p[1], O = p[2], D = p[3], R = S(af(), 5), sr = R[0], oe = R[1], xr = R[2], Ci = R[3], Ai = R[4], Sn = S(nf(), 2), xi = Sn[0], ji = Sn[1];
  e.push(o[0](xi)), !u && e.push(i[0](function() {
    if (v) {
      var A = S(O(), 2), q = A[0], We = A[1], Fi = Nn(q, c);
      sr([Fi, q, We], On()), r({ ev_type: vo, payload: Ai() }), D();
    }
  }));
  var Di = $n(d, g), Ni = $n(y, m), $i = function(A) {
    v && (u || (Ni(A, c), A.ev_type === po && xr()), A.common.pid === s[1] && Di(A, c));
  }, On = function() {
    var A = S(h(), 2), q = A[0], We = A[1];
    return { start: s[0], pid: s[1], view_id: s[2], end: T(), time_spent: ji(), apdex: q, rank: Nn(q, c), detail: We };
  }, Li = function(A, q) {
    if (!s) {
      s = [T(), A, q], Ci(A), v = !!(c && s);
      return;
    }
    v && (f = On(), oe(f, A)), s = [T(), A, q], E();
  }, Mi = function(A) {
    v && (A.payload.last = f), r(A);
  }, Ui = function(A) {
    if (!A) {
      e.forEach(function(q) {
        return q();
      }), e.length = 0;
      return;
    }
    c = A, v = !!(c && s);
  };
  return e.push(function() {
    v = false;
  }), [Li, $i, Mi, Ui];
}, Oe = "pageview", sf = { sendInit: true, routeMode: "history", apdex: 2 };
function ff(r, e) {
  var t, n = Ue(e, sf);
  if (!(!n || !Xa())) {
    var a = n.routeMode, o = n.apdex, i = r.report.bind(r), u = x;
    if (o) {
      var s = [], f = S(uf(r.report.bind(r), s, [Pr(r, Fs), Pr(r, Hs)], n), 4), c = f[0], v = f[1], l = f[2], d = f[3];
      i = l, u = c, r.on("send", v), s.push(function() {
        return r.off("send", v);
      }), r.on("start", function() {
        d(r.config().apdex);
      }), Se(r, Oe, vo, s);
    }
    var g = [], h = S(of(i, g, ht(a) ? [] : [r.initSubject(Ys), r.initSubject(Js)], b(b({}, n), { initPid: (t = r.config()) === null || t === void 0 ? void 0 : t.pid, onPidUpdate: function(y) {
      var m = mo(y);
      u(y, m), r.set({ pid: y, viewId: m, actionId: void 0 });
    } })), 1), E = h[0];
    Ka(r, [Mu, Uu(r)], -1);
    var p = function() {
      E(r.config().pid);
    };
    r.on("config", p), g.push(function() {
      return r.off("config", p);
    }), Se(r, Oe, co, g), r.provide("sendPageview", E);
  }
}
function cf(r) {
  r.on("init", function() {
    var e, t = (e = r.config()) === null || e === void 0 ? void 0 : e.plugins[Oe];
    ff(r, t);
  });
}
var vf = "event", lf = "log", df = function(r) {
  if (!(!r || !j(r)) && !(!r.name || !J(r.name))) {
    var e = { name: r.name, type: vf };
    if ("metrics" in r && j(r.metrics)) {
      var t = r.metrics, n = {};
      for (var a in t) $e(t[a]) && (n[a] = t[a]);
      e.metrics = n;
    }
    if ("categories" in r && j(r.categories)) {
      var o = r.categories, i = {};
      for (var a in o) i[a] = Rr(o[a]);
      e.categories = i;
    }
    return "attached_log" in r && J(r.attached_log) && (e.attached_log = r.attached_log), e;
  }
}, pf = function(r) {
  if (!(!r || !j(r)) && !(!r.content || !J(r.content))) {
    var e = r.content, t = { content: Rr(e), type: lf, level: "info" };
    if ("level" in r && (t.level = r.level), "extra" in r && j(r.extra)) {
      var n = r.extra, a = {}, o = {};
      for (var i in n) $e(n[i]) ? a[i] = n[i] : o[i] = Rr(n[i]);
      t.metrics = a, t.categories = o;
    }
    return "attached_log" in r && J(r.attached_log) && (t.attached_log = r.attached_log), t;
  }
}, gf = function(r) {
  var e = function(n) {
    var a = df(n);
    if (a) {
      var o = qu(e);
      o && (a.stacks = o), r.report({ ev_type: Rn, payload: a, extra: { timestamp: T() } });
    }
  }, t = function(n) {
    var a = pf(n);
    a && r.report({ ev_type: Rn, payload: a, extra: { timestamp: T() } });
  };
  r.provide("sendEvent", e), r.provide("sendLog", t);
}, hf = function(r) {
  var e = Qa(), t = gt(e);
  e && (e.onchange = function() {
    t = gt(e);
  }), r.on("report", function(n) {
    return b(b({}, n), { extra: b(b({}, n.extra || {}), { network_type: t }) });
  });
}, ue = function(r, e) {
  var t = r.common || {};
  return t.sample_rate = e, r.common = t, r;
}, mt = function(r, e, t, n, a) {
  return r ? /* @__PURE__ */ (function(o) {
    return function() {
      return o;
    };
  })(a(n, e)) : function() {
    return t(e);
  };
}, mf = function(r, e) {
  return r.map(function(t) {
    switch (e) {
      case "number":
        return Number(t);
      case "boolean":
        return t === "1";
      default:
        return String(t);
    }
  });
}, yf = function(r, e, t) {
  switch (t) {
    case "eq":
      return wr(e, r);
    case "neq":
      return !wr(e, r);
    case "gt":
      return r > e[0];
    case "gte":
      return r >= e[0];
    case "lt":
      return r < e[0];
    case "lte":
      return r <= e[0];
    case "regex":
      return !!r.match(new RegExp(e.join("|")));
    case "not_regex":
      return !r.match(new RegExp(e.join("|")));
    default:
      return false;
  }
}, _f = function(r, e, t, n) {
  var a = Ee(r, e, function(i, u) {
    return i[u];
  });
  if (a === void 0) return false;
  var o = zi(a) ? "bool" : $e(a) ? "number" : "string";
  return yf(a, mf(n, o), t);
}, yt = function(r, e) {
  try {
    return e.type === "rule" ? _f(r, e.field, e.op, e.values) : e.type === "and" ? e.children.every(function(t) {
      return yt(r, t);
    }) : e.children.some(function(t) {
      return yt(r, t);
    });
  } catch (t) {
    return eo(t), false;
  }
}, Ef = function(r, e, t, n, a, o) {
  var i = {};
  return Object.keys(r).forEach(function(u) {
    var s = r[u], f = s.enable, c = s.sample_rate, v = s.conditional_sample_rules;
    f ? (i[u] = { enable: f, sample_rate: c, effectiveSampleRate: c * t, hit: mt(e, c, n, a, o) }, v && (i[u].conditional_hit_rules = v.map(function(l) {
      var d = l.sample_rate, g = l.filter;
      return { sample_rate: d, hit: mt(e, d, n, a, o), effectiveSampleRate: d * t, filter: g };
    }))) : i[u] = { enable: f, hit: function() {
      return false;
    }, sample_rate: 0, effectiveSampleRate: 0 };
  }), i;
}, bf = function(r, e, t, n, a) {
  if (!e) return Ut;
  var o = e.sample_rate, i = e.include_users, u = e.sample_granularity, s = e.rules, f = e.r, c = f === void 0 ? Math.random() : f, v = wr(i, r);
  if (v) return function(h) {
    return ue(h, 1);
  };
  var l = u === "session", d = mt(l, o, t, c, n), g = Ef(s, l, o, t, c, n);
  return function(h) {
    var E;
    if (!d()) return l && a[0](), false;
    if (!(h.ev_type in g)) return ue(h, o);
    if (!g[h.ev_type].enable) return l && a[1](h.ev_type), false;
    if (!((E = h.common) === null || E === void 0) && E.sample_rate) return h;
    var p = g[h.ev_type], y = p.conditional_hit_rules;
    if (y) {
      for (var m = 0; m < y.length; m++) if (yt(h, y[m].filter)) return y[m].hit() ? ue(h, y[m].effectiveSampleRate) : false;
    }
    return p.hit() ? ue(h, p.effectiveSampleRate) : (!(y && y.length) && l && a[1](h.ev_type), false);
  };
}, Sf = function(r) {
  r.on("start", function() {
    var e = r.config(), t = e.userId, n = e.sample, a = [function() {
      r.destroy();
    }, function(i) {
      r.destroyAgent.removeByEvType(i);
    }], o = bf(t, n, Ht, fu, a);
    r.on("build", o);
  });
}, Of = function() {
  var r = P();
  return r && r.navigator.sendBeacon ? { get: function() {
  }, post: function(e, t) {
    r.navigator.sendBeacon(e, t);
  } } : { get: x, post: x };
};
function Tf(r) {
  var e = new Error(r);
  return e.name = "ReqeustServerError", e;
}
function Mn(r) {
  var e = new Error(r);
  return e.name = "RequestNetworkError", e;
}
var Un = function(r, e, t) {
  var n = e.url, a = e.data, o = e.success, i = o === void 0 ? x : o, u = e.fail, s = u === void 0 ? x : u, f = e.getResponseText, c = f === void 0 ? x : f, v = e.withCredentials, l = v === void 0 ? false : v, d = new t();
  d.withCredentials = l, d.open(r, n, true), d.setRequestHeader("Content-Type", "application/json"), d.onload = function() {
    c?.(this.responseText);
    try {
      if (this.status >= 400) s(Tf(this.responseText || this.statusText));
      else if (this.responseText) {
        var g = JSON.parse(this.responseText);
        i(g);
      } else i({});
    } catch (h) {
      s(h);
    }
  }, d.onerror = function() {
    s(Mn("Network request failed"));
  }, d.onabort = function() {
    s(Mn("Network request aborted"));
  }, d.send(a);
}, wf = function() {
  var r = ju();
  return r ? { useBeacon: true, get: function(e) {
    Un("GET", e, r);
  }, post: function(e) {
    Un("POST", e, r);
  } } : { get: x, post: x };
};
function Rf(r) {
  var e = Vi(r), t = e.send;
  return ku(function() {
    if (r.transport.useBeacon) {
      var n = Of(), a = e.getBatchData();
      a && (n.post(e.getEndpoint(), a), e.clear()), e.send = function(o) {
        n.post(e.getEndpoint(), Wa([o]));
      }, Bu(function() {
        e.send = t;
      });
    } else e.flush();
  }), e;
}
var Pf = "mon.zijieapi.com", If = "https://lf3-short.ibytedapm.com/slardar/fe/sdk-web/plugins", Fe = "1.16.4", Cf = "SDK_SLARDAR_WEB", _o = "/monitor_web/settings/browser-settings", Eo = "/monitor_browser/collect/batch/", bo = "SLARDAR", Fn = ["/log/sentry/", Eo, _o], So = "session", Af = ["blankScreen", "action"], xf = { sample_rate: 1, include_users: [], sample_granularity: So, rules: {} }, jf = 20, Df = "";
function Nf(r, e, t) {
  t === void 0 && (t = Lf), Fu(function() {
    r.on("init", function() {
      t(r, e);
    });
  });
}
var Oo = function(r, e, t, n) {
  n === void 0 && (n = Zt);
  var a = e.config(), o = a.plugins, i = a.pluginBundle, u = r.filter(function(f) {
    return o[f] && !e.destroyAgent.has(f);
  }), s = function() {
    return u.forEach(function(f) {
      return _t(e, f, t);
    });
  };
  u.every(function(f) {
    return wo(f, t);
  }) ? s() : n(e, { name: i.name }, s);
}, To = function(r, e, t, n) {
  n === void 0 && (n = Zt);
  var a = e.config().plugins;
  r.filter(function(o) {
    return a[o] && !e.destroyAgent.has(o);
  }).forEach(function(o) {
    wo(o, t) ? _t(e, o, t) : n(e, { name: o, config: a[o] }, function() {
      return _t(e, o, t);
    });
  });
}, $f = function(r) {
  return function(e, t) {
    var n, a = r.config().pluginBundle;
    r.destroyAgent.has(e) && r.destroyAgent.remove(e), t !== void 0 && r.set({ plugins: b(b({}, r.config().plugins), (n = {}, n[e] = t, n)) }), a && ~a.plugins.indexOf(e) ? Oo([e], r) : To([e], r);
  };
};
function Lf(r, e, t) {
  t === void 0 && (t = Zt);
  var n = r.config().pluginBundle, a = n ? n.plugins : [];
  Oo(a, r, e, t), To(Af, r, e, t), r.provide("reloadPlugin", $f(r));
}
function Zt(r, e, t, n) {
  var a = e.name, o = e.config;
  n === void 0 && (n = Gu);
  var i = Mf(r, a, o);
  n(i, function() {
    t();
  });
}
function Mf(r, e, t) {
  var n;
  return (n = t?.path) !== null && n !== void 0 ? n : r.config().pluginPathPrefix + "/" + tu(e) + "." + Fe + "." + Df + "js";
}
function _t(r, e, t) {
  if (t === void 0 && (t = Ar(P())), !!t) {
    var n = rn(t, e);
    if (!n) {
      be("[loader].applyPlugin not found", e);
      return;
    }
    try {
      if (r.destroyAgent.has(e)) return;
      n.apply(r);
    } catch (a) {
      eo(a), be("[loader].applyPlugin failed", e, a);
    }
  }
}
function rn(r, e) {
  return r.plugins.filter(function(t) {
    return t.name === e && t.version === Fe;
  })[0];
}
function wo(r, e) {
  return e === void 0 && (e = Ar(P())), !e || !e.plugins ? false : !!rn(e, r);
}
function Ro(r, e, t) {
  t === void 0 && (t = Ar(P())), !(!t || !t.plugins) && (rn(t, r) || t.plugins.push({ name: r, version: Fe, apply: e }));
}
function Po(r) {
  var e, t, n = ["userId", "deviceId", "sessionId", "env"];
  try {
    for (var a = Bi(n), o = a.next(); !o.done; o = a.next()) {
      var i = o.value;
      r[i] || delete r[i];
    }
  } catch (u) {
    e = { error: u };
  } finally {
    try {
      o && !o.done && (t = a.return) && t.call(a);
    } finally {
      if (e) throw e.error;
    }
  }
  return r;
}
function Uf(r) {
  var e = r.plugins || {};
  for (var t in e) e[t] && !j(e[t]) && (e[t] = {});
  return Po(b(b({}, r), { plugins: e }));
}
function Ff(r) {
  return j(r) && "bid" in r;
}
function kf(r) {
  return Po(b({}, r));
}
function Bf(r) {
  var e;
  if (!r) return {};
  var t = r.sample, n = r.plugins, a = r.timestamp, o = r.quota_rate, i = o === void 0 ? 1 : o, u = r.apdex;
  if (!t) return {};
  var s = t.sample_rate, f = t.sample_granularity, c = f === void 0 ? So : f, v = t.include_users, l = t.rules, d = l === void 0 ? [] : l;
  return { sample: { include_users: v, sample_rate: s * i, sample_granularity: c, rules: d.reduce(function(g, h) {
    var E = h.name, p = h.enable, y = h.sample_rate, m = h.conditional_sample_rules;
    return g[E] = { enable: p, sample_rate: y, conditional_sample_rules: m }, g;
  }, {}) }, plugins: { heatmap: (e = n?.heatmap) !== null && e !== void 0 ? e : false }, apdex: u, serverTimestamp: a };
}
var Gf = function(r, e) {
  return e === void 0 && (e = Eo), (r && r.indexOf("//") >= 0 ? "" : "https://") + r + e;
}, Hf = function(r, e) {
  return e === void 0 && (e = _o), (r && r.indexOf("//") >= 0 ? "" : "https://") + r + e;
}, Vf = function() {
  return pt();
}, Wf = function(r) {
  var e = [];
  return r.observe = function(t) {
    e.push(t);
  }, r.push = function() {
    for (var t, n = [], a = 0; a < arguments.length; a++) n[a] = arguments[a];
    return n.forEach(function(o) {
      e.forEach(function(i) {
        return i(o);
      });
    }), (t = [].push).call.apply(t, U([r], S(n), false));
  }, r;
}, Io = function(r) {
  return bo + r;
}, Co = function(r, e) {
  return bo + r + "::setting::" + e;
}, qf = function(r, e) {
  try {
    var t = localStorage.getItem(r);
    if (!t || !qt() || t[0] !== "{") return;
    zt(r, JSON.parse(t), e);
  } catch {
  }
}, zf = function(r, e) {
  r === void 0 && (r = "");
  var t = { userId: pt(), deviceId: pt() };
  if (e <= 0) return t;
  var n = Io(r);
  qf(n, e);
  var a = oo(n);
  return { userId: a?.userId || t.userId, deviceId: a?.deviceId || t.deviceId };
}, Yf = function(r) {
  var e = r.bid, t = r.userId, n = r.deviceId, a = r.storageExpires, o = Io(e);
  zt(o, { userId: t, deviceId: n }, io(a));
}, Jf = function(r, e) {
  var t = Co(r, e);
  return oo(t);
}, Kf = function(r, e, t, n) {
  var a = Co(e, t);
  zt(a, r, n);
}, Xf = { get: function() {
  return this.__SLARDAR__REPALCE__HOLDER__;
} }, Qf = function(r) {
  var e = r, t, n = {}, a = Xf.get(), o, i = x, u = x;
  return { getConfig: function() {
    return e;
  }, setConfig: function(c) {
    return n = b(b({}, n), c || {}), s(), t || (t = c, e.useLocalConfig || !e.bid ? (o = {}, i()) : a ? f() : Zf(e.transport, e.domain, e.bid, function(v) {
      a = v, f();
    }, e.serverSettingStorageExpires)), e;
  }, onChange: function(c) {
    u = c;
  }, onReady: function(c) {
    i = function() {
      Yf(e), c();
    }, o && i();
  } };
  function s() {
    var c = b(b(b({}, r), o || {}), n);
    c.plugins = Zi(r.plugins, o?.plugins || {}, n.plugins || {}), c.sample = kn(kn(r.sample, o?.sample), n.sample), e = c, u();
  }
  function f() {
    o = Bf(a), s(), i();
  }
};
function Zf(r, e, t, n, a) {
  a === void 0 && (a = 0);
  var o = 3, i = 2e3, u = 1e-3, s = P(), f = Jf(t, e), c = zu(), v = 0, l = false, d;
  if (c()) return y();
  g();
  function g() {
    v++, r.get({ withCredentials: true, url: Hf(e) + "?bid=" + t + "&store=1", success: function(m) {
      h(m.data || {}, true);
    }, fail: E });
  }
  function h(m, O) {
    l || (l = true, O && a && Kf(m, t, e, a), d && (d(), d = void 0), n(m));
  }
  function E(m) {
    if (f) return h(f, false);
    if (p(m) && s) {
      s.setTimeout(g, i);
      return;
    }
    return h({ sample: { sample_rate: u } }, false);
  }
  function p(m) {
    return v >= o || m.name !== "RequestNetworkError" ? false : $u();
  }
  function y() {
    if (f) return h(f, false);
    d = Yu(g);
  }
}
function kn(r, e) {
  if (!r || !e) return r || e;
  var t = b(b({}, r), e);
  return t.include_users = U(U([], S(r.include_users || []), false), S(e.include_users || []), false), t.rules = U(U([], S(Object.keys(r.rules || {})), false), S(Object.keys(e.rules || {})), false).reduce(function(n, a) {
    var o, i;
    return a in n || (a in (r.rules || {}) && a in (e.rules || {}) ? (n[a] = b(b({}, r.rules[a]), e.rules[a]), n[a].conditional_sample_rules = U(U([], S(r.rules[a].conditional_sample_rules || []), false), S(e.rules[a].conditional_sample_rules || []), false)) : n[a] = ((o = r.rules) === null || o === void 0 ? void 0 : o[a]) || ((i = e.rules) === null || i === void 0 ? void 0 : i[a])), n;
  }, {}), t;
}
var rc = { build: function(r) {
  return { ev_type: r.ev_type, payload: r.payload, common: b(b({}, r.extra || {}), r.overrides || {}) };
} }, ec = function(r, e) {
  var t = e || {}, n = t.pid, a = n === void 0 ? "" : n, o = t.viewId, i = o === void 0 ? "" : o, u = { url: Vt(), timestamp: T(), sdk_version: Fe, sdk_name: Cf, pid: a, view_id: i };
  return b(b({}, r), { extra: b(b({}, u), r.extra || {}) });
}, tc = function(r) {
  r.on("report", function(e) {
    return ec(e, r.config());
  }), r.on("init", function() {
    var e = r.config(), t = e.pid, n = e.viewId, a = r.getPreStartQueue();
    a.forEach(function(o, i) {
      var u = o.extra || {};
      a[i] = b(b({}, o), { extra: b(b({}, u), { pid: u.pid || t, view_id: u.view_id || n }) });
    });
  });
}, nc = { sri: "reportSri", st: "reportResourceError", err: "captureException", reject: "captureException" }, ac = function(r) {
  return Object.keys(r).reduce(function(e, t) {
    return e[t] = [], e;
  }, {});
}, oc = function(r) {
  return Object.keys(r).reduce(function(e, t) {
    return e[r[t]] ? e[r[t]].push(t) : e[r[t]] = [t], e;
  }, {});
}, ic = function(r, e, t) {
  return function(n, a, o, i) {
    var u;
    o === void 0 && (o = T()), i === void 0 && (i = location.href);
    var s = b(b({}, to(r)), { url: i, timestamp: o });
    e[n] && (r[t[n]] ? Wt(r, s)(function() {
      r[t[n]](a);
    }) : (u = e[n]) === null || u === void 0 || u.push([a, s]));
  };
}, uc = function(r, e, t) {
  return function(n) {
    n in t && t[n].forEach(function(a) {
      var o;
      (o = e[a]) === null || o === void 0 || o.forEach(function(i) {
        var u = S(i, 2), s = u[0], f = u[1];
        Wt(r, f)(function() {
          r[n](s);
        });
      }), e[a] = null;
    });
  };
}, ze = function(r, e) {
  return e === "err" ? Ee(r, "plugins." + jn + ".onerror", function(t, n) {
    return t[n];
  }) !== false : e === "reject" ? Ee(r, "plugins." + jn + ".onunhandledrejection", function(t, n) {
    return t[n];
  }) !== false : true;
}, sc = function(r, e) {
  var t;
  e === void 0 && (e = nc);
  var n = ac(e), a = oc(e), o = ic(r, n, e);
  !((t = r.p) === null || t === void 0) && t.a && "observe" in r.p.a && r.p.a.observe(function(i) {
    var u = S(i, 5);
    u[0];
    var s = u[1], f = u[2], c = u[3], v = u[4], l = r.config();
    ze(l, s) && o(s, f, c, v);
  }), r.on("init", function() {
    var i, u = r.config();
    (i = r.p) === null || i === void 0 || i.a.forEach(function(s) {
      var f = S(s, 5);
      f[0];
      var c = f[1], v = f[2], l = f[3], d = f[4];
      ze(u, c) && o(c, v, l, d);
    }), r.p && r.p.a && (r.p.a.length = 0), r.provide("precollect", function(s, f, c, v) {
      c === void 0 && (c = T()), v === void 0 && (v = location.href), ze(u, s) && o(s, f, c, v);
    });
  }), r.on("provide", uc(r, n, a));
}, Bn = function(r) {
  var e = S(r, 2), t = e[0], n = e[1];
  return { ev_type: lo, payload: { error: Ls(t), breadcrumbs: [], extra: n || {} }, extra: { bid: "slardar_sdk" } };
}, fc = 1e-3, cc = function(r, e) {
  e === void 0 && (e = fc);
  var t = Ar(P());
  t && (t.errors || (t.errors = []), !("observe" in t.errors) && Ht(e) && (t.errors = Wf(t.errors), t.errors.forEach(function(n) {
    r.report(Bn(n));
  }), t.errors.observe(function(n) {
    r.report(Bn(n));
  })));
}, vc = 700, lc = function(r) {
  var e, t = false;
  r.on("init", function() {
    e = (/* @__PURE__ */ new Date()).getTime(), r.on("config", function() {
      var n, a = (n = r.config()) === null || n === void 0 ? void 0 : n.serverTimestamp;
      if (!(isNaN(a) || Number(a) <= 0 || t)) {
        t = true;
        var o = (/* @__PURE__ */ new Date()).getTime(), i = o - e;
        if (i < vc && a) {
          var u = a - (o + e) / 2;
          !isNaN(u) && (u > 0 || u < -6e5) && r.on("beforeBuild", function(s) {
            var f;
            return b(b({}, s), { extra: b(b({}, (f = s.extra) !== null && f !== void 0 ? f : {}), { sdk_offset: u ?? 0 }) });
          });
        }
      }
    });
  });
}, dc = function(r, e) {
  var t = {};
  return t.bid = e.bid, t.user_id = e.userId, t.device_id = e.deviceId, t.session_id = e.sessionId, t.release = e.release, t.env = e.env, b(b({}, r), { extra: b(b({}, t), r.extra || {}) });
}, pc = function(r) {
  r.on("beforeBuild", function(e) {
    return dc(e, r.config());
  });
}, gc = function(r) {
  r.on("start", function() {
    var e = r.config().bid, t = r.getSender();
    t.setEndpoint(t.getEndpoint() + ("?biz_id=" + e));
  });
}, hc = function(r) {
  var e = io(r.storageExpires), t = zf(r.bid, e);
  return { bid: "", pid: "", viewId: mo("_"), userId: t.userId, deviceId: t.deviceId, storageExpires: e, serverSettingStorageExpires: 0, sessionId: Vf(), domain: Pf, pluginBundle: { name: "commonMonitors", plugins: ["breadcrumb", "jsError", "performance", "resourceError", "resource"] }, pluginPathPrefix: If, plugins: { ajax: { ignoreUrls: Fn }, fetch: { ignoreUrls: Fn }, breadcrumb: {}, pageview: {}, jsError: {}, resource: {}, resourceError: {}, performance: {}, tti: {}, fmp: {}, blankScreen: false, heatmap: false }, release: "", env: "production", sample: xf, transport: wf() };
}, mc = function(r) {
  var e = r === void 0 ? {} : r, t = e.createSender, n = t === void 0 ? function(v) {
    return Rf({ size: jf, endpoint: Gf(v.domain), transport: v.transport });
  } : t, a = e.builder, o = a === void 0 ? rc : a, i = e.createDefaultConfig, u = i === void 0 ? hc : i, s = Ou({ validateInitConfig: Ff, initConfigNormalizer: Uf, userConfigNormalizer: kf, createSender: n, builder: o, createDefaultConfig: u, createConfigManager: Qf });
  cc(s), Tu(s);
  var f = Ar(P());
  Cu(s, f && f.subject), lc(s), pc(s), tc(s), hf(s), gc(s);
  var c = wu(s, to, function(v, l, d) {
    return Wt(v, l)(function() {
      var g = S(d), h = g[0], E = g.slice(1);
      s[h].apply(s, U([], S(E), false));
    });
  });
  return Ru(c, Ro), Au(c), c;
}, Dr, Ye = (Dr = {}, Dr[Oe] = cf, Dr[Jt] = ws, Dr[Xt] = js, Dr), Ao = function(r) {
  r === void 0 && (r = {});
  var e = mc(r);
  return Sf(e), sc(e), gf(e), Object.keys(Ye).forEach(function(t) {
    Ro(t, Ye[t]), Ye[t](e);
  }), Nf(e), e.provide("create", Ao), e;
}, Je = "precollect", Gn = 1e3 * 60 * 5;
function yc(r, e) {
  if ("addEventListener" in r) {
    e.pcErr = function(n) {
      n = n || r.event;
      var a = n.target || n.srcElement || {};
      a instanceof Element || a instanceof HTMLElement ? e(Je, "st", { tagName: a.tagName, url: a.getAttribute("href") || a.getAttribute("src") }) : e(Je, "err", n.error);
    }, e.pcRej = function(n) {
      n = n || r.event, e(Je, "reject", n.reason || n.detail && n.detail.reason);
    };
    var t = [];
    t.push(rr(r, "error", e.pcErr, true)), t.push(rr(r, "unhandledrejection", e.pcRej, true)), setTimeout(function() {
      t.forEach(function(n) {
        return n();
      });
    }, Gn);
  }
  "PerformanceObserver" in r && "PerformanceLongTaskTiming" in r && (e.pp = { entries: [] }, e.pp.observer = new PerformanceObserver(function(n) {
    e.pp.entries = e.pp.entries.concat(n.getEntries());
  }), e.pp.observer.observe({ entryTypes: ["longtask"] }), setTimeout(function() {
    e.pp.observer.disconnect();
  }, Gn));
}
var he = Ao(), Hn = P();
Hn && yc(Hn, he);
const Vn = ["RequestError", "AbortError", "TimeoutError", "cancelled", "Stream read timeout after", "get cert timeout", "internal/net", "unexcepted status code", "ETIMEDOUT", "ECONNRESET", "Invalid WebSocket frame", "WebSocket was closed", "/ws/lib/", "Request failed:"], _c = [{ pattern: /([/\\]Users[/\\])[^/\\]+([/\\])/gi, replacement: "$1[USERNAME]$2" }, { pattern: /([/\\])\d+(?:\.\d+){1,}([/\\])/g, replacement: "$1[VERSION]$2" }, { pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, replacement: "[UUID]" }, { pattern: /[\d.]+ ?(bytes|[KMGT]i?B)\b/gi, replacement: "[SIZE] $1" }, { pattern: /[\d.]+%/g, replacement: "[PERCENT]" }];
function Wn(r) {
  let e = r;
  for (const t of _c) e = e.replace(t.pattern, t.replacement);
  return e;
}
function Ec(r) {
  if (Vn.length === 0) return false;
  let e = "";
  return r instanceof Error ? e = `${r.name} ${r.message} ${r.stack ?? ""}` : typeof r == "string" ? e = r : e = String(r), Vn.some((t) => e.includes(t));
}
function bc(r) {
  const t = new URLSearchParams(window.location.search).get("global_config"), n = JSON.parse(t ?? "{}");
  he.on("beforeSend", (a) => {
    const i = a?.payload?.error;
    if (i) {
      const u = { name: i.name ?? "", message: i.message ?? "", stack: i.stack ?? "" };
      if (Ec(u)) return false;
      i.message && (i.message = Wn(i.message)), i.stack && (i.stack = Wn(i.stack));
    }
    return a;
  }), he.init({ bid: "luna_pc", deviceId: n.deviceId, userId: n.deviceId, pid: r, release: "3.7.0", env: "production" }), he.start();
}
bc("captcha");
var L = function() {
  return L = Object.assign || function(e) {
    for (var t, n = 1, a = arguments.length; n < a; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, L.apply(this, arguments);
};
typeof Object.assign != "function" && Object.defineProperty(Object, "assign", { value: function(e, t) {
  if (e == null) throw new TypeError("Cannot convert undefined or null to object");
  for (var n = Object(e), a = 1; a < arguments.length; a++) {
    var o = arguments[a];
    if (o != null) for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i]);
  }
  return n;
}, writable: true, configurable: true });
var qn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xo(r, e, t) {
  return t = { path: e, exports: {}, require: function(n, a) {
    return Sc(n, a ?? t.path);
  } }, r(t, t.exports), t.exports;
}
function Sc() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var se = function(r) {
  return r && r.Math == Math && r;
}, _ = se(typeof globalThis == "object" && globalThis) || se(typeof window == "object" && window) || se(typeof self == "object" && self) || se(typeof qn == "object" && qn) || /* @__PURE__ */ (function() {
  return this;
})() || Function("return this")(), en = Function.prototype, zn = en.apply, Oc = en.bind, Yn = en.call, jo = typeof Reflect == "object" && Reflect.apply || (Oc ? Yn.bind(zn) : function() {
  return Yn.apply(zn, arguments);
}), Do = Function.prototype, Et = Do.bind, bt = Do.call, Tc = Et && Et.bind(bt), C = Et ? function(r) {
  return r && Tc(bt, r);
} : function(r) {
  return r && function() {
    return bt.apply(r, arguments);
  };
}, I = function(r) {
  return typeof r == "function";
}, W = function(r) {
  try {
    return !!r();
  } catch {
    return true;
  }
}, er = !W(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] != 7;
}), Nr = Function.prototype.call, N = Nr.bind ? Nr.bind(Nr) : function() {
  return Nr.apply(Nr, arguments);
}, No = {}.propertyIsEnumerable, $o = Object.getOwnPropertyDescriptor, wc = $o && !No.call({ 1: 2 }, 1), Rc = wc ? function(e) {
  var t = $o(this, e);
  return !!t && t.enumerable;
} : No, Pc = { f: Rc }, lr = function(r, e) {
  return { enumerable: !(r & 1), configurable: !(r & 2), writable: !(r & 4), value: e };
}, Ic = C({}.toString), Cc = C("".slice), br = function(r) {
  return Cc(Ic(r), 8, -1);
}, Ke = _.Object, Ac = C("".split), xc = W(function() {
  return !Ke("z").propertyIsEnumerable(0);
}) ? function(r) {
  return br(r) == "String" ? Ac(r, "") : Ke(r);
} : Ke, jc = _.TypeError, tn = function(r) {
  if (r == null) throw jc("Can't call method on " + r);
  return r;
}, re = function(r) {
  return xc(tn(r));
}, V = function(r) {
  return typeof r == "object" ? r !== null : I(r);
}, z = {}, Jn = function(r) {
  return I(r) ? r : void 0;
}, nr = function(r, e) {
  return arguments.length < 2 ? Jn(z[r]) || Jn(_[r]) : z[r] && z[r][e] || _[r] && _[r][e];
}, Br = C({}.isPrototypeOf), Sr = nr("navigator", "userAgent") || "", Kn = _.process, Xn = _.Deno, Qn = Kn && Kn.versions || Xn && Xn.version, Zn = Qn && Qn.v8, B, Te;
Zn && (B = Zn.split("."), Te = B[0] > 0 && B[0] < 4 ? 1 : +(B[0] + B[1]));
!Te && Sr && (B = Sr.match(/Edge\/(\d+)/), (!B || B[1] >= 74) && (B = Sr.match(/Chrome\/(\d+)/), B && (Te = +B[1])));
var we = Te, St = !!Object.getOwnPropertySymbols && !W(function() {
  var r = Symbol();
  return !String(r) || !(Object(r) instanceof Symbol) || !Symbol.sham && we && we < 41;
}), nn = St && !Symbol.sham && typeof Symbol.iterator == "symbol", Dc = _.Object, Ot = nn ? function(r) {
  return typeof r == "symbol";
} : function(r) {
  var e = nr("Symbol");
  return I(e) && Br(e.prototype, Dc(r));
}, Nc = _.String, ke = function(r) {
  try {
    return Nc(r);
  } catch {
    return "Object";
  }
}, $c = _.TypeError, K = function(r) {
  if (I(r)) return r;
  throw $c(ke(r) + " is not a function");
}, Re = function(r, e) {
  var t = r[e];
  return t == null ? void 0 : K(t);
}, Lc = _.TypeError, Mc = function(r, e) {
  var t, n;
  if (I(t = r.toString) && !V(n = N(t, r)) || I(t = r.valueOf) && !V(n = N(t, r))) return n;
  throw Lc("Can't convert object to primitive value");
}, Uc = true, Fc = Object.defineProperty, kc = function(r, e) {
  try {
    Fc(_, r, { value: e, configurable: true, writable: true });
  } catch {
    _[r] = e;
  }
  return e;
}, ra = "__core-js_shared__", Bc = _[ra] || kc(ra, {}), ir = Bc, Lo = xo(function(r) {
  (r.exports = function(e, t) {
    return ir[e] || (ir[e] = t !== void 0 ? t : {});
  })("versions", []).push({ version: "3.20.1", mode: "pure", copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)" });
}), Gc = _.Object, Mo = function(r) {
  return Gc(tn(r));
}, Hc = C({}.hasOwnProperty), $ = Object.hasOwn || function(e, t) {
  return Hc(Mo(e), t);
}, Vc = 0, Wc = Math.random(), qc = C(1 .toString), Uo = function(r) {
  return "Symbol(" + (r === void 0 ? "" : r) + ")_" + qc(++Vc + Wc, 36);
}, mr = Lo("wks"), dr = _.Symbol, ea = dr && dr.for, zc = nn ? dr : dr && dr.withoutSetter || Uo, F = function(r) {
  if (!$(mr, r) || !(St || typeof mr[r] == "string")) {
    var e = "Symbol." + r;
    St && $(dr, r) ? mr[r] = dr[r] : nn && ea ? mr[r] = ea(e) : mr[r] = zc(e);
  }
  return mr[r];
}, Yc = _.TypeError, Jc = F("toPrimitive"), Kc = function(r, e) {
  if (!V(r) || Ot(r)) return r;
  var t = Re(r, Jc), n;
  if (t) {
    if (n = N(t, r, e), !V(n) || Ot(n)) return n;
    throw Yc("Can't convert object to primitive value");
  }
  return Mc(r);
}, Fo = function(r) {
  var e = Kc(r, "string");
  return Ot(e) ? e : e + "";
}, Tt = _.document, Xc = V(Tt) && V(Tt.createElement), Pe = function(r) {
  return Xc ? Tt.createElement(r) : {};
}, ko = !er && !W(function() {
  return Object.defineProperty(Pe("div"), "a", { get: function() {
    return 7;
  } }).a != 7;
}), ta = Object.getOwnPropertyDescriptor, Qc = er ? ta : function(e, t) {
  if (e = re(e), t = Fo(t), ko) try {
    return ta(e, t);
  } catch {
  }
  if ($(e, t)) return lr(!N(Pc.f, e, t), e[t]);
}, an = { f: Qc }, Zc = /#|\.prototype\./, ee = function(r, e) {
  var t = ev[rv(r)];
  return t == nv ? true : t == tv ? false : I(e) ? W(e) : !!e;
}, rv = ee.normalize = function(r) {
  return String(r).replace(Zc, ".").toLowerCase();
}, ev = ee.data = {}, tv = ee.NATIVE = "N", nv = ee.POLYFILL = "P", Bo = ee, na = C(C.bind), Gr = function(r, e) {
  return K(r), e === void 0 ? r : na ? na(r, e) : function() {
    return r.apply(e, arguments);
  };
}, av = _.String, ov = _.TypeError, k = function(r) {
  if (V(r)) return r;
  throw ov(av(r) + " is not an object");
}, iv = _.TypeError, aa = Object.defineProperty, uv = er ? aa : function(e, t, n) {
  if (k(e), t = Fo(t), k(n), ko) try {
    return aa(e, t, n);
  } catch {
  }
  if ("get" in n || "set" in n) throw iv("Accessors not supported");
  return "value" in n && (e[t] = n.value), e;
}, te = { f: uv }, M = er ? function(r, e, t) {
  return te.f(r, e, lr(1, t));
} : function(r, e, t) {
  return r[e] = t, r;
}, sv = an.f, fv = function(r) {
  var e = function(t, n, a) {
    if (this instanceof e) {
      switch (arguments.length) {
        case 0:
          return new r();
        case 1:
          return new r(t);
        case 2:
          return new r(t, n);
      }
      return new r(t, n, a);
    }
    return jo(r, this, arguments);
  };
  return e.prototype = r.prototype, e;
}, ar = function(r, e) {
  var t = r.target, n = r.global, a = r.stat, o = r.proto, i = n ? _ : a ? _[t] : (_[t] || {}).prototype, u = n ? z : z[t] || M(z, t, {})[t], s = u.prototype, f, c, v, l, d, g, h, E, p;
  for (l in e) f = Bo(n ? l : t + (a ? "." : "#") + l, r.forced), c = !f && i && $(i, l), g = u[l], c && (r.noTargetGet ? (p = sv(i, l), h = p && p.value) : h = i[l]), d = c && h ? h : e[l], !(c && typeof g == typeof d) && (r.bind && c ? E = Gr(d, _) : r.wrap && c ? E = fv(d) : o && I(d) ? E = C(d) : E = d, (r.sham || d && d.sham || g && g.sham) && M(E, "sham", true), M(u, l, E), o && (v = t + "Prototype", $(z, v) || M(z, v, {}), M(z[v], l, d), r.real && s && !s[l] && M(s, l, d)));
}, oa = Lo("keys"), on = function(r) {
  return oa[r] || (oa[r] = Uo(r));
}, cv = !W(function() {
  function r() {
  }
  return r.prototype.constructor = null, Object.getPrototypeOf(new r()) !== r.prototype;
}), ia = on("IE_PROTO"), wt = _.Object, vv = wt.prototype, Ie = cv ? wt.getPrototypeOf : function(r) {
  var e = Mo(r);
  if ($(e, ia)) return e[ia];
  var t = e.constructor;
  return I(t) && e instanceof t ? t.prototype : e instanceof wt ? vv : null;
}, lv = _.String, dv = _.TypeError, pv = function(r) {
  if (typeof r == "object" || I(r)) return r;
  throw dv("Can't set " + lv(r) + " as a prototype");
}, Ce = Object.setPrototypeOf || ("__proto__" in {} ? (function() {
  var r = false, e = {}, t;
  try {
    t = C(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set), t(e, []), r = e instanceof Array;
  } catch {
  }
  return function(a, o) {
    return k(a), pv(o), r ? t(a, o) : a.__proto__ = o, a;
  };
})() : void 0), gv = Math.ceil, hv = Math.floor, un = function(r) {
  var e = +r;
  return e !== e || e === 0 ? 0 : (e > 0 ? hv : gv)(e);
}, mv = Math.max, yv = Math.min, _v = function(r, e) {
  var t = un(r);
  return t < 0 ? mv(t + e, 0) : yv(t, e);
}, Ev = Math.min, bv = function(r) {
  return r > 0 ? Ev(un(r), 9007199254740991) : 0;
}, Go = function(r) {
  return bv(r.length);
}, Sv = function(r) {
  return function(e, t, n) {
    var a = re(e), o = Go(a), i = _v(n, o), u;
    if (r && t != t) {
      for (; o > i; ) if (u = a[i++], u != u) return true;
    } else for (; o > i; i++) if ((r || i in a) && a[i] === t) return r || i || 0;
    return !r && -1;
  };
}, Ov = { indexOf: Sv(false) }, sn = {}, Tv = Ov.indexOf, ua = C([].push), Ho = function(r, e) {
  var t = re(r), n = 0, a = [], o;
  for (o in t) !$(sn, o) && $(t, o) && ua(a, o);
  for (; e.length > n; ) $(t, o = e[n++]) && (~Tv(a, o) || ua(a, o));
  return a;
}, Ae = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"], wv = Ae.concat("length", "prototype"), Rv = Object.getOwnPropertyNames || function(e) {
  return Ho(e, wv);
}, Pv = { f: Rv }, Iv = Object.getOwnPropertySymbols, Cv = { f: Iv }, Av = C([].concat), xv = nr("Reflect", "ownKeys") || function(e) {
  var t = Pv.f(k(e)), n = Cv.f;
  return n ? Av(t, n(e)) : t;
}, jv = function(r, e, t) {
  for (var n = xv(e), a = te.f, o = an.f, i = 0; i < n.length; i++) {
    var u = n[i];
    !$(r, u) && !(t && $(t, u)) && a(r, u, o(e, u));
  }
}, Dv = Object.keys || function(e) {
  return Ho(e, Ae);
}, Nv = er ? Object.defineProperties : function(e, t) {
  k(e);
  for (var n = re(t), a = Dv(t), o = a.length, i = 0, u; o > i; ) te.f(e, u = a[i++], n[u]);
  return e;
}, Rt = nr("document", "documentElement"), sa = ">", fa = "<", Pt = "prototype", It = "script", Vo = on("IE_PROTO"), Xe = function() {
}, Wo = function(r) {
  return fa + It + sa + r + fa + "/" + It + sa;
}, ca = function(r) {
  r.write(Wo("")), r.close();
  var e = r.parentWindow.Object;
  return r = null, e;
}, $v = function() {
  var r = Pe("iframe"), e = "java" + It + ":", t;
  return r.style.display = "none", Rt.appendChild(r), r.src = String(e), t = r.contentWindow.document, t.open(), t.write(Wo("document.F=Object")), t.close(), t.F;
}, fe, me = function() {
  try {
    fe = new ActiveXObject("htmlfile");
  } catch {
  }
  me = typeof document < "u" ? document.domain && fe ? ca(fe) : $v() : ca(fe);
  for (var r = Ae.length; r--; ) delete me[Pt][Ae[r]];
  return me();
};
sn[Vo] = true;
var Be = Object.create || function(e, t) {
  var n;
  return e !== null ? (Xe[Pt] = k(e), n = new Xe(), Xe[Pt] = null, n[Vo] = e) : n = me(), t === void 0 ? n : Nv(n, t);
}, Lv = C("".replace), Mv = (function(r) {
  return String(Error(r).stack);
})("zxcasd"), qo = /\n\s*at [^:]*:[^\n]*/, Uv = qo.test(Mv), Fv = function(r, e) {
  if (Uv && typeof r == "string") for (; e--; ) r = Lv(r, qo, "");
  return r;
}, kv = function(r, e) {
  V(e) && "cause" in e && M(r, "cause", e.cause);
}, tr = {}, Bv = F("iterator"), Gv = Array.prototype, Hv = function(r) {
  return r !== void 0 && (tr.Array === r || Gv[Bv] === r);
}, Vv = F("toStringTag"), zo = {};
zo[Vv] = "z";
var fn = String(zo) === "[object z]", Wv = F("toStringTag"), qv = _.Object, zv = br(/* @__PURE__ */ (function() {
  return arguments;
})()) == "Arguments", Yv = function(r, e) {
  try {
    return r[e];
  } catch {
  }
}, ne = fn ? br : function(r) {
  var e, t, n;
  return r === void 0 ? "Undefined" : r === null ? "Null" : typeof (t = Yv(e = qv(r), Wv)) == "string" ? t : zv ? br(e) : (n = br(e)) == "Object" && I(e.callee) ? "Arguments" : n;
}, Jv = F("iterator"), Yo = function(r) {
  if (r != null) return Re(r, Jv) || Re(r, "@@iterator") || tr[ne(r)];
}, Kv = _.TypeError, Xv = function(r, e) {
  var t = arguments.length < 2 ? Yo(r) : e;
  if (K(t)) return k(N(t, r));
  throw Kv(ke(r) + " is not iterable");
}, va = function(r, e, t) {
  var n, a;
  k(r);
  try {
    if (n = Re(r, "return"), !n) {
      if (e === "throw") throw t;
      return t;
    }
    n = N(n, r);
  } catch (o) {
    a = true, n = o;
  }
  if (e === "throw") throw t;
  if (a) throw n;
  return k(n), t;
}, Qv = _.TypeError, ye = function(r, e) {
  this.stopped = r, this.result = e;
}, la = ye.prototype, Hr = function(r, e, t) {
  var n = t && t.that, a = !!(t && t.AS_ENTRIES), o = !!(t && t.IS_ITERATOR), i = !!(t && t.INTERRUPTED), u = Gr(e, n), s, f, c, v, l, d, g, h = function(p) {
    return s && va(s, "normal", p), new ye(true, p);
  }, E = function(p) {
    return a ? (k(p), i ? u(p[0], p[1], h) : u(p[0], p[1])) : i ? u(p, h) : u(p);
  };
  if (o) s = r;
  else {
    if (f = Yo(r), !f) throw Qv(ke(r) + " is not iterable");
    if (Hv(f)) {
      for (c = 0, v = Go(r); v > c; c++) if (l = E(r[c]), l && Br(la, l)) return l;
      return new ye(false);
    }
    s = Xv(r, f);
  }
  for (d = s.next; !(g = N(d, s)).done; ) {
    try {
      l = E(g.value);
    } catch (p) {
      va(s, "throw", p);
    }
    if (typeof l == "object" && l && Br(la, l)) return l;
  }
  return new ye(false);
}, Zv = _.String, cn = function(r) {
  if (ne(r) === "Symbol") throw TypeError("Cannot convert a Symbol value to a string");
  return Zv(r);
}, rl = function(r, e) {
  return r === void 0 ? arguments.length < 2 ? "" : e : cn(r);
}, el = !W(function() {
  var r = Error("a");
  return "stack" in r ? (Object.defineProperty(r, "stack", lr(1, 7)), r.stack !== 7) : true;
}), tl = F("toStringTag"), xe = _.Error, nl = [].push, Vr = function(e, t) {
  var n = arguments.length > 2 ? arguments[2] : void 0, a = Br(Qe, this), o;
  Ce ? o = Ce(new xe(), a ? Ie(this) : Qe) : (o = a ? this : Be(Qe), M(o, tl, "Error")), t !== void 0 && M(o, "message", rl(t)), el && M(o, "stack", Fv(o.stack, 1)), kv(o, n);
  var i = [];
  return Hr(e, nl, { that: i }), M(o, "errors", i), o;
};
Ce ? Ce(Vr, xe) : jv(Vr, xe, { name: true });
var Qe = Vr.prototype = Be(xe.prototype, { constructor: lr(1, Vr), message: lr(1, ""), name: lr(1, "AggregateError") });
ar({ global: true }, { AggregateError: Vr });
var al = C(Function.toString);
I(ir.inspectSource) || (ir.inspectSource = function(r) {
  return al(r);
});
var vn = ir.inspectSource, da = _.WeakMap, ol = I(da) && /native code/.test(vn(da)), pa = "Object already initialized", Ct = _.TypeError, il = _.WeakMap, je, Wr, De, ul = function(r) {
  return De(r) ? Wr(r) : je(r, {});
}, sl = function(r) {
  return function(e) {
    var t;
    if (!V(e) || (t = Wr(e)).type !== r) throw Ct("Incompatible receiver, " + r + " required");
    return t;
  };
};
if (ol || ir.state) {
  var fr = ir.state || (ir.state = new il()), fl = C(fr.get), ga = C(fr.has), cl = C(fr.set);
  je = function(r, e) {
    if (ga(fr, r)) throw new Ct(pa);
    return e.facade = r, cl(fr, r, e), e;
  }, Wr = function(r) {
    return fl(fr, r) || {};
  }, De = function(r) {
    return ga(fr, r);
  };
} else {
  var yr = on("state");
  sn[yr] = true, je = function(r, e) {
    if ($(r, yr)) throw new Ct(pa);
    return e.facade = r, M(r, yr, e), e;
  }, Wr = function(r) {
    return $(r, yr) ? r[yr] : {};
  }, De = function(r) {
    return $(r, yr);
  };
}
var hr = { set: je, get: Wr, has: De, enforce: ul, getterFor: sl }, Jo = Function.prototype, vl = er && Object.getOwnPropertyDescriptor, Ko = $(Jo, "name"), ll = Ko && (function() {
}).name === "something";
Ko && (!er || er && vl(Jo, "name").configurable);
var dl = { PROPER: ll }, Xo = function(r, e, t, n) {
  M(r, e, t);
}, At = F("iterator"), Qo = false, Z, Ze, rt;
[].keys && (rt = [].keys(), "next" in rt ? (Ze = Ie(Ie(rt)), Ze !== Object.prototype && (Z = Ze)) : Qo = true);
var pl = Z == null || W(function() {
  var r = {};
  return Z[At].call(r) !== r;
});
pl ? Z = {} : Z = Be(Z);
I(Z[At]) || Xo(Z, At, function() {
  return this;
});
var Zo = { IteratorPrototype: Z, BUGGY_SAFARI_ITERATORS: Qo }, gl = fn ? {}.toString : function() {
  return "[object " + ne(this) + "]";
}, hl = te.f, ha = F("toStringTag"), ln = function(r, e, t, n) {
  if (r) {
    var a = t ? r : r.prototype;
    $(a, ha) || hl(a, ha, { configurable: true, value: e }), fn || M(a, "toString", gl);
  }
}, ml = Zo.IteratorPrototype, yl = function() {
  return this;
}, _l = function(r, e, t, n) {
  var a = e + " Iterator";
  return r.prototype = Be(ml, { next: lr(1, t) }), ln(r, a, false), tr[a] = yl, r;
}, El = dl.PROPER, et = Zo.BUGGY_SAFARI_ITERATORS, bl = F("iterator"), ma = "keys", ce = "values", ya = "entries", Sl = function() {
  return this;
}, ri = function(r, e, t, n, a, o, i) {
  _l(t, e, n);
  var u = function(E) {
    if (E === a && l) return l;
    if (!et && E in c) return c[E];
    switch (E) {
      case ma:
        return function() {
          return new t(this, E);
        };
      case ce:
        return function() {
          return new t(this, E);
        };
      case ya:
        return function() {
          return new t(this, E);
        };
    }
    return function() {
      return new t(this);
    };
  }, s = e + " Iterator", f = false, c = r.prototype, v = c[bl] || c["@@iterator"] || a && c[a], l = !et && v || u(a), d = e == "Array" && c.entries || v, g, h;
  return d && (g = Ie(d.call(new r())), g !== Object.prototype && g.next && (ln(g, s, true), tr[s] = Sl)), El && a == ce && v && v.name !== ce && (f = true, l = function() {
    return N(v, this);
  }), a && (h = { values: u(ce), keys: u(ma), entries: u(ya) }, ar({ target: e, proto: true, forced: et || f }, h)), tr[e] = l, h;
}, ei = "Array Iterator", Ol = hr.set, Tl = hr.getterFor(ei);
ri(Array, "Array", function(r, e) {
  Ol(this, { type: ei, target: re(r), index: 0, kind: e });
}, function() {
  var r = Tl(this), e = r.target, t = r.kind, n = r.index++;
  return !e || n >= e.length ? (r.target = void 0, { value: void 0, done: true }) : t == "keys" ? { value: n, done: false } : t == "values" ? { value: e[n], done: false } : { value: [n, e[n]], done: false };
}, "values");
tr.Arguments = tr.Array;
var qr = _.Promise, wl = function(r, e, t) {
  for (var n in e) Xo(r, n, e[n]);
  return r;
}, _a = F("species"), Rl = function(r) {
  var e = nr(r), t = te.f;
  er && e && !e[_a] && t(e, _a, { configurable: true, get: function() {
    return this;
  } });
}, Pl = _.TypeError, Il = function(r, e) {
  if (Br(e, r)) return r;
  throw Pl("Incorrect invocation");
}, ti = F("iterator"), ni = false;
try {
  var Cl = 0, Ea = { next: function() {
    return { done: !!Cl++ };
  }, return: function() {
    ni = true;
  } };
  Ea[ti] = function() {
    return this;
  }, Array.from(Ea, function() {
    throw 2;
  });
} catch {
}
var Al = function(r, e) {
  if (!ni) return false;
  var t = false;
  try {
    var n = {};
    n[ti] = function() {
      return { next: function() {
        return { done: t = true };
      } };
    }, r(n);
  } catch {
  }
  return t;
}, ai = function() {
}, xl = [], oi = nr("Reflect", "construct"), dn = /^\s*(?:class|function)\b/, jl = C(dn.exec), Dl = !dn.exec(ai), $r = function(e) {
  if (!I(e)) return false;
  try {
    return oi(ai, xl, e), true;
  } catch {
    return false;
  }
}, ii = function(e) {
  if (!I(e)) return false;
  switch (ne(e)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return false;
  }
  try {
    return Dl || !!jl(dn, vn(e));
  } catch {
    return true;
  }
};
ii.sham = true;
var Nl = !oi || W(function() {
  var r;
  return $r($r.call) || !$r(Object) || !$r(function() {
    r = true;
  }) || r;
}) ? ii : $r, $l = _.TypeError, Ll = function(r) {
  if (Nl(r)) return r;
  throw $l(ke(r) + " is not a constructor");
}, Ml = F("species"), ui = function(r, e) {
  var t = k(r).constructor, n;
  return t === void 0 || (n = k(t)[Ml]) == null ? e : Ll(n);
}, Ul = C([].slice), si = /(?:ipad|iphone|ipod).*applewebkit/i.test(Sr), ur = br(_.process) == "process", xt = _.setImmediate, ba = _.clearImmediate, Fl = _.process, tt = _.Dispatch, kl = _.Function, Sa = _.MessageChannel, Bl = _.String, nt = 0, Ur = {}, Oa = "onreadystatechange", zr, cr, at, ot;
try {
  zr = _.location;
} catch {
}
var pn = function(r) {
  if ($(Ur, r)) {
    var e = Ur[r];
    delete Ur[r], e();
  }
}, it = function(r) {
  return function() {
    pn(r);
  };
}, Ta = function(r) {
  pn(r.data);
}, wa = function(r) {
  _.postMessage(Bl(r), zr.protocol + "//" + zr.host);
};
(!xt || !ba) && (xt = function(e) {
  var t = Ul(arguments, 1);
  return Ur[++nt] = function() {
    jo(I(e) ? e : kl(e), void 0, t);
  }, cr(nt), nt;
}, ba = function(e) {
  delete Ur[e];
}, ur ? cr = function(r) {
  Fl.nextTick(it(r));
} : tt && tt.now ? cr = function(r) {
  tt.now(it(r));
} : Sa && !si ? (at = new Sa(), ot = at.port2, at.port1.onmessage = Ta, cr = Gr(ot.postMessage, ot)) : _.addEventListener && I(_.postMessage) && !_.importScripts && zr && zr.protocol !== "file:" && !W(wa) ? (cr = wa, _.addEventListener("message", Ta, false)) : Oa in Pe("script") ? cr = function(r) {
  Rt.appendChild(Pe("script"))[Oa] = function() {
    Rt.removeChild(this), pn(r);
  };
} : cr = function(r) {
  setTimeout(it(r), 0);
});
var fi = { set: xt }, Gl = /ipad|iphone|ipod/i.test(Sr) && _.Pebble !== void 0, Hl = /web0s(?!.*chrome)/i.test(Sr), Vl = an.f, ut = fi.set, Ra = _.MutationObserver || _.WebKitMutationObserver, Pa = _.document, Ia = _.process, ve = _.Promise, Ca = Vl(_, "queueMicrotask"), ci = Ca && Ca.value, Lr, vr, Fr, _r, st, ft, le, Aa;
ci || (Lr = function() {
  var r, e;
  for (ur && (r = Ia.domain) && r.exit(); vr; ) {
    e = vr.fn, vr = vr.next;
    try {
      e();
    } catch (t) {
      throw vr ? _r() : Fr = void 0, t;
    }
  }
  Fr = void 0, r && r.enter();
}, !si && !ur && !Hl && Ra && Pa ? (st = true, ft = Pa.createTextNode(""), new Ra(Lr).observe(ft, { characterData: true }), _r = function() {
  ft.data = st = !st;
}) : !Gl && ve && ve.resolve ? (le = ve.resolve(void 0), le.constructor = ve, Aa = Gr(le.then, le), _r = function() {
  Aa(Lr);
}) : ur ? _r = function() {
  Ia.nextTick(Lr);
} : (ut = Gr(ut, _), _r = function() {
  ut(Lr);
}));
var gn = ci || function(r) {
  var e = { fn: r, next: void 0 };
  Fr && (Fr.next = e), vr || (vr = e, _r()), Fr = e;
}, Wl = function(r) {
  var e, t;
  this.promise = new r(function(n, a) {
    if (e !== void 0 || t !== void 0) throw TypeError("Bad Promise constructor");
    e = n, t = a;
  }), this.resolve = K(e), this.reject = K(t);
}, ql = function(r) {
  return new Wl(r);
}, ae = { f: ql }, jt = function(r, e) {
  if (k(r), V(e) && e.constructor === r) return e;
  var t = ae.f(r), n = t.resolve;
  return n(e), t.promise;
}, zl = function(r, e) {
  var t = _.console;
  t && t.error && (arguments.length == 1 ? t.error(r) : t.error(r, e));
}, Yr = function(r) {
  try {
    return { error: false, value: r() };
  } catch (e) {
    return { error: true, value: e };
  }
}, vi = function() {
  this.head = null, this.tail = null;
};
vi.prototype = { add: function(r) {
  var e = { item: r, next: null };
  this.head ? this.tail.next = e : this.head = e, this.tail = e;
}, get: function() {
  var r = this.head;
  if (r) return this.head = r.next, this.tail === r && (this.tail = null), r.item;
} };
var Yl = vi, Jl = typeof window == "object", li = fi.set, Kl = F("species"), X = "Promise", xa = hr.getterFor(X), Xl = hr.set, Ql = hr.getterFor(X), Zl = qr && qr.prototype, H = qr, _e = Zl, di = _.TypeError, Dt = _.document, hn = _.process, Ir = ae.f, rd = Ir, ed = !!(Dt && Dt.createEvent && _.dispatchEvent), pi = I(_.PromiseRejectionEvent), gi = "unhandledrejection", td = "rejectionhandled", ja = 0, hi = 1, nd = 2, mn = 1, mi = 2, Da = false, de, Na, yn, Ge = Bo(X, function() {
  var r = vn(H), e = r !== String(H);
  if (!e && we === 66 || !_e.finally) return true;
  if (we >= 51 && /native code/.test(r)) return false;
  var t = new H(function(o) {
    o(1);
  }), n = function(o) {
    o(function() {
    }, function() {
    });
  }, a = t.constructor = {};
  return a[Kl] = n, Da = t.then(function() {
  }) instanceof n, Da ? !e && Jl && !pi : true;
}), ad = Ge || !Al(function(r) {
  H.all(r).catch(function() {
  });
}), yi = function(r) {
  var e;
  return V(r) && I(e = r.then) ? e : false;
}, _i = function(r, e) {
  var t = e.value, n = e.state == hi, a = n ? r.ok : r.fail, o = r.resolve, i = r.reject, u = r.domain, s, f, c;
  try {
    a ? (n || (e.rejection === mi && id(e), e.rejection = mn), a === true ? s = t : (u && u.enter(), s = a(t), u && (u.exit(), c = true)), s === r.promise ? i(di("Promise-chain cycle")) : (f = yi(s)) ? N(f, s, o, i) : o(s)) : i(t);
  } catch (v) {
    u && !c && u.exit(), i(v);
  }
}, Ei = function(r, e) {
  r.notified || (r.notified = true, gn(function() {
    for (var t = r.reactions, n; n = t.get(); ) _i(n, r);
    r.notified = false, e && !r.rejection && od(r);
  }));
}, bi = function(r, e, t) {
  var n, a;
  ed ? (n = Dt.createEvent("Event"), n.promise = e, n.reason = t, n.initEvent(r, false, true), _.dispatchEvent(n)) : n = { promise: e, reason: t }, !pi && (a = _["on" + r]) ? a(n) : r === gi && zl("Unhandled promise rejection", t);
}, od = function(r) {
  N(li, _, function() {
    var e = r.facade, t = r.value, n = $a(r), a;
    if (n && (a = Yr(function() {
      ur ? hn.emit("unhandledRejection", t, e) : bi(gi, e, t);
    }), r.rejection = ur || $a(r) ? mi : mn, a.error)) throw a.value;
  });
}, $a = function(r) {
  return r.rejection !== mn && !r.parent;
}, id = function(r) {
  N(li, _, function() {
    var e = r.facade;
    ur ? hn.emit("rejectionHandled", e) : bi(td, e, r.value);
  });
}, Er = function(r, e, t) {
  return function(n) {
    r(e, n, t);
  };
}, Or = function(r, e, t) {
  r.done || (r.done = true, t && (r = t), r.value = e, r.state = nd, Ei(r, true));
}, Nt = function(r, e, t) {
  if (!r.done) {
    r.done = true, t && (r = t);
    try {
      if (r.facade === e) throw di("Promise can't be resolved itself");
      var n = yi(e);
      n ? gn(function() {
        var a = { done: false };
        try {
          N(n, e, Er(Nt, a, r), Er(Or, a, r));
        } catch (o) {
          Or(a, o, r);
        }
      }) : (r.value = e, r.state = hi, Ei(r, false));
    } catch (a) {
      Or({ done: false }, a, r);
    }
  }
};
Ge && (H = function(e) {
  Il(this, _e), K(e), N(de, this);
  var t = xa(this);
  try {
    e(Er(Nt, t), Er(Or, t));
  } catch (n) {
    Or(t, n);
  }
}, _e = H.prototype, de = function(e) {
  Xl(this, { type: X, done: false, notified: false, parent: false, reactions: new Yl(), rejection: false, state: ja, value: void 0 });
}, de.prototype = wl(_e, { then: function(e, t) {
  var n = Ql(this), a = Ir(ui(this, H));
  return n.parent = true, a.ok = I(e) ? e : true, a.fail = I(t) && t, a.domain = ur ? hn.domain : void 0, n.state == ja ? n.reactions.add(a) : gn(function() {
    _i(a, n);
  }), a.promise;
}, catch: function(r) {
  return this.then(void 0, r);
} }), Na = function() {
  var r = new de(), e = xa(r);
  this.promise = r, this.resolve = Er(Nt, e), this.reject = Er(Or, e);
}, ae.f = Ir = function(r) {
  return r === H || r === yn ? new Na(r) : rd(r);
});
ar({ global: true, wrap: true, forced: Ge }, { Promise: H });
ln(H, X, false);
Rl(X);
yn = nr(X);
ar({ target: X, stat: true, forced: Ge }, { reject: function(e) {
  var t = Ir(this);
  return N(t.reject, void 0, e), t.promise;
} });
ar({ target: X, stat: true, forced: Uc }, { resolve: function(e) {
  return jt(this === yn ? H : this, e);
} });
ar({ target: X, stat: true, forced: ad }, { all: function(e) {
  var t = this, n = Ir(t), a = n.resolve, o = n.reject, i = Yr(function() {
    var u = K(t.resolve), s = [], f = 0, c = 1;
    Hr(e, function(v) {
      var l = f++, d = false;
      c++, N(u, t, v).then(function(g) {
        d || (d = true, s[l] = g, --c || a(s));
      }, o);
    }), --c || a(s);
  });
  return i.error && o(i.value), n.promise;
}, race: function(e) {
  var t = this, n = Ir(t), a = n.reject, o = Yr(function() {
    var i = K(t.resolve);
    Hr(e, function(u) {
      N(i, t, u).then(n.resolve, a);
    });
  });
  return o.error && a(o.value), n.promise;
} });
ar({ target: "Promise", stat: true }, { allSettled: function(e) {
  var t = this, n = ae.f(t), a = n.resolve, o = n.reject, i = Yr(function() {
    var u = K(t.resolve), s = [], f = 0, c = 1;
    Hr(e, function(v) {
      var l = f++, d = false;
      c++, N(u, t, v).then(function(g) {
        d || (d = true, s[l] = { status: "fulfilled", value: g }, --c || a(s));
      }, function(g) {
        d || (d = true, s[l] = { status: "rejected", reason: g }, --c || a(s));
      });
    }), --c || a(s);
  });
  return i.error && o(i.value), n.promise;
} });
var La = "No one promise resolved";
ar({ target: "Promise", stat: true }, { any: function(e) {
  var t = this, n = nr("AggregateError"), a = ae.f(t), o = a.resolve, i = a.reject, u = Yr(function() {
    var s = K(t.resolve), f = [], c = 0, v = 1, l = false;
    Hr(e, function(d) {
      var g = c++, h = false;
      v++, N(s, t, d).then(function(E) {
        h || l || (l = true, o(E));
      }, function(E) {
        h || l || (h = true, f[g] = E, --v || i(new n(f, La)));
      });
    }), --v || i(new n(f, La));
  });
  return u.error && i(u.value), a.promise;
} });
var ud = !!qr && W(function() {
  qr.prototype.finally.call({ then: function() {
  } }, function() {
  });
});
ar({ target: "Promise", proto: true, real: true, forced: ud }, { finally: function(r) {
  var e = ui(this, nr("Promise")), t = I(r);
  return this.then(t ? function(n) {
    return jt(e, r()).then(function() {
      return n;
    });
  } : r, t ? function(n) {
    return jt(e, r()).then(function() {
      throw n;
    });
  } : r);
} });
var sd = C("".charAt), Ma = C("".charCodeAt), fd = C("".slice), cd = function(r) {
  return function(e, t) {
    var n = cn(tn(e)), a = un(t), o = n.length, i, u;
    return a < 0 || a >= o ? r ? "" : void 0 : (i = Ma(n, a), i < 55296 || i > 56319 || a + 1 === o || (u = Ma(n, a + 1)) < 56320 || u > 57343 ? r ? sd(n, a) : i : r ? fd(n, a, a + 2) : (i - 55296 << 10) + (u - 56320) + 65536);
  };
}, vd = { charAt: cd(true) }, ld = vd.charAt, Si = "String Iterator", dd = hr.set, pd = hr.getterFor(Si);
ri(String, "String", function(r) {
  dd(this, { type: Si, string: cn(r), index: 0 });
}, function() {
  var e = pd(this), t = e.string, n = e.index, a;
  return n >= t.length ? { value: void 0, done: true } : (a = ld(t, n), e.index += a.length, { value: a, done: false });
});
var gd = z.Promise, hd = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 }, Ua = F("toStringTag");
for (var ct in hd) {
  var Fa = _[ct], vt = Fa && Fa.prototype;
  vt && ne(vt) !== Ua && M(vt, Ua, ct), tr[ct] = tr.Array;
}
var md = gd, Jr = md, yd = 10, _d = 1e3, Ed = function(r) {
  return JSON.stringify({ ev_type: "batch", list: r });
};
function bd(r) {
  var e = r.transport, t = r.endpoint, n = r.size, a = n === void 0 ? yd : n, o = r.wait, i = o === void 0 ? _d : o, u = [], s = 0, f = { getSize: function() {
    return a;
  }, getWait: function() {
    return i;
  }, setSize: function(v) {
    a = v;
  }, setWait: function(v) {
    i = v;
  }, getEndpoint: function() {
    return t;
  }, setEndpoint: function(v) {
    t = v;
  }, send: function(v) {
    u.push(v), u.length >= a && c.call(this), clearTimeout(s), s = setTimeout(c.bind(this), i);
  }, flush: function() {
    clearTimeout(s), c.call(this);
  }, getBatchData: function() {
    return u.length ? Ed(u) : "";
  }, clear: function() {
    clearTimeout(s), u = [];
  } };
  function c() {
    u.length && (e.post({ url: t, data: this.getBatchData() }), u = []);
  }
  return f;
}
var w = function() {
  return w = Object.assign || function(e) {
    for (var t, n = 1, a = arguments.length; n < a; n++) {
      t = arguments[n];
      for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, w.apply(this, arguments);
};
function G(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t) return r;
  var n = t.call(r), a, o = [], i;
  try {
    for (; (e === void 0 || e-- > 0) && !(a = n.next()).done; ) o.push(a.value);
  } catch (u) {
    i = { error: u };
  } finally {
    try {
      a && !a.done && (t = n.return) && t.call(n);
    } finally {
      if (i) throw i.error;
    }
  }
  return o;
}
function Q(r, e, t) {
  if (arguments.length === 2) for (var n = 0, a = e.length, o; n < a; n++) (o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]);
  return r.concat(o || Array.prototype.slice.call(e));
}
var Sd = ["init", "start", "config", "beforeDestroy", "provide", "report", "beforeBuild", "build", "beforeSend", "send", "beforeConfig"], Ne = function() {
};
function Od(r) {
  return r;
}
function Y(r) {
  return typeof r == "object" && r !== null;
}
var Td = Object.prototype;
function Oi(r) {
  return Td.toString.call(r) === "[object Array]";
}
function wd(r) {
  return typeof r == "boolean";
}
function _n(r) {
  return typeof r == "number";
}
function En(r) {
  return typeof r == "string";
}
function Kr(r, e) {
  if (!Oi(r) || r.length === 0) return false;
  for (var t = 0; t < r.length; ) {
    if (r[t] === e) return true;
    t++;
  }
  return false;
}
var Rd = function(r, e) {
  if (!Oi(r)) return r;
  var t = r.indexOf(e);
  if (t >= 0) {
    var n = r.slice();
    return n.splice(t, 1), n;
  }
  return r;
}, Pd = function(r, e, t) {
  for (var n, a, o = e.split("."), i = G(o), u = i[0], s = i.slice(1); r && s.length > 0; ) r = r[u], n = s, a = G(n), u = a[0], s = a.slice(1);
  if (r) return t(r, u);
};
function Xr(r) {
  try {
    return En(r) ? r : JSON.stringify(r);
  } catch (e) {
    return "[FAILED_TO_STRINGIFY]:" + String(e);
  }
}
function Id() {
  var r = {}, e = {}, t = { set: function(n, a) {
    return r[n] = a, e[n] = Xr(a), t;
  }, merge: function(n) {
    return r = w(w({}, r), n), Object.keys(n).forEach(function(a) {
      e[a] = Xr(n[a]);
    }), t;
  }, delete: function(n) {
    return delete r[n], delete e[n], t;
  }, clear: function() {
    return r = {}, e = {}, t;
  }, get: function(n) {
    return e[n];
  }, toString: function() {
    return w({}, e);
  } };
  return t;
}
var Cd = 0, Ad = function() {
  for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
  console.error.apply(console, Q(["[SDK]", Date.now(), ("" + Cd++).padStart(8, " ")], G(r), false));
}, xd = 0, ka = function() {
  for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
  console.warn.apply(console, Q(["[SDK]", Date.now(), ("" + xd++).padStart(8, " ")], G(r), false));
}, jd = function(r) {
  return Math.random() < Number(r);
}, Dd = function(r, e) {
  return r < Number(e);
}, pe = function(r) {
  return function(e) {
    for (var t = e, n = 0; n < r.length && t; n++) try {
      t = r[n](t);
    } catch (a) {
      Ad(a);
    }
    return t;
  };
};
function Nd() {
  for (var r = new Array(16), e = 0, t = 0; t < 16; t++) (t & 3) === 0 && (e = Math.random() * 4294967296), r[t] = e >>> ((t & 3) << 3) & 255;
  return r;
}
function $d(r) {
  for (var e = [], t = 0; t < 256; ++t) e[t] = (t + 256).toString(16).substr(1);
  var n = 0, a = e;
  return [a[r[n++]], a[r[n++]], a[r[n++]], a[r[n++]], "-", a[r[n++]], a[r[n++]], "-", a[r[n++]], a[r[n++]], "-", a[r[n++]], a[r[n++]], "-", a[r[n++]], a[r[n++]], a[r[n++]], a[r[n++]], a[r[n++]], a[r[n++]]].join("");
}
function bn() {
  var r = Nd();
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, $d(r);
}
function Ld(r) {
  var e = r.builder, t = r.createSender, n = r.createDefaultConfig, a = r.createConfigManager, o = r.userConfigNormalizer, i = r.initConfigNormalizer, u = r.validateInitConfig, s, f, c = {};
  Sd.forEach(function(p) {
    return c[p] = [];
  });
  var v = false, l = false, d = [], g = [], h = { getBuilder: function() {
    return e;
  }, getSender: function() {
    return s;
  }, getPreStartQueue: function() {
    return d;
  }, init: function(p) {
    if (v) {
      ka("already inited");
      return;
    }
    if (p && Y(p) && u(p)) {
      var y = n(p);
      if (!y) throw new Error("defaultConfig missing");
      var m = i(p);
      if (f = a(y), f.setConfig(m), f.onChange(function() {
        E("config");
      }), s = t(f.getConfig()), !s) throw new Error("sender missing");
      v = true, E("init", true);
    } else throw new Error("invalid InitConfig, init failed");
  }, set: function(p) {
    v && p && Y(p) && (E("beforeConfig", false, p), f?.setConfig(p));
  }, config: function(p) {
    if (v) return p && Y(p) && (E("beforeConfig", false, p), f?.setConfig(o(p))), f?.getConfig();
  }, provide: function(p, y) {
    if (Kr(g, p)) {
      ka("cannot provide " + p + ", reserved");
      return;
    }
    h[p] = y, E("provide", false, p);
  }, start: function() {
    var p = this;
    v && (l || f?.onReady(function() {
      l = true, E("start", true), d.forEach(function(y) {
        return p.build(y);
      }), d = [];
    }));
  }, report: function(p) {
    if (p) {
      var y = pe(c.report)(p);
      y && (l ? this.build(y) : d.push(y));
    }
  }, build: function(p) {
    if (l) {
      var y = pe(c.beforeBuild)(p);
      if (y) {
        var m = e.build(y);
        if (m) {
          var O = pe(c.build)(m);
          O && this.send(O);
        }
      }
    }
  }, send: function(p) {
    if (l) {
      var y = pe(c.beforeSend)(p);
      y && (s.send(y), E("send", false, y));
    }
  }, destroy: function() {
    E("beforeDestroy", true);
  }, on: function(p, y) {
    p === "init" && v || p === "start" && l ? y() : c[p] && c[p].push(y);
  }, off: function(p, y) {
    c[p] && (c[p] = Rd(c[p], y));
  } };
  return g = Object.keys(h), h;
  function E(p, y) {
    y === void 0 && (y = false);
    for (var m = [], O = 2; O < arguments.length; O++) m[O - 2] = arguments[O];
    c[p].forEach(function(D) {
      try {
        D.apply(void 0, Q([], G(m), false));
      } catch {
      }
    }), y && (c[p].length = 0);
  }
}
var Md = function(r) {
  var e = Id();
  r.provide("context", e), r.on("report", function(t) {
    return t.extra || (t.extra = {}), t.extra.context = e.toString(), t;
  });
};
function Ud(r) {
  r.on("init", function() {
    var e = [], t = r.config();
    !t || !t.integrations || t.integrations.forEach(function(n) {
      Kr(e, n.name) || (e.push(n.name), n.setup(r), n.tearDown && r.on("beforeDestroy", n.tearDown));
    });
  });
}
function Fd() {
  if (typeof window == "object" && Y(window)) return window;
}
var kd = function(r) {
  if (r) return r.__SLARDAR_REGISTRY__ || (r.__SLARDAR_REGISTRY__ = { Slardar: { plugins: [], errors: [] } }), r.__SLARDAR_REGISTRY__.Slardar;
}, Bd = function() {
  for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
  var t = kd(Fd());
  t && (t.errors || (t.errors = []), t.errors.push(r));
}, Ba = "custom", Gd = "event", Hd = "log", Vd = function(r) {
  if (!(!r || !Y(r)) && !(!r.name || !En(r.name))) {
    var e = { name: r.name, type: Gd };
    if ("metrics" in r && Y(r.metrics)) {
      var t = r.metrics, n = {};
      for (var a in t) _n(t[a]) && (n[a] = t[a]);
      e.metrics = n;
    }
    if ("categories" in r && Y(r.categories)) {
      var o = r.categories, i = {};
      for (var a in o) i[a] = Xr(o[a]);
      e.categories = i;
    }
    return e;
  }
}, Wd = function(r) {
  if (!(!r || !Y(r)) && !(!r.content || !En(r.content))) {
    var e = r.content, t = { content: Xr(e), type: Hd, level: "info" };
    if ("level" in r && (t.level = r.level), "extra" in r && Y(r.extra)) {
      var n = r.extra, a = {}, o = {};
      for (var i in n) _n(n[i]) ? a[i] = n[i] : o[i] = Xr(n[i]);
      t.metrics = a, t.categories = o;
    }
    return t;
  }
}, qd = function(r) {
  var e = function(n) {
    var a = Vd(n);
    a && r.report({ ev_type: Ba, payload: a, extra: { timestamp: Date.now() } });
  }, t = function(n) {
    var a = Wd(n);
    a && r.report({ ev_type: Ba, payload: a, extra: { timestamp: Date.now() } });
  };
  r.provide("sendEvent", e), r.provide("sendLog", t);
}, ge = function(r, e) {
  var t = r.common || {};
  return t.sample_rate = e, r.common = t, r;
}, $t = function(r, e, t, n, a) {
  return r ? /* @__PURE__ */ (function(o) {
    return function() {
      return o;
    };
  })(a(n, e)) : function() {
    return t(e);
  };
}, zd = function(r, e) {
  return r.map(function(t) {
    switch (e) {
      case "number":
        return Number(t);
      case "boolean":
        return t === "1";
      default:
        return String(t);
    }
  });
}, Yd = function(r, e, t) {
  switch (t) {
    case "eq":
      return Kr(e, r);
    case "neq":
      return !Kr(e, r);
    case "gt":
      return r > e[0];
    case "gte":
      return r >= e[0];
    case "lt":
      return r < e[0];
    case "lte":
      return r <= e[0];
    case "regex":
      return !!r.match(new RegExp(e.join("|")));
    case "not_regex":
      return !r.match(new RegExp(e.join("|")));
    default:
      return false;
  }
}, Jd = function(r, e, t, n) {
  var a = Pd(r, e, function(i, u) {
    return i[u];
  });
  if (a === void 0) return false;
  var o = wd(a) ? "bool" : _n(a) ? "number" : "string";
  return Yd(a, zd(n, o), t);
}, Lt = function(r, e) {
  try {
    return e.type === "rule" ? Jd(r, e.field, e.op, e.values) : e.type === "and" ? e.children.every(function(t) {
      return Lt(r, t);
    }) : e.children.some(function(t) {
      return Lt(r, t);
    });
  } catch (t) {
    return Bd(t), false;
  }
}, Kd = function(r, e, t, n, a, o) {
  var i = {};
  return Object.keys(r).forEach(function(u) {
    var s = r[u], f = s.enable, c = s.sample_rate, v = s.conditional_sample_rules;
    f ? (i[u] = { enable: f, sample_rate: c, effectiveSampleRate: c * t, hit: $t(e, c, n, a, o) }, v && (i[u].conditional_hit_rules = v.map(function(l) {
      var d = l.sample_rate, g = l.filter;
      return { sample_rate: d, hit: $t(e, d, n, a, o), effectiveSampleRate: d * t, filter: g };
    }))) : i[u] = { enable: f, hit: function() {
      return false;
    }, sample_rate: 0, effectiveSampleRate: 0 };
  }), i;
}, Xd = function(r, e, t, n) {
  if (!e) return Od;
  var a = e.sample_rate, o = e.include_users, i = e.sample_granularity, u = e.rules, s = e.r, f = s === void 0 ? Math.random() : s, c = Kr(o, r);
  if (c) return function(g) {
    return ge(g, 1);
  };
  var v = i === "session", l = $t(v, a, t, f, n), d = Kd(u, v, a, t, f, n);
  return function(g) {
    var h;
    if (!l()) return false;
    if (!(g.ev_type in d)) return ge(g, a);
    if (!d[g.ev_type].enable) return false;
    if (!((h = g.common) === null || h === void 0) && h.sample_rate) return g;
    var E = d[g.ev_type], p = E.conditional_hit_rules;
    if (p) {
      for (var y = 0; y < p.length; y++) if (Lt(g, p[y].filter)) return p[y].hit() ? ge(g, p[y].effectiveSampleRate) : false;
    }
    return E.hit() ? ge(g, E.effectiveSampleRate) : false;
  };
}, Qd = function(r) {
  r.on("start", function() {
    var e = r.config(), t = e.userId, n = e.sample, a = Xd(t, n, jd, Dd);
    r.on("build", a);
  });
}, Zd = { build: function(r) {
  return { ev_type: r.ev_type, payload: r.payload, common: w(w({}, r.extra || {}), r.overrides || {}) };
} }, rp = function(r) {
  var e = r, t, n = {}, a = Ne, o = Ne;
  return { getConfig: function() {
    return e;
  }, setConfig: function(u) {
    return n = w(w({}, n), u || {}), i(), t || (t = u, a()), e;
  }, onChange: function(u) {
    o = u;
  }, onReady: function(u) {
    a = u, t && a();
  } };
  function i() {
    var u = w(w({}, r), n);
    u.sample = ep(r.sample, n.sample), e = u, o();
  }
};
function ep(r, e) {
  if (!r || !e) return r || e;
  var t = w(w({}, r), e);
  return t.include_users = Q(Q([], G(r.include_users || []), false), G(e.include_users || []), false), t.rules = Q(Q([], G(Object.keys(r.rules || {})), false), G(Object.keys(e.rules || {})), false).reduce(function(n, a) {
    var o, i;
    return a in n || (a in (r.rules || {}) && a in (e.rules || {}) ? (n[a] = w(w({}, r.rules[a]), e.rules[a]), n[a].conditional_sample_rules = Q(Q([], G(r.rules[a].conditional_sample_rules || []), false), G(e.rules[a].conditional_sample_rules || []), false)) : n[a] = ((o = r.rules) === null || o === void 0 ? void 0 : o[a]) || ((i = e.rules) === null || i === void 0 ? void 0 : i[a])), n;
  }, {}), t;
}
var tp = "mon.zijieapi.com", np = "1.0.2", ap = "SDK_BASE", op = "/monitor_browser/collect/batch/", ip = { sample_rate: 1, include_users: [], sample_granularity: "session", rules: {} }, up = 20;
function sp(r) {
  return w({}, r);
}
function fp(r) {
  return Y(r) && "bid" in r && "transport" in r;
}
function cp(r) {
  return w({}, r);
}
var vp = function(r, e) {
  var t = { url: "", protocol: "", domain: "", path: "", query: "", timestamp: Date.now(), sdk_version: e.version || np, sdk_name: e.name || ap };
  return w(w({}, r), { extra: w(w({}, t), r.extra || {}) });
}, lp = function(r) {
  r.on("report", function(e) {
    return vp(e, r.config());
  });
}, dp = function(r, e) {
  var t = {};
  return t.bid = e.bid, t.pid = e.pid, t.view_id = e.viewId, t.user_id = e.userId, t.device_id = e.deviceId, t.session_id = e.sessionId, t.release = e.release, t.env = e.env, w(w({}, r), { extra: w(w({}, t), r.extra || {}) });
}, pp = function(r) {
  r.on("beforeBuild", function(e) {
    return dp(e, r.config());
  });
};
function gp(r) {
  return bd(r);
}
var hp = function(r, e) {
  return e === void 0 && (e = op), (r && r.indexOf("//") >= 0 ? "" : "https://") + r + e;
}, mp = function() {
  return bn();
}, yp = function() {
  return bn();
}, _p = function(r) {
  return r + "_" + Date.now();
}, Ep = function() {
  return bn();
}, bp = function(r) {
  return { bid: "", pid: "", viewId: _p("_"), userId: mp(), deviceId: yp(), sessionId: Ep(), domain: tp, release: "", env: "production", sample: ip, plugins: {}, transport: { get: Ne, post: Ne } };
}, Sp = function(r) {
  var e = r === void 0 ? {} : r, t = e.createSender, n = t === void 0 ? function(f) {
    return gp({ size: up, endpoint: hp(f.domain), transport: f.transport });
  } : t, a = e.builder, o = a === void 0 ? Zd : a, i = e.createDefaultConfig, u = i === void 0 ? bp : i, s = Ld({ validateInitConfig: fp, initConfigNormalizer: sp, userConfigNormalizer: cp, createSender: n, builder: o, createDefaultConfig: u, createConfigManager: rp });
  return Md(s), pp(s), lp(s), Ud(s), s;
}, Ti = function(r) {
  r === void 0 && (r = {});
  var e = Sp(r);
  return Qd(e), qd(e), e;
};
Ti();
var Cr = "cn", Op = "https://vcs.zijieapi.com", wi = { cn: "https://mcs.zijieapi.com" }, Tp = 5e3, wp = "h5_", He = { setting: "/vc/setting", report: function(r) {
  return ["ttp", "tcpy"].indexOf(r) !== -1 ? "/v1/list" : "/list";
}, webid: function(r) {
  return ["ttp", "tcpy"].indexOf(r) !== -1 ? "/v1/user/webid" : "/webid";
} }, Rp = function(r) {
  for (var e = Object.keys(r), t = "", n = 0; n < e.length; n++) {
    var a = e[n], o = r[a], i = encodeURIComponent(a) + "=" + encodeURIComponent(o);
    n >= 1 ? t = t + "&" + i : t = i;
  }
  return t;
}, Pp = function(r) {
  var e = r.commonOptions;
  return { aid: e.aid };
}, Ip = function(r) {
  var e = Object.prototype.toString.call(r);
  return e.slice(8, -1);
}, Cp = (function() {
  function r() {
    this.isInit = false, this.pid = "0", this.filename = "";
  }
  return r.prototype.init = function(e, t) {
    if (!this.isInit) {
      this.isInit = true, this.pid = String(e.aid), this.browserSlardar = Ti();
      var n = { transport: { get: function() {
      }, post: function(a) {
        var o = a.url, i = a.data;
        t(o, JSON.parse(i));
      } }, bid: "verify_center_cn", pid: this.pid, release: "3.8.6", env: Cr, sample: { sample_rate: 1, include_users: [], sample_granularity: "session", rules: { pageview: { enable: true, sample_rate: 0.01 }, js_error: { enable: true, sample_rate: 1 }, resource_error: { enable: true, sample_rate: 0.01 }, http: { enable: true, sample_rate: 0.01 }, resource: { enable: true, sample_rate: 0.01 } } } };
      this.browserSlardar.init(n), this.browserSlardar.context.merge({ belong: "hotsdk" });
    }
  }, r.prototype.start = function() {
    var e = this;
    this.browserSlardar.start(), this.reportPageview(), window.addEventListener("error", function(t) {
      var n;
      Ip(t) === "ErrorEvent" && e.filename && t.filename === e.filename && e.reportJsError({ message: t?.message, stack: (n = t?.error) === null || n === void 0 ? void 0 : n.stack, filename: t?.filename });
    }, true);
  }, r.prototype.destroy = function() {
    this.browserSlardar.destroy();
  }, r.prototype.reportPageview = function() {
    this.browserSlardar.report({ ev_type: "pageview", payload: { pid: this.pid, source: "init" } });
  }, r.prototype.reportJsError = function(e) {
    this.browserSlardar.report({ ev_type: "js_error", payload: { error: { name: "JS ERROR", message: e.message, stack: e.stack, filename: e.filename || this.filename }, breadcrumbs: [] } });
  }, r.prototype.reportHttp = function(e) {
    this.browserSlardar.report({ ev_type: "http", payload: { api: "xhr", request: { method: e.method, url: e.url }, response: { status: e.status, is_custom_error: false, timestamp: Date.now() }, duration: e.duration } });
  }, r.prototype.reportResourceError = function(e) {
    this.browserSlardar.report({ ev_type: "resource_error", payload: { type: "script", url: e } });
  }, r.prototype.reportResource = function(e) {
    this.browserSlardar.report({ ev_type: "resource", payload: { entryType: "resource", name: e.url, duration: e.duration, startTime: e.startTime } });
  }, r.prototype.setFileName = function(e) {
    this.filename = e;
  }, r;
})(), pr = new Cp(), Ri = (function(r) {
  var e = r.url, t = r.method, n = r.data, a = r.config;
  return new Jr(function(o, i) {
    var u = new XMLHttpRequest(), s = Date.now(), f = function() {
      r.url.indexOf(He.setting) !== -1 && pr.reportHttp({ url: e, method: t, duration: Date.now() - s, status: u.status });
    };
    u.onreadystatechange = function() {
      if (u.readyState === u.DONE) {
        if (u.status >= 200 && u.status < 300) {
          var h = {}, E = u.response || u.responseText, p = u.getResponseHeader("Content-Type") || u.getResponseHeader("content-type");
          if (p && p.indexOf("application/json") !== -1) try {
            h = JSON.parse(E);
          } catch {
          }
          else h = E;
          setTimeout(function() {
            o(h);
          }, 0);
        } else i(new TypeError("Network request failed, status: " + u.status));
        f();
      }
    }, u.onerror = function() {
      setTimeout(function() {
        i(new TypeError("Network request failed, occur error"));
      }, 0), f();
    }, u.ontimeout = function() {
      setTimeout(function() {
        i(new TypeError("Network request failed, timeout"));
      }, 0), f();
    }, u.onabort = function() {
      setTimeout(function() {
        i(new DOMException("Aborted", "AbortError"));
      }, 0), f();
    };
    var c = e;
    if (a?.params && (c = c + "?" + Rp(a.params)), u.open(t, c, true), a?.timeout && typeof a.timeout == "number" ? u.timeout = a.timeout : u.timeout = Tp, a?.headers) for (var v = a.headers, l = 0, d = Object.keys(v); l < d.length; l++) {
      var g = d[l];
      u.setRequestHeader(g, v[g]);
    }
    a?.withCredentials && (u.withCredentials = a.withCredentials), t.toUpperCase() === "POST" && n ? u.send(JSON.stringify(n)) : u.send(null);
  });
}), Ap = function(r, e) {
  return e === void 0 && (e = {}), Ri({ url: r, method: "GET", config: e });
}, Ve = function(r, e, t) {
  t === void 0 && (t = {});
  var n = t.headers ? L({ "Content-Type": "application/json" }, t.headers) : { "Content-Type": "application/json" };
  return Ri({ url: r, method: "POST", data: e, config: L(L({}, t), { headers: n }) });
}, xp = (function(r) {
  var e = { exports: {} }, t = new Function("exports", "module", r);
  try {
    t(e.exports, e);
  } catch (n) {
    pr.reportJsError({ message: n?.message, stack: n?.stack, filename: n?.filename });
  }
  return e;
});
xo(function(r, e) {
  (function(t) {
    var n;
    if (r.exports = t(), n = true, !n) {
      var a = window.Cookies, o = window.Cookies = t();
      o.noConflict = function() {
        return window.Cookies = a, o;
      };
    }
  })(function() {
    function t() {
      for (var o = 0, i = {}; o < arguments.length; o++) {
        var u = arguments[o];
        for (var s in u) i[s] = u[s];
      }
      return i;
    }
    function n(o) {
      return o.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }
    function a(o) {
      function i() {
      }
      function u(f, c, v) {
        if (!(typeof document > "u")) {
          v = t({ path: "/" }, i.defaults, v), typeof v.expires == "number" && (v.expires = new Date(/* @__PURE__ */ new Date() * 1 + v.expires * 864e5)), v.expires = v.expires ? v.expires.toUTCString() : "";
          try {
            var l = JSON.stringify(c);
            /^[\{\[]/.test(l) && (c = l);
          } catch {
          }
          c = o.write ? o.write(c, f) : encodeURIComponent(String(c)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), f = encodeURIComponent(String(f)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
          var d = "";
          for (var g in v) v[g] && (d += "; " + g, v[g] !== true && (d += "=" + v[g].split(";")[0]));
          return document.cookie = f + "=" + c + d;
        }
      }
      function s(f, c) {
        if (!(typeof document > "u")) {
          for (var v = {}, l = document.cookie ? document.cookie.split("; ") : [], d = 0; d < l.length; d++) {
            var g = l[d].split("="), h = g.slice(1).join("=");
            !c && h.charAt(0) === '"' && (h = h.slice(1, -1));
            try {
              var E = n(g[0]);
              if (h = (o.read || o)(h, E) || n(h), c) try {
                h = JSON.parse(h);
              } catch {
              }
              if (v[E] = h, f === E) break;
            } catch {
            }
          }
          return f ? v[f] : v;
        }
      }
      return i.set = u, i.get = function(f) {
        return s(f, false);
      }, i.getJSON = function(f) {
        return s(f, true);
      }, i.remove = function(f, c) {
        u(f, "", t(c, { expires: -1 }));
      }, i.defaults = {}, i.withConverter = a, i;
    }
    return a(function() {
    });
  });
});
var Ga = function(r) {
  return Ve("" + Op + He.setting, {}, { headers: { "X-Setting-Flag": 1 } });
}, jp = function(r, e) {
  var t = wi[e], n = He.webid(e);
  return Ve("" + t + n, { app_id: r, referer: document.referrer, url: window.location.href, user_agent: window.navigator.userAgent, user_unique_id: "" }).then(function(a) {
    return a.web_id;
  });
}, Dp = function(r, e) {
  var t = wi[e], n = He.report(e);
  return Ve("" + t + n, r);
}, Np = "turing_verify_sdk", $p = (function() {
  function r() {
    this.fetchWebId = null, this.channelType = "", this.isInit = false, this.conf = { app_id: 0, evtParams: {} };
  }
  return r.prototype.init = function(e, t) {
    t === void 0 && (t = {}), !this.isInit && (this.isInit = true, this.conf.app_id = e.region === "cn" ? 2018 : 2740, this.conf.evtParams = L(L({}, t), { webdriver: "undefined", isScheduling: "false", product_host: window.location.host, product_path: window.location.hostname, type: 2, aid: e.aid }), this.channelType = Cr);
  }, r.prototype.getTeaWebId = function() {
    return this.fetchWebId || (this.fetchWebId = jp(this.conf.app_id, this.channelType)), this.fetchWebId;
  }, r.prototype.trackEvent = function(e, t) {
    var n = this;
    t === void 0 && (t = {}), this.getTeaWebId().then(function(a) {
      var o = [{ events: [{ event: Np, is_bav: 0, local_time_ms: Date.now(), params: JSON.stringify(L(L(L({}, n.conf.evtParams), t), { key: "" + wp + e, time: Date.now() })) }], local_time: Math.floor(Date.now() / 1e3), header: { app_id: n.conf.app_id, referrer: document.referrer, platform: "web", sdk_lib: "js", sdk_version: "0.0.0" }, user: { user_unique_id: a, web_id: a } }];
      n.sendEvents(o);
    }).catch(function(a) {
      console.log("err: ", a);
    });
  }, r.prototype.sendEvents = function(e) {
    Dp(e, this.channelType).catch(function(t) {
      console.log("report err: ", t);
    });
  }, r;
})(), Qr = new $p(), Lp = { back_up_js_v2: { cn: ["https://lf-rc2.yhgfb-cn-static.com/obj/rc-client-security/secsdk-captcha/@latest/captcha.js", "https://lf-cdn-tos.bytescm.com/obj/static/secsdk-captcha/@latest/captcha.js"] }, js_v2: { cn: "https://lf-rc1.yhgfb-cn-static.com/obj/rc-client-security/secsdk-captcha/@latest/captcha.js" } }, Ha = { verify: Lp }, Va = {}, Mp = { executor: "Function" }, Up = function() {
  var r = Date.now();
  return Ga().catch(function() {
    return Ga();
  }).then(function(e) {
    var t, n;
    return Qr.trackEvent("hotsdk_getsetting", { is_success: 1, duration: Date.now() - r, message: "" }), !((n = (t = e?.verify) === null || t === void 0 ? void 0 : t.js_v2) === null || n === void 0) && n[Cr] ? e.verify : Ha.verify;
  }).catch(function(e) {
    return Qr.trackEvent("hotsdk_getsetting", { is_success: 0, duration: Date.now() - r, message: e?.message }), Ha.verify;
  });
}, Fp = function(r, e, t, n) {
  pr.setFileName(r);
  var a = Date.now(), o = Jr.resolve({});
  return o = Ap(r, { timeout: 2e4 }).then(function(i) {
    if (t && n && t !== n) {
      var u = new RegExp(t, "g");
      i = i.replace(u, n);
    }
    var s = xp(i);
    return s.exports;
  }), o.then(function(i) {
    return pr.reportResource({ url: r, startTime: Date.now(), duration: Date.now() - a }), i;
  }).catch(function(i) {
    return pr.reportResourceError(r), Jr.reject(i);
  });
}, Pi = (function() {
  function r() {
  }
  return r.get = function() {
    return (r.status === 0 || r.status === 3) && (r.status = 1, r.core = Up().then(function(e) {
      var t, n, a, o = (t = e.js_v2) === null || t === void 0 ? void 0 : t[Cr], i = ((n = e.back_up_js_v2) === null || n === void 0 ? void 0 : n[Cr]) || [], u = (a = o.match(/\/\/([\w-]+(\.[\w-]+)+)/)) === null || a === void 0 ? void 0 : a[1], s = [o].concat(i);
      return new Jr(function(f, c) {
        var v = function() {
          var l, d = s.shift(), g = (l = d.match(/\/\/([\w-]+(\.[\w-]+)+)/)) === null || l === void 0 ? void 0 : l[1];
          Fp(d, Mp.executor, u, g).then(function(h) {
            f(h), r.status = 2, Qr.trackEvent("hotsdk_loadscript", { is_success: 1 });
          }).catch(function(h) {
            s.length ? v() : (c(h), r.status = 3, Qr.trackEvent("hotsdk_loadscript", { is_success: 0 }));
          });
        };
        v();
      });
    }).catch(function(e) {
      return Jr.reject(e);
    })), r.core;
  }, r.status = 0, r;
})(), kp = function(r, e, t) {
  e === void 0 && (e = function() {
  }), t === void 0 && (t = function() {
  });
  var n = Pp(r);
  Qr.init(L(L({}, n), { region: Cr })), pr.init(n, Ve), pr.start(), Pi.get().then(function(a) {
    var o;
    Object.assign(Va, L(L({}, r), { captchaOptions: L(L({}, r.captchaOptions), { h5_check_version: !((o = r.captchaOptions) === null || o === void 0) && o.closeDecisionCheck ? "0.0.0" : "3.8.6" }) })), a?.initVerifyOptions(Va), e(a);
  }).catch(function(a) {
    var o;
    t({ type: "loadJSSDK", msg: (o = a?.message) !== null && o !== void 0 ? o : "" });
  });
}, Bp = function(r) {
  Pi.get().then(function(e) {
    e?.autoRender(r);
  }).catch(function(e) {
    console.log("err: ", e);
  });
};
const Mt = { value: null };
function Ii() {
  if (!Mt.value) throw new Error("global config is unset");
  return Mt.value;
}
function Gp(r) {
  Mt.value = r;
}
function Hp() {
  const e = `
@font-face {
  font-family: "MiSans";
  src: url("${Ii().fontPrefix.replaceAll("\\", "/")}/MiSansVF.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
}`, t = document.createElement("style");
  t.textContent = e, document.head.appendChild(t);
}
async function Vp() {
  const r = new URLSearchParams(window.location.search), e = r.get("global_config"), t = r.get("request"), n = JSON.parse(e ?? "{}");
  Gp(n), Hp(), kp({ commonOptions: { aid: 386088, iid: n.installId, did: n.deviceId }, captchaOptions: { fp: Ii().deviceId, successCb: async () => {
    location.href = "succeed";
  }, feedbackSubmitCb() {
    location.href = "failed";
  } } }, () => {
  }, (a) => {
    console.error(`\u521D\u59CB\u5316\u5931\u8D25: ${a.type} - ${a.msg}`), location.href = "failed";
  }), Bp({ verify_data: JSON.parse(t ?? "{}") }), setInterval(() => {
    document.querySelector("iframe")?.contentDocument?.querySelector(".vc-captcha-close-btn")?.remove();
  }, 200);
}
Vp();
