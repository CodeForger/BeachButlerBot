'use strict';

const Axios = require('axios')
const Helper = require('./src/helper')
const NewJoiner = require('./src/new-joiner')

const BOT_TOKEN = process.env.BOT_TOKEN
const TELEBOT_SEND_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

exports.handleBotUpdate = (event, context, callback) => {

  try {
    const body = JSON.parse(event.body).message

    console.log(`event ${JSON.stringify(body)}`)

    const chat = body.chat
    const newMember = body.new_chat_member
    const botCommand = body.text

    let reply

    if (newMember) {
      reply = NewJoiner.getWelcomeMessage(newMember)
    } else if (botCommand) {
      reply = commandHandler(Helper.extractCommand(botCommand))
    }

    if (reply) {
      reply.then(message => {
        sendMessage(chat.id, message, callback)
      })
      .catch(e => {
        callback(null, {})
      })
    } else {
      callback(null, {})
    }

  } catch (e) {
    console.log(e)
    callback(null, {})
  }

}

function sendMessage(chatID, reply, callback) {
  Axios.post(TELEBOT_SEND_URL, {
    chat_id: chatID,
    text: reply,
    parse_mode: 'HTML'
  })
  .then( () => {callback(null, {})} )
  .catch( e => {throw new Error('request error')} )
}

function commandHandler(command) {
  switch (command.toLowerCase()) {
    case 'onboarding':
      return NewJoiner.getOnBoardingMessage()

    case 'groups':
      return NewJoiner.getTelegramGroupsMessage()

    default:
      return false
  }
}
