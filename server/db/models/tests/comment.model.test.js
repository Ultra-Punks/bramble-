/* eslint-env mocha, chai */

const {expect} = require('chai')
const {db} = require('../../index')
const PostComment = require('../postComment')
// const PostComment = db.model('postComment')

describe('Comment model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    xit('has `comment`, `likes` and `dislikes` fields', async () => {
      const commentOnPost = await PostComment.create({
        comment: "You're right, 3rd Rock From The Sun was a funny show!",
        likes: 7,
        dislikes: 2
      })

      expect(commentOnPost.comment).to.equal(
        "You're right, 3rd Rock From The Sun was a funny show!"
      )
      expect(commentOnPost.likes).to.equal(7)
      expect(commentOnPost.dislikes).to.equal(2)
    })
  })
})
