'use strict'

const google = require('googleapis');
const drive = google.drive('v3');

function readFileFromDrive(fileId) {
  const jwtClient = createGoogleClient();

  return new Promise(
    function (resolve, reject) {
      jwtClient.authorize(function (err) {
        if (err) {
          reject(err)
        }

        drive.files.get({
          fileId: fileId,
          auth: jwtClient,
          alt: 'media'
        }, function (err, resp) {
          resolve(resp)
        })
      })
    }
  )
}

function createGoogleClient() {
  const jsonKey = readJsonKey()

  return new google.auth.JWT(
    jsonKey.client_email,
    null,
    jsonKey.private_key,
    ['https://www.googleapis.com/auth/drive.readonly'],
    null
  )
}

function readJsonKey() {
  return JSON.parse(new Buffer(process.env.JSON_KEY, 'base64').toString('ascii'))
}

module.exports = {
  readFileFromDrive
}
