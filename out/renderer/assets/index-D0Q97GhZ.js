function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReact_production_min;
function requireReact_production_min() {
  if (hasRequiredReact_production_min) return react_production_min;
  hasRequiredReact_production_min = 1;
  var l = Symbol.for("react.element"), n2 = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r2 = Symbol.for("react.profiler"), t2 = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
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
  } }, C = Object.assign, D = {};
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
  var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L = { key: true, ref: true, __self: true, __source: true };
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
          case n2:
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
  var U = { current: null }, V = { transition: null }, W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
  function X() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S, forEach: function(a, b, e) {
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
  react_production_min.Component = E;
  react_production_min.Fragment = p;
  react_production_min.Profiler = r2;
  react_production_min.PureComponent = G;
  react_production_min.StrictMode = q;
  react_production_min.Suspense = w;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
  react_production_min.act = X;
  react_production_min.cloneElement = function(a, b, e) {
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
  react_production_min.createContext = function(a) {
    a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a.Provider = { $$typeof: t2, _context: a };
    return a.Consumer = a;
  };
  react_production_min.createElement = M;
  react_production_min.createFactory = function(a) {
    var b = M.bind(null, a);
    b.type = a;
    return b;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a) {
    return { $$typeof: v, render: a };
  };
  react_production_min.isValidElement = O;
  react_production_min.lazy = function(a) {
    return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
  };
  react_production_min.memo = function(a, b) {
    return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
  };
  react_production_min.startTransition = function(a) {
    var b = V.transition;
    V.transition = {};
    try {
      a();
    } finally {
      V.transition = b;
    }
  };
  react_production_min.unstable_act = X;
  react_production_min.useCallback = function(a, b) {
    return U.current.useCallback(a, b);
  };
  react_production_min.useContext = function(a) {
    return U.current.useContext(a);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a) {
    return U.current.useDeferredValue(a);
  };
  react_production_min.useEffect = function(a, b) {
    return U.current.useEffect(a, b);
  };
  react_production_min.useId = function() {
    return U.current.useId();
  };
  react_production_min.useImperativeHandle = function(a, b, e) {
    return U.current.useImperativeHandle(a, b, e);
  };
  react_production_min.useInsertionEffect = function(a, b) {
    return U.current.useInsertionEffect(a, b);
  };
  react_production_min.useLayoutEffect = function(a, b) {
    return U.current.useLayoutEffect(a, b);
  };
  react_production_min.useMemo = function(a, b) {
    return U.current.useMemo(a, b);
  };
  react_production_min.useReducer = function(a, b, e) {
    return U.current.useReducer(a, b, e);
  };
  react_production_min.useRef = function(a) {
    return U.current.useRef(a);
  };
  react_production_min.useState = function(a) {
    return U.current.useState(a);
  };
  react_production_min.useSyncExternalStore = function(a, b, e) {
    return U.current.useSyncExternalStore(a, b, e);
  };
  react_production_min.useTransition = function() {
    return U.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  return react_production_min;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production_min();
  }
  return react.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = requireReact(), k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n2 = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n2.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
var reactExports = requireReact();
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredScheduler_production_min;
function requireScheduler_production_min() {
  if (hasRequiredScheduler_production_min) return scheduler_production_min;
  hasRequiredScheduler_production_min = 1;
  (function(exports) {
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
          var m = 2 * (d + 1) - 1, C = a[m], n2 = m + 1, x = a[n2];
          if (0 > g(C, c)) n2 < e && 0 > g(x, C) ? (a[d] = x, a[n2] = c, d = n2) : (a[d] = C, a[m] = c, d = m);
          else if (n2 < e && 0 > g(x, c)) a[d] = x, a[n2] = c, d = n2;
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
      var l = performance;
      exports.unstable_now = function() {
        return l.now();
      };
    } else {
      var p = Date, q = p.now();
      exports.unstable_now = function() {
        return p.now() - q;
      };
    }
    var r2 = [], t2 = [], u = 1, v = null, y = 3, z = false, A = false, B = false, D = "function" === typeof setTimeout ? setTimeout : null, E = "function" === typeof clearTimeout ? clearTimeout : null, F = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G(a) {
      for (var b = h(t2); null !== b; ) {
        if (null === b.callback) k(t2);
        else if (b.startTime <= a) k(t2), b.sortIndex = b.expirationTime, f(r2, b);
        else break;
        b = h(t2);
      }
    }
    function H(a) {
      B = false;
      G(a);
      if (!A) if (null !== h(r2)) A = true, I(J);
      else {
        var b = h(t2);
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
        for (v = h(r2); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
          var d = v.callback;
          if ("function" === typeof d) {
            v.callback = null;
            y = v.priorityLevel;
            var e = d(v.expirationTime <= b);
            b = exports.unstable_now();
            "function" === typeof e ? v.callback = e : v === h(r2) && k(r2);
            G(b);
          } else k(r2);
          v = h(r2);
        }
        if (null !== v) var w = true;
        else {
          var m = h(t2);
          null !== m && K(H, m.startTime - b);
          w = false;
        }
        return w;
      } finally {
        v = null, y = c, z = false;
      }
    }
    var N = false, O = null, L = -1, P = 5, Q = -1;
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
      var T = new MessageChannel(), U = T.port2;
      T.port1.onmessage = R;
      S = function() {
        U.postMessage(null);
      };
    } else S = function() {
      D(R, 0);
    };
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
      return h(r2);
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
      c > d ? (a.sortIndex = c, f(t2, a), null === h(r2) && a === h(t2) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r2, a), A || z || (A = true, I(J)));
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
  })(scheduler_production_min);
  return scheduler_production_min;
}
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler.exports;
  hasRequiredScheduler = 1;
  {
    scheduler.exports = requireScheduler_production_min();
  }
  return scheduler.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDom_production_min;
function requireReactDom_production_min() {
  if (hasRequiredReactDom_production_min) return reactDom_production_min;
  hasRequiredReactDom_production_min = 1;
  var aa = requireReact(), ca = requireScheduler();
  function p(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = /* @__PURE__ */ new Set(), ea = {};
  function fa(a, b) {
    ha(a, b);
    ha(a + "Capture", b);
  }
  function ha(a, b) {
    ea[a] = b;
    for (a = 0; a < b.length; a++) da.add(b[a]);
  }
  var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
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
  var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
  var Ia = Symbol.for("react.offscreen");
  var Ja = Symbol.iterator;
  function Ka(a) {
    if (null === a || "object" !== typeof a) return null;
    a = Ja && a[Ja] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var A = Object.assign, La;
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
  var mb, nb = (function(a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
      MSApp.execUnsafeLocalFunction(function() {
        return a(b, c, d, e);
      });
    } : a;
  })(function(a, b) {
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
  }, qb = ["Webkit", "ms", "Moz", "O"];
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
  var yb = null, zb = null, Ab = null;
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
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a) {
    Lb = false;
  }
  function Nb(a, b, c, d, e, f, g, h, k) {
    var l = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c, l);
    } catch (m) {
      this.onError(m);
    }
  }
  var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
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
  var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
  function mc(a) {
    if (lc && "function" === typeof lc.onCommitFiberRoot) try {
      lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {
    }
  }
  var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
  function nc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
  }
  var rc = 64, sc = 4194304;
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
  var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
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
  var cd = ua.ReactCurrentBatchConfig, dd = true;
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
  var kd = null, ld = null, md = null;
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
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
    return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
  }, movementX: function(a) {
    if ("movementX" in a) return a.movementX;
    a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
    return wd;
  }, movementY: function(a) {
    return "movementY" in a ? a.movementY : xd;
  } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
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
  }, Nd = {
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
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
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
  } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
  ia && "documentMode" in document && (be = document.documentMode);
  var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
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
  var pe = null, qe = null;
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
    var xe;
    if (ia) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
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
  var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
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
  var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
  ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
  function Ze(a) {
    if (Xe[a]) return Xe[a];
    if (!We[a]) return a;
    var b = We[a], c;
    for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
    return a;
  }
  var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a, b) {
    df.set(a, b);
    fa(b, [a]);
  }
  for (var gf = 0; gf < ef.length; gf++) {
    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
    ff(jf, "on" + kf);
  }
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
  var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
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
          var k2 = td, n2 = a;
          switch (a) {
            case "keypress":
              if (0 === od(c)) break a;
            case "keydown":
            case "keyup":
              k2 = Rd;
              break;
            case "focusin":
              n2 = "focus";
              k2 = Fd;
              break;
            case "focusout":
              n2 = "blur";
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
          var t2 = 0 !== (b & 4), J = !t2 && "scroll" === a, x = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
          t2 = [];
          for (var w = d2, u; null !== w; ) {
            u = w;
            var F = u.stateNode;
            5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t2.push(tf(w, F, u))));
            if (J) break;
            w = w.return;
          }
          0 < t2.length && (h2 = new k2(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
        }
      }
      if (0 === (b & 7)) {
        a: {
          h2 = "mouseover" === a || "pointerover" === a;
          k2 = "mouseout" === a || "pointerout" === a;
          if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
          if (k2 || h2) {
            h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
            if (k2) {
              if (n2 = c.relatedTarget || c.toElement, k2 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J = Vb(n2), n2 !== J || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
            } else k2 = null, n2 = d2;
            if (k2 !== n2) {
              t2 = Bd;
              F = "onMouseLeave";
              x = "onMouseEnter";
              w = "mouse";
              if ("pointerout" === a || "pointerover" === a) t2 = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
              J = null == k2 ? h2 : ue(k2);
              u = null == n2 ? h2 : ue(n2);
              h2 = new t2(F, w + "leave", k2, c, e2);
              h2.target = J;
              h2.relatedTarget = u;
              F = null;
              Wc(e2) === d2 && (t2 = new t2(x, w + "enter", n2, c, e2), t2.target = u, t2.relatedTarget = J, F = t2);
              J = F;
              if (k2 && n2) b: {
                t2 = k2;
                x = n2;
                w = 0;
                for (u = t2; u; u = vf(u)) w++;
                u = 0;
                for (F = x; F; F = vf(F)) u++;
                for (; 0 < w - u; ) t2 = vf(t2), w--;
                for (; 0 < u - w; ) x = vf(x), u--;
                for (; w--; ) {
                  if (t2 === x || null !== x && t2 === x.alternate) break b;
                  t2 = vf(t2);
                  x = vf(x);
                }
                t2 = null;
              }
              else t2 = null;
              null !== k2 && wf(g2, h2, k2, t2, false);
              null !== n2 && null !== J && wf(g2, J, n2, t2, true);
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
  var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
  function zf(a) {
    return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
  }
  function Af(a, b, c) {
    b = zf(b);
    if (zf(a) !== b && c) throw Error(p(425));
  }
  function Bf() {
  }
  var Cf = null, Df = null;
  function Ef(a, b) {
    return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
  }
  var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
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
  var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
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
  var Sf = [], Tf = -1;
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
  var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
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
  var eg = null, fg = false, gg = false;
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
  var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
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
  var xg = null, yg = null, I = false, zg = null;
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
    function r2(a2, b2, c2, d2) {
      var e2 = null !== b2 ? b2.key : null;
      if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
      if ("object" === typeof c2 && null !== c2) {
        switch (c2.$$typeof) {
          case va:
            return c2.key === e2 ? k(a2, b2, c2, d2) : null;
          case wa:
            return c2.key === e2 ? l(a2, b2, c2, d2) : null;
          case Ha:
            return e2 = c2._init, r2(
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
    function n2(e2, g2, h2, k2) {
      for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
        u.index > w ? (x = u, u = null) : x = u.sibling;
        var n3 = r2(e2, u, h2[w], k2);
        if (null === n3) {
          null === u && (u = x);
          break;
        }
        a && u && null === n3.alternate && b(e2, u);
        g2 = f(n3, g2, w);
        null === m2 ? l2 = n3 : m2.sibling = n3;
        m2 = n3;
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
    function t2(e2, g2, h2, k2) {
      var l2 = Ka(h2);
      if ("function" !== typeof l2) throw Error(p(150));
      h2 = l2.call(h2);
      if (null == h2) throw Error(p(151));
      for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n3 = h2.next(); null !== m2 && !n3.done; w++, n3 = h2.next()) {
        m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
        var t3 = r2(e2, m2, n3.value, k2);
        if (null === t3) {
          null === m2 && (m2 = x);
          break;
        }
        a && m2 && null === t3.alternate && b(e2, m2);
        g2 = f(t3, g2, w);
        null === u ? l2 = t3 : u.sibling = t3;
        u = t3;
        m2 = x;
      }
      if (n3.done) return c(
        e2,
        m2
      ), I && tg(e2, w), l2;
      if (null === m2) {
        for (; !n3.done; w++, n3 = h2.next()) n3 = q(e2, n3.value, k2), null !== n3 && (g2 = f(n3, g2, w), null === u ? l2 = n3 : u.sibling = n3, u = n3);
        I && tg(e2, w);
        return l2;
      }
      for (m2 = d(e2, m2); !n3.done; w++, n3 = h2.next()) n3 = y(m2, e2, w, n3.value, k2), null !== n3 && (a && null !== n3.alternate && m2.delete(null === n3.key ? w : n3.key), g2 = f(n3, g2, w), null === u ? l2 = n3 : u.sibling = n3, u = n3);
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
        if (eb(f2)) return n2(a2, d2, f2, h2);
        if (Ka(f2)) return t2(a2, d2, f2, h2);
        Mg(a2, f2);
      }
      return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
    }
    return J;
  }
  var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
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
        var r2 = h.lane, y = h.eventTime;
        if ((d & r2) === r2) {
          null !== m && (m = m.next = {
            eventTime: y,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          a: {
            var n2 = a, t2 = h;
            r2 = b;
            y = c;
            switch (t2.tag) {
              case 1:
                n2 = t2.payload;
                if ("function" === typeof n2) {
                  q = n2.call(y, q, r2);
                  break a;
                }
                q = n2;
                break a;
              case 3:
                n2.flags = n2.flags & -65537 | 128;
              case 0:
                n2 = t2.payload;
                r2 = "function" === typeof n2 ? n2.call(y, q, r2) : n2;
                if (null === r2 || void 0 === r2) break a;
                q = A({}, q, r2);
                break a;
              case 2:
                jh = true;
            }
          }
          null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
        } else y = { eventTime: y, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r2;
        h = h.next;
        if (null === h) if (h = e.shared.pending, null === h) break;
        else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
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
  var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
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
  var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
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
  var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
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
  }, unstable_isNewReconciler: false }, Ph = {
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
  }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
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
  var Wi = ua.ReactCurrentOwner, dh = false;
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
      var r2 = b.memoizedState;
      g.state = r2;
      qh(b, d, g, e);
      k = b.memoizedState;
      h !== d || r2 !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
    } else {
      g = b.stateNode;
      lh(a, b);
      h = b.memoizedProps;
      l = b.type === b.elementType ? h : Ci(b.type, h);
      g.props = l;
      q = b.pendingProps;
      r2 = g.context;
      k = c.contextType;
      "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
      var y = c.getDerivedStateFromProps;
      (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r2 !== k) && Hi(b, g, d, k);
      jh = false;
      r2 = b.memoizedState;
      g.state = r2;
      qh(b, d, g, e);
      var n2 = b.memoizedState;
      h !== q || r2 !== n2 || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n2 = b.memoizedState), (l = jh || Fi(b, c, l, d, r2, n2, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
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
  var zj, Aj, Bj, Cj;
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
  var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
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
          var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r2 = null;
          b: for (; ; ) {
            for (var y; ; ) {
              q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
              q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
              3 === q.nodeType && (g += q.nodeValue.length);
              if (null === (y = q.firstChild)) break;
              r2 = q;
              q = y;
            }
            for (; ; ) {
              if (q === a) break b;
              r2 === c && ++l === e && (h = g);
              r2 === f && ++m === d && (k = g);
              if (null !== (y = q.nextSibling)) break;
              q = r2;
              r2 = q.parentNode;
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
        var n2 = b.alternate;
        if (0 !== (b.flags & 1024)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (null !== n2) {
              var t2 = n2.memoizedProps, J = n2.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J);
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
    n2 = Nj;
    Nj = false;
    return n2;
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
  var X = null, Xj = false;
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
          } catch (t2) {
            W(a, a.return, t2);
          }
          try {
            Pj(5, a, a.return);
          } catch (t2) {
            W(a, a.return, t2);
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
          } catch (t2) {
            W(a, a.return, t2);
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
                var r2 = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f.multiple;
                var y = f.value;
                null != y ? fb(e, !!f.multiple, y, false) : r2 !== !!f.multiple && (null != f.defaultValue ? fb(
                  e,
                  !!f.multiple,
                  f.defaultValue,
                  true
                ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
            }
            e[Pf] = f;
          } catch (t2) {
            W(a, a.return, t2);
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
          } catch (t2) {
            W(a, a.return, t2);
          }
        }
        break;
      case 3:
        ck(b, a);
        ek(a);
        if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
          bd(b.containerInfo);
        } catch (t2) {
          W(a, a.return, t2);
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
              r2 = V;
              y = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r2, r2.return);
                  break;
                case 1:
                  Lj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d = r2;
                    c = r2.return;
                    try {
                      b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                    } catch (t2) {
                      W(d, c, t2);
                    }
                  }
                  break;
                case 5:
                  Lj(r2, r2.return);
                  break;
                case 22:
                  if (null !== r2.memoizedState) {
                    gk(q);
                    continue;
                  }
              }
              null !== y ? (y.return = r2, V = y) : gk(q);
            }
            m = m.sibling;
          }
          a: for (m = null, q = a; ; ) {
            if (5 === q.tag) {
              if (null === m) {
                m = q;
                try {
                  e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                } catch (t2) {
                  W(a, a.return, t2);
                }
              }
            } else if (6 === q.tag) {
              if (null === m) try {
                q.stateNode.nodeValue = l ? "" : q.memoizedProps;
              } catch (t2) {
                W(a, a.return, t2);
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
    ik(a);
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
          for (; null !== f; ) V = f, ik(f), f = f.sibling;
          V = e;
          Jj = h;
          U = l;
        }
        kk(a);
      } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a);
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
        } catch (r2) {
          W(b, b.return, r2);
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
  var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
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
              var r2 = m.alternate;
              r2 ? (m.updateQueue = r2.updateQueue, m.memoizedState = r2.memoizedState, m.lanes = r2.lanes) : (m.updateQueue = null, m.memoizedState = null);
            }
            var y = Ui(g);
            if (null !== y) {
              y.flags &= -257;
              Vi(y, g, h, f, b);
              y.mode & 1 && Si(f, l, b);
              b = y;
              k = l;
              var n2 = b.updateQueue;
              if (null === n2) {
                var t2 = /* @__PURE__ */ new Set();
                t2.add(k);
                b.updateQueue = t2;
              } else n2.add(k);
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
      hk(c);
      dc();
      K = h;
      C = g;
      ok.transition = f;
    } else a.current = c;
    vk && (vk = false, wk = a, xk = e);
    f = a.pendingLanes;
    0 === f && (Ri = null);
    mc(c.stateNode);
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
                      var r2 = m.sibling, y = m.return;
                      Sj(m);
                      if (m === l) {
                        V = null;
                        break;
                      }
                      if (null !== r2) {
                        r2.return = y;
                        V = r2;
                        break;
                      }
                      V = y;
                    }
                  }
                }
                var n2 = f.alternate;
                if (null !== n2) {
                  var t2 = n2.child;
                  if (null !== t2) {
                    n2.child = null;
                    do {
                      var J = t2.sibling;
                      t2.sibling = null;
                      t2 = J;
                    } while (null !== t2);
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
  var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
    a = Zb(a);
    return null === a ? null : a.stateNode;
  }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber) try {
      kc = vl.inject(ul), lc = vl;
    } catch (a) {
    }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
  reactDom_production_min.createPortal = function(a, b) {
    var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!nl(b)) throw Error(p(200));
    return cl(a, b, null, c);
  };
  reactDom_production_min.createRoot = function(a, b) {
    if (!nl(a)) throw Error(p(299));
    var c = false, d = "", e = kl;
    null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
    b = bl(a, 1, false, null, null, c, false, d, e);
    a[uf] = b.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    return new ll(b);
  };
  reactDom_production_min.findDOMNode = function(a) {
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
  reactDom_production_min.flushSync = function(a) {
    return Rk(a);
  };
  reactDom_production_min.hydrate = function(a, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a, b, true, c);
  };
  reactDom_production_min.hydrateRoot = function(a, b, c) {
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
  reactDom_production_min.render = function(a, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a, b, false, c);
  };
  reactDom_production_min.unmountComponentAtNode = function(a) {
    if (!ol(a)) throw Error(p(40));
    return a._reactRootContainer ? (Rk(function() {
      rl(null, null, a, false, function() {
        a._reactRootContainer = null;
        a[uf] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Qk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
    if (!ol(c)) throw Error(p(200));
    if (null == a || void 0 === a._reactInternals) throw Error(p(38));
    return rl(a, b, c, false, d);
  };
  reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
  return reactDom_production_min;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = requireReactDom_production_min();
  }
  return reactDom.exports;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client;
  hasRequiredClient = 1;
  var m = requireReactDom();
  {
    client.createRoot = m.createRoot;
    client.hydrateRoot = m.hydrateRoot;
  }
  return client;
}
var clientExports = requireClient();
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(clientExports);
var isCheckBoxInput = (element) => element.type === "checkbox";
var isDateObject = (value) => value instanceof Date;
var isNullOrUndefined = (value) => value == null;
const isObjectType = (value) => typeof value === "object";
var isObject = (value) => !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
var getEventValue = (event) => isObject(event) && event.target ? isCheckBoxInput(event.target) ? event.target.checked : event.target.value : event;
var isNameInFieldArray = (names, name) => name.split(".").some((part, index, arr) => !isNaN(Number(part)) && names.has(arr.slice(0, index).join(".")));
var isPlainObject = (tempObject) => {
  const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
  return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty("isPrototypeOf");
};
var isWeb = typeof window !== "undefined" && typeof window.HTMLElement !== "undefined" && typeof document !== "undefined";
function cloneObject(data) {
  if (data instanceof Date) {
    return new Date(data);
  }
  const isFileListInstance = typeof FileList !== "undefined" && data instanceof FileList;
  if (isWeb && (data instanceof Blob || isFileListInstance)) {
    return data;
  }
  const isArray = Array.isArray(data);
  if (!isArray && !(isObject(data) && isPlainObject(data))) {
    return data;
  }
  const copy = isArray ? [] : Object.create(Object.getPrototypeOf(data));
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      copy[key] = cloneObject(data[key]);
    }
  }
  return copy;
}
const EVENTS = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  SUBMIT: "submit",
  TRIGGER: "trigger",
  VALID: "valid"
};
const VALIDATION_MODE = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
};
const INPUT_VALIDATION_RULES = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
};
const ROOT_ERROR_TYPE = "root";
const PROTOTYPE_KEYWORDS = ["__proto__", "constructor", "prototype"];
const IS_KEY_RE = /^\w*$/;
var isKey = (value) => IS_KEY_RE.test(value);
var isUndefined = (val) => val === void 0;
const FIELD_PATH_RE = /[.[\]'"]/;
var stringToPath = (input) => input.split(FIELD_PATH_RE).filter(Boolean);
var get = (object, path, defaultValue) => {
  if (!path || !isObject(object)) {
    return defaultValue;
  }
  const paths = isKey(path) ? [path] : stringToPath(path);
  if (paths.some((key) => PROTOTYPE_KEYWORDS.includes(key))) {
    return defaultValue;
  }
  const result = paths.reduce((result2, key) => {
    return isNullOrUndefined(result2) ? void 0 : result2[key];
  }, object);
  return isUndefined(result) || result === object ? isUndefined(object[path]) ? defaultValue : object[path] : result;
};
var isBoolean = (value) => typeof value === "boolean";
var isFunction = (value) => typeof value === "function";
var set = (object, path, value) => {
  let index = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;
  while (++index < length) {
    const key = tempPath[index];
    let newValue = value;
    if (index !== lastIndex) {
      const objValue = object[key];
      newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index + 1]) ? [] : {};
    }
    if (PROTOTYPE_KEYWORDS.includes(key)) {
      return;
    }
    object[key] = newValue;
    object = object[key];
  }
};
const HookFormControlContext = React.createContext(null);
HookFormControlContext.displayName = "HookFormControlContext";
var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
  const result = {};
  for (const key in formState) {
    Object.defineProperty(result, key, {
      get: () => {
        const _key = key;
        if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
          control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
        }
        return formState[_key];
      }
    });
  }
  return result;
};
const useIsomorphicLayoutEffect = isWeb ? React.useLayoutEffect : React.useEffect;
var isString = (value) => typeof value === "string";
var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
  if (isString(names)) {
    isGlobal && _names.watch.add(names);
    return get(formValues, names, defaultValue);
  }
  if (Array.isArray(names)) {
    return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)));
  }
  isGlobal && (_names.watchAll = true);
  return formValues;
};
var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);
const isEmptyObjectWithCustomPrototype = (object, keys) => keys.length === 0 && !Array.isArray(object) && !isPlainObject(object);
function deepEqual(object1, object2, visited = /* @__PURE__ */ new WeakMap()) {
  if (object1 === object2) {
    return true;
  }
  if (isPrimitive(object1) || isPrimitive(object2)) {
    return Object.is(object1, object2);
  }
  if (isDateObject(object1) && isDateObject(object2)) {
    return Object.is(object1.getTime(), object2.getTime());
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  if (isEmptyObjectWithCustomPrototype(object1, keys1) || isEmptyObjectWithCustomPrototype(object2, keys2)) {
    return Object.is(object1, object2);
  }
  if (!keys1.length && Array.isArray(object1) !== Array.isArray(object2)) {
    return false;
  }
  const visitedPairs = visited.get(object1);
  if (visitedPairs && visitedPairs.has(object2)) {
    return true;
  }
  if (visitedPairs) {
    visitedPairs.add(object2);
  } else {
    const ws = /* @__PURE__ */ new WeakSet();
    ws.add(object2);
    visited.set(object1, ws);
  }
  for (const key of keys1) {
    const val1 = object1[key];
    if (!(key in object2)) {
      return false;
    }
    if (key !== "ref") {
      const val2 = object2[key];
      if (isDateObject(val1) && isDateObject(val2) || (isObject(val1) || Array.isArray(val1)) && (isObject(val2) || Array.isArray(val2)) ? !deepEqual(val1, val2, visited) : !Object.is(val1, val2)) {
        return false;
      }
    }
  }
  return true;
}
const flatten = (obj) => {
  const output = {};
  for (const key of Object.keys(obj)) {
    if (isObjectType(obj[key]) && obj[key] !== null && !isDateObject(obj[key])) {
      const nested = flatten(obj[key]);
      for (const nestedKey of Object.keys(nested)) {
        output[`${key}.${nestedKey}`] = nested[nestedKey];
      }
    } else {
      output[key] = obj[key];
    }
  }
  return output;
};
const HookFormContext = React.createContext(null);
HookFormContext.displayName = "HookFormContext";
var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria ? {
  ...errors[name],
  types: {
    ...errors[name] && errors[name].types ? errors[name].types : {},
    [type]: message || true
  }
} : {};
var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
var convertToArrayPayload = (value) => Array.isArray(value) ? value : [value];
var createSubject = () => {
  let _observers = [];
  const next = (value) => {
    for (const observer of _observers) {
      observer.next && observer.next(value);
    }
  };
  const subscribe = (observer) => {
    _observers.push(observer);
    return {
      unsubscribe: () => {
        _observers = _observers.filter((o2) => o2 !== observer);
      }
    };
  };
  const unsubscribe = () => {
    _observers = [];
  };
  return {
    get observers() {
      return _observers;
    },
    next,
    subscribe,
    unsubscribe
  };
};
function extractFormValues(fieldsState, formValues) {
  const values = {};
  for (const key in fieldsState) {
    if (fieldsState.hasOwnProperty(key)) {
      const fieldState = fieldsState[key];
      const fieldValue = formValues[key];
      if (fieldState && isObject(fieldState) && fieldValue) {
        const nestedFieldsState = extractFormValues(fieldState, fieldValue);
        if (isObject(nestedFieldsState)) {
          values[key] = nestedFieldsState;
        }
      } else if (fieldsState[key]) {
        values[key] = fieldValue;
      }
    }
  }
  return values;
}
var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;
var isFileInput = (element) => element.type === "file";
var isHTMLElement = (value) => {
  if (!isWeb) {
    return false;
  }
  const owner = value ? value.ownerDocument : 0;
  return value instanceof (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement);
};
var isMultipleSelect = (element) => element.type === `select-multiple`;
var isRadioInput = (element) => element.type === "radio";
var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);
var live = (ref) => isHTMLElement(ref) && ref.isConnected;
function baseGet(object, updatePath) {
  const length = updatePath.slice(0, -1).length;
  let index = 0;
  while (index < length) {
    if (isNullOrUndefined(object)) {
      object = void 0;
      break;
    }
    object = object[updatePath[index]];
    index++;
  }
  return object;
}
function isEmptyArray(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) {
      return false;
    }
  }
  return true;
}
function unset(object, path) {
  if (isString(path) && Object.prototype.hasOwnProperty.call(object, path)) {
    delete object[path];
    return object;
  }
  const paths = Array.isArray(path) ? path : isKey(path) ? [path] : stringToPath(path);
  if (paths.some((segment) => PROTOTYPE_KEYWORDS.includes(String(segment)))) {
    return object;
  }
  const childObject = paths.length === 1 ? object : baseGet(object, paths);
  const index = paths.length - 1;
  const key = paths[index];
  if (childObject) {
    delete childObject[key];
  }
  if (index !== 0 && (isObject(childObject) && isEmptyObject(childObject) || Array.isArray(childObject) && isEmptyArray(childObject))) {
    unset(object, paths.slice(0, -1));
  }
  return object;
}
var objectHasFunction = (data) => {
  for (const key in data) {
    if (isFunction(data[key])) {
      return true;
    }
  }
  return false;
};
function isTraversable(value) {
  return Array.isArray(value) || isObject(value) && !objectHasFunction(value);
}
function markFieldsDirty(data, fields = {}) {
  for (const key in data) {
    const value = data[key];
    if (isTraversable(value)) {
      fields[key] = Array.isArray(value) ? [] : {};
      markFieldsDirty(value, fields[key]);
    } else if (!isUndefined(value)) {
      fields[key] = true;
    }
  }
  return fields;
}
function pruneDirtyFields(value) {
  if (value === false) {
    return void 0;
  }
  if (value === true) {
    return true;
  }
  if (Array.isArray(value)) {
    const result = value.map((value2) => pruneDirtyFields(value2));
    return result.some((value2) => value2 !== void 0) ? result : void 0;
  }
  if (isObject(value)) {
    const result = {};
    for (const key in value) {
      const pruned = pruneDirtyFields(value[key]);
      if (!isUndefined(pruned)) {
        result[key] = pruned;
      }
    }
    return Object.keys(result).length ? result : void 0;
  }
  return void 0;
}
function getDirtyFields(data, formValues, dirtyFieldsFromValues) {
  if (!dirtyFieldsFromValues) {
    dirtyFieldsFromValues = markFieldsDirty(formValues);
  }
  for (const key in data) {
    const value = data[key];
    if (isTraversable(value)) {
      if (isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])) {
        dirtyFieldsFromValues[key] = markFieldsDirty(value, Array.isArray(value) ? [] : {});
      } else {
        getDirtyFields(value, isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
      }
    } else {
      const formValue = formValues[key];
      dirtyFieldsFromValues[key] = !deepEqual(value, formValue);
    }
  }
  return pruneDirtyFields(dirtyFieldsFromValues) || {};
}
const defaultResult = {
  value: false,
  isValid: false
};
const validResult = { value: true, isValid: true };
var getCheckboxValue = (options) => {
  if (Array.isArray(options)) {
    if (options.length > 1) {
      const values = options.filter((option) => option && option.checked && !option.disabled).map((option) => option.value);
      return { value: values, isValid: !!values.length };
    }
    return options[0].checked && !options[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      options[0].attributes && !isUndefined(options[0].attributes.value) ? isUndefined(options[0].value) || options[0].value === "" ? validResult : { value: options[0].value, isValid: true } : validResult
    ) : defaultResult;
  }
  return defaultResult;
};
var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value) ? value : valueAsNumber ? value === "" ? NaN : value ? +value : value : valueAsDate && isString(value) ? new Date(value) : setValueAs ? setValueAs(value) : value;
const defaultReturn = {
  isValid: false,
  value: null
};
var getRadioValue = (options) => Array.isArray(options) ? options.reduce((previous, option) => option && option.checked && !option.disabled ? {
  isValid: true,
  value: option.value
} : previous, defaultReturn) : defaultReturn;
function getFieldValue(_f) {
  const ref = _f.ref;
  if (isFileInput(ref)) {
    return ref.files;
  }
  if (isRadioInput(ref)) {
    return getRadioValue(_f.refs).value;
  }
  if (isMultipleSelect(ref)) {
    return [...ref.selectedOptions].map(({ value }) => value);
  }
  if (isCheckBoxInput(ref)) {
    return getCheckboxValue(_f.refs).value;
  }
  return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}
var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
  const fields = {};
  for (const name of fieldsNames) {
    const field = get(_fields, name);
    field && set(fields, name, field._f);
  }
  return {
    criteriaMode,
    names: [...fieldsNames],
    fields,
    shouldUseNativeValidation
  };
};
var isRegex = (value) => value instanceof RegExp;
var getRuleValue = (rule) => isUndefined(rule) ? rule : isRegex(rule) ? rule.source : isObject(rule) ? isRegex(rule.value) ? rule.value.source : rule.value : rule;
var getValidationModes = (mode) => ({
  isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
  isOnBlur: mode === VALIDATION_MODE.onBlur,
  isOnChange: mode === VALIDATION_MODE.onChange,
  isOnAll: mode === VALIDATION_MODE.all,
  isOnTouch: mode === VALIDATION_MODE.onTouched
});
const ASYNC_FUNCTION = "AsyncFunction";
var hasPromiseValidation = (fieldReference) => {
  if (!fieldReference || !fieldReference.validate)
    return false;
  if (isFunction(fieldReference.validate)) {
    return fieldReference.validate.constructor.name === ASYNC_FUNCTION;
  }
  if (isObject(fieldReference.validate)) {
    for (const key in fieldReference.validate) {
      if (fieldReference.validate[key].constructor.name === ASYNC_FUNCTION) {
        return true;
      }
    }
  }
  return false;
};
var hasValidation = (options) => options.mount && (options.required || options.min || options.max || options.maxLength || options.minLength || options.pattern || options.validate);
var isWatched = (name, _names, isBlurEvent) => {
  if (isBlurEvent)
    return false;
  if (_names.watchAll || _names.watch.has(name))
    return true;
  for (const watchName of _names.watch) {
    if (name.startsWith(watchName) && name.charAt(watchName.length) === ".")
      return true;
  }
  return false;
};
const iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
  for (const key of fieldsNames || Object.keys(fields)) {
    const field = get(fields, key);
    if (field) {
      const { _f, ...currentField } = field;
      if (_f) {
        if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) {
          return true;
        } else if (_f.ref && action(_f.ref, _f.name) && !abortEarly) {
          return true;
        } else {
          if (iterateFieldsByAction(currentField, action)) {
            break;
          }
        }
      } else if (isObject(currentField)) {
        if (iterateFieldsByAction(currentField, action)) {
          break;
        }
      }
    }
  }
  return;
};
function schemaErrorLookup(errors, _fields, name) {
  const error = get(errors, name);
  if (error || isKey(name)) {
    return {
      error,
      name
    };
  }
  const names = name.split(".");
  while (names.length) {
    const fieldName = names.join(".");
    const field = get(_fields, fieldName);
    const foundError = get(errors, fieldName);
    if (field && !Array.isArray(field) && name !== fieldName) {
      return { name };
    }
    if (foundError && foundError.type) {
      return {
        name: fieldName,
        error: foundError
      };
    }
    if (foundError && foundError.root && foundError.root.type) {
      return {
        name: `${fieldName}.root`,
        error: foundError.root
      };
    }
    names.pop();
  }
  return {
    name
  };
}
var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
  updateFormState(formStateData);
  const { name, ...formState } = formStateData;
  const keys = Object.keys(formState);
  return !keys.length || isRoot && keys.length >= Object.keys(_proxyFormState).length || keys.find((key) => _proxyFormState[key] === (!isRoot || VALIDATION_MODE.all));
};
var shouldSubscribeByName = (name, signalName, exact) => !name || !signalName || name === signalName || convertToArrayPayload(name).some((currentName) => currentName && (exact ? currentName === signalName || currentName.startsWith(signalName + ".") : currentName.startsWith(signalName) || signalName.startsWith(currentName)));
var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
  if (mode.isOnAll) {
    return false;
  } else if (!isSubmitted && mode.isOnTouch) {
    return !(isTouched || isBlurEvent);
  } else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
    return !isBlurEvent;
  } else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
    return isBlurEvent;
  }
  return true;
};
var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);
var updateFieldArrayRootError = (errors, error, name) => {
  const existingErrors = get(errors, name);
  const fieldArrayErrors = Array.isArray(existingErrors) ? existingErrors : [];
  set(fieldArrayErrors, ROOT_ERROR_TYPE, error[name]);
  set(errors, name, fieldArrayErrors);
  return errors;
};
function getValidateError(result, ref, type = "validate") {
  if (isString(result) || Array.isArray(result) && result.every(isString) || isBoolean(result) && !result) {
    return {
      type,
      message: isString(result) ? result : "",
      ref
    };
  }
}
var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData) ? validationData : {
  value: validationData,
  message: ""
};
var validateField = async (field, disabledFieldNames, formValues, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
  const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount } = field._f;
  const inputValue = get(formValues, name);
  if (!mount || disabledFieldNames.has(name)) {
    return {};
  }
  const inputRef = refs ? refs[0] : ref;
  const setCustomValidity = (message) => {
    if (shouldUseNativeValidation && inputRef.reportValidity) {
      const validityMessage = isBoolean(message) ? "" : message || "";
      if (refs) {
        refs.forEach((ref2) => ref2.setCustomValidity(validityMessage));
      } else {
        inputRef.setCustomValidity(validityMessage);
      }
      inputRef.reportValidity();
    }
  };
  const error = {};
  const isRadio = isRadioInput(ref);
  const isCheckBox = isCheckBoxInput(ref);
  const isRadioOrCheckbox2 = isRadio || isCheckBox;
  const isEmpty = (valueAsNumber || isFileInput(ref)) && isUndefined(ref.value) && isUndefined(inputValue) || isHTMLElement(ref) && ref.value === "" || inputValue === "" || Array.isArray(inputValue) && !inputValue.length;
  const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
  const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
    const message = exceedMax ? maxLengthMessage : minLengthMessage;
    error[name] = {
      type: exceedMax ? maxType : minType,
      message,
      ref,
      ...appendErrorsCurry(exceedMax ? maxType : minType, message)
    };
  };
  if (isFieldArray ? !Array.isArray(inputValue) || !inputValue.length : required && (!isRadioOrCheckbox2 && (isEmpty || isNullOrUndefined(inputValue)) || isBoolean(inputValue) && !inputValue || isCheckBox && !getCheckboxValue(refs).isValid || isRadio && !getRadioValue(refs).isValid)) {
    const { value, message } = isString(required) ? { value: !!required, message: required } : getValueAndMessage(required);
    if (value) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.required,
        message,
        ref: inputRef,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
    let exceedMax;
    let exceedMin;
    const maxOutput = getValueAndMessage(max);
    const minOutput = getValueAndMessage(min);
    if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
      const valueNumber = ref.valueAsNumber || (inputValue ? +inputValue : inputValue);
      if (!isNullOrUndefined(maxOutput.value)) {
        exceedMax = valueNumber > maxOutput.value;
      }
      if (!isNullOrUndefined(minOutput.value)) {
        exceedMin = valueNumber < minOutput.value;
      }
    } else {
      const valueDate = ref.valueAsDate || new Date(inputValue);
      const convertTimeToDate = (time) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + time);
      const isTime = ref.type == "time";
      const isWeek = ref.type == "week";
      if (isString(maxOutput.value) && inputValue) {
        exceedMax = isTime ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value) : isWeek ? inputValue > maxOutput.value : valueDate > new Date(maxOutput.value);
      }
      if (isString(minOutput.value) && inputValue) {
        exceedMin = isTime ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value) : isWeek ? inputValue < minOutput.value : valueDate < new Date(minOutput.value);
      }
    }
    if (exceedMax || exceedMin) {
      getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if ((maxLength || minLength) && !isEmpty && (isString(inputValue) || isFieldArray && Array.isArray(inputValue))) {
    const maxLengthOutput = getValueAndMessage(maxLength);
    const minLengthOutput = getValueAndMessage(minLength);
    const exceedMax = !isNullOrUndefined(maxLengthOutput.value) && inputValue.length > +maxLengthOutput.value;
    const exceedMin = !isNullOrUndefined(minLengthOutput.value) && inputValue.length < +minLengthOutput.value;
    if (exceedMax || exceedMin) {
      getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if (pattern && !isEmpty && isString(inputValue)) {
    const { value: patternValue, message } = getValueAndMessage(pattern);
    if (isRegex(patternValue) && !inputValue.match(patternValue)) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.pattern,
        message,
        ref,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (validate) {
    if (isFunction(validate)) {
      const result = await validate(inputValue, formValues);
      const validateError = getValidateError(result, inputRef);
      if (validateError) {
        error[name] = {
          ...validateError,
          ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message)
        };
        if (!validateAllFieldCriteria) {
          setCustomValidity(validateError.message);
          return error;
        }
      }
    } else if (isObject(validate)) {
      let validationResult = {};
      for (const key in validate) {
        if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
          break;
        }
        const validateError = getValidateError(await validate[key](inputValue, formValues), inputRef, key);
        if (validateError) {
          validationResult = {
            ...validateError,
            ...appendErrorsCurry(key, validateError.message)
          };
          setCustomValidity(validateError.message);
          if (validateAllFieldCriteria) {
            error[name] = validationResult;
          }
        }
      }
      if (!isEmptyObject(validationResult)) {
        error[name] = {
          ref: inputRef,
          ...validationResult
        };
        if (!validateAllFieldCriteria) {
          return error;
        }
      }
    }
  }
  setCustomValidity(true);
  return error;
};
const defaultOptions = {
  mode: VALIDATION_MODE.onSubmit,
  reValidateMode: VALIDATION_MODE.onChange,
  shouldFocusError: true
};
const FORM_ERROR_TYPE = "form";
const DEFAULT_FORM_STATE = {
  submitCount: 0,
  isDirty: false,
  isReady: false,
  isValidating: false,
  isSubmitted: false,
  isSubmitting: false,
  isSubmitSuccessful: false,
  isValid: false,
  touchedFields: {},
  dirtyFields: {},
  validatingFields: {}
};
function createFormControl(props = {}) {
  let _options = {
    ...defaultOptions,
    ...props
  };
  let _formState = {
    ...cloneObject(DEFAULT_FORM_STATE),
    isLoading: isFunction(_options.defaultValues),
    errors: _options.errors || {},
    disabled: _options.disabled || false
  };
  let _fields = {};
  let _defaultValues = isObject(_options.defaultValues) || isObject(_options.values) ? cloneObject(_options.defaultValues || _options.values) || {} : {};
  let _formValues = _options.shouldUnregister ? {} : cloneObject(_defaultValues);
  let _state = {
    action: false,
    mount: false,
    watch: false,
    keepIsValid: false
  };
  let _names = {
    mount: /* @__PURE__ */ new Set(),
    disabled: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set(),
    registerName: /* @__PURE__ */ new Set()
  };
  let delayErrorCallback;
  let timer = 0;
  let _valuesSubscriberCount = 0;
  let _validationModeBeforeSubmit = getValidationModes(_options.mode);
  let _validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
  const defaultProxyFormState = {
    isDirty: false,
    dirtyFields: false,
    validatingFields: false,
    touchedFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  };
  const _proxyFormState = {
    ...defaultProxyFormState
  };
  let _proxySubscribeFormState = {
    ..._proxyFormState
  };
  const _subjects = {
    array: createSubject(),
    state: createSubject()
  };
  const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
  const debounce = (callback) => (wait) => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
  const _setValid = async (shouldUpdateValid) => {
    if (_state.keepIsValid) {
      return;
    }
    if (!_options.disabled && (_proxyFormState.isValid || _proxySubscribeFormState.isValid || shouldUpdateValid)) {
      let isValid2;
      if (_options.resolver) {
        isValid2 = isEmptyObject((await _runSchema()).errors);
        _updateIsValidating();
      } else {
        isValid2 = await executeBuiltInValidation({
          fields: _fields,
          onlyCheckValid: true,
          eventType: EVENTS.VALID
        });
      }
      if (isValid2 !== _formState.isValid) {
        _subjects.state.next({
          isValid: isValid2
        });
      }
    }
  };
  const _updateIsValidating = (names, isValidating) => {
    if (!_options.disabled && (_proxyFormState.isValidating || _proxyFormState.validatingFields || _proxySubscribeFormState.isValidating || _proxySubscribeFormState.validatingFields)) {
      (names || Array.from(_names.mount)).forEach((name) => {
        if (name) {
          isValidating ? set(_formState.validatingFields, name, isValidating) : unset(_formState.validatingFields, name);
        }
      });
      _subjects.state.next({
        validatingFields: _formState.validatingFields,
        isValidating: !isEmptyObject(_formState.validatingFields)
      });
    }
  };
  const _updateDirtyFields = () => {
    _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
  };
  const _setFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
    if (args && method && !_options.disabled) {
      _state.action = true;
      if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
        const fieldValues = method(get(_fields, name), args.argA, args.argB);
        shouldSetValues && set(_fields, name, fieldValues);
      }
      if (shouldUpdateFieldsAndState && Array.isArray(get(_formState.errors, name))) {
        const errors = method(get(_formState.errors, name), args.argA, args.argB);
        shouldSetValues && set(_formState.errors, name, errors);
        unsetEmptyArray(_formState.errors, name);
      }
      if ((_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && shouldUpdateFieldsAndState && Array.isArray(get(_formState.touchedFields, name))) {
        const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
        shouldSetValues && set(_formState.touchedFields, name, touchedFields);
      }
      if (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) {
        _updateDirtyFields();
      }
      _subjects.state.next({
        name,
        isDirty: _getDirty(name, values),
        dirtyFields: _formState.dirtyFields,
        errors: _formState.errors,
        isValid: _formState.isValid
      });
    } else {
      set(_formValues, name, values);
    }
  };
  const updateErrors = (name, error) => {
    set(_formState.errors, name, error);
    _formState.errors = { ..._formState.errors };
    _subjects.state.next({
      errors: _formState.errors
    });
  };
  const _setErrors = (errors) => {
    _formState.errors = errors;
    _subjects.state.next({
      errors: _formState.errors,
      isValid: false
    });
  };
  const hasExplicitNullIntermediate = (name) => {
    const segments = isKey(name) ? [name] : stringToPath(name);
    let formValues = _formValues;
    let defaultValues2 = _defaultValues;
    for (let i2 = 0; i2 < segments.length - 1; i2++) {
      const key = segments[i2];
      formValues = isNullOrUndefined(formValues) ? formValues : formValues[key];
      defaultValues2 = isNullOrUndefined(defaultValues2) ? defaultValues2 : defaultValues2[key];
      if (formValues === null && defaultValues2 !== null) {
        return true;
      }
    }
    return false;
  };
  const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
    const field = get(_fields, name);
    if (field) {
      if (hasExplicitNullIntermediate(name)) {
        return;
      }
      const wasUnsetInFormValues = isUndefined(get(_formValues, name));
      const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
      isUndefined(defaultValue) || ref && ref.defaultChecked || shouldSkipSetValueAs ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f)) : setFieldValue(name, defaultValue);
      if (_state.mount && !_state.action) {
        _setValid();
        if (wasUnsetInFormValues && _formState.isDirty && (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty)) {
          const isDirty2 = _getDirty();
          if (!isDirty2) {
            _formState.isDirty = false;
            _subjects.state.next({ ..._formState });
          }
        }
        if (props.shouldUnregister && wasUnsetInFormValues && !isUndefined(get(_formValues, name)) && isWatched(name, _names)) {
          _state.watch = true;
        }
      }
    }
  };
  const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
    let shouldUpdateField = false;
    let isPreviousDirty = false;
    const output = {
      name
    };
    if (!_options.disabled) {
      if (!isBlurEvent || shouldDirty) {
        const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
        if (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty) {
          isPreviousDirty = _formState.isDirty;
          _formState.isDirty = output.isDirty = !isCurrentFieldPristine || _getDirty();
          shouldUpdateField = isPreviousDirty !== output.isDirty;
        }
        isPreviousDirty = !!get(_formState.dirtyFields, name);
        if (isCurrentFieldPristine !== _formState.isDirty) {
          _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
        } else {
          isCurrentFieldPristine ? unset(_formState.dirtyFields, name) : set(_formState.dirtyFields, name, true);
        }
        output.dirtyFields = _formState.dirtyFields;
        shouldUpdateField = shouldUpdateField || (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) && isPreviousDirty !== !isCurrentFieldPristine;
      }
      if (isBlurEvent) {
        const isPreviousFieldTouched = get(_formState.touchedFields, name);
        if (!isPreviousFieldTouched) {
          set(_formState.touchedFields, name, isBlurEvent);
          output.touchedFields = _formState.touchedFields;
          shouldUpdateField = shouldUpdateField || (_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && isPreviousFieldTouched !== isBlurEvent;
        }
      }
      shouldUpdateField && shouldRender && _subjects.state.next(output);
    }
    return shouldUpdateField ? output : {};
  };
  const shouldRenderByError = (name, isValid2, error, fieldState) => {
    const previousFieldError = get(_formState.errors, name);
    const shouldUpdateValid = (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isBoolean(isValid2) && _formState.isValid !== isValid2;
    if (_options.delayError && error) {
      delayErrorCallback = debounce(() => updateErrors(name, error));
      delayErrorCallback(_options.delayError);
    } else {
      clearTimeout(timer);
      delayErrorCallback = null;
      error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
      _formState.errors = { ..._formState.errors };
    }
    if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) || !isEmptyObject(fieldState) || shouldUpdateValid) {
      const updatedFormState = {
        ...fieldState,
        ...shouldUpdateValid && isBoolean(isValid2) ? { isValid: isValid2 } : {},
        errors: _formState.errors,
        name
      };
      _formState = {
        ..._formState,
        ...updatedFormState
      };
      _subjects.state.next(updatedFormState);
    }
  };
  const _runSchema = async (name) => {
    _updateIsValidating(name, true);
    return await _options.resolver(_formValues, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation));
  };
  const executeSchemaAndUpdateState = async (names) => {
    const { errors } = await _runSchema(names);
    _updateIsValidating(names);
    if (names) {
      for (const name of names) {
        const error = get(errors, name);
        error ? _names.array.has(name) && isObject(error) && !Object.keys(error).some((key) => !Number.isNaN(Number(key))) ? updateFieldArrayRootError(_formState.errors, { [name]: error }, name) : set(_formState.errors, name, error) : unset(_formState.errors, name);
      }
      _formState.errors = { ..._formState.errors };
    } else {
      _formState.errors = errors;
    }
    return errors;
  };
  const validateForm = async ({ name, eventType }) => {
    if (props.validate) {
      const result = await props.validate({
        formValues: _formValues,
        formState: _formState,
        name,
        eventType
      });
      if (isObject(result)) {
        for (const key in result) {
          const error = result[key];
          if (error) {
            setError(`${FORM_ERROR_TYPE}.${key}`, {
              message: isString(error.message) ? error.message : "",
              type: error.type || INPUT_VALIDATION_RULES.validate
            });
          }
        }
      } else if (isString(result) || !result) {
        setError(FORM_ERROR_TYPE, {
          message: result || "",
          type: INPUT_VALIDATION_RULES.validate
        });
      } else {
        clearErrors(FORM_ERROR_TYPE);
      }
      return result;
    }
    return true;
  };
  const executeBuiltInValidation = async ({ fields, onlyCheckValid, name, eventType, context = {
    valid: true,
    runRootValidation: false
  } }) => {
    if (props.validate) {
      context.runRootValidation = true;
      const result = await validateForm({
        name,
        eventType
      });
      if (!result) {
        context.valid = false;
        if (onlyCheckValid) {
          return context.valid;
        }
      }
    }
    for (const name2 in fields) {
      const field = fields[name2];
      if (field) {
        const { _f, ...fieldValue } = field;
        if (_f) {
          const isFieldArrayRoot = _names.array.has(_f.name);
          const isPromiseFunction = field._f && hasPromiseValidation(field._f);
          const shouldTrackIsValidatingState = _proxyFormState.validatingFields || _proxyFormState.isValidating || _proxySubscribeFormState.validatingFields || _proxySubscribeFormState.isValidating;
          if (isPromiseFunction && shouldTrackIsValidatingState) {
            _updateIsValidating([_f.name], true);
          }
          const fieldError = await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation && !onlyCheckValid, isFieldArrayRoot);
          if (isPromiseFunction && shouldTrackIsValidatingState) {
            _updateIsValidating([_f.name]);
          }
          if (fieldError[_f.name]) {
            context.valid = false;
            if (onlyCheckValid) {
              break;
            }
          }
          !onlyCheckValid && (get(fieldError, _f.name) ? isFieldArrayRoot ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name) : set(_formState.errors, _f.name, fieldError[_f.name]) : unset(_formState.errors, _f.name));
          if (props.shouldUseNativeValidation && fieldError[_f.name]) {
            break;
          }
        }
        !isEmptyObject(fieldValue) && await executeBuiltInValidation({
          context,
          onlyCheckValid,
          fields: fieldValue,
          name: name2,
          eventType
        });
      }
    }
    return context.valid;
  };
  const _removeUnmounted = () => {
    for (const name of _names.unMount) {
      const field = get(_fields, name);
      field && (field._f.refs ? field._f.refs.every((ref) => !live(ref)) : !live(field._f.ref)) && unregister(name);
    }
    _names.unMount = /* @__PURE__ */ new Set();
  };
  const _getDirty = (name, data) => !_options.disabled && (name && data && set(_formValues, name, data), !deepEqual(_state.mount ? _formValues : _defaultValues, _defaultValues));
  const _getWatch = (names, defaultValue, isGlobal) => generateWatchOutput(names, _names, {
    ..._state.mount ? _formValues : isUndefined(defaultValue) ? _defaultValues : isString(names) ? { [names]: defaultValue } : defaultValue
  }, isGlobal, defaultValue);
  const _getFieldArray = (name) => compact(get(_state.mount ? _formValues : _defaultValues, name, _options.shouldUnregister ? get(_defaultValues, name, []) : []));
  const setFieldValue = (name, value, options = {}, skipClone = false, skipRender = false) => {
    const field = get(_fields, name);
    let fieldValue = value;
    if (field) {
      const fieldReference = field._f;
      if (fieldReference) {
        !fieldReference.disabled && set(_formValues, name, getFieldValueAs(value, fieldReference));
        fieldValue = isHTMLElement(fieldReference.ref) && isNullOrUndefined(value) ? "" : value;
        if (isMultipleSelect(fieldReference.ref)) {
          [...fieldReference.ref.options].forEach((optionRef) => optionRef.selected = fieldValue.includes(optionRef.value));
        } else if (fieldReference.refs) {
          if (isCheckBoxInput(fieldReference.ref)) {
            fieldReference.refs.forEach((checkboxRef) => {
              if (!checkboxRef.defaultChecked || !checkboxRef.disabled) {
                if (Array.isArray(fieldValue)) {
                  checkboxRef.checked = !!fieldValue.find((data) => data === checkboxRef.value);
                } else {
                  checkboxRef.checked = fieldValue === checkboxRef.value || !!fieldValue;
                }
              }
            });
          } else {
            fieldReference.refs.forEach((radioRef) => radioRef.checked = radioRef.value === fieldValue);
          }
        } else if (isFileInput(fieldReference.ref)) {
          fieldReference.ref.value = "";
        } else {
          fieldReference.ref.value = fieldValue;
          if (!fieldReference.ref.type && !skipRender) {
            _subjects.state.next({
              name,
              values: skipClone ? _formValues : cloneObject(_formValues)
            });
          }
        }
      }
    }
    (options.shouldDirty || options.shouldTouch) && updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, !skipRender);
    options.shouldValidate && trigger(name);
  };
  const setFieldValues = (name, value, options, skipClone = false, skipRender = false) => {
    for (const fieldKey in value) {
      if (!value.hasOwnProperty(fieldKey)) {
        return;
      }
      const fieldValue = value[fieldKey];
      const fieldName = name + "." + fieldKey;
      const field = get(_fields, fieldName);
      (_names.array.has(name) || isObject(fieldValue) || field && !field._f) && !isDateObject(fieldValue) ? setFieldValues(fieldName, fieldValue, options, skipClone, skipRender) : setFieldValue(fieldName, fieldValue, options, skipClone, skipRender);
    }
  };
  const _setValue = (name, value, options, skipClone, skipStateEmit = false) => {
    const field = get(_fields, name);
    const isFieldArray = _names.array.has(name);
    const cloneValue = skipClone ? value : cloneObject(value);
    const previousValue = get(_formValues, name);
    const isValueUnchanged = deepEqual(previousValue, cloneValue);
    if (!isValueUnchanged) {
      set(_formValues, name, cloneValue);
    }
    if (isFieldArray) {
      _subjects.array.next({
        name,
        values: skipClone ? _formValues : cloneObject(_formValues)
      });
      if ((_proxyFormState.isDirty || _proxyFormState.dirtyFields || _proxySubscribeFormState.isDirty || _proxySubscribeFormState.dirtyFields) && options.shouldDirty) {
        _updateDirtyFields();
        if (!skipStateEmit) {
          _subjects.state.next({
            name,
            dirtyFields: _formState.dirtyFields,
            isDirty: _getDirty(name, cloneValue)
          });
        }
      }
    } else {
      const isEmpty = Array.isArray(cloneValue) && !cloneValue.length || isEmptyObject(cloneValue);
      if (!field || field._f || isNullOrUndefined(cloneValue) || isEmpty) {
        setFieldValue(name, cloneValue, options, skipClone, skipStateEmit);
      } else {
        setFieldValues(name, cloneValue, options, skipClone, skipStateEmit);
      }
    }
    if (!isValueUnchanged && !skipStateEmit) {
      const watched = isWatched(name, _names);
      const values = skipClone ? _formValues : cloneObject(_formValues);
      _subjects.state.next({
        ...watched && _formState,
        name: _state.mount || watched ? name : void 0,
        values
      });
    }
  };
  const setValue = (name, value, options = {}) => _setValue(name, value, options, false);
  const setValues = (formValues, options = {}) => {
    const updatedFormValues = isFunction(formValues) ? formValues(_formValues) : formValues;
    if (!deepEqual(_formValues, updatedFormValues)) {
      _formValues = {
        ..._formValues,
        ...updatedFormValues
      };
      const flattenedUpdates = flatten(updatedFormValues);
      for (const fieldName of _names.mount) {
        if (fieldName in flattenedUpdates) {
          _setValue(fieldName, flattenedUpdates[fieldName], options, true, true);
        }
      }
      _subjects.state.next({
        ..._formState,
        name: void 0,
        type: void 0,
        ..._valuesSubscriberCount ? { values: _formValues } : {}
      });
      if (options.shouldValidate) {
        _setValid();
      }
    }
  };
  const onChange = async (event) => {
    _state.mount = true;
    const target = event.target;
    let name = target.name;
    let isFieldValueUpdated = true;
    const field = get(_fields, name);
    const _updateIsFieldValueUpdated = (fieldValue) => {
      isFieldValueUpdated = Number.isNaN(fieldValue) || isDateObject(fieldValue) && isNaN(fieldValue.getTime()) || deepEqual(fieldValue, get(_formValues, name, fieldValue));
    };
    if (field) {
      let error;
      let isValid2;
      const fieldValue = target.type ? getFieldValue(field._f) : getEventValue(event);
      const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
      const hasNoValidationEffect = !hasValidation(field._f) && !props.validate && !_options.resolver && !get(_formState.errors, name) && !field._f.deps;
      const shouldSkipValidation = hasNoValidationEffect || skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, _validationModeAfterSubmit, _validationModeBeforeSubmit);
      const watched = isWatched(name, _names, isBlurEvent);
      set(_formValues, name, fieldValue);
      if (isBlurEvent) {
        if (!target || !target.readOnly) {
          field._f.onBlur && field._f.onBlur(event);
          delayErrorCallback && delayErrorCallback(0);
        }
      } else if (field._f.onChange) {
        field._f.onChange(event);
      }
      const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent);
      const shouldRender = !isEmptyObject(fieldState) || watched;
      !isBlurEvent && _subjects.state.next({
        name,
        type: event.type,
        ..._valuesSubscriberCount ? { values: cloneObject(_formValues) } : {}
      });
      if (shouldSkipValidation) {
        if ((!hasNoValidationEffect || !_formState.isValid) && (_proxyFormState.isValid || _proxySubscribeFormState.isValid)) {
          if (_options.mode === "onBlur") {
            if (isBlurEvent) {
              _setValid();
            }
          } else if (!isBlurEvent) {
            _setValid();
          }
        }
        return shouldRender && _subjects.state.next({ name, ...watched ? {} : fieldState });
      }
      if (!_options.resolver && props.validate) {
        await validateForm({
          name,
          eventType: event.type
        });
      }
      !isBlurEvent && watched && _subjects.state.next({ ..._formState });
      if (_options.resolver) {
        const { errors } = await _runSchema([name]);
        _updateIsValidating([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (!isFieldValueUpdated) {
          !isEmptyObject(fieldState) && _subjects.state.next(fieldState);
          return;
        }
        const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
        const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
        error = errorLookupResult.error;
        name = errorLookupResult.name;
        isValid2 = isEmptyObject(errors);
      } else {
        _updateIsValidating([name], true);
        error = (await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
        _updateIsValidating([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (isFieldValueUpdated) {
          if (error) {
            isValid2 = false;
          } else if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) {
            isValid2 = await executeBuiltInValidation({
              fields: _fields,
              onlyCheckValid: true,
              name,
              eventType: event.type
            });
          }
        }
      }
      if (isFieldValueUpdated) {
        field._f.deps && (!Array.isArray(field._f.deps) || field._f.deps.length > 0) && trigger(field._f.deps);
        shouldRenderByError(name, isValid2, error, fieldState);
      }
    }
  };
  const _focusInput = (ref, key) => {
    if (get(_formState.errors, key) && ref.focus) {
      ref.focus();
      return 1;
    }
    return;
  };
  const trigger = async (name, options = {}) => {
    let isValid2;
    let validationResult;
    const fieldNames = convertToArrayPayload(name);
    if (_options.resolver) {
      const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
      isValid2 = isEmptyObject(errors);
      validationResult = name ? !fieldNames.some((name2) => get(errors, name2)) : isValid2;
    } else if (name) {
      validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
        const field = get(_fields, fieldName);
        return await executeBuiltInValidation({
          fields: field && field._f ? { [fieldName]: field } : field,
          eventType: EVENTS.TRIGGER
        });
      }))).every(Boolean);
      !(!validationResult && !_formState.isValid) && _setValid();
    } else {
      validationResult = isValid2 = await executeBuiltInValidation({
        fields: _fields,
        name,
        eventType: EVENTS.TRIGGER
      });
    }
    _subjects.state.next({
      ...!isString(name) || (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isValid2 !== _formState.isValid ? {} : { name },
      ..._options.resolver || !name ? { isValid: isValid2 } : {},
      errors: _formState.errors
    });
    options.shouldFocus && !validationResult && iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount);
    return validationResult;
  };
  const getValues = (fieldNames, config) => {
    let values = {
      ..._state.mount ? _formValues : _defaultValues
    };
    if (config) {
      values = extractFormValues(config.dirtyFields ? _formState.dirtyFields : _formState.touchedFields, values);
    }
    return isUndefined(fieldNames) ? values : isString(fieldNames) ? get(values, fieldNames) : fieldNames.map((name) => get(values, name));
  };
  const getFieldState = (name, formState) => ({
    invalid: !!get((formState || _formState).errors, name),
    isDirty: !!get((formState || _formState).dirtyFields, name),
    error: get((formState || _formState).errors, name),
    isValidating: !!get(_formState.validatingFields, name),
    isTouched: !!get((formState || _formState).touchedFields, name)
  });
  const clearErrors = (name) => {
    const names = name ? convertToArrayPayload(name) : void 0;
    names === null || names === void 0 ? void 0 : names.forEach((inputName) => unset(_formState.errors, inputName));
    if (names) {
      names.forEach((inputName) => {
        _subjects.state.next({
          name: inputName,
          errors: _formState.errors
        });
      });
    } else {
      _subjects.state.next({
        errors: {}
      });
    }
  };
  const setError = (name, error, options) => {
    const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
    const currentError = get(_formState.errors, name) || {};
    const { ref: currentRef, message, type, ...restOfErrorTree } = currentError;
    set(_formState.errors, name, {
      ...restOfErrorTree,
      ...error,
      ref
    });
    _subjects.state.next({
      name,
      errors: _formState.errors,
      isValid: false
    });
    options && options.shouldFocus && ref && ref.focus && ref.focus();
  };
  const watch = (name, defaultValue) => {
    if (isFunction(name)) {
      _valuesSubscriberCount++;
      const { unsubscribe } = _subjects.state.subscribe({
        next: (payload) => "values" in payload && name(payload.values || _getWatch(void 0, defaultValue), payload)
      });
      let called = false;
      return {
        unsubscribe: () => {
          if (called) {
            return;
          }
          called = true;
          _valuesSubscriberCount--;
          unsubscribe();
        }
      };
    }
    return _getWatch(name, defaultValue, true);
  };
  const _subscribe = (props2) => {
    var _a;
    const needsValues = !!((_a = props2.formState) === null || _a === void 0 ? void 0 : _a.values);
    if (needsValues) {
      _valuesSubscriberCount++;
    }
    const { unsubscribe } = _subjects.state.subscribe({
      next: (formState) => {
        if (shouldSubscribeByName(props2.name, formState.name, props2.exact) && shouldRenderFormState(formState, props2.formState || _proxyFormState, _setFormState, props2.reRenderRoot)) {
          const snapshot = { ..._formValues };
          props2.callback({
            values: snapshot,
            ..._formState,
            ...formState,
            defaultValues: _defaultValues
          });
        }
      }
    });
    if (!needsValues) {
      return unsubscribe;
    }
    let called = false;
    return () => {
      if (called) {
        return;
      }
      called = true;
      _valuesSubscriberCount--;
      unsubscribe();
    };
  };
  const subscribe = (props2) => {
    _state.mount = true;
    _proxySubscribeFormState = {
      ..._proxySubscribeFormState,
      ...props2.formState
    };
    return _subscribe({
      ...props2,
      formState: {
        ...defaultProxyFormState,
        ...props2.formState
      }
    });
  };
  const unregister = (name, options = {}) => {
    for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
      _names.mount.delete(fieldName);
      _names.array.delete(fieldName);
      if (!options.keepValue) {
        unset(_fields, fieldName);
        unset(_formValues, fieldName);
      }
      !options.keepError && unset(_formState.errors, fieldName);
      !options.keepDirty && unset(_formState.dirtyFields, fieldName);
      !options.keepTouched && unset(_formState.touchedFields, fieldName);
      !options.keepIsValidating && unset(_formState.validatingFields, fieldName);
      !_options.shouldUnregister && !options.keepDefaultValue && unset(_defaultValues, fieldName);
    }
    _subjects.state.next({
      values: cloneObject(_formValues)
    });
    _subjects.state.next({
      ..._formState,
      ...!options.keepDirty ? {} : { isDirty: _getDirty() }
    });
    !options.keepIsValid && _setValid();
  };
  const _setDisabledField = ({ disabled, name }) => {
    if (isBoolean(disabled) && _state.mount || !!disabled || _names.disabled.has(name)) {
      const wasDisabled = _names.disabled.has(name);
      const isDisabled = !!disabled;
      const disabledStateChanged = wasDisabled !== isDisabled;
      disabled ? _names.disabled.add(name) : _names.disabled.delete(name);
      disabledStateChanged && _state.mount && !_state.action && _setValid();
    }
  };
  const register = (name, options = {}) => {
    let field = get(_fields, name);
    const disabledIsDefined = isBoolean(options.disabled) || isBoolean(_options.disabled);
    const shouldRevalidateRemount = !_names.registerName.has(name) && field && field._f && !field._f.mount;
    set(_fields, name, {
      ...field || {},
      _f: {
        ...field && field._f ? field._f : { ref: { name } },
        name,
        mount: true,
        ...options
      }
    });
    _names.mount.add(name);
    if (field && !shouldRevalidateRemount) {
      _setDisabledField({
        disabled: isBoolean(options.disabled) ? options.disabled : _options.disabled,
        name
      });
    } else {
      updateValidAndValue(name, true, options.value);
    }
    return {
      ...disabledIsDefined ? { disabled: options.disabled || _options.disabled } : {},
      ..._options.progressive ? {
        required: !!options.required,
        min: getRuleValue(options.min),
        max: getRuleValue(options.max),
        minLength: getRuleValue(options.minLength),
        maxLength: getRuleValue(options.maxLength),
        pattern: getRuleValue(options.pattern)
      } : {},
      name,
      onChange,
      onBlur: onChange,
      ref: (ref) => {
        if (ref) {
          _names.registerName.add(name);
          register(name, options);
          _names.registerName.delete(name);
          field = get(_fields, name);
          const fieldRef = isUndefined(ref.value) ? ref.querySelectorAll ? ref.querySelectorAll("input,select,textarea")[0] || ref : ref : ref;
          const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
          const refs = field._f.refs || [];
          if (radioOrCheckbox ? refs.find((option) => option === fieldRef) : fieldRef === field._f.ref) {
            return;
          }
          set(_fields, name, {
            _f: {
              ...field._f,
              ...radioOrCheckbox ? {
                refs: [
                  ...refs.filter(live),
                  fieldRef,
                  ...Array.isArray(get(_defaultValues, name)) ? [{}] : []
                ],
                ref: { type: fieldRef.type, name }
              } : { ref: fieldRef }
            }
          });
          updateValidAndValue(name, false, void 0, fieldRef);
        } else {
          field = get(_fields, name, {});
          if (field._f) {
            field._f.mount = false;
          }
          (_options.shouldUnregister || options.shouldUnregister) && !(isNameInFieldArray(_names.array, name) && _state.action) && _names.unMount.add(name);
        }
      }
    };
  };
  const _focusError = () => _options.shouldFocusError && !_options.shouldUseNativeValidation && iterateFieldsByAction(_fields, _focusInput, _names.mount);
  const _disableForm = (disabled) => {
    if (isBoolean(disabled)) {
      _subjects.state.next({ disabled });
      iterateFieldsByAction(_fields, (ref, name) => {
        const currentField = get(_fields, name);
        if (currentField) {
          ref.disabled = currentField._f.disabled || disabled;
          if (Array.isArray(currentField._f.refs)) {
            currentField._f.refs.forEach((inputRef) => {
              inputRef.disabled = currentField._f.disabled || disabled;
            });
          }
        }
      }, 0, false);
    }
  };
  const handleSubmit = (onValid, onInvalid) => async (e) => {
    let onValidError = void 0;
    if (e) {
      e.preventDefault && e.preventDefault();
      e.persist && e.persist();
    }
    let fieldValues = cloneObject(_formValues);
    _subjects.state.next({
      isSubmitting: true
    });
    if (_options.resolver) {
      const { errors, values } = await _runSchema();
      _updateIsValidating();
      _formState.errors = errors;
      fieldValues = cloneObject(values);
    } else {
      await executeBuiltInValidation({
        fields: _fields,
        eventType: EVENTS.SUBMIT
      });
    }
    if (_names.disabled.size) {
      for (const name of _names.disabled) {
        unset(fieldValues, name);
      }
    }
    unset(_formState.errors, ROOT_ERROR_TYPE);
    if (isEmptyObject(_formState.errors)) {
      _subjects.state.next({
        errors: {}
      });
      try {
        await onValid(fieldValues, e);
      } catch (error) {
        onValidError = error;
      }
    } else {
      if (onInvalid) {
        await onInvalid({ ..._formState.errors }, e);
      }
      _focusError();
      setTimeout(_focusError);
    }
    _subjects.state.next({
      isSubmitted: true,
      isSubmitting: false,
      isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
      submitCount: _formState.submitCount + 1,
      errors: _formState.errors
    });
    if (onValidError) {
      throw onValidError;
    }
  };
  const resetField = (name, options = {}) => {
    if (get(_fields, name)) {
      if (isUndefined(options.defaultValue)) {
        setValue(name, cloneObject(get(_defaultValues, name)));
      } else {
        setValue(name, options.defaultValue);
        set(_defaultValues, name, cloneObject(options.defaultValue));
      }
      if (!options.keepTouched) {
        unset(_formState.touchedFields, name);
      }
      if (!options.keepDirty) {
        unset(_formState.dirtyFields, name);
        _formState.isDirty = options.defaultValue ? _getDirty(name, cloneObject(get(_defaultValues, name))) : _getDirty();
      }
      if (!options.keepError) {
        unset(_formState.errors, name);
        _proxyFormState.isValid && _setValid();
      }
      _subjects.state.next({ ..._formState });
    }
  };
  const _reset = (formValues, keepStateOptions = {}) => {
    const updatedValues = formValues ? cloneObject(formValues) : _defaultValues;
    const cloneUpdatedValues = cloneObject(updatedValues);
    const isEmptyResetValues = isEmptyObject(formValues);
    const values = cloneUpdatedValues;
    if (!keepStateOptions.keepDefaultValues) {
      _defaultValues = updatedValues;
    }
    if (!keepStateOptions.keepValues) {
      if (keepStateOptions.keepDirtyValues) {
        const fieldsToCheck = /* @__PURE__ */ new Set([
          ..._names.mount,
          ...Object.keys(getDirtyFields(_defaultValues, _formValues))
        ]);
        for (const fieldName of Array.from(fieldsToCheck)) {
          const isDirty2 = get(_formState.dirtyFields, fieldName);
          const existingValue = get(_formValues, fieldName);
          const newValue = get(values, fieldName);
          if (isDirty2 && !isUndefined(existingValue)) {
            set(values, fieldName, existingValue);
          } else if (!isDirty2 && !isUndefined(newValue)) {
            setValue(fieldName, newValue);
          }
        }
      } else {
        if (isWeb && isUndefined(formValues)) {
          for (const name of _names.mount) {
            const field = get(_fields, name);
            if (field && field._f) {
              const fieldReference = Array.isArray(field._f.refs) ? field._f.refs[0] : field._f.ref;
              if (isHTMLElement(fieldReference)) {
                const form = fieldReference.closest("form");
                if (form) {
                  form.reset();
                  break;
                }
              }
            }
          }
        }
        if (keepStateOptions.keepFieldsRef) {
          for (const fieldName of _names.mount) {
            setValue(fieldName, get(values, fieldName));
          }
        } else {
          _fields = {};
        }
      }
      if (_options.shouldUnregister) {
        _formValues = keepStateOptions.keepDefaultValues ? cloneObject(_defaultValues) : {};
        if (keepStateOptions.keepFieldsRef) {
          for (const fieldName of _names.mount) {
            set(_formValues, fieldName, get(values, fieldName));
          }
        }
      } else {
        _formValues = cloneObject(values);
      }
      _subjects.array.next({
        values: { ...values }
      });
      _subjects.state.next({
        name: void 0,
        type: void 0,
        values: { ...values }
      });
    }
    _names = {
      mount: keepStateOptions.keepDirtyValues ? _names.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      registerName: /* @__PURE__ */ new Set(),
      disabled: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: false,
      focus: ""
    };
    _state.mount = !_proxyFormState.isValid || !!keepStateOptions.keepIsValid || !!keepStateOptions.keepDirtyValues || !_options.shouldUnregister && !isEmptyObject(values);
    _state.watch = !!_options.shouldUnregister;
    _state.keepIsValid = !!keepStateOptions.keepIsValid;
    _state.action = false;
    if (!keepStateOptions.keepErrors) {
      _formState.errors = {};
    }
    _subjects.state.next({
      submitCount: keepStateOptions.keepSubmitCount ? _formState.submitCount : 0,
      isDirty: isEmptyResetValues ? false : keepStateOptions.keepDirty ? _formState.isDirty : keepStateOptions.keepValues ? _getDirty() : !!(keepStateOptions.keepDefaultValues && !deepEqual(formValues, _defaultValues)),
      isSubmitted: keepStateOptions.keepIsSubmitted ? _formState.isSubmitted : false,
      dirtyFields: isEmptyResetValues ? {} : keepStateOptions.keepDirtyValues ? keepStateOptions.keepDefaultValues && _formValues ? getDirtyFields(_defaultValues, _formValues) : _formState.dirtyFields : keepStateOptions.keepDefaultValues && formValues ? getDirtyFields(_defaultValues, formValues) : keepStateOptions.keepDirty ? _formState.dirtyFields : {},
      touchedFields: keepStateOptions.keepTouched ? _formState.touchedFields : {},
      errors: keepStateOptions.keepErrors ? _formState.errors : {},
      isSubmitSuccessful: keepStateOptions.keepIsSubmitSuccessful ? _formState.isSubmitSuccessful : false,
      isSubmitting: false,
      defaultValues: _defaultValues
    });
  };
  const reset = (formValues, keepStateOptions) => _reset(isFunction(formValues) ? formValues(_formValues) : formValues, { ..._options.resetOptions, ...keepStateOptions });
  const setFocus = (name, options = {}) => {
    const field = get(_fields, name);
    const fieldReference = field && field._f;
    if (fieldReference) {
      const fieldRef = fieldReference.refs ? fieldReference.refs[0] : fieldReference.ref;
      if (fieldRef.focus) {
        setTimeout(() => {
          fieldRef.focus();
          options.shouldSelect && isFunction(fieldRef.select) && fieldRef.select();
        });
      }
    }
  };
  const _setFormState = (updatedFormState) => {
    const { name, type, values, ...formState } = updatedFormState;
    _formState = {
      ..._formState,
      ...formState
    };
  };
  const _resetDefaultValues = () => isFunction(_options.defaultValues) && _options.defaultValues().then((values) => {
    reset(values, _options.resetOptions);
    _subjects.state.next({
      isLoading: false
    });
  });
  const resetDefaultValues = (values, options = {}) => {
    _defaultValues = cloneObject(values);
    if (!options.keepDirty) {
      const newDirtyFields = getDirtyFields(_defaultValues, _formValues);
      _formState.dirtyFields = newDirtyFields;
      _formState.isDirty = !isEmptyObject(newDirtyFields);
    }
    if (!options.keepIsValid) {
      _setValid();
    }
    _subjects.state.next({
      ..._formState,
      defaultValues: _defaultValues
    });
  };
  const methods = {
    control: {
      register,
      unregister,
      getFieldState,
      handleSubmit,
      setError,
      _subscribe,
      _runSchema,
      _updateIsValidating,
      _focusError,
      _getWatch,
      _getDirty,
      _setValid,
      _setFieldArray,
      _setDisabledField,
      _setErrors,
      _getFieldArray,
      _reset,
      _resetDefaultValues,
      _removeUnmounted,
      _disableForm,
      _subjects,
      _proxyFormState,
      get _fields() {
        return _fields;
      },
      get _formValues() {
        return _formValues;
      },
      get _state() {
        return _state;
      },
      set _state(value) {
        _state = value;
      },
      get _defaultValues() {
        return _defaultValues;
      },
      get _names() {
        return _names;
      },
      set _names(value) {
        _names = value;
      },
      get _formState() {
        return _formState;
      },
      get _options() {
        return _options;
      },
      set _options(value) {
        _options = {
          ..._options,
          ...value
        };
        _validationModeBeforeSubmit = getValidationModes(_options.mode);
        _validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
      }
    },
    subscribe,
    trigger,
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    reset,
    resetField,
    resetDefaultValues,
    clearErrors,
    unregister,
    setError,
    setFocus,
    getFieldState
  };
  return {
    ...methods,
    formControl: methods
  };
}
function useForm(props = {}) {
  const _formControl = React.useRef(void 0);
  const _values = React.useRef(void 0);
  const _formControlProp = React.useRef(props.formControl);
  const [formState, updateFormState] = React.useState(() => ({
    ...cloneObject(DEFAULT_FORM_STATE),
    isLoading: isFunction(props.defaultValues),
    errors: props.errors || {},
    disabled: props.disabled || false,
    defaultValues: isFunction(props.defaultValues) ? void 0 : props.defaultValues
  }));
  if (!_formControl.current || props.formControl && _formControlProp.current !== props.formControl) {
    _formControlProp.current = props.formControl;
    if (props.formControl) {
      _formControl.current = {
        ...props.formControl,
        formState
      };
      if (props.defaultValues && !isFunction(props.defaultValues)) {
        props.formControl.reset(props.defaultValues, props.resetOptions);
      }
    } else {
      const { formControl, ...rest } = createFormControl(props);
      _formControl.current = {
        ...rest,
        formState
      };
    }
  }
  const control = _formControl.current.control;
  control._options = props;
  useIsomorphicLayoutEffect(() => {
    const sub = control._subscribe({
      formState: control._proxyFormState,
      callback: () => updateFormState({
        ...control._formState,
        defaultValues: control._defaultValues
      }),
      reRenderRoot: true
    });
    updateFormState((data) => ({
      ...data,
      isReady: true
    }));
    control._formState.isReady = true;
    return sub;
  }, [control]);
  React.useEffect(() => control._disableForm(props.disabled), [control, props.disabled]);
  React.useEffect(() => {
    if (props.mode) {
      control._options.mode = props.mode;
    }
    if (props.reValidateMode) {
      control._options.reValidateMode = props.reValidateMode;
    }
  }, [control, props.mode, props.reValidateMode]);
  React.useEffect(() => {
    if (props.errors) {
      control._setErrors(props.errors);
      control._focusError();
    }
  }, [control, props.errors]);
  React.useEffect(() => {
    props.shouldUnregister && control._subjects.state.next({
      values: control._getWatch()
    });
  }, [control, props.shouldUnregister]);
  React.useEffect(() => {
    if (control._proxyFormState.isDirty) {
      const isDirty2 = control._getDirty();
      if (isDirty2 !== formState.isDirty) {
        control._subjects.state.next({
          isDirty: isDirty2
        });
      }
    }
  }, [control, formState.isDirty]);
  React.useEffect(() => {
    var _a;
    if (props.values && !deepEqual(props.values, _values.current)) {
      control._reset(props.values, {
        keepFieldsRef: true,
        ...control._options.resetOptions
      });
      if (!((_a = control._options.resetOptions) === null || _a === void 0 ? void 0 : _a.keepIsValid)) {
        control._setValid();
      }
      _values.current = props.values;
      updateFormState((state) => ({ ...state }));
    } else {
      control._resetDefaultValues();
    }
  }, [control, props.values]);
  React.useEffect(() => {
    if (!control._state.mount) {
      control._setValid();
      control._state.mount = true;
    }
    if (control._state.watch) {
      control._state.watch = false;
      control._subjects.state.next({ ...control._formState });
    }
    control._removeUnmounted();
  });
  _formControl.current.formState = React.useMemo(() => getProxyFormState(formState, control), [control, formState]);
  return _formControl.current;
}
const s = (e, s2, o2) => {
  if (e && "reportValidity" in e) {
    const r2 = get(o2, s2);
    e.setCustomValidity(r2 && r2.message || ""), e.reportValidity();
  }
}, o = (t2, e) => {
  for (const o2 in e.fields) {
    const r2 = e.fields[o2];
    r2 && r2.ref && "reportValidity" in r2.ref ? s(r2.ref, o2, t2) : r2.refs && r2.refs.forEach((e2) => s(e2, o2, t2));
  }
}, r = (s2, r2) => {
  r2.shouldUseNativeValidation && o(s2, r2);
  const f = {};
  for (const o2 in s2) {
    const n2 = get(r2.fields, o2), a = Object.assign(s2[o2] || {}, { ref: n2 && n2.ref });
    if (i(r2.names || Object.keys(s2), o2)) {
      const s3 = Object.assign({}, get(f, o2));
      set(s3, "root", a), set(f, o2, s3);
    } else set(f, o2, a);
  }
  return f;
}, i = (t2, e) => t2.some((t3) => t3.startsWith(e + "."));
var n = function(r2, e) {
  for (var n2 = {}; r2.length; ) {
    var t2 = r2[0], s2 = t2.code, i2 = t2.message, a = t2.path.join(".");
    if (!n2[a]) if ("unionErrors" in t2) {
      var u = t2.unionErrors[0].errors[0];
      n2[a] = { message: u.message, type: u.code };
    } else n2[a] = { message: i2, type: s2 };
    if ("unionErrors" in t2 && t2.unionErrors.forEach(function(e2) {
      return e2.errors.forEach(function(e3) {
        return r2.push(e3);
      });
    }), e) {
      var c = n2[a].types, f = c && c[t2.code];
      n2[a] = appendErrors(a, e, n2, s2, f ? [].concat(f, t2.message) : t2.message);
    }
    r2.shift();
  }
  return n2;
}, t = function(o$1, t2, s2) {
  return void 0 === s2 && (s2 = {}), function(i2, a, u) {
    try {
      return Promise.resolve((function(e, n2) {
        try {
          var a2 = Promise.resolve(o$1["sync" === s2.mode ? "parse" : "parseAsync"](i2, t2)).then(function(e2) {
            return u.shouldUseNativeValidation && o({}, u), { errors: {}, values: s2.raw ? i2 : e2 };
          });
        } catch (r2) {
          return n2(r2);
        }
        return a2 && a2.then ? a2.then(void 0, n2) : a2;
      })(0, function(r$1) {
        if ((function(r2) {
          return Array.isArray(null == r2 ? void 0 : r2.errors);
        })(r$1)) return { values: {}, errors: r(n(r$1.errors, !u.shouldUseNativeValidation && "all" === u.criteriaMode), u) };
        throw r$1;
      }));
    } catch (r2) {
      return Promise.reject(r2);
    }
  };
};
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
const getParsedType = (data) => {
  const t2 = typeof data;
  switch (t2) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
const ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i2 = 0;
          while (i2 < issue.path.length) {
            const el = issue.path[i2];
            const terminal = i2 === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i2++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
const errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s2 of results) {
      if (s2.status === "aborted")
        return INVALID;
      if (s2.status === "dirty")
        status.dirty();
      arrayValue.push(s2.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: "aborted"
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i2) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i2));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i2) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i2));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i2) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i2)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}
class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const stringType = ZodString.create;
const numberType = ZodNumber.create;
ZodBigInt.create;
ZodBoolean.create;
ZodDate.create;
ZodNever.create;
ZodArray.create;
const objectType = ZodObject.create;
ZodUnion.create;
ZodIntersection.create;
ZodTuple.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
ZodPromise.create;
ZodOptional.create;
ZodNullable.create;
const coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
const loginSchema = objectType({
  username: stringType().min(1, "Username is required"),
  password: stringType().min(1, "Password is required")
});
const bootstrapSchema = objectType({
  fullName: stringType().min(1, "Full name is required"),
  username: stringType().min(1, "Username is required"),
  password: stringType().min(8, "Password must be at least 8 characters")
});
const resetPasswordSchema = objectType({
  username: stringType().min(1, "Username is required"),
  recoveryCode: stringType().min(1, "Recovery code is required"),
  newPassword: stringType().min(8, "Password must be at least 8 characters")
});
const defaultValues$1 = {
  fullName: "",
  username: "",
  password: ""
};
function Field({ label, error, registration, ...inputProps }) {
  const { ref, ...fieldProps } = registration ?? {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref, ...fieldProps, ...inputProps }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: error }) : null
  ] });
}
function RecoveryCodePanel({ code, context, onDone }) {
  const [copied, setCopied] = reactExports.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "auth-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "StockOps" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Save your recovery code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: context === "reset" ? "Your password was reset. Here is your new recovery code — the old one no longer works." : "Write this code down and keep it safe. It is the only way to reset your password if you forget it." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "recovery-code-box", children: code }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stock-hint", style: { textAlign: "center" }, children: "We can’t show this again — it isn’t stored in a readable form." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: copy, children: copied ? "Copied" : "Copy code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onDone, children: "I’ve saved it — continue" })
    ] })
  ] });
}
function ResetForm({ busy, onReset, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: t(resetPasswordSchema),
    defaultValues: { username: "", recoveryCode: "", newPassword: "" }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "auth-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "StockOps" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Reset password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Enter your username and the recovery code you saved when the account was created." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "auth-form", onSubmit: handleSubmit(onReset), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Username", error: errors.username?.message, registration: register("username") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "Recovery code",
          error: errors.recoveryCode?.message,
          registration: register("recoveryCode"),
          placeholder: "XXXX-XXXX-XXXX-XXXX",
          autoComplete: "off"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          label: "New password",
          type: "password",
          error: errors.newPassword?.message,
          registration: register("newPassword")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, children: busy ? "Working..." : "Reset Password" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "link-button", onClick: onBack, children: "Back to sign in" })
  ] });
}
function AuthForm({ onLogin, onBootstrap, onReset, needsBootstrap, busy }) {
  const [recoveryInfo, setRecoveryInfo] = reactExports.useState(null);
  const [showReset, setShowReset] = reactExports.useState(false);
  const mode = needsBootstrap ? "bootstrap" : "login";
  const schema = mode === "bootstrap" ? bootstrapSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: t(schema),
    defaultValues: defaultValues$1
  });
  if (recoveryInfo) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RecoveryCodePanel,
      {
        code: recoveryInfo.code,
        context: recoveryInfo.context,
        onDone: () => {
          setRecoveryInfo(null);
          setShowReset(false);
        }
      }
    );
  }
  if (mode === "login" && showReset) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResetForm,
      {
        busy,
        onBack: () => setShowReset(false),
        onReset: async (values) => {
          const code = await onReset(values);
          if (code) setRecoveryInfo({ code, context: "reset" });
        }
      }
    );
  }
  const submit = async (values) => {
    if (mode === "bootstrap") {
      const code = await onBootstrap(values);
      if (code) setRecoveryInfo({ code, context: "bootstrap" });
      return;
    }
    await onLogin(values);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "auth-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "StockOps" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: mode === "bootstrap" ? "Create your login account" : "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: mode === "bootstrap" ? "This happens once on first launch and creates your single local account." : "Use a local account to access the offline stock system." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "auth-form", onSubmit: handleSubmit(submit), children: [
      mode === "bootstrap" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", error: errors.fullName?.message, registration: register("fullName") }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Username", error: errors.username?.message, registration: register("username") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", type: "password", error: errors.password?.message, registration: register("password") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, children: busy ? "Working..." : mode === "bootstrap" ? "Create Account" : "Sign In" })
    ] }),
    mode === "login" ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "link-button", onClick: () => setShowReset(true), children: "Forgot password?" }) : null
  ] });
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = ((createState) => createState ? createImpl(createState) : createImpl);
const useSessionStore = create((set2) => ({
  bootstrapStatus: { needsBootstrap: false },
  user: null,
  activeView: "dashboard",
  dashboard: {
    todayStockIn: 0,
    todayStockOut: 0,
    lowStockCount: 0,
    lowStockItems: []
  },
  vouchers: [],
  products: [],
  parties: [],
  categories: [],
  units: [],
  hsns: [],
  formulas: [],
  busy: false,
  error: null,
  setBootstrapStatus: (bootstrapStatus) => set2({ bootstrapStatus }),
  setUser: (user) => set2({ user, error: null }),
  setActiveView: (activeView) => set2({ activeView }),
  setDashboard: (dashboard) => set2({ dashboard }),
  setVouchers: (vouchers) => set2({ vouchers }),
  setProducts: (products) => set2({ products }),
  setParties: (parties) => set2({ parties }),
  setCategories: (categories) => set2({ categories }),
  setUnits: (units) => set2({ units }),
  setHsns: (hsns) => set2({ hsns }),
  setFormulas: (formulas) => set2({ formulas }),
  setBusy: (busy) => set2({ busy }),
  setError: (error) => set2({ error })
}));
const NAVIGATION = [
  {
    title: "Dashboard",
    items: [{ key: "dashboard", label: "Dashboard" }]
  },
  {
    title: "Masters",
    items: [
      { key: "stock-master", label: "Stock Master" },
      { key: "party-master", label: "Party Master" },
      { key: "codes-units", label: "Codes & Units" },
      { key: "production-formula", label: "Production Formulas" },
      { key: "data-import", label: "Import from Excel" }
    ]
  },
  {
    title: "Stock-In",
    items: [
      { key: "purchase-entry", label: "Purchase Entry" },
      { key: "sale-return-entry", label: "Sale Return Entry" }
    ]
  },
  {
    title: "Stock-Out",
    items: [
      { key: "sale-entry", label: "Sale Entry" },
      { key: "purchase-return-entry", label: "Purchase Return Entry" }
    ]
  },
  {
    title: "Manufacturing",
    items: [{ key: "production-entry", label: "Production" }]
  },
  {
    title: "Reports",
    items: [
      { key: "daily-stock-summary", label: "Daily Stock Summary" },
      { key: "item-stock-ledger", label: "Item Stock Ledger" }
    ]
  }
];
const VIEW_LABELS = {
  dashboard: "Dashboard",
  "stock-master": "Stock Master",
  "party-master": "Party Master",
  "codes-units": "Codes & Units",
  "production-formula": "Production Formulas",
  "data-import": "Import from Excel",
  "purchase-entry": "Purchase Entry",
  "sale-return-entry": "Sale Return Entry",
  "production-entry": "Production",
  "sale-entry": "Sale Entry",
  "purchase-return-entry": "Purchase Return Entry",
  "daily-stock-summary": "Daily Stock Summary",
  "item-stock-ledger": "Item Stock Ledger"
};
const FIRST_FIELD_SELECTOR = "input:not([type=hidden]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled])";
const ICONS = {
  dashboard: "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z",
  "stock-master": "M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10",
  "party-master": "M17 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM22 20v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11",
  "codes-units": "M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1-.6-1.4V4a1 1 0 0 1 1-1h7.9a2 2 0 0 1 1.5.6l7.4 7.4a2 2 0 0 1 0 2.4ZM7.5 7.5h.01",
  "purchase-entry": "M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  "sale-entry": "M12 21V9m0 0 4 4m-4-4-4 4M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2",
  "sale-return-entry": "M9 14 4 9l5-5M4 9h11a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H8",
  "purchase-return-entry": "M15 14l5-5-5-5M20 9H9a5 5 0 0 0-5 5v0a5 5 0 0 0 5 5h7",
  "production-entry": "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H7a1.6 1.6 0 0 0 1-1.5V1a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.5 1H23a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z",
  "production-formula": "M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4M8 9h4M8 13h6M8 17h4M14.5 6.5l2 2 4-4",
  "daily-stock-summary": "M3 3v18h18M7 15l3-3 3 3 5-6",
  "item-stock-ledger": "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
};
function NavIcon({ name }) {
  const d = ICONS[name];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "nav-icon", viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: d ? /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d }) : /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "4" }) });
}
const STORAGE_KEY = "stockops.sidebarCollapsed";
function AppShell({ navigation, activeKey, onNavigate, headerTitle, children, onLogout, user }) {
  const [version, setVersion] = reactExports.useState("");
  const contentRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    window.stockOps?.getAppInfo?.().then((info) => setVersion(info?.version || "")).catch(() => void 0);
  }, []);
  reactExports.useEffect(() => {
    const id = setTimeout(() => {
      const root = contentRef.current;
      if (!root) return;
      const first = [...root.querySelectorAll(FIRST_FIELD_SELECTOR)].find(
        (el) => el.offsetParent !== null && el.tabIndex !== -1
      );
      if (first) {
        first.focus();
        if (typeof first.select === "function") {
          try {
            first.select();
          } catch {
          }
        }
      }
    }, 80);
    return () => clearTimeout(id);
  }, [activeKey]);
  const [collapsed, setCollapsed] = reactExports.useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  reactExports.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    } catch {
    }
  }, [collapsed]);
  const initials = (user?.fullName || "U").split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `erp-layout${collapsed ? " collapsed" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "sidebar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "brand-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "brand-mark", "aria-hidden": "true", children: "S" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "brand-text", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "StockOps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Manufacturing Inventory" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "collapse-toggle",
            onClick: () => setCollapsed((value) => !value),
            title: collapsed ? "Expand sidebar" : "Collapse sidebar",
            "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 6l6 6-6 6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 6l-6 6 6 6" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "side-nav", children: navigation.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "nav-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "group-label", children: group.title }),
        group.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `nav-item ${activeKey === item.key ? "active" : ""}`,
            type: "button",
            onClick: () => onNavigate(item.key),
            title: collapsed ? item.label : void 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(NavIcon, { name: item.key }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-label", children: item.label })
            ]
          },
          item.key
        ))
      ] }, group.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-footer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-chip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "user-avatar", "aria-hidden": "true", children: initials }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "user-name", children: user?.fullName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "ghost-btn", onClick: onLogout, title: "Logout", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-label", children: "Logout" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-version-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-label", children: version ? `v${version}` : "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "update-check-btn",
              onClick: () => window.stockOps?.checkForUpdates?.(),
              title: "Check for updates",
              children: "Check for updates"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "content-area", ref: contentRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "content-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: headerTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Overview as of ",
          (/* @__PURE__ */ new Date()).toLocaleDateString()
        ] })
      ] }),
      children
    ] })
  ] });
}
function MetricCard({ title, value, tone = "neutral" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "metric-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `metric-${tone}`, children: value })
  ] });
}
function DashboardView({ summary, vouchers }) {
  const lowStock = summary?.lowStockItems ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-grid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "cards-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { title: "Today's Stock-In", value: `+${Number(summary?.todayStockIn ?? 0).toFixed(3)}`, tone: "good" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { title: "Today's Stock-Out", value: `-${Number(summary?.todayStockOut ?? 0).toFixed(3)}`, tone: "bad" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { title: "Items Below Reorder Level", value: String(summary?.lowStockCount ?? 0), tone: "warn" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Low Stock Items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Item" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Current Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Reorder Level" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: lowStock.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, children: "No items below reorder level." }) }) : lowStock.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: Number(item.current_stock).toFixed(3) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: Number(item.min_stock).toFixed(3) })
        ] }, item.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Recent Vouchers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Voucher No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Party" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: vouchers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, children: "No vouchers yet." }) }) : vouchers.map((voucher) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: voucher.voucher_no }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: voucher.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: new Date(voucher.date).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: voucher.party }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: Number(voucher.total).toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: voucher.status })
        ] }, voucher.voucher_no)) })
      ] })
    ] })
  ] });
}
({
  product: objectType({
    name: stringType().min(1, "Name is required"),
    code: stringType().min(1, "Code is required"),
    barcode: stringType().optional(),
    min_stock: coerce.number().min(0)
  }),
  party: objectType({
    name: stringType().min(1, "Name is required"),
    code: stringType().min(1, "Code is required"),
    type: enumType(["customer", "supplier", "both"]),
    phone: stringType().optional()
  })
});
objectType({
  product_id: coerce.number().int().positive(),
  party_id: coerce.number().int().positive().optional().nullable(),
  quantity: coerce.number().positive(),
  rate: coerce.number().min(0),
  notes: stringType().optional()
});
function SearchableSelect({ options, value, onChange, placeholder = "Search…", autoFocus = false }) {
  const [open, setOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const [active, setActive] = reactExports.useState(0);
  const wrapRef = reactExports.useRef(null);
  const listRef = reactExports.useRef(null);
  const selected = reactExports.useMemo(
    () => options.find((option) => String(option.value) === String(value)) || null,
    [options, value]
  );
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (option) => `${option.label} ${option.hint ?? ""}`.toLowerCase().includes(q)
    );
  }, [options, query]);
  reactExports.useEffect(() => {
    setActive(0);
  }, [query, open]);
  reactExports.useEffect(() => {
    const el = listRef.current?.children?.[active];
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [active]);
  const pick = (option) => {
    onChange(String(option.value));
    setOpen(false);
    setQuery("");
  };
  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === "ArrowDown") {
        setOpen(true);
        e.stopPropagation();
        e.preventDefault();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      setActive((i2) => Math.min(i2 + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      e.stopPropagation();
      setActive((i2) => Math.max(i2 - 1, 0));
    } else if (e.key === "Enter") {
      if (filtered[active]) {
        e.preventDefault();
        e.stopPropagation();
        pick(filtered[active]);
      }
    } else if (e.key === "Escape") {
      e.stopPropagation();
      setOpen(false);
      setQuery("");
    }
  };
  const display = open ? query : selected?.label ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: wrapRef, style: { position: "relative" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        autoFocus,
        value: display,
        placeholder: selected ? selected.label : placeholder,
        onChange: (event) => {
          setQuery(event.target.value);
          setOpen(true);
        },
        onFocus: () => setOpen(true),
        onBlur: () => {
          setOpen(false);
          setQuery("");
        },
        onKeyDown,
        style: { width: "100%" }
      }
    ),
    open ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "ul",
      {
        ref: listRef,
        style: {
          position: "absolute",
          zIndex: 20,
          top: "100%",
          left: 0,
          right: 0,
          margin: 0,
          padding: 0,
          listStyle: "none",
          maxHeight: "240px",
          overflowY: "auto",
          background: "#ffffff",
          border: "1px solid #d5cfc3",
          borderRadius: "8px",
          boxShadow: "0 8px 24px rgba(47,58,61,0.12)"
        },
        children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("li", { style: { padding: "8px 10px", opacity: 0.6 }, children: "No matches" }) : filtered.map((option, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            onMouseDown: () => pick(option),
            onMouseEnter: () => setActive(i2),
            style: {
              padding: "8px 10px",
              cursor: "pointer",
              color: "#4f6166",
              background: i2 === active ? "#f2f0ea" : "transparent"
            },
            children: [
              option.label,
              option.hint ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { opacity: 0.6 }, children: [
                " ",
                option.hint
              ] }) : null
            ]
          },
          option.value
        ))
      }
    ) : null
  ] });
}
const SCOPE_SELECTOR = ".content-area";
const FOCUSABLE$3 = "input:not([type=hidden]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])";
function scopeFocusables(el) {
  const root = el.closest(SCOPE_SELECTOR) || el.ownerDocument.body;
  return [...root.querySelectorAll(FOCUSABLE$3)].filter(
    (node) => node.offsetParent !== null && node.tabIndex !== -1
  );
}
function place$2(el, caret) {
  el.focus();
  if (el.tagName === "SELECT") {
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
      } catch {
      }
    }
    return;
  }
  if (caret === "start" || caret === "end") {
    if (typeof el.setSelectionRange === "function") {
      try {
        const pos = caret === "end" ? el.value.length : 0;
        el.setSelectionRange(pos, pos);
      } catch {
      }
    }
  } else if (typeof el.select === "function") {
    try {
      el.select();
    } catch {
    }
  }
}
function focusAdjacent(el, step, caret) {
  const list = scopeFocusables(el);
  const idx = list.indexOf(el);
  if (idx === -1) return false;
  const target = list[idx + step];
  if (!target) return false;
  place$2(target, caret);
  return true;
}
const FOCUSABLE$2 = "input:not([readonly]):not([disabled]), select:not([disabled])";
function firstFocusable(cell2) {
  return cell2 ? cell2.querySelector(FOCUSABLE$2) : null;
}
function openIfSelect$1(el) {
  if (el.tagName === "SELECT" && typeof el.showPicker === "function") {
    try {
      el.showPicker();
    } catch {
    }
  }
}
function place$1(el, caret) {
  el.focus();
  if (el.tagName === "SELECT") {
    openIfSelect$1(el);
    return;
  }
  if (caret === "start" || caret === "end") {
    if (typeof el.setSelectionRange === "function") {
      try {
        const pos = caret === "end" ? el.value.length : 0;
        el.setSelectionRange(pos, pos);
      } catch {
      }
    }
  } else if (typeof el.select === "function") {
    try {
      el.select();
    } catch {
    }
  }
}
function moveRow(el, direction) {
  const td = el.closest("td");
  const tr = td && td.closest("tr");
  if (!td || !tr) return false;
  const colIndex = [...tr.children].indexOf(td);
  const targetRow = direction > 0 ? tr.nextElementSibling : tr.previousElementSibling;
  const target = firstFocusable(targetRow && targetRow.children[colIndex]);
  if (target) {
    place$1(target, "select");
    return true;
  }
  return false;
}
function moveCell(el, direction) {
  const td = el.closest("td");
  let cell2 = td && (direction > 0 ? td.nextElementSibling : td.previousElementSibling);
  while (cell2) {
    const target = firstFocusable(cell2);
    if (target) {
      place$1(target, direction > 0 ? "start" : "end");
      return true;
    }
    cell2 = direction > 0 ? cell2.nextElementSibling : cell2.previousElementSibling;
  }
  return false;
}
function rowHasData(el) {
  const tr = el.closest("tr");
  if (!tr) return true;
  const select = tr.querySelector("select");
  if (select && select.value) return true;
  for (const inp of tr.querySelectorAll("input:not([type=hidden])")) {
    const v = (inp.value || "").trim();
    if (v && v !== "0" && v !== "0.00" && v !== "0.000") return true;
  }
  return false;
}
function isEdgeFocusable(el, dir) {
  const tbody = el.closest("tbody");
  if (!tbody) return false;
  const all = [...tbody.querySelectorAll(FOCUSABLE$2)];
  return dir > 0 ? all[all.length - 1] === el : all[0] === el;
}
function atBoundary(el, side) {
  if (el.tagName === "SELECT") return true;
  let start;
  let end;
  let len;
  try {
    start = el.selectionStart;
    end = el.selectionEnd;
    len = el.value.length;
  } catch {
    return true;
  }
  if (start == null) return true;
  return side === "start" ? start === 0 && end === 0 : start === len && end === len;
}
function handleGridKeyNav(e, { onAppendRow } = {}) {
  const el = e.currentTarget;
  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      moveRow(el, 1);
      return;
    case "ArrowUp":
      e.preventDefault();
      moveRow(el, -1);
      return;
    case "ArrowRight":
      if (atBoundary(el, "end")) {
        if (moveCell(el, 1)) e.preventDefault();
        else if (isEdgeFocusable(el, 1) && focusAdjacent(el, 1, "start")) e.preventDefault();
      }
      return;
    case "ArrowLeft":
      if (atBoundary(el, "start")) {
        if (moveCell(el, -1)) e.preventDefault();
        else if (isEdgeFocusable(el, -1) && focusAdjacent(el, -1, "end")) e.preventDefault();
      }
      return;
    case "Enter": {
      e.preventDefault();
      const tbody = el.closest("tbody");
      if (!tbody) return;
      const all = [...tbody.querySelectorAll(FOCUSABLE$2)];
      const i2 = all.indexOf(el);
      if (i2 > -1 && i2 < all.length - 1) {
        place$1(all[i2 + 1], "select");
      } else if (onAppendRow && rowHasData(el)) {
        onAppendRow();
      } else {
        focusAdjacent(el, 1, "select");
      }
      return;
    }
  }
}
function todayDdmmyyyy() {
  const d = /* @__PURE__ */ new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}
const FOCUSABLE$1 = "input:not([type=hidden]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])";
function visibleFocusables(container) {
  return [...container.querySelectorAll(FOCUSABLE$1)].filter(
    (el) => el.offsetParent !== null && el.tabIndex !== -1
  );
}
function openIfSelect(el) {
  if (el.tagName === "SELECT" && typeof el.showPicker === "function") {
    try {
      el.showPicker();
    } catch {
    }
  }
}
function place(el, caret) {
  el.focus();
  if (el.tagName === "SELECT") {
    openIfSelect(el);
    return;
  }
  if (caret === "start" || caret === "end") {
    if (typeof el.setSelectionRange === "function") {
      try {
        const pos = caret === "end" ? el.value.length : 0;
        el.setSelectionRange(pos, pos);
      } catch {
      }
    }
  } else if (typeof el.select === "function") {
    try {
      el.select();
    } catch {
    }
  }
}
function geoNav(el, container, dir) {
  const r0 = el.getBoundingClientRect();
  const cx = r0.left + r0.width / 2;
  const cy = r0.top + r0.height / 2;
  const rowTol = Math.max(r0.height * 0.6, 14);
  let best = null;
  let bestScore = Infinity;
  for (const it of visibleFocusables(container)) {
    if (it === el) continue;
    const r2 = it.getBoundingClientRect();
    const dx = r2.left + r2.width / 2 - cx;
    const dy = r2.top + r2.height / 2 - cy;
    let primary;
    let secondary;
    if (dir === "down") {
      if (dy <= 2) continue;
      primary = dy;
      secondary = Math.abs(dx);
    } else if (dir === "up") {
      if (dy >= -2) continue;
      primary = -dy;
      secondary = Math.abs(dx);
    } else if (dir === "right") {
      if (dx <= 2 || Math.abs(dy) > rowTol) continue;
      primary = dx;
      secondary = Math.abs(dy);
    } else {
      if (dx >= -2 || Math.abs(dy) > rowTol) continue;
      primary = -dx;
      secondary = Math.abs(dy);
    }
    const score = primary + secondary * 3;
    if (score < bestScore) {
      bestScore = score;
      best = it;
    }
  }
  return best;
}
function rowEdge(el, container, below) {
  const r0 = el.getBoundingClientRect();
  let best = null;
  let bestRect = null;
  for (const it of visibleFocusables(container)) {
    if (it === el) continue;
    const r2 = it.getBoundingClientRect();
    if (below ? r2.top < r0.bottom - 2 : r2.bottom > r0.top + 2) continue;
    if (!best) {
      best = it;
      bestRect = r2;
      continue;
    }
    if (below) {
      if (r2.top < bestRect.top - 2 || Math.abs(r2.top - bestRect.top) <= 2 && r2.left < bestRect.left) {
        best = it;
        bestRect = r2;
      }
    } else if (r2.top > bestRect.top + 2 || Math.abs(r2.top - bestRect.top) <= 2 && r2.left > bestRect.left) {
      best = it;
      bestRect = r2;
    }
  }
  return best;
}
function domSibling(el, container, step) {
  const list = visibleFocusables(container);
  const idx = list.indexOf(el);
  if (idx === -1) return null;
  return list[idx + step] || null;
}
function nextField(el, container) {
  return geoNav(el, container, "right") || rowEdge(el, container, true) || domSibling(el, container, 1);
}
function prevField(el, container) {
  return geoNav(el, container, "left") || rowEdge(el, container, false) || domSibling(el, container, -1);
}
function atStart(el) {
  try {
    return el.selectionStart === 0 && el.selectionEnd === 0;
  } catch {
    return true;
  }
}
function atEnd(el) {
  try {
    return el.selectionStart === el.value.length && el.selectionEnd === el.value.length;
  } catch {
    return true;
  }
}
function handleFormKeyNav(e) {
  const el = e.target;
  if (!el || !["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(el.tagName)) return;
  const container = e.currentTarget;
  if (el.tagName === "BUTTON") {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      const n2 = prevField(el, container);
      if (n2) {
        e.preventDefault();
        place(n2, "end");
      } else if (focusAdjacent(el, -1, "end")) {
        e.preventDefault();
      }
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      const n2 = nextField(el, container);
      if (n2) {
        e.preventDefault();
        place(n2, "start");
      } else if (focusAdjacent(el, 1, "start")) {
        e.preventDefault();
      }
    }
    return;
  }
  if (el.tagName === "TEXTAREA") {
    if (e.key === "Enter" && !e.shiftKey) {
      const n2 = nextField(el, container);
      if (n2) {
        e.preventDefault();
        place(n2, "select");
      } else if (focusAdjacent(el, 1, "select")) {
        e.preventDefault();
      }
    } else if (e.key === "ArrowRight" && atEnd(el)) {
      const n2 = nextField(el, container);
      if (n2) {
        e.preventDefault();
        place(n2, "start");
      } else if (focusAdjacent(el, 1, "start")) {
        e.preventDefault();
      }
    } else if (e.key === "ArrowLeft" && atStart(el)) {
      const n2 = prevField(el, container);
      if (n2) {
        e.preventDefault();
        place(n2, "end");
      } else if (focusAdjacent(el, -1, "end")) {
        e.preventDefault();
      }
    }
    return;
  }
  if (el.tagName === "SELECT") {
    if (e.key === "Enter" || e.key === "ArrowRight") {
      const n2 = nextField(el, container);
      if (n2) {
        e.preventDefault();
        place(n2, "start");
      } else if (focusAdjacent(el, 1, "start")) {
        e.preventDefault();
      }
    } else if (e.key === "ArrowLeft") {
      const n2 = prevField(el, container);
      if (n2) {
        e.preventDefault();
        place(n2, "end");
      } else if (focusAdjacent(el, -1, "end")) {
        e.preventDefault();
      }
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openIfSelect(el);
    }
    return;
  }
  const type = (el.getAttribute("type") || "text").toLowerCase();
  const textLike = ["text", "search", "tel", "url", "email", "password"].includes(type);
  if (e.key === "Enter") {
    const n2 = nextField(el, container);
    if (n2) {
      e.preventDefault();
      place(n2, "select");
    } else if (focusAdjacent(el, 1, "select")) {
      e.preventDefault();
    }
    return;
  }
  if (!textLike) return;
  if (e.key === "ArrowDown") {
    const t2 = geoNav(el, container, "down");
    if (t2) {
      e.preventDefault();
      place(t2, "select");
    }
  } else if (e.key === "ArrowUp") {
    const t2 = geoNav(el, container, "up");
    if (t2) {
      e.preventDefault();
      place(t2, "select");
    }
  } else if (e.key === "ArrowRight" && atEnd(el)) {
    const t2 = nextField(el, container);
    if (t2) {
      e.preventDefault();
      place(t2, "start");
    } else if (focusAdjacent(el, 1, "start")) {
      e.preventDefault();
    }
  } else if (e.key === "ArrowLeft" && atStart(el)) {
    const t2 = prevField(el, container);
    if (t2) {
      e.preventDefault();
      place(t2, "end");
    } else if (focusAdjacent(el, -1, "end")) {
      e.preventDefault();
    }
  }
}
const money = (v) => `₹ ${Number(v || 0).toFixed(2)}`;
const num = (v) => Number(v || 0).toFixed(3);
function VoucherDetailModal({ type, detail, loading, error, onClose, onEdit }) {
  const [printing, setPrinting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  const isProduction = type === "production";
  const print = async () => {
    if (!detail) return;
    setPrinting(true);
    try {
      await window.stockOps.printVoucher(type, detail.id);
    } finally {
      setPrinting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "voucher-modal-overlay", onMouseDown: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voucher-modal", onMouseDown: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voucher-modal-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: detail ? `Voucher ${detail.voucher_no}` : "Voucher" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voucher-modal-head-actions", children: [
        detail && onEdit ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: () => onEdit(detail), children: "Edit" }) : null,
        detail ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: print, disabled: printing, children: printing ? "Printing…" : "Print" }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "voucher-modal-close", onClick: onClose, "aria-label": "Close", children: "×" })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading…" }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }) : !detail ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voucher-modal-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voucher-meta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: detail.date })
        ] }),
        !isProduction && detail.party ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Party" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: detail.party })
        ] }) : null,
        !isProduction && detail.invoice_no ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Invoice No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: detail.invoice_no })
        ] }) : null,
        !isProduction && detail.batch_no ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batch No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: detail.batch_no })
        ] }) : null,
        !isProduction && detail.vehicle_no ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Vehicle No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: detail.vehicle_no })
        ] }) : null,
        !isProduction && detail.bilty_no ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bilty No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: detail.bilty_no })
        ] }) : null,
        !isProduction && detail.broker ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Broker" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: detail.broker })
        ] }) : null,
        isProduction ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Recurring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: detail.is_recurring ? "Yes" : "No" })
        ] }) : null,
        detail.remarks ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Remarks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: detail.remarks })
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: isProduction ? /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "voucher-detail-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Item" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Batch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Issued Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Issued Pcs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Prod. Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Prod. Pcs" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: detail.items.map((it, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: it.product_name || it.product_code || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: it.batch_no || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: num(it.issued_qty) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: num(it.issued_pcs) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: num(it.production_qty) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: num(it.production_pcs) })
        ] }, i2)) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "voucher-detail-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Item" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "HSN" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Pcs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Base" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Net" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Taxable" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "GST%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "GST Amt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: detail.items.map((it, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: it.product_name || it.product_code || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: it.hsn || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: Number(it.pcs) > 0 ? num(it.pcs) : "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: Number(it.quantity) > 0 ? num(it.quantity) : "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: Number(it.base_rate).toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: Number(it.net_rate).toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: Number(it.taxable_value).toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: Number(it.gst_rate).toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: Number(it.gst_amount).toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: Number(it.amount).toFixed(2) })
        ] }, i2)) })
      ] }) }),
      !isProduction ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voucher-modal-totals", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taxable Value" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: money(detail.taxable_value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: money(detail.gst_amount) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grand", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: money(detail.total_amount) })
        ] })
      ] }) : null
    ] })
  ] }) });
}
function VoucherHistory({
  type,
  refreshToken,
  title = "Recent Vouchers",
  partyLabel = "Party",
  showParty = true,
  showAmount = true,
  limit = 20,
  onEdit
}) {
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [openId, setOpenId] = reactExports.useState(null);
  const [detail, setDetail] = reactExports.useState(null);
  const [detailLoading, setDetailLoading] = reactExports.useState(false);
  const [detailError, setDetailError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    window.stockOps.listVouchers(type, limit).then((data) => {
      if (alive) setRows(data || []);
    }).catch((err) => {
      if (alive) setError(err?.message || "Unable to load history");
    }).finally(() => {
      if (alive) setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [type, refreshToken, limit]);
  const openVoucher = async (row) => {
    setOpenId(row.id);
    setDetail(null);
    setDetailError(null);
    setDetailLoading(true);
    try {
      const data = await window.stockOps.getVoucher(type, row.id);
      setDetail(data);
    } catch (err) {
      setDetailError(err?.message || "Unable to load voucher");
    } finally {
      setDetailLoading(false);
    }
  };
  const closeVoucher = () => {
    setOpenId(null);
    setDetail(null);
    setDetailError(null);
  };
  const colCount = 3 + (showParty ? 1 : 0) + (showAmount ? 1 : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel voucher-history", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voucher-history-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stock-hint", children: rows.length ? `${rows.length} shown · click a row to view` : "" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "voucher-history-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Voucher No" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
        showParty ? /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: partyLabel }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Items" }),
        showAmount ? /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num", children: "Amount" }) : null
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: colCount, children: "Loading…" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: colCount, className: "error-message", children: error }) }) : rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: colCount, style: { opacity: 0.6 }, children: "No vouchers saved yet." }) }) : rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "clickable-row",
          onClick: () => openVoucher(row),
          title: "View voucher details",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontWeight: 600 }, children: row.voucher_no }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.date }),
            showParty ? /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.party || "-" }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: row.items_count }),
            showAmount ? /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: row.total_amount != null ? money(row.total_amount) : "-" }) : null
          ]
        },
        row.id
      )) })
    ] }) }),
    openId != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      VoucherDetailModal,
      {
        type,
        detail,
        loading: detailLoading,
        error: detailError,
        onClose: closeVoucher,
        onEdit: onEdit ? (d) => {
          closeVoucher();
          onEdit(d);
        } : void 0
      }
    ) : null
  ] });
}
const FOCUSABLE = "input:not([type=hidden]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled])";
function useFocusFirstField() {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const root = ref.current;
    if (!root) return void 0;
    const id = setTimeout(() => {
      const first = [...root.querySelectorAll(FOCUSABLE)].find(
        (el) => el.offsetParent !== null && el.tabIndex !== -1
      );
      if (first) {
        first.focus();
        if (typeof first.select === "function") {
          try {
            first.select();
          } catch {
          }
        }
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);
  return ref;
}
function emptyVoucherRow() {
  return {
    id: Date.now() + Math.random(),
    product_id: "",
    product_name: "",
    hsn: "",
    unit_basis: "quantity",
    pcs: "",
    quantity: "",
    base_rate: "",
    size_diff: "0",
    net_rate: "",
    taxable_value: "",
    gst_rate: "0",
    gst_amount: "",
    amount: ""
  };
}
function recalcVoucherRow(row, changedField) {
  const next = { ...row };
  const base = Number(next.base_rate) || 0;
  const diff = Number(next.size_diff) || 0;
  if (["base_rate", "size_diff", "product_id"].includes(changedField)) {
    next.net_rate = (base + diff).toFixed(2);
  }
  const net = Number(next.net_rate) || 0;
  const basisQty = next.unit_basis === "pcs" ? Number(next.pcs) || 0 : Number(next.quantity) || 0;
  if (["base_rate", "size_diff", "net_rate", "pcs", "quantity", "product_id"].includes(changedField)) {
    next.taxable_value = (basisQty * net).toFixed(2);
  }
  const taxable = Number(next.taxable_value) || 0;
  const gstRate = Number(next.gst_rate) || 0;
  next.gst_amount = (taxable * (gstRate / 100)).toFixed(2);
  next.amount = (taxable + Number(next.gst_amount)).toFixed(2);
  return next;
}
function applyProductToRow(row, product, baseRateField = "purchase_rate") {
  const next = { ...row };
  next.product_name = product.name ?? "";
  next.hsn = product.hsn ?? "";
  next.unit_basis = product.unit_basis === "pcs" ? "pcs" : "quantity";
  next.size_diff = String(product.size_diff ?? 0);
  next.gst_rate = String(product.gst_rate ?? 0);
  next.base_rate = String(product[baseRateField] ?? 0);
  if (next.unit_basis === "pcs") next.quantity = "";
  else next.pcs = "";
  return next;
}
function detailItemToRow(it) {
  return {
    id: Date.now() + Math.random(),
    product_id: it.product_id != null ? String(it.product_id) : "",
    product_name: it.product_name || "",
    hsn: it.hsn || "",
    unit_basis: it.unit_basis === "pcs" ? "pcs" : "quantity",
    pcs: Number(it.pcs) ? String(it.pcs) : "",
    quantity: Number(it.quantity) ? String(it.quantity) : "",
    base_rate: it.base_rate != null ? String(it.base_rate) : "",
    size_diff: it.size_diff != null ? String(it.size_diff) : "0",
    net_rate: it.net_rate != null ? String(it.net_rate) : "",
    taxable_value: it.taxable_value != null ? String(it.taxable_value) : "",
    gst_rate: it.gst_rate != null ? String(it.gst_rate) : "0",
    gst_amount: it.gst_amount != null ? String(it.gst_amount) : "",
    amount: it.amount != null ? String(it.amount) : ""
  };
}
function rowHasQty(row) {
  return Boolean(row.product_id) && (Number(row.quantity) > 0 || Number(row.pcs) > 0);
}
function toItemPayload(row) {
  return {
    product_id: Number(row.product_id),
    product_name: row.product_name || null,
    hsn: row.hsn || null,
    unit_basis: row.unit_basis || "quantity",
    pcs: Number(row.pcs) || 0,
    quantity: Number(row.quantity) || 0,
    base_rate: Number(row.base_rate) || 0,
    size_diff: Number(row.size_diff) || 0,
    net_rate: Number(row.net_rate) || 0,
    taxable_value: Number(row.taxable_value) || 0,
    gst_rate: Number(row.gst_rate) || 0,
    gst_amount: Number(row.gst_amount) || 0,
    amount: Number(row.amount) || 0
  };
}
function createEmptyRow$3() {
  return {
    id: Date.now() + Math.random(),
    product_id: "",
    product_name: "",
    hsn: "",
    unit_basis: "quantity",
    pcs: "",
    quantity: "",
    base_rate: "",
    size_diff: "0",
    net_rate: "",
    taxable_value: "",
    gst_rate: "0",
    gst_amount: "",
    amount: ""
  };
}
function recalcRow(row, changedField) {
  const next = { ...row };
  const base = Number(next.base_rate) || 0;
  const diff = Number(next.size_diff) || 0;
  if (["base_rate", "size_diff", "product_id"].includes(changedField)) {
    next.net_rate = (base + diff).toFixed(2);
  }
  const net = Number(next.net_rate) || 0;
  const basisQty = next.unit_basis === "pcs" ? Number(next.pcs) || 0 : Number(next.quantity) || 0;
  if (["base_rate", "size_diff", "net_rate", "pcs", "quantity", "product_id"].includes(changedField)) {
    next.taxable_value = (basisQty * net).toFixed(2);
  }
  const taxable = Number(next.taxable_value) || 0;
  const gstRate = Number(next.gst_rate) || 0;
  next.gst_amount = (taxable * (gstRate / 100)).toFixed(2);
  next.amount = (taxable + Number(next.gst_amount)).toFixed(2);
  return next;
}
function PurchaseVoucherPanel({ products, parties, busy, onSave, onUpdate }) {
  const [voucherNo, setVoucherNo] = reactExports.useState("");
  const [purchaseDate, setPurchaseDate] = reactExports.useState(todayDdmmyyyy());
  const [customerId, setCustomerId] = reactExports.useState("");
  const [invoiceNo, setInvoiceNo] = reactExports.useState("");
  const [batchNo, setBatchNo] = reactExports.useState("");
  const [expiryDate, setExpiryDate] = reactExports.useState("");
  const [vehicleNo, setVehicleNo] = reactExports.useState("");
  const [biltyNo, setBiltyNo] = reactExports.useState("");
  const [brokerId, setBrokerId] = reactExports.useState("");
  const [remarks, setRemarks] = reactExports.useState("");
  const [items, setItems] = reactExports.useState([createEmptyRow$3()]);
  const [error, setError] = reactExports.useState(null);
  const [historyKey, setHistoryKey] = reactExports.useState(0);
  const [editingId, setEditingId] = reactExports.useState(null);
  const gridRef = reactExports.useRef(null);
  const rootRef = useFocusFirstField();
  reactExports.useEffect(() => {
    window.stockOps.getNextPurchaseVoucherNo().then(setVoucherNo).catch(console.error);
  }, []);
  const partyOptions = reactExports.useMemo(
    () => parties.map((p) => ({ value: p.id, label: p.name, hint: p.gstin ? `| GST: ${p.gstin}` : p.code })),
    [parties]
  );
  const handleRowChange = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      const row = { ...next[index], [field]: value };
      if (field === "product_id") {
        const product = products.find((p) => String(p.id) === String(value));
        if (product) {
          row.product_name = product.name ?? "";
          row.hsn = product.hsn ?? "";
          row.unit_basis = product.unit_basis === "pcs" ? "pcs" : "quantity";
          row.size_diff = String(product.size_diff ?? 0);
          row.gst_rate = String(product.gst_rate ?? 0);
          row.base_rate = String(product.purchase_rate ?? 0);
          if (row.unit_basis === "pcs") {
            row.quantity = "";
          } else {
            row.pcs = "";
          }
        }
      }
      next[index] = recalcRow(row, field);
      return next;
    });
  };
  const appendRow = () => {
    setItems((prev) => [...prev, createEmptyRow$3()]);
    setTimeout(() => {
      const rows = gridRef.current?.querySelectorAll("tbody tr");
      const lastRow = rows?.[rows.length - 1];
      lastRow?.querySelector("select, input:not([readonly]):not([disabled])")?.focus();
    }, 30);
  };
  const onGridKey = (e) => handleGridKeyNav(e, { onAppendRow: appendRow });
  const removeRow = (index) => {
    if (items.length === 1) {
      setItems([createEmptyRow$3()]);
    } else {
      setItems(items.filter((_, i2) => i2 !== index));
    }
  };
  const totals = items.reduce(
    (acc, item) => {
      acc.taxable += Number(item.taxable_value) || 0;
      acc.gst += Number(item.gst_amount) || 0;
      acc.grand += Number(item.amount) || 0;
      return acc;
    },
    { taxable: 0, gst: 0, grand: 0 }
  );
  const resetForm = async () => {
    setEditingId(null);
    setInvoiceNo("");
    setBatchNo("");
    setExpiryDate("");
    setVehicleNo("");
    setBiltyNo("");
    setBrokerId("");
    setRemarks("");
    setCustomerId("");
    setPurchaseDate(todayDdmmyyyy());
    setItems([createEmptyRow$3()]);
    const nextNo = await window.stockOps.getNextPurchaseVoucherNo();
    setVoucherNo(nextNo);
  };
  const loadForEdit = (d) => {
    setEditingId(d.id);
    setVoucherNo(d.voucher_no || "");
    setPurchaseDate(d.date || todayDdmmyyyy());
    setCustomerId(d.party_id != null ? String(d.party_id) : "");
    setInvoiceNo(d.invoice_no || "");
    setBatchNo(d.batch_no || "");
    setExpiryDate(d.expiry_date || "");
    setVehicleNo(d.vehicle_no || "");
    setBiltyNo(d.bilty_no || "");
    const brokerParty = d.broker ? parties.find((p) => p.name === d.broker) : null;
    setBrokerId(brokerParty ? String(brokerParty.id) : "");
    setRemarks(d.remarks || "");
    setItems(d.items?.length ? d.items.map(detailItemToRow) : [createEmptyRow$3()]);
    setError(null);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };
  const handleSave = async (shouldPrint = false) => {
    setError(null);
    try {
      const validItems = items.filter(
        (i2) => i2.product_id && (Number(i2.quantity) > 0 || Number(i2.pcs) > 0)
      );
      if (validItems.length === 0) throw new Error("Add at least one item with a pcs or quantity.");
      if (!customerId) throw new Error("Customer is required.");
      const brokerName = parties.find((p) => String(p.id) === String(brokerId))?.name || "";
      const payload = {
        voucher_no: voucherNo,
        invoice_no: invoiceNo,
        supplier_id: customerId,
        warehouse_id: 1,
        // Default warehouse
        purchase_date: purchaseDate,
        batch_no: batchNo,
        expiry_date: expiryDate,
        vehicle_no: vehicleNo,
        bilty_no: biltyNo,
        broker: brokerName,
        remarks,
        taxable_value: totals.taxable,
        gst_amount: totals.gst,
        total_amount: totals.grand,
        items: validItems.map((i2) => ({
          product_id: i2.product_id,
          product_name: i2.product_name,
          hsn: i2.hsn,
          pcs: i2.pcs || 0,
          quantity: i2.quantity || 0,
          base_rate: i2.base_rate || 0,
          size_diff: i2.size_diff || 0,
          net_rate: i2.net_rate || 0,
          taxable_value: i2.taxable_value || 0,
          gst_rate: i2.gst_rate || 0,
          gst_amount: i2.gst_amount || 0,
          amount: i2.amount || 0
        }))
      };
      const saved = editingId ? await onUpdate(editingId, payload) : await onSave(payload);
      if (!saved && editingId) return;
      await resetForm();
      setHistoryKey((k) => k + 1);
      if (shouldPrint && saved?.id) {
        try {
          await window.stockOps.printVoucher("purchase", saved.id);
        } catch {
        }
      }
    } catch (err) {
      setError(err.message || "Failed to save voucher");
    }
  };
  const inputStyle2 = { width: "100%", padding: "5px 6px", border: "1px solid #d5cfc3", borderRadius: "6px", background: "#fff", color: "#4f6166" };
  const readonlyStyle = { ...inputStyle2, background: "#f2f0ea", color: "#5d6a6e" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: rootRef, style: { display: "flex", flexDirection: "column", gap: "16px", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", style: { padding: "16px" }, onKeyDown: handleFormKeyNav, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: editingId ? `Editing Purchase Voucher ${voucherNo}` : "Purchase Voucher" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", alignItems: "center" }, children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "red", fontWeight: "bold" }, children: error }),
          editingId && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: resetForm, disabled: busy, children: "Cancel Edit" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: "16px", marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "dd/mm/yyyy", value: purchaseDate, onChange: (e) => setPurchaseDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Voucher No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: voucherNo, readOnly: true, style: { background: "#f2f0ea" } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SearchableSelect,
            {
              options: partyOptions,
              value: customerId,
              onChange: setCustomerId,
              placeholder: "Search customer…"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Invoice No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: invoiceNo, onChange: (e) => setInvoiceNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batch No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: batchNo, onChange: (e) => setBatchNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Expiry Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "dd/mm/yyyy", value: expiryDate, onChange: (e) => setExpiryDate(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Vehicle No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: vehicleNo, onChange: (e) => setVehicleNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bilty No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: biltyNo, onChange: (e) => setBiltyNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "panel", style: { flex: 1, padding: "0", display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflow: "auto", flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { ref: gridRef, className: "voucher-grid", style: { width: "100%", borderCollapse: "collapse", minWidth: "820px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { position: "sticky", top: 0, background: "#f8f8f6", zIndex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "28px" }, children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "150px" }, children: "Item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "130px" }, children: "Stock Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "58px" }, children: "HSN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "48px" }, children: "Pcs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "58px" }, children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "66px" }, children: "Base" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "58px" }, children: "Diff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "66px" }, children: "Net" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "80px" }, children: "Taxable" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "48px" }, children: "GST%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "82px" }, children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "26px" } })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((row, i2) => {
        const pcsMode = row.unit_basis === "pcs";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: i2 + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: row.product_id,
              onChange: (e) => handleRowChange(i2, "product_id", e.target.value),
              onKeyDown: onGridKey,
              style: inputStyle2,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "" }),
                products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
                  p.code,
                  " - ",
                  p.name
                ] }, p.id))
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.product_name, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.hsn, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              inputMode: "decimal",
              value: row.pcs,
              disabled: !pcsMode,
              onChange: (e) => handleRowChange(i2, "pcs", e.target.value),
              onKeyDown: onGridKey,
              style: pcsMode ? inputStyle2 : readonlyStyle
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              inputMode: "decimal",
              value: row.quantity,
              disabled: pcsMode,
              onChange: (e) => handleRowChange(i2, "quantity", e.target.value),
              onKeyDown: onGridKey,
              style: pcsMode ? readonlyStyle : inputStyle2
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              inputMode: "decimal",
              value: row.base_rate,
              onChange: (e) => handleRowChange(i2, "base_rate", e.target.value),
              onKeyDown: onGridKey,
              style: inputStyle2
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              inputMode: "decimal",
              value: row.size_diff,
              onChange: (e) => handleRowChange(i2, "size_diff", e.target.value),
              onKeyDown: onGridKey,
              style: inputStyle2
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              inputMode: "decimal",
              value: row.net_rate,
              onChange: (e) => handleRowChange(i2, "net_rate", e.target.value),
              onKeyDown: onGridKey,
              style: inputStyle2
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              inputMode: "decimal",
              value: row.taxable_value,
              onChange: (e) => handleRowChange(i2, "taxable_value", e.target.value),
              onKeyDown: onGridKey,
              style: inputStyle2
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              inputMode: "decimal",
              value: row.gst_rate,
              onChange: (e) => handleRowChange(i2, "gst_rate", e.target.value),
              onKeyDown: onGridKey,
              style: inputStyle2
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.amount, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => removeRow(i2),
              tabIndex: -1,
              style: { padding: "2px 6px", background: "transparent", color: "red", border: "none" },
              children: "x"
            }
          ) })
        ] }, row.id);
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", style: { padding: "16px" }, onKeyDown: handleFormKeyNav, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "24px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Broker" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SearchableSelect,
              {
                options: partyOptions,
                value: brokerId,
                onChange: setBrokerId,
                placeholder: "Search broker…"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Remarks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: remarks, onChange: (e) => setRemarks(e.target.value), rows: 3, style: { resize: "vertical" } })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "220px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taxable Value:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.taxable.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "220px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST Amount:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.gst.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "220px", fontSize: "1.2em", color: "var(--good, #2ecc71)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.grand.toFixed(2)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px", borderTop: "1px solid #e5e1d8", paddingTop: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: () => handleSave(true), disabled: busy, style: { minWidth: "120px" }, children: busy ? "Working…" : editingId ? "Update & Print" : "Save & Print" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleSave(false), disabled: busy, style: { minWidth: "120px" }, children: busy ? "Saving..." : editingId ? "Update Voucher" : "Save Voucher" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VoucherHistory, { type: "purchase", refreshToken: historyKey, title: "Recent Purchase Vouchers", partyLabel: "Supplier", onEdit: loadForEdit })
  ] });
}
const createEmptyRow$2 = emptyVoucherRow;
function SaleReturnVoucherPanel({ products, parties, busy, onSave, onUpdate }) {
  const [voucherNo, setVoucherNo] = reactExports.useState("");
  const [returnDate, setReturnDate] = reactExports.useState(todayDdmmyyyy());
  const [customerId, setCustomerId] = reactExports.useState("");
  const [invoiceNo, setInvoiceNo] = reactExports.useState("");
  const [batchNo, setBatchNo] = reactExports.useState("");
  const [expiryDate, setExpiryDate] = reactExports.useState("");
  const [vehicleNo, setVehicleNo] = reactExports.useState("");
  const [biltyNo, setBiltyNo] = reactExports.useState("");
  const [brokerId, setBrokerId] = reactExports.useState("");
  const [remarks, setRemarks] = reactExports.useState("");
  const [items, setItems] = reactExports.useState([createEmptyRow$2()]);
  const [error, setError] = reactExports.useState(null);
  const [historyKey, setHistoryKey] = reactExports.useState(0);
  const [editingId, setEditingId] = reactExports.useState(null);
  const rootRef = useFocusFirstField();
  const gridRef = reactExports.useRef(null);
  const partyOptions = reactExports.useMemo(
    () => parties.map((p) => ({ value: p.id, label: p.name, hint: p.gstin ? `| GST: ${p.gstin}` : p.code })),
    [parties]
  );
  reactExports.useEffect(() => {
    window.stockOps.getNextSaleReturnVoucherNo().then(setVoucherNo).catch(console.error);
  }, []);
  const handleRowChange = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      let row = { ...next[index], [field]: value };
      if (field === "product_id") {
        const product = products.find((p) => String(p.id) === String(value));
        if (product) row = applyProductToRow(row, product, "sale_rate");
      }
      next[index] = recalcVoucherRow(row, field);
      return next;
    });
  };
  const appendRow = () => {
    setItems((prev) => [...prev, createEmptyRow$2()]);
    setTimeout(() => {
      const rows = gridRef.current?.querySelectorAll("tbody tr");
      const last = rows?.[rows.length - 1];
      last?.querySelector("select, input:not([readonly]):not([disabled])")?.focus();
    }, 30);
  };
  const handleKeyDown = (e) => handleGridKeyNav(e, { onAppendRow: appendRow });
  const removeRow = (index) => {
    if (items.length === 1) {
      setItems([createEmptyRow$2()]);
    } else {
      setItems(items.filter((_, i2) => i2 !== index));
    }
  };
  const totals = items.reduce((acc, item) => {
    acc.taxable += Number(item.taxable_value) || 0;
    acc.gst += Number(item.gst_amount) || 0;
    acc.grand += Number(item.amount) || 0;
    return acc;
  }, { taxable: 0, gst: 0, grand: 0 });
  const loadForEdit = (d) => {
    setEditingId(d.id);
    setVoucherNo(d.voucher_no || "");
    setReturnDate(d.date || todayDdmmyyyy());
    setCustomerId(d.party_id != null ? String(d.party_id) : "");
    setInvoiceNo(d.invoice_no || "");
    setBatchNo(d.batch_no || "");
    setExpiryDate(d.expiry_date || "");
    setVehicleNo(d.vehicle_no || "");
    setBiltyNo(d.bilty_no || "");
    const brokerParty = d.broker ? parties.find((p) => p.name === d.broker) : null;
    setBrokerId(brokerParty ? String(brokerParty.id) : "");
    setRemarks(d.remarks || "");
    setItems(d.items?.length ? d.items.map(detailItemToRow) : [createEmptyRow$2()]);
    setError(null);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };
  const cancelEdit = async () => {
    setEditingId(null);
    setInvoiceNo("");
    setBatchNo("");
    setExpiryDate("");
    setVehicleNo("");
    setBiltyNo("");
    setBrokerId("");
    setRemarks("");
    setCustomerId("");
    setItems([createEmptyRow$2()]);
    setReturnDate(todayDdmmyyyy());
    const nextNo = await window.stockOps.getNextSaleReturnVoucherNo();
    setVoucherNo(nextNo);
  };
  const handleSave = async (shouldPrint = false) => {
    setError(null);
    try {
      const validItems = items.filter(rowHasQty);
      if (validItems.length === 0) throw new Error("Add at least one item with a pcs or quantity.");
      if (!customerId) throw new Error("Customer is required.");
      const brokerName = parties.find((p) => String(p.id) === String(brokerId))?.name || "";
      const payload = {
        voucher_no: voucherNo,
        invoice_no: invoiceNo,
        customer_id: customerId,
        warehouse_id: 1,
        return_date: returnDate,
        batch_no: batchNo,
        expiry_date: expiryDate,
        vehicle_no: vehicleNo,
        bilty_no: biltyNo,
        broker: brokerName,
        remarks,
        taxable_value: totals.taxable,
        gst_amount: totals.gst,
        total_amount: totals.grand,
        items: validItems.map(toItemPayload)
      };
      const saved = editingId ? await onUpdate(editingId, payload) : await onSave(payload);
      if (!saved && editingId) return;
      setEditingId(null);
      setInvoiceNo("");
      setBatchNo("");
      setExpiryDate("");
      setVehicleNo("");
      setBiltyNo("");
      setBrokerId("");
      setRemarks("");
      setItems([createEmptyRow$2()]);
      const nextNo = await window.stockOps.getNextSaleReturnVoucherNo();
      setVoucherNo(nextNo);
      setHistoryKey((k) => k + 1);
      if (shouldPrint && saved?.id) {
        try {
          await window.stockOps.printVoucher("sale_return", saved.id);
        } catch {
        }
      }
    } catch (err) {
      setError(err.message || "Failed to save voucher");
    }
  };
  const inputStyle2 = { width: "100%", border: "1px solid #d5cfc3", background: "#fff", color: "#4f6166" };
  const readonlyStyle = { ...inputStyle2, background: "#f2f0ea", color: "#5d6a6e" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: rootRef, style: { display: "flex", flexDirection: "column", gap: "16px", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", style: { padding: "16px" }, onKeyDown: handleFormKeyNav, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: editingId ? `Editing Sales Return ${voucherNo}` : "Sales Return Voucher" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", alignItems: "center" }, children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "red", fontWeight: "bold" }, children: error }),
          editingId && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: cancelEdit, disabled: busy, children: "Cancel Edit" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: "16px", marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "dd/mm/yyyy", value: returnDate, onChange: (e) => setReturnDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Voucher No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: voucherNo, readOnly: true, style: { background: "#f2f0ea" } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: customerId, onChange: (e) => setCustomerId(e.target.value), autoFocus: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- Select Customer --" }),
            parties.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
              p.name,
              " ",
              p.gstin ? `| GST: ${p.gstin}` : ""
            ] }, p.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Orig. Invoice No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: invoiceNo, onChange: (e) => setInvoiceNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batch No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: batchNo, onChange: (e) => setBatchNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Expiry Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "dd/mm/yyyy", value: expiryDate, onChange: (e) => setExpiryDate(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Vehicle No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: vehicleNo, onChange: (e) => setVehicleNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bilty No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: biltyNo, onChange: (e) => setBiltyNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "panel", style: { flex: 1, padding: "0", display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowY: "auto", flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { ref: gridRef, className: "voucher-grid", style: { width: "100%", borderCollapse: "collapse" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { position: "sticky", top: 0, background: "#f8f8f6", zIndex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "28px" }, children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "180px" }, children: "Item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "130px" }, children: "Stock Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "62px" }, children: "HSN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "52px" }, children: "Pcs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "62px" }, children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "72px" }, children: "Base" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "62px" }, children: "Diff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "72px" }, children: "Net" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "86px" }, children: "Taxable" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "52px" }, children: "GST%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "90px" }, children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "26px" } })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((row, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: i2 + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: row.product_id, onChange: (e) => handleRowChange(i2, "product_id", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "" }),
          products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
            p.code,
            " - ",
            p.name
          ] }, p.id))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.product_name, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.hsn, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.pcs, disabled: row.unit_basis !== "pcs", onChange: (e) => handleRowChange(i2, "pcs", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: row.unit_basis === "pcs" ? inputStyle2 : readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.quantity, disabled: row.unit_basis === "pcs", onChange: (e) => handleRowChange(i2, "quantity", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: row.unit_basis === "pcs" ? readonlyStyle : inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.base_rate, onChange: (e) => handleRowChange(i2, "base_rate", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.size_diff, onChange: (e) => handleRowChange(i2, "size_diff", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.net_rate, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.taxable_value, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.gst_rate, onChange: (e) => handleRowChange(i2, "gst_rate", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.amount, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeRow(i2), tabIndex: -1, style: { padding: "2px 6px", background: "transparent", color: "red", border: "none" }, children: "x" }) })
      ] }, row.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", style: { padding: "16px" }, onKeyDown: handleFormKeyNav, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "24px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Broker" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SearchableSelect, { options: partyOptions, value: brokerId, onChange: setBrokerId, placeholder: "Search broker…" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Remarks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: remarks, onChange: (e) => setRemarks(e.target.value), rows: 3, style: { resize: "vertical" } })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "200px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taxable Value:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.taxable.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "200px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST Amount:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.gst.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "200px", fontSize: "1.2em", color: "#2ecc71" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.grand.toFixed(2)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px", borderTop: "1px solid #eee", paddingTop: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: () => handleSave(true), disabled: busy, style: { minWidth: "120px" }, children: busy ? "Working…" : editingId ? "Update & Print" : "Save & Print" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleSave(false), disabled: busy, style: { minWidth: "120px" }, children: busy ? "Saving..." : editingId ? "Update Voucher" : "Save (F2)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VoucherHistory, { type: "sale_return", refreshToken: historyKey, title: "Recent Sale Return Vouchers", partyLabel: "Customer", onEdit: loadForEdit })
  ] });
}
const createEmptyRow$1 = emptyVoucherRow;
function SaleVoucherPanel({ products, parties, busy, onSave, onUpdate }) {
  const [voucherNo, setVoucherNo] = reactExports.useState("");
  const [saleDate, setSaleDate] = reactExports.useState(todayDdmmyyyy());
  const [customerId, setCustomerId] = reactExports.useState("");
  const [invoiceNo, setInvoiceNo] = reactExports.useState("");
  const [batchNo, setBatchNo] = reactExports.useState("");
  const [expiryDate, setExpiryDate] = reactExports.useState("");
  const [vehicleNo, setVehicleNo] = reactExports.useState("");
  const [biltyNo, setBiltyNo] = reactExports.useState("");
  const [brokerId, setBrokerId] = reactExports.useState("");
  const [remarks, setRemarks] = reactExports.useState("");
  const [items, setItems] = reactExports.useState([createEmptyRow$1()]);
  const [error, setError] = reactExports.useState(null);
  const [historyKey, setHistoryKey] = reactExports.useState(0);
  const [editingId, setEditingId] = reactExports.useState(null);
  const rootRef = useFocusFirstField();
  const gridRef = reactExports.useRef(null);
  const partyOptions = reactExports.useMemo(
    () => parties.map((p) => ({ value: p.id, label: p.name, hint: p.gstin ? `| GST: ${p.gstin}` : p.code })),
    [parties]
  );
  reactExports.useEffect(() => {
    window.stockOps.getNextSaleVoucherNo().then(setVoucherNo).catch(console.error);
  }, []);
  const handleRowChange = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      let row = { ...next[index], [field]: value };
      if (field === "product_id") {
        const product = products.find((p) => String(p.id) === String(value));
        if (product) row = applyProductToRow(row, product, "sale_rate");
      }
      next[index] = recalcVoucherRow(row, field);
      return next;
    });
  };
  const appendRow = () => {
    setItems((prev) => [...prev, createEmptyRow$1()]);
    setTimeout(() => {
      const rows = gridRef.current?.querySelectorAll("tbody tr");
      const last = rows?.[rows.length - 1];
      last?.querySelector("select, input:not([readonly]):not([disabled])")?.focus();
    }, 30);
  };
  const handleKeyDown = (e) => handleGridKeyNav(e, { onAppendRow: appendRow });
  const removeRow = (index) => {
    if (items.length === 1) setItems([createEmptyRow$1()]);
    else setItems(items.filter((_, i2) => i2 !== index));
  };
  const totals = items.reduce((acc, item) => {
    acc.taxable += Number(item.taxable_value) || 0;
    acc.gst += Number(item.gst_amount) || 0;
    acc.grand += Number(item.amount) || 0;
    return acc;
  }, { taxable: 0, gst: 0, grand: 0 });
  const loadForEdit = (d) => {
    setEditingId(d.id);
    setVoucherNo(d.voucher_no || "");
    setSaleDate(d.date || todayDdmmyyyy());
    setCustomerId(d.party_id != null ? String(d.party_id) : "");
    setInvoiceNo(d.invoice_no || "");
    setBatchNo(d.batch_no || "");
    setExpiryDate(d.expiry_date || "");
    setVehicleNo(d.vehicle_no || "");
    setBiltyNo(d.bilty_no || "");
    const brokerParty = d.broker ? parties.find((p) => p.name === d.broker) : null;
    setBrokerId(brokerParty ? String(brokerParty.id) : "");
    setRemarks(d.remarks || "");
    setItems(d.items?.length ? d.items.map(detailItemToRow) : [createEmptyRow$1()]);
    setError(null);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };
  const cancelEdit = async () => {
    setEditingId(null);
    setInvoiceNo("");
    setBatchNo("");
    setExpiryDate("");
    setVehicleNo("");
    setBiltyNo("");
    setBrokerId("");
    setRemarks("");
    setCustomerId("");
    setItems([createEmptyRow$1()]);
    setSaleDate(todayDdmmyyyy());
    const nextNo = await window.stockOps.getNextSaleVoucherNo();
    setVoucherNo(nextNo);
  };
  const handleSave = async (shouldPrint = false) => {
    setError(null);
    try {
      const validItems = items.filter(rowHasQty);
      if (validItems.length === 0) throw new Error("Add at least one item with a pcs or quantity.");
      if (!customerId) throw new Error("Customer is required.");
      const brokerName = parties.find((p) => String(p.id) === String(brokerId))?.name || "";
      const payload = {
        voucher_no: voucherNo,
        invoice_no: invoiceNo,
        customer_id: customerId,
        warehouse_id: 1,
        sale_date: saleDate,
        batch_no: batchNo,
        expiry_date: expiryDate,
        vehicle_no: vehicleNo,
        bilty_no: biltyNo,
        broker: brokerName,
        remarks,
        taxable_value: totals.taxable,
        gst_amount: totals.gst,
        total_amount: totals.grand,
        items: validItems.map(toItemPayload)
      };
      const saved = editingId ? await onUpdate(editingId, payload) : await onSave(payload);
      if (!saved && editingId) return;
      setEditingId(null);
      setInvoiceNo("");
      setBatchNo("");
      setExpiryDate("");
      setVehicleNo("");
      setBiltyNo("");
      setBrokerId("");
      setRemarks("");
      setItems([createEmptyRow$1()]);
      const nextNo = await window.stockOps.getNextSaleVoucherNo();
      setVoucherNo(nextNo);
      setHistoryKey((k) => k + 1);
      if (shouldPrint && saved?.id) {
        try {
          await window.stockOps.printVoucher("sale", saved.id);
        } catch {
        }
      }
    } catch (err) {
      setError(err.message || "Failed to save voucher");
    }
  };
  const inputStyle2 = { width: "100%", border: "1px solid #d5cfc3", background: "#fff", color: "#4f6166" };
  const readonlyStyle = { ...inputStyle2, background: "#f2f0ea", color: "#5d6a6e" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: rootRef, style: { display: "flex", flexDirection: "column", gap: "16px", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", style: { padding: "16px" }, onKeyDown: handleFormKeyNav, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: editingId ? `Editing Sales Voucher ${voucherNo}` : "Sales Voucher" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", alignItems: "center" }, children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "red", fontWeight: "bold" }, children: error }),
          editingId && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: cancelEdit, disabled: busy, children: "Cancel Edit" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: "16px", marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "dd/mm/yyyy", value: saleDate, onChange: (e) => setSaleDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Voucher No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: voucherNo, readOnly: true, style: { background: "#f2f0ea" } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: customerId, onChange: (e) => setCustomerId(e.target.value), autoFocus: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- Select Customer --" }),
            parties.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
              p.name,
              " ",
              p.gstin ? `| GST: ${p.gstin}` : ""
            ] }, p.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Invoice No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: invoiceNo, onChange: (e) => setInvoiceNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batch No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: batchNo, onChange: (e) => setBatchNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Expiry Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "dd/mm/yyyy", value: expiryDate, onChange: (e) => setExpiryDate(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Vehicle No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: vehicleNo, onChange: (e) => setVehicleNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bilty No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: biltyNo, onChange: (e) => setBiltyNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "panel", style: { flex: 1, padding: "0", display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowY: "auto", flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { ref: gridRef, className: "voucher-grid", style: { width: "100%", borderCollapse: "collapse" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { position: "sticky", top: 0, background: "#f8f8f6", zIndex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "28px" }, children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "180px" }, children: "Item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "130px" }, children: "Stock Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "62px" }, children: "HSN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "52px" }, children: "Pcs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "62px" }, children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "72px" }, children: "Base" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "62px" }, children: "Diff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "72px" }, children: "Net" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "86px" }, children: "Taxable" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "52px" }, children: "GST%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "90px" }, children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "26px" } })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((row, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: i2 + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: row.product_id, onChange: (e) => handleRowChange(i2, "product_id", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "" }),
          products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
            p.code,
            " - ",
            p.name
          ] }, p.id))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.product_name, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.hsn, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.pcs, disabled: row.unit_basis !== "pcs", onChange: (e) => handleRowChange(i2, "pcs", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: row.unit_basis === "pcs" ? inputStyle2 : readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.quantity, disabled: row.unit_basis === "pcs", onChange: (e) => handleRowChange(i2, "quantity", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: row.unit_basis === "pcs" ? readonlyStyle : inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.base_rate, onChange: (e) => handleRowChange(i2, "base_rate", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.size_diff, onChange: (e) => handleRowChange(i2, "size_diff", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.net_rate, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.taxable_value, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.gst_rate, onChange: (e) => handleRowChange(i2, "gst_rate", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.amount, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeRow(i2), tabIndex: -1, style: { padding: "2px 6px", background: "transparent", color: "red", border: "none" }, children: "×" }) })
      ] }, row.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", style: { padding: "16px" }, onKeyDown: handleFormKeyNav, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "24px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Broker" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SearchableSelect, { options: partyOptions, value: brokerId, onChange: setBrokerId, placeholder: "Search broker…" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Remarks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: remarks, onChange: (e) => setRemarks(e.target.value), rows: 3, style: { resize: "vertical" } })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "220px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taxable Value:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.taxable.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "220px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST Amount:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.gst.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "220px", fontSize: "1.2em", color: "#2ecc71" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.grand.toFixed(2)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px", borderTop: "1px solid #e8e8e8", paddingTop: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: () => handleSave(true), disabled: busy, style: { minWidth: "120px" }, children: busy ? "Working…" : editingId ? "Update & Print" : "Save & Print" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleSave(false), disabled: busy, style: { minWidth: "120px" }, children: busy ? "Saving..." : editingId ? "Update Voucher" : "Save (F2)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VoucherHistory, { type: "sale", refreshToken: historyKey, title: "Recent Sales Vouchers", partyLabel: "Customer", onEdit: loadForEdit })
  ] });
}
const createEmptyRow = emptyVoucherRow;
function PurchaseReturnVoucherPanel({ products, parties, busy, onSave, onUpdate }) {
  const [voucherNo, setVoucherNo] = reactExports.useState("");
  const [returnDate, setReturnDate] = reactExports.useState(todayDdmmyyyy());
  const [supplierId, setSupplierId] = reactExports.useState("");
  const [invoiceNo, setInvoiceNo] = reactExports.useState("");
  const [batchNo, setBatchNo] = reactExports.useState("");
  const [expiryDate, setExpiryDate] = reactExports.useState("");
  const [vehicleNo, setVehicleNo] = reactExports.useState("");
  const [biltyNo, setBiltyNo] = reactExports.useState("");
  const [brokerId, setBrokerId] = reactExports.useState("");
  const [remarks, setRemarks] = reactExports.useState("");
  const [items, setItems] = reactExports.useState([createEmptyRow()]);
  const [error, setError] = reactExports.useState(null);
  const [historyKey, setHistoryKey] = reactExports.useState(0);
  const [editingId, setEditingId] = reactExports.useState(null);
  const rootRef = useFocusFirstField();
  const gridRef = reactExports.useRef(null);
  const partyOptions = reactExports.useMemo(
    () => parties.map((p) => ({ value: p.id, label: p.name, hint: p.gstin ? `| GST: ${p.gstin}` : p.code })),
    [parties]
  );
  reactExports.useEffect(() => {
    window.stockOps.getNextPurchaseReturnVoucherNo().then(setVoucherNo).catch(console.error);
  }, []);
  const handleRowChange = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      let row = { ...next[index], [field]: value };
      if (field === "product_id") {
        const product = products.find((p) => String(p.id) === String(value));
        if (product) row = applyProductToRow(row, product, "purchase_rate");
      }
      next[index] = recalcVoucherRow(row, field);
      return next;
    });
  };
  const appendRow = () => {
    setItems((prev) => [...prev, createEmptyRow()]);
    setTimeout(() => {
      const rows = gridRef.current?.querySelectorAll("tbody tr");
      const last = rows?.[rows.length - 1];
      last?.querySelector("select, input:not([readonly]):not([disabled])")?.focus();
    }, 30);
  };
  const handleKeyDown = (e) => handleGridKeyNav(e, { onAppendRow: appendRow });
  const removeRow = (index) => {
    if (items.length === 1) setItems([createEmptyRow()]);
    else setItems(items.filter((_, i2) => i2 !== index));
  };
  const totals = items.reduce((acc, item) => {
    acc.taxable += Number(item.taxable_value) || 0;
    acc.gst += Number(item.gst_amount) || 0;
    acc.grand += Number(item.amount) || 0;
    return acc;
  }, { taxable: 0, gst: 0, grand: 0 });
  const loadForEdit = (d) => {
    setEditingId(d.id);
    setVoucherNo(d.voucher_no || "");
    setReturnDate(d.date || todayDdmmyyyy());
    setSupplierId(d.party_id != null ? String(d.party_id) : "");
    setInvoiceNo(d.invoice_no || "");
    setBatchNo(d.batch_no || "");
    setExpiryDate(d.expiry_date || "");
    setVehicleNo(d.vehicle_no || "");
    setBiltyNo(d.bilty_no || "");
    const brokerParty = d.broker ? parties.find((p) => p.name === d.broker) : null;
    setBrokerId(brokerParty ? String(brokerParty.id) : "");
    setRemarks(d.remarks || "");
    setItems(d.items?.length ? d.items.map(detailItemToRow) : [createEmptyRow()]);
    setError(null);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };
  const cancelEdit = async () => {
    setEditingId(null);
    setInvoiceNo("");
    setBatchNo("");
    setExpiryDate("");
    setVehicleNo("");
    setBiltyNo("");
    setBrokerId("");
    setRemarks("");
    setSupplierId("");
    setItems([createEmptyRow()]);
    setReturnDate(todayDdmmyyyy());
    const nextNo = await window.stockOps.getNextPurchaseReturnVoucherNo();
    setVoucherNo(nextNo);
  };
  const handleSave = async (shouldPrint = false) => {
    setError(null);
    try {
      const validItems = items.filter(rowHasQty);
      if (validItems.length === 0) throw new Error("Add at least one item with a pcs or quantity.");
      if (!supplierId) throw new Error("Supplier is required.");
      const brokerName = parties.find((p) => String(p.id) === String(brokerId))?.name || "";
      const payload = {
        voucher_no: voucherNo,
        invoice_no: invoiceNo,
        supplier_id: supplierId,
        warehouse_id: 1,
        return_date: returnDate,
        batch_no: batchNo,
        expiry_date: expiryDate,
        vehicle_no: vehicleNo,
        bilty_no: biltyNo,
        broker: brokerName,
        remarks,
        taxable_value: totals.taxable,
        gst_amount: totals.gst,
        total_amount: totals.grand,
        items: validItems.map(toItemPayload)
      };
      const saved = editingId ? await onUpdate(editingId, payload) : await onSave(payload);
      if (!saved && editingId) return;
      setEditingId(null);
      setInvoiceNo("");
      setBatchNo("");
      setExpiryDate("");
      setVehicleNo("");
      setBiltyNo("");
      setBrokerId("");
      setRemarks("");
      setItems([createEmptyRow()]);
      const nextNo = await window.stockOps.getNextPurchaseReturnVoucherNo();
      setVoucherNo(nextNo);
      setHistoryKey((k) => k + 1);
      if (shouldPrint && saved?.id) {
        try {
          await window.stockOps.printVoucher("purchase_return", saved.id);
        } catch {
        }
      }
    } catch (err) {
      setError(err.message || "Failed to save voucher");
    }
  };
  const inputStyle2 = { width: "100%", border: "1px solid #d5cfc3", background: "#fff", color: "#4f6166" };
  const readonlyStyle = { ...inputStyle2, background: "#f2f0ea", color: "#5d6a6e" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: rootRef, style: { display: "flex", flexDirection: "column", gap: "16px", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", style: { padding: "16px" }, onKeyDown: handleFormKeyNav, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: editingId ? `Editing Purchase Return ${voucherNo}` : "Purchase Return Voucher" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", alignItems: "center" }, children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "red", fontWeight: "bold" }, children: error }),
          editingId && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: cancelEdit, disabled: busy, children: "Cancel Edit" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: "16px", marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "dd/mm/yyyy", value: returnDate, onChange: (e) => setReturnDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Voucher No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: voucherNo, readOnly: true, style: { background: "#f2f0ea" } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Supplier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: supplierId, onChange: (e) => setSupplierId(e.target.value), autoFocus: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- Select Supplier --" }),
            parties.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
              p.name,
              " ",
              p.gstin ? `| GST: ${p.gstin}` : ""
            ] }, p.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Orig. Invoice No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: invoiceNo, onChange: (e) => setInvoiceNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batch No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: batchNo, onChange: (e) => setBatchNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Expiry Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "dd/mm/yyyy", value: expiryDate, onChange: (e) => setExpiryDate(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Vehicle No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: vehicleNo, onChange: (e) => setVehicleNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bilty No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: biltyNo, onChange: (e) => setBiltyNo(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "panel", style: { flex: 1, padding: "0", display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowY: "auto", flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { ref: gridRef, className: "voucher-grid", style: { width: "100%", borderCollapse: "collapse" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { position: "sticky", top: 0, background: "#f8f8f6", zIndex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "28px" }, children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "180px" }, children: "Item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "130px" }, children: "Stock Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "62px" }, children: "HSN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "52px" }, children: "Pcs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "62px" }, children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "72px" }, children: "Base" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "62px" }, children: "Diff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "72px" }, children: "Net" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "86px" }, children: "Taxable" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "52px" }, children: "GST%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "90px" }, children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "26px" } })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((row, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: i2 + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: row.product_id, onChange: (e) => handleRowChange(i2, "product_id", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "" }),
          products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
            p.code,
            " - ",
            p.name
          ] }, p.id))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.product_name, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.hsn, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.pcs, disabled: row.unit_basis !== "pcs", onChange: (e) => handleRowChange(i2, "pcs", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: row.unit_basis === "pcs" ? inputStyle2 : readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.quantity, disabled: row.unit_basis === "pcs", onChange: (e) => handleRowChange(i2, "quantity", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: row.unit_basis === "pcs" ? readonlyStyle : inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.base_rate, onChange: (e) => handleRowChange(i2, "base_rate", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.size_diff, onChange: (e) => handleRowChange(i2, "size_diff", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.net_rate, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.taxable_value, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.gst_rate, onChange: (e) => handleRowChange(i2, "gst_rate", e.target.value), onKeyDown: (e) => handleKeyDown(e), style: inputStyle2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.amount, readOnly: true, tabIndex: -1, style: readonlyStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeRow(i2), tabIndex: -1, style: { padding: "2px 6px", background: "transparent", color: "red", border: "none" }, children: "×" }) })
      ] }, row.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", style: { padding: "16px" }, onKeyDown: handleFormKeyNav, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "24px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Broker" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SearchableSelect, { options: partyOptions, value: brokerId, onChange: setBrokerId, placeholder: "Search broker…" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Remarks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: remarks, onChange: (e) => setRemarks(e.target.value), rows: 3, style: { resize: "vertical" } })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "220px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taxable Value:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.taxable.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "220px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST Amount:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.gst.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "220px", fontSize: "1.2em", color: "#2ecc71" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "₹ ",
              totals.grand.toFixed(2)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px", borderTop: "1px solid #e8e8e8", paddingTop: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: () => handleSave(true), disabled: busy, style: { minWidth: "120px" }, children: busy ? "Working…" : editingId ? "Update & Print" : "Save & Print" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleSave(false), disabled: busy, style: { minWidth: "120px" }, children: busy ? "Saving..." : editingId ? "Update Voucher" : "Save (F2)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VoucherHistory, { type: "purchase_return", refreshToken: historyKey, title: "Recent Purchase Return Vouchers", partyLabel: "Supplier", onEdit: loadForEdit })
  ] });
}
function emptyRow() {
  return {
    id: Date.now() + Math.random(),
    product_id: "",
    batch_no: "",
    issued_qty: "",
    issued_pcs: "",
    production_qty: "",
    production_pcs: "",
    base: null
    // { kind: 'issue'|'produce', qty, pcs }
  };
}
function fmt$1(n2) {
  const r2 = Math.round((Number(n2) || 0) * 1e3) / 1e3;
  return Number.isFinite(r2) ? String(r2) : "";
}
const inputStyle$1 = { width: "100%", border: "1px solid #d5cfc3", background: "#fff", color: "#4f6166" };
const issuedBorder = { borderLeft: "2px solid #d5cfc3" };
const producedBorder = { borderLeft: "2px solid #c8b27a" };
function ProductionVoucherPanel({ products, formulas = [], busy, onSave }) {
  const [voucherNo, setVoucherNo] = reactExports.useState("");
  const [productionDate, setProductionDate] = reactExports.useState(todayDdmmyyyy());
  const [isRecurring, setIsRecurring] = reactExports.useState(false);
  const [remarks, setRemarks] = reactExports.useState("");
  const [formulaId, setFormulaId] = reactExports.useState("");
  const [multiplier, setMultiplier] = reactExports.useState("1");
  const [items, setItems] = reactExports.useState([emptyRow()]);
  const [error, setError] = reactExports.useState(null);
  const [historyKey, setHistoryKey] = reactExports.useState(0);
  const rootRef = useFocusFirstField();
  const gridRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    window.stockOps.getNextProductionVoucherNo().then(setVoucherNo).catch(console.error);
  }, []);
  const scaleRowsBy = (factor) => {
    setItems(
      (prev) => prev.map((r2) => {
        if (!r2.base) return r2;
        const q = fmt$1(Number(r2.base.qty) * factor);
        const p = r2.base.pcs ? fmt$1(Number(r2.base.pcs) * factor) : "";
        return r2.base.kind === "issue" ? { ...r2, issued_qty: q, issued_pcs: p } : { ...r2, production_qty: q, production_pcs: p };
      })
    );
  };
  const applyFormula = (fid) => {
    setFormulaId(fid);
    setMultiplier("1");
    const f = formulas.find((x) => String(x.id) === String(fid));
    if (!f) {
      setItems([emptyRow()]);
      return;
    }
    const rows = (f.lines || []).map((l) => {
      const base = { kind: l.kind, qty: Number(l.quantity) || 0, pcs: Number(l.pcs) || 0 };
      const q = fmt$1(l.quantity);
      const p = l.pcs ? fmt$1(l.pcs) : "";
      const row = { ...emptyRow(), id: Date.now() + Math.random(), product_id: String(l.product_id), base };
      return l.kind === "issue" ? { ...row, issued_qty: q, issued_pcs: p } : { ...row, production_qty: q, production_pcs: p };
    });
    setItems(rows.length ? rows : [emptyRow()]);
  };
  const onMultiplierChange = (v) => {
    setMultiplier(v);
    scaleRowsBy(Number(v) || 0);
  };
  const changeField = (idx, field, value) => {
    const row = items[idx];
    const isIssueQtyEdit = field === "issued_qty" && row.base?.kind === "issue" && Number(row.base.qty) > 0;
    const isProdQtyEdit = field === "production_qty" && row.base?.kind === "produce" && Number(row.base.qty) > 0;
    if (isIssueQtyEdit || isProdQtyEdit) {
      const factor = (Number(value) || 0) / Number(row.base.qty);
      setMultiplier(fmt$1(factor));
      scaleRowsBy(factor);
      return;
    }
    setItems((prev) => prev.map((r2, i2) => i2 === idx ? { ...r2, [field]: value } : r2));
  };
  const appendRow = () => setItems((prev) => [...prev, emptyRow()]);
  const removeRow = (idx) => setItems((prev) => prev.length === 1 ? [emptyRow()] : prev.filter((_, i2) => i2 !== idx));
  const onGridKey = (e) => handleGridKeyNav(e, { onAppendRow: appendRow });
  const totals = items.reduce(
    (acc, r2) => {
      acc.issued += Number(r2.issued_qty) || 0;
      acc.produced += Number(r2.production_qty) || 0;
      return acc;
    },
    { issued: 0, produced: 0 }
  );
  const handleSave = async () => {
    setError(null);
    try {
      const validItems = items.filter(
        (r2) => r2.product_id && (Number(r2.issued_qty) > 0 || Number(r2.issued_pcs) > 0 || Number(r2.production_qty) > 0 || Number(r2.production_pcs) > 0)
      ).map((r2) => ({
        product_id: Number(r2.product_id),
        batch_no: r2.batch_no,
        issued_qty: Number(r2.issued_qty) || 0,
        issued_pcs: Number(r2.issued_pcs) || 0,
        production_qty: Number(r2.production_qty) || 0,
        production_pcs: Number(r2.production_pcs) || 0
      }));
      if (validItems.length === 0) throw new Error("Add at least one item with an issued or produced quantity.");
      await onSave({
        voucher_no: voucherNo,
        warehouse_id: 1,
        production_date: productionDate,
        is_recurring: isRecurring,
        remarks,
        items: validItems
      });
      setRemarks("");
      setIsRecurring(false);
      setFormulaId("");
      setMultiplier("1");
      setItems([emptyRow()]);
      const nextNo = await window.stockOps.getNextProductionVoucherNo();
      setVoucherNo(nextNo);
      setHistoryKey((k) => k + 1);
    } catch (err) {
      setError(err.message || "Failed to save voucher");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: rootRef, style: { display: "flex", flexDirection: "column", gap: "14px", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", style: { padding: "16px" }, onKeyDown: handleFormKeyNav, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "14px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Production Voucher" }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "red", fontWeight: "bold" }, children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "dd/mm/yyyy", value: productionDate, onChange: (e) => setProductionDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Voucher No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: voucherNo, readOnly: true, style: { background: "#f2f0ea" } })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Production Formula (fixed ratio)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: formulaId, onChange: (e) => applyFormula(e.target.value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— None (manual entry) —" }),
            formulas.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f.id, children: f.name }, f.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Batch (× multiplier)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              inputMode: "decimal",
              value: multiplier,
              disabled: !formulaId,
              onChange: (e) => onMultiplierChange(e.target.value),
              style: !formulaId ? { background: "#f2f0ea" } : void 0
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "panel", style: { flex: 1, padding: "0", display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflow: "auto", flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { ref: gridRef, className: "voucher-grid", style: { width: "100%", borderCollapse: "collapse", minWidth: "760px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("thead", { style: { position: "sticky", top: 0, background: "#f8f8f6", zIndex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { rowSpan: 2, style: { width: "30px" }, children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { rowSpan: 2, children: "Stock Item" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { rowSpan: 2, style: { width: "110px" }, children: "Batch No." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { colSpan: 2, style: { ...issuedBorder, textAlign: "center" }, children: "Issued (Raw Material)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { colSpan: 2, style: { ...producedBorder, textAlign: "center" }, children: "Produced (Finished Goods)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { rowSpan: 2, style: { width: "28px" } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { ...issuedBorder, width: "85px" }, children: "Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "75px" }, children: "Pcs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { ...producedBorder, width: "85px" }, children: "Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "75px" }, children: "Pcs" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        items.map((row, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: i2 + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: row.product_id, onChange: (e) => changeField(i2, "product_id", e.target.value), onKeyDown: onGridKey, style: inputStyle$1, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "" }),
            products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
              p.code,
              " - ",
              p.name
            ] }, p.id))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: row.batch_no, onChange: (e) => changeField(i2, "batch_no", e.target.value), onKeyDown: onGridKey, style: inputStyle$1 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: issuedBorder, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.issued_qty, onChange: (e) => changeField(i2, "issued_qty", e.target.value), onKeyDown: onGridKey, style: inputStyle$1 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.issued_pcs, onChange: (e) => changeField(i2, "issued_pcs", e.target.value), onKeyDown: onGridKey, style: inputStyle$1 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: producedBorder, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.production_qty, onChange: (e) => changeField(i2, "production_qty", e.target.value), onKeyDown: onGridKey, style: inputStyle$1 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: row.production_pcs, onChange: (e) => changeField(i2, "production_pcs", e.target.value), onKeyDown: onGridKey, style: inputStyle$1 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeRow(i2), tabIndex: -1, style: { padding: "2px 6px", background: "transparent", color: "red", border: "none" }, children: "x" }) })
        ] }, row.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { background: "#f8f8f6", fontWeight: "bold" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, style: { textAlign: "right", paddingRight: "10px" }, children: "Total Qty:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: issuedBorder, children: totals.issued.toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: producedBorder, children: totals.produced.toFixed(2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 2 })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "panel", style: { padding: "16px" }, onKeyDown: handleFormKeyNav, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "24px", alignItems: "flex-end" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Remarks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: remarks, onChange: (e) => setRemarks(e.target.value), rows: 2, style: { resize: "vertical" } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSave, disabled: busy, style: { minWidth: "140px" }, children: busy ? "Saving..." : "Save Voucher" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VoucherHistory,
      {
        type: "production",
        refreshToken: historyKey,
        title: "Recent Production Vouchers",
        showParty: false,
        showAmount: false
      }
    )
  ] });
}
function buildItemCode(name, size, length) {
  return [name, size, length].map((value) => (value ?? "").toString().trim()).filter(Boolean).map((value) => value.replace(/\s+/g, "_")).join("/");
}
function HsnSelect({ value, onChange, inputStyle: inputStyle2 }) {
  const [open, setOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [active, setActive] = reactExports.useState(0);
  const wrapRef = reactExports.useRef(null);
  const listRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = listRef.current?.children?.[active];
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [active]);
  reactExports.useEffect(() => {
    const onDocMouseDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);
  reactExports.useEffect(() => {
    if (!open) return void 0;
    let alive = true;
    const q = query.trim();
    const t2 = setTimeout(async () => {
      try {
        const rows = await window.stockOps.listMaster("hsn", { search: q, pageSize: 50 });
        if (alive) {
          setResults(rows || []);
          setActive(0);
        }
      } catch {
        if (alive) setResults([]);
      }
    }, 150);
    return () => {
      alive = false;
      clearTimeout(t2);
    };
  }, [query, open]);
  const pick = (row) => {
    onChange(row.code);
    setOpen(false);
    setQuery("");
  };
  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === "ArrowDown") {
        setOpen(true);
        e.stopPropagation();
        e.preventDefault();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      setActive((i2) => Math.min(i2 + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      e.stopPropagation();
      setActive((i2) => Math.max(i2 - 1, 0));
    } else if (e.key === "Enter") {
      if (results[active]) {
        e.preventDefault();
        e.stopPropagation();
        pick(results[active]);
      }
    } else if (e.key === "Escape") {
      e.stopPropagation();
      setOpen(false);
      setQuery("");
    }
  };
  const display = open ? query : value || "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: wrapRef, style: { position: "relative" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        value: display,
        placeholder: value ? value : "Search HSN…",
        onChange: (e) => {
          setQuery(e.target.value);
          setOpen(true);
        },
        onFocus: () => setOpen(true),
        onBlur: () => {
          setOpen(false);
          setQuery("");
        },
        onKeyDown,
        style: inputStyle2
      }
    ),
    open ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "ul",
      {
        ref: listRef,
        style: {
          position: "absolute",
          zIndex: 30,
          top: "100%",
          left: 0,
          right: 0,
          margin: 0,
          padding: 0,
          listStyle: "none",
          maxHeight: "260px",
          overflowY: "auto",
          background: "#ffffff",
          border: "1px solid #d5cfc3",
          borderRadius: "8px",
          boxShadow: "0 8px 24px rgba(47,58,61,0.14)"
        },
        children: results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("li", { style: { padding: "8px 10px", opacity: 0.6 }, children: query.trim() ? "No matches" : "Type to search…" }) : results.map((row, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            onMouseDown: () => pick(row),
            onMouseEnter: () => setActive(i2),
            style: {
              padding: "7px 10px",
              cursor: "pointer",
              color: "#4f6166",
              background: i2 === active ? "#f2f0ea" : "transparent"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: row.code }),
              row.description ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { opacity: 0.7 }, children: [
                " — ",
                row.description
              ] }) : null
            ]
          },
          row.id
        ))
      }
    ) : null
  ] });
}
const stockMasterSchema = objectType({
  name: stringType().min(1, "Item name is required"),
  code: stringType().optional().default(""),
  category_id: stringType().optional().default(""),
  hsn: stringType().optional().default(""),
  unit_id: stringType().optional().default(""),
  unit_basis: enumType(["quantity", "pcs"]).default("quantity"),
  size: stringType().optional().default(""),
  length: stringType().optional().default(""),
  gst_rate: coerce.number().min(0).default(0),
  sale_rate: coerce.number().min(0).default(0),
  purchase_rate: coerce.number().min(0).default(0),
  size_diff: coerce.number().default(0),
  batch_no: stringType().optional().default(""),
  description: stringType().optional().default(""),
  opening_qty: coerce.number().min(0).default(0),
  opening_date: stringType().optional().default(""),
  isi_mark: enumType(["yes", "no"]).default("no")
});
function todayDateInputValue() {
  const d = /* @__PURE__ */ new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}
function getDefaultValues() {
  return {
    name: "",
    code: "",
    category_id: "",
    hsn: "",
    unit_id: "",
    unit_basis: "quantity",
    size: "",
    length: "",
    gst_rate: 0,
    sale_rate: 0,
    purchase_rate: 0,
    size_diff: 0,
    batch_no: "",
    description: "",
    opening_qty: 0,
    opening_date: todayDateInputValue(),
    isi_mark: "no"
  };
}
function StockMasterPanel({ products, categories, units, onCreate, onUpdate, onDelete, busy }) {
  const [showForm, setShowForm] = reactExports.useState(true);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [groupFilter, setGroupFilter] = reactExports.useState("all");
  const [codeTouched, setCodeTouched] = reactExports.useState(false);
  const [formError, setFormError] = reactExports.useState(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: t(stockMasterSchema),
    defaultValues: getDefaultValues()
  });
  const watchedName = watch("name");
  const watchedSize = watch("size");
  const watchedLength = watch("length");
  reactExports.useEffect(() => {
    if (!editingId && !codeTouched) {
      setValue("code", buildItemCode(watchedName, watchedSize, watchedLength));
    }
  }, [watchedName, watchedSize, watchedLength, editingId, codeTouched, setValue]);
  const categoryMap = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    categories.forEach((category) => map.set(String(category.id), category.name));
    return map;
  }, [categories]);
  const unitMap = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    units.forEach((unit) => map.set(String(unit.id), unit.name));
    return map;
  }, [units]);
  const rows = reactExports.useMemo(() => {
    return products.filter((item) => {
      return groupFilter === "all" || String(item.category_id ?? "") === groupFilter;
    });
  }, [products, groupFilter]);
  const submit = async (values) => {
    const payload = {
      name: values.name.trim(),
      code: values.code.trim(),
      category_id: values.category_id ? Number(values.category_id) : null,
      hsn: values.hsn || null,
      unit_id: values.unit_id ? Number(values.unit_id) : null,
      unit_basis: values.unit_basis,
      size: values.size.trim() || null,
      length: values.length.trim() || null,
      gst_rate: Number(values.gst_rate),
      sale_rate: Number(values.sale_rate),
      purchase_rate: Number(values.purchase_rate),
      size_diff: Number(values.size_diff),
      batch_no: values.batch_no.trim() || null,
      description: values.description.trim() || null,
      opening_stock_date: values.opening_date || null,
      isi_mark: values.isi_mark === "yes",
      is_active: true,
      // Transient — consumed by App to record the opening-balance stock movement.
      opening_qty: Number(values.opening_qty),
      opening_rate: Number(values.purchase_rate),
      opening_date: values.opening_date || todayDateInputValue()
    };
    setFormError(null);
    try {
      if (editingId) {
        await onUpdate(editingId, payload);
      } else {
        await onCreate(payload);
      }
    } catch (err) {
      const clean = (err?.message || "Unable to save item").replace(/^Error invoking remote method '[^']*':\s*/, "").replace(/^AppError:\s*/, "");
      setFormError(clean);
      return;
    }
    setEditingId(null);
    setCodeTouched(false);
    reset(getDefaultValues());
  };
  const startEdit = (row) => {
    setEditingId(row.id);
    setShowForm(true);
    setCodeTouched(true);
    reset({
      name: row.name ?? "",
      code: row.code ?? "",
      category_id: row.category_id ? String(row.category_id) : "",
      hsn: row.hsn ?? "",
      unit_id: row.unit_id ? String(row.unit_id) : "",
      unit_basis: row.unit_basis === "pcs" ? "pcs" : "quantity",
      size: row.size ?? "",
      length: row.length ?? "",
      gst_rate: Number(row.gst_rate ?? 0),
      sale_rate: Number(row.sale_rate ?? 0),
      purchase_rate: Number(row.purchase_rate ?? 0),
      size_diff: Number(row.size_diff ?? 0),
      batch_no: row.batch_no ?? "",
      description: row.description ?? "",
      opening_qty: 0,
      opening_date: row.opening_stock_date || todayDateInputValue(),
      isi_mark: row.isi_mark ? "yes" : "no"
    });
  };
  const cancelEdit = () => {
    setEditingId(null);
    setCodeTouched(false);
    setFormError(null);
    reset(getDefaultValues());
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "stock-master-view", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stock-master-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Stock Master" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          products.length,
          " items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowForm((value) => !value), children: showForm ? "Hide Form" : "+ New Item" })
    ] }),
    showForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel stock-form-panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: editingId ? "Edit Item" : "New Item" }),
      formError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: formError }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "stock-grid-form", onSubmit: handleSubmit(submit), onKeyDown: handleFormKeyNav, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Stock Name",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...register("name") }),
          errors.name ? /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errors.name.message }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Group",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { ...register("category_id"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
            categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: category.id, children: category.name }, category.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "HSN Code",
          /* @__PURE__ */ jsxRuntimeExports.jsx(HsnSelect, { value: watch("hsn"), onChange: (code) => setValue("hsn", code, { shouldDirty: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", ...register("hsn") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "UOM",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { ...register("unit_id"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
            units.map((unit) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: unit.id, children: unit.name }, unit.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Measured By",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { ...register("unit_basis"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "quantity", children: "Quantity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pcs", children: "Pcs" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Size",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...register("size") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Length",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...register("length") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "GST Rate (%)",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", step: "0.01", ...register("gst_rate") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Sale Rate",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", step: "0.01", ...register("sale_rate") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Purchase Rate",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", step: "0.01", ...register("purchase_rate") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Size Difference",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", step: "0.01", ...register("size_diff") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Batch No.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...register("batch_no") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Opening Stock Qty",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", step: "0.001", ...register("opening_qty") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Opening Stock Date",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "dd/mm/yyyy", ...register("opening_date") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "ISI Marked",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { ...register("isi_mark"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "no", children: "No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "yes", children: "Yes" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "General Description",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...register("description") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { gridColumn: "span 2" }, children: [
          "Item Code",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ...register("code", { onChange: () => setCodeTouched(true) }),
              placeholder: "Auto from name / size / length"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "stock-hint", children: "Auto-generated as name/size/length. Unique, can be overridden." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stock-form-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, children: editingId ? "Update Item" : "Save Item" }),
          editingId ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: cancelEdit, children: "Cancel" }) : null
        ] })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "stock-master-filters", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: groupFilter, onChange: (event) => setGroupFilter(event.target.value), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Groups" }),
      categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(category.id), children: category.name }, category.id))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Group" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "HSN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "UOM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Basis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Sale Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Current Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, children: "No items found." }) }) : rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.code }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: categoryMap.get(String(row.category_id ?? "")) || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.hsn || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: unitMap.get(String(row.unit_id ?? "")) || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textTransform: "capitalize" }, children: row.unit_basis || "quantity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: Number(row.sale_rate ?? 0).toFixed(2) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: Number(row.current_stock ?? 0).toFixed(3) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "action-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: () => startEdit(row), children: "Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "danger-btn", onClick: () => onDelete(row.id), children: "Delete" })
        ] }) })
      ] }, row.id)) })
    ] }) })
  ] });
}
const partySchema = objectType({
  id: numberType().optional(),
  name: stringType().min(1, "Party Name is required"),
  code: stringType().min(1, "Party Code is required"),
  mobile: stringType().optional().nullable(),
  address: stringType().optional().nullable(),
  city: stringType().optional().nullable(),
  district: stringType().optional().nullable(),
  state: stringType().optional().nullable(),
  pin_code: stringType().optional().nullable(),
  gstin: stringType().regex(/^[0-9A-Z]{15}$/, "GST No. must be 15 uppercase letters/digits").optional().or(literalType(""))
});
const defaultValues = {
  name: "",
  code: "",
  mobile: "",
  address: "",
  city: "",
  district: "",
  state: "",
  pin_code: "",
  gstin: ""
};
function PartyMasterPanel({ rows, busy, onCreate, onUpdate, onDelete }) {
  const [editingId, setEditingId] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: t(partySchema),
    defaultValues
  });
  const generateCode = async () => {
    try {
      const nextCode = await window.stockOps.getNextPartyCode();
      setValue("code", nextCode);
    } catch (err) {
      console.error("Failed to generate party code", err);
    }
  };
  reactExports.useEffect(() => {
    if (!editingId) {
      generateCode();
    }
  }, [editingId]);
  const onEdit = (row) => {
    setEditingId(row.id);
    reset({
      name: row.name,
      code: row.code,
      mobile: row.mobile || "",
      address: row.address || "",
      city: row.city || "",
      district: row.district || "",
      state: row.state || "",
      pin_code: row.pin_code || "",
      gstin: row.gstin || ""
    });
  };
  const onCancel = () => {
    setEditingId(null);
    reset(defaultValues);
    generateCode();
    setError(null);
  };
  const onSubmit = async (values) => {
    setError(null);
    try {
      if (editingId) {
        await onUpdate(editingId, values);
      } else {
        await onCreate(values);
      }
      onCancel();
    } catch (err) {
      setError(err.message || "Failed to save party");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this party?")) return;
    try {
      await onDelete(id);
      if (editingId === id) onCancel();
    } catch (err) {
      setError(err.message || "Failed to delete party");
    }
  };
  const handleKeyDown = (e) => handleFormKeyNav({
    key: e.key,
    target: e.target,
    currentTarget: e.target.closest("form"),
    preventDefault: () => e.preventDefault()
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "party-master-view", style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: editingId ? "Edit Party" : "Create Party" }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST No." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "party-gstin",
                ...register("gstin"),
                onKeyDown: (e) => handleKeyDown(e),
                placeholder: "Enter GST Number"
              }
            ),
            errors.gstin && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errors.gstin.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "party-address",
                ...register("address"),
                onKeyDown: (e) => handleKeyDown(e)
              }
            ),
            errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errors.address.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "District" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "party-district",
                ...register("district"),
                onKeyDown: (e) => handleKeyDown(e)
              }
            ),
            errors.district && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errors.district.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PIN Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "party-pin",
                ...register("pin_code"),
                onKeyDown: (e) => handleKeyDown(e)
              }
            ),
            errors.pin_code && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errors.pin_code.message })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Party Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "red" }, children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "party-name",
                autoFocus: true,
                ...register("name"),
                onKeyDown: (e) => handleKeyDown(e)
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errors.name.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "party-city",
                ...register("city"),
                onKeyDown: (e) => handleKeyDown(e)
              }
            ),
            errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errors.city.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "State" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "party-state",
                ...register("state"),
                onKeyDown: (e) => handleKeyDown(e)
              }
            ),
            errors.state && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errors.state.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mobile Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "party-mobile",
                ...register("mobile"),
                onKeyDown: (e) => handleKeyDown(e)
              }
            ),
            errors.mobile && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errors.mobile.message })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Party Code ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "red" }, children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "party-code",
                ...register("code"),
                onKeyDown: (e) => handleKeyDown(e)
              }
            ),
            errors.code && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errors.code.message }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "stock-hint", children: "Auto-generated, can be overridden." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", marginTop: "auto" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { id: "party-submit", type: "submit", disabled: busy, style: { flex: 1 }, children: busy ? "Saving..." : editingId ? "Update Party" : "Save Party" }),
            editingId && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onCancel, disabled: busy, className: "secondary", children: "Cancel" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Parties List" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "GSTIN" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "City" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Mobile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "120px", textAlign: "right" }, children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, children: "No parties found." }) }) : rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.gstin || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.city || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.mobile || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "right" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "action-buttons", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-button", onClick: () => onEdit(row), children: "✏️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-button danger", onClick: () => handleDelete(row.id), children: "🗑️" })
          ] }) })
        ] }, row.id)) })
      ] }) })
    ] })
  ] });
}
function MasterSection({ title, entity, fields, onRefresh, searchable = false, staticRows = [] }) {
  const emptyForm = () => Object.fromEntries(fields.map((f) => [f.key, ""]));
  const [form, setForm] = reactExports.useState(emptyForm);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [fetched, setFetched] = reactExports.useState([]);
  const reloadSearch = reactExports.useCallback(async () => {
    if (!searchable) return;
    try {
      setFetched(await window.stockOps.listMaster(entity, { search: search.trim(), pageSize: 50 }));
    } catch {
      setFetched([]);
    }
  }, [searchable, entity, search]);
  reactExports.useEffect(() => {
    if (!searchable) return void 0;
    const t2 = setTimeout(reloadSearch, 150);
    return () => clearTimeout(t2);
  }, [reloadSearch, searchable]);
  const rows = searchable ? fetched : staticRows;
  const afterChange = async () => {
    if (searchable) await reloadSearch();
    else await onRefresh();
  };
  const reset = () => {
    setForm(emptyForm());
    setEditingId(null);
    setError(null);
  };
  const startEdit = (row) => {
    setEditingId(row.id);
    setForm(Object.fromEntries(fields.map((f) => [f.key, row[f.key] ?? ""])));
    setError(null);
  };
  const submit = async (e) => {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !String(form[f.key] || "").trim()) {
        setError(`${f.label} is required`);
        return;
      }
    }
    setBusy(true);
    setError(null);
    try {
      const payload = {};
      for (const f of fields) payload[f.key] = form[f.key];
      if (editingId) {
        await window.stockOps.updateMaster(entity, editingId, payload);
      } else {
        await window.stockOps.createMaster(entity, payload);
      }
      reset();
      await afterChange();
    } catch (err) {
      const clean = (err?.message || "Save failed").replace(/^Error invoking remote method '[^']*':\s*/, "").replace(/^AppError:\s*/, "");
      setError(clean);
    } finally {
      setBusy(false);
    }
  };
  const remove = async (id) => {
    if (!window.confirm(`Delete this ${title.replace(/s$/, "").toLowerCase()}?`)) return;
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.deleteMaster(entity, id);
      if (editingId === id) reset();
      await afterChange();
    } catch (err) {
      setError(err?.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: editingId ? `Edit ${title}` : title }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "inline-form", onSubmit: submit, onKeyDown: handleFormKeyNav, children: [
      fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        f.label,
        f.required ? " *" : "",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: form[f.key],
            placeholder: f.placeholder || "",
            onChange: (e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
          }
        )
      ] }, f.key)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "end" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, children: editingId ? "Update" : "Add" }),
        editingId ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: reset, children: "Cancel" }) : null
      ] })
    ] }),
    searchable ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Search HSN code or description…",
        style: { marginTop: "14px", width: "100%", padding: "8px 10px", border: "1px solid #d5cfc3", borderRadius: "8px" }
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { marginTop: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: f.label }, f.key)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "140px" }, children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: fields.length + 1, children: searchable && search ? "No matches." : "No entries yet." }) }) : rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row[f.key] || "-" }, f.key)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "action-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: () => startEdit(row), children: "Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "danger-btn", onClick: () => remove(row.id), children: "Delete" })
        ] }) })
      ] }, row.id)) })
    ] }),
    searchable ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stock-hint", style: { marginTop: "8px" }, children: "Showing up to 50 results — type above to narrow the ~21,000 HSN codes." }) : null
  ] });
}
function CodesUnitsPanel({ units, onRefresh }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
        alignItems: "start"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MasterSection,
          {
            title: "HSN Codes",
            entity: "hsn",
            searchable: true,
            onRefresh,
            fields: [
              { key: "code", label: "HSN Code", required: true, placeholder: "e.g. 7208" },
              { key: "description", label: "Description", placeholder: "Optional" }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MasterSection,
          {
            title: "Units (UOM)",
            entity: "unit",
            staticRows: units,
            onRefresh,
            fields: [
              { key: "name", label: "Unit Name", required: true, placeholder: "e.g. Kilogram" },
              { key: "symbol", label: "Symbol", placeholder: "e.g. kg" }
            ]
          }
        )
      ]
    }
  );
}
function emptyLine() {
  return { id: Date.now() + Math.random(), product_id: "", quantity: "", pcs: "" };
}
const inputStyle = { width: "100%", border: "1px solid #d5cfc3", background: "#fff", color: "#4f6166" };
function LineGrid({ title, hint, products, lines, setLines }) {
  const change = (idx, field, val) => setLines((prev) => prev.map((l, i2) => i2 === idx ? { ...l, [field]: val } : l));
  const add = () => setLines((prev) => [...prev, emptyLine()]);
  const remove = (idx) => setLines((prev) => prev.length === 1 ? [emptyLine()] : prev.filter((_, i2) => i2 !== idx));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: "6px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#2f3a3d" }, children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: add, style: { padding: "4px 10px" }, children: "+ Row" })
    ] }),
    hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "stock-hint", children: hint }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "voucher-grid", style: { width: "100%", borderCollapse: "collapse" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { background: "#f8f8f6" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Stock Item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "90px" }, children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "80px" }, children: "Pcs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "30px" } })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: lines.map((l, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: l.product_id, onChange: (e) => change(i2, "product_id", e.target.value), style: inputStyle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "" }),
          products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
            p.code,
            " - ",
            p.name
          ] }, p.id))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: l.quantity, onChange: (e) => change(i2, "quantity", e.target.value), style: inputStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "decimal", value: l.pcs, onChange: (e) => change(i2, "pcs", e.target.value), style: inputStyle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => remove(i2), tabIndex: -1, style: { padding: "2px 6px", background: "transparent", color: "red", border: "none" }, children: "x" }) })
      ] }, l.id)) })
    ] })
  ] });
}
function ProductionFormulaPanel({ formulas, products, onRefresh }) {
  const [name, setName] = reactExports.useState("");
  const [issued, setIssued] = reactExports.useState([emptyLine()]);
  const [produced, setProduced] = reactExports.useState([emptyLine()]);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const productLabel = (pid) => {
    const p = products.find((x) => String(x.id) === String(pid));
    return p ? `${p.code} - ${p.name}` : `#${pid}`;
  };
  const reset = () => {
    setName("");
    setIssued([emptyLine()]);
    setProduced([emptyLine()]);
    setEditingId(null);
    setError(null);
  };
  const startEdit = (f) => {
    setEditingId(f.id);
    setName(f.name);
    const toRows = (kind) => (f.lines || []).filter((l) => l.kind === kind).map((l) => ({
      id: Date.now() + Math.random(),
      product_id: String(l.product_id),
      quantity: String(l.quantity ?? ""),
      pcs: String(l.pcs ?? "")
    }));
    const iss = toRows("issue");
    const pro = toRows("produce");
    setIssued(iss.length ? iss : [emptyLine()]);
    setProduced(pro.length ? pro : [emptyLine()]);
    setError(null);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Formula name is required.");
      return;
    }
    const collect = (rows, kind) => rows.filter((l) => l.product_id).map((l) => ({ product_id: Number(l.product_id), kind, quantity: Number(l.quantity) || 0, pcs: Number(l.pcs) || 0 }));
    const lines = [...collect(issued, "issue"), ...collect(produced, "produce")];
    if (!lines.some((l) => l.kind === "issue")) {
      setError("Add at least one issued (raw material) item.");
      return;
    }
    if (!lines.some((l) => l.kind === "produce")) {
      setError("Add at least one produced (finished) item.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (editingId) await window.stockOps.updateMaster("formula", editingId, { name: name.trim(), lines });
      else await window.stockOps.createMaster("formula", { name: name.trim(), lines });
      reset();
      await onRefresh();
    } catch (err) {
      setError((err?.message || "Save failed").replace(/^Error invoking remote method '[^']*':\s*/, "").replace(/^AppError:\s*/, ""));
    } finally {
      setBusy(false);
    }
  };
  const remove = async (id) => {
    if (!window.confirm("Delete this formula?")) return;
    try {
      await window.stockOps.deleteMaster("formula", id);
      if (editingId === id) reset();
      await onRefresh();
    } catch (err) {
      setError(err?.message || "Delete failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: "16px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: editingId ? "Edit Production Formula" : "New Production Formula" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stock-hint", children: "A recipe with a fixed ratio: define the raw materials issued and the finished goods produced. On a Production voucher you can pick this formula and scale it by a batch multiplier." }),
      error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, onKeyDown: handleFormKeyNav, style: { display: "grid", gap: "14px", marginTop: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { maxWidth: "420px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Formula Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Steel Rod Batch" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LineGrid, { title: "Issued (Raw Materials)", hint: "Consumed — posts as stock OUT.", products, lines: issued, setLines: setIssued }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LineGrid, { title: "Produced (Finished Goods)", hint: "Made — posts as stock IN.", products, lines: produced, setLines: setProduced })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, children: editingId ? "Update Formula" : "Save Formula" }),
          editingId ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: reset, children: "Cancel" }) : null
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "Formulas (",
        formulas.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Issued" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Produced" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: "140px" }, children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: formulas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, children: "No formulas yet." }) }) : formulas.map((f) => {
          const iss = (f.lines || []).filter((l) => l.kind === "issue");
          const pro = (f.lines || []).filter((l) => l.kind === "produce");
          const fmt2 = (arr) => arr.map((l) => `${productLabel(l.product_id)} × ${l.quantity}`).join(", ") || "-";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: f.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { whiteSpace: "normal" }, children: fmt2(iss) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { whiteSpace: "normal" }, children: fmt2(pro) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "action-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: () => startEdit(f), children: "Edit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "danger-btn", onClick: () => remove(f.id), children: "Delete" })
            ] }) })
          ] }, f.id);
        }) })
      ] })
    ] })
  ] });
}
function ItemLedgerPanel({ products }) {
  const [selectedProductId, setSelectedProductId] = reactExports.useState("");
  const [ledger, setLedger] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const selectedProduct = products.find((p) => String(p.id) === String(selectedProductId));
  reactExports.useEffect(() => {
    if (!selectedProductId) {
      setLedger([]);
      return;
    }
    let active = true;
    const fetchLedger = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await window.stockOps.getItemLedger(selectedProductId);
        if (active) {
          setLedger(data || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to fetch ledger");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchLedger();
    return () => {
      active = false;
    };
  }, [selectedProductId]);
  const currentBalance = ledger.length > 0 ? ledger[ledger.length - 1].balance : 0;
  const basisLabel = selectedProduct?.unit_basis === "pcs" ? "Pcs" : "Quantity";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ledger-view", style: { display: "grid", gap: "14px", minWidth: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Item Stock Ledger" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-form", style: { gridTemplateColumns: "1fr", maxWidth: "400px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Select Item",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: selectedProductId,
            onChange: (e) => setSelectedProductId(e.target.value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- Choose an Item --" }),
              products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: product.id, children: [
                product.name,
                " (",
                product.code,
                ")"
              ] }, product.id))
            ]
          }
        )
      ] }) })
    ] }),
    selectedProduct && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: 0 }, children: selectedProduct.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "stock-hint", style: { marginTop: "4px" }, children: [
            "Code: ",
            selectedProduct.code,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "basis-badge", children: [
              "Measured by: ",
              basisLabel
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "stock-hint", style: { margin: 0 }, children: [
            "Current Balance (",
            basisLabel,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: "4px 0 0", fontSize: "32px", color: "var(--title)" }, children: Number(currentBalance).toFixed(3) })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading ledger..." }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Voucher" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { children: [
            "In (",
            basisLabel,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { children: [
            "Out (",
            basisLabel,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { children: [
            "Balance (",
            basisLabel,
            ")"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: ledger.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, children: "No transactions found for this item." }) }) : ledger.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: new Date(row.date).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.voucher }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: row.qty_in > 0 ? "var(--good)" : "inherit" }, children: row.qty_in > 0 ? Number(row.qty_in).toFixed(3) : "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: row.qty_out > 0 ? "var(--bad)" : "inherit" }, children: row.qty_out > 0 ? Number(row.qty_out).toFixed(3) : "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontWeight: 600 }, children: Number(row.balance).toFixed(3) })
        ] }, idx)) })
      ] })
    ] })
  ] });
}
function todayStr() {
  const d = /* @__PURE__ */ new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 6e4);
  return local.toISOString().slice(0, 10);
}
function daysAgoStr(n2) {
  const d = new Date(Date.now() - n2 * 24 * 60 * 60 * 1e3);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 6e4);
  return local.toISOString().slice(0, 10);
}
const fmt = (value) => Number(value || 0).toFixed(3);
const cell = (value) => Number(value) > 0 ? fmt(value) : "-";
function GroupedHead({ firstCol }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("thead", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { rowSpan: 2, children: firstCol }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { rowSpan: 2, className: "num", children: "Opening" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { colSpan: 4, className: "grp grp-in", children: "Stock In" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { colSpan: 4, className: "grp grp-out", children: "Stock Out" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { rowSpan: 2, className: "num", children: "Closing" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num sub-in", children: "Purchase" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num sub-in", children: "Sale Return" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num sub-in", children: "Production" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num sub-in total", children: "Total In" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num sub-out", children: "Sale" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num sub-out", children: "Purch. Return" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num sub-out", children: "Issue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "num sub-out total", children: "Total Out" })
    ] })
  ] });
}
function MovementCells(row) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num sub-in", children: cell(row.purchase) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num sub-in", children: cell(row.sale_return) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num sub-in", children: cell(row.production_in) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num sub-in total in-total", children: cell(row.total_in) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num sub-out", children: cell(row.sale) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num sub-out", children: cell(row.purchase_return) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num sub-out", children: cell(row.issue) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num sub-out total out-total", children: cell(row.total_out) })
  ] });
}
function BreakdownModal({ item, rows, loading, error, onClose }) {
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "voucher-modal-overlay", onMouseDown: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voucher-modal", onMouseDown: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voucher-modal-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        item,
        " — day-wise entries"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "voucher-modal-close", onClick: onClose, "aria-label": "Close", children: "×" })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading…" }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "daily-summary-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupedHead, { firstCol: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 11, style: { textAlign: "center", padding: "16px" }, children: "No movements in this period." }) }) : rows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: row.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: fmt(row.opening) }),
        MovementCells(row),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num closing", style: { color: Number(row.closing) < 0 ? "var(--bad)" : void 0 }, children: fmt(row.closing) })
      ] }, `${row.date}-${idx}`)) })
    ] }) })
  ] }) });
}
function DailyStockSummaryPanel({ products, categories }) {
  const [fromDate, setFromDate] = reactExports.useState(todayStr());
  const [toDate, setToDate] = reactExports.useState(todayStr());
  const [selectedProductId, setSelectedProductId] = reactExports.useState("");
  const [selectedCategoryId, setSelectedCategoryId] = reactExports.useState("");
  const [summary, setSummary] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [openItem, setOpenItem] = reactExports.useState(null);
  const [breakdown, setBreakdown] = reactExports.useState([]);
  const [breakdownLoading, setBreakdownLoading] = reactExports.useState(false);
  const [breakdownError, setBreakdownError] = reactExports.useState(null);
  const [exporting, setExporting] = reactExports.useState(false);
  const [exportMsg, setExportMsg] = reactExports.useState(null);
  const isToday = fromDate === todayStr() && toDate === todayStr();
  const setToday = () => {
    const t2 = todayStr();
    setFromDate(t2);
    setToDate(t2);
  };
  const setLastNDays = (n2) => {
    setFromDate(daysAgoStr(n2));
    setToDate(todayStr());
  };
  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await window.stockOps.getDailyStockSummary({
        fromDate,
        toDate,
        productId: selectedProductId ? Number(selectedProductId) : null,
        categoryId: selectedCategoryId ? Number(selectedCategoryId) : null
      });
      setSummary(data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch daily summary");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchSummary();
  }, [fromDate, toDate, selectedProductId, selectedCategoryId]);
  const downloadExcel = async () => {
    if (!summary.length) {
      setExportMsg("Nothing to export for this period.");
      return;
    }
    setExporting(true);
    setExportMsg(null);
    try {
      const res = await window.stockOps.exportDailySummary({ rows: summary, fromDate, toDate });
      if (res?.canceled) return;
      setExportMsg(`Saved to ${res.path}`);
    } catch (err) {
      setExportMsg(err.message || "Export failed");
    } finally {
      setExporting(false);
    }
  };
  const openBreakdown = async (row) => {
    setOpenItem(row.code ? `${row.code}${row.item ? ` — ${row.item}` : ""}` : row.item);
    setBreakdown([]);
    setBreakdownError(null);
    setBreakdownLoading(true);
    try {
      const data = await window.stockOps.getDailyStockBreakdown({
        fromDate,
        toDate,
        productId: row.product_id,
        categoryId: selectedCategoryId ? Number(selectedCategoryId) : null
      });
      setBreakdown(data || []);
    } catch (err) {
      setBreakdownError(err.message || "Failed to load entries");
    } finally {
      setBreakdownLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "daily-summary-view", style: { display: "grid", gap: "14px", minWidth: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "4px" }, children: "Daily Stock Summary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stock-hint", style: { marginBottom: "16px" }, children: "Opening = closing balance the day before “From”; Closing = balance on the “To” date. Click an item to see its day-wise entries." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-form", style: { gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "From",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: fromDate, onChange: (e) => setFromDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "To",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: toDate, onChange: (e) => setToDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { gridColumn: "span 2" }, children: [
          "Item",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedProductId, onChange: (e) => setSelectedProductId(e.target.value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Items" }),
            products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: product.id, children: product.name }, product.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Category",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedCategoryId, onChange: (e) => setSelectedCategoryId(e.target.value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All" }),
            categories?.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.id, children: cat.name }, cat.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-quick-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: isToday ? "summary-quick-active" : "", onClick: setToday, title: "Show only today", children: "Today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: () => setLastNDays(7), children: "Last 7 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "ghost-light-btn", onClick: () => setLastNDays(30), children: "Last 30 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: downloadExcel,
            disabled: exporting || loading,
            style: { marginLeft: "auto" },
            children: exporting ? "Exporting…" : "Download Excel"
          }
        )
      ] }),
      exportMsg ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stock-hint", style: { marginTop: "8px" }, children: exportMsg }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "panel", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading summary..." }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "daily-summary-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupedHead, { firstCol: "Item Code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: summary.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 11, style: { textAlign: "center", padding: "20px" }, children: "No stock to show for the selected period." }) }) : summary.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "clickable-row",
          onClick: () => openBreakdown(row),
          title: "View day-wise entries",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "item-name", children: row.code || row.item }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num", children: fmt(row.opening) }),
            MovementCells(row),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "num closing", style: { color: Number(row.closing) < 0 ? "var(--bad)" : void 0 }, children: fmt(row.closing) })
          ]
        },
        row.product_id
      )) })
    ] }) }) }),
    openItem != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      BreakdownModal,
      {
        item: openItem,
        rows: breakdown,
        loading: breakdownLoading,
        error: breakdownError,
        onClose: () => setOpenItem(null)
      }
    ) : null
  ] });
}
function ResultCard({ title, result }) {
  if (!result) return null;
  const hasErrors = result.errors && result.errors.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "import-result-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "import-result-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "import-badge good", children: [
          result.created,
          " created"
        ] }),
        result.skipped ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "import-badge warn", children: [
          result.skipped,
          " skipped"
        ] }) : null,
        hasErrors ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "import-badge bad", children: [
          result.errors.length,
          " issue(s)"
        ] }) : null
      ] })
    ] }),
    hasErrors ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "import-error-list", children: result.errors.map((e, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
      e.row ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "import-row-no", children: [
        "Row ",
        e.row,
        ":"
      ] }) : null,
      " ",
      e.message
    ] }, i2)) }) : null
  ] });
}
function DataImportPanel({ onRefresh }) {
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [summary, setSummary] = reactExports.useState(null);
  const [canceled, setCanceled] = reactExports.useState(false);
  const runImport = async () => {
    setBusy(true);
    setError(null);
    setSummary(null);
    setCanceled(false);
    try {
      const res = await window.stockOps.importExcel();
      if (res?.canceled) {
        setCanceled(true);
        return;
      }
      setSummary(res.summary);
      if (onRefresh) await onRefresh();
    } catch (err) {
      setError(err?.message || "Import failed");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: "14px", minWidth: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { marginBottom: "4px" }, children: "Import from Excel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stock-hint", style: { marginBottom: "16px" }, children: "Bulk-load stock items and parties from the import template instead of typing them one by one." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "import-help", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The workbook must have two sheets:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "STOCK ITEM" }),
            " — columns: Stock Name, Group, HSN Code, UOM, Size, Length, GST Rate, Sale Rate, Purchase Rate, Size Difference, Batch No., Opening Stock Qty, Opening Stock Date, Item Code."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "PARTY" }),
            " — columns: GST No., Party Name, Party Code, Address, City, District, State, PIN Code, Mobile Number."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stock-hint", children: "Groups and units are matched by name and created automatically if new. Item/Party codes are auto-generated when blank. Rows with a duplicate code are skipped. Measurement basis defaults to Quantity — adjust in Stock Master afterwards if an item is counted in Pcs." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "16px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: runImport, disabled: busy, children: busy ? "Importing…" : "Choose Excel File & Import" }) }),
      error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", style: { marginTop: "12px" }, children: error }) : null,
      canceled ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stock-hint", style: { marginTop: "12px" }, children: "No file selected." }) : null
    ] }),
    summary ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { marginTop: 0 }, children: "Import Results" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { title: "Stock Items", result: summary.stock }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { title: "Parties", result: summary.party })
    ] }) : null
  ] });
}
function App() {
  const {
    bootstrapStatus,
    user,
    activeView,
    dashboard,
    vouchers,
    products,
    parties,
    categories,
    units,
    formulas,
    busy,
    error,
    setBootstrapStatus,
    setUser,
    setActiveView,
    setDashboard,
    setVouchers,
    setProducts,
    setParties,
    setCategories,
    setUnits,
    setFormulas,
    setBusy,
    setError
  } = useSessionStore();
  reactExports.useEffect(() => {
    window.stockOps?.getBootstrapStatus?.().then(setBootstrapStatus).catch(() => void 0);
  }, []);
  const refreshDashboard = async () => {
    const [summary, recent] = await Promise.all([
      window.stockOps.getDashboardSummary(),
      window.stockOps.getRecentVouchers(10)
    ]);
    setDashboard(summary);
    setVouchers(recent);
  };
  const refreshMasters = async () => {
    const [productRows, partyRows, categoryRows, unitRows, formulaRows] = await Promise.all([
      window.stockOps.listMaster("product", {}),
      window.stockOps.listMaster("party", {}),
      window.stockOps.listMaster("category", {}),
      window.stockOps.listMaster("unit", { pageSize: 1e3 }),
      window.stockOps.listMaster("formula", { pageSize: 1e3 })
    ]);
    const productsWithStock = await Promise.all(
      productRows.map(async (row) => {
        const balance = await window.stockOps.getStockBalance(row.id, 1);
        return { ...row, current_stock: balance };
      })
    );
    setProducts(productsWithStock);
    setParties(partyRows);
    setCategories(categoryRows);
    setUnits(unitRows);
    setFormulas(formulaRows);
  };
  reactExports.useEffect(() => {
    if (!user) {
      return;
    }
    Promise.all([refreshDashboard(), refreshMasters()]).catch((loadError) => {
      setError(loadError.message || "Unable to load dashboard data");
    });
  }, [user]);
  const handleLogin = async (values) => {
    setBusy(true);
    setError(null);
    try {
      const account = await window.stockOps.login(values);
      setUser(account);
    } catch (loginError) {
      setError(loginError.message || "Unable to sign in");
    } finally {
      setBusy(false);
    }
  };
  const handleBootstrap = async (values) => {
    setBusy(true);
    setError(null);
    try {
      const result = await window.stockOps.createUser({
        fullName: values.fullName,
        username: values.username,
        password: values.password
      });
      await window.stockOps.getBootstrapStatus().then(setBootstrapStatus);
      return result?.recoveryCode ?? null;
    } catch (bootstrapError) {
      setError(bootstrapError.message || "Unable to create admin");
      return null;
    } finally {
      setBusy(false);
    }
  };
  const handleResetPassword = async (values) => {
    setBusy(true);
    setError(null);
    try {
      const result = await window.stockOps.resetPassword(values);
      return result?.recoveryCode ?? null;
    } catch (resetError) {
      setError(resetError.message || "Unable to reset password");
      return null;
    } finally {
      setBusy(false);
    }
  };
  const createMaster = async (entity, payload) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.createMaster(entity, payload);
      await refreshMasters();
      if (entity === "product") ;
    } catch (createError) {
      setError(createError.message || "Unable to create record");
    } finally {
      setBusy(false);
    }
  };
  const updateMasterRecord = async (entity, id, payload) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.updateMaster(entity, id, payload);
      await refreshMasters();
    } catch (err) {
      setError(err.message || "Unable to update record");
    } finally {
      setBusy(false);
    }
  };
  const createProduct = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      const created = await window.stockOps.createMaster("product", payload);
      if (Number(payload.opening_qty || 0) > 0) {
        await window.stockOps.recordStockTransaction({
          transaction_no: `OB-${Date.now()}`,
          source_type: "stock_master",
          source_id: created.id,
          transaction_type: "opening_balance",
          product_id: created.id,
          warehouse_id: 1,
          party_id: null,
          quantity: Number(payload.opening_qty),
          rate: Number(payload.opening_rate || 0),
          amount: Number(payload.opening_qty) * Number(payload.opening_rate || 0),
          reference_no: payload.opening_date || null,
          notes: "Opening stock from stock master"
        });
      }
      await Promise.all([refreshMasters(), refreshDashboard()]);
    } catch (createError) {
      setError(createError.message || "Unable to create product");
      throw createError;
    } finally {
      setBusy(false);
    }
  };
  const updateProduct = async (id, payload) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.updateMaster("product", id, payload);
      await Promise.all([refreshMasters(), refreshDashboard()]);
    } catch (updateError) {
      setError(updateError.message || "Unable to update product");
      throw updateError;
    } finally {
      setBusy(false);
    }
  };
  const deleteMaster = async (entity, id) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.deleteMaster(entity, id);
      await refreshMasters();
      if (entity === "product") {
        await refreshDashboard();
      }
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete record");
    } finally {
      setBusy(false);
    }
  };
  const updateVoucherOfType = async (type, id, payload, label) => {
    setBusy(true);
    setError(null);
    try {
      const saved = await window.stockOps.updateVoucher(type, id, payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
      return saved;
    } catch (voucherError) {
      setError(voucherError.message || `Unable to update ${label}`);
      return void 0;
    } finally {
      setBusy(false);
    }
  };
  const postPurchaseVoucher = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      const saved = await window.stockOps.savePurchaseVoucher(payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
      return saved;
    } catch (voucherError) {
      setError(voucherError.message || "Unable to save purchase voucher");
      return void 0;
    } finally {
      setBusy(false);
    }
  };
  const postSaleReturnVoucher = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      const saved = await window.stockOps.saveSaleReturnVoucher(payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
      return saved;
    } catch (voucherError) {
      setError(voucherError.message || "Unable to save sale return voucher");
      return void 0;
    } finally {
      setBusy(false);
    }
  };
  const postProductionVoucher = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.saveProductionVoucher(payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
    } catch (voucherError) {
      setError(voucherError.message || "Unable to save production voucher");
    } finally {
      setBusy(false);
    }
  };
  const postSaleVoucher = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      const saved = await window.stockOps.saveSaleVoucher(payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
      return saved;
    } catch (voucherError) {
      setError(voucherError.message || "Unable to save sale voucher");
      return void 0;
    } finally {
      setBusy(false);
    }
  };
  const postPurchaseReturnVoucher = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      const saved = await window.stockOps.savePurchaseReturnVoucher(payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
      return saved;
    } catch (voucherError) {
      setError(voucherError.message || "Unable to save purchase return voucher");
      return void 0;
    } finally {
      setBusy(false);
    }
  };
  const renderView = () => {
    if (activeView === "dashboard") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardView, { summary: dashboard, vouchers });
    }
    if (activeView === "stock-master") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        StockMasterPanel,
        {
          products,
          categories,
          units,
          busy,
          onCreate: createProduct,
          onUpdate: updateProduct,
          onDelete: (id) => deleteMaster("product", id)
        }
      );
    }
    if (activeView === "party-master") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PartyMasterPanel,
        {
          rows: parties,
          busy,
          onCreate: (values) => createMaster("party", values),
          onUpdate: (id, values) => updateMasterRecord("party", id, values),
          onDelete: (id) => deleteMaster("party", id)
        }
      );
    }
    if (activeView === "codes-units") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CodesUnitsPanel, { units, onRefresh: refreshMasters });
    }
    if (activeView === "data-import") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DataImportPanel, { onRefresh: refreshMasters });
    }
    if (activeView === "production-formula") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductionFormulaPanel, { formulas, products, onRefresh: refreshMasters });
    }
    if (activeView === "purchase-entry") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PurchaseVoucherPanel,
        {
          products,
          parties,
          busy,
          onSave: postPurchaseVoucher,
          onUpdate: (id, payload) => updateVoucherOfType("purchase", id, payload, "purchase voucher")
        }
      );
    }
    if (activeView === "sale-entry") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        SaleVoucherPanel,
        {
          products,
          parties,
          busy,
          onSave: postSaleVoucher,
          onUpdate: (id, payload) => updateVoucherOfType("sale", id, payload, "sale voucher")
        }
      );
    }
    if (activeView === "sale-return-entry") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        SaleReturnVoucherPanel,
        {
          products,
          parties,
          busy,
          onSave: postSaleReturnVoucher,
          onUpdate: (id, payload) => updateVoucherOfType("sale_return", id, payload, "sale return voucher")
        }
      );
    }
    if (activeView === "purchase-return-entry") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PurchaseReturnVoucherPanel,
        {
          products,
          parties,
          busy,
          onSave: postPurchaseReturnVoucher,
          onUpdate: (id, payload) => updateVoucherOfType("purchase_return", id, payload, "purchase return voucher")
        }
      );
    }
    if (activeView === "production-entry") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductionVoucherPanel,
        {
          products,
          formulas,
          busy,
          onSave: postProductionVoucher
        }
      );
    }
    if (activeView === "item-stock-ledger") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ItemLedgerPanel, { products });
    }
    if (activeView === "daily-stock-summary") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DailyStockSummaryPanel, { products, categories });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: VIEW_LABELS[activeView] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This section is scaffolded and ready for the next implementation increment." })
    ] });
  };
  const handleLogout = () => {
    setUser(null);
    setActiveView("dashboard");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: user ? "workspace-shell" : "auth-shell", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppShell,
    {
      navigation: NAVIGATION,
      activeKey: activeView,
      onNavigate: setActiveView,
      headerTitle: VIEW_LABELS[activeView],
      onLogout: handleLogout,
      user,
      children: renderView()
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AuthForm,
      {
        needsBootstrap: bootstrapStatus.needsBootstrap,
        busy,
        onLogin: handleLogin,
        onBootstrap: handleBootstrap,
        onReset: handleResetPassword
      }
    ),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }) : null
  ] }) });
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
