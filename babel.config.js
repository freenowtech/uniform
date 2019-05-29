module.exports = function(api) {
    const plugins = [];
    if (api.env('test')) {
        plugins.push('@babel/plugin-transform-flow-strip-types');
    }
    const ignore = api.env('test') ? [] : ['**/*.spec.js'];

    api.cache(true);

    return {
        ignore,
        plugins,
        presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-flow',
        ],
    };
};
