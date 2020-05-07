const User = require('./user')
const Location = require('./location')
const LocationReview = require('./locationReview')
const Community = require('./community')
const CommunityMod = require('./communityMod')
const CommunitySubs = require('./communitySubs')
const Photos = require('./photos')
const PostComment = require('./postComment')
const UserFollowers = require('./userFollowers')
const UserPost = require('./userPost')

User.hasMany(UserPost)
UserPost.belongsTo(User)
UserPost.hasMany(PostComment)
UserPost.hasMany(Photos)
PostComment.belongsTo(UserPost)
Location.hasMany(Photos)
Location.belongsTo(User)
Location.hasMany(LocationReview)
LocationReview.belongsTo(Location)
LocationReview.belongsTo(User)
LocationReview.hasMany(Photos)
Photos.belongsTo(UserPost)
Photos.belongsTo(Location)
Photos.belongsTo(LocationReview)
User.belongsToMany(User, {as: 'Followers', through: 'UserFollowers'})
Community.belongsToMany(User, {through: 'CommunitySubs'})
User.belongsToMany(Community, {as: 'Subscribers', through: 'CommunitySubs'})
// User.belongsToMany(Community, { as : "Moderator", through: "CommunityModerator"})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Community,
  CommunityMod,
  CommunitySubs,
  Location,
  LocationReview,
  Photos,
  PostComment,
  UserFollowers,
  UserPost,
}
