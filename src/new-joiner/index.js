'use strict';

const DriveClient = require('../drive-client')

function getWelcomeMessage(newMember) {
  return getOnBoardingMessage()
    .then(onboardingMessage => {
      return `Welcome ${newMember.first_name}! (@${newMember.username})\n\n${onboardingMessage}`
    })
}

function getOnBoardingMessage() {
  return Promise.all([readOnboardingMessageFile(), readTelegramGroupsFile()])
    .then(messages => {
      const onboardingMessage = messages[0]
      const telegramGroups = messages[1]

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
