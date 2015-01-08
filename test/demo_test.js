let assert = require('power-assert')

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getAge() {
    return this.age
  }
}

describe("Person", ()=>{
  let alice = new Person("alice", 3)
  let bob = new Person("bob", 5)
  it("#getAge", ()=>{
    assert(alice.getAge() === 3)
  })
  it("#name", ()=>{
    assert(alice.name === "alice")
  })
  // failed
  it("#mistake", ()=>{
    assert(alice.name === bob.name)
  })
})
