const expect = require('chai').expect
const Sinon = require('sinon')

const HandleBotUpdate = require('../index').handleBotUpdate
const Helper = require('./helper')
const NewJoiner = require('./new-joiner')

const NewJoinerFixture = require('../fixtures/newJoiner.json')
const CommandFixture = require('../fixtures/command.json')

describe("HandleBotUpdate", function() {
  const context = ''
  const callback = Sinon.spy()

  it("should call NewJoiner when there's new joiner", function() {
    const welcomeStub = Sinon.stub(NewJoiner, 'getWelcomeMessage')
    HandleBotUpdate(NewJoinerFixture, context, callback)
    expect(welcomeStub.calledWith({ id: 227125721, first_name: 'Alice', username: 'alice' })).to.be.true
    welcomeStub.restore()
  })

  it("should call command handler when there's a command", function() {
    const extractCommand = Sinon.stub(Helper, 'extractCommand').returns('groups')
    const groupStub = Sinon.stub(NewJoiner, 'getTelegramGroupsMessage')
    HandleBotUpdate(CommandFixture, context, callback)
    expect(extractCommand.calledWith('/groups@twsg_bot')).to.be.true
    groupStub.restore()
    extractCommand.restore()
  })
})
