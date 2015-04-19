'use strict';
var babel = require('babel-core');
var fs = require("fs");
var minimatch = require('minimatch');
var extend = require('xtend');
var createEspowerPlugin = require('babel-plugin-espower/create');
var extensions = require.extensions,
    originalLoader = extensions['.js'];
function espowerBabel(options) {
    var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/',
        pattern = options.cwd + separator + options.pattern,
        babelrc = options.babelrc || {};

    extensions['.js'] = function (localModule, filepath) {
        if (minimatch(filepath, pattern)) {
            var babelOptions = extend(babelrc, {filename: filepath});
            babelOptions.plugins = babelOptions.plugins || [];
            var espowerPluginExists = babelOptions.plugins.some(function (plugin) {
                var pluginName = typeof plugin === 'string' ? plugin : plugin.key;
                return pluginName === 'babel-plugin-espower';
            });
            if (!espowerPluginExists) {
                babelOptions.plugins.push(createEspowerPlugin(options.espowerOptions));
            }
            var result = babel.transform(fs.readFileSync(filepath, 'utf-8'), babelOptions);
            localModule._compile(result.code, filepath);
        } else {
            originalLoader(localModule, filepath);
        }
    };
}

module.exports = espowerBabel;
