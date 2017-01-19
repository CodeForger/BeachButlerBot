exports.handleBotUpdate = (event, context, callback) => {
  console.log(`event ${JSON.stringify(event)}`)
  console.log(`context ${JSON.stringify(context)}`)
  callback(null, {
    statusCode: 200,
    body: "OK"
  })
}

