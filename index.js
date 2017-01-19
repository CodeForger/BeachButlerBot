const axios = require('axios');

exports.handleBotUpdate = (event, context, callback) => {
  console.log(`event ${JSON.stringify(event)}`)
  //console.log(`context ${JSON.stringify(context)}`)
  const {chat, new_chat_member} = event.body

  if (new_chat_member) {
    _handleNewJoiner(chat.id, new_chat_member, callback)
  }
}

const _handleNewJoiner = (chatId, newMember , callback) => {
  axios.post('https://api.telegram.org/bot307190391:AAHnTchavq2eg7KVXKgKXVxpIifDBayAnUo/sendMessage', {
    chat_id: chatId,
    text: '<a href="http://www.example.com/">inline URL</a><pre>pre-formatted fixed-width code block</pre>'
  }).then(response => {
    callback(null, {
      statusCode: 200,
      body: "OK"
    })
  })
}
