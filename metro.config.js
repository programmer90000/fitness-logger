const { getDefaultConfig } = require("@expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
    "realm": path.resolve(__dirname, "node_modules/realm"),
};

config.resolver.sourceExts.push("cjs");

module.exports = config;
