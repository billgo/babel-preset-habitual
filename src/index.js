module.exports = function(context, opts = {}) {
  const nodeEnv = process.env.NODE_ENV;
  const {
    loose = false,
    useBuiltIns = false,
    modules = 'auto',
    targets = {
      browsers: ['last 2 versions'],
      node: 'current',
    },
    env = {},
  } = opts;
  const transformRuntime = 'transformRuntime' in opts ? opts.transformRuntime : {};
  const exclude = [
    'transform-typeof-symbol',
    'transform-unicode-regex',
    'transform-sticky-regex',
    'transform-new-target',
    'transform-modules-umd',
    'transform-modules-systemjs',
    'transform-modules-amd',
    'transform-literals',
  ];

  const plugins = [
    require.resolve('babel-plugin-react-require'),
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    [require.resolve('@babel/plugin-proposal-object-rest-spread'), { loose: true, useBuiltIns: true }],
    require.resolve('@babel/plugin-proposal-optional-catch-binding'),
    require.resolve('@babel/plugin-proposal-async-generator-functions'),
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
    require.resolve('@babel/plugin-proposal-export-namespace-from'),
    require.resolve('@babel/plugin-proposal-export-default-from'),
    [require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'), { loose }],
    [require.resolve('@babel/plugin-proposal-optional-chaining'), { loose }],
    [
      require.resolve('@babel/plugin-proposal-pipeline-operator'),
      {
        proposal: 'minimal',
      },
    ],
    require.resolve('@babel/plugin-proposal-do-expressions'),
    require.resolve('@babel/plugin-proposal-function-bind'),
  ];

  if (nodeEnv !== 'test' && transformRuntime) {
    plugins.push([require.resolve('@babel/plugin-transform-runtime'), transformRuntime]);
  }

  if (nodeEnv === 'production') {
    plugins.push(require.resolve('babel-plugin-transform-react-remove-prop-types'));
  }

  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          loose,
          useBuiltIns,
          targets,
          modules,
          exclude,
          ...env,
        },
      ],
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-flow'),
    ],
    plugins,
  };
};