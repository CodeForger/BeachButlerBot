/* globals describe, it */
const expect = require('chai').expect
const NewJoiner = require('./index')
const Sinon = require('sinon')
const DriveClient = require('../drive-client')

describe("new-joiner module", function() {

  describe("#getWelcomeMessage", function() {
    const newMember = {first_name: 'alice', username: 'alice'}
    it("should return the welcome message", function() {
      const expected = 'Welcome alice! (@alice)'
      expect(NewJoiner.getWelcomeMessage(newMember)).to.contain(expected)
    })
  })

  describe("#getOnBoardingMessage", function() {
    
  })
})
