// this test "hello" module which written by ES6 if transform by babel
import assert from "power-assert"
import fn from "../lib/hello"
describe("require-esmodule", ()=> {
    it("should return `hello`", ()=> {
        assert.equal(fn(), `hello`);
    });
});