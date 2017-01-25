'use strict'

const Promise = require('bluebird')
const google = require('googleapis')

const driveAuth = require('./auth')

function readFileFromDrive(fileId) {
  const auth = Promise.promisifyAll(driveAuth.createGoogleJwtAuth())

  return auth.authorizeAsync()
    .then(() => {
      return getFile(fileId, auth)
    })
}

function getFile(fileId, auth) {
  const drive = google.drive('v3')

  return Promise.promisify(drive.files.get)({
    fileId: fileId,
    auth: auth,
    alt: 'media'
  })
}

module.exports = {
  readFileFromDrive
}
