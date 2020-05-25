const User = require('./user')
const Location = require('./location')
const LocationReview = require('./locationReview')
const Community = require('./community')
const Photo = require('./photos')
const PostComment = require('./postComment')
const UserPost = require('./userPost')
const Tag = require('./tags')

// =========== ASSOCIATIONS BELOW ===========

UserPost.belongsTo(User)
UserPost.hasMany(PostComment)
UserPost.hasMany(Photo)

UserPost.belongsTo(Community)

UserPost.hasMany(Tag)

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
Photo.belongsTo(Community)
Photo.hasMany(Tag)

Community.belongsToMany(User, {through: 'CommunitySubs'})
Community.belongsTo(User)
Community.hasMany(Location)
Community.hasMany(UserPost)
Community.hasMany(Photo)

User.hasMany(UserPost)
User.hasMany(Photo)
User.hasMany(Location) // <-- NOTE: was creating some issues Sat. May need review later.
User.hasMany(LocationReview)
User.hasMany(PostComment)
User.belongsToMany(User, {
  as: 'follower',
  through: 'follow',
  foreignKey: 'userId'
})
User.belongsToMany(User, {
  as: 'following',
  through: 'follow',
  foreignKey: 'followerId'
})
// User.belongsToMany(User, {as: 'Followers', through: "UserFollower"})
User.belongsToMany(Community, {
  as: 'subscriber',
  through: 'CommunitySubs',
  foreignKey: 'userId'
})
User.belongsToMany(Community, {as: 'Moderator', through: 'CommunityMods'})

Tag.belongsToMany(UserPost, {through: 'PostTags'})
// Tag.belongsTo(User)
Tag.belongsToMany(Photo, {through: 'PhotoTags'})

// =========== Exports Below ===========
module.exports = {
  User,
  Community,
  Location,
  LocationReview,
  Photo,
  PostComment,
  UserPost,
  Tag
}
