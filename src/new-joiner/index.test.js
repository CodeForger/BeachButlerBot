/* globals describe, it */
const expect = require('chai').expect
const NewJoiner = require('./index')

describe("new-joiner module", function () {
  describe("#getWelcomeMessage", function () {
    it("should return the welcome message", function () {
      expect(NewJoiner.getWelcomeMessage()).to.equal("Welcome")
    })
  })
})
