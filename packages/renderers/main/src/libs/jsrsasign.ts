// packages/renderers/main/src/libs/jsrsasign.ts
// @ts-nocheck
import { g as Jn } from "../main";
function $n(De, Ie) {
  for (var L = 0; L < Ie.length; L++) {
    const ye = Ie[L];
    if (typeof ye != "string" && !Array.isArray(ye)) {
      for (const Re in ye) if (Re !== "default" && !(Re in De)) {
        const ge = Object.getOwnPropertyDescriptor(ye, Re);
        ge && Object.defineProperty(De, Re, ge.get ? ge : { enumerable: true, get: () => ye[Re] });
      }
    }
  }
  return Object.freeze(Object.defineProperty(De, Symbol.toStringTag, { value: "Module" }));
}
var V = {}, Yt;
function Yn() {
  if (Yt) return V;
  Yt = 1;
  var De = {};
  De.userAgent = false;
  var Ie = {};
  var L = L || (function(e, t) {
    var r = {}, i = r.lib = {}, s = i.Base = /* @__PURE__ */ (function() {
      function o() {
      }
      return { extend: function(c) {
        o.prototype = this;
        var f = new o();
        return c && f.mixIn(c), f.hasOwnProperty("init") || (f.init = function() {
          f.$super.init.apply(this, arguments);
        }), f.init.prototype = f, f.$super = this, f;
      }, create: function() {
        var c = this.extend();
        return c.init.apply(c, arguments), c;
      }, init: function() {
      }, mixIn: function(c) {
        for (var f in c) c.hasOwnProperty(f) && (this[f] = c[f]);
        c.hasOwnProperty("toString") && (this.toString = c.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } };
    })(), n = i.WordArray = s.extend({ init: function(o, c) {
      o = this.words = o || [], c != t ? this.sigBytes = c : this.sigBytes = o.length * 4;
    }, toString: function(o) {
      return (o || u).stringify(this);
    }, concat: function(o) {
      var c = this.words, f = o.words, g = this.sigBytes, v = o.sigBytes;
      if (this.clamp(), g % 4) for (var x = 0; x < v; x++) {
        var b = f[x >>> 2] >>> 24 - x % 4 * 8 & 255;
        c[g + x >>> 2] |= b << 24 - (g + x) % 4 * 8;
      }
      else for (var x = 0; x < v; x += 4) c[g + x >>> 2] = f[x >>> 2];
      return this.sigBytes += v, this;
    }, clamp: function() {
      var o = this.words, c = this.sigBytes;
      o[c >>> 2] &= 4294967295 << 32 - c % 4 * 8, o.length = e.ceil(c / 4);
    }, clone: function() {
      var o = s.clone.call(this);
      return o.words = this.words.slice(0), o;
    }, random: function(o) {
      for (var c = [], f = 0; f < o; f += 4) c.push(e.random() * 4294967296 | 0);
      return new n.init(c, o);
    } }), h = r.enc = {}, u = h.Hex = { stringify: function(o) {
      for (var c = o.words, f = o.sigBytes, g = [], v = 0; v < f; v++) {
        var x = c[v >>> 2] >>> 24 - v % 4 * 8 & 255;
        g.push((x >>> 4).toString(16)), g.push((x & 15).toString(16));
      }
      return g.join("");
    }, parse: function(o) {
      for (var c = o.length, f = [], g = 0; g < c; g += 2) f[g >>> 3] |= parseInt(o.substr(g, 2), 16) << 24 - g % 8 * 4;
      return new n.init(f, c / 2);
    } }, d = h.Latin1 = { stringify: function(o) {
      for (var c = o.words, f = o.sigBytes, g = [], v = 0; v < f; v++) {
        var x = c[v >>> 2] >>> 24 - v % 4 * 8 & 255;
        g.push(String.fromCharCode(x));
      }
      return g.join("");
    }, parse: function(o) {
      for (var c = o.length, f = [], g = 0; g < c; g++) f[g >>> 2] |= (o.charCodeAt(g) & 255) << 24 - g % 4 * 8;
      return new n.init(f, c);
    } }, l = h.Utf8 = { stringify: function(o) {
      try {
        return decodeURIComponent(escape(d.stringify(o)));
      } catch {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(o) {
      return d.parse(unescape(encodeURIComponent(o)));
    } }, y = i.BufferedBlockAlgorithm = s.extend({ reset: function() {
      this._data = new n.init(), this._nDataBytes = 0;
    }, _append: function(o) {
      typeof o == "string" && (o = l.parse(o)), this._data.concat(o), this._nDataBytes += o.sigBytes;
    }, _process: function(o) {
      var c = this._data, f = c.words, g = c.sigBytes, v = this.blockSize, x = v * 4, b = g / x;
      o ? b = e.ceil(b) : b = e.max((b | 0) - this._minBufferSize, 0);
      var I = b * v, A = e.min(I * 4, g);
      if (I) {
        for (var m = 0; m < I; m += v) this._doProcessBlock(f, m);
        var E = f.splice(0, I);
        c.sigBytes -= A;
      }
      return new n.init(E, A);
    }, clone: function() {
      var o = s.clone.call(this);
      return o._data = this._data.clone(), o;
    }, _minBufferSize: 0 });
    i.Hasher = y.extend({ cfg: s.extend(), init: function(o) {
      this.cfg = this.cfg.extend(o), this.reset();
    }, reset: function() {
      y.reset.call(this), this._doReset();
    }, update: function(o) {
      return this._append(o), this._process(), this;
    }, finalize: function(o) {
      o && this._append(o);
      var c = this._doFinalize();
      return c;
    }, blockSize: 512 / 32, _createHelper: function(o) {
      return function(c, f) {
        return new o.init(f).finalize(c);
      };
    }, _createHmacHelper: function(o) {
      return function(c, f) {
        return new p.HMAC.init(o, f).finalize(c);
      };
    } });
    var p = r.algo = {};
    return r;
  })(Math);
  (function(e) {
    var s = L, t = s.lib, r = t.Base, i = t.WordArray, s = s.x64 = {};
    s.Word = r.extend({ init: function(n, h) {
      this.high = n, this.low = h;
    } }), s.WordArray = r.extend({ init: function(n, h) {
      n = this.words = n || [], this.sigBytes = h != e ? h : 8 * n.length;
    }, toX32: function() {
      for (var n = this.words, h = n.length, u = [], d = 0; d < h; d++) {
        var l = n[d];
        u.push(l.high), u.push(l.low);
      }
      return i.create(u, this.sigBytes);
    }, clone: function() {
      for (var n = r.clone.call(this), h = n.words = this.words.slice(0), u = h.length, d = 0; d < u; d++) h[d] = h[d].clone();
      return n;
    } });
  })(), L.lib.Cipher || (function(e) {
    var c = L, t = c.lib, r = t.Base, i = t.WordArray, s = t.BufferedBlockAlgorithm, n = c.enc.Base64, h = c.algo.EvpKDF, u = t.Cipher = s.extend({ cfg: r.extend(), createEncryptor: function(g, v) {
      return this.create(this._ENC_XFORM_MODE, g, v);
    }, createDecryptor: function(g, v) {
      return this.create(this._DEC_XFORM_MODE, g, v);
    }, init: function(g, v, x) {
      this.cfg = this.cfg.extend(x), this._xformMode = g, this._key = v, this.reset();
    }, reset: function() {
      s.reset.call(this), this._doReset();
    }, process: function(g) {
      return this._append(g), this._process();
    }, finalize: function(g) {
      return g && this._append(g), this._doFinalize();
    }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function(g) {
      return { encrypt: function(v, x, b) {
        return (typeof x == "string" ? f : o).encrypt(g, v, x, b);
      }, decrypt: function(v, x, b) {
        return (typeof x == "string" ? f : o).decrypt(g, v, x, b);
      } };
    } });
    t.StreamCipher = u.extend({ _doFinalize: function() {
      return this._process(true);
    }, blockSize: 1 });
    var p = c.mode = {}, d = function(g, v, x) {
      var b = this._iv;
      b ? this._iv = e : b = this._prevBlock;
      for (var I = 0; I < x; I++) g[v + I] ^= b[I];
    }, l = (t.BlockCipherMode = r.extend({ createEncryptor: function(g, v) {
      return this.Encryptor.create(g, v);
    }, createDecryptor: function(g, v) {
      return this.Decryptor.create(g, v);
    }, init: function(g, v) {
      this._cipher = g, this._iv = v;
    } })).extend();
    l.Encryptor = l.extend({ processBlock: function(g, v) {
      var x = this._cipher, b = x.blockSize;
      d.call(this, g, v, b), x.encryptBlock(g, v), this._prevBlock = g.slice(v, v + b);
    } }), l.Decryptor = l.extend({ processBlock: function(g, v) {
      var x = this._cipher, b = x.blockSize, I = g.slice(v, v + b);
      x.decryptBlock(g, v), d.call(this, g, v, b), this._prevBlock = I;
    } }), p = p.CBC = l, l = (c.pad = {}).Pkcs7 = { pad: function(g, v) {
      for (var x = 4 * v, x = x - g.sigBytes % x, b = x << 24 | x << 16 | x << 8 | x, I = [], A = 0; A < x; A += 4) I.push(b);
      x = i.create(I, x), g.concat(x);
    }, unpad: function(g) {
      g.sigBytes -= g.words[g.sigBytes - 1 >>> 2] & 255;
    } }, t.BlockCipher = u.extend({ cfg: u.cfg.extend({ mode: p, padding: l }), reset: function() {
      u.reset.call(this);
      var v = this.cfg, g = v.iv, v = v.mode;
      if (this._xformMode == this._ENC_XFORM_MODE) var x = v.createEncryptor;
      else x = v.createDecryptor, this._minBufferSize = 1;
      this._mode = x.call(v, this, g && g.words);
    }, _doProcessBlock: function(g, v) {
      this._mode.processBlock(g, v);
    }, _doFinalize: function() {
      var g = this.cfg.padding;
      if (this._xformMode == this._ENC_XFORM_MODE) {
        g.pad(this._data, this.blockSize);
        var v = this._process(true);
      } else v = this._process(true), g.unpad(v);
      return v;
    }, blockSize: 4 });
    var y = t.CipherParams = r.extend({ init: function(g) {
      this.mixIn(g);
    }, toString: function(g) {
      return (g || this.formatter).stringify(this);
    } }), p = (c.format = {}).OpenSSL = { stringify: function(g) {
      var v = g.ciphertext;
      return g = g.salt, (g ? i.create([1398893684, 1701076831]).concat(g).concat(v) : v).toString(n);
    }, parse: function(g) {
      g = n.parse(g);
      var v = g.words;
      if (v[0] == 1398893684 && v[1] == 1701076831) {
        var x = i.create(v.slice(2, 4));
        v.splice(0, 4), g.sigBytes -= 16;
      }
      return y.create({ ciphertext: g, salt: x });
    } }, o = t.SerializableCipher = r.extend({ cfg: r.extend({ format: p }), encrypt: function(g, v, x, b) {
      b = this.cfg.extend(b);
      var I = g.createEncryptor(x, b);
      return v = I.finalize(v), I = I.cfg, y.create({ ciphertext: v, key: x, iv: I.iv, algorithm: g, mode: I.mode, padding: I.padding, blockSize: g.blockSize, formatter: b.format });
    }, decrypt: function(g, v, x, b) {
      return b = this.cfg.extend(b), v = this._parse(v, b.format), g.createDecryptor(x, b).finalize(v.ciphertext);
    }, _parse: function(g, v) {
      return typeof g == "string" ? v.parse(g, this) : g;
    } }), c = (c.kdf = {}).OpenSSL = { execute: function(g, v, x, b) {
      return b || (b = i.random(8)), g = h.create({ keySize: v + x }).compute(g, b), x = i.create(g.words.slice(v), 4 * x), g.sigBytes = 4 * v, y.create({ key: g, iv: x, salt: b });
    } }, f = t.PasswordBasedCipher = o.extend({ cfg: o.cfg.extend({ kdf: c }), encrypt: function(g, v, x, b) {
      return b = this.cfg.extend(b), x = b.kdf.execute(x, g.keySize, g.ivSize), b.iv = x.iv, g = o.encrypt.call(this, g, v, x.key, b), g.mixIn(x), g;
    }, decrypt: function(g, v, x, b) {
      return b = this.cfg.extend(b), v = this._parse(v, b.format), x = b.kdf.execute(x, g.keySize, g.ivSize, v.salt), b.iv = x.iv, o.decrypt.call(this, g, v, x.key, b);
    } });
  })(), (function() {
    for (var e = L, t = e.lib.BlockCipher, E = e.algo, r = [], i = [], s = [], n = [], h = [], u = [], d = [], l = [], y = [], p = [], o = [], c = 0; 256 > c; c++) o[c] = 128 > c ? c << 1 : c << 1 ^ 283;
    for (var f = 0, g = 0, c = 0; 256 > c; c++) {
      var v = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4, v = v >>> 8 ^ v & 255 ^ 99;
      r[f] = v, i[v] = f;
      var x = o[f], b = o[x], I = o[b], A = 257 * o[v] ^ 16843008 * v;
      s[f] = A << 24 | A >>> 8, n[f] = A << 16 | A >>> 16, h[f] = A << 8 | A >>> 24, u[f] = A, A = 16843009 * I ^ 65537 * b ^ 257 * x ^ 16843008 * f, d[v] = A << 24 | A >>> 8, l[v] = A << 16 | A >>> 16, y[v] = A << 8 | A >>> 24, p[v] = A, f ? (f = x ^ o[o[o[I ^ x]]], g ^= o[o[g]]) : f = g = 1;
    }
    var m = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], E = E.AES = t.extend({ _doReset: function() {
      for (var S = this._key, F = S.words, w = S.sigBytes / 4, S = 4 * ((this._nRounds = w + 6) + 1), D = this._keySchedule = [], R = 0; R < S; R++) if (R < w) D[R] = F[R];
      else {
        var T = D[R - 1];
        R % w ? 6 < w && R % w == 4 && (T = r[T >>> 24] << 24 | r[T >>> 16 & 255] << 16 | r[T >>> 8 & 255] << 8 | r[T & 255]) : (T = T << 8 | T >>> 24, T = r[T >>> 24] << 24 | r[T >>> 16 & 255] << 16 | r[T >>> 8 & 255] << 8 | r[T & 255], T ^= m[R / w | 0] << 24), D[R] = D[R - w] ^ T;
      }
      for (F = this._invKeySchedule = [], w = 0; w < S; w++) R = S - w, T = w % 4 ? D[R] : D[R - 4], F[w] = 4 > w || 4 >= R ? T : d[r[T >>> 24]] ^ l[r[T >>> 16 & 255]] ^ y[r[T >>> 8 & 255]] ^ p[r[T & 255]];
    }, encryptBlock: function(F, w) {
      this._doCryptBlock(F, w, this._keySchedule, s, n, h, u, r);
    }, decryptBlock: function(F, w) {
      var S = F[w + 1];
      F[w + 1] = F[w + 3], F[w + 3] = S, this._doCryptBlock(F, w, this._invKeySchedule, d, l, y, p, i), S = F[w + 1], F[w + 1] = F[w + 3], F[w + 3] = S;
    }, _doCryptBlock: function(F, w, S, D, R, T, K, P) {
      for (var H = this._nRounds, $ = F[w] ^ S[0], G = F[w + 1] ^ S[1], J = F[w + 2] ^ S[2], te = F[w + 3] ^ S[3], B = 4, O = 1; O < H; O++) var ee = D[$ >>> 24] ^ R[G >>> 16 & 255] ^ T[J >>> 8 & 255] ^ K[te & 255] ^ S[B++], X = D[G >>> 24] ^ R[J >>> 16 & 255] ^ T[te >>> 8 & 255] ^ K[$ & 255] ^ S[B++], Q = D[J >>> 24] ^ R[te >>> 16 & 255] ^ T[$ >>> 8 & 255] ^ K[G & 255] ^ S[B++], te = D[te >>> 24] ^ R[$ >>> 16 & 255] ^ T[G >>> 8 & 255] ^ K[J & 255] ^ S[B++], $ = ee, G = X, J = Q;
      ee = (P[$ >>> 24] << 24 | P[G >>> 16 & 255] << 16 | P[J >>> 8 & 255] << 8 | P[te & 255]) ^ S[B++], X = (P[G >>> 24] << 24 | P[J >>> 16 & 255] << 16 | P[te >>> 8 & 255] << 8 | P[$ & 255]) ^ S[B++], Q = (P[J >>> 24] << 24 | P[te >>> 16 & 255] << 16 | P[$ >>> 8 & 255] << 8 | P[G & 255]) ^ S[B++], te = (P[te >>> 24] << 24 | P[$ >>> 16 & 255] << 16 | P[G >>> 8 & 255] << 8 | P[J & 255]) ^ S[B++], F[w] = ee, F[w + 1] = X, F[w + 2] = Q, F[w + 3] = te;
    }, keySize: 8 });
    e.AES = t._createHelper(E);
  })(), (function() {
    function e(o, c) {
      var f = (this._lBlock >>> o ^ this._rBlock) & c;
      this._rBlock ^= f, this._lBlock ^= f << o;
    }
    function t(o, c) {
      var f = (this._rBlock >>> o ^ this._lBlock) & c;
      this._lBlock ^= f, this._rBlock ^= f << o;
    }
    var r = L, s = r.lib, i = s.WordArray, s = s.BlockCipher, n = r.algo, h = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], u = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32], d = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], l = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }], y = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679], p = n.DES = s.extend({ _doReset: function() {
      for (var o = this._key.words, c = [], f = 0; 56 > f; f++) {
        var g = h[f] - 1;
        c[f] = o[g >>> 5] >>> 31 - g % 32 & 1;
      }
      for (o = this._subKeys = [], g = 0; 16 > g; g++) {
        for (var v = o[g] = [], x = d[g], f = 0; 24 > f; f++) v[f / 6 | 0] |= c[(u[f] - 1 + x) % 28] << 31 - f % 6, v[4 + (f / 6 | 0)] |= c[28 + (u[f + 24] - 1 + x) % 28] << 31 - f % 6;
        for (v[0] = v[0] << 1 | v[0] >>> 31, f = 1; 7 > f; f++) v[f] >>>= 4 * (f - 1) + 3;
        v[7] = v[7] << 5 | v[7] >>> 27;
      }
      for (c = this._invSubKeys = [], f = 0; 16 > f; f++) c[f] = o[15 - f];
    }, encryptBlock: function(o, c) {
      this._doCryptBlock(o, c, this._subKeys);
    }, decryptBlock: function(o, c) {
      this._doCryptBlock(o, c, this._invSubKeys);
    }, _doCryptBlock: function(o, c, f) {
      this._lBlock = o[c], this._rBlock = o[c + 1], e.call(this, 4, 252645135), e.call(this, 16, 65535), t.call(this, 2, 858993459), t.call(this, 8, 16711935), e.call(this, 1, 1431655765);
      for (var g = 0; 16 > g; g++) {
        for (var v = f[g], x = this._lBlock, b = this._rBlock, I = 0, A = 0; 8 > A; A++) I |= l[A][((b ^ v[A]) & y[A]) >>> 0];
        this._lBlock = b, this._rBlock = x ^ I;
      }
      f = this._lBlock, this._lBlock = this._rBlock, this._rBlock = f, e.call(this, 1, 1431655765), t.call(this, 8, 16711935), t.call(this, 2, 858993459), e.call(this, 16, 65535), e.call(this, 4, 252645135), o[c] = this._lBlock, o[c + 1] = this._rBlock;
    }, keySize: 2, ivSize: 2, blockSize: 2 });
    r.DES = s._createHelper(p), n = n.TripleDES = s.extend({ _doReset: function() {
      var o = this._key.words;
      this._des1 = p.createEncryptor(i.create(o.slice(0, 2))), this._des2 = p.createEncryptor(i.create(o.slice(2, 4))), this._des3 = p.createEncryptor(i.create(o.slice(4, 6)));
    }, encryptBlock: function(o, c) {
      this._des1.encryptBlock(o, c), this._des2.decryptBlock(o, c), this._des3.encryptBlock(o, c);
    }, decryptBlock: function(o, c) {
      this._des3.decryptBlock(o, c), this._des2.encryptBlock(o, c), this._des1.decryptBlock(o, c);
    }, keySize: 6, ivSize: 2, blockSize: 2 }), r.TripleDES = s._createHelper(n);
  })(), (function() {
    var e = L, t = e.lib.WordArray;
    e.enc.Base64 = { stringify: function(r) {
      var i = r.words, s = r.sigBytes, n = this._map;
      r.clamp(), r = [];
      for (var h = 0; h < s; h += 3) for (var u = (i[h >>> 2] >>> 24 - 8 * (h % 4) & 255) << 16 | (i[h + 1 >>> 2] >>> 24 - 8 * ((h + 1) % 4) & 255) << 8 | i[h + 2 >>> 2] >>> 24 - 8 * ((h + 2) % 4) & 255, d = 0; 4 > d && h + 0.75 * d < s; d++) r.push(n.charAt(u >>> 6 * (3 - d) & 63));
      if (i = n.charAt(64)) for (; r.length % 4; ) r.push(i);
      return r.join("");
    }, parse: function(r) {
      var i = r.length, s = this._map, n = s.charAt(64);
      n && (n = r.indexOf(n), n != -1 && (i = n));
      for (var n = [], h = 0, u = 0; u < i; u++) if (u % 4) {
        var d = s.indexOf(r.charAt(u - 1)) << 2 * (u % 4), l = s.indexOf(r.charAt(u)) >>> 6 - 2 * (u % 4);
        n[h >>> 2] |= (d | l) << 24 - 8 * (h % 4), h++;
      }
      return t.create(n, h);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
  })(), (function(e) {
    function t(p, o, c, f, g, v, x) {
      return p = p + (o & c | ~o & f) + g + x, (p << v | p >>> 32 - v) + o;
    }
    function r(p, o, c, f, g, v, x) {
      return p = p + (o & f | c & ~f) + g + x, (p << v | p >>> 32 - v) + o;
    }
    function i(p, o, c, f, g, v, x) {
      return p = p + (o ^ c ^ f) + g + x, (p << v | p >>> 32 - v) + o;
    }
    function s(p, o, c, f, g, v, x) {
      return p = p + (c ^ (o | ~f)) + g + x, (p << v | p >>> 32 - v) + o;
    }
    for (var n = L, d = n.lib, h = d.WordArray, u = d.Hasher, d = n.algo, l = [], y = 0; 64 > y; y++) l[y] = 4294967296 * e.abs(e.sin(y + 1)) | 0;
    d = d.MD5 = u.extend({ _doReset: function() {
      this._hash = new h.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(p, o) {
      for (var c = 0; 16 > c; c++) {
        var f = o + c, g = p[f];
        p[f] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
      }
      var c = this._hash.words, f = p[o + 0], g = p[o + 1], v = p[o + 2], x = p[o + 3], b = p[o + 4], I = p[o + 5], A = p[o + 6], m = p[o + 7], E = p[o + 8], F = p[o + 9], w = p[o + 10], S = p[o + 11], D = p[o + 12], R = p[o + 13], T = p[o + 14], K = p[o + 15], P = c[0], O = c[1], B = c[2], H = c[3], P = t(P, O, B, H, f, 7, l[0]), H = t(H, P, O, B, g, 12, l[1]), B = t(B, H, P, O, v, 17, l[2]), O = t(O, B, H, P, x, 22, l[3]), P = t(P, O, B, H, b, 7, l[4]), H = t(H, P, O, B, I, 12, l[5]), B = t(B, H, P, O, A, 17, l[6]), O = t(O, B, H, P, m, 22, l[7]), P = t(P, O, B, H, E, 7, l[8]), H = t(H, P, O, B, F, 12, l[9]), B = t(B, H, P, O, w, 17, l[10]), O = t(O, B, H, P, S, 22, l[11]), P = t(P, O, B, H, D, 7, l[12]), H = t(H, P, O, B, R, 12, l[13]), B = t(B, H, P, O, T, 17, l[14]), O = t(O, B, H, P, K, 22, l[15]), P = r(P, O, B, H, g, 5, l[16]), H = r(H, P, O, B, A, 9, l[17]), B = r(B, H, P, O, S, 14, l[18]), O = r(O, B, H, P, f, 20, l[19]), P = r(P, O, B, H, I, 5, l[20]), H = r(H, P, O, B, w, 9, l[21]), B = r(B, H, P, O, K, 14, l[22]), O = r(O, B, H, P, b, 20, l[23]), P = r(P, O, B, H, F, 5, l[24]), H = r(H, P, O, B, T, 9, l[25]), B = r(B, H, P, O, x, 14, l[26]), O = r(O, B, H, P, E, 20, l[27]), P = r(P, O, B, H, R, 5, l[28]), H = r(H, P, O, B, v, 9, l[29]), B = r(B, H, P, O, m, 14, l[30]), O = r(O, B, H, P, D, 20, l[31]), P = i(P, O, B, H, I, 4, l[32]), H = i(H, P, O, B, E, 11, l[33]), B = i(B, H, P, O, S, 16, l[34]), O = i(O, B, H, P, T, 23, l[35]), P = i(P, O, B, H, g, 4, l[36]), H = i(H, P, O, B, b, 11, l[37]), B = i(B, H, P, O, m, 16, l[38]), O = i(O, B, H, P, w, 23, l[39]), P = i(P, O, B, H, R, 4, l[40]), H = i(H, P, O, B, f, 11, l[41]), B = i(B, H, P, O, x, 16, l[42]), O = i(O, B, H, P, A, 23, l[43]), P = i(P, O, B, H, F, 4, l[44]), H = i(H, P, O, B, D, 11, l[45]), B = i(B, H, P, O, K, 16, l[46]), O = i(O, B, H, P, v, 23, l[47]), P = s(P, O, B, H, f, 6, l[48]), H = s(H, P, O, B, m, 10, l[49]), B = s(B, H, P, O, T, 15, l[50]), O = s(O, B, H, P, I, 21, l[51]), P = s(P, O, B, H, D, 6, l[52]), H = s(H, P, O, B, x, 10, l[53]), B = s(B, H, P, O, w, 15, l[54]), O = s(O, B, H, P, g, 21, l[55]), P = s(P, O, B, H, E, 6, l[56]), H = s(H, P, O, B, K, 10, l[57]), B = s(B, H, P, O, A, 15, l[58]), O = s(O, B, H, P, R, 21, l[59]), P = s(P, O, B, H, b, 6, l[60]), H = s(H, P, O, B, S, 10, l[61]), B = s(B, H, P, O, v, 15, l[62]), O = s(O, B, H, P, F, 21, l[63]);
      c[0] = c[0] + P | 0, c[1] = c[1] + O | 0, c[2] = c[2] + B | 0, c[3] = c[3] + H | 0;
    }, _doFinalize: function() {
      var p = this._data, o = p.words, c = 8 * this._nDataBytes, f = 8 * p.sigBytes;
      o[f >>> 5] |= 128 << 24 - f % 32;
      var g = e.floor(c / 4294967296);
      for (o[(f + 64 >>> 9 << 4) + 15] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360, o[(f + 64 >>> 9 << 4) + 14] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360, p.sigBytes = 4 * (o.length + 1), this._process(), p = this._hash, o = p.words, c = 0; 4 > c; c++) f = o[c], o[c] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
      return p;
    }, clone: function() {
      var p = u.clone.call(this);
      return p._hash = this._hash.clone(), p;
    } }), n.MD5 = u._createHelper(d), n.HmacMD5 = u._createHmacHelper(d);
  })(Math), (function() {
    var e = L, s = e.lib, t = s.WordArray, r = s.Hasher, i = [], s = e.algo.SHA1 = r.extend({ _doReset: function() {
      this._hash = new t.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
    }, _doProcessBlock: function(n, h) {
      for (var u = this._hash.words, d = u[0], l = u[1], y = u[2], p = u[3], o = u[4], c = 0; 80 > c; c++) {
        if (16 > c) i[c] = n[h + c] | 0;
        else {
          var f = i[c - 3] ^ i[c - 8] ^ i[c - 14] ^ i[c - 16];
          i[c] = f << 1 | f >>> 31;
        }
        f = (d << 5 | d >>> 27) + o + i[c], f = 20 > c ? f + ((l & y | ~l & p) + 1518500249) : 40 > c ? f + ((l ^ y ^ p) + 1859775393) : 60 > c ? f + ((l & y | l & p | y & p) - 1894007588) : f + ((l ^ y ^ p) - 899497514), o = p, p = y, y = l << 30 | l >>> 2, l = d, d = f;
      }
      u[0] = u[0] + d | 0, u[1] = u[1] + l | 0, u[2] = u[2] + y | 0, u[3] = u[3] + p | 0, u[4] = u[4] + o | 0;
    }, _doFinalize: function() {
      var n = this._data, h = n.words, u = 8 * this._nDataBytes, d = 8 * n.sigBytes;
      return h[d >>> 5] |= 128 << 24 - d % 32, h[(d + 64 >>> 9 << 4) + 14] = Math.floor(u / 4294967296), h[(d + 64 >>> 9 << 4) + 15] = u, n.sigBytes = 4 * h.length, this._process(), this._hash;
    }, clone: function() {
      var n = r.clone.call(this);
      return n._hash = this._hash.clone(), n;
    } });
    e.SHA1 = r._createHelper(s), e.HmacSHA1 = r._createHmacHelper(s);
  })(), (function(e) {
    for (var t = L, c = t.lib, r = c.WordArray, i = c.Hasher, c = t.algo, s = [], n = [], h = function(g) {
      return 4294967296 * (g - (g | 0)) | 0;
    }, u = 2, d = 0; 64 > d; ) {
      var l;
      e: {
        l = u;
        for (var y = e.sqrt(l), p = 2; p <= y; p++) if (!(l % p)) {
          l = false;
          break e;
        }
        l = true;
      }
      l && (8 > d && (s[d] = h(e.pow(u, 0.5))), n[d] = h(e.pow(u, 1 / 3)), d++), u++;
    }
    var o = [], c = c.SHA256 = i.extend({ _doReset: function() {
      this._hash = new r.init(s.slice(0));
    }, _doProcessBlock: function(f, g) {
      for (var v = this._hash.words, x = v[0], b = v[1], I = v[2], A = v[3], m = v[4], E = v[5], F = v[6], w = v[7], S = 0; 64 > S; S++) {
        if (16 > S) o[S] = f[g + S] | 0;
        else {
          var D = o[S - 15], R = o[S - 2];
          o[S] = ((D << 25 | D >>> 7) ^ (D << 14 | D >>> 18) ^ D >>> 3) + o[S - 7] + ((R << 15 | R >>> 17) ^ (R << 13 | R >>> 19) ^ R >>> 10) + o[S - 16];
        }
        D = w + ((m << 26 | m >>> 6) ^ (m << 21 | m >>> 11) ^ (m << 7 | m >>> 25)) + (m & E ^ ~m & F) + n[S] + o[S], R = ((x << 30 | x >>> 2) ^ (x << 19 | x >>> 13) ^ (x << 10 | x >>> 22)) + (x & b ^ x & I ^ b & I), w = F, F = E, E = m, m = A + D | 0, A = I, I = b, b = x, x = D + R | 0;
      }
      v[0] = v[0] + x | 0, v[1] = v[1] + b | 0, v[2] = v[2] + I | 0, v[3] = v[3] + A | 0, v[4] = v[4] + m | 0, v[5] = v[5] + E | 0, v[6] = v[6] + F | 0, v[7] = v[7] + w | 0;
    }, _doFinalize: function() {
      var f = this._data, g = f.words, v = 8 * this._nDataBytes, x = 8 * f.sigBytes;
      return g[x >>> 5] |= 128 << 24 - x % 32, g[(x + 64 >>> 9 << 4) + 14] = e.floor(v / 4294967296), g[(x + 64 >>> 9 << 4) + 15] = v, f.sigBytes = 4 * g.length, this._process(), this._hash;
    }, clone: function() {
      var f = i.clone.call(this);
      return f._hash = this._hash.clone(), f;
    } });
    t.SHA256 = i._createHelper(c), t.HmacSHA256 = i._createHmacHelper(c);
  })(Math), (function() {
    var e = L, t = e.lib.WordArray, i = e.algo, r = i.SHA256, i = i.SHA224 = r.extend({ _doReset: function() {
      this._hash = new t.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
    }, _doFinalize: function() {
      var s = r._doFinalize.call(this);
      return s.sigBytes -= 4, s;
    } });
    e.SHA224 = r._createHelper(i), e.HmacSHA224 = r._createHmacHelper(i);
  })(), (function() {
    function e() {
      return i.create.apply(i, arguments);
    }
    for (var t = L, r = t.lib.Hasher, n = t.x64, i = n.Word, s = n.WordArray, n = t.algo, h = [e(1116352408, 3609767458), e(1899447441, 602891725), e(3049323471, 3964484399), e(3921009573, 2173295548), e(961987163, 4081628472), e(1508970993, 3053834265), e(2453635748, 2937671579), e(2870763221, 3664609560), e(3624381080, 2734883394), e(310598401, 1164996542), e(607225278, 1323610764), e(1426881987, 3590304994), e(1925078388, 4068182383), e(2162078206, 991336113), e(2614888103, 633803317), e(3248222580, 3479774868), e(3835390401, 2666613458), e(4022224774, 944711139), e(264347078, 2341262773), e(604807628, 2007800933), e(770255983, 1495990901), e(1249150122, 1856431235), e(1555081692, 3175218132), e(1996064986, 2198950837), e(2554220882, 3999719339), e(2821834349, 766784016), e(2952996808, 2566594879), e(3210313671, 3203337956), e(3336571891, 1034457026), e(3584528711, 2466948901), e(113926993, 3758326383), e(338241895, 168717936), e(666307205, 1188179964), e(773529912, 1546045734), e(1294757372, 1522805485), e(1396182291, 2643833823), e(1695183700, 2343527390), e(1986661051, 1014477480), e(2177026350, 1206759142), e(2456956037, 344077627), e(2730485921, 1290863460), e(2820302411, 3158454273), e(3259730800, 3505952657), e(3345764771, 106217008), e(3516065817, 3606008344), e(3600352804, 1432725776), e(4094571909, 1467031594), e(275423344, 851169720), e(430227734, 3100823752), e(506948616, 1363258195), e(659060556, 3750685593), e(883997877, 3785050280), e(958139571, 3318307427), e(1322822218, 3812723403), e(1537002063, 2003034995), e(1747873779, 3602036899), e(1955562222, 1575990012), e(2024104815, 1125592928), e(2227730452, 2716904306), e(2361852424, 442776044), e(2428436474, 593698344), e(2756734187, 3733110249), e(3204031479, 2999351573), e(3329325298, 3815920427), e(3391569614, 3928383900), e(3515267271, 566280711), e(3940187606, 3454069534), e(4118630271, 4000239992), e(116418474, 1914138554), e(174292421, 2731055270), e(289380356, 3203993006), e(460393269, 320620315), e(685471733, 587496836), e(852142971, 1086792851), e(1017036298, 365543100), e(1126000580, 2618297676), e(1288033470, 3409855158), e(1501505948, 4234509866), e(1607167915, 987167468), e(1816402316, 1246189591)], u = [], d = 0; 80 > d; d++) u[d] = e();
    n = n.SHA512 = r.extend({ _doReset: function() {
      this._hash = new s.init([new i.init(1779033703, 4089235720), new i.init(3144134277, 2227873595), new i.init(1013904242, 4271175723), new i.init(2773480762, 1595750129), new i.init(1359893119, 2917565137), new i.init(2600822924, 725511199), new i.init(528734635, 4215389547), new i.init(1541459225, 327033209)]);
    }, _doProcessBlock: function(l, y) {
      for (var b = this._hash.words, p = b[0], o = b[1], c = b[2], f = b[3], g = b[4], v = b[5], x = b[6], b = b[7], I = p.high, A = p.low, m = o.high, E = o.low, F = c.high, w = c.low, S = f.high, D = f.low, R = g.high, T = g.low, K = v.high, P = v.low, H = x.high, B = x.low, O = b.high, ee = b.low, X = I, Q = A, te = m, $ = E, G = F, J = w, re = S, ne = D, he = R, le = T, ot = K, ze = P, ut = H, We = B, wt = O, Xe = ee, Fe = 0; 80 > Fe; Fe++) {
        var Oe = u[Fe];
        if (16 > Fe) var Se = Oe.high = l[y + 2 * Fe] | 0, z = Oe.low = l[y + 2 * Fe + 1] | 0;
        else {
          var Se = u[Fe - 15], z = Se.high, be = Se.low, Se = (z >>> 1 | be << 31) ^ (z >>> 8 | be << 24) ^ z >>> 7, be = (be >>> 1 | z << 31) ^ (be >>> 8 | z << 24) ^ (be >>> 7 | z << 25), Le = u[Fe - 2], z = Le.high, Z = Le.low, Le = (z >>> 19 | Z << 13) ^ (z << 3 | Z >>> 29) ^ z >>> 6, Z = (Z >>> 19 | z << 13) ^ (Z << 3 | z >>> 29) ^ (Z >>> 6 | z << 26), z = u[Fe - 7], Et = z.high, He = u[Fe - 16], Ae = He.high, He = He.low, z = be + z.low, Se = Se + Et + (z >>> 0 < be >>> 0 ? 1 : 0), z = z + Z, Se = Se + Le + (z >>> 0 < Z >>> 0 ? 1 : 0), z = z + He, Se = Se + Ae + (z >>> 0 < He >>> 0 ? 1 : 0);
          Oe.high = Se, Oe.low = z;
        }
        var Et = he & ot ^ ~he & ut, He = le & ze ^ ~le & We, Oe = X & te ^ X & G ^ te & G, Wn = Q & $ ^ Q & J ^ $ & J, be = (X >>> 28 | Q << 4) ^ (X << 30 | Q >>> 2) ^ (X << 25 | Q >>> 7), Le = (Q >>> 28 | X << 4) ^ (Q << 30 | X >>> 2) ^ (Q << 25 | X >>> 7), Z = h[Fe], Xn = Z.high, $t = Z.low, Z = Xe + ((le >>> 14 | he << 18) ^ (le >>> 18 | he << 14) ^ (le << 23 | he >>> 9)), Ae = wt + ((he >>> 14 | le << 18) ^ (he >>> 18 | le << 14) ^ (he << 23 | le >>> 9)) + (Z >>> 0 < Xe >>> 0 ? 1 : 0), Z = Z + He, Ae = Ae + Et + (Z >>> 0 < He >>> 0 ? 1 : 0), Z = Z + $t, Ae = Ae + Xn + (Z >>> 0 < $t >>> 0 ? 1 : 0), Z = Z + z, Ae = Ae + Se + (Z >>> 0 < z >>> 0 ? 1 : 0), z = Le + Wn, Oe = be + Oe + (z >>> 0 < Le >>> 0 ? 1 : 0), wt = ut, Xe = We, ut = ot, We = ze, ot = he, ze = le, le = ne + Z | 0, he = re + Ae + (le >>> 0 < ne >>> 0 ? 1 : 0) | 0, re = G, ne = J, G = te, J = $, te = X, $ = Q, Q = Z + z | 0, X = Ae + Oe + (Q >>> 0 < Z >>> 0 ? 1 : 0) | 0;
      }
      A = p.low = A + Q, p.high = I + X + (A >>> 0 < Q >>> 0 ? 1 : 0), E = o.low = E + $, o.high = m + te + (E >>> 0 < $ >>> 0 ? 1 : 0), w = c.low = w + J, c.high = F + G + (w >>> 0 < J >>> 0 ? 1 : 0), D = f.low = D + ne, f.high = S + re + (D >>> 0 < ne >>> 0 ? 1 : 0), T = g.low = T + le, g.high = R + he + (T >>> 0 < le >>> 0 ? 1 : 0), P = v.low = P + ze, v.high = K + ot + (P >>> 0 < ze >>> 0 ? 1 : 0), B = x.low = B + We, x.high = H + ut + (B >>> 0 < We >>> 0 ? 1 : 0), ee = b.low = ee + Xe, b.high = O + wt + (ee >>> 0 < Xe >>> 0 ? 1 : 0);
    }, _doFinalize: function() {
      var l = this._data, y = l.words, p = 8 * this._nDataBytes, o = 8 * l.sigBytes;
      return y[o >>> 5] |= 128 << 24 - o % 32, y[(o + 128 >>> 10 << 5) + 30] = Math.floor(p / 4294967296), y[(o + 128 >>> 10 << 5) + 31] = p, l.sigBytes = 4 * y.length, this._process(), this._hash.toX32();
    }, clone: function() {
      var l = r.clone.call(this);
      return l._hash = this._hash.clone(), l;
    }, blockSize: 32 }), t.SHA512 = r._createHelper(n), t.HmacSHA512 = r._createHmacHelper(n);
  })(), (function() {
    var e = L, s = e.x64, t = s.Word, r = s.WordArray, s = e.algo, i = s.SHA512, s = s.SHA384 = i.extend({ _doReset: function() {
      this._hash = new r.init([new t.init(3418070365, 3238371032), new t.init(1654270250, 914150663), new t.init(2438529370, 812702999), new t.init(355462360, 4144912697), new t.init(1731405415, 4290775857), new t.init(2394180231, 1750603025), new t.init(3675008525, 1694076839), new t.init(1203062813, 3204075428)]);
    }, _doFinalize: function() {
      var n = i._doFinalize.call(this);
      return n.sigBytes -= 16, n;
    } });
    e.SHA384 = i._createHelper(s), e.HmacSHA384 = i._createHmacHelper(s);
  })(), (function() {
    var e = L, l = e.lib, t = l.WordArray, r = l.Hasher, l = e.algo, i = t.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]), s = t.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]), n = t.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]), h = t.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]), u = t.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), d = t.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), l = l.RIPEMD160 = r.extend({ _doReset: function() {
      this._hash = t.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
    }, _doProcessBlock: function(y, p) {
      for (var o = 0; 16 > o; o++) {
        var c = p + o, f = y[c];
        y[c] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
      }
      var c = this._hash.words, f = u.words, g = d.words, v = i.words, x = s.words, b = n.words, I = h.words, A, m, E, F, w, S, D, R, T, K;
      S = A = c[0], D = m = c[1], R = E = c[2], T = F = c[3], K = w = c[4];
      for (var P, o = 0; 80 > o; o += 1) P = A + y[p + v[o]] | 0, P = 16 > o ? P + ((m ^ E ^ F) + f[0]) : 32 > o ? P + ((m & E | ~m & F) + f[1]) : 48 > o ? P + (((m | ~E) ^ F) + f[2]) : 64 > o ? P + ((m & F | E & ~F) + f[3]) : P + ((m ^ (E | ~F)) + f[4]), P |= 0, P = P << b[o] | P >>> 32 - b[o], P = P + w | 0, A = w, w = F, F = E << 10 | E >>> 22, E = m, m = P, P = S + y[p + x[o]] | 0, P = 16 > o ? P + ((D ^ (R | ~T)) + g[0]) : 32 > o ? P + ((D & T | R & ~T) + g[1]) : 48 > o ? P + (((D | ~R) ^ T) + g[2]) : 64 > o ? P + ((D & R | ~D & T) + g[3]) : P + ((D ^ R ^ T) + g[4]), P |= 0, P = P << I[o] | P >>> 32 - I[o], P = P + K | 0, S = K, K = T, T = R << 10 | R >>> 22, R = D, D = P;
      P = c[1] + E + T | 0, c[1] = c[2] + F + K | 0, c[2] = c[3] + w + S | 0, c[3] = c[4] + A + D | 0, c[4] = c[0] + m + R | 0, c[0] = P;
    }, _doFinalize: function() {
      var y = this._data, p = y.words, o = 8 * this._nDataBytes, c = 8 * y.sigBytes;
      for (p[c >>> 5] |= 128 << 24 - c % 32, p[(c + 64 >>> 9 << 4) + 14] = (o << 8 | o >>> 24) & 16711935 | (o << 24 | o >>> 8) & 4278255360, y.sigBytes = 4 * (p.length + 1), this._process(), y = this._hash, p = y.words, o = 0; 5 > o; o++) c = p[o], p[o] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
      return y;
    }, clone: function() {
      var y = r.clone.call(this);
      return y._hash = this._hash.clone(), y;
    } });
    e.RIPEMD160 = r._createHelper(l), e.HmacRIPEMD160 = r._createHmacHelper(l);
  })(), (function() {
    var e = L, t = e.enc.Utf8;
    e.algo.HMAC = e.lib.Base.extend({ init: function(r, i) {
      r = this._hasher = new r.init(), typeof i == "string" && (i = t.parse(i));
      var s = r.blockSize, n = 4 * s;
      i.sigBytes > n && (i = r.finalize(i)), i.clamp();
      for (var h = this._oKey = i.clone(), u = this._iKey = i.clone(), d = h.words, l = u.words, y = 0; y < s; y++) d[y] ^= 1549556828, l[y] ^= 909522486;
      h.sigBytes = u.sigBytes = n, this.reset();
    }, reset: function() {
      var r = this._hasher;
      r.reset(), r.update(this._iKey);
    }, update: function(r) {
      return this._hasher.update(r), this;
    }, finalize: function(r) {
      var i = this._hasher;
      return r = i.finalize(r), i.reset(), i.finalize(this._oKey.clone().concat(r));
    } });
  })(), (function() {
    var e = L, i = e.lib, t = i.Base, r = i.WordArray, i = e.algo, s = i.HMAC, n = i.PBKDF2 = t.extend({ cfg: t.extend({ keySize: 4, hasher: i.SHA1, iterations: 1 }), init: function(h) {
      this.cfg = this.cfg.extend(h);
    }, compute: function(h, u) {
      for (var f = this.cfg, d = s.create(f.hasher, h), l = r.create(), y = r.create([1]), p = l.words, o = y.words, c = f.keySize, f = f.iterations; p.length < c; ) {
        var g = d.update(u).finalize(y);
        d.reset();
        for (var v = g.words, x = v.length, b = g, I = 1; I < f; I++) {
          b = d.finalize(b), d.reset();
          for (var A = b.words, m = 0; m < x; m++) v[m] ^= A[m];
        }
        l.concat(g), o[0]++;
      }
      return l.sigBytes = 4 * c, l;
    } });
    e.PBKDF2 = function(h, u, d) {
      return n.create(d).compute(h, u);
    };
  })();
  var ye = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Re = "=";
  function ge(e) {
    var t, r, i = "";
    for (t = 0; t + 3 <= e.length; t += 3) r = parseInt(e.substring(t, t + 3), 16), i += ye.charAt(r >> 6) + ye.charAt(r & 63);
    for (t + 1 == e.length ? (r = parseInt(e.substring(t, t + 1), 16), i += ye.charAt(r << 2)) : t + 2 == e.length && (r = parseInt(e.substring(t, t + 2), 16), i += ye.charAt(r >> 2) + ye.charAt((r & 3) << 4)); (i.length & 3) > 0; ) i += Re;
    return i;
  }
  function Ke(e) {
    var t = "", r, i = 0, s, n;
    for (r = 0; r < e.length && e.charAt(r) != Re; ++r) n = ye.indexOf(e.charAt(r)), !(n < 0) && (i == 0 ? (t += Ce(n >> 2), s = n & 3, i = 1) : i == 1 ? (t += Ce(s << 2 | n >> 4), s = n & 15, i = 2) : i == 2 ? (t += Ce(s), t += Ce(n >> 2), s = n & 3, i = 3) : (t += Ce(s << 2 | n >> 4), t += Ce(n & 15), i = 0));
    return i == 1 && (t += Ce(s << 2)), t;
  }
  function Ft(e) {
    var t = Ke(e), r, i = new Array();
    for (r = 0; 2 * r < t.length; ++r) i[r] = parseInt(t.substring(2 * r, 2 * r + 2), 16);
    return i;
  }
  var Te;
  function C(e, t, r) {
    e != null && (typeof e == "number" ? this.fromNumber(e, t, r) : t == null && typeof e != "string" ? this.fromString(e, 256) : this.fromString(e, t));
  }
  function M() {
    return new C(null);
  }
  function Qt(e, t, r, i, s, n) {
    for (; --n >= 0; ) {
      var h = t * this[e++] + r[i] + s;
      s = Math.floor(h / 67108864), r[i++] = h & 67108863;
    }
    return s;
  }
  function er(e, t, r, i, s, n) {
    for (var h = t & 32767, u = t >> 15; --n >= 0; ) {
      var d = this[e] & 32767, l = this[e++] >> 15, y = u * d + l * h;
      d = h * d + ((y & 32767) << 15) + r[i] + (s & 1073741823), s = (d >>> 30) + (y >>> 15) + u * l + (s >>> 30), r[i++] = d & 1073741823;
    }
    return s;
  }
  function tr(e, t, r, i, s, n) {
    for (var h = t & 16383, u = t >> 14; --n >= 0; ) {
      var d = this[e] & 16383, l = this[e++] >> 14, y = u * d + l * h;
      d = h * d + ((y & 16383) << 14) + r[i] + s, s = (d >> 28) + (y >> 14) + u * l, r[i++] = d & 268435455;
    }
    return s;
  }
  De.appName == "Microsoft Internet Explorer" ? (C.prototype.am = er, Te = 30) : De.appName != "Netscape" ? (C.prototype.am = Qt, Te = 26) : (C.prototype.am = tr, Te = 28), C.prototype.DB = Te, C.prototype.DM = (1 << Te) - 1, C.prototype.DV = 1 << Te;
  var ht = 52;
  C.prototype.FV = Math.pow(2, ht), C.prototype.F1 = ht - Te, C.prototype.F2 = 2 * Te - ht;
  var rr = "0123456789abcdefghijklmnopqrstuvwxyz", Je = new Array(), qe, me;
  for (qe = 48, me = 0; me <= 9; ++me) Je[qe++] = me;
  for (qe = 97, me = 10; me < 36; ++me) Je[qe++] = me;
  for (qe = 65, me = 10; me < 36; ++me) Je[qe++] = me;
  function Ce(e) {
    return rr.charAt(e);
  }
  function bt(e, t) {
    var r = Je[e.charCodeAt(t)];
    return r ?? -1;
  }
  function ir(e) {
    for (var t = this.t - 1; t >= 0; --t) e[t] = this[t];
    e.t = this.t, e.s = this.s;
  }
  function nr(e) {
    this.t = 1, this.s = e < 0 ? -1 : 0, e > 0 ? this[0] = e : e < -1 ? this[0] = e + this.DV : this.t = 0;
  }
  function Be(e) {
    var t = M();
    return t.fromInt(e), t;
  }
  function sr(e, t) {
    var r;
    if (t == 16) r = 4;
    else if (t == 8) r = 3;
    else if (t == 256) r = 8;
    else if (t == 2) r = 1;
    else if (t == 32) r = 5;
    else if (t == 4) r = 2;
    else {
      this.fromRadix(e, t);
      return;
    }
    this.t = 0, this.s = 0;
    for (var i = e.length, s = false, n = 0; --i >= 0; ) {
      var h = r == 8 ? e[i] & 255 : bt(e, i);
      if (h < 0) {
        e.charAt(i) == "-" && (s = true);
        continue;
      }
      s = false, n == 0 ? this[this.t++] = h : n + r > this.DB ? (this[this.t - 1] |= (h & (1 << this.DB - n) - 1) << n, this[this.t++] = h >> this.DB - n) : this[this.t - 1] |= h << n, n += r, n >= this.DB && (n -= this.DB);
    }
    r == 8 && (e[0] & 128) != 0 && (this.s = -1, n > 0 && (this[this.t - 1] |= (1 << this.DB - n) - 1 << n)), this.clamp(), s && C.ZERO.subTo(this, this);
  }
  function ar() {
    for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e; ) --this.t;
  }
  function or(e) {
    if (this.s < 0) return "-" + this.negate().toString(e);
    var t;
    if (e == 16) t = 4;
    else if (e == 8) t = 3;
    else if (e == 2) t = 1;
    else if (e == 32) t = 5;
    else if (e == 4) t = 2;
    else return this.toRadix(e);
    var r = (1 << t) - 1, i, s = false, n = "", h = this.t, u = this.DB - h * this.DB % t;
    if (h-- > 0) for (u < this.DB && (i = this[h] >> u) > 0 && (s = true, n = Ce(i)); h >= 0; ) u < t ? (i = (this[h] & (1 << u) - 1) << t - u, i |= this[--h] >> (u += this.DB - t)) : (i = this[h] >> (u -= t) & r, u <= 0 && (u += this.DB, --h)), i > 0 && (s = true), s && (n += Ce(i));
    return s ? n : "0";
  }
  function ur() {
    var e = M();
    return C.ZERO.subTo(this, e), e;
  }
  function hr() {
    return this.s < 0 ? this.negate() : this;
  }
  function fr(e) {
    var t = this.s - e.s;
    if (t != 0) return t;
    var r = this.t;
    if (t = r - e.t, t != 0) return this.s < 0 ? -t : t;
    for (; --r >= 0; ) if ((t = this[r] - e[r]) != 0) return t;
    return 0;
  }
  function $e(e) {
    var t = 1, r;
    return (r = e >>> 16) != 0 && (e = r, t += 16), (r = e >> 8) != 0 && (e = r, t += 8), (r = e >> 4) != 0 && (e = r, t += 4), (r = e >> 2) != 0 && (e = r, t += 2), (r = e >> 1) != 0 && (e = r, t += 1), t;
  }
  function cr() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + $e(this[this.t - 1] ^ this.s & this.DM);
  }
  function lr(e, t) {
    var r;
    for (r = this.t - 1; r >= 0; --r) t[r + e] = this[r];
    for (r = e - 1; r >= 0; --r) t[r] = 0;
    t.t = this.t + e, t.s = this.s;
  }
  function dr(e, t) {
    for (var r = e; r < this.t; ++r) t[r - e] = this[r];
    t.t = Math.max(this.t - e, 0), t.s = this.s;
  }
  function pr(e, t) {
    var r = e % this.DB, i = this.DB - r, s = (1 << i) - 1, n = Math.floor(e / this.DB), h = this.s << r & this.DM, u;
    for (u = this.t - 1; u >= 0; --u) t[u + n + 1] = this[u] >> i | h, h = (this[u] & s) << r;
    for (u = n - 1; u >= 0; --u) t[u] = 0;
    t[n] = h, t.t = this.t + n + 1, t.s = this.s, t.clamp();
  }
  function gr(e, t) {
    t.s = this.s;
    var r = Math.floor(e / this.DB);
    if (r >= this.t) {
      t.t = 0;
      return;
    }
    var i = e % this.DB, s = this.DB - i, n = (1 << i) - 1;
    t[0] = this[r] >> i;
    for (var h = r + 1; h < this.t; ++h) t[h - r - 1] |= (this[h] & n) << s, t[h - r] = this[h] >> i;
    i > 0 && (t[this.t - r - 1] |= (this.s & n) << s), t.t = this.t - r, t.clamp();
  }
  function vr(e, t) {
    for (var r = 0, i = 0, s = Math.min(e.t, this.t); r < s; ) i += this[r] - e[r], t[r++] = i & this.DM, i >>= this.DB;
    if (e.t < this.t) {
      for (i -= e.s; r < this.t; ) i += this[r], t[r++] = i & this.DM, i >>= this.DB;
      i += this.s;
    } else {
      for (i += this.s; r < e.t; ) i -= e[r], t[r++] = i & this.DM, i >>= this.DB;
      i -= e.s;
    }
    t.s = i < 0 ? -1 : 0, i < -1 ? t[r++] = this.DV + i : i > 0 && (t[r++] = i), t.t = r, t.clamp();
  }
  function yr(e, t) {
    var r = this.abs(), i = e.abs(), s = r.t;
    for (t.t = s + i.t; --s >= 0; ) t[s] = 0;
    for (s = 0; s < i.t; ++s) t[s + r.t] = r.am(0, i[s], t, s, 0, r.t);
    t.s = 0, t.clamp(), this.s != e.s && C.ZERO.subTo(t, t);
  }
  function mr(e) {
    for (var t = this.abs(), r = e.t = 2 * t.t; --r >= 0; ) e[r] = 0;
    for (r = 0; r < t.t - 1; ++r) {
      var i = t.am(r, t[r], e, 2 * r, 0, 1);
      (e[r + t.t] += t.am(r + 1, 2 * t[r], e, 2 * r + 1, i, t.t - r - 1)) >= t.DV && (e[r + t.t] -= t.DV, e[r + t.t + 1] = 1);
    }
    e.t > 0 && (e[e.t - 1] += t.am(r, t[r], e, 2 * r, 0, 1)), e.s = 0, e.clamp();
  }
  function xr(e, t, r) {
    var i = e.abs();
    if (!(i.t <= 0)) {
      var s = this.abs();
      if (s.t < i.t) {
        t?.fromInt(0), r != null && this.copyTo(r);
        return;
      }
      r == null && (r = M());
      var n = M(), h = this.s, u = e.s, d = this.DB - $e(i[i.t - 1]);
      d > 0 ? (i.lShiftTo(d, n), s.lShiftTo(d, r)) : (i.copyTo(n), s.copyTo(r));
      var l = n.t, y = n[l - 1];
      if (y != 0) {
        var p = y * (1 << this.F1) + (l > 1 ? n[l - 2] >> this.F2 : 0), o = this.FV / p, c = (1 << this.F1) / p, f = 1 << this.F2, g = r.t, v = g - l, x = t ?? M();
        for (n.dlShiftTo(v, x), r.compareTo(x) >= 0 && (r[r.t++] = 1, r.subTo(x, r)), C.ONE.dlShiftTo(l, x), x.subTo(n, n); n.t < l; ) n[n.t++] = 0;
        for (; --v >= 0; ) {
          var b = r[--g] == y ? this.DM : Math.floor(r[g] * o + (r[g - 1] + f) * c);
          if ((r[g] += n.am(0, b, r, v, 0, l)) < b) for (n.dlShiftTo(v, x), r.subTo(x, r); r[g] < --b; ) r.subTo(x, r);
        }
        t != null && (r.drShiftTo(l, t), h != u && C.ZERO.subTo(t, t)), r.t = l, r.clamp(), d > 0 && r.rShiftTo(d, r), h < 0 && C.ZERO.subTo(r, r);
      }
    }
  }
  function Sr(e) {
    var t = M();
    return this.abs().divRemTo(e, null, t), this.s < 0 && t.compareTo(C.ZERO) > 0 && e.subTo(t, t), t;
  }
  function je(e) {
    this.m = e;
  }
  function wr(e) {
    return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e;
  }
  function Er(e) {
    return e;
  }
  function Fr(e) {
    e.divRemTo(this.m, null, e);
  }
  function br(e, t, r) {
    e.multiplyTo(t, r), this.reduce(r);
  }
  function Ar(e, t) {
    e.squareTo(t), this.reduce(t);
  }
  je.prototype.convert = wr, je.prototype.revert = Er, je.prototype.reduce = Fr, je.prototype.mulTo = br, je.prototype.sqrTo = Ar;
  function Dr() {
    if (this.t < 1) return 0;
    var e = this[0];
    if ((e & 1) == 0) return 0;
    var t = e & 3;
    return t = t * (2 - (e & 15) * t) & 15, t = t * (2 - (e & 255) * t) & 255, t = t * (2 - ((e & 65535) * t & 65535)) & 65535, t = t * (2 - e * t % this.DV) % this.DV, t > 0 ? this.DV - t : -t;
  }
  function Ve(e) {
    this.m = e, this.mp = e.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << e.DB - 15) - 1, this.mt2 = 2 * e.t;
  }
  function Ir(e) {
    var t = M();
    return e.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), e.s < 0 && t.compareTo(C.ZERO) > 0 && this.m.subTo(t, t), t;
  }
  function Cr(e) {
    var t = M();
    return e.copyTo(t), this.reduce(t), t;
  }
  function Pr(e) {
    for (; e.t <= this.mt2; ) e[e.t++] = 0;
    for (var t = 0; t < this.m.t; ++t) {
      var r = e[t] & 32767, i = r * this.mpl + ((r * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
      for (r = t + this.m.t, e[r] += this.m.am(0, i, e, t, 0, this.m.t); e[r] >= e.DV; ) e[r] -= e.DV, e[++r]++;
    }
    e.clamp(), e.drShiftTo(this.m.t, e), e.compareTo(this.m) >= 0 && e.subTo(this.m, e);
  }
  function Rr(e, t) {
    e.squareTo(t), this.reduce(t);
  }
  function Tr(e, t, r) {
    e.multiplyTo(t, r), this.reduce(r);
  }
  Ve.prototype.convert = Ir, Ve.prototype.revert = Cr, Ve.prototype.reduce = Pr, Ve.prototype.mulTo = Tr, Ve.prototype.sqrTo = Rr;
  function Br() {
    return (this.t > 0 ? this[0] & 1 : this.s) == 0;
  }
  function Nr(e, t) {
    if (e > 4294967295 || e < 1) return C.ONE;
    var r = M(), i = M(), s = t.convert(this), n = $e(e) - 1;
    for (s.copyTo(r); --n >= 0; ) if (t.sqrTo(r, i), (e & 1 << n) > 0) t.mulTo(i, s, r);
    else {
      var h = r;
      r = i, i = h;
    }
    return t.revert(r);
  }
  function Hr(e, t) {
    var r;
    return e < 256 || t.isEven() ? r = new je(t) : r = new Ve(t), this.exp(e, r);
  }
  C.prototype.copyTo = ir, C.prototype.fromInt = nr, C.prototype.fromString = sr, C.prototype.clamp = ar, C.prototype.dlShiftTo = lr, C.prototype.drShiftTo = dr, C.prototype.lShiftTo = pr, C.prototype.rShiftTo = gr, C.prototype.subTo = vr, C.prototype.multiplyTo = yr, C.prototype.squareTo = mr, C.prototype.divRemTo = xr, C.prototype.invDigit = Dr, C.prototype.isEven = Br, C.prototype.exp = Nr, C.prototype.toString = or, C.prototype.negate = ur, C.prototype.abs = hr, C.prototype.compareTo = fr, C.prototype.bitLength = cr, C.prototype.mod = Sr, C.prototype.modPowInt = Hr, C.ZERO = Be(0), C.ONE = Be(1);
  function Or() {
    var e = M();
    return this.copyTo(e), e;
  }
  function jr() {
    if (this.s < 0) {
      if (this.t == 1) return this[0] - this.DV;
      if (this.t == 0) return -1;
    } else {
      if (this.t == 1) return this[0];
      if (this.t == 0) return 0;
    }
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
  }
  function Vr() {
    return this.t == 0 ? this.s : this[0] << 24 >> 24;
  }
  function Lr() {
    return this.t == 0 ? this.s : this[0] << 16 >> 16;
  }
  function Kr(e) {
    return Math.floor(Math.LN2 * this.DB / Math.log(e));
  }
  function qr() {
    return this.s < 0 ? -1 : this.t <= 0 || this.t == 1 && this[0] <= 0 ? 0 : 1;
  }
  function kr(e) {
    if (e == null && (e = 10), this.signum() == 0 || e < 2 || e > 36) return "0";
    var t = this.chunkSize(e), r = Math.pow(e, t), i = Be(r), s = M(), n = M(), h = "";
    for (this.divRemTo(i, s, n); s.signum() > 0; ) h = (r + n.intValue()).toString(e).substr(1) + h, s.divRemTo(i, s, n);
    return n.intValue().toString(e) + h;
  }
  function Mr(e, t) {
    this.fromInt(0), t == null && (t = 10);
    for (var r = this.chunkSize(t), i = Math.pow(t, r), s = false, n = 0, h = 0, u = 0; u < e.length; ++u) {
      var d = bt(e, u);
      if (d < 0) {
        e.charAt(u) == "-" && this.signum() == 0 && (s = true);
        continue;
      }
      h = t * h + d, ++n >= r && (this.dMultiply(i), this.dAddOffset(h, 0), n = 0, h = 0);
    }
    n > 0 && (this.dMultiply(Math.pow(t, n)), this.dAddOffset(h, 0)), s && C.ZERO.subTo(this, this);
  }
  function _r(e, t, r) {
    if (typeof t == "number") if (e < 2) this.fromInt(1);
    else for (this.fromNumber(e, r), this.testBit(e - 1) || this.bitwiseTo(C.ONE.shiftLeft(e - 1), ft, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t); ) this.dAddOffset(2, 0), this.bitLength() > e && this.subTo(C.ONE.shiftLeft(e - 1), this);
    else {
      var i = new Array(), s = e & 7;
      i.length = (e >> 3) + 1, t.nextBytes(i), s > 0 ? i[0] &= (1 << s) - 1 : i[0] = 0, this.fromString(i, 256);
    }
  }
  function Ur() {
    var e = this.t, t = new Array();
    t[0] = this.s;
    var r = this.DB - e * this.DB % 8, i, s = 0;
    if (e-- > 0) for (r < this.DB && (i = this[e] >> r) != (this.s & this.DM) >> r && (t[s++] = i | this.s << this.DB - r); e >= 0; ) r < 8 ? (i = (this[e] & (1 << r) - 1) << 8 - r, i |= this[--e] >> (r += this.DB - 8)) : (i = this[e] >> (r -= 8) & 255, r <= 0 && (r += this.DB, --e)), (i & 128) != 0 && (i |= -256), s == 0 && (this.s & 128) != (i & 128) && ++s, (s > 0 || i != this.s) && (t[s++] = i);
    return t;
  }
  function Gr(e) {
    return this.compareTo(e) == 0;
  }
  function zr(e) {
    return this.compareTo(e) < 0 ? this : e;
  }
  function Wr(e) {
    return this.compareTo(e) > 0 ? this : e;
  }
  function Xr(e, t, r) {
    var i, s, n = Math.min(e.t, this.t);
    for (i = 0; i < n; ++i) r[i] = t(this[i], e[i]);
    if (e.t < this.t) {
      for (s = e.s & this.DM, i = n; i < this.t; ++i) r[i] = t(this[i], s);
      r.t = this.t;
    } else {
      for (s = this.s & this.DM, i = n; i < e.t; ++i) r[i] = t(s, e[i]);
      r.t = e.t;
    }
    r.s = t(this.s, e.s), r.clamp();
  }
  function Jr(e, t) {
    return e & t;
  }
  function $r(e) {
    var t = M();
    return this.bitwiseTo(e, Jr, t), t;
  }
  function ft(e, t) {
    return e | t;
  }
  function Yr(e) {
    var t = M();
    return this.bitwiseTo(e, ft, t), t;
  }
  function At(e, t) {
    return e ^ t;
  }
  function Zr(e) {
    var t = M();
    return this.bitwiseTo(e, At, t), t;
  }
  function Dt(e, t) {
    return e & ~t;
  }
  function Qr(e) {
    var t = M();
    return this.bitwiseTo(e, Dt, t), t;
  }
  function ei() {
    for (var e = M(), t = 0; t < this.t; ++t) e[t] = this.DM & ~this[t];
    return e.t = this.t, e.s = ~this.s, e;
  }
  function ti(e) {
    var t = M();
    return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t), t;
  }
  function ri(e) {
    var t = M();
    return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t), t;
  }
  function ii(e) {
    if (e == 0) return -1;
    var t = 0;
    return (e & 65535) == 0 && (e >>= 16, t += 16), (e & 255) == 0 && (e >>= 8, t += 8), (e & 15) == 0 && (e >>= 4, t += 4), (e & 3) == 0 && (e >>= 2, t += 2), (e & 1) == 0 && ++t, t;
  }
  function ni() {
    for (var e = 0; e < this.t; ++e) if (this[e] != 0) return e * this.DB + ii(this[e]);
    return this.s < 0 ? this.t * this.DB : -1;
  }
  function si(e) {
    for (var t = 0; e != 0; ) e &= e - 1, ++t;
    return t;
  }
  function ai() {
    for (var e = 0, t = this.s & this.DM, r = 0; r < this.t; ++r) e += si(this[r] ^ t);
    return e;
  }
  function oi(e) {
    var t = Math.floor(e / this.DB);
    return t >= this.t ? this.s != 0 : (this[t] & 1 << e % this.DB) != 0;
  }
  function ui(e, t) {
    var r = C.ONE.shiftLeft(e);
    return this.bitwiseTo(r, t, r), r;
  }
  function hi(e) {
    return this.changeBit(e, ft);
  }
  function fi(e) {
    return this.changeBit(e, Dt);
  }
  function ci(e) {
    return this.changeBit(e, At);
  }
  function li(e, t) {
    for (var r = 0, i = 0, s = Math.min(e.t, this.t); r < s; ) i += this[r] + e[r], t[r++] = i & this.DM, i >>= this.DB;
    if (e.t < this.t) {
      for (i += e.s; r < this.t; ) i += this[r], t[r++] = i & this.DM, i >>= this.DB;
      i += this.s;
    } else {
      for (i += this.s; r < e.t; ) i += e[r], t[r++] = i & this.DM, i >>= this.DB;
      i += e.s;
    }
    t.s = i < 0 ? -1 : 0, i > 0 ? t[r++] = i : i < -1 && (t[r++] = this.DV + i), t.t = r, t.clamp();
  }
  function di(e) {
    var t = M();
    return this.addTo(e, t), t;
  }
  function pi(e) {
    var t = M();
    return this.subTo(e, t), t;
  }
  function gi(e) {
    var t = M();
    return this.multiplyTo(e, t), t;
  }
  function vi() {
    var e = M();
    return this.squareTo(e), e;
  }
  function yi(e) {
    var t = M();
    return this.divRemTo(e, t, null), t;
  }
  function mi(e) {
    var t = M();
    return this.divRemTo(e, null, t), t;
  }
  function xi(e) {
    var t = M(), r = M();
    return this.divRemTo(e, t, r), new Array(t, r);
  }
  function Si(e) {
    this[this.t] = this.am(0, e - 1, this, 0, 0, this.t), ++this.t, this.clamp();
  }
  function wi(e, t) {
    if (e != 0) {
      for (; this.t <= t; ) this[this.t++] = 0;
      for (this[t] += e; this[t] >= this.DV; ) this[t] -= this.DV, ++t >= this.t && (this[this.t++] = 0), ++this[t];
    }
  }
  function _e() {
  }
  function It(e) {
    return e;
  }
  function Ei(e, t, r) {
    e.multiplyTo(t, r);
  }
  function Fi(e, t) {
    e.squareTo(t);
  }
  _e.prototype.convert = It, _e.prototype.revert = It, _e.prototype.mulTo = Ei, _e.prototype.sqrTo = Fi;
  function bi(e) {
    return this.exp(e, new _e());
  }
  function Ai(e, t, r) {
    var i = Math.min(this.t + e.t, t);
    for (r.s = 0, r.t = i; i > 0; ) r[--i] = 0;
    var s;
    for (s = r.t - this.t; i < s; ++i) r[i + this.t] = this.am(0, e[i], r, i, 0, this.t);
    for (s = Math.min(e.t, t); i < s; ++i) this.am(0, e[i], r, i, 0, t - i);
    r.clamp();
  }
  function Di(e, t, r) {
    --t;
    var i = r.t = this.t + e.t - t;
    for (r.s = 0; --i >= 0; ) r[i] = 0;
    for (i = Math.max(t - this.t, 0); i < e.t; ++i) r[this.t + i - t] = this.am(t - i, e[i], r, 0, 0, this.t + i - t);
    r.clamp(), r.drShiftTo(1, r);
  }
  function ke(e) {
    this.r2 = M(), this.q3 = M(), C.ONE.dlShiftTo(2 * e.t, this.r2), this.mu = this.r2.divide(e), this.m = e;
  }
  function Ii(e) {
    if (e.s < 0 || e.t > 2 * this.m.t) return e.mod(this.m);
    if (e.compareTo(this.m) < 0) return e;
    var t = M();
    return e.copyTo(t), this.reduce(t), t;
  }
  function Ci(e) {
    return e;
  }
  function Pi(e) {
    for (e.drShiftTo(this.m.t - 1, this.r2), e.t > this.m.t + 1 && (e.t = this.m.t + 1, e.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0; ) e.dAddOffset(1, this.m.t + 1);
    for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0; ) e.subTo(this.m, e);
  }
  function Ri(e, t) {
    e.squareTo(t), this.reduce(t);
  }
  function Ti(e, t, r) {
    e.multiplyTo(t, r), this.reduce(r);
  }
  ke.prototype.convert = Ii, ke.prototype.revert = Ci, ke.prototype.reduce = Pi, ke.prototype.mulTo = Ti, ke.prototype.sqrTo = Ri;
  function Bi(e, t) {
    var r = e.bitLength(), i, s = Be(1), n;
    if (r <= 0) return s;
    r < 18 ? i = 1 : r < 48 ? i = 3 : r < 144 ? i = 4 : r < 768 ? i = 5 : i = 6, r < 8 ? n = new je(t) : t.isEven() ? n = new ke(t) : n = new Ve(t);
    var h = new Array(), u = 3, d = i - 1, l = (1 << i) - 1;
    if (h[1] = n.convert(this), i > 1) {
      var y = M();
      for (n.sqrTo(h[1], y); u <= l; ) h[u] = M(), n.mulTo(y, h[u - 2], h[u]), u += 2;
    }
    var p = e.t - 1, o, c = true, f = M(), g;
    for (r = $e(e[p]) - 1; p >= 0; ) {
      for (r >= d ? o = e[p] >> r - d & l : (o = (e[p] & (1 << r + 1) - 1) << d - r, p > 0 && (o |= e[p - 1] >> this.DB + r - d)), u = i; (o & 1) == 0; ) o >>= 1, --u;
      if ((r -= u) < 0 && (r += this.DB, --p), c) h[o].copyTo(s), c = false;
      else {
        for (; u > 1; ) n.sqrTo(s, f), n.sqrTo(f, s), u -= 2;
        u > 0 ? n.sqrTo(s, f) : (g = s, s = f, f = g), n.mulTo(f, h[o], s);
      }
      for (; p >= 0 && (e[p] & 1 << r) == 0; ) n.sqrTo(s, f), g = s, s = f, f = g, --r < 0 && (r = this.DB - 1, --p);
    }
    return n.revert(s);
  }
  function Ni(e) {
    var t = this.s < 0 ? this.negate() : this.clone(), r = e.s < 0 ? e.negate() : e.clone();
    if (t.compareTo(r) < 0) {
      var i = t;
      t = r, r = i;
    }
    var s = t.getLowestSetBit(), n = r.getLowestSetBit();
    if (n < 0) return t;
    for (s < n && (n = s), n > 0 && (t.rShiftTo(n, t), r.rShiftTo(n, r)); t.signum() > 0; ) (s = t.getLowestSetBit()) > 0 && t.rShiftTo(s, t), (s = r.getLowestSetBit()) > 0 && r.rShiftTo(s, r), t.compareTo(r) >= 0 ? (t.subTo(r, t), t.rShiftTo(1, t)) : (r.subTo(t, r), r.rShiftTo(1, r));
    return n > 0 && r.lShiftTo(n, r), r;
  }
  function Hi(e) {
    if (e <= 0) return 0;
    var t = this.DV % e, r = this.s < 0 ? e - 1 : 0;
    if (this.t > 0) if (t == 0) r = this[0] % e;
    else for (var i = this.t - 1; i >= 0; --i) r = (t * r + this[i]) % e;
    return r;
  }
  function Oi(e) {
    var t = e.isEven();
    if (this.isEven() && t || e.signum() == 0) return C.ZERO;
    for (var r = e.clone(), i = this.clone(), s = Be(1), n = Be(0), h = Be(0), u = Be(1); r.signum() != 0; ) {
      for (; r.isEven(); ) r.rShiftTo(1, r), t ? ((!s.isEven() || !n.isEven()) && (s.addTo(this, s), n.subTo(e, n)), s.rShiftTo(1, s)) : n.isEven() || n.subTo(e, n), n.rShiftTo(1, n);
      for (; i.isEven(); ) i.rShiftTo(1, i), t ? ((!h.isEven() || !u.isEven()) && (h.addTo(this, h), u.subTo(e, u)), h.rShiftTo(1, h)) : u.isEven() || u.subTo(e, u), u.rShiftTo(1, u);
      r.compareTo(i) >= 0 ? (r.subTo(i, r), t && s.subTo(h, s), n.subTo(u, n)) : (i.subTo(r, i), t && h.subTo(s, h), u.subTo(n, u));
    }
    if (i.compareTo(C.ONE) != 0) return C.ZERO;
    if (u.compareTo(e) >= 0) return u.subtract(e);
    if (u.signum() < 0) u.addTo(e, u);
    else return u;
    return u.signum() < 0 ? u.add(e) : u;
  }
  var de = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], ji = (1 << 26) / de[de.length - 1];
  function Vi(e) {
    var t, r = this.abs();
    if (r.t == 1 && r[0] <= de[de.length - 1]) {
      for (t = 0; t < de.length; ++t) if (r[0] == de[t]) return true;
      return false;
    }
    if (r.isEven()) return false;
    for (t = 1; t < de.length; ) {
      for (var i = de[t], s = t + 1; s < de.length && i < ji; ) i *= de[s++];
      for (i = r.modInt(i); t < s; ) if (i % de[t++] == 0) return false;
    }
    return r.millerRabin(e);
  }
  function Li(e) {
    var t = this.subtract(C.ONE), r = t.getLowestSetBit();
    if (r <= 0) return false;
    var i = t.shiftRight(r);
    e = e + 1 >> 1, e > de.length && (e = de.length);
    for (var s = M(), n = 0; n < e; ++n) {
      s.fromInt(de[Math.floor(Math.random() * de.length)]);
      var h = s.modPow(i, this);
      if (h.compareTo(C.ONE) != 0 && h.compareTo(t) != 0) {
        for (var u = 1; u++ < r && h.compareTo(t) != 0; ) if (h = h.modPowInt(2, this), h.compareTo(C.ONE) == 0) return false;
        if (h.compareTo(t) != 0) return false;
      }
    }
    return true;
  }
  C.prototype.chunkSize = Kr, C.prototype.toRadix = kr, C.prototype.fromRadix = Mr, C.prototype.fromNumber = _r, C.prototype.bitwiseTo = Xr, C.prototype.changeBit = ui, C.prototype.addTo = li, C.prototype.dMultiply = Si, C.prototype.dAddOffset = wi, C.prototype.multiplyLowerTo = Ai, C.prototype.multiplyUpperTo = Di, C.prototype.modInt = Hi, C.prototype.millerRabin = Li, C.prototype.clone = Or, C.prototype.intValue = jr, C.prototype.byteValue = Vr, C.prototype.shortValue = Lr, C.prototype.signum = qr, C.prototype.toByteArray = Ur, C.prototype.equals = Gr, C.prototype.min = zr, C.prototype.max = Wr, C.prototype.and = $r, C.prototype.or = Yr, C.prototype.xor = Zr, C.prototype.andNot = Qr, C.prototype.not = ei, C.prototype.shiftLeft = ti, C.prototype.shiftRight = ri, C.prototype.getLowestSetBit = ni, C.prototype.bitCount = ai, C.prototype.testBit = oi, C.prototype.setBit = hi, C.prototype.clearBit = fi, C.prototype.flipBit = ci, C.prototype.add = di, C.prototype.subtract = pi, C.prototype.multiply = gi, C.prototype.divide = yi, C.prototype.remainder = mi, C.prototype.divideAndRemainder = xi, C.prototype.modPow = Bi, C.prototype.modInverse = Oi, C.prototype.pow = bi, C.prototype.gcd = Ni, C.prototype.isProbablePrime = Vi, C.prototype.square = vi;
  function ct() {
    this.i = 0, this.j = 0, this.S = new Array();
  }
  function Ki(e) {
    var t, r, i;
    for (t = 0; t < 256; ++t) this.S[t] = t;
    for (r = 0, t = 0; t < 256; ++t) r = r + this.S[t] + e[t % e.length] & 255, i = this.S[t], this.S[t] = this.S[r], this.S[r] = i;
    this.i = 0, this.j = 0;
  }
  function qi() {
    var e;
    return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, e = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = e, this.S[e + this.S[this.i] & 255];
  }
  ct.prototype.init = Ki, ct.prototype.next = qi;
  function ki() {
    return new ct();
  }
  var lt = 256;
  var Ye, ve, oe;
  function Mi(e) {
    ve[oe++] ^= e & 255, ve[oe++] ^= e >> 8 & 255, ve[oe++] ^= e >> 16 & 255, ve[oe++] ^= e >> 24 & 255, oe >= lt && (oe -= lt);
  }
  function dt() {
    Mi((/* @__PURE__ */ new Date()).getTime());
  }
  if (ve == null) {
    ve = new Array(), oe = 0;
    var we;
    if (Ie !== void 0 && (Ie.crypto !== void 0 || Ie.msCrypto !== void 0)) {
      var Ct = Ie.crypto || Ie.msCrypto;
      if (Ct.getRandomValues) {
        var Pt = new Uint8Array(32);
        for (Ct.getRandomValues(Pt), we = 0; we < 32; ++we) ve[oe++] = Pt[we];
      } else if (De.appName == "Netscape" && De.appVersion < "5") {
        var Rt = Ie.crypto.random(32);
        for (we = 0; we < Rt.length; ++we) ve[oe++] = Rt.charCodeAt(we) & 255;
      }
    }
    for (; oe < lt; ) we = Math.floor(65536 * Math.random()), ve[oe++] = we >>> 8, ve[oe++] = we & 255;
    oe = 0, dt();
  }
  function _i() {
    if (Ye == null) {
      for (dt(), Ye = ki(), Ye.init(ve), oe = 0; oe < ve.length; ++oe) ve[oe] = 0;
      oe = 0;
    }
    return Ye.next();
  }
  function Ui(e) {
    var t;
    for (t = 0; t < e.length; ++t) e[t] = _i();
  }
  function Ne() {
  }
  Ne.prototype.nextBytes = Ui;
  function fe(e, t) {
    return new C(e, t);
  }
  function Gi(e, t) {
    if (t < e.length + 11) throw "Message too long for RSA";
    for (var r = new Array(), i = e.length - 1; i >= 0 && t > 0; ) {
      var s = e.charCodeAt(i--);
      s < 128 ? r[--t] = s : s > 127 && s < 2048 ? (r[--t] = s & 63 | 128, r[--t] = s >> 6 | 192) : (r[--t] = s & 63 | 128, r[--t] = s >> 6 & 63 | 128, r[--t] = s >> 12 | 224);
    }
    r[--t] = 0;
    for (var n = new Ne(), h = new Array(); t > 2; ) {
      for (h[0] = 0; h[0] == 0; ) n.nextBytes(h);
      r[--t] = h[0];
    }
    return r[--t] = 2, r[--t] = 0, new C(r);
  }
  function Tt(e, t, r) {
    for (var i = "", s = 0; i.length < t; ) i += r(String.fromCharCode.apply(String, e.concat([(s & 4278190080) >> 24, (s & 16711680) >> 16, (s & 65280) >> 8, s & 255]))), s += 1;
    return i;
  }
  function zi(e, t, r, i) {
    var s = a.crypto.MessageDigest, n = a.crypto.Util, h = null;
    if (r || (r = "sha1"), typeof r == "string" && (h = s.getCanonicalAlgName(r), i = s.getHashLength(h), r = function(g) {
      return ce(n.hashHex(xe(g), h));
    }), e.length + 2 * i + 2 > t) throw "Message too long for RSA";
    var u = "", d;
    for (d = 0; d < t - e.length - 2 * i - 2; d += 1) u += "\0";
    var l = r("") + u + "" + e, y = new Array(i);
    new Ne().nextBytes(y);
    var p = Tt(y, l.length, r), o = [];
    for (d = 0; d < l.length; d += 1) o[d] = l.charCodeAt(d) ^ p.charCodeAt(d);
    var c = Tt(o, y.length, r), f = [0];
    for (d = 0; d < y.length; d += 1) f[d + 1] = y[d] ^ c.charCodeAt(d);
    return new C(f.concat(o));
  }
  function q() {
    this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null;
  }
  function Wi(e, t) {
    if (this.isPublic = true, this.isPrivate = false, typeof e != "string") this.n = e, this.e = t;
    else if (e != null && t != null && e.length > 0 && t.length > 0) this.n = fe(e, 16), this.e = parseInt(t, 16);
    else throw "Invalid RSA public key";
  }
  function Xi(e) {
    return e.modPowInt(this.e, this.n);
  }
  function Ji(e) {
    var t = Gi(e, this.n.bitLength() + 7 >> 3);
    if (t == null) return null;
    var r = this.doPublic(t);
    if (r == null) return null;
    var i = r.toString(16);
    return (i.length & 1) == 0 ? i : "0" + i;
  }
  function $i(e, t, r) {
    var i = zi(e, this.n.bitLength() + 7 >> 3, t, r);
    if (i == null) return null;
    var s = this.doPublic(i);
    if (s == null) return null;
    var n = s.toString(16);
    return (n.length & 1) == 0 ? n : "0" + n;
  }
  q.prototype.doPublic = Xi, q.prototype.setPublic = Wi, q.prototype.encrypt = Ji, q.prototype.encryptOAEP = $i, q.prototype.type = "RSA";
  function Yi(e, t) {
    for (var r = e.toByteArray(), i = 0; i < r.length && r[i] == 0; ) ++i;
    if (r.length - i != t - 1 || r[i] != 2) return null;
    for (++i; r[i] != 0; ) if (++i >= r.length) return null;
    for (var s = ""; ++i < r.length; ) {
      var n = r[i] & 255;
      n < 128 ? s += String.fromCharCode(n) : n > 191 && n < 224 ? (s += String.fromCharCode((n & 31) << 6 | r[i + 1] & 63), ++i) : (s += String.fromCharCode((n & 15) << 12 | (r[i + 1] & 63) << 6 | r[i + 2] & 63), i += 2);
    }
    return s;
  }
  function Bt(e, t, r) {
    for (var i = "", s = 0; i.length < t; ) i += r(e + String.fromCharCode.apply(String, [(s & 4278190080) >> 24, (s & 16711680) >> 16, (s & 65280) >> 8, s & 255])), s += 1;
    return i;
  }
  function Zi(e, t, r, i) {
    var s = a.crypto.MessageDigest, n = a.crypto.Util, h = null;
    r || (r = "sha1"), typeof r == "string" && (h = s.getCanonicalAlgName(r), i = s.getHashLength(h), r = function(v) {
      return ce(n.hashHex(xe(v), h));
    }), e = e.toByteArray();
    var p;
    for (p = 0; p < e.length; p += 1) e[p] &= 255;
    for (; e.length < t; ) e.unshift(0);
    if (e = String.fromCharCode.apply(String, e), e.length < 2 * i + 2) throw "Cipher too short";
    var u = e.substr(1, i), d = e.substr(i + 1), l = Bt(d, i, r), y = [], p;
    for (p = 0; p < u.length; p += 1) y[p] = u.charCodeAt(p) ^ l.charCodeAt(p);
    var o = Bt(String.fromCharCode.apply(String, y), e.length - i, r), c = [];
    for (p = 0; p < d.length; p += 1) c[p] = d.charCodeAt(p) ^ o.charCodeAt(p);
    if (c = String.fromCharCode.apply(String, c), c.substr(0, i) !== r("")) throw "Hash mismatch";
    c = c.substr(i);
    var f = c.indexOf(""), g = f != -1 ? c.substr(0, f).lastIndexOf("\0") : -1;
    if (g + 1 != f) throw "Malformed data";
    return c.substr(f + 1);
  }
  function Qi(e, t, r) {
    if (this.isPrivate = true, typeof e != "string") this.n = e, this.e = t, this.d = r;
    else if (e != null && t != null && e.length > 0 && t.length > 0) this.n = fe(e, 16), this.e = parseInt(t, 16), this.d = fe(r, 16);
    else throw "Invalid RSA private key";
  }
  function en(e, t, r, i, s, n, h, u) {
    if (this.isPrivate = true, this.isPublic = false, e == null) throw "RSASetPrivateEx N == null";
    if (t == null) throw "RSASetPrivateEx E == null";
    if (e.length == 0) throw "RSASetPrivateEx N.length == 0";
    if (t.length == 0) throw "RSASetPrivateEx E.length == 0";
    if (e != null && t != null && e.length > 0 && t.length > 0) this.n = fe(e, 16), this.e = parseInt(t, 16), this.d = fe(r, 16), this.p = fe(i, 16), this.q = fe(s, 16), this.dmp1 = fe(n, 16), this.dmq1 = fe(h, 16), this.coeff = fe(u, 16);
    else throw "Invalid RSA private key in RSASetPrivateEx";
  }
  function tn(e, t) {
    var r = new Ne(), i = e >> 1;
    this.e = parseInt(t, 16);
    for (var s = new C(t, 16), n = e / 2 - 100, h = C.ONE.shiftLeft(n); ; ) {
      for (; this.p = new C(e - i, 1, r), !(this.p.subtract(C.ONE).gcd(s).compareTo(C.ONE) == 0 && this.p.isProbablePrime(10)); ) ;
      for (; this.q = new C(i, 1, r), !(this.q.subtract(C.ONE).gcd(s).compareTo(C.ONE) == 0 && this.q.isProbablePrime(10)); ) ;
      if (this.p.compareTo(this.q) <= 0) {
        var u = this.p;
        this.p = this.q, this.q = u;
      }
      var d = this.q.subtract(this.p).abs();
      if (!(d.bitLength() < n || d.compareTo(h) <= 0)) {
        var l = this.p.subtract(C.ONE), y = this.q.subtract(C.ONE), p = l.multiply(y);
        if (p.gcd(s).compareTo(C.ONE) == 0 && (this.n = this.p.multiply(this.q), this.n.bitLength() == e)) {
          this.d = s.modInverse(p), this.dmp1 = this.d.mod(l), this.dmq1 = this.d.mod(y), this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    }
    this.isPrivate = true;
  }
  function rn(e) {
    if (this.p == null || this.q == null) return e.modPow(this.d, this.n);
    for (var t = e.mod(this.p).modPow(this.dmp1, this.p), r = e.mod(this.q).modPow(this.dmq1, this.q); t.compareTo(r) < 0; ) t = t.add(this.p);
    return t.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r);
  }
  function nn(e) {
    if (e.length != Math.ceil(this.n.bitLength() / 4)) throw new Error("wrong ctext length");
    var t = fe(e, 16), r = this.doPrivate(t);
    return r == null ? null : Yi(r, this.n.bitLength() + 7 >> 3);
  }
  function sn(e, t, r) {
    if (e.length != Math.ceil(this.n.bitLength() / 4)) throw new Error("wrong ctext length");
    var i = fe(e, 16), s = this.doPrivate(i);
    return s == null ? null : Zi(s, this.n.bitLength() + 7 >> 3, t, r);
  }
  q.prototype.doPrivate = rn, q.prototype.setPrivate = Qi, q.prototype.setPrivateEx = en, q.prototype.generate = tn, q.prototype.decrypt = nn, q.prototype.decryptOAEP = sn;
  function se(e, t) {
    this.x = t, this.q = e;
  }
  function an(e) {
    return e == this ? true : this.q.equals(e.q) && this.x.equals(e.x);
  }
  function on() {
    return this.x;
  }
  function un() {
    return new se(this.q, this.x.negate().mod(this.q));
  }
  function hn(e) {
    return new se(this.q, this.x.add(e.toBigInteger()).mod(this.q));
  }
  function fn(e) {
    return new se(this.q, this.x.subtract(e.toBigInteger()).mod(this.q));
  }
  function cn(e) {
    return new se(this.q, this.x.multiply(e.toBigInteger()).mod(this.q));
  }
  function ln() {
    return new se(this.q, this.x.square().mod(this.q));
  }
  function dn(e) {
    return new se(this.q, this.x.multiply(e.toBigInteger().modInverse(this.q)).mod(this.q));
  }
  se.prototype.equals = an, se.prototype.toBigInteger = on, se.prototype.negate = un, se.prototype.add = hn, se.prototype.subtract = fn, se.prototype.multiply = cn, se.prototype.square = ln, se.prototype.divide = dn, se.prototype.sqrt = function() {
    return new se(this.q, this.x.sqrt().mod(this.q));
  };
  function _(e, t, r, i) {
    this.curve = e, this.x = t, this.y = r, i == null ? this.z = C.ONE : this.z = i, this.zinv = null;
  }
  function pn() {
    return this.zinv == null && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));
  }
  function gn() {
    return this.zinv == null && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));
  }
  function vn(e) {
    if (e == this) return true;
    if (this.isInfinity()) return e.isInfinity();
    if (e.isInfinity()) return this.isInfinity();
    var t, r;
    return t = e.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(e.z)).mod(this.curve.q), t.equals(C.ZERO) ? (r = e.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(e.z)).mod(this.curve.q), r.equals(C.ZERO)) : false;
  }
  function yn() {
    return this.x == null && this.y == null ? true : this.z.equals(C.ZERO) && !this.y.toBigInteger().equals(C.ZERO);
  }
  function mn() {
    return new _(this.curve, this.x, this.y.negate(), this.z);
  }
  function xn(e) {
    if (this.isInfinity()) return e;
    if (e.isInfinity()) return this;
    var t = e.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(e.z)).mod(this.curve.q), r = e.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(e.z)).mod(this.curve.q);
    if (C.ZERO.equals(r)) return C.ZERO.equals(t) ? this.twice() : this.curve.getInfinity();
    var i = new C("3"), s = this.x.toBigInteger(), n = this.y.toBigInteger();
    e.x.toBigInteger(), e.y.toBigInteger();
    var h = r.square(), u = h.multiply(r), d = s.multiply(h), l = t.square().multiply(this.z), y = l.subtract(d.shiftLeft(1)).multiply(e.z).subtract(u).multiply(r).mod(this.curve.q), p = d.multiply(i).multiply(t).subtract(n.multiply(u)).subtract(l.multiply(t)).multiply(e.z).add(t.multiply(u)).mod(this.curve.q), o = u.multiply(this.z).multiply(e.z).mod(this.curve.q);
    return new _(this.curve, this.curve.fromBigInteger(y), this.curve.fromBigInteger(p), o);
  }
  function Sn() {
    if (this.isInfinity()) return this;
    if (this.y.toBigInteger().signum() == 0) return this.curve.getInfinity();
    var e = new C("3"), t = this.x.toBigInteger(), r = this.y.toBigInteger(), i = r.multiply(this.z), s = i.multiply(r).mod(this.curve.q), n = this.curve.a.toBigInteger(), h = t.square().multiply(e);
    C.ZERO.equals(n) || (h = h.add(this.z.square().multiply(n))), h = h.mod(this.curve.q);
    var u = h.square().subtract(t.shiftLeft(3).multiply(s)).shiftLeft(1).multiply(i).mod(this.curve.q), d = h.multiply(e).multiply(t).subtract(s.shiftLeft(1)).shiftLeft(2).multiply(s).subtract(h.square().multiply(h)).mod(this.curve.q), l = i.square().multiply(i).shiftLeft(3).mod(this.curve.q);
    return new _(this.curve, this.curve.fromBigInteger(u), this.curve.fromBigInteger(d), l);
  }
  function wn(e) {
    if (this.isInfinity()) return this;
    if (e.signum() == 0) return this.curve.getInfinity();
    var t = e, r = t.multiply(new C("3")), i = this.negate(), s = this, n = this.curve.q.subtract(e), h = n.multiply(new C("3")), u = new _(this.curve, this.x, this.y), d = u.negate(), l;
    for (l = r.bitLength() - 2; l > 0; --l) {
      s = s.twice();
      var y = r.testBit(l), p = t.testBit(l);
      y != p && (s = s.add(y ? this : i));
    }
    for (l = h.bitLength() - 2; l > 0; --l) {
      u = u.twice();
      var o = h.testBit(l), c = n.testBit(l);
      o != c && (u = u.add(o ? u : d));
    }
    return s;
  }
  function En(e, t, r) {
    var i;
    e.bitLength() > r.bitLength() ? i = e.bitLength() - 1 : i = r.bitLength() - 1;
    for (var s = this.curve.getInfinity(), n = this.add(t); i >= 0; ) s = s.twice(), e.testBit(i) ? r.testBit(i) ? s = s.add(n) : s = s.add(this) : r.testBit(i) && (s = s.add(t)), --i;
    return s;
  }
  _.prototype.getX = pn, _.prototype.getY = gn, _.prototype.equals = vn, _.prototype.isInfinity = yn, _.prototype.negate = mn, _.prototype.add = xn, _.prototype.twice = Sn, _.prototype.multiply = wn, _.prototype.multiplyTwo = En;
  function Pe(e, t, r) {
    this.q = e, this.a = this.fromBigInteger(t), this.b = this.fromBigInteger(r), this.infinity = new _(this, null, null);
  }
  function Fn() {
    return this.q;
  }
  function bn() {
    return this.a;
  }
  function An() {
    return this.b;
  }
  function Dn(e) {
    return e == this ? true : this.q.equals(e.q) && this.a.equals(e.a) && this.b.equals(e.b);
  }
  function In() {
    return this.infinity;
  }
  function Cn(e) {
    return new se(this.q, e);
  }
  function Pn(e) {
    switch (parseInt(e.substr(0, 2), 16)) {
      case 0:
        return this.infinity;
      case 2:
      case 3:
        var t = e.substr(0, 2);
        e.substr(2);
        var r = this.fromBigInteger(new C(d, 16)), i = this.getA(), s = this.getB(), n = r.square().add(i).multiply(r).add(s), h = n.sqrt();
        return t == "03" && (h = h.negate()), new _(this, r, h);
      case 4:
      case 6:
      case 7:
        var u = (e.length - 2) / 2, d = e.substr(2, u), l = e.substr(u + 2, u);
        return new _(this, this.fromBigInteger(new C(d, 16)), this.fromBigInteger(new C(l, 16)));
      default:
        return null;
    }
  }
  Pe.prototype.getQ = Fn, Pe.prototype.getA = bn, Pe.prototype.getB = An, Pe.prototype.equals = Dn, Pe.prototype.getInfinity = In, Pe.prototype.fromBigInteger = Cn, Pe.prototype.decodePointHex = Pn;
  se.prototype.getByteLength = function() {
    return Math.floor((this.toBigInteger().bitLength() + 7) / 8);
  }, _.prototype.getEncoded = function(e) {
    var t = function(n, h) {
      var u = n.toByteArrayUnsigned();
      if (h < u.length) u = u.slice(u.length - h);
      else for (; h > u.length; ) u.unshift(0);
      return u;
    }, r = this.getX().toBigInteger(), i = this.getY().toBigInteger(), s = t(r, 32);
    return e ? i.isEven() ? s.unshift(2) : s.unshift(3) : (s.unshift(4), s = s.concat(t(i, 32))), s;
  }, _.decodeFrom = function(e, t) {
    t[0];
    var r = t.length - 1, i = t.slice(1, 1 + r / 2), s = t.slice(1 + r / 2, 1 + r);
    i.unshift(0), s.unshift(0);
    var n = new C(i), h = new C(s);
    return new _(e, e.fromBigInteger(n), e.fromBigInteger(h));
  }, _.decodeFromHex = function(e, t) {
    t.substr(0, 2);
    var r = t.length - 2, i = t.substr(2, r / 2), s = t.substr(2 + r / 2, r / 2), n = new C(i, 16), h = new C(s, 16);
    return new _(e, e.fromBigInteger(n), e.fromBigInteger(h));
  }, _.prototype.add2D = function(e) {
    if (this.isInfinity()) return e;
    if (e.isInfinity()) return this;
    if (this.x.equals(e.x)) return this.y.equals(e.y) ? this.twice() : this.curve.getInfinity();
    var t = e.x.subtract(this.x), r = e.y.subtract(this.y), i = r.divide(t), s = i.square().subtract(this.x).subtract(e.x), n = i.multiply(this.x.subtract(s)).subtract(this.y);
    return new _(this.curve, s, n);
  }, _.prototype.twice2D = function() {
    if (this.isInfinity()) return this;
    if (this.y.toBigInteger().signum() == 0) return this.curve.getInfinity();
    var e = this.curve.fromBigInteger(C.valueOf(2)), t = this.curve.fromBigInteger(C.valueOf(3)), r = this.x.square().multiply(t).add(this.curve.a).divide(this.y.multiply(e)), i = r.square().subtract(this.x.multiply(e)), s = r.multiply(this.x.subtract(i)).subtract(this.y);
    return new _(this.curve, i, s);
  }, _.prototype.multiply2D = function(e) {
    if (this.isInfinity()) return this;
    if (e.signum() == 0) return this.curve.getInfinity();
    var t = e, r = t.multiply(new C("3")), i = this.negate(), s = this, n;
    for (n = r.bitLength() - 2; n > 0; --n) {
      s = s.twice();
      var h = r.testBit(n), u = t.testBit(n);
      h != u && (s = s.add2D(h ? this : i));
    }
    return s;
  }, _.prototype.isOnCurve = function() {
    var e = this.getX().toBigInteger(), t = this.getY().toBigInteger(), r = this.curve.getA().toBigInteger(), i = this.curve.getB().toBigInteger(), s = this.curve.getQ(), n = t.multiply(t).mod(s), h = e.multiply(e).multiply(e).add(r.multiply(e)).add(i).mod(s);
    return n.equals(h);
  }, _.prototype.toString = function() {
    return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")";
  }, _.prototype.validate = function() {
    var e = this.curve.getQ();
    if (this.isInfinity()) throw new Error("Point is at infinity.");
    var t = this.getX().toBigInteger(), r = this.getY().toBigInteger();
    if (t.compareTo(C.ONE) < 0 || t.compareTo(e.subtract(C.ONE)) > 0) throw new Error("x coordinate out of bounds");
    if (r.compareTo(C.ONE) < 0 || r.compareTo(e.subtract(C.ONE)) > 0) throw new Error("y coordinate out of bounds");
    if (!this.isOnCurve()) throw new Error("Point is not on the curve.");
    if (this.multiply(e).isInfinity()) throw new Error("Point is not a scalar multiple of G.");
    return true;
  };
  var Nt = (function() {
    var e = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)", t = '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))', r = '(?:"' + t + '*")', i = new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|" + e + "|" + r + ")", "g"), s = new RegExp("\\\\(?:([^u])|u(.{4}))", "g"), n = { '"': '"', "/": "/", "\\": "\\", b: "\b", f: "\f", n: `
`, r: "\r", t: "	" };
    function h(y, p, o) {
      return p ? n[p] : String.fromCharCode(parseInt(o, 16));
    }
    var u = new String(""), d = "\\", l = Object.hasOwnProperty;
    return function(y, p) {
      var o = y.match(i), c, f = o[0], g = false;
      f === "{" ? c = {} : f === "[" ? c = [] : (c = [], g = true);
      for (var v, x = [c], b = 1 - g, I = o.length; b < I; ++b) {
        f = o[b];
        var A;
        switch (f.charCodeAt(0)) {
          default:
            A = x[0], A[v || A.length] = +f, v = void 0;
            break;
          case 34:
            if (f = f.substring(1, f.length - 1), f.indexOf(d) !== -1 && (f = f.replace(s, h)), A = x[0], !v) if (A instanceof Array) v = A.length;
            else {
              v = f || u;
              break;
            }
            A[v] = f, v = void 0;
            break;
          case 91:
            A = x[0], x.unshift(A[v || A.length] = []), v = void 0;
            break;
          case 93:
            x.shift();
            break;
          case 102:
            A = x[0], A[v || A.length] = false, v = void 0;
            break;
          case 110:
            A = x[0], A[v || A.length] = null, v = void 0;
            break;
          case 116:
            A = x[0], A[v || A.length] = true, v = void 0;
            break;
          case 123:
            A = x[0], x.unshift(A[v || A.length] = {}), v = void 0;
            break;
          case 125:
            x.shift();
            break;
        }
      }
      if (g) {
        if (x.length !== 1) throw new Error();
        c = c[0];
      } else if (x.length) throw new Error();
      if (p) {
        var m = function(E, F) {
          var w = E[F];
          if (w && typeof w == "object") {
            var S = null;
            for (var D in w) if (l.call(w, D) && w !== E) {
              var R = m(w, D);
              R !== void 0 ? w[D] = R : (S || (S = []), S.push(D));
            }
            if (S) for (var T = S.length; --T >= 0; ) delete w[S[T]];
          }
          return p.call(E, F, w);
        };
        c = m({ "": c }, "");
      }
      return c;
    };
  })();
  (typeof a > "u" || !a) && (a = {}), (typeof a.asn1 > "u" || !a.asn1) && (a.asn1 = {}), a.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(e) {
      var t = e.toString(16);
      return t.length % 2 == 1 && (t = "0" + t), t;
    }, this.bigIntToMinTwosComplementsHex = function(e) {
      var t = e.toString(16);
      if (t.substr(0, 1) != "-") t.length % 2 == 1 ? t = "0" + t : t.match(/^[0-7]/) || (t = "00" + t);
      else {
        var r = t.substr(1), i = r.length;
        i % 2 == 1 ? i += 1 : t.match(/^[0-7]/) || (i += 2);
        for (var s = "", n = 0; n < i; n++) s += "f";
        var h = new C(s, 16), u = h.xor(e).add(C.ONE);
        t = u.toString(16).replace(/^-/, "");
      }
      return t;
    }, this.getPEMStringFromHex = function(e, t) {
      return ue(e, t);
    }, this.newObject = function(e) {
      var t = a, r = t.asn1, i = r.ASN1Object, s = r.DERBoolean, n = r.DERInteger, h = r.DERBitString, u = r.DEROctetString, d = r.DERNull, l = r.DERObjectIdentifier, y = r.DEREnumerated, p = r.DERUTF8String, o = r.DERNumericString, c = r.DERPrintableString, f = r.DERTeletexString, g = r.DERIA5String, v = r.DERUTCTime, x = r.DERGeneralizedTime, b = r.DERVisibleString, I = r.DERBMPString, A = r.DERSequence, m = r.DERSet, E = r.DERTaggedObject, F = r.ASN1Util.newObject;
      if (e instanceof r.ASN1Object) return e;
      var w = Object.keys(e);
      if (w.length != 1) throw new Error("key of param shall be only one.");
      var S = w[0];
      if (":asn1:bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:visstr:bmpstr:seq:set:tag:".indexOf(":" + S + ":") == -1) throw new Error("undefined key: " + S);
      if (S == "bool") return new s(e[S]);
      if (S == "int") return new n(e[S]);
      if (S == "bitstr") return new h(e[S]);
      if (S == "octstr") return new u(e[S]);
      if (S == "null") return new d(e[S]);
      if (S == "oid") return new l(e[S]);
      if (S == "enum") return new y(e[S]);
      if (S == "utf8str") return new p(e[S]);
      if (S == "numstr") return new o(e[S]);
      if (S == "prnstr") return new c(e[S]);
      if (S == "telstr") return new f(e[S]);
      if (S == "ia5str") return new g(e[S]);
      if (S == "utctime") return new v(e[S]);
      if (S == "gentime") return new x(e[S]);
      if (S == "visstr") return new b(e[S]);
      if (S == "bmpstr") return new I(e[S]);
      if (S == "asn1") return new i(e[S]);
      if (S == "seq") {
        for (var D = e[S], R = [], T = 0; T < D.length; T++) {
          var K = F(D[T]);
          R.push(K);
        }
        return new A({ array: R });
      }
      if (S == "set") {
        for (var D = e[S], R = [], T = 0; T < D.length; T++) {
          var K = F(D[T]);
          R.push(K);
        }
        return new m({ array: R });
      }
      if (S == "tag") {
        var P = e[S];
        if (Object.prototype.toString.call(P) === "[object Array]" && P.length == 3) {
          var H = F(P[2]);
          return new E({ tag: P[0], explicit: P[1], obj: H });
        } else return new E(P);
      }
    }, this.jsonToASN1HEX = function(e) {
      var t = this.newObject(e);
      return t.tohex();
    };
  }(), a.asn1.ASN1Util.oidHexToInt = function(e) {
    for (var s = "", t = parseInt(e.substr(0, 2), 16), r = Math.floor(t / 40), i = t % 40, s = r + "." + i, n = "", h = 2; h < e.length; h += 2) {
      var u = parseInt(e.substr(h, 2), 16), d = ("00000000" + u.toString(2)).slice(-8);
      if (n = n + d.substr(1, 7), d.substr(0, 1) == "0") {
        var l = new C(n, 2);
        s = s + "." + l.toString(10), n = "";
      }
    }
    return s;
  }, a.asn1.ASN1Util.oidIntToHex = function(e) {
    var t = function(u) {
      var d = u.toString(16);
      return d.length == 1 && (d = "0" + d), d;
    }, r = function(u) {
      var d = "", l = new C(u, 10), y = l.toString(2), p = 7 - y.length % 7;
      p == 7 && (p = 0);
      for (var o = "", c = 0; c < p; c++) o += "0";
      y = o + y;
      for (var c = 0; c < y.length - 1; c += 7) {
        var f = y.substr(c, 7);
        c != y.length - 7 && (f = "1" + f), d += t(parseInt(f, 2));
      }
      return d;
    };
    if (!e.match(/^[0-9.]+$/)) throw "malformed oid string: " + e;
    var i = "", s = e.split("."), n = parseInt(s[0]) * 40 + parseInt(s[1]);
    i += t(n), s.splice(0, 2);
    for (var h = 0; h < s.length; h++) i += r(s[h]);
    return i;
  }, a.asn1.ASN1Object = function(e) {
    var t = "";
    this.params = null, this.getLengthHexFromValue = function() {
      if (typeof this.hV > "u" || this.hV == null) throw new Error("this.hV is null or undefined");
      if (this.hV.length % 2 == 1) throw new Error("value hex must be even length: n=" + t.length + ",v=" + this.hV);
      var r = this.hV.length / 2, i = r.toString(16);
      if (i.length % 2 == 1 && (i = "0" + i), r < 128) return i;
      var s = i.length / 2;
      if (s > 15) throw new Error("ASN.1 length too long to represent by 8x: n = " + r.toString(16));
      var n = 128 + s;
      return n.toString(16) + i;
    }, this.tohex = function() {
      return (this.hTLV == null || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = false), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.getValueHex = function() {
      return this.tohex(), this.hV;
    }, this.getFreshValueHex = function() {
      return "";
    }, this.setByParam = function(r) {
      this.params = r;
    }, e != null && e.tlv != null && (this.hTLV = e.tlv, this.isModified = false);
  }, a.asn1.DERAbstractString = function(e) {
    a.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
      return this.s;
    }, this.setString = function(t) {
      this.hTLV = null, this.isModified = true, this.s = t, this.hV = Qe(this.s).toLowerCase();
    }, this.setStringHex = function(t) {
      this.hTLV = null, this.isModified = true, this.s = null, this.hV = t;
    }, this.getFreshValueHex = function() {
      return this.hV;
    }, typeof e < "u" && (typeof e == "string" ? this.setString(e) : typeof e.str < "u" ? this.setString(e.str) : typeof e.hex < "u" && this.setStringHex(e.hex));
  }, N(a.asn1.DERAbstractString, a.asn1.ASN1Object), a.asn1.DERAbstractTime = function(e) {
    a.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(t) {
      var r = t.getTime() + t.getTimezoneOffset() * 6e4, i = new Date(r);
      return i;
    }, this.formatDate = function(t, r, i) {
      var s = this.zeroPadding, n = this.localDateToUTC(t), h = String(n.getFullYear());
      r == "utc" && (h = h.substr(2, 2));
      var u = s(String(n.getMonth() + 1), 2), d = s(String(n.getDate()), 2), l = s(String(n.getHours()), 2), y = s(String(n.getMinutes()), 2), p = s(String(n.getSeconds()), 2), o = h + u + d + l + y + p;
      if (i === true) {
        var c = n.getMilliseconds();
        if (c != 0) {
          var f = s(String(c), 3);
          f = f.replace(/[0]+$/, ""), o = o + "." + f;
        }
      }
      return o + "Z";
    }, this.zeroPadding = function(t, r) {
      return t.length >= r ? t : new Array(r - t.length + 1).join("0") + t;
    }, this.setByParam = function(t) {
      this.hV = null, this.hTLV = null, this.params = t;
    }, this.getString = function() {
    }, this.setString = function(t) {
      this.hTLV = null, this.isModified = true, this.params == null && (this.params = {}), this.params.str = t;
    }, this.setByDate = function(t) {
      this.hTLV = null, this.isModified = true, this.params == null && (this.params = {}), this.params.date = t;
    }, this.setByDateValue = function(t, r, i, s, n, h) {
      var u = new Date(Date.UTC(t, r - 1, i, s, n, h, 0));
      this.setByDate(u);
    }, this.getFreshValueHex = function() {
      return this.hV;
    };
  }, N(a.asn1.DERAbstractTime, a.asn1.ASN1Object), a.asn1.DERAbstractStructured = function(e) {
    a.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(t) {
      this.hTLV = null, this.isModified = true, this.asn1Array = t;
    }, this.appendASN1Object = function(t) {
      this.hTLV = null, this.isModified = true, this.asn1Array.push(t);
    }, this.asn1Array = new Array(), typeof e < "u" && typeof e.array < "u" && (this.asn1Array = e.array);
  }, N(a.asn1.DERAbstractStructured, a.asn1.ASN1Object), a.asn1.DERBoolean = function(e) {
    a.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", e == false ? this.hTLV = "010100" : this.hTLV = "0101ff";
  }, N(a.asn1.DERBoolean, a.asn1.ASN1Object), a.asn1.DERInteger = function(e) {
    a.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(t) {
      this.hTLV = null, this.isModified = true, this.hV = a.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t);
    }, this.setByInteger = function(t) {
      var r = new C(String(t), 10);
      this.setByBigInteger(r);
    }, this.setValueHex = function(t) {
      this.hV = t;
    }, this.getFreshValueHex = function() {
      return this.hV;
    }, typeof e < "u" && (typeof e.bigint < "u" ? this.setByBigInteger(e.bigint) : typeof e.int < "u" ? this.setByInteger(e.int) : typeof e == "number" ? this.setByInteger(e) : typeof e.hex < "u" && this.setValueHex(e.hex));
  }, N(a.asn1.DERInteger, a.asn1.ASN1Object), a.asn1.DERBitString = function(e) {
    if (e !== void 0 && typeof e.obj < "u") {
      var t = a.asn1.ASN1Util.newObject(e.obj);
      e.hex = "00" + t.tohex();
    }
    a.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(r) {
      this.hTLV = null, this.isModified = true, this.hV = r;
    }, this.setUnusedBitsAndHexValue = function(r, i) {
      if (r < 0 || 7 < r) throw "unused bits shall be from 0 to 7: u = " + r;
      var s = "0" + r;
      this.hTLV = null, this.isModified = true, this.hV = s + i;
    }, this.setByBinaryString = function(r) {
      r = r.replace(/0+$/, "");
      var i = 8 - r.length % 8;
      i == 8 && (i = 0), r += "0000000".substr(0, i);
      for (var s = "", n = 0; n < r.length - 1; n += 8) {
        var h = r.substr(n, 8), u = parseInt(h, 2).toString(16);
        u.length == 1 && (u = "0" + u), s += u;
      }
      this.hTLV = null, this.isModified = true, this.hV = "0" + i + s;
    }, this.setByBooleanArray = function(r) {
      for (var i = "", s = 0; s < r.length; s++) r[s] == true ? i += "1" : i += "0";
      this.setByBinaryString(i);
    }, this.newFalseArray = function(r) {
      for (var i = new Array(r), s = 0; s < r; s++) i[s] = false;
      return i;
    }, this.getFreshValueHex = function() {
      return this.hV;
    }, typeof e < "u" && (typeof e == "string" && e.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(e) : typeof e.hex < "u" ? this.setHexValueIncludingUnusedBits(e.hex) : typeof e.bin < "u" ? this.setByBinaryString(e.bin) : typeof e.array < "u" && this.setByBooleanArray(e.array));
  }, N(a.asn1.DERBitString, a.asn1.ASN1Object), a.asn1.DEROctetString = function(e) {
    if (e !== void 0 && typeof e.obj < "u") {
      var t = a.asn1.ASN1Util.newObject(e.obj);
      e.hex = t.tohex();
    }
    a.asn1.DEROctetString.superclass.constructor.call(this, e), this.hT = "04";
  }, N(a.asn1.DEROctetString, a.asn1.DERAbstractString), a.asn1.DERNull = function() {
    a.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500";
  }, N(a.asn1.DERNull, a.asn1.ASN1Object), a.asn1.DERObjectIdentifier = function(e) {
    a.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(t) {
      this.hTLV = null, this.isModified = true, this.s = null, this.hV = t;
    }, this.setValueOidString = function(t) {
      var r = _t(t);
      if (r == null) throw new Error("malformed oid string: " + t);
      this.hTLV = null, this.isModified = true, this.s = null, this.hV = r;
    }, this.setValueName = function(t) {
      var r = a.asn1.x509.OID.name2oid(t);
      if (r !== "") this.setValueOidString(r);
      else throw new Error("DERObjectIdentifier oidName undefined: " + t);
    }, this.setValueNameOrOid = function(t) {
      t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t);
    }, this.getFreshValueHex = function() {
      return this.hV;
    }, this.setByParam = function(t) {
      typeof t == "string" ? this.setValueNameOrOid(t) : t.oid !== void 0 ? this.setValueNameOrOid(t.oid) : t.name !== void 0 ? this.setValueNameOrOid(t.name) : t.hex !== void 0 && this.setValueHex(t.hex);
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.DERObjectIdentifier, a.asn1.ASN1Object), a.asn1.DEREnumerated = function(e) {
    a.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(t) {
      this.hTLV = null, this.isModified = true, this.hV = a.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t);
    }, this.setByInteger = function(t) {
      var r = new C(String(t), 10);
      this.setByBigInteger(r);
    }, this.setValueHex = function(t) {
      this.hV = t;
    }, this.getFreshValueHex = function() {
      return this.hV;
    }, typeof e < "u" && (typeof e.int < "u" ? this.setByInteger(e.int) : typeof e == "number" ? this.setByInteger(e) : typeof e.hex < "u" && this.setValueHex(e.hex));
  }, N(a.asn1.DEREnumerated, a.asn1.ASN1Object), a.asn1.DERUTF8String = function(e) {
    a.asn1.DERUTF8String.superclass.constructor.call(this, e), this.hT = "0c";
  }, N(a.asn1.DERUTF8String, a.asn1.DERAbstractString), a.asn1.DERNumericString = function(e) {
    a.asn1.DERNumericString.superclass.constructor.call(this, e), this.hT = "12";
  }, N(a.asn1.DERNumericString, a.asn1.DERAbstractString), a.asn1.DERPrintableString = function(e) {
    a.asn1.DERPrintableString.superclass.constructor.call(this, e), this.hT = "13";
  }, N(a.asn1.DERPrintableString, a.asn1.DERAbstractString), a.asn1.DERTeletexString = function(e) {
    a.asn1.DERTeletexString.superclass.constructor.call(this, e), this.hT = "14";
  }, N(a.asn1.DERTeletexString, a.asn1.DERAbstractString), a.asn1.DERIA5String = function(e) {
    a.asn1.DERIA5String.superclass.constructor.call(this, e), this.hT = "16";
  }, N(a.asn1.DERIA5String, a.asn1.DERAbstractString), a.asn1.DERVisibleString = function(e) {
    a.asn1.DERIA5String.superclass.constructor.call(this, e), this.hT = "1a";
  }, N(a.asn1.DERVisibleString, a.asn1.DERAbstractString), a.asn1.DERBMPString = function(e) {
    a.asn1.DERBMPString.superclass.constructor.call(this, e), this.hT = "1e";
  }, N(a.asn1.DERBMPString, a.asn1.DERAbstractString), a.asn1.DERUTCTime = function(e) {
    a.asn1.DERUTCTime.superclass.constructor.call(this, e), this.hT = "17", this.params = void 0, this.getFreshValueHex = function() {
      var t = this.params;
      if (this.params == null && (t = { date: /* @__PURE__ */ new Date() }), typeof t == "string") if (t.match(/^[0-9]{12}Z$/) || t.match(/^[0-9]{12}\.[0-9]+Z$/)) this.hV = pe(t);
      else throw new Error("malformed string for UTCTime: " + t);
      else if (t.str != null) this.hV = pe(t.str);
      else if (t.date == null && t.millis == true) {
        var r = /* @__PURE__ */ new Date();
        this.hV = pe(this.formatDate(r, "utc", true));
      } else if (t.date != null && t.date instanceof Date) {
        var i = t.millis === true;
        this.hV = pe(this.formatDate(t.date, "utc", i));
      } else t instanceof Date && (this.hV = pe(this.formatDate(t, "utc")));
      if (this.hV == null) throw new Error("parameter not specified properly for UTCTime");
      return this.hV;
    }, e != null && this.setByParam(e);
  }, N(a.asn1.DERUTCTime, a.asn1.DERAbstractTime), a.asn1.DERGeneralizedTime = function(e) {
    a.asn1.DERGeneralizedTime.superclass.constructor.call(this, e), this.hT = "18", this.params = e, this.getFreshValueHex = function() {
      var t = this.params;
      if (this.params == null && (t = { date: /* @__PURE__ */ new Date() }), typeof t == "string") if (t.match(/^[0-9]{14}Z$/) || t.match(/^[0-9]{14}\.[0-9]+Z$/)) this.hV = pe(t);
      else throw new Error("malformed string for GeneralizedTime: " + t);
      else if (t.str != null) this.hV = pe(t.str);
      else if (t.date == null && t.millis == true) {
        var r = /* @__PURE__ */ new Date();
        this.hV = pe(this.formatDate(r, "gen", true));
      } else if (t.date != null && t.date instanceof Date) {
        var i = t.millis === true;
        this.hV = pe(this.formatDate(t.date, "gen", i));
      } else t instanceof Date && (this.hV = pe(this.formatDate(t, "gen")));
      if (this.hV == null) throw new Error("parameter not specified properly for GeneralizedTime");
      return this.hV;
    }, e != null && this.setByParam(e);
  }, N(a.asn1.DERGeneralizedTime, a.asn1.DERAbstractTime), a.asn1.DERSequence = function(e) {
    a.asn1.DERSequence.superclass.constructor.call(this, e), this.hT = "30", this.getFreshValueHex = function() {
      for (var t = "", r = 0; r < this.asn1Array.length; r++) {
        var i = this.asn1Array[r];
        t += i.tohex();
      }
      return this.hV = t, this.hV;
    };
  }, N(a.asn1.DERSequence, a.asn1.DERAbstractStructured), a.asn1.DERSet = function(e) {
    a.asn1.DERSet.superclass.constructor.call(this, e), this.hT = "31", this.sortFlag = true, this.getFreshValueHex = function() {
      for (var t = new Array(), r = 0; r < this.asn1Array.length; r++) {
        var i = this.asn1Array[r];
        t.push(i.tohex());
      }
      return this.sortFlag == true && t.sort(), this.hV = t.join(""), this.hV;
    }, typeof e < "u" && typeof e.sortflag < "u" && e.sortflag == false && (this.sortFlag = false);
  }, N(a.asn1.DERSet, a.asn1.DERAbstractStructured), a.asn1.DERTaggedObject = function(e) {
    a.asn1.DERTaggedObject.superclass.constructor.call(this);
    var t = a.asn1, r = j, i = r.getV;
    r.isASN1HEX;
    var s = t.ASN1Util.newObject;
    this.hT = "a0", this.hV = "", this.isExplicit = true, this.asn1Object = null, this.params = { tag: "a0", explicit: true }, this.setASN1Object = function(n, h, u) {
      this.params = { tag: h, explicit: n, obj: u };
    }, this.getFreshValueHex = function() {
      var n = this.params;
      if (n.explicit == null && (n.explicit = true), n.tage != null && (n.tag = n.tage, n.explicit = true), n.tagi != null && (n.tag = n.tagi, n.explicit = false), n.str != null) this.hV = Qe(n.str);
      else if (n.hex != null) this.hV = n.hex;
      else if (n.obj != null) {
        var h;
        n.obj instanceof t.ASN1Object ? h = n.obj.tohex() : typeof n.obj == "object" && (h = s(n.obj).tohex()), n.explicit ? this.hV = h : this.hV = i(h, 0);
      } else throw new Error("str, hex nor obj not specified");
      return n.tag == null && (n.tag = "a0"), this.hT = n.tag, this.hTLV = null, this.isModified = true, this.hV;
    }, this.setByParam = function(n) {
      this.params = n;
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.DERTaggedObject, a.asn1.ASN1Object);
  var j = new function() {
  }();
  j.getLblen = function(e, t) {
    if (e.substr(t + 2, 1) != "8") return 1;
    var r = parseInt(e.substr(t + 3, 1));
    return r == 0 ? -1 : 0 < r && r < 10 ? r + 1 : -2;
  }, j.getL = function(e, t) {
    var r = j.getLblen(e, t);
    return r < 1 ? "" : e.substr(t + 2, r * 2);
  }, j.getVblen = function(e, t) {
    var r, i;
    return r = j.getL(e, t), r == "" ? -1 : (r.substr(0, 1) === "8" ? i = new C(r.substr(2), 16) : i = new C(r, 16), i.intValue());
  }, j.getVidx = function(e, t) {
    var r = j.getLblen(e, t);
    return r < 0 ? r : t + (r + 1) * 2;
  }, j.getV = function(e, t) {
    var r = j.getVidx(e, t), i = j.getVblen(e, t);
    return e.substr(r, i * 2);
  }, j.getTLV = function(e, t) {
    return e.substr(t, 2) + j.getL(e, t) + j.getV(e, t);
  }, j.getTLVblen = function(e, t) {
    return 2 + j.getLblen(e, t) * 2 + j.getVblen(e, t) * 2;
  }, j.getNextSiblingIdx = function(e, t) {
    var r = j.getVidx(e, t), i = j.getVblen(e, t);
    return r + i * 2;
  }, j.getChildIdx = function(e, t) {
    var r = j, i = [], s, n, h;
    s = r.getVidx(e, t), n = r.getVblen(e, t) * 2, e.substr(t, 2) == "03" && (s += 2, n -= 2), h = 0;
    for (var u = s; h <= n; ) {
      var d = r.getTLVblen(e, u);
      if (h += d, h <= n && i.push(u), u += d, h >= n) break;
    }
    return i;
  }, j.getNthChildIdx = function(e, t, r) {
    var i = j.getChildIdx(e, t);
    return i[r];
  }, j.getIdxbyList = function(e, t, r, i) {
    var s = j, n, h;
    return r.length == 0 ? i !== void 0 && e.substr(t, 2) !== i ? -1 : t : (n = r.shift(), h = s.getChildIdx(e, t), n >= h.length ? -1 : s.getIdxbyList(e, h[n], r, i));
  }, j.getIdxbyListEx = function(e, t, r, i) {
    var s = j, n, h;
    if (r.length == 0) return i !== void 0 && e.substr(t, 2) !== i ? -1 : t;
    n = r.shift(), h = s.getChildIdx(e, t);
    for (var u = 0, d = 0; d < h.length; d++) {
      var l = e.substr(h[d], 2);
      if (typeof n == "number" && !s.isContextTag(l) && u == n || typeof n == "string" && s.isContextTag(l, n)) return s.getIdxbyListEx(e, h[d], r, i);
      s.isContextTag(l) || u++;
    }
    return -1;
  }, j.getTLVbyList = function(e, t, r, i) {
    var s = j, n = s.getIdxbyList(e, t, r, i);
    return n == -1 || n >= e.length ? null : s.getTLV(e, n);
  }, j.getTLVbyListEx = function(e, t, r, i) {
    var s = j, n = s.getIdxbyListEx(e, t, r, i);
    return n == -1 ? null : s.getTLV(e, n);
  }, j.getVbyList = function(e, t, r, i, s) {
    var n = j, h, u;
    return h = n.getIdxbyList(e, t, r, i), h == -1 || h >= e.length ? null : (u = n.getV(e, h), s === true && (u = u.substr(2)), u);
  }, j.getVbyListEx = function(e, t, r, i, s) {
    var n = j, h, u;
    return h = n.getIdxbyListEx(e, t, r, i), h == -1 ? null : (u = n.getV(e, h), e.substr(h, 2) == "03" && s !== false && (u = u.substr(2)), u);
  }, j.getInt = function(e, t, r) {
    r == null && (r = -1);
    try {
      var i = e.substr(t, 2);
      if (i != "02" && i != "03") return r;
      var s = j.getV(e, t);
      return i == "02" ? parseInt(s, 16) : Ut(s);
    } catch {
      return r;
    }
  }, j.getOID = function(e, t, r) {
    r == null && (r = null);
    try {
      if (e.substr(t, 2) != "06") return r;
      var i = j.getV(e, t);
      return nt(i);
    } catch {
      return r;
    }
  }, j.getOIDName = function(e, t, r) {
    r == null && (r = null);
    try {
      var i = j.getOID(e, t, r);
      if (i == r) return r;
      var s = a.asn1.x509.OID.oid2name(i);
      return s == "" ? i : s;
    } catch {
      return r;
    }
  }, j.getString = function(e, t, r) {
    r == null && (r = null);
    try {
      var i = j.getV(e, t);
      return ce(i);
    } catch {
      return r;
    }
  }, j.hextooidstr = function(e) {
    var t = function(p, o) {
      return p.length >= o ? p : new Array(o - p.length + 1).join("0") + p;
    }, r = [], i = e.substr(0, 2), s = parseInt(i, 16);
    r[0] = new String(Math.floor(s / 40)), r[1] = new String(s % 40);
    for (var n = e.substr(2), h = [], u = 0; u < n.length / 2; u++) h.push(parseInt(n.substr(u * 2, 2), 16));
    for (var d = [], l = "", u = 0; u < h.length; u++) h[u] & 128 ? l = l + t((h[u] & 127).toString(2), 7) : (l = l + t((h[u] & 127).toString(2), 7), d.push(new String(parseInt(l, 2))), l = "");
    var y = r.join(".");
    return d.length > 0 && (y = y + "." + d.join(".")), y;
  }, j.dump = function(e, t, r, i) {
    var s = j, n = s.getV, h = s.dump, u = s.getChildIdx, d = e;
    e instanceof a.asn1.ASN1Object && (d = e.tohex());
    var l = function(F, w) {
      if (F.length <= w * 2) return F;
      var S = F.substr(0, w) + "..(total " + F.length / 2 + "bytes).." + F.substr(F.length - w, w);
      return S;
    };
    t === void 0 && (t = { ommit_long_octet: 32 }), r === void 0 && (r = 0), i === void 0 && (i = "");
    var y = t.ommit_long_octet, m = d.substr(r, 2);
    if (m == "01") {
      var p = n(d, r);
      return p == "00" ? i + `BOOLEAN FALSE
` : i + `BOOLEAN TRUE
`;
    }
    if (m == "02") {
      var p = n(d, r);
      return i + "INTEGER " + l(p, y) + `
`;
    }
    if (m == "03") {
      var p = n(d, r);
      if (s.isASN1HEX(p.substr(2))) {
        var o = i + `BITSTRING, encapsulates
`;
        return o = o + h(p.substr(2), t, 0, i + "  "), o;
      } else return i + "BITSTRING " + l(p, y) + `
`;
    }
    if (m == "04") {
      var p = n(d, r);
      if (s.isASN1HEX(p)) {
        var o = i + `OCTETSTRING, encapsulates
`;
        return o = o + h(p, t, 0, i + "  "), o;
      } else return i + "OCTETSTRING " + l(p, y) + `
`;
    }
    if (m == "05") return i + `NULL
`;
    if (m == "06") {
      var c = n(d, r), f = a.asn1.ASN1Util.oidHexToInt(c), g = a.asn1.x509.OID.oid2name(f), v = f.replace(/\./g, " ");
      return g != "" ? i + "ObjectIdentifier " + g + " (" + v + `)
` : i + "ObjectIdentifier (" + v + `)
`;
    }
    if (m == "0a") return i + "ENUMERATED " + parseInt(n(d, r)) + `
`;
    if (m == "0c") return i + "UTF8String '" + W(n(d, r)) + `'
`;
    if (m == "13") return i + "PrintableString '" + W(n(d, r)) + `'
`;
    if (m == "14") return i + "TeletexString '" + W(n(d, r)) + `'
`;
    if (m == "16") return i + "IA5String '" + W(n(d, r)) + `'
`;
    if (m == "17") return i + "UTCTime " + W(n(d, r)) + `
`;
    if (m == "18") return i + "GeneralizedTime " + W(n(d, r)) + `
`;
    if (m == "1a") return i + "VisualString '" + W(n(d, r)) + `'
`;
    if (m == "1e") return i + "BMPString '" + mt(n(d, r)) + `'
`;
    if (m == "30") {
      if (d.substr(r, 4) == "3000") return i + `SEQUENCE {}
`;
      var o = i + `SEQUENCE
`, x = u(d, r), b = t;
      if ((x.length == 2 || x.length == 3) && d.substr(x[0], 2) == "06" && d.substr(x[x.length - 1], 2) == "04") {
        var g = s.oidname(n(d, x[0])), I = JSON.parse(JSON.stringify(t));
        I.x509ExtName = g, b = I;
      }
      for (var A = 0; A < x.length; A++) o = o + h(d, b, x[A], i + "  ");
      return o;
    }
    if (m == "31") {
      for (var o = i + `SET
`, x = u(d, r), A = 0; A < x.length; A++) o = o + h(d, t, x[A], i + "  ");
      return o;
    }
    var m = parseInt(m, 16);
    if ((m & 128) != 0) {
      var E = m & 31;
      if ((m & 32) != 0) {
        for (var o = i + "[" + E + `]
`, x = u(d, r), A = 0; A < x.length; A++) o = o + h(d, t, x[A], i + "  ");
        return o;
      } else {
        var p = n(d, r);
        if (j.isASN1HEX(p)) {
          var o = i + "[" + E + `]
`;
          return o = o + h(p, t, 0, i + "  "), o;
        } else (p.substr(0, 8) == "68747470" || t.x509ExtName === "subjectAltName" && E == 2) && (p = W(p));
        var o = i + "[" + E + "] " + p + `
`;
        return o;
      }
    }
    return i + "UNKNOWN(" + m + ") " + n(d, r) + `
`;
  }, j.parse = function(e) {
    var t = j, r = t.parse, i = t.isASN1HEX, s = t.getV, n = t.getTLV, h = t.getChildIdx, u = a.asn1, d = u.ASN1Util.oidHexToInt, l = u.x509.OID.oid2name, y = W, p = mt, o = On, c = { "0c": "utf8str", 12: "numstr", 13: "prnstr", 14: "telstr", 16: "ia5str", 17: "utctime", 18: "gentime", "1a": "visstr", "1e": "bmpstr", 30: "seq", 31: "set" }, f = function(S) {
      for (var D = [], R = h(S, 0), T = 0; T < R.length; T++) {
        var K = R[T], P = n(S, K), H = r(P);
        D.push(H);
      }
      return D;
    }, g = e.substr(0, 2), v = {}, x = s(e, 0);
    if (g == "01") return e == "0101ff" ? { bool: true } : { bool: false };
    if (g == "02") return { int: { hex: x } };
    if (g == "03") try {
      if (x.substr(0, 2) != "00") throw "not encap";
      var b = x.substr(2);
      if (!i(b)) throw "not encap";
      return { bitstr: { obj: r(b) } };
    } catch {
      var I = null;
      return x.length <= 10 && (I = zt(x)), I == null ? { bitstr: { hex: x } } : { bitstr: { bin: I } };
    }
    else if (g == "04") try {
      if (!i(x)) throw "not encap";
      return { octstr: { obj: r(x) } };
    } catch {
      return { octstr: { hex: x } };
    }
    else {
      if (g == "05") return { null: "" };
      if (g == "06") {
        var A = d(x), m = l(A);
        return m == "" ? { oid: A } : { oid: m };
      } else {
        if (g == "0a") return x.length > 4 ? { enum: { hex: x } } : { enum: parseInt(x, 16) };
        if (g == "30" || g == "31") return v[c[g]] = f(e), v;
        if (g == "14") {
          var E = o(x);
          return v[c[g]] = { str: E }, v;
        } else if (g == "1e") {
          var E = p(x);
          return v[c[g]] = { str: E }, v;
        } else if (":0c:12:13:16:17:18:1a:".indexOf(g) != -1) {
          var E = y(x);
          return v[c[g]] = { str: E }, v;
        } else if (g.match(/^8[0-9]$/)) {
          var E = y(x);
          return E == null | E == "" ? { tag: { tag: g, explicit: false, hex: x } } : E.match(/[\x00-\x1F\x7F-\x9F]/) != null || E.match(/[\u0000-\u001F\u0080–\u009F]/) != null ? { tag: { tag: g, explicit: false, hex: x } } : { tag: { tag: g, explicit: false, str: E } };
        } else if (g.match(/^a[0-9]$/)) try {
          if (!i(x)) throw new Error("not encap");
          return { tag: { tag: g, explicit: true, obj: r(x) } };
        } catch {
          return { tag: { tag: g, explicit: true, hex: x } };
        }
        else {
          var F = new a.asn1.ASN1Object();
          F.hV = x;
          var w = F.getLengthHexFromValue();
          return { asn1: { tlv: g + w + x } };
        }
      }
    }
  }, j.isContextTag = function(e, t) {
    e = e.toLowerCase();
    var r, i;
    try {
      r = parseInt(e, 16);
    } catch {
      return -1;
    }
    if (t === void 0) return (r & 192) == 128;
    try {
      var s = t.match(/^\[[0-9]+\]$/);
      return s == null || (i = parseInt(t.substr(1, t.length - 1), 10), i > 31) ? false : (r & 192) == 128 && (r & 31) == i;
    } catch {
      return false;
    }
  }, j.isASN1HEX = function(e) {
    var t = j;
    if (e.length % 2 == 1) return false;
    var r = t.getVblen(e, 0), i = e.substr(0, 2), s = t.getL(e, 0), n = e.length - i.length - s.length;
    return n == r * 2;
  }, j.checkStrictDER = function(e, t, r, i, s) {
    var n = j;
    if (r === void 0) {
      if (typeof e != "string") throw new Error("not hex string");
      if (e = e.toLowerCase(), !a.lang.String.isHex(e)) throw new Error("not hex string");
      r = e.length, i = e.length / 2, i < 128 ? s = 1 : s = Math.ceil(i.toString(16)) + 1;
    }
    var h = n.getL(e, t);
    if (h.length > s * 2) throw new Error("L of TLV too long: idx=" + t);
    var u = n.getVblen(e, t);
    if (u > i) throw new Error("value of L too long than hex: idx=" + t);
    var d = n.getTLV(e, t), l = d.length - 2 - n.getL(e, t).length;
    if (l !== u * 2) throw new Error("V string length and L's value not the same:" + l + "/" + u * 2);
    if (t === 0 && e.length != d.length) throw new Error("total length and TLV length unmatch:" + e.length + "!=" + d.length);
    var y = e.substr(t, 2);
    if (y === "02") {
      var p = n.getVidx(e, t);
      if (e.substr(p, 2) == "00" && e.charCodeAt(p + 2) < 56) throw new Error("not least zeros for DER INTEGER");
    }
    if (parseInt(y, 16) & 32) {
      for (var o = n.getVblen(e, t), c = 0, f = n.getChildIdx(e, t), g = 0; g < f.length; g++) {
        var v = n.getTLV(e, f[g]);
        c += v.length, n.checkStrictDER(e, f[g], r, i, s);
      }
      if (o * 2 != c) throw new Error("sum of children's TLV length and L unmatch: " + o * 2 + "!=" + c);
    }
  }, j.oidname = function(e) {
    var t = a.asn1;
    a.lang.String.isHex(e) && (e = t.ASN1Util.oidHexToInt(e));
    var r = t.x509.OID.oid2name(e);
    return r === "" && (r = e), r;
  }, (typeof a > "u" || !a) && (a = {}), (typeof a.asn1 > "u" || !a.asn1) && (a.asn1 = {}), (typeof a.asn1.x509 > "u" || !a.asn1.x509) && (a.asn1.x509 = {}), a.asn1.x509.Certificate = function(e) {
    a.asn1.x509.Certificate.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DERBitString, s = r.DERSequence, n = r.x509, h = n.TBSCertificate, u = n.AlgorithmIdentifier;
    this.params = void 0, this.setByParam = function(d) {
      this.params = d;
    }, this.sign = function() {
      var d = this.params, l = d.sigalg;
      d.sigalg.name != null && (l = d.sigalg.name);
      var y = d.tbsobj.tohex(), p = new a.crypto.Signature({ alg: l });
      p.init(d.cakey), p.updateHex(y), d.sighex = p.sign();
    }, this.getPEM = function() {
      return ue(this.tohex(), "CERTIFICATE");
    }, this.tohex = function() {
      var d = this.params;
      if ((d.tbsobj == null || d.tbsobj == null) && (d.tbsobj = new h(d)), d.sighex == null && d.cakey != null && this.sign(), d.sighex == null) throw new Error("sighex or cakey parameter not defined");
      var l = [];
      l.push(d.tbsobj), l.push(new u({ name: d.sigalg })), l.push(new i({ hex: "00" + d.sighex }));
      var y = new s({ array: l });
      return y.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && (this.params = e);
  }, N(a.asn1.x509.Certificate, a.asn1.ASN1Object), a.asn1.x509.TBSCertificate = function(e) {
    a.asn1.x509.TBSCertificate.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.x509, s = r.DERTaggedObject, n = r.DERInteger, h = r.DERSequence, u = i.AlgorithmIdentifier, d = i.Time, l = i.X500Name, y = i.Extensions, p = i.SubjectPublicKeyInfo;
    this.params = null, this.setByParam = function(o) {
      this.params = o;
    }, this.tohex = function() {
      var o = [], c = this.params;
      if (c.version != null || c.version != 1) {
        var f = 2;
        c.version != null && (f = c.version - 1);
        var g = new s({ obj: new n({ int: f }) });
        o.push(g);
      }
      o.push(new n(c.serial)), o.push(new u({ name: c.sigalg })), o.push(new l(c.issuer)), o.push(new h({ array: [new d(c.notbefore), new d(c.notafter)] })), o.push(new l(c.subject)), o.push(new p(U.getKey(c.sbjpubkey))), c.ext !== void 0 && c.ext.length > 0 && o.push(new s({ tag: "a3", obj: new y(c.ext) }));
      var v = new a.asn1.DERSequence({ array: o });
      return v.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.x509.TBSCertificate, a.asn1.ASN1Object), a.asn1.x509.Extensions = function(e) {
    a.asn1.x509.Extensions.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DERSequence, s = r.x509;
    this.aParam = [], this.setByParam = function(n) {
      this.aParam = n;
    }, this.tohex = function() {
      for (var n = [], h = 0; h < this.aParam.length; h++) {
        var u = this.aParam[h], d = u.extname, l = null;
        if (u.extn != null) l = new s.PrivateExtension(u);
        else if (d == "subjectKeyIdentifier") l = new s.SubjectKeyIdentifier(u);
        else if (d == "keyUsage") l = new s.KeyUsage(u);
        else if (d == "subjectAltName") l = new s.SubjectAltName(u);
        else if (d == "issuerAltName") l = new s.IssuerAltName(u);
        else if (d == "basicConstraints") l = new s.BasicConstraints(u);
        else if (d == "nameConstraints") l = new s.NameConstraints(u);
        else if (d == "cRLDistributionPoints") l = new s.CRLDistributionPoints(u);
        else if (d == "certificatePolicies") l = new s.CertificatePolicies(u);
        else if (d == "authorityKeyIdentifier") l = new s.AuthorityKeyIdentifier(u);
        else if (d == "extKeyUsage") l = new s.ExtKeyUsage(u);
        else if (d == "authorityInfoAccess") l = new s.AuthorityInfoAccess(u);
        else if (d == "cRLNumber") l = new s.CRLNumber(u);
        else if (d == "cRLReason") l = new s.CRLReason(u);
        else if (d == "ocspNonce") l = new s.OCSPNonce(u);
        else if (d == "ocspNoCheck") l = new s.OCSPNoCheck(u);
        else if (d == "adobeTimeStamp") l = new s.AdobeTimeStamp(u);
        else if (d == "subjectDirectoryAttributes") l = new s.SubjectDirectoryAttributes(u);
        else throw new Error("extension not supported:" + JSON.stringify(u));
        l != null && n.push(l);
      }
      var y = new i({ array: n });
      return y.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.x509.Extensions, a.asn1.ASN1Object), a.asn1.x509.Extension = function(e) {
    a.asn1.x509.Extension.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DERObjectIdentifier, s = r.DEROctetString;
    r.DERBitString;
    var n = r.DERBoolean, h = r.DERSequence;
    this.tohex = function() {
      var u = new i({ oid: this.oid }), d = new s({ hex: this.getExtnValueHex() }), l = new Array();
      l.push(u), this.critical && l.push(new n()), l.push(d);
      var y = new h({ array: l });
      return y.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.critical = false, e !== void 0 && e.critical !== void 0 && (this.critical = e.critical);
  }, N(a.asn1.x509.Extension, a.asn1.ASN1Object), a.asn1.x509.KeyUsage = function(e) {
    a.asn1.x509.KeyUsage.superclass.constructor.call(this, e);
    var t = Error, r = { digitalSignature: 0, nonRepudiation: 1, keyEncipherment: 2, dataEncipherment: 3, keyAgreement: 4, keyCertSign: 5, cRLSign: 6, encipherOnly: 7, decipherOnly: 8 };
    this.getExtnValueHex = function() {
      var i = this.getBinValue();
      return this.asn1ExtnValue = new a.asn1.DERBitString({ bin: i }), this.asn1ExtnValue.tohex();
    }, this.getBinValue = function() {
      var i = this.params;
      if (typeof i != "object" || typeof i.names != "object" && typeof i.bin != "string") throw new t("parameter not yet set");
      if (i.names != null) return at(i.names, r);
      if (i.bin != null) return i.bin;
      throw new t("parameter not set properly");
    }, this.oid = "2.5.29.15", e !== void 0 && (this.params = e);
  }, N(a.asn1.x509.KeyUsage, a.asn1.x509.Extension), a.asn1.x509.BasicConstraints = function(e) {
    a.asn1.x509.BasicConstraints.superclass.constructor.call(this, e);
    var t = a.asn1, r = t.DERBoolean, i = t.DERInteger, s = t.DERSequence;
    this.getExtnValueHex = function() {
      var n = new Array();
      this.cA && n.push(new r()), this.pathLen > -1 && n.push(new i({ int: this.pathLen }));
      var h = new s({ array: n });
      return this.asn1ExtnValue = h, this.asn1ExtnValue.tohex();
    }, this.oid = "2.5.29.19", this.cA = false, this.pathLen = -1, e !== void 0 && (e.cA !== void 0 && (this.cA = e.cA), e.pathLen !== void 0 && (this.pathLen = e.pathLen));
  }, N(a.asn1.x509.BasicConstraints, a.asn1.x509.Extension), a.asn1.x509.CRLDistributionPoints = function(e) {
    a.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this, e);
    var t = a, r = t.asn1, i = r.x509;
    this.getExtnValueHex = function() {
      return this.asn1ExtnValue.tohex();
    }, this.setByDPArray = function(s) {
      for (var n = [], h = 0; h < s.length; h++) if (s[h] instanceof a.asn1.ASN1Object) n.push(s[h]);
      else {
        var u = new i.DistributionPoint(s[h]);
        n.push(u);
      }
      this.asn1ExtnValue = new r.DERSequence({ array: n });
    }, this.setByOneURI = function(s) {
      var n = new i.DistributionPoint({ fulluri: s });
      this.setByDPArray([n]);
    }, this.oid = "2.5.29.31", e !== void 0 && (e.array !== void 0 ? this.setByDPArray(e.array) : e.uri !== void 0 && this.setByOneURI(e.uri));
  }, N(a.asn1.x509.CRLDistributionPoints, a.asn1.x509.Extension), a.asn1.x509.DistributionPoint = function(e) {
    a.asn1.x509.DistributionPoint.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.x509.DistributionPointName;
    this.tohex = function() {
      var s = new r.DERSequence();
      if (this.asn1DP != null) {
        var n = new r.DERTaggedObject({ explicit: true, tag: "a0", obj: this.asn1DP });
        s.appendASN1Object(n);
      }
      return this.hTLV = s.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && (e.dpobj !== void 0 ? this.asn1DP = e.dpobj : e.dpname !== void 0 ? this.asn1DP = new i(e.dpname) : e.fulluri !== void 0 && (this.asn1DP = new i({ full: [{ uri: e.fulluri }] })));
  }, N(a.asn1.x509.DistributionPoint, a.asn1.ASN1Object), a.asn1.x509.DistributionPointName = function(e) {
    a.asn1.x509.DistributionPointName.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DERTaggedObject;
    if (this.tohex = function() {
      if (this.type != "full") throw new Error("currently type shall be 'full': " + this.type);
      return this.asn1Obj = new i({ explicit: false, tag: this.tag, obj: this.asn1V }), this.hTLV = this.asn1Obj.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0) if (r.x509.GeneralNames.prototype.isPrototypeOf(e)) this.type = "full", this.tag = "a0", this.asn1V = e;
    else if (e.full !== void 0) this.type = "full", this.tag = "a0", this.asn1V = new r.x509.GeneralNames(e.full);
    else throw new Error("This class supports GeneralNames only as argument");
  }, N(a.asn1.x509.DistributionPointName, a.asn1.ASN1Object), a.asn1.x509.CertificatePolicies = function(e) {
    a.asn1.x509.CertificatePolicies.superclass.constructor.call(this, e);
    var t = a, r = t.asn1, i = r.x509, s = r.DERSequence, n = i.PolicyInformation;
    this.params = null, this.getExtnValueHex = function() {
      for (var h = [], u = 0; u < this.params.array.length; u++) h.push(new n(this.params.array[u]));
      var d = new s({ array: h });
      return this.asn1ExtnValue = d, this.asn1ExtnValue.tohex();
    }, this.oid = "2.5.29.32", e !== void 0 && (this.params = e);
  }, N(a.asn1.x509.CertificatePolicies, a.asn1.x509.Extension), a.asn1.x509.PolicyInformation = function(e) {
    a.asn1.x509.PolicyInformation.superclass.constructor.call(this, e);
    var t = a.asn1, r = t.DERSequence, i = t.DERObjectIdentifier, s = t.x509.PolicyQualifierInfo;
    this.params = null, this.tohex = function() {
      if (this.params.policyoid === void 0 && this.params.array === void 0) throw new Error("parameter oid and array missing");
      var n = [new i(this.params.policyoid)];
      if (this.params.array !== void 0) {
        for (var h = [], u = 0; u < this.params.array.length; u++) h.push(new s(this.params.array[u]));
        h.length > 0 && n.push(new r({ array: h }));
      }
      var d = new r({ array: n });
      return d.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && (this.params = e);
  }, N(a.asn1.x509.PolicyInformation, a.asn1.ASN1Object), a.asn1.x509.PolicyQualifierInfo = function(e) {
    a.asn1.x509.PolicyQualifierInfo.superclass.constructor.call(this, e);
    var t = a.asn1, r = t.DERSequence, i = t.DERIA5String, s = t.DERObjectIdentifier, n = t.x509.UserNotice;
    this.params = null, this.tohex = function() {
      if (this.params.cps !== void 0) {
        var h = new r({ array: [new s({ oid: "1.3.6.1.5.5.7.2.1" }), new i({ str: this.params.cps })] });
        return h.tohex();
      }
      if (this.params.unotice != null) {
        var h = new r({ array: [new s({ oid: "1.3.6.1.5.5.7.2.2" }), new n(this.params.unotice)] });
        return h.tohex();
      }
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && (this.params = e);
  }, N(a.asn1.x509.PolicyQualifierInfo, a.asn1.ASN1Object), a.asn1.x509.UserNotice = function(e) {
    a.asn1.x509.UserNotice.superclass.constructor.call(this, e);
    var t = a.asn1.DERSequence;
    a.asn1.DERInteger;
    var r = a.asn1.x509.DisplayText, i = a.asn1.x509.NoticeReference;
    this.params = null, this.tohex = function() {
      var s = [];
      this.params.noticeref !== void 0 && s.push(new i(this.params.noticeref)), this.params.exptext !== void 0 && s.push(new r(this.params.exptext));
      var n = new t({ array: s });
      return n.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && (this.params = e);
  }, N(a.asn1.x509.UserNotice, a.asn1.ASN1Object), a.asn1.x509.NoticeReference = function(e) {
    a.asn1.x509.NoticeReference.superclass.constructor.call(this, e);
    var t = a.asn1.DERSequence, r = a.asn1.DERInteger, i = a.asn1.x509.DisplayText;
    this.params = null, this.tohex = function() {
      var s = [];
      if (this.params.org !== void 0 && s.push(new i(this.params.org)), this.params.noticenum !== void 0) {
        for (var n = [], h = this.params.noticenum, u = 0; u < h.length; u++) n.push(new r(h[u]));
        s.push(new t({ array: n }));
      }
      if (s.length == 0) throw new Error("parameter is empty");
      var d = new t({ array: s });
      return d.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && (this.params = e);
  }, N(a.asn1.x509.NoticeReference, a.asn1.ASN1Object), a.asn1.x509.DisplayText = function(e) {
    a.asn1.x509.DisplayText.superclass.constructor.call(this, e), this.hT = "0c", e !== void 0 && (e.type === "ia5" ? this.hT = "16" : e.type === "vis" ? this.hT = "1a" : e.type === "bmp" && (this.hT = "1e"));
  }, N(a.asn1.x509.DisplayText, a.asn1.DERAbstractString), a.asn1.x509.NameConstraints = function(e) {
    a.asn1.x509.NameConstraints.superclass.constructor.call(this, e);
    var t = a, r = t.asn1, i = r.x509, s = r.ASN1Util.newObject, n = i.GeneralSubtree;
    this.params = null, this.getExtnValueHex = function() {
      var h = this.params, u = [];
      if (h.permit != null && h.permit.length != null) {
        for (var d = [], l = 0; l < h.permit.length; l++) d.push(new n(h.permit[l]));
        u.push({ tag: { tagi: "a0", obj: { seq: d } } });
      }
      if (h.exclude != null && h.exclude.length != null) {
        for (var y = [], l = 0; l < h.exclude.length; l++) y.push(new n(h.exclude[l]));
        u.push({ tag: { tagi: "a1", obj: { seq: y } } });
      }
      return this.asn1ExtnValue = s({ seq: u }), this.asn1ExtnValue.tohex();
    }, this.oid = "2.5.29.30", e !== void 0 && (this.params = e);
  }, N(a.asn1.x509.NameConstraints, a.asn1.x509.Extension), a.asn1.x509.GeneralSubtree = function(e) {
    a.asn1.x509.GeneralSubtree.superclass.constructor.call(this);
    var t = a.asn1, r = t.x509, i = r.GeneralName, s = t.ASN1Util.newObject;
    this.params = null, this.setByParam = function(n) {
      this.params = n;
    }, this.tohex = function() {
      var n = this.params, h = [new i(n)];
      n.min != null && h.push({ tag: { tagi: "80", obj: { int: n.min } } }), n.max != null && h.push({ tag: { tagi: "81", obj: { int: n.max } } });
      var u = s({ seq: h });
      return u.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.x509.GeneralSubtree, a.asn1.ASN1Object), a.asn1.x509.ExtKeyUsage = function(e) {
    a.asn1.x509.ExtKeyUsage.superclass.constructor.call(this, e);
    var t = a, r = t.asn1;
    this.setPurposeArray = function(i) {
      this.asn1ExtnValue = new r.DERSequence();
      for (var s = 0; s < i.length; s++) {
        var n = new r.DERObjectIdentifier(i[s]);
        this.asn1ExtnValue.appendASN1Object(n);
      }
    }, this.getExtnValueHex = function() {
      return this.asn1ExtnValue.tohex();
    }, this.oid = "2.5.29.37", e !== void 0 && e.array !== void 0 && this.setPurposeArray(e.array);
  }, N(a.asn1.x509.ExtKeyUsage, a.asn1.x509.Extension), a.asn1.x509.AuthorityKeyIdentifier = function(e) {
    a.asn1.x509.AuthorityKeyIdentifier.superclass.constructor.call(this, e);
    var t = a, r = t.asn1, i = r.DERTaggedObject, s = r.x509.GeneralNames;
    t.crypto.Util.isKey, this.asn1KID = null, this.asn1CertIssuer = null, this.asn1CertSN = null, this.getExtnValueHex = function() {
      var n = new Array();
      this.asn1KID && n.push(new i({ explicit: false, tag: "80", obj: this.asn1KID })), this.asn1CertIssuer && n.push(new i({ explicit: false, tag: "a1", obj: new s([{ dn: this.asn1CertIssuer }]) })), this.asn1CertSN && n.push(new i({ explicit: false, tag: "82", obj: this.asn1CertSN }));
      var h = new r.DERSequence({ array: n });
      return this.asn1ExtnValue = h, this.asn1ExtnValue.tohex();
    }, this.setKIDByParam = function(n) {
      if (n.str !== void 0 || n.hex !== void 0) this.asn1KID = new a.asn1.DEROctetString(n);
      else if (typeof n == "object" && a.crypto.Util.isKey(n) || typeof n == "string" && n.indexOf("BEGIN ") != -1) {
        var h = n;
        typeof n == "string" && (h = U.getKey(n));
        var u = U.getKeyID(h);
        this.asn1KID = new a.asn1.DEROctetString({ hex: u });
      }
    }, this.setCertIssuerByParam = function(n) {
      n.str !== void 0 || n.ldapstr !== void 0 || n.hex !== void 0 || n.certsubject !== void 0 || n.certissuer !== void 0 ? this.asn1CertIssuer = new a.asn1.x509.X500Name(n) : typeof n == "string" && n.indexOf("BEGIN ") != -1 && n.indexOf("CERTIFICATE") != -1 && (this.asn1CertIssuer = new a.asn1.x509.X500Name({ certissuer: n }));
    }, this.setCertSNByParam = function(n) {
      if (n.str !== void 0 || n.bigint !== void 0 || n.hex !== void 0) this.asn1CertSN = new a.asn1.DERInteger(n);
      else if (typeof n == "string" && n.indexOf("BEGIN ") != -1 && n.indexOf("CERTIFICATE")) {
        var h = new k();
        h.readCertPEM(n);
        var u = h.getSerialNumberHex();
        this.asn1CertSN = new a.asn1.DERInteger({ hex: u });
      }
    }, this.oid = "2.5.29.35", e !== void 0 && (e.kid !== void 0 && this.setKIDByParam(e.kid), e.issuer !== void 0 && this.setCertIssuerByParam(e.issuer), e.sn !== void 0 && this.setCertSNByParam(e.sn), e.issuersn !== void 0 && typeof e.issuersn == "string" && e.issuersn.indexOf("BEGIN ") != -1 && e.issuersn.indexOf("CERTIFICATE") && (this.setCertSNByParam(e.issuersn), this.setCertIssuerByParam(e.issuersn)));
  }, N(a.asn1.x509.AuthorityKeyIdentifier, a.asn1.x509.Extension), a.asn1.x509.SubjectKeyIdentifier = function(e) {
    a.asn1.x509.SubjectKeyIdentifier.superclass.constructor.call(this, e);
    var t = a, r = t.asn1, i = r.DEROctetString;
    this.asn1KID = null, this.getExtnValueHex = function() {
      return this.asn1ExtnValue = this.asn1KID, this.asn1ExtnValue.tohex();
    }, this.setKIDByParam = function(s) {
      if (s.str !== void 0 || s.hex !== void 0) this.asn1KID = new i(s);
      else if (typeof s == "object" && a.crypto.Util.isKey(s) || typeof s == "string" && s.indexOf("BEGIN") != -1) {
        var n = s;
        typeof s == "string" && (n = U.getKey(s));
        var h = U.getKeyID(n);
        this.asn1KID = new a.asn1.DEROctetString({ hex: h });
      }
    }, this.oid = "2.5.29.14", e !== void 0 && e.kid !== void 0 && this.setKIDByParam(e.kid);
  }, N(a.asn1.x509.SubjectKeyIdentifier, a.asn1.x509.Extension), a.asn1.x509.AuthorityInfoAccess = function(e) {
    a.asn1.x509.AuthorityInfoAccess.superclass.constructor.call(this, e), this.setAccessDescriptionArray = function(t) {
      for (var r = new Array(), i = a, s = i.asn1, n = s.DERSequence, h = s.DERObjectIdentifier, u = s.x509.GeneralName, d = 0; d < t.length; d++) {
        var l, y = t[d];
        if (y.ocsp !== void 0) l = new n({ array: [new h({ oid: "1.3.6.1.5.5.7.48.1" }), new u({ uri: y.ocsp })] });
        else if (y.caissuer !== void 0) l = new n({ array: [new h({ oid: "1.3.6.1.5.5.7.48.2" }), new u({ uri: y.caissuer })] });
        else throw new Error("unknown AccessMethod parameter: " + JSON.stringify(y));
        r.push(l);
      }
      this.asn1ExtnValue = new n({ array: r });
    }, this.getExtnValueHex = function() {
      return this.asn1ExtnValue.tohex();
    }, this.oid = "1.3.6.1.5.5.7.1.1", e !== void 0 && e.array !== void 0 && this.setAccessDescriptionArray(e.array);
  }, N(a.asn1.x509.AuthorityInfoAccess, a.asn1.x509.Extension), a.asn1.x509.SubjectAltName = function(e) {
    a.asn1.x509.SubjectAltName.superclass.constructor.call(this, e), this.setNameArray = function(t) {
      this.asn1ExtnValue = new a.asn1.x509.GeneralNames(t);
    }, this.getExtnValueHex = function() {
      return this.asn1ExtnValue.tohex();
    }, this.oid = "2.5.29.17", e !== void 0 && e.array !== void 0 && this.setNameArray(e.array);
  }, N(a.asn1.x509.SubjectAltName, a.asn1.x509.Extension), a.asn1.x509.IssuerAltName = function(e) {
    a.asn1.x509.IssuerAltName.superclass.constructor.call(this, e), this.setNameArray = function(t) {
      this.asn1ExtnValue = new a.asn1.x509.GeneralNames(t);
    }, this.getExtnValueHex = function() {
      return this.asn1ExtnValue.tohex();
    }, this.oid = "2.5.29.18", e !== void 0 && e.array !== void 0 && this.setNameArray(e.array);
  }, N(a.asn1.x509.IssuerAltName, a.asn1.x509.Extension), a.asn1.x509.SubjectDirectoryAttributes = function(e) {
    a.asn1.x509.SubjectDirectoryAttributes.superclass.constructor.call(this, e);
    var t = a.asn1, r = t.DERSequence, i = t.ASN1Util.newObject, s = t.x509.OID.name2oid;
    this.params = null, this.getExtnValueHex = function() {
      for (var n = [], h = 0; h < this.params.array.length; h++) {
        var u = this.params.array[h], d = { seq: [{ oid: "1.2.3.4" }, { set: [{ utf8str: "DE" }] }] };
        if (u.attr == "dateOfBirth") d.seq[0].oid = s(u.attr), d.seq[1].set[0] = { gentime: u.str };
        else if (u.attr == "placeOfBirth") d.seq[0].oid = s(u.attr), d.seq[1].set[0] = { utf8str: u.str };
        else if (u.attr == "gender") d.seq[0].oid = s(u.attr), d.seq[1].set[0] = { prnstr: u.str };
        else if (u.attr == "countryOfCitizenship") d.seq[0].oid = s(u.attr), d.seq[1].set[0] = { prnstr: u.str };
        else if (u.attr == "countryOfResidence") d.seq[0].oid = s(u.attr), d.seq[1].set[0] = { prnstr: u.str };
        else throw new Error("unsupported attribute: " + u.attr);
        n.push(new i(d));
      }
      var l = new r({ array: n });
      return this.asn1ExtnValue = l, this.asn1ExtnValue.tohex();
    }, this.oid = "2.5.29.9", e !== void 0 && (this.params = e);
  }, N(a.asn1.x509.SubjectDirectoryAttributes, a.asn1.x509.Extension), a.asn1.x509.PrivateExtension = function(e) {
    a.asn1.x509.PrivateExtension.superclass.constructor.call(this, e);
    var t = a, r = t.lang.String.isHex, i = t.asn1, s = i.x509.OID.name2oid, n = i.ASN1Util.newObject;
    this.params = null, this.setByParam = function(h) {
      this.oid = s(h.extname), this.params = h;
    }, this.getExtnValueHex = function() {
      if (this.params.extname == null || this.params.extn == null) throw new Error("extname or extnhex not specified");
      var h = this.params.extn;
      if (typeof h == "string" && r(h)) return h;
      if (typeof h == "object") try {
        return n(h).tohex();
      } catch {
      }
      throw new Error("unsupported extn value");
    }, e != null && this.setByParam(e);
  }, N(a.asn1.x509.PrivateExtension, a.asn1.x509.Extension), a.asn1.x509.CRL = function(e) {
    a.asn1.x509.CRL.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DERSequence, s = r.DERBitString, n = r.x509, h = n.AlgorithmIdentifier, u = n.TBSCertList;
    this.params = void 0, this.setByParam = function(d) {
      this.params = d;
    }, this.sign = function() {
      var d = new u(this.params).tohex(), l = new a.crypto.Signature({ alg: this.params.sigalg });
      l.init(this.params.cakey), l.updateHex(d);
      var y = l.sign();
      this.params.sighex = y;
    }, this.getPEM = function() {
      return ue(this.tohex(), "X509 CRL");
    }, this.tohex = function() {
      var d = this.params;
      if (d.tbsobj == null && (d.tbsobj = new u(d)), d.sighex == null && d.cakey != null && this.sign(), d.sighex == null) throw new Error("sighex or cakey parameter not defined");
      var l = [];
      l.push(d.tbsobj), l.push(new h({ name: d.sigalg })), l.push(new s({ hex: "00" + d.sighex }));
      var y = new i({ array: l });
      return y.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && (this.params = e);
  }, N(a.asn1.x509.CRL, a.asn1.ASN1Object), a.asn1.x509.TBSCertList = function(e) {
    a.asn1.x509.TBSCertList.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DERInteger, s = r.DERSequence, n = r.DERTaggedObject;
    r.DERObjectIdentifier;
    var h = r.x509, u = h.AlgorithmIdentifier, d = h.Time, l = h.Extensions, y = h.X500Name;
    this.params = null, this.setByParam = function(p) {
      this.params = p;
    }, this.getRevCertSequence = function() {
      for (var p = [], o = this.params.revcert, c = 0; c < o.length; c++) {
        var f = [new i(o[c].sn), new d(o[c].date)];
        o[c].ext != null && f.push(new l(o[c].ext)), p.push(new s({ array: f }));
      }
      return new s({ array: p });
    }, this.tohex = function() {
      var p = [], o = this.params;
      if (o.version != null) {
        var c = o.version - 1, f = new i({ int: c });
        p.push(f);
      }
      if (p.push(new u({ name: o.sigalg })), p.push(new y(o.issuer)), p.push(new d(o.thisupdate)), o.nextupdate != null && p.push(new d(o.nextupdate)), o.revcert != null && p.push(this.getRevCertSequence()), o.ext != null) {
        var g = new l(o.ext);
        p.push(new n({ tag: "a0", explicit: true, obj: g }));
      }
      var v = new s({ array: p });
      return v.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.x509.TBSCertList, a.asn1.ASN1Object), a.asn1.x509.CRLEntry = function(e) {
    a.asn1.x509.CRLEntry.superclass.constructor.call(this);
    var t = a, r = t.asn1;
    this.setCertSerial = function(i) {
      this.sn = new r.DERInteger(i);
    }, this.setRevocationDate = function(i) {
      this.time = new r.x509.Time(i);
    }, this.tohex = function() {
      var i = new r.DERSequence({ array: [this.sn, this.time] });
      return this.TLV = i.tohex(), this.TLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && (e.time !== void 0 && this.setRevocationDate(e.time), e.sn !== void 0 && this.setCertSerial(e.sn));
  }, N(a.asn1.x509.CRLEntry, a.asn1.ASN1Object), a.asn1.x509.CRLNumber = function(e) {
    a.asn1.x509.CRLNumber.superclass.constructor.call(this, e), this.params = void 0, this.getExtnValueHex = function() {
      return this.asn1ExtnValue = new a.asn1.DERInteger(this.params.num), this.asn1ExtnValue.tohex();
    }, this.oid = "2.5.29.20", e != null && (this.params = e);
  }, N(a.asn1.x509.CRLNumber, a.asn1.x509.Extension), a.asn1.x509.CRLReason = function(e) {
    a.asn1.x509.CRLReason.superclass.constructor.call(this, e), this.params = void 0, this.getExtnValueHex = function() {
      return this.asn1ExtnValue = new a.asn1.DEREnumerated(this.params.code), this.asn1ExtnValue.tohex();
    }, this.oid = "2.5.29.21", e != null && (this.params = e);
  }, N(a.asn1.x509.CRLReason, a.asn1.x509.Extension), a.asn1.x509.OCSPNonce = function(e) {
    a.asn1.x509.OCSPNonce.superclass.constructor.call(this, e), this.params = void 0, this.getExtnValueHex = function() {
      return this.asn1ExtnValue = new a.asn1.DEROctetString(this.params), this.asn1ExtnValue.tohex();
    }, this.oid = "1.3.6.1.5.5.7.48.1.2", e != null && (this.params = e);
  }, N(a.asn1.x509.OCSPNonce, a.asn1.x509.Extension), a.asn1.x509.OCSPNoCheck = function(e) {
    a.asn1.x509.OCSPNoCheck.superclass.constructor.call(this, e), this.params = void 0, this.getExtnValueHex = function() {
      return this.asn1ExtnValue = new a.asn1.DERNull(), this.asn1ExtnValue.tohex();
    }, this.oid = "1.3.6.1.5.5.7.48.1.5", e != null && (this.params = e);
  }, N(a.asn1.x509.OCSPNoCheck, a.asn1.x509.Extension), a.asn1.x509.AdobeTimeStamp = function(e) {
    a.asn1.x509.AdobeTimeStamp.superclass.constructor.call(this, e);
    var t = a, r = t.asn1, i = r.DERInteger, s = r.DERBoolean, n = r.DERSequence, h = r.x509.GeneralName;
    this.params = null, this.getExtnValueHex = function() {
      var u = this.params, d = [new i(1)];
      return d.push(new h({ uri: u.uri })), u.reqauth != null && d.push(new s(u.reqauth)), this.asn1ExtnValue = new n({ array: d }), this.asn1ExtnValue.tohex();
    }, this.oid = "1.2.840.113583.1.1.9.1", e !== void 0 && this.setByParam(e);
  }, N(a.asn1.x509.AdobeTimeStamp, a.asn1.x509.Extension), a.asn1.x509.X500Name = function(e) {
    a.asn1.x509.X500Name.superclass.constructor.call(this), this.asn1Array = [], this.paramArray = [], this.sRule = "utf8";
    var t = a, r = t.asn1, i = r.x509, s = i.RDN;
    this.setByString = function(n, h) {
      h !== void 0 && (this.sRule = h);
      var u = n.split("/");
      u.shift();
      for (var d = [], l = 0; l < u.length; l++) if (u[l].match(/^[^=]+=.+$/)) d.push(u[l]);
      else {
        var y = d.length - 1;
        d[y] = d[y] + "/" + u[l];
      }
      for (var l = 0; l < d.length; l++) this.asn1Array.push(new s({ str: d[l], rule: this.sRule }));
    }, this.setByLdapString = function(n, h) {
      h !== void 0 && (this.sRule = h);
      var u = i.X500Name.ldapToCompat(n);
      this.setByString(u, h);
    }, this.setByObject = function(n, h) {
      h !== void 0 && (this.sRule = h);
      for (var u in n) if (n.hasOwnProperty(u)) {
        var d = new s({ str: u + "=" + n[u], rule: this.sRule });
        this.asn1Array ? this.asn1Array.push(d) : this.asn1Array = [d];
      }
    }, this.setByParam = function(n) {
      if (n.rule !== void 0 && (this.sRule = n.rule), n.array !== void 0) this.paramArray = n.array;
      else if (n.str !== void 0) this.setByString(n.str);
      else if (n.ldapstr !== void 0) this.setByLdapString(n.ldapstr);
      else if (n.hex !== void 0) this.hTLV = n.hex;
      else if (n.certissuer !== void 0) {
        var h = new k();
        h.readCertPEM(n.certissuer), this.hTLV = h.getIssuerHex();
      } else if (n.certsubject !== void 0) {
        var h = new k();
        h.readCertPEM(n.certsubject), this.hTLV = h.getSubjectHex();
      } else typeof n == "object" && n.certsubject === void 0 && n.certissuer === void 0 && this.setByObject(n);
    }, this.tohex = function() {
      if (typeof this.hTLV == "string") return this.hTLV;
      if (this.asn1Array.length == 0 && this.paramArray.length > 0) for (var n = 0; n < this.paramArray.length; n++) {
        var h = { array: this.paramArray[n] };
        this.sRule != "utf8" && (h.rule = this.sRule);
        var u = new s(h);
        this.asn1Array.push(u);
      }
      var d = new r.DERSequence({ array: this.asn1Array });
      return this.hTLV = d.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.x509.X500Name, a.asn1.ASN1Object), a.asn1.x509.X500Name.compatToLDAP = function(e) {
    if (e.substr(0, 1) !== "/") throw "malformed input";
    e = e.substr(1);
    var t = e.split("/");
    return t.reverse(), t = t.map(function(r) {
      return r.replace(/,/, "\\,");
    }), t.join(",");
  }, a.asn1.x509.X500Name.onelineToLDAP = function(e) {
    return a.asn1.x509.X500Name.compatToLDAP(e);
  }, a.asn1.x509.X500Name.ldapToCompat = function(e) {
    for (var t = e.split(","), r = false, i = [], s = 0; t.length > 0; s++) {
      var n = t.shift();
      if (r === true) {
        var h = i.pop(), u = (h + "," + n).replace(/\\,/g, ",");
        i.push(u), r = false;
      } else i.push(n);
      n.substr(-1, 1) === "\\" && (r = true);
    }
    return i = i.map(function(d) {
      return d.replace("/", "\\/");
    }), i.reverse(), "/" + i.join("/");
  }, a.asn1.x509.X500Name.ldapToOneline = function(e) {
    return a.asn1.x509.X500Name.ldapToCompat(e);
  }, a.asn1.x509.RDN = function(e) {
    a.asn1.x509.RDN.superclass.constructor.call(this), this.asn1Array = [], this.paramArray = [], this.sRule = "utf8";
    var t = a.asn1.x509.AttributeTypeAndValue;
    this.setByParam = function(r) {
      r.rule !== void 0 && (this.sRule = r.rule), r.str !== void 0 && this.addByMultiValuedString(r.str), r.array !== void 0 && (this.paramArray = r.array);
    }, this.addByString = function(r) {
      this.asn1Array.push(new a.asn1.x509.AttributeTypeAndValue({ str: r, rule: this.sRule }));
    }, this.addByMultiValuedString = function(r) {
      for (var i = a.asn1.x509.RDN.parseString(r), s = 0; s < i.length; s++) this.addByString(i[s]);
    }, this.tohex = function() {
      if (this.asn1Array.length == 0 && this.paramArray.length > 0) for (var r = 0; r < this.paramArray.length; r++) {
        var i = this.paramArray[r];
        i.rule !== void 0 && this.sRule != "utf8" && (i.rule = this.sRule);
        var s = new t(i);
        this.asn1Array.push(s);
      }
      var n = new a.asn1.DERSet({ array: this.asn1Array });
      return this.TLV = n.tohex(), this.TLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.x509.RDN, a.asn1.ASN1Object), a.asn1.x509.RDN.parseString = function(e) {
    for (var t = e.split(/\+/), r = false, i = [], s = 0; t.length > 0; s++) {
      var n = t.shift();
      if (r === true) {
        var h = i.pop(), u = (h + "+" + n).replace(/\\\+/g, "+");
        i.push(u), r = false;
      } else i.push(n);
      n.substr(-1, 1) === "\\" && (r = true);
    }
    for (var d = false, l = [], s = 0; i.length > 0; s++) {
      var n = i.shift();
      if (d === true) {
        var y = l.pop();
        if (n.match(/"$/)) {
          var u = (y + "+" + n).replace(/^([^=]+)="(.*)"$/, "$1=$2");
          l.push(u), d = false;
        } else l.push(y + "+" + n);
      } else l.push(n);
      n.match(/^[^=]+="/) && (d = true);
    }
    return l;
  }, a.asn1.x509.AttributeTypeAndValue = function(e) {
    a.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this), this.sRule = "utf8", this.sType = null, this.sValue = null, this.dsType = null;
    var t = a, r = t.asn1, i = r.DERSequence, s = r.DERUTF8String, n = r.DERPrintableString, h = r.DERTeletexString, u = r.DERIA5String, d = r.DERVisibleString, l = r.DERBMPString, y = t.lang.String.isMail, p = t.lang.String.isPrintable;
    this.setByParam = function(o) {
      if (o.rule !== void 0 && (this.sRule = o.rule), o.ds !== void 0 && (this.dsType = o.ds), o.value === void 0 && o.str !== void 0) {
        var c = o.str, f = c.match(/^([^=]+)=(.+)$/);
        if (f) this.sType = f[1], this.sValue = f[2];
        else throw new Error("malformed attrTypeAndValueStr: " + attrTypeAndValueStr);
      } else this.sType = o.type, this.sValue = o.value;
    }, this.setByString = function(o, c) {
      c !== void 0 && (this.sRule = c);
      var f = o.match(/^([^=]+)=(.+)$/);
      if (f) this.setByAttrTypeAndValueStr(f[1], f[2]);
      else throw new Error("malformed attrTypeAndValueStr: " + attrTypeAndValueStr);
    }, this._getDsType = function() {
      var o = this.sType, c = this.sValue, f = this.sRule;
      return f === "prn" ? o == "CN" && y(c) ? "ia5" : p(c) ? "prn" : "utf8" : f === "utf8" ? o == "CN" && y(c) ? "ia5" : o == "C" ? "prn" : "utf8" : "utf8";
    }, this.setByAttrTypeAndValueStr = function(o, c, f) {
      f !== void 0 && (this.sRule = f), this.sType = o, this.sValue = c;
    }, this.getValueObj = function(o, c) {
      if (o == "utf8") return new s({ str: c });
      if (o == "prn") return new n({ str: c });
      if (o == "tel") return new h({ str: c });
      if (o == "ia5") return new u({ str: c });
      if (o == "vis") return new d({ str: c });
      if (o == "bmp") return new l({ str: c });
      throw new Error("unsupported directory string type: type=" + o + " value=" + c);
    }, this.tohex = function() {
      this.dsType == null && (this.dsType = this._getDsType());
      var o = a.asn1.x509.OID.atype2obj(this.sType), c = this.getValueObj(this.dsType, this.sValue), f = new i({ array: [o, c] });
      return this.TLV = f.tohex(), this.TLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.x509.AttributeTypeAndValue, a.asn1.ASN1Object), a.asn1.x509.SubjectPublicKeyInfo = function(e) {
    a.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DERInteger, s = r.DERBitString, n = r.DERObjectIdentifier, h = r.DERSequence, u = r.ASN1Util.newObject, d = r.x509, l = d.AlgorithmIdentifier, y = t.crypto;
    y.ECDSA, y.DSA, this.getASN1Object = function() {
      if (this.asn1AlgId == null || this.asn1SubjPKey == null) throw "algId and/or subjPubKey not set";
      var p = new h({ array: [this.asn1AlgId, this.asn1SubjPKey] });
      return p;
    }, this.tohex = function() {
      var p = this.getASN1Object();
      return this.hTLV = p.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.setPubKey = function(p) {
      try {
        if (p instanceof q) {
          var o = u({ seq: [{ int: { bigint: p.n } }, { int: { int: p.e } }] }), c = o.tohex();
          this.asn1AlgId = new l({ name: "rsaEncryption" }), this.asn1SubjPKey = new s({ hex: "00" + c });
        }
      } catch {
      }
      try {
        if (p instanceof a.crypto.ECDSA) {
          var f = new n({ name: p.curveName });
          this.asn1AlgId = new l({ name: "ecPublicKey", asn1params: f }), this.asn1SubjPKey = new s({ hex: "00" + p.pubKeyHex });
        }
      } catch {
      }
      try {
        if (p instanceof a.crypto.DSA) {
          var f = new u({ seq: [{ int: { bigint: p.p } }, { int: { bigint: p.q } }, { int: { bigint: p.g } }] });
          this.asn1AlgId = new l({ name: "dsa", asn1params: f });
          var g = new i({ bigint: p.y });
          this.asn1SubjPKey = new s({ hex: "00" + g.tohex() });
        }
      } catch {
      }
    }, e !== void 0 && this.setPubKey(e);
  }, N(a.asn1.x509.SubjectPublicKeyInfo, a.asn1.ASN1Object), a.asn1.x509.Time = function(e) {
    a.asn1.x509.Time.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DERUTCTime, s = r.DERGeneralizedTime;
    this.params = null, this.type = null, this.setTimeParams = function(n) {
      this.timeParams = n;
    }, this.setByParam = function(n) {
      this.params = n;
    }, this.getType = function(n) {
      return n.match(/^[0-9]{12}Z$/) ? "utc" : n.match(/^[0-9]{14}Z$/) ? "gen" : n.match(/^[0-9]{12}\.[0-9]+Z$/) ? "utc" : n.match(/^[0-9]{14}\.[0-9]+Z$/) ? "gen" : null;
    }, this.tohex = function() {
      var n = this.params, h = null;
      if (typeof n == "string" && (n = { str: n }), n != null && n.str && (n.type == null || n.type == null) && (n.type = this.getType(n.str)), n != null && n.str ? (n.type == "utc" && (h = new i(n.str)), n.type == "gen" && (h = new s(n.str))) : this.type == "gen" ? h = new s() : h = new i(), h == null) throw new Error("wrong setting for Time");
      return this.TLV = h.tohex(), this.TLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, a.asn1.x509.Time_bak = function(e) {
    a.asn1.x509.Time_bak.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DERUTCTime, s = r.DERGeneralizedTime;
    this.setTimeParams = function(n) {
      this.timeParams = n;
    }, this.tohex = function() {
      var n = null;
      return this.timeParams != null ? this.type == "utc" ? n = new i(this.timeParams) : n = new s(this.timeParams) : this.type == "utc" ? n = new i() : n = new s(), this.TLV = n.tohex(), this.TLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.type = "utc", e !== void 0 && (e.type !== void 0 ? this.type = e.type : e.str !== void 0 && (e.str.match(/^[0-9]{12}Z$/) && (this.type = "utc"), e.str.match(/^[0-9]{14}Z$/) && (this.type = "gen")), this.timeParams = e);
  }, N(a.asn1.x509.Time, a.asn1.ASN1Object), a.asn1.x509.AlgorithmIdentifier = function(e) {
    a.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this), this.nameAlg = null, this.asn1Alg = null, this.asn1Params = null, this.paramEmpty = false;
    var t = a, r = t.asn1, i = r.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV;
    if (this.tohex = function() {
      if (this.nameAlg === null && this.asn1Alg === null) throw new Error("algorithm not specified");
      if (this.nameAlg !== null) {
        var n = null;
        for (var h in i) h === this.nameAlg && (n = i[h]);
        if (n !== null) return this.hTLV = n, this.hTLV;
      }
      this.nameAlg !== null && this.asn1Alg === null && (this.asn1Alg = r.x509.OID.name2obj(this.nameAlg));
      var u = [this.asn1Alg];
      this.asn1Params !== null && u.push(this.asn1Params);
      var d = new r.DERSequence({ array: u });
      return this.hTLV = d.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && (e.name !== void 0 && (this.nameAlg = e.name), e.asn1params !== void 0 && (this.asn1Params = e.asn1params), e.paramempty !== void 0 && (this.paramEmpty = e.paramempty)), this.asn1Params === null && this.paramEmpty === false && this.nameAlg !== null) {
      this.nameAlg.name !== void 0 && (this.nameAlg = this.nameAlg.name);
      var s = this.nameAlg.toLowerCase();
      s.substr(-7, 7) !== "withdsa" && s.substr(-9, 9) !== "withecdsa" && (this.asn1Params = new r.DERNull());
    }
  }, N(a.asn1.x509.AlgorithmIdentifier, a.asn1.ASN1Object), a.asn1.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV = { SHAwithRSAandMGF1: "300d06092a864886f70d01010a3000", SHA256withRSAandMGF1: "303d06092a864886f70d01010a3030a00d300b0609608648016503040201a11a301806092a864886f70d010108300b0609608648016503040201a203020120", SHA384withRSAandMGF1: "303d06092a864886f70d01010a3030a00d300b0609608648016503040202a11a301806092a864886f70d010108300b0609608648016503040202a203020130", SHA512withRSAandMGF1: "303d06092a864886f70d01010a3030a00d300b0609608648016503040203a11a301806092a864886f70d010108300b0609608648016503040203a203020140" }, a.asn1.x509.GeneralName = function(e) {
    a.asn1.x509.GeneralName.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.x509, s = i.X500Name, n = i.OtherName, h = r.DERIA5String;
    r.DERPrintableString;
    var u = r.DEROctetString, d = r.DERTaggedObject, l = r.ASN1Object, y = Error;
    this.params = null, this.setByParam = function(p) {
      this.params = p;
    }, this.tohex = function() {
      var p = this.params, o, f, c, f = false;
      if (p.other !== void 0) o = "a0", c = new n(p.other);
      else if (p.rfc822 !== void 0) o = "81", c = new h({ str: p.rfc822 });
      else if (p.dns !== void 0) o = "82", c = new h({ str: p.dns });
      else if (p.dn !== void 0) o = "a4", f = true, typeof p.dn == "string" ? c = new s({ str: p.dn }) : p.dn instanceof a.asn1.x509.X500Name ? c = p.dn : c = new s(p.dn);
      else if (p.ldapdn !== void 0) o = "a4", f = true, c = new s({ ldapstr: p.ldapdn });
      else if (p.certissuer !== void 0 || p.certsubj !== void 0) {
        o = "a4", f = true;
        var g, v, x = null;
        if (p.certsubj !== void 0 ? (g = false, v = p.certsubj) : (g = true, v = p.certissuer), v.match(/^[0-9A-Fa-f]+$/), v.indexOf("-----BEGIN ") != -1 && (x = ie(v)), x == null) throw new Error("certsubj/certissuer not cert");
        var b = new k();
        b.hex = x;
        var I;
        g ? I = b.getIssuerHex() : I = b.getSubjectHex(), c = new l(), c.hTLV = I;
      } else if (p.uri !== void 0) o = "86", c = new h({ str: p.uri });
      else if (p.ip !== void 0) {
        o = "87";
        var A, m = p.ip;
        try {
          if (m.match(/^[0-9a-f]+$/)) {
            var E = m.length;
            if (E == 8 || E == 16 || E == 32 || E == 64) A = m;
            else throw "err";
          } else A = yt(m);
        } catch (w) {
          throw new y("malformed IP address: " + p.ip + ":" + w.message);
        }
        c = new u({ hex: A });
      } else throw new y("improper params");
      var F = new d({ tag: o, explicit: f, obj: c });
      return F.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.x509.GeneralName, a.asn1.ASN1Object), a.asn1.x509.GeneralNames = function(e) {
    a.asn1.x509.GeneralNames.superclass.constructor.call(this);
    var t = a, r = t.asn1;
    this.setByParamArray = function(i) {
      for (var s = 0; s < i.length; s++) {
        var n = new r.x509.GeneralName(i[s]);
        this.asn1Array.push(n);
      }
    }, this.tohex = function() {
      var i = new r.DERSequence({ array: this.asn1Array });
      return i.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.asn1Array = new Array(), typeof e < "u" && this.setByParamArray(e);
  }, N(a.asn1.x509.GeneralNames, a.asn1.ASN1Object), a.asn1.x509.OtherName = function(e) {
    a.asn1.x509.OtherName.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DERObjectIdentifier, s = r.DERSequence, n = r.ASN1Util.newObject;
    this.params = null, this.setByParam = function(h) {
      this.params = h;
    }, this.tohex = function() {
      var h = this.params;
      if (h.oid == null || h.value == null) throw new Error("oid or value not specified");
      var u = new i({ oid: h.oid }), d = n({ tag: { tag: "a0", explicit: true, obj: h.value } }), l = new s({ array: [u, d] });
      return l.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.x509.OtherName, a.asn1.ASN1Object), a.asn1.x509.OID = new function() {
    var e = a.asn1.DERObjectIdentifier;
    this.name2oidList = { sha1: "1.3.14.3.2.26", sha256: "2.16.840.1.101.3.4.2.1", sha384: "2.16.840.1.101.3.4.2.2", sha512: "2.16.840.1.101.3.4.2.3", sha224: "2.16.840.1.101.3.4.2.4", md5: "1.2.840.113549.2.5", md2: "1.3.14.7.2.2.1", ripemd160: "1.3.36.3.2.1", MD2withRSA: "1.2.840.113549.1.1.2", MD4withRSA: "1.2.840.113549.1.1.3", MD5withRSA: "1.2.840.113549.1.1.4", SHA1withRSA: "1.2.840.113549.1.1.5", "pkcs1-MGF": "1.2.840.113549.1.1.8", rsaPSS: "1.2.840.113549.1.1.10", SHA224withRSA: "1.2.840.113549.1.1.14", SHA256withRSA: "1.2.840.113549.1.1.11", SHA384withRSA: "1.2.840.113549.1.1.12", SHA512withRSA: "1.2.840.113549.1.1.13", SHA1withECDSA: "1.2.840.10045.4.1", SHA224withECDSA: "1.2.840.10045.4.3.1", SHA256withECDSA: "1.2.840.10045.4.3.2", SHA384withECDSA: "1.2.840.10045.4.3.3", SHA512withECDSA: "1.2.840.10045.4.3.4", dsa: "1.2.840.10040.4.1", SHA1withDSA: "1.2.840.10040.4.3", SHA224withDSA: "2.16.840.1.101.3.4.3.1", SHA256withDSA: "2.16.840.1.101.3.4.3.2", rsaEncryption: "1.2.840.113549.1.1.1", commonName: "2.5.4.3", countryName: "2.5.4.6", localityName: "2.5.4.7", stateOrProvinceName: "2.5.4.8", streetAddress: "2.5.4.9", organizationName: "2.5.4.10", organizationalUnitName: "2.5.4.11", domainComponent: "0.9.2342.19200300.100.1.25", userId: "0.9.2342.19200300.100.1.1", surname: "2.5.4.4", givenName: "2.5.4.42", title: "2.5.4.12", distinguishedName: "2.5.4.49", emailAddress: "1.2.840.113549.1.9.1", description: "2.5.4.13", businessCategory: "2.5.4.15", postalCode: "2.5.4.17", uniqueIdentifier: "2.5.4.45", organizationIdentifier: "2.5.4.97", jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1", jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2", jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3", subjectDirectoryAttributes: "2.5.29.9", subjectKeyIdentifier: "2.5.29.14", keyUsage: "2.5.29.15", subjectAltName: "2.5.29.17", issuerAltName: "2.5.29.18", basicConstraints: "2.5.29.19", cRLNumber: "2.5.29.20", cRLReason: "2.5.29.21", nameConstraints: "2.5.29.30", cRLDistributionPoints: "2.5.29.31", certificatePolicies: "2.5.29.32", anyPolicy: "2.5.29.32.0", authorityKeyIdentifier: "2.5.29.35", policyConstraints: "2.5.29.36", extKeyUsage: "2.5.29.37", authorityInfoAccess: "1.3.6.1.5.5.7.1.1", ocsp: "1.3.6.1.5.5.7.48.1", ocspBasic: "1.3.6.1.5.5.7.48.1.1", ocspNonce: "1.3.6.1.5.5.7.48.1.2", ocspNoCheck: "1.3.6.1.5.5.7.48.1.5", caIssuers: "1.3.6.1.5.5.7.48.2", anyExtendedKeyUsage: "2.5.29.37.0", serverAuth: "1.3.6.1.5.5.7.3.1", clientAuth: "1.3.6.1.5.5.7.3.2", codeSigning: "1.3.6.1.5.5.7.3.3", emailProtection: "1.3.6.1.5.5.7.3.4", timeStamping: "1.3.6.1.5.5.7.3.8", ocspSigning: "1.3.6.1.5.5.7.3.9", dateOfBirth: "1.3.6.1.5.5.7.9.1", placeOfBirth: "1.3.6.1.5.5.7.9.2", gender: "1.3.6.1.5.5.7.9.3", countryOfCitizenship: "1.3.6.1.5.5.7.9.4", countryOfResidence: "1.3.6.1.5.5.7.9.5", ecPublicKey: "1.2.840.10045.2.1", "P-256": "1.2.840.10045.3.1.7", secp256r1: "1.2.840.10045.3.1.7", secp256k1: "1.3.132.0.10", secp384r1: "1.3.132.0.34", secp521r1: "1.3.132.0.35", pkcs5PBES2: "1.2.840.113549.1.5.13", pkcs5PBKDF2: "1.2.840.113549.1.5.12", "des-EDE3-CBC": "1.2.840.113549.3.7", data: "1.2.840.113549.1.7.1", "signed-data": "1.2.840.113549.1.7.2", "enveloped-data": "1.2.840.113549.1.7.3", "digested-data": "1.2.840.113549.1.7.5", "encrypted-data": "1.2.840.113549.1.7.6", "authenticated-data": "1.2.840.113549.1.9.16.1.2", tstinfo: "1.2.840.113549.1.9.16.1.4", signingCertificate: "1.2.840.113549.1.9.16.2.12", timeStampToken: "1.2.840.113549.1.9.16.2.14", signaturePolicyIdentifier: "1.2.840.113549.1.9.16.2.15", etsArchiveTimeStamp: "1.2.840.113549.1.9.16.2.27", signingCertificateV2: "1.2.840.113549.1.9.16.2.47", etsArchiveTimeStampV2: "1.2.840.113549.1.9.16.2.48", extensionRequest: "1.2.840.113549.1.9.14", contentType: "1.2.840.113549.1.9.3", messageDigest: "1.2.840.113549.1.9.4", signingTime: "1.2.840.113549.1.9.5", counterSignature: "1.2.840.113549.1.9.6", archiveTimeStampV3: "0.4.0.1733.2.4", pdfRevocationInfoArchival: "1.2.840.113583.1.1.8", adobeTimeStamp: "1.2.840.113583.1.1.9.1" }, this.atype2oidList = { CN: "2.5.4.3", L: "2.5.4.7", ST: "2.5.4.8", O: "2.5.4.10", OU: "2.5.4.11", C: "2.5.4.6", STREET: "2.5.4.9", DC: "0.9.2342.19200300.100.1.25", UID: "0.9.2342.19200300.100.1.1", SN: "2.5.4.4", T: "2.5.4.12", DN: "2.5.4.49", E: "1.2.840.113549.1.9.1", description: "2.5.4.13", businessCategory: "2.5.4.15", postalCode: "2.5.4.17", serialNumber: "2.5.4.5", uniqueIdentifier: "2.5.4.45", organizationIdentifier: "2.5.4.97", jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1", jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2", jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3" }, this.objCache = {}, this.name2obj = function(t) {
      if (typeof this.objCache[t] < "u") return this.objCache[t];
      if (typeof this.name2oidList[t] > "u") throw "Name of ObjectIdentifier not defined: " + t;
      var r = this.name2oidList[t], i = new e({ oid: r });
      return this.objCache[t] = i, i;
    }, this.atype2obj = function(t) {
      if (this.objCache[t] !== void 0) return this.objCache[t];
      var r;
      if (t.match(/^\d+\.\d+\.[0-9.]+$/)) r = t;
      else if (this.atype2oidList[t] !== void 0) r = this.atype2oidList[t];
      else if (this.name2oidList[t] !== void 0) r = this.name2oidList[t];
      else throw new Error("AttributeType name undefined: " + t);
      var i = new e({ oid: r });
      return this.objCache[t] = i, i;
    }, this.registerOIDs = function(t) {
      if (this.checkOIDs(t)) for (var r in t) this.name2oidList[r] = t[r];
    }, this.checkOIDs = function(t) {
      try {
        var r = Object.keys(t);
        return r.length == 0 ? false : (r.map(function(i, s, n) {
          var h = this[i];
          if (!h.match(/^[0-2]\.[0-9.]+$/)) throw new Error("value is not OID");
        }, t), true);
      } catch {
        return false;
      }
    };
  }(), a.asn1.x509.OID.oid2name = function(e) {
    var t = a.asn1.x509.OID.name2oidList;
    for (var r in t) if (t[r] == e) return r;
    return "";
  }, a.asn1.x509.OID.oid2atype = function(e) {
    var t = a.asn1.x509.OID.atype2oidList;
    for (var r in t) if (t[r] == e) return r;
    return e;
  }, a.asn1.x509.OID.name2oid = function(e) {
    if (e.match(/^[0-9.]+$/)) return e;
    var t = a.asn1.x509.OID.name2oidList;
    return t[e] === void 0 ? "" : t[e];
  }, a.asn1.x509.X509Util = {}, a.asn1.x509.X509Util.newCertPEM = function(e) {
    var t = a.asn1.x509;
    t.TBSCertificate;
    var r = t.Certificate, i = new r(e);
    return i.getPEM();
  }, (typeof a > "u" || !a) && (a = {}), (typeof a.asn1 > "u" || !a.asn1) && (a.asn1 = {}), (typeof a.asn1.cms > "u" || !a.asn1.cms) && (a.asn1.cms = {}), a.asn1.cms.Attribute = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERSequence, n = i.DERSet, h = i.DERObjectIdentifier;
    this.params = null, this.typeOid = null, this.setByParam = function(u) {
      this.params = u;
    }, this.getValueArray = function() {
      throw new t("not yet implemented abstract");
    }, this.tohex = function() {
      var u = new h({ oid: this.typeOid }), d = new n({ array: this.getValueArray() }), l = new s({ array: [u, d] });
      return l.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    };
  }, N(a.asn1.cms.Attribute, a.asn1.ASN1Object), a.asn1.cms.ContentType = function(e) {
    var t = a, r = t.asn1;
    r.cms.ContentType.superclass.constructor.call(this), this.typeOid = "1.2.840.113549.1.9.3", this.getValueArray = function() {
      var i = new r.DERObjectIdentifier(this.params.type);
      return [i];
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.ContentType, a.asn1.cms.Attribute), a.asn1.cms.MessageDigest = function(e) {
    var t = a, r = t.asn1, i = r.DEROctetString, s = r.cms;
    s.MessageDigest.superclass.constructor.call(this), this.typeOid = "1.2.840.113549.1.9.4", this.getValueArray = function() {
      var n = new i(this.params);
      return [n];
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.MessageDigest, a.asn1.cms.Attribute), a.asn1.cms.SigningTime = function(e) {
    var t = a, r = t.asn1;
    r.cms.SigningTime.superclass.constructor.call(this), this.typeOid = "1.2.840.113549.1.9.5", this.getValueArray = function() {
      var i = new r.x509.Time(this.params);
      return [i];
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.SigningTime, a.asn1.cms.Attribute), a.asn1.cms.SigningCertificate = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERSequence, n = i.cms, h = n.ESSCertID;
    r.crypto, n.SigningCertificate.superclass.constructor.call(this), this.typeOid = "1.2.840.113549.1.9.16.2.12", this.getValueArray = function() {
      if (this.params == null || this.params == null || this.params.array == null) throw new t("parameter 'array' not specified");
      for (var u = this.params.array, d = [], l = 0; l < u.length; l++) {
        var y = u[l];
        e.hasis == false && typeof y == "string" && (y.indexOf("-----BEGIN") != -1 || j.isASN1HEX(y)) && (y = { cert: y }), y.hasis != false && e.hasis == false && (y.hasis = false), d.push(new h(y));
      }
      var p = new s({ array: d }), o = new s({ array: [p] });
      return [o];
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.SigningCertificate, a.asn1.cms.Attribute), a.asn1.cms.ESSCertID = function(e) {
    a.asn1.cms.ESSCertID.superclass.constructor.call(this);
    var t = Error, r = a, i = r.asn1, s = i.DEROctetString, n = i.DERSequence, h = i.cms.IssuerSerial;
    this.params = null, this.getCertHash = function(u, d) {
      if (u.hash != null) return u.hash;
      if (typeof u == "string" && u.indexOf("-----BEGIN") == -1 && !j.isASN1HEX(u)) return u;
      var l;
      if (typeof u == "string") l = u;
      else if (u.cert != null) l = u.cert;
      else throw new t("hash nor cert unspecified");
      var y;
      l.indexOf("-----BEGIN") != -1 ? y = ie(l) : y = l, typeof u == "string" && (u.indexOf("-----BEGIN") != -1 ? y = ie(u) : j.isASN1HEX(u) && (y = u));
      var p;
      if (u.alg != null) p = u.alg;
      else if (d != null) p = d;
      else throw new t("hash alg unspecified");
      return r.crypto.Util.hashHex(y, p);
    }, this.tohex = function() {
      var u = this.params, d = this.getCertHash(u, "sha1"), l = [];
      l.push(new s({ hex: d })), (typeof u == "string" && u.indexOf("-----BEGIN") != -1 || u.cert != null && u.hasis != false || u.issuer != null && u.serial != null) && l.push(new h(u));
      var y = new n({ array: l });
      return y.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.ESSCertID, a.asn1.ASN1Object), a.asn1.cms.SigningCertificateV2 = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERSequence;
    i.x509;
    var n = i.cms, h = n.ESSCertIDv2;
    r.crypto, n.SigningCertificateV2.superclass.constructor.call(this), this.typeOid = "1.2.840.113549.1.9.16.2.47", this.getValueArray = function() {
      if (this.params == null || this.params == null || this.params.array == null) throw new t("parameter 'array' not specified");
      for (var u = this.params.array, d = [], l = 0; l < u.length; l++) {
        var y = u[l];
        (e.alg != null || e.hasis == false) && typeof y == "string" && (y.indexOf("-----BEGIN") != -1 || j.isASN1HEX(y)) && (y = { cert: y }), y.alg == null && e.alg != null && (y.alg = e.alg), y.hasis != false && e.hasis == false && (y.hasis = false), d.push(new h(y));
      }
      var p = new s({ array: d }), o = new s({ array: [p] });
      return [o];
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.SigningCertificateV2, a.asn1.cms.Attribute), a.asn1.cms.ESSCertIDv2 = function(e) {
    a.asn1.cms.ESSCertIDv2.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.DEROctetString, s = r.DERSequence, n = r.cms.IssuerSerial, h = r.x509.AlgorithmIdentifier;
    this.params = null, this.tohex = function() {
      var u = this.params, d = this.getCertHash(u, "sha256"), l = [];
      u.alg != null && u.alg != "sha256" && l.push(new h({ name: u.alg })), l.push(new i({ hex: d })), (typeof u == "string" && u.indexOf("-----BEGIN") != -1 || u.cert != null && u.hasis != false || u.issuer != null && u.serial != null) && l.push(new n(u));
      var y = new s({ array: l });
      return y.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.ESSCertIDv2, a.asn1.cms.ESSCertID), a.asn1.cms.IssuerSerial = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERInteger, n = i.DERSequence, h = i.cms, u = i.x509, d = u.GeneralNames, l = k;
    h.IssuerSerial.superclass.constructor.call(this), this.setByParam = function(y) {
      this.params = y;
    }, this.tohex = function() {
      var y = this.params, p, o;
      if (typeof y == "string" && y.indexOf("-----BEGIN") != -1 || y.cert != null) {
        var c;
        y.cert != null ? c = y.cert : c = y;
        var f = new l();
        f.readCertPEM(c), p = f.getIssuer(), o = { hex: f.getSerialNumberHex() };
      } else if (y.issuer != null && y.serial) p = y.issuer, o = y.serial;
      else throw new t("cert or issuer and serial parameter not specified");
      var g = new d([{ dn: p }]), v = new s(o), x = new n({ array: [g, v] });
      return x.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.IssuerSerial, a.asn1.ASN1Object), a.asn1.cms.SignerIdentifier = function(e) {
    var t = a, r = t.asn1;
    r.DERInteger, r.DERSequence;
    var i = r.cms, s = i.IssuerAndSerialNumber, n = i.SubjectKeyIdentifier, h = r.x509;
    h.X500Name, i.SignerIdentifier.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var u = this.params;
      if (u.type == "isssn") {
        var d = new s(u);
        return d.tohex();
      } else if (u.type == "skid") {
        var l = new n(u);
        return l.tohex();
      } else throw new Error("wrong property for isssn or skid");
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.SignerIdentifier, a.asn1.ASN1Object), a.asn1.cms.IssuerAndSerialNumber = function(e) {
    var t = a, r = t.asn1, i = r.DERInteger, s = r.DERSequence, n = r.cms, h = r.x509, u = h.X500Name, d = k, l = Error;
    n.IssuerAndSerialNumber.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var y = this.params, p, o;
      if (typeof y == "string" && y.indexOf("-----BEGIN") != -1 || y.cert != null) {
        var c;
        y.cert != null ? c = y.cert : c = y;
        var f = new d();
        f.readCertPEM(c), p = f.getIssuer(), o = { hex: f.getSerialNumberHex() };
      } else if (y.issuer != null && y.serial) p = y.issuer, o = y.serial;
      else throw new l("cert or issuer and serial parameter not specified");
      var g = new u(p), v = new i(o), x = new s({ array: [g, v] });
      return x.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.setByParam = function(y) {
      this.params = y;
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.IssuerAndSerialNumber, a.asn1.ASN1Object), a.asn1.cms.SubjectKeyIdentifier = function(e) {
    var t = a, r = t.asn1;
    r.DERInteger, r.DERSequence;
    var i = r.ASN1Util.newObject, s = r.cms;
    s.IssuerAndSerialName, s.SubjectKeyIdentifier;
    var n = r.x509;
    n.X500Name;
    var h = k, u = Error;
    s.SubjectKeyIdentifier.superclass.constructor.call(this), this.tohex = function() {
      var d = this.params;
      if (d.cert == null && d.skid == null) throw new u("property cert nor skid undefined");
      var l;
      if (d.cert != null) {
        var y = new h(d.cert), p = y.getExtSubjectKeyIdentifier();
        l = p.kid.hex;
      } else d.skid != null && (l = d.skid);
      var o = i({ tag: { tage: "a0", obj: { octstr: { hex: l } } } });
      return o.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.SubjectKeyIdentifier, a.asn1.ASN1Object), a.asn1.cms.AttributeList = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERSet, n = i.cms;
    n.AttributeList.superclass.constructor.call(this), this.params = null, this.hTLV = null, this.setByParam = function(h) {
      this.params = h;
    }, this.tohex = function() {
      var h = this.params;
      if (this.hTLV != null) return this.hTLV;
      var u = true;
      h.sortflag != null && (u = h.sortflag);
      for (var d = h.array, l = [], y = 0; y < d.length; y++) {
        var p = d[y], o = p.attr;
        if (o == "contentType") l.push(new n.ContentType(p));
        else if (o == "messageDigest") l.push(new n.MessageDigest(p));
        else if (o == "signingTime") l.push(new n.SigningTime(p));
        else if (o == "signingCertificate") l.push(new n.SigningCertificate(p));
        else if (o == "signingCertificateV2") l.push(new n.SigningCertificateV2(p));
        else if (o == "signaturePolicyIdentifier") l.push(new a.asn1.cades.SignaturePolicyIdentifier(p));
        else if (o == "signatureTimeStamp" || o == "timeStampToken") l.push(new a.asn1.cades.SignatureTimeStamp(p));
        else throw new t("unknown attr: " + o);
      }
      var c = new s({ array: l, sortflag: u });
      return this.hTLV = c.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.AttributeList, a.asn1.ASN1Object), a.asn1.cms.SignerInfo = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERInteger, n = i.DEROctetString, h = i.DERSequence, u = i.DERTaggedObject, d = i.cms, l = d.SignerIdentifier, y = d.AttributeList;
    d.ContentType, d.EncapsulatedContentInfo, d.MessageDigest, d.SignedData;
    var p = i.x509, o = p.AlgorithmIdentifier, c = r.crypto, f = U;
    d.SignerInfo.superclass.constructor.call(this), this.params = null, this.sign = function() {
      var g = this.params, v = g.sigalg, x = new y(g.sattrs).tohex(), b = f.getKey(g.signkey), I = new c.Signature({ alg: v });
      I.init(b), I.updateHex(x);
      var A = I.sign();
      g.sighex = A;
    }, this.tohex = function() {
      var g = this.params, v = [];
      if (v.push(new s({ int: g.version })), v.push(new l(g.id)), v.push(new o({ name: g.hashalg })), g.sattrs != null) {
        var x = new y(g.sattrs);
        try {
          v.push(new u({ tag: "a0", explicit: false, obj: x }));
        } catch (I) {
          throw new t("si sattr error: " + I);
        }
      }
      if (g.sigalgfield != null ? v.push(new o({ name: g.sigalgfield })) : v.push(new o({ name: g.sigalg })), g.sighex == null && g.signkey != null && this.sign(), v.push(new n({ hex: g.sighex })), g.uattrs != null) {
        var x = new y(g.uattrs);
        try {
          v.push(new u({ tag: "a1", explicit: false, obj: x }));
        } catch (A) {
          throw new t("si uattr error: " + A);
        }
      }
      var b = new h({ array: v });
      return b.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.SignerInfo, a.asn1.ASN1Object), a.asn1.cms.EncapsulatedContentInfo = function(e) {
    var t = a, r = t.asn1, i = r.DERTaggedObject, s = r.DERSequence, n = r.DERObjectIdentifier, h = r.DEROctetString, u = r.cms;
    u.EncapsulatedContentInfo.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var d = this.params, l = [];
      if (l.push(new n(d.type)), d.content != null && (d.content.hex != null || d.content.str != null) && d.isDetached != true) {
        var y = new h(d.content), p = new i({ tag: "a0", explicit: true, obj: y });
        l.push(p);
      }
      var o = new s({ array: l });
      return o.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.setByParam = function(d) {
      this.params = d;
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.EncapsulatedContentInfo, a.asn1.ASN1Object), a.asn1.cms.ContentInfo = function(e) {
    var t = a, r = t.asn1, i = r.DERTaggedObject, s = r.DERSequence, n = r.DERObjectIdentifier, h = r.x509;
    h.OID.name2obj, a.asn1.cms.ContentInfo.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var u = this.params, d = [];
      d.push(new n(u.type));
      var l = new i({ tag: "a0", explicit: true, obj: u.obj });
      d.push(l);
      var y = new s({ array: d });
      return y.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.setByParam = function(u) {
      this.params = u;
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.ContentInfo, a.asn1.ASN1Object), a.asn1.cms.SignedData = function(e) {
    var t = a, r = t.asn1;
    r.ASN1Object;
    var i = r.DERInteger, s = r.DERSet, n = r.DERSequence;
    r.DERTaggedObject;
    var h = r.cms, u = h.EncapsulatedContentInfo, d = h.SignerInfo, l = h.ContentInfo, y = h.CertificateSet, p = h.RevocationInfoChoices, o = r.x509, c = o.AlgorithmIdentifier;
    a.asn1.cms.SignedData.superclass.constructor.call(this), this.params = null, this.checkAndFixParam = function() {
      var f = this.params;
      this._setDigestAlgs(f), this._setContentTypeByEContent(f), this._setMessageDigestByEContent(f), this._setSignerInfoVersion(f), this._setSignedDataVersion(f);
    }, this._setDigestAlgs = function(f) {
      for (var g = {}, v = f.sinfos, x = 0; x < v.length; x++) {
        var b = v[x];
        g[b.hashalg] = 1;
      }
      f.hashalgs = Object.keys(g).sort();
    }, this._setContentTypeByEContent = function(f) {
      for (var g = f.econtent.type, v = f.sinfos, x = 0; x < v.length; x++) {
        var b = v[x], I = this._getAttrParamByName(b, "contentType");
        I.type = g;
      }
    }, this._setMessageDigestByEContent = function(f) {
      var g = f.econtent;
      f.econtent.type;
      var v = g.content.hex;
      v == null && g.type == "data" && g.content.str != null && (v = xe(g.content.str));
      for (var x = f.sinfos, b = 0; b < x.length; b++) {
        var I = x[b], A = I.hashalg, m = this._getAttrParamByName(I, "messageDigest"), E = a.crypto.Util.hashHex(v, A);
        m.hex = E;
      }
    }, this._getAttrParamByName = function(f, g) {
      for (var v = f.sattrs.array, x = 0; x < v.length; x++) if (v[x].attr == g) return v[x];
    }, this._setSignerInfoVersion = function(f) {
      for (var g = f.sinfos, v = 0; v < g.length; v++) {
        var x = g[v], b = 1;
        x.id.type == "skid" && (b = 3), x.version = b;
      }
    }, this._setSignedDataVersion = function(f) {
      var g = this._getSignedDataVersion(f);
      f.version = g;
    }, this._getSignedDataVersion = function(f) {
      if (f.revinfos != null) for (var g = f.revinfos, v = 0; v < g.length; v++) {
        var x = g[v];
        if (x.ocsp != null) return 5;
      }
      for (var b = f.sinfos, v = 0; v < b.length; v++) {
        var I = f.sinfos[v];
        if (I.version == 3) return 3;
      }
      return f.econtent.type != "data" ? 3 : 1;
    }, this.tohex = function() {
      var f = this.params;
      this.getEncodedHexPrepare != null && this.getEncodedHexPrepare(), f.fixed != true && this.checkAndFixParam();
      var g = [];
      g.push(new i({ int: f.version }));
      for (var v = [], x = 0; x < f.hashalgs.length; x++) {
        var b = f.hashalgs[x];
        v.push(new c({ name: b }));
      }
      g.push(new s({ array: v })), g.push(new u(f.econtent)), f.certs != null && g.push(new y(f.certs)), f.revinfos != null && g.push(new p(f.revinfos));
      for (var I = [], x = 0; x < f.sinfos.length; x++) {
        var A = f.sinfos[x];
        I.push(new d(A));
      }
      g.push(new s({ array: I }));
      var m = new n({ array: g });
      return m.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.getContentInfo = function() {
      var f = new l({ type: "signed-data", obj: this });
      return f;
    }, this.getContentInfoEncodedHex = function() {
      return this.getContentInfo().tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.SignedData, a.asn1.ASN1Object), a.asn1.cms.CertificateSet = function(e) {
    a.asn1.cms.CertificateSet.superclass.constructor.call(this);
    var t = Error, r = a.asn1, i = r.DERTaggedObject, s = r.DERSet, n = r.ASN1Object;
    this.params = null, this.tohex = function() {
      var h = this.params, u = [], d;
      if (h instanceof Array) d = h;
      else if (h.array != null) d = h.array;
      else throw new t("cert array not specified");
      for (var l = 0; l < d.length; l++) {
        var y = d[l], p = ie(y), o = new n();
        o.hTLV = p, u.push(o);
      }
      var c = { array: u };
      h.sortflag == false && (c.sortflag = false);
      var f = new s(c), g = new i({ tag: "a0", explicit: false, obj: f });
      return g.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.CertificateSet, a.asn1.ASN1Object), a.asn1.cms.RevocationInfoChoices = function(e) {
    a.asn1.cms.RevocationInfoChoices.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var t = this.params;
      if (!t instanceof Array) throw new Error("params is not array");
      for (var r = [], i = 0; i < t.length; i++) r.push(new a.asn1.cms.RevocationInfoChoice(t[i]));
      var s = a.asn1.ASN1Util.newObject({ tag: { tagi: "a1", obj: { set: r } } });
      return s.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.RevocationInfoChoices, a.asn1.ASN1Object), a.asn1.cms.RevocationInfoChoice = function(e) {
    a.asn1.cms.RevocationInfoChoice.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var t = this.params;
      if (t.crl != null && typeof t.crl == "string") {
        var r = t.crl;
        return t.crl.indexOf("-----BEGIN") != -1 && (r = ie(t.crl)), r;
      } else if (t.ocsp != null) {
        var i = a.asn1.ASN1Util.newObject({ tag: { tagi: "a1", obj: new a.asn1.cms.OtherRevocationFormat(t) } });
        return i.tohex();
      } else throw new Error("property crl or ocsp undefined");
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.RevocationInfoChoice, a.asn1.ASN1Object), a.asn1.cms.OtherRevocationFormat = function(e) {
    a.asn1.cms.OtherRevocationFormat.superclass.constructor.call(this);
    var t = Error, r = a, i = r.asn1, s = i.ASN1Util.newObject, n = r.lang.String.isHex;
    this.params = null, this.tohex = function() {
      var h = this.params;
      if (h.ocsp == null) throw new t("property ocsp not specified");
      if (!n(h.ocsp) || !j.isASN1HEX(h.ocsp)) throw new t("ocsp value not ASN.1 hex string");
      var u = s({ seq: [{ oid: "1.3.6.1.5.5.7.16.2" }, { asn1: { tlv: h.ocsp } }] });
      return u.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cms.OtherRevocationFormat, a.asn1.ASN1Object), a.asn1.cms.CMSUtil = new function() {
  }(), a.asn1.cms.CMSUtil.newSignedData = function(e) {
    return new a.asn1.cms.SignedData(e);
  }, a.asn1.cms.CMSUtil.verifySignedData = function(e) {
    var t = a, r = t.asn1, i = r.cms;
    i.SignerInfo, i.SignedData, i.SigningTime, i.SigningCertificate, i.SigningCertificateV2;
    var s = r.cades;
    s.SignaturePolicyIdentifier;
    var n = t.lang.String.isHex, h = j, u = h.getVbyList, d = h.getTLVbyList, l = h.getIdxbyList, y = h.getChildIdx, p = h.getTLV, o = h.oidname, c = t.crypto.Util.hashHex;
    e.cms === void 0 && n(e.cms);
    var f = e.cms, g = function(w, S) {
      for (var D, R = 3; R < 6; R++) if (D = l(w, 0, [1, 0, R]), D !== void 0) {
        var T = w.substr(D, 2);
        T === "a0" && (S.certsIdx = D), T === "a1" && (S.revinfosIdx = D), T === "31" && (S.signerinfosIdx = D);
      }
    }, v = function(w, S) {
      var D = S.signerinfosIdx;
      if (D !== void 0) {
        var R = y(w, D);
        S.signerInfoIdxList = R;
        for (var T = 0; T < R.length; T++) {
          var K = R[T], P = { idx: K };
          x(w, P), S.signerInfos.push(P);
        }
      }
    }, x = function(w, S) {
      var D = S.idx;
      S.signerid_issuer1 = d(w, D, [1, 0], "30"), S.signerid_serial1 = u(w, D, [1, 1], "02"), S.hashalg = o(u(w, D, [2, 0], "06"));
      var R = l(w, D, [3], "a0");
      S.idxSignedAttrs = R, b(w, S, R);
      var T = y(w, D), K = T.length;
      if (K < 6) throw "malformed SignerInfo";
      S.sigalg = o(u(w, D, [K - 2, 0], "06")), S.sigval = u(w, D, [K - 1], "04");
    }, b = function(w, S, D) {
      var R = y(w, D);
      S.signedAttrIdxList = R;
      for (var T = 0; T < R.length; T++) {
        var K = R[T], P = u(w, K, [0], "06"), H;
        P === "2a864886f70d010905" ? (H = W(u(w, K, [1, 0])), S.saSigningTime = H) : P === "2a864886f70d010904" && (H = u(w, K, [1, 0], "04"), S.saMessageDigest = H);
      }
    }, I = function(w, S) {
      if (u(w, 0, [0], "06") !== "2a864886f70d010702") return S;
      S.cmsType = "signedData", S.econtent = u(w, 0, [1, 0, 2, 1, 0]), g(w, S), S.signerInfos = [], v(w, S);
    }, A = function(w, S) {
      for (var D = S.parse.signerInfos, R = D.length, T = true, K = 0; K < R; K++) {
        var P = D[K];
        E(w, S, P), P.isValid || (T = false);
      }
      S.isValid = T;
    }, m = function(w, S, D, R) {
      var T = S.parse.certsIdx, K;
      if (S.certs === void 0) {
        K = [], S.certkeys = [];
        for (var P = y(w, T), H = 0; H < P.length; H++) {
          var B = p(w, P[H]), O = new k();
          O.readCertHex(B), K[H] = O, S.certkeys[H] = O.getPublicKey();
        }
        S.certs = K;
      } else K = S.certs;
      S.cccc = K.length, S.cccci = P.length;
      for (var H = 0; H < K.length; H++) {
        var ee = O.getIssuerHex(), X = O.getSerialNumberHex();
        D.signerid_issuer1 === ee && D.signerid_serial1 === X && (D.certkey_idx = H);
      }
    }, E = function(w, S, D, R) {
      D.verifyDetail = {};
      var T = D.verifyDetail, K = S.parse.econtent, P = D.hashalg, H = D.saMessageDigest;
      T.validMessageDigest = false, c(K, P) === H && (T.validMessageDigest = true), m(w, S, D), T.validSignatureValue = false;
      var B = D.sigalg, O = "31" + p(w, D.idxSignedAttrs).substr(2);
      D.signedattrshex = O;
      var ee = S.certs[D.certkey_idx].getPublicKey(), X = new a.crypto.Signature({ alg: B });
      X.init(ee), X.updateHex(O);
      var Q = X.verify(D.sigval);
      T.validSignatureValue_isValid = Q, Q === true && (T.validSignatureValue = true), D.isValid = false, T.validMessageDigest && T.validSignatureValue && (D.isValid = true);
    }, F = { isValid: false, parse: {} };
    return I(f, F.parse), A(f, F), F;
  }, a.asn1.cms.CMSParser = function() {
    var e = Error, t = k, r = new t(), i = j, s = i.getV, n = i.getTLV;
    i.getIdxbyList;
    var h = i.getTLVbyList, u = i.getTLVbyListEx, d = i.getVbyList, l = i.getVbyListEx, y = i.getChildIdx;
    this.getCMSSignedData = function(p) {
      var o = h(p, 0, [1, 0]), c = this.getSignedData(o);
      return c;
    }, this.getSignedData = function(p) {
      var o = y(p, 0), c = {}, f = s(p, o[0]), g = parseInt(f, 16);
      c.version = g;
      var v = n(p, o[1]);
      c.hashalgs = this.getHashAlgArray(v);
      var x = n(p, o[2]);
      c.econtent = this.getEContent(x);
      var b = u(p, 0, ["[0]"]);
      b != null && (c.certs = this.getCertificateSet(b)), u(p, 0, ["[1]"]);
      var I = u(p, 0, [3]);
      return c.sinfos = this.getSignerInfos(I), c;
    }, this.getHashAlgArray = function(p) {
      for (var o = y(p, 0), c = new t(), f = [], g = 0; g < o.length; g++) {
        var v = n(p, o[g]), x = c.getAlgorithmIdentifierName(v);
        f.push(x);
      }
      return f;
    }, this.getEContent = function(p) {
      var o = {}, c = d(p, 0, [0]), f = d(p, 0, [1, 0]);
      return o.type = a.asn1.x509.OID.oid2name(j.hextooidstr(c)), o.content = { hex: f }, o;
    }, this.getSignerInfos = function(p) {
      for (var o = [], c = y(p, 0), f = 0; f < c.length; f++) {
        var g = n(p, c[f]), v = this.getSignerInfo(g);
        o.push(v);
      }
      return o;
    }, this.getSignerInfo = function(p) {
      var o = {}, c = y(p, 0), f = i.getInt(p, c[0], -1);
      f != -1 && (o.version = f);
      var g = n(p, c[1]), v = this.getIssuerAndSerialNumber(g);
      o.id = v;
      var x = n(p, c[2]), b = r.getAlgorithmIdentifierName(x);
      o.hashalg = b;
      var I = u(p, 0, ["[0]"]);
      if (I != null) {
        var A = this.getAttributeList(I);
        o.sattrs = A;
      }
      var m = u(p, 0, [3]), E = r.getAlgorithmIdentifierName(m);
      o.sigalg = E;
      var F = l(p, 0, [4]);
      o.sighex = F;
      var w = u(p, 0, ["[1]"]);
      if (w != null) {
        var S = this.getAttributeList(w);
        o.uattrs = S;
      }
      return o;
    }, this.getSignerIdentifier = function(p) {
      if (p.substr(0, 2) == "30") return this.getIssuerAndSerialNumber(p);
      throw new Error("SKID of signerIdentifier not supported");
    }, this.getIssuerAndSerialNumber = function(p) {
      var o = { type: "isssn" }, c = y(p, 0), f = n(p, c[0]);
      o.issuer = r.getX500Name(f);
      var g = s(p, c[1]);
      return o.serial = { hex: g }, o;
    }, this.getAttributeList = function(p) {
      for (var o = [], c = y(p, 0), f = 0; f < c.length; f++) {
        var g = n(p, c[f]), v = this.getAttribute(g);
        o.push(v);
      }
      return { array: o };
    }, this.getAttribute = function(p) {
      var o = {}, c = y(p, 0), f = i.getOID(p, c[0]), g = a.asn1.x509.OID.oid2name(f);
      o.attr = g;
      var v = n(p, c[1]), x = y(v, 0);
      if (x.length == 1) o.valhex = n(v, x[0]);
      else {
        for (var b = [], I = 0; I < x.length; I++) b.push(n(v, x[I]));
        o.valhex = b;
      }
      return g == "contentType" ? this.setContentType(o) : g == "messageDigest" ? this.setMessageDigest(o) : g == "signingTime" ? this.setSigningTime(o) : g == "signingCertificate" ? this.setSigningCertificate(o) : g == "signingCertificateV2" ? this.setSigningCertificateV2(o) : g == "signaturePolicyIdentifier" && this.setSignaturePolicyIdentifier(o), o;
    }, this.setContentType = function(p) {
      var o = i.getOIDName(p.valhex, 0, null);
      o != null && (p.type = o, delete p.valhex);
    }, this.setSigningTime = function(p) {
      var o = s(p.valhex, 0), c = W(o);
      p.str = c, delete p.valhex;
    }, this.setMessageDigest = function(p) {
      var o = s(p.valhex, 0);
      p.hex = o, delete p.valhex;
    }, this.setSigningCertificate = function(p) {
      var o = y(p.valhex, 0);
      if (o.length > 0) {
        for (var c = n(p.valhex, o[0]), f = y(c, 0), g = [], v = 0; v < f.length; v++) {
          var x = n(c, f[v]), b = this.getESSCertID(x);
          g.push(b);
        }
        p.array = g;
      }
      if (o.length > 1) {
        var I = n(p.valhex, o[1]);
        p.polhex = I;
      }
      delete p.valhex;
    }, this.setSignaturePolicyIdentifier = function(p) {
      var o = y(p.valhex, 0);
      if (o.length > 0) {
        var c = i.getOID(p.valhex, o[0]);
        p.oid = c;
      }
      if (o.length > 1) {
        var f = new t(), g = y(p.valhex, o[1]), v = n(p.valhex, g[0]), x = f.getAlgorithmIdentifierName(v);
        p.alg = x;
        var b = s(p.valhex, g[1]);
        p.hash = b;
      }
      delete p.valhex;
    }, this.setSigningCertificateV2 = function(p) {
      var o = y(p.valhex, 0);
      if (o.length > 0) {
        for (var c = n(p.valhex, o[0]), f = y(c, 0), g = [], v = 0; v < f.length; v++) {
          var x = n(c, f[v]), b = this.getESSCertIDv2(x);
          g.push(b);
        }
        p.array = g;
      }
      if (o.length > 1) {
        var I = n(p.valhex, o[1]);
        p.polhex = I;
      }
      delete p.valhex;
    }, this.getESSCertID = function(p) {
      var o = {}, c = y(p, 0);
      if (c.length > 0) {
        var f = s(p, c[0]);
        o.hash = f;
      }
      if (c.length > 1) {
        var g = n(p, c[1]), v = this.getIssuerSerial(g);
        v.serial != null && (o.serial = v.serial), v.issuer != null && (o.issuer = v.issuer);
      }
      return o;
    }, this.getESSCertIDv2 = function(p) {
      var o = {}, c = y(p, 0);
      if (c.length < 1 || 3 < c.length) throw new e("wrong number of elements");
      var f = 0;
      if (p.substr(c[0], 2) == "30") {
        var g = n(p, c[0]);
        o.alg = r.getAlgorithmIdentifierName(g), f++;
      } else o.alg = "sha256";
      var v = s(p, c[f]);
      if (o.hash = v, c.length > f + 1) {
        var x = n(p, c[f + 1]), b = this.getIssuerSerial(x);
        o.issuer = b.issuer, o.serial = b.serial;
      }
      return o;
    }, this.getIssuerSerial = function(p) {
      var o = {}, c = y(p, 0), f = n(p, c[0]), g = r.getGeneralNames(f), v = g[0].dn;
      o.issuer = v;
      var x = s(p, c[1]);
      return o.serial = { hex: x }, o;
    }, this.getCertificateSet = function(p) {
      for (var o = y(p, 0), c = [], f = 0; f < o.length; f++) {
        var g = n(p, o[f]);
        if (g.substr(0, 2) == "30") {
          var v = ue(g, "CERTIFICATE");
          c.push(v);
        }
      }
      return { array: c, sortflag: false };
    };
  }, (typeof a > "u" || !a) && (a = {}), (typeof a.asn1 > "u" || !a.asn1) && (a.asn1 = {}), (typeof a.asn1.tsp > "u" || !a.asn1.tsp) && (a.asn1.tsp = {}), a.asn1.tsp.TimeStampToken = function(e) {
    var t = a, r = t.asn1, i = r.tsp;
    i.TimeStampToken.superclass.constructor.call(this), this.params = null, this.getEncodedHexPrepare = function() {
      var s = new i.TSTInfo(this.params.econtent.content);
      this.params.econtent.content.hex = s.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.tsp.TimeStampToken, a.asn1.cms.SignedData), a.asn1.tsp.TSTInfo = function(e) {
    var t = a, r = t.asn1, i = r.DERSequence, s = r.DERInteger, n = r.DERBoolean, h = r.DERGeneralizedTime, u = r.DERObjectIdentifier, d = r.DERTaggedObject, l = r.tsp, y = l.MessageImprint, p = l.Accuracy;
    r.x509.X500Name;
    var o = r.x509.GeneralName;
    if (l.TSTInfo.superclass.constructor.call(this), this.dVersion = new s({ int: 1 }), this.dPolicy = null, this.dMessageImprint = null, this.dSerial = null, this.dGenTime = null, this.dAccuracy = null, this.dOrdering = null, this.dNonce = null, this.dTsa = null, this.tohex = function() {
      var c = [this.dVersion];
      if (this.dPolicy == null) throw new Error("policy shall be specified.");
      if (c.push(this.dPolicy), this.dMessageImprint == null) throw new Error("messageImprint shall be specified.");
      if (c.push(this.dMessageImprint), this.dSerial == null) throw new Error("serialNumber shall be specified.");
      if (c.push(this.dSerial), this.dGenTime == null) throw new Error("genTime shall be specified.");
      c.push(this.dGenTime), this.dAccuracy != null && c.push(this.dAccuracy), this.dOrdering != null && c.push(this.dOrdering), this.dNonce != null && c.push(this.dNonce), this.dTsa != null && c.push(this.dTsa);
      var f = new i({ array: c });
      return this.hTLV = f.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0) {
      if (typeof e.policy == "string") {
        if (!e.policy.match(/^[0-9.]+$/)) throw "policy shall be oid like 0.1.4.134";
        this.dPolicy = new u({ oid: e.policy });
      }
      e.messageImprint !== void 0 && (this.dMessageImprint = new y(e.messageImprint)), e.serial !== void 0 && (this.dSerial = new s(e.serial)), e.genTime !== void 0 && (this.dGenTime = new h(e.genTime)), e.accuracy !== void 0 && (this.dAccuracy = new p(e.accuracy)), e.ordering !== void 0 && e.ordering == true && (this.dOrdering = new n()), e.nonce !== void 0 && (this.dNonce = new s(e.nonce)), e.tsa !== void 0 && (this.dTsa = new d({ tag: "a0", explicit: true, obj: new o({ dn: e.tsa }) }));
    }
  }, N(a.asn1.tsp.TSTInfo, a.asn1.ASN1Object), a.asn1.tsp.Accuracy = function(e) {
    var t = a, r = t.asn1, i = r.ASN1Util.newObject;
    r.tsp.Accuracy.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var s = this.params, n = [];
      return s.seconds != null && typeof s.seconds == "number" && n.push({ int: s.seconds }), s.millis != null && typeof s.millis == "number" && n.push({ tag: { tagi: "80", obj: { int: s.millis } } }), s.micros != null && typeof s.micros == "number" && n.push({ tag: { tagi: "81", obj: { int: s.micros } } }), i({ seq: n }).tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.tsp.Accuracy, a.asn1.ASN1Object), a.asn1.tsp.MessageImprint = function(e) {
    var t = a, r = t.asn1, i = r.DERSequence, s = r.DEROctetString, n = r.x509, h = n.AlgorithmIdentifier;
    r.tsp.MessageImprint.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var u = this.params, d = new h({ name: u.alg }), l = new s({ hex: u.hash }), y = new i({ array: [d, l] });
      return y.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.tsp.MessageImprint, a.asn1.ASN1Object), a.asn1.tsp.TimeStampReq = function(e) {
    var t = a, r = t.asn1, i = r.DERSequence, s = r.DERInteger, n = r.DERBoolean;
    r.ASN1Object;
    var h = r.DERObjectIdentifier, u = r.tsp, d = u.MessageImprint;
    u.TimeStampReq.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var l = this.params, y = [];
      y.push(new s({ int: 1 })), l.messageImprint instanceof a.asn1.ASN1Object ? y.push(l.messageImprint) : y.push(new d(l.messageImprint)), l.policy != null && y.push(new h(l.policy)), l.nonce != null && y.push(new s(l.nonce)), l.certreq == true && y.push(new n());
      var p = new i({ array: y });
      return p.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.tsp.TimeStampReq, a.asn1.ASN1Object), a.asn1.tsp.TimeStampResp = function(e) {
    var t = a, r = t.asn1, i = r.DERSequence;
    r.ASN1Object;
    var s = r.tsp, n = s.PKIStatusInfo;
    s.TimeStampResp.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var h = this.params, u = [];
      if (h.econtent != null || h.tst != null) if (h.statusinfo != null ? u.push(new n(h.statusinfo)) : u.push(new n("granted")), h.econtent != null) u.push(new s.TimeStampToken(h).getContentInfo());
      else if (h.tst instanceof r.ASN1Object) u.push(h.tst);
      else throw new Error("improper member tst value");
      else if (h.statusinfo != null) u.push(new n(h.statusinfo));
      else throw new Error("parameter for token nor statusinfo not specified");
      var d = new i({ array: u });
      return d.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.tsp.TimeStampResp, a.asn1.ASN1Object), a.asn1.tsp.PKIStatusInfo = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERSequence, n = i.tsp, h = n.PKIStatus, u = n.PKIFreeText, d = n.PKIFailureInfo;
    n.PKIStatusInfo.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var l = this.params, y = [];
      if (typeof l == "string") y.push(new h(l));
      else {
        if (l.status == null) throw new t("property 'status' unspecified");
        y.push(new h(l.status)), l.statusstr != null && y.push(new u(l.statusstr)), l.failinfo != null && y.push(new d(l.failinfo));
      }
      var p = new s({ array: y });
      return p.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.tsp.PKIStatusInfo, a.asn1.ASN1Object), a.asn1.tsp.PKIStatus = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERInteger, n = i.tsp;
    n.PKIStatus.superclass.constructor.call(this);
    var h = { granted: 0, grantedWithMods: 1, rejection: 2, waiting: 3, revocationWarning: 4, revocationNotification: 5 };
    this.params = null, this.tohex = function() {
      var u = this.params, d;
      if (typeof u == "string") try {
        d = h[u];
      } catch {
        throw new t("undefined name: " + u);
      }
      else if (typeof u == "number") d = u;
      else throw new t("unsupported params");
      return new s({ int: d }).tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.tsp.PKIStatus, a.asn1.ASN1Object), a.asn1.tsp.PKIFreeText = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERSequence, n = i.DERUTF8String, h = i.tsp;
    h.PKIFreeText.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var u = this.params;
      if (!u instanceof Array) throw new t("wrong params: not array");
      for (var d = [], l = 0; l < u.length; l++) d.push(new n({ str: u[l] }));
      var y = new s({ array: d });
      return y.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.tsp.PKIFreeText, a.asn1.ASN1Object), a.asn1.tsp.PKIFailureInfo = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERBitString, n = i.tsp, h = n.PKIFailureInfo, u = { badAlg: 0, badRequest: 2, badDataFormat: 5, timeNotAvailable: 14, unacceptedPolicy: 15, unacceptedExtension: 16, addInfoNotAvailable: 17, systemFailure: 25 };
    h.superclass.constructor.call(this), this.params = null, this.getBinValue = function() {
      var d = this.params, l = 0;
      if (typeof d == "number" && 0 <= d && d <= 25) {
        l |= 1 << d;
        for (var y = l.toString(2), p = "", o = y.length - 1; o >= 0; o--) p += y[o];
        return p;
      } else {
        if (typeof d == "string" && u[d] != null) return at([d], u);
        if (typeof d == "object" && d.length != null) return at(d, u);
        throw new t("wrong params");
      }
    }, this.tohex = function() {
      this.params;
      var d = this.getBinValue();
      return new s({ bin: d }).tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.tsp.PKIFailureInfo, a.asn1.ASN1Object), a.asn1.tsp.AbstractTSAAdapter = function(e) {
    this.getTSTHex = function(t, r) {
      throw "not implemented yet";
    };
  }, a.asn1.tsp.SimpleTSAAdapter = function(e) {
    var t = a, r = t.asn1, i = r.tsp, s = t.crypto.Util.hashHex;
    i.SimpleTSAAdapter.superclass.constructor.call(this), this.params = null, this.serial = 0, this.getTSTHex = function(n, h) {
      var u = s(n, h);
      this.params.econtent.content.messageImprint = { alg: h, hash: u }, this.params.econtent.content.serial = { int: this.serial++ };
      var d = Math.floor(Math.random() * 1e9);
      this.params.econtent.content.nonce = { int: d };
      var l = new i.TimeStampToken(this.params);
      return l.getContentInfoEncodedHex();
    }, e !== void 0 && (this.params = e);
  }, N(a.asn1.tsp.SimpleTSAAdapter, a.asn1.tsp.AbstractTSAAdapter), a.asn1.tsp.FixedTSAAdapter = function(e) {
    var t = a, r = t.asn1, i = r.tsp, s = t.crypto.Util.hashHex;
    i.FixedTSAAdapter.superclass.constructor.call(this), this.params = null, this.getTSTHex = function(n, h) {
      var u = s(n, h);
      this.params.econtent.content.messageImprint = { alg: h, hash: u };
      var d = new i.TimeStampToken(this.params);
      return d.getContentInfoEncodedHex();
    }, e !== void 0 && (this.params = e);
  }, N(a.asn1.tsp.FixedTSAAdapter, a.asn1.tsp.AbstractTSAAdapter), a.asn1.tsp.TSPUtil = new function() {
  }(), a.asn1.tsp.TSPUtil.newTimeStampToken = function(e) {
    return new a.asn1.tsp.TimeStampToken(e);
  }, a.asn1.tsp.TSPUtil.parseTimeStampReq = function(e) {
    var t = new a.asn1.tsp.TSPParser();
    return t.getTimeStampReq(e);
  }, a.asn1.tsp.TSPUtil.parseMessageImprint = function(e) {
    var t = new a.asn1.tsp.TSPParser();
    return t.getMessageImprint(e);
  }, a.asn1.tsp.TSPParser = function() {
    var e = k, t = new e(), r = j, i = r.getV, s = r.getTLV, n = r.getIdxbyList;
    r.getTLVbyListEx;
    var h = r.getChildIdx, u = ["granted", "grantedWithMods", "rejection", "waiting", "revocationWarning", "revocationNotification"], d = { 0: "badAlg", 2: "badRequest", 5: "badDataFormat", 14: "timeNotAvailable", 15: "unacceptedPolicy", 16: "unacceptedExtension", 17: "addInfoNotAvailable", 25: "systemFailure" };
    this.getResponse = function(l) {
      var y = h(l, 0);
      if (y.length == 1) return this.getPKIStatusInfo(s(l, y[0]));
      if (y.length > 1) {
        var p = this.getPKIStatusInfo(s(l, y[0])), o = s(l, y[1]), c = this.getToken(o);
        return c.statusinfo = p, c;
      }
    }, this.getToken = function(l) {
      var y = new a.asn1.cms.CMSParser(), p = y.getCMSSignedData(l);
      return this.setTSTInfo(p), p;
    }, this.setTSTInfo = function(l) {
      var y = l.econtent;
      if (y.type == "tstinfo") {
        var p = y.content.hex, o = this.getTSTInfo(p);
        y.content = o;
      }
    }, this.getTSTInfo = function(l) {
      var y = {}, p = h(l, 0), o = i(l, p[1]);
      y.policy = nt(o);
      var c = s(l, p[2]);
      y.messageImprint = this.getMessageImprint(c);
      var f = i(l, p[3]);
      y.serial = { hex: f };
      var g = i(l, p[4]);
      y.genTime = { str: W(g) };
      var v = 0;
      if (p.length > 5 && l.substr(p[5], 2) == "30") {
        var x = s(l, p[5]);
        y.accuracy = this.getAccuracy(x), v++;
      }
      if (p.length > 5 + v && l.substr(p[5 + v], 2) == "01") {
        var b = i(l, p[5 + v]);
        b == "ff" && (y.ordering = true), v++;
      }
      if (p.length > 5 + v && l.substr(p[5 + v], 2) == "02") {
        var I = i(l, p[5 + v]);
        y.nonce = { hex: I }, v++;
      }
      if (p.length > 5 + v && l.substr(p[5 + v], 2) == "a0") {
        var A = s(l, p[5 + v]);
        A = "30" + A.substr(2), pGeneralNames = t.getGeneralNames(A);
        var m = pGeneralNames[0].dn;
        y.tsa = m, v++;
      }
      if (p.length > 5 + v && l.substr(p[5 + v], 2) == "a1") {
        var E = s(l, p[5 + v]);
        E = "30" + E.substr(2);
        var F = t.getExtParamArray(E);
        y.ext = F, v++;
      }
      return y;
    }, this.getAccuracy = function(l) {
      for (var y = {}, p = h(l, 0), o = 0; o < p.length; o++) {
        var c = l.substr(p[o], 2), f = i(l, p[o]), g = parseInt(f, 16);
        c == "02" ? y.seconds = g : c == "80" ? y.millis = g : c == "81" && (y.micros = g);
      }
      return y;
    }, this.getMessageImprint = function(l) {
      if (l.substr(0, 2) != "30") throw new Error("head of messageImprint hex shall be x30");
      var y = {};
      h(l, 0);
      var p = n(l, 0, [0, 0]), o = i(l, p), c = r.hextooidstr(o), f = a.asn1.x509.OID.oid2name(c);
      if (f == "") throw new Error("hashAlg name undefined: " + c);
      var g = f, v = n(l, 0, [1]);
      return y.alg = g, y.hash = i(l, v), y;
    }, this.getPKIStatusInfo = function(l) {
      var y = {}, p = h(l, 0), o = 0;
      try {
        var c = i(l, p[0]), f = parseInt(c, 16);
        y.status = u[f];
      } catch {
      }
      if (p.length > 1 && l.substr(p[1], 2) == "30") {
        var g = s(l, p[1]);
        y.statusstr = this.getPKIFreeText(g), o++;
      }
      if (p.length > o && l.substr(p[1 + o], 2) == "03") {
        var v = s(l, p[1 + o]);
        y.failinfo = this.getPKIFailureInfo(v);
      }
      return y;
    }, this.getPKIFreeText = function(l) {
      for (var y = [], p = h(l, 0), o = 0; o < p.length; o++) y.push(r.getString(l, p[o]));
      return y;
    }, this.getPKIFailureInfo = function(l) {
      var y = r.getInt(l, 0);
      return d[y] != null ? d[y] : y;
    }, this.getTimeStampReq = function(l) {
      var y = {};
      y.certreq = false;
      var p = h(l, 0);
      if (p.length < 2) throw new Error("TimeStampReq must have at least 2 items");
      var o = s(l, p[1]);
      y.messageImprint = a.asn1.tsp.TSPUtil.parseMessageImprint(o);
      for (var c = 2; c < p.length; c++) {
        var f = p[c], g = l.substr(f, 2);
        if (g == "06") {
          var v = i(l, f);
          y.policy = r.hextooidstr(v);
        }
        g == "02" && (y.nonce = i(l, f)), g == "01" && (y.certreq = true);
      }
      return y;
    };
  }, (typeof a > "u" || !a) && (a = {}), (typeof a.asn1 > "u" || !a.asn1) && (a.asn1 = {}), (typeof a.asn1.cades > "u" || !a.asn1.cades) && (a.asn1.cades = {}), a.asn1.cades.SignaturePolicyIdentifier = function(e) {
    var t = a, r = t.asn1, i = r.cades, s = i.SignaturePolicyId;
    i.SignaturePolicyIdentifier.superclass.constructor.call(this), this.typeOid = "1.2.840.113549.1.9.16.2.15", this.params = null, this.getValueArray = function() {
      return [new s(this.params)];
    }, this.setByParam = function(n) {
      this.params = n;
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cades.SignaturePolicyIdentifier, a.asn1.cms.Attribute), a.asn1.cades.SignaturePolicyId = function(e) {
    var t = a, r = t.asn1, i = r.DERSequence, s = r.DERObjectIdentifier, n = r.x509;
    n.AlgorithmIdentifier;
    var h = r.cades, u = h.SignaturePolicyId, d = h.OtherHashAlgAndValue;
    u.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var l = this.params, y = [];
      y.push(new s(l.oid)), y.push(new d(l));
      var p = new i({ array: y });
      return p.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.setByParam = function(l) {
      this.params = l;
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cades.SignaturePolicyId, a.asn1.ASN1Object), a.asn1.cades.OtherHashAlgAndValue = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERSequence, n = i.DEROctetString, h = i.x509, u = h.AlgorithmIdentifier, d = i.cades, l = d.OtherHashAlgAndValue;
    l.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var y = this.params;
      if (y.alg == null) throw new t("property 'alg' not specified");
      if (y.hash == null && y.cert == null) throw new t("property 'hash' nor 'cert' not specified");
      var p = null;
      if (y.hash != null) p = y.hash;
      else if (y.cert != null) {
        if (typeof y.cert != "string") throw new t("cert not string");
        var o = y.cert;
        y.cert.indexOf("-----BEGIN") != -1 && (o = ie(y.cert)), p = a.crypto.Util.hashHex(o, y.alg);
      }
      var c = [];
      c.push(new u({ name: y.alg })), c.push(new n({ hex: p }));
      var f = new s({ array: c });
      return f.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cades.OtherHashAlgAndValue, a.asn1.ASN1Object), a.asn1.cades.OtherHashValue = function(e) {
    a.asn1.cades.OtherHashValue.superclass.constructor.call(this);
    var t = Error, r = a;
    r.lang.String.isHex;
    var i = r.asn1, s = i.DEROctetString;
    r.crypto.Util.hashHex, this.params = null, this.tohex = function() {
      var n = this.params;
      if (n.hash == null && n.cert == null) throw new t("hash or cert not specified");
      var h = null;
      if (n.hash != null) h = n.hash;
      else if (n.cert != null) {
        if (typeof n.cert != "string") throw new t("cert not string");
        var u = n.cert;
        n.cert.indexOf("-----BEGIN") != -1 && (u = ie(n.cert)), h = a.crypto.Util.hashHex(u, "sha1");
      }
      return new s({ hex: h }).tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cades.OtherHashValue, a.asn1.ASN1Object), a.asn1.cades.SignatureTimeStamp = function(e) {
    var t = Error, r = a, i = r.lang.String.isHex, s = r.asn1, n = s.ASN1Object;
    s.x509;
    var h = s.cades;
    h.SignatureTimeStamp.superclass.constructor.call(this), this.typeOid = "1.2.840.113549.1.9.16.2.14", this.params = null, this.getValueArray = function() {
      var u = this.params;
      if (u.tst != null) if (i(u.tst)) {
        var d = new n();
        return d.hTLV = u.tst, [d];
      } else {
        if (u.tst instanceof n) return [u.tst];
        throw new t("params.tst has wrong value");
      }
      else if (u.res != null) {
        var l = u.res;
        if (l instanceof n && (l = l.tohex()), typeof l != "string" || !i(l)) throw new t("params.res has wrong value");
        j.getTLVbyList(l, 0, [1]);
        var d = new n();
        return d.hTLV = u.tst, [d];
      }
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cades.SignatureTimeStamp, a.asn1.cms.Attribute), a.asn1.cades.CompleteCertificateRefs = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERSequence, n = i.cades, h = n.OtherCertID, u = r.lang.String.isHex;
    n.CompleteCertificateRefs.superclass.constructor.call(this), this.typeOid = "1.2.840.113549.1.9.16.2.21", this.params = null, this.getValueArray = function() {
      for (var d = this.params, l = [], y = 0; y < d.array.length; y++) {
        var p = d.array[y];
        if (typeof p == "string") if (p.indexOf("-----BEGIN") != -1) p = { cert: p };
        else if (u(p)) p = { hash: p };
        else throw new t("unsupported value: " + p);
        d.alg != null && p.alg == null && (p.alg = d.alg), d.hasis != null && p.hasis == null && (p.hasis = d.hasis);
        var o = new h(p);
        l.push(o);
      }
      var c = new s({ array: l });
      return [c];
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cades.CompleteCertificateRefs, a.asn1.cms.Attribute), a.asn1.cades.OtherCertID = function(e) {
    var t = a, r = t.asn1, i = r.DERSequence, s = r.cms, n = s.IssuerSerial, h = r.cades, u = h.OtherHashValue, d = h.OtherHashAlgAndValue;
    h.OtherCertID.superclass.constructor.call(this), this.params = e, this.tohex = function() {
      var l = this.params;
      typeof l == "string" && (l.indexOf("-----BEGIN") != -1 ? l = { cert: l } : _isHex(l) && (l = { hash: l }));
      var y = [], p = null;
      if (l.alg != null ? p = new d(l) : p = new u(l), y.push(p), l.cert != null && l.hasis == true || l.issuer != null && l.serial != null) {
        var o = new n(l);
        y.push(o);
      }
      var c = new i({ array: y });
      return c.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cades.OtherCertID, a.asn1.ASN1Object), a.asn1.cades.OtherHash = function(e) {
    var t = a, r = t.asn1;
    r.cms;
    var i = r.cades, s = i.OtherHashAlgAndValue, n = i.OtherHashValue;
    t.crypto.Util.hashHex;
    var h = t.lang.String.isHex;
    i.OtherHash.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var u = this.params;
      typeof u == "string" && (u.indexOf("-----BEGIN") != -1 ? u = { cert: u } : h(u) && (u = { hash: u }));
      var d = null;
      return u.alg != null ? d = new s(u) : d = new n(u), d.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.cades.OtherHash, a.asn1.ASN1Object), a.asn1.cades.CAdESUtil = new function() {
  }(), a.asn1.cades.CAdESUtil.parseSignedDataForAddingUnsigned = function(e) {
    var t = new a.asn1.cms.CMSParser(), r = t.getCMSSignedData(e);
    return r;
  }, a.asn1.cades.CAdESUtil.parseSignerInfoForAddingUnsigned = function(e, t, r) {
    var i = j, s = i.getChildIdx, n = i.getTLV, h = i.getV, u = a, d = u.asn1, l = d.ASN1Object, y = d.cms, p = y.AttributeList, o = y.SignerInfo, c = {}, f = s(e, t);
    if (f.length != 6) throw "not supported items for SignerInfo (!=6)";
    var g = f.shift();
    c.version = n(e, g);
    var v = f.shift();
    c.si = n(e, v);
    var x = f.shift();
    c.digalg = n(e, x);
    var b = f.shift();
    c.sattrs = n(e, b);
    var I = f.shift();
    c.sigalg = n(e, I);
    var A = f.shift();
    c.sig = n(e, A), c.sigval = h(e, A);
    var m = null;
    return c.obj = new o(), m = new l(), m.hTLV = c.version, c.obj.dCMSVersion = m, m = new l(), m.hTLV = c.si, c.obj.dSignerIdentifier = m, m = new l(), m.hTLV = c.digalg, c.obj.dDigestAlgorithm = m, m = new l(), m.hTLV = c.sattrs, c.obj.dSignedAttrs = m, m = new l(), m.hTLV = c.sigalg, c.obj.dSigAlg = m, m = new l(), m.hTLV = c.sig, c.obj.dSig = m, c.obj.dUnsignedAttrs = new p(), c;
  }, (typeof a.asn1.csr > "u" || !a.asn1.csr) && (a.asn1.csr = {}), a.asn1.csr.CertificationRequest = function(e) {
    var t = a, r = t.asn1, i = r.DERBitString, s = r.DERSequence, n = r.csr;
    r.x509;
    var h = n.CertificationRequestInfo;
    n.CertificationRequest.superclass.constructor.call(this), this.setByParam = function(u) {
      this.params = u;
    }, this.sign = function() {
      var u = new h(this.params).tohex(), d = new a.crypto.Signature({ alg: this.params.sigalg });
      d.init(this.params.sbjprvkey), d.updateHex(u);
      var l = d.sign();
      this.params.sighex = l;
    }, this.getPEM = function() {
      return ue(this.tohex(), "CERTIFICATE REQUEST");
    }, this.tohex = function() {
      var u = this.params, d = new a.asn1.csr.CertificationRequestInfo(this.params), l = new a.asn1.x509.AlgorithmIdentifier({ name: u.sigalg });
      if (u.sighex == null && u.sbjprvkey != null && this.sign(), u.sighex == null) throw new Error("sighex or sbjprvkey parameter not defined");
      var y = new i({ hex: "00" + u.sighex }), p = new s({ array: [d, l, y] });
      return p.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.csr.CertificationRequest, a.asn1.ASN1Object), a.asn1.csr.CertificationRequestInfo = function(e) {
    var t = a, r = t.asn1;
    r.DERBitString;
    var i = r.DERSequence, s = r.DERInteger, n = r.DERUTF8String, h = r.DERTaggedObject, u = r.ASN1Util.newObject, d = r.csr, l = r.x509, y = l.X500Name, p = l.Extensions, o = l.SubjectPublicKeyInfo;
    d.CertificationRequestInfo.superclass.constructor.call(this), this.params = null, this.setByParam = function(c) {
      c != null && (this.params = c);
    }, this.tohex = function() {
      var c = this.params, f = [];
      if (f.push(new s({ int: 0 })), f.push(new y(c.subject)), f.push(new o(U.getKey(c.sbjpubkey))), c.extreq != null) {
        var g = new p(c.extreq), v = u({ tag: { tag: "a0", explict: true, obj: { seq: [{ oid: "1.2.840.113549.1.9.14" }, { set: [g] }] } } });
        f.push(v);
      } else f.push(new h({ tag: "a0", explicit: false, obj: new n({ str: "" }) }));
      var x = new i({ array: f });
      return x.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e != null && this.setByParam(e);
  }, N(a.asn1.csr.CertificationRequestInfo, a.asn1.ASN1Object), a.asn1.csr.CSRUtil = new function() {
  }(), a.asn1.csr.CSRUtil.newCSRPEM = function(e) {
    var t = a.asn1.csr, r = new t.CertificationRequest(e), i = r.getPEM();
    return i;
  }, a.asn1.csr.CSRUtil.getParam = function(e) {
    var t = j, r = t.getV, i = t.getIdxbyList, s = t.getTLVbyList, n = t.getTLVbyListEx, h = t.getVbyListEx, u = function(x) {
      var b = i(x, 0, [0, 3, 0, 0], "06");
      return r(x, b) != "2a864886f70d01090e" ? null : s(x, 0, [0, 3, 0, 1, 0], "30");
    }, d = {};
    if (e.indexOf("-----BEGIN CERTIFICATE REQUEST") == -1) throw new Error("argument is not PEM file");
    var l = ie(e, "CERTIFICATE REQUEST");
    try {
      var y = n(l, 0, [0, 1]);
      if (y == "3000") d.subject = {};
      else {
        var f = new k();
        d.subject = f.getX500Name(y);
      }
    } catch {
    }
    var p = n(l, 0, [0, 2]), o = U.getKey(p, null, "pkcs8pub");
    d.sbjpubkey = U.getPEM(o, "PKCS8PUB");
    var c = u(l), f = new k();
    c != null && (d.extreq = f.getExtParamArray(c));
    try {
      var g = n(l, 0, [1], "30"), f = new k();
      d.sigalg = f.getAlgorithmIdentifierName(g);
    } catch {
    }
    try {
      var v = h(l, 0, [2]);
      d.sighex = v;
    } catch {
    }
    return d;
  }, (typeof a > "u" || !a) && (a = {}), (typeof a.asn1 > "u" || !a.asn1) && (a.asn1 = {}), (typeof a.asn1.ocsp > "u" || !a.asn1.ocsp) && (a.asn1.ocsp = {}), a.asn1.ocsp.DEFAULT_HASH = "sha1", a.asn1.ocsp.OCSPResponse = function(e) {
    a.asn1.ocsp.OCSPResponse.superclass.constructor.call(this), a.asn1.DEREnumerated;
    var t = a.asn1.ASN1Util.newObject, r = a.asn1.ocsp.ResponseBytes, i = ["successful", "malformedRequest", "internalError", "tryLater", "_not_used_", "sigRequired", "unauthorized"];
    this.params = null, this._getStatusCode = function() {
      var s = this.params.resstatus;
      return typeof s == "number" ? s : typeof s != "string" ? -1 : i.indexOf(s);
    }, this.setByParam = function(s) {
      this.params = s;
    }, this.tohex = function() {
      var s = this.params, n = this._getStatusCode();
      if (n == -1) throw new Error("responseStatus not supported: " + s.resstatus);
      if (n != 0) return t({ seq: [{ enum: { int: n } }] }).tohex();
      var h = new r(s);
      return t({ seq: [{ enum: { int: 0 } }, { tag: { tag: "a0", explicit: true, obj: h } }] }).tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.ocsp.OCSPResponse, a.asn1.ASN1Object), a.asn1.ocsp.ResponseBytes = function(e) {
    a.asn1.ocsp.ResponseBytes.superclass.constructor.call(this);
    var t = a.asn1, r = t.DERSequence, i = t.DERObjectIdentifier, s = t.DEROctetString, n = t.ocsp.BasicOCSPResponse;
    this.params = null, this.setByParam = function(h) {
      this.params = h;
    }, this.tohex = function() {
      var h = this.params;
      if (h.restype != "ocspBasic") throw new Error("not supported responseType: " + h.restype);
      var u = new n(h), d = [];
      d.push(new i({ name: "ocspBasic" })), d.push(new s({ hex: u.tohex() }));
      var l = new r({ array: d });
      return l.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.ocsp.ResponseBytes, a.asn1.ASN1Object), a.asn1.ocsp.BasicOCSPResponse = function(e) {
    a.asn1.ocsp.BasicOCSPResponse.superclass.constructor.call(this);
    var t = Error, r = a.asn1, i = r.ASN1Object, s = r.DERSequence;
    r.DERGeneralizedTime;
    var n = r.DERTaggedObject, h = r.DERBitString;
    r.x509.Extensions;
    var u = r.x509.AlgorithmIdentifier, d = r.ocsp;
    d.ResponderID, _SingleResponseList = d.SingleResponseList, _ResponseData = d.ResponseData, this.params = null, this.setByParam = function(l) {
      this.params = l;
    }, this.sign = function() {
      var l = this.params, y = l.tbsresp.tohex(), p = new a.crypto.Signature({ alg: l.sigalg });
      p.init(l.reskey), p.updateHex(y), l.sighex = p.sign();
    }, this.tohex = function() {
      var l = this.params;
      l.tbsresp == null && (l.tbsresp = new _ResponseData(l)), l.sighex == null && l.reskey != null && this.sign();
      var y = [];
      if (y.push(l.tbsresp), y.push(new u({ name: l.sigalg })), y.push(new h({ hex: "00" + l.sighex })), l.certs != null && l.certs.length != null) {
        for (var p = [], o = 0; o < l.certs.length; o++) {
          var c = l.certs[o], f = null;
          if (j.isASN1HEX(c)) f = c;
          else if (c.match(/-----BEGIN/)) f = ie(c);
          else throw new t("certs[" + o + "] not hex or PEM");
          p.push(new i({ tlv: f }));
        }
        var g = new s({ array: p });
        y.push(new n({ tag: "a0", explicit: true, obj: g }));
      }
      var v = new s({ array: y });
      return v.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.ocsp.BasicOCSPResponse, a.asn1.ASN1Object), a.asn1.ocsp.ResponseData = function(e) {
    a.asn1.ocsp.ResponseData.superclass.constructor.call(this);
    var t = a.asn1, r = t.DERSequence, i = t.DERGeneralizedTime, s = t.DERTaggedObject, n = t.x509.Extensions, h = t.ocsp, u = h.ResponderID;
    _SingleResponseList = h.SingleResponseList, this.params = null, this.tohex = function() {
      var d = this.params;
      d.respid != null, d.prodat != null, d.array != null;
      var l = [];
      if (l.push(new u(d.respid)), l.push(new i(d.prodat)), l.push(new _SingleResponseList(d.array)), d.ext != null) {
        var y = new n(d.ext);
        l.push(new s({ tag: "a1", explicit: true, obj: y }));
      }
      var p = new r({ array: l });
      return p.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.setByParam = function(d) {
      this.params = d;
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.ocsp.ResponseData, a.asn1.ASN1Object), a.asn1.ocsp.ResponderID = function(e) {
    a.asn1.ocsp.ResponderID.superclass.constructor.call(this);
    var t = a, r = t.asn1, i = r.ASN1Util.newObject, s = r.x509.X500Name, n = t.lang.String.isHex, h = Error;
    this.params = null, this.tohex = function() {
      var u = this.params;
      if (u.key != null) {
        var d = null;
        if (typeof u.key == "string") {
          if (n(u.key) && (d = u.key), u.key.match(/-----BEGIN CERTIFICATE/)) {
            var l = new k(u.key), y = l.getExtSubjectKeyIdentifier();
            y != null && (d = y.kid.hex);
          }
        } else if (u.key instanceof k) {
          var y = u.key.getExtSubjectKeyIdentifier();
          y != null && (d = y.kid.hex);
        }
        if (d == null) throw new h("wrong key member value");
        var p = i({ tag: { tag: "a2", explicit: true, obj: { octstr: { hex: d } } } });
        return p.tohex();
      } else if (u.name != null) {
        var o = null;
        if (typeof u.name == "string" && u.name.match(/-----BEGIN CERTIFICATE/)) {
          var l = new k(u.name);
          o = l.getSubject();
        } else u.name instanceof k ? o = u.name.getSubject() : typeof u.name == "object" && (u.name.array != null || u.name.str != null) && (o = u.name);
        if (o == null) throw new h("wrong name member value");
        var p = i({ tag: { tag: "a1", explicit: true, obj: new s(o) } });
        return p.tohex();
      }
      throw new h("key or name not specified");
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.setByParam = function(u) {
      this.params = u;
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.ocsp.ResponderID, a.asn1.ASN1Object), a.asn1.ocsp.SingleResponseList = function(e) {
    a.asn1.ocsp.SingleResponseList.superclass.constructor.call(this);
    var t = a.asn1, r = t.DERSequence, i = t.ocsp.SingleResponse;
    this.params = null, this.tohex = function() {
      var s = this.params;
      if (typeof s != "object" || s.length == null) throw new Error("params not specified properly");
      for (var n = [], h = 0; h < s.length; h++) n.push(new i(s[h]));
      var u = new r({ array: n });
      return u.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.setByParam = function(s) {
      this.params = s;
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.ocsp.SingleResponseList, a.asn1.ASN1Object), a.asn1.ocsp.SingleResponse = function(e) {
    var t = Error, r = a, i = r.asn1, s = i.DERSequence, n = i.DERGeneralizedTime, h = i.DERTaggedObject, u = i.ocsp, d = u.CertID, l = u.CertStatus, y = i.x509, p = y.Extensions;
    u.SingleResponse.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var o = this.params, c = [];
      if (o.certid == null) throw new t("certid unspecified");
      if (o.status == null) throw new t("status unspecified");
      if (o.thisupdate == null) throw new t("thisupdate unspecified");
      if (c.push(new d(o.certid)), c.push(new l(o.status)), c.push(new n(o.thisupdate)), o.nextupdate != null) {
        var f = new n(o.nextupdate);
        c.push(new h({ tag: "a0", explicit: true, obj: f }));
      }
      if (o.ext != null) {
        var g = new p(o.ext);
        c.push(new h({ tag: "a1", explicit: true, obj: g }));
      }
      var v = new s({ array: c });
      return v.tohex();
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.setByParam = function(o) {
      this.params = o;
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.ocsp.SingleResponse, a.asn1.ASN1Object), a.asn1.ocsp.CertID = function(e) {
    var t = a, r = t.asn1, i = r.DEROctetString, s = r.DERInteger, n = r.DERSequence, h = r.x509, u = h.AlgorithmIdentifier, d = r.ocsp;
    d.DEFAULT_HASH;
    var l = t.crypto, y = l.Util.hashHex, p = k, o = j, c = o.getVbyList;
    d.CertID.superclass.constructor.call(this), this.DEFAULT_HASH = "sha1", this.params = null, this.setByValue = function(f, g, v, x) {
      x == null && (x = this.DEFAULT_HASH), this.params = { alg: x, issname: f, isskey: g, sbjsn: v };
    }, this.setByCert = function(f, g, v) {
      v == null && (v = this.DEFAULT_HASH), this.params = { alg: v, issuerCert: f, subjectCert: g };
    }, this.getParamByCerts = function(f, g, v) {
      v == null && (v = this.DEFAULT_HASH);
      var x = new p(f), b = new p(g), I = y(x.getSubjectHex(), v), A = x.getPublicKeyHex(), m = y(c(A, 0, [1], "03", true), v), E = b.getSerialNumberHex(), F = { alg: v, issname: I, isskey: m, sbjsn: E };
      return F;
    }, this.tohex = function() {
      if (typeof this.params != "object") throw new Error("params not set");
      var f = this.params, g, v, x, b;
      if (f.alg == null ? b = this.DEFAULT_HASH : b = f.alg, f.issuerCert != null && f.subjectCert != null) {
        var I = this.getParamByCerts(f.issuerCert, f.subjectCert, b);
        g = I.issname, v = I.isskey, x = I.sbjsn;
      } else if (f.issname != null && f.isskey != null && f.sbjsn != null) g = f.issname, v = f.isskey, x = f.sbjsn;
      else throw new Error("required param members not defined");
      var A = new u({ name: b }), m = new i({ hex: g }), E = new i({ hex: v }), F = new s({ hex: x }), w = new n({ array: [A, m, E, F] });
      return this.hTLV = w.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.ocsp.CertID, a.asn1.ASN1Object), a.asn1.ocsp.CertStatus = function(e) {
    a.asn1.ocsp.CertStatus.superclass.constructor.call(this), this.params = null, this.tohex = function() {
      var t = this.params;
      if (t.status == "good") return "8000";
      if (t.status == "unknown") return "8200";
      if (t.status == "revoked") {
        var r = [{ gentime: { str: t.time } }];
        t.reason != null && r.push({ tag: { tag: "a0", explicit: true, obj: { enum: { int: t.reason } } } });
        var i = { tag: "a1", explicit: false, obj: { seq: r } };
        return a.asn1.ASN1Util.newObject({ tag: i }).tohex();
      }
      throw new Error("bad status");
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, this.setByParam = function(t) {
      this.params = t;
    }, e !== void 0 && this.setByParam(e);
  }, N(a.asn1.ocsp.CertStatus, a.asn1.ASN1Object), a.asn1.ocsp.Request = function(e) {
    var t = a, r = t.asn1, i = r.DERSequence, s = r.ocsp;
    if (s.Request.superclass.constructor.call(this), this.dReqCert = null, this.dExt = null, this.tohex = function() {
      var h = [];
      if (this.dReqCert === null) throw "reqCert not set";
      h.push(this.dReqCert);
      var u = new i({ array: h });
      return this.hTLV = u.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, typeof e < "u") {
      var n = new s.CertID(e);
      this.dReqCert = n;
    }
  }, N(a.asn1.ocsp.Request, a.asn1.ASN1Object), a.asn1.ocsp.TBSRequest = function(e) {
    var t = a, r = t.asn1, i = r.DERSequence, s = r.ocsp;
    s.TBSRequest.superclass.constructor.call(this), this.version = 0, this.dRequestorName = null, this.dRequestList = [], this.dRequestExt = null, this.setRequestListByParam = function(n) {
      for (var h = [], u = 0; u < n.length; u++) {
        var d = new s.Request(n[0]);
        h.push(d);
      }
      this.dRequestList = h;
    }, this.tohex = function() {
      var n = [];
      if (this.version !== 0) throw "not supported version: " + this.version;
      if (this.dRequestorName !== null) throw "requestorName not supported";
      var h = new i({ array: this.dRequestList });
      if (n.push(h), this.dRequestExt !== null) throw "requestExtensions not supported";
      var u = new i({ array: n });
      return this.hTLV = u.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && e.reqList !== void 0 && this.setRequestListByParam(e.reqList);
  }, N(a.asn1.ocsp.TBSRequest, a.asn1.ASN1Object), a.asn1.ocsp.OCSPRequest = function(e) {
    var t = a, r = t.asn1, i = r.DERSequence, s = r.ocsp;
    if (s.OCSPRequest.superclass.constructor.call(this), this.dTbsRequest = null, this.dOptionalSignature = null, this.tohex = function() {
      var h = [];
      if (this.dTbsRequest !== null) h.push(this.dTbsRequest);
      else throw "tbsRequest not set";
      if (this.dOptionalSignature !== null) throw "optionalSignature not supported";
      var u = new i({ array: h });
      return this.hTLV = u.tohex(), this.hTLV;
    }, this.getEncodedHex = function() {
      return this.tohex();
    }, e !== void 0 && e.reqList !== void 0) {
      var n = new s.TBSRequest(e);
      this.dTbsRequest = n;
    }
  }, N(a.asn1.ocsp.OCSPRequest, a.asn1.ASN1Object), a.asn1.ocsp.OCSPUtil = {}, a.asn1.ocsp.OCSPUtil.getRequestHex = function(e, t, r) {
    var i = a, s = i.asn1, n = s.ocsp;
    r === void 0 && (r = n.DEFAULT_HASH);
    var h = { alg: r, issuerCert: e, subjectCert: t }, u = new n.OCSPRequest({ reqList: [h] });
    return u.tohex();
  }, a.asn1.ocsp.OCSPUtil.getOCSPResponseInfo = function(e) {
    var t = j, r = t.getVbyList, i = t.getVbyListEx, s = t.getIdxbyList;
    t.getIdxbyListEx;
    var n = t.getV, h = {};
    try {
      var u = i(e, 0, [0], "0a");
      h.responseStatus = parseInt(u, 16);
    } catch {
    }
    if (h.responseStatus !== 0) return h;
    try {
      var d = s(e, 0, [1, 0, 1, 0, 0, 2, 0, 1]);
      e.substr(d, 2) === "80" ? h.certStatus = "good" : e.substr(d, 2) === "a1" ? (h.certStatus = "revoked", h.revocationTime = W(r(e, d, [0]))) : e.substr(d, 2) === "82" && (h.certStatus = "unknown");
    } catch {
    }
    try {
      var l = s(e, 0, [1, 0, 1, 0, 0, 2, 0, 2]);
      h.thisUpdate = W(n(e, l));
    } catch {
    }
    try {
      var y = s(e, 0, [1, 0, 1, 0, 0, 2, 0, 3]);
      e.substr(y, 2) === "a0" && (h.nextUpdate = W(r(e, y, [0])));
    } catch {
    }
    return h;
  }, a.asn1.ocsp.OCSPParser = function() {
    var e = Error, t = k, r = new t(), i = j, s = i.getV, n = i.getTLV, h = i.getIdxbyList, u = i.getVbyList, d = i.getTLVbyList, l = i.getVbyListEx, y = i.getTLVbyListEx, p = i.getChildIdx;
    this.getOCSPRequest = function(o) {
      var c = p(o, 0);
      if (c.length != 1 && c.length != 2) throw new e("wrong number elements: " + c.length);
      var f = this.getTBSRequest(n(o, c[0]));
      return f;
    }, this.getTBSRequest = function(o) {
      var c = {}, f = y(o, 0, [0], "30");
      c.array = this.getRequestList(f);
      var g = y(o, 0, ["[2]", 0], "30");
      return g != null && (c.ext = r.getExtParamArray(g)), c;
    }, this.getRequestList = function(o) {
      for (var c = [], f = p(o, 0), g = 0; g < f.length; g++) {
        var o = n(o, f[g]);
        c.push(this.getRequest(o));
      }
      return c;
    }, this.getRequest = function(o) {
      var c = p(o, 0);
      if (c.length != 1 && c.length != 2) throw new e("wrong number elements: " + c.length);
      var f = this.getCertID(n(o, c[0]));
      if (c.length == 2) {
        var g = h(o, 0, [1, 0]);
        f.ext = r.getExtParamArray(n(o, g));
      }
      return f;
    }, this.getCertID = function(o) {
      var c = p(o, 0);
      if (c.length != 4) throw new e("wrong number elements: " + c.length);
      var f = new t(), g = {};
      return g.alg = f.getAlgorithmIdentifierName(n(o, c[0])), g.issname = s(o, c[1]), g.isskey = s(o, c[2]), g.sbjsn = s(o, c[3]), g;
    }, this.getOCSPResponse = function(o) {
      var c = p(o, 0), f, g = s(o, c[0]), v = parseInt(g);
      if (c.length == 1) return { resstatus: v };
      var x = d(o, 0, [1, 0]);
      return f = this.getResponseBytes(x), f.resstatus = v, f;
    }, this.getResponseBytes = function(o) {
      var c = p(o, 0), f, g = d(o, 0, [1, 0]);
      f = this.getBasicOCSPResponse(g);
      var v = s(o, c[0]);
      return f.restype = a.asn1.x509.OID.oid2name(nt(v)), f;
    }, this.getBasicOCSPResponse = function(o) {
      var c = p(o, 0), f;
      f = this.getResponseData(n(o, c[0]));
      var g = new k();
      f.alg = g.getAlgorithmIdentifierName(n(o, c[1]));
      var v = s(o, c[2]);
      f.sighex = v.substr(2);
      var x = l(o, 0, ["[0]"]);
      if (x != null) {
        for (var b = p(x, 0), I = [], A = 0; A < b.length; A++) {
          var m = n(x, b[A]);
          I.push(m);
        }
        f.certs = I;
      }
      return f;
    }, this.getResponseData = function(o) {
      var c = p(o, 0), f = c.length, g = {}, v = 0;
      o.substr(c[0], 2) == "a0" && v++, g.respid = this.getResponderID(n(o, c[v++]));
      var x = s(o, c[v++]);
      if (g.prodat = W(x), g.array = this.getSingleResponseList(n(o, c[v++])), o.substr(c[f - 1], 2) == "a1") {
        var b = d(o, c[f - 1], [0]), I = new k();
        g.ext = I.getExtParamArray(b);
      }
      return g;
    }, this.getResponderID = function(o) {
      var c = {};
      if (o.substr(0, 2) == "a2") {
        var f = u(o, 0, [0]);
        c.key = f;
      }
      if (o.substr(0, 2) == "a1") {
        var g = d(o, 0, [0]), v = new k();
        c.name = v.getX500Name(g);
      }
      return c;
    }, this.getSingleResponseList = function(o) {
      for (var c = p(o, 0), f = [], g = 0; g < c.length; g++) {
        var v = this.getSingleResponse(n(o, c[g]));
        f.push(v);
      }
      return f;
    }, this.getSingleResponse = function(o) {
      var c = p(o, 0), f = {}, g = this.getCertID(n(o, c[0]));
      f.certid = g;
      var v = this.getCertStatus(n(o, c[1]));
      if (f.status = v, o.substr(c[2], 2) == "18") {
        var x = s(o, c[2]);
        f.thisupdate = W(x);
      }
      for (var b = 3; b < c.length; b++) {
        if (o.substr(c[b], 2) == "a0") {
          var I = u(o, c[b], [0], "18");
          f.nextupdate = W(I);
        }
        if (o.substr(c[b], 2) == "a1") {
          var A = new k(), m = d(o, 0, [b, 0]);
          f.ext = A.getExtParamArray(m);
        }
      }
      return f;
    }, this.getCertStatus = function(o) {
      var c = {};
      if (o == "8000") return { status: "good" };
      if (o == "8200") return { status: "unknown" };
      if (o.substr(0, 2) == "a1") {
        c.status = "revoked";
        var f = u(o, 0, [0]), g = W(f);
        c.time = g;
      }
      return c;
    };
  };
  var a;
  (typeof a > "u" || !a) && (a = {}), (typeof a.lang > "u" || !a.lang) && (a.lang = {}), a.lang.String = function() {
  };
  function Ht(e) {
    for (var t = new Array(), r = 0; r < e.length; r++) t[r] = e.charCodeAt(r);
    return t;
  }
  function Ot(e) {
    for (var t = "", r = 0; r < e.length; r++) t = t + String.fromCharCode(e[r]);
    return t;
  }
  function Ze(e) {
    for (var t = "", r = 0; r < e.length; r++) {
      var i = e[r].toString(16);
      i.length == 1 && (i = "0" + i), t = t + i;
    }
    return t;
  }
  function pe(e) {
    return Ze(Ht(e));
  }
  function Rn(e) {
    return ge(pe(e));
  }
  function Tn(e) {
    return Me(ge(pe(e)));
  }
  function Bn(e) {
    return Ot(Ft(Ue(e)));
  }
  function Me(e) {
    return e = e.replace(/\=/g, ""), e = e.replace(/\+/g, "-"), e = e.replace(/\//g, "_"), e;
  }
  function Ue(e) {
    return e.length % 4 == 2 ? e = e + "==" : e.length % 4 == 3 && (e = e + "="), e = e.replace(/-/g, "+"), e = e.replace(/_/g, "/"), e;
  }
  function ae(e) {
    return e.length % 2 == 1 && (e = "0" + e), Me(ge(e));
  }
  function Y(e) {
    return Ke(Ue(e));
  }
  var Ge, Ee;
  typeof Buffer == "function" ? (Ge = function(e) {
    return Me(Buffer.from(e, "utf8").toString("base64"));
  }, Ee = function(e) {
    return Buffer.from(Ue(e), "base64").toString("utf8");
  }) : (Ge = function(e) {
    return ae(et(it(e)));
  }, Ee = function(e) {
    return decodeURIComponent(tt(Y(e)));
  });
  function Nn(e) {
    return ge(et(it(e)));
  }
  function Hn(e) {
    return decodeURIComponent(tt(Ke(e)));
  }
  function Qe(e) {
    return et(it(e)).toLowerCase();
  }
  function W(e) {
    try {
      return decodeURIComponent(tt(e));
    } catch {
      return null;
    }
  }
  function On(e) {
    return W(jn(e));
  }
  function jn(e) {
    for (var t = e.match(/.{1,2}/g), r = [], i = 0; i < t.length; i++) {
      var s = parseInt(t[i], 16);
      161 <= s && s <= 191 ? (r.push("c2"), r.push(t[i])) : 192 <= s && s <= 255 ? (r.push("c3"), r.push((s - 64).toString(16))) : r.push(t[i]);
    }
    return r.join("");
  }
  function ce(e) {
    for (var t = "", r = 0; r < e.length - 1; r += 2) t += String.fromCharCode(parseInt(e.substr(r, 2), 16));
    return t;
  }
  function xe(e) {
    for (var t = "", r = 0; r < e.length; r++) t += ("0" + e.charCodeAt(r).toString(16)).slice(-2);
    return t;
  }
  function jt(e) {
    return ge(e);
  }
  function Vt(e) {
    var t = jt(e), r = t.replace(/(.{64})/g, `$1\r
`);
    return r = r.replace(/\r\n$/, ""), r;
  }
  function Lt(e) {
    var t = e.replace(/[^0-9A-Za-z\/+=]*/g, ""), r = Ke(t);
    return r;
  }
  function ue(e, t) {
    var r = Vt(e);
    return "-----BEGIN " + t + `-----\r
` + r + `\r
-----END ` + t + `-----\r
`;
  }
  function ie(e, t) {
    if (e.indexOf("-----BEGIN ") == -1) throw "can't find PEM header: " + t;
    return t !== void 0 ? (e = e.replace(new RegExp("^[^]*-----BEGIN " + t + "-----"), ""), e = e.replace(new RegExp("-----END " + t + "-----[^]*$"), "")) : (e = e.replace(/^[^]*-----BEGIN [^-]+-----/, ""), e = e.replace(/-----END [^-]+-----[^]*$/, "")), Lt(e);
  }
  function Vn(e) {
    if (e.length % 2 != 0) throw "input is not even length";
    if (e.match(/^[0-9A-Fa-f]+$/) == null) throw "input is not hexadecimal";
    for (var t = new ArrayBuffer(e.length / 2), r = new DataView(t), i = 0; i < e.length / 2; i++) r.setUint8(i, parseInt(e.substr(i * 2, 2), 16));
    return t;
  }
  function Ln(e) {
    for (var t = "", r = new DataView(e), i = 0; i < e.byteLength; i++) t += ("00" + r.getUint8(i).toString(16)).slice(-2);
    return t;
  }
  function pt(e) {
    var t, r, i, s, n, h, u, d, l, y, p;
    if (p = e.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/), p) return d = p[1], t = parseInt(d), d.length === 2 && (50 <= t && t < 100 ? t = 1900 + t : 0 <= t && t < 50 && (t = 2e3 + t)), r = parseInt(p[2]) - 1, i = parseInt(p[3]), s = parseInt(p[4]), n = parseInt(p[5]), h = parseInt(p[6]), u = 0, l = p[7], l !== "" && (y = (l.substr(1) + "00").substr(0, 3), u = parseInt(y)), Date.UTC(t, r, i, s, n, h, u);
    throw new Error("unsupported zulu format: " + e);
  }
  function Kt(e) {
    return Math.round(pt(e) / 1e3);
  }
  function Kn(e) {
    return new Date(pt(e));
  }
  function qn(e, t, r) {
    var i, s = e.getUTCFullYear();
    if (t) {
      if (s < 1950 || 2049 < s) throw "not proper year for UTCTime: " + s;
      i = ("" + s).slice(-2);
    } else i = ("000" + s).slice(-4);
    if (i += ("0" + (e.getUTCMonth() + 1)).slice(-2), i += ("0" + e.getUTCDate()).slice(-2), i += ("0" + e.getUTCHours()).slice(-2), i += ("0" + e.getUTCMinutes()).slice(-2), i += ("0" + e.getUTCSeconds()).slice(-2), r) {
      var n = e.getUTCMilliseconds();
      n !== 0 && (n = ("00" + n).slice(-3), n = n.replace(/0+$/g, ""), i += "." + n);
    }
    return i += "Z", i;
  }
  function et(e) {
    return e.replace(/%/g, "");
  }
  function tt(e) {
    return e.replace(/(..)/g, "%$1");
  }
  function gt(e) {
    var t = "malformed IPv6 address";
    if (!e.match(/^[0-9A-Fa-f:]+$/)) throw t;
    e = e.toLowerCase();
    var r = e.split(":").length - 1;
    if (r < 2) throw t;
    var i = ":".repeat(7 - r + 2);
    e = e.replace("::", i);
    var s = e.split(":");
    if (s.length != 8) throw t;
    for (var n = 0; n < 8; n++) s[n] = ("0000" + s[n]).slice(-4);
    return s.join("");
  }
  function vt(e) {
    if (!e.match(/^[0-9A-Fa-f]{32}$/)) throw new Error("malformed IPv6 address: " + e);
    e = e.toLowerCase();
    var t = e.match(/.{1,4}/g);
    t = t.map(function(s) {
      return s.replace(/^0+/, "");
    }), t = t.map(function(s) {
      return s == "" ? "0" : s;
    }), e = ":" + t.join(":") + ":";
    var r = e.match(/:(0:){2,}/g);
    if (r == null) return e.slice(1, -1);
    var i = r.sort().slice(-1)[0];
    return e = e.replace(i.substr(0, i.length - 1), ":"), e.substr(0, 2) != "::" && (e = e.substr(1)), e.substr(-2, 2) != "::" && (e = e.substr(0, e.length - 1)), e;
  }
  function rt(e) {
    var t = new Error("malformed hex value");
    if (!e.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)) throw t;
    if (e.length == 8) {
      var r;
      try {
        return r = parseInt(e.substr(0, 2), 16) + "." + parseInt(e.substr(2, 2), 16) + "." + parseInt(e.substr(4, 2), 16) + "." + parseInt(e.substr(6, 2), 16), r;
      } catch {
        throw t;
      }
    } else if (e.length == 16) try {
      return rt(e.substr(0, 8)) + "/" + qt(e.substr(8));
    } catch {
      throw t;
    }
    else {
      if (e.length == 32) return vt(e);
      if (e.length == 64) {
        try {
          return vt(e.substr(0, 32)) + "/" + qt(e.substr(32));
        } catch {
          throw t;
        }
        return;
      } else return e;
    }
  }
  function qt(e) {
    var t = new Error("malformed mask"), r;
    try {
      r = new C(e, 16).toString(2);
    } catch {
      throw t;
    }
    if (!r.match(/^1*0*$/)) throw t;
    return r.replace(/0+$/, "").length;
  }
  function yt(e) {
    var t = new Error("malformed IP address");
    if (e = e.toLowerCase(e), !e.match(/^[0-9a-f.:/]+$/)) throw t;
    if (e.match(/^[0-9.]+$/)) {
      var r = e.split(".");
      if (r.length !== 4) throw t;
      var i = "";
      try {
        for (var s = 0; s < 4; s++) {
          var n = parseInt(r[s]);
          i += ("0" + n.toString(16)).slice(-2);
        }
        return i;
      } catch {
        throw t;
      }
    } else if (e.match(/^[0-9.]+\/[0-9]+$/)) {
      var h = e.split("/");
      return yt(h[0]) + kt(parseInt(h[1]), 32);
    } else {
      if (e.match(/^[0-9a-f:]+$/) && e.indexOf(":") !== -1) return gt(e);
      if (e.match(/^[0-9a-f:]+\/[0-9]+$/) && e.indexOf(":") !== -1) {
        var h = e.split("/");
        return gt(h[0]) + kt(parseInt(h[1]), 128);
      } else throw t;
    }
  }
  function kt(e, t) {
    if (t == 32 && e == 0) return "00000000";
    if (t == 128 && e == 0) return "00000000000000000000000000000000";
    var r = Array(e + 1).join("1") + Array(t - e + 1).join("0");
    return new C(r, 2).toString(16);
  }
  function mt(e) {
    function t(s) {
      var n = parseInt(s.substr(0, 2), 16), h = parseInt(s.substr(2), 16);
      if (n == 0 & h < 128) return String.fromCharCode(h);
      if (n < 8) {
        var u = 192 | (n & 7) << 3 | (h & 192) >> 6, d = 128 | h & 63;
        return W(u.toString(16) + d.toString(16));
      }
      var u = 224 | (n & 240) >> 4, d = 128 | (n & 15) << 2 | (h & 192) >> 6, l = 128 | h & 63;
      return W(u.toString(16) + d.toString(16) + l.toString(16));
    }
    var r = e.match(/.{4}/g), i = r.map(t);
    return i.join("");
  }
  function it(e) {
    for (var t = encodeURIComponent(e), r = "", i = 0; i < t.length; i++) t[i] == "%" ? (r = r + t.substr(i, 3), i = i + 2) : r = r + "%" + pe(t[i]);
    return r;
  }
  function kn(e) {
    return e = e.replace(/\r\n/mg, `
`), e;
  }
  function Mn(e) {
    return e = e.replace(/\r\n/mg, `
`), e = e.replace(/\n/mg, `\r
`), e;
  }
  a.lang.String.isInteger = function(e) {
    return e.match(/^[0-9]+$/) ? true : !!e.match(/^-[0-9]+$/);
  }, a.lang.String.isHex = function(e) {
    return Mt(e);
  };
  function Mt(e) {
    return !!(e.length % 2 == 0 && (e.match(/^[0-9a-f]+$/) || e.match(/^[0-9A-F]+$/)));
  }
  a.lang.String.isBase64 = function(e) {
    return e = e.replace(/\s+/g, ""), !!(e.match(/^[0-9A-Za-z+\/]+={0,3}$/) && e.length % 4 == 0);
  }, a.lang.String.isBase64URL = function(e) {
    return e.match(/[+/=]/) ? false : (e = Ue(e), a.lang.String.isBase64(e));
  };
  function xt(e) {
    return !!e.match(/^[0-9A-Za-z-_.]+$/);
  }
  a.lang.String.isIntegerArray = function(e) {
    return e = e.replace(/\s+/g, ""), !!e.match(/^\[[0-9,]+\]$/);
  }, a.lang.String.isPrintable = function(e) {
    return e.match(/^[0-9A-Za-z '()+,-./:=?]*$/) !== null;
  }, a.lang.String.isIA5 = function(e) {
    return e.match(/^[\x20-\x21\x23-\x7f]*$/) !== null;
  }, a.lang.String.isMail = function(e) {
    return e.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/) !== null;
  };
  function St(e) {
    return e.length % 2 == 1 ? "0" + e : e.substr(0, 1) > "7" ? "00" + e : e;
  }
  function _n(e) {
    e = e.replace(/^\s*\[\s*/, ""), e = e.replace(/\s*\]\s*$/, ""), e = e.replace(/\s*/g, "");
    try {
      var t = e.split(/,/).map(function(r, i, s) {
        var n = parseInt(r);
        if (n < 0 || 255 < n) throw "integer not in range 0-255";
        var h = ("00" + n.toString(16)).slice(-2);
        return h;
      }).join("");
      return t;
    } catch (r) {
      throw "malformed integer array string: " + r;
    }
  }
  var Un = function(e, t) {
    var r = e.length;
    e.length > t.length && (r = t.length);
    for (var i = 0; i < r; i++) if (e.charCodeAt(i) != t.charCodeAt(i)) return i;
    return e.length != t.length ? r : -1;
  };
  function _t(e) {
    var t = function(u) {
      var d = u.toString(16);
      return d.length == 1 && (d = "0" + d), d;
    }, r = function(u) {
      var d = "", l = parseInt(u, 10), y = l.toString(2), p = 7 - y.length % 7;
      p == 7 && (p = 0);
      for (var o = "", c = 0; c < p; c++) o += "0";
      y = o + y;
      for (var c = 0; c < y.length - 1; c += 7) {
        var f = y.substr(c, 7);
        c != y.length - 7 && (f = "1" + f), d += t(parseInt(f, 2));
      }
      return d;
    };
    try {
      if (!e.match(/^[0-9.]+$/)) return null;
      var i = "", s = e.split("."), n = parseInt(s[0], 10) * 40 + parseInt(s[1], 10);
      i += t(n), s.splice(0, 2);
      for (var h = 0; h < s.length; h++) i += r(s[h]);
      return i;
    } catch {
      return null;
    }
  }
  function nt(e) {
    if (!Mt(e)) return null;
    try {
      var t = [], r = e.substr(0, 2), i = parseInt(r, 16);
      t[0] = new String(Math.floor(i / 40)), t[1] = new String(i % 40);
      for (var s = e.substr(2), n = [], h = 0; h < s.length / 2; h++) n.push(parseInt(s.substr(h * 2, 2), 16));
      for (var u = [], d = "", h = 0; h < n.length; h++) n[h] & 128 ? d = d + st((n[h] & 127).toString(2), 7) : (d = d + st((n[h] & 127).toString(2), 7), u.push(new String(parseInt(d, 2))), d = "");
      var l = t.join(".");
      return u.length > 0 && (l = l + "." + u.join(".")), l;
    } catch {
      return null;
    }
  }
  var st = function(e, t, r) {
    return r == null && (r = "0"), e.length >= t ? e : new Array(t - e.length + 1).join(r) + e;
  };
  function Ut(e) {
    if (e.length % 2 != 0 || (e = e.toLowerCase(), e.match(/^[0-9a-f]+$/) == null)) return -1;
    try {
      var t = e.substr(0, 2);
      if (t == "00") return parseInt(e.substr(2), 16);
      var r = parseInt(t, 16);
      if (r > 7) return -1;
      var i = e.substr(2), s = parseInt(i, 16).toString(2);
      s == "0" && (s = "00000000"), s = s.slice(0, 0 - r);
      var n = parseInt(s, 2);
      return n == NaN ? -1 : n;
    } catch {
      return -1;
    }
  }
  function Gt(e) {
    if (typeof e != "number" || e < 0) return null;
    var t = Number(e).toString(2), r = 8 - t.length % 8;
    r == 8 && (r = 0), t = t + st("", r, "0");
    var i = parseInt(t, 2).toString(16);
    i.length % 2 == 1 && (i = "0" + i);
    var s = "0" + r;
    return s + i;
  }
  function zt(e) {
    if (typeof e != "string" || e.length % 2 != 0 || !e.match(/^[0-9a-f]+$/)) return null;
    try {
      var t = parseInt(e.substr(0, 2), 16);
      if (t < 0 || 7 < t) return null;
      for (var r = e.substr(2), i = "", s = 0; s < r.length; s += 2) {
        var n = r.substr(s, 2), h = parseInt(n, 16).toString(2);
        h = ("0000000" + h).slice(-8), i += h;
      }
      return i.substr(0, i.length - t);
    } catch {
      return null;
    }
  }
  function Gn(e) {
    if (typeof e != "string" || e.match(/^[01]+$/) == null) return null;
    try {
      var t = parseInt(e, 2);
      return Gt(t);
    } catch {
      return null;
    }
  }
  function at(e, t) {
    for (var r = 0, i = 0; i < e.length; i++) r |= 1 << t[e[i]];
    for (var s = r.toString(2), n = "", i = s.length - 1; i >= 0; i--) n += s[i];
    return n;
  }
  function N(e, t) {
    var r = function() {
    };
    r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e, e.superclass = t.prototype, t.prototype.constructor == Object.prototype.constructor && (t.prototype.constructor = t);
  }
  (typeof a > "u" || !a) && (a = {}), (typeof a.crypto > "u" || !a.crypto) && (a.crypto = {}), a.crypto.Util = new function() {
    this.DIGESTINFOHEAD = { sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", ripemd160: "3021300906052b2403020105000414" }, this.DEFAULTPROVIDER = { md5: "cryptojs", sha1: "cryptojs", sha224: "cryptojs", sha256: "cryptojs", sha384: "cryptojs", sha512: "cryptojs", ripemd160: "cryptojs", hmacmd5: "cryptojs", hmacsha1: "cryptojs", hmacsha224: "cryptojs", hmacsha256: "cryptojs", hmacsha384: "cryptojs", hmacsha512: "cryptojs", hmacripemd160: "cryptojs", MD5withRSA: "cryptojs/jsrsa", SHA1withRSA: "cryptojs/jsrsa", SHA224withRSA: "cryptojs/jsrsa", SHA256withRSA: "cryptojs/jsrsa", SHA384withRSA: "cryptojs/jsrsa", SHA512withRSA: "cryptojs/jsrsa", RIPEMD160withRSA: "cryptojs/jsrsa", MD5withECDSA: "cryptojs/jsrsa", SHA1withECDSA: "cryptojs/jsrsa", SHA224withECDSA: "cryptojs/jsrsa", SHA256withECDSA: "cryptojs/jsrsa", SHA384withECDSA: "cryptojs/jsrsa", SHA512withECDSA: "cryptojs/jsrsa", RIPEMD160withECDSA: "cryptojs/jsrsa", SHA1withDSA: "cryptojs/jsrsa", SHA224withDSA: "cryptojs/jsrsa", SHA256withDSA: "cryptojs/jsrsa", MD5withRSAandMGF1: "cryptojs/jsrsa", SHAwithRSAandMGF1: "cryptojs/jsrsa", SHA1withRSAandMGF1: "cryptojs/jsrsa", SHA224withRSAandMGF1: "cryptojs/jsrsa", SHA256withRSAandMGF1: "cryptojs/jsrsa", SHA384withRSAandMGF1: "cryptojs/jsrsa", SHA512withRSAandMGF1: "cryptojs/jsrsa", RIPEMD160withRSAandMGF1: "cryptojs/jsrsa" }, this.CRYPTOJSMESSAGEDIGESTNAME = { md5: L.algo.MD5, sha1: L.algo.SHA1, sha224: L.algo.SHA224, sha256: L.algo.SHA256, sha384: L.algo.SHA384, sha512: L.algo.SHA512, ripemd160: L.algo.RIPEMD160 }, this.getDigestInfoHex = function(e, t) {
      if (typeof this.DIGESTINFOHEAD[t] > "u") throw "alg not supported in Util.DIGESTINFOHEAD: " + t;
      return this.DIGESTINFOHEAD[t] + e;
    }, this.getPaddedDigestInfoHex = function(e, t, r) {
      var i = this.getDigestInfoHex(e, t), s = r / 4;
      if (i.length + 22 > s) throw "key is too short for SigAlg: keylen=" + r + "," + t;
      for (var n = "0001", h = "00" + i, u = "", d = s - n.length - h.length, l = 0; l < d; l += 2) u += "ff";
      var y = n + u + h;
      return y;
    }, this.hashString = function(e, t) {
      var r = new a.crypto.MessageDigest({ alg: t });
      return r.digestString(e);
    }, this.hashHex = function(e, t) {
      var r = new a.crypto.MessageDigest({ alg: t });
      return r.digestHex(e);
    }, this.sha1 = function(e) {
      return this.hashString(e, "sha1");
    }, this.sha256 = function(e) {
      return this.hashString(e, "sha256");
    }, this.sha256Hex = function(e) {
      return this.hashHex(e, "sha256");
    }, this.sha512 = function(e) {
      return this.hashString(e, "sha512");
    }, this.sha512Hex = function(e) {
      return this.hashHex(e, "sha512");
    }, this.isKey = function(e) {
      return e instanceof q || e instanceof a.crypto.DSA || e instanceof a.crypto.ECDSA;
    };
  }(), a.crypto.Util.md5 = function(e) {
    var t = new a.crypto.MessageDigest({ alg: "md5", prov: "cryptojs" });
    return t.digestString(e);
  }, a.crypto.Util.ripemd160 = function(e) {
    var t = new a.crypto.MessageDigest({ alg: "ripemd160", prov: "cryptojs" });
    return t.digestString(e);
  }, a.crypto.Util.SECURERANDOMGEN = new Ne(), a.crypto.Util.getRandomHexOfNbytes = function(e) {
    var t = new Array(e);
    return a.crypto.Util.SECURERANDOMGEN.nextBytes(t), Ze(t);
  }, a.crypto.Util.getRandomBigIntegerOfNbytes = function(e) {
    return new C(a.crypto.Util.getRandomHexOfNbytes(e), 16);
  }, a.crypto.Util.getRandomHexOfNbits = function(e) {
    var t = e % 8, r = (e - t) / 8, i = new Array(r + 1);
    return a.crypto.Util.SECURERANDOMGEN.nextBytes(i), i[0] = (255 << t & 255 ^ 255) & i[0], Ze(i);
  }, a.crypto.Util.getRandomBigIntegerOfNbits = function(e) {
    return new C(a.crypto.Util.getRandomHexOfNbits(e), 16);
  }, a.crypto.Util.getRandomBigIntegerZeroToMax = function(e) {
    for (var t = e.bitLength(); ; ) {
      var r = a.crypto.Util.getRandomBigIntegerOfNbits(t);
      if (e.compareTo(r) != -1) return r;
    }
  }, a.crypto.Util.getRandomBigIntegerMinToMax = function(e, t) {
    var r = e.compareTo(t);
    if (r == 1) throw "biMin is greater than biMax";
    if (r == 0) return e;
    var i = t.subtract(e), s = a.crypto.Util.getRandomBigIntegerZeroToMax(i);
    return s.add(e);
  }, a.crypto.MessageDigest = function(e) {
    this.setAlgAndProvider = function(t, r) {
      if (t = a.crypto.MessageDigest.getCanonicalAlgName(t), t !== null && r === void 0 && (r = a.crypto.Util.DEFAULTPROVIDER[t]), ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(t) != -1 && r == "cryptojs") {
        try {
          this.md = a.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[t].create();
        } catch (i) {
          throw "setAlgAndProvider hash alg set fail alg=" + t + "/" + i;
        }
        this.updateString = function(i) {
          this.md.update(i);
        }, this.updateHex = function(i) {
          var s = L.enc.Hex.parse(i);
          this.md.update(s);
        }, this.digest = function() {
          var i = this.md.finalize();
          return i.toString(L.enc.Hex);
        }, this.digestString = function(i) {
          return this.updateString(i), this.digest();
        }, this.digestHex = function(i) {
          return this.updateHex(i), this.digest();
        };
      }
      if (":sha256:".indexOf(t) != -1 && r == "sjcl") {
        try {
          this.md = new sjcl.hash.sha256();
        } catch (i) {
          throw "setAlgAndProvider hash alg set fail alg=" + t + "/" + i;
        }
        this.updateString = function(i) {
          this.md.update(i);
        }, this.updateHex = function(i) {
          var s = sjcl.codec.hex.toBits(i);
          this.md.update(s);
        }, this.digest = function() {
          var i = this.md.finalize();
          return sjcl.codec.hex.fromBits(i);
        }, this.digestString = function(i) {
          return this.updateString(i), this.digest();
        }, this.digestHex = function(i) {
          return this.updateHex(i), this.digest();
        };
      }
    }, this.updateString = function(t) {
      throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    }, this.updateHex = function(t) {
      throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    }, this.digest = function() {
      throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName;
    }, this.digestString = function(t) {
      throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    }, this.digestHex = function(t) {
      throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    }, e !== void 0 && e.alg !== void 0 && (this.algName = e.alg, e.prov === void 0 && (this.provName = a.crypto.Util.DEFAULTPROVIDER[this.algName]), this.setAlgAndProvider(this.algName, this.provName));
  }, a.crypto.MessageDigest.getCanonicalAlgName = function(e) {
    return typeof e == "string" && (e = e.toLowerCase(), e = e.replace(/-/, "")), e;
  }, a.crypto.MessageDigest.getHashLength = function(e) {
    var t = a.crypto.MessageDigest, r = t.getCanonicalAlgName(e);
    if (t.HASHLENGTH[r] === void 0) throw "not supported algorithm: " + e;
    return t.HASHLENGTH[r];
  }, a.crypto.MessageDigest.HASHLENGTH = { md5: 16, sha1: 20, sha224: 28, sha256: 32, sha384: 48, sha512: 64, ripemd160: 20 }, a.crypto.Mac = function(e) {
    this.setAlgAndProvider = function(t, r) {
      if (t = t.toLowerCase(), t == null && (t = "hmacsha1"), t = t.toLowerCase(), t.substr(0, 4) != "hmac") throw "setAlgAndProvider unsupported HMAC alg: " + t;
      r === void 0 && (r = a.crypto.Util.DEFAULTPROVIDER[t]), this.algProv = t + "/" + r;
      var i = t.substr(4);
      if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(i) != -1 && r == "cryptojs") {
        try {
          var s = a.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[i];
          this.mac = L.algo.HMAC.create(s, this.pass);
        } catch (n) {
          throw "setAlgAndProvider hash alg set fail hashAlg=" + i + "/" + n;
        }
        this.updateString = function(n) {
          this.mac.update(n);
        }, this.updateHex = function(n) {
          var h = L.enc.Hex.parse(n);
          this.mac.update(h);
        }, this.doFinal = function() {
          var n = this.mac.finalize();
          return n.toString(L.enc.Hex);
        }, this.doFinalString = function(n) {
          return this.updateString(n), this.doFinal();
        }, this.doFinalHex = function(n) {
          return this.updateHex(n), this.doFinal();
        };
      }
    }, this.updateString = function(t) {
      throw "updateString(str) not supported for this alg/prov: " + this.algProv;
    }, this.updateHex = function(t) {
      throw "updateHex(hex) not supported for this alg/prov: " + this.algProv;
    }, this.doFinal = function() {
      throw "digest() not supported for this alg/prov: " + this.algProv;
    }, this.doFinalString = function(t) {
      throw "digestString(str) not supported for this alg/prov: " + this.algProv;
    }, this.doFinalHex = function(t) {
      throw "digestHex(hex) not supported for this alg/prov: " + this.algProv;
    }, this.setPassword = function(t) {
      if (typeof t == "string") {
        var r = t;
        (t.length % 2 == 1 || !t.match(/^[0-9A-Fa-f]+$/)) && (r = xe(t)), this.pass = L.enc.Hex.parse(r);
        return;
      }
      if (typeof t != "object") throw "KJUR.crypto.Mac unsupported password type: " + t;
      var r = null;
      if (t.hex !== void 0) {
        if (t.hex.length % 2 != 0 || !t.hex.match(/^[0-9A-Fa-f]+$/)) throw "Mac: wrong hex password: " + t.hex;
        r = t.hex;
      }
      if (t.utf8 !== void 0 && (r = Qe(t.utf8)), t.rstr !== void 0 && (r = xe(t.rstr)), t.b64 !== void 0 && (r = Ke(t.b64)), t.b64u !== void 0 && (r = Y(t.b64u)), r == null) throw "KJUR.crypto.Mac unsupported password type: " + t;
      this.pass = L.enc.Hex.parse(r);
    }, e !== void 0 && (e.pass !== void 0 && this.setPassword(e.pass), e.alg !== void 0 && (this.algName = e.alg, e.prov === void 0 && (this.provName = a.crypto.Util.DEFAULTPROVIDER[this.algName]), this.setAlgAndProvider(this.algName, this.provName)));
  }, a.crypto.Signature = function(e) {
    var t = null;
    if (this._setAlgNames = function() {
      var r = this.algName.match(/^(.+)with(.+)$/);
      r && (this.mdAlgName = r[1].toLowerCase(), this.pubkeyAlgName = r[2].toLowerCase(), this.pubkeyAlgName == "rsaandmgf1" && this.mdAlgName == "sha" && (this.mdAlgName = "sha1"));
    }, this._zeroPaddingOfSignature = function(r, i) {
      for (var s = "", n = i / 4 - r.length, h = 0; h < n; h++) s = s + "0";
      return s + r;
    }, this.setAlgAndProvider = function(r, i) {
      if (this._setAlgNames(), i != "cryptojs/jsrsa") throw new Error("provider not supported: " + i);
      if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName) != -1) {
        try {
          this.md = new a.crypto.MessageDigest({ alg: this.mdAlgName });
        } catch (s) {
          throw new Error("setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + s);
        }
        this.init = function(s, n) {
          var h = null;
          try {
            n === void 0 ? h = U.getKey(s) : h = U.getKey(s, n);
          } catch (u) {
            throw "init failed:" + u;
          }
          if (h.isPrivate === true) this.prvKey = h, this.state = "SIGN";
          else if (h.isPublic === true) this.pubKey = h, this.state = "VERIFY";
          else throw "init failed.:" + h;
        }, this.updateString = function(s) {
          this.md.updateString(s);
        }, this.updateHex = function(s) {
          this.md.updateHex(s);
        }, this.sign = function() {
          if (this.sHashHex = this.md.digest(), this.prvKey === void 0 && this.ecprvhex !== void 0 && this.eccurvename !== void 0 && a.crypto.ECDSA !== void 0 && (this.prvKey = new a.crypto.ECDSA({ curve: this.eccurvename, prv: this.ecprvhex })), this.prvKey instanceof q && this.pubkeyAlgName === "rsaandmgf1") this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen);
          else if (this.prvKey instanceof q && this.pubkeyAlgName === "rsa") this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName);
          else if (this.prvKey instanceof a.crypto.ECDSA) this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
          else if (this.prvKey instanceof a.crypto.DSA) this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
          else throw "Signature: unsupported private key alg: " + this.pubkeyAlgName;
          return this.hSign;
        }, this.signString = function(s) {
          return this.updateString(s), this.sign();
        }, this.signHex = function(s) {
          return this.updateHex(s), this.sign();
        }, this.verify = function(s) {
          if (this.sHashHex = this.md.digest(), this.pubKey === void 0 && this.ecpubhex !== void 0 && this.eccurvename !== void 0 && a.crypto.ECDSA !== void 0 && (this.pubKey = new a.crypto.ECDSA({ curve: this.eccurvename, pub: this.ecpubhex })), this.pubKey instanceof q && this.pubkeyAlgName === "rsaandmgf1") return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, s, this.mdAlgName, this.pssSaltLen);
          if (this.pubKey instanceof q && this.pubkeyAlgName === "rsa") return this.pubKey.verifyWithMessageHash(this.sHashHex, s);
          if (a.crypto.ECDSA !== void 0 && this.pubKey instanceof a.crypto.ECDSA) return this.pubKey.verifyWithMessageHash(this.sHashHex, s);
          if (a.crypto.DSA !== void 0 && this.pubKey instanceof a.crypto.DSA) return this.pubKey.verifyWithMessageHash(this.sHashHex, s);
          throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
        };
      }
    }, this.init = function(r, i) {
      throw "init(key, pass) not supported for this alg:prov=" + this.algProvName;
    }, this.updateString = function(r) {
      throw "updateString(str) not supported for this alg:prov=" + this.algProvName;
    }, this.updateHex = function(r) {
      throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName;
    }, this.sign = function() {
      throw "sign() not supported for this alg:prov=" + this.algProvName;
    }, this.signString = function(r) {
      throw "digestString(str) not supported for this alg:prov=" + this.algProvName;
    }, this.signHex = function(r) {
      throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName;
    }, this.verify = function(r) {
      throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName;
    }, this.initParams = e, e !== void 0 && (e.alg !== void 0 && (this.algName = e.alg, e.prov === void 0 ? this.provName = a.crypto.Util.DEFAULTPROVIDER[this.algName] : this.provName = e.prov, this.algProvName = this.algName + ":" + this.provName, this.setAlgAndProvider(this.algName, this.provName), this._setAlgNames()), e.psssaltlen !== void 0 && (this.pssSaltLen = e.psssaltlen), e.prvkeypem !== void 0)) {
      if (e.prvkeypas !== void 0) throw "both prvkeypem and prvkeypas parameters not supported";
      try {
        var t = U.getKey(e.prvkeypem);
        this.init(t);
      } catch (r) {
        throw "fatal error to load pem private key: " + r;
      }
    }
  }, a.crypto.Cipher = function(e) {
  }, a.crypto.Cipher.encrypt = function(e, t, r) {
    if (t instanceof q && t.isPublic) {
      var i = a.crypto.Cipher.getAlgByKeyAndName(t, r);
      if (i === "RSA") return t.encrypt(e);
      if (i === "RSAOAEP") return t.encryptOAEP(e, "sha1");
      var s = i.match(/^RSAOAEP(\d+)$/);
      if (s !== null) return t.encryptOAEP(e, "sha" + s[1]);
      throw "Cipher.encrypt: unsupported algorithm for RSAKey: " + r;
    } else throw "Cipher.encrypt: unsupported key or algorithm";
  }, a.crypto.Cipher.decrypt = function(e, t, r) {
    if (t instanceof q && t.isPrivate) {
      var i = a.crypto.Cipher.getAlgByKeyAndName(t, r);
      if (i === "RSA") return t.decrypt(e);
      if (i === "RSAOAEP") return t.decryptOAEP(e, "sha1");
      var s = i.match(/^RSAOAEP(\d+)$/);
      if (s !== null) return t.decryptOAEP(e, "sha" + s[1]);
      throw "Cipher.decrypt: unsupported algorithm for RSAKey: " + r;
    } else throw "Cipher.decrypt: unsupported key or algorithm";
  }, a.crypto.Cipher.getAlgByKeyAndName = function(e, t) {
    if (e instanceof q) {
      if (":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(t) != -1) return t;
      if (t == null) return "RSA";
      throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: " + t;
    }
    throw "getAlgByKeyAndName: not supported algorithm name: " + t;
  }, a.crypto.OID = new function() {
    this.oidhex2name = { "2a864886f70d010101": "rsaEncryption", "2a8648ce3d0201": "ecPublicKey", "2a8648ce380401": "dsa", "2a8648ce3d030107": "secp256r1", "2b8104001f": "secp192k1", "2b81040021": "secp224r1", "2b8104000a": "secp256k1", "2b81040022": "secp384r1", "2b81040023": "secp521r1", "2a8648ce380403": "SHA1withDSA", "608648016503040301": "SHA224withDSA", "608648016503040302": "SHA256withDSA" };
  }(), (typeof a > "u" || !a) && (a = {}), (typeof a.crypto > "u" || !a.crypto) && (a.crypto = {}), a.crypto.ECDSA = function(e) {
    var t = "secp256r1", r = Error, i = C, s = _, n = a.crypto.ECDSA, h = a.crypto.ECParameterDB, u = n.getName, d = j, l = d.getVbyListEx, y = d.isASN1HEX, p = new Ne();
    this.type = "EC", this.isPrivate = false, this.isPublic = false, this.getBigRandom = function(o) {
      return new i(o.bitLength(), p).mod(o.subtract(i.ONE)).add(i.ONE);
    }, this.setNamedCurve = function(o) {
      this.ecparams = h.getByName(o), this.prvKeyHex = null, this.pubKeyHex = null, this.curveName = o;
    }, this.setPrivateKeyHex = function(o) {
      this.isPrivate = true, this.prvKeyHex = o;
    }, this.setPublicKeyHex = function(o) {
      this.isPublic = true, this.pubKeyHex = o;
    }, this.getPublicKeyXYHex = function() {
      var o = this.pubKeyHex;
      if (o.substr(0, 2) !== "04") throw "this method supports uncompressed format(04) only";
      var c = this.ecparams.keycharlen;
      if (o.length !== 2 + c * 2) throw "malformed public key hex length";
      var f = {};
      return f.x = o.substr(2, c), f.y = o.substr(2 + c), f;
    }, this.getShortNISTPCurveName = function() {
      var o = this.curveName;
      return o === "secp256r1" || o === "NIST P-256" || o === "P-256" || o === "prime256v1" ? "P-256" : o === "secp384r1" || o === "NIST P-384" || o === "P-384" ? "P-384" : o === "secp521r1" || o === "NIST P-521" || o === "P-521" ? "P-521" : null;
    }, this.generateKeyPairHex = function() {
      var o = this.ecparams.n, c = this.getBigRandom(o), f = this.ecparams.keycharlen, g = ("0000000000" + c.toString(16)).slice(-f);
      this.setPrivateKeyHex(g);
      var v = this.generatePublicKeyHex();
      return { ecprvhex: g, ecpubhex: v };
    }, this.generatePublicKeyHex = function() {
      var o = new i(this.prvKeyHex, 16), c = this.ecparams.G.multiply(o), f = c.getX().toBigInteger(), g = c.getY().toBigInteger(), v = this.ecparams.keycharlen, x = ("0000000000" + f.toString(16)).slice(-v), b = ("0000000000" + g.toString(16)).slice(-v), I = "04" + x + b;
      return this.setPublicKeyHex(I), I;
    }, this.signWithMessageHash = function(o) {
      return this.signHex(o, this.prvKeyHex);
    }, this.signHex = function(o, c) {
      var f = new i(c, 16), g = this.ecparams.n, v = new i(o.substring(0, this.ecparams.keycharlen), 16);
      do
        var x = this.getBigRandom(g), b = this.ecparams.G, I = b.multiply(x), A = I.getX().toBigInteger().mod(g);
      while (A.compareTo(i.ZERO) <= 0);
      var m = x.modInverse(g).multiply(v.add(f.multiply(A))).mod(g);
      return n.biRSSigToASN1Sig(A, m);
    }, this.sign = function(o, c) {
      var f = c, g = this.ecparams.n, v = i.fromByteArrayUnsigned(o);
      do
        var x = this.getBigRandom(g), b = this.ecparams.G, I = b.multiply(x), A = I.getX().toBigInteger().mod(g);
      while (A.compareTo(C.ZERO) <= 0);
      var m = x.modInverse(g).multiply(v.add(f.multiply(A))).mod(g);
      return this.serializeSig(A, m);
    }, this.verifyWithMessageHash = function(o, c) {
      return this.verifyHex(o, c, this.pubKeyHex);
    }, this.verifyHex = function(o, c, f) {
      try {
        var g, v, x = n.parseSigHex(c);
        g = x.r, v = x.s;
        var b = s.decodeFromHex(this.ecparams.curve, f), I = new i(o.substring(0, this.ecparams.keycharlen), 16);
        return this.verifyRaw(I, g, v, b);
      } catch {
        return false;
      }
    }, this.verify = function(o, c, f) {
      var g, v;
      if (Bitcoin.Util.isArray(c)) {
        var x = this.parseSig(c);
        g = x.r, v = x.s;
      } else if (typeof c == "object" && c.r && c.s) g = c.r, v = c.s;
      else throw "Invalid value for signature";
      var b;
      if (f instanceof _) b = f;
      else if (Bitcoin.Util.isArray(f)) b = s.decodeFrom(this.ecparams.curve, f);
      else throw "Invalid format for pubkey value, must be byte array or ECPointFp";
      var I = i.fromByteArrayUnsigned(o);
      return this.verifyRaw(I, g, v, b);
    }, this.verifyRaw = function(o, c, f, g) {
      var v = this.ecparams.n, x = this.ecparams.G;
      if (c.compareTo(i.ONE) < 0 || c.compareTo(v) >= 0 || f.compareTo(i.ONE) < 0 || f.compareTo(v) >= 0) return false;
      var b = f.modInverse(v), I = o.multiply(b).mod(v), A = c.multiply(b).mod(v), m = x.multiply(I).add(g.multiply(A)), E = m.getX().toBigInteger().mod(v);
      return E.equals(c);
    }, this.serializeSig = function(o, c) {
      var f = o.toByteArraySigned(), g = c.toByteArraySigned(), v = [];
      return v.push(2), v.push(f.length), v = v.concat(f), v.push(2), v.push(g.length), v = v.concat(g), v.unshift(v.length), v.unshift(48), v;
    }, this.parseSig = function(o) {
      var c;
      if (o[0] != 48) throw new Error("Signature not a valid DERSequence");
      if (c = 2, o[c] != 2) throw new Error("First element in signature must be a DERInteger");
      var f = o.slice(c + 2, c + 2 + o[c + 1]);
      if (c += 2 + o[c + 1], o[c] != 2) throw new Error("Second element in signature must be a DERInteger");
      var g = o.slice(c + 2, c + 2 + o[c + 1]);
      c += 2 + o[c + 1];
      var v = i.fromByteArrayUnsigned(f), x = i.fromByteArrayUnsigned(g);
      return { r: v, s: x };
    }, this.parseSigCompact = function(o) {
      if (o.length !== 65) throw "Signature has the wrong length";
      var c = o[0] - 27;
      if (c < 0 || c > 7) throw "Invalid signature type";
      var f = this.ecparams.n, g = i.fromByteArrayUnsigned(o.slice(1, 33)).mod(f), v = i.fromByteArrayUnsigned(o.slice(33, 65)).mod(f);
      return { r: g, s: v, i: c };
    }, this.readPKCS5PrvKeyHex = function(o) {
      if (y(o) === false) throw new Error("not ASN.1 hex string");
      var c, f, g;
      try {
        c = l(o, 0, ["[0]", 0], "06"), f = l(o, 0, [1], "04");
        try {
          g = l(o, 0, ["[1]", 0], "03");
        } catch {
        }
      } catch {
        throw new Error("malformed PKCS#1/5 plain ECC private key");
      }
      if (this.curveName = u(c), this.curveName === void 0) throw "unsupported curve name";
      this.setNamedCurve(this.curveName), this.setPublicKeyHex(g), this.setPrivateKeyHex(f), this.isPublic = false;
    }, this.readPKCS8PrvKeyHex = function(o) {
      if (y(o) === false) throw new r("not ASN.1 hex string");
      var c, f, g, v;
      try {
        c = l(o, 0, [1, 0], "06"), f = l(o, 0, [1, 1], "06"), g = l(o, 0, [2, 0, 1], "04");
        try {
          v = l(o, 0, [2, 0, "[1]", 0], "03");
        } catch {
        }
      } catch {
        throw new r("malformed PKCS#8 plain ECC private key");
      }
      if (this.curveName = u(f), this.curveName === void 0) throw new r("unsupported curve name");
      this.setNamedCurve(this.curveName), this.setPublicKeyHex(v), this.setPrivateKeyHex(g), this.isPublic = false;
    }, this.readPKCS8PubKeyHex = function(o) {
      if (y(o) === false) throw new r("not ASN.1 hex string");
      var c, f, g;
      try {
        c = l(o, 0, [0, 0], "06"), f = l(o, 0, [0, 1], "06"), g = l(o, 0, [1], "03");
      } catch {
        throw new r("malformed PKCS#8 ECC public key");
      }
      if (this.curveName = u(f), this.curveName === null) throw new r("unsupported curve name");
      this.setNamedCurve(this.curveName), this.setPublicKeyHex(g);
    }, this.readCertPubKeyHex = function(o, c) {
      if (y(o) === false) throw new r("not ASN.1 hex string");
      var f, g;
      try {
        f = l(o, 0, [0, 5, 0, 1], "06"), g = l(o, 0, [0, 5, 1], "03");
      } catch {
        throw new r("malformed X.509 certificate ECC public key");
      }
      if (this.curveName = u(f), this.curveName === null) throw new r("unsupported curve name");
      this.setNamedCurve(this.curveName), this.setPublicKeyHex(g);
    }, e !== void 0 && e.curve !== void 0 && (this.curveName = e.curve), this.curveName === void 0 && (this.curveName = t), this.setNamedCurve(this.curveName), e !== void 0 && (e.prv !== void 0 && this.setPrivateKeyHex(e.prv), e.pub !== void 0 && this.setPublicKeyHex(e.pub));
  }, a.crypto.ECDSA.parseSigHex = function(e) {
    var t = a.crypto.ECDSA.parseSigHexInHexRS(e), r = new C(t.r, 16), i = new C(t.s, 16);
    return { r, s: i };
  }, a.crypto.ECDSA.parseSigHexInHexRS = function(e) {
    var t = j, r = t.getChildIdx, i = t.getV;
    if (t.checkStrictDER(e, 0), e.substr(0, 2) != "30") throw new Error("signature is not a ASN.1 sequence");
    var s = r(e, 0);
    if (s.length != 2) throw new Error("signature shall have two elements");
    var n = s[0], h = s[1];
    if (e.substr(n, 2) != "02") throw new Error("1st item not ASN.1 integer");
    if (e.substr(h, 2) != "02") throw new Error("2nd item not ASN.1 integer");
    var u = i(e, n), d = i(e, h);
    return { r: u, s: d };
  }, a.crypto.ECDSA.asn1SigToConcatSig = function(e) {
    var t = a.crypto.ECDSA.parseSigHexInHexRS(e), r = t.r, i = t.s;
    if (r.length >= 130 && r.length <= 134) {
      if (r.length % 2 != 0) throw Error("unknown ECDSA sig r length error");
      if (i.length % 2 != 0) throw Error("unknown ECDSA sig s length error");
      r.substr(0, 2) == "00" && (r = r.substr(2)), i.substr(0, 2) == "00" && (i = i.substr(2));
      var s = Math.max(r.length, i.length);
      return r = ("000000" + r).slice(-s), i = ("000000" + i).slice(-s), r + i;
    }
    if (r.substr(0, 2) == "00" && r.length % 32 == 2 && (r = r.substr(2)), i.substr(0, 2) == "00" && i.length % 32 == 2 && (i = i.substr(2)), r.length % 32 == 30 && (r = "00" + r), i.length % 32 == 30 && (i = "00" + i), r.length % 32 != 0) throw Error("unknown ECDSA sig r length error");
    if (i.length % 32 != 0) throw Error("unknown ECDSA sig s length error");
    return r + i;
  }, a.crypto.ECDSA.concatSigToASN1Sig = function(e) {
    if (e.length % 4 != 0) throw Error("unknown ECDSA concatinated r-s sig length error");
    var t = e.substr(0, e.length / 2), r = e.substr(e.length / 2);
    return a.crypto.ECDSA.hexRSSigToASN1Sig(t, r);
  }, a.crypto.ECDSA.hexRSSigToASN1Sig = function(e, t) {
    var r = new C(e, 16), i = new C(t, 16);
    return a.crypto.ECDSA.biRSSigToASN1Sig(r, i);
  }, a.crypto.ECDSA.biRSSigToASN1Sig = function(e, t) {
    var r = a.asn1, i = new r.DERInteger({ bigint: e }), s = new r.DERInteger({ bigint: t }), n = new r.DERSequence({ array: [i, s] });
    return n.tohex();
  }, a.crypto.ECDSA.getName = function(e) {
    return e === "2b8104001f" ? "secp192k1" : e === "2a8648ce3d030107" ? "secp256r1" : e === "2b8104000a" ? "secp256k1" : e === "2b81040021" ? "secp224r1" : e === "2b81040022" ? "secp384r1" : e === "2b81040023" ? "secp521r1" : "|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(e) !== -1 ? "secp256r1" : "|secp256k1|".indexOf(e) !== -1 ? "secp256k1" : "|secp224r1|NIST P-224|P-224|".indexOf(e) !== -1 ? "secp224r1" : "|secp384r1|NIST P-384|P-384|".indexOf(e) !== -1 ? "secp384r1" : "|secp521r1|NIST P-521|P-521|".indexOf(e) !== -1 ? "secp521r1" : null;
  }, (typeof a > "u" || !a) && (a = {}), (typeof a.crypto > "u" || !a.crypto) && (a.crypto = {}), a.crypto.ECParameterDB = new function() {
    var e = {}, t = {};
    function r(i) {
      return new C(i, 16);
    }
    this.getByName = function(i) {
      var s = i;
      if (typeof t[s] < "u" && (s = t[i]), typeof e[s] < "u") return e[s];
      throw "unregistered EC curve name: " + s;
    }, this.regist = function(i, s, n, h, u, d, l, y, p, o, c, f) {
      e[i] = {};
      var g = r(n), v = r(h), x = r(u), b = r(d), I = r(l), A = new Pe(g, v, x), m = A.decodePointHex("04" + y + p);
      e[i].name = i, e[i].keylen = s, e[i].keycharlen = Math.ceil(s / 8) * 2, e[i].curve = A, e[i].G = m, e[i].n = b, e[i].h = I, e[i].oid = c, e[i].info = f;
      for (var E = 0; E < o.length; E++) t[o[E]] = i;
    };
  }(), a.crypto.ECParameterDB.regist("secp128r1", 128, "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC", "E87579C11079F43DD824993C2CEE5ED3", "FFFFFFFE0000000075A30D1B9038A115", "1", "161FF7528B899B2D0C28607CA52C5B86", "CF5AC8395BAFEB13C02DA292DDED7A83", [], "", "secp128r1 : SECG curve over a 128 bit prime field"), a.crypto.ECParameterDB.regist("secp160k1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73", "0", "7", "0100000000000000000001B8FA16DFAB9ACA16B6B3", "1", "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB", "938CF935318FDCED6BC28286531733C3F03C4FEE", [], "", "secp160k1 : SECG curve over a 160 bit prime field"), a.crypto.ECParameterDB.regist("secp160r1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC", "1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45", "0100000000000000000001F4C8F927AED3CA752257", "1", "4A96B5688EF573284664698968C38BB913CBFC82", "23A628553168947D59DCC912042351377AC5FB32", [], "", "secp160r1 : SECG curve over a 160 bit prime field"), a.crypto.ECParameterDB.regist("secp192k1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37", "0", "3", "FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D", "1", "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D", "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D", []), a.crypto.ECParameterDB.regist("secp192r1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC", "64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1", "FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831", "1", "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012", "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811", []), a.crypto.ECParameterDB.regist("secp224r1", 224, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE", "B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4", "FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D", "1", "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21", "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34", []), a.crypto.ECParameterDB.regist("secp256k1", 256, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F", "0", "7", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "1", "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", []), a.crypto.ECParameterDB.regist("secp256r1", 256, "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC", "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B", "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551", "1", "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296", "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5", ["NIST P-256", "P-256", "prime256v1"]), a.crypto.ECParameterDB.regist("secp384r1", 384, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC", "B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973", "1", "AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7", "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f", ["NIST P-384", "P-384"]), a.crypto.ECParameterDB.regist("secp521r1", 521, "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC", "051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409", "1", "00C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66", "011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650", ["NIST P-521", "P-521"]), (typeof a > "u" || !a) && (a = {}), (typeof a.crypto > "u" || !a.crypto) && (a.crypto = {}), a.crypto.DSA = function() {
    var e = j;
    e.getVbyList;
    var t = e.getVbyListEx, r = e.isASN1HEX, i = C;
    this.p = null, this.q = null, this.g = null, this.y = null, this.x = null, this.type = "DSA", this.isPrivate = false, this.isPublic = false, this.setPrivate = function(s, n, h, u, d) {
      this.isPrivate = true, this.p = s, this.q = n, this.g = h, this.y = u, this.x = d;
    }, this.setPrivateHex = function(s, n, h, u, d) {
      var l, y, p, o, c;
      l = new C(s, 16), y = new C(n, 16), p = new C(h, 16), typeof u == "string" && u.length > 1 ? o = new C(u, 16) : o = null, c = new C(d, 16), this.setPrivate(l, y, p, o, c);
    }, this.setPublic = function(s, n, h, u) {
      this.isPublic = true, this.p = s, this.q = n, this.g = h, this.y = u, this.x = null;
    }, this.setPublicHex = function(s, n, h, u) {
      var d, l, y, p;
      d = new C(s, 16), l = new C(n, 16), y = new C(h, 16), p = new C(u, 16), this.setPublic(d, l, y, p);
    }, this.signWithMessageHash = function(s) {
      var n = this.p, h = this.q, u = this.g;
      this.y;
      var d = this.x, l = a.crypto.Util.getRandomBigIntegerMinToMax(C.ONE.add(C.ONE), h.subtract(C.ONE)), y = s.substr(0, h.bitLength() / 4), p = new C(y, 16), o = u.modPow(l, n).mod(h), c = l.modInverse(h).multiply(p.add(d.multiply(o))).mod(h), f = a.asn1.ASN1Util.jsonToASN1HEX({ seq: [{ int: { bigint: o } }, { int: { bigint: c } }] });
      return f;
    }, this.verifyWithMessageHash = function(s, n) {
      var h = this.p, u = this.q, d = this.g, l = this.y, y = this.parseASN1Signature(n), p = y[0], o = y[1], c = s.substr(0, u.bitLength() / 4), f = new C(c, 16);
      if (C.ZERO.compareTo(p) > 0 || p.compareTo(u) > 0 || C.ZERO.compareTo(o) >= 0 || o.compareTo(u) > 0) throw "invalid DSA signature";
      var g = o.modInverse(u), v = f.multiply(g).mod(u), x = p.multiply(g).mod(u), b = d.modPow(v, h).multiply(l.modPow(x, h)).mod(h).mod(u);
      return b.compareTo(p) == 0;
    }, this.parseASN1Signature = function(s) {
      try {
        var n = new i(t(s, 0, [0], "02"), 16), h = new i(t(s, 0, [1], "02"), 16);
        return [n, h];
      } catch {
        throw new Error("malformed ASN.1 DSA signature");
      }
    }, this.readPKCS5PrvKeyHex = function(s) {
      var n, h, u, d, l;
      if (r(s) === false) throw new Error("not ASN.1 hex string");
      try {
        n = t(s, 0, [1], "02"), h = t(s, 0, [2], "02"), u = t(s, 0, [3], "02"), d = t(s, 0, [4], "02"), l = t(s, 0, [5], "02");
      } catch {
        throw new Error("malformed PKCS#1/5 plain DSA private key");
      }
      this.setPrivateHex(n, h, u, d, l);
    }, this.readPKCS8PrvKeyHex = function(s) {
      var n, h, u, d;
      if (r(s) === false) throw new Error("not ASN.1 hex string");
      try {
        n = t(s, 0, [1, 1, 0], "02"), h = t(s, 0, [1, 1, 1], "02"), u = t(s, 0, [1, 1, 2], "02"), d = t(s, 0, [2, 0], "02");
      } catch {
        throw new Error("malformed PKCS#8 plain DSA private key");
      }
      this.setPrivateHex(n, h, u, null, d);
    }, this.readPKCS8PubKeyHex = function(s) {
      var n, h, u, d;
      if (r(s) === false) throw new Error("not ASN.1 hex string");
      try {
        n = t(s, 0, [0, 1, 0], "02"), h = t(s, 0, [0, 1, 1], "02"), u = t(s, 0, [0, 1, 2], "02"), d = t(s, 0, [1, 0], "02");
      } catch {
        throw new Error("malformed PKCS#8 DSA public key");
      }
      this.setPublicHex(n, h, u, d);
    }, this.readCertPubKeyHex = function(s, n) {
      var h, u, d, l;
      if (r(s) === false) throw new Error("not ASN.1 hex string");
      try {
        h = t(s, 0, [0, 5, 0, 1, 0], "02"), u = t(s, 0, [0, 5, 0, 1, 1], "02"), d = t(s, 0, [0, 5, 0, 1, 2], "02"), l = t(s, 0, [0, 5, 1, 0], "02");
      } catch {
        throw new Error("malformed X.509 certificate DSA public key");
      }
      this.setPublicHex(h, u, d, l);
    };
  };
  var U = /* @__PURE__ */ (function() {
    var e = function(f, g, v) {
      return i(L.AES, f, g, v);
    }, t = function(f, g, v) {
      return i(L.TripleDES, f, g, v);
    }, r = function(f, g, v) {
      return i(L.DES, f, g, v);
    }, i = function(f, g, v, x) {
      var b = L.enc.Hex.parse(g), I = L.enc.Hex.parse(v), A = L.enc.Hex.parse(x), m = {};
      m.key = I, m.iv = A, m.ciphertext = b;
      var E = f.decrypt(m, I, { iv: A });
      return L.enc.Hex.stringify(E);
    }, s = function(f, g, v) {
      return u(L.AES, f, g, v);
    }, n = function(f, g, v) {
      return u(L.TripleDES, f, g, v);
    }, h = function(f, g, v) {
      return u(L.DES, f, g, v);
    }, u = function(f, g, v, x) {
      var b = L.enc.Hex.parse(g), I = L.enc.Hex.parse(v), A = L.enc.Hex.parse(x), m = f.encrypt(b, I, { iv: A }), E = L.enc.Hex.parse(m.toString()), F = L.enc.Base64.stringify(E);
      return F;
    }, d = { "AES-256-CBC": { proc: e, eproc: s, keylen: 32, ivlen: 16 }, "AES-192-CBC": { proc: e, eproc: s, keylen: 24, ivlen: 16 }, "AES-128-CBC": { proc: e, eproc: s, keylen: 16, ivlen: 16 }, "DES-EDE3-CBC": { proc: t, eproc: n, keylen: 24, ivlen: 8 }, "DES-CBC": { proc: r, eproc: h, keylen: 8, ivlen: 8 } }, l = function(f) {
      var g = L.lib.WordArray.random(f), v = L.enc.Hex.stringify(g);
      return v;
    }, y = function(f) {
      var g = {}, v = f.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"));
      v && (g.cipher = v[1], g.ivsalt = v[2]);
      var x = f.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));
      x && (g.type = x[1]);
      var b = -1, I = 0;
      f.indexOf(`\r
\r
`) != -1 && (b = f.indexOf(`\r
\r
`), I = 2), f.indexOf(`

`) != -1 && (b = f.indexOf(`

`), I = 1);
      var A = f.indexOf("-----END");
      if (b != -1 && A != -1) {
        var m = f.substring(b + I * 2, A - I);
        m = m.replace(/\s+/g, ""), g.data = m;
      }
      return g;
    }, p = function(f, g, v) {
      for (var x = v.substring(0, 16), b = L.enc.Hex.parse(x), I = L.enc.Utf8.parse(g), A = d[f].keylen + d[f].ivlen, m = "", E = null; ; ) {
        var F = L.algo.MD5.create();
        if (E != null && F.update(E), F.update(I), F.update(b), E = F.finalize(), m = m + L.enc.Hex.stringify(E), m.length >= A * 2) break;
      }
      var w = {};
      return w.keyhex = m.substr(0, d[f].keylen * 2), w.ivhex = m.substr(d[f].keylen * 2, d[f].ivlen * 2), w;
    }, o = function(f, g, v, x) {
      var b = L.enc.Base64.parse(f), I = L.enc.Hex.stringify(b), A = d[g].proc, m = A(I, v, x);
      return m;
    }, c = function(f, g, v, x) {
      var b = d[g].eproc, I = b(f, v, x);
      return I;
    };
    return { version: "1.0.0", parsePKCS5PEM: function(f) {
      return y(f);
    }, getKeyAndUnusedIvByPasscodeAndIvsalt: function(f, g, v) {
      return p(f, g, v);
    }, decryptKeyB64: function(f, g, v, x) {
      return o(f, g, v, x);
    }, getDecryptedKeyHex: function(f, g) {
      var v = y(f);
      v.type;
      var x = v.cipher, b = v.ivsalt, I = v.data, A = p(x, g, b), m = A.keyhex, E = o(I, x, m, b);
      return E;
    }, getEncryptedPKCS5PEMFromPrvKeyHex: function(f, g, v, x, b) {
      var S = "";
      if ((typeof x > "u" || x == null) && (x = "AES-256-CBC"), typeof d[x] > "u") throw new Error("KEYUTIL unsupported algorithm: " + x);
      if (typeof b > "u" || b == null) {
        var I = d[x].ivlen, A = l(I);
        b = A.toUpperCase();
      }
      var m = p(x, v, b), E = m.keyhex, F = c(g, x, E, b), w = F.replace(/(.{64})/g, `$1\r
`), S = "-----BEGIN " + f + ` PRIVATE KEY-----\r
`;
      return S += `Proc-Type: 4,ENCRYPTED\r
`, S += "DEK-Info: " + x + "," + b + `\r
`, S += `\r
`, S += w, S += `\r
-----END ` + f + ` PRIVATE KEY-----\r
`, S;
    }, parseHexOfEncryptedPKCS8: function(f) {
      var g = j, v = g.getChildIdx, x = g.getV, b = {}, I = v(f, 0);
      if (I.length != 2) throw new Error("malformed format: SEQUENCE(0).items != 2: " + I.length);
      b.ciphertext = x(f, I[1]);
      var A = v(f, I[0]);
      if (A.length != 2) throw new Error("malformed format: SEQUENCE(0.0).items != 2: " + A.length);
      if (x(f, A[0]) != "2a864886f70d01050d") throw new Error("this only supports pkcs5PBES2");
      var m = v(f, A[1]);
      if (A.length != 2) throw new Error("malformed format: SEQUENCE(0.0.1).items != 2: " + m.length);
      var E = v(f, m[1]);
      if (E.length != 2) throw new Error("malformed format: SEQUENCE(0.0.1.1).items != 2: " + E.length);
      if (x(f, E[0]) != "2a864886f70d0307") throw "this only supports TripleDES";
      b.encryptionSchemeAlg = "TripleDES", b.encryptionSchemeIV = x(f, E[1]);
      var F = v(f, m[0]);
      if (F.length != 2) throw new Error("malformed format: SEQUENCE(0.0.1.0).items != 2: " + F.length);
      if (x(f, F[0]) != "2a864886f70d01050c") throw new Error("this only supports pkcs5PBKDF2");
      var w = v(f, F[1]);
      if (w.length < 2) throw new Error("malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + w.length);
      b.pbkdf2Salt = x(f, w[0]);
      var S = x(f, w[1]);
      try {
        b.pbkdf2Iter = parseInt(S, 16);
      } catch {
        throw new Error("malformed format pbkdf2Iter: " + S);
      }
      return b;
    }, getPBKDF2KeyHexFromParam: function(f, g) {
      var v = L.enc.Hex.parse(f.pbkdf2Salt), x = f.pbkdf2Iter, b = L.PBKDF2(g, v, { keySize: 192 / 32, iterations: x }), I = L.enc.Hex.stringify(b);
      return I;
    }, _getPlainPKCS8HexFromEncryptedPKCS8PEM: function(f, g) {
      var v = ie(f, "ENCRYPTED PRIVATE KEY"), x = this.parseHexOfEncryptedPKCS8(v), b = U.getPBKDF2KeyHexFromParam(x, g), I = {};
      I.ciphertext = L.enc.Hex.parse(x.ciphertext);
      var A = L.enc.Hex.parse(b), m = L.enc.Hex.parse(x.encryptionSchemeIV), E = L.TripleDES.decrypt(I, A, { iv: m }), F = L.enc.Hex.stringify(E);
      return F;
    }, getKeyFromEncryptedPKCS8PEM: function(f, g) {
      var v = this._getPlainPKCS8HexFromEncryptedPKCS8PEM(f, g), x = this.getKeyFromPlainPrivatePKCS8Hex(v);
      return x;
    }, parsePlainPrivatePKCS8Hex: function(f) {
      var g = j, v = g.getChildIdx, x = g.getV, b = {};
      if (b.algparam = null, f.substr(0, 2) != "30") throw new Error("malformed plain PKCS8 private key(code:001)");
      var I = v(f, 0);
      if (I.length < 3) throw new Error("malformed plain PKCS8 private key(code:002)");
      if (f.substr(I[1], 2) != "30") throw new Error("malformed PKCS8 private key(code:003)");
      var A = v(f, I[1]);
      if (A.length != 2) throw new Error("malformed PKCS8 private key(code:004)");
      if (f.substr(A[0], 2) != "06") throw new Error("malformed PKCS8 private key(code:005)");
      if (b.algoid = x(f, A[0]), f.substr(A[1], 2) == "06" && (b.algparam = x(f, A[1])), f.substr(I[2], 2) != "04") throw new Error("malformed PKCS8 private key(code:006)");
      return b.keyidx = g.getVidx(f, I[2]), b;
    }, getKeyFromPlainPrivatePKCS8PEM: function(f) {
      var g = ie(f, "PRIVATE KEY"), v = this.getKeyFromPlainPrivatePKCS8Hex(g);
      return v;
    }, getKeyFromPlainPrivatePKCS8Hex: function(f) {
      var g = this.parsePlainPrivatePKCS8Hex(f), v;
      if (g.algoid == "2a864886f70d010101") v = new q();
      else if (g.algoid == "2a8648ce380401") v = new a.crypto.DSA();
      else if (g.algoid == "2a8648ce3d0201") v = new a.crypto.ECDSA();
      else throw new Error("unsupported private key algorithm");
      return v.readPKCS8PrvKeyHex(f), v;
    }, _getKeyFromPublicPKCS8Hex: function(f) {
      var g, v = j.getVbyList(f, 0, [0, 0], "06");
      if (v === "2a864886f70d010101") g = new q();
      else if (v === "2a8648ce380401") g = new a.crypto.DSA();
      else if (v === "2a8648ce3d0201") g = new a.crypto.ECDSA();
      else throw new Error("unsupported PKCS#8 public key hex");
      return g.readPKCS8PubKeyHex(f), g;
    }, parsePublicRawRSAKeyHex: function(f) {
      var g = j, v = g.getChildIdx, x = g.getV, b = {};
      if (f.substr(0, 2) != "30") throw new Error("malformed RSA key(code:001)");
      var I = v(f, 0);
      if (I.length != 2) throw new Error("malformed RSA key(code:002)");
      if (f.substr(I[0], 2) != "02") throw new Error("malformed RSA key(code:003)");
      if (b.n = x(f, I[0]), f.substr(I[1], 2) != "02") throw new Error("malformed RSA key(code:004)");
      return b.e = x(f, I[1]), b;
    }, parsePublicPKCS8Hex: function(f) {
      var g = j, v = g.getChildIdx, x = g.getV, b = {};
      b.algparam = null;
      var I = v(f, 0);
      if (I.length != 2) throw new Error("outer DERSequence shall have 2 elements: " + I.length);
      var A = I[0];
      if (f.substr(A, 2) != "30") throw new Error("malformed PKCS8 public key(code:001)");
      var m = v(f, A);
      if (m.length != 2) throw new Error("malformed PKCS8 public key(code:002)");
      if (f.substr(m[0], 2) != "06") throw new Error("malformed PKCS8 public key(code:003)");
      if (b.algoid = x(f, m[0]), f.substr(m[1], 2) == "06" ? b.algparam = x(f, m[1]) : f.substr(m[1], 2) == "30" && (b.algparam = {}, b.algparam.p = g.getVbyList(f, m[1], [0], "02"), b.algparam.q = g.getVbyList(f, m[1], [1], "02"), b.algparam.g = g.getVbyList(f, m[1], [2], "02")), f.substr(I[1], 2) != "03") throw new Error("malformed PKCS8 public key(code:004)");
      return b.key = x(f, I[1]).substr(2), b;
    } };
  })();
  U.getKey = function(e, t, r) {
    var i = j, s = i.getChildIdx;
    i.getV;
    var n = i.getVbyList, h = a.crypto, u = h.ECDSA, d = h.DSA, l = q, y = ie, p = U;
    if (typeof l < "u" && e instanceof l || typeof u < "u" && e instanceof u || typeof d < "u" && e instanceof d) return e;
    if (e.curve !== void 0 && e.xy !== void 0 && e.d === void 0) return new u({ pub: e.xy, curve: e.curve });
    if (e.curve !== void 0 && e.d !== void 0) return new u({ prv: e.d, curve: e.curve });
    if (e.kty === void 0 && e.n !== void 0 && e.e !== void 0 && e.d === void 0) {
      var o = new l();
      return o.setPublic(e.n, e.e), o;
    }
    if (e.kty === void 0 && e.n !== void 0 && e.e !== void 0 && e.d !== void 0 && e.p !== void 0 && e.q !== void 0 && e.dp !== void 0 && e.dq !== void 0 && e.co !== void 0 && e.qi === void 0) {
      var o = new l();
      return o.setPrivateEx(e.n, e.e, e.d, e.p, e.q, e.dp, e.dq, e.co), o;
    }
    if (e.kty === void 0 && e.n !== void 0 && e.e !== void 0 && e.d !== void 0 && e.p === void 0) {
      var o = new l();
      return o.setPrivate(e.n, e.e, e.d), o;
    }
    if (e.p !== void 0 && e.q !== void 0 && e.g !== void 0 && e.y !== void 0 && e.x === void 0) {
      var o = new d();
      return o.setPublic(e.p, e.q, e.g, e.y), o;
    }
    if (e.p !== void 0 && e.q !== void 0 && e.g !== void 0 && e.y !== void 0 && e.x !== void 0) {
      var o = new d();
      return o.setPrivate(e.p, e.q, e.g, e.y, e.x), o;
    }
    if (e.kty === "RSA" && e.n !== void 0 && e.e !== void 0 && e.d === void 0) {
      var o = new l();
      return o.setPublic(Y(e.n), Y(e.e)), o;
    }
    if (e.kty === "RSA" && e.n !== void 0 && e.e !== void 0 && e.d !== void 0 && e.p !== void 0 && e.q !== void 0 && e.dp !== void 0 && e.dq !== void 0 && e.qi !== void 0) {
      var o = new l();
      return o.setPrivateEx(Y(e.n), Y(e.e), Y(e.d), Y(e.p), Y(e.q), Y(e.dp), Y(e.dq), Y(e.qi)), o;
    }
    if (e.kty === "RSA" && e.n !== void 0 && e.e !== void 0 && e.d !== void 0) {
      var o = new l();
      return o.setPrivate(Y(e.n), Y(e.e), Y(e.d)), o;
    }
    if (e.kty === "EC" && e.crv !== void 0 && e.x !== void 0 && e.y !== void 0 && e.d === void 0) {
      var c = new u({ curve: e.crv }), f = c.ecparams.keycharlen, g = ("0000000000" + Y(e.x)).slice(-f), v = ("0000000000" + Y(e.y)).slice(-f), x = "04" + g + v;
      return c.setPublicKeyHex(x), c;
    }
    if (e.kty === "EC" && e.crv !== void 0 && e.x !== void 0 && e.y !== void 0 && e.d !== void 0) {
      var c = new u({ curve: e.crv }), f = c.ecparams.keycharlen, g = ("0000000000" + Y(e.x)).slice(-f), v = ("0000000000" + Y(e.y)).slice(-f), x = "04" + g + v, b = ("0000000000" + Y(e.d)).slice(-f);
      return c.setPublicKeyHex(x), c.setPrivateKeyHex(b), c;
    }
    if (r === "pkcs5prv") {
      var I = e, i = j, A, o;
      if (A = s(I, 0), A.length === 9) o = new l(), o.readPKCS5PrvKeyHex(I);
      else if (A.length === 6) o = new d(), o.readPKCS5PrvKeyHex(I);
      else if (A.length > 2 && I.substr(A[1], 2) === "04") o = new u(), o.readPKCS5PrvKeyHex(I);
      else throw new Error("unsupported PKCS#1/5 hexadecimal key");
      return o;
    }
    if (r === "pkcs8prv") {
      var o = p.getKeyFromPlainPrivatePKCS8Hex(e);
      return o;
    }
    if (r === "pkcs8pub") return p._getKeyFromPublicPKCS8Hex(e);
    if (r === "x509pub") return k.getPublicKeyFromCertHex(e);
    if (e.indexOf("-END CERTIFICATE-", 0) != -1 || e.indexOf("-END X509 CERTIFICATE-", 0) != -1 || e.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) return k.getPublicKeyFromCertPEM(e);
    if (e.indexOf("-END PUBLIC KEY-") != -1) {
      var m = ie(e, "PUBLIC KEY");
      return p._getKeyFromPublicPKCS8Hex(m);
    }
    if (e.indexOf("-END RSA PRIVATE KEY-") != -1 && e.indexOf("4,ENCRYPTED") == -1) {
      var E = y(e, "RSA PRIVATE KEY");
      return p.getKey(E, null, "pkcs5prv");
    }
    if (e.indexOf("-END DSA PRIVATE KEY-") != -1 && e.indexOf("4,ENCRYPTED") == -1) {
      var F = y(e, "DSA PRIVATE KEY"), w = n(F, 0, [1], "02"), S = n(F, 0, [2], "02"), D = n(F, 0, [3], "02"), R = n(F, 0, [4], "02"), T = n(F, 0, [5], "02"), o = new d();
      return o.setPrivate(new C(w, 16), new C(S, 16), new C(D, 16), new C(R, 16), new C(T, 16)), o;
    }
    if (e.indexOf("-END EC PRIVATE KEY-") != -1 && e.indexOf("4,ENCRYPTED") == -1) {
      var E = y(e, "EC PRIVATE KEY");
      return p.getKey(E, null, "pkcs5prv");
    }
    if (e.indexOf("-END PRIVATE KEY-") != -1) return p.getKeyFromPlainPrivatePKCS8PEM(e);
    if (e.indexOf("-END RSA PRIVATE KEY-") != -1 && e.indexOf("4,ENCRYPTED") != -1) {
      var K = p.getDecryptedKeyHex(e, t), P = new q();
      return P.readPKCS5PrvKeyHex(K), P;
    }
    if (e.indexOf("-END EC PRIVATE KEY-") != -1 && e.indexOf("4,ENCRYPTED") != -1) {
      var F = p.getDecryptedKeyHex(e, t), o = n(F, 0, [1], "04"), H = n(F, 0, [2, 0], "06"), B = n(F, 0, [3, 0], "03").substr(2), O = "";
      if (a.crypto.OID.oidhex2name[H] !== void 0) O = a.crypto.OID.oidhex2name[H];
      else throw new Error("undefined OID(hex) in KJUR.crypto.OID: " + H);
      var c = new u({ curve: O });
      return c.setPublicKeyHex(B), c.setPrivateKeyHex(o), c.isPublic = false, c;
    }
    if (e.indexOf("-END DSA PRIVATE KEY-") != -1 && e.indexOf("4,ENCRYPTED") != -1) {
      var F = p.getDecryptedKeyHex(e, t), w = n(F, 0, [1], "02"), S = n(F, 0, [2], "02"), D = n(F, 0, [3], "02"), R = n(F, 0, [4], "02"), T = n(F, 0, [5], "02"), o = new d();
      return o.setPrivate(new C(w, 16), new C(S, 16), new C(D, 16), new C(R, 16), new C(T, 16)), o;
    }
    if (e.indexOf("-END ENCRYPTED PRIVATE KEY-") != -1) return p.getKeyFromEncryptedPKCS8PEM(e, t);
    throw new Error("not supported argument");
  }, U.generateKeypair = function(e, t) {
    if (e == "RSA") {
      var r = t, i = new q();
      i.generate(r, "10001"), i.isPrivate = true, i.isPublic = true;
      var s = new q(), n = i.n.toString(16), h = i.e.toString(16);
      s.setPublic(n, h), s.isPrivate = false, s.isPublic = true;
      var u = {};
      return u.prvKeyObj = i, u.pubKeyObj = s, u;
    } else if (e == "EC") {
      var d = t, l = new a.crypto.ECDSA({ curve: d }), y = l.generateKeyPairHex(), i = new a.crypto.ECDSA({ curve: d });
      i.setPublicKeyHex(y.ecpubhex), i.setPrivateKeyHex(y.ecprvhex), i.isPrivate = true, i.isPublic = false;
      var s = new a.crypto.ECDSA({ curve: d });
      s.setPublicKeyHex(y.ecpubhex), s.isPrivate = false, s.isPublic = true;
      var u = {};
      return u.prvKeyObj = i, u.pubKeyObj = s, u;
    } else throw new Error("unknown algorithm: " + e);
  }, U.getPEM = function(e, t, r, i, s, n) {
    var h = a, u = h.asn1, d = u.DERObjectIdentifier, l = u.DERInteger, y = u.ASN1Util.newObject, p = u.x509, o = p.SubjectPublicKeyInfo, c = h.crypto, f = c.DSA, g = c.ECDSA, v = q;
    function x(B) {
      var O = y({ seq: [{ int: 0 }, { int: { bigint: B.n } }, { int: B.e }, { int: { bigint: B.d } }, { int: { bigint: B.p } }, { int: { bigint: B.q } }, { int: { bigint: B.dmp1 } }, { int: { bigint: B.dmq1 } }, { int: { bigint: B.coeff } }] });
      return O;
    }
    function b(B) {
      var O = y({ seq: [{ int: 1 }, { octstr: { hex: B.prvKeyHex } }, { tag: ["a0", true, { oid: { name: B.curveName } }] }, { tag: ["a1", true, { bitstr: { hex: "00" + B.pubKeyHex } }] }] });
      return O;
    }
    function I(B) {
      var O = y({ seq: [{ int: 0 }, { int: { bigint: B.p } }, { int: { bigint: B.q } }, { int: { bigint: B.g } }, { int: { bigint: B.y } }, { int: { bigint: B.x } }] });
      return O;
    }
    if ((v !== void 0 && e instanceof v || f !== void 0 && e instanceof f || g !== void 0 && e instanceof g) && e.isPublic == true && (t === void 0 || t == "PKCS8PUB")) {
      var A = new o(e), m = A.tohex();
      return ue(m, "PUBLIC KEY");
    }
    if (t == "PKCS1PRV" && v !== void 0 && e instanceof v && (r === void 0 || r == null) && e.isPrivate == true) {
      var A = x(e), m = A.tohex();
      return ue(m, "RSA PRIVATE KEY");
    }
    if (t == "PKCS1PRV" && g !== void 0 && e instanceof g && (r === void 0 || r == null) && e.isPrivate == true) {
      var E = new d({ name: e.curveName }), F = E.tohex(), w = b(e), S = w.tohex(), D = "";
      return D += ue(F, "EC PARAMETERS"), D += ue(S, "EC PRIVATE KEY"), D;
    }
    if (t == "PKCS1PRV" && f !== void 0 && e instanceof f && (r === void 0 || r == null) && e.isPrivate == true) {
      var A = I(e), m = A.tohex();
      return ue(m, "DSA PRIVATE KEY");
    }
    if (t == "PKCS5PRV" && v !== void 0 && e instanceof v && r !== void 0 && r != null && e.isPrivate == true) {
      var A = x(e), m = A.tohex();
      return i === void 0 && (i = "DES-EDE3-CBC"), this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", m, r, i, n);
    }
    if (t == "PKCS5PRV" && g !== void 0 && e instanceof g && r !== void 0 && r != null && e.isPrivate == true) {
      var A = b(e), m = A.tohex();
      return i === void 0 && (i = "DES-EDE3-CBC"), this.getEncryptedPKCS5PEMFromPrvKeyHex("EC", m, r, i, n);
    }
    if (t == "PKCS5PRV" && f !== void 0 && e instanceof f && r !== void 0 && r != null && e.isPrivate == true) {
      var A = I(e), m = A.tohex();
      return i === void 0 && (i = "DES-EDE3-CBC"), this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA", m, r, i, n);
    }
    var R = function(B, O) {
      var ee = T(B, O), X = new y({ seq: [{ seq: [{ oid: { name: "pkcs5PBES2" } }, { seq: [{ seq: [{ oid: { name: "pkcs5PBKDF2" } }, { seq: [{ octstr: { hex: ee.pbkdf2Salt } }, { int: ee.pbkdf2Iter }] }] }, { seq: [{ oid: { name: "des-EDE3-CBC" } }, { octstr: { hex: ee.encryptionSchemeIV } }] }] }] }, { octstr: { hex: ee.ciphertext } }] });
      return X.tohex();
    }, T = function(B, O) {
      var ee = 100, X = L.lib.WordArray.random(8), Q = "DES-EDE3-CBC", te = L.lib.WordArray.random(8), $ = L.PBKDF2(O, X, { keySize: 192 / 32, iterations: ee }), G = L.enc.Hex.parse(B), J = L.TripleDES.encrypt(G, $, { iv: te }) + "", re = {};
      return re.ciphertext = J, re.pbkdf2Salt = L.enc.Hex.stringify(X), re.pbkdf2Iter = ee, re.encryptionSchemeAlg = Q, re.encryptionSchemeIV = L.enc.Hex.stringify(te), re;
    };
    if (t == "PKCS8PRV" && v != null && e instanceof v && e.isPrivate == true) {
      var K = x(e), P = K.tohex(), A = y({ seq: [{ int: 0 }, { seq: [{ oid: { name: "rsaEncryption" } }, { null: true }] }, { octstr: { hex: P } }] }), m = A.tohex();
      if (r === void 0 || r == null) return ue(m, "PRIVATE KEY");
      var S = R(m, r);
      return ue(S, "ENCRYPTED PRIVATE KEY");
    }
    if (t == "PKCS8PRV" && g !== void 0 && e instanceof g && e.isPrivate == true) {
      var H = { seq: [{ int: 1 }, { octstr: { hex: e.prvKeyHex } }] };
      typeof e.pubKeyHex == "string" && H.seq.push({ tag: ["a1", true, { bitstr: { hex: "00" + e.pubKeyHex } }] });
      var K = new y(H), P = K.tohex(), A = y({ seq: [{ int: 0 }, { seq: [{ oid: { name: "ecPublicKey" } }, { oid: { name: e.curveName } }] }, { octstr: { hex: P } }] }), m = A.tohex();
      if (r === void 0 || r == null) return ue(m, "PRIVATE KEY");
      var S = R(m, r);
      return ue(S, "ENCRYPTED PRIVATE KEY");
    }
    if (t == "PKCS8PRV" && f !== void 0 && e instanceof f && e.isPrivate == true) {
      var K = new l({ bigint: e.x }), P = K.tohex(), A = y({ seq: [{ int: 0 }, { seq: [{ oid: { name: "dsa" } }, { seq: [{ int: { bigint: e.p } }, { int: { bigint: e.q } }, { int: { bigint: e.g } }] }] }, { octstr: { hex: P } }] }), m = A.tohex();
      if (r === void 0 || r == null) return ue(m, "PRIVATE KEY");
      var S = R(m, r);
      return ue(S, "ENCRYPTED PRIVATE KEY");
    }
    throw new Error("unsupported object nor format");
  }, U.getKeyFromCSRPEM = function(e) {
    var t = ie(e, "CERTIFICATE REQUEST"), r = U.getKeyFromCSRHex(t);
    return r;
  }, U.getKeyFromCSRHex = function(e) {
    var t = U.parseCSRHex(e), r = U.getKey(t.p8pubkeyhex, null, "pkcs8pub");
    return r;
  }, U.parseCSRHex = function(e) {
    var t = j, r = t.getChildIdx, i = t.getTLV, s = {}, n = e;
    if (n.substr(0, 2) != "30") throw new Error("malformed CSR(code:001)");
    var h = r(n, 0);
    if (h.length < 1) throw new Error("malformed CSR(code:002)");
    if (n.substr(h[0], 2) != "30") throw new Error("malformed CSR(code:003)");
    var u = r(n, h[0]);
    if (u.length < 3) throw new Error("malformed CSR(code:004)");
    return s.p8pubkeyhex = i(n, u[2]), s;
  }, U.getKeyID = function(e) {
    var t = U, r = j;
    typeof e == "string" && e.indexOf("BEGIN ") != -1 && (e = t.getKey(e));
    var i = ie(t.getPEM(e)), s = r.getIdxbyList(i, 0, [1]), n = r.getV(i, s).substring(2);
    return a.crypto.Util.hashHex(n, "sha1");
  }, U.getJWK = function(e, t, r, i, s) {
    var n, h = {}, u, d = a.crypto.Util.hashHex;
    if (typeof e == "string") n = U.getKey(e), e.indexOf("CERTIFICATE") != -1 && (u = ie(e));
    else if (typeof e == "object") e instanceof k ? (n = e.getPublicKey(), u = e.hex) : n = e;
    else throw new Error("unsupported keyinfo type");
    if (n instanceof q && n.isPrivate) h.kty = "RSA", h.n = ae(n.n.toString(16)), h.e = ae(n.e.toString(16)), h.d = ae(n.d.toString(16)), h.p = ae(n.p.toString(16)), h.q = ae(n.q.toString(16)), h.dp = ae(n.dmp1.toString(16)), h.dq = ae(n.dmq1.toString(16)), h.qi = ae(n.coeff.toString(16));
    else if (n instanceof q && n.isPublic) h.kty = "RSA", h.n = ae(n.n.toString(16)), h.e = ae(n.e.toString(16));
    else if (n instanceof a.crypto.ECDSA && n.isPrivate) {
      var l = n.getShortNISTPCurveName();
      if (l !== "P-256" && l !== "P-384" && l !== "P-521") throw new Error("unsupported curve name for JWT: " + l);
      var y = n.getPublicKeyXYHex();
      h.kty = "EC", h.crv = l, h.x = ae(y.x), h.y = ae(y.y), h.d = ae(n.prvKeyHex);
    } else if (n instanceof a.crypto.ECDSA && n.isPublic) {
      var l = n.getShortNISTPCurveName();
      if (l !== "P-256" && l !== "P-384" && l !== "P-521") throw new Error("unsupported curve name for JWT: " + l);
      var y = n.getPublicKeyXYHex();
      h.kty = "EC", h.crv = l, h.x = ae(y.x), h.y = ae(y.y);
    }
    if (h.kty == null) throw new Error("unsupported keyinfo");
    return !n.isPrivate && t != true && (h.kid = a.jws.JWS.getJWKthumbprint(h)), u != null && r != true && (h.x5c = [ge(u)]), u != null && i != true && (h.x5t = Me(ge(d(u, "sha1")))), u != null && s != true && (h["x5t#S256"] = Me(ge(d(u, "sha256")))), h;
  }, U.getJWKFromKey = function(e) {
    return U.getJWK(e, true, true, true, true);
  }, q.getPosArrayOfChildrenFromHex = function(e) {
    return j.getChildIdx(e, 0);
  }, q.getHexValueArrayOfChildrenFromHex = function(e) {
    var t = j, r = t.getV, o = q.getPosArrayOfChildrenFromHex(e), i = r(e, o[0]), s = r(e, o[1]), n = r(e, o[2]), h = r(e, o[3]), u = r(e, o[4]), d = r(e, o[5]), l = r(e, o[6]), y = r(e, o[7]), p = r(e, o[8]), o = new Array();
    return o.push(i, s, n, h, u, d, l, y, p), o;
  }, q.prototype.readPrivateKeyFromPEMString = function(e) {
    var t = ie(e), r = q.getHexValueArrayOfChildrenFromHex(t);
    this.setPrivateEx(r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8]);
  }, q.prototype.readPKCS5PrvKeyHex = function(e) {
    var t = q.getHexValueArrayOfChildrenFromHex(e);
    this.setPrivateEx(t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
  }, q.prototype.readPKCS8PrvKeyHex = function(e) {
    var t, r, i, s, n, h, u, d, l = j, y = l.getVbyListEx;
    if (l.isASN1HEX(e) === false) throw new Error("not ASN.1 hex string");
    try {
      t = y(e, 0, [2, 0, 1], "02"), r = y(e, 0, [2, 0, 2], "02"), i = y(e, 0, [2, 0, 3], "02"), s = y(e, 0, [2, 0, 4], "02"), n = y(e, 0, [2, 0, 5], "02"), h = y(e, 0, [2, 0, 6], "02"), u = y(e, 0, [2, 0, 7], "02"), d = y(e, 0, [2, 0, 8], "02");
    } catch {
      throw new Error("malformed PKCS#8 plain RSA private key");
    }
    this.setPrivateEx(t, r, i, s, n, h, u, d);
  }, q.prototype.readPKCS5PubKeyHex = function(e) {
    var t = j, r = t.getV;
    if (t.isASN1HEX(e) === false) throw new Error("keyHex is not ASN.1 hex string");
    var i = t.getChildIdx(e, 0);
    if (i.length !== 2 || e.substr(i[0], 2) !== "02" || e.substr(i[1], 2) !== "02") throw new Error("wrong hex for PKCS#5 public key");
    var s = r(e, i[0]), n = r(e, i[1]);
    this.setPublic(s, n);
  }, q.prototype.readPKCS8PubKeyHex = function(e) {
    var t = j;
    if (t.isASN1HEX(e) === false) throw new Error("not ASN.1 hex string");
    if (t.getTLVbyListEx(e, 0, [0, 0]) !== "06092a864886f70d010101") throw new Error("not PKCS8 RSA public key");
    var r = t.getTLVbyListEx(e, 0, [1, 0]);
    this.readPKCS5PubKeyHex(r);
  }, q.prototype.readCertPubKeyHex = function(e, t) {
    var r, i;
    r = new k(), r.readCertHex(e), i = r.getPublicKeyHex(), this.readPKCS8PubKeyHex(i);
  };
  function Wt(e, t) {
    for (var r = "", i = t / 4 - e.length, s = 0; s < i; s++) r = r + "0";
    return r + e;
  }
  q.prototype.sign = function(e, t) {
    var r = function(s) {
      return a.crypto.Util.hashString(s, t);
    }, i = r(e);
    return this.signWithMessageHash(i, t);
  }, q.prototype.signWithMessageHash = function(e, t) {
    var r = a.crypto.Util.getPaddedDigestInfoHex(e, t, this.n.bitLength()), i = fe(r, 16), s = this.doPrivate(i), n = s.toString(16);
    return Wt(n, this.n.bitLength());
  };
  function Xt(e, t, r) {
    for (var i = "", s = 0; i.length < t; ) i += ce(r(xe(e + String.fromCharCode.apply(String, [(s & 4278190080) >> 24, (s & 16711680) >> 16, (s & 65280) >> 8, s & 255])))), s += 1;
    return i;
  }
  q.prototype.signPSS = function(e, t, r) {
    var i = function(n) {
      return a.crypto.Util.hashHex(n, t);
    }, s = i(xe(e));
    return r === void 0 && (r = -1), this.signWithMessageHashPSS(s, t, r);
  }, q.prototype.signWithMessageHashPSS = function(e, t, r) {
    var i = ce(e), s = i.length, n = this.n.bitLength() - 1, h = Math.ceil(n / 8), u, d = function(v) {
      return a.crypto.Util.hashHex(v, t);
    };
    if (r === -1 || r === void 0) r = s;
    else if (r === -2) r = h - s - 2;
    else if (r < -2) throw new Error("invalid salt length");
    if (h < s + r + 2) throw new Error("data too long");
    var l = "";
    r > 0 && (l = new Array(r), new Ne().nextBytes(l), l = String.fromCharCode.apply(String, l));
    var y = ce(d(xe("\0\0\0\0\0\0\0\0" + i + l))), p = [];
    for (u = 0; u < h - r - s - 2; u += 1) p[u] = 0;
    var o = String.fromCharCode.apply(String, p) + "" + l, c = Xt(y, o.length, d), f = [];
    for (u = 0; u < o.length; u += 1) f[u] = o.charCodeAt(u) ^ c.charCodeAt(u);
    var g = 65280 >> 8 * h - n & 255;
    for (f[0] &= ~g, u = 0; u < s; u++) f.push(y.charCodeAt(u));
    return f.push(188), Wt(this.doPrivate(new C(f)).toString(16), this.n.bitLength());
  };
  function Jt(e) {
    for (var t in a.crypto.Util.DIGESTINFOHEAD) {
      var r = a.crypto.Util.DIGESTINFOHEAD[t], i = r.length;
      if (e.substring(0, i) == r) {
        var s = [t, e.substring(i)];
        return s;
      }
    }
    return [];
  }
  q.prototype.verify = function(e, t) {
    if (t = t.toLowerCase(), t.match(/^[0-9a-f]+$/) == null) return false;
    var r = fe(t, 16), i = this.n.bitLength();
    if (r.bitLength() > i) return false;
    var s = this.doPublic(r), n = s.toString(16);
    if (n.length + 3 != i / 4) return false;
    var h = n.replace(/^1f+00/, ""), u = Jt(h);
    if (u.length == 0) return false;
    var d = u[0], l = u[1], y = function(o) {
      return a.crypto.Util.hashString(o, d);
    }, p = y(e);
    return l == p;
  }, q.prototype.verifyWithMessageHash = function(e, t) {
    if (t.length != Math.ceil(this.n.bitLength() / 4)) return false;
    var r = fe(t, 16);
    if (r.bitLength() > this.n.bitLength()) return 0;
    var i = this.doPublic(r), s = i.toString(16).replace(/^1f+00/, ""), n = Jt(s);
    if (n.length == 0) return false;
    n[0];
    var h = n[1];
    return h == e;
  }, q.prototype.verifyPSS = function(e, t, r, i) {
    var s = function(h) {
      return a.crypto.Util.hashHex(h, r);
    }, n = s(xe(e));
    return i === void 0 && (i = -1), this.verifyWithMessageHashPSS(n, t, r, i);
  }, q.prototype.verifyWithMessageHashPSS = function(e, t, r, i) {
    if (t.length != Math.ceil(this.n.bitLength() / 4)) return false;
    var s = new C(t, 16), n = function(b) {
      return a.crypto.Util.hashHex(b, r);
    }, h = ce(e), u = h.length, d = this.n.bitLength() - 1, l = Math.ceil(d / 8), y;
    if (i === -1 || i === void 0) i = u;
    else if (i === -2) i = l - u - 2;
    else if (i < -2) throw new Error("invalid salt length");
    if (l < u + i + 2) throw new Error("data too long");
    var p = this.doPublic(s).toByteArray();
    for (y = 0; y < p.length; y += 1) p[y] &= 255;
    for (; p.length < l; ) p.unshift(0);
    if (p[l - 1] !== 188) throw new Error("encoded message does not end in 0xbc");
    p = String.fromCharCode.apply(String, p);
    var o = p.substr(0, l - u - 1), c = p.substr(o.length, u), f = 65280 >> 8 * l - d & 255;
    if ((o.charCodeAt(0) & f) !== 0) throw new Error("bits beyond keysize not zero");
    var g = Xt(c, o.length, n), v = [];
    for (y = 0; y < o.length; y += 1) v[y] = o.charCodeAt(y) ^ g.charCodeAt(y);
    v[0] &= ~f;
    var x = l - u - i - 2;
    for (y = 0; y < x; y += 1) if (v[y] !== 0) throw new Error("leftmost octets not zero");
    if (v[x] !== 1) throw new Error("0x01 marker not found");
    return c === ce(n(xe("\0\0\0\0\0\0\0\0" + h + String.fromCharCode.apply(String, v.slice(-i)))));
  }, q.SALT_LEN_HLEN = -1, q.SALT_LEN_MAX = -2, q.SALT_LEN_RECOVER = -2;
  function k(e) {
    var t = j, r = t.getChildIdx, i = t.getV;
    t.dump;
    var s = t.parse, n = t.getTLV, h = t.getVbyList, u = t.getVbyListEx, d = t.getTLVbyList, l = t.getTLVbyListEx, y = t.getIdxbyList, p = t.getIdxbyListEx, o = t.getVidx, c = t.getInt, f = t.oidname, g = t.hextooidstr, v = ie, x;
    try {
      x = a.asn1.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV;
    } catch {
    }
    this.HEX2STAG = { "0c": "utf8", 13: "prn", 16: "ia5", "1a": "vis", "1e": "bmp" }, this.hex = null, this.version = 0, this.foffset = 0, this.aExtInfo = null, this.getVersion = function() {
      if (this.hex === null || this.version !== 0) return this.version;
      var m = d(this.hex, 0, [0, 0]);
      if (m.substr(0, 2) == "a0") {
        var E = d(m, 0, [0]), F = c(E, 0);
        if (F < 0 || 2 < F) throw new Error("malformed version field");
        return this.version = F + 1, this.version;
      } else return this.version = 1, this.foffset = -1, 1;
    }, this.getSerialNumberHex = function() {
      return u(this.hex, 0, [0, 0], "02");
    }, this.getSignatureAlgorithmField = function() {
      var m = l(this.hex, 0, [0, 1]);
      return this.getAlgorithmIdentifierName(m);
    }, this.getAlgorithmIdentifierName = function(m) {
      for (var E in x) if (m === x[E]) return E;
      return f(u(m, 0, [0], "06"));
    }, this.getIssuer = function() {
      return this.getX500Name(this.getIssuerHex());
    }, this.getIssuerHex = function() {
      return d(this.hex, 0, [0, 3 + this.foffset], "30");
    }, this.getIssuerString = function() {
      var m = this.getIssuer();
      return m.str;
    }, this.getSubject = function() {
      return this.getX500Name(this.getSubjectHex());
    }, this.getSubjectHex = function() {
      return d(this.hex, 0, [0, 5 + this.foffset], "30");
    }, this.getSubjectString = function() {
      var m = this.getSubject();
      return m.str;
    }, this.getNotBefore = function() {
      var m = h(this.hex, 0, [0, 4 + this.foffset, 0]);
      return m = m.replace(/(..)/g, "%$1"), m = decodeURIComponent(m), m;
    }, this.getNotAfter = function() {
      var m = h(this.hex, 0, [0, 4 + this.foffset, 1]);
      return m = m.replace(/(..)/g, "%$1"), m = decodeURIComponent(m), m;
    }, this.getPublicKeyHex = function() {
      return this.getSPKI();
    }, this.getSPKI = function() {
      return d(this.hex, 0, [0, 6 + this.foffset], "30");
    }, this.getSPKIValue = function() {
      var m = this.getSPKI();
      return m == null ? null : h(m, 0, [1], "03", true);
    }, this.getPublicKeyIdx = function() {
      return y(this.hex, 0, [0, 6 + this.foffset], "30");
    }, this.getPublicKeyContentIdx = function() {
      var m = this.getPublicKeyIdx();
      return y(this.hex, m, [1, 0], "30");
    }, this.getPublicKey = function() {
      return U.getKey(this.getPublicKeyHex(), null, "pkcs8pub");
    }, this.getSignatureAlgorithmName = function() {
      var m = d(this.hex, 0, [1], "30");
      return this.getAlgorithmIdentifierName(m);
    }, this.getSignatureValueHex = function() {
      return h(this.hex, 0, [2], "03", true);
    }, this.verifySignature = function(m) {
      var E = this.getSignatureAlgorithmField(), F = this.getSignatureValueHex(), w = d(this.hex, 0, [0], "30"), S = new a.crypto.Signature({ alg: E });
      return S.init(m), S.updateHex(w), S.verify(F);
    }, this.parseExt = function(m) {
      var E, F, w;
      if (m === void 0) {
        if (w = this.hex, this.version !== 3) return -1;
        E = y(w, 0, [0, 7, 0], "30"), F = r(w, E);
      } else {
        w = ie(m);
        var S = y(w, 0, [0, 3, 0, 0], "06");
        if (i(w, S) != "2a864886f70d01090e") {
          this.aExtInfo = new Array();
          return;
        }
        E = y(w, 0, [0, 3, 0, 1, 0], "30"), F = r(w, E), this.hex = w;
      }
      this.aExtInfo = new Array();
      for (var D = 0; D < F.length; D++) {
        var R = {};
        R.critical = false;
        var T = r(w, F[D]), K = 0;
        T.length === 3 && (R.critical = true, K = 1), R.oid = t.hextooidstr(h(w, F[D], [0], "06"));
        var P = y(w, F[D], [1 + K]);
        R.vidx = o(w, P), this.aExtInfo.push(R);
      }
    }, this.getExtInfo = function(m) {
      var E = this.aExtInfo, F = m;
      if (m.match(/^[0-9.]+$/) || (F = a.asn1.x509.OID.name2oid(m)), F !== "") {
        for (var w = 0; w < E.length; w++) if (E[w].oid === F) return E[w];
      }
    }, this.getExtBasicConstraints = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("basicConstraints");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "basicConstraints" };
      if (E && (w.critical = true), m === "3000") return w;
      if (m === "30030101ff") return w.cA = true, w;
      if (m.substr(0, 12) === "30060101ff02") {
        var S = i(m, 10), D = parseInt(S, 16);
        return w.cA = true, w.pathLen = D, w;
      }
      throw new Error("hExtV parse error: " + m);
    }, this.getExtNameConstraints = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("nameConstraints");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "nameConstraints" };
      E && (w.critical = true);
      for (var S = r(m, 0), D = 0; D < S.length; D++) {
        for (var R = [], T = r(m, S[D]), K = 0; K < T.length; K++) {
          var P = n(m, T[K]), H = this.getGeneralSubtree(P);
          R.push(H);
        }
        var B = m.substr(S[D], 2);
        B == "a0" ? w.permit = R : B == "a1" && (w.exclude = R);
      }
      return w;
    }, this.getGeneralSubtree = function(m) {
      var E = r(m, 0), F = E.length;
      if (F < 1 || 2 < F) throw new Error("wrong num elements");
      for (var w = this.getGeneralName(n(m, E[0])), S = 1; S < F; S++) {
        var D = m.substr(E[S], 2), R = i(m, E[S]), T = parseInt(R, 16);
        D == "80" && (w.min = T), D == "81" && (w.max = T);
      }
      return w;
    }, this.getExtKeyUsage = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("keyUsage");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "keyUsage" };
      return E && (w.critical = true), w.names = this.getExtKeyUsageString(m).split(","), w;
    }, this.getExtKeyUsageBin = function(m) {
      if (m === void 0) {
        var E = this.getExtInfo("keyUsage");
        if (E === void 0) return "";
        m = n(this.hex, E.vidx);
      }
      if (m.length != 8 && m.length != 10) throw new Error("malformed key usage value: " + m);
      var F = "000000000000000" + parseInt(m.substr(6), 16).toString(2);
      return m.length == 8 && (F = F.slice(-8)), m.length == 10 && (F = F.slice(-16)), F = F.replace(/0+$/, ""), F == "" && (F = "0"), F;
    }, this.getExtKeyUsageString = function(m) {
      for (var E = this.getExtKeyUsageBin(m), F = new Array(), w = 0; w < E.length; w++) E.substr(w, 1) == "1" && F.push(k.KEYUSAGE_NAME[w]);
      return F.join(",");
    }, this.getExtSubjectKeyIdentifier = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("subjectKeyIdentifier");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "subjectKeyIdentifier" };
      E && (w.critical = true);
      var S = i(m, 0);
      return w.kid = { hex: S }, w;
    }, this.getExtAuthorityKeyIdentifier = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("authorityKeyIdentifier");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "authorityKeyIdentifier" };
      E && (w.critical = true);
      for (var S = r(m, 0), D = 0; D < S.length; D++) {
        var R = m.substr(S[D], 2);
        if (R === "80" && (w.kid = { hex: i(m, S[D]) }), R === "a1") {
          var T = n(m, S[D]), K = this.getGeneralNames(T);
          w.issuer = K[0].dn;
        }
        R === "82" && (w.sn = { hex: i(m, S[D]) });
      }
      return w;
    }, this.getExtExtKeyUsage = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("extKeyUsage");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "extKeyUsage", array: [] };
      E && (w.critical = true);
      for (var S = r(m, 0), D = 0; D < S.length; D++) w.array.push(f(i(m, S[D])));
      return w;
    }, this.getExtExtKeyUsageName = function() {
      var m = this.getExtInfo("extKeyUsage");
      if (m === void 0) return m;
      var E = new Array(), F = n(this.hex, m.vidx);
      if (F === "") return E;
      for (var w = r(F, 0), S = 0; S < w.length; S++) E.push(f(i(F, w[S])));
      return E;
    }, this.getExtSubjectAltName = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("subjectAltName");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "subjectAltName", array: [] };
      return E && (w.critical = true), w.array = this.getGeneralNames(m), w;
    }, this.getExtIssuerAltName = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("issuerAltName");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "issuerAltName", array: [] };
      return E && (w.critical = true), w.array = this.getGeneralNames(m), w;
    }, this.getGeneralNames = function(m) {
      for (var E = r(m, 0), F = [], w = 0; w < E.length; w++) {
        var S = this.getGeneralName(n(m, E[w]));
        S !== void 0 && F.push(S);
      }
      return F;
    }, this.getGeneralName = function(m) {
      var E = m.substr(0, 2), F = i(m, 0), w = ce(F);
      if (E == "81") return { rfc822: w };
      if (E == "82") return { dns: w };
      if (E == "86") return { uri: w };
      if (E == "87") return { ip: rt(F) };
      if (E == "a4") return { dn: this.getX500Name(F) };
      if (E == "a0") return { other: this.getOtherName(m) };
    }, this.getExtSubjectAltName2 = function() {
      var m, E, F, w = this.getExtInfo("subjectAltName");
      if (w === void 0) return w;
      for (var S = new Array(), D = n(this.hex, w.vidx), R = r(D, 0), T = 0; T < R.length; T++) F = D.substr(R[T], 2), m = i(D, R[T]), F === "81" && (E = W(m), S.push(["MAIL", E])), F === "82" && (E = W(m), S.push(["DNS", E])), F === "84" && (E = k.hex2dn(m, 0), S.push(["DN", E])), F === "86" && (E = W(m), S.push(["URI", E])), F === "87" && (E = rt(m), S.push(["IP", E]));
      return S;
    }, this.getExtCRLDistributionPoints = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("cRLDistributionPoints");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "cRLDistributionPoints", array: [] };
      E && (w.critical = true);
      for (var S = r(m, 0), D = 0; D < S.length; D++) {
        var R = n(m, S[D]);
        w.array.push(this.getDistributionPoint(R));
      }
      return w;
    }, this.getDistributionPoint = function(m) {
      for (var E = {}, F = r(m, 0), w = 0; w < F.length; w++) {
        var S = m.substr(F[w], 2), D = n(m, F[w]);
        S == "a0" && (E.dpname = this.getDistributionPointName(D));
      }
      return E;
    }, this.getDistributionPointName = function(m) {
      for (var E = {}, F = r(m, 0), w = 0; w < F.length; w++) {
        var S = m.substr(F[w], 2), D = n(m, F[w]);
        S == "a0" && (E.full = this.getGeneralNames(D));
      }
      return E;
    }, this.getExtCRLDistributionPointsURI = function() {
      var m = this.getExtCRLDistributionPoints();
      if (m == null) return m;
      for (var E = m.array, F = [], w = 0; w < E.length; w++) try {
        E[w].dpname.full[0].uri != null && F.push(E[w].dpname.full[0].uri);
      } catch {
      }
      return F;
    }, this.getExtAIAInfo = function() {
      var m = this.getExtInfo("authorityInfoAccess");
      if (m === void 0) return m;
      for (var E = { ocsp: [], caissuer: [] }, F = r(this.hex, m.vidx), w = 0; w < F.length; w++) {
        var S = h(this.hex, F[w], [0], "06"), D = h(this.hex, F[w], [1], "86");
        S === "2b06010505073001" && E.ocsp.push(W(D)), S === "2b06010505073002" && E.caissuer.push(W(D));
      }
      return E;
    }, this.getExtAuthorityInfoAccess = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("authorityInfoAccess");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "authorityInfoAccess", array: [] };
      E && (w.critical = true);
      for (var S = r(m, 0), D = 0; D < S.length; D++) {
        var R = u(m, S[D], [0], "06"), T = h(m, S[D], [1], "86"), K = W(T);
        if (R == "2b06010505073001") w.array.push({ ocsp: K });
        else if (R == "2b06010505073002") w.array.push({ caissuer: K });
        else throw new Error("unknown method: " + R);
      }
      return w;
    }, this.getExtCertificatePolicies = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("certificatePolicies");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "certificatePolicies", array: [] };
      E && (w.critical = true);
      for (var S = r(m, 0), D = 0; D < S.length; D++) {
        var R = n(m, S[D]), T = this.getPolicyInformation(R);
        w.array.push(T);
      }
      return w;
    }, this.getPolicyInformation = function(m) {
      var E = {}, F = h(m, 0, [0], "06");
      E.policyoid = f(F);
      var w = p(m, 0, [1], "30");
      if (w != -1) {
        E.array = [];
        for (var S = r(m, w), D = 0; D < S.length; D++) {
          var R = n(m, S[D]), T = this.getPolicyQualifierInfo(R);
          E.array.push(T);
        }
      }
      return E;
    }, this.getOtherName = function(m) {
      var E = {}, F = r(m, 0), w = h(m, F[0], [], "06"), S = h(m, F[1], []);
      return E.oid = a.asn1.ASN1Util.oidHexToInt(w), E.obj = s(S), E;
    }, this.getPolicyQualifierInfo = function(m) {
      var E = {}, F = h(m, 0, [0], "06");
      if (F === "2b06010505070201") {
        var w = u(m, 0, [1], "16");
        E.cps = ce(w);
      } else if (F === "2b06010505070202") {
        var S = d(m, 0, [1], "30");
        E.unotice = this.getUserNotice(S);
      }
      return E;
    }, this.getUserNotice = function(m) {
      for (var E = {}, F = r(m, 0), w = 0; w < F.length; w++) {
        var S = n(m, F[w]);
        S.substr(0, 2) != "30" && (E.exptext = this.getDisplayText(S));
      }
      return E;
    }, this.getDisplayText = function(m) {
      var E = { "0c": "utf8", 16: "ia5", "1a": "vis", "1e": "bmp" }, F = {};
      return F.type = E[m.substr(0, 2)], F.str = ce(i(m, 0)), F;
    }, this.getExtCRLNumber = function(m, E) {
      var F = { extname: "cRLNumber" };
      if (E && (F.critical = true), m.substr(0, 2) == "02") return F.num = { hex: i(m, 0) }, F;
      throw new Error("hExtV parse error: " + m);
    }, this.getExtCRLReason = function(m, E) {
      var F = { extname: "cRLReason" };
      if (E && (F.critical = true), m.substr(0, 2) == "0a") return F.code = parseInt(i(m, 0), 16), F;
      throw new Error("hExtV parse error: " + m);
    }, this.getExtOcspNonce = function(m, E) {
      var F = { extname: "ocspNonce" };
      E && (F.critical = true);
      var w = i(m, 0);
      return F.hex = w, F;
    }, this.getExtOcspNoCheck = function(m, E) {
      var F = { extname: "ocspNoCheck" };
      return E && (F.critical = true), F;
    }, this.getExtAdobeTimeStamp = function(m, E) {
      if (m === void 0 && E === void 0) {
        var F = this.getExtInfo("adobeTimeStamp");
        if (F === void 0) return;
        m = n(this.hex, F.vidx), E = F.critical;
      }
      var w = { extname: "adobeTimeStamp" };
      E && (w.critical = true);
      var S = r(m, 0);
      if (S.length > 1) {
        var D = n(m, S[1]), R = this.getGeneralName(D);
        R.uri != null && (w.uri = R.uri);
      }
      if (S.length > 2) {
        var T = n(m, S[2]);
        T == "0101ff" && (w.reqauth = true), T == "010100" && (w.reqauth = false);
      }
      return w;
    };
    var b = function(m) {
      var E = {};
      try {
        var F = m.seq[0].oid, w = a.asn1.x509.OID.name2oid(F);
        E.type = a.asn1.x509.OID.oid2atype(w);
        var S = m.seq[1];
        if (S.utf8str != null) E.ds = "utf8", E.value = S.utf8str.str;
        else if (S.numstr != null) E.ds = "num", E.value = S.numstr.str;
        else if (S.telstr != null) E.ds = "tel", E.value = S.telstr.str;
        else if (S.prnstr != null) E.ds = "prn", E.value = S.prnstr.str;
        else if (S.ia5str != null) E.ds = "ia5", E.value = S.ia5str.str;
        else if (S.visstr != null) E.ds = "vis", E.value = S.visstr.str;
        else if (S.bmpstr != null) E.ds = "bmp", E.value = S.bmpstr.str;
        else throw "error";
        return E;
      } catch {
        throw new Erorr("improper ASN.1 parsed AttrTypeAndValue");
      }
    }, I = function(m) {
      try {
        return m.set.map(function(E) {
          return b(E);
        });
      } catch (E) {
        throw new Error("improper ASN.1 parsed RDN: " + E);
      }
    }, A = function(m) {
      try {
        return m.seq.map(function(E) {
          return I(E);
        });
      } catch (E) {
        throw new Error("improper ASN.1 parsed X500Name: " + E);
      }
    };
    this.getX500NameRule = function(m) {
      for (var E = null, F = [], w = 0; w < m.length; w++) for (var S = m[w], D = 0; D < S.length; D++) F.push(S[D]);
      for (var w = 0; w < F.length; w++) {
        var R = F[w], T = R.ds, K = R.value, P = R.type;
        if (T != "prn" && T != "utf8" && T != "ia5") return "mixed";
        if (T == "ia5") {
          if (P != "CN") return "mixed";
          if (a.lang.String.isMail(K)) continue;
          return "mixed";
        }
        if (P == "C") {
          if (T == "prn") continue;
          return "mixed";
        }
        if (E == null) E = T;
        else if (E !== T) return "mixed";
      }
      return E ?? "prn";
    }, this.getAttrTypeAndValue = function(m) {
      var E = s(m);
      return b(E);
    }, this.getRDN = function(m) {
      var E = s(m);
      return I(E);
    }, this.getX500NameArray = function(m) {
      var E = s(m);
      return A(E);
    }, this.getX500Name = function(m) {
      var E = this.getX500NameArray(m), F = this.dnarraytostr(E);
      return { array: E, str: F };
    }, this.readCertPEM = function(m) {
      this.readCertHex(v(m));
    }, this.readCertHex = function(m) {
      this.hex = m, this.getVersion();
      try {
        y(this.hex, 0, [0, 7], "a3"), this.parseExt();
      } catch {
      }
    }, this.getParam = function(m) {
      var E = {};
      return E.version = this.getVersion(), E.serial = { hex: this.getSerialNumberHex() }, E.sigalg = this.getSignatureAlgorithmField(), E.issuer = this.getIssuer(), E.notbefore = this.getNotBefore(), E.notafter = this.getNotAfter(), E.subject = this.getSubject(), E.sbjpubkey = ue(this.getPublicKeyHex(), "PUBLIC KEY"), this.aExtInfo != null && this.aExtInfo.length > 0 && (E.ext = this.getExtParamArray()), E.sighex = this.getSignatureValueHex(), typeof m == "object" && (m.tbshex == true && (E.tbshex = d(this.hex, 0, [0])), m.nodnarray == true && (delete E.issuer.array, delete E.subject.array)), E;
    }, this.getExtParamArray = function(m) {
      if (m == null) {
        var E = p(this.hex, 0, [0, "[3]"]);
        E != -1 && (m = l(this.hex, 0, [0, "[3]", 0], "30"));
      }
      for (var F = [], w = r(m, 0), S = 0; S < w.length; S++) {
        var D = n(m, w[S]), R = this.getExtParam(D);
        R != null && F.push(R);
      }
      return F;
    }, this.getExtParam = function(m) {
      var E = r(m, 0), F = E.length;
      if (F != 2 && F != 3) throw new Error("wrong number elements in Extension: " + F + " " + m);
      var w = g(h(m, 0, [0], "06")), S = false;
      F == 3 && d(m, 0, [1]) == "0101ff" && (S = true);
      var D = d(m, 0, [F - 1, 0]), R = void 0;
      if (w == "2.5.29.14" ? R = this.getExtSubjectKeyIdentifier(D, S) : w == "2.5.29.15" ? R = this.getExtKeyUsage(D, S) : w == "2.5.29.17" ? R = this.getExtSubjectAltName(D, S) : w == "2.5.29.18" ? R = this.getExtIssuerAltName(D, S) : w == "2.5.29.19" ? R = this.getExtBasicConstraints(D, S) : w == "2.5.29.30" ? R = this.getExtNameConstraints(D, S) : w == "2.5.29.31" ? R = this.getExtCRLDistributionPoints(D, S) : w == "2.5.29.32" ? R = this.getExtCertificatePolicies(D, S) : w == "2.5.29.35" ? R = this.getExtAuthorityKeyIdentifier(D, S) : w == "2.5.29.37" ? R = this.getExtExtKeyUsage(D, S) : w == "1.3.6.1.5.5.7.1.1" ? R = this.getExtAuthorityInfoAccess(D, S) : w == "2.5.29.20" ? R = this.getExtCRLNumber(D, S) : w == "2.5.29.21" ? R = this.getExtCRLReason(D, S) : w == "1.3.6.1.5.5.7.48.1.2" ? R = this.getExtOcspNonce(D, S) : w == "1.3.6.1.5.5.7.48.1.5" ? R = this.getExtOcspNoCheck(D, S) : w == "1.2.840.113583.1.1.9.1" && (R = this.getExtAdobeTimeStamp(D, S)), R != null) return R;
      var T = { extname: w, extn: D };
      return S && (T.critical = true), T;
    }, this.findExt = function(m, E) {
      for (var F = 0; F < m.length; F++) if (m[F].extname == E) return m[F];
      return null;
    }, this.updateExtCDPFullURI = function(m, E) {
      var F = this.findExt(m, "cRLDistributionPoints");
      if (F != null && F.array != null) {
        for (var w = F.array, S = 0; S < w.length; S++) if (w[S].dpname != null && w[S].dpname.full != null) for (var D = w[S].dpname.full, R = 0; R < D.length; R++) {
          var T = D[S];
          T.uri != null && (T.uri = E);
        }
      }
    }, this.updateExtAIAOCSP = function(m, E) {
      var F = this.findExt(m, "authorityInfoAccess");
      if (F != null && F.array != null) for (var w = F.array, S = 0; S < w.length; S++) w[S].ocsp != null && (w[S].ocsp = E);
    }, this.updateExtAIACAIssuer = function(m, E) {
      var F = this.findExt(m, "authorityInfoAccess");
      if (F != null && F.array != null) for (var w = F.array, S = 0; S < w.length; S++) w[S].caissuer != null && (w[S].caissuer = E);
    }, this.dnarraytostr = function(m) {
      function E(w) {
        return w.map(function(S) {
          return F(S).replace(/\+/, "\\+");
        }).join("+");
      }
      function F(w) {
        return w.type + "=" + w.value;
      }
      return "/" + m.map(function(w) {
        return E(w).replace(/\//, "\\/");
      }).join("/");
    }, this.getInfo = function() {
      var m = function($) {
        var G = JSON.stringify($.array).replace(/[\[\]\{\}\"]/g, "");
        return G;
      }, E = function($) {
        for (var G = "", J = $.array, re = 0; re < J.length; re++) {
          var ne = J[re];
          if (G += "    policy oid: " + ne.policyoid + `
`, ne.array !== void 0) for (var he = 0; he < ne.array.length; he++) {
            var le = ne.array[he];
            le.cps !== void 0 && (G += "    cps: " + le.cps + `
`);
          }
        }
        return G;
      }, F = function($) {
        for (var G = "", J = $.array, re = 0; re < J.length; re++) {
          var ne = J[re];
          try {
            ne.dpname.full[0].uri !== void 0 && (G += "    " + ne.dpname.full[0].uri + `
`);
          } catch {
          }
          try {
            ne.dname.full[0].dn.hex !== void 0 && (G += "    " + k.hex2dn(ne.dpname.full[0].dn.hex) + `
`);
          } catch {
          }
        }
        return G;
      }, w = function($) {
        for (var G = "", J = $.array, re = 0; re < J.length; re++) {
          var ne = J[re];
          ne.caissuer !== void 0 && (G += "    caissuer: " + ne.caissuer + `
`), ne.ocsp !== void 0 && (G += "    ocsp: " + ne.ocsp + `
`);
        }
        return G;
      }, S, D, R;
      if (S = `Basic Fields
`, S += "  serial number: " + this.getSerialNumberHex() + `
`, S += "  signature algorithm: " + this.getSignatureAlgorithmField() + `
`, S += "  issuer: " + this.getIssuerString() + `
`, S += "  notBefore: " + this.getNotBefore() + `
`, S += "  notAfter: " + this.getNotAfter() + `
`, S += "  subject: " + this.getSubjectString() + `
`, S += `  subject public key info: 
`, D = this.getPublicKey(), S += "    key algorithm: " + D.type + `
`, D.type === "RSA" && (S += "    n=" + St(D.n.toString(16)).substr(0, 16) + `...
`, S += "    e=" + St(D.e.toString(16)) + `
`), R = this.aExtInfo, R != null) {
        S += `X509v3 Extensions:
`;
        for (var T = 0; T < R.length; T++) {
          var K = R[T], P = a.asn1.x509.OID.oid2name(K.oid);
          P === "" && (P = K.oid);
          var H = "";
          if (K.critical === true && (H = "CRITICAL"), S += "  " + P + " " + H + `:
`, P === "basicConstraints") {
            var B = this.getExtBasicConstraints();
            B.cA === void 0 ? S += `    {}
` : (S += "    cA=true", B.pathLen !== void 0 && (S += ", pathLen=" + B.pathLen), S += `
`);
          } else if (P === "keyUsage") S += "    " + this.getExtKeyUsageString() + `
`;
          else if (P === "subjectKeyIdentifier") S += "    " + this.getExtSubjectKeyIdentifier().kid.hex + `
`;
          else if (P === "authorityKeyIdentifier") {
            var O = this.getExtAuthorityKeyIdentifier();
            O.kid !== void 0 && (S += "    kid=" + O.kid.hex + `
`);
          } else if (P === "extKeyUsage") {
            var ee = this.getExtExtKeyUsage().array;
            S += "    " + ee.join(", ") + `
`;
          } else if (P === "subjectAltName") {
            var X = m(this.getExtSubjectAltName());
            S += "    " + X + `
`;
          } else if (P === "cRLDistributionPoints") {
            var Q = this.getExtCRLDistributionPoints();
            S += F(Q);
          } else if (P === "authorityInfoAccess") {
            var te = this.getExtAuthorityInfoAccess();
            S += w(te);
          } else P === "certificatePolicies" && (S += E(this.getExtCertificatePolicies()));
        }
      }
      return S += "signature algorithm: " + this.getSignatureAlgorithmName() + `
`, S += "signature: " + this.getSignatureValueHex().substr(0, 16) + `...
`, S;
    }, typeof e == "string" && (e.indexOf("-----BEGIN") != -1 ? this.readCertPEM(e) : a.lang.String.isHex(e) && this.readCertHex(e));
  }
  k.hex2dn = function(e, t) {
    t === void 0 && (t = 0);
    var r = new k();
    j.getTLV(e, t);
    var i = r.getX500Name(e);
    return i.str;
  }, k.hex2rdn = function(e, t) {
    if (t === void 0 && (t = 0), e.substr(t, 2) !== "31") throw new Error("malformed RDN");
    for (var r = new Array(), i = j.getChildIdx(e, t), s = 0; s < i.length; s++) r.push(k.hex2attrTypeValue(e, i[s]));
    return r = r.map(function(n) {
      return n.replace("+", "\\+");
    }), r.join("+");
  }, k.hex2attrTypeValue = function(e, t) {
    var r = j, i = r.getV;
    if (t === void 0 && (t = 0), e.substr(t, 2) !== "30") throw new Error("malformed attribute type and value");
    var s = r.getChildIdx(e, t);
    s.length !== 2 || e.substr(s[0], 2);
    var n = i(e, s[0]), h = a.asn1.ASN1Util.oidHexToInt(n), u = a.asn1.x509.OID.oid2atype(h), d = i(e, s[1]), l = ce(d);
    return u + "=" + l;
  }, k.getPublicKeyFromCertHex = function(e) {
    var t = new k();
    return t.readCertHex(e), t.getPublicKey();
  }, k.getPublicKeyFromCertPEM = function(e) {
    var t = new k();
    return t.readCertPEM(e), t.getPublicKey();
  }, k.getPublicKeyInfoPropOfCertPEM = function(e) {
    var t = j, r = t.getVbyList, i = {}, s, n;
    return i.algparam = null, s = new k(), s.readCertPEM(e), n = s.getPublicKeyHex(), i.keyhex = r(n, 0, [1], "03").substr(2), i.algoid = r(n, 0, [0, 0], "06"), i.algoid === "2a8648ce3d0201" && (i.algparam = r(n, 0, [0, 1], "06")), i;
  }, k.KEYUSAGE_NAME = ["digitalSignature", "nonRepudiation", "keyEncipherment", "dataEncipherment", "keyAgreement", "keyCertSign", "cRLSign", "encipherOnly", "decipherOnly"];
  var zn = function(e) {
    var t = a, r = t.lang.String.isHex, i = j, s = i.getV, n = i.getTLV, h = i.getVbyList, u = i.getTLVbyList, d = i.getTLVbyListEx, l = i.getIdxbyList, y = i.getIdxbyListEx, p = i.getChildIdx, o = new k();
    this.hex = null, this.posSigAlg = null, this.posRevCert = null, this.parsed = null, this._setPos = function() {
      var c = l(this.hex, 0, [0, 0]), f = this.hex.substr(c, 2);
      if (f == "02") this.posSigAlg = 1;
      else if (f == "30") this.posSigAlg = 0;
      else throw new Error("malformed 1st item of TBSCertList: " + f);
      var g = l(this.hex, 0, [0, this.posSigAlg + 3]), v = this.hex.substr(g, 2);
      if (v == "17" || v == "18") {
        var x, b;
        x = l(this.hex, 0, [0, this.posSigAlg + 4]), this.posRevCert = null, x != -1 && (b = this.hex.substr(x, 2), b == "30" && (this.posRevCert = this.posSigAlg + 4));
      } else if (v == "30") this.posRevCert = this.posSigAlg + 3;
      else if (v == "a0") this.posRevCert = null;
      else throw new Error("malformed nextUpdate or revCert tag: " + v);
    }, this.getVersion = function() {
      return this.posSigAlg == 0 ? null : parseInt(h(this.hex, 0, [0, 0], "02"), 16) + 1;
    }, this.getSignatureAlgorithmField = function() {
      var c = u(this.hex, 0, [0, this.posSigAlg], "30");
      return o.getAlgorithmIdentifierName(c);
    }, this.getIssuer = function() {
      return o.getX500Name(this.getIssuerHex());
    }, this.getIssuerHex = function() {
      return u(this.hex, 0, [0, this.posSigAlg + 1], "30");
    }, this.getThisUpdate = function() {
      var c = h(this.hex, 0, [0, this.posSigAlg + 2]);
      return result = ce(c);
    }, this.getNextUpdate = function() {
      var c = l(this.hex, 0, [0, this.posSigAlg + 3]), f = this.hex.substr(c, 2);
      return f != "17" && f != "18" ? null : ce(s(this.hex, c));
    }, this.getRevCertArray = function() {
      if (this.posRevCert == null) return null;
      for (var c = [], f = l(this.hex, 0, [0, this.posRevCert]), g = p(this.hex, f), v = 0; v < g.length; v++) {
        var x = n(this.hex, g[v]);
        c.push(this.getRevCert(x));
      }
      return c;
    }, this.getRevCert = function(c) {
      var f = {}, g = p(c, 0);
      return f.sn = { hex: h(c, 0, [0], "02") }, f.date = ce(h(c, 0, [1])), g.length == 3 && (f.ext = o.getExtParamArray(u(c, 0, [2]))), f;
    }, this.findRevCert = function(c) {
      var f = new k(c), g = f.getSerialNumberHex();
      return this.findRevCertBySN(g);
    }, this.findRevCertBySN = function(c) {
      if (this.parsed == null && this.getParam(), this.parsed.revcert == null) return null;
      for (var f = this.parsed.revcert, g = 0; g < f.length; g++) if (c == f[g].sn.hex) return f[g];
      return null;
    }, this.getSignatureValueHex = function() {
      return h(this.hex, 0, [2], "03", true);
    }, this.verifySignature = function(c) {
      var f = this.getSignatureAlgorithmField(), g = this.getSignatureValueHex(), v = u(this.hex, 0, [0], "30"), x = new a.crypto.Signature({ alg: f });
      return x.init(c), x.updateHex(v), x.verify(g);
    }, this.getParam = function(c) {
      var f = {}, g = this.getVersion();
      g != null && (f.version = g), f.sigalg = this.getSignatureAlgorithmField(), f.issuer = this.getIssuer(), f.thisupdate = this.getThisUpdate();
      var v = this.getNextUpdate();
      v != null && (f.nextupdate = v);
      var x = this.getRevCertArray();
      x != null && (f.revcert = x);
      var b = y(this.hex, 0, [0, "[0]"]);
      if (b != -1) {
        var I = d(this.hex, 0, [0, "[0]", 0]);
        f.ext = o.getExtParamArray(I);
      }
      return f.sighex = this.getSignatureValueHex(), this.parsed = f, typeof c == "object" && (c.tbshex == true && (f.tbshex = u(this.hex, 0, [0])), c.nodnarray == true && delete f.issuer.array), f;
    }, typeof e == "string" && (r(e) ? this.hex = e : e.match(/-----BEGIN X509 CRL/) && (this.hex = ie(e)), this._setPos());
  };
  return (typeof a > "u" || !a) && (a = {}), (typeof a.jws > "u" || !a.jws) && (a.jws = {}), a.jws.JWS = function() {
    var e = a, t = e.jws.JWS, r = t.isSafeJSONString;
    this.parseJWS = function(i, s) {
      if (!(this.parsedJWS !== void 0 && (s || this.parsedJWS.sigvalH !== void 0))) {
        var n = i.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);
        if (n == null) throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
        var h = n[1], u = n[2], d = n[3], l = h + "." + u;
        if (this.parsedJWS = {}, this.parsedJWS.headB64U = h, this.parsedJWS.payloadB64U = u, this.parsedJWS.sigvalB64U = d, this.parsedJWS.si = l, !s) {
          var y = Y(d), p = fe(y, 16);
          this.parsedJWS.sigvalH = y, this.parsedJWS.sigvalBI = p;
        }
        var o = Ee(h), c = Ee(u);
        if (this.parsedJWS.headS = o, this.parsedJWS.payloadS = c, !r(o, this.parsedJWS, "headP")) throw "malformed JSON string for JWS Head: " + o;
      }
    };
  }, a.jws.JWS.sign = function(e, t, r, i, s) {
    var n = a, h = n.jws, u = h.JWS, d = u.readSafeJSONString, l = u.isSafeJSONString, y = n.crypto;
    y.ECDSA;
    var p = y.Mac, o = y.Signature, c = JSON, f, g, v;
    if (typeof t != "string" && typeof t != "object") throw "spHeader must be JSON string or object: " + t;
    if (typeof t == "object" && (g = t, f = c.stringify(g)), typeof t == "string") {
      if (f = t, !l(f)) throw "JWS Head is not safe JSON string: " + f;
      g = d(f);
    }
    if (v = r, typeof r == "object" && (v = c.stringify(r)), (e == "" || e == null) && g.alg !== void 0 && (e = g.alg), e != "" && e != null && g.alg === void 0 && (g.alg = e, f = c.stringify(g)), e !== g.alg) throw "alg and sHeader.alg doesn't match: " + e + "!=" + g.alg;
    var x = null;
    if (u.jwsalg2sigalg[e] === void 0) throw "unsupported alg name: " + e;
    x = u.jwsalg2sigalg[e];
    var b = Ge(f), I = Ge(v), A = b + "." + I, m = "";
    if (x.substr(0, 4) == "Hmac") {
      if (i === void 0) throw "mac key shall be specified for HS* alg";
      var E = new p({ alg: x, prov: "cryptojs", pass: i });
      E.updateString(A), m = E.doFinal();
    } else if (x.indexOf("withECDSA") != -1) {
      var F = new o({ alg: x });
      F.init(i, s), F.updateString(A);
      var w = F.sign();
      m = a.crypto.ECDSA.asn1SigToConcatSig(w);
    } else if (x != "none") {
      var F = new o({ alg: x });
      F.init(i, s), F.updateString(A), m = F.sign();
    }
    var S = ae(m);
    return A + "." + S;
  }, a.jws.JWS.verify = function(e, t, r) {
    var i = a, s = i.jws, n = s.JWS, h = n.readSafeJSONString, u = i.crypto, d = u.ECDSA, l = u.Mac, y = u.Signature, p;
    if (typeof q !== void 0 && (p = q), !xt(e)) return false;
    var o = e.split(".");
    if (o.length !== 3) return false;
    var c = o[0], f = o[1], g = c + "." + f, v = Y(o[2]), x = h(Ee(o[0])), b = null, I = null;
    if (x.alg === void 0) throw "algorithm not specified in header";
    if (b = x.alg, I = b.substr(0, 2), r != null && Object.prototype.toString.call(r) === "[object Array]" && r.length > 0) {
      var A = ":" + r.join(":") + ":";
      if (A.indexOf(":" + b + ":") == -1) throw "algorithm '" + b + "' not accepted in the list";
    }
    if (b != "none" && t === null) throw "key shall be specified to verify.";
    if (typeof t == "string" && t.indexOf("-----BEGIN ") != -1 && (t = U.getKey(t)), (I == "RS" || I == "PS") && !(t instanceof p)) throw "key shall be a RSAKey obj for RS* and PS* algs";
    if (I == "ES" && !(t instanceof d)) throw "key shall be a ECDSA obj for ES* algs";
    var m = null;
    if (n.jwsalg2sigalg[x.alg] === void 0) throw "unsupported alg name: " + b;
    if (m = n.jwsalg2sigalg[b], m == "none") throw "not supported";
    if (m.substr(0, 4) == "Hmac") {
      var E = null;
      if (t === void 0) throw "hexadecimal key shall be specified for HMAC";
      var F = new l({ alg: m, pass: t });
      return F.updateString(g), E = F.doFinal(), v == E;
    } else if (m.indexOf("withECDSA") != -1) {
      var w = null;
      try {
        w = d.concatSigToASN1Sig(v);
      } catch {
        return false;
      }
      var S = new y({ alg: m });
      return S.init(t), S.updateString(g), S.verify(w);
    } else {
      var S = new y({ alg: m });
      return S.init(t), S.updateString(g), S.verify(v);
    }
  }, a.jws.JWS.parse = function(e) {
    var t = e.split("."), r = {}, i, s, n;
    if (t.length != 2 && t.length != 3) throw "malformed sJWS: wrong number of '.' splitted elements";
    return i = t[0], s = t[1], t.length == 3 && (n = t[2]), r.headerObj = a.jws.JWS.readSafeJSONString(Ee(i)), r.payloadObj = a.jws.JWS.readSafeJSONString(Ee(s)), r.headerPP = JSON.stringify(r.headerObj, null, "  "), r.payloadObj == null ? r.payloadPP = Ee(s) : r.payloadPP = JSON.stringify(r.payloadObj, null, "  "), n !== void 0 && (r.sigHex = Y(n)), r;
  }, a.jws.JWS.verifyJWT = function(e, t, r) {
    var i = a, s = i.jws, n = s.JWS, h = n.readSafeJSONString, u = n.inArray, d = n.includedArray;
    if (!xt(e)) return false;
    var l = e.split(".");
    if (l.length != 3) return false;
    var y = l[0], p = l[1];
    Y(l[2]);
    var o = h(Ee(y)), c = h(Ee(p));
    if (o.alg === void 0) return false;
    if (r.alg === void 0) throw "acceptField.alg shall be specified";
    if (!u(o.alg, r.alg) || c.iss !== void 0 && typeof r.iss == "object" && !u(c.iss, r.iss) || c.sub !== void 0 && typeof r.sub == "object" && !u(c.sub, r.sub)) return false;
    if (c.aud !== void 0 && typeof r.aud == "object") {
      if (typeof c.aud == "string") {
        if (!u(c.aud, r.aud)) return false;
      } else if (typeof c.aud == "object" && !d(c.aud, r.aud)) return false;
    }
    var f = s.IntDate.getNow();
    return r.verifyAt !== void 0 && typeof r.verifyAt == "number" && (f = r.verifyAt), (r.gracePeriod === void 0 || typeof r.gracePeriod != "number") && (r.gracePeriod = 0), !(c.exp !== void 0 && typeof c.exp == "number" && c.exp + r.gracePeriod < f || c.nbf !== void 0 && typeof c.nbf == "number" && f < c.nbf - r.gracePeriod || c.iat !== void 0 && typeof c.iat == "number" && f < c.iat - r.gracePeriod || c.jti !== void 0 && r.jti !== void 0 && c.jti !== r.jti || !n.verify(e, t, r.alg));
  }, a.jws.JWS.includedArray = function(e, t) {
    var r = a.jws.JWS.inArray;
    if (e === null || typeof e != "object" || typeof e.length != "number") return false;
    for (var i = 0; i < e.length; i++) if (!r(e[i], t)) return false;
    return true;
  }, a.jws.JWS.inArray = function(e, t) {
    if (t === null || typeof t != "object" || typeof t.length != "number") return false;
    for (var r = 0; r < t.length; r++) if (t[r] == e) return true;
    return false;
  }, a.jws.JWS.jwsalg2sigalg = { HS256: "HmacSHA256", HS384: "HmacSHA384", HS512: "HmacSHA512", RS256: "SHA256withRSA", RS384: "SHA384withRSA", RS512: "SHA512withRSA", ES256: "SHA256withECDSA", ES384: "SHA384withECDSA", ES512: "SHA512withECDSA", PS256: "SHA256withRSAandMGF1", PS384: "SHA384withRSAandMGF1", PS512: "SHA512withRSAandMGF1", none: "none" }, a.jws.JWS.isSafeJSONString = function(e, t, r) {
    var i = null;
    try {
      return i = Nt(e), typeof i != "object" || i.constructor === Array ? 0 : (t && (t[r] = i), 1);
    } catch {
      return 0;
    }
  }, a.jws.JWS.readSafeJSONString = function(e) {
    var t = null;
    try {
      return t = Nt(e), typeof t != "object" || t.constructor === Array ? null : t;
    } catch {
      return null;
    }
  }, a.jws.JWS.getEncodedSignatureValueFromJWS = function(e) {
    var t = e.match(/^[^.]+\.[^.]+\.([^.]+)$/);
    if (t == null) throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
    return t[1];
  }, a.jws.JWS.getJWKthumbprint = function(e) {
    if (e.kty !== "RSA" && e.kty !== "EC" && e.kty !== "oct") throw "unsupported algorithm for JWK Thumprint";
    var t = "{";
    if (e.kty === "RSA") {
      if (typeof e.n != "string" || typeof e.e != "string") throw "wrong n and e value for RSA key";
      t += '"e":"' + e.e + '",', t += '"kty":"' + e.kty + '",', t += '"n":"' + e.n + '"}';
    } else if (e.kty === "EC") {
      if (typeof e.crv != "string" || typeof e.x != "string" || typeof e.y != "string") throw "wrong crv, x and y value for EC key";
      t += '"crv":"' + e.crv + '",', t += '"kty":"' + e.kty + '",', t += '"x":"' + e.x + '",', t += '"y":"' + e.y + '"}';
    } else if (e.kty === "oct") {
      if (typeof e.k != "string") throw "wrong k value for oct(symmetric) key";
      t += '"kty":"' + e.kty + '",', t += '"k":"' + e.k + '"}';
    }
    var r = xe(t), i = a.crypto.Util.hashHex(r, "sha256"), s = ae(i);
    return s;
  }, a.jws.IntDate = {}, a.jws.IntDate.get = function(e) {
    var t = a.jws.IntDate, r = t.getNow, i = t.getZulu;
    if (e == "now") return r();
    if (e == "now + 1hour") return r() + 3600;
    if (e == "now + 1day") return r() + 3600 * 24;
    if (e == "now + 1month") return r() + 3600 * 24 * 30;
    if (e == "now + 1year") return r() + 3600 * 24 * 365;
    if (e.match(/Z$/)) return i(e);
    if (e.match(/^[0-9]+$/)) return parseInt(e);
    throw "unsupported format: " + e;
  }, a.jws.IntDate.getZulu = function(e) {
    return Kt(e);
  }, a.jws.IntDate.getNow = function() {
    var e = ~~(/* @__PURE__ */ new Date() / 1e3);
    return e;
  }, a.jws.IntDate.intDate2UTCString = function(e) {
    var t = new Date(e * 1e3);
    return t.toUTCString();
  }, a.jws.IntDate.intDate2Zulu = function(e) {
    var t = new Date(e * 1e3), r = ("0000" + t.getUTCFullYear()).slice(-4), i = ("00" + (t.getUTCMonth() + 1)).slice(-2), s = ("00" + t.getUTCDate()).slice(-2), n = ("00" + t.getUTCHours()).slice(-2), h = ("00" + t.getUTCMinutes()).slice(-2), u = ("00" + t.getUTCSeconds()).slice(-2);
    return r + i + s + n + h + u + "Z";
  }, (typeof a > "u" || !a) && (a = {}), (typeof a.jws > "u" || !a.jws) && (a.jws = {}), a.jws.JWSJS = function() {
    var e = a, t = e.jws, r = t.JWS, i = r.readSafeJSONString;
    this.aHeader = [], this.sPayload = "", this.aSignature = [], this.init = function() {
      this.aHeader = [], this.sPayload = void 0, this.aSignature = [];
    }, this.initWithJWS = function(s) {
      this.init();
      var n = s.split(".");
      if (n.length != 3) throw "malformed input JWS";
      this.aHeader.push(n[0]), this.sPayload = n[1], this.aSignature.push(n[2]);
    }, this.addSignature = function(s, n, h, u) {
      if (this.sPayload === void 0 || this.sPayload === null) throw "there's no JSON-JS signature to add.";
      var d = this.aHeader.length;
      if (this.aHeader.length != this.aSignature.length) throw "aHeader.length != aSignature.length";
      try {
        var l = a.jws.JWS.sign(s, n, this.sPayload, h, u), y = l.split("."), p = y[0], o = y[2];
        this.aHeader.push(y[0]), this.aSignature.push(y[2]);
      } catch (c) {
        throw this.aHeader.length > d && this.aHeader.pop(), this.aSignature.length > d && this.aSignature.pop(), "addSignature failed: " + c;
      }
    }, this.verifyAll = function(s) {
      if (this.aHeader.length !== s.length || this.aSignature.length !== s.length) return false;
      for (var n = 0; n < s.length; n++) {
        var h = s[n];
        if (h.length !== 2) return false;
        var u = this.verifyNth(n, h[0], h[1]);
        if (u === false) return false;
      }
      return true;
    }, this.verifyNth = function(s, n, h) {
      if (this.aHeader.length <= s || this.aSignature.length <= s) return false;
      var u = this.aHeader[s], d = this.aSignature[s], l = u + "." + this.sPayload + "." + d, y = false;
      try {
        y = r.verify(l, n, h);
      } catch {
        return false;
      }
      return y;
    }, this.readJWSJS = function(s) {
      if (typeof s == "string") {
        var n = i(s);
        if (n == null) throw "argument is not safe JSON object string";
        this.aHeader = n.headers, this.sPayload = n.payload, this.aSignature = n.signatures;
      } else try {
        if (s.headers.length > 0) this.aHeader = s.headers;
        else throw "malformed header";
        if (typeof s.payload == "string") this.sPayload = s.payload;
        else throw "malformed signatures";
        if (s.signatures.length > 0) this.aSignature = s.signatures;
        else throw "malformed signatures";
      } catch (h) {
        throw "malformed JWS-JS JSON object: " + h;
      }
    }, this.getJSON = function() {
      return { headers: this.aHeader, payload: this.sPayload, signatures: this.aSignature };
    }, this.isEmpty = function() {
      return this.aHeader.length == 0 ? 1 : 0;
    };
  }, V.SecureRandom = Ne, V.rng_seed_time = dt, V.BigInteger = C, V.RSAKey = q, V.ECDSA = a.crypto.ECDSA, V.DSA = a.crypto.DSA, V.Signature = a.crypto.Signature, V.MessageDigest = a.crypto.MessageDigest, V.Mac = a.crypto.Mac, V.Cipher = a.crypto.Cipher, V.KEYUTIL = U, V.ASN1HEX = j, V.X509 = k, V.X509CRL = zn, V.CryptoJS = L, V.b64tohex = Ke, V.b64toBA = Ft, V.ECFieldElementFp = se, V.ECPointFp = _, V.ECCurveFp = Pe, V.stoBA = Ht, V.BAtos = Ot, V.BAtohex = Ze, V.stohex = pe, V.stob64 = Rn, V.stob64u = Tn, V.b64utos = Bn, V.b64tob64u = Me, V.b64utob64 = Ue, V.hex2b64 = ge, V.hextob64u = ae, V.b64utohex = Y, V.utf8tob64u = Ge, V.b64utoutf8 = Ee, V.utf8tob64 = Nn, V.b64toutf8 = Hn, V.utf8tohex = Qe, V.hextoutf8 = W, V.hextorstr = ce, V.rstrtohex = xe, V.hextob64 = jt, V.hextob64nl = Vt, V.b64nltohex = Lt, V.hextopem = ue, V.pemtohex = ie, V.hextoArrayBuffer = Vn, V.ArrayBuffertohex = Ln, V.zulutomsec = pt, V.zulutosec = Kt, V.zulutodate = Kn, V.datetozulu = qn, V.uricmptohex = et, V.hextouricmp = tt, V.ipv6tohex = gt, V.hextoipv6 = vt, V.hextoip = rt, V.iptohex = yt, V.ucs2hextoutf8 = mt, V.encodeURIComponentAll = it, V.newline_toUnix = kn, V.newline_toDos = Mn, V.hextoposhex = St, V.intarystrtohex = _n, V.strdiffidx = Un, V.oidtohex = _t, V.hextooid = nt, V.strpad = st, V.bitstrtoint = Ut, V.inttobitstr = Gt, V.bitstrtobinstr = zt, V.binstrtobitstr = Gn, V.isBase64URLDot = xt, V.namearraytobinstr = at, V.extendClass = N, V.KJUR = a, V.crypto = a.crypto, V.asn1 = a.asn1, V.jws = a.jws, V.lang = a.lang, V;
}
var Zt = Yn();
const Zn = Jn(Zt), es = $n({ __proto__: null, default: Zn }, [Zt]);
export { es as j };
