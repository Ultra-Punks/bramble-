/* eslint-disable complexity */
'use strict'

const db = require('../server/db')
const {
  User,
  Location,
  Community,
  UserPost,
  LocationReview,
  PostComment,
  CommunitySubs,
  UserFollower
} = require('../server/db/models')

// bring in the Chance library to generate seed data (Chance Library info --> https://chancejs.com/index.html)
const Chance = require('chance')
const chanceObj = Chance() // use this global Chance constructor to use in different tables

// create random user seed data
const generateUser = () => {
  const handle = chanceObj.twitter()

  return {
    email: chanceObj.email(),
    password: 'abc',
    name: chanceObj.name(),
    username: handle.slice(1),
    description: chanceObj.paragraph({sentences: 1}),
    isAdmin: chanceObj.bool({likelihood: 25})
  }
}

const manualUsers = [
  {
    email: 'devin@bramble.com',
    password: '1234ABCD',
    name: 'Devin Knight',
    username: 'Dev-2020',
    description:
      'Bupe vuv homaci vo agecuisa zas za wuba uhvod anuitsiw roegtu kiz.',
    isAdmin: false
  },
  {
    email: 'mochi@email.com',
    password: '1234ABCD',
    name: 'Mochiko Knight',
    username: 'mochi-2020',
    description:
      'Bupe vuv homaci vo agecuisa zas za wuba uhvod anuitsiw roegtu kiz.',
    isAdmin: false
  },
  {
    email: 'franco@bramble.com',
    password: '1234ABCD',
    name: 'Franco Trelles',
    username: 'franco',
    description:
      'Code master Franco among the Bramble Team! Also, Mets Fanatic!',
    isAdmin: false
  },
  {
    email: 'Darren@bramble.com',
    password: '1234ABCD',
    name: 'Darren Hu',
    username: 'D-Darren-Dawg',
    description:
      'Code master Darren among the Bramble Team! ESPN Advocate and LeBron James Fan!',
    isAdmin: false
  },
  {
    email: 'Robu@bramble.com',
    password: '1234ABCD',
    name: 'Robu Waldorf',
    username: 'Robu',
    description:
      'Code master Robu among the Bramble Team! Musician and map master!',
    isAdmin: false
  }
]
// store 10 new users created by generateUser into in the userArray
const userArray = Array.from({length: 10}, generateUser)
const updatedUsers = userArray.concat(manualUsers)

// create random location seed data (NOT RESTRICTED TO NYC!)
const generateLocation = () => {
  return {
    name: chanceObj.company(),
    address: `${chanceObj.address()} ${chanceObj.state({full: true})}`,
    description: chanceObj.paragraph({sentences: 2})
  }
}

const manualLocations = [
  {
    address: '5 Hanover Square 11th floor, New York, NY 10004',
    geometry: {type: 'point', coordinates: [-74.009123, 40.705112]},
    name: 'Fullstack Academy',
    description:
      'Fullstack Academy is an immersive software engineering coding bootcamp located in New York City and Chicago. Students of the full-time flagship course learn full stack JavaScript over the course of a 13-week, on-campus program.',
    isAdmin: false
  },
  {
    address: '2 W 69th St, New York, NY 10023',
    geometry: {type: 'point', coordinates: [-73.977721, 40.774355]},
    name: 'Le Pain Quotidien',
    description:
      "Nestled above Sheep’s Meadow in Central Park, our store is located within the historic Mineral Springs pavilion. In the late 1800s and early 1900s, this pavilion served 30 varieties of natural spring water to New Yorker's.",
    isAdmin: false
  },
  {
    address: '773 Flatbush Ave, Brooklyn, NY, 11226',
    geometry: {type: 'point', coordinates: [-73.959285, 40.653975]},
    name: 'Zen Vegetarian',
    description: 'Best Chinese Food'
  },
  {
    address: '2281 Church Ave, Brooklyn, NY, 11226',
    geometry: {type: 'point', coordinates: [-73.956137, 40.650774]},
    name: 'Four Seasons Bakery & Juice Bar',
    description: 'Caribbean Food'
  }
]

// store 10 new locations created by generateUser into in the locationArray
const locationArray = Array.from({length: 10}, generateLocation)
const updatedLocations = locationArray.concat(manualLocations)

// possible community names array
const communitySeedNames = [
  'Greenwich Blackjacks',
  'Brooklyn Creative',
  'SoHo Brunchers',
  'MidTown Tourists',
  'Raves of Chelsea',
  'Yuppies of Upper-East',
  'Movers & Shakers of FiDi',
  'NYC Fit!',
  'Urban Shredders'
]

// create random community seed data
const generateCommunity = () => {
  return {
    name: chanceObj.pickone(communitySeedNames),
    description: chanceObj.paragraph({sentences: 1})
  }
}

const manualCommunities = [
  {
    name: 'Food',
    description: 'Food is the ingredient that binds us together',
    profileImg:
      'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg'
  },
  {
    name: 'Fitness',
    description: 'Be the hardest worker in the room',
    profileImg:
      'https://www.maxim.com/.image/t_share/MTY1MDc5NTMwMzgwMjA3NDE2/dwayne-the-rock-johnson-chest-drop-sets.png'
  },
  {
    name: 'Skating',
    description: 'Life is alot like skateboarding ',
    profileImg:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTSeXvrFrdX237gzTMITf4vFommaqJOYBTOk2Xf8IHthyzDnK2K&usqp=CAU'
  },
  {
    name: 'Fashion',
    description: 'Being yourself never goes out of fashion ',
    profileImg:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQp_FYgM-HuoNgldG9lW9a4L5cZ9IgLhZNi4EPCTA2H1EC2GonC&usqp=CAU'
  }
]

// store 10 new communities created by generateUser into in the communityArray
const communityArray = Array.from({length: 8}, generateCommunity)
const updatedCommunities = manualCommunities.concat(communityArray)

// create random post seed data
const generatePost = () => {
  return {
    description: chanceObj.paragraph(),
    likes: chanceObj.integer({min: 0, max: updatedUsers.length}),
    dislikes: chanceObj.integer({min: 0, max: updatedUsers.length})
  }
}

// store 50 new posts created by generatePost into the userPostArray
const userPostArray = Array.from({length: 50}, generatePost)

// create random location review seed data
const generateLocationReview = () => {
  return {
    ratings: chanceObj.integer({min: 1, max: 5}),
    comments: chanceObj.paragraph()
  }
}

// store 40 new location reviews created by generateLocationReview into the locationReviews array
const locationReviewsArray = Array.from({length: 40}, generateLocationReview)

// create random PostComments seed data
const generatePostComments = () => {
  return {
    comment: chanceObj.paragraph(),
    likes: chanceObj.integer({min: 0, max: updatedUsers.length}),
    dislikes: chanceObj.integer({min: 0, max: updatedUsers.length})
  }
}

// store 150 new post comments into the postCommentsArray
const postCommentsArray = Array.from({length: 150}, generatePostComments)

// eslint-disable-next-line max-statements
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = []
  const locations = []
  const communities = []
  const userPosts = []
  const locationReviews = []
  const postComments = []

  for (let i = 0; i < updatedUsers.length; i++) {
    const newUser = await User.create(updatedUsers[i])
    users.push(newUser)
  }

  // for (let i = 0; i < updatedCommunities.length; i++) {
  //   const newCommunity = await Community.create(updatedCommunities[i])
  //   users.push(newCommunity)
  // }

  for (let i = 0; i < updatedCommunities.length; i++) {
    const newCommunity = await Community.create(updatedCommunities[i])
    communities.push(newCommunity)
    const randomUserNum = Math.floor(Math.random() * users.length) + 1
    // const randomCommNum = Math.floor(Math.random() * communities.length) + 1
    await communities[i].setUser(users[randomUserNum])
    // await locations[i].setCommunity(communities[randomCommNum])
  }

  // loop through communities in case userId is null...
  for (let i = 0; i < communities.length; i++) {
    if (communities[i].userId === undefined) {
      communities[i].userId = 1
      await communities[i].save()
    }
  }

  for (let i = 0; i < updatedLocations.length; i++) {
    const newLocation = await Location.create(updatedLocations[i])
    locations.push(newLocation)
    const randomUserNum = Math.floor(Math.random() * 9) + 1
    await locations[i].setUser(users[randomUserNum])
    const randomCommNum = Math.floor(Math.random() * communities.length) + 1
    await locations[i].setCommunity(communities[randomCommNum])
  }

  // loop through locations in case communityId is null...
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].communityId === undefined) {
      locations[i].communityId = 1
      await locations[i].save()
    }
  }

  for (let i = 0; i < userPostArray.length; i++) {
    const newPost = await UserPost.create(userPostArray[i])
    userPosts.push(newPost)
    const randomUserNum = Math.floor(Math.random() * users.length) + 1
    await userPosts[i].setUser(users[randomUserNum])
    const randomCommunityNum =
      Math.floor(Math.random() * communities.length) + 1
    await userPosts[i].setCommunity(communities[randomCommunityNum])
  }

  // loop through user posts in case userId is null...
  for (let i = 0; i < userPosts.length; i++) {
    if (userPosts[i].userId === undefined) {
      userPosts[i].userId = 1
      await userPosts[i].save()
    }
    if (userPosts[i].communityId === undefined) {
      userPosts[i].communityId = 1
      await userPosts[i].save()
    }
  }

  for (let i = 0; i < locationReviewsArray.length; i++) {
    const newReview = await LocationReview.create(locationReviewsArray[i])
    locationReviews.push(newReview)
    const randomUserNum = Math.floor(Math.random() * users.length) + 1
    await locationReviews[i].setUser(users[randomUserNum])
    const randomLocationNum = Math.floor(Math.random() * users.length) + 1
    await locationReviews[i].setLocation(locations[randomLocationNum])
  }

  // loop through location reviews in to mitigate null value foreign keys...
  for (let i = 0; i < locationReviews.length; i++) {
    // if the userId column in location reviews is null...
    if (locationReviews[i].userId === undefined) {
      locationReviews[i].userId = 1 // default set to userId 1
      await locationReviews[i].save()
    }
    // if the locationId column in location reviews is null...
    if (locationReviews[i].locationId === undefined) {
      locationReviews[i].locationId = 1 // default set to userId 1
      await locationReviews[i].save()
    }
  }

  // loop through post comments in to mitigate null value foreign keys...
  for (let i = 0; i < postCommentsArray.length; i++) {
    const newComment = await PostComment.create(postCommentsArray[i])
    postComments.push(newComment)
    const randomCommentNum = Math.floor(Math.random() * userPosts.length) + 1
    await postComments[i].setUserPost(userPosts[randomCommentNum])
    const randomUserNum = Math.floor(Math.random() * users.length) + 1
    await postComments[i].setUser(users[randomUserNum])
  }

  // loop through post comments in to mitigate null value foreign keys...
  for (let i = 0; i < postCommentsArray.length; i++) {
    // if the userId column in location reviews is null...
    if (postComments[i].userId === undefined) {
      postComments[i].userId = 1 // default set to userId 1
      await postComments[i].save()
    }
    // if the locationId column in location reviews is null...
    if (postComments[i].userPostId === undefined) {
      postComments[i].userPostId = 1 // default set to userId 1
      await postComments[i].save()
    }
  }

  const communitySubs = await Promise.all([
    CommunitySubs.create({userId: 13, communityId: 10}),
    CommunitySubs.create({userId: 13, communityId: 6}),
    CommunitySubs.create({userId: 13, communityId: 3})
  ])

  // await users[3].setFollowing(13)
  // await users[2].setFollowing(13)
  // await users[1].setFollowing(13)
  // await users[5].setFollowing(13)

  console.log(
    `seeded ${updatedUsers.length} users, and ${locationArray.length} locations`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
