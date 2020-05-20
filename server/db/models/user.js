const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true
      // isAlphanumeric: true,
    }
  },
  username: {
    type: Sequelize.STRING,
    // allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
      // isAlphanumeric: true,
    }
  },
  profileImg: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://res.cloudinary.com/bramble/image/upload/v1589958607/default_profile_phtwdz.png'
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  followerCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  followingCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

User.prototype.increaseFollowers = async function() {
  const newFollowerCount = this.followerCount + 1
  await this.update({followerCount: newFollowerCount})
}

User.prototype.decreaseFollowers = async function() {
  const newFollowerCount = this.followerCount - 1
  await this.update({followerCount: newFollowerCount})
}

User.prototype.increaseFollowing = async function() {
  const newFollowingCount = this.followingCount + 1
  await this.update({followingCount: newFollowingCount})
}

User.prototype.decreaseFollowing = async function() {
  const newFollowingCount = this.followingCount - 1
  await this.update({followingCount: newFollowingCount})
}

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
