'use strict'

const expect = require('chai').expect
const driveAuth = require('.')

describe('drive-client/auth', function () {

  describe('#createGoogleJwtAuth()', function() {
    const email = 'hsurya@thoughtworks.com'
    const key = 'key-1234'
    const jsonKey = {
      client_email: email,
      private_key: key
    }

    before('given a valid JSON_KEY configured', function () {
      process.env.JSON_KEY = new Buffer(JSON.stringify(jsonKey)).toString('base64')
    })

    after(function () {
      delete process.env.JSON_KEY
    })

    it('should return proper Google JWT auth', function() {
      const auth = driveAuth.createGoogleJwtAuth()

      expect(auth).to.have.property('email').and.equal(email)
      expect(auth).to.have.property('key').and.equal(key)
      expect(auth).to.have.property('scopes').and.contain('https://www.googleapis.com/auth/drive.readonly')
    })
  })

  describe('#createGoogleJwtAuth() - missing JSON_KEY', function () {
    before('given missing JSON_KEY', function() {
      delete process.env.JSON_KEY
    })

    it("should throw Error", function() {
      expect(driveAuth.createGoogleJwtAuth).to.throw(Error)
    })
  })

})