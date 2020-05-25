/* eslint-env mocha, chai */
/* eslint-env mocha, chai */

const {expect} = require('chai')
const {db} = require('../../index')
const Community = require('../community')

describe('Community model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    xit('has `name` and `profileImg` fields', async () => {
      const newCommunity = await Community.create({
        name: 'Fullstack Coders',
        descripion:
          'Using JS, Node.js, Sequelize, Express, Redux, React, Cloudinary and Google Cloud Vision to build the latest social media app!',
        profileImg:
          'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg',
        subscribers: 4
      })

      expect(newCommunity.name).to.equal('Fullstack Coders')
      expect(newCommunity.descripion).to.equal(
        'Using JS, Node.js, Sequelize, Express, Redux, React, Cloudinary and Google Cloud Vision to build the latest social media app!'
      )

      xit('also has fields for `profileImg` and `subscribers` fields', () => {
        expect(newCommunity.profileImg).to.equal(
          'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg'
        )
        expect(newCommunity.subscribers).to.equal(4)
      })
    })
  })
})
