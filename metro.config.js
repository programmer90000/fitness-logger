const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
  ...(defaultConfig.resolver.extraNodeModules || {}),
  "realm": path.resolve(__dirname, "node_modules/realm"),
};

if (!defaultConfig.resolver.sourceExts.includes("cjs")) {
  defaultConfig.resolver.sourceExts.push("cjs");
}

module.exports = mergeConfig(defaultConfig, {});
