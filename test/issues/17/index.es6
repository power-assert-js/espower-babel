let assert = require('power-assert')

describe("Loaded compiler", ()=>{
  it("to be defined .es6", ()=>{
    assert.ok(require.extensions['.es6'])
  })
})