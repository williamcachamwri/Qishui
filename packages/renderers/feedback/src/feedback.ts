// packages/renderers/feedback/src/feedback.ts
// @ts-nocheck
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i) if (o.type === "childList") for (const s of o.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: true, subtree: true });
  function n(i) {
    const o = {};
    return i.integrity && (o.integrity = i.integrity), i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? o.credentials = "include" : i.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function r(i) {
    if (i.ep) return;
    i.ep = true;
    const o = n(i);
    fetch(i.href, o);
  }
})();
var q = function() {
  return q = Object.assign || function(t) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
  }, q.apply(this, arguments);
};
function nc(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
}
function rc(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number") return { next: function() {
    return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
  } };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Z(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e), i, o = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = r.next()).done; ) o.push(i.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (s) throw s.error;
    }
  }
  return o;
}
function Ke(e, t, n) {
  if (arguments.length === 2) for (var r = 0, i = t.length, o; r < i; r++) (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
  return e.concat(o || Array.prototype.slice.call(t));
}
var ic = 10, oc = 1e3, Sa = function(e) {
  return JSON.stringify({ ev_type: "batch", list: e });
};
function sc(e) {
  var t = e.transport, n = e.endpoint, r = e.size, i = r === void 0 ? ic : r, o = e.wait, s = o === void 0 ? oc : o, a = [], l = 0, c, u, f = { getSize: function() {
    return i;
  }, getWait: function() {
    return s;
  }, setSize: function(g) {
    i = g;
  }, setWait: function(g) {
    s = g;
  }, getEndpoint: function() {
    return n;
  }, setEndpoint: function(g) {
    n = g;
  }, send: function(g) {
    a.push(g), a.length >= i && h.call(this), clearTimeout(l), l = setTimeout(h.bind(this), s);
  }, flush: function() {
    clearTimeout(l), h.call(this);
  }, getBatchData: function() {
    return a.length ? Sa(a) : "";
  }, clear: function() {
    clearTimeout(l), a = [];
  }, fail: function(g) {
    c = g;
  }, success: function(g) {
    u = g;
  } };
  function h() {
    if (a.length) {
      var g = this.getBatchData();
      t.post({ url: n, data: g, fail: function(v) {
        c && c(v, g);
      }, success: function() {
        u && u(g);
      } }), a = [];
    }
  }
  return f;
}
var Re = function() {
  return {};
};
function Qi(e) {
  return e;
}
function $e(e) {
  return typeof e == "object" && e !== null;
}
function ac(e) {
  return e === void 0;
}
function lc(e, t) {
  try {
    return e instanceof t;
  } catch {
    return false;
  }
}
var Ci = Object.prototype;
function Zi(e) {
  if ($e(e)) {
    if (typeof Object.getPrototypeOf == "function") {
      var t = Object.getPrototypeOf(e);
      return t === Ci || t === null;
    }
    return Ci.toString.call(e) === "[object Object]";
  }
  return false;
}
function Ht(e) {
  return Ci.toString.call(e) === "[object Array]";
}
function gn(e) {
  return typeof e == "function";
}
function uc(e) {
  return typeof e == "boolean";
}
function Ur(e) {
  return typeof e == "number";
}
function bt(e) {
  return typeof e == "string";
}
function cc(e) {
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
function fc(e) {
  return typeof Event < "u" && lc(e, Event);
}
function dc(e) {
  return Object.prototype.toString.call(e) === "[object ErrorEvent]";
}
function hc(e) {
  return Object.prototype.toString.call(e) === "[object PromiseRejectionEvent]";
}
function pc(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function vc() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  for (var n = {}, r = 0; r < e.length; ) n = eo(n, e[r++]);
  return n;
}
function eo(e, t) {
  var n = q({}, e);
  for (var r in t) pc(t, r) && t[r] !== void 0 && ($e(t[r]) && Zi(t[r]) ? n[r] = eo($e(e[r]) ? e[r] : {}, t[r]) : Ht(t[r]) && Ht(e[r]) ? n[r] = Ea(e[r], t[r]) : n[r] = t[r]);
  return n;
}
function Ea(e, t) {
  var n = Ht(e) ? e : [], r = Ht(t) ? t : [];
  return Array.prototype.concat.call(n, r).map(function(i) {
    return i instanceof RegExp ? i : $e(i) && Zi(i) ? eo({}, i) : Ht(i) ? Ea([], i) : i;
  });
}
function mn(e, t) {
  if (!Ht(e) || e.length === 0) return false;
  for (var n = 0; n < e.length; ) {
    if (e[n] === t) return true;
    n++;
  }
  return false;
}
var to = function(e, t) {
  if (!Ht(e)) return e;
  var n = e.indexOf(t);
  if (n >= 0) {
    var r = e.slice();
    return r.splice(n, 1), r;
  }
  return e;
}, xr = function(e, t, n) {
  for (var r, i, o = t.split("."), s = Z(o), a = s[0], l = s.slice(1); e && l.length > 0; ) e = e[a], r = l, i = Z(r), a = i[0], l = i.slice(1);
  if (e) return n(e, a);
}, gc = function(e, t, n) {
  return xr(e, t, function(r, i) {
    if (r && i in r && gn(r[i])) try {
      return r[i].apply(r, n);
    } catch {
      return;
    }
  });
}, mc = function(e, t) {
  return !e || !$e(e) ? e : t.reduce(function(n, r) {
    return n[r] = e[r], n;
  }, {});
}, _c = function(e) {
  return e.replace(/([a-z])([A-Z])/g, function(t, n, r) {
    return n + "-" + r.toLowerCase();
  });
};
function yc(e) {
  return Ht(e) && e.length ? bc(e) : null;
}
function bc(e) {
  for (var t = [], n = e.length, r = 0; r < n; r++) {
    var i = e[r];
    bt(i) ? t.push(i.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1")) : i && i.source && t.push(i.source);
  }
  return new RegExp(t.join("|"), "i");
}
var no = function(e, t) {
  var n = yc(e || []);
  return !!n && n.test(t);
};
function _n(e) {
  try {
    return bt(e) ? e : JSON.stringify(e);
  } catch (t) {
    return "[FAILED_TO_STRINGIFY]:" + String(t);
  }
}
function wc() {
  var e = {}, t = {}, n = { set: function(r, i) {
    return e[r] = i, t[r] = _n(i), n;
  }, merge: function(r) {
    return e = q(q({}, e), r), Object.keys(r).forEach(function(i) {
      t[i] = _n(r[i]);
    }), n;
  }, delete: function(r) {
    return delete e[r], delete t[r], n;
  }, clear: function() {
    return e = {}, t = {}, n;
  }, get: function(r) {
    return t[r];
  }, toString: function() {
    return q({}, t);
  } };
  return n;
}
var Ti = function(e, t, n, r) {
  return r === void 0 && (r = true), function() {
    for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
    if (!e) return Re;
    var s = e[t], a = n.apply(void 0, Ke([s], Z(i), false)), l = a;
    return gn(l) && r && (l = function() {
      for (var c = [], u = 0; u < arguments.length; u++) c[u] = arguments[u];
      try {
        return a.apply(this, c);
      } catch {
        return gn(s) && s.apply(this, c);
      }
    }), e[t] = l, function(c) {
      c || (l === e[t] ? e[t] = s : a = s);
    };
  };
}, kn = function(e, t, n) {
  return function() {
    for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
    if (!e) return Re;
    var o = e[t], s = n.apply(void 0, Ke([o], Z(r), false)), a = s;
    return gn(a) && (a = function() {
      for (var l = [], c = 0; c < arguments.length; c++) l[c] = arguments[c];
      return s.apply(this, l);
    }), e[t] = a, function() {
      a === e[t] ? e[t] = o : s = o;
    };
  };
}, Sc = function() {
  return "".padStart ? function(e, t) {
    return t === void 0 && (t = 8), e.padStart(t, " ");
  } : function(e) {
    return e;
  };
}, xa = Sc(), Ec = 0, Ca = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  console.error.apply(console, Ke(["[SDK]", Date.now(), xa("" + Ec++)], Z(e), false));
}, xc = 0, Cr = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  console.warn.apply(console, Ke(["[SDK]", Date.now(), xa("" + xc++)], Z(e), false));
}, ro = function(e) {
  return Math.random() < Number(e);
}, Cc = function(e, t) {
  return e < Number(t);
}, An = function(e) {
  return function(t) {
    for (var n = t, r = 0; r < e.length && n; r++) try {
      n = e[r](n);
    } catch (i) {
      Ca(i);
    }
    return n;
  };
}, Tc = function(e) {
  return function(t) {
    for (var n = true, r = 0; r < e.length && n; r++) try {
      n = e[r](t);
    } catch (i) {
      Ca(i);
    }
    return n;
  };
};
function Oc() {
  for (var e = new Array(16), t = 0, n = 0; n < 16; n++) (n & 3) === 0 && (t = Math.random() * 4294967296), e[n] = t >>> ((n & 3) << 3) & 255;
  return e;
}
function Rc(e) {
  for (var t = [], n = 0; n < 256; ++n) t[n] = (n + 256).toString(16).substr(1);
  var r = 0, i = t;
  return [i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]]].join("");
}
function Oi() {
  var e = Oc();
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, Rc(e);
}
var Ac = 3e5, Pc = function(e, t, n) {
  var r = 0;
  return n === -1 ? Re : function() {
    if (e()) {
      r && clearTimeout(r), r = 0;
      return;
    }
    r === 0 && (r = setTimeout(t, n));
  };
}, Ta = function(e, t) {
  var n = [];
  try {
    n = t.reduce(function(r, i) {
      try {
        var o = i(e);
        typeof o == "function" && r.push(o);
      } catch {
      }
      return r;
    }, []);
  } catch {
  }
  return function(r) {
    return Ta(r, n);
  };
}, $c = function(e) {
  e === void 0 && (e = Ac);
  var t = [], n = [], r = false, i, o = Pc(function() {
    return !!t.length;
  }, function() {
    r = true, i && i[0](), n.forEach(function(a) {
      return a();
    }), n.length = 0, i = void 0;
  }, e), s = function(a) {
    t = to(t, a), !r && o();
  };
  return { next: function(a) {
    return Ta(a, t);
  }, complete: function(a) {
    n.push(a);
  }, attach: function(a, l) {
    i = [a, l];
  }, subscribe: function(a) {
    if (r) throw new Error("Observer is closed");
    return t.push(a), i && i[1] && i[1](a), o(), function() {
      return s(a);
    };
  }, unsubscribe: s };
}, jr = function(e, t, n) {
  var r = $c(n);
  try {
    e(r.next, r.attach), t && r.complete(t);
  } catch {
  }
  return [r.subscribe, r.unsubscribe];
}, Ic = function(e, t) {
  var n = Z(e, 1), r = n[0], i = function(o, s) {
    var a = r(function(l) {
      var c = Tc(t)(l);
      return c ? o(l) : Re;
    });
    s(function() {
      a();
    });
  };
  return i;
};
function Mc() {
  var e = false, t = {}, n = function(o) {
    o.length && o.forEach(function(s) {
      try {
        s();
      } catch {
      }
    }), o.length = 0;
  }, r = function(o) {
    t[o] && t[o].forEach(function(s) {
      n(s[1]);
    }), t[o] = void 0;
  }, i = function(o) {
    Object.keys(t).forEach(function(s) {
      t[s] && t[s].forEach(function(a) {
        a[0] === o && n(a[1]);
      });
    });
  };
  return { set: function(o, s, a) {
    t[o] ? t[o].push([s, a]) : t[o] = [[s, a]], e && n(a);
  }, has: function(o) {
    return !!t[o];
  }, remove: r, removeByEvType: i, clear: function() {
    e = true, Object.keys(t).forEach(function(o) {
      r(o);
    });
  } };
}
var Tr = function(e, t, n, r) {
  return e.destroyAgent.set(t, n, r);
}, Lc = 500, kc = 50;
function Dc(e, t, n) {
  if (t.push(n), !(t.length < Lc)) {
    var r = t.splice(0, kc);
    e.savePreStartDataToDb && e.savePreStartDataToDb(r);
  }
}
function Nc(e) {
  var t = e.getPreStartQueue();
  t.forEach(function(n) {
    return e.build(n);
  }), t.length = 0;
}
var Fc = ["init", "start", "config", "beforeDestroy", "provide", "beforeReport", "report", "beforeBuild", "build", "beforeSend", "send", "beforeConfig"];
function Uc(e) {
  var t = e.builder, n = e.createSender, r = e.createDefaultConfig, i = e.createConfigManager, o = e.userConfigNormalizer, s = e.initConfigNormalizer, a = e.validateInitConfig, l, c, u = {};
  Fc.forEach(function(m) {
    return u[m] = [];
  });
  var f = false, h = false, g = false, v = [], y = [], E = Mc(), x = { getBuilder: function() {
    return t;
  }, getSender: function() {
    return l;
  }, getPreStartQueue: function() {
    return v;
  }, init: function(m) {
    if (f) {
      Cr("already inited");
      return;
    }
    if (m && $e(m) && a(m)) {
      var w = r(m);
      if (!w) throw new Error("defaultConfig missing");
      var B = s(m);
      if (c = i(w), c.setConfig(B), c.onChange(function() {
        S("config");
      }), l = n(c.getConfig()), !l) throw new Error("sender missing");
      f = true, S("init", true);
    } else throw new Error("invalid InitConfig, init failed");
  }, set: function(m) {
    f && m && $e(m) && (S("beforeConfig", false, m), c?.setConfig(m));
  }, config: function(m) {
    if (f) return m && $e(m) && (S("beforeConfig", false, m), c?.setConfig(o(m))), c?.getConfig();
  }, provide: function(m, w) {
    if (mn(y, m)) {
      Cr("cannot provide " + m + ", reserved");
      return;
    }
    x[m] = w, S("provide", false, m);
  }, start: function() {
    f && (h || c?.onReady(function() {
      h = true, S("start", true), Nc(x);
    }));
  }, report: function(m) {
    if (m) {
      var w = An(u.beforeReport)(m);
      if (w) {
        var B = An(u.report)(w);
        B && (h ? this.build(B) : Dc(x, v, B));
      }
    }
  }, build: function(m) {
    if (h) {
      var w = An(u.beforeBuild)(m);
      if (w) {
        var B = t.build(w);
        if (B) {
          var H = An(u.build)(B);
          H && this.send(H);
        }
      }
    }
  }, send: function(m) {
    if (h) {
      var w = An(u.beforeSend)(m);
      w && (l.send(w), S("send", false, w));
    }
  }, destroy: function() {
    E.clear(), g = true, v.length = 0, S("beforeDestroy", true);
  }, on: function(m, w) {
    if (m === "init" && f || m === "start" && h || m === "beforeDestroy" && g) try {
      w();
    } catch {
    }
    else u[m] && u[m].push(w);
  }, off: function(m, w) {
    u[m] && (u[m] = to(u[m], w));
  }, destroyAgent: E };
  return y = Object.keys(x), x;
  function S(m, w) {
    w === void 0 && (w = false);
    for (var B = [], H = 2; H < arguments.length; H++) B[H - 2] = arguments[H];
    u[m].forEach(function(re) {
      try {
        re.apply(void 0, Ke([], Z(B), false));
      } catch {
      }
    }), w && (u[m].length = 0);
  }
}
var jc = function(e) {
  var t = wc();
  e.provide("context", t), e.on("report", function(n) {
    return n.extra || (n.extra = {}), n.extra.context = t.toString(), n;
  });
}, Bc = function(e, t, n) {
  var r = {}, i = function() {
    for (var s, a = [], l = 0; l < arguments.length; l++) a[l] = arguments[l];
    var c = a[0];
    if (c) {
      var u = c.split(".")[0];
      if (!(u in i)) {
        var f = r[u] || [], h = (s = t?.(e)) !== null && s !== void 0 ? s : {};
        f.push(Ke([h], Z(a), false)), r[u] = f;
        return;
      }
      return gc(i, c, [].slice.call(a, 1));
    }
  };
  Ti(e, "provide", function(s) {
    return function(a, l) {
      i[a] = l, s.call(e, a, l);
    };
  })();
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (i[o] = e[o]);
  return e.on("provide", function(s) {
    r[s] && (r[s].forEach(function(a) {
      var l = Z(a), c = l[0], u = l.slice(1);
      n?.(e, c, u);
    }), r[s] = null);
  }), i;
};
function Hc(e, t) {
  e.on("init", function() {
    var n = [], r = function(o) {
      o.forEach(function(s) {
        var a = s.name;
        mn(n, a) || (n.push(a), s.setup(e), t && t(a, s.setup), e.destroyAgent.set(a, a, [function() {
          n = to(n, a), s.tearDown && s.tearDown();
        }]));
      });
    };
    e.provide("applyIntegrations", r);
    var i = e.config();
    i && i.integrations && r(i.integrations);
  });
}
var qc = "_", Vc = function(e) {
  return e.split(qc)[0];
};
function Wc(e, t) {
  var n = t || {}, r = {}, i = function(s, a) {
    r[s] || (r[s] = []), r[s].push(a);
  }, o = function(s) {
    var a = Z(s, 2), l = a[0], c = a[1], u = Vc(l), f = !!u && r[u];
    return n[l] || (n[l] = jr(c, function() {
      n[l] = void 0;
    })), f ? Oa(e, [l, Ic(n[l], f)]) : n[l];
  };
  e.provide("setFilter", i), e.provide("initSubject", o), e.provide("getSubject", function(s) {
    return n[s];
  }), e.provide("privateSubject", {});
}
function yn(e, t) {
  return e.initSubject(t);
}
function Oa(e, t, n) {
  var r = Z(t, 2), i = r[0], o = r[1], s = e.privateSubject || {};
  return s[i] || (s[i] = jr(o, function() {
    s[i] = void 0;
  }, n)), s[i];
}
var zc = function(e) {
  try {
    typeof window == "object" && $e(window) && window.__SLARDAR_DEVTOOLS_GLOBAL_HOOK__ && window.__SLARDAR_DEVTOOLS_GLOBAL_HOOK__.push(e);
  } catch {
  }
}, be = function() {
  return Date.now();
};
function Se() {
  if (typeof window == "object" && $e(window)) return window;
}
function on() {
  if (typeof document == "object" && $e(document)) return document;
}
function Ra() {
  return Se() && window.location;
}
function Kc() {
  return Se() && window.history;
}
function Jc() {
  if (typeof XMLHttpRequest == "function" && gn(XMLHttpRequest)) return XMLHttpRequest;
}
function Gc() {
  if (Se() && gn(window.PerformanceObserver)) return window.PerformanceObserver;
}
function Yc() {
  if (Se() && "navigator" in window) return window.navigator;
}
function Aa() {
  var e = Yc();
  if (e) return e.connection || e.mozConnection || e.webkitConnection;
}
function Ri(e) {
  return e?.effectiveType || e?.type || "";
}
function Xc() {
  var e = Aa(), t = Ri(e);
  return mn(["slow-2g", "2g"], t);
}
function Br(e) {
  var t = on();
  if (!t || !e) return "";
  var n = t.createElement("a");
  return n.href = e, n.href;
}
function qo(e) {
  var t = on();
  if (!t || !e) return { url: e, protocol: "", domain: "", query: "", path: "", hash: "" };
  var n = t.createElement("a");
  n.href = e;
  var r = n.pathname || "/";
  return r[0] !== "/" && (r = "/" + r), { url: n.href, protocol: n.protocol.slice(0, -1), domain: n.hostname, query: n.search.substring(1), path: r, hash: n.hash };
}
function io() {
  var e = Se() && Ra();
  return e ? e.href : "";
}
var Qc = function(e) {
  return { pid: e.pid, view_id: e.viewId, url: io() };
}, Pa = function(e) {
  var t = e.config(), n = Qc(t);
  return n.context = e.context ? e.context.toString() : {}, n;
}, $a = function(e, t) {
  var n = Pa(e);
  return n.timestamp = be(), function(r) {
    e.report(q(q({}, r), { overrides: n }));
  };
}, Zc = "f_view_0", ef = function(e) {
  return function(t, n) {
    var r = Pa(e);
    n(Re, function(i) {
      r && i(r);
    });
  };
}, xn = function(e) {
  if (e) return e.__SLARDAR_REGISTRY__ || (e.__SLARDAR_REGISTRY__ = { Slardar: { plugins: [], errors: [], subject: {} } }), e.__SLARDAR_REGISTRY__.Slardar;
}, Ia = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var n = xn(Se());
  n && (n.errors || (n.errors = []), n.errors.push(e));
}, Ma = function(e) {
  var t = { url: io(), timestamp: be() }, n = e.config();
  return n?.pid && (t.pid = n.pid), e?.context && (t.context = e.context.toString()), t;
}, oo = function(e, t) {
  return function(n) {
    var r = function(i) {
      return i.overrides = t, i;
    };
    e.on("report", r), n(), e.off("report", r);
  };
}, Rt = function(e, t, n, r) {
  return r === void 0 && (r = false), e.addEventListener(t, n, r), function() {
    e.removeEventListener(t, n, r);
  };
}, La = function(e, t, n, r) {
  return e.addEventListener(t, n, r), function() {
    e.removeEventListener(t, n, r);
  };
};
function tf(e) {
  var t = Se(), n = on();
  if (!(!t || !n)) {
    if (n.readyState === "complete") {
      e();
      return;
    }
    Rt(t, "load", function() {
      setTimeout(function() {
        e();
      }, 0);
    }, false);
  }
}
var ka = function(e) {
  var t = false, n = function(r) {
    t || (t = true, e && e(r));
  };
  return [n];
}, nf = function(e) {
  var t = Se();
  if (t) {
    var n = Z(ka(e), 1), r = n[0];
    ["unload", "beforeunload", "pagehide"].forEach(function(i) {
      Rt(t, i, r, false);
    });
  }
}, rf = function(e) {
  var t = on(), n = Se();
  if (!(!t || !n)) {
    var r = Re, i = function() {
      t.visibilityState === "visible" && (e(), r());
    };
    r = La(t, "visibilitychange", i, true);
  }
}, of = function(e, t) {
  var n, r = on();
  if (r) {
    var i = r.createElement("script");
    i.src = e, i.crossOrigin = "anonymous", i.onload = t, (n = r.head) === null || n === void 0 || n.appendChild(i);
  }
}, Hr = function(e, t) {
  return $e(e) ? q(q({}, t), e) : e ? t : false;
}, so = function() {
  return !!btoa && !!atob;
};
function sf(e) {
  return so() ? btoa(encodeURI(e)) : e;
}
function af(e) {
  return so() ? decodeURI(atob(e)) : e;
}
var Da = function(e) {
  try {
    var t = localStorage.getItem(e), n = t;
    t && typeof t == "string" && (n = JSON.parse(af(t)));
    var r = n, i = r.expires, o = nc(r, ["expires"]);
    return i >= be() ? o : void 0;
  } catch {
    return;
  }
}, ao = function(e, t, n) {
  if (!(n <= 0)) try {
    localStorage.setItem(e, sf(JSON.stringify(q(q({}, t), { expires: be() + n }))));
  } catch {
  }
}, lf = 2160 * 60 * 60 * 1e3, Na = function(e) {
  return e === false ? 0 : e === true || e === void 0 || !Ur(e) ? lf : e;
}, uf = function(e) {
  var t;
  if (!(typeof window != "object" || !window.__perfsee__)) {
    var n = {};
    return (t = Error.captureStackTrace) === null || t === void 0 || t.call(Error, n, e), n.stack;
  }
};
function cf() {
  var e = Se();
  return e && "navigator" in e && "onLine" in e.navigator ? function() {
    return !e.navigator.onLine;
  } : function() {
    return false;
  };
}
function ff(e) {
  var t = Se();
  return t && "addEventListener" in t ? Rt(t, "online", e) : function() {
  };
}
var df = "xhr_0", Fa = function() {
  var e = new RegExp("\\/monitor_web\\/collect|\\/monitor_browser\\/collect\\/batch", "i");
  return function(t) {
    return e.test(t);
  };
}, hf = function(e) {
  return function() {
    for (var t, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
    return t = Z(n, 2), this._method = t[0], this._url = t[1], e.apply(this, n);
  };
}, pf = function(e) {
  return function() {
    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    this._reqHeaders = this._reqHeaders || {};
    var r = Z(t, 2), i = r[0], o = r[1];
    return this._reqHeaders[i] = o, e && e.apply(this, t);
  };
}, vf = function(e, t) {
  return kn(e, "onreadystatechange", function(n) {
    return function() {
      for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
      return this.readyState === 4 && t(e), n && n.apply(this, r);
    };
  });
}, gf = function(e, t) {
  var n = Fa();
  return function() {
    for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
    if (this._start = be(), this._data = r?.[0], !n(this._url)) {
      var o = t([this._method, this._url, this._start, this]);
      vf(this, o)();
    }
    return e.apply(this, r);
  };
}, Vo = function(e) {
  return function(t, n) {
    if (e) {
      var r = [];
      r.push(kn(e, "open", hf)()), r.push(kn(e, "setRequestHeader", pf)()), r.push(kn(e, "send", gf)(t)), n(function() {
        r.forEach(function(i) {
          return i();
        });
      });
    }
  };
}, mf = "fetch_0", Ua = function(e, t) {
  return function(n, r) {
    r === void 0 && (r = {});
    var i = t([n, r]), o = e(n, r);
    return o.then(function(s) {
      i(s);
    }, function() {
      i(void 0);
    }), o;
  };
}, _f = function(e, t) {
  var n = Se();
  if (!(!n || !fetch)) {
    var r = [];
    r.push(kn(n, "fetch", Ua)(e)), t(function() {
      r.forEach(function(i) {
        return i();
      });
    });
  }
}, yf = [mf, _f], bf = ["resource"], wf = function(e, t, n) {
  var r = e && new e(function(a, l) {
    a.getEntries && a.getEntries().forEach(function(c, u, f) {
      return t(c, u, f, l);
    });
  }), i = function(a) {
    if (!e || !r) return n && n();
    try {
      r.observe({ entryTypes: a });
    } catch {
      return n && n();
    }
  }, o = function(a, l) {
    if (!e || !r) return n && n();
    try {
      var c = { type: a, buffered: true };
      !ac(l) && (c.durationThreshold = l), r.observe(c);
    } catch {
      return n && n();
    }
    r.observe({ type: a, buffered: false });
  }, s = function() {
    return r && r.disconnect();
  };
  return [i, o, s];
}, Sf = function(e, t, n) {
  var r = Z(wf(e, t), 3), i = r[0], o = r[2];
  return i(n), o;
}, Ef = "resource_0", xf = function(e, t) {
  var n = Gc();
  if (n) {
    var r = Fa();
    t(Sf(n, function(i) {
      !r(i.name) && e(i);
    }, bf));
  }
}, ja = [Ef, xf], Ba = "pageview", Ha = "session", qa = "js_error", tr = "http", Cf = "resource_error", Tf = "resource", Wo = "custom", Of = "performance", Rf = "performance_longtask", Af = "blank_screen", Va = "action", Pf = "03", $f = "01", If = "traceparent", Mf = { sampleRate: 1, origins: [] }, zo = function() {
  var e = window && (window.crypto || window.msCrypto);
  if (e !== void 0 && e.getRandomValues) {
    var t = new Uint16Array(8);
    e.getRandomValues(t);
    var n = function(r) {
      for (var i = r.toString(16); i.length < 4; ) i = "0" + i;
      return i;
    };
    return n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7]);
  }
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, function() {
    var r = Math.random() * 16 | 0;
    return r.toString(16);
  });
}, Wa = function(e) {
  var t = Hr(e, Mf);
  if (t) {
    var n = ro(t.sampleRate);
    if (n) return function(r, i) {
      var o = t.origins;
      o.length && no(o, r) && i(If, Pf + "-" + zo() + "-" + zo().substring(16) + "-" + $f);
    };
  }
}, Lf = new RegExp("(cookie|auth|jwt|token|key|ticket|secret|credential|session|password)", "i"), kf = new RegExp("(bearer|session)", "i"), lo = function(e, t) {
  return !e || !t ? true : Lf.test(e) || kf.test(t);
}, Df = function(e) {
  var t = false;
  return function(n) {
    t || (t = true, e(n));
  };
}, za = function(e, t) {
  try {
    if (t) {
      var n = e.request.url, r = t(n);
      if (!r) return;
      e.request.url = r, e.extra = q(q({}, e.extra), { original_url: n });
    }
  } catch {
  }
}, Ko = function(e, t, n) {
  var r = Z(t, 2), i = r[0], o = r[1], s = n.setTraceHeader, a = n.ignoreUrls, l = n.setContextAtReq, c = n.extractUrl;
  e.push(i[0](function(u) {
    var f = Z(u, 4);
    f[0];
    var h = f[1];
    f[2];
    var g = f[3];
    if (!h) return Re;
    var v = Br(h), y;
    if (no(a, v)) return Re;
    s && s(v, function(m, w) {
      return g.setRequestHeader(m, w);
    });
    var E = l(), x = void 0, S = o()[0](function(m) {
      (v === m.name || y && y === m.name) && !x && (x = m);
    });
    return function(m) {
      y = m.responseURL;
      var w = Uf(m, n);
      setTimeout(function() {
        x && (w.response.timing = x), za(w, c), E && E({ ev_type: tr, payload: w }), S();
      }, 100);
    };
  }));
};
function Nf(e) {
  return bt(e) && e ? e.split(`\r
`).reduce(function(t, n) {
    if (bt(n)) {
      var r = Z(n.split(": "), 2), i = r[0], o = r[1];
      !lo(i, o) && (t[i.toLowerCase()] = o);
    }
    return t;
  }, {}) : {};
}
function Ff(e) {
  return Object.keys(e).reduce(function(t, n) {
    return !lo(n, e[n]) && (t[n.toLowerCase()] = e[n]), t;
  }, {});
}
var Uf = function(e, t) {
  var n = e._method, r = e._reqHeaders, i = e._url, o = e._start, s = e._data, a = Br(i), l = { api: "xhr", request: { url: a, method: (n || "").toLowerCase(), headers: r && Ff(r), timestamp: o }, response: { status: e.status || 0, is_custom_error: false, timestamp: be() }, duration: be() - o };
  typeof e.getAllResponseHeaders == "function" && (l.response.headers = Nf(e.getAllResponseHeaders()));
  var c = l.response.status, u = t.collectBodyOnError, f = t.extraExtractor;
  try {
    var h = f?.(e.response, l, s);
    h && (l.extra = h), h && (l.response.is_custom_error = true), u && (h || c >= 400) && (l.request.body = s ? "" + s : void 0, l.response.body = e.response ? "" + e.response : void 0);
  } catch {
  }
  return l;
}, uo = "ajax", jf = { autoWrap: true, setContextAtReq: function() {
  return Qi;
}, ignoreUrls: [], collectBodyOnError: false };
function Bf(e, t) {
  var n = Hr(t, jf);
  if (n) {
    var r = [], i = q(q({}, n), { setContextAtReq: function() {
      return $a(e);
    }, setTraceHeader: Wa(n.trace) }), o = function() {
      return yn(e, ja);
    };
    i.autoWrap && Ko(r, [yn(e, [df, Vo(XMLHttpRequest && XMLHttpRequest.prototype)]), o], i), Tr(e, uo, tr, r), e.provide("wrapXhr", function(s) {
      function a() {
        var l = new s();
        return Ko(r, [jr(Vo(l)), o], i), l;
      }
      return a.prototype = new s(), ["DONE", "HEADERS_RECIEVED", "LOADING", "OPENED", "UNSENT"].forEach(function(l) {
        a[l] = s[l];
      }), a;
    });
  }
}
function Hf(e) {
  e.on("init", function() {
    var t, n = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[uo];
    Bf(e, n);
  });
}
var Jo = function(e, t, n) {
  var r = Z(t, 2), i = r[0], o = r[1], s = n.setTraceHeader, a = n.ignoreUrls, l = n.setContextAtReq, c = n.extractUrl, u = window.Headers, f = window.Request;
  !f || !u || e.push(i[0](function(h) {
    var g = Z(h, 2), v = g[0], y = g[1], E = Br(v instanceof f ? v.url : v), x;
    if (!qf(E) || no(a, E)) return Re;
    s && s(E, function(H, re) {
      return Vf(H, re, v, y, f, u);
    });
    var S = l(), m = be(), w = void 0, B = o()[0](function(H) {
      (E === H.name || x && x === H.name) && !w && (w = H);
    });
    return function(H) {
      x = H && H.url;
      var re = zf(v, y, H, f, u, n, m), pe = Df(function(J) {
        w && (J.response.timing = w), za(J, c), S && S({ ev_type: tr, payload: J }), B();
      });
      setTimeout(function() {
        pe(re);
      }, 1e3);
    };
  }));
}, qf = function(e) {
  if (!bt(e)) return false;
  var t = Z(e.split(":"), 2), n = t[0], r = t[1];
  return !r || n === "http" || n === "https";
}, co = function(e, t) {
  return e instanceof t;
}, Vf = function(e, t, n, r, i, o) {
  var s;
  co(n, i) ? n.headers.set(e, t) : r.headers instanceof o ? r.headers.set(e, t) : r.headers = q(q({}, r.headers), (s = {}, s[e] = t, s));
}, Wf = function(e, t, n) {
  var r = t && t.method || "get";
  return co(e, n) && (r = e.method || r), r.toLowerCase();
}, Go = function(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  try {
    return t.reduce(function(r, i) {
      return new e(i || {}).forEach(function(o, s) {
        return !lo(s, o) && (r[s] = o);
      }), r;
    }, {});
  } catch {
    return {};
  }
}, Yo = function(e, t, n) {
  return co(e, n) ? e.body : t?.body;
}, zf = function(e, t, n, r, i, o, s) {
  var a = { api: "fetch", request: { method: Wf(e, t, r), timestamp: s, url: Br(e instanceof r ? e.url : e), headers: Go(i, e.headers, t.headers) }, response: { status: n && n.status || 0, is_custom_error: false, timestamp: be() }, duration: be() - s }, l = o.collectBodyOnError, c = o.extraExtractor, u = function() {
    var h;
    l && (a.request.body = (h = Yo(e, t, r)) === null || h === void 0 ? void 0 : h.toString());
  };
  if (n) try {
    var f = Go(i, n.headers);
    a.response.headers = f;
    try {
      (f["content-type"] || "").indexOf("application/json") !== -1 && c && n.clone().json().catch(function() {
        return n.clone().text();
      }).then(function(h) {
        var g, v = c(h, a, (g = Yo(e, t, r)) === null || g === void 0 ? void 0 : g.toString());
        v && (a.extra = v, a.response.is_custom_error = true, u());
      }).catch(Re);
    } catch {
    }
    n.status >= 400 && u();
  } catch {
  }
  else u();
  return a;
}, fo = "fetch", Kf = { autoWrap: true, setContextAtReq: function() {
  return Qi;
}, ignoreUrls: [], collectBodyOnError: false };
function Jf(e, t) {
  var n = Hr(t, Kf);
  if (n) {
    var r = [], i = q(q({}, n), { setContextAtReq: function() {
      return $a(e);
    }, setTraceHeader: Wa(n.trace) }), o = function() {
      return yn(e, ja);
    };
    i.autoWrap && Jo(r, [yn(e, yf), o], i), Tr(e, fo, tr, r), e.provide("wrapFetch", function(s) {
      var a = void 0;
      return Jo(r, [jr(function(l) {
        a = Ua(s, l);
      }), o], i), a;
    });
  }
}
function Gf(e) {
  e.on("init", function() {
    var t, n = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[fo];
    Jf(e, n);
  });
}
var Yf = ["name", "message", "stack", "filename", "lineno", "colno"], ho = function(e) {
  var t;
  return cc(e) ? t = mc(e, Yf) : (Zi(e) || fc(e) || bt(e)) && (t = { message: _n(e) }), t;
}, Xf = function(e) {
  var t = ho(e.error);
  if (!t) return t;
  var n = e.colno, r = e.lineno, i = e.filename;
  return n && !t.colno && (t.colno = String(n)), r && !t.lineno && (t.lineno = String(r)), i && !t.filename && (t.filename = i), t;
}, Qf = function(e) {
  var t;
  try {
    var n = void 0;
    if ("reason" in e ? n = e.reason : "detail" in e && "reason" in e.detail && (n = e.detail.reason), n) {
      var r = ho(n);
      return q(q({}, r), { name: (t = r && r.name) !== null && t !== void 0 ? t : "UnhandledRejection" });
    }
  } catch {
  }
}, Zf = function(e) {
  return dc(e) ? Xf(e) : hc(e) ? Qf(e) : ho(e);
}, Xo = "jsError", ed = "hidden_3", Qo = function(e) {
  return e.visibilityState === "hidden";
}, td = function(e, t) {
  var n = on(), r = Se();
  if (!(!n || !r)) {
    var i = function(a) {
      e(a.type === "pagehide" || Qo(n));
    }, o = La(n, "visibilitychange", i, true), s = Rt(r, "pagehide", i, true);
    t(function() {
      o(), s();
    }, function(a) {
      a(Qo(n));
    });
  }
}, nd = [ed, td], rd = function(e) {
  return e.readyState === "complete";
}, id = "unload_0", od = function(e, t) {
  var n = Se();
  if (n) {
    var r = Z(ka(e), 1), i = r[0], o = ["unload", "beforeunload", "pagehide"], s = function() {
      i();
    }, a = [];
    o.forEach(function(l) {
      a.push(Rt(n, l, s, false));
    }), t(function() {
      a.forEach(function(l) {
        return l();
      });
    });
  }
}, sd = [id, od], ad = "history_0", ld = "hash_0", ud = function(e, t) {
  var n = Kc(), r = Se();
  if (!(!n || !r)) {
    var i = [], o = function() {
      return e(location.href);
    }, s = function(a) {
      return function() {
        for (var l = [], c = 0; c < arguments.length; c++) l[c] = arguments[c];
        try {
          a.apply(n, l);
        } finally {
          o();
        }
      };
    };
    i.push(Ti(n, "pushState", s)(), Ti(n, "replaceState", s)()), i.push(Rt(r, "popstate", o, true)), t(function() {
      i.forEach(function(a) {
        return a();
      });
    });
  }
}, cd = function(e, t) {
  var n = Se();
  if (n) {
    var r = function() {
      return e(location.href);
    }, i = Rt(n, "hashchange", r, true);
    t(function() {
      i();
    });
  }
}, fd = [ld, cd], dd = [ad, ud], hd = function(e) {
  return function(t) {
    var n;
    return e === "hash" ? ((n = qo(t).hash) === null || n === void 0 ? void 0 : n.replace(/^#/, "")) || "/" : qo(t).path;
  };
}, Ka = function(e) {
  return Ja(e, be());
}, Ja = function(e, t) {
  return e + "_" + t;
}, pd = function(e, t, n, r) {
  var i = n, o = t;
  r && r(t);
  var s = function(l, c, u) {
    l !== "user_set" && c !== i ? (i = c, o = u ?? i, r && r(o), e(l, o)) : l === "user_set" && c !== o && (o = c, r && r(o), e(l, o));
  }, a = function() {
    t && e("init", t);
  };
  return [s, a];
}, vd = function(e, t) {
  var n = t, r = function(i, o) {
    o !== n && (n = o, e(i, n));
  };
  return [r];
}, gd = function(e, t) {
  return { ev_type: Ba, payload: { pid: t, source: e } };
}, md = function(e) {
  return function(t, n) {
    e(gd(t, n));
  };
}, Ai = function(e) {
  return e === "manual";
}, ur = "error_weight", si = "duration_apdex", zn = "perf_apdex", _d = "action", yd = function() {
  var e;
  return e = { error_count: [0, 0, 0, 0], duration_count: [0, 0, 0] }, e[zn] = {}, e;
}, Zo = function(e, t) {
  var n = e[0] + e[1] + e[2], r = e[0] / n, i = e[2] / n;
  return i > t.frustrating_threshold ? 2 : r > t.satisfying_threshold || n === 0 ? 0 : 1;
}, bd = function() {
  var e = 0, t = void 0, n = function(i) {
    if (i) {
      if (!t) return;
      e += be() - t, t = void 0;
    } else t = be();
  }, r = function() {
    t && (e += be() - t);
    var i = e;
    return e = 0, t = be(), i;
  };
  return [n, r];
}, es = function(e, t) {
  return function(n, r) {
    var i = n.payload;
    switch (n.ev_type) {
      case Of:
        var o = i.name;
        i.isSupport && e(r[zn], o, i.value);
        break;
      case Va:
        e(r[zn], _d, i.duration || 0);
        break;
      case qa:
        t(r[ur], 0);
        break;
      case tr:
        if (i.response.is_custom_error || i.response.status >= 400) t(r[ur], 1);
        else {
          var s = i.response.timing;
          s && e(r[si], 0, s.duration);
        }
        break;
      case Cf:
        t(r[ur], 2);
        break;
      case Af:
        t(r[ur], 3);
        break;
      case Tf:
        e(r[si], 1, i.duration);
        break;
      case Rf:
        i.longtasks.forEach(function(a) {
          e(r[si], 2, a.duration);
        });
        break;
    }
  };
}, ts = function() {
  var e, t, n = function() {
    e = [0, 0, 0], t = yd();
  };
  n();
  var r = function(s, a, l) {
    var c = s && s[a];
    if (!(!c || l <= 0)) {
      var u = l < (c[0].threshold || 0) ? 0 : l > (c[1].threshold || 0) ? 2 : 1;
      if (e[u] += c[u].weight, typeof a == "string") {
        var f = Ja(a, u), h = t[zn][f];
        t[zn][f] = (h || 0) + 1;
      } else u === 2 && (t.duration_count[a] += 1);
    }
  }, i = function(s, a) {
    s && (e[2] += s[a], t.error_count[a] += 1);
  }, o = function() {
    return [e, t];
  };
  return [r, i, o, n];
}, wd = function() {
  var e = { start: be(), end: 0, time_spent: 0, is_bounced: false, entry: "", exit: "", p_count: 0, a_count: 0 }, t = function(s, a) {
    var l = Z(s, 3), c = l[0], u = l[1], f = l[2];
    e.end = be(), e.time_spent += a && a.time_spent || 0, e.last_page = a, e.p_count += 1, e.rank = c, e.apdex = u, e.apdex_detail = f;
    var h = on();
    h && (e.is_bounced = !rd(h));
  }, n = function(s, a) {
    e.time_spent += s.time_spent, e.p_count += 1, e.exit = a;
  }, r = function() {
    e.a_count += 1;
  }, i = function(s) {
    e.entry = s, e.exit = s;
  }, o = function() {
    return e;
  };
  return [t, n, r, i, o];
}, Sd = function(e, t, n, r) {
  var i = r.sendInit, o = r.initPid, s = r.routeMode, a = r.extractPid, l = r.onPidUpdate, c = Ai(s) ? function() {
    return "";
  } : hd(s), u = a || (function() {
  }), f = function(x) {
    var S;
    return (S = u(x)) !== null && S !== void 0 ? S : c(x);
  }, h = Z(pd(md(e), o || f(location.href), c(location.href), l), 2), g = h[0], v = h[1];
  if (!Ai(s)) {
    var y = Z(vd(function(x, S) {
      return g(x, c(S), u(S));
    }, ""), 1), E = y[0];
    n.length && n.forEach(function(x) {
      return t.push(x[0](function(S) {
        return E(s, S);
      }));
    });
  }
  return i && v(), [g.bind(null, "user_set")];
}, Ed = function(e, t, n, r) {
  var i = Z(n, 2), o = i[0], s = i[1], a = r.apdex === 2, l = void 0, c = void 0, u = void 0, f = false, h = Z(ts(), 4), g = h[0], v = h[1], y = h[2], E = h[3], x = Z(ts(), 4), S = x[0], m = x[1], w = x[2], B = x[3], H = Z(wd(), 5), re = H[0], pe = H[1], J = H[2], Y = H[3], W = H[4], D = Z(bd(), 2), ae = D[0], U = D[1];
  t.push(o[0](ae)), !a && t.push(s[0](function() {
    if (f) {
      var V = Z(w(), 2), se = V[0], ve = V[1], Ae = Zo(se, u);
      re([Ae, se, ve], C()), e({ ev_type: Ha, payload: W() }), B();
    }
  }));
  var L = es(g, v), T = es(S, m), I = function(V) {
    f && (a || (T(V, u), V.ev_type === Va && J()), V.common.pid === l[1] && L(V, u));
  }, C = function() {
    var V = Z(y(), 2), se = V[0], ve = V[1];
    return { start: l[0], pid: l[1], view_id: l[2], end: be(), time_spent: U(), apdex: se, rank: Zo(se, u), detail: ve };
  }, K = function(V, se) {
    if (!l) {
      l = [be(), V, se], Y(V), f = !!(u && l);
      return;
    }
    f && (c = C(), pe(c, V)), l = [be(), V, se], E();
  }, X = function(V) {
    f && (V.payload.last = c), e(V);
  }, ee = function(V) {
    if (!V) {
      t.forEach(function(se) {
        return se();
      }), t.length = 0;
      return;
    }
    u = V, f = !!(u && l);
  };
  return t.push(function() {
    f = false;
  }), [K, I, X, ee];
}, Or = "pageview", xd = { sendInit: true, routeMode: "history", apdex: 2 };
function Cd(e, t) {
  var n, r = Hr(t, xd);
  if (!(!r || !Ra())) {
    var i = r.routeMode, o = r.apdex, s = e.report.bind(e), a = Re;
    if (o) {
      var l = [], c = Z(Ed(e.report.bind(e), l, [yn(e, nd), yn(e, sd)], r), 4), u = c[0], f = c[1], h = c[2], g = c[3];
      s = h, a = u, e.on("send", f), l.push(function() {
        return e.off("send", f);
      }), e.on("start", function() {
        g(e.config().apdex);
      }), Tr(e, Or, Ha, l);
    }
    var v = [], y = Z(Sd(s, v, Ai(i) ? [] : [e.initSubject(fd), e.initSubject(dd)], q(q({}, r), { initPid: (n = e.config()) === null || n === void 0 ? void 0 : n.pid, onPidUpdate: function(S) {
      var m = Ka(S);
      a(S, m), e.set({ pid: S, viewId: m, actionId: void 0 });
    } })), 1), E = y[0];
    Oa(e, [Zc, ef(e)], -1);
    var x = function() {
      E(e.config().pid);
    };
    e.on("config", x), v.push(function() {
      return e.off("config", x);
    }), Tr(e, Or, Ba, v), e.provide("sendPageview", E);
  }
}
function Td(e) {
  e.on("init", function() {
    var t, n = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[Or];
    Cd(e, n);
  });
}
var Od = "event", Rd = "log", Ad = function(e) {
  if (!(!e || !$e(e)) && !(!e.name || !bt(e.name))) {
    var t = { name: e.name, type: Od };
    if ("metrics" in e && $e(e.metrics)) {
      var n = e.metrics, r = {};
      for (var i in n) Ur(n[i]) && (r[i] = n[i]);
      t.metrics = r;
    }
    if ("categories" in e && $e(e.categories)) {
      var o = e.categories, s = {};
      for (var i in o) s[i] = _n(o[i]);
      t.categories = s;
    }
    return "attached_log" in e && bt(e.attached_log) && (t.attached_log = e.attached_log), t;
  }
}, Pd = function(e) {
  if (!(!e || !$e(e)) && !(!e.content || !bt(e.content))) {
    var t = e.content, n = { content: _n(t), type: Rd, level: "info" };
    if ("level" in e && (n.level = e.level), "extra" in e && $e(e.extra)) {
      var r = e.extra, i = {}, o = {};
      for (var s in r) Ur(r[s]) ? i[s] = r[s] : o[s] = _n(r[s]);
      n.metrics = i, n.categories = o;
    }
    return "attached_log" in e && bt(e.attached_log) && (n.attached_log = e.attached_log), n;
  }
}, $d = function(e) {
  var t = function(r) {
    var i = Ad(r);
    if (i) {
      var o = uf(t);
      o && (i.stacks = o), e.report({ ev_type: Wo, payload: i, extra: { timestamp: be() } });
    }
  }, n = function(r) {
    var i = Pd(r);
    i && e.report({ ev_type: Wo, payload: i, extra: { timestamp: be() } });
  };
  e.provide("sendEvent", t), e.provide("sendLog", n);
}, Id = function(e) {
  var t = Aa(), n = Ri(t);
  t && (t.onchange = function() {
    n = Ri(t);
  }), e.on("report", function(r) {
    return q(q({}, r), { extra: q(q({}, r.extra || {}), { network_type: n }) });
  });
}, cr = function(e, t) {
  var n = e.common || {};
  return n.sample_rate = t, e.common = n, e;
}, Pi = function(e, t, n, r, i) {
  return e ? /* @__PURE__ */ (function(o) {
    return function() {
      return o;
    };
  })(i(r, t)) : function() {
    return n(t);
  };
}, Md = function(e, t) {
  return e.map(function(n) {
    switch (t) {
      case "number":
        return Number(n);
      case "boolean":
        return n === "1";
      default:
        return String(n);
    }
  });
}, Ld = function(e, t, n) {
  switch (n) {
    case "eq":
      return mn(t, e);
    case "neq":
      return !mn(t, e);
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
}, kd = function(e, t, n, r) {
  var i = xr(e, t, function(s, a) {
    return s[a];
  });
  if (i === void 0) return false;
  var o = uc(i) ? "bool" : Ur(i) ? "number" : "string";
  return Ld(i, Md(r, o), n);
}, $i = function(e, t) {
  try {
    return t.type === "rule" ? kd(e, t.field, t.op, t.values) : t.type === "and" ? t.children.every(function(n) {
      return $i(e, n);
    }) : t.children.some(function(n) {
      return $i(e, n);
    });
  } catch (n) {
    return Ia(n), false;
  }
}, Dd = function(e, t, n, r, i, o) {
  var s = {};
  return Object.keys(e).forEach(function(a) {
    var l = e[a], c = l.enable, u = l.sample_rate, f = l.conditional_sample_rules;
    c ? (s[a] = { enable: c, sample_rate: u, effectiveSampleRate: u * n, hit: Pi(t, u, r, i, o) }, f && (s[a].conditional_hit_rules = f.map(function(h) {
      var g = h.sample_rate, v = h.filter;
      return { sample_rate: g, hit: Pi(t, g, r, i, o), effectiveSampleRate: g * n, filter: v };
    }))) : s[a] = { enable: c, hit: function() {
      return false;
    }, sample_rate: 0, effectiveSampleRate: 0 };
  }), s;
}, Nd = function(e, t, n, r, i) {
  if (!t) return Qi;
  var o = t.sample_rate, s = t.include_users, a = t.sample_granularity, l = t.rules, c = t.r, u = c === void 0 ? Math.random() : c, f = mn(s, e);
  if (f) return function(y) {
    return cr(y, 1);
  };
  var h = a === "session", g = Pi(h, o, n, u, r), v = Dd(l, h, o, n, u, r);
  return function(y) {
    var E;
    if (!g()) return h && i[0](), false;
    if (!(y.ev_type in v)) return cr(y, o);
    if (!v[y.ev_type].enable) return h && i[1](y.ev_type), false;
    if (!((E = y.common) === null || E === void 0) && E.sample_rate) return y;
    var x = v[y.ev_type], S = x.conditional_hit_rules;
    if (S) {
      for (var m = 0; m < S.length; m++) if ($i(y, S[m].filter)) return S[m].hit() ? cr(y, S[m].effectiveSampleRate) : false;
    }
    return x.hit() ? cr(y, x.effectiveSampleRate) : (!(S && S.length) && h && i[1](y.ev_type), false);
  };
}, Fd = function(e) {
  e.on("start", function() {
    var t = e.config(), n = t.userId, r = t.sample, i = [function() {
      e.destroy();
    }, function(s) {
      e.destroyAgent.removeByEvType(s);
    }], o = Nd(n, r, ro, Cc, i);
    e.on("build", o);
  });
}, Ud = function() {
  var e = Se();
  return e && e.navigator.sendBeacon ? { get: function() {
  }, post: function(t, n) {
    e.navigator.sendBeacon(t, n);
  } } : { get: Re, post: Re };
};
function jd(e) {
  var t = new Error(e);
  return t.name = "ReqeustServerError", t;
}
function ns(e) {
  var t = new Error(e);
  return t.name = "RequestNetworkError", t;
}
var rs = function(e, t, n) {
  var r = t.url, i = t.data, o = t.success, s = o === void 0 ? Re : o, a = t.fail, l = a === void 0 ? Re : a, c = t.getResponseText, u = c === void 0 ? Re : c, f = t.withCredentials, h = f === void 0 ? false : f, g = new n();
  g.withCredentials = h, g.open(e, r, true), g.setRequestHeader("Content-Type", "application/json"), g.onload = function() {
    u?.(this.responseText);
    try {
      if (this.status >= 400) l(jd(this.responseText || this.statusText));
      else if (this.responseText) {
        var v = JSON.parse(this.responseText);
        s(v);
      } else s({});
    } catch (y) {
      l(y);
    }
  }, g.onerror = function() {
    l(ns("Network request failed"));
  }, g.onabort = function() {
    l(ns("Network request aborted"));
  }, g.send(i);
}, Bd = function() {
  var e = Jc();
  return e ? { useBeacon: true, get: function(t) {
    rs("GET", t, e);
  }, post: function(t) {
    rs("POST", t, e);
  } } : { get: Re, post: Re };
};
function Hd(e) {
  var t = sc(e), n = t.send;
  return nf(function() {
    if (e.transport.useBeacon) {
      var r = Ud(), i = t.getBatchData();
      i && (r.post(t.getEndpoint(), i), t.clear()), t.send = function(o) {
        r.post(t.getEndpoint(), Sa([o]));
      }, rf(function() {
        t.send = n;
      });
    } else t.flush();
  }), t;
}
var qd = "mon.zijieapi.com", Vd = "https://lf3-short.ibytedapm.com/slardar/fe/sdk-web/plugins", qr = "1.16.4", Wd = "SDK_SLARDAR_WEB", Ga = "/monitor_web/settings/browser-settings", Ya = "/monitor_browser/collect/batch/", Xa = "SLARDAR", is = ["/log/sentry/", Ya, Ga], Qa = "session", zd = ["blankScreen", "action"], Kd = { sample_rate: 1, include_users: [], sample_granularity: Qa, rules: {} }, Jd = 20, Gd = "";
function Yd(e, t, n) {
  n === void 0 && (n = Qd), tf(function() {
    e.on("init", function() {
      n(e, t);
    });
  });
}
var Za = function(e, t, n, r) {
  r === void 0 && (r = po);
  var i = t.config(), o = i.plugins, s = i.pluginBundle, a = e.filter(function(c) {
    return o[c] && !t.destroyAgent.has(c);
  }), l = function() {
    return a.forEach(function(c) {
      return Ii(t, c, n);
    });
  };
  a.every(function(c) {
    return tl(c, n);
  }) ? l() : r(t, { name: s.name }, l);
}, el = function(e, t, n, r) {
  r === void 0 && (r = po);
  var i = t.config().plugins;
  e.filter(function(o) {
    return i[o] && !t.destroyAgent.has(o);
  }).forEach(function(o) {
    tl(o, n) ? Ii(t, o, n) : r(t, { name: o, config: i[o] }, function() {
      return Ii(t, o, n);
    });
  });
}, Xd = function(e) {
  return function(t, n) {
    var r, i = e.config().pluginBundle;
    e.destroyAgent.has(t) && e.destroyAgent.remove(t), n !== void 0 && e.set({ plugins: q(q({}, e.config().plugins), (r = {}, r[t] = n, r)) }), i && ~i.plugins.indexOf(t) ? Za([t], e) : el([t], e);
  };
};
function Qd(e, t, n) {
  n === void 0 && (n = po);
  var r = e.config().pluginBundle, i = r ? r.plugins : [];
  Za(i, e, t, n), el(zd, e, t, n), e.provide("reloadPlugin", Xd(e));
}
function po(e, t, n, r) {
  var i = t.name, o = t.config;
  r === void 0 && (r = of);
  var s = Zd(e, i, o);
  r(s, function() {
    n();
  });
}
function Zd(e, t, n) {
  var r;
  return (r = n?.path) !== null && r !== void 0 ? r : e.config().pluginPathPrefix + "/" + _c(t) + "." + qr + "." + Gd + "js";
}
function Ii(e, t, n) {
  if (n === void 0 && (n = xn(Se())), !!n) {
    var r = vo(n, t);
    if (!r) {
      Cr("[loader].applyPlugin not found", t);
      return;
    }
    try {
      if (e.destroyAgent.has(t)) return;
      r.apply(e);
    } catch (i) {
      Ia(i), Cr("[loader].applyPlugin failed", t, i);
    }
  }
}
function vo(e, t) {
  return e.plugins.filter(function(n) {
    return n.name === t && n.version === qr;
  })[0];
}
function tl(e, t) {
  return t === void 0 && (t = xn(Se())), !t || !t.plugins ? false : !!vo(t, e);
}
function nl(e, t, n) {
  n === void 0 && (n = xn(Se())), !(!n || !n.plugins) && (vo(n, e) || n.plugins.push({ name: e, version: qr, apply: t }));
}
function rl(e) {
  var t, n, r = ["userId", "deviceId", "sessionId", "env"];
  try {
    for (var i = rc(r), o = i.next(); !o.done; o = i.next()) {
      var s = o.value;
      e[s] || delete e[s];
    }
  } catch (a) {
    t = { error: a };
  } finally {
    try {
      o && !o.done && (n = i.return) && n.call(i);
    } finally {
      if (t) throw t.error;
    }
  }
  return e;
}
function e0(e) {
  var t = e.plugins || {};
  for (var n in t) t[n] && !$e(t[n]) && (t[n] = {});
  return rl(q(q({}, e), { plugins: t }));
}
function t0(e) {
  return $e(e) && "bid" in e;
}
function n0(e) {
  return rl(q({}, e));
}
function r0(e) {
  var t;
  if (!e) return {};
  var n = e.sample, r = e.plugins, i = e.timestamp, o = e.quota_rate, s = o === void 0 ? 1 : o, a = e.apdex;
  if (!n) return {};
  var l = n.sample_rate, c = n.sample_granularity, u = c === void 0 ? Qa : c, f = n.include_users, h = n.rules, g = h === void 0 ? [] : h;
  return { sample: { include_users: f, sample_rate: l * s, sample_granularity: u, rules: g.reduce(function(v, y) {
    var E = y.name, x = y.enable, S = y.sample_rate, m = y.conditional_sample_rules;
    return v[E] = { enable: x, sample_rate: S, conditional_sample_rules: m }, v;
  }, {}) }, plugins: { heatmap: (t = r?.heatmap) !== null && t !== void 0 ? t : false }, apdex: a, serverTimestamp: i };
}
var i0 = function(e, t) {
  return t === void 0 && (t = Ya), (e && e.indexOf("//") >= 0 ? "" : "https://") + e + t;
}, o0 = function(e, t) {
  return t === void 0 && (t = Ga), (e && e.indexOf("//") >= 0 ? "" : "https://") + e + t;
}, s0 = function() {
  return Oi();
}, a0 = function(e) {
  var t = [];
  return e.observe = function(n) {
    t.push(n);
  }, e.push = function() {
    for (var n, r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
    return r.forEach(function(o) {
      t.forEach(function(s) {
        return s(o);
      });
    }), (n = [].push).call.apply(n, Ke([e], Z(r), false));
  }, e;
}, il = function(e) {
  return Xa + e;
}, ol = function(e, t) {
  return Xa + e + "::setting::" + t;
}, l0 = function(e, t) {
  try {
    var n = localStorage.getItem(e);
    if (!n || !so() || n[0] !== "{") return;
    ao(e, JSON.parse(n), t);
  } catch {
  }
}, u0 = function(e, t) {
  e === void 0 && (e = "");
  var n = { userId: Oi(), deviceId: Oi() };
  if (t <= 0) return n;
  var r = il(e);
  l0(r, t);
  var i = Da(r);
  return { userId: i?.userId || n.userId, deviceId: i?.deviceId || n.deviceId };
}, c0 = function(e) {
  var t = e.bid, n = e.userId, r = e.deviceId, i = e.storageExpires, o = il(t);
  ao(o, { userId: n, deviceId: r }, Na(i));
}, f0 = function(e, t) {
  var n = ol(e, t);
  return Da(n);
}, d0 = function(e, t, n, r) {
  var i = ol(t, n);
  ao(i, e, r);
}, h0 = { get: function() {
  return this.__SLARDAR__REPALCE__HOLDER__;
} }, p0 = function(e) {
  var t = e, n, r = {}, i = h0.get(), o, s = Re, a = Re;
  return { getConfig: function() {
    return t;
  }, setConfig: function(u) {
    return r = q(q({}, r), u || {}), l(), n || (n = u, t.useLocalConfig || !t.bid ? (o = {}, s()) : i ? c() : v0(t.transport, t.domain, t.bid, function(f) {
      i = f, c();
    }, t.serverSettingStorageExpires)), t;
  }, onChange: function(u) {
    a = u;
  }, onReady: function(u) {
    s = function() {
      c0(t), u();
    }, o && s();
  } };
  function l() {
    var u = q(q(q({}, e), o || {}), r);
    u.plugins = vc(e.plugins, o?.plugins || {}, r.plugins || {}), u.sample = os(os(e.sample, o?.sample), r.sample), t = u, a();
  }
  function c() {
    o = r0(i), l(), s();
  }
};
function v0(e, t, n, r, i) {
  i === void 0 && (i = 0);
  var o = 3, s = 2e3, a = 1e-3, l = Se(), c = f0(n, t), u = cf(), f = 0, h = false, g;
  if (u()) return S();
  v();
  function v() {
    f++, e.get({ withCredentials: true, url: o0(t) + "?bid=" + n + "&store=1", success: function(m) {
      y(m.data || {}, true);
    }, fail: E });
  }
  function y(m, w) {
    h || (h = true, w && i && d0(m, n, t, i), g && (g(), g = void 0), r(m));
  }
  function E(m) {
    if (c) return y(c, false);
    if (x(m) && l) {
      l.setTimeout(v, s);
      return;
    }
    return y({ sample: { sample_rate: a } }, false);
  }
  function x(m) {
    return f >= o || m.name !== "RequestNetworkError" ? false : Xc();
  }
  function S() {
    if (c) return y(c, false);
    g = ff(v);
  }
}
function os(e, t) {
  if (!e || !t) return e || t;
  var n = q(q({}, e), t);
  return n.include_users = Ke(Ke([], Z(e.include_users || []), false), Z(t.include_users || []), false), n.rules = Ke(Ke([], Z(Object.keys(e.rules || {})), false), Z(Object.keys(t.rules || {})), false).reduce(function(r, i) {
    var o, s;
    return i in r || (i in (e.rules || {}) && i in (t.rules || {}) ? (r[i] = q(q({}, e.rules[i]), t.rules[i]), r[i].conditional_sample_rules = Ke(Ke([], Z(e.rules[i].conditional_sample_rules || []), false), Z(t.rules[i].conditional_sample_rules || []), false)) : r[i] = ((o = e.rules) === null || o === void 0 ? void 0 : o[i]) || ((s = t.rules) === null || s === void 0 ? void 0 : s[i])), r;
  }, {}), n;
}
var g0 = { build: function(e) {
  return { ev_type: e.ev_type, payload: e.payload, common: q(q({}, e.extra || {}), e.overrides || {}) };
} }, m0 = function(e, t) {
  var n = t || {}, r = n.pid, i = r === void 0 ? "" : r, o = n.viewId, s = o === void 0 ? "" : o, a = { url: io(), timestamp: be(), sdk_version: qr, sdk_name: Wd, pid: i, view_id: s };
  return q(q({}, e), { extra: q(q({}, a), e.extra || {}) });
}, _0 = function(e) {
  e.on("report", function(t) {
    return m0(t, e.config());
  }), e.on("init", function() {
    var t = e.config(), n = t.pid, r = t.viewId, i = e.getPreStartQueue();
    i.forEach(function(o, s) {
      var a = o.extra || {};
      i[s] = q(q({}, o), { extra: q(q({}, a), { pid: a.pid || n, view_id: a.view_id || r }) });
    });
  });
}, y0 = { sri: "reportSri", st: "reportResourceError", err: "captureException", reject: "captureException" }, b0 = function(e) {
  return Object.keys(e).reduce(function(t, n) {
    return t[n] = [], t;
  }, {});
}, w0 = function(e) {
  return Object.keys(e).reduce(function(t, n) {
    return t[e[n]] ? t[e[n]].push(n) : t[e[n]] = [n], t;
  }, {});
}, S0 = function(e, t, n) {
  return function(r, i, o, s) {
    var a;
    o === void 0 && (o = be()), s === void 0 && (s = location.href);
    var l = q(q({}, Ma(e)), { url: s, timestamp: o });
    t[r] && (e[n[r]] ? oo(e, l)(function() {
      e[n[r]](i);
    }) : (a = t[r]) === null || a === void 0 || a.push([i, l]));
  };
}, E0 = function(e, t, n) {
  return function(r) {
    r in n && n[r].forEach(function(i) {
      var o;
      (o = t[i]) === null || o === void 0 || o.forEach(function(s) {
        var a = Z(s, 2), l = a[0], c = a[1];
        oo(e, c)(function() {
          e[r](l);
        });
      }), t[i] = null;
    });
  };
}, ai = function(e, t) {
  return t === "err" ? xr(e, "plugins." + Xo + ".onerror", function(n, r) {
    return n[r];
  }) !== false : t === "reject" ? xr(e, "plugins." + Xo + ".onunhandledrejection", function(n, r) {
    return n[r];
  }) !== false : true;
}, x0 = function(e, t) {
  var n;
  t === void 0 && (t = y0);
  var r = b0(t), i = w0(t), o = S0(e, r, t);
  !((n = e.p) === null || n === void 0) && n.a && "observe" in e.p.a && e.p.a.observe(function(s) {
    var a = Z(s, 5);
    a[0];
    var l = a[1], c = a[2], u = a[3], f = a[4], h = e.config();
    ai(h, l) && o(l, c, u, f);
  }), e.on("init", function() {
    var s, a = e.config();
    (s = e.p) === null || s === void 0 || s.a.forEach(function(l) {
      var c = Z(l, 5);
      c[0];
      var u = c[1], f = c[2], h = c[3], g = c[4];
      ai(a, u) && o(u, f, h, g);
    }), e.p && e.p.a && (e.p.a.length = 0), e.provide("precollect", function(l, c, u, f) {
      u === void 0 && (u = be()), f === void 0 && (f = location.href), ai(a, l) && o(l, c, u, f);
    });
  }), e.on("provide", E0(e, r, i));
}, ss = function(e) {
  var t = Z(e, 2), n = t[0], r = t[1];
  return { ev_type: qa, payload: { error: Zf(n), breadcrumbs: [], extra: r || {} }, extra: { bid: "slardar_sdk" } };
}, C0 = 1e-3, T0 = function(e, t) {
  t === void 0 && (t = C0);
  var n = xn(Se());
  n && (n.errors || (n.errors = []), !("observe" in n.errors) && ro(t) && (n.errors = a0(n.errors), n.errors.forEach(function(r) {
    e.report(ss(r));
  }), n.errors.observe(function(r) {
    e.report(ss(r));
  })));
}, O0 = 700, R0 = function(e) {
  var t, n = false;
  e.on("init", function() {
    t = (/* @__PURE__ */ new Date()).getTime(), e.on("config", function() {
      var r, i = (r = e.config()) === null || r === void 0 ? void 0 : r.serverTimestamp;
      if (!(isNaN(i) || Number(i) <= 0 || n)) {
        n = true;
        var o = (/* @__PURE__ */ new Date()).getTime(), s = o - t;
        if (s < O0 && i) {
          var a = i - (o + t) / 2;
          !isNaN(a) && (a > 0 || a < -6e5) && e.on("beforeBuild", function(l) {
            var c;
            return q(q({}, l), { extra: q(q({}, (c = l.extra) !== null && c !== void 0 ? c : {}), { sdk_offset: a ?? 0 }) });
          });
        }
      }
    });
  });
}, A0 = function(e, t) {
  var n = {};
  return n.bid = t.bid, n.user_id = t.userId, n.device_id = t.deviceId, n.session_id = t.sessionId, n.release = t.release, n.env = t.env, q(q({}, e), { extra: q(q({}, n), e.extra || {}) });
}, P0 = function(e) {
  e.on("beforeBuild", function(t) {
    return A0(t, e.config());
  });
}, $0 = function(e) {
  e.on("start", function() {
    var t = e.config().bid, n = e.getSender();
    n.setEndpoint(n.getEndpoint() + ("?biz_id=" + t));
  });
}, I0 = function(e) {
  var t = Na(e.storageExpires), n = u0(e.bid, t);
  return { bid: "", pid: "", viewId: Ka("_"), userId: n.userId, deviceId: n.deviceId, storageExpires: t, serverSettingStorageExpires: 0, sessionId: s0(), domain: qd, pluginBundle: { name: "commonMonitors", plugins: ["breadcrumb", "jsError", "performance", "resourceError", "resource"] }, pluginPathPrefix: Vd, plugins: { ajax: { ignoreUrls: is }, fetch: { ignoreUrls: is }, breadcrumb: {}, pageview: {}, jsError: {}, resource: {}, resourceError: {}, performance: {}, tti: {}, fmp: {}, blankScreen: false, heatmap: false }, release: "", env: "production", sample: Kd, transport: Bd() };
}, M0 = function(e) {
  var t = e === void 0 ? {} : e, n = t.createSender, r = n === void 0 ? function(f) {
    return Hd({ size: Jd, endpoint: i0(f.domain), transport: f.transport });
  } : n, i = t.builder, o = i === void 0 ? g0 : i, s = t.createDefaultConfig, a = s === void 0 ? I0 : s, l = Uc({ validateInitConfig: t0, initConfigNormalizer: e0, userConfigNormalizer: n0, createSender: r, builder: o, createDefaultConfig: a, createConfigManager: p0 });
  T0(l), jc(l);
  var c = xn(Se());
  Wc(l, c && c.subject), R0(l), P0(l), _0(l), Id(l), $0(l);
  var u = Bc(l, Ma, function(f, h, g) {
    return oo(f, h)(function() {
      var v = Z(g), y = v[0], E = v.slice(1);
      l[y].apply(l, Ke([], Z(E), false));
    });
  });
  return Hc(u, nl), zc(u), u;
}, Pn, li = (Pn = {}, Pn[Or] = Td, Pn[uo] = Hf, Pn[fo] = Gf, Pn), sl = function(e) {
  e === void 0 && (e = {});
  var t = M0(e);
  return Fd(t), x0(t), $d(t), Object.keys(li).forEach(function(n) {
    nl(n, li[n]), li[n](t);
  }), Yd(t), t.provide("create", sl), t;
}, ui = "precollect", as = 1e3 * 60 * 5;
function L0(e, t) {
  if ("addEventListener" in e) {
    t.pcErr = function(r) {
      r = r || e.event;
      var i = r.target || r.srcElement || {};
      i instanceof Element || i instanceof HTMLElement ? t(ui, "st", { tagName: i.tagName, url: i.getAttribute("href") || i.getAttribute("src") }) : t(ui, "err", r.error);
    }, t.pcRej = function(r) {
      r = r || e.event, t(ui, "reject", r.reason || r.detail && r.detail.reason);
    };
    var n = [];
    n.push(Rt(e, "error", t.pcErr, true)), n.push(Rt(e, "unhandledrejection", t.pcRej, true)), setTimeout(function() {
      n.forEach(function(r) {
        return r();
      });
    }, as);
  }
  "PerformanceObserver" in e && "PerformanceLongTaskTiming" in e && (t.pp = { entries: [] }, t.pp.observer = new PerformanceObserver(function(r) {
    t.pp.entries = t.pp.entries.concat(r.getEntries());
  }), t.pp.observer.observe({ entryTypes: ["longtask"] }), setTimeout(function() {
    t.pp.observer.disconnect();
  }, as));
}
var gr = sl(), ls = Se();
ls && L0(ls, gr);
const us = ["RequestError", "AbortError", "TimeoutError", "cancelled", "Stream read timeout after", "get cert timeout", "internal/net", "unexcepted status code", "ETIMEDOUT", "ECONNRESET", "Invalid WebSocket frame", "WebSocket was closed", "/ws/lib/", "Request failed:"], k0 = [{ pattern: /([/\\]Users[/\\])[^/\\]+([/\\])/gi, replacement: "$1[USERNAME]$2" }, { pattern: /([/\\])\d+(?:\.\d+){1,}([/\\])/g, replacement: "$1[VERSION]$2" }, { pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, replacement: "[UUID]" }, { pattern: /[\d.]+ ?(bytes|[KMGT]i?B)\b/gi, replacement: "[SIZE] $1" }, { pattern: /[\d.]+%/g, replacement: "[PERCENT]" }];
function cs(e) {
  let t = e;
  for (const n of k0) t = t.replace(n.pattern, n.replacement);
  return t;
}
function D0(e) {
  if (us.length === 0) return false;
  let t = "";
  return e instanceof Error ? t = `${e.name} ${e.message} ${e.stack ?? ""}` : typeof e == "string" ? t = e : t = String(e), us.some((n) => t.includes(n));
}
function N0(e) {
  const n = new URLSearchParams(window.location.search).get("global_config"), r = JSON.parse(n ?? "{}");
  gr.on("beforeSend", (i) => {
    const s = i?.payload?.error;
    if (s) {
      const a = { name: s.name ?? "", message: s.message ?? "", stack: s.stack ?? "" };
      if (D0(a)) return false;
      s.message && (s.message = cs(s.message)), s.stack && (s.stack = cs(s.stack));
    }
    return i;
  }), gr.init({ bid: "luna_pc", deviceId: r.deviceId, userId: r.deviceId, pid: e, release: "3.7.0", env: "production" }), gr.start();
}
N0("feedback");
function go(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const _e = {}, fn = [], ot = () => {
}, al = () => false, Vr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), mo = (e) => e.startsWith("onUpdate:"), Ie = Object.assign, _o = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, F0 = Object.prototype.hasOwnProperty, fe = (e, t) => F0.call(e, t), ne = Array.isArray, dn = (e) => Wr(e) === "[object Map]", ll = (e) => Wr(e) === "[object Set]", oe = (e) => typeof e == "function", Ce = (e) => typeof e == "string", It = (e) => typeof e == "symbol", we = (e) => e !== null && typeof e == "object", ul = (e) => (we(e) || oe(e)) && oe(e.then) && oe(e.catch), cl = Object.prototype.toString, Wr = (e) => cl.call(e), U0 = (e) => Wr(e).slice(8, -1), fl = (e) => Wr(e) === "[object Object]", yo = (e) => Ce(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Dn = go(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), zr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, j0 = /-\w/g, it = zr((e) => e.replace(j0, (t) => t.slice(1).toUpperCase())), B0 = /\B([A-Z])/g, sn = zr((e) => e.replace(B0, "-$1").toLowerCase()), Kr = zr((e) => e.charAt(0).toUpperCase() + e.slice(1)), ci = zr((e) => e ? `on${Kr(e)}` : ""), qt = (e, t) => !Object.is(e, t), fi = (e, ...t) => {
  for (let n = 0; n < e.length; n++) e[n](...t);
}, dl = (e, t, n, r = false) => {
  Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: r, value: n });
}, H0 = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, q0 = (e) => {
  const t = Ce(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let fs;
const Jr = () => fs || (fs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Cn(e) {
  if (ne(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], i = Ce(r) ? K0(r) : Cn(r);
      if (i) for (const o in i) t[o] = i[o];
    }
    return t;
  } else if (Ce(e) || we(e)) return e;
}
const V0 = /;(?![^(]*\))/g, W0 = /:([^]+)/, z0 = /\/\*[^]*?\*\//g;
function K0(e) {
  const t = {};
  return e.replace(z0, "").split(V0).forEach((n) => {
    if (n) {
      const r = n.split(W0);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function at(e) {
  let t = "";
  if (Ce(e)) t = e;
  else if (ne(e)) for (let n = 0; n < e.length; n++) {
    const r = at(e[n]);
    r && (t += r + " ");
  }
  else if (we(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const J0 = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", G0 = go(J0);
function hl(e) {
  return !!e || e === "";
}
const pl = (e) => !!(e && e.__v_isRef === true), Fe = (e) => Ce(e) ? e : e == null ? "" : ne(e) || we(e) && (e.toString === cl || !oe(e.toString)) ? pl(e) ? Fe(e.value) : JSON.stringify(e, vl, 2) : String(e), vl = (e, t) => pl(t) ? vl(e, t.value) : dn(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, i], o) => (n[di(r, o) + " =>"] = i, n), {}) } : ll(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => di(n)) } : It(t) ? di(t) : we(t) && !ne(t) && !fl(t) ? String(t) : t, di = (e, t = "") => {
  var n;
  return It(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
function Y0(e) {
  return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e);
}
let Le;
class X0 {
  constructor(t = false) {
    this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = Le, !t && Le && (this.index = (Le.scopes || (Le.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = false;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Le;
      try {
        return Le = this, t();
      } finally {
        Le = n;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = Le, Le = this);
  }
  off() {
    this._on > 0 && --this._on === 0 && (Le = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = false;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(true);
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
function gl() {
  return Le;
}
function Q0(e, t = false) {
  Le && Le.cleanups.push(e);
}
let me;
const hi = /* @__PURE__ */ new WeakSet();
class ml {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Le && Le.active && Le.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, hi.has(this) && (hi.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || yl(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, ds(this), bl(this);
    const t = me, n = st;
    me = this, st = true;
    try {
      return this.fn();
    } finally {
      wl(this), me = t, st = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) So(t);
      this.deps = this.depsTail = void 0, ds(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? hi.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    Mi(this) && this.run();
  }
  get dirty() {
    return Mi(this);
  }
}
let _l = 0, Nn, Fn;
function yl(e, t = false) {
  if (e.flags |= 8, t) {
    e.next = Fn, Fn = e;
    return;
  }
  e.next = Nn, Nn = e;
}
function bo() {
  _l++;
}
function wo() {
  if (--_l > 0) return;
  if (Fn) {
    let t = Fn;
    for (Fn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Nn; ) {
    let t = Nn;
    for (Nn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (r) {
        e || (e = r);
      }
      t = n;
    }
  }
  if (e) throw e;
}
function bl(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function wl(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const i = r.prevDep;
    r.version === -1 ? (r === n && (n = i), So(r), Z0(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = i;
  }
  e.deps = t, e.depsTail = n;
}
function Mi(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Sl(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e._dirty;
}
function Sl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Kn) || (e.globalVersion = Kn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Mi(e)))) return;
  e.flags |= 2;
  const t = e.dep, n = me, r = st;
  me = e, st = true;
  try {
    bl(e);
    const i = e.fn(e._value);
    (t.version === 0 || qt(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    me = n, st = r, wl(e), e.flags &= -3;
  }
}
function So(e, t = false) {
  const { dep: n, prevSub: r, nextSub: i } = e;
  if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep) So(o, true);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Z0(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let st = true;
const El = [];
function At() {
  El.push(st), st = false;
}
function Pt() {
  const e = El.pop();
  st = e === void 0 ? true : e;
}
function ds(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = me;
    me = void 0;
    try {
      t();
    } finally {
      me = n;
    }
  }
}
let Kn = 0;
class eh {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Eo {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
  }
  track(t) {
    if (!me || !st || me === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== me) n = this.activeLink = new eh(me, this), me.deps ? (n.prevDep = me.depsTail, me.depsTail.nextDep = n, me.depsTail = n) : me.deps = me.depsTail = n, xl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = me.depsTail, n.nextDep = void 0, me.depsTail.nextDep = n, me.depsTail = n, me.deps === n && (me.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Kn++, this.notify(t);
  }
  notify(t) {
    bo();
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
    } finally {
      wo();
    }
  }
}
function xl(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) xl(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Li = /* @__PURE__ */ new WeakMap(), Qt = Symbol(""), ki = Symbol(""), Jn = Symbol("");
function ke(e, t, n) {
  if (st && me) {
    let r = Li.get(e);
    r || Li.set(e, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || (r.set(n, i = new Eo()), i.map = r, i.key = n), i.track();
  }
}
function Ot(e, t, n, r, i, o) {
  const s = Li.get(e);
  if (!s) {
    Kn++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (bo(), t === "clear") s.forEach(a);
  else {
    const l = ne(e), c = l && yo(n);
    if (l && n === "length") {
      const u = Number(r);
      s.forEach((f, h) => {
        (h === "length" || h === Jn || !It(h) && h >= u) && a(f);
      });
    } else switch ((n !== void 0 || s.has(void 0)) && a(s.get(n)), c && a(s.get(Jn)), t) {
      case "add":
        l ? c && a(s.get("length")) : (a(s.get(Qt)), dn(e) && a(s.get(ki)));
        break;
      case "delete":
        l || (a(s.get(Qt)), dn(e) && a(s.get(ki)));
        break;
      case "set":
        dn(e) && a(s.get(Qt));
        break;
    }
  }
  wo();
}
function ln(e) {
  const t = ce(e);
  return t === e ? t : (ke(t, "iterate", Jn), rt(e) ? t : t.map(lt));
}
function Gr(e) {
  return ke(e = ce(e), "iterate", Jn), e;
}
function Ft(e, t) {
  return $t(e) ? Zt(e) ? bn(lt(t)) : bn(t) : lt(t);
}
const th = { __proto__: null, [Symbol.iterator]() {
  return pi(this, Symbol.iterator, (e) => Ft(this, e));
}, concat(...e) {
  return ln(this).concat(...e.map((t) => ne(t) ? ln(t) : t));
}, entries() {
  return pi(this, "entries", (e) => (e[1] = Ft(this, e[1]), e));
}, every(e, t) {
  return xt(this, "every", e, t, void 0, arguments);
}, filter(e, t) {
  return xt(this, "filter", e, t, (n) => n.map((r) => Ft(this, r)), arguments);
}, find(e, t) {
  return xt(this, "find", e, t, (n) => Ft(this, n), arguments);
}, findIndex(e, t) {
  return xt(this, "findIndex", e, t, void 0, arguments);
}, findLast(e, t) {
  return xt(this, "findLast", e, t, (n) => Ft(this, n), arguments);
}, findLastIndex(e, t) {
  return xt(this, "findLastIndex", e, t, void 0, arguments);
}, forEach(e, t) {
  return xt(this, "forEach", e, t, void 0, arguments);
}, includes(...e) {
  return vi(this, "includes", e);
}, indexOf(...e) {
  return vi(this, "indexOf", e);
}, join(e) {
  return ln(this).join(e);
}, lastIndexOf(...e) {
  return vi(this, "lastIndexOf", e);
}, map(e, t) {
  return xt(this, "map", e, t, void 0, arguments);
}, pop() {
  return $n(this, "pop");
}, push(...e) {
  return $n(this, "push", e);
}, reduce(e, ...t) {
  return hs(this, "reduce", e, t);
}, reduceRight(e, ...t) {
  return hs(this, "reduceRight", e, t);
}, shift() {
  return $n(this, "shift");
}, some(e, t) {
  return xt(this, "some", e, t, void 0, arguments);
}, splice(...e) {
  return $n(this, "splice", e);
}, toReversed() {
  return ln(this).toReversed();
}, toSorted(e) {
  return ln(this).toSorted(e);
}, toSpliced(...e) {
  return ln(this).toSpliced(...e);
}, unshift(...e) {
  return $n(this, "unshift", e);
}, values() {
  return pi(this, "values", (e) => Ft(this, e));
} };
function pi(e, t, n) {
  const r = Gr(e), i = r[t]();
  return r !== e && !rt(e) && (i._next = i.next, i.next = () => {
    const o = i._next();
    return o.done || (o.value = n(o.value)), o;
  }), i;
}
const nh = Array.prototype;
function xt(e, t, n, r, i, o) {
  const s = Gr(e), a = s !== e && !rt(e), l = s[t];
  if (l !== nh[t]) {
    const f = l.apply(e, o);
    return a ? lt(f) : f;
  }
  let c = n;
  s !== e && (a ? c = function(f, h) {
    return n.call(this, Ft(e, f), h, e);
  } : n.length > 2 && (c = function(f, h) {
    return n.call(this, f, h, e);
  }));
  const u = l.call(s, c, r);
  return a && i ? i(u) : u;
}
function hs(e, t, n, r) {
  const i = Gr(e);
  let o = n;
  return i !== e && (rt(e) ? n.length > 3 && (o = function(s, a, l) {
    return n.call(this, s, a, l, e);
  }) : o = function(s, a, l) {
    return n.call(this, s, Ft(e, a), l, e);
  }), i[t](o, ...r);
}
function vi(e, t, n) {
  const r = ce(e);
  ke(r, "iterate", Jn);
  const i = r[t](...n);
  return (i === -1 || i === false) && To(n[0]) ? (n[0] = ce(n[0]), r[t](...n)) : i;
}
function $n(e, t, n = []) {
  At(), bo();
  const r = ce(e)[t].apply(e, n);
  return wo(), Pt(), r;
}
const rh = go("__proto__,__v_isRef,__isVue"), Cl = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(It));
function ih(e) {
  It(e) || (e = String(e));
  const t = ce(this);
  return ke(t, "has", e), t.hasOwnProperty(e);
}
class Tl {
  constructor(t = false, n = false) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive") return !i;
    if (n === "__v_isReadonly") return i;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw") return r === (i ? o ? ph : Pl : o ? Al : Rl).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const s = ne(t);
    if (!i) {
      let l;
      if (s && (l = th[n])) return l;
      if (n === "hasOwnProperty") return ih;
    }
    const a = Reflect.get(t, n, Ue(t) ? t : r);
    if ((It(n) ? Cl.has(n) : rh(n)) || (i || ke(t, "get", n), o)) return a;
    if (Ue(a)) {
      const l = s && yo(n) ? a : a.value;
      return i && we(l) ? Ni(l) : l;
    }
    return we(a) ? i ? Ni(a) : an(a) : a;
  }
}
class Ol extends Tl {
  constructor(t = false) {
    super(false, t);
  }
  set(t, n, r, i) {
    let o = t[n];
    const s = ne(t) && yo(n);
    if (!this._isShallow) {
      const c = $t(o);
      if (!rt(r) && !$t(r) && (o = ce(o), r = ce(r)), !s && Ue(o) && !Ue(r)) return c || (o.value = r), true;
    }
    const a = s ? Number(n) < t.length : fe(t, n), l = Reflect.set(t, n, r, Ue(t) ? t : i);
    return t === ce(i) && (a ? qt(r, o) && Ot(t, "set", n, r) : Ot(t, "add", n, r)), l;
  }
  deleteProperty(t, n) {
    const r = fe(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && r && Ot(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!It(n) || !Cl.has(n)) && ke(t, "has", n), r;
  }
  ownKeys(t) {
    return ke(t, "iterate", ne(t) ? "length" : Qt), Reflect.ownKeys(t);
  }
}
class oh extends Tl {
  constructor(t = false) {
    super(true, t);
  }
  set(t, n) {
    return true;
  }
  deleteProperty(t, n) {
    return true;
  }
}
const sh = new Ol(), ah = new oh(), lh = new Ol(true);
const Di = (e) => e, fr = (e) => Reflect.getPrototypeOf(e);
function uh(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, o = ce(i), s = dn(o), a = e === "entries" || e === Symbol.iterator && s, l = e === "keys" && s, c = i[e](...r), u = n ? Di : t ? bn : lt;
    return !t && ke(o, "iterate", l ? ki : Qt), { next() {
      const { value: f, done: h } = c.next();
      return h ? { value: f, done: h } : { value: a ? [u(f[0]), u(f[1])] : u(f), done: h };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function dr(e) {
  return function(...t) {
    return e === "delete" ? false : e === "clear" ? void 0 : this;
  };
}
function ch(e, t) {
  const n = { get(i) {
    const o = this.__v_raw, s = ce(o), a = ce(i);
    e || (qt(i, a) && ke(s, "get", i), ke(s, "get", a));
    const { has: l } = fr(s), c = t ? Di : e ? bn : lt;
    if (l.call(s, i)) return c(o.get(i));
    if (l.call(s, a)) return c(o.get(a));
    o !== s && o.get(i);
  }, get size() {
    const i = this.__v_raw;
    return !e && ke(ce(i), "iterate", Qt), i.size;
  }, has(i) {
    const o = this.__v_raw, s = ce(o), a = ce(i);
    return e || (qt(i, a) && ke(s, "has", i), ke(s, "has", a)), i === a ? o.has(i) : o.has(i) || o.has(a);
  }, forEach(i, o) {
    const s = this, a = s.__v_raw, l = ce(a), c = t ? Di : e ? bn : lt;
    return !e && ke(l, "iterate", Qt), a.forEach((u, f) => i.call(o, c(u), c(f), s));
  } };
  return Ie(n, e ? { add: dr("add"), set: dr("set"), delete: dr("delete"), clear: dr("clear") } : { add(i) {
    !t && !rt(i) && !$t(i) && (i = ce(i));
    const o = ce(this);
    return fr(o).has.call(o, i) || (o.add(i), Ot(o, "add", i, i)), this;
  }, set(i, o) {
    !t && !rt(o) && !$t(o) && (o = ce(o));
    const s = ce(this), { has: a, get: l } = fr(s);
    let c = a.call(s, i);
    c || (i = ce(i), c = a.call(s, i));
    const u = l.call(s, i);
    return s.set(i, o), c ? qt(o, u) && Ot(s, "set", i, o) : Ot(s, "add", i, o), this;
  }, delete(i) {
    const o = ce(this), { has: s, get: a } = fr(o);
    let l = s.call(o, i);
    l || (i = ce(i), l = s.call(o, i)), a && a.call(o, i);
    const c = o.delete(i);
    return l && Ot(o, "delete", i, void 0), c;
  }, clear() {
    const i = ce(this), o = i.size !== 0, s = i.clear();
    return o && Ot(i, "clear", void 0, void 0), s;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    n[i] = uh(i, e, t);
  }), n;
}
function xo(e, t) {
  const n = ch(e, t);
  return (r, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(fe(n, i) && i in r ? n : r, i, o);
}
const fh = { get: xo(false, false) }, dh = { get: xo(false, true) }, hh = { get: xo(true, false) };
const Rl = /* @__PURE__ */ new WeakMap(), Al = /* @__PURE__ */ new WeakMap(), Pl = /* @__PURE__ */ new WeakMap(), ph = /* @__PURE__ */ new WeakMap();
function vh(e) {
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
function gh(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : vh(U0(e));
}
function an(e) {
  return $t(e) ? e : Co(e, false, sh, fh, Rl);
}
function mh(e) {
  return Co(e, false, lh, dh, Al);
}
function Ni(e) {
  return Co(e, true, ah, hh, Pl);
}
function Co(e, t, n, r, i) {
  if (!we(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = gh(e);
  if (o === 0) return e;
  const s = i.get(e);
  if (s) return s;
  const a = new Proxy(e, o === 2 ? r : n);
  return i.set(e, a), a;
}
function Zt(e) {
  return $t(e) ? Zt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function $t(e) {
  return !!(e && e.__v_isReadonly);
}
function rt(e) {
  return !!(e && e.__v_isShallow);
}
function To(e) {
  return e ? !!e.__v_raw : false;
}
function ce(e) {
  const t = e && e.__v_raw;
  return t ? ce(t) : e;
}
function _h(e) {
  return !fe(e, "__v_skip") && Object.isExtensible(e) && dl(e, "__v_skip", true), e;
}
const lt = (e) => we(e) ? an(e) : e, bn = (e) => we(e) ? Ni(e) : e;
function Ue(e) {
  return e ? e.__v_isRef === true : false;
}
function Ee(e) {
  return $l(e, false);
}
function yh(e) {
  return $l(e, true);
}
function $l(e, t) {
  return Ue(e) ? e : new bh(e, t);
}
class bh {
  constructor(t, n) {
    this.dep = new Eo(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? t : ce(t), this._value = n ? t : lt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || rt(t) || $t(t);
    t = r ? t : ce(t), qt(t, n) && (this._rawValue = t, this._value = r ? t : lt(t), this.dep.trigger());
  }
}
function ue(e) {
  return Ue(e) ? e.value : e;
}
const wh = { get: (e, t, n) => t === "__v_raw" ? e : ue(Reflect.get(e, t, n)), set: (e, t, n, r) => {
  const i = e[t];
  return Ue(i) && !Ue(n) ? (i.value = n, true) : Reflect.set(e, t, n, r);
} };
function Il(e) {
  return Zt(e) ? e : new Proxy(e, wh);
}
class Sh {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Eo(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Kn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && me !== this) return yl(this, true), true;
  }
  get value() {
    const t = this.dep.track();
    return Sl(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Eh(e, t, n = false) {
  let r, i;
  return oe(e) ? r = e : (r = e.get, i = e.set), new Sh(r, i, n);
}
const hr = {}, Rr = /* @__PURE__ */ new WeakMap();
let Gt;
function xh(e, t = false, n = Gt) {
  if (n) {
    let r = Rr.get(n);
    r || Rr.set(n, r = []), r.push(e);
  }
}
function Ch(e, t, n = _e) {
  const { immediate: r, deep: i, once: o, scheduler: s, augmentJob: a, call: l } = n, c = (w) => i ? w : rt(w) || i === false || i === 0 ? Bt(w, 1) : Bt(w);
  let u, f, h, g, v = false, y = false;
  if (Ue(e) ? (f = () => e.value, v = rt(e)) : Zt(e) ? (f = () => c(e), v = true) : ne(e) ? (y = true, v = e.some((w) => Zt(w) || rt(w)), f = () => e.map((w) => {
    if (Ue(w)) return w.value;
    if (Zt(w)) return c(w);
    if (oe(w)) return l ? l(w, 2) : w();
  })) : oe(e) ? t ? f = l ? () => l(e, 2) : e : f = () => {
    if (h) {
      At();
      try {
        h();
      } finally {
        Pt();
      }
    }
    const w = Gt;
    Gt = u;
    try {
      return l ? l(e, 3, [g]) : e(g);
    } finally {
      Gt = w;
    }
  } : f = ot, t && i) {
    const w = f, B = i === true ? 1 / 0 : i;
    f = () => Bt(w(), B);
  }
  const E = gl(), x = () => {
    u.stop(), E && E.active && _o(E.effects, u);
  };
  if (o && t) {
    const w = t;
    t = (...B) => {
      w(...B), x();
    };
  }
  let S = y ? new Array(e.length).fill(hr) : hr;
  const m = (w) => {
    if (!(!(u.flags & 1) || !u.dirty && !w)) if (t) {
      const B = u.run();
      if (i || v || (y ? B.some((H, re) => qt(H, S[re])) : qt(B, S))) {
        h && h();
        const H = Gt;
        Gt = u;
        try {
          const re = [B, S === hr ? void 0 : y && S[0] === hr ? [] : S, g];
          S = B, l ? l(t, 3, re) : t(...re);
        } finally {
          Gt = H;
        }
      }
    } else u.run();
  };
  return a && a(m), u = new ml(f), u.scheduler = s ? () => s(m, false) : m, g = (w) => xh(w, false, u), h = u.onStop = () => {
    const w = Rr.get(u);
    if (w) {
      if (l) l(w, 4);
      else for (const B of w) B();
      Rr.delete(u);
    }
  }, t ? r ? m(true) : S = u.run() : s ? s(m.bind(null, true), true) : u.run(), x.pause = u.pause.bind(u), x.resume = u.resume.bind(u), x.stop = x, x;
}
function Bt(e, t = 1 / 0, n) {
  if (t <= 0 || !we(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
  if (n.set(e, t), t--, Ue(e)) Bt(e.value, t, n);
  else if (ne(e)) for (let r = 0; r < e.length; r++) Bt(e[r], t, n);
  else if (ll(e) || dn(e)) e.forEach((r) => {
    Bt(r, t, n);
  });
  else if (fl(e)) {
    for (const r in e) Bt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Bt(e[r], t, n);
  }
  return e;
}
function nr(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (i) {
    Yr(i, t, n);
  }
}
function ut(e, t, n, r) {
  if (oe(e)) {
    const i = nr(e, t, n, r);
    return i && ul(i) && i.catch((o) => {
      Yr(o, t, n);
    }), i;
  }
  if (ne(e)) {
    const i = [];
    for (let o = 0; o < e.length; o++) i.push(ut(e[o], t, n, r));
    return i;
  }
}
function Yr(e, t, n, r = true) {
  const i = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = t && t.appContext.config || _e;
  if (t) {
    let a = t.parent;
    const l = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const u = a.ec;
      if (u) {
        for (let f = 0; f < u.length; f++) if (u[f](e, l, c) === false) return;
      }
      a = a.parent;
    }
    if (o) {
      At(), nr(o, null, 10, [e, l, c]), Pt();
      return;
    }
  }
  Th(e, n, i, r, s);
}
function Th(e, t, n, r = true, i = false) {
  if (i) throw e;
  console.error(e);
}
const He = [];
let _t = -1;
const hn = [];
let Ut = null, un = 0;
const Ml = Promise.resolve();
let Ar = null;
function Ll(e) {
  const t = Ar || Ml;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Oh(e) {
  let t = _t + 1, n = He.length;
  for (; t < n; ) {
    const r = t + n >>> 1, i = He[r], o = Gn(i);
    o < e || o === e && i.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Oo(e) {
  if (!(e.flags & 1)) {
    const t = Gn(e), n = He[He.length - 1];
    !n || !(e.flags & 2) && t >= Gn(n) ? He.push(e) : He.splice(Oh(t), 0, e), e.flags |= 1, kl();
  }
}
function kl() {
  Ar || (Ar = Ml.then(Fl));
}
function Dl(e) {
  ne(e) ? hn.push(...e) : Ut && e.id === -1 ? Ut.splice(un + 1, 0, e) : e.flags & 1 || (hn.push(e), e.flags |= 1), kl();
}
function ps(e, t, n = _t + 1) {
  for (; n < He.length; n++) {
    const r = He[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      He.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Nl(e) {
  if (hn.length) {
    const t = [...new Set(hn)].sort((n, r) => Gn(n) - Gn(r));
    if (hn.length = 0, Ut) {
      Ut.push(...t);
      return;
    }
    for (Ut = t, un = 0; un < Ut.length; un++) {
      const n = Ut[un];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Ut = null, un = 0;
  }
}
const Gn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Fl(e) {
  try {
    for (_t = 0; _t < He.length; _t++) {
      const t = He[_t];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), nr(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; _t < He.length; _t++) {
      const t = He[_t];
      t && (t.flags &= -2);
    }
    _t = -1, He.length = 0, Nl(), Ar = null, (He.length || hn.length) && Fl();
  }
}
let qe = null, Ul = null;
function Pr(e) {
  const t = qe;
  return qe = e, Ul = e && e.type.__scopeId || null, t;
}
function wn(e, t = qe, n) {
  if (!t || e._n) return e;
  const r = (...i) => {
    r._d && Cs(-1);
    const o = Pr(t);
    let s;
    try {
      s = e(...i);
    } finally {
      Pr(o), r._d && Cs(1);
    }
    return s;
  };
  return r._n = true, r._c = true, r._d = true, r;
}
function zt(e, t, n, r) {
  const i = e.dirs, o = t && t.dirs;
  for (let s = 0; s < i.length; s++) {
    const a = i[s];
    o && (a.oldValue = o[s].value);
    let l = a.dir[r];
    l && (At(), ut(l, n, 8, [e.el, a, e, t]), Pt());
  }
}
function Rh(e, t) {
  if (De) {
    let n = De.provides;
    const r = De.parent && De.parent.provides;
    r === n && (n = De.provides = Object.create(r)), n[e] = t;
  }
}
function Un(e, t, n = false) {
  const r = Lo();
  if (r || vn) {
    let i = vn ? vn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (i && e in i) return i[e];
    if (arguments.length > 1) return n && oe(t) ? t.call(r && r.proxy) : t;
  }
}
const Ah = Symbol.for("v-scx"), Ph = () => Un(Ah);
function Vt(e, t, n) {
  return jl(e, t, n);
}
function jl(e, t, n = _e) {
  const { immediate: r, deep: i, flush: o, once: s } = n, a = Ie({}, n), l = t && r || !t && o !== "post";
  let c;
  if (Zn) {
    if (o === "sync") {
      const g = Ph();
      c = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!l) {
      const g = () => {
      };
      return g.stop = ot, g.resume = ot, g.pause = ot, g;
    }
  }
  const u = De;
  a.call = (g, v, y) => ut(g, u, v, y);
  let f = false;
  o === "post" ? a.scheduler = (g) => {
    Xe(g, u && u.suspense);
  } : o !== "sync" && (f = true, a.scheduler = (g, v) => {
    v ? g() : Oo(g);
  }), a.augmentJob = (g) => {
    t && (g.flags |= 4), f && (g.flags |= 2, u && (g.id = u.uid, g.i = u));
  };
  const h = Ch(e, t, a);
  return Zn && (c ? c.push(h) : l && h()), h;
}
function $h(e, t, n) {
  const r = this.proxy, i = Ce(e) ? e.includes(".") ? Bl(r, e) : () => r[e] : e.bind(r, r);
  let o;
  oe(t) ? o = t : (o = t.handler, n = t);
  const s = ir(this), a = jl(i, o.bind(r), n);
  return s(), a;
}
function Bl(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let i = 0; i < n.length && r; i++) r = r[n[i]];
    return r;
  };
}
const Ih = Symbol("_vte"), Mh = (e) => e.__isTeleport, Yt = Symbol("_leaveCb"), pr = Symbol("_enterCb");
function Lh() {
  const e = { isMounted: false, isLeaving: false, isUnmounting: false, leavingVNodes: /* @__PURE__ */ new Map() };
  return rr(() => {
    e.isMounted = true;
  }), Kl(() => {
    e.isUnmounting = true;
  }), e;
}
const nt = [Function, Array], kh = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: nt, onEnter: nt, onAfterEnter: nt, onEnterCancelled: nt, onBeforeLeave: nt, onLeave: nt, onAfterLeave: nt, onLeaveCancelled: nt, onBeforeAppear: nt, onAppear: nt, onAfterAppear: nt, onAppearCancelled: nt };
function Dh(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Fi(e, t, n, r, i) {
  const { appear: o, mode: s, persisted: a = false, onBeforeEnter: l, onEnter: c, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: h, onLeave: g, onAfterLeave: v, onLeaveCancelled: y, onBeforeAppear: E, onAppear: x, onAfterAppear: S, onAppearCancelled: m } = t, w = String(e.key), B = Dh(n, e), H = (J, Y) => {
    J && ut(J, r, 9, Y);
  }, re = (J, Y) => {
    const W = Y[1];
    H(J, Y), ne(J) ? J.every((D) => D.length <= 1) && W() : J.length <= 1 && W();
  }, pe = { mode: s, persisted: a, beforeEnter(J) {
    let Y = l;
    if (!n.isMounted) if (o) Y = E || l;
    else return;
    J[Yt] && J[Yt](true);
    const W = B[w];
    W && cn(e, W) && W.el[Yt] && W.el[Yt](), H(Y, [J]);
  }, enter(J) {
    let Y = c, W = u, D = f;
    if (!n.isMounted) if (o) Y = x || c, W = S || u, D = m || f;
    else return;
    let ae = false;
    const U = J[pr] = (L) => {
      ae || (ae = true, L ? H(D, [J]) : H(W, [J]), pe.delayedLeave && pe.delayedLeave(), J[pr] = void 0);
    };
    Y ? re(Y, [J, U]) : U();
  }, leave(J, Y) {
    const W = String(e.key);
    if (J[pr] && J[pr](true), n.isUnmounting) return Y();
    H(h, [J]);
    let D = false;
    const ae = J[Yt] = (U) => {
      D || (D = true, Y(), U ? H(y, [J]) : H(v, [J]), J[Yt] = void 0, B[W] === e && delete B[W]);
    };
    B[W] = e, g ? re(g, [J, ae]) : ae();
  }, clone(J) {
    return Fi(J, t, n, r);
  } };
  return pe;
}
function Yn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Yn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Hl(e, t = false, n) {
  let r = [], i = 0;
  for (let o = 0; o < e.length; o++) {
    let s = e[o];
    const a = n == null ? s.key : String(n) + String(s.key != null ? s.key : o);
    s.type === ye ? (s.patchFlag & 128 && i++, r = r.concat(Hl(s.children, t, a))) : (t || s.type !== wt) && r.push(a != null ? tn(s, { key: a }) : s);
  }
  if (i > 1) for (let o = 0; o < r.length; o++) r[o].patchFlag = -2;
  return r;
}
function Ve(e, t) {
  return oe(e) ? Ie({ name: e.name }, t, { setup: e }) : e;
}
function ql(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const $r = /* @__PURE__ */ new WeakMap();
function jn(e, t, n, r, i = false) {
  if (ne(e)) {
    e.forEach((v, y) => jn(v, t && (ne(t) ? t[y] : t), n, r, i));
    return;
  }
  if (pn(r) && !i) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && jn(e, t, n, r.component.subTree);
    return;
  }
  const o = r.shapeFlag & 4 ? ko(r.component) : r.el, s = i ? null : o, { i: a, r: l } = e, c = t && t.r, u = a.refs === _e ? a.refs = {} : a.refs, f = a.setupState, h = ce(f), g = f === _e ? al : (v) => fe(h, v);
  if (c != null && c !== l) {
    if (vs(t), Ce(c)) u[c] = null, g(c) && (f[c] = null);
    else if (Ue(c)) {
      c.value = null;
      const v = t;
      v.k && (u[v.k] = null);
    }
  }
  if (oe(l)) nr(l, a, 12, [s, u]);
  else {
    const v = Ce(l), y = Ue(l);
    if (v || y) {
      const E = () => {
        if (e.f) {
          const x = v ? g(l) ? f[l] : u[l] : l.value;
          if (i) ne(x) && _o(x, o);
          else if (ne(x)) x.includes(o) || x.push(o);
          else if (v) u[l] = [o], g(l) && (f[l] = u[l]);
          else {
            const S = [o];
            l.value = S, e.k && (u[e.k] = S);
          }
        } else v ? (u[l] = s, g(l) && (f[l] = s)) : y && (l.value = s, e.k && (u[e.k] = s));
      };
      if (s) {
        const x = () => {
          E(), $r.delete(e);
        };
        x.id = -1, $r.set(e, x), Xe(x, n);
      } else vs(e), E();
    }
  }
}
function vs(e) {
  const t = $r.get(e);
  t && (t.flags |= 8, $r.delete(e));
}
Jr().requestIdleCallback;
Jr().cancelIdleCallback;
const pn = (e) => !!e.type.__asyncLoader, Vl = (e) => e.type.__isKeepAlive;
function Nh(e, t) {
  Wl(e, "a", t);
}
function Fh(e, t) {
  Wl(e, "da", t);
}
function Wl(e, t, n = De) {
  const r = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated) return;
      i = i.parent;
    }
    return e();
  });
  if (Xr(t, r, n), n) {
    let i = n.parent;
    for (; i && i.parent; ) Vl(i.parent.vnode) && Uh(r, t, n, i), i = i.parent;
  }
}
function Uh(e, t, n, r) {
  const i = Xr(t, e, r, true);
  Qr(() => {
    _o(r[t], i);
  }, n);
}
function Xr(e, t, n = De, r = false) {
  if (n) {
    const i = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...s) => {
      At();
      const a = ir(n), l = ut(t, n, e, s);
      return a(), Pt(), l;
    });
    return r ? i.unshift(o) : i.push(o), o;
  }
}
const Mt = (e) => (t, n = De) => {
  (!Zn || e === "sp") && Xr(e, (...r) => t(...r), n);
}, jh = Mt("bm"), rr = Mt("m"), zl = Mt("bu"), Ro = Mt("u"), Kl = Mt("bum"), Qr = Mt("um"), Bh = Mt("sp"), Hh = Mt("rtg"), qh = Mt("rtc");
function Vh(e, t = De) {
  Xr("ec", e, t);
}
const Jl = "components";
function Wh(e, t) {
  return Yl(Jl, e, true, t) || e;
}
const Gl = Symbol.for("v-ndc");
function Ao(e) {
  return Ce(e) ? Yl(Jl, e, false) || e : e || Gl;
}
function Yl(e, t, n = true, r = false) {
  const i = qe || De;
  if (i) {
    const o = i.type;
    {
      const a = Ap(o, false);
      if (a && (a === t || a === it(t) || a === Kr(it(t)))) return o;
    }
    const s = gs(i[e] || o[e], t) || gs(i.appContext[e], t);
    return !s && r ? o : s;
  }
}
function gs(e, t) {
  return e && (e[t] || e[it(t)] || e[Kr(it(t))]);
}
function Wt(e, t, n, r) {
  let i;
  const o = n, s = ne(e);
  if (s || Ce(e)) {
    const a = s && Zt(e);
    let l = false, c = false;
    a && (l = !rt(e), c = $t(e), e = Gr(e)), i = new Array(e.length);
    for (let u = 0, f = e.length; u < f; u++) i[u] = t(l ? c ? bn(lt(e[u])) : lt(e[u]) : e[u], u, void 0, o);
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let a = 0; a < e; a++) i[a] = t(a + 1, a, void 0, o);
  } else if (we(e)) if (e[Symbol.iterator]) i = Array.from(e, (a, l) => t(a, l, void 0, o));
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
function Ir(e, t, n = {}, r, i) {
  if (qe.ce || qe.parent && pn(qe.parent) && qe.parent.ce) {
    const c = Object.keys(n).length > 0;
    return t !== "default" && (n.name = t), $(), je(ye, null, [de("slot", n, r)], c ? -2 : 64);
  }
  let o = e[t];
  o && o._c && (o._d = false), $();
  const s = o && Xl(o(n)), a = n.key || s && s.key, l = je(ye, { key: (a && !It(a) ? a : `_${t}`) + (!s && r ? "_fb" : "") }, s || [], s && e._ === 1 ? 64 : -2);
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), o && o._c && (o._d = true), l;
}
function Xl(e) {
  return e.some((t) => Io(t) ? !(t.type === wt || t.type === ye && !Xl(t.children)) : true) ? e : null;
}
const Ui = (e) => e ? mu(e) ? ko(e) : Ui(e.parent) : null, Bn = Ie(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => Ui(e.parent), $root: (e) => Ui(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Zl(e), $forceUpdate: (e) => e.f || (e.f = () => {
  Oo(e.update);
}), $nextTick: (e) => e.n || (e.n = Ll.bind(e.proxy)), $watch: (e) => $h.bind(e) }), gi = (e, t) => e !== _e && !e.__isScriptSetup && fe(e, t), zh = { get({ _: e }, t) {
  if (t === "__v_skip") return true;
  const { ctx: n, setupState: r, data: i, props: o, accessCache: s, type: a, appContext: l } = e;
  if (t[0] !== "$") {
    const h = s[t];
    if (h !== void 0) switch (h) {
      case 1:
        return r[t];
      case 2:
        return i[t];
      case 4:
        return n[t];
      case 3:
        return o[t];
    }
    else {
      if (gi(r, t)) return s[t] = 1, r[t];
      if (i !== _e && fe(i, t)) return s[t] = 2, i[t];
      if (fe(o, t)) return s[t] = 3, o[t];
      if (n !== _e && fe(n, t)) return s[t] = 4, n[t];
      ji && (s[t] = 0);
    }
  }
  const c = Bn[t];
  let u, f;
  if (c) return t === "$attrs" && ke(e.attrs, "get", ""), c(e);
  if ((u = a.__cssModules) && (u = u[t])) return u;
  if (n !== _e && fe(n, t)) return s[t] = 4, n[t];
  if (f = l.config.globalProperties, fe(f, t)) return f[t];
}, set({ _: e }, t, n) {
  const { data: r, setupState: i, ctx: o } = e;
  return gi(i, t) ? (i[t] = n, true) : r !== _e && fe(r, t) ? (r[t] = n, true) : fe(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (o[t] = n, true);
}, has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: o, type: s } }, a) {
  let l;
  return !!(n[a] || e !== _e && a[0] !== "$" && fe(e, a) || gi(t, a) || fe(o, a) || fe(r, a) || fe(Bn, a) || fe(i.config.globalProperties, a) || (l = s.__cssModules) && l[a]);
}, defineProperty(e, t, n) {
  return n.get != null ? e._.accessCache[t] = 0 : fe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
} };
function ms(e) {
  return ne(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e;
}
let ji = true;
function Kh(e) {
  const t = Zl(e), n = e.proxy, r = e.ctx;
  ji = false, t.beforeCreate && _s(t.beforeCreate, e, "bc");
  const { data: i, computed: o, methods: s, watch: a, provide: l, inject: c, created: u, beforeMount: f, mounted: h, beforeUpdate: g, updated: v, activated: y, deactivated: E, beforeDestroy: x, beforeUnmount: S, destroyed: m, unmounted: w, render: B, renderTracked: H, renderTriggered: re, errorCaptured: pe, serverPrefetch: J, expose: Y, inheritAttrs: W, components: D, directives: ae, filters: U } = t;
  if (c && Jh(c, r, null), s) for (const I in s) {
    const C = s[I];
    oe(C) && (r[I] = C.bind(n));
  }
  if (i) {
    const I = i.call(n, n);
    we(I) && (e.data = an(I));
  }
  if (ji = true, o) for (const I in o) {
    const C = o[I], K = oe(C) ? C.bind(n, n) : oe(C.get) ? C.get.bind(n, n) : ot, X = !oe(C) && oe(C.set) ? C.set.bind(n) : ot, ee = nn({ get: K, set: X });
    Object.defineProperty(r, I, { enumerable: true, configurable: true, get: () => ee.value, set: (V) => ee.value = V });
  }
  if (a) for (const I in a) Ql(a[I], r, n, I);
  if (l) {
    const I = oe(l) ? l.call(n) : l;
    Reflect.ownKeys(I).forEach((C) => {
      Rh(C, I[C]);
    });
  }
  u && _s(u, e, "c");
  function T(I, C) {
    ne(C) ? C.forEach((K) => I(K.bind(n))) : C && I(C.bind(n));
  }
  if (T(jh, f), T(rr, h), T(zl, g), T(Ro, v), T(Nh, y), T(Fh, E), T(Vh, pe), T(qh, H), T(Hh, re), T(Kl, S), T(Qr, w), T(Bh, J), ne(Y)) if (Y.length) {
    const I = e.exposed || (e.exposed = {});
    Y.forEach((C) => {
      Object.defineProperty(I, C, { get: () => n[C], set: (K) => n[C] = K, enumerable: true });
    });
  } else e.exposed || (e.exposed = {});
  B && e.render === ot && (e.render = B), W != null && (e.inheritAttrs = W), D && (e.components = D), ae && (e.directives = ae), J && ql(e);
}
function Jh(e, t, n = ot) {
  ne(e) && (e = Bi(e));
  for (const r in e) {
    const i = e[r];
    let o;
    we(i) ? "default" in i ? o = Un(i.from || r, i.default, true) : o = Un(i.from || r) : o = Un(i), Ue(o) ? Object.defineProperty(t, r, { enumerable: true, configurable: true, get: () => o.value, set: (s) => o.value = s }) : t[r] = o;
  }
}
function _s(e, t, n) {
  ut(ne(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ql(e, t, n, r) {
  let i = r.includes(".") ? Bl(n, r) : () => n[r];
  if (Ce(e)) {
    const o = t[e];
    oe(o) && Vt(i, o);
  } else if (oe(e)) Vt(i, e.bind(n));
  else if (we(e)) if (ne(e)) e.forEach((o) => Ql(o, t, n, r));
  else {
    const o = oe(e.handler) ? e.handler.bind(n) : t[e.handler];
    oe(o) && Vt(i, o, e);
  }
}
function Zl(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: o, config: { optionMergeStrategies: s } } = e.appContext, a = o.get(t);
  let l;
  return a ? l = a : !i.length && !n && !r ? l = t : (l = {}, i.length && i.forEach((c) => Mr(l, c, s, true)), Mr(l, t, s)), we(t) && o.set(t, l), l;
}
function Mr(e, t, n, r = false) {
  const { mixins: i, extends: o } = t;
  o && Mr(e, o, n, true), i && i.forEach((s) => Mr(e, s, n, true));
  for (const s in t) if (!(r && s === "expose")) {
    const a = Gh[s] || n && n[s];
    e[s] = a ? a(e[s], t[s]) : t[s];
  }
  return e;
}
const Gh = { data: ys, props: bs, emits: bs, methods: Ln, computed: Ln, beforeCreate: Be, created: Be, beforeMount: Be, mounted: Be, beforeUpdate: Be, updated: Be, beforeDestroy: Be, beforeUnmount: Be, destroyed: Be, unmounted: Be, activated: Be, deactivated: Be, errorCaptured: Be, serverPrefetch: Be, components: Ln, directives: Ln, watch: Xh, provide: ys, inject: Yh };
function ys(e, t) {
  return t ? e ? function() {
    return Ie(oe(e) ? e.call(this, this) : e, oe(t) ? t.call(this, this) : t);
  } : t : e;
}
function Yh(e, t) {
  return Ln(Bi(e), Bi(t));
}
function Bi(e) {
  if (ne(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Be(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ln(e, t) {
  return e ? Ie(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function bs(e, t) {
  return e ? ne(e) && ne(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ie(/* @__PURE__ */ Object.create(null), ms(e), ms(t ?? {})) : t;
}
function Xh(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ie(/* @__PURE__ */ Object.create(null), e);
  for (const r in t) n[r] = Be(e[r], t[r]);
  return n;
}
function eu() {
  return { app: null, config: { isNativeTag: al, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let Qh = 0;
function Zh(e, t) {
  return function(r, i = null) {
    oe(r) || (r = Ie({}, r)), i != null && !we(i) && (i = null);
    const o = eu(), s = /* @__PURE__ */ new WeakSet(), a = [];
    let l = false;
    const c = o.app = { _uid: Qh++, _component: r, _props: i, _container: null, _context: o, _instance: null, version: $p, get config() {
      return o.config;
    }, set config(u) {
    }, use(u, ...f) {
      return s.has(u) || (u && oe(u.install) ? (s.add(u), u.install(c, ...f)) : oe(u) && (s.add(u), u(c, ...f))), c;
    }, mixin(u) {
      return o.mixins.includes(u) || o.mixins.push(u), c;
    }, component(u, f) {
      return f ? (o.components[u] = f, c) : o.components[u];
    }, directive(u, f) {
      return f ? (o.directives[u] = f, c) : o.directives[u];
    }, mount(u, f, h) {
      if (!l) {
        const g = c._ceVNode || de(r, i);
        return g.appContext = o, h === true ? h = "svg" : h === false && (h = void 0), e(g, u, h), l = true, c._container = u, u.__vue_app__ = c, ko(g.component);
      }
    }, onUnmount(u) {
      a.push(u);
    }, unmount() {
      l && (ut(a, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
    }, provide(u, f) {
      return o.provides[u] = f, c;
    }, runWithContext(u) {
      const f = vn;
      vn = c;
      try {
        return u();
      } finally {
        vn = f;
      }
    } };
    return c;
  };
}
let vn = null;
const ep = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${it(t)}Modifiers`] || e[`${sn(t)}Modifiers`];
function tp(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || _e;
  let i = n;
  const o = t.startsWith("update:"), s = o && ep(r, t.slice(7));
  s && (s.trim && (i = n.map((u) => Ce(u) ? u.trim() : u)), s.number && (i = n.map(H0)));
  let a, l = r[a = ci(t)] || r[a = ci(it(t))];
  !l && o && (l = r[a = ci(sn(t))]), l && ut(l, e, 6, i);
  const c = r[a + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    e.emitted[a] = true, ut(c, e, 6, i);
  }
}
const np = /* @__PURE__ */ new WeakMap();
function tu(e, t, n = false) {
  const r = n ? np : t.emitsCache, i = r.get(e);
  if (i !== void 0) return i;
  const o = e.emits;
  let s = {}, a = false;
  if (!oe(e)) {
    const l = (c) => {
      const u = tu(c, t, true);
      u && (a = true, Ie(s, u));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !o && !a ? (we(e) && r.set(e, null), null) : (ne(o) ? o.forEach((l) => s[l] = null) : Ie(s, o), we(e) && r.set(e, s), s);
}
function Zr(e, t) {
  return !e || !Vr(t) ? false : (t = t.slice(2).replace(/Once$/, ""), fe(e, t[0].toLowerCase() + t.slice(1)) || fe(e, sn(t)) || fe(e, t));
}
function ws(e) {
  const { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [o], slots: s, attrs: a, emit: l, render: c, renderCache: u, props: f, data: h, setupState: g, ctx: v, inheritAttrs: y } = e, E = Pr(e);
  let x, S;
  try {
    if (n.shapeFlag & 4) {
      const w = i || r, B = w;
      x = yt(c.call(B, w, u, f, g, h, v)), S = a;
    } else {
      const w = t;
      x = yt(w.length > 1 ? w(f, { attrs: a, slots: s, emit: l }) : w(f, null)), S = t.props ? a : rp(a);
    }
  } catch (w) {
    qn.length = 0, Yr(w, e, 1), x = de(wt);
  }
  let m = x;
  if (S && y !== false) {
    const w = Object.keys(S), { shapeFlag: B } = m;
    w.length && B & 7 && (o && w.some(mo) && (S = ip(S, o)), m = tn(m, S, false, true));
  }
  return n.dirs && (m = tn(m, null, false, true), m.dirs = m.dirs ? m.dirs.concat(n.dirs) : n.dirs), n.transition && Yn(m, n.transition), x = m, Pr(E), x;
}
const rp = (e) => {
  let t;
  for (const n in e) (n === "class" || n === "style" || Vr(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, ip = (e, t) => {
  const n = {};
  for (const r in e) (!mo(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function op(e, t, n) {
  const { props: r, children: i, component: o } = e, { props: s, children: a, patchFlag: l } = t, c = o.emitsOptions;
  if (t.dirs || t.transition) return true;
  if (n && l >= 0) {
    if (l & 1024) return true;
    if (l & 16) return r ? Ss(r, s, c) : !!s;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const h = u[f];
        if (s[h] !== r[h] && !Zr(c, h)) return true;
      }
    }
  } else return (i || a) && (!a || !a.$stable) ? true : r === s ? false : r ? s ? Ss(r, s, c) : true : !!s;
  return false;
}
function Ss(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return true;
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    if (t[o] !== e[o] && !Zr(n, o)) return true;
  }
  return false;
}
function sp({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) (e = t.vnode).el = n, t = t.parent;
    else break;
  }
}
const nu = {}, ru = () => Object.create(nu), iu = (e) => Object.getPrototypeOf(e) === nu;
function ap(e, t, n, r = false) {
  const i = {}, o = ru();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ou(e, t, i, o);
  for (const s in e.propsOptions[0]) s in i || (i[s] = void 0);
  n ? e.props = r ? i : mh(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function lp(e, t, n, r) {
  const { props: i, attrs: o, vnode: { patchFlag: s } } = e, a = ce(i), [l] = e.propsOptions;
  let c = false;
  if ((r || s > 0) && !(s & 16)) {
    if (s & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let h = u[f];
        if (Zr(e.emitsOptions, h)) continue;
        const g = t[h];
        if (l) if (fe(o, h)) g !== o[h] && (o[h] = g, c = true);
        else {
          const v = it(h);
          i[v] = Hi(l, a, v, g, e, false);
        }
        else g !== o[h] && (o[h] = g, c = true);
      }
    }
  } else {
    ou(e, t, i, o) && (c = true);
    let u;
    for (const f in a) (!t || !fe(t, f) && ((u = sn(f)) === f || !fe(t, u))) && (l ? n && (n[f] !== void 0 || n[u] !== void 0) && (i[f] = Hi(l, a, f, void 0, e, true)) : delete i[f]);
    if (o !== a) for (const f in o) (!t || !fe(t, f)) && (delete o[f], c = true);
  }
  c && Ot(e.attrs, "set", "");
}
function ou(e, t, n, r) {
  const [i, o] = e.propsOptions;
  let s = false, a;
  if (t) for (let l in t) {
    if (Dn(l)) continue;
    const c = t[l];
    let u;
    i && fe(i, u = it(l)) ? !o || !o.includes(u) ? n[u] = c : (a || (a = {}))[u] = c : Zr(e.emitsOptions, l) || (!(l in r) || c !== r[l]) && (r[l] = c, s = true);
  }
  if (o) {
    const l = ce(n), c = a || _e;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      n[f] = Hi(i, l, f, c[f], e, !fe(c, f));
    }
  }
  return s;
}
function Hi(e, t, n, r, i, o) {
  const s = e[n];
  if (s != null) {
    const a = fe(s, "default");
    if (a && r === void 0) {
      const l = s.default;
      if (s.type !== Function && !s.skipFactory && oe(l)) {
        const { propsDefaults: c } = i;
        if (n in c) r = c[n];
        else {
          const u = ir(i);
          r = c[n] = l.call(null, t), u();
        }
      } else r = l;
      i.ce && i.ce._setProp(n, r);
    }
    s[0] && (o && !a ? r = false : s[1] && (r === "" || r === sn(n)) && (r = true));
  }
  return r;
}
const up = /* @__PURE__ */ new WeakMap();
function su(e, t, n = false) {
  const r = n ? up : t.propsCache, i = r.get(e);
  if (i) return i;
  const o = e.props, s = {}, a = [];
  let l = false;
  if (!oe(e)) {
    const u = (f) => {
      l = true;
      const [h, g] = su(f, t, true);
      Ie(s, h), g && a.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!o && !l) return we(e) && r.set(e, fn), fn;
  if (ne(o)) for (let u = 0; u < o.length; u++) {
    const f = it(o[u]);
    Es(f) && (s[f] = _e);
  }
  else if (o) for (const u in o) {
    const f = it(u);
    if (Es(f)) {
      const h = o[u], g = s[f] = ne(h) || oe(h) ? { type: h } : Ie({}, h), v = g.type;
      let y = false, E = true;
      if (ne(v)) for (let x = 0; x < v.length; ++x) {
        const S = v[x], m = oe(S) && S.name;
        if (m === "Boolean") {
          y = true;
          break;
        } else m === "String" && (E = false);
      }
      else y = oe(v) && v.name === "Boolean";
      g[0] = y, g[1] = E, (y || fe(g, "default")) && a.push(f);
    }
  }
  const c = [s, a];
  return we(e) && r.set(e, c), c;
}
function Es(e) {
  return e[0] !== "$" && !Dn(e);
}
const Po = (e) => e === "_" || e === "_ctx" || e === "$stable", $o = (e) => ne(e) ? e.map(yt) : [yt(e)], cp = (e, t, n) => {
  if (t._n) return t;
  const r = wn((...i) => $o(t(...i)), n);
  return r._c = false, r;
}, au = (e, t, n) => {
  const r = e._ctx;
  for (const i in e) {
    if (Po(i)) continue;
    const o = e[i];
    if (oe(o)) t[i] = cp(i, o, r);
    else if (o != null) {
      const s = $o(o);
      t[i] = () => s;
    }
  }
}, lu = (e, t) => {
  const n = $o(t);
  e.slots.default = () => n;
}, uu = (e, t, n) => {
  for (const r in t) (n || !Po(r)) && (e[r] = t[r]);
}, fp = (e, t, n) => {
  const r = e.slots = ru();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (uu(r, t, n), n && dl(r, "_", i, true)) : au(t, r);
  } else t && lu(e, t);
}, dp = (e, t, n) => {
  const { vnode: r, slots: i } = e;
  let o = true, s = _e;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? o = false : uu(i, t, n) : (o = !t.$stable, au(t, i)), s = t;
  } else t && (lu(e, t), s = { default: 1 });
  if (o) for (const a in i) !Po(a) && s[a] == null && delete i[a];
}, Xe = mp;
function hp(e) {
  return pp(e);
}
function pp(e, t) {
  const n = Jr();
  n.__VUE__ = true;
  const { insert: r, remove: i, patchProp: o, createElement: s, createText: a, createComment: l, setText: c, setElementText: u, parentNode: f, nextSibling: h, setScopeId: g = ot, insertStaticContent: v } = e, y = (d, p, b, P = null, O = null, R = null, F = void 0, k = null, M = !!p.dynamicChildren) => {
    if (d === p) return;
    d && !cn(d, p) && (P = tt(d), V(d, O, R, true), d = null), p.patchFlag === -2 && (M = false, p.dynamicChildren = null);
    const { type: A, ref: Q, shapeFlag: j } = p;
    switch (A) {
      case ei:
        E(d, p, b, P);
        break;
      case wt:
        x(d, p, b, P);
        break;
      case Hn:
        d == null && S(p, b, P, F);
        break;
      case ye:
        D(d, p, b, P, O, R, F, k, M);
        break;
      default:
        j & 1 ? B(d, p, b, P, O, R, F, k, M) : j & 6 ? ae(d, p, b, P, O, R, F, k, M) : (j & 64 || j & 128) && A.process(d, p, b, P, O, R, F, k, M, Oe);
    }
    Q != null && O ? jn(Q, d && d.ref, R, p || d, !p) : Q == null && d && d.ref != null && jn(d.ref, null, R, d, true);
  }, E = (d, p, b, P) => {
    if (d == null) r(p.el = a(p.children), b, P);
    else {
      const O = p.el = d.el;
      p.children !== d.children && c(O, p.children);
    }
  }, x = (d, p, b, P) => {
    d == null ? r(p.el = l(p.children || ""), b, P) : p.el = d.el;
  }, S = (d, p, b, P) => {
    [d.el, d.anchor] = v(d.children, p, b, P, d.el, d.anchor);
  }, m = ({ el: d, anchor: p }, b, P) => {
    let O;
    for (; d && d !== p; ) O = h(d), r(d, b, P), d = O;
    r(p, b, P);
  }, w = ({ el: d, anchor: p }) => {
    let b;
    for (; d && d !== p; ) b = h(d), i(d), d = b;
    i(p);
  }, B = (d, p, b, P, O, R, F, k, M) => {
    if (p.type === "svg" ? F = "svg" : p.type === "math" && (F = "mathml"), d == null) H(p, b, P, O, R, F, k, M);
    else {
      const A = d.el && d.el._isVueCE ? d.el : null;
      try {
        A && A._beginPatch(), J(d, p, O, R, F, k, M);
      } finally {
        A && A._endPatch();
      }
    }
  }, H = (d, p, b, P, O, R, F, k) => {
    let M, A;
    const { props: Q, shapeFlag: j, transition: G, dirs: te } = d;
    if (M = d.el = s(d.type, R, Q && Q.is, Q), j & 8 ? u(M, d.children) : j & 16 && pe(d.children, M, null, P, O, mi(d, R), F, k), te && zt(d, null, P, "created"), re(M, d, d.scopeId, F, P), Q) {
      for (const ge in Q) ge !== "value" && !Dn(ge) && o(M, ge, null, Q[ge], R, P);
      "value" in Q && o(M, "value", null, Q.value, R), (A = Q.onVnodeBeforeMount) && vt(A, P, d);
    }
    te && zt(d, null, P, "beforeMount");
    const le = vp(O, G);
    le && G.beforeEnter(M), r(M, p, b), ((A = Q && Q.onVnodeMounted) || le || te) && Xe(() => {
      A && vt(A, P, d), le && G.enter(M), te && zt(d, null, P, "mounted");
    }, O);
  }, re = (d, p, b, P, O) => {
    if (b && g(d, b), P) for (let R = 0; R < P.length; R++) g(d, P[R]);
    if (O) {
      let R = O.subTree;
      if (p === R || hu(R.type) && (R.ssContent === p || R.ssFallback === p)) {
        const F = O.vnode;
        re(d, F, F.scopeId, F.slotScopeIds, O.parent);
      }
    }
  }, pe = (d, p, b, P, O, R, F, k, M = 0) => {
    for (let A = M; A < d.length; A++) {
      const Q = d[A] = k ? jt(d[A]) : yt(d[A]);
      y(null, Q, p, b, P, O, R, F, k);
    }
  }, J = (d, p, b, P, O, R, F) => {
    const k = p.el = d.el;
    let { patchFlag: M, dynamicChildren: A, dirs: Q } = p;
    M |= d.patchFlag & 16;
    const j = d.props || _e, G = p.props || _e;
    let te;
    if (b && Kt(b, false), (te = G.onVnodeBeforeUpdate) && vt(te, b, p, d), Q && zt(p, d, b, "beforeUpdate"), b && Kt(b, true), (j.innerHTML && G.innerHTML == null || j.textContent && G.textContent == null) && u(k, ""), A ? Y(d.dynamicChildren, A, k, b, P, mi(p, O), R) : F || C(d, p, k, null, b, P, mi(p, O), R, false), M > 0) {
      if (M & 16) W(k, j, G, b, O);
      else if (M & 2 && j.class !== G.class && o(k, "class", null, G.class, O), M & 4 && o(k, "style", j.style, G.style, O), M & 8) {
        const le = p.dynamicProps;
        for (let ge = 0; ge < le.length; ge++) {
          const he = le[ge], We = j[he], ze = G[he];
          (ze !== We || he === "value") && o(k, he, We, ze, O, b);
        }
      }
      M & 1 && d.children !== p.children && u(k, p.children);
    } else !F && A == null && W(k, j, G, b, O);
    ((te = G.onVnodeUpdated) || Q) && Xe(() => {
      te && vt(te, b, p, d), Q && zt(p, d, b, "updated");
    }, P);
  }, Y = (d, p, b, P, O, R, F) => {
    for (let k = 0; k < p.length; k++) {
      const M = d[k], A = p[k], Q = M.el && (M.type === ye || !cn(M, A) || M.shapeFlag & 198) ? f(M.el) : b;
      y(M, A, Q, null, P, O, R, F, true);
    }
  }, W = (d, p, b, P, O) => {
    if (p !== b) {
      if (p !== _e) for (const R in p) !Dn(R) && !(R in b) && o(d, R, p[R], null, O, P);
      for (const R in b) {
        if (Dn(R)) continue;
        const F = b[R], k = p[R];
        F !== k && R !== "value" && o(d, R, k, F, O, P);
      }
      "value" in b && o(d, "value", p.value, b.value, O);
    }
  }, D = (d, p, b, P, O, R, F, k, M) => {
    const A = p.el = d ? d.el : a(""), Q = p.anchor = d ? d.anchor : a("");
    let { patchFlag: j, dynamicChildren: G, slotScopeIds: te } = p;
    te && (k = k ? k.concat(te) : te), d == null ? (r(A, b, P), r(Q, b, P), pe(p.children || [], b, Q, O, R, F, k, M)) : j > 0 && j & 64 && G && d.dynamicChildren && d.dynamicChildren.length === G.length ? (Y(d.dynamicChildren, G, b, O, R, F, k), (p.key != null || O && p === O.subTree) && cu(d, p, true)) : C(d, p, b, Q, O, R, F, k, M);
  }, ae = (d, p, b, P, O, R, F, k, M) => {
    p.slotScopeIds = k, d == null ? p.shapeFlag & 512 ? O.ctx.activate(p, b, P, F, M) : U(p, b, P, O, R, F, M) : L(d, p, M);
  }, U = (d, p, b, P, O, R, F) => {
    const k = d.component = xp(d, P, O);
    if (Vl(d) && (k.ctx.renderer = Oe), Cp(k, false, F), k.asyncDep) {
      if (O && O.registerDep(k, T, F), !d.el) {
        const M = k.subTree = de(wt);
        x(null, M, p, b), d.placeholder = M.el;
      }
    } else T(k, d, p, b, O, R, F);
  }, L = (d, p, b) => {
    const P = p.component = d.component;
    if (op(d, p, b)) if (P.asyncDep && !P.asyncResolved) {
      I(P, p, b);
      return;
    } else P.next = p, P.update();
    else p.el = d.el, P.vnode = p;
  }, T = (d, p, b, P, O, R, F) => {
    const k = () => {
      if (d.isMounted) {
        let { next: j, bu: G, u: te, parent: le, vnode: ge } = d;
        {
          const ht = fu(d);
          if (ht) {
            j && (j.el = ge.el, I(d, j, F)), ht.asyncDep.then(() => {
              d.isUnmounted || k();
            });
            return;
          }
        }
        let he = j, We;
        Kt(d, false), j ? (j.el = ge.el, I(d, j, F)) : j = ge, G && fi(G), (We = j.props && j.props.onVnodeBeforeUpdate) && vt(We, le, j, ge), Kt(d, true);
        const ze = ws(d), dt = d.subTree;
        d.subTree = ze, y(dt, ze, f(dt.el), tt(dt), d, O, R), j.el = ze.el, he === null && sp(d, ze.el), te && Xe(te, O), (We = j.props && j.props.onVnodeUpdated) && Xe(() => vt(We, le, j, ge), O);
      } else {
        let j;
        const { el: G, props: te } = p, { bm: le, m: ge, parent: he, root: We, type: ze } = d, dt = pn(p);
        Kt(d, false), le && fi(le), !dt && (j = te && te.onVnodeBeforeMount) && vt(j, he, p), Kt(d, true);
        {
          We.ce && We.ce._def.shadowRoot !== false && We.ce._injectChildStyle(ze);
          const ht = d.subTree = ws(d);
          y(null, ht, b, P, d, O, R), p.el = ht.el;
        }
        if (ge && Xe(ge, O), !dt && (j = te && te.onVnodeMounted)) {
          const ht = p;
          Xe(() => vt(j, he, ht), O);
        }
        (p.shapeFlag & 256 || he && pn(he.vnode) && he.vnode.shapeFlag & 256) && d.a && Xe(d.a, O), d.isMounted = true, p = b = P = null;
      }
    };
    d.scope.on();
    const M = d.effect = new ml(k);
    d.scope.off();
    const A = d.update = M.run.bind(M), Q = d.job = M.runIfDirty.bind(M);
    Q.i = d, Q.id = d.uid, M.scheduler = () => Oo(Q), Kt(d, true), A();
  }, I = (d, p, b) => {
    p.component = d;
    const P = d.vnode.props;
    d.vnode = p, d.next = null, lp(d, p.props, P, b), dp(d, p.children, b), At(), ps(d), Pt();
  }, C = (d, p, b, P, O, R, F, k, M = false) => {
    const A = d && d.children, Q = d ? d.shapeFlag : 0, j = p.children, { patchFlag: G, shapeFlag: te } = p;
    if (G > 0) {
      if (G & 128) {
        X(A, j, b, P, O, R, F, k, M);
        return;
      } else if (G & 256) {
        K(A, j, b, P, O, R, F, k, M);
        return;
      }
    }
    te & 8 ? (Q & 16 && et(A, O, R), j !== A && u(b, j)) : Q & 16 ? te & 16 ? X(A, j, b, P, O, R, F, k, M) : et(A, O, R, true) : (Q & 8 && u(b, ""), te & 16 && pe(j, b, P, O, R, F, k, M));
  }, K = (d, p, b, P, O, R, F, k, M) => {
    d = d || fn, p = p || fn;
    const A = d.length, Q = p.length, j = Math.min(A, Q);
    let G;
    for (G = 0; G < j; G++) {
      const te = p[G] = M ? jt(p[G]) : yt(p[G]);
      y(d[G], te, b, null, O, R, F, k, M);
    }
    A > Q ? et(d, O, R, true, false, j) : pe(p, b, P, O, R, F, k, M, j);
  }, X = (d, p, b, P, O, R, F, k, M) => {
    let A = 0;
    const Q = p.length;
    let j = d.length - 1, G = Q - 1;
    for (; A <= j && A <= G; ) {
      const te = d[A], le = p[A] = M ? jt(p[A]) : yt(p[A]);
      if (cn(te, le)) y(te, le, b, null, O, R, F, k, M);
      else break;
      A++;
    }
    for (; A <= j && A <= G; ) {
      const te = d[j], le = p[G] = M ? jt(p[G]) : yt(p[G]);
      if (cn(te, le)) y(te, le, b, null, O, R, F, k, M);
      else break;
      j--, G--;
    }
    if (A > j) {
      if (A <= G) {
        const te = G + 1, le = te < Q ? p[te].el : P;
        for (; A <= G; ) y(null, p[A] = M ? jt(p[A]) : yt(p[A]), b, le, O, R, F, k, M), A++;
      }
    } else if (A > G) for (; A <= j; ) V(d[A], O, R, true), A++;
    else {
      const te = A, le = A, ge = /* @__PURE__ */ new Map();
      for (A = le; A <= G; A++) {
        const Ye = p[A] = M ? jt(p[A]) : yt(p[A]);
        Ye.key != null && ge.set(Ye.key, A);
      }
      let he, We = 0;
      const ze = G - le + 1;
      let dt = false, ht = 0;
      const Rn = new Array(ze);
      for (A = 0; A < ze; A++) Rn[A] = 0;
      for (A = te; A <= j; A++) {
        const Ye = d[A];
        if (We >= ze) {
          V(Ye, O, R, true);
          continue;
        }
        let pt;
        if (Ye.key != null) pt = ge.get(Ye.key);
        else for (he = le; he <= G; he++) if (Rn[he - le] === 0 && cn(Ye, p[he])) {
          pt = he;
          break;
        }
        pt === void 0 ? V(Ye, O, R, true) : (Rn[pt - le] = A + 1, pt >= ht ? ht = pt : dt = true, y(Ye, p[pt], b, null, O, R, F, k, M), We++);
      }
      const jo = dt ? gp(Rn) : fn;
      for (he = jo.length - 1, A = ze - 1; A >= 0; A--) {
        const Ye = le + A, pt = p[Ye], Bo = p[Ye + 1], Ho = Ye + 1 < Q ? Bo.el || du(Bo) : P;
        Rn[A] === 0 ? y(null, pt, b, Ho, O, R, F, k, M) : dt && (he < 0 || A !== jo[he] ? ee(pt, b, Ho, 2) : he--);
      }
    }
  }, ee = (d, p, b, P, O = null) => {
    const { el: R, type: F, transition: k, children: M, shapeFlag: A } = d;
    if (A & 6) {
      ee(d.component.subTree, p, b, P);
      return;
    }
    if (A & 128) {
      d.suspense.move(p, b, P);
      return;
    }
    if (A & 64) {
      F.move(d, p, b, Oe);
      return;
    }
    if (F === ye) {
      r(R, p, b);
      for (let j = 0; j < M.length; j++) ee(M[j], p, b, P);
      r(d.anchor, p, b);
      return;
    }
    if (F === Hn) {
      m(d, p, b);
      return;
    }
    if (P !== 2 && A & 1 && k) if (P === 0) k.beforeEnter(R), r(R, p, b), Xe(() => k.enter(R), O);
    else {
      const { leave: j, delayLeave: G, afterLeave: te } = k, le = () => {
        d.ctx.isUnmounted ? i(R) : r(R, p, b);
      }, ge = () => {
        R._isLeaving && R[Yt](true), j(R, () => {
          le(), te && te();
        });
      };
      G ? G(R, le, ge) : ge();
    }
    else r(R, p, b);
  }, V = (d, p, b, P = false, O = false) => {
    const { type: R, props: F, ref: k, children: M, dynamicChildren: A, shapeFlag: Q, patchFlag: j, dirs: G, cacheIndex: te } = d;
    if (j === -2 && (O = false), k != null && (At(), jn(k, null, b, d, true), Pt()), te != null && (p.renderCache[te] = void 0), Q & 256) {
      p.ctx.deactivate(d);
      return;
    }
    const le = Q & 1 && G, ge = !pn(d);
    let he;
    if (ge && (he = F && F.onVnodeBeforeUnmount) && vt(he, p, d), Q & 6) Ae(d.component, b, P);
    else {
      if (Q & 128) {
        d.suspense.unmount(b, P);
        return;
      }
      le && zt(d, null, p, "beforeUnmount"), Q & 64 ? d.type.remove(d, p, b, Oe, P) : A && !A.hasOnce && (R !== ye || j > 0 && j & 64) ? et(A, p, b, false, true) : (R === ye && j & 384 || !O && Q & 16) && et(M, p, b), P && se(d);
    }
    (ge && (he = F && F.onVnodeUnmounted) || le) && Xe(() => {
      he && vt(he, p, d), le && zt(d, null, p, "unmounted");
    }, b);
  }, se = (d) => {
    const { type: p, el: b, anchor: P, transition: O } = d;
    if (p === ye) {
      ve(b, P);
      return;
    }
    if (p === Hn) {
      w(d);
      return;
    }
    const R = () => {
      i(b), O && !O.persisted && O.afterLeave && O.afterLeave();
    };
    if (d.shapeFlag & 1 && O && !O.persisted) {
      const { leave: F, delayLeave: k } = O, M = () => F(b, R);
      k ? k(d.el, R, M) : M();
    } else R();
  }, ve = (d, p) => {
    let b;
    for (; d !== p; ) b = h(d), i(d), d = b;
    i(p);
  }, Ae = (d, p, b) => {
    const { bum: P, scope: O, job: R, subTree: F, um: k, m: M, a: A } = d;
    xs(M), xs(A), P && fi(P), O.stop(), R && (R.flags |= 8, V(F, d, p, b)), k && Xe(k, p), Xe(() => {
      d.isUnmounted = true;
    }, p);
  }, et = (d, p, b, P = false, O = false, R = 0) => {
    for (let F = R; F < d.length; F++) V(d[F], p, b, P, O);
  }, tt = (d) => {
    if (d.shapeFlag & 6) return tt(d.component.subTree);
    if (d.shapeFlag & 128) return d.suspense.next();
    const p = h(d.anchor || d.el), b = p && p[Ih];
    return b ? h(b) : p;
  };
  let St = false;
  const ft = (d, p, b) => {
    let P;
    d == null ? p._vnode && (V(p._vnode, null, null, true), P = p._vnode.component) : y(p._vnode || null, d, p, null, null, null, b), p._vnode = d, St || (St = true, ps(P), Nl(), St = false);
  }, Oe = { p: y, um: V, m: ee, r: se, mt: U, mc: pe, pc: C, pbc: Y, n: tt, o: e };
  return { render: ft, hydrate: void 0, createApp: Zh(ft) };
}
function mi({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Kt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function vp(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function cu(e, t, n = false) {
  const r = e.children, i = t.children;
  if (ne(r) && ne(i)) for (let o = 0; o < r.length; o++) {
    const s = r[o];
    let a = i[o];
    a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[o] = jt(i[o]), a.el = s.el), !n && a.patchFlag !== -2 && cu(s, a)), a.type === ei && (a.patchFlag !== -1 ? a.el = s.el : a.__elIndex = o + (e.type === ye ? 1 : 0)), a.type === wt && !a.el && (a.el = s.el);
  }
}
function gp(e) {
  const t = e.slice(), n = [0];
  let r, i, o, s, a;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const c = e[r];
    if (c !== 0) {
      if (i = n[n.length - 1], e[i] < c) {
        t[r] = i, n.push(r);
        continue;
      }
      for (o = 0, s = n.length - 1; o < s; ) a = o + s >> 1, e[n[a]] < c ? o = a + 1 : s = a;
      c < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), n[o] = r);
    }
  }
  for (o = n.length, s = n[o - 1]; o-- > 0; ) n[o] = s, s = t[s];
  return n;
}
function fu(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : fu(t);
}
function xs(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function du(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? du(t.subTree) : null;
}
const hu = (e) => e.__isSuspense;
function mp(e, t) {
  t && t.pendingBranch ? ne(e) ? t.effects.push(...e) : t.effects.push(e) : Dl(e);
}
const ye = Symbol.for("v-fgt"), ei = Symbol.for("v-txt"), wt = Symbol.for("v-cmt"), Hn = Symbol.for("v-stc"), qn = [];
let Qe = null;
function $(e = false) {
  qn.push(Qe = e ? null : []);
}
function _p() {
  qn.pop(), Qe = qn[qn.length - 1] || null;
}
let Xn = 1;
function Cs(e, t = false) {
  Xn += e, e < 0 && Qe && t && (Qe.hasOnce = true);
}
function pu(e) {
  return e.dynamicChildren = Xn > 0 ? Qe || fn : null, _p(), Xn > 0 && Qe && Qe.push(e), e;
}
function N(e, t, n, r, i, o) {
  return pu(z(e, t, n, r, i, o, true));
}
function je(e, t, n, r, i) {
  return pu(de(e, t, n, r, i, true));
}
function Io(e) {
  return e ? e.__v_isVNode === true : false;
}
function cn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const vu = ({ key: e }) => e ?? null, mr = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? Ce(e) || Ue(e) || oe(e) ? { i: qe, r: e, k: t, f: !!n } : e : null);
function z(e, t = null, n = null, r = 0, i = null, o = e === ye ? 0 : 1, s = false, a = false) {
  const l = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && vu(t), ref: t && mr(t), scopeId: Ul, slotScopeIds: null, children: n, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o, patchFlag: r, dynamicProps: i, dynamicChildren: null, appContext: null, ctx: qe };
  return a ? (Mo(l, n), o & 128 && e.normalize(l)) : n && (l.shapeFlag |= Ce(n) ? 8 : 16), Xn > 0 && !s && Qe && (l.patchFlag > 0 || o & 6) && l.patchFlag !== 32 && Qe.push(l), l;
}
const de = yp;
function yp(e, t = null, n = null, r = 0, i = null, o = false) {
  if ((!e || e === Gl) && (e = wt), Io(e)) {
    const a = tn(e, t, true);
    return n && Mo(a, n), Xn > 0 && !o && Qe && (a.shapeFlag & 6 ? Qe[Qe.indexOf(e)] = a : Qe.push(a)), a.patchFlag = -2, a;
  }
  if (Pp(e) && (e = e.__vccOpts), t) {
    t = bp(t);
    let { class: a, style: l } = t;
    a && !Ce(a) && (t.class = at(a)), we(l) && (To(l) && !ne(l) && (l = Ie({}, l)), t.style = Cn(l));
  }
  const s = Ce(e) ? 1 : hu(e) ? 128 : Mh(e) ? 64 : we(e) ? 4 : oe(e) ? 2 : 0;
  return z(e, t, n, r, i, s, o, true);
}
function bp(e) {
  return e ? To(e) || iu(e) ? Ie({}, e) : e : null;
}
function tn(e, t, n = false, r = false) {
  const { props: i, ref: o, patchFlag: s, children: a, transition: l } = e, c = t ? gu(i || {}, t) : i, u = { __v_isVNode: true, __v_skip: true, type: e.type, props: c, key: c && vu(c), ref: t && t.ref ? n && o ? ne(o) ? o.concat(mr(t)) : [o, mr(t)] : mr(t) : o, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: a, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== ye ? s === -1 ? 16 : s | 16 : s, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: l, component: e.component, suspense: e.suspense, ssContent: e.ssContent && tn(e.ssContent), ssFallback: e.ssFallback && tn(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
  return l && r && Yn(u, l.clone(u)), u;
}
function Qn(e = " ", t = 0) {
  return de(ei, null, e, t);
}
function wp(e, t) {
  const n = de(Hn, null, e);
  return n.staticCount = t, n;
}
function xe(e = "", t = false) {
  return t ? ($(), je(wt, null, e)) : de(wt, null, e);
}
function yt(e) {
  return e == null || typeof e == "boolean" ? de(wt) : ne(e) ? de(ye, null, e.slice()) : Io(e) ? jt(e) : de(ei, null, String(e));
}
function jt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : tn(e);
}
function Mo(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (ne(t)) n = 16;
  else if (typeof t == "object") if (r & 65) {
    const i = t.default;
    i && (i._c && (i._d = false), Mo(e, i()), i._c && (i._d = true));
    return;
  } else {
    n = 32;
    const i = t._;
    !i && !iu(t) ? t._ctx = qe : i === 3 && qe && (qe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else oe(t) ? (t = { default: t, _ctx: qe }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Qn(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function gu(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const i in r) if (i === "class") t.class !== r.class && (t.class = at([t.class, r.class]));
    else if (i === "style") t.style = Cn([t.style, r.style]);
    else if (Vr(i)) {
      const o = t[i], s = r[i];
      s && o !== s && !(ne(o) && o.includes(s)) && (t[i] = o ? [].concat(o, s) : s);
    } else i !== "" && (t[i] = r[i]);
  }
  return t;
}
function vt(e, t, n, r = null) {
  ut(e, t, 7, [n, r]);
}
const Sp = eu();
let Ep = 0;
function xp(e, t, n) {
  const r = e.type, i = (t ? t.appContext : e.appContext) || Sp, o = { uid: Ep++, vnode: e, type: r, parent: t, appContext: i, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new X0(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(i.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: su(r, i), emitsOptions: tu(r, i), emit: null, emitted: null, propsDefaults: _e, inheritAttrs: r.inheritAttrs, ctx: _e, data: _e, props: _e, attrs: _e, slots: _e, refs: _e, setupState: _e, setupContext: null, suspense: n, suspenseId: n ? n.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = tp.bind(null, o), e.ce && e.ce(o), o;
}
let De = null;
const Lo = () => De || qe;
let Lr, qi;
{
  const e = Jr(), t = (n, r) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(r), (o) => {
      i.length > 1 ? i.forEach((s) => s(o)) : i[0](o);
    };
  };
  Lr = t("__VUE_INSTANCE_SETTERS__", (n) => De = n), qi = t("__VUE_SSR_SETTERS__", (n) => Zn = n);
}
const ir = (e) => {
  const t = De;
  return Lr(e), e.scope.on(), () => {
    e.scope.off(), Lr(t);
  };
}, Ts = () => {
  De && De.scope.off(), Lr(null);
};
function mu(e) {
  return e.vnode.shapeFlag & 4;
}
let Zn = false;
function Cp(e, t = false, n = false) {
  t && qi(t);
  const { props: r, children: i } = e.vnode, o = mu(e);
  ap(e, r, o, t), fp(e, i, n || t);
  const s = o ? Tp(e, t) : void 0;
  return t && qi(false), s;
}
function Tp(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, zh);
  const { setup: r } = n;
  if (r) {
    At();
    const i = e.setupContext = r.length > 1 ? Rp(e) : null, o = ir(e), s = nr(r, e, 0, [e.props, i]), a = ul(s);
    if (Pt(), o(), (a || e.sp) && !pn(e) && ql(e), a) {
      if (s.then(Ts, Ts), t) return s.then((l) => {
        Os(e, l);
      }).catch((l) => {
        Yr(l, e, 0);
      });
      e.asyncDep = s;
    } else Os(e, s);
  } else _u(e);
}
function Os(e, t, n) {
  oe(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : we(t) && (e.setupState = Il(t)), _u(e);
}
function _u(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || ot);
  {
    const i = ir(e);
    At();
    try {
      Kh(e);
    } finally {
      Pt(), i();
    }
  }
}
const Op = { get(e, t) {
  return ke(e, "get", ""), e[t];
} };
function Rp(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return { attrs: new Proxy(e.attrs, Op), slots: e.slots, emit: e.emit, expose: t };
}
function ko(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Il(_h(e.exposed)), { get(t, n) {
    if (n in t) return t[n];
    if (n in Bn) return Bn[n](e);
  }, has(t, n) {
    return n in t || n in Bn;
  } })) : e.proxy;
}
function Ap(e, t = true) {
  return oe(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Pp(e) {
  return oe(e) && "__vccOpts" in e;
}
const nn = (e, t) => Eh(e, t, Zn), $p = "3.5.26";
let Vi;
const Rs = typeof window < "u" && window.trustedTypes;
if (Rs) try {
  Vi = Rs.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
const yu = Vi ? (e) => Vi.createHTML(e) : (e) => e, Ip = "http://www.w3.org/2000/svg", Mp = "http://www.w3.org/1998/Math/MathML", Ct = typeof document < "u" ? document : null, As = Ct && Ct.createElement("template"), Lp = { insert: (e, t, n) => {
  t.insertBefore(e, n || null);
}, remove: (e) => {
  const t = e.parentNode;
  t && t.removeChild(e);
}, createElement: (e, t, n, r) => {
  const i = t === "svg" ? Ct.createElementNS(Ip, e) : t === "mathml" ? Ct.createElementNS(Mp, e) : n ? Ct.createElement(e, { is: n }) : Ct.createElement(e);
  return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
}, createText: (e) => Ct.createTextNode(e), createComment: (e) => Ct.createComment(e), setText: (e, t) => {
  e.nodeValue = t;
}, setElementText: (e, t) => {
  e.textContent = t;
}, parentNode: (e) => e.parentNode, nextSibling: (e) => e.nextSibling, querySelector: (e) => Ct.querySelector(e), setScopeId(e, t) {
  e.setAttribute(t, "");
}, insertStaticContent(e, t, n, r, i, o) {
  const s = n ? n.previousSibling : t.lastChild;
  if (i && (i === o || i.nextSibling)) for (; t.insertBefore(i.cloneNode(true), n), !(i === o || !(i = i.nextSibling)); ) ;
  else {
    As.innerHTML = yu(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
    const a = As.content;
    if (r === "svg" || r === "mathml") {
      const l = a.firstChild;
      for (; l.firstChild; ) a.appendChild(l.firstChild);
      a.removeChild(l);
    }
    t.insertBefore(a, n);
  }
  return [s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
} }, Lt = "transition", In = "animation", Sn = Symbol("_vtc"), bu = { name: String, type: String, css: { type: Boolean, default: true }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String }, kp = Ie({}, kh, bu), Jt = (e, t = []) => {
  ne(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Ps = (e) => e ? ne(e) ? e.some((t) => t.length > 1) : e.length > 1 : false;
function Dp(e) {
  const t = {};
  for (const D in e) D in bu || (t[D] = e[D]);
  if (e.css === false) return t;
  const { name: n = "v", type: r, duration: i, enterFromClass: o = `${n}-enter-from`, enterActiveClass: s = `${n}-enter-active`, enterToClass: a = `${n}-enter-to`, appearFromClass: l = o, appearActiveClass: c = s, appearToClass: u = a, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: h = `${n}-leave-active`, leaveToClass: g = `${n}-leave-to` } = e, v = Np(i), y = v && v[0], E = v && v[1], { onBeforeEnter: x, onEnter: S, onEnterCancelled: m, onLeave: w, onLeaveCancelled: B, onBeforeAppear: H = x, onAppear: re = S, onAppearCancelled: pe = m } = t, J = (D, ae, U, L) => {
    D._enterCancelled = L, Dt(D, ae ? u : a), Dt(D, ae ? c : s), U && U();
  }, Y = (D, ae) => {
    D._isLeaving = false, Dt(D, f), Dt(D, g), Dt(D, h), ae && ae();
  }, W = (D) => (ae, U) => {
    const L = D ? re : S, T = () => J(ae, D, U);
    Jt(L, [ae, T]), $s(() => {
      Dt(ae, D ? l : o), mt(ae, D ? u : a), Ps(L) || Is(ae, r, y, T);
    });
  };
  return Ie(t, { onBeforeEnter(D) {
    Jt(x, [D]), mt(D, o), mt(D, s);
  }, onBeforeAppear(D) {
    Jt(H, [D]), mt(D, l), mt(D, c);
  }, onEnter: W(false), onAppear: W(true), onLeave(D, ae) {
    D._isLeaving = true;
    const U = () => Y(D, ae);
    mt(D, f), D._enterCancelled ? (mt(D, h), Wi(D)) : (Wi(D), mt(D, h)), $s(() => {
      D._isLeaving && (Dt(D, f), mt(D, g), Ps(w) || Is(D, r, E, U));
    }), Jt(w, [D, U]);
  }, onEnterCancelled(D) {
    J(D, false, void 0, true), Jt(m, [D]);
  }, onAppearCancelled(D) {
    J(D, true, void 0, true), Jt(pe, [D]);
  }, onLeaveCancelled(D) {
    Y(D), Jt(B, [D]);
  } });
}
function Np(e) {
  if (e == null) return null;
  if (we(e)) return [_i(e.enter), _i(e.leave)];
  {
    const t = _i(e);
    return [t, t];
  }
}
function _i(e) {
  return q0(e);
}
function mt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Sn] || (e[Sn] = /* @__PURE__ */ new Set())).add(t);
}
function Dt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[Sn];
  n && (n.delete(t), n.size || (e[Sn] = void 0));
}
function $s(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Fp = 0;
function Is(e, t, n, r) {
  const i = e._endId = ++Fp, o = () => {
    i === e._endId && r();
  };
  if (n != null) return setTimeout(o, n);
  const { type: s, timeout: a, propCount: l } = wu(e, t);
  if (!s) return r();
  const c = s + "end";
  let u = 0;
  const f = () => {
    e.removeEventListener(c, h), o();
  }, h = (g) => {
    g.target === e && ++u >= l && f();
  };
  setTimeout(() => {
    u < l && f();
  }, a + 1), e.addEventListener(c, h);
}
function wu(e, t) {
  const n = window.getComputedStyle(e), r = (v) => (n[v] || "").split(", "), i = r(`${Lt}Delay`), o = r(`${Lt}Duration`), s = Ms(i, o), a = r(`${In}Delay`), l = r(`${In}Duration`), c = Ms(a, l);
  let u = null, f = 0, h = 0;
  t === Lt ? s > 0 && (u = Lt, f = s, h = o.length) : t === In ? c > 0 && (u = In, f = c, h = l.length) : (f = Math.max(s, c), u = f > 0 ? s > c ? Lt : In : null, h = u ? u === Lt ? o.length : l.length : 0);
  const g = u === Lt && /\b(?:transform|all)(?:,|$)/.test(r(`${Lt}Property`).toString());
  return { type: u, timeout: f, propCount: h, hasTransform: g };
}
function Ms(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => Ls(n) + Ls(e[r])));
}
function Ls(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Wi(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Up(e, t, n) {
  const r = e[Sn];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ks = Symbol("_vod"), jp = Symbol("_vsh"), Su = Symbol("");
function Bp(e) {
  const t = Lo();
  if (!t) return;
  const n = t.ut = (i = e(t.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((o) => kr(o, i));
  }, r = () => {
    const i = e(t.proxy);
    t.ce ? kr(t.ce, i) : zi(t.subTree, i), n(i);
  };
  zl(() => {
    Dl(r);
  }), rr(() => {
    Vt(r, ot, { flush: "post" });
    const i = new MutationObserver(r);
    i.observe(t.subTree.el.parentNode, { childList: true }), Qr(() => i.disconnect());
  });
}
function zi(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      zi(n.activeBranch, t);
    });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) kr(e.el, t);
  else if (e.type === ye) e.children.forEach((n) => zi(n, t));
  else if (e.type === Hn) {
    let { el: n, anchor: r } = e;
    for (; n && (kr(n, t), n !== r); ) n = n.nextSibling;
  }
}
function kr(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    let r = "";
    for (const i in t) {
      const o = Y0(t[i]);
      n.setProperty(`--${i}`, o), r += `--${i}: ${o};`;
    }
    n[Su] = r;
  }
}
const Hp = /(?:^|;)\s*display\s*:/;
function qp(e, t, n) {
  const r = e.style, i = Ce(n);
  let o = false;
  if (n && !i) {
    if (t) if (Ce(t)) for (const s of t.split(";")) {
      const a = s.slice(0, s.indexOf(":")).trim();
      n[a] == null && _r(r, a, "");
    }
    else for (const s in t) n[s] == null && _r(r, s, "");
    for (const s in n) s === "display" && (o = true), _r(r, s, n[s]);
  } else if (i) {
    if (t !== n) {
      const s = r[Su];
      s && (n += ";" + s), r.cssText = n, o = Hp.test(n);
    }
  } else t && e.removeAttribute("style");
  ks in e && (e[ks] = o ? r.display : "", e[jp] && (r.display = "none"));
}
const Ds = /\s*!important$/;
function _r(e, t, n) {
  if (ne(n)) n.forEach((r) => _r(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
  else {
    const r = Vp(e, t);
    Ds.test(n) ? e.setProperty(sn(r), n.replace(Ds, ""), "important") : e[r] = n;
  }
}
const Ns = ["Webkit", "Moz", "ms"], yi = {};
function Vp(e, t) {
  const n = yi[t];
  if (n) return n;
  let r = it(t);
  if (r !== "filter" && r in e) return yi[t] = r;
  r = Kr(r);
  for (let i = 0; i < Ns.length; i++) {
    const o = Ns[i] + r;
    if (o in e) return yi[t] = o;
  }
  return t;
}
const Fs = "http://www.w3.org/1999/xlink";
function Us(e, t, n, r, i, o = G0(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Fs, t.slice(6, t.length)) : e.setAttributeNS(Fs, t, n) : n == null || o && !hl(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : It(n) ? String(n) : n);
}
function js(e, t, n, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? yu(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
    const a = o === "OPTION" ? e.getAttribute("value") || "" : e.value, l = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
    (a !== l || !("_value" in e)) && (e.value = l), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let s = false;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = hl(n) : n == null && a === "string" ? (n = "", s = true) : a === "number" && (n = 0, s = true);
  }
  try {
    e[t] = n;
  } catch {
  }
  s && e.removeAttribute(i || t);
}
function Wp(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function zp(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Bs = Symbol("_vei");
function Kp(e, t, n, r, i = null) {
  const o = e[Bs] || (e[Bs] = {}), s = o[t];
  if (r && s) s.value = r;
  else {
    const [a, l] = Jp(t);
    if (r) {
      const c = o[t] = Xp(r, i);
      Wp(e, a, c, l);
    } else s && (zp(e, a, s, l), o[t] = void 0);
  }
}
const Hs = /(?:Once|Passive|Capture)$/;
function Jp(e) {
  let t;
  if (Hs.test(e)) {
    t = {};
    let r;
    for (; r = e.match(Hs); ) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = true;
  }
  return [e[2] === ":" ? e.slice(3) : sn(e.slice(2)), t];
}
let bi = 0;
const Gp = Promise.resolve(), Yp = () => bi || (Gp.then(() => bi = 0), bi = Date.now());
function Xp(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    ut(Qp(r, n.value), t, 5, [r]);
  };
  return n.value = e, n.attached = Yp(), n;
}
function Qp(e, t) {
  if (ne(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = true;
    }, t.map((r) => (i) => !i._stopped && r && r(i));
  } else return t;
}
const qs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Zp = (e, t, n, r, i, o) => {
  const s = i === "svg";
  t === "class" ? Up(e, r, s) : t === "style" ? qp(e, n, r) : Vr(t) ? mo(t) || Kp(e, t, n, r, o) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : ev(e, t, r, s)) ? (js(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Us(e, t, r, s, o, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !Ce(r)) ? js(e, it(t), r, o, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Us(e, t, r, s));
};
function ev(e, t, n, r) {
  if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && qs(t) && oe(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE") return false;
  }
  return qs(t) && Ce(n) ? false : t in e;
}
const Eu = /* @__PURE__ */ new WeakMap(), xu = /* @__PURE__ */ new WeakMap(), Dr = Symbol("_moveCb"), Vs = Symbol("_enterCb"), tv = (e) => (delete e.props.mode, e), nv = tv({ name: "TransitionGroup", props: Ie({}, kp, { tag: String, moveClass: String }), setup(e, { slots: t }) {
  const n = Lo(), r = Lh();
  let i, o;
  return Ro(() => {
    if (!i.length) return;
    const s = e.moveClass || `${e.name || "v"}-move`;
    if (!av(i[0].el, n.vnode.el, s)) {
      i = [];
      return;
    }
    i.forEach(iv), i.forEach(ov);
    const a = i.filter(sv);
    Wi(n.vnode.el), a.forEach((l) => {
      const c = l.el, u = c.style;
      mt(c, s), u.transform = u.webkitTransform = u.transitionDuration = "";
      const f = c[Dr] = (h) => {
        h && h.target !== c || (!h || h.propertyName.endsWith("transform")) && (c.removeEventListener("transitionend", f), c[Dr] = null, Dt(c, s));
      };
      c.addEventListener("transitionend", f);
    }), i = [];
  }), () => {
    const s = ce(e), a = Dp(s);
    let l = s.tag || ye;
    if (i = [], o) for (let c = 0; c < o.length; c++) {
      const u = o[c];
      u.el && u.el instanceof Element && (i.push(u), Yn(u, Fi(u, a, r, n)), Eu.set(u, { left: u.el.offsetLeft, top: u.el.offsetTop }));
    }
    o = t.default ? Hl(t.default()) : [];
    for (let c = 0; c < o.length; c++) {
      const u = o[c];
      u.key != null && Yn(u, Fi(u, a, r, n));
    }
    return de(l, null, o);
  };
} }), rv = nv;
function iv(e) {
  const t = e.el;
  t[Dr] && t[Dr](), t[Vs] && t[Vs]();
}
function ov(e) {
  xu.set(e, { left: e.el.offsetLeft, top: e.el.offsetTop });
}
function sv(e) {
  const t = Eu.get(e), n = xu.get(e), r = t.left - n.left, i = t.top - n.top;
  if (r || i) {
    const o = e.el.style;
    return o.transform = o.webkitTransform = `translate(${r}px,${i}px)`, o.transitionDuration = "0s", e;
  }
}
function av(e, t, n) {
  const r = e.cloneNode(), i = e[Sn];
  i && i.forEach((a) => {
    a.split(/\s+/).forEach((l) => l && r.classList.remove(l));
  }), n.split(/\s+/).forEach((a) => a && r.classList.add(a)), r.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(r);
  const { hasTransform: s } = wu(r);
  return o.removeChild(r), s;
}
const lv = ["ctrl", "shift", "alt", "meta"], uv = { stop: (e) => e.stopPropagation(), prevent: (e) => e.preventDefault(), self: (e) => e.target !== e.currentTarget, ctrl: (e) => !e.ctrlKey, shift: (e) => !e.shiftKey, alt: (e) => !e.altKey, meta: (e) => !e.metaKey, left: (e) => "button" in e && e.button !== 0, middle: (e) => "button" in e && e.button !== 1, right: (e) => "button" in e && e.button !== 2, exact: (e, t) => lv.some((n) => e[`${n}Key`] && !t.includes(n)) }, Ws = (e, t) => {
  const n = e._withMods || (e._withMods = {}), r = t.join(".");
  return n[r] || (n[r] = ((i, ...o) => {
    for (let s = 0; s < t.length; s++) {
      const a = uv[t[s]];
      if (a && a(i, t)) return;
    }
    return e(i, ...o);
  }));
}, cv = Ie({ patchProp: Zp }, Lp);
let zs;
function fv() {
  return zs || (zs = hp(cv));
}
const dv = ((...e) => {
  const t = fv().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const i = pv(r);
    if (!i) return;
    const o = t._component;
    !oe(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const s = n(i, false, hv(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), s;
  }, t;
});
function hv(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function pv(e) {
  return Ce(e) ? document.querySelector(e) : e;
}
const Ki = { value: null };
function Vn() {
  if (!Ki.value) throw new Error("global config is unset");
  return Ki.value;
}
function vv(e) {
  Ki.value = e;
}
class Ks {
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
class gv {
  info(t, n) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} INFO [${t}] ${n(new Ks()).build()}`);
  }
  warn(t, n) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} WARN [${t}] ${n(new Ks()).build()}`);
  }
  error(t, n) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} ERROR [${t}] ${n.stack ?? JSON.stringify(n)}`);
  }
}
const wi = new gv();
class mv {
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
  async register(t, n) {
    const r = await n, i = Object.keys(r).find((l) => l.endsWith("Service")) ?? "", o = Object.keys(r).find((l) => l.endsWith("Protocol")) ?? "", s = r[i], a = r[o];
    if (!s) throw new Error(`not service defined in register service file: ${t}`);
    if (!a) throw new Error(`not protocol defined in register service file: ${t}`);
    this.serviceCtors.set(t, s), this.protocolCtors.set(t, a), await this.transport.notifyServiceReady(t), this.initializeWithMetrics(t);
  }
  getService(t) {
    if (!this.serviceCtors.has(t)) throw new Error(`service "${t}" is not belongs to this worker (with services: ${[...this.serviceCtors.keys()].join(",")}), use "getServiceProtocol" instead`);
    let n = this.instances.get(t);
    if (!n) {
      const r = this.serviceCtors.get(t);
      if (!r) throw new Error("service is not registered");
      n = new r(), this.instances.set(t, n), this.instnacePWRs.has(t) || this.instnacePWRs.set(t, Promise.withResolvers()), this.instnacePWRs.get(t).resolve(n);
    }
    return n;
  }
  async getServiceWhenReady(t) {
    return this.instnacePWRs.has(t) || this.instnacePWRs.set(t, Promise.withResolvers()), await this.instnacePWRs.get(t).promise;
  }
  getServiceProtocol(t) {
    if (this.serviceCtors.get(t)) {
      let n = this.protocols.get(t);
      if (!n) {
        const r = this.protocolCtors.get(t);
        if (!r) throw new Error("service protocol is not registered");
        const i = this.getService(t);
        if (!i) throw new Error("service instance not found when create service protocol");
        n = new r(i), this.protocols.set(t, n);
      }
      return n;
    } else {
      if (!this.transport) throw new Error("transport is uninitialized");
      return this.transport.getProxy(t);
    }
  }
  async initializeWithMetrics(t) {
    const n = this.getService(t), r = performance.now();
    wi.info("service_init", (i) => i.bold(t).text("start init..."));
    try {
      await n.initialize();
    } catch (i) {
      wi.error("service_init", i);
    }
    wi.info("service_init", (i) => i.bold(t).text("init cost").time(performance.now() - r));
  }
}
var Cu = ((e) => (e.main = "main", e.rendererMain = "rendererMain", e.rendererLyrics = "rendererLyrics", e.rendererUpdate = "rendererUpdate", e.rendererFeedback = "rendererFeedback", e.rendererImagePreview = "rendererImagePreview", e.rendererTaskbarWidget = "rendererTaskbarWidget", e.rendererTaskbarWidgetShadow = "rendererTaskbarWidgetShadow", e))(Cu || {});
let er = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
class Wn {
  _promise;
  _resolve;
  _reject;
  _isDone;
  _isError;
  _error;
  _value;
  constructor(t) {
    this._isDone = false, this._isError = false, this._promise = t ?? new Promise((n, r) => {
      this._resolve = n, this._reject = r;
    });
  }
  static createPending() {
    return new Wn();
  }
  static createDone(t) {
    const n = new Wn();
    return n.resolve(t), n;
  }
  static createAsync(t) {
    return new Wn(t());
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
class _v {
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
    let n = this.proxies.get(t);
    return n || (n = new Proxy({}, { get: (r, i) => {
      if (typeof i != "string") throw new TypeError(`service protocol method name(${String(i)}) must be a string`);
      return async (...o) => {
        const s = er(), a = new Wn();
        this.requests.set(s, a);
        const l = {};
        for (const [u, f] of o.entries()) if (f instanceof Function) {
          const h = er();
          this.callbacks.set(h, o[u]), o[u] = null, l[u] = h;
        }
        await this.send({ type: "method.invoke", fromWorkerId: this.currentWorker, toServiceId: t, methodName: i, requestId: s, arguments: o, callbacks: l });
        const c = await a.get();
        if (c.type !== "method.return") throw new Error("internal error: request proxy receive an invoke message as result");
        if (c.return.type === "error") throw new Error(c.return.error);
        return c.return.result;
      };
    } }), this.proxies.set(t, n)), n;
  }
  async handleReceivedMessage(t) {
    switch (t.type) {
      case "method.invoke": {
        const n = [...t.arguments];
        for (const [i, o] of Object.entries(t.callbacks)) {
          const s = Number.parseInt(i);
          n[s] = async (...a) => {
            await this.send({ type: "method.callback", fromWorkerId: this.currentWorker, toWorkerId: t.fromWorkerId, serviceId: t.toServiceId, callbackId: o, arguments: a });
          };
        }
        const r = this.initializer.getServiceProtocol(t.toServiceId);
        try {
          const i = await r[t.methodName](...n);
          await this.send({ type: "method.return", fromServiceId: t.toServiceId, toWorkerId: t.fromWorkerId, methodName: t.methodName, requestId: t.requestId, return: { type: "success", result: i } });
        } catch (i) {
          console.error(i), await this.send({ type: "method.return", fromServiceId: t.toServiceId, toWorkerId: t.fromWorkerId, methodName: t.methodName, requestId: t.requestId, return: { type: "error", error: i instanceof Error ? i.message : String(i) } });
        }
        break;
      }
      case "method.return": {
        const n = this.requests.get(t.requestId);
        if (!n) {
          console.warn(new Error(`request(id:${t.requestId}) is not belongs to this worker`));
          return;
        }
        n.resolve(t), this.requests.delete(t.requestId);
        break;
      }
      case "method.callback": {
        const n = this.callbacks.get(t.callbackId);
        if (!n) return;
        n(...t.arguments);
        break;
      }
    }
  }
}
class yv extends _v {
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
globalThis.createServiceInitializer = () => new mv({ workerId: Cu.rendererFeedback, transport: (e) => new yv(e) });
const Tu = createServiceInitializer();
function bv() {
  const t = `
@font-face {
  font-family: "MiSans";
  src: url("${Vn().fontPrefix.replaceAll("\\", "/")}/MiSansVF.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
}`, n = document.createElement("style");
  n.textContent = t, document.head.appendChild(n);
}
const wv = Symbol("");
function Ou(e) {
  return Un(wv);
}
const Sv = an(/* @__PURE__ */ new Map());
function Ev(e, t) {
  Sv.set(e, t);
}
function Me(e) {
  return Tu.getServiceProtocol(e);
}
var Pe = ((e) => (e.storage = "storage", e.sharedState = "sharedState", e.request = "request", e.queue = "queue", e.player = "player", e.window = "window", e.user = "user", e.collect = "collect", e.internalCheck = "internalCheck", e.update = "update", e.appSettings = "appSettings", e.utils = "utils", e.debug = "debug", e.applog = "applog", e.renderer = "renderer", e.commerce = "commerce", e.serverPush = "serverPush", e.shortcut = "shortcut", e.desktopLyrics = "desktopLyrics", e.startup = "startup", e.notification = "notification", e.freqCtrl = "freqCtrl", e.resPreload = "resPreload", e.playerProxy = "playerProxy", e.imagePreviewer = "imagePreviewer", e.appClock = "clock", e.taskbarWidget = "taskbarWidget", e))(Pe || {});
function xv(e = null) {
  if (!(e instanceof Node)) return {};
  const t = [];
  let n = e;
  if (n) for (; n; ) {
    if (n instanceof Element) {
      const r = n.getAttribute("data-et-params");
      r && t.push(Object.fromEntries(new URLSearchParams(r).entries()));
    }
    n = n.parentNode;
  }
  return Object.assign({}, ...t.reverse());
}
const Cv = Ve({ __name: "RouterLinkExt", props: { path: {}, query: {}, etParams: {}, cache: {}, activeClass: {}, shouldForceActive: { type: Boolean } }, emits: ["click"], setup(e, { emit: t }) {
  const n = e, r = t, i = Ou(), o = Ee();
  Vt(() => n.cache, () => {
    Ev(n.path, n.cache);
  }, { immediate: true });
  const s = nn(() => ({ ...JSON.parse(i.query.et_params ?? "{}"), ...xv(o.value?.$el), ...n.etParams }));
  return (a, l) => {
    const c = Wh("RouterLink");
    return $(), je(c, { ref_key: "el", ref: o, to: { path: e.path, query: { ...e.query, et_params: JSON.stringify(s.value) } }, class: at({ "router-link-active": e.shouldForceActive }), "active-class": e.activeClass, onClick: l[0] || (l[0] = (u) => r("click", u)) }, { default: wn(() => [Ir(a.$slots, "default")]), _: 3 }, 8, ["to", "class", "active-class"]);
  };
} }), Tv = Ve({ __name: "TabControl", props: { tabs: {}, activeKey: {} }, emits: ["switch"], setup(e, { emit: t }) {
  const n = t, r = Ou(), i = Ee(), o = Ee(0), s = Ee(false);
  function a() {
    const l = i.value?.querySelector(".active"), c = i.value?.getBoundingClientRect(), u = l?.getBoundingClientRect();
    !l || !c || !u || (o.value = u.left - c.left + u.width / 2 - 6);
  }
  return Ro(() => {
    a();
  }), rr(async () => {
    a(), await Ll(), s.value = true;
  }), (l, c) => ($(), N("div", { ref_key: "container", ref: i, class: "tab-control" }, [($(true), N(ye, null, Wt(e.tabs, (u) => ($(), je(Ao(u.to ? Cv : "div"), { key: u.key, class: at(["tab-item", { active: e.activeKey === u.key }]), "active-class": "active", path: u.to ?? "/", query: ue(r)?.query, onClick: (f) => n("switch", u.key) }, { default: wn(() => [Qn(Fe(u.label), 1)]), _: 2 }, 1032, ["class", "path", "query", "onClick"]))), 128)), z("div", { class: at(["indicator", { transition: s.value }]), style: Cn({ transform: `translateX(${o.value}px)` }) }, null, 6)], 512));
} }), Ze = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t) n[r] = i;
  return n;
}, Ov = Ze(Tv, [["__scopeId", "data-v-8e32c8a1"]]), Tt = an([]);
function kt(e) {
  const t = er();
  if (e.mutexKey) for (let n = Tt.length - 1; n >= 0; n--) Tt[n].mutexKey === e.mutexKey && Tt.splice(n, 1);
  Tt.push({ ...e, id: t }), setTimeout(() => {
    const n = Tt.findIndex((r) => r.id === t);
    n !== -1 && Tt.splice(n, 1);
  }, e.timeout ?? 4e3);
}
const Rv = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Av(e, t) {
  return $(), N("svg", Rv, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M17.315 3.768c.45.358.525 1.013.167 1.463l-8.941 11.25a1.04 1.04 0 0 1-1.644-.016l-4.392-5.76a1.042 1.042 0 0 1 1.657-1.263l3.58 4.696 8.11-10.203a1.04 1.04 0 0 1 1.463-.167", "clip-rule": "evenodd" }, null, -1)])]);
}
const Pv = { render: Av }, $v = { class: "toast" }, Iv = { key: 0, class: "toast-icon" }, Mv = { class: "toast-text" }, Lv = { key: 1, class: "toast-actions" }, kv = ["onClick"], Dv = Ve({ __name: "Toast", setup(e) {
  return (t, n) => ($(), je(rv, { name: "list" }, { default: wn(() => [($(true), N(ye, null, Wt(ue(Tt), (r) => ($(), N("div", { key: r.id, class: "toast-container" }, [z("div", $v, [r.icon ? ($(), N("div", Iv, [de(ue(Pv))])) : xe("", true), z("div", Mv, Fe(r.message), 1), r.actions && r.actions.length > 0 ? ($(), N("div", Lv, [($(true), N(ye, null, Wt(r.actions, (i) => ($(), N("div", { key: i.label, class: "toast-action", onClick: () => {
    i.onClick();
    const o = ue(Tt).findIndex((s) => s.id === r.id);
    ue(Tt).splice(o, 1);
  } }, Fe(i.label), 9, kv))), 128))])) : xe("", true)])]))), 128))]), _: 1 }));
} }), Nv = Ze(Dv, [["__scopeId", "data-v-7ef1ec56"]]);
var Nt = ((e) => (e.PlayOrPause = "PlayOrPause", e.PrevTrack = "PrevTrack", e.NextTrack = "NextTrack", e.VolumeUp = "VolumeUp", e.VolumeDown = "VolumeDown", e.Like = "Like", e.Dislike = "Dislike", e))(Nt || {});
const Js = "higher", Fv = { queue: { appVisibility: { isPlayerVisible: true }, queue: null }, player: { isPlaying: false, isLoading: false, isMuted: false, volume: 0.3, quality: Js, playingQuality: Js, availableQualities: [], playableQualities: [], overrideQuality: void 0, progressPercent: 0, progressSeconds: 0, durationSeconds: 0, mediaEtParams: {}, isInitialPlay: true, currentAudioEffect: null }, user: { isLoading: false, info: null }, collect: { playable: {}, playlist: {}, album: {}, artist: {}, user: {} }, internalCheck: { isPassed: false }, debug: { updateProgress: "", latestTronBuildId: "", latestVersion: "" }, window: { windows: {}, isInactive: false, closeActionType: "exit" }, commerce: { commerceInfo: void 0, purchasedDigitalAlbumsIds: [], isAdFree: false, isVip: false, isFreeVip: false, vipExpireAt: 0, hasPlayEntitlement: false, type: "free", audioEffects: [] }, update: { isUpdateButtonVisible: false, isUpdateDialogVisible: false, updateType: false, isUpdating: false, isFailed: false }, shortcut: { isGlobalShortcutEnabled: false, shortcuts: { [Nt.PlayOrPause]: { inApp: "", global: "" }, [Nt.PrevTrack]: { inApp: "", global: "" }, [Nt.NextTrack]: { inApp: "", global: "" }, [Nt.VolumeUp]: { inApp: "", global: "" }, [Nt.VolumeDown]: { inApp: "", global: "" }, [Nt.Like]: { inApp: "", global: "" }, [Nt.Dislike]: { inApp: "", global: "" } } }, desktopLyrics: { settings: { enabled: false, textSize: 24, textColor: "light", showTranslation: true, isLocked: false }, hover: false, menuVisible: false }, startup: { isAutoStartup: false }, notification: { isNotificationEnabled: true }, taskbarWidget: { enabled: false, autoStart: true, preferredSide: void 0, widgetState: "docked", isDragging: false, inDragRegion: false, snapStage: null, dockedStyle: "nano", theme: "dark", hover: false }, region: { abroadType: "0" } }, Gs = an(/* @__PURE__ */ new Map());
function Uv(e) {
  let t = Gs.get(e);
  return t || (t = yh(Fv[e]), Gs.set(e, t), Me(Pe.sharedState).get(e).then((n) => {
    t.value = n;
  }), Me(Pe.sharedState).onUpdate(e, (n) => {
    t.value = n;
  })), t;
}
function jv(e) {
  return Uv(e);
}
const Bv = { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "10", fill: "none", viewBox: "0 0 10 10" };
function Hv(e, t) {
  return $(), N("svg", Bv, [...t[0] || (t[0] = [z("path", { fill: "currentColor", d: "M5 5.708.854 9.854A.48.48 0 0 1 .503 10a.5.5 0 0 1-.361-.142.5.5 0 0 1-.142-.36.48.48 0 0 1 .146-.352L4.292 5 .146.854A.5.5 0 0 1 0 .498.5.5 0 0 1 .146.146.5.5 0 0 1 .503 0a.48.48 0 0 1 .351.146L5 4.292 9.146.146A.5.5 0 0 1 9.502 0q.103 0 .19.04a.5.5 0 0 1 .162.814L5.708 5l4.146 4.146a.5.5 0 0 1 0 .708.5.5 0 0 1-.352.146.5.5 0 0 1-.356-.146z" }, null, -1)])]);
}
const qv = { render: Hv }, Vv = { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "10", fill: "none", viewBox: "0 0 10 10" };
function Wv(e, t) {
  return $(), N("svg", Vv, [...t[0] || (t[0] = [z("path", { fill: "currentColor", d: "M1.475 10a1.4 1.4 0 0 1-.562-.117A1.7 1.7 0 0 1 .44 9.56a1.7 1.7 0 0 1-.322-.474A1.4 1.4 0 0 1 0 8.525v-7.05Q0 1.18.117.913.24.645.44.444.645.24.913.122 1.182 0 1.475 0h7.05q.294 0 .562.122.268.118.469.322.204.2.322.47.122.267.122.56v7.051q0 .294-.122.562a1.5 1.5 0 0 1-.322.474q-.2.2-.47.322a1.4 1.4 0 0 1-.56.117zM8.5 8.999a.5.5 0 0 0 .498-.498V1.499a.5.5 0 0 0-.498-.498H1.499a.5.5 0 0 0-.352.146.5.5 0 0 0-.146.352v7.002a.5.5 0 0 0 .498.498z" }, null, -1)])]);
}
const zv = { render: Wv }, Kv = { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "1", fill: "none", viewBox: "0 0 10 1" };
function Jv(e, t) {
  return $(), N("svg", Kv, [...t[0] || (t[0] = [z("path", { fill: "currentColor", d: "M.498 1A.5.5 0 0 1 0 .502q0-.103.04-.19A.5.5 0 0 1 .145.15.5.5 0 0 1 .303.038.5.5 0 0 1 .498 0h9.004q.103 0 .19.04a.5.5 0 0 1 .162.111.5.5 0 0 1-.352.85z" }, null, -1)])]);
}
const Gv = { render: Jv }, Yv = { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "10", fill: "none", viewBox: "0 0 10 10" };
function Xv(e, t) {
  return $(), N("svg", Yv, [...t[0] || (t[0] = [z("path", { fill: "currentColor", d: "M8.999 2.964q0-.405-.161-.762a1.9 1.9 0 0 0-.44-.625 2 2 0 0 0-.64-.42 1.9 1.9 0 0 0-.76-.156H2.084q.078-.224.22-.41a1.5 1.5 0 0 1 .327-.318q.186-.13.405-.2Q3.261 0 3.501 0h3.496q.62 0 1.167.24A3.01 3.01 0 0 1 10 2.997V6.5q0 .24-.073.464a1.4 1.4 0 0 1-.2.405 1.5 1.5 0 0 1-.728.547zM1.475 10a1.4 1.4 0 0 1-.562-.117A1.7 1.7 0 0 1 .44 9.56a1.7 1.7 0 0 1-.322-.474A1.4 1.4 0 0 1 0 8.525V3.477q0-.298.117-.562.123-.268.322-.469.205-.205.47-.322.267-.122.566-.122h5.048q.298 0 .567.122a1.5 1.5 0 0 1 .786.786q.122.27.122.567v5.048q0 .298-.122.567a1.55 1.55 0 0 1-.791.79 1.4 1.4 0 0 1-.562.118zm5.024-1.001a.5.5 0 0 0 .352-.146.5.5 0 0 0 .112-.157.5.5 0 0 0 .039-.195v-5a.5.5 0 0 0-.308-.464.5.5 0 0 0-.195-.039h-5a.5.5 0 0 0-.195.04.5.5 0 0 0-.157.111.5.5 0 0 0-.146.352v5a.5.5 0 0 0 .498.498z" }, null, -1)])]);
}
const Qv = { render: Xv }, Zv = { class: "content" }, eg = { key: 0, class: "windows-controls" }, tg = Ve({ __name: "TitleBar", props: { windowId: {}, title: {}, mode: {} }, setup(e) {
  const t = jv("window"), n = Vn().os;
  return (r, i) => ($(), N("div", { class: at(["title-bar", { [e.mode]: true, [String(ue(n))]: true }]) }, [z("div", Zv, Fe(ue(n) === "Windows" ? e.title : ""), 1), ue(n) === "Windows" ? ($(), N("div", eg, [ue(t).windows[e.windowId]?.isMinimizable ? ($(), N("div", { key: 0, class: "button", onClick: i[0] || (i[0] = (o) => ue(Me)(ue(Pe).window).minimize(e.windowId)) }, [de(ue(Gv))])) : xe("", true), ue(t).windows[e.windowId]?.isMaximizable && !ue(t).windows[e.windowId]?.isMaximize ? ($(), N("div", { key: 1, class: "button", onClick: i[1] || (i[1] = (o) => ue(Me)(ue(Pe).window).maximize(e.windowId)) }, [de(ue(zv))])) : xe("", true), ue(t).windows[e.windowId]?.isMaximizable && ue(t).windows[e.windowId]?.isMaximize ? ($(), N("div", { key: 2, class: "button", onClick: i[2] || (i[2] = (o) => ue(Me)(ue(Pe).window).unmaximize(e.windowId)) }, [de(ue(Qv))])) : xe("", true), ue(t).windows[e.windowId]?.isClosable ? ($(), N("div", { key: 3, class: "button close", onClick: i[3] || (i[3] = (o) => ue(Me)(ue(Pe).window).close(e.windowId)) }, [de(ue(qv))])) : xe("", true)])) : xe("", true)], 2));
} }), ng = Ze(tg, [["__scopeId", "data-v-3f8cf262"]]);
var Nr = ((e) => (e.main = "main", e.desktopLyrics = "desktopLyrics", e.captcha = "captcha", e.update = "update", e.feedback = "feedback", e.imagePreview = "imagePreview", e.taskbarWidget = "taskbarWidget", e.taskbarWidgetShadow = "taskbarWidgetShadow", e))(Nr || {});
function rg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var yr = { exports: {} }, ig = yr.exports, Ys;
function og() {
  return Ys || (Ys = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(ig, (function() {
      var n = 1e3, r = 6e4, i = 36e5, o = "millisecond", s = "second", a = "minute", l = "hour", c = "day", u = "week", f = "month", h = "quarter", g = "year", v = "date", y = "Invalid Date", E = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, x = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, S = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(U) {
        var L = ["th", "st", "nd", "rd"], T = U % 100;
        return "[" + U + (L[(T - 20) % 10] || L[T] || L[0]) + "]";
      } }, m = function(U, L, T) {
        var I = String(U);
        return !I || I.length >= L ? U : "" + Array(L + 1 - I.length).join(T) + U;
      }, w = { s: m, z: function(U) {
        var L = -U.utcOffset(), T = Math.abs(L), I = Math.floor(T / 60), C = T % 60;
        return (L <= 0 ? "+" : "-") + m(I, 2, "0") + ":" + m(C, 2, "0");
      }, m: function U(L, T) {
        if (L.date() < T.date()) return -U(T, L);
        var I = 12 * (T.year() - L.year()) + (T.month() - L.month()), C = L.clone().add(I, f), K = T - C < 0, X = L.clone().add(I + (K ? -1 : 1), f);
        return +(-(I + (T - C) / (K ? C - X : X - C)) || 0);
      }, a: function(U) {
        return U < 0 ? Math.ceil(U) || 0 : Math.floor(U);
      }, p: function(U) {
        return { M: f, y: g, w: u, d: c, D: v, h: l, m: a, s, ms: o, Q: h }[U] || String(U || "").toLowerCase().replace(/s$/, "");
      }, u: function(U) {
        return U === void 0;
      } }, B = "en", H = {};
      H[B] = S;
      var re = "$isDayjsObject", pe = function(U) {
        return U instanceof D || !(!U || !U[re]);
      }, J = function U(L, T, I) {
        var C;
        if (!L) return B;
        if (typeof L == "string") {
          var K = L.toLowerCase();
          H[K] && (C = K), T && (H[K] = T, C = K);
          var X = L.split("-");
          if (!C && X.length > 1) return U(X[0]);
        } else {
          var ee = L.name;
          H[ee] = L, C = ee;
        }
        return !I && C && (B = C), C || !I && B;
      }, Y = function(U, L) {
        if (pe(U)) return U.clone();
        var T = typeof L == "object" ? L : {};
        return T.date = U, T.args = arguments, new D(T);
      }, W = w;
      W.l = J, W.i = pe, W.w = function(U, L) {
        return Y(U, { locale: L.$L, utc: L.$u, x: L.$x, $offset: L.$offset });
      };
      var D = (function() {
        function U(T) {
          this.$L = J(T.locale, null, true), this.parse(T), this.$x = this.$x || T.x || {}, this[re] = true;
        }
        var L = U.prototype;
        return L.parse = function(T) {
          this.$d = (function(I) {
            var C = I.date, K = I.utc;
            if (C === null) return /* @__PURE__ */ new Date(NaN);
            if (W.u(C)) return /* @__PURE__ */ new Date();
            if (C instanceof Date) return new Date(C);
            if (typeof C == "string" && !/Z$/i.test(C)) {
              var X = C.match(E);
              if (X) {
                var ee = X[2] - 1 || 0, V = (X[7] || "0").substring(0, 3);
                return K ? new Date(Date.UTC(X[1], ee, X[3] || 1, X[4] || 0, X[5] || 0, X[6] || 0, V)) : new Date(X[1], ee, X[3] || 1, X[4] || 0, X[5] || 0, X[6] || 0, V);
              }
            }
            return new Date(C);
          })(T), this.init();
        }, L.init = function() {
          var T = this.$d;
          this.$y = T.getFullYear(), this.$M = T.getMonth(), this.$D = T.getDate(), this.$W = T.getDay(), this.$H = T.getHours(), this.$m = T.getMinutes(), this.$s = T.getSeconds(), this.$ms = T.getMilliseconds();
        }, L.$utils = function() {
          return W;
        }, L.isValid = function() {
          return this.$d.toString() !== y;
        }, L.isSame = function(T, I) {
          var C = Y(T);
          return this.startOf(I) <= C && C <= this.endOf(I);
        }, L.isAfter = function(T, I) {
          return Y(T) < this.startOf(I);
        }, L.isBefore = function(T, I) {
          return this.endOf(I) < Y(T);
        }, L.$g = function(T, I, C) {
          return W.u(T) ? this[I] : this.set(C, T);
        }, L.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, L.valueOf = function() {
          return this.$d.getTime();
        }, L.startOf = function(T, I) {
          var C = this, K = !!W.u(I) || I, X = W.p(T), ee = function(ft, Oe) {
            var Et = W.w(C.$u ? Date.UTC(C.$y, Oe, ft) : new Date(C.$y, Oe, ft), C);
            return K ? Et : Et.endOf(c);
          }, V = function(ft, Oe) {
            return W.w(C.toDate()[ft].apply(C.toDate("s"), (K ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Oe)), C);
          }, se = this.$W, ve = this.$M, Ae = this.$D, et = "set" + (this.$u ? "UTC" : "");
          switch (X) {
            case g:
              return K ? ee(1, 0) : ee(31, 11);
            case f:
              return K ? ee(1, ve) : ee(0, ve + 1);
            case u:
              var tt = this.$locale().weekStart || 0, St = (se < tt ? se + 7 : se) - tt;
              return ee(K ? Ae - St : Ae + (6 - St), ve);
            case c:
            case v:
              return V(et + "Hours", 0);
            case l:
              return V(et + "Minutes", 1);
            case a:
              return V(et + "Seconds", 2);
            case s:
              return V(et + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, L.endOf = function(T) {
          return this.startOf(T, false);
        }, L.$set = function(T, I) {
          var C, K = W.p(T), X = "set" + (this.$u ? "UTC" : ""), ee = (C = {}, C[c] = X + "Date", C[v] = X + "Date", C[f] = X + "Month", C[g] = X + "FullYear", C[l] = X + "Hours", C[a] = X + "Minutes", C[s] = X + "Seconds", C[o] = X + "Milliseconds", C)[K], V = K === c ? this.$D + (I - this.$W) : I;
          if (K === f || K === g) {
            var se = this.clone().set(v, 1);
            se.$d[ee](V), se.init(), this.$d = se.set(v, Math.min(this.$D, se.daysInMonth())).$d;
          } else ee && this.$d[ee](V);
          return this.init(), this;
        }, L.set = function(T, I) {
          return this.clone().$set(T, I);
        }, L.get = function(T) {
          return this[W.p(T)]();
        }, L.add = function(T, I) {
          var C, K = this;
          T = Number(T);
          var X = W.p(I), ee = function(ve) {
            var Ae = Y(K);
            return W.w(Ae.date(Ae.date() + Math.round(ve * T)), K);
          };
          if (X === f) return this.set(f, this.$M + T);
          if (X === g) return this.set(g, this.$y + T);
          if (X === c) return ee(1);
          if (X === u) return ee(7);
          var V = (C = {}, C[a] = r, C[l] = i, C[s] = n, C)[X] || 1, se = this.$d.getTime() + T * V;
          return W.w(se, this);
        }, L.subtract = function(T, I) {
          return this.add(-1 * T, I);
        }, L.format = function(T) {
          var I = this, C = this.$locale();
          if (!this.isValid()) return C.invalidDate || y;
          var K = T || "YYYY-MM-DDTHH:mm:ssZ", X = W.z(this), ee = this.$H, V = this.$m, se = this.$M, ve = C.weekdays, Ae = C.months, et = C.meridiem, tt = function(Oe, Et, d, p) {
            return Oe && (Oe[Et] || Oe(I, K)) || d[Et].slice(0, p);
          }, St = function(Oe) {
            return W.s(ee % 12 || 12, Oe, "0");
          }, ft = et || function(Oe, Et, d) {
            var p = Oe < 12 ? "AM" : "PM";
            return d ? p.toLowerCase() : p;
          };
          return K.replace(x, (function(Oe, Et) {
            return Et || (function(d) {
              switch (d) {
                case "YY":
                  return String(I.$y).slice(-2);
                case "YYYY":
                  return W.s(I.$y, 4, "0");
                case "M":
                  return se + 1;
                case "MM":
                  return W.s(se + 1, 2, "0");
                case "MMM":
                  return tt(C.monthsShort, se, Ae, 3);
                case "MMMM":
                  return tt(Ae, se);
                case "D":
                  return I.$D;
                case "DD":
                  return W.s(I.$D, 2, "0");
                case "d":
                  return String(I.$W);
                case "dd":
                  return tt(C.weekdaysMin, I.$W, ve, 2);
                case "ddd":
                  return tt(C.weekdaysShort, I.$W, ve, 3);
                case "dddd":
                  return ve[I.$W];
                case "H":
                  return String(ee);
                case "HH":
                  return W.s(ee, 2, "0");
                case "h":
                  return St(1);
                case "hh":
                  return St(2);
                case "a":
                  return ft(ee, V, true);
                case "A":
                  return ft(ee, V, false);
                case "m":
                  return String(V);
                case "mm":
                  return W.s(V, 2, "0");
                case "s":
                  return String(I.$s);
                case "ss":
                  return W.s(I.$s, 2, "0");
                case "SSS":
                  return W.s(I.$ms, 3, "0");
                case "Z":
                  return X;
              }
              return null;
            })(Oe) || X.replace(":", "");
          }));
        }, L.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, L.diff = function(T, I, C) {
          var K, X = this, ee = W.p(I), V = Y(T), se = (V.utcOffset() - this.utcOffset()) * r, ve = this - V, Ae = function() {
            return W.m(X, V);
          };
          switch (ee) {
            case g:
              K = Ae() / 12;
              break;
            case f:
              K = Ae();
              break;
            case h:
              K = Ae() / 3;
              break;
            case u:
              K = (ve - se) / 6048e5;
              break;
            case c:
              K = (ve - se) / 864e5;
              break;
            case l:
              K = ve / i;
              break;
            case a:
              K = ve / r;
              break;
            case s:
              K = ve / n;
              break;
            default:
              K = ve;
          }
          return C ? K : W.a(K);
        }, L.daysInMonth = function() {
          return this.endOf(f).$D;
        }, L.$locale = function() {
          return H[this.$L];
        }, L.locale = function(T, I) {
          if (!T) return this.$L;
          var C = this.clone(), K = J(T, I, true);
          return K && (C.$L = K), C;
        }, L.clone = function() {
          return W.w(this.$d, this);
        }, L.toDate = function() {
          return new Date(this.valueOf());
        }, L.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, L.toISOString = function() {
          return this.$d.toISOString();
        }, L.toString = function() {
          return this.$d.toUTCString();
        }, U;
      })(), ae = D.prototype;
      return Y.prototype = ae, [["$ms", o], ["$s", s], ["$m", a], ["$H", l], ["$W", c], ["$M", f], ["$y", g], ["$D", v]].forEach((function(U) {
        ae[U[1]] = function(L) {
          return this.$g(L, U[0], U[1]);
        };
      })), Y.extend = function(U, L) {
        return U.$i || (U(L, D, Y), U.$i = true), Y;
      }, Y.locale = J, Y.isDayjs = pe, Y.unix = function(U) {
        return Y(1e3 * U);
      }, Y.en = H[B], Y.Ls = H, Y.p = {}, Y;
    }));
  })(yr)), yr.exports;
}
var sg = og();
const ag = rg(sg), lg = { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "18", fill: "none", viewBox: "0 0 36 18" };
function ug(e, t) {
  return $(), N("svg", lg, [...t[0] || (t[0] = [wp('<rect width="2" height="16" x="2" y="1" fill="#fff" opacity=".8" rx="1"><animate attributeName="opacity" begin="0s" dur="1s" repeatCount="indefinite" values="0.8;0.2;0.8"></animate><animate attributeName="y" begin="0s" dur="1s" repeatCount="indefinite" values="1;7;1"></animate><animate attributeName="height" begin="0s" dur="1s" repeatCount="indefinite" values="16;4;16"></animate></rect><rect width="2" height="16" x="8" y="1" fill="#fff" opacity=".8" rx="1"><animate attributeName="opacity" begin="-0.83s" dur="1s" repeatCount="indefinite" values="0.8;0.2;0.8"></animate><animate attributeName="y" begin="-0.83s" dur="1s" repeatCount="indefinite" values="1;7;1"></animate><animate attributeName="height" begin="-0.83s" dur="1s" repeatCount="indefinite" values="16;4;16"></animate></rect><rect width="2" height="16" x="14" y="1" fill="#fff" opacity=".8" rx="1"><animate attributeName="opacity" begin="-0.68s" dur="1s" repeatCount="indefinite" values="0.8;0.2;0.8"></animate><animate attributeName="y" begin="-0.68s" dur="1s" repeatCount="indefinite" values="1;7;1"></animate><animate attributeName="height" begin="-0.68s" dur="1s" repeatCount="indefinite" values="16;4;16"></animate></rect><rect width="2" height="16" x="20" y="1" fill="#fff" opacity=".8" rx="1"><animate attributeName="opacity" begin="-0.52s" dur="1s" repeatCount="indefinite" values="0.8;0.2;0.8"></animate><animate attributeName="y" begin="-0.52s" dur="1s" repeatCount="indefinite" values="1;7;1"></animate><animate attributeName="height" begin="-0.52s" dur="1s" repeatCount="indefinite" values="16;4;16"></animate></rect><rect width="2" height="16" x="26" y="1" fill="#fff" opacity=".8" rx="1"><animate attributeName="opacity" begin="-0.34s" dur="1s" repeatCount="indefinite" values="0.8;0.2;0.8"></animate><animate attributeName="y" begin="-0.34s" dur="1s" repeatCount="indefinite" values="1;7;1"></animate><animate attributeName="height" begin="-0.34s" dur="1s" repeatCount="indefinite" values="16;4;16"></animate></rect><rect width="2" height="16" x="32" y="1" fill="#fff" opacity=".8" rx="1"><animate attributeName="opacity" begin="-0.17s" dur="1s" repeatCount="indefinite" values="0.8;0.2;0.8"></animate><animate attributeName="y" begin="-0.17s" dur="1s" repeatCount="indefinite" values="1;7;1"></animate><animate attributeName="height" begin="-0.17s" dur="1s" repeatCount="indefinite" values="16;4;16"></animate></rect>', 6)])]);
}
const cg = { render: ug }, fg = { class: "loading" }, dg = Ve({ __name: "Loading", setup(e) {
  return (t, n) => ($(), N("div", fg, [de(ue(cg))]));
} }), hg = Ze(dg, [["__scopeId", "data-v-e02f67a1"]]), pg = { class: "feedback-history" }, vg = { class: "sender" }, gg = { class: "content" }, mg = { key: 0, class: "images" }, _g = ["onClick"], yg = ["src"], bg = { class: "date" }, wg = { key: 1, class: "empty" }, Sg = Ve({ __name: "FeedbackHistory", setup(e) {
  const t = Ee([]), n = Ee(false);
  async function r() {
    const o = await Me(Pe.request).requestHttp({ method: "GET", url: "https://api.qishui.com/feedback/3/list/", query: { aid: String(386088), count: "50", appkey: "luna_pc" }, responseType: "json", withTTCommonParams: true });
    t.value = [];
    for (const s of o.data.data) {
      const l = JSON.parse(s.user_extra ?? "{}").data ?? (s.content.includes("\u53CD\u9988\u5185\u5BB9\uFF1A") ? s.content?.split("\u53CD\u9988\u5185\u5BB9\uFF1A")?.[1] : s.content) ?? "", c = s.image_list?.map((f) => f.image_url) ?? [], u = s.type === 0 ? "\u6211" : "\u6C7D\u6C34\u5BA2\u670D";
      t.value.push({ content: l, images: c, date: ag(Number.parseInt(s.pub_date) * 1e3).format("YYYY-MM-DD"), sender: u });
    }
    n.value = true;
  }
  r();
  function i(o) {
    Me(Pe.utils).openUrl(o);
  }
  return (o, s) => ($(), N("div", pg, [n.value ? ($(), N(ye, { key: 0 }, [t.value.length > 0 ? ($(true), N(ye, { key: 0 }, Wt(t.value, (a, l) => ($(), N("div", { key: l, class: "feedback-item" }, [z("div", vg, Fe(a.sender), 1), z("div", gg, [($(true), N(ye, null, Wt(a.content.split(`
`).filter((c) => c.trim()), (c, u) => ($(), N("p", { key: u }, Fe(c), 1))), 128))]), a.images.length > 0 ? ($(), N("div", mg, [($(true), N(ye, null, Wt(a.images, (c, u) => ($(), N("div", { key: u, class: "image", onClick: (f) => i(c) }, [z("img", { src: c }, null, 8, yg)], 8, _g))), 128))])) : xe("", true), z("div", bg, Fe(a.date), 1)]))), 128)) : ($(), N("p", wg, " \u6682\u65E0\u53CD\u9988\u8BB0\u5F55 "))], 64)) : ($(), je(hg, { key: 1 }))]));
} }), Eg = Ze(Sg, [["__scopeId", "data-v-b6a5b0e3"]]);
function Ru(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: xg } = Object.prototype, { getPrototypeOf: Do } = Object, { iterator: ti, toStringTag: Au } = Symbol, ni = /* @__PURE__ */ ((e) => (t) => {
  const n = xg.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ct = (e) => (e = e.toLowerCase(), (t) => ni(t) === e), ri = (e) => (t) => typeof t === e, { isArray: Tn } = Array, En = ri("undefined");
function or(e) {
  return e !== null && !En(e) && e.constructor !== null && !En(e.constructor) && Je(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Pu = ct("ArrayBuffer");
function Cg(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Pu(e.buffer), t;
}
const Tg = ri("string"), Je = ri("function"), $u = ri("number"), sr = (e) => e !== null && typeof e == "object", Og = (e) => e === true || e === false, br = (e) => {
  if (ni(e) !== "object") return false;
  const t = Do(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Au in e) && !(ti in e);
}, Rg = (e) => {
  if (!sr(e) || or(e)) return false;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return false;
  }
}, Ag = ct("Date"), Pg = ct("File"), $g = ct("Blob"), Ig = ct("FileList"), Mg = (e) => sr(e) && Je(e.pipe), Lg = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Je(e.append) && ((t = ni(e)) === "formdata" || t === "object" && Je(e.toString) && e.toString() === "[object FormData]"));
}, kg = ct("URLSearchParams"), [Dg, Ng, Fg, Ug] = ["ReadableStream", "Request", "Response", "Headers"].map(ct), jg = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ar(e, t, { allOwnKeys: n = false } = {}) {
  if (e === null || typeof e > "u") return;
  let r, i;
  if (typeof e != "object" && (e = [e]), Tn(e)) for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
  else {
    if (or(e)) return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), s = o.length;
    let a;
    for (r = 0; r < s; r++) a = o[r], t.call(null, e[a], a, e);
  }
}
function Iu(e, t) {
  if (or(e)) return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, i;
  for (; r-- > 0; ) if (i = n[r], t === i.toLowerCase()) return i;
  return null;
}
const Xt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Mu = (e) => !En(e) && e !== Xt;
function Ji() {
  const { caseless: e, skipUndefined: t } = Mu(this) && this || {}, n = {}, r = (i, o) => {
    const s = e && Iu(n, o) || o;
    br(n[s]) && br(i) ? n[s] = Ji(n[s], i) : br(i) ? n[s] = Ji({}, i) : Tn(i) ? n[s] = i.slice() : (!t || !En(i)) && (n[s] = i);
  };
  for (let i = 0, o = arguments.length; i < o; i++) arguments[i] && ar(arguments[i], r);
  return n;
}
const Bg = (e, t, n, { allOwnKeys: r } = {}) => (ar(t, (i, o) => {
  n && Je(i) ? e[o] = Ru(i, n) : e[o] = i;
}, { allOwnKeys: r }), e), Hg = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), qg = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", { value: t.prototype }), n && Object.assign(e.prototype, n);
}, Vg = (e, t, n, r) => {
  let i, o, s;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (i = Object.getOwnPropertyNames(e), o = i.length; o-- > 0; ) s = i[o], (!r || r(s, e, t)) && !a[s] && (t[s] = e[s], a[s] = true);
    e = n !== false && Do(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Wg = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, zg = (e) => {
  if (!e) return null;
  if (Tn(e)) return e;
  let t = e.length;
  if (!$u(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; ) n[t] = e[t];
  return n;
}, Kg = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Do(Uint8Array)), Jg = (e, t) => {
  const r = (e && e[ti]).call(e);
  let i;
  for (; (i = r.next()) && !i.done; ) {
    const o = i.value;
    t.call(e, o[0], o[1]);
  }
}, Gg = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; ) r.push(n);
  return r;
}, Yg = ct("HTMLFormElement"), Xg = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, r, i) {
  return r.toUpperCase() + i;
}), Xs = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Qg = ct("RegExp"), Lu = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  ar(n, (i, o) => {
    let s;
    (s = t(i, o, e)) !== false && (r[o] = s || i);
  }), Object.defineProperties(e, r);
}, Zg = (e) => {
  Lu(e, (t, n) => {
    if (Je(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1) return false;
    const r = e[n];
    if (Je(r)) {
      if (t.enumerable = false, "writable" in t) {
        t.writable = false;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, e1 = (e, t) => {
  const n = {}, r = (i) => {
    i.forEach((o) => {
      n[o] = true;
    });
  };
  return Tn(e) ? r(e) : r(String(e).split(t)), n;
}, t1 = () => {
}, n1 = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function r1(e) {
  return !!(e && Je(e.append) && e[Au] === "FormData" && e[ti]);
}
const i1 = (e) => {
  const t = new Array(10), n = (r, i) => {
    if (sr(r)) {
      if (t.indexOf(r) >= 0) return;
      if (or(r)) return r;
      if (!("toJSON" in r)) {
        t[i] = r;
        const o = Tn(r) ? [] : {};
        return ar(r, (s, a) => {
          const l = n(s, i + 1);
          !En(l) && (o[a] = l);
        }), t[i] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, o1 = ct("AsyncFunction"), s1 = (e) => e && (sr(e) || Je(e)) && Je(e.then) && Je(e.catch), ku = ((e, t) => e ? setImmediate : t ? ((n, r) => (Xt.addEventListener("message", ({ source: i, data: o }) => {
  i === Xt && o === n && r.length && r.shift()();
}, false), (i) => {
  r.push(i), Xt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(typeof setImmediate == "function", Je(Xt.postMessage)), a1 = typeof queueMicrotask < "u" ? queueMicrotask.bind(Xt) : typeof process < "u" && process.nextTick || ku, l1 = (e) => e != null && Je(e[ti]), _ = { isArray: Tn, isArrayBuffer: Pu, isBuffer: or, isFormData: Lg, isArrayBufferView: Cg, isString: Tg, isNumber: $u, isBoolean: Og, isObject: sr, isPlainObject: br, isEmptyObject: Rg, isReadableStream: Dg, isRequest: Ng, isResponse: Fg, isHeaders: Ug, isUndefined: En, isDate: Ag, isFile: Pg, isBlob: $g, isRegExp: Qg, isFunction: Je, isStream: Mg, isURLSearchParams: kg, isTypedArray: Kg, isFileList: Ig, forEach: ar, merge: Ji, extend: Bg, trim: jg, stripBOM: Hg, inherits: qg, toFlatObject: Vg, kindOf: ni, kindOfTest: ct, endsWith: Wg, toArray: zg, forEachEntry: Jg, matchAll: Gg, isHTMLForm: Yg, hasOwnProperty: Xs, hasOwnProp: Xs, reduceDescriptors: Lu, freezeMethods: Zg, toObjectSet: e1, toCamelCase: Xg, noop: t1, toFiniteNumber: n1, findKey: Iu, global: Xt, isContextDefined: Mu, isSpecCompliantForm: r1, toJSONObject: i1, isAsyncFn: o1, isThenable: s1, setImmediate: ku, asap: a1, isIterable: l1 };
function ie(e, t, n, r, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status ? i.status : null);
}
_.inherits(ie, Error, { toJSON: function() {
  return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: _.toJSONObject(this.config), code: this.code, status: this.status };
} });
const Du = ie.prototype, Nu = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((e) => {
  Nu[e] = { value: e };
});
Object.defineProperties(ie, Nu);
Object.defineProperty(Du, "isAxiosError", { value: true });
ie.from = (e, t, n, r, i, o) => {
  const s = Object.create(Du);
  _.toFlatObject(e, s, function(u) {
    return u !== Error.prototype;
  }, (c) => c !== "isAxiosError");
  const a = e && e.message ? e.message : "Error", l = t == null && e ? e.code : t;
  return ie.call(s, a, l, n, r, i), e && s.cause == null && Object.defineProperty(s, "cause", { value: e, configurable: true }), s.name = e && e.name || "Error", o && Object.assign(s, o), s;
};
const u1 = null;
function Gi(e) {
  return _.isPlainObject(e) || _.isArray(e);
}
function Fu(e) {
  return _.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Qs(e, t, n) {
  return e ? e.concat(t).map(function(i, o) {
    return i = Fu(i), !n && o ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function c1(e) {
  return _.isArray(e) && !e.some(Gi);
}
const f1 = _.toFlatObject(_, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function ii(e, t, n) {
  if (!_.isObject(e)) throw new TypeError("target must be an object");
  t = t || new FormData(), n = _.toFlatObject(n, { metaTokens: true, dots: false, indexes: false }, false, function(y, E) {
    return !_.isUndefined(E[y]);
  });
  const r = n.metaTokens, i = n.visitor || u, o = n.dots, s = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && _.isSpecCompliantForm(t);
  if (!_.isFunction(i)) throw new TypeError("visitor must be a function");
  function c(v) {
    if (v === null) return "";
    if (_.isDate(v)) return v.toISOString();
    if (_.isBoolean(v)) return v.toString();
    if (!l && _.isBlob(v)) throw new ie("Blob is not supported. Use a Buffer instead.");
    return _.isArrayBuffer(v) || _.isTypedArray(v) ? l && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v;
  }
  function u(v, y, E) {
    let x = v;
    if (v && !E && typeof v == "object") {
      if (_.endsWith(y, "{}")) y = r ? y : y.slice(0, -2), v = JSON.stringify(v);
      else if (_.isArray(v) && c1(v) || (_.isFileList(v) || _.endsWith(y, "[]")) && (x = _.toArray(v))) return y = Fu(y), x.forEach(function(m, w) {
        !(_.isUndefined(m) || m === null) && t.append(s === true ? Qs([y], w, o) : s === null ? y : y + "[]", c(m));
      }), false;
    }
    return Gi(v) ? true : (t.append(Qs(E, y, o), c(v)), false);
  }
  const f = [], h = Object.assign(f1, { defaultVisitor: u, convertValue: c, isVisitable: Gi });
  function g(v, y) {
    if (!_.isUndefined(v)) {
      if (f.indexOf(v) !== -1) throw Error("Circular reference detected in " + y.join("."));
      f.push(v), _.forEach(v, function(x, S) {
        (!(_.isUndefined(x) || x === null) && i.call(t, x, _.isString(S) ? S.trim() : S, y, h)) === true && g(x, y ? y.concat(S) : [S]);
      }), f.pop();
    }
  }
  if (!_.isObject(e)) throw new TypeError("data must be an object");
  return g(e), t;
}
function Zs(e) {
  const t = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function No(e, t) {
  this._pairs = [], e && ii(e, this, t);
}
const Uu = No.prototype;
Uu.append = function(t, n) {
  this._pairs.push([t, n]);
};
Uu.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Zs);
  } : Zs;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function d1(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function ju(e, t, n) {
  if (!t) return e;
  const r = n && n.encode || d1;
  _.isFunction(n) && (n = { serialize: n });
  const i = n && n.serialize;
  let o;
  if (i ? o = i(t, n) : o = _.isURLSearchParams(t) ? t.toString() : new No(t, n).toString(r), o) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class ea {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return this.handlers.push({ fulfilled: t, rejected: n, synchronous: r ? r.synchronous : false, runWhen: r ? r.runWhen : null }), this.handlers.length - 1;
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    _.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Bu = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false }, h1 = typeof URLSearchParams < "u" ? URLSearchParams : No, p1 = typeof FormData < "u" ? FormData : null, v1 = typeof Blob < "u" ? Blob : null, g1 = { isBrowser: true, classes: { URLSearchParams: h1, FormData: p1, Blob: v1 }, protocols: ["http", "https", "file", "blob", "url", "data"] }, Fo = typeof window < "u" && typeof document < "u", Yi = typeof navigator == "object" && navigator || void 0, m1 = Fo && (!Yi || ["ReactNative", "NativeScript", "NS"].indexOf(Yi.product) < 0), _1 = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", y1 = Fo && window.location.href || "http://localhost", b1 = Object.freeze(Object.defineProperty({ __proto__: null, hasBrowserEnv: Fo, hasStandardBrowserEnv: m1, hasStandardBrowserWebWorkerEnv: _1, navigator: Yi, origin: y1 }, Symbol.toStringTag, { value: "Module" })), Ne = { ...b1, ...g1 };
function w1(e, t) {
  return ii(e, new Ne.classes.URLSearchParams(), { visitor: function(n, r, i, o) {
    return Ne.isNode && _.isBuffer(n) ? (this.append(r, n.toString("base64")), false) : o.defaultVisitor.apply(this, arguments);
  }, ...t });
}
function S1(e) {
  return _.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function E1(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const i = n.length;
  let o;
  for (r = 0; r < i; r++) o = n[r], t[o] = e[o];
  return t;
}
function Hu(e) {
  function t(n, r, i, o) {
    let s = n[o++];
    if (s === "__proto__") return true;
    const a = Number.isFinite(+s), l = o >= n.length;
    return s = !s && _.isArray(i) ? i.length : s, l ? (_.hasOwnProp(i, s) ? i[s] = [i[s], r] : i[s] = r, !a) : ((!i[s] || !_.isObject(i[s])) && (i[s] = []), t(n, r, i[s], o) && _.isArray(i[s]) && (i[s] = E1(i[s])), !a);
  }
  if (_.isFormData(e) && _.isFunction(e.entries)) {
    const n = {};
    return _.forEachEntry(e, (r, i) => {
      t(S1(r), i, n, 0);
    }), n;
  }
  return null;
}
function x1(e, t, n) {
  if (_.isString(e)) try {
    return (t || JSON.parse)(e), _.trim(e);
  } catch (r) {
    if (r.name !== "SyntaxError") throw r;
  }
  return (n || JSON.stringify)(e);
}
const lr = { transitional: Bu, adapter: ["xhr", "http", "fetch"], transformRequest: [function(t, n) {
  const r = n.getContentType() || "", i = r.indexOf("application/json") > -1, o = _.isObject(t);
  if (o && _.isHTMLForm(t) && (t = new FormData(t)), _.isFormData(t)) return i ? JSON.stringify(Hu(t)) : t;
  if (_.isArrayBuffer(t) || _.isBuffer(t) || _.isStream(t) || _.isFile(t) || _.isBlob(t) || _.isReadableStream(t)) return t;
  if (_.isArrayBufferView(t)) return t.buffer;
  if (_.isURLSearchParams(t)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), t.toString();
  let a;
  if (o) {
    if (r.indexOf("application/x-www-form-urlencoded") > -1) return w1(t, this.formSerializer).toString();
    if ((a = _.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
      const l = this.env && this.env.FormData;
      return ii(a ? { "files[]": t } : t, l && new l(), this.formSerializer);
    }
  }
  return o || i ? (n.setContentType("application/json", false), x1(t)) : t;
}], transformResponse: [function(t) {
  const n = this.transitional || lr.transitional, r = n && n.forcedJSONParsing, i = this.responseType === "json";
  if (_.isResponse(t) || _.isReadableStream(t)) return t;
  if (t && _.isString(t) && (r && !this.responseType || i)) {
    const s = !(n && n.silentJSONParsing) && i;
    try {
      return JSON.parse(t, this.parseReviver);
    } catch (a) {
      if (s) throw a.name === "SyntaxError" ? ie.from(a, ie.ERR_BAD_RESPONSE, this, null, this.response) : a;
    }
  }
  return t;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: Ne.classes.FormData, Blob: Ne.classes.Blob }, validateStatus: function(t) {
  return t >= 200 && t < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
_.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  lr.headers[e] = {};
});
const C1 = _.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), T1 = (e) => {
  const t = {};
  let n, r, i;
  return e && e.split(`
`).forEach(function(s) {
    i = s.indexOf(":"), n = s.substring(0, i).trim().toLowerCase(), r = s.substring(i + 1).trim(), !(!n || t[n] && C1[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, ta = Symbol("internals");
function Mn(e) {
  return e && String(e).trim().toLowerCase();
}
function wr(e) {
  return e === false || e == null ? e : _.isArray(e) ? e.map(wr) : String(e);
}
function O1(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); ) t[r[1]] = r[2];
  return t;
}
const R1 = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Si(e, t, n, r, i) {
  if (_.isFunction(r)) return r.call(this, t, n);
  if (i && (t = n), !!_.isString(t)) {
    if (_.isString(r)) return t.indexOf(r) !== -1;
    if (_.isRegExp(r)) return r.test(t);
  }
}
function A1(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function P1(e, t) {
  const n = _.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, { value: function(i, o, s) {
      return this[r].call(this, t, i, o, s);
    }, configurable: true });
  });
}
let Ge = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function o(a, l, c) {
      const u = Mn(l);
      if (!u) throw new Error("header name must be a non-empty string");
      const f = _.findKey(i, u);
      (!f || i[f] === void 0 || c === true || c === void 0 && i[f] !== false) && (i[f || l] = wr(a));
    }
    const s = (a, l) => _.forEach(a, (c, u) => o(c, u, l));
    if (_.isPlainObject(t) || t instanceof this.constructor) s(t, n);
    else if (_.isString(t) && (t = t.trim()) && !R1(t)) s(T1(t), n);
    else if (_.isObject(t) && _.isIterable(t)) {
      let a = {}, l, c;
      for (const u of t) {
        if (!_.isArray(u)) throw TypeError("Object iterator must return a key-value pair");
        a[c = u[0]] = (l = a[c]) ? _.isArray(l) ? [...l, u[1]] : [l, u[1]] : u[1];
      }
      s(a, n);
    } else t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Mn(t), t) {
      const r = _.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n) return i;
        if (n === true) return O1(i);
        if (_.isFunction(n)) return n.call(this, i, r);
        if (_.isRegExp(n)) return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Mn(t), t) {
      const r = _.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Si(this, this[r], r, n)));
    }
    return false;
  }
  delete(t, n) {
    const r = this;
    let i = false;
    function o(s) {
      if (s = Mn(s), s) {
        const a = _.findKey(r, s);
        a && (!n || Si(r, r[a], a, n)) && (delete r[a], i = true);
      }
    }
    return _.isArray(t) ? t.forEach(o) : o(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, i = false;
    for (; r--; ) {
      const o = n[r];
      (!t || Si(this, this[o], o, t, true)) && (delete this[o], i = true);
    }
    return i;
  }
  normalize(t) {
    const n = this, r = {};
    return _.forEach(this, (i, o) => {
      const s = _.findKey(r, o);
      if (s) {
        n[s] = wr(i), delete n[o];
        return;
      }
      const a = t ? A1(o) : String(o).trim();
      a !== o && delete n[o], n[a] = wr(i), r[a] = true;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return _.forEach(this, (r, i) => {
      r != null && r !== false && (n[i] = t && _.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[ta] = this[ta] = { accessors: {} }).accessors, i = this.prototype;
    function o(s) {
      const a = Mn(s);
      r[a] || (P1(i, s), r[a] = true);
    }
    return _.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
Ge.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
_.reduceDescriptors(Ge.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return { get: () => e, set(r) {
    this[n] = r;
  } };
});
_.freezeMethods(Ge);
function Ei(e, t) {
  const n = this || lr, r = t || n, i = Ge.from(r.headers);
  let o = r.data;
  return _.forEach(e, function(a) {
    o = a.call(n, o, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), o;
}
function qu(e) {
  return !!(e && e.__CANCEL__);
}
function On(e, t, n) {
  ie.call(this, e ?? "canceled", ie.ERR_CANCELED, t, n), this.name = "CanceledError";
}
_.inherits(On, ie, { __CANCEL__: true });
function Vu(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new ie("Request failed with status code " + n.status, [ie.ERR_BAD_REQUEST, ie.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n));
}
function $1(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function I1(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let i = 0, o = 0, s;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const c = Date.now(), u = r[o];
    s || (s = c), n[i] = l, r[i] = c;
    let f = o, h = 0;
    for (; f !== i; ) h += n[f++], f = f % e;
    if (i = (i + 1) % e, i === o && (o = (o + 1) % e), c - s < t) return;
    const g = u && c - u;
    return g ? Math.round(h * 1e3 / g) : void 0;
  };
}
function M1(e, t) {
  let n = 0, r = 1e3 / t, i, o;
  const s = (c, u = Date.now()) => {
    n = u, i = null, o && (clearTimeout(o), o = null), e(...c);
  };
  return [(...c) => {
    const u = Date.now(), f = u - n;
    f >= r ? s(c, u) : (i = c, o || (o = setTimeout(() => {
      o = null, s(i);
    }, r - f)));
  }, () => i && s(i)];
}
const Fr = (e, t, n = 3) => {
  let r = 0;
  const i = I1(50, 250);
  return M1((o) => {
    const s = o.loaded, a = o.lengthComputable ? o.total : void 0, l = s - r, c = i(l), u = s <= a;
    r = s;
    const f = { loaded: s, total: a, progress: a ? s / a : void 0, bytes: l, rate: c || void 0, estimated: c && a && u ? (a - s) / c : void 0, event: o, lengthComputable: a != null, [t ? "download" : "upload"]: true };
    e(f);
  }, n);
}, na = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
}, ra = (e) => (...t) => _.asap(() => e(...t)), L1 = Ne.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Ne.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(new URL(Ne.origin), Ne.navigator && /(msie|trident)/i.test(Ne.navigator.userAgent)) : () => true, k1 = Ne.hasStandardBrowserEnv ? { write(e, t, n, r, i, o, s) {
  if (typeof document > "u") return;
  const a = [`${e}=${encodeURIComponent(t)}`];
  _.isNumber(n) && a.push(`expires=${new Date(n).toUTCString()}`), _.isString(r) && a.push(`path=${r}`), _.isString(i) && a.push(`domain=${i}`), o === true && a.push("secure"), _.isString(s) && a.push(`SameSite=${s}`), document.cookie = a.join("; ");
}, read(e) {
  if (typeof document > "u") return null;
  const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
  return t ? decodeURIComponent(t[1]) : null;
}, remove(e) {
  this.write(e, "", Date.now() - 864e5, "/");
} } : { write() {
}, read() {
  return null;
}, remove() {
} };
function D1(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function N1(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Wu(e, t, n) {
  let r = !D1(t);
  return e && (r || n == false) ? N1(e, t) : t;
}
const ia = (e) => e instanceof Ge ? { ...e } : e;
function rn(e, t) {
  t = t || {};
  const n = {};
  function r(c, u, f, h) {
    return _.isPlainObject(c) && _.isPlainObject(u) ? _.merge.call({ caseless: h }, c, u) : _.isPlainObject(u) ? _.merge({}, u) : _.isArray(u) ? u.slice() : u;
  }
  function i(c, u, f, h) {
    if (_.isUndefined(u)) {
      if (!_.isUndefined(c)) return r(void 0, c, f, h);
    } else return r(c, u, f, h);
  }
  function o(c, u) {
    if (!_.isUndefined(u)) return r(void 0, u);
  }
  function s(c, u) {
    if (_.isUndefined(u)) {
      if (!_.isUndefined(c)) return r(void 0, c);
    } else return r(void 0, u);
  }
  function a(c, u, f) {
    if (f in t) return r(c, u);
    if (f in e) return r(void 0, c);
  }
  const l = { url: o, method: o, data: o, baseURL: s, transformRequest: s, transformResponse: s, paramsSerializer: s, timeout: s, timeoutMessage: s, withCredentials: s, withXSRFToken: s, adapter: s, responseType: s, xsrfCookieName: s, xsrfHeaderName: s, onUploadProgress: s, onDownloadProgress: s, decompress: s, maxContentLength: s, maxBodyLength: s, beforeRedirect: s, transport: s, httpAgent: s, httpsAgent: s, cancelToken: s, socketPath: s, responseEncoding: s, validateStatus: a, headers: (c, u, f) => i(ia(c), ia(u), f, true) };
  return _.forEach(Object.keys({ ...e, ...t }), function(u) {
    const f = l[u] || i, h = f(e[u], t[u], u);
    _.isUndefined(h) && f !== a || (n[u] = h);
  }), n;
}
const zu = (e) => {
  const t = rn({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: i, xsrfCookieName: o, headers: s, auth: a } = t;
  if (t.headers = s = Ge.from(s), t.url = ju(Wu(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && s.set("Authorization", "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))), _.isFormData(n)) {
    if (Ne.hasStandardBrowserEnv || Ne.hasStandardBrowserWebWorkerEnv) s.setContentType(void 0);
    else if (_.isFunction(n.getHeaders)) {
      const l = n.getHeaders(), c = ["content-type", "content-length"];
      Object.entries(l).forEach(([u, f]) => {
        c.includes(u.toLowerCase()) && s.set(u, f);
      });
    }
  }
  if (Ne.hasStandardBrowserEnv && (r && _.isFunction(r) && (r = r(t)), r || r !== false && L1(t.url))) {
    const l = i && o && k1.read(o);
    l && s.set(i, l);
  }
  return t;
}, F1 = typeof XMLHttpRequest < "u", U1 = F1 && function(e) {
  return new Promise(function(n, r) {
    const i = zu(e);
    let o = i.data;
    const s = Ge.from(i.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: c } = i, u, f, h, g, v;
    function y() {
      g && g(), v && v(), i.cancelToken && i.cancelToken.unsubscribe(u), i.signal && i.signal.removeEventListener("abort", u);
    }
    let E = new XMLHttpRequest();
    E.open(i.method.toUpperCase(), i.url, true), E.timeout = i.timeout;
    function x() {
      if (!E) return;
      const m = Ge.from("getAllResponseHeaders" in E && E.getAllResponseHeaders()), B = { data: !a || a === "text" || a === "json" ? E.responseText : E.response, status: E.status, statusText: E.statusText, headers: m, config: e, request: E };
      Vu(function(re) {
        n(re), y();
      }, function(re) {
        r(re), y();
      }, B), E = null;
    }
    "onloadend" in E ? E.onloadend = x : E.onreadystatechange = function() {
      !E || E.readyState !== 4 || E.status === 0 && !(E.responseURL && E.responseURL.indexOf("file:") === 0) || setTimeout(x);
    }, E.onabort = function() {
      E && (r(new ie("Request aborted", ie.ECONNABORTED, e, E)), E = null);
    }, E.onerror = function(w) {
      const B = w && w.message ? w.message : "Network Error", H = new ie(B, ie.ERR_NETWORK, e, E);
      H.event = w || null, r(H), E = null;
    }, E.ontimeout = function() {
      let w = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const B = i.transitional || Bu;
      i.timeoutErrorMessage && (w = i.timeoutErrorMessage), r(new ie(w, B.clarifyTimeoutError ? ie.ETIMEDOUT : ie.ECONNABORTED, e, E)), E = null;
    }, o === void 0 && s.setContentType(null), "setRequestHeader" in E && _.forEach(s.toJSON(), function(w, B) {
      E.setRequestHeader(B, w);
    }), _.isUndefined(i.withCredentials) || (E.withCredentials = !!i.withCredentials), a && a !== "json" && (E.responseType = i.responseType), c && ([h, v] = Fr(c, true), E.addEventListener("progress", h)), l && E.upload && ([f, g] = Fr(l), E.upload.addEventListener("progress", f), E.upload.addEventListener("loadend", g)), (i.cancelToken || i.signal) && (u = (m) => {
      E && (r(!m || m.type ? new On(null, e, E) : m), E.abort(), E = null);
    }, i.cancelToken && i.cancelToken.subscribe(u), i.signal && (i.signal.aborted ? u() : i.signal.addEventListener("abort", u)));
    const S = $1(i.url);
    if (S && Ne.protocols.indexOf(S) === -1) {
      r(new ie("Unsupported protocol " + S + ":", ie.ERR_BAD_REQUEST, e));
      return;
    }
    E.send(o || null);
  });
}, j1 = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), i;
    const o = function(c) {
      if (!i) {
        i = true, a();
        const u = c instanceof Error ? c : this.reason;
        r.abort(u instanceof ie ? u : new On(u instanceof Error ? u.message : u));
      }
    };
    let s = t && setTimeout(() => {
      s = null, o(new ie(`timeout ${t} of ms exceeded`, ie.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (s && clearTimeout(s), s = null, e.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(o) : c.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((c) => c.addEventListener("abort", o));
    const { signal: l } = r;
    return l.unsubscribe = () => _.asap(a), l;
  }
}, B1 = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, i;
  for (; r < n; ) i = r + t, yield e.slice(r, i), r = i;
}, H1 = async function* (e, t) {
  for await (const n of q1(e)) yield* B1(n, t);
}, q1 = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n) break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, oa = (e, t, n, r) => {
  const i = H1(e, t);
  let o = 0, s, a = (l) => {
    s || (s = true, r && r(l));
  };
  return new ReadableStream({ async pull(l) {
    try {
      const { done: c, value: u } = await i.next();
      if (c) {
        a(), l.close();
        return;
      }
      let f = u.byteLength;
      if (n) {
        let h = o += f;
        n(h);
      }
      l.enqueue(new Uint8Array(u));
    } catch (c) {
      throw a(c), c;
    }
  }, cancel(l) {
    return a(l), i.return();
  } }, { highWaterMark: 2 });
}, sa = 64 * 1024, { isFunction: vr } = _, V1 = (({ Request: e, Response: t }) => ({ Request: e, Response: t }))(_.global), { ReadableStream: aa, TextEncoder: la } = _.global, ua = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return false;
  }
}, W1 = (e) => {
  e = _.merge.call({ skipUndefined: true }, V1, e);
  const { fetch: t, Request: n, Response: r } = e, i = t ? vr(t) : typeof fetch == "function", o = vr(n), s = vr(r);
  if (!i) return false;
  const a = i && vr(aa), l = i && (typeof la == "function" ? /* @__PURE__ */ ((v) => (y) => v.encode(y))(new la()) : async (v) => new Uint8Array(await new n(v).arrayBuffer())), c = o && a && ua(() => {
    let v = false;
    const y = new n(Ne.origin, { body: new aa(), method: "POST", get duplex() {
      return v = true, "half";
    } }).headers.has("Content-Type");
    return v && !y;
  }), u = s && a && ua(() => _.isReadableStream(new r("").body)), f = { stream: u && ((v) => v.body) };
  i && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((v) => {
    !f[v] && (f[v] = (y, E) => {
      let x = y && y[v];
      if (x) return x.call(y);
      throw new ie(`Response type '${v}' is not supported`, ie.ERR_NOT_SUPPORT, E);
    });
  });
  const h = async (v) => {
    if (v == null) return 0;
    if (_.isBlob(v)) return v.size;
    if (_.isSpecCompliantForm(v)) return (await new n(Ne.origin, { method: "POST", body: v }).arrayBuffer()).byteLength;
    if (_.isArrayBufferView(v) || _.isArrayBuffer(v)) return v.byteLength;
    if (_.isURLSearchParams(v) && (v = v + ""), _.isString(v)) return (await l(v)).byteLength;
  }, g = async (v, y) => {
    const E = _.toFiniteNumber(v.getContentLength());
    return E ?? h(y);
  };
  return async (v) => {
    let { url: y, method: E, data: x, signal: S, cancelToken: m, timeout: w, onDownloadProgress: B, onUploadProgress: H, responseType: re, headers: pe, withCredentials: J = "same-origin", fetchOptions: Y } = zu(v), W = t || fetch;
    re = re ? (re + "").toLowerCase() : "text";
    let D = j1([S, m && m.toAbortSignal()], w), ae = null;
    const U = D && D.unsubscribe && (() => {
      D.unsubscribe();
    });
    let L;
    try {
      if (H && c && E !== "get" && E !== "head" && (L = await g(pe, x)) !== 0) {
        let ee = new n(y, { method: "POST", body: x, duplex: "half" }), V;
        if (_.isFormData(x) && (V = ee.headers.get("content-type")) && pe.setContentType(V), ee.body) {
          const [se, ve] = na(L, Fr(ra(H)));
          x = oa(ee.body, sa, se, ve);
        }
      }
      _.isString(J) || (J = J ? "include" : "omit");
      const T = o && "credentials" in n.prototype, I = { ...Y, signal: D, method: E.toUpperCase(), headers: pe.normalize().toJSON(), body: x, duplex: "half", credentials: T ? J : void 0 };
      ae = o && new n(y, I);
      let C = await (o ? W(ae, Y) : W(y, I));
      const K = u && (re === "stream" || re === "response");
      if (u && (B || K && U)) {
        const ee = {};
        ["status", "statusText", "headers"].forEach((Ae) => {
          ee[Ae] = C[Ae];
        });
        const V = _.toFiniteNumber(C.headers.get("content-length")), [se, ve] = B && na(V, Fr(ra(B), true)) || [];
        C = new r(oa(C.body, sa, se, () => {
          ve && ve(), U && U();
        }), ee);
      }
      re = re || "text";
      let X = await f[_.findKey(f, re) || "text"](C, v);
      return !K && U && U(), await new Promise((ee, V) => {
        Vu(ee, V, { data: X, headers: Ge.from(C.headers), status: C.status, statusText: C.statusText, config: v, request: ae });
      });
    } catch (T) {
      throw U && U(), T && T.name === "TypeError" && /Load failed|fetch/i.test(T.message) ? Object.assign(new ie("Network Error", ie.ERR_NETWORK, v, ae), { cause: T.cause || T }) : ie.from(T, T && T.code, v, ae);
    }
  };
}, z1 = /* @__PURE__ */ new Map(), Ku = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: r, Response: i } = t, o = [r, i, n];
  let s = o.length, a = s, l, c, u = z1;
  for (; a--; ) l = o[a], c = u.get(l), c === void 0 && u.set(l, c = a ? /* @__PURE__ */ new Map() : W1(t)), u = c;
  return c;
};
Ku();
const Uo = { http: u1, xhr: U1, fetch: { get: Ku } };
_.forEach(Uo, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const ca = (e) => `- ${e}`, K1 = (e) => _.isFunction(e) || e === null || e === false;
function J1(e, t) {
  e = _.isArray(e) ? e : [e];
  const { length: n } = e;
  let r, i;
  const o = {};
  for (let s = 0; s < n; s++) {
    r = e[s];
    let a;
    if (i = r, !K1(r) && (i = Uo[(a = String(r)).toLowerCase()], i === void 0)) throw new ie(`Unknown adapter '${a}'`);
    if (i && (_.isFunction(i) || (i = i.get(t)))) break;
    o[a || "#" + s] = i;
  }
  if (!i) {
    const s = Object.entries(o).map(([l, c]) => `adapter ${l} ` + (c === false ? "is not supported by the environment" : "is not available in the build"));
    let a = n ? s.length > 1 ? `since :
` + s.map(ca).join(`
`) : " " + ca(s[0]) : "as no adapter specified";
    throw new ie("There is no suitable adapter to dispatch the request " + a, "ERR_NOT_SUPPORT");
  }
  return i;
}
const Ju = { getAdapter: J1, adapters: Uo };
function xi(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new On(null, e);
}
function fa(e) {
  return xi(e), e.headers = Ge.from(e.headers), e.data = Ei.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", false), Ju.getAdapter(e.adapter || lr.adapter, e)(e).then(function(r) {
    return xi(e), r.data = Ei.call(e, e.transformResponse, r), r.headers = Ge.from(r.headers), r;
  }, function(r) {
    return qu(r) || (xi(e), r && r.response && (r.response.data = Ei.call(e, e.transformResponse, r.response), r.response.headers = Ge.from(r.response.headers))), Promise.reject(r);
  });
}
const Gu = "1.13.2", oi = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  oi[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const da = {};
oi.transitional = function(t, n, r) {
  function i(o, s) {
    return "[Axios v" + Gu + "] Transitional option '" + o + "'" + s + (r ? ". " + r : "");
  }
  return (o, s, a) => {
    if (t === false) throw new ie(i(s, " has been removed" + (n ? " in " + n : "")), ie.ERR_DEPRECATED);
    return n && !da[s] && (da[s] = true, console.warn(i(s, " has been deprecated since v" + n + " and will be removed in the near future"))), t ? t(o, s, a) : true;
  };
};
oi.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), true);
};
function G1(e, t, n) {
  if (typeof e != "object") throw new ie("options must be an object", ie.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const o = r[i], s = t[o];
    if (s) {
      const a = e[o], l = a === void 0 || s(a, o, e);
      if (l !== true) throw new ie("option " + o + " must be " + l, ie.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== true) throw new ie("Unknown option " + o, ie.ERR_BAD_OPTION);
  }
}
const Sr = { assertOptions: G1, validators: oi }, gt = Sr.validators;
let en = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = { request: new ea(), response: new ea() };
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let i = {};
        Error.captureStackTrace ? Error.captureStackTrace(i) : i = new Error();
        const o = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? o && !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + o) : r.stack = o;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = rn(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: o } = n;
    r !== void 0 && Sr.assertOptions(r, { silentJSONParsing: gt.transitional(gt.boolean), forcedJSONParsing: gt.transitional(gt.boolean), clarifyTimeoutError: gt.transitional(gt.boolean) }, false), i != null && (_.isFunction(i) ? n.paramsSerializer = { serialize: i } : Sr.assertOptions(i, { encode: gt.function, serialize: gt.function }, true)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = true), Sr.assertOptions(n, { baseUrl: gt.spelling("baseURL"), withXsrfToken: gt.spelling("withXSRFToken") }, true), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let s = o && _.merge(o.common, o[n.method]);
    o && _.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (v) => {
      delete o[v];
    }), n.headers = Ge.concat(s, o);
    const a = [];
    let l = true;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(n) === false || (l = l && y.synchronous, a.unshift(y.fulfilled, y.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(y) {
      c.push(y.fulfilled, y.rejected);
    });
    let u, f = 0, h;
    if (!l) {
      const v = [fa.bind(this), void 0];
      for (v.unshift(...a), v.push(...c), h = v.length, u = Promise.resolve(n); f < h; ) u = u.then(v[f++], v[f++]);
      return u;
    }
    h = a.length;
    let g = n;
    for (; f < h; ) {
      const v = a[f++], y = a[f++];
      try {
        g = v(g);
      } catch (E) {
        y.call(this, E);
        break;
      }
    }
    try {
      u = fa.call(this, g);
    } catch (v) {
      return Promise.reject(v);
    }
    for (f = 0, h = c.length; f < h; ) u = u.then(c[f++], c[f++]);
    return u;
  }
  getUri(t) {
    t = rn(this.defaults, t);
    const n = Wu(t.baseURL, t.url, t.allowAbsoluteUrls);
    return ju(n, t.params, t.paramsSerializer);
  }
};
_.forEach(["delete", "get", "head", "options"], function(t) {
  en.prototype[t] = function(n, r) {
    return this.request(rn(r || {}, { method: t, url: n, data: (r || {}).data }));
  };
});
_.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(o, s, a) {
      return this.request(rn(a || {}, { method: t, headers: r ? { "Content-Type": "multipart/form-data" } : {}, url: o, data: s }));
    };
  }
  en.prototype[t] = n(), en.prototype[t + "Form"] = n(true);
});
let Y1 = class Yu {
  constructor(t) {
    if (typeof t != "function") throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](i);
      r._listeners = null;
    }), this.promise.then = (i) => {
      let o;
      const s = new Promise((a) => {
        r.subscribe(a), o = a;
      }).then(i);
      return s.cancel = function() {
        r.unsubscribe(o);
      }, s;
    }, t(function(o, s, a) {
      r.reason || (r.reason = new On(o, s, a), n(r.reason));
    });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  static source() {
    let t;
    return { token: new Yu(function(i) {
      t = i;
    }), cancel: t };
  }
};
function X1(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Q1(e) {
  return _.isObject(e) && e.isAxiosError === true;
}
const Xi = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511, WebServerIsDown: 521, ConnectionTimedOut: 522, OriginIsUnreachable: 523, TimeoutOccurred: 524, SslHandshakeFailed: 525, InvalidSslCertificate: 526 };
Object.entries(Xi).forEach(([e, t]) => {
  Xi[t] = e;
});
function Xu(e) {
  const t = new en(e), n = Ru(en.prototype.request, t);
  return _.extend(n, en.prototype, t, { allOwnKeys: true }), _.extend(n, t, null, { allOwnKeys: true }), n.create = function(i) {
    return Xu(rn(e, i));
  }, n;
}
const Te = Xu(lr);
Te.Axios = en;
Te.CanceledError = On;
Te.CancelToken = Y1;
Te.isCancel = qu;
Te.VERSION = Gu;
Te.toFormData = ii;
Te.AxiosError = ie;
Te.Cancel = Te.CanceledError;
Te.all = function(t) {
  return Promise.all(t);
};
Te.spread = X1;
Te.isAxiosError = Q1;
Te.mergeConfig = rn;
Te.AxiosHeaders = Ge;
Te.formToJSON = (e) => Hu(_.isHTMLForm(e) ? new FormData(e) : e);
Te.getAdapter = Ju.getAdapter;
Te.HttpStatusCode = Xi;
Te.default = Te;
const { Axios: gy, AxiosError: my, CanceledError: _y, isCancel: yy, CancelToken: by, VERSION: wy, all: Sy, Cancel: Ey, isAxiosError: xy, spread: Cy, toFormData: Ty, AxiosHeaders: Oy, HttpStatusCode: Ry, formToJSON: Ay, getAdapter: Py, mergeConfig: $y } = Te, Z1 = { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "none", viewBox: "0 0 24 24" };
function em(e, t) {
  return $(), N("svg", Z1, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M12 2a1 1 0 0 0-1 1v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2h-8V3a1 1 0 0 0-1-1", "clip-rule": "evenodd" }, null, -1)])]);
}
const tm = { render: em }, nm = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function rm(e, t) {
  return $(), N("svg", nm, [...t[0] || (t[0] = [z("path", { fill: "currentColor", d: "M3.577 15.315a.833.833 0 0 0 1.179 1.179L10 11.25l5.244 5.244a.833.833 0 0 0 1.179-1.179l-5.244-5.244 5.315-5.315a.833.833 0 0 0-1.178-1.179L10 8.893 4.684 3.577a.833.833 0 1 0-1.178 1.179L8.82 10.07z" }, null, -1)])]);
}
const im = { render: rm }, om = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function sm(e, t) {
  return $(), N("svg", om, [...t[0] || (t[0] = [z("path", { fill: "currentColor", d: "M44.996 19.068A13.4 13.4 0 0 0 37.823 7.52a13.34 13.34 0 0 0-12.832.252l-.145.086-.327.206a.96.96 0 0 1-1.032 0l-.24-.15-.194-.117a13.34 13.34 0 0 0-12.876-.277A13.4 13.4 0 0 0 3 19.392l.005.468c.14 5.192 3.365 10.766 8.53 16.003a50 50 0 0 0 3.326 3.075l.617.512q.464.379.923.736l.609.465q.759.57 1.488 1.066l.575.384c.738.481 1.439.895 2.08 1.227l.444.222.208.098Q22.725 44 24 44l.313-.005q1.074-.038 1.877-.345c.81-.37 1.74-.898 2.737-1.549l.575-.384.489-.339q.494-.347.999-.727l.61-.465.46-.363.462-.373.617-.512.678-.583a49 49 0 0 0 2.648-2.492c5.164-5.237 8.39-10.811 8.53-16.003l.005-.468z" }, null, -1)])]);
}
const am = { render: sm }, lm = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function um(e, t) {
  return $(), N("svg", lm, [...t[0] || (t[0] = [z("path", { stroke: "currentColor", "stroke-linejoin": "round", "stroke-width": "4", d: "M32 7c-4 0-6.5 2.5-8 4-1.5-1.5-4-4-8-4-5 0-8 2-10 5s-3.19 9.296 1 16c5 8 13 13 17 15 4-2 12-7 17-15 4.559-7.295 3-13 1-16s-5-5-10-5Z" }, null, -1)])]);
}
const cm = { render: um }, fm = { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "none", viewBox: "0 0 20 20" };
function dm(e, t) {
  return $(), N("svg", fm, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-opacity": ".85", d: "M7.917 8.333c.46 0 .833.373.833.834v4.583a.833.833 0 0 1-1.667 0V9.167c0-.46.373-.834.834-.834m4.166 0c.46 0 .834.373.834.834v4.583a.833.833 0 0 1-1.667 0V9.167c0-.46.373-.834.833-.834" }, null, -1), z("path", { fill: "currentColor", "fill-opacity": ".85", "fill-rule": "evenodd", d: "M17.917 4.167a.833.833 0 0 1 0 1.666h-1.25v8.82c0 2.29-1.919 4.097-4.218 4.097H7.55c-2.3 0-4.218-1.807-4.218-4.097v-8.82h-1.25a.833.833 0 0 1 0-1.666zM5 14.653c0 1.313 1.114 2.43 2.551 2.43h4.898c1.437 0 2.551-1.117 2.551-2.43v-8.82H5z", "clip-rule": "evenodd" }, null, -1), z("path", { fill: "currentColor", "fill-opacity": ".85", d: "M11.667 1.667a.833.833 0 0 1 0 1.666H8.333a.833.833 0 0 1 0-1.666z" }, null, -1)])]);
}
const hm = { render: dm }, pm = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function vm(e, t) {
  return $(), N("svg", pm, [...t[0] || (t[0] = [z("path", { fill: "currentColor", d: "M11 40.407V9.24c0-3.147 3.465-5.061 6.129-3.387L40.844 20.76c2.436 1.531 2.507 5.058.133 6.685L17.262 43.706c-2.654 1.82-6.262-.08-6.262-3.299" }, null, -1)])]);
}
const gm = { render: vm }, mm = { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", fill: "none", viewBox: "0 0 12 12" };
function _m(e, t) {
  return $(), N("svg", mm, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M6 1a.75.75 0 0 0-.75.75v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5A.75.75 0 0 0 6 1", "clip-rule": "evenodd" }, null, -1)])]);
}
const ym = { render: _m }, bm = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function wm(e, t) {
  return $(), N("svg", bm, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M2.917 2.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m4.166.417a.833.833 0 1 0 0 1.666h10a.833.833 0 1 0 0-1.666zM1.667 10a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0m1.25 5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m3.333-5c0-.46.373-.833.833-.833h10a.833.833 0 1 1 0 1.666h-10A.833.833 0 0 1 6.25 10m.833 5.417a.833.833 0 1 0 0 1.666h10a.833.833 0 1 0 0-1.666z", "clip-rule": "evenodd" }, null, -1)])]);
}
const Sm = { render: wm }, Em = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function xm(e, t) {
  return $(), N("svg", Em, [...t[0] || (t[0] = [z("circle", { cx: "15.834", cy: "10", r: "1.25", fill: "currentColor" }, null, -1), z("circle", { cx: "10.001", cy: "10", r: "1.25", fill: "currentColor" }, null, -1), z("circle", { cx: "4.167", cy: "10", r: "1.25", fill: "currentColor" }, null, -1)])]);
}
const Cm = { render: xm }, Tm = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Om(e, t) {
  return $(), N("svg", Tm, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-opacity": ".85", "fill-rule": "evenodd", d: "M7.5 5a2.5 2.5 0 0 1 5 0v1.667h-5zM5.833 6.669v-1.67a4.167 4.167 0 1 1 8.334 0v1.67q.32.003.579.023c.33.027.657.086.972.247a2.5 2.5 0 0 1 1.093 1.093c.16.315.22.643.247.972.025.312.025.691.025 1.13V15.7c0 .439 0 .818-.025 1.13-.027.33-.087.657-.247.973a2.5 2.5 0 0 1-1.093 1.092c-.315.16-.643.22-.972.247-.312.026-.691.026-1.13.026H6.383c-.439 0-.818 0-1.13-.026-.33-.027-.657-.086-.972-.247a2.5 2.5 0 0 1-1.093-1.092c-.16-.316-.22-.643-.247-.973a15 15 0 0 1-.025-1.13v-5.565c0-.439 0-.818.025-1.13.027-.33.086-.657.247-.972A2.5 2.5 0 0 1 4.281 6.94c.315-.16.643-.22.972-.247q.26-.02.58-.023m-.795 1.755c.042-.02.125-.052.352-.07.236-.02.546-.02 1.027-.02h7.166c.48 0 .791 0 1.027.02.226.018.31.05.352.07.156.08.284.207.364.364.02.041.052.125.07.352.02.236.02.546.02 1.027v5.5c0 .48 0 .79-.02 1.026-.018.227-.05.31-.07.352a.83.83 0 0 1-.364.364c-.042.021-.126.053-.352.071-.236.02-.546.02-1.027.02H6.417c-.48 0-.791 0-1.027-.02-.227-.018-.31-.05-.352-.07a.83.83 0 0 1-.364-.365c-.02-.041-.052-.125-.07-.352-.02-.236-.02-.546-.02-1.026v-5.5c0-.48 0-.791.02-1.027.018-.227.05-.31.07-.352a.83.83 0 0 1 .364-.364m5.795 4.686a1.666 1.666 0 1 0-1.666 0V15a.833.833 0 1 0 1.666 0z", "clip-rule": "evenodd" }, null, -1)])]);
}
const Rm = { render: Om }, Am = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Pm(e, t) {
  return $(), N("svg", Am, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M2.5 9.999a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0M10 .832a9.167 9.167 0 1 0 0 18.333A9.167 9.167 0 0 0 10 .832m0 7.083a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083m0 1.252c.46 0 .833.373.833.833v3.75a.833.833 0 0 1-1.666 0V10c0-.46.373-.833.833-.833", "clip-rule": "evenodd" }, null, -1)])]);
}
const $m = { render: Pm }, Im = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Mm(e, t) {
  return $(), N("svg", Im, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M10.342 3.049a.83.83 0 0 0-.684 0c-.037.016-.15.085-.378.415-.225.326-.489.791-.877 1.48l-4.6 8.155c-.377.668-.63 1.119-.788 1.47-.16.353-.16.482-.156.524.026.233.15.445.34.582.034.025.147.087.534.122.382.035.9.036 1.666.036h9.202c.766 0 1.284 0 1.666-.036.387-.035.5-.097.534-.122a.83.83 0 0 0 .34-.582c.005-.042.003-.17-.156-.525-.157-.35-.41-.801-.787-1.469l-4.601-8.156c-.388-.688-.652-1.153-.877-1.479-.229-.33-.341-.399-.378-.415m-1.368-1.52a2.5 2.5 0 0 1 2.052 0c.462.208.789.588 1.065.987.274.397.575.93.937 1.573l.02.035 4.601 8.156.02.035c.352.624.644 1.142.837 1.57.194.434.347.9.291 1.393a2.5 2.5 0 0 1-1.02 1.749c-.404.29-.884.386-1.357.43-.468.043-1.063.043-1.779.043H5.36c-.716 0-1.31 0-1.779-.043-.473-.044-.953-.14-1.356-.43a2.5 2.5 0 0 1-1.021-1.749c-.056-.494.097-.96.292-1.392.192-.43.484-.947.836-1.57l.02-.036 4.6-8.156.02-.035c.364-.644.664-1.176.938-1.573.276-.399.603-.78 1.065-.987m.193 5.554a.833.833 0 1 1 1.666 0v3.333a.833.833 0 0 1-1.666 0zM10 12.5a.833.833 0 1 0 0 1.666.833.833 0 0 0 0-1.666", "clip-rule": "evenodd" }, null, -1)])]);
}
const Lm = { render: Mm }, km = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Dm(e, t) {
  return $(), N("svg", km, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M13.606 13.733a6.667 6.667 0 1 0-7.213 0 11.1 11.1 0 0 0-4.731 3.221.833.833 0 0 0 1.26 1.091c1.73-1.998 4.261-3.254 7.078-3.254s5.347 1.256 7.078 3.254a.833.833 0 1 0 1.26-1.091 11.1 11.1 0 0 0-4.732-3.221M5 8.125a5 5 0 1 1 10 0 5 5 0 0 1-10 0", "clip-rule": "evenodd" }, null, -1)])]);
}
const Nm = { render: Dm }, Fm = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Um(e, t) {
  return $(), N("svg", Fm, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-opacity": ".85", "fill-rule": "evenodd", d: "m10 2.757 6.272 3.622v7.242L10 17.24l-6.272-3.62V6.379zm-.833-1.443a1.67 1.67 0 0 1 1.666 0l6.272 3.621c.516.298.833.848.833 1.444v7.242c0 .595-.317 1.145-.833 1.443l-6.272 3.621a1.67 1.67 0 0 1-1.666 0l-6.272-3.62a1.67 1.67 0 0 1-.834-1.444V6.379c0-.596.318-1.146.834-1.444zM8.333 10a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0M10 6.666a3.333 3.333 0 1 0 0 6.667 3.333 3.333 0 0 0 0-6.667", "clip-rule": "evenodd" }, null, -1)])]);
}
const jm = { render: Um }, Bm = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Hm(e, t) {
  return $(), N("svg", Bm, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m1.667 0A9.167 9.167 0 1 1 .833 10a9.167 9.167 0 0 1 18.334 0M8.257 7.568a.833.833 0 1 0-1.514.698l2.311 5.007c.373.807 1.52.807 1.892 0l2.31-5.007a.833.833 0 0 0-1.513-.698L10 11.345z", "clip-rule": "evenodd" }, null, -1), Qn(">", -1)])]);
}
const qm = { render: Hm }, Vm = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Wm(e, t) {
  return $(), N("svg", Vm, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M5.134 1.666h9.731c.44 0 .819 0 1.13.025.33.027.658.087.973.247a2.5 2.5 0 0 1 1.093 1.093c.16.315.22.643.247.972.025.313.025.692.025 1.13v.283a.833.833 0 0 1-1.666 0v-.25c0-.48-.001-.79-.02-1.027-.019-.226-.05-.31-.071-.351a.83.83 0 0 0-.364-.364c-.042-.021-.126-.053-.352-.071-.236-.02-.546-.02-1.027-.02H5.167c-.481 0-.791 0-1.027.02-.227.018-.31.05-.352.07a.83.83 0 0 0-.364.365c-.021.04-.052.125-.07.351-.02.236-.02.547-.02 1.027v9.667c0 .48 0 .79.02 1.027.018.226.049.31.07.351.08.157.207.284.364.364.041.021.125.053.352.071.236.02.546.02 1.027.02h9.666c.48 0 .79 0 1.027-.02.226-.018.31-.05.352-.07a.83.83 0 0 0 .364-.365c.02-.041.052-.125.07-.351.02-.237.02-.547.02-1.027v-.25a.833.833 0 1 1 1.667 0v.282c0 .44 0 .818-.025 1.13-.027.33-.087.657-.247.973a2.5 2.5 0 0 1-1.093 1.092c-.315.16-.643.22-.972.247-.312.026-.691.026-1.13.026H5.133c-.439 0-.818 0-1.13-.026-.33-.027-.657-.086-.972-.247a2.5 2.5 0 0 1-1.093-1.092c-.16-.316-.22-.643-.247-.973-.026-.312-.026-.69-.025-1.13V5.134c0-.44 0-.818.025-1.13.027-.33.086-.658.247-.973a2.5 2.5 0 0 1 1.093-1.093c.315-.16.643-.22.972-.247.312-.025.691-.025 1.13-.025m5.484 11.899a.833.833 0 0 1-1.178 0l-2.946-2.947a.833.833 0 0 1 0-1.178L9.44 6.494a.833.833 0 0 1 1.178 1.178L9.124 9.166H17.5a.833.833 0 1 1 0 1.667H9.065l1.553 1.553a.833.833 0 0 1 0 1.179", "clip-rule": "evenodd" }, null, -1)])]);
}
const zm = { render: Wm }, Km = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Jm(e, t) {
  return $(), N("svg", Km, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15m0 1.667A9.167 9.167 0 1 0 10 .833a9.167 9.167 0 0 0 0 18.334m0-7.5a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334m0 1.666a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666M5.619 8.486q.055-.084.095-.179l.006-.015a4.6 4.6 0 0 1 3.15-2.76l.016-.004q.098-.026.189-.07c.336-.163.574-.495.547-.874-.031-.452-.425-.799-.87-.708a6.25 6.25 0 0 0-4.66 4.082c-.147.429.144.865.589.956.372.076.732-.116.938-.428", "clip-rule": "evenodd" }, null, -1)])]);
}
const Gm = { render: Jm }, Ym = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Xm(e, t) {
  return $(), N("svg", Ym, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M11.128 3.556a.417.417 0 0 0-.712.295v1.747c0 .773-.528 1.423-1.243 1.62-2.318.644-3.793 1.49-4.767 2.713s-1.537 2.933-1.79 5.499c2.431-1.62 4.25-2.59 6.484-2.223.827.136 1.316.869 1.316 1.593v1.029c0 .366.44.554.705.301l5.82-5.555a.833.833 0 0 0 .013-1.192zm-2.378.295c0-1.856 2.244-2.785 3.556-1.473l5.827 5.827a2.5 2.5 0 0 1-.042 3.576l-5.82 5.555c-1.325 1.265-3.521.326-3.521-1.507v-.99c-1.497-.218-2.814.38-5.236 1.995-1.107.739-2.701-.06-2.563-1.502.263-2.739.878-4.842 2.151-6.44 1.28-1.606 3.134-2.588 5.626-3.28a.04.04 0 0 0 .02-.012l.002-.003z", "clip-rule": "evenodd" }, null, -1)])]);
}
const Qm = { render: Xm }, Zm = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function e_(e, t) {
  return $(), N("svg", Zm, [...t[0] || (t[0] = [z("path", { fill: "currentColor", d: "M10 1.042a5.208 5.208 0 1 0 0 10.416 5.208 5.208 0 0 0 0-10.416M6.46 6.25a3.542 3.542 0 1 1 7.083 0 3.542 3.542 0 0 1-7.083 0m11.47 4.197a.8.8 0 0 0-.324-.024l-1.667.208a.834.834 0 0 0-.73.827v4.375a1.458 1.458 0 1 1-1.458-1.458.833.833 0 0 0 0-1.667 3.124 3.124 0 1 0 3.118 3.339 1 1 0 0 0 .007-.11v-3.743l.937-.117a.833.833 0 0 0 .117-1.63M5.625 12.708a4.167 4.167 0 0 0-4.166 4.167v1.25a.833.833 0 0 0 1.666 0v-1.25a2.5 2.5 0 0 1 2.5-2.5h3.75a.834.834 0 0 0 0-1.667z" }, null, -1)])]);
}
const t_ = { render: e_ }, n_ = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function r_(e, t) {
  return $(), N("svg", n_, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M10.482 11.405A5 5 0 0 1 15.361 7.5h14.897v18.558a7 7 0 0 0-5.887 5.244l-2.209 8.834a2.46 2.46 0 0 1-4.792-1.112l1.714-8A2.5 2.5 0 0 0 16.64 28h-3.636c-3.203 0-5.58-2.97-4.879-6.095zM34.258 26H39a1 1 0 0 0 1-1V9.5a2 2 0 0 0-2-2h-3.742zM15.361 3.5a9 9 0 0 0-8.782 7.029l-2.357 10.5C2.96 26.654 7.238 32 13.004 32h1.78l-1.325 6.186C12.597 42.208 15.663 46 19.776 46a6.46 6.46 0 0 0 6.267-4.894l2.209-8.834A3 3 0 0 1 31.162 30H39a5 5 0 0 0 5-5V9.5a6 6 0 0 0-6-6z", "clip-rule": "evenodd" }, null, -1)])]);
}
const i_ = { render: r_ }, o_ = Ve({ __name: "Icon", props: { name: {} }, setup(e) {
  const t = e, n = { "collect-button": am, "collect-button-outline": cm, plus: ym, playlist: Sm, "three-points": Cm, delete: hm, "play-button": gm, lock: Rm, info: $m, report: Lm, me: Nm, settings: jm, vip: qm, logout: zm, album: Gm, share: Qm, artist: t_, dislike: i_ }, r = nn(() => n[t.name]);
  return (i, o) => ($(), je(Ao(r.value)));
} }), s_ = { key: 1, class: "placeholder" }, a_ = { key: 2, class: "content" }, l_ = Ve({ __name: "Button", props: { type: { default: "primary" }, icon: {}, iconStyle: {}, disabled: { type: Boolean }, defaultPlaceholder: { type: Boolean } }, emits: ["click"], setup(e, { emit: t }) {
  const n = t;
  return (r, i) => ($(), N("div", { class: at(["button", { [e.type]: true, disabled: e.disabled, "with-placeholder": e.defaultPlaceholder }]), onClick: i[0] || (i[0] = Ws((o) => e.disabled ? void 0 : n("click", o), ["stop"])), onDblclick: i[1] || (i[1] = Ws(() => {
  }, ["stop"])) }, [e.icon ? ($(), N("div", { key: 0, class: "icon", style: Cn(e.iconStyle) }, [de(o_, { name: e.icon }, null, 8, ["name"])], 4)) : xe("", true), e.defaultPlaceholder ? ($(), N("div", s_, [Ir(r.$slots, "placeholder", {}, void 0, true)])) : xe("", true), e.type !== "icon" ? ($(), N("div", a_, [Ir(r.$slots, "default", {}, void 0, true)])) : xe("", true)], 34));
} }), ha = Ze(l_, [["__scopeId", "data-v-9694af45"]]), u_ = { class: "wrapper" }, c_ = ["maxlength", "value"], f_ = { key: 0, class: "counter" }, d_ = Ve({ __name: "Input", props: { maxLength: {}, modelValue: {} }, emits: ["update:modelValue"], setup(e, { emit: t }) {
  const n = e, r = t, i = Ee(), o = Ee(0);
  function s() {
    o.value = (i.value?.value || "").length, r("update:modelValue", i.value?.value || "");
  }
  return (a, l) => ($(), N("div", u_, [z("input", gu({ ref_key: "inputRef", ref: i, type: "text" }, a.$attrs, { maxlength: n.maxLength, value: n.modelValue, onInput: s }), null, 16, c_), n.maxLength !== void 0 ? ($(), N("span", f_, Fe(o.value) + "/" + Fe(n.maxLength), 1)) : xe("", true)]));
} }), h_ = Ze(d_, [["__scopeId", "data-v-924acade"]]), p_ = ["maxlength", "value", "placeholder"], v_ = { key: 0, class: "counter" }, g_ = Ve({ __name: "TextArea", props: { maxLength: {}, modelValue: {}, error: { type: Boolean }, placeholder: {} }, emits: ["update:modelValue", "update"], setup(e, { emit: t }) {
  const n = e, r = t, i = Ee(), o = Ee(0);
  function s() {
    const a = i.value?.value || "";
    o.value = (i.value?.value?.trim() || "").length, r("update:modelValue", a), r("update", a);
  }
  return (a, l) => ($(), N("div", { class: at(["textarea", { error: e.error }]) }, [z("textarea", { ref_key: "textareaRef", ref: i, maxlength: n.maxLength, value: n.modelValue, spellcheck: false, placeholder: e.placeholder, onInput: s }, null, 40, p_), n.maxLength !== void 0 ? ($(), N("span", v_, Fe(o.value) + "/" + Fe(n.maxLength), 1)) : xe("", true)], 2));
} }), m_ = Ze(g_, [["__scopeId", "data-v-05d2091f"]]);
var pa;
const Qu = typeof window < "u", __ = (e) => typeof e == "string", y_ = () => {
};
Qu && ((pa = window?.navigator) != null && pa.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Zu(e) {
  return typeof e == "function" ? e() : ue(e);
}
function b_(e) {
  return e;
}
function w_(e) {
  return gl() ? (Q0(e), true) : false;
}
function S_(e) {
  var t;
  const n = Zu(e);
  return (t = n?.$el) != null ? t : n;
}
const E_ = Qu ? window : void 0;
function va(...e) {
  let t, n, r, i;
  if (__(e[0]) || Array.isArray(e[0]) ? ([n, r, i] = e, t = E_) : [t, n, r, i] = e, !t) return y_;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const o = [], s = () => {
    o.forEach((u) => u()), o.length = 0;
  }, a = (u, f, h, g) => (u.addEventListener(f, h, g), () => u.removeEventListener(f, h, g)), l = Vt(() => [S_(t), Zu(i)], ([u, f]) => {
    s(), u && o.push(...n.flatMap((h) => r.map((g) => a(u, h, g, f))));
  }, { immediate: true, flush: "post" }), c = () => {
    l(), s();
  };
  return w_(c), c;
}
const ga = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ma = "__vueuse_ssr_handlers__";
ga[ma] = ga[ma] || {};
var _a;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(_a || (_a = {}));
var x_ = Object.defineProperty, ya = Object.getOwnPropertySymbols, C_ = Object.prototype.hasOwnProperty, T_ = Object.prototype.propertyIsEnumerable, ba = (e, t, n) => t in e ? x_(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n, O_ = (e, t) => {
  for (var n in t || (t = {})) C_.call(t, n) && ba(e, n, t[n]);
  if (ya) for (var n of ya(t)) T_.call(t, n) && ba(e, n, t[n]);
  return e;
};
const R_ = { easeInSine: [0.12, 0, 0.39, 0], easeOutSine: [0.61, 1, 0.88, 1], easeInOutSine: [0.37, 0, 0.63, 1], easeInQuad: [0.11, 0, 0.5, 0], easeOutQuad: [0.5, 1, 0.89, 1], easeInOutQuad: [0.45, 0, 0.55, 1], easeInCubic: [0.32, 0, 0.67, 0], easeOutCubic: [0.33, 1, 0.68, 1], easeInOutCubic: [0.65, 0, 0.35, 1], easeInQuart: [0.5, 0, 0.75, 0], easeOutQuart: [0.25, 1, 0.5, 1], easeInOutQuart: [0.76, 0, 0.24, 1], easeInQuint: [0.64, 0, 0.78, 0], easeOutQuint: [0.22, 1, 0.36, 1], easeInOutQuint: [0.83, 0, 0.17, 1], easeInExpo: [0.7, 0, 0.84, 0], easeOutExpo: [0.16, 1, 0.3, 1], easeInOutExpo: [0.87, 0, 0.13, 1], easeInCirc: [0.55, 0, 1, 0.45], easeOutCirc: [0, 0.55, 0.45, 1], easeInOutCirc: [0.85, 0, 0.15, 1], easeInBack: [0.36, 0, 0.66, -0.56], easeOutBack: [0.34, 1.56, 0.64, 1], easeInOutBack: [0.68, -0.6, 0.32, 1.6] };
O_({ linear: b_ }, R_);
function A_(e, t, n) {
  const r = t?.width ?? 400, i = t?.height ?? r ?? 400;
  switch (n) {
    case "crop-center":
      return `${e.template_prefix}-crop-center:${r}:${i}.${t?.extname ?? "jpg"}`;
    case "resize":
      return `${e.template_prefix}-resize:${r}:${i}.${t?.extname ?? "webp"}`;
    default:
      return `${e.template_prefix}-crop-center:${r}:${i}.${t?.extname ?? "jpg"}`;
  }
}
function P_(e, t, n) {
  if (e && e.uri) {
    const r = t?.extname ?? "jpg", i = t?.width ?? 400, o = t?.height ?? i ?? 400, s = A_(e, t, n ?? "crop-center");
    return `${e?.urls?.[0]}${e.uri}~${e.template_prefix ? s : `c5_${i}x${o}.${r}`}`;
  } else return e?.urls?.[0] ? e.urls[0] : "";
}
const $_ = { xmlns: "http://www.w3.org/2000/svg", width: "88", height: "88", fill: "none", viewBox: "0 0 88 88" };
function I_(e, t) {
  return $(), N("svg", $_, [...t[0] || (t[0] = [z("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M63.456 8.116a12.1 12.1 0 0 1 8.775 2.183c2.52 1.836 4.2 4.58 4.65 7.641l.005.039.084.781.03.788v.038h-2 2l-.008 19.364-.007 19.946v1.177c-.003 7.254-5.97 13.067-13.321 13.07-7.337.003-13.38-5.793-13.377-13.062.003-7.233 5.99-13.01 13.277-13.069l.003-17.408a.79.79 0 0 0-.81-.772 1 1 0 0 0-.136.01l-28.195 4.58a.79.79 0 0 0-.678.764h-.28.28l-.005 15.725-.005 16.31v.703c-.003 7.26-6.019 13.073-13.361 13.076C13.04 80.003 6.997 74.207 7 66.938c.003-7.245 6.01-13.03 13.315-13.069l.008-29.696c.001-5.551 4.02-10.27 9.516-11.361l.03-.007.637-.105zm-31.708 26.07-2-.002c.001-2.358 1.73-4.336 4.037-4.711l28.195-4.578a5 5 0 0 1 .775-.063c2.632-.001 4.813 2.11 4.812 4.773l-.003 21.91-2.32-.378a10 10 0 0 0-1.571-.125c-5.235.002-9.384 4.115-9.386 9.07-.002 4.954 4.142 9.063 9.376 9.06 5.22-.001 9.32-4.1 9.322-9.07v-1.176l.007-19.948L73 19.624l-.022-.574-.06-.566c-.298-1.96-1.383-3.743-3.042-4.951a8.1 8.1 0 0 0-5.87-1.455L31.11 16.654l-.52.087c-3.689.746-6.265 3.88-6.266 7.433l-.01 34.211L21.987 58a10 10 0 0 0-1.602-.131c-5.234.002-9.383 4.116-9.385 9.07s4.142 9.063 9.375 9.061c5.227-.002 9.36-4.116 9.363-9.078v-.701l.005-16.31.006-15.727z", "clip-rule": "evenodd" }, null, -1)])]);
}
const M_ = { render: I_ }, L_ = { xmlns: "http://www.w3.org/2000/svg", width: "50", height: "50", fill: "none", viewBox: "0 0 50 50" };
function k_(e, t) {
  return $(), N("svg", L_, [...t[0] || (t[0] = [z("path", { fill: "currentColor", d: "M48.115 31.964h-8.997a16 16 0 0 0-.375-1.962l-4.498-17.5H45.25L42.293.88H19.472l4.564 17.711a15 15 0 0 0-3.596.515 14.96 14.96 0 0 0-6.7 3.833 15.3 15.3 0 0 0-3.95 6.698h9.175l-17.75 4.7h7.977c.037 1.141.199 2.275.482 3.381a15.26 15.26 0 0 0 5.56 8.379 14.88 14.88 0 0 0 9.5 3.014 14.9 14.9 0 0 0 9.271-3.673 15.3 15.3 0 0 0 4.976-8.75H30.36z" }, null, -1)])]);
}
const D_ = { render: k_ }, N_ = { class: "image" }, F_ = ["src"], U_ = { key: 2, class: "overlay" }, j_ = Ve({ __name: "Image", props: { urlInfo: {}, cdnPattern: {}, src: {}, aspectRatio: {}, placeholderPreset: { default: "logo" }, placeholderColor: {}, noPlaceholder: { type: Boolean }, overlayIcon: {}, imgTemplateType: {}, colorInvert: { type: Boolean } }, setup(e) {
  const t = e, n = Ee(false), r = Ee(false), i = Ee(er()), o = nn(() => t.urlInfo ? P_(t.urlInfo, t.cdnPattern, t.imgTemplateType) : t.src);
  Vt(o, () => {
    n.value = false;
  });
  function s() {
    n.value = false, r.value = false;
  }
  function a() {
    n.value = false, r.value = true;
  }
  function l() {
    r.value && o.value && (i.value = er());
  }
  return va("focus", () => {
    l();
  }), va(navigator.connection, "change", () => {
    l();
  }), (c, u) => ($(), N("div", N_, [e.noPlaceholder ? xe("", true) : ($(), N("div", { key: 0, class: "placeholder", style: Cn({ backgroundColor: t.placeholderColor ?? "rgba(255, 255, 255, 0.07)" }) }, [e.placeholderPreset === "logo" ? ($(), je(ue(D_), { key: 0 })) : xe("", true), e.placeholderPreset === "music" ? ($(), je(ue(M_), { key: 1 })) : xe("", true)], 4)), o.value ? ($(), N("img", { key: `${o.value}:${i.value}`, class: at([{ visible: n.value, "color-invert": t.colorInvert }, "real-image"]), src: o.value, onLoadstart: s, onLoad: u[0] || (u[0] = (f) => n.value = true), onError: a }, null, 42, F_)) : xe("", true), e.overlayIcon ? ($(), N("div", U_, [($(), je(Ao(e.overlayIcon)))])) : xe("", true), Ir(c.$slots, "default", {}, void 0, true)]));
} }), ec = Ze(j_, [["__scopeId", "data-v-29f5a105"]]), B_ = { class: "circular-loader", viewBox: "25 25 50 50" }, H_ = ["stroke", "stroke-width"], q_ = Ve({ __name: "CircleLoading", props: { size: {}, width: {}, color: {} }, setup(e) {
  Bp((r) => ({ v43942abd: n.value, v74ec080f: r.color }));
  const t = e, n = nn(() => `${t.size}px`);
  return (r, i) => ($(), N("svg", B_, [z("circle", { class: "loader-path", cx: "50", cy: "50", r: "20", fill: "none", stroke: e.color, "stroke-width": e.width * (50 / e.size) }, null, 8, H_)]));
} }), wa = Ze(q_, [["__scopeId", "data-v-e162a447"]]);
function V_() {
  const e = Ee(window.__injected_data__), t = () => {
    e.value = window.__injected_data__;
  };
  return rr(() => {
    document.addEventListener("injected-data-updated", t);
  }), Qr(() => {
    document.removeEventListener("injected-data-updated", t);
  }), e;
}
function W_() {
  return window.__injected_data__;
}
function Er() {
  return W_()?.config?.ctx.etParams ?? {};
}
let tc = false;
function z_() {
  tc = true;
}
function K_() {
  return tc;
}
const J_ = { key: 0, class: "context-info media-info" }, G_ = { class: "info" }, Y_ = { class: "title" }, X_ = { class: "subtitle" }, Q_ = Ve({ __name: "FeedbackContextInfo", props: { config: {} }, setup(e) {
  return (t, n) => e.config.type === "track" || e.config.type === "ugc" || e.config.type === "mv" ? ($(), N("div", J_, [de(ec, { class: "cover", "url-info": e.config.ctx.playable.cover_url }, null, 8, ["url-info"]), z("div", G_, [z("div", Y_, Fe(e.config.ctx.playable.name), 1), z("div", X_, Fe(e.config.ctx.playable.artists?.map((r) => r.name).join(", ")), 1)])])) : xe("", true);
} }), Z_ = Ze(Q_, [["__scopeId", "data-v-a57b6c9e"]]);
function ey(e, t, n, r) {
  let i, o;
  if (e.type === "track") {
    const { name: s, id: a, artists: l } = e.ctx.playable, c = l?.map((u) => u.name).join("\u3001") || "\u65E0";
    i = `\u6B4C\u66F2\u540D\uFF1A${s}
\u6B4C\u66F2ID\uFF1A${a}
\u827A\u4EBA\u540D\uFF1A${c}
\u53CD\u9988\u7C7B\u578B\uFF1A${t}
\u53CD\u9988\u5185\u5BB9\uFF1A${n}`, o = `\u300A${s}\u300B${t}
${n.trim()}`;
  } else if (e.type === "ugc") {
    const { name: s, id: a, artists: l } = e.ctx.playable, c = l?.map((u) => u.name).join("\u3001") || "\u65E0";
    i = `UGC\u89C6\u9891\u540D\uFF1A${s}
\u89C6\u9891ID\uFF1A${a}
\u827A\u4EBA\u540D\uFF1A${c}
\u53CD\u9988\u7C7B\u578B\uFF1A${t}
\u53CD\u9988\u5185\u5BB9\uFF1A${n}`, o = `\u300A${s}\u300B${t}
${n.trim()}`;
  } else if (e.type === "mv") {
    const { name: s, id: a, artists: l } = e.ctx.playable, c = l?.map((u) => u.name).join("\u3001") || "\u65E0";
    i = `MV\u540D\uFF1A${s}
MV ID\uFF1A${a}
\u827A\u4EBA\u540D\uFF1A${c}
\u53CD\u9988\u7C7B\u578B\uFF1A${t}
\u53CD\u9988\u5185\u5BB9\uFF1A${n}`, o = `\u300A${s}\u300B${t}
${n.trim()}`;
  } else i = `\u53CD\u9988\u7C7B\u578B\uFF1A${t}
\u53CD\u9988\u5185\u5BB9\uFF1A${n.trim()}`, o = n.trim();
  return { content: i, user_extra: JSON.stringify({ data: o, hasPic: r }) };
}
const ty = { class: "feedback-create" }, ny = { class: "tags" }, ry = ["onClick"], iy = { class: "image-upload" }, oy = ["onClick"], sy = { class: "info" }, ay = { class: "bottom" }, ly = Ve({ __name: "FeedbackCreate", props: { config: {} }, setup(e) {
  const t = e, n = { track: 223840, setting: 223839, login: 223839, ugc: 263897, mv: 263904 }, r = Ee(null), i = Ee(), o = Ee(""), s = Ee(""), a = Ee(false), l = Ee(false), c = Ee(), u = Ee([]);
  async function f() {
    try {
      const S = (await Me(Pe.request).requestHttp({ method: "GET", url: "https://api.qishui.com/feedback/2/common_feedback_list/", query: { aid: String(386088), appkey: "luna_pc" }, responseType: "json", withTTCommonParams: true, timeout: 5e3 })).data.list.find((m) => m.id === n[t.config.type]);
      r.value = S.children.map((m) => ({ id: m.id, name: m.name }));
    } catch {
      r.value = [{ id: 223843, name: "\u5176\u4ED6\u95EE\u9898" }];
    }
  }
  Vt(() => t.config, () => {
    r.value = null, i.value = void 0, o.value = "", s.value = "", a.value = false, u.value = [], f();
  }, { immediate: true, deep: true });
  async function h() {
    let x;
    try {
      if (u.value.length >= 9) {
        kt({ message: "\u6700\u591A\u652F\u6301\u4E0A\u4F20 9 \u5F20\u56FE\u7247\uFF01" });
        return;
      }
      if (!c.value) return;
      c.value.click();
      const S = await new Promise((H) => {
        if (!c.value) {
          H(null);
          return;
        }
        c.value.addEventListener("input", (re) => {
          if (!(re.target instanceof HTMLInputElement)) {
            H(null);
            return;
          }
          if (re.target.files?.length !== 1) {
            H(null);
            return;
          }
          H(re.target.files[0]);
        });
      });
      if (!S) return;
      if (!S.type.startsWith("image/")) {
        kt({ message: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u56FE\u7247\u6587\u4EF6\uFF01" });
        return;
      }
      x = S;
      const m = an({ file: S, previewUrl: URL.createObjectURL(S), width: 0, height: 0, uri: "", isUploaded: false });
      u.value.push(m);
      const w = new FormData();
      w.set("image", S), w.set("app_id", String(386088));
      const B = await Te.post("https://i.snssdk.com/feedback/image/v1/upload/", w, { params: { appkey: "luna_pc", aid: String(386088), app_name: "\u6C7D\u6C34\u97F3\u4E50PC\u7AEF" } });
      m.width = B.data.data.width ?? 800, m.height = B.data.data.height ?? 800, m.uri = B.data.data.web_uri, m.isUploaded = true, kt({ message: "\u56FE\u7247\u4E0A\u4F20\u6210\u529F" });
    } catch {
      kt({ message: "\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5" });
      const m = u.value.findIndex((w) => w.file === x);
      u.value.splice(m, 1);
    }
  }
  async function g() {
    z_(), Me(Pe.applog).report({ event: "pop_confirm", params: { ...Er(), confirm_choice: "cancel" } }), Me(Pe.window).close(Nr.feedback);
  }
  async function v() {
    try {
      if (l.value) return;
      if (l.value = true, !i.value) {
        kt({ message: "\u8BF7\u9009\u62E9\u53CD\u9988\u7C7B\u578B" });
        return;
      }
      if (o.value.trim().length < 6) {
        kt({ message: "\u8BF7\u586B\u5199\u516D\u4E2A\u5B57\u4EE5\u4E0A\u7684\u53CD\u9988\u63CF\u8FF0" }), a.value = true;
        return;
      }
      if (u.value.some((x) => !x.isUploaded)) {
        kt({ message: "\u8BF7\u7B49\u5F85\u6240\u6709\u56FE\u7247\u4E0A\u4F20\u5B8C\u6210\u540E\u518D\u63D0\u4EA4" });
        return;
      }
      await Me(Pe.request).requestHttp({ method: "POST", url: "https://api.qishui.com/feedback/2/post_message/", query: { aid: String(386088), count: "10", appkey: "luna_pc", ...await Me(Pe.appSettings).getSetting("submit_feedback_with_webid") ? { webid: Vn().deviceId } : {} }, responseType: "json", form: { aid: String(386088), appName: "luna", appkey: "luna_pc", qr_id: i.value.id, ...ey(t.config, i.value.name, o.value, u.value.length > 0), multi_image: 1, image_list: JSON.stringify(u.value.map((x) => ({ image_uri: x.uri, image_width: x.width, image_height: x.height }))), contact: s.value, device_id: Vn().deviceId, iid: Vn().installId }, forceWithQishuiCookies: true, withTTCommonParams: true }), Me(Pe.renderer).showToast({ message: "\u6210\u529F\u63D0\u4EA4\u53CD\u9988" }), Me(Pe.applog).report({ event: "error_feedback_result", params: { ...Er(), feedback_type: i.value?.name, feedback_input_text: o.value } }), Me(Pe.applog).report({ event: "pop_confirm", params: { ...Er(), confirm_choice: "submit" } }), Me(Pe.window).close(Nr.feedback);
    } catch {
      kt({ message: "\u63D0\u4EA4\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5" });
    } finally {
      l.value = false;
    }
  }
  function y() {
    a.value && o.value.length >= 6 && (a.value = false);
  }
  function E(x) {
    u.value.splice(x, 1);
  }
  return (x, S) => ($(), N(ye, null, [z("div", ty, [de(Z_, { config: e.config }, null, 8, ["config"]), S[3] || (S[3] = z("div", { class: "section-title" }, " \u53CD\u9988\u7C7B\u578B ", -1)), z("div", ny, [r.value ? ($(true), N(ye, { key: 0 }, Wt(r.value, (m) => ($(), N("div", { key: m.id, class: at(["tag", { active: i.value?.id === m.id }]), onClick: (w) => i.value = m }, Fe(m.name), 11, ry))), 128)) : ($(), je(wa, { key: 1, style: { "margin-left": "250px" }, size: 20, width: 2, color: "rgba(255, 255, 255, 0.35)" }))]), S[4] || (S[4] = z("div", { class: "section-title" }, " \u53CD\u9988\u63CF\u8FF0 ", -1)), de(m_, { modelValue: o.value, "onUpdate:modelValue": S[0] || (S[0] = (m) => o.value = m), style: { width: "100%", height: "100px" }, placeholder: "\u8BF7\u8F93\u5165\u516D\u4E2A\u5B57\u4EE5\u4E0A\u7684\u95EE\u9898\u63CF\u8FF0", "max-length": 300, error: a.value, onUpdate: y }, null, 8, ["modelValue", "error"]), z("div", iy, [z("input", { ref_key: "file", ref: c, class: "file", type: "file", accept: "image/*", onclick: "this.value = null" }, null, 512), ($(true), N(ye, null, Wt(u.value, (m, w) => ($(), N("div", { key: w, class: "image-item" }, [m.isUploaded ? ($(), je(ec, { key: 0, class: "image-content", src: m.previewUrl }, null, 8, ["src"])) : ($(), je(wa, { key: 1, class: "loading", size: 20, width: 2, color: "rgba(255, 255, 255, 0.35)" })), z("div", { class: "image-delete", onClick: (B) => E(w) }, [de(ue(im))], 8, oy)]))), 128)), u.value.length < 9 ? ($(), N("div", { key: 0, class: "image-add", onClick: h }, [de(ue(tm)), z("div", sy, Fe(u.value.length) + "/9 ", 1)])) : xe("", true)]), S[5] || (S[5] = z("div", { class: "section-title" }, " \u8054\u7CFB\u65B9\u5F0F\uFF08\u53EF\u9009\uFF09 ", -1)), de(h_, { modelValue: s.value, "onUpdate:modelValue": S[1] || (S[1] = (m) => s.value = m), style: { width: "100%" } }, null, 8, ["modelValue"])]), z("div", ay, [de(ha, { type: "secondary", onClick: S[2] || (S[2] = (m) => g()) }, { default: wn(() => [...S[6] || (S[6] = [Qn(" \u53D6\u6D88 ", -1)])]), _: 1 }), de(ha, { type: "primary", onClick: v }, { default: wn(() => [...S[7] || (S[7] = [Qn(" \u63D0\u4EA4 ", -1)])]), _: 1 })])], 64));
} }), uy = Ze(ly, [["__scopeId", "data-v-7f6fe524"]]), cy = { key: 0, class: "feedback" }, fy = Ve({ __name: "Feedback", setup(e) {
  const t = Ee("create"), n = V_(), r = nn(() => n.value?.config ?? null), i = nn(() => {
    switch (r.value?.type) {
      case "track":
        return "\u6B4C\u66F2\u4FE1\u606F\u53CD\u9988";
      case "ugc":
        return "\u89C6\u9891\u4FE1\u606F\u53CD\u9988";
      case "mv":
        return "MV \u4FE1\u606F\u53CD\u9988";
      default:
        return "\u610F\u89C1\u53CD\u9988";
    }
  });
  return addEventListener("beforeunload", () => {
    K_() || Me(Pe.applog).report({ event: "pop_confirm", params: { ...Er(), confirm_choice: "close_btn" } });
  }), (o, s) => r.value ? ($(), N("div", cy, [de(ng, { "window-id": ue(Nr).feedback, mode: "dark", title: "\u53CD\u9988" }, null, 8, ["window-id"]), de(Ov, { class: "control", tabs: [{ label: i.value, key: "create" }, { label: "\u53CD\u9988\u5386\u53F2", key: "history" }], "active-key": t.value, onSwitch: s[0] || (s[0] = (a) => t.value = a) }, null, 8, ["tabs", "active-key"]), t.value === "create" ? ($(), je(uy, { key: 0, config: r.value }, null, 8, ["config"])) : xe("", true), t.value === "history" ? ($(), je(Eg, { key: 1 })) : xe("", true), de(Nv)])) : xe("", true);
} }), dy = Ze(fy, [["__scopeId", "data-v-c426d6a4"]]);
async function hy() {
  const t = new URLSearchParams(window.location.search).get("global_config"), n = JSON.parse(t ?? "{}");
  vv(n), await Tu.initialize(), bv(), dv(dy).mount("#app");
}
hy();
