"use strict";

var fs = require('fs'),
    path = require('path'),
    extend = require('xtend');

module.exports = function(loc, opts) {
  var babelrc;

  opts = opts !== undefined ? opts : {};

  try {
    babelrc = JSON.parse(fs.readFileSync(path.join(loc, '.babelrc'), 'utf-8'));
    opts = extend(babelrc, opts);
  } catch (e) {}

  return opts;
};
