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
UserPost.belongsTo(Community)

PostComment.belongsTo(UserPost)
PostComment.belongsTo(User)
PostComment.hasMany(Photo)

Location.hasMany(Photo)
Location.belongsTo(User)
Location.hasMany(LocationReview)
Location.belongsTo(Community)

LocationReview.belongsTo(Location)
LocationReview.belongsTo(User)
LocationReview.hasMany(Photo)

Photo.belongsTo(UserPost)
Photo.belongsTo(Location)
Photo.belongsTo(LocationReview)
Photo.belongsTo(PostComment)
Photo.belongsTo(User)

Community.belongsToMany(User, {through: CommunitySubs})
Community.belongsTo(User)
Community.hasMany(Location)
Community.hasMany(UserPost)

User.hasMany(UserPost)
User.hasMany(Photo)
User.hasMany(Location) // <-- NOTE: was creating some issues Sat. May need review later.
User.hasMany(LocationReview)
User.hasMany(PostComment)
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
