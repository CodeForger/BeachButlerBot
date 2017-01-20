const axios = require('axios')

const TELEBOT_SEND_URL = 'https://api.telegram.org/bot307190391:AAHnTchavq2eg7KVXKgKXVxpIifDBayAnUo/sendMessage'
const RESPONSE_OK = {statusCode: 200, body: "OK"}

exports.handleBotUpdate = (event, context, callback) => {
  console.log(`event ${event.body}`)
  //console.log(`context ${JSON.stringify(context)}`)
  try {
    const body = JSON.parse(event.body).message
    const chat = body.chat
    const newMember = body.new_chat_member

    let reply

    if (newMember) {
      reply = _handleNewJoiner(newMember)
    }

    if (reply) {
      axios.post(TELEBOT_SEND_URL, {
        chat_id: chat.id,
        text: reply,
        parse_mode: 'HTML'
      }).then(_ => {callback(null, RESPONSE_OK)})
    }


  } catch (e) {
    console.log(e);
  }

}


const _handleNewJoiner = (newMember) => {

  return
`
Welcome ${newMember.first_name} @${newMember.username}!

${_getOnboardingMsg()}
`
}

const _getOnboardingMsg() {
  const ONBOARDING_DOC = 'https://thoughtworks.jiveon.com/groups/people-space-singapore/blog/2016/12/19/welcome-to-thoughtworks-singapore'
  const IOT = 'https://telegram.me/joinchat/AxfJpgZBKoZaSwK35ZJtpw'
  const P3 = 'https://telegram.me/joinchat/B0GDdQlbGI_jlYK7eXFlsw'
  const FOOTBALL = 'https://telegram.me/joinchat/BsuxAT3CT0iY-Zpqv9o_wQ'
  const BASKETBALL = 'https://telegram.me/joinchat/BBGuFAZirVJVjJhI8Cwcz'
  const PEDDLER = 'https://telegram.me/joinchat/BfDFnT70193_qzb5KpjEyw'
  const MSG =
`
Here are some links you may find helpful:
<a href="${ONBOARDING_DOC}">TWSG Onboarding Info Pack</a>

Please check out other TWSG telegram groups too:
<a href="${IOT}">IoT/ Makers Night</a>
<a href="${P3}">P3 Singapore</a>
<a href="${FOOTBALL}">Monday Night Football</a>
<a href="${BASKETBALL}">ThoughtWorks Basketball</a>
<a href="${PEDDLER}">TW Peddlers</a>
`
  return MSG
}
