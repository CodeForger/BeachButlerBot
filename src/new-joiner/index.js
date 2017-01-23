'use strict'

function getWelcomeMessage(newMember) {
  return `Welcome ${newMember.first_name}! (@${newMember.username})\n\n${getOnBoardingMessage()}`
}

function getOnBoardingMessage() {
  const ONBOARDING_DOC = 'https://thoughtworks.jiveon.com/groups/people-space-singapore/blog/2016/12/19/welcome-to-thoughtworks-singapore'
  return `Here are some links you may find helpful:\n<a href="${ONBOARDING_DOC}">TWSG Onboarding Info Pack</a>`
}

module.exports = {
  getWelcomeMessage,
  getOnBoardingMessage
}
