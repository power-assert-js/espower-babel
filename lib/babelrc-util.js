"use strict";

var fs = require('fs'),
    path = require('path'),
    extend = require('xtend');

function resolveBabelrc(loc, opts) {
    var babelrc;
    opts = opts !== undefined ? opts : {};

    try {
        babelrc = JSON.parse(fs.readFileSync(path.join(loc, '.babelrc'), 'utf-8'));
        opts = extend(babelrc, opts);
    } catch (e) {
        console.error(e.stack);
    }

    return opts;
}
module.exports = {
    resolveBabelrc: resolveBabelrc
};
