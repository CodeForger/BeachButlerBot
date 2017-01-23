'use strict';

const async = require('async')

const google = require('googleapis');
const drive = google.drive('v3');

function getWelcomeMessage(newMember) {
  return `Welcome ${newMember.first_name}! (@${newMember.username})\n\n${getOnBoardingMessage()}`
}

function getOnBoardingMessage() {
  return new Promise(
    function (resolve, reject) {
      async.parallel([
        readOnboardingMessageFile,
        readTelegramGroupsFile
      ],
      function (err, results) {
        if (err) {
          reject(err)
        }

        const onboardingMessage = results[0]
        const telegramGroups = results[1]

        resolve(`${onboardingMessage}\n\n${telegramGroups}`)
      })
    }
  )
}

function readOnboardingMessageFile(callback) {
  readFileFromDrive(process.env.ONBOARDING_MESSAGE_FILE_ID, callback);
}

function readTelegramGroupsFile(callback) {
  readFileFromDrive(process.env.TELEGRAM_GROUPS_FILE_ID, callback);
}

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

module.exports = {
  getWelcomeMessage,
  getOnBoardingMessage
}
