let assert = require("power-assert")
let Person = require("../demo/person")

describe("Person", ()=>{
  let name = "Alice"
  let age = 4
  let alice = new Person(name, age)
  it("alice get age", ()=>{
    assert.equal(alice.getAge(), age)
  })
  it("alice greet", ()=>{
    assert.equal(alice.greet(), `Hello! I am ${name}. My age is ${age}`)
  })
})

