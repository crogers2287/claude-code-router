"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = Symbol.for("react.element");
      var n = Symbol.for("react.portal");
      var p = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r = Symbol.for("react.profiler");
      var t = Symbol.for("react.provider");
      var u = Symbol.for("react.context");
      var v = Symbol.for("react.forward_ref");
      var w = Symbol.for("react.suspense");
      var x = Symbol.for("react.memo");
      var y = Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a) return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g) c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
          c.children = f;
        }
        if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
        if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
        else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a) return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status) return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = X;
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k(a) {
        if (0 === a.length) return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
            var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
            if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
            else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
            else break a;
          }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      var r = [];
      var t = [];
      var u = 1;
      var v = null;
      var y = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a) {
        for (var b = h(t); null !== b; ) {
          if (null === b.callback) k(t);
          else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
          else break;
          b = h(t);
        }
      }
      function H(a) {
        B = false;
        G(a);
        if (!A) if (null !== h(r)) A = true, I(J);
        else {
          var b = h(t);
          null !== b && K(H, b.startTime - a);
        }
      }
      function J(a, b) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c = y;
        try {
          G(b);
          for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r) && k(r);
              G(b);
            } else k(r);
            v = h(r);
          }
          if (null !== v) var w = true;
          else {
            var m = h(t);
            null !== m && K(H, m.startTime - b);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c, z = false;
        }
      }
      var N = false;
      var O = null;
      var L = -1;
      var P = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a = exports.unstable_now();
          Q = a;
          var b = true;
          try {
            b = O(true, a);
          } finally {
            b ? S() : (N = false, O = null);
          }
        } else N = false;
      }
      var S;
      if ("function" === typeof F) S = function() {
        F(R);
      };
      else if ("undefined" !== typeof MessageChannel) {
        T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else S = function() {
        D(R, 0);
      };
      var T;
      var U;
      function I(a) {
        O = a;
        N || (N = true, S());
      }
      function K(a, b) {
        L = D(function() {
          a(exports.unstable_now());
        }, b);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h(r);
      };
      exports.unstable_next = function(a) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y;
        }
        var c = y;
        y = b;
        try {
          return a();
        } finally {
          y = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y;
        y = a;
        try {
          return b();
        } finally {
          y = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
        return a;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a) {
        var b = y;
        return function() {
          var c = y;
          y = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y = c;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ca = require_scheduler();
      function p(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a, b) {
        ha(a, b);
        ha(a + "Capture", b);
      }
      function ha(a, b) {
        ea[a] = b;
        for (a = 0; a < b.length; a++) da.add(b[a]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a) {
        if (ja.call(ma, a)) return true;
        if (ja.call(la, a)) return false;
        if (ka.test(a)) return ma[a] = true;
        la[a] = true;
        return false;
      }
      function pa(a, b, c, d) {
        if (null !== c && 0 === c.type) return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d) return false;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function qa(a, b, c, d) {
        if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
        if (d) return false;
        if (null !== c) switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
        return false;
      }
      function v(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        z[a] = new v(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        z[b] = new v(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        z[a] = new v(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        z[a] = new v(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        z[a] = new v(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        z[a] = new v(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          ra,
          sa
        );
        z[b] = new v(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function ta(a, b, c, d) {
        var e = z.hasOwnProperty(b) ? z[b] : null;
        if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = Symbol.for("react.element");
      var wa = Symbol.for("react.portal");
      var ya = Symbol.for("react.fragment");
      var za = Symbol.for("react.strict_mode");
      var Aa = Symbol.for("react.profiler");
      var Ba = Symbol.for("react.provider");
      var Ca = Symbol.for("react.context");
      var Da = Symbol.for("react.forward_ref");
      var Ea = Symbol.for("react.suspense");
      var Fa = Symbol.for("react.suspense_list");
      var Ga = Symbol.for("react.memo");
      var Ha = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      Symbol.for("react.debug_trace_mode");
      var Ia = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.cache");
      Symbol.for("react.tracing_marker");
      var Ja = Symbol.iterator;
      function Ka(a) {
        if (null === a || "object" !== typeof a) return null;
        a = Ja && a[Ja] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var A = Object.assign;
      var La;
      function Ma(a) {
        if (void 0 === La) try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          La = b && b[1] || "";
        }
        return "\n" + La + a;
      }
      var Na = false;
      function Oa(a, b) {
        if (!a || Na) return "";
        Na = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b) if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (l) {
              var d = l;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (l) {
              d = l;
            }
            a.call(b.prototype);
          }
          else {
            try {
              throw Error();
            } catch (l) {
              d = l;
            }
            a();
          }
        } catch (l) {
          if (l && d && "string" === typeof l.stack) {
            for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
            for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) {
                    var k = "\n" + e[g].replace(" at new ", " at ");
                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                    return k;
                  }
                while (1 <= g && 0 <= h);
              }
              break;
            }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
      }
      function Pa(a) {
        switch (a.tag) {
          case 5:
            return Ma(a.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Oa(a.type, false), a;
          case 11:
            return a = Oa(a.type.render, false), a;
          case 1:
            return a = Oa(a.type, true), a;
          default:
            return "";
        }
      }
      function Qa(a) {
        if (null == a) return null;
        if ("function" === typeof a) return a.displayName || a.name || null;
        if ("string" === typeof a) return a;
        switch (a) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a) switch (a.$$typeof) {
          case Ca:
            return (a.displayName || "Context") + ".Consumer";
          case Ba:
            return (a._context.displayName || "Context") + ".Provider";
          case Da:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case Ga:
            return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
          case Ha:
            b = a._payload;
            a = a._init;
            try {
              return Qa(a(b));
            } catch (c) {
            }
        }
        return null;
      }
      function Ra(a) {
        var b = a.type;
        switch (a.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b.displayName || "Context") + ".Consumer";
          case 10:
            return (b._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b);
          case 8:
            return b === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b) return b.displayName || b.name || null;
            if ("string" === typeof b) return b;
        }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a;
          case "object":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a) return false;
        var b = a._valueTracker;
        if (!b) return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a) return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function ab(a, b) {
        b = b.checked;
        null != b && ta(a, "checked", b, false);
      }
      function bb(a, b) {
        ab(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c) if ("number" === d) {
          if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
        } else a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function db(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function cb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      var eb = Array.isArray;
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
        return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b) throw Error(p(92));
            if (eb(c)) {
              if (1 < c.length) throw Error(p(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      function kb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var mb;
      var nb = function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      }(function(a, b) {
        if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
          for (; b.firstChild; ) a.appendChild(b.firstChild);
        }
      });
      function ob(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a) {
        qb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          pb[b] = pb[a];
        });
      });
      function rb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
      }
      function sb(a, b) {
        a = a.style;
        for (var c in b) if (b.hasOwnProperty(c)) {
          var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
          "float" === c && (c = "cssFloat");
          d ? a.setProperty(c, e) : a[c] = e;
        }
      }
      var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a, b) {
        if (b) {
          if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children) throw Error(p(60));
            if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
          }
          if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
        }
      }
      function vb(a, b) {
        if (-1 === a.indexOf("-")) return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb) throw Error(p(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a, b, c) {
        if (Ib) return a(b, c);
        Ib = true;
        try {
          return Gb(a, b, c);
        } finally {
          if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
        }
      }
      function Kb(a, b) {
        var c = a.stateNode;
        if (null === c) return null;
        var d = Db(c);
        if (null === d) return null;
        c = d[b];
        a: switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
          default:
            a = false;
        }
        if (a) return null;
        if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
        return c;
      }
      var Lb = false;
      if (ia) try {
        Mb = {};
        Object.defineProperty(Mb, "passive", { get: function() {
          Lb = true;
        } });
        window.addEventListener("test", Mb, Mb);
        window.removeEventListener("test", Mb, Mb);
      } catch (a) {
        Lb = false;
      }
      var Mb;
      function Nb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (m) {
          this.onError(m);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a) {
        Ob = true;
        Pb = a;
      } };
      function Tb(a, b, c, d, e, f, g, h, k) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a, b, c, d, e, f, g, h, k) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l = Pb;
            Ob = false;
            Pb = null;
          } else throw Error(p(198));
          Qb || (Qb = true, Rb = l);
        }
      }
      function Vb(a) {
        var b = a, c = a;
        if (a.alternate) for (; b.return; ) b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function Wb(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b) return b.dehydrated;
        }
        return null;
      }
      function Xb(a) {
        if (Vb(a) !== a) throw Error(p(188));
      }
      function Yb(a) {
        var b = a.alternate;
        if (!b) {
          b = Vb(a);
          if (null === b) throw Error(p(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e) break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c) return Xb(e), a;
              if (f === d) return Xb(e), b;
              f = f.sibling;
            }
            throw Error(p(188));
          }
          if (c.return !== d.return) c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g) throw Error(p(189));
            }
          }
          if (c.alternate !== d) throw Error(p(190));
        }
        if (3 !== c.tag) throw Error(p(188));
        return c.stateNode.current === c ? a : b;
      }
      function Zb(a) {
        a = Yb(a);
        return null !== a ? $b(a) : null;
      }
      function $b(a) {
        if (5 === a.tag || 6 === a.tag) return a;
        for (a = a.child; null !== a; ) {
          var b = $b(a);
          if (null !== b) return b;
          a = a.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a) {
        if (lc && "function" === typeof lc.onCommitFiberRoot) try {
          lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
        } catch (b) {
        }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a) {
        a >>>= 0;
        return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a) {
        switch (a & -a) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a;
        }
      }
      function uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c) return 0;
        var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
        if (0 !== g) {
          var h = g & ~e;
          0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
        } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
        if (0 === d) return 0;
        if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
        0 !== (d & 4) && (d |= c & 16);
        b = a.entangledLanes;
        if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function vc(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 4:
            return b + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a, b) {
        for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
          var g = 31 - oc(f), h = 1 << g, k = e[g];
          if (-1 === k) {
            if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
          } else k <= b && (a.expiredLanes |= h);
          f &= ~h;
        }
      }
      function xc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a;
      }
      function zc(a) {
        for (var b = [], c = 0; 31 > c; c++) b.push(a);
        return b;
      }
      function Ac(a, b, c) {
        a.pendingLanes |= b;
        536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
        a = a.eventTimes;
        b = 31 - oc(b);
        a[b] = c;
      }
      function Bc(a, b) {
        var c = a.pendingLanes & ~b;
        a.pendingLanes = b;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= b;
        a.mutableReadLanes &= b;
        a.entangledLanes &= b;
        b = a.entanglements;
        var d = a.eventTimes;
        for (a = a.expirationTimes; 0 < c; ) {
          var e = 31 - oc(c), f = 1 << e;
          b[e] = 0;
          d[e] = -1;
          a[e] = -1;
          c &= ~f;
        }
      }
      function Cc(a, b) {
        var c = a.entangledLanes |= b;
        for (a = a.entanglements; c; ) {
          var d = 31 - oc(c), e = 1 << d;
          e & b | a[d] & b && (a[d] |= b);
          c &= ~e;
        }
      }
      var C = 0;
      function Dc(a) {
        a &= -a;
        return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b.pointerId);
        }
      }
      function Tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function Uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return Lc = Tc(Lc, a, b, c, d, e), true;
          case "dragenter":
            return Mc = Tc(Mc, a, b, c, d, e), true;
          case "mouseover":
            return Nc = Tc(Nc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function Vc(a) {
        var b = Wc(a.target);
        if (null !== b) {
          var c = Vb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = Wb(c), null !== b) {
                a.blockedOn = b;
                Ic(a.priority, function() {
                  Gc(c);
                });
                return;
              }
            } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function Xc(a) {
        if (null !== a.blockedOn) return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null === c) {
            c = a.nativeEvent;
            var d = new c.constructor(c.type, c);
            wb = d;
            c.target.dispatchEvent(d);
            wb = null;
          } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function Zc(a, b, c) {
        Xc(a) && c.delete(b);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a, b) {
        a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a) {
        function b(b2) {
          return ad(b2, a);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a);
          for (var c = 1; c < Kc.length; c++) {
            var d = Kc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a);
        null !== Mc && ad(Mc, a);
        null !== Nc && ad(Nc, a);
        Oc.forEach(b);
        Pc.forEach(b);
        for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 1, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function gd(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 4, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function fd(a, b, c, d) {
        if (dd) {
          var e = Yc(a, b, c, d);
          if (null === e) hd(a, b, d, id, c), Sc(a, d);
          else if (Uc(e, a, b, c, d)) d.stopPropagation();
          else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
            for (; null !== e; ) {
              var f = Cb(e);
              null !== f && Ec(f);
              f = Yc(a, b, c, d);
              null === f && hd(a, b, d, id, c);
              if (f === e) break;
              e = f;
            }
            null !== e && d.stopPropagation();
          } else hd(a, b, d, null, c);
        }
      }
      var id = null;
      function Yc(a, b, c, d) {
        id = null;
        a = xb(d);
        a = Wc(a);
        if (null !== a) if (b = Vb(a), null === b) a = null;
        else if (c = b.tag, 13 === c) {
          a = Wb(b);
          if (null !== a) return a;
          a = null;
        } else if (3 === c) {
          if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
          a = null;
        } else b !== a && (a = null);
        id = a;
        return null;
      }
      function jd(a) {
        switch (a) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md) return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++) ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a) return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b) return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which) return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length) return b.char;
              if (b.which) return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b)) return a;
      }
      function ve(a, b) {
        if ("change" === a) return b;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          Jb(re, b);
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a) return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a) return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a, b) {
        if (He(a, b)) return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length) return false;
        for (d = 0; d < c.length; d++) {
          var e = c[d];
          if (!ja.call(b, e) || !He(a[e], b[e])) return false;
        }
        return true;
      }
      function Je(a) {
        for (; a && a.firstChild; ) a = a.firstChild;
        return a;
      }
      function Ke(a, b) {
        var c = Je(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b) return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Je(c);
        }
      }
      function Le(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Me() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c) a = b.contentWindow;
          else break;
          b = Xa(a.document);
        }
        return b;
      }
      function Ne(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      function Oe(a) {
        var b = Me(), c = a.focusedElem, d = a.selectionRange;
        if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
          if (null !== d && Ne(c)) {
            if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
            else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
              a = a.getSelection();
              var e = c.textContent.length, f = Math.min(d.start, e);
              d = void 0 === d.end ? f : Math.min(d.end, e);
              !a.extend && f > d && (e = d, d = f, f = e);
              e = Ke(c, f);
              var g = Ke(
                c,
                d
              );
              e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
            }
          }
          b = [];
          for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
          "function" === typeof c.focus && c.focus();
          for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      function Ve(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a) {
        if (Xe[a]) return Xe[a];
        if (!We[a]) return a;
        var b = We[a], c;
        for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
        return a;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a, b) {
        df.set(a, b);
        fa(b, [a]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Ub(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b) for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
            else for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
          }
        }
        if (Qb) throw a = Rb, Qb = false, Rb = null, a;
      }
      function D(a, b) {
        var c = b[of];
        void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
        var d = a + "__bubble";
        c.has(d) || (pf(b, a, 2, false), c.add(d));
      }
      function qf(a, b, c) {
        var d = 0;
        b && (d |= 4);
        pf(c, a, d, b);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a) {
        if (!a[rf]) {
          a[rf] = true;
          da.forEach(function(b2) {
            "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
          });
          var b = 9 === a.nodeType ? a : a.ownerDocument;
          null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
        }
      }
      function pf(a, b, c, d) {
        switch (jd(b)) {
          case 1:
            var e = ed;
            break;
          case 4:
            e = gd;
            break;
          default:
            e = fd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function hd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
          if (null === d) return;
          var g = d.tag;
          if (3 === g || 4 === g) {
            var h = d.stateNode.containerInfo;
            if (h === e || 8 === h.nodeType && h.parentNode === e) break;
            if (4 === g) for (g = d.return; null !== g; ) {
              var k = g.tag;
              if (3 === k || 4 === k) {
                if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
              }
              g = g.return;
            }
            for (; null !== h; ) {
              g = Wc(h);
              if (null === g) return;
              k = g.tag;
              if (5 === k || 6 === k) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
        Jb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = df.get(a);
            if (void 0 !== h2) {
              var k2 = td, n = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c)) break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  n = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  n = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k2 = Hd;
                  break;
                case cf:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
              t = [];
              for (var w = d2, u; null !== w; ) {
                u = w;
                var F = u.stateNode;
                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                if (J) break;
                w = w.return;
              }
              0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
                } else k2 = null, n = d2;
                if (k2 !== n) {
                  t = Bd;
                  F = "onMouseLeave";
                  x = "onMouseEnter";
                  w = "mouse";
                  if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                  J = null == k2 ? h2 : ue(k2);
                  u = null == n ? h2 : ue(n);
                  h2 = new t(F, w + "leave", k2, c, e2);
                  h2.target = J;
                  h2.relatedTarget = u;
                  F = null;
                  Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                  J = F;
                  if (k2 && n) b: {
                    t = k2;
                    x = n;
                    w = 0;
                    for (u = t; u; u = vf(u)) w++;
                    u = 0;
                    for (F = x; F; F = vf(F)) u++;
                    for (; 0 < w - u; ) t = vf(t), w--;
                    for (; 0 < u - w; ) x = vf(x), u--;
                    for (; w--; ) {
                      if (t === x || null !== x && t === x.alternate) break b;
                      t = vf(t);
                      x = vf(x);
                    }
                    t = null;
                  }
                  else t = null;
                  null !== k2 && wf(g2, h2, k2, t, false);
                  null !== n && null !== J && wf(g2, J, n, t, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
              else if (me(h2)) if (we) na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
              else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
              if (na && (na = na(a, d2))) {
                ne(g2, na, c, e2);
                break a;
              }
              xa && xa(a, h2, d2);
              "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
            }
            xa = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe) break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var $a;
            if (ae) b: {
              switch (a) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
            else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
          }
          se(g2, b);
        });
      }
      function tf(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function vf(a) {
        if (null === a) return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function wf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d) break;
          5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a) {
        return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
      }
      function Af(a, b, c) {
        b = zf(b);
        if (zf(a) !== b && c) throw Error(p(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a, b) {
        return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
        return Hf.resolve(null).then(a).catch(If);
      } : Ff;
      function If(a) {
        setTimeout(function() {
          throw a;
        });
      }
      function Kf(a, b) {
        var c = b, d = 0;
        do {
          var e = c.nextSibling;
          a.removeChild(c);
          if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
            if (0 === d) {
              a.removeChild(e);
              bd(b);
              return;
            }
            d--;
          } else "$" !== c && "$?" !== c && "$!" !== c || d++;
          c = e;
        } while (c);
        bd(b);
      }
      function Lf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b) break;
          if (8 === b) {
            b = a.data;
            if ("$" === b || "$!" === b || "$?" === b) break;
            if ("/$" === b) return null;
          }
        }
        return a;
      }
      function Mf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b) return a;
              b--;
            } else "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a) {
        var b = a[Of];
        if (b) return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[uf] || c[Of]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
              if (c = a[Of]) return c;
              a = Mf(a);
            }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[Of] || a[uf];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag) return a.stateNode;
        throw Error(p(33));
      }
      function Db(a) {
        return a[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a) {
        return { current: a };
      }
      function E(a) {
        0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a, b) {
        Tf++;
        Sf[Tf] = a.current;
        a.current = b;
      }
      var Vf = {};
      var H = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a, b) {
        var c = a.type.contextTypes;
        if (!c) return Vf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c) e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Zf(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function $f() {
        E(Wf);
        E(H);
      }
      function ag(a, b, c) {
        if (H.current !== Vf) throw Error(p(168));
        G(H, b);
        G(Wf, c);
      }
      function bg(a, b, c) {
        var d = a.stateNode;
        b = b.childContextTypes;
        if ("function" !== typeof d.getChildContext) return c;
        d = d.getChildContext();
        for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
        return A({}, c, d);
      }
      function cg(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H.current;
        G(H, a);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a, b, c) {
        var d = a.stateNode;
        if (!d) throw Error(p(169));
        c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
        G(Wf, c);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a) {
        null === eg ? eg = [a] : eg.push(a);
      }
      function ig(a) {
        fg = true;
        hg(a);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a = 0, b = C;
          try {
            var c = eg;
            for (C = 1; a < c.length; a++) {
              var d = c[a];
              do
                d = d(true);
              while (null !== d);
            }
            eg = null;
            fg = false;
          } catch (e) {
            throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
          } finally {
            C = b, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a, b) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a;
        ng = b;
      }
      function ug(a, b, c) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a;
        var d = rg;
        a = sg;
        var e = 32 - oc(d) - 1;
        d &= ~(1 << e);
        c += 1;
        var f = 32 - oc(b) + e;
        if (30 < f) {
          var g = e - e % 5;
          f = (d & (1 << g) - 1).toString(32);
          d >>= g;
          e -= g;
          rg = 1 << 32 - oc(b) + e | c << e | d;
          sg = f + a;
        } else rg = 1 << f | c << e | d, sg = a;
      }
      function vg(a) {
        null !== a.return && (tg(a, 1), ug(a, 1, 0));
      }
      function wg(a) {
        for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I = false;
      var zg = null;
      function Ag(a, b) {
        var c = Bg(5, null, null, 0);
        c.elementType = "DELETED";
        c.stateNode = b;
        c.return = a;
        b = a.deletions;
        null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
      }
      function Cg(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
          case 13:
            return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a) {
        return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
      }
      function Eg(a) {
        if (I) {
          var b = yg;
          if (b) {
            var c = b;
            if (!Cg(a, b)) {
              if (Dg(a)) throw Error(p(418));
              b = Lf(c.nextSibling);
              var d = xg;
              b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
            }
          } else {
            if (Dg(a)) throw Error(p(418));
            a.flags = a.flags & -4097 | 2;
            I = false;
            xg = a;
          }
        }
      }
      function Fg(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
        xg = a;
      }
      function Gg(a) {
        if (a !== xg) return false;
        if (!I) return Fg(a), I = true, false;
        var b;
        (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
        if (b && (b = yg)) {
          if (Dg(a)) throw Hg(), Error(p(418));
          for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
        }
        Fg(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a) throw Error(p(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    yg = Lf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            yg = null;
          }
        } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a = yg; a; ) a = Lf(a.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I = false;
      }
      function Jg(a) {
        null === zg ? zg = [a] : zg.push(a);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag) throw Error(p(309));
              var d = c.stateNode;
            }
            if (!d) throw Error(p(147, a));
            var e = d, f = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
            b = function(a2) {
              var b2 = e.refs;
              null === a2 ? delete b2[f] : b2[f] = a2;
            };
            b._stringRef = f;
            return b;
          }
          if ("string" !== typeof a) throw Error(p(284));
          if (!c._owner) throw Error(p(290, a));
        }
        return a;
      }
      function Mg(a, b) {
        a = Object.prototype.toString.call(b);
        throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
      }
      function Ng(a) {
        var b = a._init;
        return b(a._payload);
      }
      function Og(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.deletions;
            null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
          }
        }
        function c(c2, d2) {
          if (!a) return null;
          for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Pg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a) return b2.flags |= 1048576, c2;
          d2 = b2.alternate;
          if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
          b2.flags |= 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags |= 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          var f2 = c2.type;
          if (f2 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
          if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
          d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Lg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function m(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function q(a2, b2, c2) {
          if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case va:
                return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
              case wa:
                return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
              case Ha:
                var d2 = b2._init;
                return q(a2, d2(b2._payload), c2);
            }
            if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
            Mg(a2, b2);
          }
          return null;
        }
        function r(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case va:
                return c2.key === e2 ? k(a2, b2, c2, d2) : null;
              case wa:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
              case Ha:
                return e2 = c2._init, r(
                  a2,
                  b2,
                  e2(c2._payload),
                  d2
                );
            }
            if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
            Mg(a2, c2);
          }
          return null;
        }
        function y(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case va:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
              case wa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
              case Ha:
                var f2 = d2._init;
                return y(a2, b2, c2, f2(d2._payload), e2);
            }
            if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
            Mg(b2, d2);
          }
          return null;
        }
        function n(e2, g2, h2, k2) {
          for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
            u.index > w ? (x = u, u = null) : x = u.sibling;
            var n2 = r(e2, u, h2[w], k2);
            if (null === n2) {
              null === u && (u = x);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, w);
            null === m2 ? l2 = n2 : m2.sibling = n2;
            m2 = n2;
            u = x;
          }
          if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
          if (null === u) {
            for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
            I && tg(e2, w);
            return l2;
          }
          for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function t(e2, g2, h2, k2) {
          var l2 = Ka(h2);
          if ("function" !== typeof l2) throw Error(p(150));
          h2 = l2.call(h2);
          if (null == h2) throw Error(p(151));
          for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
            m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
            var t2 = r(e2, m2, n2.value, k2);
            if (null === t2) {
              null === m2 && (m2 = x);
              break;
            }
            a && m2 && null === t2.alternate && b(e2, m2);
            g2 = f(t2, g2, w);
            null === u ? l2 = t2 : u.sibling = t2;
            u = t2;
            m2 = x;
          }
          if (n2.done) return c(
            e2,
            m2
          ), I && tg(e2, w), l2;
          if (null === m2) {
            for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
            I && tg(e2, w);
            return l2;
          }
          for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          a && m2.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function J(a2, d2, f2, h2) {
          "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
          if ("object" === typeof f2 && null !== f2) {
            switch (f2.$$typeof) {
              case va:
                a: {
                  for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                    if (l2.key === k2) {
                      k2 = f2.type;
                      if (k2 === ya) {
                        if (7 === l2.tag) {
                          c(a2, l2.sibling);
                          d2 = e(l2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                      } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props);
                        d2.ref = Lg(a2, l2, f2);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                      c(a2, l2);
                      break;
                    } else b(a2, l2);
                    l2 = l2.sibling;
                  }
                  f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case wa:
                a: {
                  for (l2 = f2.key; null !== d2; ) {
                    if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                    else b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Sg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
              case Ha:
                return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
            }
            if (eb(f2)) return n(a2, d2, f2, h2);
            if (Ka(f2)) return t(a2, d2, f2, h2);
            Mg(a2, f2);
          }
          return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a) {
        var b = Wg.current;
        E(Wg);
        a._currentValue = b;
      }
      function bh(a, b, c) {
        for (; null !== a; ) {
          var d = a.alternate;
          (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
          if (a === c) break;
          a = a.return;
        }
      }
      function ch(a, b) {
        Xg = a;
        Zg = Yg = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
      }
      function eh(a) {
        var b = a._currentValue;
        if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
          if (null === Xg) throw Error(p(308));
          Yg = a;
          Xg.dependencies = { lanes: 0, firstContext: a };
        } else Yg = Yg.next = a;
        return b;
      }
      var fh = null;
      function gh(a) {
        null === fh ? fh = [a] : fh.push(a);
      }
      function hh(a, b, c, d) {
        var e = b.interleaved;
        null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
        b.interleaved = c;
        return ih(a, d);
      }
      function ih(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      var jh = false;
      function kh(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function mh(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a, b, c) {
        var d = a.updateQueue;
        if (null === d) return null;
        d = d.shared;
        if (0 !== (K & 2)) {
          var e = d.pending;
          null === e ? b.next = b : (b.next = e.next, e.next = b);
          d.pending = b;
          return ih(a, c);
        }
        e = d.interleaved;
        null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
        d.interleaved = b;
        return ih(a, c);
      }
      function oh(a, b, c) {
        b = b.updateQueue;
        if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      function ph(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function qh(a, b, c, d) {
        var e = a.updateQueue;
        jh = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var m = a.alternate;
          null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
        }
        if (null !== f) {
          var q = e.baseState;
          g = 0;
          m = l = k = null;
          h = f;
          do {
            var r = h.lane, y = h.eventTime;
            if ((d & r) === r) {
              null !== m && (m = m.next = {
                eventTime: y,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null
              });
              a: {
                var n = a, t = h;
                r = b;
                y = c;
                switch (t.tag) {
                  case 1:
                    n = t.payload;
                    if ("function" === typeof n) {
                      q = n.call(y, q, r);
                      break a;
                    }
                    q = n;
                    break a;
                  case 3:
                    n.flags = n.flags & -65537 | 128;
                  case 0:
                    n = t.payload;
                    r = "function" === typeof n ? n.call(y, q, r) : n;
                    if (null === r || void 0 === r) break a;
                    q = A({}, q, r);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
            } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
            h = h.next;
            if (null === h) if (h = e.shared.pending, null === h) break;
            else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
          } while (1);
          null === m && (k = q);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = m;
          b = e.shared.interleaved;
          if (null !== b) {
            e = b;
            do
              g |= e.lane, e = e.next;
            while (e !== b);
          } else null === f && (e.shared.lanes = 0);
          rh |= g;
          a.lanes = g;
          a.memoizedState = q;
        }
      }
      function sh(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a) for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e) throw Error(p(191, e));
            e.call(d);
          }
        }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a) {
        if (a === th) throw Error(p(174));
        return a;
      }
      function yh(a, b) {
        G(wh, b);
        G(vh, a);
        G(uh, th);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
        }
        E(uh);
        G(uh, b);
      }
      function zh() {
        E(uh);
        E(vh);
        E(wh);
      }
      function Ah(a) {
        xh(wh.current);
        var b = xh(uh.current);
        var c = lb(b, a.type);
        b !== c && (G(vh, a), G(uh, c));
      }
      function Bh(a) {
        vh.current === a && (E(uh), E(vh));
      }
      var L = Uf(0);
      function Ch(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 128)) return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M = null;
      var N = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P() {
        throw Error(p(321));
      }
      function Mh(a, b) {
        if (null === b) return false;
        for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
        return true;
      }
      function Nh(a, b, c, d, e, f) {
        Hh = f;
        M = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
        a = c(d, e);
        if (Jh) {
          f = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f) throw Error(p(301));
            f += 1;
            O = N = null;
            b.updateQueue = null;
            Fh.current = Qh;
            a = c(d, e);
          } while (Jh);
        }
        Fh.current = Rh;
        b = null !== N && null !== N.next;
        Hh = 0;
        O = N = M = null;
        Ih = false;
        if (b) throw Error(p(300));
        return a;
      }
      function Sh() {
        var a = 0 !== Kh;
        Kh = 0;
        return a;
      }
      function Th() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
        return O;
      }
      function Uh() {
        if (null === N) {
          var a = M.alternate;
          a = null !== a ? a.memoizedState : null;
        } else a = N.next;
        var b = null === O ? M.memoizedState : O.next;
        if (null !== b) O = b, N = a;
        else {
          if (null === a) throw Error(p(310));
          N = a;
          a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          null === O ? M.memoizedState = O = a : O = O.next = a;
        }
        return O;
      }
      function Vh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Wh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = N, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          f = e.next;
          d = d.baseState;
          var h = g = null, k = null, l = f;
          do {
            var m = l.lane;
            if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
            else {
              var q = {
                lane: m,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
              };
              null === k ? (h = k = q, g = d) : k = k.next = q;
              M.lanes |= m;
              rh |= m;
            }
            l = l.next;
          } while (null !== l && l !== f);
          null === k ? g = d : k.next = h;
          He(d, b.memoizedState) || (dh = true);
          b.memoizedState = d;
          b.baseState = g;
          b.baseQueue = k;
          c.lastRenderedState = d;
        }
        a = c.interleaved;
        if (null !== a) {
          e = a;
          do
            f = e.lane, M.lanes |= f, rh |= f, e = e.next;
          while (e !== a);
        } else null === e && (c.lanes = 0);
        return [b.memoizedState, c.dispatch];
      }
      function Xh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (dh = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Yh() {
      }
      function Zh(a, b) {
        var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
        f && (d.memoizedState = e, dh = true);
        d = d.queue;
        $h(ai.bind(null, c, d, a), [a]);
        if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
          c.flags |= 2048;
          bi(9, ci.bind(null, c, d, e, b), void 0, null);
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(c, b, e);
        }
        return e;
      }
      function di(a, b, c) {
        a.flags |= 16384;
        a = { getSnapshot: b, value: c };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
      }
      function ci(a, b, c, d) {
        b.value = c;
        b.getSnapshot = d;
        ei(b) && fi(a);
      }
      function ai(a, b, c) {
        return c(function() {
          ei(b) && fi(a);
        });
      }
      function ei(a) {
        var b = a.getSnapshot;
        a = a.value;
        try {
          var c = b();
          return !He(a, c);
        } catch (d) {
          return true;
        }
      }
      function fi(a) {
        var b = ih(a, 1);
        null !== b && gi(b, a, 1, -1);
      }
      function hi(a) {
        var b = Th();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
        b.queue = a;
        a = a.dispatch = ii.bind(null, M, a);
        return [b.memoizedState, a];
      }
      function bi(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a, b, c, d) {
        var e = Th();
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function li(a, b, c, d) {
        var e = Uh();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== N) {
          var g = N.memoizedState;
          f = g.destroy;
          if (null !== d && Mh(d, g.deps)) {
            e.memoizedState = bi(b, c, f, d);
            return;
          }
        }
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, f, d);
      }
      function mi(a, b) {
        return ki(8390656, 8, a, b);
      }
      function $h(a, b) {
        return li(2048, 8, a, b);
      }
      function ni(a, b) {
        return li(4, 2, a, b);
      }
      function oi(a, b) {
        return li(4, 4, a, b);
      }
      function pi(a, b) {
        if ("function" === typeof b) return a = a(), b(a), function() {
          b(null);
        };
        if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
          b.current = null;
        };
      }
      function qi(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return li(4, 4, pi.bind(null, b, a), c);
      }
      function ri() {
      }
      function si(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ti(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function ui(a, b, c) {
        if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
        He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
        return b;
      }
      function vi(a, b) {
        var c = C;
        C = 0 !== c && 4 > c ? c : 4;
        a(true);
        var d = Gh.transition;
        Gh.transition = {};
        try {
          a(false), b();
        } finally {
          C = c, Gh.transition = d;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a, b, c) {
        var d = yi(a);
        c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, c);
        else if (c = hh(a, b, c, d), null !== c) {
          var e = R();
          gi(c, a, d, e);
          Bi(c, b, d);
        }
      }
      function ii(a, b, c) {
        var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, e);
        else {
          var f = a.alternate;
          if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
            var g = b.lastRenderedState, h = f(g, c);
            e.hasEagerState = true;
            e.eagerState = h;
            if (He(h, g)) {
              var k = b.interleaved;
              null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
              b.interleaved = e;
              return;
            }
          } catch (l) {
          } finally {
          }
          c = hh(a, b, e, d);
          null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
        }
      }
      function zi(a) {
        var b = a.alternate;
        return a === M || null !== b && b === M;
      }
      function Ai(a, b) {
        Jh = Ih = true;
        var c = a.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
      function Bi(a, b, c) {
        if (0 !== (c & 4194240)) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a, b) {
        Th().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b, a),
          c
        );
      }, useLayoutEffect: function(a, b) {
        return ki(4194308, 4, a, b);
      }, useInsertionEffect: function(a, b) {
        return ki(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Th();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Th();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        d.queue = a;
        a = a.dispatch = xi.bind(null, M, a);
        return [d.memoizedState, a];
      }, useRef: function(a) {
        var b = Th();
        a = { current: a };
        return b.memoizedState = a;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
        return Th().memoizedState = a;
      }, useTransition: function() {
        var a = hi(false), b = a[0];
        a = vi.bind(null, a[1]);
        Th().memoizedState = a;
        return [b, a];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a, b, c) {
        var d = M, e = Th();
        if (I) {
          if (void 0 === c) throw Error(p(407));
          c = c();
        } else {
          c = b();
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(d, b, c);
        }
        e.memoizedState = c;
        var f = { value: c, getSnapshot: b };
        e.queue = f;
        mi(ai.bind(
          null,
          d,
          f,
          a
        ), [a]);
        d.flags |= 2048;
        bi(9, ci.bind(null, d, f, c, b), void 0, null);
        return c;
      }, useId: function() {
        var a = Th(), b = Q.identifierPrefix;
        if (I) {
          var c = sg;
          var d = rg;
          c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Kh++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a) {
          var b = Uh();
          return ui(b, N.memoizedState, a);
        },
        useTransition: function() {
          var a = Wh(Vh)[0], b = Uh().memoizedState;
          return [a, b];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a) {
        var b = Uh();
        return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
      }, useTransition: function() {
        var a = Xh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a, b) {
        if (a && a.defaultProps) {
          b = A({}, b);
          a = a.defaultProps;
          for (var c in a) void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      function Di(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : A({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Ei = { isMounted: function(a) {
        return (a = a._reactInternals) ? Vb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = R(), d = yi(a), e = mh(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        b = nh(a, e, d);
        null !== b && (gi(b, a, d, c), oh(b, a, d));
      } };
      function Fi(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
      }
      function Gi(a, b, c) {
        var d = false, e = Vf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Ei;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Hi(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
      }
      function Ii(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = {};
        kh(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4194308);
      }
      function Ji(a, b) {
        try {
          var c = "", d = b;
          do
            c += Pa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e, digest: null };
      }
      function Ki(a, b, c) {
        return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
      }
      function Li(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Oi || (Oi = true, Pi = d);
          Li(a, b);
        };
        return c;
      }
      function Qi(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            return d(e);
          };
          c.callback = function() {
            Li(a, b);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          Li(a, b);
          "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      function Si(a, b, c) {
        var d = a.pingCache;
        if (null === d) {
          d = a.pingCache = new Mi();
          var e = /* @__PURE__ */ new Set();
          d.set(b, e);
        } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
        e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
      }
      function Ui(a) {
        do {
          var b;
          if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
          if (b) return a;
          a = a.return;
        } while (null !== a);
        return null;
      }
      function Vi(a, b, c, d, e) {
        if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
        a.flags |= 65536;
        a.lanes = e;
        return a;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a, b, c, d) {
        b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
      }
      function Yi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        ch(b, e);
        d = Nh(a, b, c, d, f, e);
        c = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && c && vg(b);
        b.flags |= 1;
        Xi(a, b, d, e);
        return b.child;
      }
      function $i(a, b, c, d, e) {
        if (null === a) {
          var f = c.type;
          if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
          a = Rg(c.type, null, d, b, b.mode, e);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        f = a.child;
        if (0 === (a.lanes & e)) {
          var g = f.memoizedProps;
          c = c.compare;
          c = null !== c ? c : Ie;
          if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
        }
        b.flags |= 1;
        a = Pg(f, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function bj(a, b, c, d, e) {
        if (null !== a) {
          var f = a.memoizedProps;
          if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
          else return b.lanes = a.lanes, Zi(a, b, e);
        }
        return cj(a, b, c, d, e);
      }
      function dj(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
        else {
          if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
          d = null !== f ? f.baseLanes : c;
          G(ej, fj);
          fj |= d;
        }
        else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
        Xi(a, b, e, c);
        return b.child;
      }
      function gj(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
      }
      function cj(a, b, c, d, e) {
        var f = Zf(c) ? Xf : H.current;
        f = Yf(b, f);
        ch(b, e);
        c = Nh(a, b, c, d, f, e);
        d = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && d && vg(b);
        b.flags |= 1;
        Xi(a, b, c, e);
        return b.child;
      }
      function hj(a, b, c, d, e) {
        if (Zf(c)) {
          var f = true;
          cg(b);
        } else f = false;
        ch(b, e);
        if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
          var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
          q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
          jh = false;
          var r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          k = b.memoizedState;
          h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
        } else {
          g = b.stateNode;
          lh(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : Ci(b.type, h);
          g.props = l;
          q = b.pendingProps;
          r = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
          var y = c.getDerivedStateFromProps;
          (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
          jh = false;
          r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          var n = b.memoizedState;
          h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
        }
        return jj(a, b, c, d, f, e);
      }
      function jj(a, b, c, d, e, f) {
        gj(a, b);
        var g = 0 !== (b.flags & 128);
        if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
        d = b.stateNode;
        Wi.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
        b.memoizedState = d.state;
        e && dg(b, c, true);
        return b.child;
      }
      function kj(a) {
        var b = a.stateNode;
        b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
        yh(a, b.containerInfo);
      }
      function lj(a, b, c, d, e) {
        Ig();
        Jg(e);
        b.flags |= 256;
        Xi(a, b, c, d);
        return b.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a) {
        return { baseLanes: a, cachePool: null, transitions: null };
      }
      function oj(a, b, c) {
        var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
        (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        if (h) f = true, b.flags &= -129;
        else if (null === a || null !== a.memoizedState) e |= 1;
        G(L, e & 1);
        if (null === a) {
          Eg(b);
          a = b.memoizedState;
          if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
          g = d.children;
          a = d.fallback;
          return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
        }
        e = a.memoizedState;
        if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
        if (f) {
          f = d.fallback;
          g = b.mode;
          e = a.child;
          h = e.sibling;
          var k = { mode: "hidden", children: d.children };
          0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
          null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
          f.return = b;
          d.return = b;
          d.sibling = f;
          b.child = d;
          d = f;
          f = b.child;
          g = a.child.memoizedState;
          g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
          f.memoizedState = g;
          f.childLanes = a.childLanes & ~c;
          b.memoizedState = mj;
          return d;
        }
        f = a.child;
        a = f.sibling;
        d = Pg(f, { mode: "visible", children: d.children });
        0 === (b.mode & 1) && (d.lanes = c);
        d.return = b;
        d.sibling = null;
        null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
        b.child = d;
        b.memoizedState = null;
        return d;
      }
      function qj(a, b) {
        b = pj({ mode: "visible", children: b }, a.mode, 0, null);
        b.return = a;
        return a.child = b;
      }
      function sj(a, b, c, d) {
        null !== d && Jg(d);
        Ug(b, a.child, null, c);
        a = qj(b, b.pendingProps.children);
        a.flags |= 2;
        b.memoizedState = null;
        return a;
      }
      function rj(a, b, c, d, e, f, g) {
        if (c) {
          if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
          if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
          f = d.fallback;
          e = b.mode;
          d = pj({ mode: "visible", children: d.children }, e, 0, null);
          f = Tg(f, e, g, null);
          f.flags |= 2;
          d.return = b;
          f.return = b;
          d.sibling = f;
          b.child = d;
          0 !== (b.mode & 1) && Ug(b, a.child, null, g);
          b.child.memoizedState = nj(g);
          b.memoizedState = mj;
          return f;
        }
        if (0 === (b.mode & 1)) return sj(a, b, g, null);
        if ("$!" === e.data) {
          d = e.nextSibling && e.nextSibling.dataset;
          if (d) var h = d.dgst;
          d = h;
          f = Error(p(419));
          d = Ki(f, d, void 0);
          return sj(a, b, g, d);
        }
        h = 0 !== (g & a.childLanes);
        if (dh || h) {
          d = Q;
          if (null !== d) {
            switch (g & -g) {
              case 4:
                e = 2;
                break;
              case 16:
                e = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e = 32;
                break;
              case 536870912:
                e = 268435456;
                break;
              default:
                e = 0;
            }
            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
          }
          tj();
          d = Ki(Error(p(421)));
          return sj(a, b, g, d);
        }
        if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
        a = f.treeContext;
        yg = Lf(e.nextSibling);
        xg = b;
        I = true;
        zg = null;
        null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
        b = qj(b, d.children);
        b.flags |= 4096;
        return b;
      }
      function vj(a, b, c) {
        a.lanes |= b;
        var d = a.alternate;
        null !== d && (d.lanes |= b);
        bh(a.return, b, c);
      }
      function wj(a, b, c, d, e) {
        var f = a.memoizedState;
        null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
      }
      function xj(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        Xi(a, b, d.children, c);
        d = L.current;
        if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
        else {
          if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
            if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
            else if (19 === a.tag) vj(a, c, b);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b) break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b) break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
          d &= 1;
        }
        G(L, d);
        if (0 === (b.mode & 1)) b.memoizedState = null;
        else switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            wj(b, false, e, c, f);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; null !== e; ) {
              a = e.alternate;
              if (null !== a && null === Ch(a)) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            wj(b, true, c, null, f);
            break;
          case "together":
            wj(b, false, null, null, void 0);
            break;
          default:
            b.memoizedState = null;
        }
        return b.child;
      }
      function ij(a, b) {
        0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      }
      function Zi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        rh |= b.lanes;
        if (0 === (c & b.childLanes)) return null;
        if (null !== a && b.child !== a.child) throw Error(p(153));
        if (null !== b.child) {
          a = b.child;
          c = Pg(a, a.pendingProps);
          b.child = c;
          for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      function yj(a, b, c) {
        switch (b.tag) {
          case 3:
            kj(b);
            Ig();
            break;
          case 5:
            Ah(b);
            break;
          case 1:
            Zf(b.type) && cg(b);
            break;
          case 4:
            yh(b, b.stateNode.containerInfo);
            break;
          case 10:
            var d = b.type._context, e = b.memoizedProps.value;
            G(Wg, d._currentValue);
            d._currentValue = e;
            break;
          case 13:
            d = b.memoizedState;
            if (null !== d) {
              if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
              if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
              G(L, L.current & 1);
              a = Zi(a, b, c);
              return null !== a ? a.sibling : null;
            }
            G(L, L.current & 1);
            break;
          case 19:
            d = 0 !== (c & b.childLanes);
            if (0 !== (a.flags & 128)) {
              if (d) return xj(a, b, c);
              b.flags |= 128;
            }
            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            G(L, L.current);
            if (d) break;
            else return null;
          case 22:
          case 23:
            return b.lanes = 0, dj(a, b, c);
        }
        return Zi(a, b, c);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b) return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          xh(uh.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "select":
              e = A({}, e, { value: void 0 });
              d = A({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
          }
          ub(c, d);
          var g;
          c = null;
          for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
            var h = e[l];
            for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
              for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else c || (f || (f = []), f.push(
              l,
              c
            )), c = k;
            else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
          }
          c && (f = f || []).push("style", c);
          var l = f;
          if (b.updateQueue = l) b.flags |= 4;
        }
      };
      Cj = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Dj(a, b) {
        if (!I) switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
      }
      function S(a) {
        var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
        if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
        else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
        a.subtreeFlags |= d;
        a.childLanes = c;
        return b;
      }
      function Ej(a, b, c) {
        var d = b.pendingProps;
        wg(b);
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S(b), null;
          case 1:
            return Zf(b.type) && $f(), S(b), null;
          case 3:
            d = b.stateNode;
            zh();
            E(Wf);
            E(H);
            Eh();
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a, b);
            S(b);
            return null;
          case 5:
            Bh(b);
            var e = xh(wh.current);
            c = b.type;
            if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            else {
              if (!d) {
                if (null === b.stateNode) throw Error(p(166));
                S(b);
                return null;
              }
              a = xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[Of] = b;
                d[Pf] = f;
                a = 0 !== (b.mode & 1);
                switch (c) {
                  case "dialog":
                    D("cancel", d);
                    D("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], d);
                    break;
                  case "source":
                    D("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d
                    );
                    D("load", d);
                    break;
                  case "details":
                    D("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    D("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    D("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), D("invalid", d);
                }
                ub(c, f);
                e = null;
                for (var g in f) if (f.hasOwnProperty(g)) {
                  var h = f[g];
                  "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                    d.textContent,
                    h,
                    a
                  ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                }
                switch (c) {
                  case "input":
                    Va(d);
                    db(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = Bf);
                }
                d = e;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[Of] = b;
                a[Pf] = d;
                zj(a, b, false, false);
                b.stateNode = a;
                a: {
                  g = vb(c, d);
                  switch (c) {
                    case "dialog":
                      D("cancel", a);
                      D("close", a);
                      e = d;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a);
                      e = d;
                      break;
                    case "video":
                    case "audio":
                      for (e = 0; e < lf.length; e++) D(lf[e], a);
                      e = d;
                      break;
                    case "source":
                      D("error", a);
                      e = d;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a
                      );
                      D("load", a);
                      e = d;
                      break;
                    case "details":
                      D("toggle", a);
                      e = d;
                      break;
                    case "input":
                      Za(a, d);
                      e = Ya(a, d);
                      D("invalid", a);
                      break;
                    case "option":
                      e = d;
                      break;
                    case "select":
                      a._wrapperState = { wasMultiple: !!d.multiple };
                      e = A({}, d, { value: void 0 });
                      D("invalid", a);
                      break;
                    case "textarea":
                      hb(a, d);
                      e = gb(a, d);
                      D("invalid", a);
                      break;
                    default:
                      e = d;
                  }
                  ub(c, e);
                  h = e;
                  for (f in h) if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                  }
                  switch (c) {
                    case "input":
                      Va(a);
                      db(a, d, false);
                      break;
                    case "textarea":
                      Va(a);
                      jb(a);
                      break;
                    case "option":
                      null != d.value && a.setAttribute("value", "" + Sa(d.value));
                      break;
                    case "select":
                      a.multiple = !!d.multiple;
                      f = d.value;
                      null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                        a,
                        !!d.multiple,
                        d.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e.onClick && (a.onclick = Bf);
                  }
                  switch (c) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d = !!d.autoFocus;
                      break a;
                    case "img":
                      d = true;
                      break a;
                    default:
                      d = false;
                  }
                }
                d && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            }
            S(b);
            return null;
          case 6:
            if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
              c = xh(wh.current);
              xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.memoizedProps;
                d[Of] = b;
                if (f = d.nodeValue !== c) {
                  if (a = xg, null !== a) switch (a.tag) {
                    case 3:
                      Af(d.nodeValue, c, 0 !== (a.mode & 1));
                      break;
                    case 5:
                      true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  }
                }
                f && (b.flags |= 4);
              } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
            }
            S(b);
            return null;
          case 13:
            E(L);
            d = b.memoizedState;
            if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
              if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
              else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                if (null === a) {
                  if (!f) throw Error(p(318));
                  f = b.memoizedState;
                  f = null !== f ? f.dehydrated : null;
                  if (!f) throw Error(p(317));
                  f[Of] = b;
                } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
                S(b);
                f = false;
              } else null !== zg && (Fj(zg), zg = null), f = true;
              if (!f) return b.flags & 65536 ? b : null;
            }
            if (0 !== (b.flags & 128)) return b.lanes = c, b;
            d = null !== d;
            d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
            null !== b.updateQueue && (b.flags |= 4);
            S(b);
            return null;
          case 4:
            return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
          case 10:
            return ah(b.type._context), S(b), null;
          case 17:
            return Zf(b.type) && $f(), S(b), null;
          case 19:
            E(L);
            f = b.memoizedState;
            if (null === f) return S(b), null;
            d = 0 !== (b.flags & 128);
            g = f.rendering;
            if (null === g) if (d) Dj(f, false);
            else {
              if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
                g = Ch(a);
                if (null !== g) {
                  b.flags |= 128;
                  Dj(f, false);
                  d = g.updateQueue;
                  null !== d && (b.updateQueue = d, b.flags |= 4);
                  b.subtreeFlags = 0;
                  d = c;
                  for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                  G(L, L.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
              null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
            }
            else {
              if (!d) if (a = Ch(g), null !== a) {
                if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
              } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
              f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
            }
            if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
            S(b);
            return null;
          case 22:
          case 23:
            return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p(156, b.tag));
      }
      function Ij(a, b) {
        wg(b);
        switch (b.tag) {
          case 1:
            return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 3:
            return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
          case 5:
            return Bh(b), null;
          case 13:
            E(L);
            a = b.memoizedState;
            if (null !== a && null !== a.dehydrated) {
              if (null === b.alternate) throw Error(p(340));
              Ig();
            }
            a = b.flags;
            return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 19:
            return E(L), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V = null;
      function Lj(a, b) {
        var c = a.ref;
        if (null !== c) if ("function" === typeof c) try {
          c(null);
        } catch (d) {
          W(a, b, d);
        }
        else c.current = null;
      }
      function Mj(a, b, c) {
        try {
          c();
        } catch (d) {
          W(a, b, d);
        }
      }
      var Nj = false;
      function Oj(a, b) {
        Cf = dd;
        a = Me();
        if (Ne(a)) {
          if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
          else a: {
            c = (c = a.ownerDocument) && c.defaultView || window;
            var d = c.getSelection && c.getSelection();
            if (d && 0 !== d.rangeCount) {
              c = d.anchorNode;
              var e = d.anchorOffset, f = d.focusNode;
              d = d.focusOffset;
              try {
                c.nodeType, f.nodeType;
              } catch (F) {
                c = null;
                break a;
              }
              var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
              b: for (; ; ) {
                for (var y; ; ) {
                  q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                  q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                  3 === q.nodeType && (g += q.nodeValue.length);
                  if (null === (y = q.firstChild)) break;
                  r = q;
                  q = y;
                }
                for (; ; ) {
                  if (q === a) break b;
                  r === c && ++l === e && (h = g);
                  r === f && ++m === d && (k = g);
                  if (null !== (y = q.nextSibling)) break;
                  q = r;
                  r = q.parentNode;
                }
                q = y;
              }
              c = -1 === h || -1 === k ? null : { start: h, end: k };
            } else c = null;
          }
          c = c || { start: 0, end: 0 };
        } else c = null;
        Df = { focusedElem: a, selectionRange: c };
        dd = false;
        for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
        else for (; null !== V; ) {
          b = V;
          try {
            var n = b.alternate;
            if (0 !== (b.flags & 1024)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n) {
                  var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                  x.__reactInternalSnapshotBeforeUpdate = w;
                }
                break;
              case 3:
                var u = b.stateNode.containerInfo;
                1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
          } catch (F) {
            W(b, b.return, F);
          }
          a = b.sibling;
          if (null !== a) {
            a.return = b.return;
            V = a;
            break;
          }
          V = b.return;
        }
        n = Nj;
        Nj = false;
        return n;
      }
      function Pj(a, b, c) {
        var d = b.updateQueue;
        d = null !== d ? d.lastEffect : null;
        if (null !== d) {
          var e = d = d.next;
          do {
            if ((e.tag & a) === a) {
              var f = e.destroy;
              e.destroy = void 0;
              void 0 !== f && Mj(b, c, f);
            }
            e = e.next;
          } while (e !== d);
        }
      }
      function Qj(a, b) {
        b = b.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.create;
              c.destroy = d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Rj(a) {
        var b = a.ref;
        if (null !== b) {
          var c = a.stateNode;
          switch (a.tag) {
            case 5:
              a = c;
              break;
            default:
              a = c;
          }
          "function" === typeof b ? b(a) : b.current = a;
        }
      }
      function Sj(a) {
        var b = a.alternate;
        null !== b && (a.alternate = null, Sj(b));
        a.child = null;
        a.deletions = null;
        a.sibling = null;
        5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
        a.stateNode = null;
        a.return = null;
        a.dependencies = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.stateNode = null;
        a.updateQueue = null;
      }
      function Tj(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function Uj(a) {
        a: for (; ; ) {
          for (; null === a.sibling; ) {
            if (null === a.return || Tj(a.return)) return null;
            a = a.return;
          }
          a.sibling.return = a.return;
          for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
            if (a.flags & 2) continue a;
            if (null === a.child || 4 === a.tag) continue a;
            else a.child.return = a, a = a.child;
          }
          if (!(a.flags & 2)) return a.stateNode;
        }
      }
      function Vj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
        else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
      }
      function Wj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
      }
      var X = null;
      var Xj = false;
      function Yj(a, b, c) {
        for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
      }
      function Zj(a, b, c) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
          lc.onCommitFiberUnmount(kc, c);
        } catch (h) {
        }
        switch (c.tag) {
          case 5:
            U || Lj(c, b);
          case 6:
            var d = X, e = Xj;
            X = null;
            Yj(a, b, c);
            X = d;
            Xj = e;
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
            break;
          case 18:
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
            break;
          case 4:
            d = X;
            e = Xj;
            X = c.stateNode.containerInfo;
            Xj = true;
            Yj(a, b, c);
            X = d;
            Xj = e;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
              e = d = d.next;
              do {
                var f = e, g = f.destroy;
                f = f.tag;
                void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
                e = e.next;
              } while (e !== d);
            }
            Yj(a, b, c);
            break;
          case 1:
            if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
              d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
            } catch (h) {
              W(c, b, h);
            }
            Yj(a, b, c);
            break;
          case 21:
            Yj(a, b, c);
            break;
          case 22:
            c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
            break;
          default:
            Yj(a, b, c);
        }
      }
      function ak(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Kj());
          b.forEach(function(b2) {
            var d = bk.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function ck(a, b) {
        var c = b.deletions;
        if (null !== c) for (var d = 0; d < c.length; d++) {
          var e = c[d];
          try {
            var f = a, g = b, h = g;
            a: for (; null !== h; ) {
              switch (h.tag) {
                case 5:
                  X = h.stateNode;
                  Xj = false;
                  break a;
                case 3:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
                case 4:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
              }
              h = h.return;
            }
            if (null === X) throw Error(p(160));
            Zj(f, g, e);
            X = null;
            Xj = false;
            var k = e.alternate;
            null !== k && (k.return = null);
            e.return = null;
          } catch (l) {
            W(e, b, l);
          }
        }
        if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
      }
      function dk(a, b) {
        var c = a.alternate, d = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b, a);
            ek(a);
            if (d & 4) {
              try {
                Pj(3, a, a.return), Qj(3, a);
              } catch (t) {
                W(a, a.return, t);
              }
              try {
                Pj(5, a, a.return);
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 1:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            break;
          case 5:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            if (a.flags & 32) {
              var e = a.stateNode;
              try {
                ob(e, "");
              } catch (t) {
                W(a, a.return, t);
              }
            }
            if (d & 4 && (e = a.stateNode, null != e)) {
              var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
              a.updateQueue = null;
              if (null !== k) try {
                "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                vb(h, g);
                var l = vb(h, f);
                for (g = 0; g < k.length; g += 2) {
                  var m = k[g], q = k[g + 1];
                  "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                }
                switch (h) {
                  case "input":
                    bb(e, f);
                    break;
                  case "textarea":
                    ib(e, f);
                    break;
                  case "select":
                    var r = e._wrapperState.wasMultiple;
                    e._wrapperState.wasMultiple = !!f.multiple;
                    var y = f.value;
                    null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                      e,
                      !!f.multiple,
                      f.defaultValue,
                      true
                    ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                }
                e[Pf] = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 6:
            ck(b, a);
            ek(a);
            if (d & 4) {
              if (null === a.stateNode) throw Error(p(162));
              e = a.stateNode;
              f = a.memoizedProps;
              try {
                e.nodeValue = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 3:
            ck(b, a);
            ek(a);
            if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
              bd(b.containerInfo);
            } catch (t) {
              W(a, a.return, t);
            }
            break;
          case 4:
            ck(b, a);
            ek(a);
            break;
          case 13:
            ck(b, a);
            ek(a);
            e = a.child;
            e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
            d & 4 && ak(a);
            break;
          case 22:
            m = null !== c && null !== c.memoizedState;
            a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
            ek(a);
            if (d & 8192) {
              l = null !== a.memoizedState;
              if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
                for (q = V = m; null !== V; ) {
                  r = V;
                  y = r.child;
                  switch (r.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pj(4, r, r.return);
                      break;
                    case 1:
                      Lj(r, r.return);
                      var n = r.stateNode;
                      if ("function" === typeof n.componentWillUnmount) {
                        d = r;
                        c = r.return;
                        try {
                          b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                        } catch (t) {
                          W(d, c, t);
                        }
                      }
                      break;
                    case 5:
                      Lj(r, r.return);
                      break;
                    case 22:
                      if (null !== r.memoizedState) {
                        gk(q);
                        continue;
                      }
                  }
                  null !== y ? (y.return = r, V = y) : gk(q);
                }
                m = m.sibling;
              }
              a: for (m = null, q = a; ; ) {
                if (5 === q.tag) {
                  if (null === m) {
                    m = q;
                    try {
                      e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                    } catch (t) {
                      W(a, a.return, t);
                    }
                  }
                } else if (6 === q.tag) {
                  if (null === m) try {
                    q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                  } catch (t) {
                    W(a, a.return, t);
                  }
                } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                  q.child.return = q;
                  q = q.child;
                  continue;
                }
                if (q === a) break a;
                for (; null === q.sibling; ) {
                  if (null === q.return || q.return === a) break a;
                  m === q && (m = null);
                  q = q.return;
                }
                m === q && (m = null);
                q.sibling.return = q.return;
                q = q.sibling;
              }
            }
            break;
          case 19:
            ck(b, a);
            ek(a);
            d & 4 && ak(a);
            break;
          case 21:
            break;
          default:
            ck(
              b,
              a
            ), ek(a);
        }
      }
      function ek(a) {
        var b = a.flags;
        if (b & 2) {
          try {
            a: {
              for (var c = a.return; null !== c; ) {
                if (Tj(c)) {
                  var d = c;
                  break a;
                }
                c = c.return;
              }
              throw Error(p(160));
            }
            switch (d.tag) {
              case 5:
                var e = d.stateNode;
                d.flags & 32 && (ob(e, ""), d.flags &= -33);
                var f = Uj(a);
                Wj(a, f, e);
                break;
              case 3:
              case 4:
                var g = d.stateNode.containerInfo, h = Uj(a);
                Vj(a, h, g);
                break;
              default:
                throw Error(p(161));
            }
          } catch (k) {
            W(a, a.return, k);
          }
          a.flags &= -3;
        }
        b & 4096 && (a.flags &= -4097);
      }
      function hk(a, b, c) {
        V = a;
        ik(a, b, c);
      }
      function ik(a, b, c) {
        for (var d = 0 !== (a.mode & 1); null !== V; ) {
          var e = V, f = e.child;
          if (22 === e.tag && d) {
            var g = null !== e.memoizedState || Jj;
            if (!g) {
              var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
              h = Jj;
              var l = U;
              Jj = g;
              if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
              for (; null !== f; ) V = f, ik(f, b, c), f = f.sibling;
              V = e;
              Jj = h;
              U = l;
            }
            kk(a, b, c);
          } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
        }
      }
      function kk(a) {
        for (; null !== V; ) {
          var b = V;
          if (0 !== (b.flags & 8772)) {
            var c = b.alternate;
            try {
              if (0 !== (b.flags & 8772)) switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  U || Qj(5, b);
                  break;
                case 1:
                  var d = b.stateNode;
                  if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                  else {
                    var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                  }
                  var f = b.updateQueue;
                  null !== f && sh(b, f, d);
                  break;
                case 3:
                  var g = b.updateQueue;
                  if (null !== g) {
                    c = null;
                    if (null !== b.child) switch (b.child.tag) {
                      case 5:
                        c = b.child.stateNode;
                        break;
                      case 1:
                        c = b.child.stateNode;
                    }
                    sh(b, g, c);
                  }
                  break;
                case 5:
                  var h = b.stateNode;
                  if (null === c && b.flags & 4) {
                    c = h;
                    var k = b.memoizedProps;
                    switch (b.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k.autoFocus && c.focus();
                        break;
                      case "img":
                        k.src && (c.src = k.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (null === b.memoizedState) {
                    var l = b.alternate;
                    if (null !== l) {
                      var m = l.memoizedState;
                      if (null !== m) {
                        var q = m.dehydrated;
                        null !== q && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p(163));
              }
              U || b.flags & 512 && Rj(b);
            } catch (r) {
              W(b, b.return, r);
            }
          }
          if (b === a) {
            V = null;
            break;
          }
          c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function gk(a) {
        for (; null !== V; ) {
          var b = V;
          if (b === a) {
            V = null;
            break;
          }
          var c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function jk(a) {
        for (; null !== V; ) {
          var b = V;
          try {
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                var c = b.return;
                try {
                  Qj(4, b);
                } catch (k) {
                  W(b, c, k);
                }
                break;
              case 1:
                var d = b.stateNode;
                if ("function" === typeof d.componentDidMount) {
                  var e = b.return;
                  try {
                    d.componentDidMount();
                  } catch (k) {
                    W(b, e, k);
                  }
                }
                var f = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, f, k);
                }
                break;
              case 5:
                var g = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, g, k);
                }
            }
          } catch (k) {
            W(b, b.return, k);
          }
          if (b === a) {
            V = null;
            break;
          }
          var h = b.sibling;
          if (null !== h) {
            h.return = b.return;
            V = h;
            break;
          }
          V = b.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z = 0;
      var fj = 0;
      var ej = Uf(0);
      var T = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R() {
        return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
      }
      function yi(a) {
        if (0 === (a.mode & 1)) return 1;
        if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
        if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
        a = C;
        if (0 !== a) return a;
        a = window.event;
        a = void 0 === a ? 16 : jd(a.type);
        return a;
      }
      function gi(a, b, c, d) {
        if (50 < yk) throw yk = 0, zk = null, Error(p(185));
        Ac(a, c, d);
        if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
      }
      function Dk(a, b) {
        var c = a.callbackNode;
        wc(a, b);
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
        else if (b = d & -d, a.callbackPriority !== b) {
          null != c && bc(c);
          if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
            0 === (K & 6) && jg();
          }), c = null;
          else {
            switch (Dc(d)) {
              case 1:
                c = fc;
                break;
              case 4:
                c = gc;
                break;
              case 16:
                c = hc;
                break;
              case 536870912:
                c = jc;
                break;
              default:
                c = hc;
            }
            c = Fk(c, Gk.bind(null, a));
          }
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Gk(a, b) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6)) throw Error(p(327));
        var c = a.callbackNode;
        if (Hk() && a.callbackNode !== c) return null;
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) return null;
        if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
        else {
          b = d;
          var e = K;
          K |= 2;
          var f = Jk();
          if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
          do
            try {
              Lk();
              break;
            } catch (h) {
              Mk(a, h);
            }
          while (1);
          $g();
          mk.current = f;
          K = e;
          null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
        }
        if (0 !== b) {
          2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
          if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          if (6 === b) Ck(a, d);
          else {
            e = a.current.alternate;
            if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
            a.finishedWork = e;
            a.finishedLanes = d;
            switch (b) {
              case 0:
              case 1:
                throw Error(p(345));
              case 2:
                Pk(a, tk, uk);
                break;
              case 3:
                Ck(a, d);
                if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                  if (0 !== uc(a, 0)) break;
                  e = a.suspendedLanes;
                  if ((e & d) !== d) {
                    R();
                    a.pingedLanes |= a.suspendedLanes & e;
                    break;
                  }
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 4:
                Ck(a, d);
                if ((d & 4194240) === d) break;
                b = a.eventTimes;
                for (e = -1; 0 < d; ) {
                  var g = 31 - oc(d);
                  f = 1 << g;
                  g = b[g];
                  g > e && (e = g);
                  d &= ~f;
                }
                d = e;
                d = B() - d;
                d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                if (10 < d) {
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 5:
                Pk(a, tk, uk);
                break;
              default:
                throw Error(p(329));
            }
          }
        }
        Dk(a, B());
        return a.callbackNode === c ? Gk.bind(null, a) : null;
      }
      function Nk(a, b) {
        var c = sk;
        a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
        a = Ik(a, b);
        2 !== a && (b = tk, tk = c, null !== b && Fj(b));
        return a;
      }
      function Fj(a) {
        null === tk ? tk = a : tk.push.apply(tk, a);
      }
      function Ok(a) {
        for (var b = a; ; ) {
          if (b.flags & 16384) {
            var c = b.updateQueue;
            if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
              var e = c[d], f = e.getSnapshot;
              e = e.value;
              try {
                if (!He(f(), e)) return false;
              } catch (g) {
                return false;
              }
            }
          }
          c = b.child;
          if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
          else {
            if (b === a) break;
            for (; null === b.sibling; ) {
              if (null === b.return || b.return === a) return true;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return true;
      }
      function Ck(a, b) {
        b &= ~rk;
        b &= ~qk;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - oc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Ek(a) {
        if (0 !== (K & 6)) throw Error(p(327));
        Hk();
        var b = uc(a, 0);
        if (0 === (b & 1)) return Dk(a, B()), null;
        var c = Ik(a, b);
        if (0 !== a.tag && 2 === c) {
          var d = xc(a);
          0 !== d && (b = d, c = Nk(a, d));
        }
        if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
        if (6 === c) throw Error(p(345));
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Pk(a, tk, uk);
        Dk(a, B());
        return null;
      }
      function Qk(a, b) {
        var c = K;
        K |= 1;
        try {
          return a(b);
        } finally {
          K = c, 0 === K && (Gj = B() + 500, fg && jg());
        }
      }
      function Rk(a) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b = K;
        K |= 1;
        var c = ok.transition, d = C;
        try {
          if (ok.transition = null, C = 1, a) return a();
        } finally {
          C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E(ej);
      }
      function Kk(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, Gf(c));
        if (null !== Y) for (c = Y.return; null !== c; ) {
          var d = c;
          wg(d);
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              null !== d && void 0 !== d && $f();
              break;
            case 3:
              zh();
              E(Wf);
              E(H);
              Eh();
              break;
            case 5:
              Bh(d);
              break;
            case 4:
              zh();
              break;
            case 13:
              E(L);
              break;
            case 19:
              E(L);
              break;
            case 10:
              ah(d.type._context);
              break;
            case 22:
            case 23:
              Hj();
          }
          c = c.return;
        }
        Q = a;
        Y = a = Pg(a.current, null);
        Z = fj = b;
        T = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
            c.interleaved = null;
            var e = d.next, f = c.pending;
            if (null !== f) {
              var g = f.next;
              f.next = e;
              d.next = g;
            }
            c.pending = d;
          }
          fh = null;
        }
        return a;
      }
      function Mk(a, b) {
        do {
          var c = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d = M.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N = M = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c || null === c.return) {
              T = 1;
              pk = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = Z;
              h.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k, m = h, q = m.tag;
                if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r = m.alternate;
                  r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
                }
                var y = Ui(g);
                if (null !== y) {
                  y.flags &= -257;
                  Vi(y, g, h, f, b);
                  y.mode & 1 && Si(f, l, b);
                  b = y;
                  k = l;
                  var n = b.updateQueue;
                  if (null === n) {
                    var t = /* @__PURE__ */ new Set();
                    t.add(k);
                    b.updateQueue = t;
                  } else n.add(k);
                  break a;
                } else {
                  if (0 === (b & 1)) {
                    Si(f, l, b);
                    tj();
                    break a;
                  }
                  k = Error(p(426));
                }
              } else if (I && h.mode & 1) {
                var J = Ui(g);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g, h, f, b);
                  Jg(Ji(k, h));
                  break a;
                }
              }
              f = k = Ji(k, h);
              4 !== T && (T = 2);
              null === sk ? sk = [f] : sk.push(f);
              f = g;
              do {
                switch (f.tag) {
                  case 3:
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var x = Ni(f, k, b);
                    ph(f, x);
                    break a;
                  case 1:
                    h = k;
                    var w = f.type, u = f.stateNode;
                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                      f.flags |= 65536;
                      b &= -b;
                      f.lanes |= b;
                      var F = Qi(f, h, b);
                      ph(f, F);
                      break a;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Sk(c);
          } catch (na) {
            b = na;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a = mk.current;
        mk.current = Rh;
        return null === a ? Rh : a;
      }
      function tj() {
        if (0 === T || 3 === T || 2 === T) T = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
      }
      function Ik(a, b) {
        var c = K;
        K |= 2;
        var d = Jk();
        if (Q !== a || Z !== b) uk = null, Kk(a, b);
        do
          try {
            Tk();
            break;
          } catch (e) {
            Mk(a, e);
          }
        while (1);
        $g();
        K = c;
        mk.current = d;
        if (null !== Y) throw Error(p(261));
        Q = null;
        Z = 0;
        return T;
      }
      function Tk() {
        for (; null !== Y; ) Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); ) Uk(Y);
      }
      function Uk(a) {
        var b = Vk(a.alternate, a, fj);
        a.memoizedProps = a.pendingProps;
        null === b ? Sk(a) : Y = b;
        nk.current = null;
      }
      function Sk(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 32768)) {
            if (c = Ej(c, b, fj), null !== c) {
              Y = c;
              return;
            }
          } else {
            c = Ij(c, b);
            if (null !== c) {
              c.flags &= 32767;
              Y = c;
              return;
            }
            if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
            else {
              T = 6;
              Y = null;
              return;
            }
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === T && (T = 5);
      }
      function Pk(a, b, c) {
        var d = C, e = ok.transition;
        try {
          ok.transition = null, C = 1, Wk(a, b, c, d);
        } finally {
          ok.transition = e, C = d;
        }
        return null;
      }
      function Wk(a, b, c, d) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6)) throw Error(p(327));
        c = a.finishedWork;
        var e = a.finishedLanes;
        if (null === c) return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current) throw Error(p(177));
        a.callbackNode = null;
        a.callbackPriority = 0;
        var f = c.lanes | c.childLanes;
        Bc(a, f);
        a === Q && (Y = Q = null, Z = 0);
        0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f = 0 !== (c.flags & 15990);
        if (0 !== (c.subtreeFlags & 15990) || f) {
          f = ok.transition;
          ok.transition = null;
          var g = C;
          C = 1;
          var h = K;
          K |= 4;
          nk.current = null;
          Oj(a, c);
          dk(c, a);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a.current = c;
          hk(c, a, e);
          dc();
          K = h;
          C = g;
          ok.transition = f;
        } else a.current = c;
        vk && (vk = false, wk = a, xk = e);
        f = a.pendingLanes;
        0 === f && (Ri = null);
        mc(c.stateNode, d);
        Dk(a, B());
        if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
        if (Oi) throw Oi = false, a = Pi, Pi = null, a;
        0 !== (xk & 1) && 0 !== a.tag && Hk();
        f = a.pendingLanes;
        0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a = Dc(xk), b = ok.transition, c = C;
          try {
            ok.transition = null;
            C = 16 > a ? 16 : a;
            if (null === wk) var d = false;
            else {
              a = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6)) throw Error(p(331));
              var e = K;
              K |= 4;
              for (V = a.current; null !== V; ) {
                var f = V, g = f.child;
                if (0 !== (V.flags & 16)) {
                  var h = f.deletions;
                  if (null !== h) {
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k];
                      for (V = l; null !== V; ) {
                        var m = V;
                        switch (m.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m, f);
                        }
                        var q = m.child;
                        if (null !== q) q.return = m, V = q;
                        else for (; null !== V; ) {
                          m = V;
                          var r = m.sibling, y = m.return;
                          Sj(m);
                          if (m === l) {
                            V = null;
                            break;
                          }
                          if (null !== r) {
                            r.return = y;
                            V = r;
                            break;
                          }
                          V = y;
                        }
                      }
                    }
                    var n = f.alternate;
                    if (null !== n) {
                      var t = n.child;
                      if (null !== t) {
                        n.child = null;
                        do {
                          var J = t.sibling;
                          t.sibling = null;
                          t = J;
                        } while (null !== t);
                      }
                    }
                    V = f;
                  }
                }
                if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
                else b: for (; null !== V; ) {
                  f = V;
                  if (0 !== (f.flags & 2048)) switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f, f.return);
                  }
                  var x = f.sibling;
                  if (null !== x) {
                    x.return = f.return;
                    V = x;
                    break b;
                  }
                  V = f.return;
                }
              }
              var w = a.current;
              for (V = w; null !== V; ) {
                g = V;
                var u = g.child;
                if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
                else b: for (g = w; null !== V; ) {
                  h = V;
                  if (0 !== (h.flags & 2048)) try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h);
                    }
                  } catch (na) {
                    W(h, h.return, na);
                  }
                  if (h === g) {
                    V = null;
                    break b;
                  }
                  var F = h.sibling;
                  if (null !== F) {
                    F.return = h.return;
                    V = F;
                    break b;
                  }
                  V = h.return;
                }
              }
              K = e;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
                lc.onPostCommitFiberRoot(kc, a);
              } catch (na) {
              }
              d = true;
            }
            return d;
          } finally {
            C = c, ok.transition = b;
          }
        }
        return false;
      }
      function Xk(a, b, c) {
        b = Ji(c, b);
        b = Ni(a, b, 1);
        a = nh(a, b, 1);
        b = R();
        null !== a && (Ac(a, 1, b), Dk(a, b));
      }
      function W(a, b, c) {
        if (3 === a.tag) Xk(a, a, c);
        else for (; null !== b; ) {
          if (3 === b.tag) {
            Xk(b, a, c);
            break;
          } else if (1 === b.tag) {
            var d = b.stateNode;
            if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
              a = Ji(c, a);
              a = Qi(b, a, 1);
              b = nh(b, a, 1);
              a = R();
              null !== b && (Ac(b, 1, a), Dk(b, a));
              break;
            }
          }
          b = b.return;
        }
      }
      function Ti(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = R();
        a.pingedLanes |= a.suspendedLanes & c;
        Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
        Dk(a, b);
      }
      function Yk(a, b) {
        0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c = R();
        a = ih(a, b);
        null !== a && (Ac(a, b, c), Dk(a, c));
      }
      function uj(a) {
        var b = a.memoizedState, c = 0;
        null !== b && (c = b.retryLane);
        Yk(a, c);
      }
      function bk(a, b) {
        var c = 0;
        switch (a.tag) {
          case 13:
            var d = a.stateNode;
            var e = a.memoizedState;
            null !== e && (c = e.retryLane);
            break;
          case 19:
            d = a.stateNode;
            break;
          default:
            throw Error(p(314));
        }
        null !== d && d.delete(b);
        Yk(a, c);
      }
      var Vk;
      Vk = function(a, b, c) {
        if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
        else {
          if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
          dh = 0 !== (a.flags & 131072) ? true : false;
        }
        else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            var d = b.type;
            ij(a, b);
            a = b.pendingProps;
            var e = Yf(b, H.current);
            ch(b, c);
            e = Nh(null, b, d, a, e, c);
            var f = Sh();
            b.flags |= 1;
            "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
            return b;
          case 16:
            d = b.elementType;
            a: {
              ij(a, b);
              a = b.pendingProps;
              e = d._init;
              d = e(d._payload);
              b.type = d;
              e = b.tag = Zk(d);
              a = Ci(d, a);
              switch (e) {
                case 0:
                  b = cj(null, b, d, a, c);
                  break a;
                case 1:
                  b = hj(null, b, d, a, c);
                  break a;
                case 11:
                  b = Yi(null, b, d, a, c);
                  break a;
                case 14:
                  b = $i(null, b, d, Ci(d.type, a), c);
                  break a;
              }
              throw Error(p(
                306,
                d,
                ""
              ));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
          case 3:
            a: {
              kj(b);
              if (null === a) throw Error(p(387));
              d = b.pendingProps;
              f = b.memoizedState;
              e = f.element;
              lh(a, b);
              qh(b, d, null, c);
              var g = b.memoizedState;
              d = g.element;
              if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                e = Ji(Error(p(423)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else if (d !== e) {
                e = Ji(Error(p(424)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
              else {
                Ig();
                if (d === e) {
                  b = Zi(a, b, c);
                  break a;
                }
                Xi(a, b, d, c);
              }
              b = b.child;
            }
            return b;
          case 5:
            return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
          case 6:
            return null === a && Eg(b), null;
          case 13:
            return oj(a, b, c);
          case 4:
            return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
          case 7:
            return Xi(a, b, b.pendingProps, c), b.child;
          case 8:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              f = b.memoizedProps;
              g = e.value;
              G(Wg, d._currentValue);
              d._currentValue = g;
              if (null !== f) if (He(f.value, g)) {
                if (f.children === e.children && !Wf.current) {
                  b = Zi(a, b, c);
                  break a;
                }
              } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                var h = f.dependencies;
                if (null !== h) {
                  g = f.child;
                  for (var k = h.firstContext; null !== k; ) {
                    if (k.context === d) {
                      if (1 === f.tag) {
                        k = mh(-1, c & -c);
                        k.tag = 2;
                        var l = f.updateQueue;
                        if (null !== l) {
                          l = l.shared;
                          var m = l.pending;
                          null === m ? k.next = k : (k.next = m.next, m.next = k);
                          l.pending = k;
                        }
                      }
                      f.lanes |= c;
                      k = f.alternate;
                      null !== k && (k.lanes |= c);
                      bh(
                        f.return,
                        c,
                        b
                      );
                      h.lanes |= c;
                      break;
                    }
                    k = k.next;
                  }
                } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
                else if (18 === f.tag) {
                  g = f.return;
                  if (null === g) throw Error(p(341));
                  g.lanes |= c;
                  h = g.alternate;
                  null !== h && (h.lanes |= c);
                  bh(g, c, b);
                  g = f.sibling;
                } else g = f.child;
                if (null !== g) g.return = f;
                else for (g = f; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f = g.sibling;
                  if (null !== f) {
                    f.return = g.return;
                    g = f;
                    break;
                  }
                  g = g.return;
                }
                f = g;
              }
              Xi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
          case 14:
            return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
          case 15:
            return bj(a, b, b.type, b.pendingProps, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
          case 19:
            return xj(a, b, c);
          case 22:
            return dj(a, b, c);
        }
        throw Error(p(156, b.tag));
      };
      function Fk(a, b) {
        return ac(a, b);
      }
      function $k(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a, b, c, d) {
        return new $k(a, b, c, d);
      }
      function aj(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function Zk(a) {
        if ("function" === typeof a) return aj(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Da) return 11;
          if (a === Ga) return 14;
        }
        return 2;
      }
      function Pg(a, b) {
        var c = a.alternate;
        null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
        c.flags = a.flags & 14680064;
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Rg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a) aj(a) && (g = 1);
        else if ("string" === typeof a) g = 5;
        else a: switch (a) {
          case ya:
            return Tg(c.children, e, f, b);
          case za:
            g = 8;
            e |= 8;
            break;
          case Aa:
            return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
          case Ea:
            return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
          case Fa:
            return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
          case Ia:
            return pj(c, e, f, b);
          default:
            if ("object" === typeof a && null !== a) switch (a.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
            throw Error(p(130, null == a ? a : typeof a, ""));
        }
        b = Bg(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Tg(a, b, c, d) {
        a = Bg(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function pj(a, b, c, d) {
        a = Bg(22, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        a.stateNode = { isHidden: false };
        return a;
      }
      function Qg(a, b, c) {
        a = Bg(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Sg(a, b, c) {
        b = Bg(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function al(a, b, c, d, e) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d;
        this.onRecoverableError = e;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a, b, c, d, e, f, g, h, k) {
        a = new al(a, b, c, h, k);
        1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
        f = Bg(3, null, null, b);
        a.current = f;
        f.stateNode = a;
        f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f);
        return a;
      }
      function cl(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function dl(a) {
        if (!a) return Vf;
        a = a._reactInternals;
        a: {
          if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
          var b = a;
          do {
            switch (b.tag) {
              case 3:
                b = b.stateNode.context;
                break a;
              case 1:
                if (Zf(b.type)) {
                  b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b = b.return;
          } while (null !== b);
          throw Error(p(171));
        }
        if (1 === a.tag) {
          var c = a.type;
          if (Zf(c)) return bg(a, c, b);
        }
        return b;
      }
      function el(a, b, c, d, e, f, g, h, k) {
        a = bl(c, d, true, a, e, f, g, h, k);
        a.context = dl(null);
        c = a.current;
        d = R();
        e = yi(c);
        f = mh(d, e);
        f.callback = void 0 !== b && null !== b ? b : null;
        nh(c, f, e);
        a.current.lanes = e;
        Ac(a, e, d);
        Dk(a, d);
        return a;
      }
      function fl(a, b, c, d) {
        var e = b.current, f = R(), g = yi(e);
        c = dl(c);
        null === b.context ? b.context = c : b.pendingContext = c;
        b = mh(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        a = nh(e, b, g);
        null !== a && (gi(a, e, g, f), oh(a, e, g));
        return g;
      }
      function gl(a) {
        a = a.current;
        if (!a.child) return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function hl(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function il(a, b) {
        hl(a, b);
        (a = a.alternate) && hl(a, b);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a) {
        console.error(a);
      };
      function ll(a) {
        this._internalRoot = a;
      }
      ml.prototype.render = ll.prototype.render = function(a) {
        var b = this._internalRoot;
        if (null === b) throw Error(p(409));
        fl(a, b, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a = this._internalRoot;
        if (null !== a) {
          this._internalRoot = null;
          var b = a.containerInfo;
          Rk(function() {
            fl(null, a, null, null);
          });
          b[uf] = null;
        }
      };
      function ml(a) {
        this._internalRoot = a;
      }
      ml.prototype.unstable_scheduleHydration = function(a) {
        if (a) {
          var b = Hc();
          a = { blockedOn: null, target: a, priority: b };
          for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
          Qc.splice(c, 0, a);
          0 === c && Vc(a);
        }
      };
      function nl(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
      }
      function ol(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function pl() {
      }
      function ql(a, b, c, d, e) {
        if (e) {
          if ("function" === typeof d) {
            var f = d;
            d = function() {
              var a2 = gl(g);
              f.call(a2);
            };
          }
          var g = el(b, d, a, 0, null, false, false, "", pl);
          a._reactRootContainer = g;
          a[uf] = g.current;
          sf(8 === a.nodeType ? a.parentNode : a);
          Rk();
          return g;
        }
        for (; e = a.lastChild; ) a.removeChild(e);
        if ("function" === typeof d) {
          var h = d;
          d = function() {
            var a2 = gl(k);
            h.call(a2);
          };
        }
        var k = bl(a, 0, false, null, null, false, false, "", pl);
        a._reactRootContainer = k;
        a[uf] = k.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk(function() {
          fl(b, k, c, d);
        });
        return k;
      }
      function rl(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = gl(g);
              h.call(a2);
            };
          }
          fl(b, g, a, e);
        } else g = ql(c, b, a, e, d);
        return gl(g);
      }
      Ec = function(a) {
        switch (a.tag) {
          case 3:
            var b = a.stateNode;
            if (b.current.memoizedState.isDehydrated) {
              var c = tc(b.pendingLanes);
              0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b2 = ih(a, 1);
              if (null !== b2) {
                var c2 = R();
                gi(b2, a, 1, c2);
              }
            }), il(a, 1);
        }
      };
      Fc = function(a) {
        if (13 === a.tag) {
          var b = ih(a, 134217728);
          if (null !== b) {
            var c = R();
            gi(b, a, 134217728, c);
          }
          il(a, 134217728);
        }
      };
      Gc = function(a) {
        if (13 === a.tag) {
          var b = yi(a), c = ih(a, b);
          if (null !== c) {
            var d = R();
            gi(c, a, b, d);
          }
          il(a, b);
        }
      };
      Hc = function() {
        return C;
      };
      Ic = function(a, b) {
        var c = C;
        try {
          return C = a, b();
        } finally {
          C = c;
        }
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            bb(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; ) c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e) throw Error(p(90));
                  Wa(d);
                  bb(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = Zb(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber) try {
          kc = vl.inject(ul), lc = vl;
        } catch (a) {
        }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b)) throw Error(p(200));
        return cl(a, b, null, c);
      };
      exports.createRoot = function(a, b) {
        if (!nl(a)) throw Error(p(299));
        var c = false, d = "", e = kl;
        null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
        b = bl(a, 1, false, null, null, c, false, d, e);
        a[uf] = b.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        return new ll(b);
      };
      exports.findDOMNode = function(a) {
        if (null == a) return null;
        if (1 === a.nodeType) return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render) throw Error(p(188));
          a = Object.keys(a).join(",");
          throw Error(p(268, a));
        }
        a = Zb(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a) {
        return Rk(a);
      };
      exports.hydrate = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, true, c);
      };
      exports.hydrateRoot = function(a, b, c) {
        if (!nl(a)) throw Error(p(405));
        var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
        null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
        b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
        a[uf] = b.current;
        sf(a);
        if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
          c,
          e
        );
        return new ml(b);
      };
      exports.render = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!ol(a)) throw Error(p(40));
        return a._reactRootContainer ? (Rk(function() {
          rl(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!ol(c)) throw Error(p(200));
        if (null == a || void 0 === a._reactInternals) throw Error(p(38));
        return rl(a, b, c, false, d);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m = require_react_dom();
      if (true) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // src/web/index.tsx
  var import_react8 = __toESM(require_react());
  var import_client = __toESM(require_client());

  // src/web/components/App.tsx
  var import_react7 = __toESM(require_react());

  // src/web/components/ConfigProvider.tsx
  var import_react = __toESM(require_react());
  var ConfigProvider = ({ config, onSave }) => {
    const [editMode, setEditMode] = (0, import_react.useState)(false);
    const [localConfig, setLocalConfig] = (0, import_react.useState)(config);
    const handleSave = () => {
      onSave(localConfig);
      setEditMode(false);
    };
    const handleCancel = () => {
      setLocalConfig(config);
      setEditMode(false);
    };
    return /* @__PURE__ */ import_react.default.createElement("div", { className: "card" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "card-header" }, /* @__PURE__ */ import_react.default.createElement("h2", null, "Global Configuration"), /* @__PURE__ */ import_react.default.createElement("p", null, "Configure global settings for the Claude Code Router")), /* @__PURE__ */ import_react.default.createElement("div", { className: "card-content" }, !editMode ? /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "form-label" }, "API Key"), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-input", style: { background: "#f8f9fa" } }, config.APIKEY ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "Not set")), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "form-label" }, "Host"), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-input", style: { background: "#f8f9fa" } }, config.HOST)), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "form-label" }, "API Timeout (ms)"), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-input", style: { background: "#f8f9fa" } }, config.API_TIMEOUT_MS ? config.API_TIMEOUT_MS.toLocaleString() : "600,000"))), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        className: "btn btn-primary",
        onClick: () => setEditMode(true)
      },
      "\u270F\uFE0F Edit Configuration"
    )) : /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "form-label" }, "API Key"), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "password",
        className: "form-input",
        value: localConfig.APIKEY,
        onChange: (e) => setLocalConfig({ ...localConfig, APIKEY: e.target.value }),
        placeholder: "Enter API key for authentication"
      }
    ), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-help" }, "This key is used to authenticate requests to the router API")), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "form-label" }, "Host"), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "text",
        className: "form-input",
        value: localConfig.HOST,
        onChange: (e) => setLocalConfig({ ...localConfig, HOST: e.target.value }),
        placeholder: "0.0.0.0"
      }
    ), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-help" }, "Host address to bind the server to (use 127.0.0.1 for local only)")), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react.default.createElement("label", { className: "form-label" }, "API Timeout (ms)"), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "number",
        className: "form-input",
        min: "1000",
        max: "3600000",
        value: localConfig.API_TIMEOUT_MS,
        onChange: (e) => setLocalConfig({ ...localConfig, API_TIMEOUT_MS: parseInt(e.target.value) || 6e5 })
      }
    ), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-help" }, "Maximum time to wait for API responses (1000-3600000 ms)"))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: "1rem", marginTop: "1rem" } }, /* @__PURE__ */ import_react.default.createElement("button", { className: "btn btn-success", onClick: handleSave }, "\u{1F4BE} Save Changes"), /* @__PURE__ */ import_react.default.createElement("button", { className: "btn btn-secondary", onClick: handleCancel }, "\u274C Cancel")))));
  };

  // src/web/components/ProviderManager.tsx
  var import_react3 = __toESM(require_react());

  // src/web/components/ProviderTemplates.tsx
  var import_react2 = __toESM(require_react());
  var templates = {
    openrouter: {
      name: "openrouter",
      api_base_url: "https://openrouter.ai/api/v1/chat/completions",
      api_key: "",
      models: [
        "google/gemini-2.5-pro-preview",
        "anthropic/claude-sonnet-4",
        "anthropic/claude-3.5-sonnet",
        "anthropic/claude-3.7-sonnet:thinking",
        "openai/gpt-4o",
        "openai/gpt-4o-mini",
        "openai/o1-preview",
        "openai/o1-mini",
        "deepseek/deepseek-chat",
        "deepseek/deepseek-reasoner",
        "meta-llama/llama-3.3-70b-instruct",
        "meta-llama/llama-3.2-90b-vision-instruct",
        "google/gemini-flash-1.5-8b",
        "x-ai/grok-2-vision-1212",
        "qwen/qwen-2.5-72b-instruct",
        "mistralai/mistral-large",
        "anthropic/claude-3-haiku",
        "cohere/command-r-plus"
      ],
      transformer: {
        use: ["openrouter"]
      }
    },
    ollama: {
      name: "ollama",
      api_base_url: "http://localhost:11434/v1/chat/completions",
      api_key: "ollama",
      models: [
        "qwen2.5-coder:latest",
        "llama3.1:8b",
        "llama3.1:70b",
        "codellama:latest",
        "deepseek-coder:latest",
        "phi3:latest"
      ],
      transformer: {
        use: []
      }
    },
    gemini: {
      name: "gemini",
      api_base_url: "https://generativelanguage.googleapis.com/v1beta/models/",
      api_key: "",
      models: [
        "gemini-2.5-flash",
        "gemini-2.5-pro",
        "gemini-1.5-pro",
        "gemini-1.5-flash"
      ],
      transformer: {
        use: ["gemini"]
      }
    },
    deepseek: {
      name: "deepseek",
      api_base_url: "https://api.deepseek.com/chat/completions",
      api_key: "",
      models: [
        "deepseek-chat",
        "deepseek-reasoner"
      ],
      transformer: {
        use: ["deepseek"],
        "deepseek-chat": {
          use: ["tooluse"]
        }
      }
    },
    moonshot: {
      name: "moonshot",
      api_base_url: "https://api.moonshot.cn/v1/chat/completions",
      api_key: "",
      models: [
        "moonshot-v1-8k",
        "moonshot-v1-32k",
        "moonshot-v1-128k"
      ],
      transformer: {
        use: []
      }
    },
    "z.ai": {
      name: "z.ai",
      api_base_url: "https://api.z.ai/v1/chat/completions",
      api_key: "",
      models: [
        "z1-preview"
      ],
      transformer: {
        use: []
      }
    },
    volcengine: {
      name: "volcengine",
      api_base_url: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
      api_key: "",
      models: [
        "deepseek-v3-250324",
        "deepseek-r1-250528"
      ],
      transformer: {
        use: ["deepseek"]
      }
    },
    siliconflow: {
      name: "siliconflow",
      api_base_url: "https://api.siliconflow.cn/v1/chat/completions",
      api_key: "",
      models: [
        "moonshotai/Kimi-K2-Instruct",
        "Qwen/Qwen2.5-72B-Instruct",
        "deepseek-ai/DeepSeek-V2.5"
      ],
      transformer: {
        use: [
          ["maxtoken", { max_tokens: 16384 }]
        ]
      }
    },
    modelscope: {
      name: "modelscope",
      api_base_url: "https://api-inference.modelscope.cn/v1/chat/completions",
      api_key: "",
      models: [
        "Qwen/Qwen3-Coder-480B-A35B-Instruct",
        "Qwen/Qwen3-235B-A22B-Thinking-2507"
      ],
      transformer: {
        use: [
          ["maxtoken", { max_tokens: 65536 }],
          "enhancetool"
        ],
        "Qwen/Qwen3-235B-A22B-Thinking-2507": {
          use: ["reasoning"]
        }
      }
    },
    dashscope: {
      name: "dashscope",
      api_base_url: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      api_key: "",
      models: [
        "qwen3-coder-plus",
        "qwen-max",
        "qwen-plus"
      ],
      transformer: {
        use: [
          ["maxtoken", { max_tokens: 65536 }],
          "enhancetool"
        ]
      }
    },
    openai: {
      name: "openai",
      api_base_url: "https://api.openai.com/v1/chat/completions",
      api_key: "",
      models: [
        "gpt-4o",
        "gpt-4o-mini",
        "gpt-4-turbo",
        "gpt-3.5-turbo",
        "o1-preview",
        "o1-mini"
      ],
      transformer: {
        use: []
      }
    },
    anthropic: {
      name: "anthropic",
      api_base_url: "https://api.anthropic.com/v1/messages",
      api_key: "",
      models: [
        "claude-3-5-sonnet-20241022",
        "claude-3-5-haiku-20241022",
        "claude-3-opus-20240229"
      ],
      transformer: {
        use: ["anthropic"]
      }
    },
    "local-tgi": {
      name: "local-tgi",
      api_base_url: "http://localhost:8080/v1/chat/completions",
      api_key: "",
      models: [
        "tgi-model"
      ],
      transformer: {
        use: []
      }
    },
    "openai-compatible": {
      name: "custom-openai-compatible",
      api_base_url: "http://localhost:8000/v1/chat/completions",
      api_key: "",
      models: [
        "custom-model"
      ],
      transformer: {
        use: []
      }
    }
  };
  var ProviderTemplates = ({ onSelect }) => {
    const [filter, setFilter] = import_react2.default.useState("all");
    const [search, setSearch] = import_react2.default.useState("");
    const getTemplateMetadata = (key, template) => ({
      ...template,
      displayName: getDisplayName(key),
      description: getDescription(key),
      icon: getIcon(key),
      category: getCategory(key),
      popularity: getPopularity(key),
      difficulty: getDifficulty(key),
      features: getFeatures(key)
    });
    const templateEntries = Object.entries(templates).map(([key, template]) => ({
      key,
      ...getTemplateMetadata(key, template)
    }));
    const filteredTemplates = templateEntries.filter((template) => {
      const matchesSearch = search === "" || template.displayName.toLowerCase().includes(search.toLowerCase()) || template.description.toLowerCase().includes(search.toLowerCase()) || template.features.some((feature) => feature.toLowerCase().includes(search.toLowerCase()));
      const matchesFilter = filter === "all" || filter === "cloud" && ["OpenAI", "Anthropic", "Google", "Multi-Provider"].includes(template.category) || filter === "local" && template.category === "Local" || filter === "enterprise" && ["ByteDance", "Alibaba"].includes(template.category);
      return matchesSearch && matchesFilter;
    }).sort((a, b) => b.popularity - a.popularity);
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: "provider-templates" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "template-header" }, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "template-title" }, "Quick Setup"), /* @__PURE__ */ import_react2.default.createElement("p", { className: "template-subtitle" }, "Choose from popular LLM providers to get started quickly"), /* @__PURE__ */ import_react2.default.createElement("div", { style: { display: "flex", gap: "1rem", alignItems: "center", marginTop: "1.5rem", flexWrap: "wrap" } }, /* @__PURE__ */ import_react2.default.createElement("div", { style: { flex: "1", minWidth: "250px" } }, /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "text",
        className: "form-input",
        placeholder: "Search providers, features, or descriptions...",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        style: { margin: 0 }
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", { className: "dropdown" }, /* @__PURE__ */ import_react2.default.createElement(
      "select",
      {
        className: "form-select",
        value: filter,
        onChange: (e) => setFilter(e.target.value),
        style: { margin: 0, minWidth: "150px" }
      },
      /* @__PURE__ */ import_react2.default.createElement("option", { value: "all" }, "All Providers"),
      /* @__PURE__ */ import_react2.default.createElement("option", { value: "cloud" }, "Cloud Services"),
      /* @__PURE__ */ import_react2.default.createElement("option", { value: "local" }, "Local Setup"),
      /* @__PURE__ */ import_react2.default.createElement("option", { value: "enterprise" }, "Enterprise")
    ))), /* @__PURE__ */ import_react2.default.createElement("div", { style: { marginTop: "1rem", fontSize: "0.875rem", color: "var(--gray-600)" } }, "Showing ", filteredTemplates.length, " of ", templateEntries.length, " providers", search && ` matching "${search}"`)), filteredTemplates.length === 0 ? /* @__PURE__ */ import_react2.default.createElement("div", { className: "empty-state-enhanced" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "empty-state-icon" }, "\u{1F50D}"), /* @__PURE__ */ import_react2.default.createElement("h3", { className: "empty-state-title" }, "No providers found"), /* @__PURE__ */ import_react2.default.createElement("p", { className: "empty-state-description" }, search ? `No providers match your search for "${search}". Try a different search term or clear the filter.` : 'No providers match the selected filter. Try selecting "All Providers" to see all options.'), /* @__PURE__ */ import_react2.default.createElement("button", { className: "empty-state-action", onClick: () => {
      setSearch("");
      setFilter("all");
    } }, /* @__PURE__ */ import_react2.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react2.default.createElement("path", { d: "M3 6h18l-2 13H5L3 6z" }), /* @__PURE__ */ import_react2.default.createElement("path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })), "Clear Filters")) : /* @__PURE__ */ import_react2.default.createElement("div", { className: "grid grid-cols-3" }, filteredTemplates.map((template) => {
      return /* @__PURE__ */ import_react2.default.createElement(
        "div",
        {
          key: template.key,
          className: "provider-template-card tooltip",
          "data-tooltip": `${template.features.join(", ")}`,
          onClick: () => onSelect({
            name: template.name,
            api_base_url: template.api_base_url,
            api_key: template.api_key,
            models: template.models,
            transformer: template.transformer
          })
        },
        /* @__PURE__ */ import_react2.default.createElement("div", { className: "template-card-header" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "template-icon" }, template.icon), /* @__PURE__ */ import_react2.default.createElement("div", { className: "template-category" }, template.category)),
        /* @__PURE__ */ import_react2.default.createElement("div", { className: "template-card-content" }, /* @__PURE__ */ import_react2.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" } }, /* @__PURE__ */ import_react2.default.createElement("h4", { className: "template-name" }, template.displayName), /* @__PURE__ */ import_react2.default.createElement("div", { className: `badge ${template.difficulty === "easy" ? "badge-success" : template.difficulty === "medium" ? "badge-warning" : "badge-error"}`, style: { fontSize: "0.7rem" } }, template.difficulty.toUpperCase())), /* @__PURE__ */ import_react2.default.createElement("p", { className: "template-description" }, template.description), /* @__PURE__ */ import_react2.default.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.25rem", margin: "0.5rem 0" } }, template.features.slice(0, 3).map((feature, i) => /* @__PURE__ */ import_react2.default.createElement("span", { key: i, className: "badge badge-primary", style: { fontSize: "0.65rem", padding: "0.1rem 0.3rem" } }, feature)), template.features.length > 3 && /* @__PURE__ */ import_react2.default.createElement("span", { className: "badge", style: { fontSize: "0.65rem", padding: "0.1rem 0.3rem", background: "var(--gray-200)", color: "var(--gray-600)" } }, "+", template.features.length - 3)), /* @__PURE__ */ import_react2.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" } }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "template-models-count" }, template.models.length, " model", template.models.length !== 1 ? "s" : ""), /* @__PURE__ */ import_react2.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.1rem" } }, [...Array(5)].map((_, i) => /* @__PURE__ */ import_react2.default.createElement("svg", { key: i, width: "12", height: "12", viewBox: "0 0 24 24", fill: i < template.popularity ? "var(--warning-500)" : "var(--gray-300)", stroke: "none" }, /* @__PURE__ */ import_react2.default.createElement("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })))))),
        /* @__PURE__ */ import_react2.default.createElement("div", { className: "template-card-footer" }, /* @__PURE__ */ import_react2.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react2.default.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ import_react2.default.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "16" }), /* @__PURE__ */ import_react2.default.createElement("line", { x1: "8", y1: "12", x2: "16", y2: "12" })), "Add Provider")
      );
    })));
  };
  function getDisplayName(key) {
    const names = {
      openrouter: "OpenRouter",
      ollama: "Ollama",
      gemini: "Google Gemini",
      deepseek: "DeepSeek",
      moonshot: "Moonshot AI",
      "z.ai": "Z.ai",
      volcengine: "VolcEngine",
      siliconflow: "SiliconFlow",
      modelscope: "ModelScope",
      dashscope: "DashScope",
      openai: "OpenAI",
      anthropic: "Anthropic",
      "local-tgi": "Local TGI",
      "openai-compatible": "Custom API"
    };
    return names[key] || key;
  }
  function getDescription(key) {
    const descriptions = {
      openrouter: "Access multiple models through OpenRouter",
      ollama: "Local models with Ollama",
      gemini: "Google's Gemini models",
      deepseek: "DeepSeek reasoning models",
      moonshot: "Moonshot AI models",
      "z.ai": "Z.ai preview models",
      volcengine: "ByteDance VolcEngine",
      siliconflow: "SiliconFlow API",
      modelscope: "Alibaba ModelScope",
      dashscope: "Alibaba DashScope",
      openai: "OpenAI GPT models",
      anthropic: "Anthropic Claude models",
      "local-tgi": "Text Generation Inference",
      "openai-compatible": "Custom OpenAI-compatible API"
    };
    return descriptions[key] || "Custom provider configuration";
  }
  function getIcon(key) {
    const icons = {
      openrouter: "\u{1F500}",
      ollama: "\u{1F999}",
      gemini: "\u{1F48E}",
      deepseek: "\u{1F9E0}",
      moonshot: "\u{1F680}",
      "z.ai": "\u26A1",
      volcengine: "\u{1F30B}",
      siliconflow: "\u2699\uFE0F",
      modelscope: "\u{1F52C}",
      dashscope: "\u{1F4CA}",
      openai: "\u{1F916}",
      anthropic: "\u{1F3AD}",
      "local-tgi": "\u{1F5A5}\uFE0F",
      "openai-compatible": "\u{1F527}"
    };
    return icons[key] || "\u{1F527}";
  }
  function getCategory(key) {
    const categories = {
      openrouter: "Multi-Provider",
      ollama: "Local",
      gemini: "Google",
      deepseek: "DeepSeek",
      moonshot: "Moonshot",
      "z.ai": "Z.ai",
      volcengine: "ByteDance",
      siliconflow: "SiliconFlow",
      modelscope: "Alibaba",
      dashscope: "Alibaba",
      openai: "OpenAI",
      anthropic: "Anthropic",
      "local-tgi": "Local",
      "openai-compatible": "Custom"
    };
    return categories[key] || "Custom";
  }
  function getPopularity(key) {
    const popularity = {
      openrouter: 5,
      openai: 5,
      anthropic: 5,
      gemini: 4,
      ollama: 4,
      deepseek: 4,
      moonshot: 3,
      "z.ai": 3,
      dashscope: 3,
      volcengine: 3,
      siliconflow: 2,
      modelscope: 2,
      "local-tgi": 2,
      "openai-compatible": 1
    };
    return popularity[key] || 1;
  }
  function getDifficulty(key) {
    const difficulty = {
      openrouter: "easy",
      openai: "easy",
      anthropic: "easy",
      gemini: "medium",
      ollama: "medium",
      deepseek: "easy",
      moonshot: "easy",
      "z.ai": "medium",
      dashscope: "medium",
      volcengine: "advanced",
      siliconflow: "medium",
      modelscope: "advanced",
      "local-tgi": "advanced",
      "openai-compatible": "advanced"
    };
    return difficulty[key] || "medium";
  }
  function getFeatures(key) {
    const features = {
      openrouter: ["Multiple Models", "Easy Setup", "Cost Effective", "High Availability"],
      openai: ["GPT Models", "Reliable", "Well Documented", "Function Calling"],
      anthropic: ["Claude Models", "Safety Focused", "Long Context", "Constitutional AI"],
      gemini: ["Multimodal", "Fast", "Google Integration", "Free Tier"],
      ollama: ["Local Privacy", "No API Keys", "Custom Models", "Offline Capable"],
      deepseek: ["Reasoning Models", "Code Generation", "Mathematics", "Research Focus"],
      moonshot: ["Chinese Models", "Long Context", "Competitive Pricing"],
      "z.ai": ["Preview Access", "Advanced Reasoning", "Research Models"],
      dashscope: ["Alibaba Cloud", "Chinese Market", "Enterprise Features"],
      volcengine: ["ByteDance Models", "Asia Pacific", "High Performance"],
      siliconflow: ["Multi-Model Hub", "Cost Effective", "Asian Models"],
      modelscope: ["Research Models", "Open Source", "Academic Use"],
      "local-tgi": ["Self Hosted", "Full Control", "Custom Hardware"],
      "openai-compatible": ["Custom API", "Flexible", "Self Managed"]
    };
    return features[key] || ["Custom Setup"];
  }

  // src/web/components/ProviderManager.tsx
  var ProviderManager = ({ config, onSave }) => {
    const [showAddForm, setShowAddForm] = (0, import_react3.useState)(false);
    const [editingProvider, setEditingProvider] = (0, import_react3.useState)(null);
    const [providerStatus, setProviderStatus] = (0, import_react3.useState)({});
    const addProvider = (provider) => {
      const newConfig = {
        ...config,
        Providers: [...config.Providers, provider]
      };
      onSave(newConfig);
      setShowAddForm(false);
    };
    const updateProvider = (index, provider) => {
      const newProviders = [...config.Providers];
      newProviders[index] = provider;
      const newConfig = {
        ...config,
        Providers: newProviders
      };
      onSave(newConfig);
      setEditingProvider(null);
    };
    const deleteProvider = (index) => {
      if (confirm("Are you sure you want to delete this provider?")) {
        const newProviders = config.Providers.filter((_, i) => i !== index);
        const newConfig = {
          ...config,
          Providers: newProviders
        };
        onSave(newConfig);
      }
    };
    const testProvider = async (provider) => {
      setProviderStatus((prev) => ({ ...prev, [provider.name]: "testing" }));
      try {
        const response = await fetch(window.location.origin + "/api/test-provider", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider })
        });
        if (!response.ok) {
          console.error(`Test provider error: ${response.status} ${response.statusText}`);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const result = await response.json();
        setProviderStatus((prev) => ({
          ...prev,
          [provider.name]: result.success ? "online" : "offline"
        }));
      } catch (error) {
        console.error("Provider test failed:", error);
        setProviderStatus((prev) => ({ ...prev, [provider.name]: "offline" }));
      }
    };
    const getStatusIndicator = (providerName) => {
      const status = providerStatus[providerName];
      switch (status) {
        case "testing":
          return /* @__PURE__ */ import_react3.default.createElement("span", { className: "status-indicator status-testing" }, "\u{1F504} Testing...");
        case "online":
          return /* @__PURE__ */ import_react3.default.createElement("span", { className: "status-indicator status-online" }, "\u2705 Online");
        case "offline":
          return /* @__PURE__ */ import_react3.default.createElement("span", { className: "status-indicator status-offline" }, "\u274C Offline");
        default:
          return null;
      }
    };
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: "card" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "card-header" }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h2", null, "Provider Management"), /* @__PURE__ */ import_react3.default.createElement("p", null, "Configure LLM providers and their models")), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        className: "btn btn-primary",
        onClick: () => setShowAddForm(true)
      },
      "\u2795 Add Provider"
    ))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "card-content" }, config.Providers.length === 0 ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "empty-state-enhanced" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "empty-state-icon" }, "\u{1F916}"), /* @__PURE__ */ import_react3.default.createElement("h3", { className: "empty-state-title" }, "No providers configured"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "empty-state-description" }, "Get started by adding your first LLM provider. Choose from popular services like OpenAI, Anthropic, or set up your own custom endpoint."), /* @__PURE__ */ import_react3.default.createElement("button", { className: "empty-state-action", onClick: () => setShowAddForm(true) }, /* @__PURE__ */ import_react3.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react3.default.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ import_react3.default.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "16" }), /* @__PURE__ */ import_react3.default.createElement("line", { x1: "8", y1: "12", x2: "16", y2: "12" })), "Add Your First Provider")) : /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-list stagger-animation" }, config.Providers.map((provider, index) => /* @__PURE__ */ import_react3.default.createElement("div", { key: index, className: "provider-item" }, editingProvider === provider.name ? /* @__PURE__ */ import_react3.default.createElement(
      ProviderForm,
      {
        provider,
        onSave: (p) => updateProvider(index, p),
        onCancel: () => setEditingProvider(null)
      }
    ) : /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-header" }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "1rem" } }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "provider-name" }, provider.name), getStatusIndicator(provider.name)), /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-actions" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        className: "btn btn-secondary btn-small",
        onClick: () => testProvider(provider),
        disabled: providerStatus[provider.name] === "testing"
      },
      "\u{1F9EA} Test"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        className: "btn btn-secondary btn-small",
        onClick: () => setEditingProvider(provider.name)
      },
      "\u270F\uFE0F Edit"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        className: "btn btn-danger btn-small",
        onClick: () => deleteProvider(index)
      },
      "\u{1F5D1}\uFE0F Delete"
    ))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-details" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-detail" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-detail-label" }, "API URL"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-detail-value" }, provider.api_base_url)), /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-detail" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-detail-label" }, "API Key"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-detail-value" }, provider.api_key ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "Not set")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-detail" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-detail-label" }, "Models (", provider.models.length, ")"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "provider-models" }, provider.models.map((model, i) => /* @__PURE__ */ import_react3.default.createElement("span", { key: i, className: "model-tag" }, model))))))))), showAddForm && /* @__PURE__ */ import_react3.default.createElement("div", { className: "card", style: { marginTop: "2rem" } }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "card-header" }, /* @__PURE__ */ import_react3.default.createElement("h3", null, "Add New Provider")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "card-content" }, /* @__PURE__ */ import_react3.default.createElement(ProviderTemplates, { onSelect: addProvider }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { margin: "2rem 0", textAlign: "center", color: "#718096" } }, "\u2014 OR \u2014"), /* @__PURE__ */ import_react3.default.createElement(
      ProviderForm,
      {
        onSave: addProvider,
        onCancel: () => setShowAddForm(false)
      }
    )))));
  };
  var ProviderForm = ({ provider, onSave, onCancel }) => {
    const [formData, setFormData] = (0, import_react3.useState)(provider || {
      name: "",
      api_base_url: "",
      api_key: "",
      models: [],
      transformer: { use: [] }
    });
    const [modelsText, setModelsText] = (0, import_react3.useState)(
      provider ? provider.models.join("\n") : ""
    );
    const [errors, setErrors] = (0, import_react3.useState)({});
    const [touched, setTouched] = (0, import_react3.useState)({});
    const [isValidating, setIsValidating] = (0, import_react3.useState)(false);
    const [showAdvanced, setShowAdvanced] = (0, import_react3.useState)(false);
    const [validationProgress, setValidationProgress] = (0, import_react3.useState)(0);
    const validateField = (name, value) => {
      const fieldErrors = [];
      switch (name) {
        case "name":
          if (!value.trim()) {
            fieldErrors.push("Provider name is required");
          } else if (value.length < 2) {
            fieldErrors.push("Provider name must be at least 2 characters");
          } else if (!/^[a-zA-Z0-9._-]+$/.test(value)) {
            fieldErrors.push("Provider name can only contain letters, numbers, dots, hyphens, and underscores");
          }
          break;
        case "api_base_url":
          if (!value.trim()) {
            fieldErrors.push("API base URL is required");
          } else {
            try {
              new URL(value);
              if (!value.startsWith("http://") && !value.startsWith("https://")) {
                fieldErrors.push("URL must start with http:// or https://");
              }
            } catch {
              fieldErrors.push("Please enter a valid URL");
            }
          }
          break;
        case "api_key":
          if (value && value.length < 10) {
            fieldErrors.push("API key seems too short (minimum 10 characters)");
          }
          break;
      }
      return fieldErrors;
    };
    const validateModels = (modelsText2) => {
      const models = modelsText2.split("\n").filter((m) => m.trim()).map((m) => m.trim());
      const fieldErrors = [];
      if (models.length === 0) {
        fieldErrors.push("At least one model is required");
      } else {
        models.forEach((model, index) => {
          if (model.length < 2) {
            fieldErrors.push(`Model ${index + 1}: Name too short (minimum 2 characters)`);
          }
        });
        const duplicates = models.filter((model, index) => models.indexOf(model) !== index);
        if (duplicates.length > 0) {
          fieldErrors.push(`Duplicate models found: ${duplicates.join(", ")}`);
        }
      }
      return fieldErrors;
    };
    const handleFieldChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
      if (touched[name]) {
        const fieldErrors = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
      }
    };
    const handleFieldBlur = (name, value) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const fieldErrors = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
    };
    const handleModelsChange = (value) => {
      setModelsText(value);
      if (touched.models) {
        const fieldErrors = validateModels(value);
        setErrors((prev) => ({ ...prev, models: fieldErrors }));
      }
    };
    const handleModelsBlur = () => {
      setTouched((prev) => ({ ...prev, models: true }));
      const fieldErrors = validateModels(modelsText);
      setErrors((prev) => ({ ...prev, models: fieldErrors }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsValidating(true);
      setValidationProgress(0);
      setTouched({
        name: true,
        api_base_url: true,
        api_key: true,
        models: true
      });
      const allErrors = {
        name: validateField("name", formData.name),
        api_base_url: validateField("api_base_url", formData.api_base_url),
        api_key: validateField("api_key", formData.api_key),
        models: validateModels(modelsText)
      };
      setErrors(allErrors);
      setValidationProgress(25);
      const hasErrors = Object.values(allErrors).some((fieldErrors) => fieldErrors.length > 0);
      if (hasErrors) {
        setIsValidating(false);
        return;
      }
      const models = modelsText.split("\n").filter((m) => m.trim()).map((m) => m.trim());
      const finalProvider = { ...formData, models };
      setValidationProgress(50);
      try {
        const response = await fetch(window.location.origin + "/api/validate-provider", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider: finalProvider })
        });
        setValidationProgress(75);
        const result = await response.json();
        setValidationProgress(100);
        if (result.valid) {
          onSave(finalProvider);
        } else {
          setErrors({ general: result.errors || ["Validation failed"] });
        }
      } catch (error) {
        setErrors({ general: ["Network error. Please try again."] });
      } finally {
        setIsValidating(false);
        setTimeout(() => setValidationProgress(0), 1e3);
      }
    };
    const getFieldError = (fieldName) => {
      return touched[fieldName] && errors[fieldName] && errors[fieldName].length > 0 ? errors[fieldName][0] : "";
    };
    const hasFieldError = (fieldName) => {
      return touched[fieldName] && errors[fieldName] && errors[fieldName].length > 0;
    };
    const isFieldValid = (fieldName) => {
      return touched[fieldName] && (!errors[fieldName] || errors[fieldName].length === 0);
    };
    return /* @__PURE__ */ import_react3.default.createElement("form", { onSubmit: handleSubmit }, isValidating && /* @__PURE__ */ import_react3.default.createElement("div", { className: "progress-steps" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: `progress-step ${validationProgress >= 25 ? "completed" : validationProgress > 0 ? "active" : ""}` }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "progress-step-circle" }, "1"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "progress-step-label" }, "Validate Form")), /* @__PURE__ */ import_react3.default.createElement("div", { className: `progress-step ${validationProgress >= 50 ? "completed" : validationProgress >= 25 ? "active" : ""}` }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "progress-step-circle" }, "2"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "progress-step-label" }, "Process Data")), /* @__PURE__ */ import_react3.default.createElement("div", { className: `progress-step ${validationProgress >= 75 ? "completed" : validationProgress >= 50 ? "active" : ""}` }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "progress-step-circle" }, "3"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "progress-step-label" }, "Server Check")), /* @__PURE__ */ import_react3.default.createElement("div", { className: `progress-step ${validationProgress >= 100 ? "completed" : validationProgress >= 75 ? "active" : ""}` }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "progress-step-circle" }, "4"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "progress-step-label" }, "Complete"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-2" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "form-label" }, "Provider Name *"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        className: `form-input ${hasFieldError("name") ? "error" : isFieldValid("name") ? "success" : ""}`,
        value: formData.name,
        onChange: (e) => handleFieldChange("name", e.target.value),
        onBlur: (e) => handleFieldBlur("name", e.target.value),
        placeholder: "e.g., openrouter, ollama, custom-provider",
        disabled: isValidating,
        autoComplete: "off"
      }
    ), hasFieldError("name") && /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-error-container" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-error-title" }, "Invalid Provider Name"), /* @__PURE__ */ import_react3.default.createElement("ul", { className: "form-error-list" }, errors.name?.map((error, i) => /* @__PURE__ */ import_react3.default.createElement("li", { key: i, className: "form-error-item" }, error)))), isFieldValid("name") && /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-help", style: { color: "var(--success-600)" } }, "\u2713 Valid provider name")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "form-label" }, "API Base URL *"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "url",
        className: `form-input ${hasFieldError("api_base_url") ? "error" : isFieldValid("api_base_url") ? "success" : ""}`,
        value: formData.api_base_url,
        onChange: (e) => handleFieldChange("api_base_url", e.target.value),
        onBlur: (e) => handleFieldBlur("api_base_url", e.target.value),
        placeholder: "https://api.provider.com/v1/chat/completions",
        disabled: isValidating,
        autoComplete: "url"
      }
    ), hasFieldError("api_base_url") && /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-error-container" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-error-title" }, "Invalid API URL"), /* @__PURE__ */ import_react3.default.createElement("ul", { className: "form-error-list" }, errors.api_base_url?.map((error, i) => /* @__PURE__ */ import_react3.default.createElement("li", { key: i, className: "form-error-item" }, error)))), isFieldValid("api_base_url") && /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-help", style: { color: "var(--success-600)" } }, "\u2713 Valid API endpoint URL"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "form-label" }, "API Key"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "password",
        className: `form-input ${hasFieldError("api_key") ? "error" : isFieldValid("api_key") ? "success" : ""}`,
        value: formData.api_key,
        onChange: (e) => handleFieldChange("api_key", e.target.value),
        onBlur: (e) => handleFieldBlur("api_key", e.target.value),
        placeholder: "Enter your API key (optional)",
        disabled: isValidating,
        autoComplete: "new-password"
      }
    ), hasFieldError("api_key") && /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-error-container" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-error-title" }, "API Key Issue"), /* @__PURE__ */ import_react3.default.createElement("ul", { className: "form-error-list" }, errors.api_key?.map((error, i) => /* @__PURE__ */ import_react3.default.createElement("li", { key: i, className: "form-error-item" }, error)))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-help" }, "Leave empty if the provider doesn't require authentication")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "form-label" }, "Models (one per line) *"), /* @__PURE__ */ import_react3.default.createElement(
      "textarea",
      {
        className: `form-textarea ${hasFieldError("models") ? "error" : isFieldValid("models") ? "success" : ""}`,
        value: modelsText,
        onChange: (e) => handleModelsChange(e.target.value),
        onBlur: handleModelsBlur,
        placeholder: "gpt-4\\ngpt-3.5-turbo\\nclaude-3-sonnet",
        rows: 5,
        disabled: isValidating
      }
    ), hasFieldError("models") && /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-error-container" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-error-title" }, "Model Configuration Issues"), /* @__PURE__ */ import_react3.default.createElement("ul", { className: "form-error-list" }, errors.models?.map((error, i) => /* @__PURE__ */ import_react3.default.createElement("li", { key: i, className: "form-error-item" }, error)))), isFieldValid("models") && /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-help", style: { color: "var(--success-600)" } }, "\u2713 ", modelsText.split("\n").filter((m) => m.trim()).length, " models configured"), !hasFieldError("models") && !isFieldValid("models") && /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-help" }, "Enter each model name on a separate line")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        type: "button",
        className: "btn btn-secondary btn-small",
        onClick: () => setShowAdvanced(!showAdvanced),
        style: { marginBottom: "1rem" }
      },
      /* @__PURE__ */ import_react3.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: {
        transform: showAdvanced ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease"
      } }, /* @__PURE__ */ import_react3.default.createElement("polyline", { points: "6,9 12,15 18,9" })),
      showAdvanced ? "Hide" : "Show",
      " Advanced Options"
    ), showAdvanced && /* @__PURE__ */ import_react3.default.createElement("div", { className: "accordion-content active" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "accordion-body" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-help", style: { marginBottom: "1rem" } }, "Advanced configuration options for transformer settings and custom parameters."), /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "form-label" }, "Transformer Settings (JSON)"), /* @__PURE__ */ import_react3.default.createElement(
      "textarea",
      {
        className: "form-textarea",
        value: JSON.stringify(formData.transformer, null, 2),
        onChange: (e) => {
          try {
            const transformer = JSON.parse(e.target.value);
            setFormData({ ...formData, transformer });
          } catch {
          }
        },
        placeholder: '{\\n  "use": ["openrouter"]\\n}',
        rows: 4,
        disabled: isValidating
      }
    ), /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-help" }, "Configure request/response transformers for this provider"))))), errors.general && errors.general.length > 0 && /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-error-container" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-error-title" }, "Server Validation Errors"), /* @__PURE__ */ import_react3.default.createElement("ul", { className: "form-error-list" }, errors.general.map((error, i) => /* @__PURE__ */ import_react3.default.createElement("li", { key: i, className: "form-error-item" }, error)))), /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", gap: "1rem", marginTop: "2rem", alignItems: "center" } }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        type: "submit",
        className: "btn btn-success",
        disabled: isValidating,
        style: { position: "relative" }
      },
      isValidating ? /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("div", { className: "spinner", style: { width: "16px", height: "16px", marginRight: "8px" } }), "Validating...") : /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, "\u{1F4BE} ", provider ? "Update" : "Add", " Provider")
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        type: "button",
        className: "btn btn-secondary",
        onClick: onCancel,
        disabled: isValidating
      },
      "\u274C Cancel"
    ), isValidating && validationProgress > 0 && /* @__PURE__ */ import_react3.default.createElement("div", { style: { flex: 1, marginLeft: "1rem" } }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "progress-bar" }, /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        className: "progress-bar-fill",
        style: { width: `${validationProgress}%` }
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-help", style: { marginTop: "0.5rem", fontSize: "0.8rem" } }, validationProgress < 25 && "Validating form fields...", validationProgress >= 25 && validationProgress < 50 && "Processing configuration...", validationProgress >= 50 && validationProgress < 75 && "Checking with server...", validationProgress >= 75 && validationProgress < 100 && "Finalizing...", validationProgress >= 100 && "Complete!"))));
  };

  // src/web/components/RouterConfiguration.tsx
  var import_react4 = __toESM(require_react());
  var RouterConfiguration = ({ config, onSave }) => {
    const [editMode, setEditMode] = (0, import_react4.useState)(false);
    const [localRouter, setLocalRouter] = (0, import_react4.useState)(config.Router);
    const [showHelp, setShowHelp] = (0, import_react4.useState)(false);
    const [unsavedChanges, setUnsavedChanges] = (0, import_react4.useState)(false);
    const getProviderOptions = () => {
      const options = [];
      config.Providers.forEach((provider) => {
        provider.models.forEach((model) => {
          options.push({
            value: `${provider.name},${model}`,
            label: `${provider.name} \u2192 ${model}`
          });
        });
      });
      return options;
    };
    const handleSave = () => {
      const newConfig = {
        ...config,
        Router: localRouter
      };
      onSave(newConfig);
      setEditMode(false);
      setUnsavedChanges(false);
    };
    const handleCancel = () => {
      if (unsavedChanges) {
        if (confirm("You have unsaved changes. Are you sure you want to cancel?")) {
          setLocalRouter(config.Router);
          setEditMode(false);
          setUnsavedChanges(false);
        }
      } else {
        setLocalRouter(config.Router);
        setEditMode(false);
      }
    };
    const handleRouterChange = (field, value) => {
      setLocalRouter({ ...localRouter, [field]: value });
      setUnsavedChanges(true);
    };
    const providerOptions = getProviderOptions();
    return /* @__PURE__ */ import_react4.default.createElement("div", { className: "card" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "card-header" }, /* @__PURE__ */ import_react4.default.createElement("h2", null, "Routing Rules"), /* @__PURE__ */ import_react4.default.createElement("p", null, "Configure intelligent routing rules for different scenarios")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "card-content" }, !editMode ? /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement("div", { className: "routing-rules stagger-animation" }, /* @__PURE__ */ import_react4.default.createElement(
      RouteCard,
      {
        title: "Default Route",
        description: "Primary model used for most requests",
        route: config.Router.default,
        icon: "\u{1F3AF}",
        isActive: !!config.Router.default
      }
    ), /* @__PURE__ */ import_react4.default.createElement(
      RouteCard,
      {
        title: "Background Route",
        description: "Faster model for background tasks (claude-3-5-haiku triggers this)",
        route: config.Router.background,
        icon: "\u26A1",
        isActive: !!config.Router.background
      }
    ), /* @__PURE__ */ import_react4.default.createElement(
      RouteCard,
      {
        title: "Thinking Route",
        description: "Reasoning model for complex thinking tasks",
        route: config.Router.think,
        icon: "\u{1F9E0}",
        isActive: !!config.Router.think
      }
    ), /* @__PURE__ */ import_react4.default.createElement(
      RouteCard,
      {
        title: "Long Context Route",
        description: `Large context model (triggers when > ${config.Router.longContextThreshold.toLocaleString()} tokens)`,
        route: config.Router.longContext,
        icon: "\u{1F4DA}",
        isActive: !!config.Router.longContext
      }
    ), /* @__PURE__ */ import_react4.default.createElement(
      RouteCard,
      {
        title: "Web Search Route",
        description: "Model optimized for web search tasks",
        route: config.Router.webSearch,
        icon: "\u{1F50D}",
        isActive: !!config.Router.webSearch
      }
    )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "card", style: { marginTop: "2rem", background: "var(--gray-50)" } }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "card-content", style: { padding: "1.5rem" } }, /* @__PURE__ */ import_react4.default.createElement("h3", { style: { marginBottom: "1rem", color: "var(--gray-800)", display: "flex", alignItems: "center", gap: "0.5rem" } }, "\u{1F4CA} Configuration Overview"), /* @__PURE__ */ import_react4.default.createElement("div", { className: "grid grid-cols-3", style: { gap: "1rem" } }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react4.default.createElement("div", { style: { fontSize: "2rem", fontWeight: "700", color: "var(--primary-600)" } }, [config.Router.default, config.Router.background, config.Router.think, config.Router.longContext, config.Router.webSearch].filter(Boolean).length), /* @__PURE__ */ import_react4.default.createElement("div", { style: { fontSize: "0.875rem", color: "var(--gray-600)" } }, "Active Routes")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react4.default.createElement("div", { style: { fontSize: "2rem", fontWeight: "700", color: "var(--success-600)" } }, config.Providers.length), /* @__PURE__ */ import_react4.default.createElement("div", { style: { fontSize: "0.875rem", color: "var(--gray-600)" } }, "Available Providers")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react4.default.createElement("div", { style: { fontSize: "2rem", fontWeight: "700", color: "var(--warning-600)" } }, config.Router.longContextThreshold.toLocaleString()), /* @__PURE__ */ import_react4.default.createElement("div", { style: { fontSize: "0.875rem", color: "var(--gray-600)" } }, "Context Threshold"))))), /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        className: "btn btn-primary attention-pulse",
        onClick: () => setEditMode(true),
        style: { marginTop: "2rem" }
      },
      "\u270F\uFE0F Edit Routing Rules"
    )) : /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement("div", { className: "grid grid-cols-2" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react4.default.createElement("label", { className: "form-label" }, "\u{1F3AF} Default Route"), /* @__PURE__ */ import_react4.default.createElement(
      "select",
      {
        className: "form-select",
        value: localRouter.default,
        onChange: (e) => handleRouterChange("default", e.target.value),
        required: true
      },
      /* @__PURE__ */ import_react4.default.createElement("option", { value: "" }, "Select a provider and model"),
      providerOptions.map((option) => /* @__PURE__ */ import_react4.default.createElement("option", { key: option.value, value: option.value }, option.label))
    ), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-help" }, "Primary model used for most requests")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react4.default.createElement("label", { className: "form-label" }, "\u26A1 Background Route"), /* @__PURE__ */ import_react4.default.createElement(
      "select",
      {
        className: "form-select",
        value: localRouter.background,
        onChange: (e) => handleRouterChange("background", e.target.value)
      },
      /* @__PURE__ */ import_react4.default.createElement("option", { value: "" }, "No background route"),
      providerOptions.map((option) => /* @__PURE__ */ import_react4.default.createElement("option", { key: option.value, value: option.value }, option.label))
    ), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-help" }, "Faster model for background tasks (auto-triggered by claude-3-5-haiku)")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react4.default.createElement("label", { className: "form-label" }, "\u{1F9E0} Thinking Route"), /* @__PURE__ */ import_react4.default.createElement(
      "select",
      {
        className: "form-select",
        value: localRouter.think,
        onChange: (e) => handleRouterChange("think", e.target.value)
      },
      /* @__PURE__ */ import_react4.default.createElement("option", { value: "" }, "No thinking route"),
      providerOptions.map((option) => /* @__PURE__ */ import_react4.default.createElement("option", { key: option.value, value: option.value }, option.label))
    ), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-help" }, "Reasoning model for complex thinking tasks")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react4.default.createElement("label", { className: "form-label" }, "\u{1F4DA} Long Context Route"), /* @__PURE__ */ import_react4.default.createElement(
      "select",
      {
        className: "form-select",
        value: localRouter.longContext,
        onChange: (e) => handleRouterChange("longContext", e.target.value)
      },
      /* @__PURE__ */ import_react4.default.createElement("option", { value: "" }, "No long context route"),
      providerOptions.map((option) => /* @__PURE__ */ import_react4.default.createElement("option", { key: option.value, value: option.value }, option.label))
    ), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-help" }, "Large context model for lengthy conversations")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react4.default.createElement("label", { className: "form-label" }, "Long Context Threshold (tokens)"), /* @__PURE__ */ import_react4.default.createElement(
      "input",
      {
        type: "number",
        className: "form-input",
        min: "1000",
        max: "1000000",
        value: localRouter.longContextThreshold,
        onChange: (e) => handleRouterChange("longContextThreshold", parseInt(e.target.value) || 6e4)
      }
    ), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-help" }, "Switch to long context model when conversation exceeds this token count")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react4.default.createElement("label", { className: "form-label" }, "\u{1F50D} Web Search Route"), /* @__PURE__ */ import_react4.default.createElement(
      "select",
      {
        className: "form-select",
        value: localRouter.webSearch,
        onChange: (e) => handleRouterChange("webSearch", e.target.value)
      },
      /* @__PURE__ */ import_react4.default.createElement("option", { value: "" }, "No web search route"),
      providerOptions.map((option) => /* @__PURE__ */ import_react4.default.createElement("option", { key: option.value, value: option.value }, option.label))
    ), /* @__PURE__ */ import_react4.default.createElement("div", { className: "form-help" }, "Model optimized for web search and research tasks"))), /* @__PURE__ */ import_react4.default.createElement("div", { style: { display: "flex", gap: "1rem", marginTop: "2rem" } }, /* @__PURE__ */ import_react4.default.createElement("button", { className: "btn btn-success", onClick: handleSave }, "\u{1F4BE} Save Routing Rules"), /* @__PURE__ */ import_react4.default.createElement("button", { className: "btn btn-secondary", onClick: handleCancel }, "\u274C Cancel"))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "accordion", style: { marginTop: "2rem" } }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "accordion-header", onClick: () => setShowHelp(!showHelp) }, /* @__PURE__ */ import_react4.default.createElement("span", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } }, "\u2139\uFE0F How Routing Works"), /* @__PURE__ */ import_react4.default.createElement("svg", { className: "accordion-chevron", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react4.default.createElement("polyline", { points: "6,9 12,15 18,9" }))), /* @__PURE__ */ import_react4.default.createElement("div", { className: `accordion-content ${showHelp ? "active" : ""}` }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "accordion-body" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "routing-info" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "routing-rule" }, /* @__PURE__ */ import_react4.default.createElement("strong", null, "\u{1F3AF} Default:"), " Used for standard requests when no special conditions are met. This should always be configured as your primary model."), /* @__PURE__ */ import_react4.default.createElement("div", { className: "routing-rule" }, /* @__PURE__ */ import_react4.default.createElement("strong", null, "\u26A1 Background:"), ' Automatically triggered when the model name contains "claude-3-5-haiku". Ideal for faster, lightweight tasks.'), /* @__PURE__ */ import_react4.default.createElement("div", { className: "routing-rule" }, /* @__PURE__ */ import_react4.default.createElement("strong", null, "\u{1F9E0} Thinking:"), " Used when the request includes thinking/reasoning parameters. Best with models optimized for complex reasoning."), /* @__PURE__ */ import_react4.default.createElement("div", { className: "routing-rule" }, /* @__PURE__ */ import_react4.default.createElement("strong", null, "\u{1F4DA} Long Context:"), " Automatically triggered when conversation exceeds the token threshold. Use models with large context windows."), /* @__PURE__ */ import_react4.default.createElement("div", { className: "routing-rule" }, /* @__PURE__ */ import_react4.default.createElement("strong", null, "\u{1F50D} Web Search:"), " Used when the request includes web_search tools. Should be a model good at processing and synthesizing web content.")), /* @__PURE__ */ import_react4.default.createElement("div", { style: { marginTop: "1.5rem", padding: "1rem", background: "var(--info-50)", borderRadius: "8px", border: "1px solid var(--info-200)" } }, /* @__PURE__ */ import_react4.default.createElement("h4", { style: { color: "var(--info-700)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" } }, "\u{1F4A1} Pro Tips"), /* @__PURE__ */ import_react4.default.createElement("ul", { style: { margin: 0, paddingLeft: "1.2rem", color: "var(--info-600)" } }, /* @__PURE__ */ import_react4.default.createElement("li", null, "Always configure a default route - it's your fallback for all requests"), /* @__PURE__ */ import_react4.default.createElement("li", null, "Use background routes for faster models to improve response times"), /* @__PURE__ */ import_react4.default.createElement("li", null, "Set thinking routes to specialized reasoning models for better complex task handling"), /* @__PURE__ */ import_react4.default.createElement("li", null, "Configure long context routes with high-capacity models for lengthy conversations")))))))));
  };
  var RouteCard = ({ title, description, route, icon, isActive = false }) => {
    return /* @__PURE__ */ import_react4.default.createElement("div", { className: "route-card tooltip clickable", "data-tooltip": route || "Not configured", style: {
      border: `2px solid ${isActive ? "var(--success-200)" : "var(--gray-200)"}`,
      borderRadius: "12px",
      padding: "1.5rem",
      background: isActive ? "var(--success-50)" : "white",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden"
    } }, /* @__PURE__ */ import_react4.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" } }, /* @__PURE__ */ import_react4.default.createElement("span", { style: { fontSize: "1.2rem" } }, icon), /* @__PURE__ */ import_react4.default.createElement("h4", { style: { fontSize: "1rem", fontWeight: "600", color: "#2d3748" } }, title)), /* @__PURE__ */ import_react4.default.createElement("p", { style: { fontSize: "0.875rem", color: "#718096", marginBottom: "0.5rem" } }, description), /* @__PURE__ */ import_react4.default.createElement("div", { style: {
      fontSize: "0.8rem",
      color: route ? "#38a169" : "#a0aec0",
      fontWeight: "500",
      padding: "0.25rem 0.5rem",
      background: route ? "#c6f6d5" : "#f7fafc",
      borderRadius: "4px",
      display: "inline-block"
    } }, route || "Not configured"));
  };
  var style = document.createElement("style");
  style.textContent = `
  .routing-rules {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .routing-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .routing-rule {
    font-size: 0.875rem;
    color: #4a5568;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .routing-rule:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    .routing-rules {
      grid-template-columns: 1fr;
    }
  }
`;
  document.head.appendChild(style);

  // src/web/components/TestingPanel.tsx
  var import_react5 = __toESM(require_react());
  var TestingPanel = ({ config }) => {
    const [testResults, setTestResults] = (0, import_react5.useState)([]);
    const [isTestingAll, setIsTestingAll] = (0, import_react5.useState)(false);
    const [selectedProvider, setSelectedProvider] = (0, import_react5.useState)("");
    const [testProgress, setTestProgress] = (0, import_react5.useState)({});
    const [showDetails, setShowDetails] = (0, import_react5.useState)({});
    const [autoRefresh, setAutoRefresh] = (0, import_react5.useState)(false);
    const testProvider = async (providerName, model) => {
      const provider = config.Providers.find((p) => p.name === providerName);
      if (!provider) return;
      const modelsToTest = model ? [model] : provider.models;
      const totalModels = modelsToTest.length;
      setTestProgress((prev) => ({
        ...prev,
        [providerName]: {
          current: 0,
          total: totalModels,
          stage: "Initializing..."
        }
      }));
      for (let i = 0; i < modelsToTest.length; i++) {
        const testModel = modelsToTest[i];
        const testId = `${providerName}-${testModel}`;
        setTestProgress((prev) => ({
          ...prev,
          [providerName]: {
            current: i,
            total: totalModels,
            stage: `Testing ${testModel}...`
          }
        }));
        setTestResults((prev) => [
          ...prev.filter((r) => `${r.provider}-${r.model}` !== testId),
          {
            provider: providerName,
            model: testModel,
            status: "testing",
            timestamp: Date.now(),
            progress: Math.round(i / totalModels * 100)
          }
        ]);
        try {
          const startTime = Date.now();
          setTestProgress((prev) => ({
            ...prev,
            [providerName]: {
              ...prev[providerName],
              stage: `Connecting to ${testModel}...`
            }
          }));
          const response = await fetch(window.location.origin + "/api/test-provider", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: {
                ...provider,
                models: [testModel]
                // Test specific model
              }
            })
          });
          const result = await response.json();
          const latency = Date.now() - startTime;
          setTestProgress((prev) => ({
            ...prev,
            [providerName]: {
              current: i + 1,
              total: totalModels,
              stage: result.success ? `\u2713 ${testModel} (${latency}ms)` : `\u2717 ${testModel} failed`
            }
          }));
          setTestResults((prev) => [
            ...prev.filter((r) => `${r.provider}-${r.model}` !== testId),
            {
              provider: providerName,
              model: testModel,
              status: result.success ? "success" : "error",
              latency,
              error: result.success ? void 0 : result.message,
              timestamp: Date.now(),
              progress: 100
            }
          ]);
        } catch (error) {
          setTestResults((prev) => [
            ...prev.filter((r) => `${r.provider}-${r.model}` !== testId),
            {
              provider: providerName,
              model: testModel,
              status: "error",
              error: error instanceof Error ? error.message : "Unknown error",
              timestamp: Date.now(),
              progress: 100
            }
          ]);
          setTestProgress((prev) => ({
            ...prev,
            [providerName]: {
              current: i + 1,
              total: totalModels,
              stage: `\u2717 ${testModel} failed`
            }
          }));
        }
        if (i < modelsToTest.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      setTestProgress((prev) => ({
        ...prev,
        [providerName]: {
          current: totalModels,
          total: totalModels,
          stage: "Testing complete"
        }
      }));
      setTimeout(() => {
        setTestProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[providerName];
          return newProgress;
        });
      }, 3e3);
    };
    const testAllProviders = async () => {
      setIsTestingAll(true);
      setTestResults([]);
      const totalProviders = config.Providers.length;
      for (let i = 0; i < config.Providers.length; i++) {
        const provider = config.Providers[i];
        setTestProgress((prev) => ({
          ...prev,
          "__global__": {
            current: i,
            total: totalProviders,
            stage: `Testing provider ${i + 1} of ${totalProviders}: ${provider.name}`
          }
        }));
        await testProvider(provider.name);
      }
      setTestProgress((prev) => ({
        ...prev,
        "__global__": {
          current: totalProviders,
          total: totalProviders,
          stage: "All providers tested successfully!"
        }
      }));
      setIsTestingAll(false);
      setTimeout(() => {
        setTestProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress["__global__"];
          return newProgress;
        });
      }, 3e3);
    };
    const clearResults = () => {
      setTestResults([]);
      setTestProgress({});
    };
    const toggleDetails = (resultId) => {
      setShowDetails((prev) => ({
        ...prev,
        [resultId]: !prev[resultId]
      }));
    };
    const exportResults = () => {
      const data = {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        results: testResults,
        summary: {
          total: testResults.length,
          successful: testResults.filter((r) => r.status === "success").length,
          failed: testResults.filter((r) => r.status === "error").length,
          averageLatency: testResults.filter((r) => r.latency).reduce((acc, r) => acc + (r.latency || 0), 0) / testResults.filter((r) => r.latency).length || 0
        }
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `provider-test-results-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    import_react5.default.useEffect(() => {
      if (!autoRefresh) return;
      const interval = setInterval(() => {
        if (!isTestingAll && selectedProvider) {
          testProvider(selectedProvider);
        }
      }, 3e4);
      return () => clearInterval(interval);
    }, [autoRefresh, selectedProvider, isTestingAll]);
    const getRouteInfo = () => {
      const routes = [];
      if (config.Router.default) routes.push({ name: "Default", route: config.Router.default, icon: "\u{1F3AF}" });
      if (config.Router.background) routes.push({ name: "Background", route: config.Router.background, icon: "\u26A1" });
      if (config.Router.think) routes.push({ name: "Thinking", route: config.Router.think, icon: "\u{1F9E0}" });
      if (config.Router.longContext) routes.push({ name: "Long Context", route: config.Router.longContext, icon: "\u{1F4DA}" });
      if (config.Router.webSearch) routes.push({ name: "Web Search", route: config.Router.webSearch, icon: "\u{1F50D}" });
      return routes;
    };
    const getStatusIcon = (status) => {
      switch (status) {
        case "success":
          return "\u2705";
        case "error":
          return "\u274C";
        case "testing":
          return "\u{1F504}";
      }
    };
    const getStatusColor = (status) => {
      switch (status) {
        case "success":
          return "#22543d";
        case "error":
          return "#742a2a";
        case "testing":
          return "#744210";
      }
    };
    const getStatusBackground = (status) => {
      switch (status) {
        case "success":
          return "#c6f6d5";
        case "error":
          return "#fed7d7";
        case "testing":
          return "#fef5e7";
      }
    };
    return /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "card" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "card-header" }, /* @__PURE__ */ import_react5.default.createElement("h2", null, "Current Routing Configuration"), /* @__PURE__ */ import_react5.default.createElement("p", null, "Overview of your configured routes")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "card-content" }, getRouteInfo().length === 0 ? /* @__PURE__ */ import_react5.default.createElement("div", { className: "empty-state-enhanced" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "empty-state-icon" }, "\u{1F4CB}"), /* @__PURE__ */ import_react5.default.createElement("h3", { className: "empty-state-title" }, "No routes configured"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "empty-state-description" }, "Set up routing rules to intelligently direct requests to different providers based on context and requirements."), /* @__PURE__ */ import_react5.default.createElement("button", { className: "empty-state-action", onClick: () => window.location.hash = "#routing" }, /* @__PURE__ */ import_react5.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react5.default.createElement("polyline", { points: "4,17 10,11 4,5" }), /* @__PURE__ */ import_react5.default.createElement("line", { x1: "12", y1: "19", x2: "20", y2: "19" })), "Configure Routing Rules")) : /* @__PURE__ */ import_react5.default.createElement("div", { className: "routing-overview stagger-animation" }, getRouteInfo().map((route, index) => /* @__PURE__ */ import_react5.default.createElement("div", { key: index, className: "route-overview-item tooltip clickable", "data-tooltip": `Route: ${route.route}` }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "route-icon" }, route.icon), /* @__PURE__ */ import_react5.default.createElement("div", { className: "route-info" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "route-name" }, route.name), /* @__PURE__ */ import_react5.default.createElement("div", { className: "route-destination" }, route.route)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "badge badge-primary" }, "Active")))))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "card" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "card-header" }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h2", null, "Provider Connection Testing"), /* @__PURE__ */ import_react5.default.createElement("p", null, "Test connectivity and latency to your configured providers")), /* @__PURE__ */ import_react5.default.createElement("div", { style: { display: "flex", gap: "1rem" } }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { display: "flex", gap: "0.5rem" } }, /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        className: "btn btn-secondary btn-small",
        onClick: exportResults,
        disabled: testResults.length === 0,
        title: "Export test results as JSON"
      },
      "\u{1F4C4} Export"
    ), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        className: `btn btn-secondary btn-small ${autoRefresh ? "attention-pulse" : ""}`,
        onClick: () => setAutoRefresh(!autoRefresh),
        title: "Auto-refresh every 30 seconds"
      },
      autoRefresh ? "\u23F8\uFE0F" : "\u{1F504}",
      " Auto"
    ), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        className: "btn btn-secondary btn-small",
        onClick: clearResults,
        disabled: testResults.length === 0
      },
      "\u{1F5D1}\uFE0F Clear"
    )), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        className: "btn btn-primary",
        onClick: testAllProviders,
        disabled: isTestingAll || config.Providers.length === 0
      },
      isTestingAll ? "\u{1F504} Testing..." : "\u{1F9EA} Test All Providers"
    )))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "card-content" }, config.Providers.length === 0 ? /* @__PURE__ */ import_react5.default.createElement("div", { className: "empty-state-enhanced" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "empty-state-icon" }, "\u{1F50C}"), /* @__PURE__ */ import_react5.default.createElement("h3", { className: "empty-state-title" }, "No providers to test"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "empty-state-description" }, "Add some LLM providers first, then return here to test their connectivity and performance."), /* @__PURE__ */ import_react5.default.createElement("button", { className: "empty-state-action", onClick: () => window.location.hash = "#providers" }, /* @__PURE__ */ import_react5.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react5.default.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ import_react5.default.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "16" }), /* @__PURE__ */ import_react5.default.createElement("line", { x1: "8", y1: "12", x2: "16", y2: "12" })), "Add Providers")) : /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "provider-test-controls" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react5.default.createElement("label", { className: "form-label" }, "Test Individual Provider"), /* @__PURE__ */ import_react5.default.createElement("div", { style: { display: "flex", gap: "1rem" } }, /* @__PURE__ */ import_react5.default.createElement(
      "select",
      {
        className: "form-select",
        value: selectedProvider,
        onChange: (e) => setSelectedProvider(e.target.value),
        style: { flex: 1 }
      },
      /* @__PURE__ */ import_react5.default.createElement("option", { value: "" }, "Select a provider"),
      config.Providers.map((provider) => /* @__PURE__ */ import_react5.default.createElement("option", { key: provider.name, value: provider.name }, provider.name, " (", provider.models.length, " models)"))
    ), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        className: "btn btn-secondary",
        onClick: () => selectedProvider && testProvider(selectedProvider),
        disabled: !selectedProvider || isTestingAll
      },
      "\u{1F9EA} Test Provider"
    )))), testProgress["__global__"] && /* @__PURE__ */ import_react5.default.createElement("div", { className: "card", style: { marginBottom: "1rem", background: "var(--primary-50)", border: "2px solid var(--primary-200)" } }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "card-content", style: { padding: "1rem" } }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" } }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "spinner", style: { width: "20px", height: "20px" } }), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("div", { style: { fontWeight: "600", color: "var(--primary-700)" } }, "Global Testing Progress"), /* @__PURE__ */ import_react5.default.createElement("div", { style: { fontSize: "0.875rem", color: "var(--primary-600)" } }, testProgress["__global__"].stage))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "progress-bar" }, /* @__PURE__ */ import_react5.default.createElement(
      "div",
      {
        className: "progress-bar-fill",
        style: { width: `${testProgress["__global__"].current / testProgress["__global__"].total * 100}%` }
      }
    )), /* @__PURE__ */ import_react5.default.createElement("div", { style: { fontSize: "0.8rem", color: "var(--primary-600)", marginTop: "0.5rem" } }, testProgress["__global__"].current, " of ", testProgress["__global__"].total, " providers tested"))), Object.entries(testProgress).filter(([key]) => key !== "__global__").map(([providerName, progress]) => /* @__PURE__ */ import_react5.default.createElement("div", { key: providerName, className: "card", style: { marginBottom: "1rem", background: "var(--warning-50)", border: "2px solid var(--warning-200)" } }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "card-content", style: { padding: "1rem" } }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" } }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "spinner", style: { width: "16px", height: "16px" } }), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("div", { style: { fontWeight: "600", color: "var(--warning-700)" } }, "Testing ", providerName), /* @__PURE__ */ import_react5.default.createElement("div", { style: { fontSize: "0.875rem", color: "var(--warning-600)" } }, progress.stage))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "progress-bar" }, /* @__PURE__ */ import_react5.default.createElement(
      "div",
      {
        className: "progress-bar-fill",
        style: {
          width: `${progress.current / progress.total * 100}%`,
          background: "linear-gradient(90deg, var(--warning-500), var(--warning-600))"
        }
      }
    )), /* @__PURE__ */ import_react5.default.createElement("div", { style: { fontSize: "0.8rem", color: "var(--warning-600)", marginTop: "0.5rem" } }, progress.current, " of ", progress.total, " models tested")))), testResults.length > 0 && /* @__PURE__ */ import_react5.default.createElement("div", { className: "test-results" }, /* @__PURE__ */ import_react5.default.createElement("h3", { style: { marginBottom: "1rem", color: "#4a5568" } }, "Test Results"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "results-grid stagger-animation" }, testResults.sort((a, b) => b.timestamp - a.timestamp).map((result, index) => {
      const resultId = `${result.provider}-${result.model}-${result.timestamp}`;
      const showDetail = showDetails[resultId];
      return /* @__PURE__ */ import_react5.default.createElement("div", { key: index, className: "result-item clickable", onClick: () => toggleDetails(resultId) }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "result-header" }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } }, /* @__PURE__ */ import_react5.default.createElement("span", { style: { fontSize: "1.2rem" } }, result.status === "testing" ? /* @__PURE__ */ import_react5.default.createElement("div", { className: "spinner", style: { width: "16px", height: "16px" } }) : getStatusIcon(result.status)), /* @__PURE__ */ import_react5.default.createElement("span", { className: "result-provider" }, result.provider)), /* @__PURE__ */ import_react5.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } }, /* @__PURE__ */ import_react5.default.createElement(
        "div",
        {
          className: `result-status badge ${result.status === "success" ? "badge-success" : result.status === "error" ? "badge-error" : "badge-warning"}`
        },
        result.status.toUpperCase()
      ), /* @__PURE__ */ import_react5.default.createElement(
        "svg",
        {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          style: {
            transform: showDetail ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            opacity: 0.6
          }
        },
        /* @__PURE__ */ import_react5.default.createElement("polyline", { points: "6,9 12,15 18,9" })
      ))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "result-model", style: { fontWeight: "600", color: "var(--gray-800)" } }, result.model), result.status === "testing" && result.progress !== void 0 && /* @__PURE__ */ import_react5.default.createElement("div", { style: { margin: "0.5rem 0" } }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "progress-bar", style: { height: "4px" } }, /* @__PURE__ */ import_react5.default.createElement(
        "div",
        {
          className: "progress-bar-fill",
          style: { width: `${result.progress}%` }
        }
      ))), /* @__PURE__ */ import_react5.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" } }, result.latency && /* @__PURE__ */ import_react5.default.createElement("div", { className: "result-latency" }, "\u23F1\uFE0F ", result.latency, "ms"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "result-timestamp", style: { marginLeft: "auto" } }, new Date(result.timestamp).toLocaleTimeString())), showDetail && /* @__PURE__ */ import_react5.default.createElement("div", { className: "accordion-content active", style: { marginTop: "1rem" } }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "accordion-body", style: { padding: "0.5rem", background: "var(--gray-50)", borderRadius: "6px" } }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { fontSize: "0.875rem" } }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("strong", null, "Provider:"), " ", result.provider), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("strong", null, "Model:"), " ", result.model), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("strong", null, "Status:"), " ", result.status), result.latency && /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("strong", null, "Latency:"), " ", result.latency, "ms"), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("strong", null, "Tested:"), " ", new Date(result.timestamp).toLocaleString()), result.error && /* @__PURE__ */ import_react5.default.createElement("div", { style: { marginTop: "0.5rem" } }, /* @__PURE__ */ import_react5.default.createElement("strong", null, "Error Details:"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "result-error", style: { marginTop: "0.25rem" } }, result.error)), result.status === "success" && result.latency && /* @__PURE__ */ import_react5.default.createElement("div", { style: { marginTop: "0.5rem" } }, /* @__PURE__ */ import_react5.default.createElement("strong", null, "Performance:"), /* @__PURE__ */ import_react5.default.createElement("div", { style: { color: result.latency < 1e3 ? "var(--success-600)" : result.latency < 3e3 ? "var(--warning-600)" : "var(--error-600)" } }, result.latency < 1e3 ? "Excellent" : result.latency < 3e3 ? "Good" : "Slow", " response time"))))));
    })))))));
  };
  var style2 = document.createElement("style");
  style2.textContent = `
  .routing-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .route-overview-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: white;
  }
  
  .route-icon {
    font-size: 1.5rem;
  }
  
  .route-info {
    flex: 1;
  }
  
  .route-name {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.25rem;
  }
  
  .route-destination {
    font-size: 0.875rem;
    color: #718096;
  }
  
  .provider-test-controls {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .test-results {
    margin-top: 2rem;
  }
  
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
  
  .result-item {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    background: white;
  }
  
  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .result-provider {
    font-weight: 600;
    color: #2d3748;
  }
  
  .result-model {
    font-size: 0.875rem;
    color: #718096;
    margin-bottom: 0.5rem;
  }
  
  .result-latency {
    font-size: 0.8rem;
    color: #38a169;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .result-error {
    font-size: 0.8rem;
    color: #e53e3e;
    background: #fed7d7;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .result-timestamp {
    font-size: 0.75rem;
    color: #a0aec0;
  }
  
  @media (max-width: 768px) {
    .routing-overview {
      grid-template-columns: 1fr;
    }
    
    .results-grid {
      grid-template-columns: 1fr;
    }
  }
`;
  document.head.appendChild(style2);

  // src/web/components/CommandGenerator.tsx
  var import_react6 = __toESM(require_react());
  var CommandGenerator = ({ config }) => {
    const [params, setParams] = (0, import_react6.useState)({
      temperature: 0.7,
      maxTokens: 4e3,
      useStreaming: true
    });
    const [generatedCommand, setGeneratedCommand] = (0, import_react6.useState)("");
    const textareaRef = (0, import_react6.useRef)(null);
    const [copied, setCopied] = (0, import_react6.useState)(false);
    const generateCommand = () => {
      let command = "ccr code ";
      if (params.model) {
        command += `--model "${params.model}" `;
      }
      if (params.temperature !== 0.7) {
        command += `--temperature ${params.temperature} `;
      }
      if (params.maxTokens !== 4e3) {
        command += `--max-tokens ${params.maxTokens} `;
      }
      if (!params.useStreaming) {
        command += `--no-stream `;
      }
      const promptText = params.customText || "Your prompt here";
      command += `"${promptText}"`;
      setGeneratedCommand(command);
    };
    const copyToClipboard = async () => {
      if (generatedCommand) {
        try {
          await navigator.clipboard.writeText(generatedCommand);
          setCopied(true);
          setTimeout(() => setCopied(false), 2e3);
        } catch (err) {
          if (textareaRef.current) {
            textareaRef.current.select();
            document.execCommand("copy");
            setCopied(true);
            setTimeout(() => setCopied(false), 2e3);
          }
        }
      }
    };
    const getAllAvailableModels = () => {
      const allModels = /* @__PURE__ */ new Set();
      config.Providers.forEach((provider) => {
        provider.models.forEach((model) => allModels.add(model));
      });
      return Array.from(allModels).sort();
    };
    const presetCommands = [
      {
        name: "Quick Code Review",
        description: "Review code with default settings",
        command: 'ccr code "Review this code for potential improvements and bugs"'
      },
      {
        name: "Detailed Analysis",
        description: "Analyze with higher temperature for creativity",
        command: 'ccr code --temperature 1.0 "Analyze this code and suggest creative improvements"'
      },
      {
        name: "Precise Coding",
        description: "Low temperature for deterministic results",
        command: 'ccr code --temperature 0.1 "Write clean, production-ready code for this requirement"'
      },
      {
        name: "Long Context Processing",
        description: "Process large amounts of text",
        command: 'ccr code --max-tokens 8000 "Analyze this entire document and provide a comprehensive summary"'
      },
      {
        name: "Quick Response",
        description: "Short, concise responses",
        command: 'ccr code --max-tokens 500 "Provide a brief explanation of this concept"'
      },
      {
        name: "Non-Streaming Mode",
        description: "Get complete response at once",
        command: 'ccr code --no-stream "Explain this complex topic in detail"'
      }
    ];
    import_react6.default.useEffect(() => {
      generateCommand();
    }, [params]);
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "command-generator" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "card" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "card-header" }, /* @__PURE__ */ import_react6.default.createElement("h2", null, "\u{1F6E0}\uFE0F CLI Command Generator"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Generate custom CCR commands using Claude CLI parameters. Provider selection is handled by your routing configuration.")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "card-content" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "form-section" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react6.default.createElement("label", { htmlFor: "model", className: "form-label" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "label-icon" }, "\u{1F916}"), "Model (Optional)"), /* @__PURE__ */ import_react6.default.createElement(
      "select",
      {
        id: "model",
        value: params.model || "",
        onChange: (e) => setParams((prev) => ({ ...prev, model: e.target.value || void 0 })),
        className: "form-input"
      },
      /* @__PURE__ */ import_react6.default.createElement("option", { value: "" }, "Use Router Default"),
      getAllAvailableModels().map((model) => /* @__PURE__ */ import_react6.default.createElement("option", { key: model, value: model }, model))
    ), /* @__PURE__ */ import_react6.default.createElement("small", { className: "form-help" }, "Specify a model to override router selection")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "form-row" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react6.default.createElement("label", { htmlFor: "temperature", className: "form-label" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "label-icon" }, "\u{1F321}\uFE0F"), "Temperature"), /* @__PURE__ */ import_react6.default.createElement("div", { className: "slider-container" }, /* @__PURE__ */ import_react6.default.createElement(
      "input",
      {
        type: "range",
        id: "temperature",
        min: "0",
        max: "2",
        step: "0.1",
        value: params.temperature,
        onChange: (e) => setParams((prev) => ({ ...prev, temperature: parseFloat(e.target.value) })),
        className: "form-range"
      }
    ), /* @__PURE__ */ import_react6.default.createElement("span", { className: "slider-value" }, params.temperature)), /* @__PURE__ */ import_react6.default.createElement("small", { className: "form-help" }, "Controls randomness (0 = deterministic, 2 = very creative)")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react6.default.createElement("label", { htmlFor: "maxTokens", className: "form-label" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "label-icon" }, "\u{1F4CF}"), "Max Tokens"), /* @__PURE__ */ import_react6.default.createElement(
      "input",
      {
        type: "number",
        id: "maxTokens",
        min: "1",
        max: "100000",
        value: params.maxTokens,
        onChange: (e) => setParams((prev) => ({ ...prev, maxTokens: parseInt(e.target.value) })),
        className: "form-input"
      }
    ), /* @__PURE__ */ import_react6.default.createElement("small", { className: "form-help" }, "Maximum response length")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react6.default.createElement("label", { className: "checkbox-label" }, /* @__PURE__ */ import_react6.default.createElement(
      "input",
      {
        type: "checkbox",
        checked: params.useStreaming,
        onChange: (e) => setParams((prev) => ({ ...prev, useStreaming: e.target.checked }))
      }
    ), /* @__PURE__ */ import_react6.default.createElement("span", { className: "checkmark" }), /* @__PURE__ */ import_react6.default.createElement("span", { className: "label-icon" }, "\u{1F30A}"), "Enable Streaming"), /* @__PURE__ */ import_react6.default.createElement("small", { className: "form-help" }, "Stream response in real-time"))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react6.default.createElement("label", { htmlFor: "customText", className: "form-label" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "label-icon" }, "\u270F\uFE0F"), "Prompt Text"), /* @__PURE__ */ import_react6.default.createElement(
      "textarea",
      {
        id: "customText",
        value: params.customText || "",
        onChange: (e) => setParams((prev) => ({ ...prev, customText: e.target.value })),
        placeholder: "Enter your prompt here...",
        className: "form-textarea textarea-large",
        rows: 4
      }
    ), /* @__PURE__ */ import_react6.default.createElement("small", { className: "form-help" }, "The prompt that will be sent to the AI model"))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "command-output" }, /* @__PURE__ */ import_react6.default.createElement("label", { htmlFor: "generated-command", className: "form-label" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "label-icon" }, "\u26A1"), "Generated Command"), /* @__PURE__ */ import_react6.default.createElement("div", { className: "command-display" }, /* @__PURE__ */ import_react6.default.createElement(
      "textarea",
      {
        ref: textareaRef,
        id: "generated-command",
        value: generatedCommand,
        readOnly: true,
        className: "command-textarea",
        rows: 3
      }
    ), /* @__PURE__ */ import_react6.default.createElement(
      "button",
      {
        onClick: copyToClipboard,
        className: `copy-button ${copied ? "copied" : ""}`,
        title: "Copy to clipboard"
      },
      copied ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react6.default.createElement("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), /* @__PURE__ */ import_react6.default.createElement("polyline", { points: "22,4 12,14.01 9,11.01" })), "Copied!") : /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react6.default.createElement("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }), /* @__PURE__ */ import_react6.default.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })), "Copy")
    ))))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "card" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "card-header" }, /* @__PURE__ */ import_react6.default.createElement("h3", null, "\u{1F4DA} Command Presets"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Quick access to commonly used command patterns and configurations")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "card-content" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "preset-commands" }, presetCommands.map((preset, index) => /* @__PURE__ */ import_react6.default.createElement("div", { key: index, className: "preset-command" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "preset-header" }, /* @__PURE__ */ import_react6.default.createElement("h4", null, preset.name), /* @__PURE__ */ import_react6.default.createElement("p", null, preset.description)), /* @__PURE__ */ import_react6.default.createElement("div", { className: "preset-command-display" }, /* @__PURE__ */ import_react6.default.createElement("code", null, preset.command), /* @__PURE__ */ import_react6.default.createElement(
      "button",
      {
        onClick: () => {
          navigator.clipboard.writeText(preset.command);
        },
        className: "preset-copy-button",
        title: "Copy preset command"
      },
      /* @__PURE__ */ import_react6.default.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react6.default.createElement("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }), /* @__PURE__ */ import_react6.default.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" }))
    ))))))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "card" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "card-header" }, /* @__PURE__ */ import_react6.default.createElement("h3", null, "\u{1F4D6} Command Reference"), /* @__PURE__ */ import_react6.default.createElement("p", null, "Available CCR command options and their usage patterns")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "card-content" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "reference-section" }, /* @__PURE__ */ import_react6.default.createElement("h4", null, "\u{1F527} Basic Usage"), /* @__PURE__ */ import_react6.default.createElement("pre", null, /* @__PURE__ */ import_react6.default.createElement("code", null, 'ccr code "Your prompt here"')), /* @__PURE__ */ import_react6.default.createElement("h4", null, "\u{1F3AF} Model Selection"), /* @__PURE__ */ import_react6.default.createElement("ul", { className: "reference-list" }, /* @__PURE__ */ import_react6.default.createElement("li", null, /* @__PURE__ */ import_react6.default.createElement("code", null, '--model "model-name"'), " - Override router model selection"), /* @__PURE__ */ import_react6.default.createElement("li", null, "Provider selection is handled by your routing configuration"), /* @__PURE__ */ import_react6.default.createElement("li", null, "Available models are sourced from your configured providers")), /* @__PURE__ */ import_react6.default.createElement("h4", null, "\u2699\uFE0F Response Control"), /* @__PURE__ */ import_react6.default.createElement("ul", { className: "reference-list" }, /* @__PURE__ */ import_react6.default.createElement("li", null, /* @__PURE__ */ import_react6.default.createElement("code", null, "--temperature 0.7"), " - Control response randomness (0 = deterministic, 2 = very creative)"), /* @__PURE__ */ import_react6.default.createElement("li", null, /* @__PURE__ */ import_react6.default.createElement("code", null, "--max-tokens 4000"), " - Maximum response length (1-100000)"), /* @__PURE__ */ import_react6.default.createElement("li", null, /* @__PURE__ */ import_react6.default.createElement("code", null, "--no-stream"), " - Disable streaming output (get complete response at once)")), /* @__PURE__ */ import_react6.default.createElement("h4", null, "\u{1F680} Additional Claude CLI Options"), /* @__PURE__ */ import_react6.default.createElement("ul", { className: "reference-list" }, /* @__PURE__ */ import_react6.default.createElement("li", null, /* @__PURE__ */ import_react6.default.createElement("code", null, "--print"), " - Print response without interactive mode"), /* @__PURE__ */ import_react6.default.createElement("li", null, /* @__PURE__ */ import_react6.default.createElement("code", null, "--debug"), " - Enable debug output"), /* @__PURE__ */ import_react6.default.createElement("li", null, "Run ", /* @__PURE__ */ import_react6.default.createElement("code", null, "claude --help"), " for full Claude CLI reference")), /* @__PURE__ */ import_react6.default.createElement("h4", null, "\u{1F4A1} How It Works"), /* @__PURE__ */ import_react6.default.createElement("ul", { className: "reference-list" }, /* @__PURE__ */ import_react6.default.createElement("li", null, "CCR acts as a proxy to the Claude CLI"), /* @__PURE__ */ import_react6.default.createElement("li", null, "Provider routing is configured in your ", /* @__PURE__ */ import_react6.default.createElement("code", null, "~/.claude-code-router/config.json")), /* @__PURE__ */ import_react6.default.createElement("li", null, "Commands are routed based on your routing rules and transformers"), /* @__PURE__ */ import_react6.default.createElement("li", null, "All Claude CLI parameters are supported and passed through"))))));
  };

  // src/web/components/styles.css
  var styles_default = `/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Modern Color Palette */
  --primary-50: #f0f4ff;
  --primary-100: #e0e7ff;
  --primary-200: #c7d2fe;
  --primary-300: #a5b4fc;
  --primary-400: #818cf8;
  --primary-500: #6366f1;
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  --primary-800: #3730a3;
  --primary-900: #312e81;
  
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;
  
  --success-50: #f0fdf4;
  --success-500: #22c55e;
  --success-600: #16a34a;
  --success-700: #15803d;
  
  --error-50: #fef2f2;
  --error-500: #ef4444;
  --error-600: #dc2626;
  --error-700: #b91c1c;
  
  --warning-50: #fffbeb;
  --warning-100: #fef3c7;
  --warning-200: #fde68a;
  --warning-300: #fcd34d;
  --warning-400: #fbbf24;
  --warning-500: #f59e0b;
  --warning-600: #d97706;
  --warning-700: #b45309;
  --warning-800: #92400e;
  --warning-900: #78350f;
  
  --info-50: #eff6ff;
  --info-100: #dbeafe;
  --info-200: #bfdbfe;
  --info-300: #93c5fd;
  --info-400: #60a5fa;
  --info-500: #3b82f6;
  --info-600: #2563eb;
  --info-700: #1d4ed8;
  --info-800: #1e40af;
  --info-900: #1e3a8a;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Borders */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Advanced shadows for depth */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-outline: 0 0 0 3px rgb(99 102 241 / 0.1);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.06);
  --shadow-glow: 0 0 20px rgb(99 102 241 / 0.3);
  
  /* Animation easings - simplified to reduce flickering */
  --ease-in-out-back: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out-expo: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in-out-circ: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Spacing */
  --space-px: 1px;
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-7: 1.75rem;
  --space-8: 2rem;
  --space-9: 2.25rem;
  --space-10: 2.5rem;
  --space-11: 2.75rem;
  --space-12: 3rem;
  --space-14: 3.5rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-28: 7rem;
  --space-32: 8rem;
  
  /* Typography scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  
  /* Line heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Font weights */
  --font-thin: 100;
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
  
  /* Z-index scale */
  --z-0: 0;
  --z-10: 10;
  --z-20: 20;
  --z-30: 30;
  --z-40: 40;
  --z-50: 50;
  --z-auto: auto;
  
  /* Durations */
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: var(--leading-relaxed);
  color: var(--gray-900);
  background: linear-gradient(135deg, var(--gray-50) 0%, var(--primary-50) 100%);
  min-height: 100vh;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

/* Layout */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--gray-50);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  width: 100%;
}

/* Header */
.app-header {
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 50%, var(--primary-900) 100%);
  color: white;
  padding: var(--space-16) 0 var(--space-12) 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.app-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.app-header .container {
  position: relative;
  z-index: 1;
}

.app-header h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 3rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  /* Disabled float animation to reduce flickering */
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
  }
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

/* Typing effect for text */
.typing-effect {
  overflow: hidden;
  border-right: 2px solid var(--primary-500);
  white-space: nowrap;
  animation: typing 3s steps(40, end), blink 0.75s step-end infinite;
}

/* Attention-seeking animations */
.attention-pulse {
  animation: attention-pulse 2s ease-in-out infinite;
}

@keyframes attention-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.attention-bounce {
  animation: attention-bounce 1s ease-in-out infinite;
}

@keyframes attention-bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Stagger animations for lists */
.stagger-animation > * {
  animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

.stagger-animation > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-animation > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-animation > *:nth-child(3) { animation-delay: 0.3s; }
.stagger-animation > *:nth-child(4) { animation-delay: 0.4s; }
.stagger-animation > *:nth-child(5) { animation-delay: 0.5s; }
.stagger-animation > *:nth-child(6) { animation-delay: 0.6s; }
.stagger-animation > *:nth-child(7) { animation-delay: 0.7s; }
.stagger-animation > *:nth-child(8) { animation-delay: 0.8s; }
.stagger-animation > *:nth-child(9) { animation-delay: 0.9s; }
.stagger-animation > *:nth-child(10) { animation-delay: 1.0s; }

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .float,
  .breathe,
  .pulse,
  .attention-pulse,
  .attention-bounce {
    animation: none !important;
  }
}

.app-header p {
  font-size: 1.25rem;
  opacity: 0.95;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.save-status {
  margin-top: var(--space-8);
  min-height: 2rem;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
}

.status.saving {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  /* Removed infinite pulse animation */
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.status.saved {
  background: rgba(34, 197, 94, 0.15);
  color: var(--success-500);
  border-color: rgba(34, 197, 94, 0.2);
}

.status.error {
  background: rgba(239, 68, 68, 0.15);
  color: var(--error-500);
  border-color: rgba(239, 68, 68, 0.2);
}

/* Navigation */
.app-nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--gray-200);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.nav-tabs {
  display: flex;
  gap: 0;
  align-items: center;
}

.nav-tab {
  background: none;
  border: none;
  padding: var(--space-5) var(--space-6);
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-600);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  z-index: 2;
  will-change: color, border-color;
}

.nav-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--primary-50);
  opacity: 0;
  transition: opacity 0.15s ease;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  z-index: -1;
}

.nav-tab:hover {
  color: var(--primary-700);
}

.nav-tab:hover::before {
  opacity: 0.3;
}

.nav-tab.active {
  color: var(--primary-600);
  border-bottom-color: var(--primary-600);
  background: var(--primary-50);
}

.nav-tab.active::before {
  opacity: 1;
}

/* Main content */
.app-main {
  flex: 1;
  padding: var(--space-12) 0 var(--space-16) 0;
  background: transparent;
}

/* Cards */
.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: var(--space-8);
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  border-color: rgba(255, 255, 255, 0.3);
}

.card-header {
  padding: var(--space-8);
  border-bottom: 1px solid var(--gray-100);
  background: linear-gradient(135deg, var(--gray-50) 0%, rgba(255, 255, 255, 0.8) 100%);
  position: relative;
}

.card-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-500) 0%, var(--primary-600) 100%);
}

.card-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: var(--space-2);
  background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-700) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-header p {
  color: var(--gray-600);
  font-size: 1rem;
  font-weight: 500;
}

.card-content {
  padding: var(--space-8);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.925rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn:disabled::before {
  display: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  border: 1px solid var(--primary-600);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: var(--gray-100);
  color: var(--gray-700);
  border: 1px solid var(--gray-200);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--gray-200);
  color: var(--gray-800);
  box-shadow: var(--shadow-md);
}

.btn-success {
  background: linear-gradient(135deg, var(--success-500) 0%, var(--success-600) 100%);
  color: white;
  border: 1px solid var(--success-600);
}

.btn-success:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--success-600) 0%, var(--success-700) 100%);
  box-shadow: var(--shadow-lg);
}

.btn-danger {
  background: linear-gradient(135deg, var(--error-500) 0%, var(--error-600) 100%);
  color: white;
  border: 1px solid var(--error-600);
}

.btn-danger:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--error-600) 0%, var(--error-700) 100%);
  box-shadow: var(--shadow-lg);
}

.btn-small {
  padding: var(--space-2) var(--space-4);
  font-size: 0.8rem;
  border-radius: var(--radius-sm);
}

/* Forms */
.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: var(--space-2);
  font-size: 0.95rem;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: var(--space-4);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-md);
  font-size: 0.925rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  background: white;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
  line-height: 1.6;
}

.form-help {
  font-size: 0.825rem;
  color: var(--gray-500);
  margin-top: var(--space-1);
  font-weight: 500;
}

.form-error {
  color: var(--error-600);
  font-size: 0.825rem;
  margin-top: var(--space-1);
  font-weight: 600;
}

/* Grid */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Loading */
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: var(--space-8);
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--gray-200);
  border-top: 4px solid var(--primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--space-4);
  filter: drop-shadow(0 4px 8px rgba(99, 102, 241, 0.2));
  will-change: transform;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p,
.error-container h2 {
  color: var(--gray-700);
  font-weight: 600;
  margin-top: var(--space-4);
}

/* Provider list */
.provider-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.provider-item {
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: border-color 0.2s ease, background-color 0.2s ease;
  position: relative;
  overflow: hidden;
}

.provider-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
  transition: width 0.3s ease;
}

.provider-item:hover {
  border-color: var(--primary-300);
  background: white;
}

.provider-item:hover::before {
  width: 100%;
}

.provider-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-4);
  gap: var(--space-4);
}

.provider-name {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--gray-900);
  background: linear-gradient(135deg, var(--gray-900) 0%, var(--primary-700) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.provider-actions {
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
}

.provider-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-6);
}

.provider-detail {
  display: flex;
  flex-direction: column;
}

.provider-detail-label {
  font-size: 0.825rem;
  color: var(--gray-500);
  font-weight: 600;
  margin-bottom: var(--space-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.provider-detail-value {
  font-size: 0.95rem;
  color: var(--gray-800);
  font-weight: 500;
  font-family: 'Monaco', 'Menlo', monospace;
}

.provider-models {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.model-tag {
  background: linear-gradient(135deg, var(--primary-100) 0%, var(--primary-50) 100%);
  color: var(--primary-700);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--primary-200);
  transition: background-color 0.15s ease;
}

.model-tag:hover {
  background: var(--primary-200);
  cursor: pointer;
}

/* Status indicators */
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.8rem;
  font-weight: 600;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
}

.status-online {
  background: var(--success-50);
  color: var(--success-700);
  border-color: var(--success-200);
  box-shadow: 0 2px 4px rgba(34, 197, 94, 0.1);
}

.status-offline {
  background: var(--error-50);
  color: var(--error-700);
  border-color: var(--error-200);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.1);
}

.status-testing {
  background: var(--warning-50);
  color: var(--warning-600);
  border-color: rgba(245, 158, 11, 0.2);
  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.1);
  /* Removed infinite pulse animation to prevent continuous re-rendering */
}

@keyframes testing-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: var(--space-16) var(--space-4);
  color: var(--gray-500);
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--gray-300);
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: var(--space-2);
  color: var(--gray-700);
  font-weight: 700;
}

.empty-state p {
  font-size: 1rem;
  font-weight: 500;
}

/* Advanced Animations and Transitions */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

/* Disabled breathe animation to reduce flickering */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1);
  }
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

/* Enhanced Button Interactions */
.btn {
  position: relative;
  overflow: hidden;
  transform-origin: center;
}

.btn:active {
  opacity: 0.9;
}

.btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.btn:active::after {
  width: 300px;
  height: 300px;
}

/* Focus Management for Accessibility */
.btn:focus-visible,
.form-input:focus-visible,
.form-select:focus-visible,
.form-textarea:focus-visible,
.nav-tab:focus-visible {
  outline: 3px solid var(--primary-500);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

/* Enhanced Card Animations */
.card {
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  /* Removed will-change to reduce flickering */
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
.card:nth-child(4) { animation-delay: 0.4s; }

/* Removed infinite breathe animation to prevent continuous re-rendering */

/* Navigation Tab Enhancements */
.nav-tab {
  transform-origin: center bottom;
}

.nav-tab.active {
  animation: slideInDown 0.4s ease-out;
}

/* Provider Item Enhancements */
.provider-item {
  animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.provider-item:nth-child(odd) {
  animation-name: slideInLeft;
}

.provider-item:hover {
  animation: none;
  /* Simplified shadow to prevent re-rendering */
  box-shadow: var(--shadow-md);
}

/* Template Card Enhancements */
.provider-template-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

.provider-template-card:nth-child(1) { animation-delay: 0.1s; }
.provider-template-card:nth-child(2) { animation-delay: 0.2s; }
.provider-template-card:nth-child(3) { animation-delay: 0.3s; }
.provider-template-card:nth-child(4) { animation-delay: 0.4s; }
.provider-template-card:nth-child(5) { animation-delay: 0.5s; }
.provider-template-card:nth-child(6) { animation-delay: 0.6s; }

.provider-template-card:hover {
  /* Simplified shadow to prevent re-rendering */
  box-shadow: var(--shadow-lg);
}

/* Form Enhancements */
.form-group {
  animation: fadeIn 0.4s ease-out backwards;
  transition: all 0.3s ease;
}

.form-group:nth-child(1) { animation-delay: 0.05s; }
.form-group:nth-child(2) { animation-delay: 0.1s; }
.form-group:nth-child(3) { animation-delay: 0.15s; }
.form-group:nth-child(4) { animation-delay: 0.2s; }

.form-input,
.form-select,
.form-textarea {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.form-input:hover,
.form-select:hover,
.form-textarea:hover {
  border-color: var(--primary-300);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  background: white;
}

/* Enhanced Loading States */
.spinner {
  animation: spin 1s linear infinite;
  position: relative;
}

.spinner::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  border: 2px solid transparent;
  border-top: 2px solid var(--primary-300);
  border-radius: 50%;
  animation: spin 1.5s linear infinite reverse;
}

/* Status Indicator Enhancements */
.status-indicator {
  animation: fadeIn 0.3s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Removed status indicator hover transform */

.status-online {
  animation: slideInRight 0.4s ease-out;
}

.status-offline {
  animation: slideInRight 0.4s ease-out;
}

.status-testing {
  animation: slideInRight 0.4s ease-out, testing-pulse 2s infinite;
}

/* Model Tag Enhancements */
.model-tag {
  animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.model-tag:nth-child(1) { animation-delay: 0.05s; }
.model-tag:nth-child(2) { animation-delay: 0.1s; }
.model-tag:nth-child(3) { animation-delay: 0.15s; }
.model-tag:nth-child(4) { animation-delay: 0.2s; }
.model-tag:nth-child(5) { animation-delay: 0.25s; }

/* Simplified model tag hover effect */

/* App Header Enhancements */
.app-header {
  animation: slideInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-header h1 {
  animation: slideInUp 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;
}

.app-header p {
  animation: fadeIn 1s ease-out 0.4s backwards;
}

/* Navigation Enhancements */
.app-nav {
  animation: slideInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards;
}

/* Empty State Enhancements */
.empty-state {
  animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.3s ease;
}

/* Removed empty state hover transform */

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-4);
  }
  
  .app-header {
    padding: var(--space-12) 0 var(--space-8) 0;
  }
  
  .app-header h1 {
    font-size: 2.5rem;
  }
  
  .nav-tab {
    padding: var(--space-4) var(--space-4);
    font-size: 0.9rem;
  }
  
  .card-header,
  .card-content {
    padding: var(--space-6);
  }
  
  .provider-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }
  
  .provider-actions {
    width: 100%;
    justify-content: flex-start;
  }
  
  .app-main {
    padding: var(--space-8) 0 var(--space-12) 0;
  }
  
  /* Reduce animations and hover effects on mobile for performance */
  .card:hover,
  .provider-template-card:hover,
  .provider-item:hover,
  .nav-tab:hover,
  .btn:hover,
  .form-input:hover,
  .form-select:hover,
  .form-textarea:hover {
    animation: none;
    transform: none !important;
    box-shadow: none !important;
  }
  
  /* Disable will-change on mobile to save memory */
  .nav-tab,
  .spinner {
    will-change: auto;
  }
}

@media (max-width: 480px) {
  .app-header h1 {
    font-size: 2rem;
    gap: var(--space-2);
  }
  
  .logo {
    font-size: 2rem;
  }
  
  .nav-tabs {
    flex-wrap: wrap;
  }
  
  .nav-tab {
    flex: 1;
    min-width: 0;
    text-align: center;
  }
}

/* Provider Templates */
.provider-templates {
  margin-bottom: var(--space-8);
}

.template-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.template-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: var(--space-2);
  background: linear-gradient(135deg, var(--gray-900) 0%, var(--primary-700) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.template-subtitle {
  font-size: 1.1rem;
  color: var(--gray-600);
  font-weight: 500;
}

.provider-template-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: 0;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.provider-template-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
  transition: width 0.3s ease;
}

.provider-template-card:hover {
  border-color: var(--primary-300);
  box-shadow: var(--shadow-xl);
  background: white;
}

.provider-template-card:hover::before {
  width: 100%;
}

.template-card-header {
  padding: var(--space-6) var(--space-6) var(--space-4) var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.template-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.template-category {
  background: var(--primary-100);
  color: var(--primary-700);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.template-card-content {
  padding: 0 var(--space-6) var(--space-4) var(--space-6);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.template-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: var(--space-2);
  background: linear-gradient(135deg, var(--gray-900) 0%, var(--primary-700) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.template-description {
  font-size: 0.925rem;
  color: var(--gray-600);
  line-height: 1.5;
  margin-bottom: var(--space-4);
  flex: 1;
}

.template-models-count {
  font-size: 0.8rem;
  color: var(--gray-500);
  font-weight: 600;
  background: var(--gray-100);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  text-align: center;
  margin-bottom: var(--space-2);
}

.template-card-footer {
  padding: var(--space-4) var(--space-6);
  background: linear-gradient(135deg, var(--gray-50) 0%, var(--primary-50) 100%);
  border-top: 1px solid var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--primary-600);
  transition: all 0.3s ease;
}

.provider-template-card:hover .template-card-footer {
  background: linear-gradient(135deg, var(--primary-100) 0%, var(--primary-200) 100%);
  color: var(--primary-700);
}

/* Removed template card footer SVG hover transform */

/* Additional improvements for visual hierarchy */
h3 {
  font-weight: 700;
  color: var(--gray-800);
  margin-bottom: var(--space-4);
}

.provider-detail-value {
  word-break: break-all;
  overflow-wrap: break-word;
  transition: all 0.2s ease;
}

/* Removed hover color change to reduce re-rendering */

/* Copy to Clipboard Animation */
.copy-feedback {
  position: relative;
}

.copy-feedback::after {
  content: 'Copied!';
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gray-900);
  color: white;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.copy-feedback.show::after {
  opacity: 1;
  animation: slideInUp 0.3s ease-out;
}

/* Enhanced Tooltips */
.tooltip {
  position: relative;
  cursor: help;
}

.tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gray-900);
  color: white;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  margin-bottom: var(--space-2);
}

.tooltip::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--gray-900);
  opacity: 0;
  transition: opacity 0.3s ease;
  margin-bottom: -6px;
}

.tooltip:hover::before,
.tooltip:hover::after {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

/* Badge Enhancements */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
}

.badge-primary {
  background: var(--primary-100);
  color: var(--primary-700);
  border: 1px solid var(--primary-200);
}

.badge-success {
  background: var(--success-100);
  color: var(--success-700);
  border: 1px solid var(--success-200);
}

.badge-warning {
  background: var(--warning-100);
  color: var(--warning-700);
  border: 1px solid var(--warning-200);
}

.badge-error {
  background: var(--error-100);
  color: var(--error-700);
  border: 1px solid var(--error-200);
}

/* Removed badge hover transform */

/* Accordion Enhancements */
.accordion {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid var(--gray-200);
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  background: var(--gray-50);
  padding: var(--space-4) var(--space-6);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: var(--gray-800);
}

.accordion-header:hover {
  background: var(--gray-100);
}

.accordion-header.active {
  background: var(--primary-50);
  color: var(--primary-700);
}

.accordion-chevron {
  transition: transform 0.3s ease;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(180deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-content.active {
  max-height: 500px;
}

.accordion-body {
  padding: var(--space-6);
  background: white;
}

/* Dropdown Enhancements */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background: none;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: all 0.3s ease;
}

.dropdown-toggle:hover {
  border-color: var(--primary-300);
  background: var(--primary-50);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: var(--space-2);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown.active .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--gray-700);
  font-size: 0.875rem;
}

.dropdown-item:hover {
  background: var(--primary-50);
  color: var(--primary-700);
  padding-left: calc(var(--space-4) + 4px);
}

/* Removed duplicate hover styles that were causing conflicts */

/* Micro-interactions for clickable elements */
.clickable {
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.clickable:hover {
  opacity: 0.8;
}

.clickable:active {
  opacity: 0.9;
}

/* Enhanced Tab Interactions */
.nav-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: var(--primary-500);
  transition: width 0.2s ease, opacity 0.2s ease;
  transform: translateX(-50%);
}

.nav-tab:hover::after {
  width: 80%;
  opacity: 0.5;
}

.nav-tab.active::after {
  width: 100%;
  opacity: 1;
}

/* Provider Card Interactive States */
/* Removed provider-item::after overlay to reduce flickering */

.provider-item:hover::after {
  opacity: 1;
}

/* Improved Button Hover States */
/* Removed button hover shadow to prevent re-rendering */

/* Removed primary button hover shadow to prevent re-rendering */

/* Removed success button hover shadow to prevent re-rendering */

/* Removed danger button hover shadow to prevent re-rendering */

/* Removed secondary button hover shadow to prevent re-rendering */

/* Loading State Improvements */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  z-index: 10;
  animation: fadeIn 0.2s ease-out;
}

.loading-overlay .spinner {
  width: 32px;
  height: 32px;
}

/* Context Menu Styles */
.context-menu {
  position: fixed;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: var(--space-2);
  z-index: 1000;
  animation: scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 200px;
}

.context-menu-item {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 0.875rem;
  color: var(--gray-700);
}

.context-menu-item:hover {
  background: var(--primary-50);
  color: var(--primary-700);
  padding-left: calc(var(--space-4) + 4px);
}

.context-menu-divider {
  height: 1px;
  background: var(--gray-200);
  margin: var(--space-2) 0;
}

/* Improved Empty States */
.empty-state-enhanced {
  text-align: center;
  padding: var(--space-20) var(--space-6);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  border: 2px dashed var(--gray-300);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.empty-state-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.05), transparent);
  transition: left 0.5s ease;
}

.empty-state-enhanced:hover::before {
  left: 100%;
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: var(--space-4);
  opacity: 0.7;
}

.empty-state-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-700);
  margin-bottom: var(--space-3);
}

.empty-state-description {
  font-size: 1rem;
  color: var(--gray-600);
  margin-bottom: var(--space-6);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.empty-state-action {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  background: var(--primary-500);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.empty-state-action:hover {
  background: var(--primary-600);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

/* Improve loading and error states */
.error-container {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  border: 2px solid var(--error-200);
  max-width: 600px;
  margin: 0 auto;
  animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.error-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--error-500), var(--error-600));
}

.loading-container {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  border: 2px solid var(--primary-200);
  max-width: 600px;
  margin: 0 auto;
  animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.loading-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
}

/* Enhanced Card Loading States */
.card.loading {
  position: relative;
  overflow: hidden;
}

.card.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* Pulse Loading Animation */
.pulse-loading {
  animation: pulse-loading 1.5s ease-in-out infinite;
}

@keyframes pulse-loading {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Success State Animations */
.success-animation {
  animation: successPop 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes successPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Error State Animations */
.error-animation {
  animation: errorShake 0.5s ease-in-out;
}

@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

/* Page Transition Effects */
.page-transition-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-transition-exit {
  opacity: 1;
  transform: translateY(0);
}

.page-transition-exit-active {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Skeleton Loading States */
.skeleton {
  background: linear-gradient(90deg, 
    var(--gray-200) 25%, 
    var(--gray-100) 50%, 
    var(--gray-200) 75%
  );
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

.skeleton-text {
  height: 1rem;
  margin-bottom: var(--space-2);
}

.skeleton-text-lg {
  height: 1.5rem;
  margin-bottom: var(--space-3);
}

.skeleton-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  margin-bottom: var(--space-8);
  animation: fadeIn 0.3s ease-out;
}

.skeleton-provider {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skeleton-provider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skeleton-provider-name {
  width: 200px;
  height: 1.5rem;
}

.skeleton-provider-actions {
  display: flex;
  gap: var(--space-2);
}

.skeleton-btn {
  width: 80px;
  height: 2rem;
  border-radius: var(--radius-md);
}

.skeleton-provider-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.skeleton-detail {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.skeleton-detail-label {
  width: 60px;
  height: 0.75rem;
}

.skeleton-detail-value {
  width: 150px;
  height: 1rem;
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: var(--space-6);
  right: var(--space-6);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 400px;
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.toast:hover {
  opacity: 0.95;
}

.toast.toast-success {
  background: rgba(34, 197, 94, 0.95);
  color: white;
  border-color: rgba(34, 197, 94, 0.3);
}

.toast.toast-error {
  background: rgba(239, 68, 68, 0.95);
  color: white;
  border-color: rgba(239, 68, 68, 0.3);
}

.toast.toast-info {
  background: rgba(99, 102, 241, 0.95);
  color: white;
  border-color: rgba(99, 102, 241, 0.3);
}

.toast.toast-warning {
  background: rgba(245, 158, 11, 0.95);
  color: white;
  border-color: rgba(245, 158, 11, 0.3);
}

.toast-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.toast-message {
  font-size: 0.875rem;
  opacity: 0.9;
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--radius-sm);
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.toast-close:hover {
  opacity: 1;
}

/* Progress Indicators */
.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
  border-radius: var(--radius-full);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.progress-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--space-6) 0;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

.progress-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 1rem;
  left: 60%;
  right: -40%;
  height: 2px;
  background: var(--gray-200);
  z-index: 0;
}

.progress-step.completed:not(:last-child)::after {
  background: var(--success-500);
}

.progress-step-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--gray-200);
  color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  z-index: 1;
  position: relative;
}

.progress-step.active .progress-step-circle {
  background: var(--primary-500);
  color: white;
}

.progress-step.completed .progress-step-circle {
  background: var(--success-500);
  color: white;
}

.progress-step-label {
  font-size: 0.75rem;
  color: var(--gray-600);
  margin-top: var(--space-2);
  text-align: center;
  font-weight: 500;
}

.progress-step.active .progress-step-label {
  color: var(--primary-600);
  font-weight: 600;
}

.progress-step.completed .progress-step-label {
  color: var(--success-600);
}

/* Enhanced Error States */
.form-error-container {
  background: var(--error-50);
  border: 1px solid var(--error-200);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  margin-top: var(--space-2);
  animation: slideInUp 0.3s ease-out;
}

.form-error-title {
  font-weight: 600;
  color: var(--error-700);
  font-size: 0.875rem;
  margin-bottom: var(--space-1);
}

.form-error-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.form-error-item {
  color: var(--error-600);
  font-size: 0.8rem;
  margin-bottom: var(--space-1);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.form-error-item::before {
  content: '\u2022';
  color: var(--error-500);
  font-weight: bold;
}

/* Input Validation States */
.form-input.error,
.form-select.error,
.form-textarea.error {
  border-color: var(--error-500);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  animation: shake 0.5s ease-in-out;
}

.form-input.success,
.form-select.success,
.form-textarea.success {
  border-color: var(--success-500);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

/* Command Generator Styles */
.command-generator {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.command-generator .card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.command-generator .card:hover {
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.08);
  border-color: rgba(99, 102, 241, 0.15);
}

.label-icon {
  display: inline-block;
  margin-right: var(--space-2);
  font-size: 1.1em;
  opacity: 0.8;
}

.command-generator .form-section {
  background: linear-gradient(135deg, var(--gray-50) 0%, rgba(99, 102, 241, 0.02) 100%);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--gray-100);
  margin-bottom: var(--space-6);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.command-generator .form-group {
  margin-bottom: var(--space-6);
}

.command-generator .form-label {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: var(--gray-800);
  margin-bottom: var(--space-3);
  font-size: 1rem;
  letter-spacing: 0.01em;
}

.command-generator .form-input,
.command-generator .form-select,
.command-generator .form-textarea {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.command-generator .form-input:focus,
.command-generator .form-select:focus,
.command-generator .form-textarea:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1), 0 2px 8px rgba(99, 102, 241, 0.15);
  background: white;
}

.command-generator .form-help {
  color: var(--gray-600);
  font-size: 0.85rem;
  margin-top: var(--space-2);
  font-weight: 500;
  line-height: 1.4;
}

.command-generator .slider-container {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: rgba(255, 255, 255, 0.8);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-200);
}

.command-generator .form-range {
  flex: 1;
  height: 8px;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, var(--gray-200) 0%, var(--primary-100) 100%);
  outline: none;
  -webkit-appearance: none;
}

.command-generator .form-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 3px solid white;
}

.command-generator .form-range::-webkit-slider-thumb:hover {
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.command-generator .form-range::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.command-generator .form-range::-moz-range-thumb:hover {
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.command-generator .slider-value {
  min-width: 50px;
  text-align: center;
  font-weight: 700;
  color: var(--primary-700);
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-lg);
  font-size: 0.95rem;
  border: 1px solid var(--primary-200);
  box-shadow: var(--shadow-sm);
}

.command-generator .checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
  background: rgba(255, 255, 255, 0.8);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-200);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  color: var(--gray-800);
}

.command-generator .checkbox-label:hover {
  background: rgba(99, 102, 241, 0.05);
  border-color: var(--primary-300);
}

.command-generator .checkbox-label input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.command-generator .checkmark {
  position: relative;
  width: 24px;
  height: 24px;
  background: var(--gray-100);
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
}

.command-generator .checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  border-color: var(--primary-500);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.command-generator .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 7px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.textarea-large {
  min-height: 100px;
  resize: vertical;
}

.command-generator .command-output {
  margin-top: var(--space-6);
  background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
}

.command-generator .command-output .form-label {
  color: var(--gray-100);
  margin-bottom: var(--space-4);
}

.command-generator .command-display {
  position: relative;
  display: flex;
  align-items: stretch;
  background: var(--gray-900);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.command-generator .command-textarea {
  flex: 1;
  font-family: 'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  background: var(--gray-900);
  color: var(--gray-100);
  border: none;
  padding: var(--space-4);
  resize: none;
  min-height: 100px;
  outline: none;
}

.command-generator .copy-button {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.command-generator .copy-button:hover {
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.command-generator .copy-button.copied {
  background: linear-gradient(135deg, var(--success-500) 0%, var(--success-600) 100%);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.command-generator .copy-button.copied:hover {
  background: linear-gradient(135deg, var(--success-600) 0%, var(--success-700) 100%);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
}

.command-generator .preset-commands {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.command-generator .preset-command {
  padding: 0;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.command-generator .preset-command:hover {
  border-color: var(--primary-400);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.15);
}

.command-generator .preset-header {
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--gray-50) 0%, rgba(99, 102, 241, 0.03) 100%);
  border-bottom: 1px solid var(--gray-100);
}

.command-generator .preset-header h4 {
  color: var(--gray-900);
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.command-generator .preset-header p {
  color: var(--gray-600);
  font-size: 0.9rem;
  margin-bottom: 0;
  line-height: 1.5;
}

.command-generator .preset-command-display {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%);
  padding: var(--space-4);
  margin: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
}

.command-generator .preset-command-display code {
  flex: 1;
  color: var(--gray-100);
  font-family: 'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85rem;
  background: transparent;
  border: none;
  padding: 0;
  line-height: 1.5;
}

.command-generator .preset-copy-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--gray-600) 0%, var(--gray-700) 100%);
  color: var(--gray-200);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
}

.command-generator .preset-copy-button:hover {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.command-generator .reference-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.command-generator .reference-section h4 {
  color: var(--gray-900);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: 3px solid var(--primary-200);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.command-generator .reference-section pre {
  background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%);
  color: var(--gray-100);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  font-family: 'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  border: 1px solid var(--gray-700);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
}

.command-generator .reference-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.command-generator .reference-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  background: linear-gradient(135deg, var(--gray-50) 0%, rgba(99, 102, 241, 0.02) 100%);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--primary-300);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
}

.command-generator .reference-list li:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0.02) 100%);
  border-left-color: var(--primary-500);
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.command-generator .reference-list li code {
  background: linear-gradient(135deg, var(--gray-100) 0%, var(--gray-200) 100%);
  color: var(--gray-800);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-md);
  font-family: 'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid var(--gray-300);
  box-shadow: var(--shadow-xs);
}

/* Improve mobile responsiveness for template cards */
@media (max-width: 640px) {
  .template-icon {
    font-size: 2rem;
  }
  
  .template-name {
    font-size: 1.1rem;
  }
  
  .toast-container {
    left: var(--space-4);
    right: var(--space-4);
    max-width: none;
  }
  
  .skeleton-provider-details {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .command-display {
    flex-direction: column;
  }
  
  .copy-button {
    position: relative;
    top: auto;
    right: auto;
    align-self: flex-start;
    margin-top: var(--space-2);
  }
  
  /* Disable backdrop-filter on mobile for better performance */
  .card,
  .provider-item,
  .provider-template-card,
  .form-input,
  .form-select,
  .form-textarea {
    backdrop-filter: none;
  }
}`;

  // src/web/components/App.tsx
  var App = () => {
    const [config, setConfig] = (0, import_react7.useState)(null);
    const [loading, setLoading] = (0, import_react7.useState)(true);
    const [activeTab, setActiveTab] = (0, import_react7.useState)("providers");
    const [saveStatus, setSaveStatus] = (0, import_react7.useState)("idle");
    const [pageTransition, setPageTransition] = (0, import_react7.useState)(false);
    const [toasts, setToasts] = (0, import_react7.useState)([]);
    const showToast = (toast) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5e3);
    };
    const removeToast = (id) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };
    (0, import_react7.useEffect)(() => {
      if (typeof styles_default === "string" && !document.getElementById("app-styles")) {
        const styleElement = document.createElement("style");
        styleElement.id = "app-styles";
        styleElement.textContent = styles_default;
        document.head.appendChild(styleElement);
      }
      loadConfig();
    }, []);
    const loadConfig = async () => {
      try {
        const response = await fetch(window.location.origin + "/api/config");
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Failed to load config:", error);
      } finally {
        setLoading(false);
      }
    };
    const saveConfig = async (newConfig) => {
      setSaveStatus("saving");
      try {
        const response = await fetch(window.location.origin + "/api/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newConfig)
        });
        if (response.ok) {
          setConfig(newConfig);
          setSaveStatus("saved");
          showToast({
            type: "success",
            title: "Configuration Saved",
            message: "Your router configuration has been updated successfully."
          });
          setTimeout(() => setSaveStatus("idle"), 2e3);
        } else {
          setSaveStatus("error");
          showToast({
            type: "error",
            title: "Save Failed",
            message: "Could not save configuration. Please try again."
          });
          setTimeout(() => setSaveStatus("idle"), 3e3);
        }
      } catch (error) {
        console.error("Failed to save config:", error);
        setSaveStatus("error");
        showToast({
          type: "error",
          title: "Network Error",
          message: "Unable to connect to the server. Check your connection."
        });
        setTimeout(() => setSaveStatus("idle"), 3e3);
      }
    };
    if (loading) {
      return /* @__PURE__ */ import_react7.default.createElement("div", { className: "app" }, /* @__PURE__ */ import_react7.default.createElement("header", { className: "app-header" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "container" }, /* @__PURE__ */ import_react7.default.createElement("h1", null, /* @__PURE__ */ import_react7.default.createElement("span", { className: "logo" }, "\u26A1"), "Claude Code Router"), /* @__PURE__ */ import_react7.default.createElement("p", null, "Loading your intelligent routing configuration..."))), /* @__PURE__ */ import_react7.default.createElement("nav", { className: "app-nav" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "container" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "nav-tabs" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "nav-tab skeleton", style: { width: "120px", height: "48px" } }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "nav-tab skeleton", style: { width: "140px", height: "48px" } }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "nav-tab skeleton", style: { width: "100px", height: "48px" } })))), /* @__PURE__ */ import_react7.default.createElement("main", { className: "app-main" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "container" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-card" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-text-lg", style: { width: "300px" } }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-text", style: { width: "500px" } }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-text", style: { width: "200px" } })), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-card" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-provider" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-provider-header" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-provider-name" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-provider-actions" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-btn" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-btn" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-btn" }))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-provider-details" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-detail" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-label" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-value" })), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-detail" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-label" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-value" })), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-detail" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-label" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-value" }))))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-card" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-provider" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-provider-header" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-provider-name" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-provider-actions" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-btn" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-btn" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-btn" }))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-provider-details" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-detail" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-label" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-value" })), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-detail" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-label" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-value" })), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton-detail" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-label" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "skeleton skeleton-detail-value" }))))))));
    }
    if (!config) {
      return /* @__PURE__ */ import_react7.default.createElement("div", { className: "app" }, /* @__PURE__ */ import_react7.default.createElement("header", { className: "app-header" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "container" }, /* @__PURE__ */ import_react7.default.createElement("h1", null, /* @__PURE__ */ import_react7.default.createElement("span", { className: "logo" }, "\u26A1"), "Claude Code Router"), /* @__PURE__ */ import_react7.default.createElement("p", null, "Intelligent LLM routing and configuration management"))), /* @__PURE__ */ import_react7.default.createElement("main", { className: "app-main" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "container" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "error-container" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "empty-state-icon" }, "\u26A0\uFE0F"), /* @__PURE__ */ import_react7.default.createElement("h2", { className: "empty-state-title" }, "Configuration Loading Failed"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "empty-state-description" }, "We couldn't load your router configuration. This might be due to a connection issue or server problem."), /* @__PURE__ */ import_react7.default.createElement("button", { onClick: loadConfig, className: "empty-state-action" }, /* @__PURE__ */ import_react7.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react7.default.createElement("path", { d: "M23 4v6h-6" }), /* @__PURE__ */ import_react7.default.createElement("path", { d: "M1 20v-6h6" }), /* @__PURE__ */ import_react7.default.createElement("path", { d: "M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" })), "Retry Loading")))));
    }
    return /* @__PURE__ */ import_react7.default.createElement("div", { className: "app" }, /* @__PURE__ */ import_react7.default.createElement("header", { className: "app-header" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "container" }, /* @__PURE__ */ import_react7.default.createElement("h1", null, /* @__PURE__ */ import_react7.default.createElement("span", { className: "logo" }, "\u26A1"), "Claude Code Router"), /* @__PURE__ */ import_react7.default.createElement("p", null, "Intelligent LLM routing and configuration management for modern AI workflows"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "save-status" }, saveStatus === "saving" && /* @__PURE__ */ import_react7.default.createElement("span", { className: "status saving" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "spinner", style: { width: "16px", height: "16px", marginRight: "8px" } }), "Saving configuration..."), saveStatus === "saved" && /* @__PURE__ */ import_react7.default.createElement("span", { className: "status saved success-animation" }, /* @__PURE__ */ import_react7.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react7.default.createElement("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), /* @__PURE__ */ import_react7.default.createElement("polyline", { points: "22,4 12,14.01 9,11.01" })), "Configuration saved successfully!"), saveStatus === "error" && /* @__PURE__ */ import_react7.default.createElement("span", { className: "status error error-animation" }, /* @__PURE__ */ import_react7.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react7.default.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ import_react7.default.createElement("line", { x1: "15", y1: "9", x2: "9", y2: "15" }), /* @__PURE__ */ import_react7.default.createElement("line", { x1: "9", y1: "9", x2: "15", y2: "15" })), "Failed to save configuration")))), /* @__PURE__ */ import_react7.default.createElement("nav", { className: "app-nav" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "container" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "nav-tabs" }, /* @__PURE__ */ import_react7.default.createElement(
      "button",
      {
        className: `nav-tab ${activeTab === "providers" ? "active" : ""}`,
        onClick: () => {
          if (activeTab !== "providers") {
            setPageTransition(true);
            setTimeout(() => {
              setActiveTab("providers");
              setPageTransition(false);
            }, 150);
          }
        }
      },
      /* @__PURE__ */ import_react7.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react7.default.createElement("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }), /* @__PURE__ */ import_react7.default.createElement("line", { x1: "8", y1: "21", x2: "16", y2: "21" }), /* @__PURE__ */ import_react7.default.createElement("line", { x1: "12", y1: "17", x2: "12", y2: "21" })),
      "Providers"
    ), /* @__PURE__ */ import_react7.default.createElement(
      "button",
      {
        className: `nav-tab ${activeTab === "routing" ? "active" : ""}`,
        onClick: () => {
          if (activeTab !== "routing") {
            setPageTransition(true);
            setTimeout(() => {
              setActiveTab("routing");
              setPageTransition(false);
            }, 150);
          }
        }
      },
      /* @__PURE__ */ import_react7.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react7.default.createElement("polyline", { points: "4,17 10,11 4,5" }), /* @__PURE__ */ import_react7.default.createElement("line", { x1: "12", y1: "19", x2: "20", y2: "19" })),
      "Routing Rules"
    ), /* @__PURE__ */ import_react7.default.createElement(
      "button",
      {
        className: `nav-tab ${activeTab === "testing" ? "active" : ""}`,
        onClick: () => {
          if (activeTab !== "testing") {
            setPageTransition(true);
            setTimeout(() => {
              setActiveTab("testing");
              setPageTransition(false);
            }, 150);
          }
        }
      },
      /* @__PURE__ */ import_react7.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react7.default.createElement("polyline", { points: "9,11 12,14 22,4" }), /* @__PURE__ */ import_react7.default.createElement("path", { d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" })),
      "Testing"
    ), /* @__PURE__ */ import_react7.default.createElement(
      "button",
      {
        className: `nav-tab ${activeTab === "commands" ? "active" : ""}`,
        onClick: () => {
          if (activeTab !== "commands") {
            setPageTransition(true);
            setTimeout(() => {
              setActiveTab("commands");
              setPageTransition(false);
            }, 150);
          }
        }
      },
      /* @__PURE__ */ import_react7.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react7.default.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }), /* @__PURE__ */ import_react7.default.createElement("path", { d: "M9 12l2 2 4-4" })),
      "Commands"
    )))), /* @__PURE__ */ import_react7.default.createElement("main", { className: "app-main" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "container" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: pageTransition ? "page-transition-exit page-transition-exit-active" : "page-transition-enter page-transition-enter-active" }, activeTab === "providers" && /* @__PURE__ */ import_react7.default.createElement(import_react7.default.Fragment, null, /* @__PURE__ */ import_react7.default.createElement(ConfigProvider, { config, onSave: saveConfig }), /* @__PURE__ */ import_react7.default.createElement(ProviderManager, { config, onSave: saveConfig })), activeTab === "routing" && /* @__PURE__ */ import_react7.default.createElement(RouterConfiguration, { config, onSave: saveConfig }), activeTab === "testing" && /* @__PURE__ */ import_react7.default.createElement(TestingPanel, { config }), activeTab === "commands" && /* @__PURE__ */ import_react7.default.createElement(CommandGenerator, { config })))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "toast-container" }, toasts.map((toast) => /* @__PURE__ */ import_react7.default.createElement("div", { key: toast.id, className: `toast toast-${toast.type}`, onClick: () => removeToast(toast.id) }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "toast-icon" }, toast.type === "success" && "\u2705", toast.type === "error" && "\u274C", toast.type === "info" && "\u2139\uFE0F", toast.type === "warning" && "\u26A0\uFE0F"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "toast-content" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "toast-title" }, toast.title), /* @__PURE__ */ import_react7.default.createElement("div", { className: "toast-message" }, toast.message)), /* @__PURE__ */ import_react7.default.createElement("button", { className: "toast-close", onClick: (e) => {
      e.stopPropagation();
      removeToast(toast.id);
    } }, /* @__PURE__ */ import_react7.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react7.default.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), /* @__PURE__ */ import_react7.default.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })))))));
  };
  var App_default = App;

  // src/web/index.tsx
  var container = document.getElementById("root");
  if (container) {
    const root = (0, import_client.createRoot)(container);
    root.render(/* @__PURE__ */ import_react8.default.createElement(App_default, null));
  } else {
    console.error("Root element not found");
  }
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
