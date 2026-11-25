// packages/renderers/main/src/services/tokenBeat.ts
// @ts-nocheck
import { W as _ } from "./renderer";
import "../main";
import "./base";
var y = function(l, o) {
  var t = false;
  return function() {
    t || (t = true, l(), setTimeout(function() {
      t = false;
    }, 1e4));
  };
};
const k = "1.2.14";
var h = function() {
  return h = Object.assign || function(l) {
    for (var o, t = 1, u = arguments.length; t < u; t++) {
      o = arguments[t];
      for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (l[i] = o[i]);
    }
    return l;
  }, h.apply(this, arguments);
}, v = function(l, o, t, u) {
  function i(e) {
    return e instanceof t ? e : new t(function(c) {
      c(e);
    });
  }
  return new (t || (t = Promise))(function(e, c) {
    function r(s) {
      try {
        n(u.next(s));
      } catch (f) {
        c(f);
      }
    }
    function a(s) {
      try {
        n(u.throw(s));
      } catch (f) {
        c(f);
      }
    }
    function n(s) {
      s.done ? e(s.value) : i(s.value).then(r, a);
    }
    n((u = u.apply(l, o || [])).next());
  });
}, g = function(l, o) {
  var t = { label: 0, sent: function() {
    if (e[0] & 1) throw e[1];
    return e[1];
  }, trys: [], ops: [] }, u, i, e, c;
  return c = { next: r(0), throw: r(1), return: r(2) }, typeof Symbol == "function" && (c[Symbol.iterator] = function() {
    return this;
  }), c;
  function r(n) {
    return function(s) {
      return a([n, s]);
    };
  }
  function a(n) {
    if (u) throw new TypeError("Generator is already executing.");
    for (; t; ) try {
      if (u = 1, i && (e = n[0] & 2 ? i.return : n[0] ? i.throw || ((e = i.return) && e.call(i), 0) : i.next) && !(e = e.call(i, n[1])).done) return e;
      switch (i = 0, e && (n = [n[0] & 2, e.value]), n[0]) {
        case 0:
        case 1:
          e = n;
          break;
        case 4:
          return t.label++, { value: n[1], done: false };
        case 5:
          t.label++, i = n[1], n = [0];
          continue;
        case 7:
          n = t.ops.pop(), t.trys.pop();
          continue;
        default:
          if (e = t.trys, !(e = e.length > 0 && e[e.length - 1]) && (n[0] === 6 || n[0] === 2)) {
            t = 0;
            continue;
          }
          if (n[0] === 3 && (!e || n[1] > e[0] && n[1] < e[3])) {
            t.label = n[1];
            break;
          }
          if (n[0] === 6 && t.label < e[1]) {
            t.label = e[1], e = n;
            break;
          }
          if (e && t.label < e[2]) {
            t.label = e[2], t.ops.push(n);
            break;
          }
          e[2] && t.ops.pop(), t.trys.pop();
          continue;
      }
      n = o.call(l, t);
    } catch (s) {
      n = [6, s], i = 0;
    } finally {
      u = e = 0;
    }
    if (n[0] & 5) throw n[1];
    return { value: n[0] ? n[1] : void 0, done: true };
  }
}, p = 600 * 1e3, b = { web: "/passport/token/beat/web/", infoV2: "/passport/account/info/v2/", logout: "/passport/web/logout/" }, O = /* @__PURE__ */ (function() {
  function l(o) {
    var t = this;
    this.beatTimes = p, this.checkLogin = function() {
      return v(t, void 0, void 0, function() {
        var r = this, a;
        return g(this, function(n) {
          return [2, (a = this.accountSDK) === null || a === void 0 ? void 0 : a.request({ url: b.infoV2 }).then(function(s) {
            return setTimeout(function() {
              r.start();
            }, 3e3), s;
          })];
        });
      });
    }, this.logout = function(r) {
      return v(t, void 0, void 0, function() {
        var a;
        return g(this, function(n) {
          return this.stop(), [2, (a = this.accountSDK) === null || a === void 0 ? void 0 : a.request({ url: b.logout, params: h(h({}, r || {}), { need_redirect: 0 }) })];
        });
      });
    }, this.start = function() {
      t.startBeating("boot");
      try {
        window.addEventListener("click", t.throttleOnDrop), window.addEventListener("scroll", t.throttleOnDrop), window.addEventListener("mousemove", t.throttleOnDrop), window.addEventListener("beforeunload", function() {
          t.stop();
        });
      } catch (r) {
        console.error("[beat error]", r);
      }
    }, this.stop = function() {
      t.timer && clearInterval(t.timer), t.beating && (t.beating = false, t.setOperationFlag(false));
    }, this.startBeating = function(r) {
      if (r === void 0 && (r = "polling"), t.beating) return null;
      t.timer && t.stop(), t.beating = true, t.tokenBeat(r);
      var a = setInterval(function() {
        var n = t.getOperationFlag();
        n ? (t.setOperationFlag(false), t.tokenBeat("polling")) : t.stop();
      }, t.beatTimes);
      t.setTimer(a);
    }, this.setTimer = function(r) {
      t.timer && clearInterval(t.timer), t.timer = r;
    }, this.tokenBeat = function(r) {
      return r === void 0 && (r = "boot"), v(t, void 0, void 0, function() {
        var a, n, s, f;
        return g(this, function(d) {
          switch (d.label) {
            case 0:
              return d.trys.push([0, 2, , 3]), [4, (s = this.accountSDK) === null || s === void 0 ? void 0 : s.request({ url: b.web, params: { scene: r } })];
            case 1:
              return d.sent(), [3, 3];
            case 2:
              if (a = d.sent(), n = (a || {}).error_code, n === 401) {
                try {
                  window.removeEventListener("click", this.throttleOnDrop), window.removeEventListener("scroll", this.throttleOnDrop), window.removeEventListener("mousemove", this.throttleOnDrop);
                } catch (w) {
                  console.error("[beat error]", w);
                }
                this.stop(), (f = this.logoutCallBack) === null || f === void 0 || f.call(this);
              }
              return console.log("[error tokenBeat]", a), [3, 3];
            case 3:
              return [2];
          }
        });
      });
    }, this.throttleOnDrop = y(function() {
      t.onAction();
    }), this.onAction = function() {
      t.beating ? t.setOperationFlag(true) : t.startBeating("active");
    }, this.setOperationFlag = function(r) {
      localStorage.setItem("".concat(window.location.origin, "-operation"), String(r));
    }, this.getOperationFlag = function() {
      return localStorage.getItem("".concat(window.location.origin, "-operation")) === "true";
    };
    var u = o || {}, i = u.beatTimes, e = u.requestConfig, c = u.logoutCallBack;
    this.beatTimes = i || p, this.initProps = o, this.beating = false, this.timer = null, this.logoutCallBack = c, this.accountSDK = new _(h(h({}, e || {}), { aid: this.initProps.aid, generalParams: h({ version: k }, e?.generalParams || {}) }));
  }
  return l;
})(), m = function() {
  return m = Object.assign || function(l) {
    for (var o, t = 1, u = arguments.length; t < u; t++) {
      o = arguments[t];
      for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (l[i] = o[i]);
    }
    return l;
  }, m.apply(this, arguments);
}, S = function(l) {
  var o = new O(m({}, l));
  return o.start(), o.stop;
};
export { S as initTokenBeat };
