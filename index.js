var postcss = require('postcss');

module.exports = postcss.plugin('postcss-scopify', function (opts) {
    opts = opts || {};

    // Work with options here

    return function (css) {

        // Transform CSS AST here

    };
});
