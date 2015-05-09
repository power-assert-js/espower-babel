// LICENSE : MIT
"use strict";
import assert from "power-assert"
import {shouldIgnoreByBabel} from "../../lib/babelrc-util"

describe("babelrc-util", function () {
    describe("#shouldIgnoreByBabel", function () {
        context("when has `only` option", function () {
            it("should ignore the other files", function () {
                assert(!shouldIgnoreByBabel("lib/a.js", {
                    only: ["lib/*.js"]
                }));
                assert(shouldIgnoreByBabel("ignore/a.js", {
                    only: ["lib/*.js"]
                }));
            });
        });
        context("when has `ignore` option", function () {
            it("should ignore by the option", function () {
                assert(shouldIgnoreByBabel("lib/a.js", {
                    ignore: ["lib/*.js"]
                }));
                assert(!shouldIgnoreByBabel("only/a.js", {
                    ignore: ["lib/*.js"]
                }));
            });
        });
        context("when has `ignore` and `only", function () {
            it("should follow only -> ignore", function () {
                assert(!shouldIgnoreByBabel("lib/a.js", {
                    only: ["lib/*.js"],
                    ignore: ["lib/ignore/*.js"]
                }));
                assert(shouldIgnoreByBabel("lib/ignore/a.js", {
                    only: ["lib/*.js"],
                    ignore: ["lib/ignore/*.js"]
                }));
                assert(shouldIgnoreByBabel("other/a.js", {
                    only: ["lib/*.js"],
                    ignore: ["lib/ignore/*.js"]
                }));
            });
        });
    });
});