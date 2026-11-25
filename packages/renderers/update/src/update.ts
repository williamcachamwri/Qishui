// packages/renderers/update/src/update.ts
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
var I = function() {
  return I = Object.assign || function(t) {
    for (var r, n = 1, i = arguments.length; n < i; n++) {
      r = arguments[n];
      for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
    return t;
  }, I.apply(this, arguments);
};
function Sa(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++) t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]]);
  return r;
}
function Ca(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == "number") return { next: function() {
    return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
  } };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function L(e, t) {
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
function ye(e, t, r) {
  if (arguments.length === 2) for (var n = 0, i = t.length, o; n < i; n++) (o || !(n in t)) && (o || (o = Array.prototype.slice.call(t, 0, n)), o[n] = t[n]);
  return e.concat(o || Array.prototype.slice.call(t));
}
var Pa = 10, Ta = 1e3, Ro = function(e) {
  return JSON.stringify({ ev_type: "batch", list: e });
};
function Ra(e) {
  var t = e.transport, r = e.endpoint, n = e.size, i = n === void 0 ? Pa : n, o = e.wait, s = o === void 0 ? Ta : o, a = [], l = 0, c, u, h = { getSize: function() {
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
    a.push(g), a.length >= i && p.call(this), clearTimeout(l), l = setTimeout(p.bind(this), s);
  }, flush: function() {
    clearTimeout(l), p.call(this);
  }, getBatchData: function() {
    return a.length ? Ro(a) : "";
  }, clear: function() {
    clearTimeout(l), a = [];
  }, fail: function(g) {
    c = g;
  }, success: function(g) {
    u = g;
  } };
  function p() {
    if (a.length) {
      var g = this.getBatchData();
      t.post({ url: r, data: g, fail: function(S) {
        c && c(S, g);
      }, success: function() {
        u && u(g);
      } }), a = [];
    }
  }
  return h;
}
var ie = function() {
  return {};
};
function $n(e) {
  return e;
}
function se(e) {
  return typeof e == "object" && e !== null;
}
function Oa(e) {
  return e === void 0;
}
function Aa(e, t) {
  try {
    return e instanceof t;
  } catch {
    return false;
  }
}
var gn = Object.prototype;
function Un(e) {
  if (se(e)) {
    if (typeof Object.getPrototypeOf == "function") {
      var t = Object.getPrototypeOf(e);
      return t === gn || t === null;
    }
    return gn.toString.call(e) === "[object Object]";
  }
  return false;
}
function at(e) {
  return gn.toString.call(e) === "[object Array]";
}
function Rt(e) {
  return typeof e == "function";
}
function Ia(e) {
  return typeof e == "boolean";
}
function Lr(e) {
  return typeof e == "number";
}
function He(e) {
  return typeof e == "string";
}
function Ma(e) {
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
function Da(e) {
  return typeof Event < "u" && Aa(e, Event);
}
function La(e) {
  return Object.prototype.toString.call(e) === "[object ErrorEvent]";
}
function Na(e) {
  return Object.prototype.toString.call(e) === "[object PromiseRejectionEvent]";
}
function ja(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function $a() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  for (var r = {}, n = 0; n < e.length; ) r = Hn(r, e[n++]);
  return r;
}
function Hn(e, t) {
  var r = I({}, e);
  for (var n in t) ja(t, n) && t[n] !== void 0 && (se(t[n]) && Un(t[n]) ? r[n] = Hn(se(e[n]) ? e[n] : {}, t[n]) : at(t[n]) && at(e[n]) ? r[n] = Oo(e[n], t[n]) : r[n] = t[n]);
  return r;
}
function Oo(e, t) {
  var r = at(e) ? e : [], n = at(t) ? t : [];
  return Array.prototype.concat.call(r, n).map(function(i) {
    return i instanceof RegExp ? i : se(i) && Un(i) ? Hn({}, i) : at(i) ? Oo([], i) : i;
  });
}
function Ot(e, t) {
  if (!at(e) || e.length === 0) return false;
  for (var r = 0; r < e.length; ) {
    if (e[r] === t) return true;
    r++;
  }
  return false;
}
var Fn = function(e, t) {
  if (!at(e)) return e;
  var r = e.indexOf(t);
  if (r >= 0) {
    var n = e.slice();
    return n.splice(r, 1), n;
  }
  return e;
}, xr = function(e, t, r) {
  for (var n, i, o = t.split("."), s = L(o), a = s[0], l = s.slice(1); e && l.length > 0; ) e = e[a], n = l, i = L(n), a = i[0], l = i.slice(1);
  if (e) return r(e, a);
}, Ua = function(e, t, r) {
  return xr(e, t, function(n, i) {
    if (n && i in n && Rt(n[i])) try {
      return n[i].apply(n, r);
    } catch {
      return;
    }
  });
}, Ha = function(e, t) {
  return !e || !se(e) ? e : t.reduce(function(r, n) {
    return r[n] = e[n], r;
  }, {});
}, Fa = function(e) {
  return e.replace(/([a-z])([A-Z])/g, function(t, r, n) {
    return r + "-" + n.toLowerCase();
  });
};
function Ba(e) {
  return at(e) && e.length ? ka(e) : null;
}
function ka(e) {
  for (var t = [], r = e.length, n = 0; n < r; n++) {
    var i = e[n];
    He(i) ? t.push(i.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1")) : i && i.source && t.push(i.source);
  }
  return new RegExp(t.join("|"), "i");
}
var Bn = function(e, t) {
  var r = Ba(e || []);
  return !!r && r.test(t);
};
function At(e) {
  try {
    return He(e) ? e : JSON.stringify(e);
  } catch (t) {
    return "[FAILED_TO_STRINGIFY]:" + String(t);
  }
}
function Wa() {
  var e = {}, t = {}, r = { set: function(n, i) {
    return e[n] = i, t[n] = At(i), r;
  }, merge: function(n) {
    return e = I(I({}, e), n), Object.keys(n).forEach(function(i) {
      t[i] = At(n[i]);
    }), r;
  }, delete: function(n) {
    return delete e[n], delete t[n], r;
  }, clear: function() {
    return e = {}, t = {}, r;
  }, get: function(n) {
    return t[n];
  }, toString: function() {
    return I({}, t);
  } };
  return r;
}
var mn = function(e, t, r, n) {
  return n === void 0 && (n = true), function() {
    for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
    if (!e) return ie;
    var s = e[t], a = r.apply(void 0, ye([s], L(i), false)), l = a;
    return Rt(l) && n && (l = function() {
      for (var c = [], u = 0; u < arguments.length; u++) c[u] = arguments[u];
      try {
        return a.apply(this, c);
      } catch {
        return Rt(s) && s.apply(this, c);
      }
    }), e[t] = l, function(c) {
      c || (l === e[t] ? e[t] = s : a = s);
    };
  };
}, qt = function(e, t, r) {
  return function() {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    if (!e) return ie;
    var o = e[t], s = r.apply(void 0, ye([o], L(n), false)), a = s;
    return Rt(a) && (a = function() {
      for (var l = [], c = 0; c < arguments.length; c++) l[c] = arguments[c];
      return s.apply(this, l);
    }), e[t] = a, function() {
      a === e[t] ? e[t] = o : s = o;
    };
  };
}, Va = function() {
  return "".padStart ? function(e, t) {
    return t === void 0 && (t = 8), e.padStart(t, " ");
  } : function(e) {
    return e;
  };
}, Ao = Va(), qa = 0, Io = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  console.error.apply(console, ye(["[SDK]", Date.now(), Ao("" + qa++)], L(e), false));
}, za = 0, Er = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  console.warn.apply(console, ye(["[SDK]", Date.now(), Ao("" + za++)], L(e), false));
}, kn = function(e) {
  return Math.random() < Number(e);
}, Ka = function(e, t) {
  return e < Number(t);
}, Ft = function(e) {
  return function(t) {
    for (var r = t, n = 0; n < e.length && r; n++) try {
      r = e[n](r);
    } catch (i) {
      Io(i);
    }
    return r;
  };
}, Ga = function(e) {
  return function(t) {
    for (var r = true, n = 0; n < e.length && r; n++) try {
      r = e[n](t);
    } catch (i) {
      Io(i);
    }
    return r;
  };
};
function Ja() {
  for (var e = new Array(16), t = 0, r = 0; r < 16; r++) (r & 3) === 0 && (t = Math.random() * 4294967296), e[r] = t >>> ((r & 3) << 3) & 255;
  return e;
}
function Ya(e) {
  for (var t = [], r = 0; r < 256; ++r) t[r] = (r + 256).toString(16).substr(1);
  var n = 0, i = t;
  return [i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], "-", i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]], i[e[n++]]].join("");
}
function _n() {
  var e = Ja();
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, Ya(e);
}
var Xa = 3e5, Qa = function(e, t, r) {
  var n = 0;
  return r === -1 ? ie : function() {
    if (e()) {
      n && clearTimeout(n), n = 0;
      return;
    }
    n === 0 && (n = setTimeout(t, r));
  };
}, Mo = function(e, t) {
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
    return Mo(n, r);
  };
}, Za = function(e) {
  e === void 0 && (e = Xa);
  var t = [], r = [], n = false, i, o = Qa(function() {
    return !!t.length;
  }, function() {
    n = true, i && i[0](), r.forEach(function(a) {
      return a();
    }), r.length = 0, i = void 0;
  }, e), s = function(a) {
    t = Fn(t, a), !n && o();
  };
  return { next: function(a) {
    return Mo(a, t);
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
}, Nr = function(e, t, r) {
  var n = Za(r);
  try {
    e(n.next, n.attach), t && n.complete(t);
  } catch {
  }
  return [n.subscribe, n.unsubscribe];
}, el = function(e, t) {
  var r = L(e, 1), n = r[0], i = function(o, s) {
    var a = n(function(l) {
      var c = Ga(t)(l);
      return c ? o(l) : ie;
    });
    s(function() {
      a();
    });
  };
  return i;
};
function tl() {
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
var Sr = function(e, t, r, n) {
  return e.destroyAgent.set(t, r, n);
}, rl = 500, nl = 50;
function il(e, t, r) {
  if (t.push(r), !(t.length < rl)) {
    var n = t.splice(0, nl);
    e.savePreStartDataToDb && e.savePreStartDataToDb(n);
  }
}
function ol(e) {
  var t = e.getPreStartQueue();
  t.forEach(function(r) {
    return e.build(r);
  }), t.length = 0;
}
var sl = ["init", "start", "config", "beforeDestroy", "provide", "beforeReport", "report", "beforeBuild", "build", "beforeSend", "send", "beforeConfig"];
function al(e) {
  var t = e.builder, r = e.createSender, n = e.createDefaultConfig, i = e.createConfigManager, o = e.userConfigNormalizer, s = e.initConfigNormalizer, a = e.validateInitConfig, l, c, u = {};
  sl.forEach(function(_) {
    return u[_] = [];
  });
  var h = false, p = false, g = false, S = [], P = [], j = tl(), R = { getBuilder: function() {
    return t;
  }, getSender: function() {
    return l;
  }, getPreStartQueue: function() {
    return S;
  }, init: function(_) {
    if (h) {
      Er("already inited");
      return;
    }
    if (_ && se(_) && a(_)) {
      var x = n(_);
      if (!x) throw new Error("defaultConfig missing");
      var k = s(_);
      if (c = i(x), c.setConfig(k), c.onChange(function() {
        A("config");
      }), l = r(c.getConfig()), !l) throw new Error("sender missing");
      h = true, A("init", true);
    } else throw new Error("invalid InitConfig, init failed");
  }, set: function(_) {
    h && _ && se(_) && (A("beforeConfig", false, _), c?.setConfig(_));
  }, config: function(_) {
    if (h) return _ && se(_) && (A("beforeConfig", false, _), c?.setConfig(o(_))), c?.getConfig();
  }, provide: function(_, x) {
    if (Ot(P, _)) {
      Er("cannot provide " + _ + ", reserved");
      return;
    }
    R[_] = x, A("provide", false, _);
  }, start: function() {
    h && (p || c?.onReady(function() {
      p = true, A("start", true), ol(R);
    }));
  }, report: function(_) {
    if (_) {
      var x = Ft(u.beforeReport)(_);
      if (x) {
        var k = Ft(u.report)(x);
        k && (p ? this.build(k) : il(R, S, k));
      }
    }
  }, build: function(_) {
    if (p) {
      var x = Ft(u.beforeBuild)(_);
      if (x) {
        var k = t.build(x);
        if (k) {
          var q = Ft(u.build)(k);
          q && this.send(q);
        }
      }
    }
  }, send: function(_) {
    if (p) {
      var x = Ft(u.beforeSend)(_);
      x && (l.send(x), A("send", false, x));
    }
  }, destroy: function() {
    j.clear(), g = true, S.length = 0, A("beforeDestroy", true);
  }, on: function(_, x) {
    if (_ === "init" && h || _ === "start" && p || _ === "beforeDestroy" && g) try {
      x();
    } catch {
    }
    else u[_] && u[_].push(x);
  }, off: function(_, x) {
    u[_] && (u[_] = Fn(u[_], x));
  }, destroyAgent: j };
  return P = Object.keys(R), R;
  function A(_, x) {
    x === void 0 && (x = false);
    for (var k = [], q = 2; q < arguments.length; q++) k[q - 2] = arguments[q];
    u[_].forEach(function(ae) {
      try {
        ae.apply(void 0, ye([], L(k), false));
      } catch {
      }
    }), x && (u[_].length = 0);
  }
}
var ll = function(e) {
  var t = Wa();
  e.provide("context", t), e.on("report", function(r) {
    return r.extra || (r.extra = {}), r.extra.context = t.toString(), r;
  });
}, ul = function(e, t, r) {
  var n = {}, i = function() {
    for (var s, a = [], l = 0; l < arguments.length; l++) a[l] = arguments[l];
    var c = a[0];
    if (c) {
      var u = c.split(".")[0];
      if (!(u in i)) {
        var h = n[u] || [], p = (s = t?.(e)) !== null && s !== void 0 ? s : {};
        h.push(ye([p], L(a), false)), n[u] = h;
        return;
      }
      return Ua(i, c, [].slice.call(a, 1));
    }
  };
  mn(e, "provide", function(s) {
    return function(a, l) {
      i[a] = l, s.call(e, a, l);
    };
  })();
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (i[o] = e[o]);
  return e.on("provide", function(s) {
    n[s] && (n[s].forEach(function(a) {
      var l = L(a), c = l[0], u = l.slice(1);
      r?.(e, c, u);
    }), n[s] = null);
  }), i;
};
function cl(e, t) {
  e.on("init", function() {
    var r = [], n = function(o) {
      o.forEach(function(s) {
        var a = s.name;
        Ot(r, a) || (r.push(a), s.setup(e), t && t(a, s.setup), e.destroyAgent.set(a, a, [function() {
          r = Fn(r, a), s.tearDown && s.tearDown();
        }]));
      });
    };
    e.provide("applyIntegrations", n);
    var i = e.config();
    i && i.integrations && n(i.integrations);
  });
}
var fl = "_", dl = function(e) {
  return e.split(fl)[0];
};
function hl(e, t) {
  var r = t || {}, n = {}, i = function(s, a) {
    n[s] || (n[s] = []), n[s].push(a);
  }, o = function(s) {
    var a = L(s, 2), l = a[0], c = a[1], u = dl(l), h = !!u && n[u];
    return r[l] || (r[l] = Nr(c, function() {
      r[l] = void 0;
    })), h ? Do(e, [l, el(r[l], h)]) : r[l];
  };
  e.provide("setFilter", i), e.provide("initSubject", o), e.provide("getSubject", function(s) {
    return r[s];
  }), e.provide("privateSubject", {});
}
function It(e, t) {
  return e.initSubject(t);
}
function Do(e, t, r) {
  var n = L(t, 2), i = n[0], o = n[1], s = e.privateSubject || {};
  return s[i] || (s[i] = Nr(o, function() {
    s[i] = void 0;
  }, r)), s[i];
}
var pl = function(e) {
  try {
    typeof window == "object" && se(window) && window.__SLARDAR_DEVTOOLS_GLOBAL_HOOK__ && window.__SLARDAR_DEVTOOLS_GLOBAL_HOOK__.push(e);
  } catch {
  }
}, te = function() {
  return Date.now();
};
function re() {
  if (typeof window == "object" && se(window)) return window;
}
function gt() {
  if (typeof document == "object" && se(document)) return document;
}
function Lo() {
  return re() && window.location;
}
function vl() {
  return re() && window.history;
}
function gl() {
  if (typeof XMLHttpRequest == "function" && Rt(XMLHttpRequest)) return XMLHttpRequest;
}
function ml() {
  if (re() && Rt(window.PerformanceObserver)) return window.PerformanceObserver;
}
function _l() {
  if (re() && "navigator" in window) return window.navigator;
}
function No() {
  var e = _l();
  if (e) return e.connection || e.mozConnection || e.webkitConnection;
}
function bn(e) {
  return e?.effectiveType || e?.type || "";
}
function bl() {
  var e = No(), t = bn(e);
  return Ot(["slow-2g", "2g"], t);
}
function jr(e) {
  var t = gt();
  if (!t || !e) return "";
  var r = t.createElement("a");
  return r.href = e, r.href;
}
function Ei(e) {
  var t = gt();
  if (!t || !e) return { url: e, protocol: "", domain: "", query: "", path: "", hash: "" };
  var r = t.createElement("a");
  r.href = e;
  var n = r.pathname || "/";
  return n[0] !== "/" && (n = "/" + n), { url: r.href, protocol: r.protocol.slice(0, -1), domain: r.hostname, query: r.search.substring(1), path: n, hash: r.hash };
}
function Wn() {
  var e = re() && Lo();
  return e ? e.href : "";
}
var wl = function(e) {
  return { pid: e.pid, view_id: e.viewId, url: Wn() };
}, jo = function(e) {
  var t = e.config(), r = wl(t);
  return r.context = e.context ? e.context.toString() : {}, r;
}, $o = function(e, t) {
  var r = jo(e);
  return r.timestamp = te(), function(n) {
    e.report(I(I({}, n), { overrides: r }));
  };
}, yl = "f_view_0", xl = function(e) {
  return function(t, r) {
    var n = jo(e);
    r(ie, function(i) {
      n && i(n);
    });
  };
}, Dt = function(e) {
  if (e) return e.__SLARDAR_REGISTRY__ || (e.__SLARDAR_REGISTRY__ = { Slardar: { plugins: [], errors: [], subject: {} } }), e.__SLARDAR_REGISTRY__.Slardar;
}, Uo = function() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var r = Dt(re());
  r && (r.errors || (r.errors = []), r.errors.push(e));
}, Ho = function(e) {
  var t = { url: Wn(), timestamp: te() }, r = e.config();
  return r?.pid && (t.pid = r.pid), e?.context && (t.context = e.context.toString()), t;
}, Vn = function(e, t) {
  return function(r) {
    var n = function(i) {
      return i.overrides = t, i;
    };
    e.on("report", n), r(), e.off("report", n);
  };
}, Ge = function(e, t, r, n) {
  return n === void 0 && (n = false), e.addEventListener(t, r, n), function() {
    e.removeEventListener(t, r, n);
  };
}, Fo = function(e, t, r, n) {
  return e.addEventListener(t, r, n), function() {
    e.removeEventListener(t, r, n);
  };
};
function El(e) {
  var t = re(), r = gt();
  if (!(!t || !r)) {
    if (r.readyState === "complete") {
      e();
      return;
    }
    Ge(t, "load", function() {
      setTimeout(function() {
        e();
      }, 0);
    }, false);
  }
}
var Bo = function(e) {
  var t = false, r = function(n) {
    t || (t = true, e && e(n));
  };
  return [r];
}, Sl = function(e) {
  var t = re();
  if (t) {
    var r = L(Bo(e), 1), n = r[0];
    ["unload", "beforeunload", "pagehide"].forEach(function(i) {
      Ge(t, i, n, false);
    });
  }
}, Cl = function(e) {
  var t = gt(), r = re();
  if (!(!t || !r)) {
    var n = ie, i = function() {
      t.visibilityState === "visible" && (e(), n());
    };
    n = Fo(t, "visibilitychange", i, true);
  }
}, Pl = function(e, t) {
  var r, n = gt();
  if (n) {
    var i = n.createElement("script");
    i.src = e, i.crossOrigin = "anonymous", i.onload = t, (r = n.head) === null || r === void 0 || r.appendChild(i);
  }
}, $r = function(e, t) {
  return se(e) ? I(I({}, t), e) : e ? t : false;
}, qn = function() {
  return !!btoa && !!atob;
};
function Tl(e) {
  return qn() ? btoa(encodeURI(e)) : e;
}
function Rl(e) {
  return qn() ? decodeURI(atob(e)) : e;
}
var ko = function(e) {
  try {
    var t = localStorage.getItem(e), r = t;
    t && typeof t == "string" && (r = JSON.parse(Rl(t)));
    var n = r, i = n.expires, o = Sa(n, ["expires"]);
    return i >= te() ? o : void 0;
  } catch {
    return;
  }
}, zn = function(e, t, r) {
  if (!(r <= 0)) try {
    localStorage.setItem(e, Tl(JSON.stringify(I(I({}, t), { expires: te() + r }))));
  } catch {
  }
}, Ol = 2160 * 60 * 60 * 1e3, Wo = function(e) {
  return e === false ? 0 : e === true || e === void 0 || !Lr(e) ? Ol : e;
}, Al = function(e) {
  var t;
  if (!(typeof window != "object" || !window.__perfsee__)) {
    var r = {};
    return (t = Error.captureStackTrace) === null || t === void 0 || t.call(Error, r, e), r.stack;
  }
};
function Il() {
  var e = re();
  return e && "navigator" in e && "onLine" in e.navigator ? function() {
    return !e.navigator.onLine;
  } : function() {
    return false;
  };
}
function Ml(e) {
  var t = re();
  return t && "addEventListener" in t ? Ge(t, "online", e) : function() {
  };
}
var Dl = "xhr_0", Vo = function() {
  var e = new RegExp("\\/monitor_web\\/collect|\\/monitor_browser\\/collect\\/batch", "i");
  return function(t) {
    return e.test(t);
  };
}, Ll = function(e) {
  return function() {
    for (var t, r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
    return t = L(r, 2), this._method = t[0], this._url = t[1], e.apply(this, r);
  };
}, Nl = function(e) {
  return function() {
    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
    this._reqHeaders = this._reqHeaders || {};
    var n = L(t, 2), i = n[0], o = n[1];
    return this._reqHeaders[i] = o, e && e.apply(this, t);
  };
}, jl = function(e, t) {
  return qt(e, "onreadystatechange", function(r) {
    return function() {
      for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
      return this.readyState === 4 && t(e), r && r.apply(this, n);
    };
  });
}, $l = function(e, t) {
  var r = Vo();
  return function() {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    if (this._start = te(), this._data = n?.[0], !r(this._url)) {
      var o = t([this._method, this._url, this._start, this]);
      jl(this, o)();
    }
    return e.apply(this, n);
  };
}, Si = function(e) {
  return function(t, r) {
    if (e) {
      var n = [];
      n.push(qt(e, "open", Ll)()), n.push(qt(e, "setRequestHeader", Nl)()), n.push(qt(e, "send", $l)(t)), r(function() {
        n.forEach(function(i) {
          return i();
        });
      });
    }
  };
}, Ul = "fetch_0", qo = function(e, t) {
  return function(r, n) {
    n === void 0 && (n = {});
    var i = t([r, n]), o = e(r, n);
    return o.then(function(s) {
      i(s);
    }, function() {
      i(void 0);
    }), o;
  };
}, Hl = function(e, t) {
  var r = re();
  if (!(!r || !fetch)) {
    var n = [];
    n.push(qt(r, "fetch", qo)(e)), t(function() {
      n.forEach(function(i) {
        return i();
      });
    });
  }
}, Fl = [Ul, Hl], Bl = ["resource"], kl = function(e, t, r) {
  var n = e && new e(function(a, l) {
    a.getEntries && a.getEntries().forEach(function(c, u, h) {
      return t(c, u, h, l);
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
      !Oa(l) && (c.durationThreshold = l), n.observe(c);
    } catch {
      return r && r();
    }
    n.observe({ type: a, buffered: false });
  }, s = function() {
    return n && n.disconnect();
  };
  return [i, o, s];
}, Wl = function(e, t, r) {
  var n = L(kl(e, t), 3), i = n[0], o = n[2];
  return i(r), o;
}, Vl = "resource_0", ql = function(e, t) {
  var r = ml();
  if (r) {
    var n = Vo();
    t(Wl(r, function(i) {
      !n(i.name) && e(i);
    }, Bl));
  }
}, zo = [Vl, ql], Ko = "pageview", Go = "session", Jo = "js_error", ar = "http", zl = "resource_error", Kl = "resource", Ci = "custom", Gl = "performance", Jl = "performance_longtask", Yl = "blank_screen", Yo = "action", Xl = "03", Ql = "01", Zl = "traceparent", eu = { sampleRate: 1, origins: [] }, Pi = function() {
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
}, Xo = function(e) {
  var t = $r(e, eu);
  if (t) {
    var r = kn(t.sampleRate);
    if (r) return function(n, i) {
      var o = t.origins;
      o.length && Bn(o, n) && i(Zl, Xl + "-" + Pi() + "-" + Pi().substring(16) + "-" + Ql);
    };
  }
}, tu = new RegExp("(cookie|auth|jwt|token|key|ticket|secret|credential|session|password)", "i"), ru = new RegExp("(bearer|session)", "i"), Kn = function(e, t) {
  return !e || !t ? true : tu.test(e) || ru.test(t);
}, nu = function(e) {
  var t = false;
  return function(r) {
    t || (t = true, e(r));
  };
}, Qo = function(e, t) {
  try {
    if (t) {
      var r = e.request.url, n = t(r);
      if (!n) return;
      e.request.url = n, e.extra = I(I({}, e.extra), { original_url: r });
    }
  } catch {
  }
}, Ti = function(e, t, r) {
  var n = L(t, 2), i = n[0], o = n[1], s = r.setTraceHeader, a = r.ignoreUrls, l = r.setContextAtReq, c = r.extractUrl;
  e.push(i[0](function(u) {
    var h = L(u, 4);
    h[0];
    var p = h[1];
    h[2];
    var g = h[3];
    if (!p) return ie;
    var S = jr(p), P;
    if (Bn(a, S)) return ie;
    s && s(S, function(_, x) {
      return g.setRequestHeader(_, x);
    });
    var j = l(), R = void 0, A = o()[0](function(_) {
      (S === _.name || P && P === _.name) && !R && (R = _);
    });
    return function(_) {
      P = _.responseURL;
      var x = su(_, r);
      setTimeout(function() {
        R && (x.response.timing = R), Qo(x, c), j && j({ ev_type: ar, payload: x }), A();
      }, 100);
    };
  }));
};
function iu(e) {
  return He(e) && e ? e.split(`\r
`).reduce(function(t, r) {
    if (He(r)) {
      var n = L(r.split(": "), 2), i = n[0], o = n[1];
      !Kn(i, o) && (t[i.toLowerCase()] = o);
    }
    return t;
  }, {}) : {};
}
function ou(e) {
  return Object.keys(e).reduce(function(t, r) {
    return !Kn(r, e[r]) && (t[r.toLowerCase()] = e[r]), t;
  }, {});
}
var su = function(e, t) {
  var r = e._method, n = e._reqHeaders, i = e._url, o = e._start, s = e._data, a = jr(i), l = { api: "xhr", request: { url: a, method: (r || "").toLowerCase(), headers: n && ou(n), timestamp: o }, response: { status: e.status || 0, is_custom_error: false, timestamp: te() }, duration: te() - o };
  typeof e.getAllResponseHeaders == "function" && (l.response.headers = iu(e.getAllResponseHeaders()));
  var c = l.response.status, u = t.collectBodyOnError, h = t.extraExtractor;
  try {
    var p = h?.(e.response, l, s);
    p && (l.extra = p), p && (l.response.is_custom_error = true), u && (p || c >= 400) && (l.request.body = s ? "" + s : void 0, l.response.body = e.response ? "" + e.response : void 0);
  } catch {
  }
  return l;
}, Gn = "ajax", au = { autoWrap: true, setContextAtReq: function() {
  return $n;
}, ignoreUrls: [], collectBodyOnError: false };
function lu(e, t) {
  var r = $r(t, au);
  if (r) {
    var n = [], i = I(I({}, r), { setContextAtReq: function() {
      return $o(e);
    }, setTraceHeader: Xo(r.trace) }), o = function() {
      return It(e, zo);
    };
    i.autoWrap && Ti(n, [It(e, [Dl, Si(XMLHttpRequest && XMLHttpRequest.prototype)]), o], i), Sr(e, Gn, ar, n), e.provide("wrapXhr", function(s) {
      function a() {
        var l = new s();
        return Ti(n, [Nr(Si(l)), o], i), l;
      }
      return a.prototype = new s(), ["DONE", "HEADERS_RECIEVED", "LOADING", "OPENED", "UNSENT"].forEach(function(l) {
        a[l] = s[l];
      }), a;
    });
  }
}
function uu(e) {
  e.on("init", function() {
    var t, r = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[Gn];
    lu(e, r);
  });
}
var Ri = function(e, t, r) {
  var n = L(t, 2), i = n[0], o = n[1], s = r.setTraceHeader, a = r.ignoreUrls, l = r.setContextAtReq, c = r.extractUrl, u = window.Headers, h = window.Request;
  !h || !u || e.push(i[0](function(p) {
    var g = L(p, 2), S = g[0], P = g[1], j = jr(S instanceof h ? S.url : S), R;
    if (!cu(j) || Bn(a, j)) return ie;
    s && s(j, function(q, ae) {
      return fu(q, ae, S, P, h, u);
    });
    var A = l(), _ = te(), x = void 0, k = o()[0](function(q) {
      (j === q.name || R && R === q.name) && !x && (x = q);
    });
    return function(q) {
      R = q && q.url;
      var ae = hu(S, P, q, h, u, r, _), xe = nu(function(Ae) {
        x && (Ae.response.timing = x), Qo(Ae, c), A && A({ ev_type: ar, payload: Ae }), k();
      });
      setTimeout(function() {
        xe(ae);
      }, 1e3);
    };
  }));
}, cu = function(e) {
  if (!He(e)) return false;
  var t = L(e.split(":"), 2), r = t[0], n = t[1];
  return !n || r === "http" || r === "https";
}, Jn = function(e, t) {
  return e instanceof t;
}, fu = function(e, t, r, n, i, o) {
  var s;
  Jn(r, i) ? r.headers.set(e, t) : n.headers instanceof o ? n.headers.set(e, t) : n.headers = I(I({}, n.headers), (s = {}, s[e] = t, s));
}, du = function(e, t, r) {
  var n = t && t.method || "get";
  return Jn(e, r) && (n = e.method || n), n.toLowerCase();
}, Oi = function(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  try {
    return t.reduce(function(n, i) {
      return new e(i || {}).forEach(function(o, s) {
        return !Kn(s, o) && (n[s] = o);
      }), n;
    }, {});
  } catch {
    return {};
  }
}, Ai = function(e, t, r) {
  return Jn(e, r) ? e.body : t?.body;
}, hu = function(e, t, r, n, i, o, s) {
  var a = { api: "fetch", request: { method: du(e, t, n), timestamp: s, url: jr(e instanceof n ? e.url : e), headers: Oi(i, e.headers, t.headers) }, response: { status: r && r.status || 0, is_custom_error: false, timestamp: te() }, duration: te() - s }, l = o.collectBodyOnError, c = o.extraExtractor, u = function() {
    var p;
    l && (a.request.body = (p = Ai(e, t, n)) === null || p === void 0 ? void 0 : p.toString());
  };
  if (r) try {
    var h = Oi(i, r.headers);
    a.response.headers = h;
    try {
      (h["content-type"] || "").indexOf("application/json") !== -1 && c && r.clone().json().catch(function() {
        return r.clone().text();
      }).then(function(p) {
        var g, S = c(p, a, (g = Ai(e, t, n)) === null || g === void 0 ? void 0 : g.toString());
        S && (a.extra = S, a.response.is_custom_error = true, u());
      }).catch(ie);
    } catch {
    }
    r.status >= 400 && u();
  } catch {
  }
  else u();
  return a;
}, Yn = "fetch", pu = { autoWrap: true, setContextAtReq: function() {
  return $n;
}, ignoreUrls: [], collectBodyOnError: false };
function vu(e, t) {
  var r = $r(t, pu);
  if (r) {
    var n = [], i = I(I({}, r), { setContextAtReq: function() {
      return $o(e);
    }, setTraceHeader: Xo(r.trace) }), o = function() {
      return It(e, zo);
    };
    i.autoWrap && Ri(n, [It(e, Fl), o], i), Sr(e, Yn, ar, n), e.provide("wrapFetch", function(s) {
      var a = void 0;
      return Ri(n, [Nr(function(l) {
        a = qo(s, l);
      }), o], i), a;
    });
  }
}
function gu(e) {
  e.on("init", function() {
    var t, r = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[Yn];
    vu(e, r);
  });
}
var mu = ["name", "message", "stack", "filename", "lineno", "colno"], Xn = function(e) {
  var t;
  return Ma(e) ? t = Ha(e, mu) : (Un(e) || Da(e) || He(e)) && (t = { message: At(e) }), t;
}, _u = function(e) {
  var t = Xn(e.error);
  if (!t) return t;
  var r = e.colno, n = e.lineno, i = e.filename;
  return r && !t.colno && (t.colno = String(r)), n && !t.lineno && (t.lineno = String(n)), i && !t.filename && (t.filename = i), t;
}, bu = function(e) {
  var t;
  try {
    var r = void 0;
    if ("reason" in e ? r = e.reason : "detail" in e && "reason" in e.detail && (r = e.detail.reason), r) {
      var n = Xn(r);
      return I(I({}, n), { name: (t = n && n.name) !== null && t !== void 0 ? t : "UnhandledRejection" });
    }
  } catch {
  }
}, wu = function(e) {
  return La(e) ? _u(e) : Na(e) ? bu(e) : Xn(e);
}, Ii = "jsError", yu = "hidden_3", Mi = function(e) {
  return e.visibilityState === "hidden";
}, xu = function(e, t) {
  var r = gt(), n = re();
  if (!(!r || !n)) {
    var i = function(a) {
      e(a.type === "pagehide" || Mi(r));
    }, o = Fo(r, "visibilitychange", i, true), s = Ge(n, "pagehide", i, true);
    t(function() {
      o(), s();
    }, function(a) {
      a(Mi(r));
    });
  }
}, Eu = [yu, xu], Su = function(e) {
  return e.readyState === "complete";
}, Cu = "unload_0", Pu = function(e, t) {
  var r = re();
  if (r) {
    var n = L(Bo(e), 1), i = n[0], o = ["unload", "beforeunload", "pagehide"], s = function() {
      i();
    }, a = [];
    o.forEach(function(l) {
      a.push(Ge(r, l, s, false));
    }), t(function() {
      a.forEach(function(l) {
        return l();
      });
    });
  }
}, Tu = [Cu, Pu], Ru = "history_0", Ou = "hash_0", Au = function(e, t) {
  var r = vl(), n = re();
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
    i.push(mn(r, "pushState", s)(), mn(r, "replaceState", s)()), i.push(Ge(n, "popstate", o, true)), t(function() {
      i.forEach(function(a) {
        return a();
      });
    });
  }
}, Iu = function(e, t) {
  var r = re();
  if (r) {
    var n = function() {
      return e(location.href);
    }, i = Ge(r, "hashchange", n, true);
    t(function() {
      i();
    });
  }
}, Mu = [Ou, Iu], Du = [Ru, Au], Lu = function(e) {
  return function(t) {
    var r;
    return e === "hash" ? ((r = Ei(t).hash) === null || r === void 0 ? void 0 : r.replace(/^#/, "")) || "/" : Ei(t).path;
  };
}, Zo = function(e) {
  return es(e, te());
}, es = function(e, t) {
  return e + "_" + t;
}, Nu = function(e, t, r, n) {
  var i = r, o = t;
  n && n(t);
  var s = function(l, c, u) {
    l !== "user_set" && c !== i ? (i = c, o = u ?? i, n && n(o), e(l, o)) : l === "user_set" && c !== o && (o = c, n && n(o), e(l, o));
  }, a = function() {
    t && e("init", t);
  };
  return [s, a];
}, ju = function(e, t) {
  var r = t, n = function(i, o) {
    o !== r && (r = o, e(i, r));
  };
  return [n];
}, $u = function(e, t) {
  return { ev_type: Ko, payload: { pid: t, source: e } };
}, Uu = function(e) {
  return function(t, r) {
    e($u(t, r));
  };
}, wn = function(e) {
  return e === "manual";
}, hr = "error_weight", Qr = "duration_apdex", er = "perf_apdex", Hu = "action", Fu = function() {
  var e;
  return e = { error_count: [0, 0, 0, 0], duration_count: [0, 0, 0] }, e[er] = {}, e;
}, Di = function(e, t) {
  var r = e[0] + e[1] + e[2], n = e[0] / r, i = e[2] / r;
  return i > t.frustrating_threshold ? 2 : n > t.satisfying_threshold || r === 0 ? 0 : 1;
}, Bu = function() {
  var e = 0, t = void 0, r = function(i) {
    if (i) {
      if (!t) return;
      e += te() - t, t = void 0;
    } else t = te();
  }, n = function() {
    t && (e += te() - t);
    var i = e;
    return e = 0, t = te(), i;
  };
  return [r, n];
}, Li = function(e, t) {
  return function(r, n) {
    var i = r.payload;
    switch (r.ev_type) {
      case Gl:
        var o = i.name;
        i.isSupport && e(n[er], o, i.value);
        break;
      case Yo:
        e(n[er], Hu, i.duration || 0);
        break;
      case Jo:
        t(n[hr], 0);
        break;
      case ar:
        if (i.response.is_custom_error || i.response.status >= 400) t(n[hr], 1);
        else {
          var s = i.response.timing;
          s && e(n[Qr], 0, s.duration);
        }
        break;
      case zl:
        t(n[hr], 2);
        break;
      case Yl:
        t(n[hr], 3);
        break;
      case Kl:
        e(n[Qr], 1, i.duration);
        break;
      case Jl:
        i.longtasks.forEach(function(a) {
          e(n[Qr], 2, a.duration);
        });
        break;
    }
  };
}, Ni = function() {
  var e, t, r = function() {
    e = [0, 0, 0], t = Fu();
  };
  r();
  var n = function(s, a, l) {
    var c = s && s[a];
    if (!(!c || l <= 0)) {
      var u = l < (c[0].threshold || 0) ? 0 : l > (c[1].threshold || 0) ? 2 : 1;
      if (e[u] += c[u].weight, typeof a == "string") {
        var h = es(a, u), p = t[er][h];
        t[er][h] = (p || 0) + 1;
      } else u === 2 && (t.duration_count[a] += 1);
    }
  }, i = function(s, a) {
    s && (e[2] += s[a], t.error_count[a] += 1);
  }, o = function() {
    return [e, t];
  };
  return [n, i, o, r];
}, ku = function() {
  var e = { start: te(), end: 0, time_spent: 0, is_bounced: false, entry: "", exit: "", p_count: 0, a_count: 0 }, t = function(s, a) {
    var l = L(s, 3), c = l[0], u = l[1], h = l[2];
    e.end = te(), e.time_spent += a && a.time_spent || 0, e.last_page = a, e.p_count += 1, e.rank = c, e.apdex = u, e.apdex_detail = h;
    var p = gt();
    p && (e.is_bounced = !Su(p));
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
}, Wu = function(e, t, r, n) {
  var i = n.sendInit, o = n.initPid, s = n.routeMode, a = n.extractPid, l = n.onPidUpdate, c = wn(s) ? function() {
    return "";
  } : Lu(s), u = a || (function() {
  }), h = function(R) {
    var A;
    return (A = u(R)) !== null && A !== void 0 ? A : c(R);
  }, p = L(Nu(Uu(e), o || h(location.href), c(location.href), l), 2), g = p[0], S = p[1];
  if (!wn(s)) {
    var P = L(ju(function(R, A) {
      return g(R, c(A), u(A));
    }, ""), 1), j = P[0];
    r.length && r.forEach(function(R) {
      return t.push(R[0](function(A) {
        return j(s, A);
      }));
    });
  }
  return i && S(), [g.bind(null, "user_set")];
}, Vu = function(e, t, r, n) {
  var i = L(r, 2), o = i[0], s = i[1], a = n.apdex === 2, l = void 0, c = void 0, u = void 0, h = false, p = L(Ni(), 4), g = p[0], S = p[1], P = p[2], j = p[3], R = L(Ni(), 4), A = R[0], _ = R[1], x = R[2], k = R[3], q = L(ku(), 5), ae = q[0], xe = q[1], Ae = q[2], Be = q[3], ct = q[4], ft = L(Bu(), 2), _t = ft[0], Nt = ft[1];
  t.push(o[0](_t)), !a && t.push(s[0](function() {
    if (h) {
      var z = L(x(), 2), Ee = z[0], jt = z[1], Yr = Di(Ee, u);
      ae([Yr, Ee, jt], J()), e({ ev_type: Go, payload: ct() }), k();
    }
  }));
  var fr = Li(g, S), ue = Li(A, _), ee = function(z) {
    h && (a || (ue(z, u), z.ev_type === Yo && Ae()), z.common.pid === l[1] && fr(z, u));
  }, J = function() {
    var z = L(P(), 2), Ee = z[0], jt = z[1];
    return { start: l[0], pid: l[1], view_id: l[2], end: te(), time_spent: Nt(), apdex: Ee, rank: Di(Ee, u), detail: jt };
  }, ke = function(z, Ee) {
    if (!l) {
      l = [te(), z, Ee], Be(z), h = !!(u && l);
      return;
    }
    h && (c = J(), xe(c, z)), l = [te(), z, Ee], j();
  }, bt = function(z) {
    h && (z.payload.last = c), e(z);
  }, We = function(z) {
    if (!z) {
      t.forEach(function(Ee) {
        return Ee();
      }), t.length = 0;
      return;
    }
    u = z, h = !!(u && l);
  };
  return t.push(function() {
    h = false;
  }), [ke, ee, bt, We];
}, Cr = "pageview", qu = { sendInit: true, routeMode: "history", apdex: 2 };
function zu(e, t) {
  var r, n = $r(t, qu);
  if (!(!n || !Lo())) {
    var i = n.routeMode, o = n.apdex, s = e.report.bind(e), a = ie;
    if (o) {
      var l = [], c = L(Vu(e.report.bind(e), l, [It(e, Eu), It(e, Tu)], n), 4), u = c[0], h = c[1], p = c[2], g = c[3];
      s = p, a = u, e.on("send", h), l.push(function() {
        return e.off("send", h);
      }), e.on("start", function() {
        g(e.config().apdex);
      }), Sr(e, Cr, Go, l);
    }
    var S = [], P = L(Wu(s, S, wn(i) ? [] : [e.initSubject(Mu), e.initSubject(Du)], I(I({}, n), { initPid: (r = e.config()) === null || r === void 0 ? void 0 : r.pid, onPidUpdate: function(A) {
      var _ = Zo(A);
      a(A, _), e.set({ pid: A, viewId: _, actionId: void 0 });
    } })), 1), j = P[0];
    Do(e, [yl, xl(e)], -1);
    var R = function() {
      j(e.config().pid);
    };
    e.on("config", R), S.push(function() {
      return e.off("config", R);
    }), Sr(e, Cr, Ko, S), e.provide("sendPageview", j);
  }
}
function Ku(e) {
  e.on("init", function() {
    var t, r = (t = e.config()) === null || t === void 0 ? void 0 : t.plugins[Cr];
    zu(e, r);
  });
}
var Gu = "event", Ju = "log", Yu = function(e) {
  if (!(!e || !se(e)) && !(!e.name || !He(e.name))) {
    var t = { name: e.name, type: Gu };
    if ("metrics" in e && se(e.metrics)) {
      var r = e.metrics, n = {};
      for (var i in r) Lr(r[i]) && (n[i] = r[i]);
      t.metrics = n;
    }
    if ("categories" in e && se(e.categories)) {
      var o = e.categories, s = {};
      for (var i in o) s[i] = At(o[i]);
      t.categories = s;
    }
    return "attached_log" in e && He(e.attached_log) && (t.attached_log = e.attached_log), t;
  }
}, Xu = function(e) {
  if (!(!e || !se(e)) && !(!e.content || !He(e.content))) {
    var t = e.content, r = { content: At(t), type: Ju, level: "info" };
    if ("level" in e && (r.level = e.level), "extra" in e && se(e.extra)) {
      var n = e.extra, i = {}, o = {};
      for (var s in n) Lr(n[s]) ? i[s] = n[s] : o[s] = At(n[s]);
      r.metrics = i, r.categories = o;
    }
    return "attached_log" in e && He(e.attached_log) && (r.attached_log = e.attached_log), r;
  }
}, Qu = function(e) {
  var t = function(n) {
    var i = Yu(n);
    if (i) {
      var o = Al(t);
      o && (i.stacks = o), e.report({ ev_type: Ci, payload: i, extra: { timestamp: te() } });
    }
  }, r = function(n) {
    var i = Xu(n);
    i && e.report({ ev_type: Ci, payload: i, extra: { timestamp: te() } });
  };
  e.provide("sendEvent", t), e.provide("sendLog", r);
}, Zu = function(e) {
  var t = No(), r = bn(t);
  t && (t.onchange = function() {
    r = bn(t);
  }), e.on("report", function(n) {
    return I(I({}, n), { extra: I(I({}, n.extra || {}), { network_type: r }) });
  });
}, pr = function(e, t) {
  var r = e.common || {};
  return r.sample_rate = t, e.common = r, e;
}, yn = function(e, t, r, n, i) {
  return e ? /* @__PURE__ */ (function(o) {
    return function() {
      return o;
    };
  })(i(n, t)) : function() {
    return r(t);
  };
}, ec = function(e, t) {
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
}, tc = function(e, t, r) {
  switch (r) {
    case "eq":
      return Ot(t, e);
    case "neq":
      return !Ot(t, e);
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
}, rc = function(e, t, r, n) {
  var i = xr(e, t, function(s, a) {
    return s[a];
  });
  if (i === void 0) return false;
  var o = Ia(i) ? "bool" : Lr(i) ? "number" : "string";
  return tc(i, ec(n, o), r);
}, xn = function(e, t) {
  try {
    return t.type === "rule" ? rc(e, t.field, t.op, t.values) : t.type === "and" ? t.children.every(function(r) {
      return xn(e, r);
    }) : t.children.some(function(r) {
      return xn(e, r);
    });
  } catch (r) {
    return Uo(r), false;
  }
}, nc = function(e, t, r, n, i, o) {
  var s = {};
  return Object.keys(e).forEach(function(a) {
    var l = e[a], c = l.enable, u = l.sample_rate, h = l.conditional_sample_rules;
    c ? (s[a] = { enable: c, sample_rate: u, effectiveSampleRate: u * r, hit: yn(t, u, n, i, o) }, h && (s[a].conditional_hit_rules = h.map(function(p) {
      var g = p.sample_rate, S = p.filter;
      return { sample_rate: g, hit: yn(t, g, n, i, o), effectiveSampleRate: g * r, filter: S };
    }))) : s[a] = { enable: c, hit: function() {
      return false;
    }, sample_rate: 0, effectiveSampleRate: 0 };
  }), s;
}, ic = function(e, t, r, n, i) {
  if (!t) return $n;
  var o = t.sample_rate, s = t.include_users, a = t.sample_granularity, l = t.rules, c = t.r, u = c === void 0 ? Math.random() : c, h = Ot(s, e);
  if (h) return function(P) {
    return pr(P, 1);
  };
  var p = a === "session", g = yn(p, o, r, u, n), S = nc(l, p, o, r, u, n);
  return function(P) {
    var j;
    if (!g()) return p && i[0](), false;
    if (!(P.ev_type in S)) return pr(P, o);
    if (!S[P.ev_type].enable) return p && i[1](P.ev_type), false;
    if (!((j = P.common) === null || j === void 0) && j.sample_rate) return P;
    var R = S[P.ev_type], A = R.conditional_hit_rules;
    if (A) {
      for (var _ = 0; _ < A.length; _++) if (xn(P, A[_].filter)) return A[_].hit() ? pr(P, A[_].effectiveSampleRate) : false;
    }
    return R.hit() ? pr(P, R.effectiveSampleRate) : (!(A && A.length) && p && i[1](P.ev_type), false);
  };
}, oc = function(e) {
  e.on("start", function() {
    var t = e.config(), r = t.userId, n = t.sample, i = [function() {
      e.destroy();
    }, function(s) {
      e.destroyAgent.removeByEvType(s);
    }], o = ic(r, n, kn, Ka, i);
    e.on("build", o);
  });
}, sc = function() {
  var e = re();
  return e && e.navigator.sendBeacon ? { get: function() {
  }, post: function(t, r) {
    e.navigator.sendBeacon(t, r);
  } } : { get: ie, post: ie };
};
function ac(e) {
  var t = new Error(e);
  return t.name = "ReqeustServerError", t;
}
function ji(e) {
  var t = new Error(e);
  return t.name = "RequestNetworkError", t;
}
var $i = function(e, t, r) {
  var n = t.url, i = t.data, o = t.success, s = o === void 0 ? ie : o, a = t.fail, l = a === void 0 ? ie : a, c = t.getResponseText, u = c === void 0 ? ie : c, h = t.withCredentials, p = h === void 0 ? false : h, g = new r();
  g.withCredentials = p, g.open(e, n, true), g.setRequestHeader("Content-Type", "application/json"), g.onload = function() {
    u?.(this.responseText);
    try {
      if (this.status >= 400) l(ac(this.responseText || this.statusText));
      else if (this.responseText) {
        var S = JSON.parse(this.responseText);
        s(S);
      } else s({});
    } catch (P) {
      l(P);
    }
  }, g.onerror = function() {
    l(ji("Network request failed"));
  }, g.onabort = function() {
    l(ji("Network request aborted"));
  }, g.send(i);
}, lc = function() {
  var e = gl();
  return e ? { useBeacon: true, get: function(t) {
    $i("GET", t, e);
  }, post: function(t) {
    $i("POST", t, e);
  } } : { get: ie, post: ie };
};
function uc(e) {
  var t = Ra(e), r = t.send;
  return Sl(function() {
    if (e.transport.useBeacon) {
      var n = sc(), i = t.getBatchData();
      i && (n.post(t.getEndpoint(), i), t.clear()), t.send = function(o) {
        n.post(t.getEndpoint(), Ro([o]));
      }, Cl(function() {
        t.send = r;
      });
    } else t.flush();
  }), t;
}
var cc = "mon.zijieapi.com", fc = "https://lf3-short.ibytedapm.com/slardar/fe/sdk-web/plugins", Ur = "1.16.4", dc = "SDK_SLARDAR_WEB", ts = "/monitor_web/settings/browser-settings", rs = "/monitor_browser/collect/batch/", ns = "SLARDAR", Ui = ["/log/sentry/", rs, ts], is = "session", hc = ["blankScreen", "action"], pc = { sample_rate: 1, include_users: [], sample_granularity: is, rules: {} }, vc = 20, gc = "";
function mc(e, t, r) {
  r === void 0 && (r = bc), El(function() {
    e.on("init", function() {
      r(e, t);
    });
  });
}
var os = function(e, t, r, n) {
  n === void 0 && (n = Qn);
  var i = t.config(), o = i.plugins, s = i.pluginBundle, a = e.filter(function(c) {
    return o[c] && !t.destroyAgent.has(c);
  }), l = function() {
    return a.forEach(function(c) {
      return En(t, c, r);
    });
  };
  a.every(function(c) {
    return as(c, r);
  }) ? l() : n(t, { name: s.name }, l);
}, ss = function(e, t, r, n) {
  n === void 0 && (n = Qn);
  var i = t.config().plugins;
  e.filter(function(o) {
    return i[o] && !t.destroyAgent.has(o);
  }).forEach(function(o) {
    as(o, r) ? En(t, o, r) : n(t, { name: o, config: i[o] }, function() {
      return En(t, o, r);
    });
  });
}, _c = function(e) {
  return function(t, r) {
    var n, i = e.config().pluginBundle;
    e.destroyAgent.has(t) && e.destroyAgent.remove(t), r !== void 0 && e.set({ plugins: I(I({}, e.config().plugins), (n = {}, n[t] = r, n)) }), i && ~i.plugins.indexOf(t) ? os([t], e) : ss([t], e);
  };
};
function bc(e, t, r) {
  r === void 0 && (r = Qn);
  var n = e.config().pluginBundle, i = n ? n.plugins : [];
  os(i, e, t, r), ss(hc, e, t, r), e.provide("reloadPlugin", _c(e));
}
function Qn(e, t, r, n) {
  var i = t.name, o = t.config;
  n === void 0 && (n = Pl);
  var s = wc(e, i, o);
  n(s, function() {
    r();
  });
}
function wc(e, t, r) {
  var n;
  return (n = r?.path) !== null && n !== void 0 ? n : e.config().pluginPathPrefix + "/" + Fa(t) + "." + Ur + "." + gc + "js";
}
function En(e, t, r) {
  if (r === void 0 && (r = Dt(re())), !!r) {
    var n = Zn(r, t);
    if (!n) {
      Er("[loader].applyPlugin not found", t);
      return;
    }
    try {
      if (e.destroyAgent.has(t)) return;
      n.apply(e);
    } catch (i) {
      Uo(i), Er("[loader].applyPlugin failed", t, i);
    }
  }
}
function Zn(e, t) {
  return e.plugins.filter(function(r) {
    return r.name === t && r.version === Ur;
  })[0];
}
function as(e, t) {
  return t === void 0 && (t = Dt(re())), !t || !t.plugins ? false : !!Zn(t, e);
}
function ls(e, t, r) {
  r === void 0 && (r = Dt(re())), !(!r || !r.plugins) && (Zn(r, e) || r.plugins.push({ name: e, version: Ur, apply: t }));
}
function us(e) {
  var t, r, n = ["userId", "deviceId", "sessionId", "env"];
  try {
    for (var i = Ca(n), o = i.next(); !o.done; o = i.next()) {
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
function yc(e) {
  var t = e.plugins || {};
  for (var r in t) t[r] && !se(t[r]) && (t[r] = {});
  return us(I(I({}, e), { plugins: t }));
}
function xc(e) {
  return se(e) && "bid" in e;
}
function Ec(e) {
  return us(I({}, e));
}
function Sc(e) {
  var t;
  if (!e) return {};
  var r = e.sample, n = e.plugins, i = e.timestamp, o = e.quota_rate, s = o === void 0 ? 1 : o, a = e.apdex;
  if (!r) return {};
  var l = r.sample_rate, c = r.sample_granularity, u = c === void 0 ? is : c, h = r.include_users, p = r.rules, g = p === void 0 ? [] : p;
  return { sample: { include_users: h, sample_rate: l * s, sample_granularity: u, rules: g.reduce(function(S, P) {
    var j = P.name, R = P.enable, A = P.sample_rate, _ = P.conditional_sample_rules;
    return S[j] = { enable: R, sample_rate: A, conditional_sample_rules: _ }, S;
  }, {}) }, plugins: { heatmap: (t = n?.heatmap) !== null && t !== void 0 ? t : false }, apdex: a, serverTimestamp: i };
}
var Cc = function(e, t) {
  return t === void 0 && (t = rs), (e && e.indexOf("//") >= 0 ? "" : "https://") + e + t;
}, Pc = function(e, t) {
  return t === void 0 && (t = ts), (e && e.indexOf("//") >= 0 ? "" : "https://") + e + t;
}, Tc = function() {
  return _n();
}, Rc = function(e) {
  var t = [];
  return e.observe = function(r) {
    t.push(r);
  }, e.push = function() {
    for (var r, n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    return n.forEach(function(o) {
      t.forEach(function(s) {
        return s(o);
      });
    }), (r = [].push).call.apply(r, ye([e], L(n), false));
  }, e;
}, cs = function(e) {
  return ns + e;
}, fs = function(e, t) {
  return ns + e + "::setting::" + t;
}, Oc = function(e, t) {
  try {
    var r = localStorage.getItem(e);
    if (!r || !qn() || r[0] !== "{") return;
    zn(e, JSON.parse(r), t);
  } catch {
  }
}, Ac = function(e, t) {
  e === void 0 && (e = "");
  var r = { userId: _n(), deviceId: _n() };
  if (t <= 0) return r;
  var n = cs(e);
  Oc(n, t);
  var i = ko(n);
  return { userId: i?.userId || r.userId, deviceId: i?.deviceId || r.deviceId };
}, Ic = function(e) {
  var t = e.bid, r = e.userId, n = e.deviceId, i = e.storageExpires, o = cs(t);
  zn(o, { userId: r, deviceId: n }, Wo(i));
}, Mc = function(e, t) {
  var r = fs(e, t);
  return ko(r);
}, Dc = function(e, t, r, n) {
  var i = fs(t, r);
  zn(i, e, n);
}, Lc = { get: function() {
  return this.__SLARDAR__REPALCE__HOLDER__;
} }, Nc = function(e) {
  var t = e, r, n = {}, i = Lc.get(), o, s = ie, a = ie;
  return { getConfig: function() {
    return t;
  }, setConfig: function(u) {
    return n = I(I({}, n), u || {}), l(), r || (r = u, t.useLocalConfig || !t.bid ? (o = {}, s()) : i ? c() : jc(t.transport, t.domain, t.bid, function(h) {
      i = h, c();
    }, t.serverSettingStorageExpires)), t;
  }, onChange: function(u) {
    a = u;
  }, onReady: function(u) {
    s = function() {
      Ic(t), u();
    }, o && s();
  } };
  function l() {
    var u = I(I(I({}, e), o || {}), n);
    u.plugins = $a(e.plugins, o?.plugins || {}, n.plugins || {}), u.sample = Hi(Hi(e.sample, o?.sample), n.sample), t = u, a();
  }
  function c() {
    o = Sc(i), l(), s();
  }
};
function jc(e, t, r, n, i) {
  i === void 0 && (i = 0);
  var o = 3, s = 2e3, a = 1e-3, l = re(), c = Mc(r, t), u = Il(), h = 0, p = false, g;
  if (u()) return A();
  S();
  function S() {
    h++, e.get({ withCredentials: true, url: Pc(t) + "?bid=" + r + "&store=1", success: function(_) {
      P(_.data || {}, true);
    }, fail: j });
  }
  function P(_, x) {
    p || (p = true, x && i && Dc(_, r, t, i), g && (g(), g = void 0), n(_));
  }
  function j(_) {
    if (c) return P(c, false);
    if (R(_) && l) {
      l.setTimeout(S, s);
      return;
    }
    return P({ sample: { sample_rate: a } }, false);
  }
  function R(_) {
    return h >= o || _.name !== "RequestNetworkError" ? false : bl();
  }
  function A() {
    if (c) return P(c, false);
    g = Ml(S);
  }
}
function Hi(e, t) {
  if (!e || !t) return e || t;
  var r = I(I({}, e), t);
  return r.include_users = ye(ye([], L(e.include_users || []), false), L(t.include_users || []), false), r.rules = ye(ye([], L(Object.keys(e.rules || {})), false), L(Object.keys(t.rules || {})), false).reduce(function(n, i) {
    var o, s;
    return i in n || (i in (e.rules || {}) && i in (t.rules || {}) ? (n[i] = I(I({}, e.rules[i]), t.rules[i]), n[i].conditional_sample_rules = ye(ye([], L(e.rules[i].conditional_sample_rules || []), false), L(t.rules[i].conditional_sample_rules || []), false)) : n[i] = ((o = e.rules) === null || o === void 0 ? void 0 : o[i]) || ((s = t.rules) === null || s === void 0 ? void 0 : s[i])), n;
  }, {}), r;
}
var $c = { build: function(e) {
  return { ev_type: e.ev_type, payload: e.payload, common: I(I({}, e.extra || {}), e.overrides || {}) };
} }, Uc = function(e, t) {
  var r = t || {}, n = r.pid, i = n === void 0 ? "" : n, o = r.viewId, s = o === void 0 ? "" : o, a = { url: Wn(), timestamp: te(), sdk_version: Ur, sdk_name: dc, pid: i, view_id: s };
  return I(I({}, e), { extra: I(I({}, a), e.extra || {}) });
}, Hc = function(e) {
  e.on("report", function(t) {
    return Uc(t, e.config());
  }), e.on("init", function() {
    var t = e.config(), r = t.pid, n = t.viewId, i = e.getPreStartQueue();
    i.forEach(function(o, s) {
      var a = o.extra || {};
      i[s] = I(I({}, o), { extra: I(I({}, a), { pid: a.pid || r, view_id: a.view_id || n }) });
    });
  });
}, Fc = { sri: "reportSri", st: "reportResourceError", err: "captureException", reject: "captureException" }, Bc = function(e) {
  return Object.keys(e).reduce(function(t, r) {
    return t[r] = [], t;
  }, {});
}, kc = function(e) {
  return Object.keys(e).reduce(function(t, r) {
    return t[e[r]] ? t[e[r]].push(r) : t[e[r]] = [r], t;
  }, {});
}, Wc = function(e, t, r) {
  return function(n, i, o, s) {
    var a;
    o === void 0 && (o = te()), s === void 0 && (s = location.href);
    var l = I(I({}, Ho(e)), { url: s, timestamp: o });
    t[n] && (e[r[n]] ? Vn(e, l)(function() {
      e[r[n]](i);
    }) : (a = t[n]) === null || a === void 0 || a.push([i, l]));
  };
}, Vc = function(e, t, r) {
  return function(n) {
    n in r && r[n].forEach(function(i) {
      var o;
      (o = t[i]) === null || o === void 0 || o.forEach(function(s) {
        var a = L(s, 2), l = a[0], c = a[1];
        Vn(e, c)(function() {
          e[n](l);
        });
      }), t[i] = null;
    });
  };
}, Zr = function(e, t) {
  return t === "err" ? xr(e, "plugins." + Ii + ".onerror", function(r, n) {
    return r[n];
  }) !== false : t === "reject" ? xr(e, "plugins." + Ii + ".onunhandledrejection", function(r, n) {
    return r[n];
  }) !== false : true;
}, qc = function(e, t) {
  var r;
  t === void 0 && (t = Fc);
  var n = Bc(t), i = kc(t), o = Wc(e, n, t);
  !((r = e.p) === null || r === void 0) && r.a && "observe" in e.p.a && e.p.a.observe(function(s) {
    var a = L(s, 5);
    a[0];
    var l = a[1], c = a[2], u = a[3], h = a[4], p = e.config();
    Zr(p, l) && o(l, c, u, h);
  }), e.on("init", function() {
    var s, a = e.config();
    (s = e.p) === null || s === void 0 || s.a.forEach(function(l) {
      var c = L(l, 5);
      c[0];
      var u = c[1], h = c[2], p = c[3], g = c[4];
      Zr(a, u) && o(u, h, p, g);
    }), e.p && e.p.a && (e.p.a.length = 0), e.provide("precollect", function(l, c, u, h) {
      u === void 0 && (u = te()), h === void 0 && (h = location.href), Zr(a, l) && o(l, c, u, h);
    });
  }), e.on("provide", Vc(e, n, i));
}, Fi = function(e) {
  var t = L(e, 2), r = t[0], n = t[1];
  return { ev_type: Jo, payload: { error: wu(r), breadcrumbs: [], extra: n || {} }, extra: { bid: "slardar_sdk" } };
}, zc = 1e-3, Kc = function(e, t) {
  t === void 0 && (t = zc);
  var r = Dt(re());
  r && (r.errors || (r.errors = []), !("observe" in r.errors) && kn(t) && (r.errors = Rc(r.errors), r.errors.forEach(function(n) {
    e.report(Fi(n));
  }), r.errors.observe(function(n) {
    e.report(Fi(n));
  })));
}, Gc = 700, Jc = function(e) {
  var t, r = false;
  e.on("init", function() {
    t = (/* @__PURE__ */ new Date()).getTime(), e.on("config", function() {
      var n, i = (n = e.config()) === null || n === void 0 ? void 0 : n.serverTimestamp;
      if (!(isNaN(i) || Number(i) <= 0 || r)) {
        r = true;
        var o = (/* @__PURE__ */ new Date()).getTime(), s = o - t;
        if (s < Gc && i) {
          var a = i - (o + t) / 2;
          !isNaN(a) && (a > 0 || a < -6e5) && e.on("beforeBuild", function(l) {
            var c;
            return I(I({}, l), { extra: I(I({}, (c = l.extra) !== null && c !== void 0 ? c : {}), { sdk_offset: a ?? 0 }) });
          });
        }
      }
    });
  });
}, Yc = function(e, t) {
  var r = {};
  return r.bid = t.bid, r.user_id = t.userId, r.device_id = t.deviceId, r.session_id = t.sessionId, r.release = t.release, r.env = t.env, I(I({}, e), { extra: I(I({}, r), e.extra || {}) });
}, Xc = function(e) {
  e.on("beforeBuild", function(t) {
    return Yc(t, e.config());
  });
}, Qc = function(e) {
  e.on("start", function() {
    var t = e.config().bid, r = e.getSender();
    r.setEndpoint(r.getEndpoint() + ("?biz_id=" + t));
  });
}, Zc = function(e) {
  var t = Wo(e.storageExpires), r = Ac(e.bid, t);
  return { bid: "", pid: "", viewId: Zo("_"), userId: r.userId, deviceId: r.deviceId, storageExpires: t, serverSettingStorageExpires: 0, sessionId: Tc(), domain: cc, pluginBundle: { name: "commonMonitors", plugins: ["breadcrumb", "jsError", "performance", "resourceError", "resource"] }, pluginPathPrefix: fc, plugins: { ajax: { ignoreUrls: Ui }, fetch: { ignoreUrls: Ui }, breadcrumb: {}, pageview: {}, jsError: {}, resource: {}, resourceError: {}, performance: {}, tti: {}, fmp: {}, blankScreen: false, heatmap: false }, release: "", env: "production", sample: pc, transport: lc() };
}, ef = function(e) {
  var t = e === void 0 ? {} : e, r = t.createSender, n = r === void 0 ? function(h) {
    return uc({ size: vc, endpoint: Cc(h.domain), transport: h.transport });
  } : r, i = t.builder, o = i === void 0 ? $c : i, s = t.createDefaultConfig, a = s === void 0 ? Zc : s, l = al({ validateInitConfig: xc, initConfigNormalizer: yc, userConfigNormalizer: Ec, createSender: n, builder: o, createDefaultConfig: a, createConfigManager: Nc });
  Kc(l), ll(l);
  var c = Dt(re());
  hl(l, c && c.subject), Jc(l), Xc(l), Hc(l), Zu(l), Qc(l);
  var u = ul(l, Ho, function(h, p, g) {
    return Vn(h, p)(function() {
      var S = L(g), P = S[0], j = S.slice(1);
      l[P].apply(l, ye([], L(j), false));
    });
  });
  return cl(u, ls), pl(u), u;
}, Bt, en = (Bt = {}, Bt[Cr] = Ku, Bt[Gn] = uu, Bt[Yn] = gu, Bt), ds = function(e) {
  e === void 0 && (e = {});
  var t = ef(e);
  return oc(t), qc(t), Qu(t), Object.keys(en).forEach(function(r) {
    ls(r, en[r]), en[r](t);
  }), mc(t), t.provide("create", ds), t;
}, tn = "precollect", Bi = 1e3 * 60 * 5;
function tf(e, t) {
  if ("addEventListener" in e) {
    t.pcErr = function(n) {
      n = n || e.event;
      var i = n.target || n.srcElement || {};
      i instanceof Element || i instanceof HTMLElement ? t(tn, "st", { tagName: i.tagName, url: i.getAttribute("href") || i.getAttribute("src") }) : t(tn, "err", n.error);
    }, t.pcRej = function(n) {
      n = n || e.event, t(tn, "reject", n.reason || n.detail && n.detail.reason);
    };
    var r = [];
    r.push(Ge(e, "error", t.pcErr, true)), r.push(Ge(e, "unhandledrejection", t.pcRej, true)), setTimeout(function() {
      r.forEach(function(n) {
        return n();
      });
    }, Bi);
  }
  "PerformanceObserver" in e && "PerformanceLongTaskTiming" in e && (t.pp = { entries: [] }, t.pp.observer = new PerformanceObserver(function(n) {
    t.pp.entries = t.pp.entries.concat(n.getEntries());
  }), t.pp.observer.observe({ entryTypes: ["longtask"] }), setTimeout(function() {
    t.pp.observer.disconnect();
  }, Bi));
}
var _r = ds(), ki = re();
ki && tf(ki, _r);
const Wi = ["RequestError", "AbortError", "TimeoutError", "cancelled", "Stream read timeout after", "get cert timeout", "internal/net", "unexcepted status code", "ETIMEDOUT", "ECONNRESET", "Invalid WebSocket frame", "WebSocket was closed", "/ws/lib/", "Request failed:"], rf = [{ pattern: /([/\\]Users[/\\])[^/\\]+([/\\])/gi, replacement: "$1[USERNAME]$2" }, { pattern: /([/\\])\d+(?:\.\d+){1,}([/\\])/g, replacement: "$1[VERSION]$2" }, { pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, replacement: "[UUID]" }, { pattern: /[\d.]+ ?(bytes|[KMGT]i?B)\b/gi, replacement: "[SIZE] $1" }, { pattern: /[\d.]+%/g, replacement: "[PERCENT]" }];
function Vi(e) {
  let t = e;
  for (const r of rf) t = t.replace(r.pattern, r.replacement);
  return t;
}
function nf(e) {
  if (Wi.length === 0) return false;
  let t = "";
  return e instanceof Error ? t = `${e.name} ${e.message} ${e.stack ?? ""}` : typeof e == "string" ? t = e : t = String(e), Wi.some((r) => t.includes(r));
}
function of(e) {
  const r = new URLSearchParams(window.location.search).get("global_config"), n = JSON.parse(r ?? "{}");
  _r.on("beforeSend", (i) => {
    const s = i?.payload?.error;
    if (s) {
      const a = { name: s.name ?? "", message: s.message ?? "", stack: s.stack ?? "" };
      if (nf(a)) return false;
      s.message && (s.message = Vi(s.message)), s.stack && (s.stack = Vi(s.stack));
    }
    return i;
  }), _r.init({ bid: "luna_pc", deviceId: n.deviceId, userId: n.deviceId, pid: e, release: "3.7.0", env: "production" }), _r.start();
}
of("update");
function ei(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const Z = {}, xt = [], Ue = () => {
}, hs = () => false, Hr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ti = (e) => e.startsWith("onUpdate:"), he = Object.assign, ri = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, sf = Object.prototype.hasOwnProperty, G = (e, t) => sf.call(e, t), H = Array.isArray, Et = (e) => Fr(e) === "[object Map]", ps = (e) => Fr(e) === "[object Set]", U = (e) => typeof e == "function", oe = (e) => typeof e == "string", Ze = (e) => typeof e == "symbol", ne = (e) => e !== null && typeof e == "object", vs = (e) => (ne(e) || U(e)) && U(e.then) && U(e.catch), gs = Object.prototype.toString, Fr = (e) => gs.call(e), af = (e) => Fr(e).slice(8, -1), ms = (e) => Fr(e) === "[object Object]", ni = (e) => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, zt = ei(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Br = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, lf = /-\w/g, Te = Br((e) => e.replace(lf, (t) => t.slice(1).toUpperCase())), uf = /\B([A-Z])/g, mt = Br((e) => e.replace(uf, "-$1").toLowerCase()), kr = Br((e) => e.charAt(0).toUpperCase() + e.slice(1)), rn = Br((e) => e ? `on${kr(e)}` : ""), lt = (e, t) => !Object.is(e, t), nn = (e, ...t) => {
  for (let r = 0; r < e.length; r++) e[r](...t);
}, _s = (e, t, r, n = false) => {
  Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: n, value: r });
}, cf = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let qi;
const Wr = () => qi || (qi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function lr(e) {
  if (H(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], i = oe(n) ? pf(n) : lr(n);
      if (i) for (const o in i) t[o] = i[o];
    }
    return t;
  } else if (oe(e) || ne(e)) return e;
}
const ff = /;(?![^(]*\))/g, df = /:([^]+)/, hf = /\/\*[^]*?\*\//g;
function pf(e) {
  const t = {};
  return e.replace(hf, "").split(ff).forEach((r) => {
    if (r) {
      const n = r.split(df);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Lt(e) {
  let t = "";
  if (oe(e)) t = e;
  else if (H(e)) for (let r = 0; r < e.length; r++) {
    const n = Lt(e[r]);
    n && (t += n + " ");
  }
  else if (ne(e)) for (const r in e) e[r] && (t += r + " ");
  return t.trim();
}
const vf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", gf = ei(vf);
function bs(e) {
  return !!e || e === "";
}
const ws = (e) => !!(e && e.__v_isRef === true), Kt = (e) => oe(e) ? e : e == null ? "" : H(e) || ne(e) && (e.toString === gs || !U(e.toString)) ? ws(e) ? Kt(e.value) : JSON.stringify(e, ys, 2) : String(e), ys = (e, t) => ws(t) ? ys(e, t.value) : Et(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((r, [n, i], o) => (r[on(n, o) + " =>"] = i, r), {}) } : ps(t) ? { [`Set(${t.size})`]: [...t.values()].map((r) => on(r)) } : Ze(t) ? on(t) : ne(t) && !H(t) && !ms(t) ? String(t) : t, on = (e, t = "") => {
  var r;
  return Ze(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e;
};
let we;
class mf {
  constructor(t = false) {
    this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = we, !t && we && (this.index = (we.scopes || (we.scopes = [])).push(this) - 1);
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
      const r = we;
      try {
        return we = this, t();
      } finally {
        we = r;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = we, we = this);
  }
  off() {
    this._on > 0 && --this._on === 0 && (we = this.prevScope, this.prevScope = void 0);
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
function _f() {
  return we;
}
let Q;
const sn = /* @__PURE__ */ new WeakSet();
class xs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, we && we.active && we.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, sn.has(this) && (sn.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ss(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, zi(this), Cs(this);
    const t = Q, r = Re;
    Q = this, Re = true;
    try {
      return this.fn();
    } finally {
      Ps(this), Q = t, Re = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) si(t);
      this.deps = this.depsTail = void 0, zi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? sn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    Sn(this) && this.run();
  }
  get dirty() {
    return Sn(this);
  }
}
let Es = 0, Gt, Jt;
function Ss(e, t = false) {
  if (e.flags |= 8, t) {
    e.next = Jt, Jt = e;
    return;
  }
  e.next = Gt, Gt = e;
}
function ii() {
  Es++;
}
function oi() {
  if (--Es > 0) return;
  if (Jt) {
    let t = Jt;
    for (Jt = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; Gt; ) {
    let t = Gt;
    for (Gt = void 0; t; ) {
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
function Cs(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ps(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === r && (r = i), si(n), bf(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = r;
}
function Sn(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ts(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e._dirty;
}
function Ts(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === tr) || (e.globalVersion = tr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Sn(e)))) return;
  e.flags |= 2;
  const t = e.dep, r = Q, n = Re;
  Q = e, Re = true;
  try {
    Cs(e);
    const i = e.fn(e._value);
    (t.version === 0 || lt(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    Q = r, Re = n, Ps(e), e.flags &= -3;
  }
}
function si(e, t = false) {
  const { dep: r, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let o = r.computed.deps; o; o = o.nextDep) si(o, true);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function bf(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
let Re = true;
const Rs = [];
function Je() {
  Rs.push(Re), Re = false;
}
function Ye() {
  const e = Rs.pop();
  Re = e === void 0 ? true : e;
}
function zi(e) {
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
let tr = 0;
class wf {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ai {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
  }
  track(t) {
    if (!Q || !Re || Q === this.computed) return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== Q) r = this.activeLink = new wf(Q, this), Q.deps ? (r.prevDep = Q.depsTail, Q.depsTail.nextDep = r, Q.depsTail = r) : Q.deps = Q.depsTail = r, Os(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const n = r.nextDep;
      n.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = n), r.prevDep = Q.depsTail, r.nextDep = void 0, Q.depsTail.nextDep = r, Q.depsTail = r, Q.deps === r && (Q.deps = n);
    }
    return r;
  }
  trigger(t) {
    this.version++, tr++, this.notify(t);
  }
  notify(t) {
    ii();
    try {
      for (let r = this.subs; r; r = r.prevSub) r.sub.notify() && r.sub.dep.notify();
    } finally {
      oi();
    }
  }
}
function Os(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep) Os(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const Cn = /* @__PURE__ */ new WeakMap(), vt = Symbol(""), Pn = Symbol(""), rr = Symbol("");
function ce(e, t, r) {
  if (Re && Q) {
    let n = Cn.get(e);
    n || Cn.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(r);
    i || (n.set(r, i = new ai()), i.map = n, i.key = r), i.track();
  }
}
function ze(e, t, r, n, i, o) {
  const s = Cn.get(e);
  if (!s) {
    tr++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (ii(), t === "clear") s.forEach(a);
  else {
    const l = H(e), c = l && ni(r);
    if (l && r === "length") {
      const u = Number(n);
      s.forEach((h, p) => {
        (p === "length" || p === rr || !Ze(p) && p >= u) && a(h);
      });
    } else switch ((r !== void 0 || s.has(void 0)) && a(s.get(r)), c && a(s.get(rr)), t) {
      case "add":
        l ? c && a(s.get("length")) : (a(s.get(vt)), Et(e) && a(s.get(Pn)));
        break;
      case "delete":
        l || (a(s.get(vt)), Et(e) && a(s.get(Pn)));
        break;
      case "set":
        Et(e) && a(s.get(vt));
        break;
    }
  }
  oi();
}
function wt(e) {
  const t = K(e);
  return t === e ? t : (ce(t, "iterate", rr), Oe(e) ? t : t.map(Xe));
}
function li(e) {
  return ce(e = K(e), "iterate", rr), e;
}
function rt(e, t) {
  return ut(e) ? St(e) ? nr(Xe(t)) : nr(t) : Xe(t);
}
const yf = { __proto__: null, [Symbol.iterator]() {
  return an(this, Symbol.iterator, (e) => rt(this, e));
}, concat(...e) {
  return wt(this).concat(...e.map((t) => H(t) ? wt(t) : t));
}, entries() {
  return an(this, "entries", (e) => (e[1] = rt(this, e[1]), e));
}, every(e, t) {
  return Ve(this, "every", e, t, void 0, arguments);
}, filter(e, t) {
  return Ve(this, "filter", e, t, (r) => r.map((n) => rt(this, n)), arguments);
}, find(e, t) {
  return Ve(this, "find", e, t, (r) => rt(this, r), arguments);
}, findIndex(e, t) {
  return Ve(this, "findIndex", e, t, void 0, arguments);
}, findLast(e, t) {
  return Ve(this, "findLast", e, t, (r) => rt(this, r), arguments);
}, findLastIndex(e, t) {
  return Ve(this, "findLastIndex", e, t, void 0, arguments);
}, forEach(e, t) {
  return Ve(this, "forEach", e, t, void 0, arguments);
}, includes(...e) {
  return ln(this, "includes", e);
}, indexOf(...e) {
  return ln(this, "indexOf", e);
}, join(e) {
  return wt(this).join(e);
}, lastIndexOf(...e) {
  return ln(this, "lastIndexOf", e);
}, map(e, t) {
  return Ve(this, "map", e, t, void 0, arguments);
}, pop() {
  return kt(this, "pop");
}, push(...e) {
  return kt(this, "push", e);
}, reduce(e, ...t) {
  return Ki(this, "reduce", e, t);
}, reduceRight(e, ...t) {
  return Ki(this, "reduceRight", e, t);
}, shift() {
  return kt(this, "shift");
}, some(e, t) {
  return Ve(this, "some", e, t, void 0, arguments);
}, splice(...e) {
  return kt(this, "splice", e);
}, toReversed() {
  return wt(this).toReversed();
}, toSorted(e) {
  return wt(this).toSorted(e);
}, toSpliced(...e) {
  return wt(this).toSpliced(...e);
}, unshift(...e) {
  return kt(this, "unshift", e);
}, values() {
  return an(this, "values", (e) => rt(this, e));
} };
function an(e, t, r) {
  const n = li(e), i = n[t]();
  return n !== e && !Oe(e) && (i._next = i.next, i.next = () => {
    const o = i._next();
    return o.done || (o.value = r(o.value)), o;
  }), i;
}
const xf = Array.prototype;
function Ve(e, t, r, n, i, o) {
  const s = li(e), a = s !== e && !Oe(e), l = s[t];
  if (l !== xf[t]) {
    const h = l.apply(e, o);
    return a ? Xe(h) : h;
  }
  let c = r;
  s !== e && (a ? c = function(h, p) {
    return r.call(this, rt(e, h), p, e);
  } : r.length > 2 && (c = function(h, p) {
    return r.call(this, h, p, e);
  }));
  const u = l.call(s, c, n);
  return a && i ? i(u) : u;
}
function Ki(e, t, r, n) {
  const i = li(e);
  let o = r;
  return i !== e && (Oe(e) ? r.length > 3 && (o = function(s, a, l) {
    return r.call(this, s, a, l, e);
  }) : o = function(s, a, l) {
    return r.call(this, s, rt(e, a), l, e);
  }), i[t](o, ...n);
}
function ln(e, t, r) {
  const n = K(e);
  ce(n, "iterate", rr);
  const i = n[t](...r);
  return (i === -1 || i === false) && fi(r[0]) ? (r[0] = K(r[0]), n[t](...r)) : i;
}
function kt(e, t, r = []) {
  Je(), ii();
  const n = K(e)[t].apply(e, r);
  return oi(), Ye(), n;
}
const Ef = ei("__proto__,__v_isRef,__isVue"), As = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ze));
function Sf(e) {
  Ze(e) || (e = String(e));
  const t = K(this);
  return ce(t, "has", e), t.hasOwnProperty(e);
}
class Is {
  constructor(t = false, r = false) {
    this._isReadonly = t, this._isShallow = r;
  }
  get(t, r, n) {
    if (r === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, o = this._isShallow;
    if (r === "__v_isReactive") return !i;
    if (r === "__v_isReadonly") return i;
    if (r === "__v_isShallow") return o;
    if (r === "__v_raw") return n === (i ? o ? Lf : Ns : o ? Ls : Ds).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const s = H(t);
    if (!i) {
      let l;
      if (s && (l = yf[r])) return l;
      if (r === "hasOwnProperty") return Sf;
    }
    const a = Reflect.get(t, r, de(t) ? t : n);
    if ((Ze(r) ? As.has(r) : Ef(r)) || (i || ce(t, "get", r), o)) return a;
    if (de(a)) {
      const l = s && ni(r) ? a : a.value;
      return i && ne(l) ? Rn(l) : l;
    }
    return ne(a) ? i ? Rn(a) : Vr(a) : a;
  }
}
class Ms extends Is {
  constructor(t = false) {
    super(false, t);
  }
  set(t, r, n, i) {
    let o = t[r];
    const s = H(t) && ni(r);
    if (!this._isShallow) {
      const c = ut(o);
      if (!Oe(n) && !ut(n) && (o = K(o), n = K(n)), !s && de(o) && !de(n)) return c || (o.value = n), true;
    }
    const a = s ? Number(r) < t.length : G(t, r), l = Reflect.set(t, r, n, de(t) ? t : i);
    return t === K(i) && (a ? lt(n, o) && ze(t, "set", r, n) : ze(t, "add", r, n)), l;
  }
  deleteProperty(t, r) {
    const n = G(t, r);
    t[r];
    const i = Reflect.deleteProperty(t, r);
    return i && n && ze(t, "delete", r, void 0), i;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!Ze(r) || !As.has(r)) && ce(t, "has", r), n;
  }
  ownKeys(t) {
    return ce(t, "iterate", H(t) ? "length" : vt), Reflect.ownKeys(t);
  }
}
class Cf extends Is {
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
const Pf = new Ms(), Tf = new Cf(), Rf = new Ms(true);
const Tn = (e) => e, vr = (e) => Reflect.getPrototypeOf(e);
function Of(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, o = K(i), s = Et(o), a = e === "entries" || e === Symbol.iterator && s, l = e === "keys" && s, c = i[e](...n), u = r ? Tn : t ? nr : Xe;
    return !t && ce(o, "iterate", l ? Pn : vt), { next() {
      const { value: h, done: p } = c.next();
      return p ? { value: h, done: p } : { value: a ? [u(h[0]), u(h[1])] : u(h), done: p };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function gr(e) {
  return function(...t) {
    return e === "delete" ? false : e === "clear" ? void 0 : this;
  };
}
function Af(e, t) {
  const r = { get(i) {
    const o = this.__v_raw, s = K(o), a = K(i);
    e || (lt(i, a) && ce(s, "get", i), ce(s, "get", a));
    const { has: l } = vr(s), c = t ? Tn : e ? nr : Xe;
    if (l.call(s, i)) return c(o.get(i));
    if (l.call(s, a)) return c(o.get(a));
    o !== s && o.get(i);
  }, get size() {
    const i = this.__v_raw;
    return !e && ce(K(i), "iterate", vt), i.size;
  }, has(i) {
    const o = this.__v_raw, s = K(o), a = K(i);
    return e || (lt(i, a) && ce(s, "has", i), ce(s, "has", a)), i === a ? o.has(i) : o.has(i) || o.has(a);
  }, forEach(i, o) {
    const s = this, a = s.__v_raw, l = K(a), c = t ? Tn : e ? nr : Xe;
    return !e && ce(l, "iterate", vt), a.forEach((u, h) => i.call(o, c(u), c(h), s));
  } };
  return he(r, e ? { add: gr("add"), set: gr("set"), delete: gr("delete"), clear: gr("clear") } : { add(i) {
    !t && !Oe(i) && !ut(i) && (i = K(i));
    const o = K(this);
    return vr(o).has.call(o, i) || (o.add(i), ze(o, "add", i, i)), this;
  }, set(i, o) {
    !t && !Oe(o) && !ut(o) && (o = K(o));
    const s = K(this), { has: a, get: l } = vr(s);
    let c = a.call(s, i);
    c || (i = K(i), c = a.call(s, i));
    const u = l.call(s, i);
    return s.set(i, o), c ? lt(o, u) && ze(s, "set", i, o) : ze(s, "add", i, o), this;
  }, delete(i) {
    const o = K(this), { has: s, get: a } = vr(o);
    let l = s.call(o, i);
    l || (i = K(i), l = s.call(o, i)), a && a.call(o, i);
    const c = o.delete(i);
    return l && ze(o, "delete", i, void 0), c;
  }, clear() {
    const i = K(this), o = i.size !== 0, s = i.clear();
    return o && ze(i, "clear", void 0, void 0), s;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    r[i] = Of(i, e, t);
  }), r;
}
function ui(e, t) {
  const r = Af(e, t);
  return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(G(r, i) && i in n ? r : n, i, o);
}
const If = { get: ui(false, false) }, Mf = { get: ui(false, true) }, Df = { get: ui(true, false) };
const Ds = /* @__PURE__ */ new WeakMap(), Ls = /* @__PURE__ */ new WeakMap(), Ns = /* @__PURE__ */ new WeakMap(), Lf = /* @__PURE__ */ new WeakMap();
function Nf(e) {
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
function jf(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Nf(af(e));
}
function Vr(e) {
  return ut(e) ? e : ci(e, false, Pf, If, Ds);
}
function $f(e) {
  return ci(e, false, Rf, Mf, Ls);
}
function Rn(e) {
  return ci(e, true, Tf, Df, Ns);
}
function ci(e, t, r, n, i) {
  if (!ne(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = jf(e);
  if (o === 0) return e;
  const s = i.get(e);
  if (s) return s;
  const a = new Proxy(e, o === 2 ? n : r);
  return i.set(e, a), a;
}
function St(e) {
  return ut(e) ? St(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ut(e) {
  return !!(e && e.__v_isReadonly);
}
function Oe(e) {
  return !!(e && e.__v_isShallow);
}
function fi(e) {
  return e ? !!e.__v_raw : false;
}
function K(e) {
  const t = e && e.__v_raw;
  return t ? K(t) : e;
}
function Uf(e) {
  return !G(e, "__v_skip") && Object.isExtensible(e) && _s(e, "__v_skip", true), e;
}
const Xe = (e) => ne(e) ? Vr(e) : e, nr = (e) => ne(e) ? Rn(e) : e;
function de(e) {
  return e ? e.__v_isRef === true : false;
}
function Hf(e) {
  return Ff(e, true);
}
function Ff(e, t) {
  return de(e) ? e : new Bf(e, t);
}
class Bf {
  constructor(t, r) {
    this.dep = new ai(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = r ? t : K(t), this._value = r ? t : Xe(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, n = this.__v_isShallow || Oe(t) || ut(t);
    t = n ? t : K(t), lt(t, r) && (this._rawValue = t, this._value = n ? t : Xe(t), this.dep.trigger());
  }
}
function W(e) {
  return de(e) ? e.value : e;
}
const kf = { get: (e, t, r) => t === "__v_raw" ? e : W(Reflect.get(e, t, r)), set: (e, t, r, n) => {
  const i = e[t];
  return de(i) && !de(r) ? (i.value = r, true) : Reflect.set(e, t, r, n);
} };
function js(e) {
  return St(e) ? e : new Proxy(e, kf);
}
class Wf {
  constructor(t, r, n) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new ai(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = tr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && Q !== this) return Ss(this, true), true;
  }
  get value() {
    const t = this.dep.track();
    return Ts(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Vf(e, t, r = false) {
  let n, i;
  return U(e) ? n = e : (n = e.get, i = e.set), new Wf(n, i, r);
}
const mr = {}, Pr = /* @__PURE__ */ new WeakMap();
let pt;
function qf(e, t = false, r = pt) {
  if (r) {
    let n = Pr.get(r);
    n || Pr.set(r, n = []), n.push(e);
  }
}
function zf(e, t, r = Z) {
  const { immediate: n, deep: i, once: o, scheduler: s, augmentJob: a, call: l } = r, c = (x) => i ? x : Oe(x) || i === false || i === 0 ? ot(x, 1) : ot(x);
  let u, h, p, g, S = false, P = false;
  if (de(e) ? (h = () => e.value, S = Oe(e)) : St(e) ? (h = () => c(e), S = true) : H(e) ? (P = true, S = e.some((x) => St(x) || Oe(x)), h = () => e.map((x) => {
    if (de(x)) return x.value;
    if (St(x)) return c(x);
    if (U(x)) return l ? l(x, 2) : x();
  })) : U(e) ? t ? h = l ? () => l(e, 2) : e : h = () => {
    if (p) {
      Je();
      try {
        p();
      } finally {
        Ye();
      }
    }
    const x = pt;
    pt = u;
    try {
      return l ? l(e, 3, [g]) : e(g);
    } finally {
      pt = x;
    }
  } : h = Ue, t && i) {
    const x = h, k = i === true ? 1 / 0 : i;
    h = () => ot(x(), k);
  }
  const j = _f(), R = () => {
    u.stop(), j && j.active && ri(j.effects, u);
  };
  if (o && t) {
    const x = t;
    t = (...k) => {
      x(...k), R();
    };
  }
  let A = P ? new Array(e.length).fill(mr) : mr;
  const _ = (x) => {
    if (!(!(u.flags & 1) || !u.dirty && !x)) if (t) {
      const k = u.run();
      if (i || S || (P ? k.some((q, ae) => lt(q, A[ae])) : lt(k, A))) {
        p && p();
        const q = pt;
        pt = u;
        try {
          const ae = [k, A === mr ? void 0 : P && A[0] === mr ? [] : A, g];
          A = k, l ? l(t, 3, ae) : t(...ae);
        } finally {
          pt = q;
        }
      }
    } else u.run();
  };
  return a && a(_), u = new xs(h), u.scheduler = s ? () => s(_, false) : _, g = (x) => qf(x, false, u), p = u.onStop = () => {
    const x = Pr.get(u);
    if (x) {
      if (l) l(x, 4);
      else for (const k of x) k();
      Pr.delete(u);
    }
  }, t ? n ? _(true) : A = u.run() : s ? s(_.bind(null, true), true) : u.run(), R.pause = u.pause.bind(u), R.resume = u.resume.bind(u), R.stop = R, R;
}
function ot(e, t = 1 / 0, r) {
  if (t <= 0 || !ne(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t)) return e;
  if (r.set(e, t), t--, de(e)) ot(e.value, t, r);
  else if (H(e)) for (let n = 0; n < e.length; n++) ot(e[n], t, r);
  else if (ps(e) || Et(e)) e.forEach((n) => {
    ot(n, t, r);
  });
  else if (ms(e)) {
    for (const n in e) ot(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, n) && ot(e[n], t, r);
  }
  return e;
}
function ur(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    qr(i, t, r);
  }
}
function Fe(e, t, r, n) {
  if (U(e)) {
    const i = ur(e, t, r, n);
    return i && vs(i) && i.catch((o) => {
      qr(o, t, r);
    }), i;
  }
  if (H(e)) {
    const i = [];
    for (let o = 0; o < e.length; o++) i.push(Fe(e[o], t, r, n));
    return i;
  }
}
function qr(e, t, r, n = true) {
  const i = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = t && t.appContext.config || Z;
  if (t) {
    let a = t.parent;
    const l = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; a; ) {
      const u = a.ec;
      if (u) {
        for (let h = 0; h < u.length; h++) if (u[h](e, l, c) === false) return;
      }
      a = a.parent;
    }
    if (o) {
      Je(), ur(o, null, 10, [e, l, c]), Ye();
      return;
    }
  }
  Kf(e, r, i, n, s);
}
function Kf(e, t, r, n = true, i = false) {
  if (i) throw e;
  console.error(e);
}
const ve = [];
let Ne = -1;
const Ct = [];
let nt = null, yt = 0;
const $s = Promise.resolve();
let Tr = null;
function Gf(e) {
  const t = Tr || $s;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Jf(e) {
  let t = Ne + 1, r = ve.length;
  for (; t < r; ) {
    const n = t + r >>> 1, i = ve[n], o = ir(i);
    o < e || o === e && i.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function di(e) {
  if (!(e.flags & 1)) {
    const t = ir(e), r = ve[ve.length - 1];
    !r || !(e.flags & 2) && t >= ir(r) ? ve.push(e) : ve.splice(Jf(t), 0, e), e.flags |= 1, Us();
  }
}
function Us() {
  Tr || (Tr = $s.then(Fs));
}
function Yf(e) {
  H(e) ? Ct.push(...e) : nt && e.id === -1 ? nt.splice(yt + 1, 0, e) : e.flags & 1 || (Ct.push(e), e.flags |= 1), Us();
}
function Gi(e, t, r = Ne + 1) {
  for (; r < ve.length; r++) {
    const n = ve[r];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      ve.splice(r, 1), r--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function Hs(e) {
  if (Ct.length) {
    const t = [...new Set(Ct)].sort((r, n) => ir(r) - ir(n));
    if (Ct.length = 0, nt) {
      nt.push(...t);
      return;
    }
    for (nt = t, yt = 0; yt < nt.length; yt++) {
      const r = nt[yt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    nt = null, yt = 0;
  }
}
const ir = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Fs(e) {
  try {
    for (Ne = 0; Ne < ve.length; Ne++) {
      const t = ve[Ne];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ur(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ne < ve.length; Ne++) {
      const t = ve[Ne];
      t && (t.flags &= -2);
    }
    Ne = -1, ve.length = 0, Hs(), Tr = null, (ve.length || Ct.length) && Fs();
  }
}
let me = null, Bs = null;
function Rr(e) {
  const t = me;
  return me = e, Bs = e && e.type.__scopeId || null, t;
}
function On(e, t = me, r) {
  if (!t || e._n) return e;
  const n = (...i) => {
    n._d && so(-1);
    const o = Rr(t);
    let s;
    try {
      s = e(...i);
    } finally {
      Rr(o), n._d && so(1);
    }
    return s;
  };
  return n._n = true, n._c = true, n._d = true, n;
}
function dt(e, t, r, n) {
  const i = e.dirs, o = t && t.dirs;
  for (let s = 0; s < i.length; s++) {
    const a = i[s];
    o && (a.oldValue = o[s].value);
    let l = a.dir[n];
    l && (Je(), Fe(l, r, 8, [e.el, a, e, t]), Ye());
  }
}
function Xf(e, t) {
  if (fe) {
    let r = fe.provides;
    const n = fe.parent && fe.parent.provides;
    n === r && (r = fe.provides = Object.create(n)), r[e] = t;
  }
}
function br(e, t, r = false) {
  const n = Qd();
  if (n || Tt) {
    let i = Tt ? Tt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i) return i[e];
    if (arguments.length > 1) return r && U(t) ? t.call(n && n.proxy) : t;
  }
}
const Qf = Symbol.for("v-scx"), Zf = () => br(Qf);
function un(e, t, r) {
  return ks(e, t, r);
}
function ks(e, t, r = Z) {
  const { immediate: n, deep: i, flush: o, once: s } = r, a = he({}, r), l = t && n || !t && o !== "post";
  let c;
  if (sr) {
    if (o === "sync") {
      const g = Zf();
      c = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!l) {
      const g = () => {
      };
      return g.stop = Ue, g.resume = Ue, g.pause = Ue, g;
    }
  }
  const u = fe;
  a.call = (g, S, P) => Fe(g, u, S, P);
  let h = false;
  o === "post" ? a.scheduler = (g) => {
    Ce(g, u && u.suspense);
  } : o !== "sync" && (h = true, a.scheduler = (g, S) => {
    S ? g() : di(g);
  }), a.augmentJob = (g) => {
    t && (g.flags |= 4), h && (g.flags |= 2, u && (g.id = u.uid, g.i = u));
  };
  const p = zf(e, t, a);
  return sr && (c ? c.push(p) : l && p()), p;
}
function ed(e, t, r) {
  const n = this.proxy, i = oe(e) ? e.includes(".") ? Ws(n, e) : () => n[e] : e.bind(n, n);
  let o;
  U(t) ? o = t : (o = t.handler, r = t);
  const s = cr(this), a = ks(i, o.bind(n), r);
  return s(), a;
}
function Ws(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < r.length && n; i++) n = n[r[i]];
    return n;
  };
}
const td = Symbol("_vte"), rd = (e) => e.__isTeleport, nd = Symbol("_leaveCb");
function hi(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, hi(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function zr(e, t) {
  return U(e) ? he({ name: e.name }, t, { setup: e }) : e;
}
function Vs(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Or = /* @__PURE__ */ new WeakMap();
function Yt(e, t, r, n, i = false) {
  if (H(e)) {
    e.forEach((S, P) => Yt(S, t && (H(t) ? t[P] : t), r, n, i));
    return;
  }
  if (Pt(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Yt(e, t, r, n.component.subTree);
    return;
  }
  const o = n.shapeFlag & 4 ? _i(n.component) : n.el, s = i ? null : o, { i: a, r: l } = e, c = t && t.r, u = a.refs === Z ? a.refs = {} : a.refs, h = a.setupState, p = K(h), g = h === Z ? hs : (S) => G(p, S);
  if (c != null && c !== l) {
    if (Ji(t), oe(c)) u[c] = null, g(c) && (h[c] = null);
    else if (de(c)) {
      c.value = null;
      const S = t;
      S.k && (u[S.k] = null);
    }
  }
  if (U(l)) ur(l, a, 12, [s, u]);
  else {
    const S = oe(l), P = de(l);
    if (S || P) {
      const j = () => {
        if (e.f) {
          const R = S ? g(l) ? h[l] : u[l] : l.value;
          if (i) H(R) && ri(R, o);
          else if (H(R)) R.includes(o) || R.push(o);
          else if (S) u[l] = [o], g(l) && (h[l] = u[l]);
          else {
            const A = [o];
            l.value = A, e.k && (u[e.k] = A);
          }
        } else S ? (u[l] = s, g(l) && (h[l] = s)) : P && (l.value = s, e.k && (u[e.k] = s));
      };
      if (s) {
        const R = () => {
          j(), Or.delete(e);
        };
        R.id = -1, Or.set(e, R), Ce(R, r);
      } else Ji(e), j();
    }
  }
}
function Ji(e) {
  const t = Or.get(e);
  t && (t.flags |= 8, Or.delete(e));
}
Wr().requestIdleCallback;
Wr().cancelIdleCallback;
const Pt = (e) => !!e.type.__asyncLoader, qs = (e) => e.type.__isKeepAlive;
function id(e, t) {
  zs(e, "a", t);
}
function od(e, t) {
  zs(e, "da", t);
}
function zs(e, t, r = fe) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = r;
    for (; i; ) {
      if (i.isDeactivated) return;
      i = i.parent;
    }
    return e();
  });
  if (Kr(t, n, r), r) {
    let i = r.parent;
    for (; i && i.parent; ) qs(i.parent.vnode) && sd(n, t, r, i), i = i.parent;
  }
}
function sd(e, t, r, n) {
  const i = Kr(t, e, n, true);
  Ks(() => {
    ri(n[t], i);
  }, r);
}
function Kr(e, t, r = fe, n = false) {
  if (r) {
    const i = r[e] || (r[e] = []), o = t.__weh || (t.__weh = (...s) => {
      Je();
      const a = cr(r), l = Fe(t, r, e, s);
      return a(), Ye(), l;
    });
    return n ? i.unshift(o) : i.push(o), o;
  }
}
const et = (e) => (t, r = fe) => {
  (!sr || e === "sp") && Kr(e, (...n) => t(...n), r);
}, ad = et("bm"), ld = et("m"), ud = et("bu"), cd = et("u"), fd = et("bum"), Ks = et("um"), dd = et("sp"), hd = et("rtg"), pd = et("rtc");
function vd(e, t = fe) {
  Kr("ec", e, t);
}
const gd = "components", Gs = Symbol.for("v-ndc");
function md(e) {
  return oe(e) ? _d(gd, e, false) || e : e || Gs;
}
function _d(e, t, r = true, n = false) {
  const i = me || fe;
  if (i) {
    const o = i.type;
    {
      const a = n0(o, false);
      if (a && (a === t || a === Te(t) || a === kr(Te(t)))) return o;
    }
    const s = Yi(i[e] || o[e], t) || Yi(i.appContext[e], t);
    return !s && n ? o : s;
  }
}
function Yi(e, t) {
  return e && (e[t] || e[Te(t)] || e[kr(Te(t))]);
}
function Xi(e, t, r = {}, n, i) {
  if (me.ce || me.parent && Pt(me.parent) && me.parent.ce) {
    const c = Object.keys(r).length > 0;
    return t !== "default" && (r.name = t), $(), Ir(ge, null, [le("slot", r, n)], c ? -2 : 64);
  }
  let o = e[t];
  o && o._c && (o._d = false), $();
  const s = o && Js(o(r)), a = r.key || s && s.key, l = Ir(ge, { key: (a && !Ze(a) ? a : `_${t}`) + (!s && n ? "_fb" : "") }, s || [], s && e._ === 1 ? 64 : -2);
  return o && o._c && (o._d = true), l;
}
function Js(e) {
  return e.some((t) => gi(t) ? !(t.type === Qe || t.type === ge && !Js(t.children)) : true) ? e : null;
}
const An = (e) => e ? pa(e) ? _i(e) : An(e.parent) : null, Xt = he(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => An(e.parent), $root: (e) => An(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Xs(e), $forceUpdate: (e) => e.f || (e.f = () => {
  di(e.update);
}), $nextTick: (e) => e.n || (e.n = Gf.bind(e.proxy)), $watch: (e) => ed.bind(e) }), cn = (e, t) => e !== Z && !e.__isScriptSetup && G(e, t), bd = { get({ _: e }, t) {
  if (t === "__v_skip") return true;
  const { ctx: r, setupState: n, data: i, props: o, accessCache: s, type: a, appContext: l } = e;
  if (t[0] !== "$") {
    const p = s[t];
    if (p !== void 0) switch (p) {
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
      if (cn(n, t)) return s[t] = 1, n[t];
      if (i !== Z && G(i, t)) return s[t] = 2, i[t];
      if (G(o, t)) return s[t] = 3, o[t];
      if (r !== Z && G(r, t)) return s[t] = 4, r[t];
      In && (s[t] = 0);
    }
  }
  const c = Xt[t];
  let u, h;
  if (c) return t === "$attrs" && ce(e.attrs, "get", ""), c(e);
  if ((u = a.__cssModules) && (u = u[t])) return u;
  if (r !== Z && G(r, t)) return s[t] = 4, r[t];
  if (h = l.config.globalProperties, G(h, t)) return h[t];
}, set({ _: e }, t, r) {
  const { data: n, setupState: i, ctx: o } = e;
  return cn(i, t) ? (i[t] = r, true) : n !== Z && G(n, t) ? (n[t] = r, true) : G(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (o[t] = r, true);
}, has({ _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: i, props: o, type: s } }, a) {
  let l;
  return !!(r[a] || e !== Z && a[0] !== "$" && G(e, a) || cn(t, a) || G(o, a) || G(n, a) || G(Xt, a) || G(i.config.globalProperties, a) || (l = s.__cssModules) && l[a]);
}, defineProperty(e, t, r) {
  return r.get != null ? e._.accessCache[t] = 0 : G(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
} };
function Qi(e) {
  return H(e) ? e.reduce((t, r) => (t[r] = null, t), {}) : e;
}
let In = true;
function wd(e) {
  const t = Xs(e), r = e.proxy, n = e.ctx;
  In = false, t.beforeCreate && Zi(t.beforeCreate, e, "bc");
  const { data: i, computed: o, methods: s, watch: a, provide: l, inject: c, created: u, beforeMount: h, mounted: p, beforeUpdate: g, updated: S, activated: P, deactivated: j, beforeDestroy: R, beforeUnmount: A, destroyed: _, unmounted: x, render: k, renderTracked: q, renderTriggered: ae, errorCaptured: xe, serverPrefetch: Ae, expose: Be, inheritAttrs: ct, components: ft, directives: _t, filters: Nt } = t;
  if (c && yd(c, n, null), s) for (const ee in s) {
    const J = s[ee];
    U(J) && (n[ee] = J.bind(r));
  }
  if (i) {
    const ee = i.call(r, r);
    ne(ee) && (e.data = Vr(ee));
  }
  if (In = true, o) for (const ee in o) {
    const J = o[ee], ke = U(J) ? J.bind(r, r) : U(J.get) ? J.get.bind(r, r) : Ue, bt = !U(J) && U(J.set) ? J.set.bind(r) : Ue, We = ga({ get: ke, set: bt });
    Object.defineProperty(n, ee, { enumerable: true, configurable: true, get: () => We.value, set: (z) => We.value = z });
  }
  if (a) for (const ee in a) Ys(a[ee], n, r, ee);
  if (l) {
    const ee = U(l) ? l.call(r) : l;
    Reflect.ownKeys(ee).forEach((J) => {
      Xf(J, ee[J]);
    });
  }
  u && Zi(u, e, "c");
  function ue(ee, J) {
    H(J) ? J.forEach((ke) => ee(ke.bind(r))) : J && ee(J.bind(r));
  }
  if (ue(ad, h), ue(ld, p), ue(ud, g), ue(cd, S), ue(id, P), ue(od, j), ue(vd, xe), ue(pd, q), ue(hd, ae), ue(fd, A), ue(Ks, x), ue(dd, Ae), H(Be)) if (Be.length) {
    const ee = e.exposed || (e.exposed = {});
    Be.forEach((J) => {
      Object.defineProperty(ee, J, { get: () => r[J], set: (ke) => r[J] = ke, enumerable: true });
    });
  } else e.exposed || (e.exposed = {});
  k && e.render === Ue && (e.render = k), ct != null && (e.inheritAttrs = ct), ft && (e.components = ft), _t && (e.directives = _t), Ae && Vs(e);
}
function yd(e, t, r = Ue) {
  H(e) && (e = Mn(e));
  for (const n in e) {
    const i = e[n];
    let o;
    ne(i) ? "default" in i ? o = br(i.from || n, i.default, true) : o = br(i.from || n) : o = br(i), de(o) ? Object.defineProperty(t, n, { enumerable: true, configurable: true, get: () => o.value, set: (s) => o.value = s }) : t[n] = o;
  }
}
function Zi(e, t, r) {
  Fe(H(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function Ys(e, t, r, n) {
  let i = n.includes(".") ? Ws(r, n) : () => r[n];
  if (oe(e)) {
    const o = t[e];
    U(o) && un(i, o);
  } else if (U(e)) un(i, e.bind(r));
  else if (ne(e)) if (H(e)) e.forEach((o) => Ys(o, t, r, n));
  else {
    const o = U(e.handler) ? e.handler.bind(r) : t[e.handler];
    U(o) && un(i, o, e);
  }
}
function Xs(e) {
  const t = e.type, { mixins: r, extends: n } = t, { mixins: i, optionsCache: o, config: { optionMergeStrategies: s } } = e.appContext, a = o.get(t);
  let l;
  return a ? l = a : !i.length && !r && !n ? l = t : (l = {}, i.length && i.forEach((c) => Ar(l, c, s, true)), Ar(l, t, s)), ne(t) && o.set(t, l), l;
}
function Ar(e, t, r, n = false) {
  const { mixins: i, extends: o } = t;
  o && Ar(e, o, r, true), i && i.forEach((s) => Ar(e, s, r, true));
  for (const s in t) if (!(n && s === "expose")) {
    const a = xd[s] || r && r[s];
    e[s] = a ? a(e[s], t[s]) : t[s];
  }
  return e;
}
const xd = { data: eo, props: to, emits: to, methods: Vt, computed: Vt, beforeCreate: pe, created: pe, beforeMount: pe, mounted: pe, beforeUpdate: pe, updated: pe, beforeDestroy: pe, beforeUnmount: pe, destroyed: pe, unmounted: pe, activated: pe, deactivated: pe, errorCaptured: pe, serverPrefetch: pe, components: Vt, directives: Vt, watch: Sd, provide: eo, inject: Ed };
function eo(e, t) {
  return t ? e ? function() {
    return he(U(e) ? e.call(this, this) : e, U(t) ? t.call(this, this) : t);
  } : t : e;
}
function Ed(e, t) {
  return Vt(Mn(e), Mn(t));
}
function Mn(e) {
  if (H(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
    return t;
  }
  return e;
}
function pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Vt(e, t) {
  return e ? he(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function to(e, t) {
  return e ? H(e) && H(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : he(/* @__PURE__ */ Object.create(null), Qi(e), Qi(t ?? {})) : t;
}
function Sd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = he(/* @__PURE__ */ Object.create(null), e);
  for (const n in t) r[n] = pe(e[n], t[n]);
  return r;
}
function Qs() {
  return { app: null, config: { isNativeTag: hs, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let Cd = 0;
function Pd(e, t) {
  return function(n, i = null) {
    U(n) || (n = he({}, n)), i != null && !ne(i) && (i = null);
    const o = Qs(), s = /* @__PURE__ */ new WeakSet(), a = [];
    let l = false;
    const c = o.app = { _uid: Cd++, _component: n, _props: i, _container: null, _context: o, _instance: null, version: o0, get config() {
      return o.config;
    }, set config(u) {
    }, use(u, ...h) {
      return s.has(u) || (u && U(u.install) ? (s.add(u), u.install(c, ...h)) : U(u) && (s.add(u), u(c, ...h))), c;
    }, mixin(u) {
      return o.mixins.includes(u) || o.mixins.push(u), c;
    }, component(u, h) {
      return h ? (o.components[u] = h, c) : o.components[u];
    }, directive(u, h) {
      return h ? (o.directives[u] = h, c) : o.directives[u];
    }, mount(u, h, p) {
      if (!l) {
        const g = c._ceVNode || le(n, i);
        return g.appContext = o, p === true ? p = "svg" : p === false && (p = void 0), e(g, u, p), l = true, c._container = u, u.__vue_app__ = c, _i(g.component);
      }
    }, onUnmount(u) {
      a.push(u);
    }, unmount() {
      l && (Fe(a, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
    }, provide(u, h) {
      return o.provides[u] = h, c;
    }, runWithContext(u) {
      const h = Tt;
      Tt = c;
      try {
        return u();
      } finally {
        Tt = h;
      }
    } };
    return c;
  };
}
let Tt = null;
const Td = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Te(t)}Modifiers`] || e[`${mt(t)}Modifiers`];
function Rd(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Z;
  let i = r;
  const o = t.startsWith("update:"), s = o && Td(n, t.slice(7));
  s && (s.trim && (i = r.map((u) => oe(u) ? u.trim() : u)), s.number && (i = r.map(cf)));
  let a, l = n[a = rn(t)] || n[a = rn(Te(t))];
  !l && o && (l = n[a = rn(mt(t))]), l && Fe(l, e, 6, i);
  const c = n[a + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    e.emitted[a] = true, Fe(c, e, 6, i);
  }
}
const Od = /* @__PURE__ */ new WeakMap();
function Zs(e, t, r = false) {
  const n = r ? Od : t.emitsCache, i = n.get(e);
  if (i !== void 0) return i;
  const o = e.emits;
  let s = {}, a = false;
  if (!U(e)) {
    const l = (c) => {
      const u = Zs(c, t, true);
      u && (a = true, he(s, u));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !o && !a ? (ne(e) && n.set(e, null), null) : (H(o) ? o.forEach((l) => s[l] = null) : he(s, o), ne(e) && n.set(e, s), s);
}
function Gr(e, t) {
  return !e || !Hr(t) ? false : (t = t.slice(2).replace(/Once$/, ""), G(e, t[0].toLowerCase() + t.slice(1)) || G(e, mt(t)) || G(e, t));
}
function ro(e) {
  const { type: t, vnode: r, proxy: n, withProxy: i, propsOptions: [o], slots: s, attrs: a, emit: l, render: c, renderCache: u, props: h, data: p, setupState: g, ctx: S, inheritAttrs: P } = e, j = Rr(e);
  let R, A;
  try {
    if (r.shapeFlag & 4) {
      const x = i || n, k = x;
      R = je(c.call(k, x, u, h, g, p, S)), A = a;
    } else {
      const x = t;
      R = je(x.length > 1 ? x(h, { attrs: a, slots: s, emit: l }) : x(h, null)), A = t.props ? a : Ad(a);
    }
  } catch (x) {
    Qt.length = 0, qr(x, e, 1), R = le(Qe);
  }
  let _ = R;
  if (A && P !== false) {
    const x = Object.keys(A), { shapeFlag: k } = _;
    x.length && k & 7 && (o && x.some(ti) && (A = Id(A, o)), _ = Mt(_, A, false, true));
  }
  return r.dirs && (_ = Mt(_, null, false, true), _.dirs = _.dirs ? _.dirs.concat(r.dirs) : r.dirs), r.transition && hi(_, r.transition), R = _, Rr(j), R;
}
const Ad = (e) => {
  let t;
  for (const r in e) (r === "class" || r === "style" || Hr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, Id = (e, t) => {
  const r = {};
  for (const n in e) (!ti(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function Md(e, t, r) {
  const { props: n, children: i, component: o } = e, { props: s, children: a, patchFlag: l } = t, c = o.emitsOptions;
  if (t.dirs || t.transition) return true;
  if (r && l >= 0) {
    if (l & 1024) return true;
    if (l & 16) return n ? no(n, s, c) : !!s;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const p = u[h];
        if (s[p] !== n[p] && !Gr(c, p)) return true;
      }
    }
  } else return (i || a) && (!a || !a.$stable) ? true : n === s ? false : n ? s ? no(n, s, c) : true : !!s;
  return false;
}
function no(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return true;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (t[o] !== e[o] && !Gr(r, o)) return true;
  }
  return false;
}
function Dd({ vnode: e, parent: t }, r) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e) (e = t.vnode).el = r, t = t.parent;
    else break;
  }
}
const ea = {}, ta = () => Object.create(ea), ra = (e) => Object.getPrototypeOf(e) === ea;
function Ld(e, t, r, n = false) {
  const i = {}, o = ta();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), na(e, t, i, o);
  for (const s in e.propsOptions[0]) s in i || (i[s] = void 0);
  r ? e.props = n ? i : $f(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function Nd(e, t, r, n) {
  const { props: i, attrs: o, vnode: { patchFlag: s } } = e, a = K(i), [l] = e.propsOptions;
  let c = false;
  if ((n || s > 0) && !(s & 16)) {
    if (s & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let p = u[h];
        if (Gr(e.emitsOptions, p)) continue;
        const g = t[p];
        if (l) if (G(o, p)) g !== o[p] && (o[p] = g, c = true);
        else {
          const S = Te(p);
          i[S] = Dn(l, a, S, g, e, false);
        }
        else g !== o[p] && (o[p] = g, c = true);
      }
    }
  } else {
    na(e, t, i, o) && (c = true);
    let u;
    for (const h in a) (!t || !G(t, h) && ((u = mt(h)) === h || !G(t, u))) && (l ? r && (r[h] !== void 0 || r[u] !== void 0) && (i[h] = Dn(l, a, h, void 0, e, true)) : delete i[h]);
    if (o !== a) for (const h in o) (!t || !G(t, h)) && (delete o[h], c = true);
  }
  c && ze(e.attrs, "set", "");
}
function na(e, t, r, n) {
  const [i, o] = e.propsOptions;
  let s = false, a;
  if (t) for (let l in t) {
    if (zt(l)) continue;
    const c = t[l];
    let u;
    i && G(i, u = Te(l)) ? !o || !o.includes(u) ? r[u] = c : (a || (a = {}))[u] = c : Gr(e.emitsOptions, l) || (!(l in n) || c !== n[l]) && (n[l] = c, s = true);
  }
  if (o) {
    const l = K(r), c = a || Z;
    for (let u = 0; u < o.length; u++) {
      const h = o[u];
      r[h] = Dn(i, l, h, c[h], e, !G(c, h));
    }
  }
  return s;
}
function Dn(e, t, r, n, i, o) {
  const s = e[r];
  if (s != null) {
    const a = G(s, "default");
    if (a && n === void 0) {
      const l = s.default;
      if (s.type !== Function && !s.skipFactory && U(l)) {
        const { propsDefaults: c } = i;
        if (r in c) n = c[r];
        else {
          const u = cr(i);
          n = c[r] = l.call(null, t), u();
        }
      } else n = l;
      i.ce && i.ce._setProp(r, n);
    }
    s[0] && (o && !a ? n = false : s[1] && (n === "" || n === mt(r)) && (n = true));
  }
  return n;
}
const jd = /* @__PURE__ */ new WeakMap();
function ia(e, t, r = false) {
  const n = r ? jd : t.propsCache, i = n.get(e);
  if (i) return i;
  const o = e.props, s = {}, a = [];
  let l = false;
  if (!U(e)) {
    const u = (h) => {
      l = true;
      const [p, g] = ia(h, t, true);
      he(s, p), g && a.push(...g);
    };
    !r && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!o && !l) return ne(e) && n.set(e, xt), xt;
  if (H(o)) for (let u = 0; u < o.length; u++) {
    const h = Te(o[u]);
    io(h) && (s[h] = Z);
  }
  else if (o) for (const u in o) {
    const h = Te(u);
    if (io(h)) {
      const p = o[u], g = s[h] = H(p) || U(p) ? { type: p } : he({}, p), S = g.type;
      let P = false, j = true;
      if (H(S)) for (let R = 0; R < S.length; ++R) {
        const A = S[R], _ = U(A) && A.name;
        if (_ === "Boolean") {
          P = true;
          break;
        } else _ === "String" && (j = false);
      }
      else P = U(S) && S.name === "Boolean";
      g[0] = P, g[1] = j, (P || G(g, "default")) && a.push(h);
    }
  }
  const c = [s, a];
  return ne(e) && n.set(e, c), c;
}
function io(e) {
  return e[0] !== "$" && !zt(e);
}
const pi = (e) => e === "_" || e === "_ctx" || e === "$stable", vi = (e) => H(e) ? e.map(je) : [je(e)], $d = (e, t, r) => {
  if (t._n) return t;
  const n = On((...i) => vi(t(...i)), r);
  return n._c = false, n;
}, oa = (e, t, r) => {
  const n = e._ctx;
  for (const i in e) {
    if (pi(i)) continue;
    const o = e[i];
    if (U(o)) t[i] = $d(i, o, n);
    else if (o != null) {
      const s = vi(o);
      t[i] = () => s;
    }
  }
}, sa = (e, t) => {
  const r = vi(t);
  e.slots.default = () => r;
}, aa = (e, t, r) => {
  for (const n in t) (r || !pi(n)) && (e[n] = t[n]);
}, Ud = (e, t, r) => {
  const n = e.slots = ta();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (aa(n, t, r), r && _s(n, "_", i, true)) : oa(t, n);
  } else t && sa(e, t);
}, Hd = (e, t, r) => {
  const { vnode: n, slots: i } = e;
  let o = true, s = Z;
  if (n.shapeFlag & 32) {
    const a = t._;
    a ? r && a === 1 ? o = false : aa(i, t, r) : (o = !t.$stable, oa(t, i)), s = t;
  } else t && (sa(e, t), s = { default: 1 });
  if (o) for (const a in i) !pi(a) && s[a] == null && delete i[a];
}, Ce = Vd;
function Fd(e) {
  return Bd(e);
}
function Bd(e, t) {
  const r = Wr();
  r.__VUE__ = true;
  const { insert: n, remove: i, patchProp: o, createElement: s, createText: a, createComment: l, setText: c, setElementText: u, parentNode: h, nextSibling: p, setScopeId: g = Ue, insertStaticContent: S } = e, P = (f, d, v, y = null, m = null, b = null, T = void 0, C = null, E = !!d.dynamicChildren) => {
    if (f === d) return;
    f && !Wt(f, d) && (y = dr(f), z(f, m, b, true), f = null), d.patchFlag === -2 && (E = false, d.dynamicChildren = null);
    const { type: w, ref: D, shapeFlag: O } = d;
    switch (w) {
      case Jr:
        j(f, d, v, y);
        break;
      case Qe:
        R(f, d, v, y);
        break;
      case dn:
        f == null && A(d, v, y, T);
        break;
      case ge:
        ft(f, d, v, y, m, b, T, C, E);
        break;
      default:
        O & 1 ? k(f, d, v, y, m, b, T, C, E) : O & 6 ? _t(f, d, v, y, m, b, T, C, E) : (O & 64 || O & 128) && w.process(f, d, v, y, m, b, T, C, E, Ut);
    }
    D != null && m ? Yt(D, f && f.ref, b, d || f, !d) : D == null && f && f.ref != null && Yt(f.ref, null, b, f, true);
  }, j = (f, d, v, y) => {
    if (f == null) n(d.el = a(d.children), v, y);
    else {
      const m = d.el = f.el;
      d.children !== f.children && c(m, d.children);
    }
  }, R = (f, d, v, y) => {
    f == null ? n(d.el = l(d.children || ""), v, y) : d.el = f.el;
  }, A = (f, d, v, y) => {
    [f.el, f.anchor] = S(f.children, d, v, y, f.el, f.anchor);
  }, _ = ({ el: f, anchor: d }, v, y) => {
    let m;
    for (; f && f !== d; ) m = p(f), n(f, v, y), f = m;
    n(d, v, y);
  }, x = ({ el: f, anchor: d }) => {
    let v;
    for (; f && f !== d; ) v = p(f), i(f), f = v;
    i(d);
  }, k = (f, d, v, y, m, b, T, C, E) => {
    if (d.type === "svg" ? T = "svg" : d.type === "math" && (T = "mathml"), f == null) q(d, v, y, m, b, T, C, E);
    else {
      const w = f.el && f.el._isVueCE ? f.el : null;
      try {
        w && w._beginPatch(), Ae(f, d, m, b, T, C, E);
      } finally {
        w && w._endPatch();
      }
    }
  }, q = (f, d, v, y, m, b, T, C) => {
    let E, w;
    const { props: D, shapeFlag: O, transition: M, dirs: N } = f;
    if (E = f.el = s(f.type, b, D && D.is, D), O & 8 ? u(E, f.children) : O & 16 && xe(f.children, E, null, y, m, fn(f, b), T, C), N && dt(f, null, y, "created"), ae(E, f, f.scopeId, T, y), D) {
      for (const X in D) X !== "value" && !zt(X) && o(E, X, null, D[X], b, y);
      "value" in D && o(E, "value", null, D.value, b), (w = D.onVnodeBeforeMount) && Le(w, y, f);
    }
    N && dt(f, null, y, "beforeMount");
    const V = kd(m, M);
    V && M.beforeEnter(E), n(E, d, v), ((w = D && D.onVnodeMounted) || V || N) && Ce(() => {
      w && Le(w, y, f), V && M.enter(E), N && dt(f, null, y, "mounted");
    }, m);
  }, ae = (f, d, v, y, m) => {
    if (v && g(f, v), y) for (let b = 0; b < y.length; b++) g(f, y[b]);
    if (m) {
      let b = m.subTree;
      if (d === b || fa(b.type) && (b.ssContent === d || b.ssFallback === d)) {
        const T = m.vnode;
        ae(f, T, T.scopeId, T.slotScopeIds, m.parent);
      }
    }
  }, xe = (f, d, v, y, m, b, T, C, E = 0) => {
    for (let w = E; w < f.length; w++) {
      const D = f[w] = C ? it(f[w]) : je(f[w]);
      P(null, D, d, v, y, m, b, T, C);
    }
  }, Ae = (f, d, v, y, m, b, T) => {
    const C = d.el = f.el;
    let { patchFlag: E, dynamicChildren: w, dirs: D } = d;
    E |= f.patchFlag & 16;
    const O = f.props || Z, M = d.props || Z;
    let N;
    if (v && ht(v, false), (N = M.onVnodeBeforeUpdate) && Le(N, v, d, f), D && dt(d, f, v, "beforeUpdate"), v && ht(v, true), (O.innerHTML && M.innerHTML == null || O.textContent && M.textContent == null) && u(C, ""), w ? Be(f.dynamicChildren, w, C, v, y, fn(d, m), b) : T || J(f, d, C, null, v, y, fn(d, m), b, false), E > 0) {
      if (E & 16) ct(C, O, M, v, m);
      else if (E & 2 && O.class !== M.class && o(C, "class", null, M.class, m), E & 4 && o(C, "style", O.style, M.style, m), E & 8) {
        const V = d.dynamicProps;
        for (let X = 0; X < V.length; X++) {
          const Y = V[X], _e = O[Y], be = M[Y];
          (be !== _e || Y === "value") && o(C, Y, _e, be, m, v);
        }
      }
      E & 1 && f.children !== d.children && u(C, d.children);
    } else !T && w == null && ct(C, O, M, v, m);
    ((N = M.onVnodeUpdated) || D) && Ce(() => {
      N && Le(N, v, d, f), D && dt(d, f, v, "updated");
    }, y);
  }, Be = (f, d, v, y, m, b, T) => {
    for (let C = 0; C < d.length; C++) {
      const E = f[C], w = d[C], D = E.el && (E.type === ge || !Wt(E, w) || E.shapeFlag & 198) ? h(E.el) : v;
      P(E, w, D, null, y, m, b, T, true);
    }
  }, ct = (f, d, v, y, m) => {
    if (d !== v) {
      if (d !== Z) for (const b in d) !zt(b) && !(b in v) && o(f, b, d[b], null, m, y);
      for (const b in v) {
        if (zt(b)) continue;
        const T = v[b], C = d[b];
        T !== C && b !== "value" && o(f, b, C, T, m, y);
      }
      "value" in v && o(f, "value", d.value, v.value, m);
    }
  }, ft = (f, d, v, y, m, b, T, C, E) => {
    const w = d.el = f ? f.el : a(""), D = d.anchor = f ? f.anchor : a("");
    let { patchFlag: O, dynamicChildren: M, slotScopeIds: N } = d;
    N && (C = C ? C.concat(N) : N), f == null ? (n(w, v, y), n(D, v, y), xe(d.children || [], v, D, m, b, T, C, E)) : O > 0 && O & 64 && M && f.dynamicChildren && f.dynamicChildren.length === M.length ? (Be(f.dynamicChildren, M, v, m, b, T, C), (d.key != null || m && d === m.subTree) && la(f, d, true)) : J(f, d, v, D, m, b, T, C, E);
  }, _t = (f, d, v, y, m, b, T, C, E) => {
    d.slotScopeIds = C, f == null ? d.shapeFlag & 512 ? m.ctx.activate(d, v, y, T, E) : Nt(d, v, y, m, b, T, E) : fr(f, d, E);
  }, Nt = (f, d, v, y, m, b, T) => {
    const C = f.component = Xd(f, y, m);
    if (qs(f) && (C.ctx.renderer = Ut), Zd(C, false, T), C.asyncDep) {
      if (m && m.registerDep(C, ue, T), !f.el) {
        const E = C.subTree = le(Qe);
        R(null, E, d, v), f.placeholder = E.el;
      }
    } else ue(C, f, d, v, m, b, T);
  }, fr = (f, d, v) => {
    const y = d.component = f.component;
    if (Md(f, d, v)) if (y.asyncDep && !y.asyncResolved) {
      ee(y, d, v);
      return;
    } else y.next = d, y.update();
    else d.el = f.el, y.vnode = d;
  }, ue = (f, d, v, y, m, b, T) => {
    const C = () => {
      if (f.isMounted) {
        let { next: O, bu: M, u: N, parent: V, vnode: X } = f;
        {
          const Me = ua(f);
          if (Me) {
            O && (O.el = X.el, ee(f, O, T)), Me.asyncDep.then(() => {
              f.isUnmounted || C();
            });
            return;
          }
        }
        let Y = O, _e;
        ht(f, false), O ? (O.el = X.el, ee(f, O, T)) : O = X, M && nn(M), (_e = O.props && O.props.onVnodeBeforeUpdate) && Le(_e, V, O, X), ht(f, true);
        const be = ro(f), Ie = f.subTree;
        f.subTree = be, P(Ie, be, h(Ie.el), dr(Ie), f, m, b), O.el = be.el, Y === null && Dd(f, be.el), N && Ce(N, m), (_e = O.props && O.props.onVnodeUpdated) && Ce(() => Le(_e, V, O, X), m);
      } else {
        let O;
        const { el: M, props: N } = d, { bm: V, m: X, parent: Y, root: _e, type: be } = f, Ie = Pt(d);
        ht(f, false), V && nn(V), !Ie && (O = N && N.onVnodeBeforeMount) && Le(O, Y, d), ht(f, true);
        {
          _e.ce && _e.ce._def.shadowRoot !== false && _e.ce._injectChildStyle(be);
          const Me = f.subTree = ro(f);
          P(null, Me, v, y, f, m, b), d.el = Me.el;
        }
        if (X && Ce(X, m), !Ie && (O = N && N.onVnodeMounted)) {
          const Me = d;
          Ce(() => Le(O, Y, Me), m);
        }
        (d.shapeFlag & 256 || Y && Pt(Y.vnode) && Y.vnode.shapeFlag & 256) && f.a && Ce(f.a, m), f.isMounted = true, d = v = y = null;
      }
    };
    f.scope.on();
    const E = f.effect = new xs(C);
    f.scope.off();
    const w = f.update = E.run.bind(E), D = f.job = E.runIfDirty.bind(E);
    D.i = f, D.id = f.uid, E.scheduler = () => di(D), ht(f, true), w();
  }, ee = (f, d, v) => {
    d.component = f;
    const y = f.vnode.props;
    f.vnode = d, f.next = null, Nd(f, d.props, y, v), Hd(f, d.children, v), Je(), Gi(f), Ye();
  }, J = (f, d, v, y, m, b, T, C, E = false) => {
    const w = f && f.children, D = f ? f.shapeFlag : 0, O = d.children, { patchFlag: M, shapeFlag: N } = d;
    if (M > 0) {
      if (M & 128) {
        bt(w, O, v, y, m, b, T, C, E);
        return;
      } else if (M & 256) {
        ke(w, O, v, y, m, b, T, C, E);
        return;
      }
    }
    N & 8 ? (D & 16 && $t(w, m, b), O !== w && u(v, O)) : D & 16 ? N & 16 ? bt(w, O, v, y, m, b, T, C, E) : $t(w, m, b, true) : (D & 8 && u(v, ""), N & 16 && xe(O, v, y, m, b, T, C, E));
  }, ke = (f, d, v, y, m, b, T, C, E) => {
    f = f || xt, d = d || xt;
    const w = f.length, D = d.length, O = Math.min(w, D);
    let M;
    for (M = 0; M < O; M++) {
      const N = d[M] = E ? it(d[M]) : je(d[M]);
      P(f[M], N, v, null, m, b, T, C, E);
    }
    w > D ? $t(f, m, b, true, false, O) : xe(d, v, y, m, b, T, C, E, O);
  }, bt = (f, d, v, y, m, b, T, C, E) => {
    let w = 0;
    const D = d.length;
    let O = f.length - 1, M = D - 1;
    for (; w <= O && w <= M; ) {
      const N = f[w], V = d[w] = E ? it(d[w]) : je(d[w]);
      if (Wt(N, V)) P(N, V, v, null, m, b, T, C, E);
      else break;
      w++;
    }
    for (; w <= O && w <= M; ) {
      const N = f[O], V = d[M] = E ? it(d[M]) : je(d[M]);
      if (Wt(N, V)) P(N, V, v, null, m, b, T, C, E);
      else break;
      O--, M--;
    }
    if (w > O) {
      if (w <= M) {
        const N = M + 1, V = N < D ? d[N].el : y;
        for (; w <= M; ) P(null, d[w] = E ? it(d[w]) : je(d[w]), v, V, m, b, T, C, E), w++;
      }
    } else if (w > M) for (; w <= O; ) z(f[w], m, b, true), w++;
    else {
      const N = w, V = w, X = /* @__PURE__ */ new Map();
      for (w = V; w <= M; w++) {
        const Se = d[w] = E ? it(d[w]) : je(d[w]);
        Se.key != null && X.set(Se.key, w);
      }
      let Y, _e = 0;
      const be = M - V + 1;
      let Ie = false, Me = 0;
      const Ht = new Array(be);
      for (w = 0; w < be; w++) Ht[w] = 0;
      for (w = N; w <= O; w++) {
        const Se = f[w];
        if (_e >= be) {
          z(Se, m, b, true);
          continue;
        }
        let De;
        if (Se.key != null) De = X.get(Se.key);
        else for (Y = V; Y <= M; Y++) if (Ht[Y - V] === 0 && Wt(Se, d[Y])) {
          De = Y;
          break;
        }
        De === void 0 ? z(Se, m, b, true) : (Ht[De - V] = w + 1, De >= Me ? Me = De : Ie = true, P(Se, d[De], v, null, m, b, T, C, E), _e++);
      }
      const wi = Ie ? Wd(Ht) : xt;
      for (Y = wi.length - 1, w = be - 1; w >= 0; w--) {
        const Se = V + w, De = d[Se], yi = d[Se + 1], xi = Se + 1 < D ? yi.el || ca(yi) : y;
        Ht[w] === 0 ? P(null, De, v, xi, m, b, T, C, E) : Ie && (Y < 0 || w !== wi[Y] ? We(De, v, xi, 2) : Y--);
      }
    }
  }, We = (f, d, v, y, m = null) => {
    const { el: b, type: T, transition: C, children: E, shapeFlag: w } = f;
    if (w & 6) {
      We(f.component.subTree, d, v, y);
      return;
    }
    if (w & 128) {
      f.suspense.move(d, v, y);
      return;
    }
    if (w & 64) {
      T.move(f, d, v, Ut);
      return;
    }
    if (T === ge) {
      n(b, d, v);
      for (let O = 0; O < E.length; O++) We(E[O], d, v, y);
      n(f.anchor, d, v);
      return;
    }
    if (T === dn) {
      _(f, d, v);
      return;
    }
    if (y !== 2 && w & 1 && C) if (y === 0) C.beforeEnter(b), n(b, d, v), Ce(() => C.enter(b), m);
    else {
      const { leave: O, delayLeave: M, afterLeave: N } = C, V = () => {
        f.ctx.isUnmounted ? i(b) : n(b, d, v);
      }, X = () => {
        b._isLeaving && b[nd](true), O(b, () => {
          V(), N && N();
        });
      };
      M ? M(b, V, X) : X();
    }
    else n(b, d, v);
  }, z = (f, d, v, y = false, m = false) => {
    const { type: b, props: T, ref: C, children: E, dynamicChildren: w, shapeFlag: D, patchFlag: O, dirs: M, cacheIndex: N } = f;
    if (O === -2 && (m = false), C != null && (Je(), Yt(C, null, v, f, true), Ye()), N != null && (d.renderCache[N] = void 0), D & 256) {
      d.ctx.deactivate(f);
      return;
    }
    const V = D & 1 && M, X = !Pt(f);
    let Y;
    if (X && (Y = T && T.onVnodeBeforeUnmount) && Le(Y, d, f), D & 6) Yr(f.component, v, y);
    else {
      if (D & 128) {
        f.suspense.unmount(v, y);
        return;
      }
      V && dt(f, null, d, "beforeUnmount"), D & 64 ? f.type.remove(f, d, v, Ut, y) : w && !w.hasOnce && (b !== ge || O > 0 && O & 64) ? $t(w, d, v, false, true) : (b === ge && O & 384 || !m && D & 16) && $t(E, d, v), y && Ee(f);
    }
    (X && (Y = T && T.onVnodeUnmounted) || V) && Ce(() => {
      Y && Le(Y, d, f), V && dt(f, null, d, "unmounted");
    }, v);
  }, Ee = (f) => {
    const { type: d, el: v, anchor: y, transition: m } = f;
    if (d === ge) {
      jt(v, y);
      return;
    }
    if (d === dn) {
      x(f);
      return;
    }
    const b = () => {
      i(v), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (f.shapeFlag & 1 && m && !m.persisted) {
      const { leave: T, delayLeave: C } = m, E = () => T(v, b);
      C ? C(f.el, b, E) : E();
    } else b();
  }, jt = (f, d) => {
    let v;
    for (; f !== d; ) v = p(f), i(f), f = v;
    i(d);
  }, Yr = (f, d, v) => {
    const { bum: y, scope: m, job: b, subTree: T, um: C, m: E, a: w } = f;
    oo(E), oo(w), y && nn(y), m.stop(), b && (b.flags |= 8, z(T, f, d, v)), C && Ce(C, d), Ce(() => {
      f.isUnmounted = true;
    }, d);
  }, $t = (f, d, v, y = false, m = false, b = 0) => {
    for (let T = b; T < f.length; T++) z(f[T], d, v, y, m);
  }, dr = (f) => {
    if (f.shapeFlag & 6) return dr(f.component.subTree);
    if (f.shapeFlag & 128) return f.suspense.next();
    const d = p(f.anchor || f.el), v = d && d[td];
    return v ? p(v) : d;
  };
  let Xr = false;
  const bi = (f, d, v) => {
    let y;
    f == null ? d._vnode && (z(d._vnode, null, null, true), y = d._vnode.component) : P(d._vnode || null, f, d, null, null, null, v), d._vnode = f, Xr || (Xr = true, Gi(y), Hs(), Xr = false);
  }, Ut = { p: P, um: z, m: We, r: Ee, mt: Nt, mc: xe, pc: J, pbc: Be, n: dr, o: e };
  return { render: bi, hydrate: void 0, createApp: Pd(bi) };
}
function fn({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function ht({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function kd(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function la(e, t, r = false) {
  const n = e.children, i = t.children;
  if (H(n) && H(i)) for (let o = 0; o < n.length; o++) {
    const s = n[o];
    let a = i[o];
    a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[o] = it(i[o]), a.el = s.el), !r && a.patchFlag !== -2 && la(s, a)), a.type === Jr && (a.patchFlag !== -1 ? a.el = s.el : a.__elIndex = o + (e.type === ge ? 1 : 0)), a.type === Qe && !a.el && (a.el = s.el);
  }
}
function Wd(e) {
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
function ua(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : ua(t);
}
function oo(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function ca(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? ca(t.subTree) : null;
}
const fa = (e) => e.__isSuspense;
function Vd(e, t) {
  t && t.pendingBranch ? H(e) ? t.effects.push(...e) : t.effects.push(e) : Yf(e);
}
const ge = Symbol.for("v-fgt"), Jr = Symbol.for("v-txt"), Qe = Symbol.for("v-cmt"), dn = Symbol.for("v-stc"), Qt = [];
let Pe = null;
function $(e = false) {
  Qt.push(Pe = e ? null : []);
}
function qd() {
  Qt.pop(), Pe = Qt[Qt.length - 1] || null;
}
let or = 1;
function so(e, t = false) {
  or += e, e < 0 && Pe && t && (Pe.hasOnce = true);
}
function da(e) {
  return e.dynamicChildren = or > 0 ? Pe || xt : null, qd(), or > 0 && Pe && Pe.push(e), e;
}
function F(e, t, r, n, i, o) {
  return da(B(e, t, r, n, i, o, true));
}
function Ir(e, t, r, n, i) {
  return da(le(e, t, r, n, i, true));
}
function gi(e) {
  return e ? e.__v_isVNode === true : false;
}
function Wt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ha = ({ key: e }) => e ?? null, wr = ({ ref: e, ref_key: t, ref_for: r }) => (typeof e == "number" && (e = "" + e), e != null ? oe(e) || de(e) || U(e) ? { i: me, r: e, k: t, f: !!r } : e : null);
function B(e, t = null, r = null, n = 0, i = null, o = e === ge ? 0 : 1, s = false, a = false) {
  const l = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && ha(t), ref: t && wr(t), scopeId: Bs, slotScopeIds: null, children: r, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o, patchFlag: n, dynamicProps: i, dynamicChildren: null, appContext: null, ctx: me };
  return a ? (mi(l, r), o & 128 && e.normalize(l)) : r && (l.shapeFlag |= oe(r) ? 8 : 16), or > 0 && !s && Pe && (l.patchFlag > 0 || o & 6) && l.patchFlag !== 32 && Pe.push(l), l;
}
const le = zd;
function zd(e, t = null, r = null, n = 0, i = null, o = false) {
  if ((!e || e === Gs) && (e = Qe), gi(e)) {
    const a = Mt(e, t, true);
    return r && mi(a, r), or > 0 && !o && Pe && (a.shapeFlag & 6 ? Pe[Pe.indexOf(e)] = a : Pe.push(a)), a.patchFlag = -2, a;
  }
  if (i0(e) && (e = e.__vccOpts), t) {
    t = Kd(t);
    let { class: a, style: l } = t;
    a && !oe(a) && (t.class = Lt(a)), ne(l) && (fi(l) && !H(l) && (l = he({}, l)), t.style = lr(l));
  }
  const s = oe(e) ? 1 : fa(e) ? 128 : rd(e) ? 64 : ne(e) ? 4 : U(e) ? 2 : 0;
  return B(e, t, r, n, i, s, o, true);
}
function Kd(e) {
  return e ? fi(e) || ra(e) ? he({}, e) : e : null;
}
function Mt(e, t, r = false, n = false) {
  const { props: i, ref: o, patchFlag: s, children: a, transition: l } = e, c = t ? Gd(i || {}, t) : i, u = { __v_isVNode: true, __v_skip: true, type: e.type, props: c, key: c && ha(c), ref: t && t.ref ? r && o ? H(o) ? o.concat(wr(t)) : [o, wr(t)] : wr(t) : o, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: a, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== ge ? s === -1 ? 16 : s | 16 : s, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: l, component: e.component, suspense: e.suspense, ssContent: e.ssContent && Mt(e.ssContent), ssFallback: e.ssFallback && Mt(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
  return l && n && hi(u, l.clone(u)), u;
}
function Mr(e = " ", t = 0) {
  return le(Jr, null, e, t);
}
function st(e = "", t = false) {
  return t ? ($(), Ir(Qe, null, e)) : le(Qe, null, e);
}
function je(e) {
  return e == null || typeof e == "boolean" ? le(Qe) : H(e) ? le(ge, null, e.slice()) : gi(e) ? it(e) : le(Jr, null, String(e));
}
function it(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Mt(e);
}
function mi(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (H(t)) r = 16;
  else if (typeof t == "object") if (n & 65) {
    const i = t.default;
    i && (i._c && (i._d = false), mi(e, i()), i._c && (i._d = true));
    return;
  } else {
    r = 32;
    const i = t._;
    !i && !ra(t) ? t._ctx = me : i === 3 && me && (me.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else U(t) ? (t = { default: t, _ctx: me }, r = 32) : (t = String(t), n & 64 ? (r = 16, t = [Mr(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function Gd(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const i in n) if (i === "class") t.class !== n.class && (t.class = Lt([t.class, n.class]));
    else if (i === "style") t.style = lr([t.style, n.style]);
    else if (Hr(i)) {
      const o = t[i], s = n[i];
      s && o !== s && !(H(o) && o.includes(s)) && (t[i] = o ? [].concat(o, s) : s);
    } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function Le(e, t, r, n = null) {
  Fe(e, t, 7, [r, n]);
}
const Jd = Qs();
let Yd = 0;
function Xd(e, t, r) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || Jd, o = { uid: Yd++, vnode: e, type: n, parent: t, appContext: i, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new mf(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(i.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: ia(n, i), emitsOptions: Zs(n, i), emit: null, emitted: null, propsDefaults: Z, inheritAttrs: n.inheritAttrs, ctx: Z, data: Z, props: Z, attrs: Z, slots: Z, refs: Z, setupState: Z, setupContext: null, suspense: r, suspenseId: r ? r.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Rd.bind(null, o), e.ce && e.ce(o), o;
}
let fe = null;
const Qd = () => fe || me;
let Dr, Ln;
{
  const e = Wr(), t = (r, n) => {
    let i;
    return (i = e[r]) || (i = e[r] = []), i.push(n), (o) => {
      i.length > 1 ? i.forEach((s) => s(o)) : i[0](o);
    };
  };
  Dr = t("__VUE_INSTANCE_SETTERS__", (r) => fe = r), Ln = t("__VUE_SSR_SETTERS__", (r) => sr = r);
}
const cr = (e) => {
  const t = fe;
  return Dr(e), e.scope.on(), () => {
    e.scope.off(), Dr(t);
  };
}, ao = () => {
  fe && fe.scope.off(), Dr(null);
};
function pa(e) {
  return e.vnode.shapeFlag & 4;
}
let sr = false;
function Zd(e, t = false, r = false) {
  t && Ln(t);
  const { props: n, children: i } = e.vnode, o = pa(e);
  Ld(e, n, o, t), Ud(e, i, r || t);
  const s = o ? e0(e, t) : void 0;
  return t && Ln(false), s;
}
function e0(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, bd);
  const { setup: n } = r;
  if (n) {
    Je();
    const i = e.setupContext = n.length > 1 ? r0(e) : null, o = cr(e), s = ur(n, e, 0, [e.props, i]), a = vs(s);
    if (Ye(), o(), (a || e.sp) && !Pt(e) && Vs(e), a) {
      if (s.then(ao, ao), t) return s.then((l) => {
        lo(e, l);
      }).catch((l) => {
        qr(l, e, 0);
      });
      e.asyncDep = s;
    } else lo(e, s);
  } else va(e);
}
function lo(e, t, r) {
  U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ne(t) && (e.setupState = js(t)), va(e);
}
function va(e, t, r) {
  const n = e.type;
  e.render || (e.render = n.render || Ue);
  {
    const i = cr(e);
    Je();
    try {
      wd(e);
    } finally {
      Ye(), i();
    }
  }
}
const t0 = { get(e, t) {
  return ce(e, "get", ""), e[t];
} };
function r0(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return { attrs: new Proxy(e.attrs, t0), slots: e.slots, emit: e.emit, expose: t };
}
function _i(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(js(Uf(e.exposed)), { get(t, r) {
    if (r in t) return t[r];
    if (r in Xt) return Xt[r](e);
  }, has(t, r) {
    return r in t || r in Xt;
  } })) : e.proxy;
}
function n0(e, t = true) {
  return U(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function i0(e) {
  return U(e) && "__vccOpts" in e;
}
const ga = (e, t) => Vf(e, t, sr), o0 = "3.5.26";
let Nn;
const uo = typeof window < "u" && window.trustedTypes;
if (uo) try {
  Nn = uo.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
const ma = Nn ? (e) => Nn.createHTML(e) : (e) => e, s0 = "http://www.w3.org/2000/svg", a0 = "http://www.w3.org/1998/Math/MathML", qe = typeof document < "u" ? document : null, co = qe && qe.createElement("template"), l0 = { insert: (e, t, r) => {
  t.insertBefore(e, r || null);
}, remove: (e) => {
  const t = e.parentNode;
  t && t.removeChild(e);
}, createElement: (e, t, r, n) => {
  const i = t === "svg" ? qe.createElementNS(s0, e) : t === "mathml" ? qe.createElementNS(a0, e) : r ? qe.createElement(e, { is: r }) : qe.createElement(e);
  return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
}, createText: (e) => qe.createTextNode(e), createComment: (e) => qe.createComment(e), setText: (e, t) => {
  e.nodeValue = t;
}, setElementText: (e, t) => {
  e.textContent = t;
}, parentNode: (e) => e.parentNode, nextSibling: (e) => e.nextSibling, querySelector: (e) => qe.querySelector(e), setScopeId(e, t) {
  e.setAttribute(t, "");
}, insertStaticContent(e, t, r, n, i, o) {
  const s = r ? r.previousSibling : t.lastChild;
  if (i && (i === o || i.nextSibling)) for (; t.insertBefore(i.cloneNode(true), r), !(i === o || !(i = i.nextSibling)); ) ;
  else {
    co.innerHTML = ma(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
    const a = co.content;
    if (n === "svg" || n === "mathml") {
      const l = a.firstChild;
      for (; l.firstChild; ) a.appendChild(l.firstChild);
      a.removeChild(l);
    }
    t.insertBefore(a, r);
  }
  return [s ? s.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild];
} }, u0 = Symbol("_vtc");
function c0(e, t, r) {
  const n = e[u0];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const fo = Symbol("_vod"), f0 = Symbol("_vsh"), d0 = Symbol(""), h0 = /(?:^|;)\s*display\s*:/;
function p0(e, t, r) {
  const n = e.style, i = oe(r);
  let o = false;
  if (r && !i) {
    if (t) if (oe(t)) for (const s of t.split(";")) {
      const a = s.slice(0, s.indexOf(":")).trim();
      r[a] == null && yr(n, a, "");
    }
    else for (const s in t) r[s] == null && yr(n, s, "");
    for (const s in r) s === "display" && (o = true), yr(n, s, r[s]);
  } else if (i) {
    if (t !== r) {
      const s = n[d0];
      s && (r += ";" + s), n.cssText = r, o = h0.test(r);
    }
  } else t && e.removeAttribute("style");
  fo in e && (e[fo] = o ? n.display : "", e[f0] && (n.display = "none"));
}
const ho = /\s*!important$/;
function yr(e, t, r) {
  if (H(r)) r.forEach((n) => yr(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--")) e.setProperty(t, r);
  else {
    const n = v0(e, t);
    ho.test(r) ? e.setProperty(mt(n), r.replace(ho, ""), "important") : e[n] = r;
  }
}
const po = ["Webkit", "Moz", "ms"], hn = {};
function v0(e, t) {
  const r = hn[t];
  if (r) return r;
  let n = Te(t);
  if (n !== "filter" && n in e) return hn[t] = n;
  n = kr(n);
  for (let i = 0; i < po.length; i++) {
    const o = po[i] + n;
    if (o in e) return hn[t] = o;
  }
  return t;
}
const vo = "http://www.w3.org/1999/xlink";
function go(e, t, r, n, i, o = gf(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(vo, t.slice(6, t.length)) : e.setAttributeNS(vo, t, r) : r == null || o && !bs(r) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : Ze(r) ? String(r) : r);
}
function mo(e, t, r, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? ma(r) : r);
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
    a === "boolean" ? r = bs(r) : r == null && a === "string" ? (r = "", s = true) : a === "number" && (r = 0, s = true);
  }
  try {
    e[t] = r;
  } catch {
  }
  s && e.removeAttribute(i || t);
}
function g0(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function m0(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
const _o = Symbol("_vei");
function _0(e, t, r, n, i = null) {
  const o = e[_o] || (e[_o] = {}), s = o[t];
  if (n && s) s.value = n;
  else {
    const [a, l] = b0(t);
    if (n) {
      const c = o[t] = x0(n, i);
      g0(e, a, c, l);
    } else s && (m0(e, a, s, l), o[t] = void 0);
  }
}
const bo = /(?:Once|Passive|Capture)$/;
function b0(e) {
  let t;
  if (bo.test(e)) {
    t = {};
    let n;
    for (; n = e.match(bo); ) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = true;
  }
  return [e[2] === ":" ? e.slice(3) : mt(e.slice(2)), t];
}
let pn = 0;
const w0 = Promise.resolve(), y0 = () => pn || (w0.then(() => pn = 0), pn = Date.now());
function x0(e, t) {
  const r = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= r.attached) return;
    Fe(E0(n, r.value), t, 5, [n]);
  };
  return r.value = e, r.attached = y0(), r;
}
function E0(e, t) {
  if (H(t)) {
    const r = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      r.call(e), e._stopped = true;
    }, t.map((n) => (i) => !i._stopped && n && n(i));
  } else return t;
}
const wo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, S0 = (e, t, r, n, i, o) => {
  const s = i === "svg";
  t === "class" ? c0(e, n, s) : t === "style" ? p0(e, r, n) : Hr(t) ? ti(t) || _0(e, t, r, n, o) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : C0(e, t, n, s)) ? (mo(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && go(e, t, n, s, o, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !oe(n)) ? mo(e, Te(t), n, o, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), go(e, t, n, s));
};
function C0(e, t, r, n) {
  if (n) return !!(t === "innerHTML" || t === "textContent" || t in e && wo(t) && U(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE") return false;
  }
  return wo(t) && oe(r) ? false : t in e;
}
const P0 = ["ctrl", "shift", "alt", "meta"], T0 = { stop: (e) => e.stopPropagation(), prevent: (e) => e.preventDefault(), self: (e) => e.target !== e.currentTarget, ctrl: (e) => !e.ctrlKey, shift: (e) => !e.shiftKey, alt: (e) => !e.altKey, meta: (e) => !e.metaKey, left: (e) => "button" in e && e.button !== 0, middle: (e) => "button" in e && e.button !== 1, right: (e) => "button" in e && e.button !== 2, exact: (e, t) => P0.some((r) => e[`${r}Key`] && !t.includes(r)) }, yo = (e, t) => {
  const r = e._withMods || (e._withMods = {}), n = t.join(".");
  return r[n] || (r[n] = ((i, ...o) => {
    for (let s = 0; s < t.length; s++) {
      const a = T0[t[s]];
      if (a && a(i, t)) return;
    }
    return e(i, ...o);
  }));
}, R0 = he({ patchProp: S0 }, l0);
let xo;
function O0() {
  return xo || (xo = Fd(R0));
}
const A0 = ((...e) => {
  const t = O0().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const i = M0(n);
    if (!i) return;
    const o = t._component;
    !U(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const s = r(i, false, I0(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), s;
  }, t;
});
function I0(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function M0(e) {
  return oe(e) ? document.querySelector(e) : e;
}
const jn = { value: null };
function _a() {
  if (!jn.value) throw new Error("global config is unset");
  return jn.value;
}
function D0(e) {
  jn.value = e;
}
class Eo {
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
class L0 {
  info(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} INFO [${t}] ${r(new Eo()).build()}`);
  }
  warn(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} WARN [${t}] ${r(new Eo()).build()}`);
  }
  error(t, r) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} ERROR [${t}] ${r.stack ?? JSON.stringify(r)}`);
  }
}
const vn = new L0();
class N0 {
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
    vn.info("service_init", (i) => i.bold(t).text("start init..."));
    try {
      await r.initialize();
    } catch (i) {
      vn.error("service_init", i);
    }
    vn.info("service_init", (i) => i.bold(t).text("init cost").time(performance.now() - n));
  }
}
var ba = ((e) => (e.main = "main", e.rendererMain = "rendererMain", e.rendererLyrics = "rendererLyrics", e.rendererUpdate = "rendererUpdate", e.rendererFeedback = "rendererFeedback", e.rendererImagePreview = "rendererImagePreview", e.rendererTaskbarWidget = "rendererTaskbarWidget", e.rendererTaskbarWidgetShadow = "rendererTaskbarWidgetShadow", e))(ba || {});
let So = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, r) => (r &= 63, r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r > 62 ? t += "-" : t += "_", t), "");
class Zt {
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
    return new Zt();
  }
  static createDone(t) {
    const r = new Zt();
    return r.resolve(t), r;
  }
  static createAsync(t) {
    return new Zt(t());
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
class j0 {
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
        const s = So(), a = new Zt();
        this.requests.set(s, a);
        const l = {};
        for (const [u, h] of o.entries()) if (h instanceof Function) {
          const p = So();
          this.callbacks.set(p, o[u]), o[u] = null, l[u] = p;
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
class $0 extends j0 {
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
globalThis.createServiceInitializer = () => new N0({ workerId: ba.rendererUpdate, transport: (e) => new $0(e) });
const wa = createServiceInitializer();
function U0() {
  const t = `
@font-face {
  font-family: "MiSans";
  src: url("${_a().fontPrefix.replaceAll("\\", "/")}/MiSansVF.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
}`, r = document.createElement("style");
  r.textContent = t, document.head.appendChild(r);
}
function Ke(e) {
  return wa.getServiceProtocol(e);
}
var $e = ((e) => (e.storage = "storage", e.sharedState = "sharedState", e.request = "request", e.queue = "queue", e.player = "player", e.window = "window", e.user = "user", e.collect = "collect", e.internalCheck = "internalCheck", e.update = "update", e.appSettings = "appSettings", e.utils = "utils", e.debug = "debug", e.applog = "applog", e.renderer = "renderer", e.commerce = "commerce", e.serverPush = "serverPush", e.shortcut = "shortcut", e.desktopLyrics = "desktopLyrics", e.startup = "startup", e.notification = "notification", e.freqCtrl = "freqCtrl", e.resPreload = "resPreload", e.playerProxy = "playerProxy", e.imagePreviewer = "imagePreviewer", e.appClock = "clock", e.taskbarWidget = "taskbarWidget", e))($e || {}), tt = ((e) => (e.PlayOrPause = "PlayOrPause", e.PrevTrack = "PrevTrack", e.NextTrack = "NextTrack", e.VolumeUp = "VolumeUp", e.VolumeDown = "VolumeDown", e.Like = "Like", e.Dislike = "Dislike", e))(tt || {});
const Co = "higher", H0 = { queue: { appVisibility: { isPlayerVisible: true }, queue: null }, player: { isPlaying: false, isLoading: false, isMuted: false, volume: 0.3, quality: Co, playingQuality: Co, availableQualities: [], playableQualities: [], overrideQuality: void 0, progressPercent: 0, progressSeconds: 0, durationSeconds: 0, mediaEtParams: {}, isInitialPlay: true, currentAudioEffect: null }, user: { isLoading: false, info: null }, collect: { playable: {}, playlist: {}, album: {}, artist: {}, user: {} }, internalCheck: { isPassed: false }, debug: { updateProgress: "", latestTronBuildId: "", latestVersion: "" }, window: { windows: {}, isInactive: false, closeActionType: "exit" }, commerce: { commerceInfo: void 0, purchasedDigitalAlbumsIds: [], isAdFree: false, isVip: false, isFreeVip: false, vipExpireAt: 0, hasPlayEntitlement: false, type: "free", audioEffects: [] }, update: { isUpdateButtonVisible: false, isUpdateDialogVisible: false, updateType: false, isUpdating: false, isFailed: false }, shortcut: { isGlobalShortcutEnabled: false, shortcuts: { [tt.PlayOrPause]: { inApp: "", global: "" }, [tt.PrevTrack]: { inApp: "", global: "" }, [tt.NextTrack]: { inApp: "", global: "" }, [tt.VolumeUp]: { inApp: "", global: "" }, [tt.VolumeDown]: { inApp: "", global: "" }, [tt.Like]: { inApp: "", global: "" }, [tt.Dislike]: { inApp: "", global: "" } } }, desktopLyrics: { settings: { enabled: false, textSize: 24, textColor: "light", showTranslation: true, isLocked: false }, hover: false, menuVisible: false }, startup: { isAutoStartup: false }, notification: { isNotificationEnabled: true }, taskbarWidget: { enabled: false, autoStart: true, preferredSide: void 0, widgetState: "docked", isDragging: false, inDragRegion: false, snapStage: null, dockedStyle: "nano", theme: "dark", hover: false }, region: { abroadType: "0" } }, Po = Vr(/* @__PURE__ */ new Map());
function F0(e) {
  let t = Po.get(e);
  return t || (t = Hf(H0[e]), Po.set(e, t), Ke($e.sharedState).get(e).then((r) => {
    t.value = r;
  }), Ke($e.sharedState).onUpdate(e, (r) => {
    t.value = r;
  })), t;
}
function ya(e) {
  return F0(e);
}
function B0(e = 0, t = 1) {
  const r = { T: 12, B: 9, M: 6, K: 3 };
  for (const [n, i] of Object.entries(r)) if (e >= 10 ** i) return `${(e / 10 ** i).toFixed(t)}${n}`;
  return e > 0 && e < 1 ? "" : `${e}`;
}
const k0 = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function W0(e, t) {
  return $(), F("svg", k0, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M44.996 19.068A13.4 13.4 0 0 0 37.823 7.52a13.34 13.34 0 0 0-12.832.252l-.145.086-.327.206a.96.96 0 0 1-1.032 0l-.24-.15-.194-.117a13.34 13.34 0 0 0-12.876-.277A13.4 13.4 0 0 0 3 19.392l.005.468c.14 5.192 3.365 10.766 8.53 16.003a50 50 0 0 0 3.326 3.075l.617.512q.464.379.923.736l.609.465q.759.57 1.488 1.066l.575.384c.738.481 1.439.895 2.08 1.227l.444.222.208.098Q22.725 44 24 44l.313-.005q1.074-.038 1.877-.345c.81-.37 1.74-.898 2.737-1.549l.575-.384.489-.339q.494-.347.999-.727l.61-.465.46-.363.462-.373.617-.512.678-.583a49 49 0 0 0 2.648-2.492c5.164-5.237 8.39-10.811 8.53-16.003l.005-.468z" }, null, -1)])]);
}
const V0 = { render: W0 }, q0 = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function z0(e, t) {
  return $(), F("svg", q0, [...t[0] || (t[0] = [B("path", { stroke: "currentColor", "stroke-linejoin": "round", "stroke-width": "4", d: "M32 7c-4 0-6.5 2.5-8 4-1.5-1.5-4-4-8-4-5 0-8 2-10 5s-3.19 9.296 1 16c5 8 13 13 17 15 4-2 12-7 17-15 4.559-7.295 3-13 1-16s-5-5-10-5Z" }, null, -1)])]);
}
const K0 = { render: z0 }, G0 = { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "none", viewBox: "0 0 20 20" };
function J0(e, t) {
  return $(), F("svg", G0, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-opacity": ".85", d: "M7.917 8.333c.46 0 .833.373.833.834v4.583a.833.833 0 0 1-1.667 0V9.167c0-.46.373-.834.834-.834m4.166 0c.46 0 .834.373.834.834v4.583a.833.833 0 0 1-1.667 0V9.167c0-.46.373-.834.833-.834" }, null, -1), B("path", { fill: "currentColor", "fill-opacity": ".85", "fill-rule": "evenodd", d: "M17.917 4.167a.833.833 0 0 1 0 1.666h-1.25v8.82c0 2.29-1.919 4.097-4.218 4.097H7.55c-2.3 0-4.218-1.807-4.218-4.097v-8.82h-1.25a.833.833 0 0 1 0-1.666zM5 14.653c0 1.313 1.114 2.43 2.551 2.43h4.898c1.437 0 2.551-1.117 2.551-2.43v-8.82H5z", "clip-rule": "evenodd" }, null, -1), B("path", { fill: "currentColor", "fill-opacity": ".85", d: "M11.667 1.667a.833.833 0 0 1 0 1.666H8.333a.833.833 0 0 1 0-1.666z" }, null, -1)])]);
}
const Y0 = { render: J0 }, X0 = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function Q0(e, t) {
  return $(), F("svg", X0, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M11 40.407V9.24c0-3.147 3.465-5.061 6.129-3.387L40.844 20.76c2.436 1.531 2.507 5.058.133 6.685L17.262 43.706c-2.654 1.82-6.262-.08-6.262-3.299" }, null, -1)])]);
}
const Z0 = { render: Q0 }, eh = { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", fill: "none", viewBox: "0 0 12 12" };
function th(e, t) {
  return $(), F("svg", eh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M6 1a.75.75 0 0 0-.75.75v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5A.75.75 0 0 0 6 1", "clip-rule": "evenodd" }, null, -1)])]);
}
const rh = { render: th }, nh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function ih(e, t) {
  return $(), F("svg", nh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M2.917 2.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m4.166.417a.833.833 0 1 0 0 1.666h10a.833.833 0 1 0 0-1.666zM1.667 10a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0m1.25 5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m3.333-5c0-.46.373-.833.833-.833h10a.833.833 0 1 1 0 1.666h-10A.833.833 0 0 1 6.25 10m.833 5.417a.833.833 0 1 0 0 1.666h10a.833.833 0 1 0 0-1.666z", "clip-rule": "evenodd" }, null, -1)])]);
}
const oh = { render: ih }, sh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function ah(e, t) {
  return $(), F("svg", sh, [...t[0] || (t[0] = [B("circle", { cx: "15.834", cy: "10", r: "1.25", fill: "currentColor" }, null, -1), B("circle", { cx: "10.001", cy: "10", r: "1.25", fill: "currentColor" }, null, -1), B("circle", { cx: "4.167", cy: "10", r: "1.25", fill: "currentColor" }, null, -1)])]);
}
const lh = { render: ah }, uh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function ch(e, t) {
  return $(), F("svg", uh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-opacity": ".85", "fill-rule": "evenodd", d: "M7.5 5a2.5 2.5 0 0 1 5 0v1.667h-5zM5.833 6.669v-1.67a4.167 4.167 0 1 1 8.334 0v1.67q.32.003.579.023c.33.027.657.086.972.247a2.5 2.5 0 0 1 1.093 1.093c.16.315.22.643.247.972.025.312.025.691.025 1.13V15.7c0 .439 0 .818-.025 1.13-.027.33-.087.657-.247.973a2.5 2.5 0 0 1-1.093 1.092c-.315.16-.643.22-.972.247-.312.026-.691.026-1.13.026H6.383c-.439 0-.818 0-1.13-.026-.33-.027-.657-.086-.972-.247a2.5 2.5 0 0 1-1.093-1.092c-.16-.316-.22-.643-.247-.973a15 15 0 0 1-.025-1.13v-5.565c0-.439 0-.818.025-1.13.027-.33.086-.657.247-.972A2.5 2.5 0 0 1 4.281 6.94c.315-.16.643-.22.972-.247q.26-.02.58-.023m-.795 1.755c.042-.02.125-.052.352-.07.236-.02.546-.02 1.027-.02h7.166c.48 0 .791 0 1.027.02.226.018.31.05.352.07.156.08.284.207.364.364.02.041.052.125.07.352.02.236.02.546.02 1.027v5.5c0 .48 0 .79-.02 1.026-.018.227-.05.31-.07.352a.83.83 0 0 1-.364.364c-.042.021-.126.053-.352.071-.236.02-.546.02-1.027.02H6.417c-.48 0-.791 0-1.027-.02-.227-.018-.31-.05-.352-.07a.83.83 0 0 1-.364-.365c-.02-.041-.052-.125-.07-.352-.02-.236-.02-.546-.02-1.026v-5.5c0-.48 0-.791.02-1.027.018-.227.05-.31.07-.352a.83.83 0 0 1 .364-.364m5.795 4.686a1.666 1.666 0 1 0-1.666 0V15a.833.833 0 1 0 1.666 0z", "clip-rule": "evenodd" }, null, -1)])]);
}
const fh = { render: ch }, dh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function hh(e, t) {
  return $(), F("svg", dh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M2.5 9.999a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0M10 .832a9.167 9.167 0 1 0 0 18.333A9.167 9.167 0 0 0 10 .832m0 7.083a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083m0 1.252c.46 0 .833.373.833.833v3.75a.833.833 0 0 1-1.666 0V10c0-.46.373-.833.833-.833", "clip-rule": "evenodd" }, null, -1)])]);
}
const ph = { render: hh }, vh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function gh(e, t) {
  return $(), F("svg", vh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M10.342 3.049a.83.83 0 0 0-.684 0c-.037.016-.15.085-.378.415-.225.326-.489.791-.877 1.48l-4.6 8.155c-.377.668-.63 1.119-.788 1.47-.16.353-.16.482-.156.524.026.233.15.445.34.582.034.025.147.087.534.122.382.035.9.036 1.666.036h9.202c.766 0 1.284 0 1.666-.036.387-.035.5-.097.534-.122a.83.83 0 0 0 .34-.582c.005-.042.003-.17-.156-.525-.157-.35-.41-.801-.787-1.469l-4.601-8.156c-.388-.688-.652-1.153-.877-1.479-.229-.33-.341-.399-.378-.415m-1.368-1.52a2.5 2.5 0 0 1 2.052 0c.462.208.789.588 1.065.987.274.397.575.93.937 1.573l.02.035 4.601 8.156.02.035c.352.624.644 1.142.837 1.57.194.434.347.9.291 1.393a2.5 2.5 0 0 1-1.02 1.749c-.404.29-.884.386-1.357.43-.468.043-1.063.043-1.779.043H5.36c-.716 0-1.31 0-1.779-.043-.473-.044-.953-.14-1.356-.43a2.5 2.5 0 0 1-1.021-1.749c-.056-.494.097-.96.292-1.392.192-.43.484-.947.836-1.57l.02-.036 4.6-8.156.02-.035c.364-.644.664-1.176.938-1.573.276-.399.603-.78 1.065-.987m.193 5.554a.833.833 0 1 1 1.666 0v3.333a.833.833 0 0 1-1.666 0zM10 12.5a.833.833 0 1 0 0 1.666.833.833 0 0 0 0-1.666", "clip-rule": "evenodd" }, null, -1)])]);
}
const mh = { render: gh }, _h = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function bh(e, t) {
  return $(), F("svg", _h, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M13.606 13.733a6.667 6.667 0 1 0-7.213 0 11.1 11.1 0 0 0-4.731 3.221.833.833 0 0 0 1.26 1.091c1.73-1.998 4.261-3.254 7.078-3.254s5.347 1.256 7.078 3.254a.833.833 0 1 0 1.26-1.091 11.1 11.1 0 0 0-4.732-3.221M5 8.125a5 5 0 1 1 10 0 5 5 0 0 1-10 0", "clip-rule": "evenodd" }, null, -1)])]);
}
const wh = { render: bh }, yh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function xh(e, t) {
  return $(), F("svg", yh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-opacity": ".85", "fill-rule": "evenodd", d: "m10 2.757 6.272 3.622v7.242L10 17.24l-6.272-3.62V6.379zm-.833-1.443a1.67 1.67 0 0 1 1.666 0l6.272 3.621c.516.298.833.848.833 1.444v7.242c0 .595-.317 1.145-.833 1.443l-6.272 3.621a1.67 1.67 0 0 1-1.666 0l-6.272-3.62a1.67 1.67 0 0 1-.834-1.444V6.379c0-.596.318-1.146.834-1.444zM8.333 10a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0M10 6.666a3.333 3.333 0 1 0 0 6.667 3.333 3.333 0 0 0 0-6.667", "clip-rule": "evenodd" }, null, -1)])]);
}
const Eh = { render: xh }, Sh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Ch(e, t) {
  return $(), F("svg", Sh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m1.667 0A9.167 9.167 0 1 1 .833 10a9.167 9.167 0 0 1 18.334 0M8.257 7.568a.833.833 0 1 0-1.514.698l2.311 5.007c.373.807 1.52.807 1.892 0l2.31-5.007a.833.833 0 0 0-1.513-.698L10 11.345z", "clip-rule": "evenodd" }, null, -1), Mr(">", -1)])]);
}
const Ph = { render: Ch }, Th = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Rh(e, t) {
  return $(), F("svg", Th, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M5.134 1.666h9.731c.44 0 .819 0 1.13.025.33.027.658.087.973.247a2.5 2.5 0 0 1 1.093 1.093c.16.315.22.643.247.972.025.313.025.692.025 1.13v.283a.833.833 0 0 1-1.666 0v-.25c0-.48-.001-.79-.02-1.027-.019-.226-.05-.31-.071-.351a.83.83 0 0 0-.364-.364c-.042-.021-.126-.053-.352-.071-.236-.02-.546-.02-1.027-.02H5.167c-.481 0-.791 0-1.027.02-.227.018-.31.05-.352.07a.83.83 0 0 0-.364.365c-.021.04-.052.125-.07.351-.02.236-.02.547-.02 1.027v9.667c0 .48 0 .79.02 1.027.018.226.049.31.07.351.08.157.207.284.364.364.041.021.125.053.352.071.236.02.546.02 1.027.02h9.666c.48 0 .79 0 1.027-.02.226-.018.31-.05.352-.07a.83.83 0 0 0 .364-.365c.02-.041.052-.125.07-.351.02-.237.02-.547.02-1.027v-.25a.833.833 0 1 1 1.667 0v.282c0 .44 0 .818-.025 1.13-.027.33-.087.657-.247.973a2.5 2.5 0 0 1-1.093 1.092c-.315.16-.643.22-.972.247-.312.026-.691.026-1.13.026H5.133c-.439 0-.818 0-1.13-.026-.33-.027-.657-.086-.972-.247a2.5 2.5 0 0 1-1.093-1.092c-.16-.316-.22-.643-.247-.973-.026-.312-.026-.69-.025-1.13V5.134c0-.44 0-.818.025-1.13.027-.33.086-.658.247-.973a2.5 2.5 0 0 1 1.093-1.093c.315-.16.643-.22.972-.247.312-.025.691-.025 1.13-.025m5.484 11.899a.833.833 0 0 1-1.178 0l-2.946-2.947a.833.833 0 0 1 0-1.178L9.44 6.494a.833.833 0 0 1 1.178 1.178L9.124 9.166H17.5a.833.833 0 1 1 0 1.667H9.065l1.553 1.553a.833.833 0 0 1 0 1.179", "clip-rule": "evenodd" }, null, -1)])]);
}
const Oh = { render: Rh }, Ah = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Ih(e, t) {
  return $(), F("svg", Ah, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15m0 1.667A9.167 9.167 0 1 0 10 .833a9.167 9.167 0 0 0 0 18.334m0-7.5a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334m0 1.666a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666M5.619 8.486q.055-.084.095-.179l.006-.015a4.6 4.6 0 0 1 3.15-2.76l.016-.004q.098-.026.189-.07c.336-.163.574-.495.547-.874-.031-.452-.425-.799-.87-.708a6.25 6.25 0 0 0-4.66 4.082c-.147.429.144.865.589.956.372.076.732-.116.938-.428", "clip-rule": "evenodd" }, null, -1)])]);
}
const Mh = { render: Ih }, Dh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function Lh(e, t) {
  return $(), F("svg", Dh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M11.128 3.556a.417.417 0 0 0-.712.295v1.747c0 .773-.528 1.423-1.243 1.62-2.318.644-3.793 1.49-4.767 2.713s-1.537 2.933-1.79 5.499c2.431-1.62 4.25-2.59 6.484-2.223.827.136 1.316.869 1.316 1.593v1.029c0 .366.44.554.705.301l5.82-5.555a.833.833 0 0 0 .013-1.192zm-2.378.295c0-1.856 2.244-2.785 3.556-1.473l5.827 5.827a2.5 2.5 0 0 1-.042 3.576l-5.82 5.555c-1.325 1.265-3.521.326-3.521-1.507v-.99c-1.497-.218-2.814.38-5.236 1.995-1.107.739-2.701-.06-2.563-1.502.263-2.739.878-4.842 2.151-6.44 1.28-1.606 3.134-2.588 5.626-3.28a.04.04 0 0 0 .02-.012l.002-.003z", "clip-rule": "evenodd" }, null, -1)])]);
}
const Nh = { render: Lh }, jh = { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", fill: "none", viewBox: "0 0 20 20" };
function $h(e, t) {
  return $(), F("svg", jh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M10 1.042a5.208 5.208 0 1 0 0 10.416 5.208 5.208 0 0 0 0-10.416M6.46 6.25a3.542 3.542 0 1 1 7.083 0 3.542 3.542 0 0 1-7.083 0m11.47 4.197a.8.8 0 0 0-.324-.024l-1.667.208a.834.834 0 0 0-.73.827v4.375a1.458 1.458 0 1 1-1.458-1.458.833.833 0 0 0 0-1.667 3.124 3.124 0 1 0 3.118 3.339 1 1 0 0 0 .007-.11v-3.743l.937-.117a.833.833 0 0 0 .117-1.63M5.625 12.708a4.167 4.167 0 0 0-4.166 4.167v1.25a.833.833 0 0 0 1.666 0v-1.25a2.5 2.5 0 0 1 2.5-2.5h3.75a.834.834 0 0 0 0-1.667z" }, null, -1)])]);
}
const Uh = { render: $h }, Hh = { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "none", viewBox: "0 0 48 48" };
function Fh(e, t) {
  return $(), F("svg", Hh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", "fill-rule": "evenodd", d: "M10.482 11.405A5 5 0 0 1 15.361 7.5h14.897v18.558a7 7 0 0 0-5.887 5.244l-2.209 8.834a2.46 2.46 0 0 1-4.792-1.112l1.714-8A2.5 2.5 0 0 0 16.64 28h-3.636c-3.203 0-5.58-2.97-4.879-6.095zM34.258 26H39a1 1 0 0 0 1-1V9.5a2 2 0 0 0-2-2h-3.742zM15.361 3.5a9 9 0 0 0-8.782 7.029l-2.357 10.5C2.96 26.654 7.238 32 13.004 32h1.78l-1.325 6.186C12.597 42.208 15.663 46 19.776 46a6.46 6.46 0 0 0 6.267-4.894l2.209-8.834A3 3 0 0 1 31.162 30H39a5 5 0 0 0 5-5V9.5a6 6 0 0 0-6-6z", "clip-rule": "evenodd" }, null, -1)])]);
}
const Bh = { render: Fh }, kh = zr({ __name: "Icon", props: { name: {} }, setup(e) {
  const t = e, r = { "collect-button": V0, "collect-button-outline": K0, plus: rh, playlist: oh, "three-points": lh, delete: Y0, "play-button": Z0, lock: fh, info: ph, report: mh, me: wh, settings: Eh, vip: Ph, logout: Oh, album: Mh, share: Nh, artist: Uh, dislike: Bh }, n = ga(() => r[t.name]);
  return (i, o) => ($(), Ir(md(n.value)));
} }), Wh = { key: 1, class: "placeholder" }, Vh = { key: 2, class: "content" }, qh = zr({ __name: "Button", props: { type: { default: "primary" }, icon: {}, iconStyle: {}, disabled: { type: Boolean }, defaultPlaceholder: { type: Boolean } }, emits: ["click"], setup(e, { emit: t }) {
  const r = t;
  return (n, i) => ($(), F("div", { class: Lt(["button", { [e.type]: true, disabled: e.disabled, "with-placeholder": e.defaultPlaceholder }]), onClick: i[0] || (i[0] = yo((o) => e.disabled ? void 0 : r("click", o), ["stop"])), onDblclick: i[1] || (i[1] = yo(() => {
  }, ["stop"])) }, [e.icon ? ($(), F("div", { key: 0, class: "icon", style: lr(e.iconStyle) }, [le(kh, { name: e.icon }, null, 8, ["name"])], 4)) : st("", true), e.defaultPlaceholder ? ($(), F("div", Wh, [Xi(n.$slots, "placeholder", {}, void 0)])) : st("", true), e.type !== "icon" ? ($(), F("div", Vh, [Xi(n.$slots, "default", {}, void 0)])) : st("", true)], 34));
} }), xa = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, i] of t) r[n] = i;
  return r;
}, To = xa(qh, [["__scopeId", "data-v-9694af45"]]), zh = { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "10", fill: "none", viewBox: "0 0 10 10" };
function Kh(e, t) {
  return $(), F("svg", zh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M5 5.708.854 9.854A.48.48 0 0 1 .503 10a.5.5 0 0 1-.361-.142.5.5 0 0 1-.142-.36.48.48 0 0 1 .146-.352L4.292 5 .146.854A.5.5 0 0 1 0 .498.5.5 0 0 1 .146.146.5.5 0 0 1 .503 0a.48.48 0 0 1 .351.146L5 4.292 9.146.146A.5.5 0 0 1 9.502 0q.103 0 .19.04a.5.5 0 0 1 .162.814L5.708 5l4.146 4.146a.5.5 0 0 1 0 .708.5.5 0 0 1-.352.146.5.5 0 0 1-.356-.146z" }, null, -1)])]);
}
const Gh = { render: Kh }, Jh = { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "10", fill: "none", viewBox: "0 0 10 10" };
function Yh(e, t) {
  return $(), F("svg", Jh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M1.475 10a1.4 1.4 0 0 1-.562-.117A1.7 1.7 0 0 1 .44 9.56a1.7 1.7 0 0 1-.322-.474A1.4 1.4 0 0 1 0 8.525v-7.05Q0 1.18.117.913.24.645.44.444.645.24.913.122 1.182 0 1.475 0h7.05q.294 0 .562.122.268.118.469.322.204.2.322.47.122.267.122.56v7.051q0 .294-.122.562a1.5 1.5 0 0 1-.322.474q-.2.2-.47.322a1.4 1.4 0 0 1-.56.117zM8.5 8.999a.5.5 0 0 0 .498-.498V1.499a.5.5 0 0 0-.498-.498H1.499a.5.5 0 0 0-.352.146.5.5 0 0 0-.146.352v7.002a.5.5 0 0 0 .498.498z" }, null, -1)])]);
}
const Xh = { render: Yh }, Qh = { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "1", fill: "none", viewBox: "0 0 10 1" };
function Zh(e, t) {
  return $(), F("svg", Qh, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M.498 1A.5.5 0 0 1 0 .502q0-.103.04-.19A.5.5 0 0 1 .145.15.5.5 0 0 1 .303.038.5.5 0 0 1 .498 0h9.004q.103 0 .19.04a.5.5 0 0 1 .162.111.5.5 0 0 1-.352.85z" }, null, -1)])]);
}
const ep = { render: Zh }, tp = { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "10", fill: "none", viewBox: "0 0 10 10" };
function rp(e, t) {
  return $(), F("svg", tp, [...t[0] || (t[0] = [B("path", { fill: "currentColor", d: "M8.999 2.964q0-.405-.161-.762a1.9 1.9 0 0 0-.44-.625 2 2 0 0 0-.64-.42 1.9 1.9 0 0 0-.76-.156H2.084q.078-.224.22-.41a1.5 1.5 0 0 1 .327-.318q.186-.13.405-.2Q3.261 0 3.501 0h3.496q.62 0 1.167.24A3.01 3.01 0 0 1 10 2.997V6.5q0 .24-.073.464a1.4 1.4 0 0 1-.2.405 1.5 1.5 0 0 1-.728.547zM1.475 10a1.4 1.4 0 0 1-.562-.117A1.7 1.7 0 0 1 .44 9.56a1.7 1.7 0 0 1-.322-.474A1.4 1.4 0 0 1 0 8.525V3.477q0-.298.117-.562.123-.268.322-.469.205-.205.47-.322.267-.122.566-.122h5.048q.298 0 .567.122a1.5 1.5 0 0 1 .786.786q.122.27.122.567v5.048q0 .298-.122.567a1.55 1.55 0 0 1-.791.79 1.4 1.4 0 0 1-.562.118zm5.024-1.001a.5.5 0 0 0 .352-.146.5.5 0 0 0 .112-.157.5.5 0 0 0 .039-.195v-5a.5.5 0 0 0-.308-.464.5.5 0 0 0-.195-.039h-5a.5.5 0 0 0-.195.04.5.5 0 0 0-.157.111.5.5 0 0 0-.146.352v5a.5.5 0 0 0 .498.498z" }, null, -1)])]);
}
const np = { render: rp }, ip = { class: "content" }, op = { key: 0, class: "windows-controls" }, sp = zr({ __name: "TitleBar", props: { windowId: {}, title: {}, mode: {} }, setup(e) {
  const t = ya("window"), r = _a().os;
  return (n, i) => ($(), F("div", { class: Lt(["title-bar", { [e.mode]: true, [String(W(r))]: true }]) }, [B("div", ip, Kt(W(r) === "Windows" ? e.title : ""), 1), W(r) === "Windows" ? ($(), F("div", op, [W(t).windows[e.windowId]?.isMinimizable ? ($(), F("div", { key: 0, class: "button", onClick: i[0] || (i[0] = (o) => W(Ke)(W($e).window).minimize(e.windowId)) }, [le(W(ep))])) : st("", true), W(t).windows[e.windowId]?.isMaximizable && !W(t).windows[e.windowId]?.isMaximize ? ($(), F("div", { key: 1, class: "button", onClick: i[1] || (i[1] = (o) => W(Ke)(W($e).window).maximize(e.windowId)) }, [le(W(Xh))])) : st("", true), W(t).windows[e.windowId]?.isMaximizable && W(t).windows[e.windowId]?.isMaximize ? ($(), F("div", { key: 2, class: "button", onClick: i[2] || (i[2] = (o) => W(Ke)(W($e).window).unmaximize(e.windowId)) }, [le(W(np))])) : st("", true), W(t).windows[e.windowId]?.isClosable ? ($(), F("div", { key: 3, class: "button close", onClick: i[3] || (i[3] = (o) => W(Ke)(W($e).window).close(e.windowId)) }, [le(W(Gh))])) : st("", true)])) : st("", true)], 2));
} }), ap = xa(sp, [["__scopeId", "data-v-3f8cf262"]]);
var Ea = ((e) => (e.main = "main", e.desktopLyrics = "desktopLyrics", e.captcha = "captcha", e.update = "update", e.feedback = "feedback", e.imagePreview = "imagePreview", e.taskbarWidget = "taskbarWidget", e.taskbarWidgetShadow = "taskbarWidgetShadow", e))(Ea || {});
const lp = "" + new URL("failed-BPdkR9hG.png", import.meta.url).href, up = "" + new URL("updating-C0QLbLYr.png", import.meta.url).href, cp = { class: "update" }, fp = ["src"], dp = { class: "actions" }, hp = ["src"], pp = { class: "progress" }, vp = { class: "info limit-width" }, gp = { key: 0, class: "left" }, mp = { key: 1 }, _p = { key: 2, class: "right" }, bp = { key: 3, class: "right" }, wp = zr({ __name: "Update", setup(e) {
  const t = ya("update");
  async function r() {
    await Ke($e.utils).openUrl("https://www.qishui.com/"), Ke($e.window).exitApp();
  }
  async function n() {
    Ke($e.update).checkUpdate();
  }
  return (i, o) => ($(), F("div", cp, [le(ap, { mode: "dark", title: "\u81EA\u52A8\u66F4\u65B0", "window-id": W(Ea).update }, null, 8, ["window-id"]), W(t).isFailed ? ($(), F(ge, { key: 0 }, [B("img", { class: "icon", src: W(lp) }, null, 8, fp), o[4] || (o[4] = B("h2", null, "\u66F4\u65B0\u5931\u8D25", -1)), o[5] || (o[5] = B("div", { class: "err-info" }, " \u5F53\u524D\u7248\u672C\u4E0D\u7A33\u5B9A\u6216\u8005\u5B58\u5728\u5B89\u5168\u98CE\u9669\uFF0C\u8BF7\u524D\u5F80\u6C7D\u6C34\u97F3\u4E50\u5B98\u7F51\u4E0B\u8F7D\u5E76\u5B89\u88C5\u6700\u65B0\u7248\u672C ", -1)), B("div", dp, [le(To, { type: "secondary", class: "update-button", onClick: o[0] || (o[0] = (s) => n()) }, { default: On(() => [...o[2] || (o[2] = [Mr(" \u91CD\u8BD5 ", -1)])]), _: 1 }), le(To, { class: "update-button", onClick: o[1] || (o[1] = (s) => r()) }, { default: On(() => [...o[3] || (o[3] = [Mr(" \u53BB\u5B98\u7F51\u4E0B\u8F7D ", -1)])]), _: 1 })])], 64)) : ($(), F(ge, { key: 1 }, [B("img", { class: "icon", src: W(up) }, null, 8, hp), o[6] || (o[6] = B("h2", null, "\u5F53\u524D\u6C7D\u6C34\u97F3\u4E50\u7248\u672C\u8FC7\u4F4E\uFF0C\u5347\u7EA7\u4E2D", -1)), B("div", pp, [B("div", { class: Lt(["bar", { waiting: !W(t).progress }]), style: lr({ width: W(t).progress ? `${W(t).progress.percentage}%` : "100px" }) }, null, 6)]), B("div", vp, [W(t).updatingVersion ? ($(), F("span", gp, "\u6B63\u5728\u66F4\u65B0\u5230 " + Kt(W(t).updatingVersion) + " " + Kt(W(t).progress ? `(${Math.round(W(t).progress.percentage)}%)` : ""), 1)) : ($(), F("span", mp, "\u6B63\u5728\u68C0\u67E5\u6700\u65B0\u7248\u672C")), W(t).progress ? ($(), F("span", _p, Kt(W(B0)(W(t).progress?.speed)) + "B/s", 1)) : ($(), F("span", bp, "..."))])], 64))]));
} });
async function yp() {
  const t = new URLSearchParams(window.location.search).get("global_config"), r = JSON.parse(t ?? "{}");
  D0(r), await wa.initialize(), U0(), A0(wp).mount("#app");
}
yp();
