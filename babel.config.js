module.exports = function(api) {
    api.cache(true);
    return {
        "presets": ["module:metro-react-native-babel-preset"],
        "plugins": [ ["@babel/plugin-transform-class-properties", { "loose": false }], ["@babel/plugin-transform-private-methods", { "loose": false }], ["@babel/plugin-transform-private-property-in-object", { "loose": false }], "nativewind/babel" ],
    };
};
