"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (context) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var nodeEnv = process.env.NODE_ENV;
  var _opts$loose = opts.loose,
      loose = _opts$loose === void 0 ? false : _opts$loose,
      _opts$useBuiltIns = opts.useBuiltIns,
      useBuiltIns = _opts$useBuiltIns === void 0 ? 'usage' : _opts$useBuiltIns,
      _opts$modules = opts.modules,
      modules = _opts$modules === void 0 ? 'auto' : _opts$modules,
      _opts$targets = opts.targets,
      targets = _opts$targets === void 0 ? {
    browsers: ['last 2 versions'],
    node: 'current'
  } : _opts$targets,
      _opts$corejs = opts.corejs,
      corejs = _opts$corejs === void 0 ? 3 : _opts$corejs,
      _opts$env = opts.env,
      env = _opts$env === void 0 ? {} : _opts$env;
  var transformRuntime = 'transformRuntime' in opts ? opts.transformRuntime : {};
  var exclude = ['transform-typeof-symbol', 'transform-unicode-regex', 'transform-sticky-regex', 'transform-new-target', 'transform-modules-umd', 'transform-modules-systemjs', 'transform-modules-amd', 'transform-literals'];
  var plugins = [require.resolve('babel-plugin-react-require'), require.resolve('@babel/plugin-syntax-dynamic-import'), [require.resolve('@babel/plugin-proposal-object-rest-spread'), {
    loose: true,
    useBuiltIns: true
  }], require.resolve('@babel/plugin-proposal-optional-catch-binding'), require.resolve('@babel/plugin-proposal-async-generator-functions'), [require.resolve('@babel/plugin-proposal-decorators'), {
    legacy: true
  }], [require.resolve('@babel/plugin-proposal-class-properties'), {
    loose: true
  }], require.resolve('@babel/plugin-proposal-export-namespace-from'), require.resolve('@babel/plugin-proposal-export-default-from'), [require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'), {
    loose: loose
  }], [require.resolve('@babel/plugin-proposal-optional-chaining'), {
    loose: loose
  }], [require.resolve('@babel/plugin-proposal-pipeline-operator'), {
    proposal: 'minimal'
  }], require.resolve('@babel/plugin-proposal-do-expressions'), require.resolve('@babel/plugin-proposal-function-bind')];

  if (nodeEnv !== 'test' && transformRuntime) {
    plugins.push([require.resolve('@babel/plugin-transform-runtime'), transformRuntime]);
  }

  if (nodeEnv === 'production') {
    plugins.push(require.resolve('babel-plugin-transform-react-remove-prop-types'));
  }

  return {
    presets: [[require.resolve('@babel/preset-env'), _objectSpread({
      loose: loose,
      useBuiltIns: useBuiltIns,
      targets: targets,
      modules: modules,
      exclude: exclude,
      corejs: corejs
    }, env)], require.resolve('@babel/preset-react'), require.resolve('@babel/preset-flow')],
    plugins: plugins
  };
};