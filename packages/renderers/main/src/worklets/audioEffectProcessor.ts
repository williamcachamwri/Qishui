// packages/renderers/main/src/worklets/audioEffectProcessor.ts
// @ts-nocheck
typeof self > "u" && (globalThis.self = globalThis);
typeof location > "u" && (globalThis.location = { href: "audioworklet://processor/", origin: "audioworklet://processor", protocol: "audioworklet:", host: "processor", hostname: "processor", port: "", pathname: "/", search: "", hash: "" });
(function() {
  "use strict";
  if (typeof globalThis.SharedArrayBuffer > "u") {
    const O = function(u) {
      return new ArrayBuffer(u);
    };
    O.prototype = Object.create(ArrayBuffer.prototype), O.prototype.constructor = O, Object.defineProperty(O.prototype, "byteLength", { get() {
      return ArrayBuffer.prototype.slice.call(this, 0).byteLength;
    } }), Object.defineProperty(O.prototype, "growable", { get() {
      return false;
    } }), Object.defineProperty(O.prototype, "maxByteLength", { get() {
      return this.byteLength;
    } }), O.prototype.grow = function() {
      throw new TypeError("Cannot grow a non-growable SharedArrayBuffer");
    }, O.prototype.slice = function(u, l) {
      return ArrayBuffer.prototype.slice.call(this, u ?? 0, l);
    }, globalThis.SharedArrayBuffer = O;
  }
  typeof globalThis.TextEncoder > "u" && (globalThis.TextEncoder = class {
    encoding = "utf-8";
    encode(u) {
      if (!u) return new Uint8Array(0);
      const l = [];
      for (let d = 0; d < u.length; d++) {
        let h = u.charCodeAt(d);
        if (h >= 55296 && h <= 56319 && d + 1 < u.length) {
          const E = u.charCodeAt(d + 1);
          E >= 56320 && E <= 57343 && (h = 65536 + (h - 55296 << 10) + (E - 56320), d++);
        }
        h < 128 ? l.push(h) : h < 2048 ? l.push(192 | h >> 6, 128 | h & 63) : h < 65536 ? l.push(224 | h >> 12, 128 | h >> 6 & 63, 128 | h & 63) : l.push(240 | h >> 18, 128 | h >> 12 & 63, 128 | h >> 6 & 63, 128 | h & 63);
      }
      return new Uint8Array(l);
    }
    encodeInto(u, l) {
      const d = this.encode(u), h = Math.min(d.length, l.length);
      l.set(d.subarray(0, h));
      let E = 0, k = 0;
      for (let B = 0; B < u.length && k < h; B++) {
        let R = u.charCodeAt(B);
        if (R >= 55296 && R <= 56319 && B + 1 < u.length) {
          const ee = u.charCodeAt(B + 1);
          ee >= 56320 && ee <= 57343 && (R = 65536 + (R - 55296 << 10) + (ee - 56320));
        }
        const M = R < 128 ? 1 : R < 2048 ? 2 : R < 65536 ? 3 : 4;
        if (k + M > h) break;
        k += M, E++, R > 65535 && E++;
      }
      return { read: E, written: h };
    }
  }), typeof globalThis.TextDecoder > "u" && (globalThis.TextDecoder = class {
    encoding;
    fatal;
    ignoreBOM;
    constructor(u = "utf-8", l) {
      this.encoding = u, this.fatal = l?.fatal ?? false, this.ignoreBOM = l?.ignoreBOM ?? false;
    }
    decode(u, l) {
      if (!u) return "";
      const d = u instanceof ArrayBuffer ? new Uint8Array(u) : new Uint8Array(u.buffer, u.byteOffset, u.byteLength);
      let h = "", E = 0;
      for (; E < d.length; ) {
        let k;
        const B = d[E];
        B < 128 ? (k = B, E++) : (B & 224) === 192 ? (k = (B & 31) << 6 | d[E + 1] & 63, E += 2) : (B & 240) === 224 ? (k = (B & 15) << 12 | (d[E + 1] & 63) << 6 | d[E + 2] & 63, E += 3) : (k = (B & 7) << 18 | (d[E + 1] & 63) << 12 | (d[E + 2] & 63) << 6 | d[E + 3] & 63, E += 4), k > 65535 ? (k -= 65536, h += String.fromCharCode(55296 + (k >> 10), 56320 + (k & 1023))) : h += String.fromCharCode(k);
      }
      return h;
    }
  }), typeof globalThis.URLSearchParams > "u" && (globalThis.URLSearchParams = class nr {
    params = /* @__PURE__ */ new Map();
    constructor(u) {
      if (u) if (typeof u == "string") {
        const l = u.startsWith("?") ? u.slice(1) : u;
        for (const d of l.split("&")) {
          const [h, E] = d.split("=").map(decodeURIComponent);
          this.append(h, E ?? "");
        }
      } else if (Array.isArray(u)) for (const [l, d] of u) this.append(l, d);
      else if (u instanceof nr) u.forEach((l, d) => this.append(d, l));
      else for (const [l, d] of Object.entries(u)) this.append(l, d);
    }
    append(u, l) {
      const d = this.params.get(u) ?? [];
      d.push(l), this.params.set(u, d);
    }
    delete(u) {
      this.params.delete(u);
    }
    get(u) {
      return this.params.get(u)?.[0] ?? null;
    }
    getAll(u) {
      return this.params.get(u) ?? [];
    }
    has(u) {
      return this.params.has(u);
    }
    set(u, l) {
      this.params.set(u, [l]);
    }
    toString() {
      const u = [];
      return this.params.forEach((l, d) => {
        for (const h of l) u.push(`${encodeURIComponent(d)}=${encodeURIComponent(h)}`);
      }), u.join("&");
    }
    forEach(u) {
      this.params.forEach((l, d) => {
        for (const h of l) u(h, d, this);
      });
    }
    *entries() {
      for (const [u, l] of this.params) for (const d of l) yield [u, d];
    }
    *keys() {
      for (const [u] of this.entries()) yield u;
    }
    *values() {
      for (const [, u] of this.entries()) yield u;
    }
    [Symbol.iterator]() {
      return this.entries();
    }
    get size() {
      let u = 0;
      return this.params.forEach((l) => u += l.length), u;
    }
    sort() {
      const u = new Map([...this.params.entries()].sort(([l], [d]) => l.localeCompare(d)));
      this.params = u;
    }
  }), typeof globalThis.URL > "u" && (globalThis.URL = class Ae {
    hash = "";
    host = "";
    hostname = "";
    href;
    origin = "";
    password = "";
    pathname = "";
    port = "";
    protocol = "";
    search = "";
    searchParams;
    username = "";
    constructor(u, l) {
      const d = l ? new Ae(l.toString()).href.replace(/\/?$/, "/") + u : u;
      this.href = d, this.searchParams = new URLSearchParams();
    }
    toString() {
      return this.href;
    }
    toJSON() {
      return this.href;
    }
    static canParse(u, l) {
      try {
        return new Ae(u, l), true;
      } catch {
        return false;
      }
    }
    static createObjectURL(u) {
      throw new Error("createObjectURL is not supported in AudioWorklet");
    }
    static revokeObjectURL(u) {
      throw new Error("revokeObjectURL is not supported in AudioWorklet");
    }
  });
  async function or(O = {}) {
    var u, l = O, d = !!globalThis.window, h = !!globalThis.WorkerGlobalScope, E = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
    if (E) {
      const { createRequire: e } = await Promise.resolve().then(function() {
        return cr;
      });
      var k = e(self.location.href);
    }
    var B = "./this.program", R = self.location.href, M = "";
    function ee(e) {
      return l.locateFile ? l.locateFile(e, M) : M + e;
    }
    var se, fe;
    if (E) {
      var pe = k("fs");
      R.startsWith("file:") && (M = k("path").dirname(k("url").fileURLToPath(R)) + "/"), fe = (e) => {
        e = Re(e) ? new URL(e) : e;
        var r = pe.readFileSync(e);
        return r;
      }, se = async (e, r = true) => {
        e = Re(e) ? new URL(e) : e;
        var t = pe.readFileSync(e, r ? void 0 : "utf8");
        return t;
      }, process.argv.length > 1 && (B = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2);
    } else if (d || h) {
      try {
        M = new URL(".", R).href;
      } catch {
      }
      se = async (e) => {
        var r = await fetch(e, { credentials: "same-origin" });
        if (r.ok) return r.arrayBuffer();
        throw new Error(r.status + " : " + r.url);
      };
    }
    var le = console.log.bind(console), V = console.error.bind(console), re, Se = false, Re = (e) => e.startsWith("file://"), Fe, De, x, q, ue, A, b, j, Ce = false;
    function Te() {
      var e = me.buffer;
      x = new Int8Array(e), ue = new Int16Array(e), l.HEAPU8 = q = new Uint8Array(e), l.HEAP32 = A = new Int32Array(e), b = new Uint32Array(e), l.HEAPF32 = new Float32Array(e), j = new BigInt64Array(e), new BigUint64Array(e);
    }
    function dr() {
      if (l.preRun) for (typeof l.preRun == "function" && (l.preRun = [l.preRun]); l.preRun.length; ) br(l.preRun.shift());
      Be(Ne);
    }
    function hr() {
      Ce = true, !l.noFSInit && !n.initialized && n.init(), ie.S(), n.ignorePermissions = false;
    }
    function vr() {
      if (l.postRun) for (typeof l.postRun == "function" && (l.postRun = [l.postRun]); l.postRun.length; ) kr(l.postRun.shift());
      Be(Me);
    }
    function I(e) {
      l.onAbort?.(e), e = "Aborted(" + e + ")", V(e), Se = true, e += ". Build with -sASSERTIONS for more info.";
      var r = new WebAssembly.RuntimeError(e);
      throw De?.(r), r;
    }
    var we;
    function mr() {
      return l.locateFile ? ee("byte_audio_tuner_wasm.wasm") : new URL("" + new URL("byte_audio_tuner_wasm-BOQqSFWE.wasm", self.location.href).href, self.location.href).href;
    }
    function pr(e) {
      if (e == we && re) return new Uint8Array(re);
      if (fe) return fe(e);
      throw "both async and sync fetching of the wasm failed";
    }
    async function wr(e) {
      if (!re) try {
        var r = await se(e);
        return new Uint8Array(r);
      } catch {
      }
      return pr(e);
    }
    async function _r(e, r) {
      try {
        var t = await wr(e), o = await WebAssembly.instantiate(t, r);
        return o;
      } catch (i) {
        V(`failed to asynchronously prepare wasm: ${i}`), I(i);
      }
    }
    async function gr(e, r, t) {
      if (!e && !E) try {
        var o = fetch(r, { credentials: "same-origin" }), i = await WebAssembly.instantiateStreaming(o, t);
        return i;
      } catch (a) {
        V(`wasm streaming compile failed: ${a}`), V("falling back to ArrayBuffer instantiation");
      }
      return _r(r, t);
    }
    function yr() {
      var e = { a: wt };
      return e;
    }
    async function Er() {
      function e(a, s) {
        return ie = a.exports, pt(ie), Te(), ie;
      }
      function r(a) {
        return e(a.instance);
      }
      var t = yr();
      if (l.instantiateWasm) return new Promise((a, s) => {
        l.instantiateWasm(t, (f, c) => {
          a(e(f));
        });
      });
      we ??= mr();
      var o = await gr(re, we, t), i = r(o);
      return i;
    }
    var Be = (e) => {
      for (; e.length > 0; ) e.shift()(l);
    }, Me = [], kr = (e) => Me.push(e), Ne = [], br = (e) => Ne.push(e), F = (e) => qe(e), D = () => Je(), ce = [], de = 0, Pr = (e) => {
      var r = new _e(e);
      return r.get_caught() || (r.set_caught(true), de--), r.set_rethrown(false), ce.push(r), Qe(e), rr(e);
    }, G = 0, Ar = () => {
      S(0, 0);
      var e = ce.pop();
      Ze(e.excPtr), G = 0;
    };
    class _e {
      constructor(r) {
        this.excPtr = r, this.ptr = r - 24;
      }
      set_type(r) {
        b[this.ptr + 4 >> 2] = r;
      }
      get_type() {
        return b[this.ptr + 4 >> 2];
      }
      set_destructor(r) {
        b[this.ptr + 8 >> 2] = r;
      }
      get_destructor() {
        return b[this.ptr + 8 >> 2];
      }
      set_caught(r) {
        r = r ? 1 : 0, x[this.ptr + 12] = r;
      }
      get_caught() {
        return x[this.ptr + 12] != 0;
      }
      set_rethrown(r) {
        r = r ? 1 : 0, x[this.ptr + 13] = r;
      }
      get_rethrown() {
        return x[this.ptr + 13] != 0;
      }
      init(r, t) {
        this.set_adjusted_ptr(0), this.set_type(r), this.set_destructor(t);
      }
      set_adjusted_ptr(r) {
        b[this.ptr + 16 >> 2] = r;
      }
      get_adjusted_ptr() {
        return b[this.ptr + 16 >> 2];
      }
    }
    var he = (e) => Ye(e), Le = (e) => {
      var r = G;
      if (!r) return he(0), 0;
      var t = new _e(r);
      t.set_adjusted_ptr(r);
      var o = t.get_type();
      if (!o) return he(0), r;
      for (var i of e) {
        if (i === 0 || i === o) break;
        var a = t.ptr + 16;
        if (er(i, o, a)) return he(i), r;
      }
      return he(o), r;
    }, Sr = () => Le([]), Rr = (e) => Le([e]), Fr = () => {
      var e = ce.pop();
      e || I("no exception to throw");
      var r = e.excPtr;
      throw e.get_rethrown() || (ce.push(e), e.set_rethrown(true), e.set_caught(false), de++), G = r, G;
    }, Dr = (e, r, t) => {
      var o = new _e(e);
      throw o.init(r, t), G = e, de++, G;
    }, Cr = () => de, Tr = (e) => {
      throw G || (G = e), G;
    }, ve = () => {
      var e = A[+z.varargs >> 2];
      return z.varargs += 4, e;
    }, K = ve, P = { isAbs: (e) => e.charAt(0) === "/", splitPath: (e) => {
      var r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return r.exec(e).slice(1);
    }, normalizeArray: (e, r) => {
      for (var t = 0, o = e.length - 1; o >= 0; o--) {
        var i = e[o];
        i === "." ? e.splice(o, 1) : i === ".." ? (e.splice(o, 1), t++) : t && (e.splice(o, 1), t--);
      }
      if (r) for (; t; t--) e.unshift("..");
      return e;
    }, normalize: (e) => {
      var r = P.isAbs(e), t = e.slice(-1) === "/";
      return e = P.normalizeArray(e.split("/").filter((o) => !!o), !r).join("/"), !e && !r && (e = "."), e && t && (e += "/"), (r ? "/" : "") + e;
    }, dirname: (e) => {
      var r = P.splitPath(e), t = r[0], o = r[1];
      return !t && !o ? "." : (o && (o = o.slice(0, -1)), t + o);
    }, basename: (e) => e && e.match(/([^\/]+|\/)\/*$/)[1], join: (...e) => P.normalize(e.join("/")), join2: (e, r) => P.normalize(e + "/" + r) }, Br = () => {
      if (E) {
        var e = k("crypto");
        return (r) => e.randomFillSync(r);
      }
      return (r) => crypto.getRandomValues(r);
    }, Oe = (e) => {
      (Oe = Br())(e);
    }, J = { resolve: (...e) => {
      for (var r = "", t = false, o = e.length - 1; o >= -1 && !t; o--) {
        var i = o >= 0 ? e[o] : n.cwd();
        if (typeof i != "string") throw new TypeError("Arguments to path.resolve must be strings");
        if (!i) return "";
        r = i + "/" + r, t = P.isAbs(i);
      }
      return r = P.normalizeArray(r.split("/").filter((a) => !!a), !t).join("/"), (t ? "/" : "") + r || ".";
    }, relative: (e, r) => {
      e = J.resolve(e).slice(1), r = J.resolve(r).slice(1);
      function t(v) {
        for (var _ = 0; _ < v.length && v[_] === ""; _++) ;
        for (var g = v.length - 1; g >= 0 && v[g] === ""; g--) ;
        return _ > g ? [] : v.slice(_, g - _ + 1);
      }
      for (var o = t(e.split("/")), i = t(r.split("/")), a = Math.min(o.length, i.length), s = a, f = 0; f < a; f++) if (o[f] !== i[f]) {
        s = f;
        break;
      }
      for (var c = [], f = s; f < o.length; f++) c.push("..");
      return c = c.concat(i.slice(s)), c.join("/");
    } }, Ue = new TextDecoder(), xe = (e, r, t, o) => {
      for (var i = r + t; e[r] && !(r >= i); ) ++r;
      return r;
    }, te = (e, r = 0, t, o) => {
      var i = xe(e, r, t);
      return Ue.decode(e.buffer ? e.subarray(r, i) : new Uint8Array(e.slice(r, i)));
    }, ge = [], ye = (e) => {
      for (var r = 0, t = 0; t < e.length; ++t) {
        var o = e.charCodeAt(t);
        o <= 127 ? r++ : o <= 2047 ? r += 2 : o >= 55296 && o <= 57343 ? (r += 4, ++t) : r += 3;
      }
      return r;
    }, ze = (e, r, t, o) => {
      if (!(o > 0)) return 0;
      for (var i = t, a = t + o - 1, s = 0; s < e.length; ++s) {
        var f = e.codePointAt(s);
        if (f <= 127) {
          if (t >= a) break;
          r[t++] = f;
        } else if (f <= 2047) {
          if (t + 1 >= a) break;
          r[t++] = 192 | f >> 6, r[t++] = 128 | f & 63;
        } else if (f <= 65535) {
          if (t + 2 >= a) break;
          r[t++] = 224 | f >> 12, r[t++] = 128 | f >> 6 & 63, r[t++] = 128 | f & 63;
        } else {
          if (t + 3 >= a) break;
          r[t++] = 240 | f >> 18, r[t++] = 128 | f >> 12 & 63, r[t++] = 128 | f >> 6 & 63, r[t++] = 128 | f & 63, s++;
        }
      }
      return r[t] = 0, t - i;
    }, Ee = (e, r, t) => {
      var o = ye(e) + 1, i = new Array(o), a = ze(e, i, 0, i.length);
      return i.length = a, i;
    }, Mr = () => {
      if (!ge.length) {
        var e = null;
        if (E) {
          var r = 256, t = Buffer.alloc(r), o = 0, i = process.stdin.fd;
          try {
            o = pe.readSync(i, t, 0, r);
          } catch (a) {
            if (a.toString().includes("EOF")) o = 0;
            else throw a;
          }
          o > 0 && (e = t.slice(0, o).toString("utf-8"));
        } else globalThis.window?.prompt && (e = window.prompt("Input: "), e !== null && (e += `
`));
        if (!e) return null;
        ge = Ee(e);
      }
      return ge.shift();
    }, X = { ttys: [], init() {
    }, shutdown() {
    }, register(e, r) {
      X.ttys[e] = { input: [], output: [], ops: r }, n.registerDevice(e, X.stream_ops);
    }, stream_ops: { open(e) {
      var r = X.ttys[e.node.rdev];
      if (!r) throw new n.ErrnoError(43);
      e.tty = r, e.seekable = false;
    }, close(e) {
      e.tty.ops.fsync(e.tty);
    }, fsync(e) {
      e.tty.ops.fsync(e.tty);
    }, read(e, r, t, o, i) {
      if (!e.tty || !e.tty.ops.get_char) throw new n.ErrnoError(60);
      for (var a = 0, s = 0; s < o; s++) {
        var f;
        try {
          f = e.tty.ops.get_char(e.tty);
        } catch {
          throw new n.ErrnoError(29);
        }
        if (f === void 0 && a === 0) throw new n.ErrnoError(6);
        if (f == null) break;
        a++, r[t + s] = f;
      }
      return a && (e.node.atime = Date.now()), a;
    }, write(e, r, t, o, i) {
      if (!e.tty || !e.tty.ops.put_char) throw new n.ErrnoError(60);
      try {
        for (var a = 0; a < o; a++) e.tty.ops.put_char(e.tty, r[t + a]);
      } catch {
        throw new n.ErrnoError(29);
      }
      return o && (e.node.mtime = e.node.ctime = Date.now()), a;
    } }, default_tty_ops: { get_char(e) {
      return Mr();
    }, put_char(e, r) {
      r === null || r === 10 ? (le(te(e.output)), e.output = []) : r != 0 && e.output.push(r);
    }, fsync(e) {
      e.output?.length > 0 && (le(te(e.output)), e.output = []);
    }, ioctl_tcgets(e) {
      return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
    }, ioctl_tcsets(e, r, t) {
      return 0;
    }, ioctl_tiocgwinsz(e) {
      return [24, 80];
    } }, default_tty1_ops: { put_char(e, r) {
      r === null || r === 10 ? (V(te(e.output)), e.output = []) : r != 0 && e.output.push(r);
    }, fsync(e) {
      e.output?.length > 0 && (V(te(e.output)), e.output = []);
    } } }, Ie = (e) => {
      I();
    }, w = { ops_table: null, mount(e) {
      return w.createNode(null, "/", 16895, 0);
    }, createNode(e, r, t, o) {
      if (n.isBlkdev(t) || n.isFIFO(t)) throw new n.ErrnoError(63);
      w.ops_table ||= { dir: { node: { getattr: w.node_ops.getattr, setattr: w.node_ops.setattr, lookup: w.node_ops.lookup, mknod: w.node_ops.mknod, rename: w.node_ops.rename, unlink: w.node_ops.unlink, rmdir: w.node_ops.rmdir, readdir: w.node_ops.readdir, symlink: w.node_ops.symlink }, stream: { llseek: w.stream_ops.llseek } }, file: { node: { getattr: w.node_ops.getattr, setattr: w.node_ops.setattr }, stream: { llseek: w.stream_ops.llseek, read: w.stream_ops.read, write: w.stream_ops.write, mmap: w.stream_ops.mmap, msync: w.stream_ops.msync } }, link: { node: { getattr: w.node_ops.getattr, setattr: w.node_ops.setattr, readlink: w.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: w.node_ops.getattr, setattr: w.node_ops.setattr }, stream: n.chrdev_stream_ops } };
      var i = n.createNode(e, r, t, o);
      return n.isDir(i.mode) ? (i.node_ops = w.ops_table.dir.node, i.stream_ops = w.ops_table.dir.stream, i.contents = {}) : n.isFile(i.mode) ? (i.node_ops = w.ops_table.file.node, i.stream_ops = w.ops_table.file.stream, i.usedBytes = 0, i.contents = null) : n.isLink(i.mode) ? (i.node_ops = w.ops_table.link.node, i.stream_ops = w.ops_table.link.stream) : n.isChrdev(i.mode) && (i.node_ops = w.ops_table.chrdev.node, i.stream_ops = w.ops_table.chrdev.stream), i.atime = i.mtime = i.ctime = Date.now(), e && (e.contents[r] = i, e.atime = e.mtime = e.ctime = i.atime), i;
    }, getFileDataAsTypedArray(e) {
      return e.contents ? e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents) : new Uint8Array(0);
    }, expandFileStorage(e, r) {
      var t = e.contents ? e.contents.length : 0;
      if (!(t >= r)) {
        var o = 1024 * 1024;
        r = Math.max(r, t * (t < o ? 2 : 1.125) >>> 0), t != 0 && (r = Math.max(r, 256));
        var i = e.contents;
        e.contents = new Uint8Array(r), e.usedBytes > 0 && e.contents.set(i.subarray(0, e.usedBytes), 0);
      }
    }, resizeFileStorage(e, r) {
      if (e.usedBytes != r) if (r == 0) e.contents = null, e.usedBytes = 0;
      else {
        var t = e.contents;
        e.contents = new Uint8Array(r), t && e.contents.set(t.subarray(0, Math.min(r, e.usedBytes))), e.usedBytes = r;
      }
    }, node_ops: { getattr(e) {
      var r = {};
      return r.dev = n.isChrdev(e.mode) ? e.id : 1, r.ino = e.id, r.mode = e.mode, r.nlink = 1, r.uid = 0, r.gid = 0, r.rdev = e.rdev, n.isDir(e.mode) ? r.size = 4096 : n.isFile(e.mode) ? r.size = e.usedBytes : n.isLink(e.mode) ? r.size = e.link.length : r.size = 0, r.atime = new Date(e.atime), r.mtime = new Date(e.mtime), r.ctime = new Date(e.ctime), r.blksize = 4096, r.blocks = Math.ceil(r.size / r.blksize), r;
    }, setattr(e, r) {
      for (const t of ["mode", "atime", "mtime", "ctime"]) r[t] != null && (e[t] = r[t]);
      r.size !== void 0 && w.resizeFileStorage(e, r.size);
    }, lookup(e, r) {
      throw w.doesNotExistError || (w.doesNotExistError = new n.ErrnoError(44), w.doesNotExistError.stack = "<generic error, no stack>"), w.doesNotExistError;
    }, mknod(e, r, t, o) {
      return w.createNode(e, r, t, o);
    }, rename(e, r, t) {
      var o;
      try {
        o = n.lookupNode(r, t);
      } catch {
      }
      if (o) {
        if (n.isDir(e.mode)) for (var i in o.contents) throw new n.ErrnoError(55);
        n.hashRemoveNode(o);
      }
      delete e.parent.contents[e.name], r.contents[t] = e, e.name = t, r.ctime = r.mtime = e.parent.ctime = e.parent.mtime = Date.now();
    }, unlink(e, r) {
      delete e.contents[r], e.ctime = e.mtime = Date.now();
    }, rmdir(e, r) {
      var t = n.lookupNode(e, r);
      for (var o in t.contents) throw new n.ErrnoError(55);
      delete e.contents[r], e.ctime = e.mtime = Date.now();
    }, readdir(e) {
      return [".", "..", ...Object.keys(e.contents)];
    }, symlink(e, r, t) {
      var o = w.createNode(e, r, 41471, 0);
      return o.link = t, o;
    }, readlink(e) {
      if (!n.isLink(e.mode)) throw new n.ErrnoError(28);
      return e.link;
    } }, stream_ops: { read(e, r, t, o, i) {
      var a = e.node.contents;
      if (i >= e.node.usedBytes) return 0;
      var s = Math.min(e.node.usedBytes - i, o);
      if (s > 8 && a.subarray) r.set(a.subarray(i, i + s), t);
      else for (var f = 0; f < s; f++) r[t + f] = a[i + f];
      return s;
    }, write(e, r, t, o, i, a) {
      if (r.buffer === x.buffer && (a = false), !o) return 0;
      var s = e.node;
      if (s.mtime = s.ctime = Date.now(), r.subarray && (!s.contents || s.contents.subarray)) {
        if (a) return s.contents = r.subarray(t, t + o), s.usedBytes = o, o;
        if (s.usedBytes === 0 && i === 0) return s.contents = r.slice(t, t + o), s.usedBytes = o, o;
        if (i + o <= s.usedBytes) return s.contents.set(r.subarray(t, t + o), i), o;
      }
      if (w.expandFileStorage(s, i + o), s.contents.subarray && r.subarray) s.contents.set(r.subarray(t, t + o), i);
      else for (var f = 0; f < o; f++) s.contents[i + f] = r[t + f];
      return s.usedBytes = Math.max(s.usedBytes, i + o), o;
    }, llseek(e, r, t) {
      var o = r;
      if (t === 1 ? o += e.position : t === 2 && n.isFile(e.node.mode) && (o += e.node.usedBytes), o < 0) throw new n.ErrnoError(28);
      return o;
    }, mmap(e, r, t, o, i) {
      if (!n.isFile(e.node.mode)) throw new n.ErrnoError(43);
      var a, s, f = e.node.contents;
      if (!(i & 2) && f && f.buffer === x.buffer) s = false, a = f.byteOffset;
      else {
        if (s = true, a = Ie(), !a) throw new n.ErrnoError(48);
        f && ((t > 0 || t + r < f.length) && (f.subarray ? f = f.subarray(t, t + r) : f = Array.prototype.slice.call(f, t, t + r)), x.set(f, a));
      }
      return { ptr: a, allocated: s };
    }, msync(e, r, t, o, i) {
      return w.stream_ops.write(e, r, 0, o, t, false), 0;
    } } }, Nr = (e) => {
      var r = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }, t = r[e];
      if (typeof t > "u") throw new Error(`Unknown file open mode: ${e}`);
      return t;
    }, ke = (e, r) => {
      var t = 0;
      return e && (t |= 365), r && (t |= 146), t;
    }, Lr = async (e) => {
      var r = await se(e);
      return new Uint8Array(r);
    }, Or = (...e) => n.createDataFile(...e), Y = 0, ne = null, Ur = (e) => {
      if (Y--, l.monitorRunDependencies?.(Y), Y == 0 && ne) {
        var r = ne;
        ne = null, r();
      }
    }, xr = (e) => {
      Y++, l.monitorRunDependencies?.(Y);
    }, je = [], zr = async (e, r) => {
      typeof Browser < "u" && Browser.init();
      for (var t of je) if (t.canHandle(r)) return t.handle(e, r);
      return e;
    }, He = async (e, r, t, o, i, a, s, f) => {
      var c = r ? J.resolve(P.join2(e, r)) : e;
      xr();
      try {
        var v = t;
        typeof t == "string" && (v = await Lr(t)), v = await zr(v, c), f?.(), a || Or(e, r, v, o, i, s);
      } finally {
        Ur();
      }
    }, Ir = (e, r, t, o, i, a, s, f, c, v) => {
      He(e, r, t, o, i, f, c, v).then(a).catch(s);
    }, n = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, filesystems: null, syncFSRequests: 0, readFiles: {}, ErrnoError: class {
      name = "ErrnoError";
      constructor(e) {
        this.errno = e;
      }
    }, FSStream: class {
      shared = {};
      get object() {
        return this.node;
      }
      set object(e) {
        this.node = e;
      }
      get isRead() {
        return (this.flags & 2097155) !== 1;
      }
      get isWrite() {
        return (this.flags & 2097155) !== 0;
      }
      get isAppend() {
        return this.flags & 1024;
      }
      get flags() {
        return this.shared.flags;
      }
      set flags(e) {
        this.shared.flags = e;
      }
      get position() {
        return this.shared.position;
      }
      set position(e) {
        this.shared.position = e;
      }
    }, FSNode: class {
      node_ops = {};
      stream_ops = {};
      readMode = 365;
      writeMode = 146;
      mounted = null;
      constructor(e, r, t, o) {
        e || (e = this), this.parent = e, this.mount = e.mount, this.id = n.nextInode++, this.name = r, this.mode = t, this.rdev = o, this.atime = this.mtime = this.ctime = Date.now();
      }
      get read() {
        return (this.mode & this.readMode) === this.readMode;
      }
      set read(e) {
        e ? this.mode |= this.readMode : this.mode &= ~this.readMode;
      }
      get write() {
        return (this.mode & this.writeMode) === this.writeMode;
      }
      set write(e) {
        e ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
      }
      get isFolder() {
        return n.isDir(this.mode);
      }
      get isDevice() {
        return n.isChrdev(this.mode);
      }
    }, lookupPath(e, r = {}) {
      if (!e) throw new n.ErrnoError(44);
      r.follow_mount ??= true, P.isAbs(e) || (e = n.cwd() + "/" + e);
      e: for (var t = 0; t < 40; t++) {
        for (var o = e.split("/").filter((v) => !!v), i = n.root, a = "/", s = 0; s < o.length; s++) {
          var f = s === o.length - 1;
          if (f && r.parent) break;
          if (o[s] !== ".") {
            if (o[s] === "..") {
              if (a = P.dirname(a), n.isRoot(i)) {
                e = a + "/" + o.slice(s + 1).join("/"), t--;
                continue e;
              } else i = i.parent;
              continue;
            }
            a = P.join2(a, o[s]);
            try {
              i = n.lookupNode(i, o[s]);
            } catch (v) {
              if (v?.errno === 44 && f && r.noent_okay) return { path: a };
              throw v;
            }
            if (n.isMountpoint(i) && (!f || r.follow_mount) && (i = i.mounted.root), n.isLink(i.mode) && (!f || r.follow)) {
              if (!i.node_ops.readlink) throw new n.ErrnoError(52);
              var c = i.node_ops.readlink(i);
              P.isAbs(c) || (c = P.dirname(a) + "/" + c), e = c + "/" + o.slice(s + 1).join("/");
              continue e;
            }
          }
        }
        return { path: a, node: i };
      }
      throw new n.ErrnoError(32);
    }, getPath(e) {
      for (var r; ; ) {
        if (n.isRoot(e)) {
          var t = e.mount.mountpoint;
          return r ? t[t.length - 1] !== "/" ? `${t}/${r}` : t + r : t;
        }
        r = r ? `${e.name}/${r}` : e.name, e = e.parent;
      }
    }, hashName(e, r) {
      for (var t = 0, o = 0; o < r.length; o++) t = (t << 5) - t + r.charCodeAt(o) | 0;
      return (e + t >>> 0) % n.nameTable.length;
    }, hashAddNode(e) {
      var r = n.hashName(e.parent.id, e.name);
      e.name_next = n.nameTable[r], n.nameTable[r] = e;
    }, hashRemoveNode(e) {
      var r = n.hashName(e.parent.id, e.name);
      if (n.nameTable[r] === e) n.nameTable[r] = e.name_next;
      else for (var t = n.nameTable[r]; t; ) {
        if (t.name_next === e) {
          t.name_next = e.name_next;
          break;
        }
        t = t.name_next;
      }
    }, lookupNode(e, r) {
      var t = n.mayLookup(e);
      if (t) throw new n.ErrnoError(t);
      for (var o = n.hashName(e.id, r), i = n.nameTable[o]; i; i = i.name_next) {
        var a = i.name;
        if (i.parent.id === e.id && a === r) return i;
      }
      return n.lookup(e, r);
    }, createNode(e, r, t, o) {
      var i = new n.FSNode(e, r, t, o);
      return n.hashAddNode(i), i;
    }, destroyNode(e) {
      n.hashRemoveNode(e);
    }, isRoot(e) {
      return e === e.parent;
    }, isMountpoint(e) {
      return !!e.mounted;
    }, isFile(e) {
      return (e & 61440) === 32768;
    }, isDir(e) {
      return (e & 61440) === 16384;
    }, isLink(e) {
      return (e & 61440) === 40960;
    }, isChrdev(e) {
      return (e & 61440) === 8192;
    }, isBlkdev(e) {
      return (e & 61440) === 24576;
    }, isFIFO(e) {
      return (e & 61440) === 4096;
    }, isSocket(e) {
      return (e & 49152) === 49152;
    }, flagsToPermissionString(e) {
      var r = ["r", "w", "rw"][e & 3];
      return e & 512 && (r += "w"), r;
    }, nodePermissions(e, r) {
      return n.ignorePermissions ? 0 : r.includes("r") && !(e.mode & 292) || r.includes("w") && !(e.mode & 146) || r.includes("x") && !(e.mode & 73) ? 2 : 0;
    }, mayLookup(e) {
      if (!n.isDir(e.mode)) return 54;
      var r = n.nodePermissions(e, "x");
      return r || (e.node_ops.lookup ? 0 : 2);
    }, mayCreate(e, r) {
      if (!n.isDir(e.mode)) return 54;
      try {
        var t = n.lookupNode(e, r);
        return 20;
      } catch {
      }
      return n.nodePermissions(e, "wx");
    }, mayDelete(e, r, t) {
      var o;
      try {
        o = n.lookupNode(e, r);
      } catch (a) {
        return a.errno;
      }
      var i = n.nodePermissions(e, "wx");
      if (i) return i;
      if (t) {
        if (!n.isDir(o.mode)) return 54;
        if (n.isRoot(o) || n.getPath(o) === n.cwd()) return 10;
      } else if (n.isDir(o.mode)) return 31;
      return 0;
    }, mayOpen(e, r) {
      return e ? n.isLink(e.mode) ? 32 : n.isDir(e.mode) && (n.flagsToPermissionString(r) !== "r" || r & 576) ? 31 : n.nodePermissions(e, n.flagsToPermissionString(r)) : 44;
    }, checkOpExists(e, r) {
      if (!e) throw new n.ErrnoError(r);
      return e;
    }, MAX_OPEN_FDS: 4096, nextfd() {
      for (var e = 0; e <= n.MAX_OPEN_FDS; e++) if (!n.streams[e]) return e;
      throw new n.ErrnoError(33);
    }, getStreamChecked(e) {
      var r = n.getStream(e);
      if (!r) throw new n.ErrnoError(8);
      return r;
    }, getStream: (e) => n.streams[e], createStream(e, r = -1) {
      return e = Object.assign(new n.FSStream(), e), r == -1 && (r = n.nextfd()), e.fd = r, n.streams[r] = e, e;
    }, closeStream(e) {
      n.streams[e] = null;
    }, dupStream(e, r = -1) {
      var t = n.createStream(e, r);
      return t.stream_ops?.dup?.(t), t;
    }, doSetAttr(e, r, t) {
      var o = e?.stream_ops.setattr, i = o ? e : r;
      o ??= r.node_ops.setattr, n.checkOpExists(o, 63), o(i, t);
    }, chrdev_stream_ops: { open(e) {
      var r = n.getDevice(e.node.rdev);
      e.stream_ops = r.stream_ops, e.stream_ops.open?.(e);
    }, llseek() {
      throw new n.ErrnoError(70);
    } }, major: (e) => e >> 8, minor: (e) => e & 255, makedev: (e, r) => e << 8 | r, registerDevice(e, r) {
      n.devices[e] = { stream_ops: r };
    }, getDevice: (e) => n.devices[e], getMounts(e) {
      for (var r = [], t = [e]; t.length; ) {
        var o = t.pop();
        r.push(o), t.push(...o.mounts);
      }
      return r;
    }, syncfs(e, r) {
      typeof e == "function" && (r = e, e = false), n.syncFSRequests++, n.syncFSRequests > 1 && V(`warning: ${n.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
      var t = n.getMounts(n.root.mount), o = 0;
      function i(f) {
        return n.syncFSRequests--, r(f);
      }
      function a(f) {
        if (f) return a.errored ? void 0 : (a.errored = true, i(f));
        ++o >= t.length && i(null);
      }
      for (var s of t) s.type.syncfs ? s.type.syncfs(s, e, a) : a(null);
    }, mount(e, r, t) {
      var o = t === "/", i = !t, a;
      if (o && n.root) throw new n.ErrnoError(10);
      if (!o && !i) {
        var s = n.lookupPath(t, { follow_mount: false });
        if (t = s.path, a = s.node, n.isMountpoint(a)) throw new n.ErrnoError(10);
        if (!n.isDir(a.mode)) throw new n.ErrnoError(54);
      }
      var f = { type: e, opts: r, mountpoint: t, mounts: [] }, c = e.mount(f);
      return c.mount = f, f.root = c, o ? n.root = c : a && (a.mounted = f, a.mount && a.mount.mounts.push(f)), c;
    }, unmount(e) {
      var r = n.lookupPath(e, { follow_mount: false });
      if (!n.isMountpoint(r.node)) throw new n.ErrnoError(28);
      var t = r.node, o = t.mounted, i = n.getMounts(o);
      for (var [a, s] of Object.entries(n.nameTable)) for (; s; ) {
        var f = s.name_next;
        i.includes(s.mount) && n.destroyNode(s), s = f;
      }
      t.mounted = null;
      var c = t.mount.mounts.indexOf(o);
      t.mount.mounts.splice(c, 1);
    }, lookup(e, r) {
      return e.node_ops.lookup(e, r);
    }, mknod(e, r, t) {
      var o = n.lookupPath(e, { parent: true }), i = o.node, a = P.basename(e);
      if (!a) throw new n.ErrnoError(28);
      if (a === "." || a === "..") throw new n.ErrnoError(20);
      var s = n.mayCreate(i, a);
      if (s) throw new n.ErrnoError(s);
      if (!i.node_ops.mknod) throw new n.ErrnoError(63);
      return i.node_ops.mknod(i, a, r, t);
    }, statfs(e) {
      return n.statfsNode(n.lookupPath(e, { follow: true }).node);
    }, statfsStream(e) {
      return n.statfsNode(e.node);
    }, statfsNode(e) {
      var r = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: n.nextInode, ffree: n.nextInode - 1, fsid: 42, flags: 2, namelen: 255 };
      return e.node_ops.statfs && Object.assign(r, e.node_ops.statfs(e.mount.opts.root)), r;
    }, create(e, r = 438) {
      return r &= 4095, r |= 32768, n.mknod(e, r, 0);
    }, mkdir(e, r = 511) {
      return r &= 1023, r |= 16384, n.mknod(e, r, 0);
    }, mkdirTree(e, r) {
      var t = e.split("/"), o = "";
      for (var i of t) if (i) {
        (o || P.isAbs(e)) && (o += "/"), o += i;
        try {
          n.mkdir(o, r);
        } catch (a) {
          if (a.errno != 20) throw a;
        }
      }
    }, mkdev(e, r, t) {
      return typeof t > "u" && (t = r, r = 438), r |= 8192, n.mknod(e, r, t);
    }, symlink(e, r) {
      if (!J.resolve(e)) throw new n.ErrnoError(44);
      var t = n.lookupPath(r, { parent: true }), o = t.node;
      if (!o) throw new n.ErrnoError(44);
      var i = P.basename(r), a = n.mayCreate(o, i);
      if (a) throw new n.ErrnoError(a);
      if (!o.node_ops.symlink) throw new n.ErrnoError(63);
      return o.node_ops.symlink(o, i, e);
    }, rename(e, r) {
      var t = P.dirname(e), o = P.dirname(r), i = P.basename(e), a = P.basename(r), s, f, c;
      if (s = n.lookupPath(e, { parent: true }), f = s.node, s = n.lookupPath(r, { parent: true }), c = s.node, !f || !c) throw new n.ErrnoError(44);
      if (f.mount !== c.mount) throw new n.ErrnoError(75);
      var v = n.lookupNode(f, i), _ = J.relative(e, o);
      if (_.charAt(0) !== ".") throw new n.ErrnoError(28);
      if (_ = J.relative(r, t), _.charAt(0) !== ".") throw new n.ErrnoError(55);
      var g;
      try {
        g = n.lookupNode(c, a);
      } catch {
      }
      if (v !== g) {
        var m = n.isDir(v.mode), p = n.mayDelete(f, i, m);
        if (p) throw new n.ErrnoError(p);
        if (p = g ? n.mayDelete(c, a, m) : n.mayCreate(c, a), p) throw new n.ErrnoError(p);
        if (!f.node_ops.rename) throw new n.ErrnoError(63);
        if (n.isMountpoint(v) || g && n.isMountpoint(g)) throw new n.ErrnoError(10);
        if (c !== f && (p = n.nodePermissions(f, "w"), p)) throw new n.ErrnoError(p);
        n.hashRemoveNode(v);
        try {
          f.node_ops.rename(v, c, a), v.parent = c;
        } catch (y) {
          throw y;
        } finally {
          n.hashAddNode(v);
        }
      }
    }, rmdir(e) {
      var r = n.lookupPath(e, { parent: true }), t = r.node, o = P.basename(e), i = n.lookupNode(t, o), a = n.mayDelete(t, o, true);
      if (a) throw new n.ErrnoError(a);
      if (!t.node_ops.rmdir) throw new n.ErrnoError(63);
      if (n.isMountpoint(i)) throw new n.ErrnoError(10);
      t.node_ops.rmdir(t, o), n.destroyNode(i);
    }, readdir(e) {
      var r = n.lookupPath(e, { follow: true }), t = r.node, o = n.checkOpExists(t.node_ops.readdir, 54);
      return o(t);
    }, unlink(e) {
      var r = n.lookupPath(e, { parent: true }), t = r.node;
      if (!t) throw new n.ErrnoError(44);
      var o = P.basename(e), i = n.lookupNode(t, o), a = n.mayDelete(t, o, false);
      if (a) throw new n.ErrnoError(a);
      if (!t.node_ops.unlink) throw new n.ErrnoError(63);
      if (n.isMountpoint(i)) throw new n.ErrnoError(10);
      t.node_ops.unlink(t, o), n.destroyNode(i);
    }, readlink(e) {
      var r = n.lookupPath(e), t = r.node;
      if (!t) throw new n.ErrnoError(44);
      if (!t.node_ops.readlink) throw new n.ErrnoError(28);
      return t.node_ops.readlink(t);
    }, stat(e, r) {
      var t = n.lookupPath(e, { follow: !r }), o = t.node, i = n.checkOpExists(o.node_ops.getattr, 63);
      return i(o);
    }, fstat(e) {
      var r = n.getStreamChecked(e), t = r.node, o = r.stream_ops.getattr, i = o ? r : t;
      return o ??= t.node_ops.getattr, n.checkOpExists(o, 63), o(i);
    }, lstat(e) {
      return n.stat(e, true);
    }, doChmod(e, r, t, o) {
      n.doSetAttr(e, r, { mode: t & 4095 | r.mode & -4096, ctime: Date.now(), dontFollow: o });
    }, chmod(e, r, t) {
      var o;
      if (typeof e == "string") {
        var i = n.lookupPath(e, { follow: !t });
        o = i.node;
      } else o = e;
      n.doChmod(null, o, r, t);
    }, lchmod(e, r) {
      n.chmod(e, r, true);
    }, fchmod(e, r) {
      var t = n.getStreamChecked(e);
      n.doChmod(t, t.node, r, false);
    }, doChown(e, r, t) {
      n.doSetAttr(e, r, { timestamp: Date.now(), dontFollow: t });
    }, chown(e, r, t, o) {
      var i;
      if (typeof e == "string") {
        var a = n.lookupPath(e, { follow: !o });
        i = a.node;
      } else i = e;
      n.doChown(null, i, o);
    }, lchown(e, r, t) {
      n.chown(e, r, t, true);
    }, fchown(e, r, t) {
      var o = n.getStreamChecked(e);
      n.doChown(o, o.node, false);
    }, doTruncate(e, r, t) {
      if (n.isDir(r.mode)) throw new n.ErrnoError(31);
      if (!n.isFile(r.mode)) throw new n.ErrnoError(28);
      var o = n.nodePermissions(r, "w");
      if (o) throw new n.ErrnoError(o);
      n.doSetAttr(e, r, { size: t, timestamp: Date.now() });
    }, truncate(e, r) {
      if (r < 0) throw new n.ErrnoError(28);
      var t;
      if (typeof e == "string") {
        var o = n.lookupPath(e, { follow: true });
        t = o.node;
      } else t = e;
      n.doTruncate(null, t, r);
    }, ftruncate(e, r) {
      var t = n.getStreamChecked(e);
      if (r < 0 || (t.flags & 2097155) === 0) throw new n.ErrnoError(28);
      n.doTruncate(t, t.node, r);
    }, utime(e, r, t) {
      var o = n.lookupPath(e, { follow: true }), i = o.node, a = n.checkOpExists(i.node_ops.setattr, 63);
      a(i, { atime: r, mtime: t });
    }, open(e, r, t = 438) {
      if (e === "") throw new n.ErrnoError(44);
      r = typeof r == "string" ? Nr(r) : r, r & 64 ? t = t & 4095 | 32768 : t = 0;
      var o, i;
      if (typeof e == "object") o = e;
      else {
        i = e.endsWith("/");
        var a = n.lookupPath(e, { follow: !(r & 131072), noent_okay: true });
        o = a.node, e = a.path;
      }
      var s = false;
      if (r & 64) if (o) {
        if (r & 128) throw new n.ErrnoError(20);
      } else {
        if (i) throw new n.ErrnoError(31);
        o = n.mknod(e, t | 511, 0), s = true;
      }
      if (!o) throw new n.ErrnoError(44);
      if (n.isChrdev(o.mode) && (r &= -513), r & 65536 && !n.isDir(o.mode)) throw new n.ErrnoError(54);
      if (!s) {
        var f = n.mayOpen(o, r);
        if (f) throw new n.ErrnoError(f);
      }
      r & 512 && !s && n.truncate(o, 0), r &= -131713;
      var c = n.createStream({ node: o, path: n.getPath(o), flags: r, seekable: true, position: 0, stream_ops: o.stream_ops, ungotten: [], error: false });
      return c.stream_ops.open && c.stream_ops.open(c), s && n.chmod(o, t & 511), l.logReadFiles && !(r & 1) && (e in n.readFiles || (n.readFiles[e] = 1)), c;
    }, close(e) {
      if (n.isClosed(e)) throw new n.ErrnoError(8);
      e.getdents && (e.getdents = null);
      try {
        e.stream_ops.close && e.stream_ops.close(e);
      } catch (r) {
        throw r;
      } finally {
        n.closeStream(e.fd);
      }
      e.fd = null;
    }, isClosed(e) {
      return e.fd === null;
    }, llseek(e, r, t) {
      if (n.isClosed(e)) throw new n.ErrnoError(8);
      if (!e.seekable || !e.stream_ops.llseek) throw new n.ErrnoError(70);
      if (t != 0 && t != 1 && t != 2) throw new n.ErrnoError(28);
      return e.position = e.stream_ops.llseek(e, r, t), e.ungotten = [], e.position;
    }, read(e, r, t, o, i) {
      if (o < 0 || i < 0) throw new n.ErrnoError(28);
      if (n.isClosed(e)) throw new n.ErrnoError(8);
      if ((e.flags & 2097155) === 1) throw new n.ErrnoError(8);
      if (n.isDir(e.node.mode)) throw new n.ErrnoError(31);
      if (!e.stream_ops.read) throw new n.ErrnoError(28);
      var a = typeof i < "u";
      if (!a) i = e.position;
      else if (!e.seekable) throw new n.ErrnoError(70);
      var s = e.stream_ops.read(e, r, t, o, i);
      return a || (e.position += s), s;
    }, write(e, r, t, o, i, a) {
      if (o < 0 || i < 0) throw new n.ErrnoError(28);
      if (n.isClosed(e)) throw new n.ErrnoError(8);
      if ((e.flags & 2097155) === 0) throw new n.ErrnoError(8);
      if (n.isDir(e.node.mode)) throw new n.ErrnoError(31);
      if (!e.stream_ops.write) throw new n.ErrnoError(28);
      e.seekable && e.flags & 1024 && n.llseek(e, 0, 2);
      var s = typeof i < "u";
      if (!s) i = e.position;
      else if (!e.seekable) throw new n.ErrnoError(70);
      var f = e.stream_ops.write(e, r, t, o, i, a);
      return s || (e.position += f), f;
    }, mmap(e, r, t, o, i) {
      if ((o & 2) !== 0 && (i & 2) === 0 && (e.flags & 2097155) !== 2) throw new n.ErrnoError(2);
      if ((e.flags & 2097155) === 1) throw new n.ErrnoError(2);
      if (!e.stream_ops.mmap) throw new n.ErrnoError(43);
      if (!r) throw new n.ErrnoError(28);
      return e.stream_ops.mmap(e, r, t, o, i);
    }, msync(e, r, t, o, i) {
      return e.stream_ops.msync ? e.stream_ops.msync(e, r, t, o, i) : 0;
    }, ioctl(e, r, t) {
      if (!e.stream_ops.ioctl) throw new n.ErrnoError(59);
      return e.stream_ops.ioctl(e, r, t);
    }, readFile(e, r = {}) {
      r.flags = r.flags || 0, r.encoding = r.encoding || "binary", r.encoding !== "utf8" && r.encoding !== "binary" && I(`Invalid encoding type "${r.encoding}"`);
      var t = n.open(e, r.flags), o = n.stat(e), i = o.size, a = new Uint8Array(i);
      return n.read(t, a, 0, i, 0), r.encoding === "utf8" && (a = te(a)), n.close(t), a;
    }, writeFile(e, r, t = {}) {
      t.flags = t.flags || 577;
      var o = n.open(e, t.flags, t.mode);
      typeof r == "string" && (r = new Uint8Array(Ee(r))), ArrayBuffer.isView(r) ? n.write(o, r, 0, r.byteLength, void 0, t.canOwn) : I("Unsupported data type"), n.close(o);
    }, cwd: () => n.currentPath, chdir(e) {
      var r = n.lookupPath(e, { follow: true });
      if (r.node === null) throw new n.ErrnoError(44);
      if (!n.isDir(r.node.mode)) throw new n.ErrnoError(54);
      var t = n.nodePermissions(r.node, "x");
      if (t) throw new n.ErrnoError(t);
      n.currentPath = r.path;
    }, createDefaultDirectories() {
      n.mkdir("/tmp"), n.mkdir("/home"), n.mkdir("/home/web_user");
    }, createDefaultDevices() {
      n.mkdir("/dev"), n.registerDevice(n.makedev(1, 3), { read: () => 0, write: (o, i, a, s, f) => s, llseek: () => 0 }), n.mkdev("/dev/null", n.makedev(1, 3)), X.register(n.makedev(5, 0), X.default_tty_ops), X.register(n.makedev(6, 0), X.default_tty1_ops), n.mkdev("/dev/tty", n.makedev(5, 0)), n.mkdev("/dev/tty1", n.makedev(6, 0));
      var e = new Uint8Array(1024), r = 0, t = () => (r === 0 && (Oe(e), r = e.byteLength), e[--r]);
      n.createDevice("/dev", "random", t), n.createDevice("/dev", "urandom", t), n.mkdir("/dev/shm"), n.mkdir("/dev/shm/tmp");
    }, createSpecialDirectories() {
      n.mkdir("/proc");
      var e = n.mkdir("/proc/self");
      n.mkdir("/proc/self/fd"), n.mount({ mount() {
        var r = n.createNode(e, "fd", 16895, 73);
        return r.stream_ops = { llseek: w.stream_ops.llseek }, r.node_ops = { lookup(t, o) {
          var i = +o, a = n.getStreamChecked(i), s = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => a.path }, id: i + 1 };
          return s.parent = s, s;
        }, readdir() {
          return Array.from(n.streams.entries()).filter(([t, o]) => o).map(([t, o]) => t.toString());
        } }, r;
      } }, {}, "/proc/self/fd");
    }, createStandardStreams(e, r, t) {
      e ? n.createDevice("/dev", "stdin", e) : n.symlink("/dev/tty", "/dev/stdin"), r ? n.createDevice("/dev", "stdout", null, r) : n.symlink("/dev/tty", "/dev/stdout"), t ? n.createDevice("/dev", "stderr", null, t) : n.symlink("/dev/tty1", "/dev/stderr"), n.open("/dev/stdin", 0), n.open("/dev/stdout", 1), n.open("/dev/stderr", 1);
    }, staticInit() {
      n.nameTable = new Array(4096), n.mount(w, {}, "/"), n.createDefaultDirectories(), n.createDefaultDevices(), n.createSpecialDirectories(), n.filesystems = { MEMFS: w };
    }, init(e, r, t) {
      n.initialized = true, e ??= l.stdin, r ??= l.stdout, t ??= l.stderr, n.createStandardStreams(e, r, t);
    }, quit() {
      n.initialized = false;
      for (var e of n.streams) e && n.close(e);
    }, findObject(e, r) {
      var t = n.analyzePath(e, r);
      return t.exists ? t.object : null;
    }, analyzePath(e, r) {
      try {
        var t = n.lookupPath(e, { follow: !r });
        e = t.path;
      } catch {
      }
      var o = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
      try {
        var t = n.lookupPath(e, { parent: true });
        o.parentExists = true, o.parentPath = t.path, o.parentObject = t.node, o.name = P.basename(e), t = n.lookupPath(e, { follow: !r }), o.exists = true, o.path = t.path, o.object = t.node, o.name = t.node.name, o.isRoot = t.path === "/";
      } catch (i) {
        o.error = i.errno;
      }
      return o;
    }, createPath(e, r, t, o) {
      e = typeof e == "string" ? e : n.getPath(e);
      for (var i = r.split("/").reverse(); i.length; ) {
        var a = i.pop();
        if (a) {
          var s = P.join2(e, a);
          try {
            n.mkdir(s);
          } catch (f) {
            if (f.errno != 20) throw f;
          }
          e = s;
        }
      }
      return s;
    }, createFile(e, r, t, o, i) {
      var a = P.join2(typeof e == "string" ? e : n.getPath(e), r), s = ke(o, i);
      return n.create(a, s);
    }, createDataFile(e, r, t, o, i, a) {
      var s = r;
      e && (e = typeof e == "string" ? e : n.getPath(e), s = r ? P.join2(e, r) : e);
      var f = ke(o, i), c = n.create(s, f);
      if (t) {
        if (typeof t == "string") {
          for (var v = new Array(t.length), _ = 0, g = t.length; _ < g; ++_) v[_] = t.charCodeAt(_);
          t = v;
        }
        n.chmod(c, f | 146);
        var m = n.open(c, 577);
        n.write(m, t, 0, t.length, 0, a), n.close(m), n.chmod(c, f);
      }
    }, createDevice(e, r, t, o) {
      var i = P.join2(typeof e == "string" ? e : n.getPath(e), r), a = ke(!!t, !!o);
      n.createDevice.major ??= 64;
      var s = n.makedev(n.createDevice.major++, 0);
      return n.registerDevice(s, { open(f) {
        f.seekable = false;
      }, close(f) {
        o?.buffer?.length && o(10);
      }, read(f, c, v, _, g) {
        for (var m = 0, p = 0; p < _; p++) {
          var y;
          try {
            y = t();
          } catch {
            throw new n.ErrnoError(29);
          }
          if (y === void 0 && m === 0) throw new n.ErrnoError(6);
          if (y == null) break;
          m++, c[v + p] = y;
        }
        return m && (f.node.atime = Date.now()), m;
      }, write(f, c, v, _, g) {
        for (var m = 0; m < _; m++) try {
          o(c[v + m]);
        } catch {
          throw new n.ErrnoError(29);
        }
        return _ && (f.node.mtime = f.node.ctime = Date.now()), m;
      } }), n.mkdev(i, a, s);
    }, forceLoadFile(e) {
      if (e.isDevice || e.isFolder || e.link || e.contents) return true;
      if (globalThis.XMLHttpRequest) I("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      else try {
        e.contents = fe(e.url);
      } catch {
        throw new n.ErrnoError(29);
      }
    }, createLazyFile(e, r, t, o, i) {
      class a {
        lengthKnown = false;
        chunks = [];
        get(m) {
          if (!(m > this.length - 1 || m < 0)) {
            var p = m % this.chunkSize, y = m / this.chunkSize | 0;
            return this.getter(y)[p];
          }
        }
        setDataGetter(m) {
          this.getter = m;
        }
        cacheLength() {
          var m = new XMLHttpRequest();
          m.open("HEAD", t, false), m.send(null), m.status >= 200 && m.status < 300 || m.status === 304 || I("Couldn't load " + t + ". Status: " + m.status);
          var p = Number(m.getResponseHeader("Content-length")), y, T = (y = m.getResponseHeader("Accept-Ranges")) && y === "bytes", U = (y = m.getResponseHeader("Content-Encoding")) && y === "gzip", N = 1024 * 1024;
          T || (N = p);
          var H = ($, Z) => {
            $ > Z && I("invalid range (" + $ + ", " + Z + ") or no bytes requested!"), Z > p - 1 && I("only " + p + " bytes available! programmer error!");
            var L = new XMLHttpRequest();
            return L.open("GET", t, false), p !== N && L.setRequestHeader("Range", "bytes=" + $ + "-" + Z), L.responseType = "arraybuffer", L.overrideMimeType && L.overrideMimeType("text/plain; charset=x-user-defined"), L.send(null), L.status >= 200 && L.status < 300 || L.status === 304 || I("Couldn't load " + t + ". Status: " + L.status), L.response !== void 0 ? new Uint8Array(L.response || []) : Ee(L.responseText || "");
          }, ae = this;
          ae.setDataGetter(($) => {
            var Z = $ * N, L = ($ + 1) * N - 1;
            return L = Math.min(L, p - 1), typeof ae.chunks[$] > "u" && (ae.chunks[$] = H(Z, L)), typeof ae.chunks[$] > "u" && I("doXHR failed!"), ae.chunks[$];
          }), (U || !p) && (N = p = 1, p = this.getter(0).length, N = p, le("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = p, this._chunkSize = N, this.lengthKnown = true;
        }
        get length() {
          return this.lengthKnown || this.cacheLength(), this._length;
        }
        get chunkSize() {
          return this.lengthKnown || this.cacheLength(), this._chunkSize;
        }
      }
      if (globalThis.XMLHttpRequest) {
        h || I("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
        var s = new a(), f = { isDevice: false, contents: s };
      } else var f = { isDevice: false, url: t };
      var c = n.createFile(e, r, f, o, i);
      f.contents ? c.contents = f.contents : f.url && (c.contents = null, c.url = f.url), Object.defineProperties(c, { usedBytes: { get: function() {
        return this.contents.length;
      } } });
      var v = {};
      for (const [g, m] of Object.entries(c.stream_ops)) v[g] = (...p) => (n.forceLoadFile(c), m(...p));
      function _(g, m, p, y, T) {
        var U = g.node.contents;
        if (T >= U.length) return 0;
        var N = Math.min(U.length - T, y);
        if (U.slice) for (var H = 0; H < N; H++) m[p + H] = U[T + H];
        else for (var H = 0; H < N; H++) m[p + H] = U.get(T + H);
        return N;
      }
      return v.read = (g, m, p, y, T) => (n.forceLoadFile(c), _(g, m, p, y, T)), v.mmap = (g, m, p, y, T) => {
        n.forceLoadFile(c);
        var U = Ie();
        if (!U) throw new n.ErrnoError(48);
        return _(g, x, U, m, p), { ptr: U, allocated: true };
      }, c.stream_ops = v, c;
    } }, We = (e, r, t) => {
      if (!e) return "";
      var o = xe(q, e, r);
      return Ue.decode(q.subarray(e, o));
    }, z = { DEFAULT_POLLMASK: 5, calculateAt(e, r, t) {
      if (P.isAbs(r)) return r;
      var o;
      if (e === -100) o = n.cwd();
      else {
        var i = z.getStreamFromFD(e);
        o = i.path;
      }
      if (r.length == 0) {
        if (!t) throw new n.ErrnoError(44);
        return o;
      }
      return o + "/" + r;
    }, writeStat(e, r) {
      b[e >> 2] = r.dev, b[e + 4 >> 2] = r.mode, b[e + 8 >> 2] = r.nlink, b[e + 12 >> 2] = r.uid, b[e + 16 >> 2] = r.gid, b[e + 20 >> 2] = r.rdev, j[e + 24 >> 3] = BigInt(r.size), A[e + 32 >> 2] = 4096, A[e + 36 >> 2] = r.blocks;
      var t = r.atime.getTime(), o = r.mtime.getTime(), i = r.ctime.getTime();
      return j[e + 40 >> 3] = BigInt(Math.floor(t / 1e3)), b[e + 48 >> 2] = t % 1e3 * 1e3 * 1e3, j[e + 56 >> 3] = BigInt(Math.floor(o / 1e3)), b[e + 64 >> 2] = o % 1e3 * 1e3 * 1e3, j[e + 72 >> 3] = BigInt(Math.floor(i / 1e3)), b[e + 80 >> 2] = i % 1e3 * 1e3 * 1e3, j[e + 88 >> 3] = BigInt(r.ino), 0;
    }, writeStatFs(e, r) {
      b[e + 4 >> 2] = r.bsize, b[e + 60 >> 2] = r.bsize, j[e + 8 >> 3] = BigInt(r.blocks), j[e + 16 >> 3] = BigInt(r.bfree), j[e + 24 >> 3] = BigInt(r.bavail), j[e + 32 >> 3] = BigInt(r.files), j[e + 40 >> 3] = BigInt(r.ffree), b[e + 48 >> 2] = r.fsid, b[e + 64 >> 2] = r.flags, b[e + 56 >> 2] = r.namelen;
    }, doMsync(e, r, t, o, i) {
      if (!n.isFile(r.node.mode)) throw new n.ErrnoError(43);
      if (o & 2) return 0;
      var a = q.slice(e, e + t);
      n.msync(r, a, i, t, o);
    }, getStreamFromFD(e) {
      var r = n.getStreamChecked(e);
      return r;
    }, varargs: void 0, getStr(e) {
      var r = We(e);
      return r;
    } };
    function jr(e, r, t) {
      z.varargs = t;
      try {
        var o = z.getStreamFromFD(e);
        switch (r) {
          case 0: {
            var i = ve();
            if (i < 0) return -28;
            for (; n.streams[i]; ) i++;
            var a;
            return a = n.dupStream(o, i), a.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return o.flags;
          case 4: {
            var i = ve();
            return o.flags |= i, 0;
          }
          case 12: {
            var i = K(), s = 0;
            return ue[i + s >> 1] = 2, 0;
          }
          case 13:
          case 14:
            return 0;
        }
        return -28;
      } catch (f) {
        if (typeof n > "u" || f.name !== "ErrnoError") throw f;
        return -f.errno;
      }
    }
    function Hr(e, r, t) {
      z.varargs = t;
      try {
        var o = z.getStreamFromFD(e);
        switch (r) {
          case 21509:
            return o.tty ? 0 : -59;
          case 21505: {
            if (!o.tty) return -59;
            if (o.tty.ops.ioctl_tcgets) {
              var i = o.tty.ops.ioctl_tcgets(o), a = K();
              A[a >> 2] = i.c_iflag || 0, A[a + 4 >> 2] = i.c_oflag || 0, A[a + 8 >> 2] = i.c_cflag || 0, A[a + 12 >> 2] = i.c_lflag || 0;
              for (var s = 0; s < 32; s++) x[a + s + 17] = i.c_cc[s] || 0;
              return 0;
            }
            return 0;
          }
          case 21510:
          case 21511:
          case 21512:
            return o.tty ? 0 : -59;
          case 21506:
          case 21507:
          case 21508: {
            if (!o.tty) return -59;
            if (o.tty.ops.ioctl_tcsets) {
              for (var a = K(), f = A[a >> 2], c = A[a + 4 >> 2], v = A[a + 8 >> 2], _ = A[a + 12 >> 2], g = [], s = 0; s < 32; s++) g.push(x[a + s + 17]);
              return o.tty.ops.ioctl_tcsets(o.tty, r, { c_iflag: f, c_oflag: c, c_cflag: v, c_lflag: _, c_cc: g });
            }
            return 0;
          }
          case 21519: {
            if (!o.tty) return -59;
            var a = K();
            return A[a >> 2] = 0, 0;
          }
          case 21520:
            return o.tty ? -28 : -59;
          case 21537:
          case 21531: {
            var a = K();
            return n.ioctl(o, r, a);
          }
          case 21523: {
            if (!o.tty) return -59;
            if (o.tty.ops.ioctl_tiocgwinsz) {
              var m = o.tty.ops.ioctl_tiocgwinsz(o.tty), a = K();
              ue[a >> 1] = m[0], ue[a + 2 >> 1] = m[1];
            }
            return 0;
          }
          case 21524:
            return o.tty ? 0 : -59;
          case 21515:
            return o.tty ? 0 : -59;
          default:
            return -28;
        }
      } catch (p) {
        if (typeof n > "u" || p.name !== "ErrnoError") throw p;
        return -p.errno;
      }
    }
    function Wr(e, r, t, o) {
      z.varargs = o;
      try {
        r = z.getStr(r), r = z.calculateAt(e, r);
        var i = o ? ve() : 0;
        return n.open(r, t, i).fd;
      } catch (a) {
        if (typeof n > "u" || a.name !== "ErrnoError") throw a;
        return -a.errno;
      }
    }
    var $r = () => I(""), Gr = (e) => e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0), Vr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Xr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Yr = (e) => {
      var r = Gr(e.getFullYear()), t = r ? Vr : Xr, o = t[e.getMonth()] + e.getDate() - 1;
      return o;
    }, qr = 9007199254740992, Kr = -9007199254740992, $e = (e) => e < Kr || e > qr ? NaN : Number(e);
    function Jr(e, r) {
      e = $e(e);
      var t = new Date(e * 1e3);
      A[r >> 2] = t.getSeconds(), A[r + 4 >> 2] = t.getMinutes(), A[r + 8 >> 2] = t.getHours(), A[r + 12 >> 2] = t.getDate(), A[r + 16 >> 2] = t.getMonth(), A[r + 20 >> 2] = t.getFullYear() - 1900, A[r + 24 >> 2] = t.getDay();
      var o = Yr(t) | 0;
      A[r + 28 >> 2] = o, A[r + 36 >> 2] = -(t.getTimezoneOffset() * 60);
      var i = new Date(t.getFullYear(), 0, 1), a = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(), s = i.getTimezoneOffset(), f = (a != s && t.getTimezoneOffset() == Math.min(s, a)) | 0;
      A[r + 32 >> 2] = f;
    }
    var Q = (e, r, t) => ze(e, q, r, t), Qr = (e, r, t, o) => {
      var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1), s = new Date(i, 6, 1), f = a.getTimezoneOffset(), c = s.getTimezoneOffset(), v = Math.max(f, c);
      b[e >> 2] = v * 60, A[r >> 2] = +(f != c);
      var _ = (p) => {
        var y = p >= 0 ? "-" : "+", T = Math.abs(p), U = String(Math.floor(T / 60)).padStart(2, "0"), N = String(T % 60).padStart(2, "0");
        return `UTC${y}${U}${N}`;
      }, g = _(f), m = _(c);
      c < f ? (Q(g, t, 17), Q(m, o, 17)) : (Q(g, o, 17), Q(m, t, 17));
    }, Zr = () => Date.now(), et = () => 2147483648, rt = (e, r) => Math.ceil(e / r) * r, tt = (e) => {
      var r = me.buffer.byteLength, t = (e - r + 65535) / 65536 | 0;
      try {
        return me.grow(t), Te(), 1;
      } catch {
      }
    }, nt = (e) => {
      var r = q.length;
      e >>>= 0;
      var t = et();
      if (e > t) return false;
      for (var o = 1; o <= 4; o *= 2) {
        var i = r * (1 + 0.2 / o);
        i = Math.min(i, e + 100663296);
        var a = Math.min(t, rt(Math.max(e, i), 65536)), s = tt(a);
        if (s) return true;
      }
      return false;
    }, be = {}, ot = () => B || "./this.program", oe = () => {
      if (!oe.strings) {
        var e = (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8", r = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: e, _: ot() };
        for (var t in be) be[t] === void 0 ? delete r[t] : r[t] = be[t];
        var o = [];
        for (var t in r) o.push(`${t}=${r[t]}`);
        oe.strings = o;
      }
      return oe.strings;
    }, it = (e, r) => {
      var t = 0, o = 0;
      for (var i of oe()) {
        var a = r + t;
        b[e + o >> 2] = a, t += Q(i, a, 1 / 0) + 1, o += 4;
      }
      return 0;
    }, at = (e, r) => {
      var t = oe();
      b[e >> 2] = t.length;
      var o = 0;
      for (var i of t) o += ye(i) + 1;
      return b[r >> 2] = o, 0;
    };
    function st(e) {
      try {
        var r = z.getStreamFromFD(e);
        return n.close(r), 0;
      } catch (t) {
        if (typeof n > "u" || t.name !== "ErrnoError") throw t;
        return t.errno;
      }
    }
    var ft = (e, r, t, o) => {
      for (var i = 0, a = 0; a < t; a++) {
        var s = b[r >> 2], f = b[r + 4 >> 2];
        r += 8;
        var c = n.read(e, x, s, f, o);
        if (c < 0) return -1;
        if (i += c, c < f) break;
      }
      return i;
    };
    function lt(e, r, t, o) {
      try {
        var i = z.getStreamFromFD(e), a = ft(i, r, t);
        return b[o >> 2] = a, 0;
      } catch (s) {
        if (typeof n > "u" || s.name !== "ErrnoError") throw s;
        return s.errno;
      }
    }
    function ut(e, r, t, o) {
      r = $e(r);
      try {
        if (isNaN(r)) return 61;
        var i = z.getStreamFromFD(e);
        return n.llseek(i, r, t), j[o >> 3] = BigInt(i.position), i.getdents && r === 0 && t === 0 && (i.getdents = null), 0;
      } catch (a) {
        if (typeof n > "u" || a.name !== "ErrnoError") throw a;
        return a.errno;
      }
    }
    var ct = (e, r, t, o) => {
      for (var i = 0, a = 0; a < t; a++) {
        var s = b[r >> 2], f = b[r + 4 >> 2];
        r += 8;
        var c = n.write(e, x, s, f, o);
        if (c < 0) return -1;
        if (i += c, c < f) break;
      }
      return i;
    };
    function dt(e, r, t, o) {
      try {
        var i = z.getStreamFromFD(e), a = ct(i, r, t);
        return b[o >> 2] = a, 0;
      } catch (s) {
        if (typeof n > "u" || s.name !== "ErrnoError") throw s;
        return s.errno;
      }
    }
    var C = (e) => tr.get(e), Ge = (e) => {
      var r = l["_" + e];
      return r;
    }, ht = (e, r) => {
      x.set(e, r);
    }, Ve = (e) => Ke(e), vt = (e) => {
      var r = ye(e) + 1, t = Ve(r);
      return Q(e, t, r), t;
    }, Xe = (e, r, t, o, i) => {
      var a = { string: (y) => {
        var T = 0;
        return y != null && y !== 0 && (T = vt(y)), T;
      }, array: (y) => {
        var T = Ve(y.length);
        return ht(y, T), T;
      } };
      function s(y) {
        return r === "string" ? We(y) : r === "boolean" ? !!y : y;
      }
      var f = Ge(e), c = [], v = 0;
      if (o) for (var _ = 0; _ < o.length; _++) {
        var g = a[t[_]];
        g ? (v === 0 && (v = D()), c[_] = g(o[_])) : c[_] = o[_];
      }
      var m = f(...c);
      function p(y) {
        return v !== 0 && F(v), s(y);
      }
      return m = p(m), m;
    }, mt = (e, r, t, o) => {
      var i = !t || t.every((s) => s === "number" || s === "boolean"), a = r !== "string";
      return a && i && !o ? Ge(e) : (...s) => Xe(e, r, t, s);
    };
    if (n.createPreloadedFile = Ir, n.preloadFile = He, n.staticInit(), l.noExitRuntime && l.noExitRuntime, l.preloadPlugins && (je = l.preloadPlugins), l.print && (le = l.print), l.printErr && (V = l.printErr), l.wasmBinary && (re = l.wasmBinary), l.arguments && l.arguments, l.thisProgram && (B = l.thisProgram), l.preInit) for (typeof l.preInit == "function" && (l.preInit = [l.preInit]); l.preInit.length > 0; ) l.preInit.shift()();
    l.ccall = Xe, l.cwrap = mt;
    var S, Ye, qe, Ke, Je, Qe, Ze, er, rr, me, tr;
    function pt(e) {
      l._EffectCreate = e.T, l._EffectRelease = e.U, l._EffectCommand = e.V, l._EffectOperate = e.W, l._EffectGetProcessBuffer = e.X, l._EffectProcessBuffer = e.Y, l._EffectFadeIn = e.Z, l._EffectFadeOut = e._, l._malloc = e.$, l._free = e.aa, S = e.ba, Ye = e.ca, qe = e.da, Ke = e.ea, Je = e.fa, Qe = e.ga, Ze = e.ha, er = e.ia, rr = e.ja, me = e.R, tr = e.ka;
    }
    var wt = { l: Pr, p: Ar, a: Sr, f: Rr, B: Fr, r: Dr, x: Cr, c: Tr, w: jr, H: Hr, I: Wr, Q: $r, F: Jr, L: Qr, G: Zr, P: nt, M: it, N: at, z: st, K: lt, J: ut, y: dt, D: Ct, v: Dt, i: Nt, b: _t, e: kt, k: St, h: Rt, u: Pt, m: Lt, A: Mt, t: Ot, E: Ft, g: gt, o: Et, d: yt, O: Bt, j: bt, C: Tt, n: At, q: Ut, s: xt };
    function _t(e, r) {
      var t = D();
      try {
        return C(e)(r);
      } catch (o) {
        if (F(t), o !== o + 0) throw o;
        S(1, 0);
      }
    }
    function gt(e) {
      var r = D();
      try {
        C(e)();
      } catch (t) {
        if (F(r), t !== t + 0) throw t;
        S(1, 0);
      }
    }
    function yt(e, r, t) {
      var o = D();
      try {
        C(e)(r, t);
      } catch (i) {
        if (F(o), i !== i + 0) throw i;
        S(1, 0);
      }
    }
    function Et(e, r) {
      var t = D();
      try {
        C(e)(r);
      } catch (o) {
        if (F(t), o !== o + 0) throw o;
        S(1, 0);
      }
    }
    function kt(e, r, t) {
      var o = D();
      try {
        return C(e)(r, t);
      } catch (i) {
        if (F(o), i !== i + 0) throw i;
        S(1, 0);
      }
    }
    function bt(e, r, t, o) {
      var i = D();
      try {
        C(e)(r, t, o);
      } catch (a) {
        if (F(i), a !== a + 0) throw a;
        S(1, 0);
      }
    }
    function Pt(e, r, t, o, i, a) {
      var s = D();
      try {
        return C(e)(r, t, o, i, a);
      } catch (f) {
        if (F(s), f !== f + 0) throw f;
        S(1, 0);
      }
    }
    function At(e, r, t, o, i, a, s, f) {
      var c = D();
      try {
        C(e)(r, t, o, i, a, s, f);
      } catch (v) {
        if (F(c), v !== v + 0) throw v;
        S(1, 0);
      }
    }
    function St(e, r, t, o) {
      var i = D();
      try {
        return C(e)(r, t, o);
      } catch (a) {
        if (F(i), a !== a + 0) throw a;
        S(1, 0);
      }
    }
    function Rt(e, r, t, o, i) {
      var a = D();
      try {
        return C(e)(r, t, o, i);
      } catch (s) {
        if (F(a), s !== s + 0) throw s;
        S(1, 0);
      }
    }
    function Ft(e, r, t, o, i) {
      var a = D();
      try {
        return C(e)(r, t, o, i);
      } catch (s) {
        if (F(a), s !== s + 0) throw s;
        return S(1, 0), 0n;
      }
    }
    function Dt(e, r, t, o) {
      var i = D();
      try {
        return C(e)(r, t, o);
      } catch (a) {
        if (F(i), a !== a + 0) throw a;
        S(1, 0);
      }
    }
    function Ct(e, r, t, o) {
      var i = D();
      try {
        return C(e)(r, t, o);
      } catch (a) {
        if (F(i), a !== a + 0) throw a;
        S(1, 0);
      }
    }
    function Tt(e, r, t, o, i) {
      var a = D();
      try {
        C(e)(r, t, o, i);
      } catch (s) {
        if (F(a), s !== s + 0) throw s;
        S(1, 0);
      }
    }
    function Bt(e, r, t, o) {
      var i = D();
      try {
        C(e)(r, t, o);
      } catch (a) {
        if (F(i), a !== a + 0) throw a;
        S(1, 0);
      }
    }
    function Mt(e, r, t, o, i, a, s, f) {
      var c = D();
      try {
        return C(e)(r, t, o, i, a, s, f);
      } catch (v) {
        if (F(c), v !== v + 0) throw v;
        S(1, 0);
      }
    }
    function Nt(e) {
      var r = D();
      try {
        return C(e)();
      } catch (t) {
        if (F(r), t !== t + 0) throw t;
        S(1, 0);
      }
    }
    function Lt(e, r, t, o, i, a, s) {
      var f = D();
      try {
        return C(e)(r, t, o, i, a, s);
      } catch (c) {
        if (F(f), c !== c + 0) throw c;
        S(1, 0);
      }
    }
    function Ot(e, r, t, o, i, a, s, f, c, v, _, g) {
      var m = D();
      try {
        return C(e)(r, t, o, i, a, s, f, c, v, _, g);
      } catch (p) {
        if (F(m), p !== p + 0) throw p;
        S(1, 0);
      }
    }
    function Ut(e, r, t, o, i, a, s, f, c, v, _) {
      var g = D();
      try {
        C(e)(r, t, o, i, a, s, f, c, v, _);
      } catch (m) {
        if (F(g), m !== m + 0) throw m;
        S(1, 0);
      }
    }
    function xt(e, r, t, o, i, a, s, f, c, v, _, g, m, p, y, T) {
      var U = D();
      try {
        C(e)(r, t, o, i, a, s, f, c, v, _, g, m, p, y, T);
      } catch (N) {
        if (F(U), N !== N + 0) throw N;
        S(1, 0);
      }
    }
    function Pe() {
      if (Y > 0) {
        ne = Pe;
        return;
      }
      if (dr(), Y > 0) {
        ne = Pe;
        return;
      }
      function e() {
        l.calledRun = true, !Se && (hr(), Fe?.(l), l.onRuntimeInitialized?.(), vr());
      }
      l.setStatus ? (l.setStatus("Running..."), setTimeout(() => {
        setTimeout(() => l.setStatus(""), 1), e();
      }, 1)) : e();
    }
    var ie;
    return ie = await Er(), Pe(), Ce ? u = l : u = new Promise((e, r) => {
      Fe = e, De = r;
    }), u;
  }
  const ir = 0, ar = 1, sr = 1, fr = 0, W = { data_ptr_off: 0, frame_num_off: 4, channel_num_off: 8, samplerate_off: 12, audio_type_off: 20, max_buf_bytes_off: 24 };
  class lr {
    module = null;
    handlePtr = 0;
    bufferPtr = 0;
    dataPtr = 0;
    maxBufBytes = 0;
    frameCap = 0;
    sampleRate = 44100;
    configLoaded = false;
    get isReady() {
      return this.module !== null && this.handlePtr !== 0;
    }
    get isConfigLoaded() {
      return this.configLoaded;
    }
    async init(u) {
      this.module = await or({ wasmBinary: u });
      const l = this.module._malloc(4);
      this.module.HEAP32[l >>> 2] = 0;
      const d = this.module._EffectCreate(l);
      if (d !== 0) throw new Error(`EffectCreate failed: ${d}`);
      if (this.handlePtr = this.module.HEAP32[l >>> 2] >>> 0, this.module._free(l), !this.handlePtr) throw new Error("EffectCreate returned null handle");
    }
    loadConfig(u) {
      if (!this.module) throw new Error("WASM not initialized");
      if (this.handlePtr) {
        try {
          this.module._EffectRelease(this.handlePtr);
        } catch {
        }
        this.handlePtr = 0;
      }
      const l = this.module._malloc(4);
      this.module.HEAP32[l >>> 2] = 0;
      const d = this.module._EffectCreate(l);
      if (d !== 0) throw this.module._free(l), new Error(`EffectCreate failed: ${d}`);
      if (this.handlePtr = this.module.HEAP32[l >>> 2] >>> 0, this.module._free(l), !this.handlePtr) throw new Error("EffectCreate returned null handle");
      this.bufferPtr = 0, this.dataPtr = 0, this.maxBufBytes = 0, this.frameCap = 0;
      const h = this.mallocCString(u), E = this.module._EffectCommand(this.handlePtr, ir, h, -2);
      if (this.module._free(h), E !== 0) throw new Error(`EffectCommand(JSON_DIR) failed: ${E}`);
      this.configLoaded = true;
    }
    prepare(u, l) {
      if (!this.isReady) return;
      this.sampleRate = u, this.bufferPtr = 0, this.dataPtr = 0, this.maxBufBytes = 0, this.frameCap = 0;
      const d = `${u},128,${l}`, h = this.mallocCString(d), E = this.module._EffectCommand(this.handlePtr, ar, h, sr);
      if (this.module._free(h), E !== 0) throw new Error(`EffectCommand(PREPARE) failed: ${E}`);
    }
    process(u, l) {
      if (!this.isReady || !this.configLoaded) return false;
      const d = Math.min(u.length, l.length), h = u[0]?.length ?? 0;
      if (h === 0) return false;
      const E = h * d * 4;
      if (this.bufferPtr || (this.bufferPtr = this.module._EffectGetProcessBuffer(this.handlePtr, h, d, 0), this.bufferPtr && (this.dataPtr = this.module.HEAP32[this.bufferPtr + W.data_ptr_off >>> 2] >>> 0, this.maxBufBytes = this.module.HEAP32[this.bufferPtr + W.max_buf_bytes_off >>> 2] | 0, this.frameCap = this.module.HEAP32[this.bufferPtr + W.frame_num_off >>> 2] | 0)), !this.bufferPtr || !this.dataPtr) return false;
      (this.frameCap < h || this.maxBufBytes > 0 && E > this.maxBufBytes) && (this.bufferPtr = this.module._EffectGetProcessBuffer(this.handlePtr, h, d, 0), this.bufferPtr && (this.dataPtr = this.module.HEAP32[this.bufferPtr + W.data_ptr_off >>> 2] >>> 0, this.maxBufBytes = this.module.HEAP32[this.bufferPtr + W.max_buf_bytes_off >>> 2] | 0, this.frameCap = this.module.HEAP32[this.bufferPtr + W.frame_num_off >>> 2] | 0)), this.module.HEAP32[this.bufferPtr + W.audio_type_off >>> 2] = fr, this.module.HEAP32[this.bufferPtr + W.channel_num_off >>> 2] = d, this.module.HEAP32[this.bufferPtr + W.samplerate_off >>> 2] = this.sampleRate, this.module.HEAP32[this.bufferPtr + W.frame_num_off >>> 2] = h;
      const k = this.dataPtr >>> 2;
      for (let R = 0; R < h; R++) for (let M = 0; M < d; M++) this.module.HEAPF32[k + R * d + M] = u[M]?.[R] ?? 0;
      if (this.module._EffectProcessBuffer(this.handlePtr, this.bufferPtr) === 0) {
        for (let R = 0; R < h; R++) for (let M = 0; M < d; M++) l[M] && (l[M][R] = this.module.HEAPF32[k + R * d + M]);
        return true;
      }
      return false;
    }
    release() {
      if (this.handlePtr && this.module) {
        try {
          this.module._EffectRelease(this.handlePtr);
        } catch {
        }
        this.handlePtr = 0;
      }
      this.configLoaded = false;
    }
    mallocCString(u) {
      const d = new TextEncoder().encode(u), h = this.module._malloc(d.length + 1);
      return this.module.HEAPU8.set(d, h), this.module.HEAPU8[h + d.length] = 0, h;
    }
  }
  class ur extends AudioWorkletProcessor {
    sdk = new lr();
    effectEnabled = true;
    constructor() {
      super(), this.port.onmessage = this.handleMessage.bind(this);
    }
    async handleMessage(u) {
      const l = u.data;
      switch (l.type) {
        case "init":
          await this.sdk.init(l.data.wasmBinary), this.postResponse({ type: "ready" });
          break;
        case "loadConfig":
          this.sdk.loadConfig(l.data.configJson), this.postResponse({ type: "configLoaded" });
          break;
        case "setEnabled":
          this.effectEnabled = l.data.enabled;
          break;
        case "prepare":
          this.sdk.prepare(l.data.sampleRate, l.data.channels), this.postResponse({ type: "prepared" });
          break;
        case "release":
          this.sdk.release();
          break;
      }
    }
    postResponse(u) {
      this.port.postMessage(u);
    }
    process(u, l) {
      const d = u[0], h = l[0];
      if (!d?.length || !h?.length) return true;
      if (!this.effectEnabled || !this.sdk.isReady || !this.sdk.isConfigLoaded) {
        for (let k = 0; k < Math.min(d.length, h.length); k++) d[k] && h[k] && h[k].set(d[k]);
        return true;
      }
      if (!this.sdk.process(d, h)) for (let k = 0; k < Math.min(d.length, h.length); k++) d[k] && h[k] && h[k].set(d[k]);
      return true;
    }
  }
  registerProcessor("audio-effect-processor", ur);
  var cr = Object.freeze({ __proto__: null });
})();
