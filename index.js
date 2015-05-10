"use strict";
var babel = require("babel-core");
var shouldIgnoreByBabel = require("./lib/babelrc-util").shouldIgnoreByBabel;
var fs = require("fs");
var minimatch = require("minimatch");
var extend = require("xtend");
var createEspowerPlugin = require("babel-plugin-espower/create");
var extensions = require.extensions,
    originalLoader = extensions[".js"];
function espowerBabel(options) {
    var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/',
        pattern = options.cwd + separator + options.pattern,
        babelrc = options.babelrc || {};

    function useEspower(babelOptions) {
        babelOptions.plugins = babelOptions.plugins || [];
        var espowerPluginExists = babelOptions.plugins.some(function (plugin) {
            var pluginName = typeof plugin === "string" ? plugin : plugin.key;
            return pluginName === "babel-plugin-espower";
        });
        if (!espowerPluginExists) {
            babelOptions.plugins.push(createEspowerPlugin(options.espowerOptions));
        }
        return babelOptions;
    }

    extensions[".js"] = function (localModule, filepath) {
        var result;
        var babelOptions = extend(babelrc, {filename: filepath});
        // transform test files using espower's `pattern` value
        if (minimatch(filepath, pattern)) {
            result = babel.transform(fs.readFileSync(filepath, "utf-8"), useEspower(babelOptions));
            localModule._compile(result.code, filepath);
            return;
        }
        // transform the other files
        if (shouldIgnoreByBabel(filepath, babelOptions)) {
            originalLoader(localModule, filepath);
        } else {
            result = babel.transform(fs.readFileSync(filepath, "utf-8"), babelOptions);
            localModule._compile(result.code, filepath);
        }
    };
}

module.exports = espowerBabel;
