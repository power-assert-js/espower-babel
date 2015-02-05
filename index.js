'use strict';
var to5 = require('6to5-core');
var fs = require("fs");
var minimatch = require('minimatch');
var extend = require('xtend');
var convert = require('convert-source-map');
var espowerSource = require('espower-source');
var extensions = require.extensions,
    originalLoader = extensions['.js'];
function espower6to5(options) {
    var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/',
        pattern = options.cwd + separator + options.pattern;

    extensions['.js'] = function (localModule, filepath) {
        if (minimatch(filepath, pattern)) {
            var result5 = to5.transform(fs.readFileSync(filepath, 'utf-8'), {filename: filepath});
            var resultCode = espowerSource(result5.code, filepath, extend(options.espowerOptions, {sourceMap: result5.map}));
            localModule._compile(resultCode, filepath);
        } else {
            originalLoader(localModule, filepath);
        }
    };
}

module.exports = espower6to5;
