// packages/renderers/main/src/libs/secSdkCore.ts
// @ts-nocheck
import { R as o, l as S } from "../services/renderer";
import "../main";
import "../services/base";
var g = function() {
  return g = Object.assign || function(t) {
    for (var u, a = 1, c = arguments.length; a < c; a++) {
      u = arguments[a];
      for (var l in u) Object.prototype.hasOwnProperty.call(u, l) && (t[l] = u[l]);
    }
    return t;
  }, g.apply(this, arguments);
}, D = o.forwardRef(function(t, u) {
  var a = t.data, c = t.className, l = t.loop, w = t.autoplay, h = w === void 0 ? true : w, d = t.onLoopComplete, f = t.onComplete, v = t.onInit, p = t.hidden, C = t.rendererSettings, I = t.assetsPath, R = t.style, b = t.lottieCdn, E = t.stop, y = E === void 0 ? false : E, s = o.useRef(), n = o.useRef(), L = o.useState(false), i = L[0], O = L[1];
  return o.useEffect(function() {
    var e, r;
    y && n.current ? (e = n.current) === null || e === void 0 || e.stop() : n.current && i && ((r = n.current) === null || r === void 0 || r.play());
  }, [y]), o.useEffect(function() {
    if (n.current && i && f) {
      var e = n.current;
      return e?.addEventListener("complete", f), function() {
        e?.removeEventListener("complete", f);
      };
    }
  }, [i, f]), o.useEffect(function() {
    if (n.current && i && d) {
      var e = n.current;
      return e.addEventListener("loopComplete", d), function() {
        e.removeEventListener("loopComplete", d);
      };
    }
  }, [i, d]), o.useEffect(function() {
    if (n.current && i && v) {
      var e = n.current;
      return e?.addEventListener("DOMLoaded", v), function() {
        e?.removeEventListener("DOMLoaded", v);
      };
    }
  }, [i, v]), o.useLayoutEffect(function() {
    Promise.all([S(b), a]).then(function(e) {
      var r, m, P = e[1];
      s.current && window?.lottie && !n.current && (n.current = (m = (r = window?.lottie) === null || r === void 0 ? void 0 : r.loadAnimation) === null || m === void 0 ? void 0 : m.call(r, { container: s.current, renderer: "svg", animationData: P, loop: l, autoplay: h, rendererSettings: g({ runExpressions: false }, C), assetsPath: I }), console.log("init", n.current), O(true));
    }).catch(function(e) {
      console.log("err", e);
    });
  }, []), o.useEffect(function() {
    return function() {
      var e, r;
      (r = (e = n.current) === null || e === void 0 ? void 0 : e.destroy) === null || r === void 0 || r.call(e);
    };
  }, []), o.useImperativeHandle(u, function() {
    return { getLottieInstance: function() {
      return n.current;
    } };
  }), o.createElement("div", { hidden: p, ref: s, className: c, style: R });
});
const A = o.memo(D);
export { A as default };
