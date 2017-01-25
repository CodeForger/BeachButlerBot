'use strict'

const google = require('googleapis')

function createGoogleJwtAuth() {
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
  try {
    const encodedJsonKey = process.env.JSON_KEY
    const jsonKey = new Buffer(encodedJsonKey, 'base64').toString('ascii')

    return JSON.parse(jsonKey)
  } catch (e) {
    throw new Error('JSON_KEY must be provided in the env variable and encoded in Base64 format')
  }
}

module.exports = {
  createGoogleJwtAuth
}