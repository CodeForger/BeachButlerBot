'use strict';

const DriveClient = require('../drive-client')

function getWelcomeMessage(newMember) {
  return getOnBoardingMessage()
    .then(values => {
      return `Welcome ${newMember.first_name}! (@${newMember.username})\n\n${values}`
    })
}

function getOnBoardingMessage() {
  return Promise.all([readOnboardingMessageFile(), readTelegramGroupsFile()])
    .then(values => {
      const onboardingMessage = values[0]
      const telegramGroups = values[1]

      return `${onboardingMessage}\n\n${telegramGroups}`
    });
}


function getTelegramGroupsMessage() {
  return readTelegramGroupsFile()
  }

function readOnboardingMessageFile() {
  return DriveClient.readFileFromDrive(process.env.ONBOARDING_MESSAGE_FILE_ID);
}

function readTelegramGroupsFile() {
  return DriveClient.readFileFromDrive(process.env.TELEGRAM_GROUPS_FILE_ID);
}


module.exports = {
  getWelcomeMessage,
  getOnBoardingMessage,
  getTelegramGroupsMessage
}
