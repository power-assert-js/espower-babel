require("babel/polyfill")

let assert = require('power-assert')

describe("ES7 async/await", ()=>{
  it("works", async()=>{
    let ok = await Promise.resolve("OK")

    assert(ok === "OK")
  })
})
