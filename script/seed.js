'use strict'

const db = require('../server/db')
const {User, Location, Community} = require('../server/db/models')

// bring in the Chance library to generate seed data
const Chance = require('chance')
const chanceObj = Chance() // use this global Chance constructor to use in different tables

// create random user seed data
const generateUser = () => {
  return {
    email: chanceObj.email(),
    password: '123',
    username: chanceObj.name(),
    description: chanceObj.paragraph({sentences: 1}),
    isAdmin: chanceObj.bool({likelihood: 25})
  }
}
// store 10 new users created by generateUser into in the userArray
const userArray = Array.from({length: 10}, generateUser)
console.log('userArray>>>>', userArray)

// create random location seed data (NOT RESTRICTED TO NYC!)
const generateLocation = () => {
  return {
    name: chanceObj.company(),
    address: `${chanceObj.address()} ${chanceObj.state({full: true})}`,
    description: chanceObj.paragraph({sentences: 2})
  }
}
// store 10 new locations created by generateUser into in the userArray
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
// store 10 new communities created by generateUser into in the userArray
const communityArray = Array.from({length: 10}, generateCommunity)

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = []
  const locations = []
  const communities = []

  for (let i = 0; i < userArray.length; i++) {
    const newUser = await User.create(userArray[i])
    users.push(newUser)
  }

  for (let i = 0; i < locationArray.length; i++) {
    const newLocation = await Location.create(locationArray[i])
    locations.push(newLocation)
    const randomUserNum = Math.floor(Math.random() * 9) + 1
    await locations[i].setUser(users[randomUserNum])
  }
  //add 2 restaurants to beginning of locationArray
  locationArray.unshift(
    await Location.create({
      point: {type: 'point', coordinates: [-73.959285, 40.653975]},
      name: 'Zen Vegetarian',
      description: 'Best Chinese Food'
    })
  )
  locationArray.unshift(
    await Location.create({
      point: {type: 'point', coordinates: [-73.956137, 40.650774]},
      name: 'Four Seasons Bakery & Juice Bar',
      description: 'Caribbean Food'
    })
  )
  for (let i = 0; i < locationArray.length; i++) {
    const newCommunity = await Community.create(communityArray[i])
    communities.push(newCommunity)
    const randomUserNum = Math.floor(Math.random() * users.length) + 1
    await communities[i].setUser(users[randomUserNum])
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
    `seeded ${userArray.length} users, and ${locationArray.length} locations`
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
