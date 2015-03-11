'use strict';
var babel = require('babel-core');
var fs = require("fs");
var minimatch = require('minimatch');
var extend = require('xtend');
var convert = require('convert-source-map');
var espowerSource = require('espower-source');
var extensions = require.extensions,
    originalLoader = extensions['.js'];
function espowerBabel(options) {
    var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/',
        pattern = options.cwd + separator + options.pattern,
        babelrc = options.babelrc || {};

    extensions['.js'] = function (localModule, filepath) {
        if (minimatch(filepath, pattern)) {
            var result5 = babel.transform(fs.readFileSync(filepath, 'utf-8'), extend(babelrc, {filename: filepath}));
            var resultCode = espowerSource(result5.code, filepath, extend(options.espowerOptions, {sourceMap: result5.map}));
            localModule._compile(resultCode, filepath);
        } else {
            originalLoader(localModule, filepath);
        }
    };
}

module.exports = espowerBabel;
