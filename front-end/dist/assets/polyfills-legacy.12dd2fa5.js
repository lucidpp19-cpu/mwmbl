(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math === Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var globalThis_1 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$i = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$h = fails$i;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$h(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});

	var fails$g = fails$i;

	var functionBindNative = !fails$g(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = function () { /* empty */ }.bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var call$i = Function.prototype.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var functionCall = NATIVE_BIND$3 ? call$i.bind(call$i) : function () {
	  return call$i.apply(call$i, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$3(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$3 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var call$h = FunctionPrototype$2.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$h, call$h);

	var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$h.apply(fn, arguments);
	  };
	};

	var uncurryThis$m = functionUncurryThis;

	var toString$6 = uncurryThis$m({}.toString);
	var stringSlice$1 = uncurryThis$m(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$1(toString$6(it), 8, -1);
	};

	var uncurryThis$l = functionUncurryThis;
	var fails$f = fails$i;
	var classof$5 = classofRaw$2;

	var $Object$4 = Object;
	var split = uncurryThis$l(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$f(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$4('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$5(it) === 'String' ? split(it, '') : $Object$4(it);
	} : $Object$4;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$3 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$2 = isNullOrUndefined$3;

	var $TypeError$f = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$2 = function (it) {
	  if (isNullOrUndefined$2(it)) throw new $TypeError$f("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject = indexedObject;
	var requireObjectCoercible$1 = requireObjectCoercible$2;

	var toIndexedObject$4 = function (it) {
	  return IndexedObject(requireObjectCoercible$1(it));
	};

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var documentAll = typeof document == 'object' && document.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var isCallable$h = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$g = isCallable$h;

	var isObject$9 = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$g(it);
	};

	var globalThis$e = globalThis_1;
	var isCallable$f = isCallable$h;

	var aFunction = function (argument) {
	  return isCallable$f(argument) ? argument : undefined;
	};

	var getBuiltIn$6 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(globalThis$e[namespace]) : globalThis$e[namespace] && globalThis$e[namespace][method];
	};

	var uncurryThis$k = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$k({}.isPrototypeOf);

	var globalThis$d = globalThis_1;

	var navigator = globalThis$d.navigator;
	var userAgent$1 = navigator && navigator.userAgent;

	var environmentUserAgent = userAgent$1 ? String(userAgent$1) : '';

	var globalThis$c = globalThis_1;
	var userAgent = environmentUserAgent;

	var process = globalThis$c.process;
	var Deno = globalThis$c.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var environmentV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION = environmentV8Version;
	var fails$e = fails$i;
	var globalThis$b = globalThis_1;

	var $String$5 = globalThis$b.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$e(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$3 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$3 &&
	  !Symbol.sham &&
	  typeof Symbol.iterator == 'symbol';

	var getBuiltIn$5 = getBuiltIn$6;
	var isCallable$e = isCallable$h;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$3 = Object;

	var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$5('Symbol');
	  return isCallable$e($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$3(it));
	};

	var $String$4 = String;

	var tryToString$3 = function (argument) {
	  try {
	    return $String$4(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$d = isCallable$h;
	var tryToString$2 = tryToString$3;

	var $TypeError$e = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$c = function (argument) {
	  if (isCallable$d(argument)) return argument;
	  throw new $TypeError$e(tryToString$2(argument) + ' is not a function');
	};

	var aCallable$b = aCallable$c;
	var isNullOrUndefined$1 = isNullOrUndefined$3;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$4 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined$1(func) ? undefined : aCallable$b(func);
	};

	var call$g = functionCall;
	var isCallable$c = isCallable$h;
	var isObject$8 = isObject$9;

	var $TypeError$d = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$c(fn = input.toString) && !isObject$8(val = call$g(fn, input))) return val;
	  if (isCallable$c(fn = input.valueOf) && !isObject$8(val = call$g(fn, input))) return val;
	  if (pref !== 'string' && isCallable$c(fn = input.toString) && !isObject$8(val = call$g(fn, input))) return val;
	  throw new $TypeError$d("Can't convert object to primitive value");
	};

	var sharedStore = {exports: {}};

	var isPure = false;

	var globalThis$a = globalThis_1;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$2 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$2(globalThis$a, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    globalThis$a[key] = value;
	  } return value;
	};

	var globalThis$9 = globalThis_1;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = sharedStore.exports = globalThis$9[SHARED] || defineGlobalProperty$2(SHARED, {});

	(store$3.versions || (store$3.versions = [])).push({
	  version: '3.50.0',
	  mode: 'global',
	  copyright: '© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.',
	  license: 'https://github.com/zloirock/core-js/blob/v3.50.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var store$2 = sharedStore.exports;
	// eslint-disable-next-line es/no-object-create -- safe
	var create$2 = Object.create || Object;

	var shared$3 = function (key, value) {
	  return store$2[key] || (store$2[key] = value || create$2(null));
	};

	var requireObjectCoercible = requireObjectCoercible$2;

	var $Object$2 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$3 = function (argument) {
	  return $Object$2(requireObjectCoercible(argument));
	};

	var uncurryThis$j = functionUncurryThis;
	var toObject$2 = toObject$3;

	var hasOwnProperty = uncurryThis$j({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$2(it), key);
	};

	var uncurryThis$i = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$5 = uncurryThis$i(1.1.toString);

	var uid$3 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$5(++id + postfix, 36);
	};

	var globalThis$8 = globalThis_1;
	var shared$2 = shared$3;
	var hasOwn$b = hasOwnProperty_1;
	var uid$2 = uid$3;
	var NATIVE_SYMBOL$2 = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var Symbol$1 = globalThis$8.Symbol;
	var WellKnownSymbolsStore = shared$2('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

	var wellKnownSymbol$8 = function (name) {
	  if (!hasOwn$b(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL$2 && hasOwn$b(Symbol$1, name)
	      ? Symbol$1[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var call$f = functionCall;
	var isObject$7 = isObject$9;
	var isSymbol$2 = isSymbol$3;
	var getMethod$3 = getMethod$4;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$7 = wellKnownSymbol$8;

	var $TypeError$c = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$7('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$7(input) || isSymbol$2(input)) return input;
	  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$f(exoticToPrim, input, pref);
	    if (!isObject$7(result) || isSymbol$2(result)) return result;
	    throw new $TypeError$c("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol$1 = isSymbol$3;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$2 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol$1(key) ? key : key + '';
	};

	var globalThis$7 = globalThis_1;
	var isObject$6 = isObject$9;

	var document$1 = globalThis$7.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$6(document$1) && isObject$6(document$1.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$c = descriptors;
	var fails$d = fails$i;
	var createElement = documentCreateElement$1;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$c && !fails$d(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});

	var DESCRIPTORS$b = descriptors;
	var call$e = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;
	var toIndexedObject$3 = toIndexedObject$4;
	var toPropertyKey$1 = toPropertyKey$2;
	var hasOwn$a = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$b ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$3(O);
	  P = toPropertyKey$1(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$a(O, P)) return createPropertyDescriptor$2(!call$e(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$a = descriptors;
	var fails$c = fails$i;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$a && fails$c(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});

	var isObject$5 = isObject$9;

	var $String$3 = String;
	var $TypeError$b = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$g = function (argument) {
	  if (isObject$5(argument)) return argument;
	  throw new $TypeError$b($String$3(argument) + ' is not an object');
	};

	var DESCRIPTORS$9 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$f = anObject$g;
	var toPropertyKey = toPropertyKey$2;

	var $TypeError$a = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$9 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$f(O);
	  P = toPropertyKey(P);
	  anObject$f(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$f(O);
	  P = toPropertyKey(P);
	  anObject$f(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$a('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$8 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;

	var createNonEnumerableProperty$3 = DESCRIPTORS$8 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$3 = {exports: {}};

	var DESCRIPTORS$7 = descriptors;
	var hasOwn$9 = hasOwnProperty_1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$7 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$9(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && function something() { /* empty */ }.name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$7 || (DESCRIPTORS$7 && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$h = functionUncurryThis;
	var isCallable$b = isCallable$h;
	var store$1 = sharedStore.exports;

	var functionToString = uncurryThis$h(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$b(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$1 = store$1.inspectSource;

	var globalThis$6 = globalThis_1;
	var isCallable$a = isCallable$h;

	var WeakMap$2 = globalThis$6.WeakMap;

	var weakMapBasicDetection = isCallable$a(WeakMap$2) && /native code/.test(String(WeakMap$2));

	var shared$1 = shared$3;
	var uid$1 = uid$3;

	var keys$1 = shared$1('keys');

	var sharedKey$3 = function (key) {
	  return keys$1[key] || (keys$1[key] = uid$1(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var globalThis$5 = globalThis_1;
	var isObject$4 = isObject$9;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
	var hasOwn$8 = hasOwnProperty_1;
	var shared = sharedStore.exports;
	var sharedKey$2 = sharedKey$3;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$1 = globalThis$5.TypeError;
	var WeakMap$1 = globalThis$5.WeakMap;
	var set$5, get$4, has$b;

	var enforce = function (it) {
	  return has$b(it) ? get$4(it) : set$5(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$4(it) || (state = get$4(it)).type !== TYPE) {
	      throw new TypeError$1('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared.state) {
	  var store = shared.state || (shared.state = new WeakMap$1());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set$5 = function (it, metadata) {
	    if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get$4 = function (it) {
	    return store.get(it) || {};
	  };
	  has$b = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$3[STATE] = true;
	  set$5 = function (it, metadata) {
	    if (hasOwn$8(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$2(it, STATE, metadata);
	    return metadata;
	  };
	  get$4 = function (it) {
	    return hasOwn$8(it, STATE) ? it[STATE] : {};
	  };
	  has$b = function (it) {
	    return hasOwn$8(it, STATE);
	  };
	}

	var internalState = {
	  set: set$5,
	  get: get$4,
	  has: has$b,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var uncurryThis$g = functionUncurryThis;
	var fails$b = fails$i;
	var isCallable$9 = isCallable$h;
	var hasOwn$7 = hasOwnProperty_1;
	var DESCRIPTORS$6 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
	var inspectSource = inspectSource$1;
	var InternalStateModule$1 = internalState;

	var enforceInternalState = InternalStateModule$1.enforce;
	var getInternalState$1 = InternalStateModule$1.get;
	var $String$2 = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$1 = Object.defineProperty;
	var stringSlice = uncurryThis$g(''.slice);
	var replace$1 = uncurryThis$g(''.replace);
	var join = uncurryThis$g([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$6 && !fails$b(function () {
	  return defineProperty$1(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
	  if (stringSlice($String$2(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace$1($String$2(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$7(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS$6) defineProperty$1(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$7(options, 'arity') && value.length !== options.arity) {
	    defineProperty$1(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$7(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$6) defineProperty$1(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwn$7(state, 'source')) {
	    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$2(function toString() {
	  return isCallable$9(this) && getInternalState$1(this).source || inspectSource(this);
	}, 'toString');

	var isCallable$8 = isCallable$h;
	var definePropertyModule$3 = objectDefineProperty;
	var makeBuiltIn$1 = makeBuiltIn$3.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$5 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$8(value)) makeBuiltIn$1(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$3.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$3 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

	var max$1 = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toIntegerOrInfinity$2(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  var len = toIntegerOrInfinity$1(argument);
	  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$4 = function (obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$2 = toIndexedObject$4;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike$3 = lengthOfArrayLike$4;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$2($this);
	    var length = lengthOfArrayLike$3(O);
	    if (length === 0) return !IS_INCLUDES && -1;
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el !== el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value !== value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var uncurryThis$f = functionUncurryThis;
	var hasOwn$6 = hasOwnProperty_1;
	var toIndexedObject$1 = toIndexedObject$4;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push$3 = uncurryThis$f([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$6(hiddenKeys$2, key) && hasOwn$6(O, key) && push$3(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$6(O, key = names[i++])) {
	    ~indexOf(result, key) || push$3(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$4 = getBuiltIn$6;
	var uncurryThis$e = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$e = anObject$g;

	var concat = uncurryThis$e([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$e(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$5 = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$2 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$2.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$5(target, key) && !(exceptions && hasOwn$5(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$a = fails$i;
	var isCallable$7 = isCallable$h;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable$7(detection) ? fails$a(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var globalThis$4 = globalThis_1;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
	var defineBuiltIn$4 = defineBuiltIn$5;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = globalThis$4;
	  } else if (STATIC) {
	    target = globalThis$4[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = globalThis$4[TARGET] && globalThis$4[TARGET].prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$2(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$1(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$4(target, key, sourceProperty, options);
	  }
	};

	var classof$4 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$3 = Array.isArray || function isArray(argument) {
	  return classof$4(argument) === 'Array';
	};

	var DESCRIPTORS$5 = descriptors;
	var isArray$2 = isArray$3;

	var $TypeError$9 = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$5 && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray$2(O) && !getOwnPropertyDescriptor$1(O, 'length').writable) {
	    throw new $TypeError$9('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var $TypeError$8 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$1 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw new $TypeError$8('Maximum allowed index exceeded');
	  return it;
	};

	var $$k = _export;
	var toObject$1 = toObject$3;
	var lengthOfArrayLike$2 = lengthOfArrayLike$4;
	var setArrayLength = arraySetLength;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var fails$9 = fails$i;

	var INCORRECT_TO_LENGTH = fails$9(function () {
	  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
	});

	// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
	// https://bugs.chromium.org/p/v8/issues/detail?id=12681
	var properErrorOnNonWritableLength = function () {
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).push();
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	};

	var FORCED$7 = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

	// `Array.prototype.push` method
	// https://tc39.es/ecma262/#sec-array.prototype.push
	$$k({ target: 'Array', proto: true, arity: 1, forced: FORCED$7 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  push: function push(item) {
	    var O = toObject$1(this);
	    var len = lengthOfArrayLike$2(O);
	    var argCount = arguments.length;
	    doesNotExceedSafeInteger(len + argCount);
	    for (var i = 0; i < argCount; i++) {
	      O[len] = arguments[i];
	      len++;
	    }
	    setArrayLength(O, len);
	    return len;
	  }
	});

	var isPrototypeOf$1 = objectIsPrototypeOf;

	var $TypeError$7 = TypeError;

	var anInstance$1 = function (it, Prototype) {
	  if (isPrototypeOf$1(Prototype, it)) return it;
	  throw new $TypeError$7('Incorrect invocation');
	};

	var fails$8 = fails$i;

	var correctPrototypeGetter = !fails$8(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var hasOwn$4 = hasOwnProperty_1;
	var isCallable$6 = isCallable$h;
	var toObject = toObject$3;
	var sharedKey$1 = sharedKey$3;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO$1 = sharedKey$1('IE_PROTO');
	var $Object$1 = Object;
	var ObjectPrototype = $Object$1.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function (O) {
	  var object = toObject(O);
	  if (hasOwn$4(object, IE_PROTO$1)) return object[IE_PROTO$1];
	  var constructor = object.constructor;
	  if (isCallable$6(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof $Object$1 ? ObjectPrototype : null;
	};

	var makeBuiltIn = makeBuiltIn$3.exports;
	var defineProperty = objectDefineProperty;

	var defineBuiltInAccessor$2 = function (target, name, descriptor) {
	  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
	  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
	  return defineProperty.f(target, name, descriptor);
	};

	var DESCRIPTORS$4 = descriptors;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$3;

	var createProperty$2 = function (object, key, value) {
	  if (DESCRIPTORS$4) definePropertyModule$1.f(object, key, createPropertyDescriptor(0, value));
	  else object[key] = value;
	};

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$1 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$3 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule = objectDefineProperty;
	var anObject$d = anObject$g;
	var toIndexedObject = toIndexedObject$4;
	var objectKeys = objectKeys$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$3 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$d(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$3 = getBuiltIn$6;

	var html$1 = getBuiltIn$3('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */
	var anObject$c = anObject$g;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey = sharedKey$3;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
	  activeXDocument = null;
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$c(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var fails$7 = fails$i;
	var isCallable$5 = isCallable$h;
	var isObject$3 = isObject$9;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var defineBuiltIn$3 = defineBuiltIn$5;
	var wellKnownSymbol$6 = wellKnownSymbol$8;

	var ITERATOR$3 = wellKnownSymbol$6('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = !isObject$3(IteratorPrototype$2) || fails$7(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$3].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$5(IteratorPrototype$2[ITERATOR$3])) {
	  defineBuiltIn$3(IteratorPrototype$2, ITERATOR$3, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var $$j = _export;
	var globalThis$3 = globalThis_1;
	var anInstance = anInstance$1;
	var anObject$b = anObject$g;
	var isCallable$4 = isCallable$h;
	var getPrototypeOf = objectGetPrototypeOf;
	var defineBuiltInAccessor$1 = defineBuiltInAccessor$2;
	var createProperty$1 = createProperty$2;
	var fails$6 = fails$i;
	var hasOwn$3 = hasOwnProperty_1;
	var wellKnownSymbol$5 = wellKnownSymbol$8;
	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var DESCRIPTORS$2 = descriptors;

	var CONSTRUCTOR = 'constructor';
	var ITERATOR$2 = 'Iterator';
	var TO_STRING_TAG$3 = wellKnownSymbol$5('toStringTag');

	var $TypeError$6 = TypeError;
	var NativeIterator = globalThis$3[ITERATOR$2];

	// FF56- have non-standard global helper `Iterator`
	var FORCED$6 = !isCallable$4(NativeIterator)
	  || NativeIterator.prototype !== IteratorPrototype$1
	  // FF44- non-standard `Iterator` passes previous tests
	  || !fails$6(function () { NativeIterator({}); });

	var IteratorConstructor = function Iterator() {
	  anInstance(this, IteratorPrototype$1);
	  if (getPrototypeOf(this) === IteratorPrototype$1) throw new $TypeError$6('Abstract class Iterator not directly constructable');
	};

	var defineIteratorPrototypeAccessor = function (key, value) {
	  if (DESCRIPTORS$2) {
	    defineBuiltInAccessor$1(IteratorPrototype$1, key, {
	      configurable: true,
	      get: function () {
	        return value;
	      },
	      set: function (replacement) {
	        anObject$b(this);
	        if (this === IteratorPrototype$1) throw new $TypeError$6("You can't redefine this property");
	        if (hasOwn$3(this, key)) this[key] = replacement;
	        else createProperty$1(this, key, replacement);
	      }
	    });
	  } else IteratorPrototype$1[key] = value;
	};

	if (!hasOwn$3(IteratorPrototype$1, TO_STRING_TAG$3)) defineIteratorPrototypeAccessor(TO_STRING_TAG$3, ITERATOR$2);

	if (FORCED$6 || !hasOwn$3(IteratorPrototype$1, CONSTRUCTOR) || IteratorPrototype$1[CONSTRUCTOR] === Object) {
	  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
	}

	IteratorConstructor.prototype = IteratorPrototype$1;

	// `Iterator` constructor
	// https://tc39.es/ecma262/#sec-iterator
	$$j({ global: true, constructor: true, forced: FORCED$6 }, {
	  Iterator: IteratorConstructor
	});

	// `GetIteratorDirect(obj)` abstract operation
	// https://tc39.es/ecma262/#sec-getiteratordirect
	var getIteratorDirect$7 = function (obj) {
	  return {
	    iterator: obj,
	    next: obj.next,
	    done: false
	  };
	};

	var defineBuiltIn$2 = defineBuiltIn$5;

	var defineBuiltIns$1 = function (target, src, options) {
	  for (var key in src) defineBuiltIn$2(target, key, src[key], options);
	  return target;
	};

	// `CreateIterResultObject` abstract operation
	// https://tc39.es/ecma262/#sec-createiterresultobject
	var createIterResultObject$1 = function (value, done) {
	  return { value: value, done: done };
	};

	var call$d = functionCall;
	var anObject$a = anObject$g;
	var getMethod$2 = getMethod$4;

	var iteratorClose$c = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$a(iterator);
	  try {
	    innerResult = getMethod$2(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$d(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$a(innerResult);
	  return value;
	};

	var iteratorClose$b = iteratorClose$c;

	var iteratorCloseAll$1 = function (iters, kind, value) {
	  for (var i = iters.length - 1; i >= 0; i--) {
	    if (iters[i] === undefined) continue;
	    try {
	      value = iteratorClose$b(iters[i].iterator, kind, value);
	    } catch (error) {
	      kind = 'throw';
	      value = error;
	    }
	  }
	  if (kind === 'throw') throw value;
	  return value;
	};

	// release references held by exhausted / closed iterator helpers to allow GC of the source chain
	var iteratorCleanupState = function (state) {
	  state.iterator = state.next = state.nextHandler = state.mapper = state.predicate = state.inner =
	    state.iterables = state.iters = state.openIters = state.padding = state.finishResults = state.buffer = null;
	};

	var call$c = functionCall;
	var create$1 = objectCreate;
	var createNonEnumerableProperty = createNonEnumerableProperty$3;
	var defineBuiltIns = defineBuiltIns$1;
	var wellKnownSymbol$4 = wellKnownSymbol$8;
	var InternalStateModule = internalState;
	var getMethod$1 = getMethod$4;
	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var createIterResultObject = createIterResultObject$1;
	var iteratorClose$a = iteratorClose$c;
	var iteratorCloseAll = iteratorCloseAll$1;
	var cleanupState = iteratorCleanupState;

	var TO_STRING_TAG$2 = wellKnownSymbol$4('toStringTag');
	var ITERATOR_HELPER = 'IteratorHelper';
	var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
	var NORMAL = 'normal';
	var THROW = 'throw';
	var setInternalState = InternalStateModule.set;

	var createIteratorProxyPrototype = function (IS_ITERATOR) {
	  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

	  return defineBuiltIns(create$1(IteratorPrototype), {
	    next: function next() {
	      var state = getInternalState(this);
	      // for simplification:
	      //   for `%WrapForValidIteratorPrototype%.next` or with `state.returnHandlerResult` our `nextHandler` returns `IterResultObject`
	      //   for `%IteratorHelperPrototype%.next` - just a value
	      if (IS_ITERATOR) return state.nextHandler();
	      if (state.done) return createIterResultObject(undefined, true);
	      try {
	        var result = state.nextHandler();
	        if (state.done) cleanupState(state);
	        return state.returnHandlerResult ? result : createIterResultObject(result, state.done);
	      } catch (error) {
	        state.done = true;
	        cleanupState(state);
	        throw error;
	      }
	    },
	    'return': function () {
	      var state = getInternalState(this);
	      var iterator = state.iterator;
	      var inner = state.inner;
	      var openIters = state.openIters;
	      var done = state.done;
	      state.done = true;
	      if (IS_ITERATOR) {
	        var returnMethod = getMethod$1(iterator, 'return');
	        return returnMethod ? call$c(returnMethod, iterator) : createIterResultObject(undefined, true);
	      }
	      cleanupState(state);
	      if (done) return createIterResultObject(undefined, true);
	      if (inner) try {
	        iteratorClose$a(inner.iterator, NORMAL);
	      } catch (error) {
	        return iteratorClose$a(iterator, THROW, error);
	      }
	      if (openIters) try {
	        iteratorCloseAll(openIters, NORMAL);
	      } catch (error) {
	        if (iterator) return iteratorClose$a(iterator, THROW, error);
	        throw error;
	      }
	      if (iterator) iteratorClose$a(iterator, NORMAL);
	      return createIterResultObject(undefined, true);
	    }
	  });
	};

	var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
	var IteratorHelperPrototype = createIteratorProxyPrototype(false);

	createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG$2, 'Iterator Helper');

	var iteratorCreateProxy = function (nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
	  var IteratorProxy = function Iterator(record, state) {
	    if (state) {
	      state.iterator = record.iterator;
	      state.next = record.next;
	    } else state = record;
	    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
	    state.returnHandlerResult = !!RETURN_HANDLER_RESULT;
	    state.nextHandler = nextHandler;
	    state.counter = 0;
	    state.done = false;
	    setInternalState(this, state);
	  };

	  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

	  return IteratorProxy;
	};

	var anObject$9 = anObject$g;
	var iteratorClose$9 = iteratorClose$c;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing$2 = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject$9(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose$9(iterator, 'throw', error);
	  }
	};

	// Should throw an error on invalid iterator
	// https://issues.chromium.org/issues/336839115
	var iteratorHelperThrowsOnInvalidIterator$2 = function (methodName, argument) {
	  // eslint-disable-next-line es/no-iterator -- required for testing
	  var method = typeof Iterator == 'function' && Iterator.prototype[methodName];
	  if (method) try {
	    method.call({ next: null }, argument).next();
	  } catch (error) {
	    return true;
	  }
	};

	var globalThis$2 = globalThis_1;

	// https://github.com/tc39/ecma262/pull/3467
	var iteratorHelperWithoutClosingOnEarlyError$6 = function (METHOD_NAME, ExpectedError) {
	  var Iterator = globalThis$2.Iterator;
	  var IteratorPrototype = Iterator && Iterator.prototype;
	  var method = IteratorPrototype && IteratorPrototype[METHOD_NAME];

	  var CLOSED = false;

	  if (method) try {
	    method.call({
	      next: function () { return { done: true }; },
	      'return': function () { CLOSED = true; }
	    }, -1);
	  } catch (error) {
	    // https://bugs.webkit.org/show_bug.cgi?id=291195
	    if (!(error instanceof ExpectedError)) CLOSED = false;
	  }

	  if (!CLOSED) return method;
	};

	var $$i = _export;
	var call$b = functionCall;
	var aCallable$a = aCallable$c;
	var anObject$8 = anObject$g;
	var getIteratorDirect$6 = getIteratorDirect$7;
	var createIteratorProxy$1 = iteratorCreateProxy;
	var callWithSafeIterationClosing$1 = callWithSafeIterationClosing$2;
	var iteratorClose$8 = iteratorClose$c;
	var iteratorHelperThrowsOnInvalidIterator$1 = iteratorHelperThrowsOnInvalidIterator$2;
	var iteratorHelperWithoutClosingOnEarlyError$5 = iteratorHelperWithoutClosingOnEarlyError$6;

	var FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR = !iteratorHelperThrowsOnInvalidIterator$1('filter', function () { /* empty */ });
	var filterWithoutClosingOnEarlyError = !FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR
	  && iteratorHelperWithoutClosingOnEarlyError$5('filter', TypeError);

	var FORCED$5 = FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR || filterWithoutClosingOnEarlyError;

	var IteratorProxy$1 = createIteratorProxy$1(function () {
	  var iterator = this.iterator;
	  var predicate = this.predicate;
	  var next = this.next;
	  var result, done, value;
	  while (true) {
	    result = anObject$8(call$b(next, iterator));
	    done = this.done = !!result.done;
	    if (done) return;
	    value = result.value;
	    if (callWithSafeIterationClosing$1(iterator, predicate, [value, this.counter++], true)) return value;
	  }
	});

	// `Iterator.prototype.filter` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.filter
	$$i({ target: 'Iterator', proto: true, real: true, forced: FORCED$5 }, {
	  filter: function filter(predicate) {
	    anObject$8(this);
	    try {
	      aCallable$a(predicate);
	    } catch (error) {
	      iteratorClose$8(this, 'throw', error);
	    }

	    if (filterWithoutClosingOnEarlyError) return call$b(filterWithoutClosingOnEarlyError, this, predicate);

	    return new IteratorProxy$1(getIteratorDirect$6(this), {
	      predicate: predicate
	    });
	  }
	});

	var classofRaw$1 = classofRaw$2;
	var uncurryThis$d = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThis$d(fn);
	};

	var uncurryThis$c = functionUncurryThisClause;
	var aCallable$9 = aCallable$c;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$1 = uncurryThis$c(uncurryThis$c.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$9(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$1(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var iterators = Object.create ? Object.create(null) : {};

	var wellKnownSymbol$3 = wellKnownSymbol$8;
	var Iterators = iterators;

	var ITERATOR$1 = wellKnownSymbol$3('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$1 = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayPrototype$1[ITERATOR$1] === it);
	};

	var classof$3 = classofRaw$2;
	var isNullOrUndefined = isNullOrUndefined$3;
	var getMethod = getMethod$4;
	var wellKnownSymbol$2 = wellKnownSymbol$8;

	var ITERATOR = wellKnownSymbol$2('iterator');
	var ArrayPrototype = Array.prototype;

	var getIteratorMethodInternal = function (it) {
	  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
	    || getMethod(it, '@@iterator')
	    || (classof$3(it) === 'Arguments' ? ArrayPrototype[ITERATOR] : undefined);
	};

	var call$a = functionCall;
	var isCallable$3 = isCallable$h;
	var anObject$7 = anObject$g;
	var tryToString$1 = tryToString$3;
	var getIteratorMethod$1 = getIteratorMethodInternal;

	var $TypeError$5 = TypeError;

	var getIteratorInternal = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
	  if (isCallable$3(iteratorMethod)) return anObject$7(call$a(iteratorMethod, argument));
	  throw new $TypeError$5(tryToString$1(argument) + ' is not iterable');
	};

	var bind = functionBindContext;
	var call$9 = functionCall;
	var anObject$6 = anObject$g;
	var tryToString = tryToString$3;
	var isArrayIteratorMethod = isArrayIteratorMethod$1;
	var lengthOfArrayLike$1 = lengthOfArrayLike$4;
	var isPrototypeOf = objectIsPrototypeOf;
	var getIterator = getIteratorInternal;
	var getIteratorMethod = getIteratorMethodInternal;
	var iteratorClose$7 = iteratorClose$c;

	var $TypeError$4 = TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	var iterate$6 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_RECORD = !!(options && options.IS_RECORD);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    var $iterator = iterator;
	    iterator = undefined;
	    if ($iterator) iteratorClose$7($iterator, 'normal');
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$6(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_RECORD) {
	    iterator = iterable.iterator;
	  } else if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (!iterFn) throw new $TypeError$4(tryToString(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike$1(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator(iterable, iterFn);
	  }

	  next = IS_RECORD ? iterable.next : iterator.next;
	  while (!(step = call$9(next, iterator)).done) {
	    // `IteratorValue` errors should propagate without closing the iterator
	    var value = step.value;
	    try {
	      result = callFn(value);
	    } catch (error) {
	      if (iterator) iteratorClose$7(iterator, 'throw', error);
	      else throw error;
	    }
	    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
	  } return new Result(false);
	};

	var $$h = _export;
	var call$8 = functionCall;
	var iterate$5 = iterate$6;
	var aCallable$8 = aCallable$c;
	var anObject$5 = anObject$g;
	var getIteratorDirect$5 = getIteratorDirect$7;
	var iteratorClose$6 = iteratorClose$c;
	var iteratorHelperWithoutClosingOnEarlyError$4 = iteratorHelperWithoutClosingOnEarlyError$6;

	var forEachWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError$4('forEach', TypeError);

	// `Iterator.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.foreach
	$$h({ target: 'Iterator', proto: true, real: true, forced: forEachWithoutClosingOnEarlyError }, {
	  forEach: function forEach(fn) {
	    anObject$5(this);
	    try {
	      aCallable$8(fn);
	    } catch (error) {
	      iteratorClose$6(this, 'throw', error);
	    }

	    if (forEachWithoutClosingOnEarlyError) return call$8(forEachWithoutClosingOnEarlyError, this, fn);

	    var record = getIteratorDirect$5(this);
	    var counter = 0;
	    iterate$5(record, function (value) {
	      fn(value, counter++);
	    }, { IS_RECORD: true });
	  }
	});

	var $$g = _export;
	var call$7 = functionCall;
	var aCallable$7 = aCallable$c;
	var anObject$4 = anObject$g;
	var getIteratorDirect$4 = getIteratorDirect$7;
	var createIteratorProxy = iteratorCreateProxy;
	var callWithSafeIterationClosing = callWithSafeIterationClosing$2;
	var iteratorClose$5 = iteratorClose$c;
	var iteratorHelperThrowsOnInvalidIterator = iteratorHelperThrowsOnInvalidIterator$2;
	var iteratorHelperWithoutClosingOnEarlyError$3 = iteratorHelperWithoutClosingOnEarlyError$6;

	var MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !iteratorHelperThrowsOnInvalidIterator('map', function () { /* empty */ });
	var mapWithoutClosingOnEarlyError = !MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR
	  && iteratorHelperWithoutClosingOnEarlyError$3('map', TypeError);

	var FORCED$4 = MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR || mapWithoutClosingOnEarlyError;

	var IteratorProxy = createIteratorProxy(function () {
	  var iterator = this.iterator;
	  var result = anObject$4(call$7(this.next, iterator));
	  var done = this.done = !!result.done;
	  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
	});

	// `Iterator.prototype.map` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.map
	$$g({ target: 'Iterator', proto: true, real: true, forced: FORCED$4 }, {
	  map: function map(mapper) {
	    anObject$4(this);
	    try {
	      aCallable$7(mapper);
	    } catch (error) {
	      iteratorClose$5(this, 'throw', error);
	    }

	    if (mapWithoutClosingOnEarlyError) return call$7(mapWithoutClosingOnEarlyError, this, mapper);

	    return new IteratorProxy(getIteratorDirect$4(this), {
	      mapper: mapper
	    });
	  }
	});

	var wellKnownSymbol$1 = wellKnownSymbol$8;

	var TO_STRING_TAG$1 = wellKnownSymbol$1('toStringTag');
	var test = {};
	// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var isCallable$2 = isCallable$h;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol = wellKnownSymbol$8;

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$2 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) === 'Object' && isCallable$2(O.callee) ? 'Arguments' : result;
	};

	var classof$1 = classof$2;

	var $String$1 = String;

	var toString$4 = function (argument) {
	  if (classof$1(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String$1(argument);
	};

	var uncurryThis$b = functionUncurryThis;
	var hasOwn$2 = hasOwnProperty_1;

	var $SyntaxError = SyntaxError;
	var $parseInt = parseInt;
	var fromCharCode = String.fromCharCode;
	var at$1 = uncurryThis$b(''.charAt);
	var slice$2 = uncurryThis$b(''.slice);
	var exec$2 = uncurryThis$b(/./.exec);

	var codePoints = {
	  '\\"': '"',
	  '\\\\': '\\',
	  '\\/': '/',
	  '\\b': '\b',
	  '\\f': '\f',
	  '\\n': '\n',
	  '\\r': '\r',
	  '\\t': '\t'
	};

	var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
	// eslint-disable-next-line regexp/no-control-character -- safe
	var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;

	var parseJsonString = function (source, i) {
	  var unterminated = true;
	  var value = '';
	  while (i < source.length) {
	    var chr = at$1(source, i);
	    if (chr === '\\') {
	      var twoChars = slice$2(source, i, i + 2);
	      if (hasOwn$2(codePoints, twoChars)) {
	        value += codePoints[twoChars];
	        i += 2;
	      } else if (twoChars === '\\u') {
	        i += 2;
	        var fourHexDigits = slice$2(source, i, i + 4);
	        if (!exec$2(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);
	        value += fromCharCode($parseInt(fourHexDigits, 16));
	        i += 4;
	      } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
	    } else if (chr === '"') {
	      unterminated = false;
	      i++;
	      break;
	    } else {
	      if (exec$2(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);
	      value += chr;
	      i++;
	    }
	  }
	  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);
	  return { value: value, end: i };
	};

	var $$f = _export;
	var DESCRIPTORS$1 = descriptors;
	var globalThis$1 = globalThis_1;
	var getBuiltIn$2 = getBuiltIn$6;
	var uncurryThis$a = functionUncurryThis;
	var call$6 = functionCall;
	var isCallable$1 = isCallable$h;
	var isObject$2 = isObject$9;
	var isArray$1 = isArray$3;
	var hasOwn$1 = hasOwnProperty_1;
	var toString$3 = toString$4;
	var lengthOfArrayLike = lengthOfArrayLike$4;
	var createProperty = createProperty$2;
	var fails$5 = fails$i;
	var parseJSONString$1 = parseJsonString;
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var JSON$1 = globalThis$1.JSON;
	var Number = globalThis$1.Number;
	var SyntaxError$1 = globalThis$1.SyntaxError;
	var nativeParse = JSON$1 && JSON$1.parse;
	var enumerableOwnProperties = getBuiltIn$2('Object', 'keys');
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var at = uncurryThis$a(''.charAt);
	var slice$1 = uncurryThis$a(''.slice);
	var exec$1 = uncurryThis$a(/./.exec);
	var push$2 = uncurryThis$a([].push);

	var IS_DIGIT = /^\d$/;
	var IS_NON_ZERO_DIGIT = /^[1-9]$/;
	var IS_NUMBER_START = /^[\d-]$/;
	var IS_WHITESPACE = /^[\t\n\r ]$/;

	var PRIMITIVE = 0;
	var OBJECT = 1;

	var $parse = function (source, reviver) {
	  source = toString$3(source);
	  var context = new Context(source, 0);
	  var root = context.parse();
	  var value = root.value;
	  var endIndex = context.skip(IS_WHITESPACE, root.end);
	  if (endIndex < source.length) {
	    throw new SyntaxError$1('Unexpected extra character: "' + at(source, endIndex) + '" after the parsed data at: ' + endIndex);
	  }
	  return isCallable$1(reviver) ? internalize({ '': value }, '', reviver, root) : value;
	};

	var internalize = function (holder, name, reviver, node) {
	  var val = holder[name];
	  var unmodified = node && val === node.value;
	  var context = unmodified && typeof node.source == 'string' ? { source: node.source } : {};
	  var elementRecordsLen, keys, len, i, P;
	  if (isObject$2(val)) {
	    var nodeIsArray = isArray$1(val);
	    var nodes = unmodified ? node.nodes : nodeIsArray ? [] : {};
	    if (nodeIsArray) {
	      elementRecordsLen = nodes.length;
	      len = lengthOfArrayLike(val);
	      for (i = 0; i < len; i++) {
	        internalizeProperty(val, i, internalize(val, '' + i, reviver, i < elementRecordsLen ? nodes[i] : undefined));
	      }
	    } else {
	      keys = enumerableOwnProperties(val);
	      len = lengthOfArrayLike(keys);
	      for (i = 0; i < len; i++) {
	        P = keys[i];
	        internalizeProperty(val, P, internalize(val, P, reviver, hasOwn$1(nodes, P) ? nodes[P] : undefined));
	      }
	    }
	  }
	  return call$6(reviver, holder, name, val, context);
	};

	var internalizeProperty = function (object, key, value) {
	  if (DESCRIPTORS$1) {
	    var descriptor = getOwnPropertyDescriptor(object, key);
	    if (descriptor && !descriptor.configurable) return;
	  }
	  if (value === undefined) delete object[key];
	  else createProperty(object, key, value);
	};

	var Node = function (value, end, source, nodes) {
	  this.value = value;
	  this.end = end;
	  this.source = source;
	  this.nodes = nodes;
	};

	var Context = function (source, index) {
	  this.source = source;
	  this.index = index;
	};

	// https://www.json.org/json-en.html
	Context.prototype = {
	  fork: function (nextIndex) {
	    return new Context(this.source, nextIndex);
	  },
	  parse: function () {
	    var source = this.source;
	    var i = this.skip(IS_WHITESPACE, this.index);
	    var fork = this.fork(i);
	    var chr = at(source, i);
	    if (exec$1(IS_NUMBER_START, chr)) return fork.number();
	    switch (chr) {
	      case '{':
	        return fork.object();
	      case '[':
	        return fork.array();
	      case '"':
	        return fork.string();
	      case 't':
	        return fork.keyword(true);
	      case 'f':
	        return fork.keyword(false);
	      case 'n':
	        return fork.keyword(null);
	    } throw new SyntaxError$1('Unexpected character: "' + chr + '" at: ' + i);
	  },
	  node: function (type, value, start, end, nodes) {
	    return new Node(value, end, type ? null : slice$1(this.source, start, end), nodes);
	  },
	  object: function () {
	    var source = this.source;
	    var i = this.index + 1;
	    var expectKeypair = false;
	    var object = {};
	    var nodes = {};
	    var closed = false;
	    while (i < source.length) {
	      i = this.until(['"', '}'], i);
	      if (at(source, i) === '}' && !expectKeypair) {
	        i++;
	        closed = true;
	        break;
	      }
	      // Parsing the key
	      var result = this.fork(i).string();
	      var key = result.value;
	      i = result.end;
	      i = this.until([':'], i) + 1;
	      // Parsing value
	      i = this.skip(IS_WHITESPACE, i);
	      result = this.fork(i).parse();
	      createProperty(nodes, key, result);
	      createProperty(object, key, result.value);
	      i = this.until([',', '}'], result.end);
	      var chr = at(source, i);
	      if (chr === ',') {
	        expectKeypair = true;
	        i++;
	      } else if (chr === '}') {
	        i++;
	        closed = true;
	        break;
	      }
	    }
	    if (!closed) throw new SyntaxError$1('Unterminated object at: ' + i);
	    return this.node(OBJECT, object, this.index, i, nodes);
	  },
	  array: function () {
	    var source = this.source;
	    var i = this.index + 1;
	    var expectElement = false;
	    var array = [];
	    var nodes = [];
	    var closed = false;
	    while (i < source.length) {
	      i = this.skip(IS_WHITESPACE, i);
	      if (at(source, i) === ']' && !expectElement) {
	        i++;
	        closed = true;
	        break;
	      }
	      var result = this.fork(i).parse();
	      push$2(nodes, result);
	      push$2(array, result.value);
	      i = this.until([',', ']'], result.end);
	      if (at(source, i) === ',') {
	        expectElement = true;
	        i++;
	      } else if (at(source, i) === ']') {
	        i++;
	        closed = true;
	        break;
	      }
	    }
	    if (!closed) throw new SyntaxError$1('Unterminated array at: ' + i);
	    return this.node(OBJECT, array, this.index, i, nodes);
	  },
	  string: function () {
	    var index = this.index;
	    var parsed = parseJSONString$1(this.source, this.index + 1);
	    return this.node(PRIMITIVE, parsed.value, index, parsed.end);
	  },
	  number: function () {
	    var source = this.source;
	    var startIndex = this.index;
	    var i = startIndex;
	    if (at(source, i) === '-') i++;
	    if (at(source, i) === '0') i++;
	    else if (exec$1(IS_NON_ZERO_DIGIT, at(source, i))) i = this.skip(IS_DIGIT, i + 1);
	    else throw new SyntaxError$1('Failed to parse number at: ' + i);
	    if (at(source, i) === '.') {
	      var fractionStartIndex = i + 1;
	      i = this.skip(IS_DIGIT, fractionStartIndex);
	      if (fractionStartIndex === i) throw new SyntaxError$1("Failed to parse number's fraction at: " + i);
	    }
	    if (at(source, i) === 'e' || at(source, i) === 'E') {
	      i++;
	      if (at(source, i) === '+' || at(source, i) === '-') i++;
	      var exponentStartIndex = i;
	      i = this.skip(IS_DIGIT, i);
	      if (exponentStartIndex === i) throw new SyntaxError$1("Failed to parse number's exponent value at: " + i);
	    }
	    return this.node(PRIMITIVE, Number(slice$1(source, startIndex, i)), startIndex, i);
	  },
	  keyword: function (value) {
	    var keyword = '' + value;
	    var index = this.index;
	    var endIndex = index + keyword.length;
	    if (slice$1(this.source, index, endIndex) !== keyword) throw new SyntaxError$1('Failed to parse value at: ' + index);
	    return this.node(PRIMITIVE, value, index, endIndex);
	  },
	  skip: function (regex, i) {
	    var source = this.source;
	    for (; i < source.length; i++) if (!exec$1(regex, at(source, i))) break;
	    return i;
	  },
	  until: function (array, i) {
	    i = this.skip(IS_WHITESPACE, i);
	    var chr = at(this.source, i);
	    for (var j = 0; j < array.length; j++) if (array[j] === chr) return i;
	    throw new SyntaxError$1('Unexpected character: "' + chr + '" at: ' + i);
	  }
	};

	var NO_SOURCE_SUPPORT = fails$5(function () {
	  var unsafeInt = '9007199254740993';
	  var source;
	  nativeParse(unsafeInt, function (key, value, context) {
	    source = context.source;
	  });
	  return source !== unsafeInt;
	});

	var PROPER_BASE_PARSE = NATIVE_SYMBOL$1 && !fails$5(function () {
	  // Safari 9 bug
	  return 1 / nativeParse('-0 \t') !== -Infinity;
	});

	// `JSON.parse` method
	// https://tc39.es/ecma262/#sec-json.parse
	// https://github.com/tc39/proposal-json-parse-with-source
	$$f({ target: 'JSON', stat: true, forced: NO_SOURCE_SUPPORT }, {
	  parse: function parse(text, reviver) {
	    return PROPER_BASE_PARSE && !isCallable$1(reviver) ? nativeParse(text) : $parse(text, reviver);
	  }
	});

	var isObject$1 = isObject$9;
	var getInternalState = internalState.get;

	var isRawJson = function isRawJSON(O) {
	  if (!isObject$1(O)) return false;
	  var state = getInternalState(O);
	  return !!state && state.type === 'RawJSON';
	};

	var uncurryThis$9 = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$1 = uncurryThis$9(1.1.valueOf);

	/* eslint-disable es/no-json -- safe */
	var fails$4 = fails$i;

	var nativeRawJson = !fails$4(function () {
	  var unsafeInt = '9007199254740993';
	  // eslint-disable-next-line es/no-json-rawjson -- feature detection
	  var raw = JSON.rawJSON(unsafeInt);
	  // eslint-disable-next-line es/no-json-israwjson -- feature detection
	  return !JSON.isRawJSON(raw) || JSON.stringify(raw) !== unsafeInt;
	});

	var $$e = _export;
	var getBuiltIn$1 = getBuiltIn$6;
	var call$5 = functionCall;
	var uncurryThis$8 = functionUncurryThis;
	var fails$3 = fails$i;
	var isArray = isArray$3;
	var isCallable = isCallable$h;
	var isObject = isObject$9;
	var create = objectCreate;
	var isRawJSON = isRawJson;
	var isSymbol = isSymbol$3;
	var classof = classofRaw$2;
	var thisNumberValue = thisNumberValue$1;
	var includes = arrayIncludes.includes;
	var hasOwn = hasOwnProperty_1;
	var toString$2 = toString$4;
	var parseJSONString = parseJsonString;
	var uid = uid$3;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var NATIVE_RAW_JSON = nativeRawJson;

	var $String = String;
	var $TypeError$3 = TypeError;
	var $stringify = getBuiltIn$1('JSON', 'stringify');
	var $BigInt = getBuiltIn$1('BigInt');
	var stringValueOf = uncurryThis$8(''.valueOf);
	var booleanValueOf = uncurryThis$8(true.valueOf);
	var bigIntValueOf = $BigInt && uncurryThis$8($BigInt.prototype.valueOf);
	var exec = uncurryThis$8(/./.exec);
	var charAt = uncurryThis$8(''.charAt);
	var charCodeAt = uncurryThis$8(''.charCodeAt);
	var replace = uncurryThis$8(''.replace);
	var slice = uncurryThis$8(''.slice);
	var push$1 = uncurryThis$8([].push);
	var pop = uncurryThis$8([].pop);
	var numberToString = uncurryThis$8(1.1.toString);

	var surrogates = /[\uD800-\uDFFF]/g;
	var leadingSurrogates = /^[\uD800-\uDBFF]$/;
	var trailingSurrogates = /^[\uDC00-\uDFFF]$/;
	var digits = /^\d+$/;

	// a placeholder of a raw JSON value
	var RAW_MARK = uid();
	// a prefix of keys of a reordered object, see `createOrderedObject`
	var KEY_MARK = uid();
	// the last key of a reordered object, marks the end of its serialization
	var END_MARK = uid();
	var RAW_MARK_LENGTH = RAW_MARK.length;
	var KEY_MARK_LENGTH = KEY_MARK.length;

	var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails$3(function () {
	  var symbol = getBuiltIn$1('Symbol')('stringify detection');
	  // MS Edge converts symbol values to JSON as {}
	  return $stringify([symbol]) !== '[null]'
	    // WebKit converts symbol values to JSON as null
	    || $stringify({ a: symbol }) !== '{}'
	    // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) !== '{}';
	});

	// https://github.com/tc39/proposal-well-formed-stringify
	var ILL_FORMED_UNICODE = fails$3(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	var isRawJSONValue = NATIVE_RAW_JSON ? getBuiltIn$1('JSON', 'isRawJSON') : isRawJSON;

	var stringifyWithProperSymbolsConversion = WRONG_SYMBOLS_CONVERSION ? function (it, replacer, space) {
	  return $stringify(it, function (key, value) {
	    var replaced = call$5(replacer, this, key, value);
	    if (!isSymbol(replaced)) return replaced;
	  }, space);
	} : $stringify;

	var fixIllFormedJSON = function (match, offset, string) {
	  var prev = charAt(string, offset - 1);
	  var next = charAt(string, offset + 1);
	  if (
	    (exec(leadingSurrogates, match) && !exec(trailingSurrogates, next)) ||
	    (exec(trailingSurrogates, match) && !exec(leadingSurrogates, prev))
	  ) {
	    return '\\u' + numberToString(charCodeAt(match, 0), 16);
	  } return match;
	};

	// `PropertyList` of `JSON.stringify`
	// https://tc39.es/ecma262/#sec-json.stringify
	var getPropertyList = function (replacer) {
	  if (!isArray(replacer)) return;
	  var rawLength = replacer.length;
	  var propertyList = [];
	  // a null prototype object is used as a set of already added keys to keep the deduplication linear
	  var addedKeys = create(null);
	  for (var i = 0; i < rawLength; i++) {
	    var element = replacer[i];
	    var key;
	    if (typeof element == 'string') key = element;
	    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') key = toString$2(element);
	    else continue;
	    if (!hasOwn(addedKeys, key)) {
	      addedKeys[key] = true;
	      push$1(propertyList, key);
	    }
	  }
	  return propertyList;
	};

	// values with such an internal slot are unwrapped by `SerializeJSONProperty` instead of being serialized as objects
	var hasInternalSlot = function (valueOf, it) {
	  try {
	    valueOf(it);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	// the slot check is expensive, so it's performed only for the kind reported by the value itself -
	// a value lying about its kind via `Symbol.toStringTag` is serialized as an ordinary object
	var isBoxedPrimitive = function (it) {
	  var kind = classof(it);
	  return (kind === 'Number' && hasInternalSlot(thisNumberValue, it))
	    || (kind === 'String' && hasInternalSlot(stringValueOf, it))
	    || (kind === 'Boolean' && hasInternalSlot(booleanValueOf, it))
	    || (!!bigIntValueOf && kind === 'BigInt' && hasInternalSlot(bigIntValueOf, it));
	};

	// only objects serialized by `SerializeJSONObject` are affected by the property list
	var isSerializedAsObject = function (it) {
	  if (!isObject(it) || isCallable(it) || isArray(it)) return false;
	  try {
	    return !isBoxedPrimitive(it);
	  // `classof` reads `Symbol.toStringTag`, so a proxy could throw - it has no internal slots anyway
	  } catch (error) {
	    return true;
	  }
	};

	// the engine unwraps it in the same order as it would read the original property,
	// so the property is read lazily and `toJSON` is called once and with the original key
	var createElementHolder = function (holder, key) {
	  return {
	    toJSON: function () {
	      var element = holder[key];
	      if (isObject(element) || typeof element == 'bigint') {
	        var elementToJSON = element.toJSON;
	        if (isCallable(elementToJSON)) element = call$5(elementToJSON, element, key);
	      } return element;
	    }
	  };
	};

	// own keys of objects are sorted - integer-like keys are moved to the beginning,
	// so such keys should be marked and restored in the serialized string
	var getKeyPrefix = function (propertyList) {
	  for (var i = 0, length = propertyList.length; i < length; i++) {
	    if (exec(digits, propertyList[i])) return KEY_MARK;
	  } return '';
	};

	// `SerializeJSONObject` iterates the property list, so the value is replaced with an object with keys in this order
	var createOrderedObject = function (value, propertyList, keyPrefix) {
	  // keys are not marked if the property list has no integer-like keys, so `Object.prototype`
	  // with a setter, a non-writable property or `__proto__` should not intercept the assignment
	  var ordered = create(null);
	  for (var i = 0, length = propertyList.length; i < length; i++) {
	    var key = propertyList[i];
	    ordered[keyPrefix + key] = createElementHolder(value, key);
	  }
	  ordered[END_MARK] = null;
	  return ordered;
	};

	// `JSON.stringify` method
	// https://tc39.es/ecma262/#sec-json.stringify
	// https://github.com/tc39/proposal-json-parse-with-source
	if ($stringify) $$e({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE || !NATIVE_RAW_JSON }, {
	  stringify: function stringify(text, replacer, space) {
	    var replacerFunction = isCallable(replacer) ? replacer : undefined;
	    var propertyList = replacerFunction ? undefined : getPropertyList(replacer);
	    var keyPrefix = propertyList && getKeyPrefix(propertyList);
	    var rawStrings = [];
	    var openObjects = [];
	    var parentOrdered = [];
	    var currentOrdered;
	    var marked = false;
	    var root = true;

	    var json = stringifyWithProperSymbolsConversion(text, function (key, value) {
	      // some old implementations (like WebKit) could pass numbers as keys
	      key = $String(key);

	      if (propertyList) {
	        if (key === END_MARK) {
	          pop(openObjects);
	          currentOrdered = pop(parentOrdered);
	          return;
	        }
	        if (root) root = false;
	        // the innermost reordered object already contains only keys of the property list and arrays are not
	        // affected by it, the rest of objects (like objects with a fake `Symbol.toStringTag`) are filtered here
	        else if (this !== currentOrdered && !isArray(this) && !includes(propertyList, key)) return;
	      } else if (replacerFunction) value = call$5(replacerFunction, this, key, value);

	      if (isRawJSONValue(value)) {
	        if (NATIVE_RAW_JSON) return value;
	        marked = true;
	        return RAW_MARK + (push$1(rawStrings, value.rawJSON) - 1);
	      }

	      if (propertyList && isSerializedAsObject(value)) {
	        // reordered objects are new each time, so cycles should be detected before the engine does it
	        if (includes(openObjects, value)) throw new $TypeError$3('Converting circular structure to JSON');
	        var ordered = createOrderedObject(value, propertyList, keyPrefix);
	        push$1(openObjects, value);
	        push$1(parentOrdered, currentOrdered);
	        currentOrdered = ordered;
	        if (keyPrefix) marked = true;
	        return ordered;
	      }

	      return value;
	    }, space);

	    if (typeof json != 'string') return json;

	    if (ILL_FORMED_UNICODE) json = replace(json, surrogates, fixIllFormedJSON);

	    if (!marked) return json;

	    var result = '';
	    var length = json.length;

	    for (var i = 0; i < length; i++) {
	      var chr = charAt(json, i);
	      if (chr === '"') {
	        var end = parseJSONString(json, ++i).end - 1;
	        var string = slice(json, i, end);
	        if (slice(string, 0, RAW_MARK_LENGTH) === RAW_MARK) result += rawStrings[slice(string, RAW_MARK_LENGTH)];
	        else if (slice(string, 0, KEY_MARK_LENGTH) === KEY_MARK) result += '"' + slice(string, KEY_MARK_LENGTH) + '"';
	        else result += '"' + string + '"';
	        i = end;
	      } else result += chr;
	    }

	    return result;
	  }
	});

	var $TypeError$2 = TypeError;

	var validateArgumentsLength$2 = function (passed, required) {
	  if (passed < required) throw new $TypeError$2('Not enough arguments');
	  return passed;
	};

	var defineBuiltIn$1 = defineBuiltIn$5;
	var uncurryThis$7 = functionUncurryThis;
	var toString$1 = toString$4;
	var validateArgumentsLength$1 = validateArgumentsLength$2;

	var $URLSearchParams$1 = URLSearchParams;
	var URLSearchParamsPrototype$2 = $URLSearchParams$1.prototype;
	var append = uncurryThis$7(URLSearchParamsPrototype$2.append);
	var $delete = uncurryThis$7(URLSearchParamsPrototype$2['delete']);
	var forEach$2 = uncurryThis$7(URLSearchParamsPrototype$2.forEach);
	var push = uncurryThis$7([].push);
	var params$1 = new $URLSearchParams$1('a=1&a=2&b=3');

	params$1['delete']('a', 1);
	// `undefined` case is a Chromium 117 bug
	// https://bugs.chromium.org/p/v8/issues/detail?id=14222
	params$1['delete']('b', undefined);

	if (params$1 + '' !== 'a=2') {
	  defineBuiltIn$1(URLSearchParamsPrototype$2, 'delete', function (name /* , value */) {
	    var length = arguments.length;
	    var $value = length < 2 ? undefined : arguments[1];
	    if (length && $value === undefined) return $delete(this, name);
	    var entries = [];
	    forEach$2(this, function (v, k) { // also validates `this`
	      push(entries, { key: k, value: v });
	    });
	    validateArgumentsLength$1(length, 1);
	    var key = toString$1(name);
	    var value = toString$1($value);
	    var index = 0;
	    var entriesLength = entries.length;
	    var entry;
	    while (index < entriesLength) {
	      entry = entries[index];
	      $delete(this, entry.key);
	      index++;
	    }
	    index = 0;
	    while (index < entriesLength) {
	      entry = entries[index++];
	      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
	    }
	  }, { enumerable: true, unsafe: true });
	}

	var defineBuiltIn = defineBuiltIn$5;
	var uncurryThis$6 = functionUncurryThis;
	var toString = toString$4;
	var validateArgumentsLength = validateArgumentsLength$2;

	var $URLSearchParams = URLSearchParams;
	var URLSearchParamsPrototype$1 = $URLSearchParams.prototype;
	var getAll = uncurryThis$6(URLSearchParamsPrototype$1.getAll);
	var $has = uncurryThis$6(URLSearchParamsPrototype$1.has);
	var params = new $URLSearchParams('a=1');

	// `undefined` case is a Chromium 117 bug
	// https://bugs.chromium.org/p/v8/issues/detail?id=14222
	if (params.has('a', 2) || !params.has('a', undefined)) {
	  defineBuiltIn(URLSearchParamsPrototype$1, 'has', function has(name /* , value */) {
	    var length = arguments.length;
	    var $value = length < 2 ? undefined : arguments[1];
	    if (length && $value === undefined) return $has(this, name);
	    var values = getAll(this, name); // also validates `this`
	    validateArgumentsLength(length, 1);
	    var value = toString($value);
	    var index = 0;
	    while (index < values.length) {
	      if (values[index++] === value) return true;
	    } return false;
	  }, { enumerable: true, unsafe: true });
	}

	var DESCRIPTORS = descriptors;
	var uncurryThis$5 = functionUncurryThis;
	var defineBuiltInAccessor = defineBuiltInAccessor$2;

	var URLSearchParamsPrototype = URLSearchParams.prototype;
	var forEach$1 = uncurryThis$5(URLSearchParamsPrototype.forEach);

	// `URLSearchParams.prototype.size` getter
	// https://github.com/whatwg/url/pull/734
	if (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {
	  defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
	    get: function size() {
	      var count = 0;
	      forEach$1(this, function () { count++; });
	      return count;
	    },
	    configurable: true,
	    enumerable: true
	  });
	}

	var $$d = _export;
	var call$4 = functionCall;
	var iterate$4 = iterate$6;
	var aCallable$6 = aCallable$c;
	var anObject$3 = anObject$g;
	var getIteratorDirect$3 = getIteratorDirect$7;
	var iteratorClose$4 = iteratorClose$c;
	var iteratorHelperWithoutClosingOnEarlyError$2 = iteratorHelperWithoutClosingOnEarlyError$6;

	var findWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError$2('find', TypeError);

	// `Iterator.prototype.find` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.find
	$$d({ target: 'Iterator', proto: true, real: true, forced: findWithoutClosingOnEarlyError }, {
	  find: function find(predicate) {
	    anObject$3(this);
	    try {
	      aCallable$6(predicate);
	    } catch (error) {
	      iteratorClose$4(this, 'throw', error);
	    }

	    if (findWithoutClosingOnEarlyError) return call$4(findWithoutClosingOnEarlyError, this, predicate);

	    var record = getIteratorDirect$3(this);
	    var counter = 0;
	    return iterate$4(record, function (value, stop) {
	      if (predicate(value, counter++)) return stop(value);
	    }, { IS_RECORD: true, INTERRUPTED: true }).result;
	  }
	});

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype = Function.prototype;
	var apply$1 = FunctionPrototype.apply;
	var call$3 = FunctionPrototype.call;

	// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$3.bind(apply$1) : function () {
	  return call$3.apply(apply$1, arguments);
	});

	var $$c = _export;
	var iterate$3 = iterate$6;
	var aCallable$5 = aCallable$c;
	var anObject$2 = anObject$g;
	var getIteratorDirect$2 = getIteratorDirect$7;
	var iteratorClose$3 = iteratorClose$c;
	var iteratorHelperWithoutClosingOnEarlyError$1 = iteratorHelperWithoutClosingOnEarlyError$6;
	var apply = functionApply;
	var fails$2 = fails$i;

	var $TypeError$1 = TypeError;

	// https://bugs.webkit.org/show_bug.cgi?id=291651
	var FAILS_ON_INITIAL_UNDEFINED = fails$2(function () {
	  // eslint-disable-next-line es/no-iterator-prototype-reduce, es/no-array-prototype-keys, array-callback-return -- required for testing
	  [].keys().reduce(function () { /* empty */ }, undefined);
	});

	var reduceWithoutClosingOnEarlyError = !FAILS_ON_INITIAL_UNDEFINED && iteratorHelperWithoutClosingOnEarlyError$1('reduce', $TypeError$1);

	// `Iterator.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.reduce
	$$c({ target: 'Iterator', proto: true, real: true, forced: FAILS_ON_INITIAL_UNDEFINED || reduceWithoutClosingOnEarlyError }, {
	  reduce: function reduce(reducer /* , initialValue */) {
	    anObject$2(this);
	    try {
	      aCallable$5(reducer);
	    } catch (error) {
	      iteratorClose$3(this, 'throw', error);
	    }

	    var noInitial = arguments.length < 2;
	    var accumulator = noInitial ? undefined : arguments[1];
	    if (reduceWithoutClosingOnEarlyError) {
	      return apply(reduceWithoutClosingOnEarlyError, this, noInitial ? [reducer] : [reducer, accumulator]);
	    }
	    var record = getIteratorDirect$2(this);
	    var counter = 0;
	    iterate$3(record, function (value) {
	      if (noInitial) {
	        noInitial = false;
	        accumulator = value;
	      } else {
	        accumulator = reducer(accumulator, value, counter);
	      }
	      counter++;
	    }, { IS_RECORD: true });
	    if (noInitial) throw new $TypeError$1('Reduce of empty iterator with no initial value');
	    return accumulator;
	  }
	});

	var $$b = _export;
	var call$2 = functionCall;
	var iterate$2 = iterate$6;
	var aCallable$4 = aCallable$c;
	var anObject$1 = anObject$g;
	var getIteratorDirect$1 = getIteratorDirect$7;
	var iteratorClose$2 = iteratorClose$c;
	var iteratorHelperWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError$6;

	var someWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('some', TypeError);

	// `Iterator.prototype.some` method
	// https://tc39.es/ecma262/#sec-iterator.prototype.some
	$$b({ target: 'Iterator', proto: true, real: true, forced: someWithoutClosingOnEarlyError }, {
	  some: function some(predicate) {
	    anObject$1(this);
	    try {
	      aCallable$4(predicate);
	    } catch (error) {
	      iteratorClose$2(this, 'throw', error);
	    }

	    if (someWithoutClosingOnEarlyError) return call$2(someWithoutClosingOnEarlyError, this, predicate);

	    var record = getIteratorDirect$1(this);
	    var counter = 0;
	    return iterate$2(record, function (value, stop) {
	      if (predicate(value, counter++)) return stop();
	    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
	  }
	});

	var uncurryThis$4 = functionUncurryThis;

	// eslint-disable-next-line es/no-map -- safe
	var MapPrototype = Map.prototype;

	var mapHelpers = {
	  // eslint-disable-next-line es/no-map -- safe
	  Map: Map,
	  set: uncurryThis$4(MapPrototype.set),
	  get: uncurryThis$4(MapPrototype.get),
	  has: uncurryThis$4(MapPrototype.has),
	  remove: uncurryThis$4(MapPrototype['delete']),
	  proto: MapPrototype
	};

	var $$a = _export;
	var MapHelpers$1 = mapHelpers;
	var IS_PURE$2 = isPure;

	var get$3 = MapHelpers$1.get;
	var has$a = MapHelpers$1.has;
	var set$4 = MapHelpers$1.set;

	// `Map.prototype.getOrInsert` method
	// https://tc39.es/ecma262/#sec-map.prototype.getorinsert
	$$a({ target: 'Map', proto: true, real: true, forced: IS_PURE$2 }, {
	  getOrInsert: function getOrInsert(key, value) {
	    if (has$a(this, key)) return get$3(this, key);
	    set$4(this, key, value);
	    return value;
	  }
	});

	var $$9 = _export;
	var aCallable$3 = aCallable$c;
	var MapHelpers = mapHelpers;
	var IS_PURE$1 = isPure;

	var get$2 = MapHelpers.get;
	var has$9 = MapHelpers.has;
	var set$3 = MapHelpers.set;

	// `Map.prototype.getOrInsertComputed` method
	// https://tc39.es/ecma262/#sec-map.prototype.getorinsertcomputed
	$$9({ target: 'Map', proto: true, real: true, forced: IS_PURE$1 }, {
	  getOrInsertComputed: function getOrInsertComputed(key, callbackfn) {
	    var hasKey = has$9(this, key);
	    aCallable$3(callbackfn);
	    if (hasKey) return get$2(this, key);
	    // CanonicalizeKeyedCollectionKey
	    if (key === 0 && 1 / key === -Infinity) key = 0;
	    var value = callbackfn(key);
	    set$3(this, key, value);
	    return value;
	  }
	});

	var uncurryThis$3 = functionUncurryThis;

	// eslint-disable-next-line es/no-set -- safe
	var SetPrototype$1 = Set.prototype;

	var setHelpers = {
	  // eslint-disable-next-line es/no-set -- safe
	  Set: Set,
	  add: uncurryThis$3(SetPrototype$1.add),
	  has: uncurryThis$3(SetPrototype$1.has),
	  remove: uncurryThis$3(SetPrototype$1['delete']),
	  proto: SetPrototype$1
	};

	var has$8 = setHelpers.has;

	// Perform ? RequireInternalSlot(M, [[SetData]])
	var aSet$7 = function (it) {
	  has$8(it);
	  return it;
	};

	var call$1 = functionCall;

	var iterateSimple$7 = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
	  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
	  var next = record.next;
	  var step, result;
	  while (!(step = call$1(next, iterator)).done) {
	    result = fn(step.value);
	    if (result !== undefined) return result;
	  }
	};

	var uncurryThis$2 = functionUncurryThis;
	var iterateSimple$6 = iterateSimple$7;
	var SetHelpers$5 = setHelpers;

	var Set$3 = SetHelpers$5.Set;
	var SetPrototype = SetHelpers$5.proto;
	var forEach = uncurryThis$2(SetPrototype.forEach);
	var keys = uncurryThis$2(SetPrototype.keys);
	var next = keys(new Set$3()).next;

	var setIterate = function (set, fn, interruptible) {
	  return interruptible ? iterateSimple$6({ iterator: keys(set), next: next }, fn) : forEach(set, fn);
	};

	var SetHelpers$4 = setHelpers;
	var iterate$1 = setIterate;

	var Set$2 = SetHelpers$4.Set;
	var add$3 = SetHelpers$4.add;

	var setClone = function (set) {
	  var result = new Set$2();
	  iterate$1(set, function (it) {
	    add$3(result, it);
	  });
	  return result;
	};

	var uncurryThis$1 = functionUncurryThis;
	var aCallable$2 = aCallable$c;

	var functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis$1(aCallable$2(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};

	var uncurryThisAccessor = functionUncurryThisAccessor;
	var SetHelpers$3 = setHelpers;

	var setSize = uncurryThisAccessor(SetHelpers$3.proto, 'size', 'get') || function (set) {
	  return set.size;
	};

	var aCallable$1 = aCallable$c;
	var anObject = anObject$g;
	var call = functionCall;
	var toIntegerOrInfinity = toIntegerOrInfinity$3;
	var getIteratorDirect = getIteratorDirect$7;

	var INVALID_SIZE = 'Invalid size';
	var $RangeError = RangeError;
	var $TypeError = TypeError;
	var max = Math.max;

	var SetRecord = function (set, intSize) {
	  this.set = set;
	  this.size = max(intSize, 0);
	  this.has = aCallable$1(set.has);
	  this.keys = aCallable$1(set.keys);
	};

	SetRecord.prototype = {
	  getIterator: function () {
	    return getIteratorDirect(anObject(call(this.keys, this.set)));
	  },
	  includes: function (it) {
	    return call(this.has, this.set, it);
	  }
	};

	// `GetSetRecord` abstract operation
	// https://tc39.es/proposal-set-methods/#sec-getsetrecord
	var getSetRecord$7 = function (obj) {
	  anObject(obj);
	  var numSize = +obj.size;
	  // NOTE: If size is undefined, then numSize will be NaN
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (numSize !== numSize) throw new $TypeError(INVALID_SIZE);
	  var intSize = toIntegerOrInfinity(numSize);
	  if (intSize < 0) throw new $RangeError(INVALID_SIZE);
	  return new SetRecord(obj, intSize);
	};

	var aSet$6 = aSet$7;
	var SetHelpers$2 = setHelpers;
	var clone$2 = setClone;
	var size$4 = setSize;
	var getSetRecord$6 = getSetRecord$7;
	var iterateSet$2 = setIterate;
	var iterateSimple$5 = iterateSimple$7;

	var has$7 = SetHelpers$2.has;
	var remove$2 = SetHelpers$2.remove;

	// `Set.prototype.difference` method
	// https://tc39.es/ecma262/#sec-set.prototype.difference
	var setDifference = function difference(other) {
	  var O = aSet$6(this);
	  var otherRec = getSetRecord$6(other);
	  var result = clone$2(O);
	  if (size$4(result) <= otherRec.size) iterateSet$2(result, function (e) {
	    if (otherRec.includes(e)) remove$2(result, e);
	  });
	  else iterateSimple$5(otherRec.getIterator(), function (e) {
	    if (has$7(result, e)) remove$2(result, e);
	  });
	  return result;
	};

	var getBuiltIn = getBuiltIn$6;

	var createSetLike = function (size) {
	  return {
	    size: size,
	    has: function () {
	      return false;
	    },
	    keys: function () {
	      return {
	        next: function () {
	          return { done: true };
	        }
	      };
	    }
	  };
	};

	var createSetLikeWithInfinitySize = function (size) {
	  return {
	    size: size,
	    has: function () {
	      return true;
	    },
	    keys: function () {
	      throw new Error('e');
	    }
	  };
	};

	var setMethodAcceptSetLike$7 = function (name, callback) {
	  var Set = getBuiltIn('Set');
	  try {
	    new Set()[name](createSetLike(0));
	    try {
	      // late spec change, early WebKit ~ Safari 17 implementation does not pass it
	      // https://github.com/tc39/proposal-set-methods/pull/88
	      // also covered engines with
	      // https://bugs.webkit.org/show_bug.cgi?id=272679
	      new Set()[name](createSetLike(-1));
	      return false;
	    } catch (error2) {
	      if (!callback) return true;
	      // early V8 implementation bug
	      // https://issues.chromium.org/issues/351332634
	      try {
	        new Set()[name](createSetLikeWithInfinitySize(-Infinity));
	        return false;
	      } catch (error) {
	        var set = new Set([1, 2]);
	        return callback(set[name](createSetLikeWithInfinitySize(Infinity)));
	      }
	    }
	  } catch (error) {
	    return false;
	  }
	};

	var $$8 = _export;
	var difference = setDifference;
	var fails$1 = fails$i;
	var setMethodAcceptSetLike$6 = setMethodAcceptSetLike$7;

	var SET_LIKE_INCORRECT_BEHAVIOR = !setMethodAcceptSetLike$6('difference', function (result) {
	  return result.size === 0;
	});

	var FORCED$3 = SET_LIKE_INCORRECT_BEHAVIOR || fails$1(function () {
	  // https://bugs.webkit.org/show_bug.cgi?id=288595
	  var setLike = {
	    size: 1,
	    has: function () { return true; },
	    keys: function () {
	      var index = 0;
	      return {
	        next: function () {
	          var done = index++ > 1;
	          if (baseSet.has(1)) baseSet.clear();
	          return { done: done, value: 2 };
	        }
	      };
	    }
	  };
	  // eslint-disable-next-line es/no-set -- testing
	  var baseSet = new Set([1, 2, 3, 4]);
	  // eslint-disable-next-line es/no-set-prototype-difference -- testing
	  return baseSet.difference(setLike).size !== 3;
	});

	// `Set.prototype.difference` method
	// https://tc39.es/ecma262/#sec-set.prototype.difference
	$$8({ target: 'Set', proto: true, real: true, forced: FORCED$3 }, {
	  difference: difference
	});

	var aSet$5 = aSet$7;
	var SetHelpers$1 = setHelpers;
	var size$3 = setSize;
	var getSetRecord$5 = getSetRecord$7;
	var iterateSet$1 = setIterate;
	var iterateSimple$4 = iterateSimple$7;

	var Set$1 = SetHelpers$1.Set;
	var add$2 = SetHelpers$1.add;
	var has$6 = SetHelpers$1.has;

	// `Set.prototype.intersection` method
	// https://tc39.es/ecma262/#sec-set.prototype.intersection
	var setIntersection = function intersection(other) {
	  var O = aSet$5(this);
	  var otherRec = getSetRecord$5(other);
	  var result = new Set$1();

	  if (size$3(O) > otherRec.size) {
	    iterateSimple$4(otherRec.getIterator(), function (e) {
	      if (has$6(O, e)) add$2(result, e);
	    });
	  } else {
	    iterateSet$1(O, function (e) {
	      if (otherRec.includes(e)) add$2(result, e);
	    });
	  }

	  return result;
	};

	var $$7 = _export;
	var fails = fails$i;
	var intersection = setIntersection;
	var setMethodAcceptSetLike$5 = setMethodAcceptSetLike$7;

	var INCORRECT$3 = !setMethodAcceptSetLike$5('intersection', function (result) {
	  return result.size === 2 && result.has(1) && result.has(2);
	}) || fails(function () {
	  // eslint-disable-next-line es/no-array-from, es/no-set, es/no-set-prototype-intersection -- testing
	  return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
	});

	// `Set.prototype.intersection` method
	// https://tc39.es/ecma262/#sec-set.prototype.intersection
	$$7({ target: 'Set', proto: true, real: true, forced: INCORRECT$3 }, {
	  intersection: intersection
	});

	var aSet$4 = aSet$7;
	var has$5 = setHelpers.has;
	var size$2 = setSize;
	var getSetRecord$4 = getSetRecord$7;
	var iterateSet = setIterate;
	var iterateSimple$3 = iterateSimple$7;
	var iteratorClose$1 = iteratorClose$c;

	// `Set.prototype.isDisjointFrom` method
	// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
	var setIsDisjointFrom = function isDisjointFrom(other) {
	  var O = aSet$4(this);
	  var otherRec = getSetRecord$4(other);
	  if (size$2(O) <= otherRec.size) return iterateSet(O, function (e) {
	    if (otherRec.includes(e)) return false;
	  }, true) !== false;
	  var iterator = otherRec.getIterator();
	  return iterateSimple$3(iterator, function (e) {
	    if (has$5(O, e)) return iteratorClose$1(iterator.iterator, 'normal', false);
	  }) !== false;
	};

	var $$6 = _export;
	var isDisjointFrom = setIsDisjointFrom;
	var setMethodAcceptSetLike$4 = setMethodAcceptSetLike$7;

	var INCORRECT$2 = !setMethodAcceptSetLike$4('isDisjointFrom', function (result) {
	  return !result;
	});

	// `Set.prototype.isDisjointFrom` method
	// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
	$$6({ target: 'Set', proto: true, real: true, forced: INCORRECT$2 }, {
	  isDisjointFrom: isDisjointFrom
	});

	var aSet$3 = aSet$7;
	var size$1 = setSize;
	var iterate = setIterate;
	var getSetRecord$3 = getSetRecord$7;

	// `Set.prototype.isSubsetOf` method
	// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
	var setIsSubsetOf = function isSubsetOf(other) {
	  var O = aSet$3(this);
	  var otherRec = getSetRecord$3(other);
	  if (size$1(O) > otherRec.size) return false;
	  return iterate(O, function (e) {
	    if (!otherRec.includes(e)) return false;
	  }, true) !== false;
	};

	var $$5 = _export;
	var isSubsetOf = setIsSubsetOf;
	var setMethodAcceptSetLike$3 = setMethodAcceptSetLike$7;

	var INCORRECT$1 = !setMethodAcceptSetLike$3('isSubsetOf', function (result) {
	  return result;
	});

	// `Set.prototype.isSubsetOf` method
	// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
	$$5({ target: 'Set', proto: true, real: true, forced: INCORRECT$1 }, {
	  isSubsetOf: isSubsetOf
	});

	var aSet$2 = aSet$7;
	var has$4 = setHelpers.has;
	var size = setSize;
	var getSetRecord$2 = getSetRecord$7;
	var iterateSimple$2 = iterateSimple$7;
	var iteratorClose = iteratorClose$c;

	// `Set.prototype.isSupersetOf` method
	// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
	var setIsSupersetOf = function isSupersetOf(other) {
	  var O = aSet$2(this);
	  var otherRec = getSetRecord$2(other);
	  if (size(O) < otherRec.size) return false;
	  var iterator = otherRec.getIterator();
	  return iterateSimple$2(iterator, function (e) {
	    if (!has$4(O, e)) return iteratorClose(iterator.iterator, 'normal', false);
	  }) !== false;
	};

	var $$4 = _export;
	var isSupersetOf = setIsSupersetOf;
	var setMethodAcceptSetLike$2 = setMethodAcceptSetLike$7;

	var INCORRECT = !setMethodAcceptSetLike$2('isSupersetOf', function (result) {
	  return !result;
	});

	// `Set.prototype.isSupersetOf` method
	// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
	$$4({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
	  isSupersetOf: isSupersetOf
	});

	var aSet$1 = aSet$7;
	var SetHelpers = setHelpers;
	var clone$1 = setClone;
	var getSetRecord$1 = getSetRecord$7;
	var iterateSimple$1 = iterateSimple$7;

	var add$1 = SetHelpers.add;
	var has$3 = SetHelpers.has;
	var remove$1 = SetHelpers.remove;

	// `Set.prototype.symmetricDifference` method
	// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
	var setSymmetricDifference = function symmetricDifference(other) {
	  var O = aSet$1(this);
	  var keysIter = getSetRecord$1(other).getIterator();
	  var result = clone$1(O);
	  iterateSimple$1(keysIter, function (e) {
	    if (has$3(O, e)) remove$1(result, e);
	    else add$1(result, e);
	  });
	  return result;
	};

	// Should get iterator record of a set-like object before cloning this
	// https://bugs.webkit.org/show_bug.cgi?id=289430
	var setMethodGetKeysBeforeCloningDetection = function (METHOD_NAME) {
	  try {
	    // eslint-disable-next-line es/no-set -- needed for test
	    var baseSet = new Set();
	    var setLike = {
	      size: 0,
	      has: function () { return true; },
	      keys: function () {
	        // eslint-disable-next-line es/no-object-defineproperty -- needed for test
	        return Object.defineProperty({}, 'next', {
	          get: function () {
	            baseSet.clear();
	            baseSet.add(4);
	            return function () {
	              return { done: true };
	            };
	          }
	        });
	      }
	    };
	    var result = baseSet[METHOD_NAME](setLike);

	    return result.size === 1 && result.values().next().value === 4;
	  } catch (error) {
	    return false;
	  }
	};

	var $$3 = _export;
	var symmetricDifference = setSymmetricDifference;
	var setMethodGetKeysBeforeCloning$1 = setMethodGetKeysBeforeCloningDetection;
	var setMethodAcceptSetLike$1 = setMethodAcceptSetLike$7;

	var FORCED$2 = !setMethodAcceptSetLike$1('symmetricDifference') || !setMethodGetKeysBeforeCloning$1('symmetricDifference');

	// `Set.prototype.symmetricDifference` method
	// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
	$$3({ target: 'Set', proto: true, real: true, forced: FORCED$2 }, {
	  symmetricDifference: symmetricDifference
	});

	var aSet = aSet$7;
	var add = setHelpers.add;
	var clone = setClone;
	var getSetRecord = getSetRecord$7;
	var iterateSimple = iterateSimple$7;

	// `Set.prototype.union` method
	// https://tc39.es/ecma262/#sec-set.prototype.union
	var setUnion = function union(other) {
	  var O = aSet(this);
	  var keysIter = getSetRecord(other).getIterator();
	  var result = clone(O);
	  iterateSimple(keysIter, function (it) {
	    add(result, it);
	  });
	  return result;
	};

	var $$2 = _export;
	var union = setUnion;
	var setMethodGetKeysBeforeCloning = setMethodGetKeysBeforeCloningDetection;
	var setMethodAcceptSetLike = setMethodAcceptSetLike$7;

	var FORCED$1 = !setMethodAcceptSetLike('union') || !setMethodGetKeysBeforeCloning('union');

	// `Set.prototype.union` method
	// https://tc39.es/ecma262/#sec-set.prototype.union
	$$2({ target: 'Set', proto: true, real: true, forced: FORCED$1 }, {
	  union: union
	});

	var uncurryThis = functionUncurryThis;

	// eslint-disable-next-line es/no-weak-map -- safe
	var WeakMapPrototype = WeakMap.prototype;

	var weakMapHelpers = {
	  // eslint-disable-next-line es/no-weak-map -- safe
	  WeakMap: WeakMap,
	  set: uncurryThis(WeakMapPrototype.set),
	  get: uncurryThis(WeakMapPrototype.get),
	  has: uncurryThis(WeakMapPrototype.has),
	  remove: uncurryThis(WeakMapPrototype['delete'])
	};

	var $$1 = _export;
	var WeakMapHelpers$2 = weakMapHelpers;
	var IS_PURE = isPure;

	var get$1 = WeakMapHelpers$2.get;
	var has$2 = WeakMapHelpers$2.has;
	var set$2 = WeakMapHelpers$2.set;

	// `WeakMap.prototype.getOrInsert` method
	// https://tc39.es/ecma262/#sec-weakmap.prototype.getorinsert
	$$1({ target: 'WeakMap', proto: true, real: true, forced: IS_PURE }, {
	  getOrInsert: function getOrInsert(key, value) {
	    if (has$2(this, key)) return get$1(this, key);
	    set$2(this, key, value);
	    return value;
	  }
	});

	var has$1 = weakMapHelpers.has;

	// Perform ? RequireInternalSlot(M, [[WeakMapData]])
	var aWeakMap$1 = function (it) {
	  has$1(it);
	  return it;
	};

	var WeakMapHelpers$1 = weakMapHelpers;

	var weakmap = new WeakMapHelpers$1.WeakMap();
	var set$1 = WeakMapHelpers$1.set;
	var remove = WeakMapHelpers$1.remove;

	var aWeakKey$1 = function (key) {
	  set$1(weakmap, key, 1);
	  remove(weakmap, key);
	  return key;
	};

	var $ = _export;
	var aCallable = aCallable$c;
	var aWeakMap = aWeakMap$1;
	var aWeakKey = aWeakKey$1;
	var WeakMapHelpers = weakMapHelpers;

	var get = WeakMapHelpers.get;
	var has = WeakMapHelpers.has;
	var set = WeakMapHelpers.set;

	var FORCED = !function () {
	  try {
	    // eslint-disable-next-line es/no-weak-map, no-throw-literal -- testing
	    if (WeakMap.prototype.getOrInsertComputed) new WeakMap().getOrInsertComputed(1, function () { throw 1; });
	  } catch (error) {
	    // FF144 Nightly - Beta 3 bug
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=1988369
	    return error instanceof TypeError;
	  }
	}();

	// `WeakMap.prototype.getOrInsertComputed` method
	// https://tc39.es/ecma262/#sec-weakmap.prototype.getorinsertcomputed
	$({ target: 'WeakMap', proto: true, real: true, forced: FORCED }, {
	  getOrInsertComputed: function getOrInsertComputed(key, callbackfn) {
	    aWeakMap(this);
	    aWeakKey(key);
	    aCallable(callbackfn);
	    if (has(this, key)) return get(this, key);
	    var value = callbackfn(key);
	    set(this, key, value);
	    return value;
	  }
	});

	/*!
	 * SJS 6.15.1
	 */

	!function(){function e(e,t){return (t||"")+" (SystemJS https://github.com/systemjs/systemjs/blob/main/docs/errors.md#"+e+")"}function t(e,t){if(-1!==e.indexOf("\\")&&(e=e.replace(S,"/")),"/"===e[0]&&"/"===e[1])return t.slice(0,t.indexOf(":")+1)+e;if("."===e[0]&&("/"===e[1]||"."===e[1]&&("/"===e[2]||2===e.length&&(e+="/"))||1===e.length&&(e+="/"))||"/"===e[0]){var r,n=t.slice(0,t.indexOf(":")+1);if(r="/"===t[n.length+1]?"file:"!==n?(r=t.slice(n.length+2)).slice(r.indexOf("/")+1):t.slice(8):t.slice(n.length+("/"===t[n.length])),"/"===e[0])return t.slice(0,t.length-r.length-1)+e;for(var i=r.slice(0,r.lastIndexOf("/")+1)+e,o=[],s=-1,c=0;c<i.length;c++)-1!==s?"/"===i[c]&&(o.push(i.slice(s,c+1)),s=-1):"."===i[c]?"."!==i[c+1]||"/"!==i[c+2]&&c+2!==i.length?"/"===i[c+1]||c+1===i.length?c+=1:s=c:(o.pop(),c+=2):s=c;return -1!==s&&o.push(i.slice(s)),t.slice(0,t.length-r.length)+o.join("")}}function r(e,r){return t(e,r)||(-1!==e.indexOf(":")?e:t("./"+e,r))}function n(e,r,n,i,o){for(var s in e){var f=t(s,n)||s,a=e[s];if("string"==typeof a){var l=u(i,t(a,n)||a,o);l?r[f]=l:c("W1",s,a);}}}function i(e,t,i){var o;for(o in e.imports&&n(e.imports,i.imports,t,i,null),e.scopes||{}){var s=r(o,t);n(e.scopes[o],i.scopes[s]||(i.scopes[s]={}),t,i,s);}for(o in e.depcache||{})i.depcache[r(o,t)]=e.depcache[o];for(o in e.integrity||{})i.integrity[r(o,t)]=e.integrity[o];}function o(e,t){if(t[e])return e;var r=e.length;do{var n=e.slice(0,r+1);if(n in t)return n}while(-1!==(r=e.lastIndexOf("/",r-1)))}function s(e,t){var r=o(e,t);if(r){var n=t[r];if(null===n)return;if(!(e.length>r.length&&"/"!==n[n.length-1]))return n+e.slice(r.length);c("W2",r,n);}}function c(t,r,n){console.warn(e(t,[n,r].join(", ")));}function u(e,t,r){for(var n=e.scopes,i=r&&o(r,n);i;){var c=s(t,n[i]);if(c)return c;i=o(i.slice(0,i.lastIndexOf("/")),n);}return s(t,e.imports)||-1!==t.indexOf(":")&&t}function f(){this[b]={};}function a(t,r,n,i){var o=t[b][r];if(o)return o;var s=[],c=Object.create(null);j&&Object.defineProperty(c,j,{value:"Module"});var u=Promise.resolve().then((function(){return t.instantiate(r,n,i)})).then((function(n){if(!n)throw Error(e(2,r));var i=n[1]((function(e,t){o.h=!0;var r=!1;if("string"==typeof e)e in c&&c[e]===t||(c[e]=t,r=!0);else {for(var n in e)t=e[n],n in c&&c[n]===t||(c[n]=t,r=!0);e&&e.__esModule&&(c.__esModule=e.__esModule);}if(r)for(var i=0;i<s.length;i++){var u=s[i];u&&u(c);}return t}),2===n[1].length?{import:function(e,n){return t.import(e,r,n)},meta:t.createContext(r)}:void 0);return o.e=i.execute||function(){},[n[0],i.setters||[],n[2]||[]]}),(function(e){throw o.e=null,o.er=e,e})),f=u.then((function(e){return Promise.all(e[0].map((function(n,i){var o=e[1][i],s=e[2][i];return Promise.resolve(t.resolve(n,r)).then((function(e){var n=a(t,e,r,s);return Promise.resolve(n.I).then((function(){return o&&(n.i.push(o),!n.h&&n.I||o(n.n)),n}))}))}))).then((function(e){o.d=e;}))}));return o=t[b][r]={id:r,i:s,n:c,m:i,I:u,L:f,h:!1,d:void 0,e:void 0,er:void 0,E:void 0,C:void 0,p:void 0}}function l(e,t,r,n){if(!n[t.id])return n[t.id]=!0,Promise.resolve(t.L).then((function(){return t.p&&null!==t.p.e||(t.p=r),Promise.all(t.d.map((function(t){return l(e,t,r,n)})))})).catch((function(e){if(t.er)throw e;throw t.e=null,e}))}function h(e,t){return t.C=l(e,t,t,{}).then((function(){return d(e,t,{})})).then((function(){return t.n}))}function d(e,t,r){function n(){try{var e=o.call(I);if(e)return e=e.then((function(){t.C=t.n,t.E=null;}),(function(e){throw t.er=e,t.E=null,e})),t.E=e;t.C=t.n,t.L=t.I=void 0;}catch(r){throw t.er=r,r}}if(!r[t.id]){if(r[t.id]=!0,!t.e){if(t.er)throw t.er;return t.E?t.E:void 0}var i,o=t.e;return t.e=null,t.d.forEach((function(n){try{var o=d(e,n,r);o&&(i=i||[]).push(o);}catch(s){throw t.er=s,s}})),i?Promise.all(i).then(n):n()}}function v(){[].forEach.call(document.querySelectorAll("script"),(function(t){if(!t.sp)if("systemjs-module"===t.type){if(t.sp=!0,!t.src)return;System.import("import:"===t.src.slice(0,7)?t.src.slice(7):r(t.src,p)).catch((function(e){if(e.message.indexOf("https://github.com/systemjs/systemjs/blob/main/docs/errors.md#3")>-1){var r=document.createEvent("Event");r.initEvent("error",!1,!1),t.dispatchEvent(r);}return Promise.reject(e)}));}else if("systemjs-importmap"===t.type){t.sp=!0;var n=t.src?(System.fetch||fetch)(t.src,{integrity:t.integrity,priority:t.fetchPriority,passThrough:!0}).then((function(e){if(!e.ok)throw Error(e.status);return e.text()})).catch((function(r){return r.message=e("W4",t.src)+"\n"+r.message,console.warn(r),"function"==typeof t.onerror&&t.onerror(),"{}"})):t.innerHTML;M=M.then((function(){return n})).then((function(r){!function(t,r,n){var o={};try{o=JSON.parse(r);}catch(s){console.warn(Error(e("W5")));}i(o,n,t);}(R,r,t.src||p);}));}}));}var p,m="undefined"!=typeof Symbol,g="undefined"!=typeof self,y="undefined"!=typeof document,E=g?self:commonjsGlobal;if(y){var w=document.querySelector("base[href]");w&&(p=w.href);}if(!p&&"undefined"!=typeof location){var O=(p=location.href.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==O&&(p=p.slice(0,O+1));}var x,S=/\\/g,j=m&&Symbol.toStringTag,b=m?Symbol():"@",P=f.prototype;P.import=function(e,t,r){var n=this;return t&&"object"==typeof t&&(r=t,t=void 0),Promise.resolve(n.prepareImport()).then((function(){return n.resolve(e,t,r)})).then((function(e){var t=a(n,e,void 0,r);return t.C||h(n,t)}))},P.createContext=function(e){var t=this;return {url:e,resolve:function(r,n){return Promise.resolve(t.resolve(r,n||e))}}},P.register=function(e,t,r){x=[e,t,r];},P.getRegister=function(){var e=x;return x=void 0,e};var I=Object.freeze(Object.create(null));E.System=new f;var L,C,M=Promise.resolve(),R={imports:{},scopes:{},depcache:{},integrity:{}},T=y;if(P.prepareImport=function(e){return (T||e)&&(v(),T=!1),M},P.getImportMap=function(){return JSON.parse(JSON.stringify(R))},y&&(v(),window.addEventListener("DOMContentLoaded",v)),P.addImportMap=function(e,t){i(e,t||p,R);},y){window.addEventListener("error",(function(e){J=e.filename,W=e.error;}));var _=location.origin;}P.createScript=function(e){var t=document.createElement("script");t.async=!0,e.indexOf(_+"/")&&(t.crossOrigin="anonymous");var r=R.integrity[e];return r&&(t.integrity=r),t.src=e,t};var J,W,q={},N=P.register;P.register=function(e,t){if(y&&"loading"===document.readyState&&"string"!=typeof e){var r=document.querySelectorAll("script[src]"),n=r[r.length-1];if(n){L=e;var i=this;C=setTimeout((function(){q[n.src]=[e,t],i.import(n.src);}));}}else L=void 0;return N.call(this,e,t)},P.instantiate=function(t,r){var n=q[t];if(n)return delete q[t],n;var i=this;return Promise.resolve(P.createScript(t)).then((function(n){return new Promise((function(o,s){n.addEventListener("error",(function(){s(Error(e(3,[t,r].join(", "))));})),n.addEventListener("load",(function(){if(document.head.removeChild(n),J===t)s(W);else {var e=i.getRegister(t);e&&e[0]===L&&clearTimeout(C),o(e);}})),document.head.appendChild(n);}))}))},P.shouldFetch=function(){return !1},"undefined"!=typeof fetch&&(P.fetch=fetch);var k=P.instantiate,A=/^(text|application)\/(x-)?javascript(;|$)/;P.instantiate=function(t,r,n){var i=this;return this.shouldFetch(t,r,n)?this.fetch(t,{credentials:"same-origin",integrity:R.integrity[t],meta:n}).then((function(n){if(!n.ok)throw Error(e(7,[n.status,n.statusText,t,r].join(", ")));var o=n.headers.get("content-type");if(!o||!A.test(o))throw Error(e(4,o));return n.text().then((function(e){return e.indexOf("//# sourceURL=")<0&&(e+="\n//# sourceURL="+t),(0, eval)(e),i.getRegister(t)}))})):k.apply(this,arguments)},P.resolve=function(r,n){return u(R,t(r,n=n||p)||r,n)||function(t,r){throw Error(e(8,[t,r].join(", ")))}(r,n)};var F=P.instantiate;P.instantiate=function(e,t,r){var n=R.depcache[e];if(n)for(var i=0;i<n.length;i++)a(this,this.resolve(n[i],e),e);return F.call(this,e,t,r)},g&&"function"==typeof importScripts&&(P.instantiate=function(e){var t=this;return Promise.resolve().then((function(){return importScripts(e),t.getRegister(e)}))});}();

})();
