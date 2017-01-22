/* globals describe, it */
const expect = require('chai').expect
const Helper = require('./index')

describe("helper module", function () {
  describe("#extractCommand", function () {
    it("should extract valid command", function () {
      const textContainsCommands = ["/help", "/help@twsg_bot", "/help random text"]
      textContainsCommands.forEach(function(text) {
        expect(Helper.extractCommand(text)).to.equal("help")
      })
    })

    it("should return false when no command detected", function () {
      const noCommandText = ["help","help@twsg_bot", "help random text"]
      noCommandText.forEach(function(text) {
        expect(Helper.extractCommand(text)).to.be.false
      })
    })
  })

})
