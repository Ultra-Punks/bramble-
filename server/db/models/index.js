const User = require('./user')
const Location = require('./location')
const LocationReview = require('./locationReview')
const Community = require('./community')
const CommunityMods = require('./communityMod')
const CommunitySubs = require('./communitySubs')
const Photo = require('./photos')
const PostComment = require('./postComment')
const UserFollowers = require('./userFollowers')
const UserPost = require('./userPost')

// =========== ASSOCIATIONS BELOW ===========

UserPost.belongsTo(User)
UserPost.hasMany(PostComment)
UserPost.hasMany(Photo)

PostComment.belongsTo(UserPost)
PostComment.hasMany(Photo)

Location.hasMany(Photo)
Location.belongsTo(User)
Location.hasMany(LocationReview)

LocationReview.belongsTo(Location)
LocationReview.belongsTo(User)
LocationReview.hasMany(Photo)

Photo.belongsTo(UserPost)
Photo.belongsTo(Location)
Photo.belongsTo(LocationReview)
Photo.belongsTo(PostComment)

Community.belongsToMany(User, {through: CommunitySubs})
Community.belongsTo(User)

User.hasMany(UserPost)
User.hasMany(Location) // <-- NOTE: was creating some issues Sat. May need review later.
User.belongsToMany(User, {as: 'Followers', through: UserFollowers})
User.belongsToMany(Community, {as: 'Subscribers', through: CommunitySubs})
User.belongsToMany(Community, {as: 'Moderator', through: CommunityMods})

// =========== Exports Below ===========
module.exports = {
  User,
  Community,
  CommunityMods,
  CommunitySubs,
  Location,
  LocationReview,
  Photo,
  PostComment,
  UserFollowers,
  UserPost
}
