'use strict'

const expect = require('chai').expect
const sinon = require('sinon')

const google = require('googleapis')

const driveClient = require('.')
const driveAuth = require('./auth')

describe('drive-client', function () {

  describe('#readFileFromDrive()', function () {

    const fileId = 'file-123'
    const fileContent = 'file-content'

    before('given correct authentication detail and file with content', function () {
      const auth = {
        authorize: function (callback) {
          callback(null, '')
        }
      }

      const drive = {
        files: {
          get: function (params, callback) {
            expect(params).to.have.property('fileId').and.equal(fileId)
            expect(params).to.have.property('auth').and.equal(auth)
            expect(params).to.have.property('alt').and.equal('media')

            callback(null, fileContent)
          }
        }
      }

      sinon.stub(driveAuth, 'createGoogleJwtAuth').returns(auth)
      sinon.stub(google, 'drive').returns(drive)
    })

    after(function () {
      driveAuth.createGoogleJwtAuth.restore()
      google.drive.restore()
    })

    it('should return the file content', function () {
      return driveClient.readFileFromDrive(fileId)
        .then(content => {
          expect(content).to.equal(fileContent)
        })
    })

  })

})