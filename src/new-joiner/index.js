'use strict';

const async = require('async')
const DriveClient = require('../drive-client')

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

function getTelegramGroupsMessage() {
  return new Promise(
    function (resolve, reject) {
      readTelegramGroupsFile(function (err, resp) {
        if (err) {
          reject(err)
        }

        resolve(resp)
      })
    }
  )
}

function readOnboardingMessageFile(callback) {
  DriveClient.readFileFromDrive(process.env.ONBOARDING_MESSAGE_FILE_ID, callback);
}

function readTelegramGroupsFile(callback) {
  DriveClient.readFileFromDrive(process.env.TELEGRAM_GROUPS_FILE_ID, callback);
}


module.exports = {
  getWelcomeMessage,
  getOnBoardingMessage,
  getTelegramGroupsMessage
}
