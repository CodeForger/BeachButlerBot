'use strict'

const google = require('googleapis');
const drive = google.drive('v3');

function readFileFromDrive(fileId, callback) {
  const jwtClient = createGoogleClient();

  jwtClient.authorize(function (err) {
    if (err) {
      callback(err, null)
    }

    drive.files.get({
      fileId: fileId,
      auth: jwtClient,
      alt: 'media'
    }, function (err, resp) {
      callback(null, resp)
    })
  })
}

function createGoogleClient() {
  const jsonKey = JSON.parse(process.env.JSON_KEY)

  return new google.auth.JWT(
    jsonKey.client_email,
    null,
    jsonKey.private_key,
    ['https://www.googleapis.com/auth/drive.readonly'],
    null
  )
}

exports = {
  readFileFromDrive
}
