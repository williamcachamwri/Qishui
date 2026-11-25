// packages/renderers/main/src/libs/secSdkCrypto.ts
// @ts-nocheck
const __vite__mapDeps = (i, m2 = __vite__mapDeps, d = m2.f || (m2.f = ["./jsrsasign", "../main", "./main-P_TudPKB.css", "./elliptic", "../services/renderer", "../services/base", "./renderer-Lr-ngj_D.css"])) => i.map((i2) => d[i2]);
import { _ as b } from "../main";
import { c as g, a as m, h as _, b as E, d as w } from "../services/renderer";
import "../services/base";
var T = function(f, o, r, n) {
  function t(e) {
    return e instanceof r ? e : new r(function(a) {
      a(e);
    });
  }
  return new (r || (r = Promise))(function(e, a) {
    function u(c) {
      try {
        i(n.next(c));
      } catch (l) {
        a(l);
      }
    }
    function s(c) {
      try {
        i(n.throw(c));
      } catch (l) {
        a(l);
      }
    }
    function i(c) {
      c.done ? e(c.value) : t(c.value).then(u, s);
    }
    i((n = n.apply(f, o || [])).next());
  });
}, p = function(f, o) {
  var r = { label: 0, sent: function() {
    if (e[0] & 1) throw e[1];
    return e[1];
  }, trys: [], ops: [] }, n, t, e, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(i) {
    return function(c) {
      return s([i, c]);
    };
  }
  function s(i) {
    if (n) throw new TypeError("Generator is already executing.");
    for (; r; ) try {
      if (n = 1, t && (e = i[0] & 2 ? t.return : i[0] ? t.throw || ((e = t.return) && e.call(t), 0) : t.next) && !(e = e.call(t, i[1])).done) return e;
      switch (t = 0, e && (i = [i[0] & 2, e.value]), i[0]) {
        case 0:
        case 1:
          e = i;
          break;
        case 4:
          return r.label++, { value: i[1], done: false };
        case 5:
          r.label++, t = i[1], i = [0];
          continue;
        case 7:
          i = r.ops.pop(), r.trys.pop();
          continue;
        default:
          if (e = r.trys, !(e = e.length > 0 && e[e.length - 1]) && (i[0] === 6 || i[0] === 2)) {
            r = 0;
            continue;
          }
          if (i[0] === 3 && (!e || i[1] > e[0] && i[1] < e[3])) {
            r.label = i[1];
            break;
          }
          if (i[0] === 6 && r.label < e[1]) {
            r.label = e[1], e = i;
            break;
          }
          if (e && r.label < e[2]) {
            r.label = e[2], r.ops.push(i);
            break;
          }
          e[2] && r.ops.pop(), r.trys.pop();
          continue;
      }
      i = o.call(f, r);
    } catch (c) {
      i = [6, c], t = 0;
    } finally {
      n = e = 0;
    }
    if (i[0] & 5) throw i[1];
    return { value: i[0] ? i[1] : void 0, done: true };
  }
}, H = function(f, o) {
  var r = typeof Symbol == "function" && f[Symbol.iterator];
  if (!r) return f;
  var n = r.call(f), t, e = [], a;
  try {
    for (; (o === void 0 || o-- > 0) && !(t = n.next()).done; ) e.push(t.value);
  } catch (u) {
    a = { error: u };
  } finally {
    try {
      t && !t.done && (r = n.return) && r.call(n);
    } finally {
      if (a) throw a.error;
    }
  }
  return e;
}, C = /* @__PURE__ */ (function() {
  function f() {
    var o = this;
    this.generateNewKeyPairPEM = function() {
      return o.loadPeerDeps().then(function(r) {
        var n = r.ZTJssign, t = n.KEYUTIL.generateKeypair("EC", "secp256r1"), e = t.pubKeyObj, a = t.prvKeyObj, u = n.KEYUTIL.getPEM(e), s = n.KEYUTIL.getPEM(a, "PKCS8PRV");
        return { publicPem: u, privatePem: s };
      });
    }, this.signWithECDSA = function(r, n) {
      return o.loadPeerDeps().then(function(t) {
        var e = t.ZTJssign, a = e.KEYUTIL.getKey(r || ""), u = new e.KJUR.crypto.Signature({ alg: "SHA256withECDSA" });
        u.init(a);
        var s = u.signString(n);
        return { hex: s, buffer: g(s) };
      });
    }, this.deriveEcdhKey = function(r, n) {
      return T(o, void 0, void 0, function() {
        var t = this;
        return p(this, function(e) {
          return [2, this.loadPeerDeps().then(function(a) {
            var u = a.ZTEC, s = a.ZTJssign;
            return T(t, void 0, void 0, function() {
              var i, c, l, K, P, x, v, y, h;
              return p(this, function(d) {
                switch (d.label) {
                  case 0:
                    return [4, this.getEcdhPublicKeyFromCert(n)];
                  case 1:
                    return i = d.sent(), c = new u.ec("p256"), l = (h = s.KEYUTIL.getKey(r)) === null || h === void 0 ? void 0 : h.prvKeyHex, K = c.keyFromPrivate(l, "hex").derive(c.keyFromPublic(i, "hex").getPublic()), P = K.toArray("be", 32), x = new Uint8Array(P), [4, _(new Uint8Array(), x, new Uint8Array(), 32)];
                  case 2:
                    return v = d.sent(), y = m(v), [2, { bytes: v, hex: y, buffer: g(y) }];
                }
              });
            });
          })];
        });
      });
    }, this.extractPublicKeyFromPrivateKey = function(r) {
      var n = {};
      return o.loadPeerDeps().then(function(t) {
        var e = t.ZTJssign;
        if (n[r]) return n[r];
        var a = e.KEYUTIL.getKey(r), u = a.generatePublicKeyHex(), s = { hex: u, rawHex: u, buffer: g(u) };
        return n[r] = s, s;
      });
    }, this.verifyWithECDSA = function(r, n, t) {
      return o.loadPeerDeps().then(function(e) {
        e.ZTEC;
        var a = e.ZTJssign, u = a.KEYUTIL.getKey(r || ""), s = new a.KJUR.crypto.Signature({ alg: "SHA256withECDSA" });
        s.init(u), s.updateString(t);
        var i = s.verify(E(n));
        return i;
      });
    }, this.extractPrivateKeyHexFromPem = function(r) {
      return o.loadPeerDeps().then(function(n) {
        var t = n.ZTJssign, e = t.KEYUTIL.getKey(r).prvKeyHex;
        return { privateKeyHex: e, privateKeyPKCSHex: "" };
      });
    }, this.extractPublicKeyHexFromPem = function(r) {
      return o.loadPeerDeps().then(function(n) {
        var t = n.ZTJssign, e = t.KEYUTIL.getKey(r), a = e.getPublicKeyXYHex();
        return { hex: "04".concat(a.x).concat(a.y), rawHex: "04".concat(a.x).concat(a.y) };
      });
    }, this.extractPublicKeyFromX509Cert = function(r) {
      return o.loadPeerDeps().then(function(n) {
        var t = n.ZTJssign, e = t.KEYUTIL.getKey(r), a = t.KEYUTIL.getPEM(e), u = t.pemtohex(a);
        return w(u);
      });
    }, this.loadPeerDeps = function() {
      return Promise.all([b(() => import("./jsrsasign").then((r) => r.j), __vite__mapDeps([0, 1, 2]), import.meta.url), b(() => import("./elliptic").then((r) => r.e), __vite__mapDeps([3, 1, 2]), import.meta.url), b(() => import("../services/renderer").then((r) => r.s), __vite__mapDeps([4, 1, 2, 5, 6]), import.meta.url)]).then(function(r) {
        var n = H(r, 3), t = n[0], e = n[1];
        return n[2], { ZTJssign: t.default, ZTEC: e.default };
      });
    }, this.getEcdhPublicKeyFromCert = function(r) {
      return o.loadPeerDeps().then(function(n) {
        var t = n.ZTJssign, e = new t.X509();
        e.readCertPEM(r);
        var a = e.getPublicKey().getPublicKeyXYHex(), u = "02".concat(a.x);
        return u;
      });
    };
  }
  return f;
})();
export { C as FallbackCryptoAPIProvider };
