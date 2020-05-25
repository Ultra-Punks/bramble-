const {expect} = require('chai')
const {db} = require('../../index')
const UserPost = require('../userPost')

describe('User Post model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions & validations', () => {
    xit('has fields for `description`, `like` and `dislike`', async () => {
      const newUserPost = await UserPost.create({
        description:
          "This text would appear as a post within a user's post feed",
        likes: 3,
        dislikes: 4
      })

      expect(newUserPost.description).to.equal(
        "This text would appear as a post within a user's post feed"
      )
      expect(newUserPost.likes).to.equal(3)
      expect(newUserPost.dislikes).to.equal(4)
    })
  })
})
