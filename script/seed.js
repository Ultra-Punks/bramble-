'use strict'

const db = require('../server/db')
const {User, Location, Community, UserPost} = require('../server/db/models')

// bring in the Chance library to generate seed data (Chance Library info --> https://chancejs.com/index.html)
const Chance = require('chance')
const chanceObj = Chance() // use this global Chance constructor to use in different tables

// create random user seed data
const generateUser = () => {
  return {
    email: chanceObj.email(),
    password: 'abc',
    name: chanceObj.name(),
    username: chanceObj.twitter(),
    description: chanceObj.paragraph({sentences: 1}),
    isAdmin: chanceObj.bool({likelihood: 25})
  }
}

const manualUsers = [
  {
    email: 'devin@bramble.com',
    password: '1234ABCD',
    name: 'Devin Knight',
    username: '@Dev-2020',
    description:
      'Bupe vuv homaci vo agecuisa zas za wuba uhvod anuitsiw roegtu kiz.',
    isAdmin: false
  },
  {
    email: 'mochi@email.com',
    password: '1234ABCD',
    name: 'Mochiko Knight',
    username: '@mochi-2020',
    description:
      'Bupe vuv homaci vo agecuisa zas za wuba uhvod anuitsiw roegtu kiz.',
    isAdmin: false
  },
  {
    email: 'franco@bramble.com',
    password: '1234ABCD',
    name: 'Franco Trelles',
    username: '@Franco-MT',
    description:
      'Code master Franco among the Bramble Team! Also, Mets Fanatic!',
    isAdmin: false
  },
  {
    email: 'Darren@bramble.com',
    password: '1234ABCD',
    name: 'Darren Hu',
    username: '@D-Darren-Dawg',
    description:
      'Code master Darren among the Bramble Team! ESPN Advocate and LeBron James Fan!',
    isAdmin: false
  },
  {
    email: 'Robu@bramble.com',
    password: '1234ABCD',
    name: 'Robu Waldorf',
    username: '@Robu',
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
// store 10 new locations created by generateUser into in the locationArray
const locationArray = Array.from({length: 10}, generateLocation)

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
    description: chanceObj.paragraph({sentences: 3})
  }
}
// store 10 new communities created by generateUser into in the communityArray
const communityArray = Array.from({length: 10}, generateCommunity)

// create random post seed data
const generatePost = () => {
  return {
    description: chanceObj.paragraph()
  }
}

// store 50 new posts created by generatePost into the userPostArray
const userPostArray = Array.from({length: 50}, generatePost)

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = []
  const locations = []
  const communities = []
  const userPosts = []

  for (let i = 0; i < updatedUsers.length; i++) {
    const newUser = await User.create(updatedUsers[i])
    users.push(newUser)
  }

  for (let i = 0; i < locationArray.length; i++) {
    const newLocation = await Location.create(locationArray[i])
    locations.push(newLocation)
    const randomUserNum = Math.floor(Math.random() * 9) + 1
    await locations[i].setUser(users[randomUserNum])
  }

  for (let i = 0; i < communityArray.length; i++) {
    const newCommunity = await Community.create(communityArray[i])
    communities.push(newCommunity)
    const randomUserNum = Math.floor(Math.random() * users.length) + 1
    await communities[i].setUser(users[randomUserNum])
  }

  for (let i = 0; i < userPostArray.length; i++) {
    const newPost = await UserPost.create(userPostArray[i])
    userPosts.push(newPost)
    const randomUserNum = Math.floor(Math.random() * users.length) + 1
    console.log('>>>>>>>>>', randomUserNum)
    await userPosts[i].setUser(users[randomUserNum])
  }
  // await locations[0].setUser(users[0])
  // users[0].addCommunity(communities[0])
  // ==========  ORIGINAL SEED INFO FROM BOILERMAKER  ==========
  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'}),
  // ])
  // ============================================================

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
