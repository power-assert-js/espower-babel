let empower = require("empower")
let formatter = require("power-assert-formatter")()
let assert = empower(require("assert"), formatter)
let expect = require("expect.js")

describe("power-assert message", ()=>{

  beforeEach(()=>{
    this.expectPowerAssertMessage = (body, expectedLines) => {
      try {
        body()
        expect().fail("AssertionError should be thrown")
      } catch(e) {
        expect(e.message.split("\n").slice(2, -1).join("\n")).to.eql(expectedLines)
      }
    }
  })

  it("Nested CallExpression with BinaryExpression: assert((three * (seven * ten)) === three)", ()=> {
    let one = 1
    let two = 2
    let three = 3
    let seven = 7
    let ten = 10
    let expected = 
`  assert(three * (seven * ten) === three)
         |     |  |     | |    |   |     
         |     |  |     | |    |   3     
         |     |  |     | 10   false     
         |     |  7     70               
         3     210                       
  
  [number] three
  => 3
  [number] three * (seven * ten)
  => 210`
    this.expectPowerAssertMessage(()=>{
      assert(three * (seven * ten) === three)
    }, expected
    )
  })

  it("equal with Literal and Identifier: assert.equal(1, minusOne)", ()=>{
    let minusOne = -1
    let expected =
`  assert.equal(1, minusOne)
                  |        
                  -1       `
    this.expectPowerAssertMessage(()=>{
      assert.equal(1, minusOne)
    }, expected
    )
  })
})
