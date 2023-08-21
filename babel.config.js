module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {unstable_transformProfile: 'hermes-stable'},
      ]
    ],
    //Warning: Reanimated plugin has to be listed last!!!
    plugins: [
        [
          'module-resolver',
          {
            alias: {
              '@': './src',
              '@magic-ext/solana': './node_modules/@magic-ext/solana/dist/cjs/index.js'
            }
          }
        ],
        'react-native-reanimated/plugin'
    ]
  };
};
