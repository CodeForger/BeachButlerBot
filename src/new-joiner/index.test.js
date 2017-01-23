/* globals describe, it */
const expect = require('chai').expect
const NewJoiner = require('./index')

describe("new-joiner module", function() {
  describe("#getWelcomeMessage", function() {
    const newMember = {first_name: 'alice', username: 'alice'}
    it("should return the welcome message", function() {
      const expected = `Welcome alice! (@alice)\n\n${NewJoiner.getOnBoardingMessage()}`
      expect(NewJoiner.getWelcomeMessage(newMember)).to.equal(expected)
    })
  })

  describe("#getOnBoardingMessage", function() {
    it("should return Onboarding Doc", function() {
      expect(NewJoiner.getOnBoardingMessage()).to.contain('Here are some links you may find helpful')
    })
  })
})
