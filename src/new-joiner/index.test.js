'use strict'

const expect = require('chai').expect
const Sinon = require('sinon')
const NewJoiner = require('./index')
const DriveClient = require('../drive-client')

describe("new-joiner", function() {

  const ONBOARDING_MESSAGE_FILE_ID = 'onboarding-message-file-id'
  const TELEGRAM_GROUPS_FILE_ID = 'telegram-groups-file-id'

  const ONBOARDING_MESSAGE = 'onboarding-message'
  const TELEGRAM_GROUPS_MESSAGE = 'telegram-groups-message'

  let originalEnv

  before(function () {
    originalEnv = process.env

    process.env.ONBOARDING_MESSAGE_FILE_ID = ONBOARDING_MESSAGE_FILE_ID
    process.env.TELEGRAM_GROUPS_FILE_ID = TELEGRAM_GROUPS_FILE_ID

    Sinon.stub(DriveClient, 'readFileFromDrive')
      .withArgs(ONBOARDING_MESSAGE_FILE_ID)
      .returns(new Promise(function (resolve) {
        resolve(ONBOARDING_MESSAGE)
      }))

      .withArgs(TELEGRAM_GROUPS_FILE_ID)
      .returns(new Promise(function (resolve) {
        resolve(TELEGRAM_GROUPS_MESSAGE)
      }))
  })

  after(function () {
    process.env = originalEnv
  })

  describe("#getWelcomeMessage()", function() {
    const newMember = {first_name: 'Alice', username: 'alice'}

    it("should return the welcome message", function() {
      return NewJoiner.getWelcomeMessage(newMember)
        .then(resp => {
          expect(resp)
            .to.equal(`Welcome ${newMember.first_name}! (@${newMember.username})\n\n${getExpectedOnboardingMessage()}`)
        })
    })
  })

  describe('getOnBoardingMessage()', function () {

    it('should return onboarding & telegram groups message', function () {
      return NewJoiner.getOnBoardingMessage()
        .then(resp => {
          expect(resp).to.equal(getExpectedOnboardingMessage())
        })
    })

  })

  describe('#getTelegramGroupsMessage()', function () {
    
    it('should return telegram groups message', function () {
      return NewJoiner.getTelegramGroupsMessage()
        .then(resp => {
          expect(resp).to.equal(TELEGRAM_GROUPS_MESSAGE)
        })
    })

  })

  function getExpectedOnboardingMessage() {
    return `${ONBOARDING_MESSAGE}\n\n${TELEGRAM_GROUPS_MESSAGE}`
  }

})
