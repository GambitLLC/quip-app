const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = (async () => {
    defaultConfig.transformer.babelTransformerPath = require.resolve(
        'react-native-svg-transformer'
    );

    defaultConfig.resolver = {
        sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
        assetExts: ['glb', 'gltf', 'png', 'jpg', 'svg', 'otf', 'ttf', "html", "css", "ico", "data", "wasm", "gjs"],
    }

    return defaultConfig;
})();
