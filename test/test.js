/* eslint-disable no-unused-expressions */

/* eslint-disable */
import server from '../index'
/* eslint-enable */

const rp = require('request-promise')
const chai = require('chai')
const expect = chai.expect
require('dotenv').config()

const testURL = `http://${process.env.HOST}:${process.env.PORT}`

describe('TESTING MODULES', () => {
  describe('1. Base Route', () => {
    it('Expects a HTML page in return', done => {
      const options = {
        method: 'GET',
        url: testURL,
        resolveWithFullResponse: true
      }
      rp(options).then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.be.a('string')
        done()
      }).catch(err => {
        done(err)
      })
    })
  })

  describe('2. Set route', () => {
    it('2.1. Should set new mixed data to database', done => {
      const options = {
        method: 'POST',
        url: testURL + '/set',
        body: {
          key: 'test',
          value: {
            name: 'tester',
            category: 'test_category',
            brandname: 'TestBrand',
            images: 'https://google.com'
          }
        },
        headers: {
          'Content-type': 'application/json'
        },
        json: true,
        resolveWithFullResponse: true
      }
      rp(options).then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body.message).to.equal('New value set successfully!')
        done()
      }).catch(err => {
        done(err)
      })
    })
    it('2.2. Should set string based key-value pair', done => {
      const options = {
        method: 'GET',
        url: testURL + '/set/test1/testing',
        json: true,
        resolveWithFullResponse: true
      }
      rp(options).then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body.message).to.equal('New value set successfully!')
        done()
      }).catch(err => {
        done(err)
      })
    })
  })

  describe('3. Get routes', () => {
    it('3.1. Should get appropriate values (string values)', done => {
      const options = {
        method: 'GET',
        url: testURL + '/get/test1',
        json: true,
        resolveWithFullResponse: true
      }
      rp(options).then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.be.an('object')
        expect(response.body.value).to.equal('testing')
        done()
      }).catch(err => {
        done(err)
      })
    })
    it('3.2. Should get appropriate values (objects)', done => {
      const options = {
        method: 'GET',
        url: testURL + '/get/test',
        json: true,
        resolveWithFullResponse: true
      }
      const expectedData = {
        name: 'tester',
        category: 'test_category',
        brandname: 'TestBrand',
        images: 'https://google.com'
      }
      rp(options).then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body.value).to.be.an('object')
        expect(JSON.stringify(response.body.value)).to.equal(JSON.stringify(expectedData))
        done()
      }).catch(err => {
        done(err)
      })
    })
    it('3.3. Should show not found when key-value pair don\'t exist', done => {
      const options = {
        method: 'GET',
        url: testURL + '/get/' + (Math.floor(new Date() / 1000)).toString(),
        json: true,
        resolveWithFullResponse: true
      }
      rp(options).then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body.message).to.be.a('string')
        expect(response.body.message).to.equal('No result found!')
        done()
      }).catch(err => {
        done(err)
      })
    })
  })

  describe('4. Deletion routes', () => {
    it('4.1. Should delete successfully when found', done => {
      const options = {
        method: 'GET',
        url: testURL + '/delete/test',
        json: true,
        resolveWithFullResponse: true
      }
      rp(options).then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.be.an('object')
        expect(response.body.message).to.equal('Deleted successfully!')
        done()
      }).catch(err => {
        done(err)
      })
    })
    it('4.2. Should return no matching entry found when appropriate', done => {
      const options = {
        method: 'GET',
        url: testURL + '/delete/test',
        json: true,
        resolveWithFullResponse: true
      }
      rp(options).then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.be.an('object')
        expect(response.body.message).to.equal('No matching entry was found!')
        done()
      }).catch(err => {
        done(err)
      })
    })
  })
})
