require("babel-polyfill")

let assert = require('power-assert')

describe("ES7 async/await", ()=>{
  it("works", async()=>{

    assert(await Promise.resolve("OK") === "OK")
  })
})
