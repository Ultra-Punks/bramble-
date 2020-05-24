/* eslint-disable complexity */
'use strict'

const db = require('../server/db')
const {
  User,
  Location,
  Community,
  UserPost,
  LocationReview,
  PostComment
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
    address: '5 Hanover Square 11th floor',
    geometry: {type: 'point', coordinates: [-74.009345, 40.705309]},
    mapId: 'poi.309237703361',
    name: 'Fullstack Academy',
    description:
      'Fullstack Academy is an immersive software engineering coding bootcamp located in New York City and Chicago. Students of the full-time flagship course learn full stack JavaScript over the course of a 13-week, on-campus program.',
    isAdmin: false,
    communityId: 11,
    coverImg:
      'https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/640/s1200/fsa-20campus-203.jpg'
  },
  {
    address: '2 W 69th St, New York, NY 10023',
    geometry: {type: 'point', coordinates: [-73.974348, 40.77301]},
    name: 'Le Pain Quotidien',
    description:
      "Nestled above Sheep’s Meadow in Central Park, our store is located within the historic Mineral Springs pavilion. In the late 1800s and early 1900s, this pavilion served 30 varieties of natural spring water to New Yorker's.",
    isAdmin: false,
    communityId: 1,
    coverImg:
      'https://a.mktgcdn.com/p/LisFZCGZItfBlBmAAS4CR7Kff22kefNrJ-uWfCstjNA/1280x720.jpg'
  },
  {
    address: '773 Flatbush Ave, Brooklyn, NY, 11226',
    geometry: {type: 'point', coordinates: [-73.959496, 40.653919]},
    mapId: 'poi.755914263725',
    name: 'Zen Vegetarian House',
    description: 'Best Chinese Food',
    communityId: 1,
    coverImg:
      'https://veggiebucks.com/wp-content/themes/directorypress/thumbs/Zen-Vegetarian-House-3.jpg'
  },
  {
    address: '2281 Church Ave, Brooklyn, NY, 11226',
    geometry: {type: 'point', coordinates: [-73.956137, 40.650774]},
    name: 'Four Seasons Bakery & Juice Bar',
    description: 'Caribbean Food',
    communityId: 1,
    coverImg:
      'https://cdn.usarestaurants.info/assets/uploads/847b80d645a8d56b5c81f19f5c7a51e6_-united-states-new-york-kings-county-967121-four-seasons-bakery-juice-barhtm.jpg'
  },
  {
    address: '100 N Moore St, New York, NY 10013',
    geometry: {type: 'point', coordinates: [-74.011574, 40.720112]},
    name: 'Tribeca Skatepark',
    mapId: 'poi.317827637293',
    description:
      'Street-style skatepark offering skateboarding & rollerblading with views of the Hudson River.',
    communityId: 3,
    coverImg: 'https://i.ytimg.com/vi/X4UUEU_sHf0/maxresdefault.jpg'
  },
  {
    address: '61 Bayard St, Brooklyn, NY 11222',
    geometry: {type: 'point', coordinates: [-73.94941, 40.71911]},
    name: 'McCarren Skatepark',
    mapId: 'poi.558345805093',
    description:
      'This small, free public skate park with steep banks offers a ledge feature & a quarter pipe.',
    communityId: 3,
    coverImg:
      'https://i1.wp.com/nyskateboarding.com/wp/wp-content/uploads/2016/07/OldMccarren.jpg?ssl=1'
  },
  {
    address: '140 Broadway, New York, NY 10005',
    geometry: {type: 'point', coordinates: [-74.010689, 40.709042]},
    name: 'Crunch Fitness - FiDi',
    description:
      'Our Gym is Your Gym Kick your feet up! With a gym designed around you, we think you’ll love it here.',
    communityId: 2,
    coverImg:
      'https://s3-media0.fl.yelpcdn.com/bphoto/I8DkuSXF7Sv1Id9Rdrn-Ag/348s.jpg'
  },
  {
    address: '9000-9038, Bay Pkwy, Brooklyn, NY 11214',
    geometry: {type: 'point', coordinates: [-74.0015, 40.59477]},
    name: 'Match point nyc',
    description: 'Sports & fitness for the entire family.',
    communityId: 2,
    coverImg:
      'https://images.squarespace-cdn.com/content/v1/57503b614c2f85c0e9457833/1465432627465-VQH25BFJR25CHIKZJ0U4/ke17ZwdGBToddI8pDm48kEiW2HMzXzufahHAFnxN3XR7gQa3H78H3Y0txjaiv_0fvbklG0cZ21UMsOO4RokMHB9cqTGTRbQKUrg7YbXc0SlqROx17-M3CJ_uqF218_GRZGjoBKy3azqku80C789l0k6sq9GEl9ZUDkp1sRKcAyKwvhSD1lk0p3Mkr1CFacdcMnkSfZTXFO8RHjUDmBQP4Q/MATCHPOINT.jpg?format=1500w'
  },
  {
    address: '41 Seaver Way, Queens, NY 11368',
    geometry: {type: 'point', coordinates: [-73.84584799999999, 40.757258]},
    name: 'Citi Field',
    mapId: 'poi.266287997901',
    description:
      'Citi Field is a baseball park located in Flushing Meadows–Corona Park in New York City. Completed in 2009, it is the home field of the New York Mets of the National League division of Major League Baseball.',
    // communityId: 13,
    coverImg:
      'https://elitesportsny.com/wp-content/uploads/2018/03/cincinnati-reds-v-new-york-mets-1-e1522096086300.jpg'
  },
  {
    address: '1240 6th Ave, New York, NY 10020',
    geometry: {type: 'point', coordinates: [-73.980782, 40.759409]},
    name: 'Magnolia Bakery',
    mapId: 'poi.446676654734',
    description:
      'This down-home destination for classic baked desserts specializes in a variety of creative cupcakes.',
    communityId: 1,
    coverImg:
      'https://d1v5vpeyrmf36z.cloudfront.net/media/CACHE/images/image-previews/landscape/Magnolia_Bakery/01455edf2201ab02ffa8041bdabea9c4.jpg'
  },
  {
    address: '200 5th Ave, New York, NY 10010',
    geometry: {type: 'point', coordinates: [-73.98954, 40.741973]},
    name: 'Eataly NYC - Flatiron',
    mapId: 'poi.833223738151',
    description:
      'Branch of the famed Italian market, offering counters, restaurants & cooking demos.',
    communityId: 1,
    coverImg: 'https://pbs.twimg.com/media/CjV9AkDXIAQkvGC.jpg'
  },
  {
    address: '465 W Broadway, New York, NY 10012',
    geometry: {type: 'point', coordinates: [-74.000028, 40.726421]},
    name: 'Harbs',
    mapId: 'poi.240518236968',
    description:
      'HARBS is a café born in Japan, pursuing freshness and hand-made quality above all else. Ever since we started, our one and only wish has been to make our customers say “DELICIOUS!” from the bottom of their hearts. We hope you savor every moment of joy you experience here at HARBS.',
    communityId: 1,
    coverImg:
      'https://blankcreations.com/wp-content/uploads/2018/12/HARBS_SOHO_02.jpg'
  },
  {
    address: '116 Greene St, New York, NY 10012',
    geometry: {type: 'point', coordinates: [-73.999279, 40.724771]},
    name: 'Louis Vuitton New York SoHo',
    mapId: 'poi.377957173793',
    description:
      'Luxury brand known for signature monogrammed handbags, luggage & more.',
    communityId: 4,
    coverImg:
      'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-find-a-store-us-louis-vuitton-new-york-soho-temporarily-closed--StFi_Louis_Vuitton_NEW_YORK_SOHO_Facede_556_DI3.jpg'
  },
  {
    address: '2310 Broadway, New York, NY 10024',
    geometry: {type: 'point', coordinates: [-73.97732, 40.786655]},
    name: 'AMC Movie Theaters',
    description:
      'Experience the difference of AMC amenities. From spacious rocking seats to luxury recliners, innovative menus and premium offerings like IMAX, Dolby Cinema, and Prime at AMC, AMC Theatres offers a range of ways to get more out of movies.',
    communityId: 7,
    coverImg:
      'https://amc-theatres-res.cloudinary.com/amc-cdn/production/2/theatres/2102/21020_mobile_84thst.jpg'
  },
  {
    address: '1000 5th Ave, New York, NY 10028',
    geometry: {type: 'point', coordinates: [-73.962879, 40.779209]},
    name: 'The Metropolitan Museum of Art',
    mapId: 'poi.867583421865',
    description:
      'The Metropolitan Museum of Art of New York City, colloquially "the Met", is the largest art museum in the United States. With 6,479,548 visitors to its three locations in 2019, it was the fourth most visited art museum in the world.',
    communityId: 8,
    coverImg:
      'https://www.metmuseum.org/-/media/images/visit/met-fifth-avenue/fifthave_teaser.jpg?la=en'
  },
  {
    address: '30 Lincoln Center Plaza, New York, NY 10023',
    geometry: {type: 'point', coordinates: [-73.984154, 40.772628]},
    name: 'Metropolitan Opera House',
    mapId: 'poi.171798725881',
    description:
      'The Metropolitan Opera House is an opera house located on Broadway at Lincoln Square on the Upper West Side of Manhattan in New York City. Part of Lincoln Center for the Performing Arts, the theater was designed by Wallace K. Harrison.',
    // communityId: 8,
    coverImg:
      'https://www.metopera.org/globalassets/visit/daytime-access/1600x685_2.jpg'
  },
  {
    address: '58 Warren St, New York, NY 10007',
    geometry: {type: 'point', coordinates: [-74.009166, 40.714899]},
    name: 'Mysterious Book Shop',
    mapId: 'poi.670014940514',
    description:
      'Bookstore with a floor-to-ceiling stock of new, used, rare & collectible crime & suspense titles.',
    // communityId: 10,
    coverImg: 'https://i.ytimg.com/vi/QYWxbDxMl4E/maxresdefault.jpg'
  },
  {
    address: '202 E 6th St, New York, NY 10003',
    geometry: {type: 'point', coordinates: [-73.990404, 40.728039]},
    name: 'Videogamesnewyork',
    mapId: 'poi.781684075121',
    description:
      'NYC Local Video Game Boutique that carries all generation of games from USA and Japan. Specializeing is Retro Video Games, System Restoration and Event Rental. Stocking everything from the Atari to the Nintendo Switch.',
    // communityId: 12,
    coverImg:
      'https://cdn7.bigcommerce.com/s-kzjsut/product_images/uploaded_images/storefront.jpg'
  },
  {
    address: '196 Allen St, New York, NY 10002',
    geometry: {type: 'point', coordinates: [-73.988559, 40.72235]},
    name: 'Rockwood Music Hall',
    mapId: 'poi.970662627739',
    description:
      'Rockwood Music Hall is a music venue at 196 Allen Street on the Lower East Side of Manhattan, New York City. Owner Ken Rockwood opened the establishment in 2005 as a small bar and music venue. The venue features three stages and a record label of the same name.',
    // communityId: 6,
    coverImg:
      'https://rockwoodmusichall.com/wp-content/uploads/2020/01/Rockwood-Approved-1_3000x2000.jpg'
  },
  {
    address: '140 Plymouth St, Brooklyn, NY 11201',
    geometry: {type: 'point', coordinates: [-73.987792, 40.703623]},
    name: 'Pet Promise Inc.',
    mapId: 'poi.824633769240',
    description:
      'PetPromise is a cat and dog rescue made up of a group of volunteers who care about the future of companion animals and who work together to help change the future of homeless pets.',
    // communityId: 9,
    coverImg:
      'https://s3-media0.fl.yelpcdn.com/bphoto/RbcnEjmijlhl9A-r1tqgTA/l.jpg'
  },
  {
    address:
      'Liberty State Park 222 Jersey City Boulevard Jersey City, NJ 07305',
    geometry: {type: 'point', coordinates: [-74.054482, 40.708336]},
    name: 'Liberty Science Center',
    mapId: 'poi.566935739357',
    description:
      'Liberty Science Center (LSC.org) is a 300,000-square-foot learning center located in Liberty State Park on the Jersey City bank of the Hudson near the Statue of Liberty.',
    // communityId: 5,
    coverImg:
      'https://hudsonreporter.com/wp-content/uploads/sites/15/2018/08/76FP_Liberty_Science_Center.jpg'
  }
]

// store 10 new locations created by generateUser into in the locationArray
const locationArray = [] // Array.from({length: 10}, generateLocation)
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
    profileImg: 'https://i.postimg.cc/V6zJNtSL/Food.jpg'
  },
  {
    name: 'Fitness',
    description: 'Be the hardest worker in the room',
    profileImg: 'https://i.postimg.cc/ZqBGysdw/Fitness.png'
  },
  {
    name: 'Skating',
    description: 'Life is alot like skateboarding ',
    profileImg: 'https://i.postimg.cc/508DsHpv/skating.jpg'
  },
  {
    name: 'Fashion',
    description: 'Being yourself never goes out of fashion ',
    profileImg: 'https://i.postimg.cc/YCVVkNsY/fashion.jpg'
  },
  {
    name: 'Technology',
    description: 'Its not that we use Technology, we live Technology',
    profileImg: 'https://i.postimg.cc/ZnTsjwWt/tech.jpg'
  },
  {
    name: 'Music',
    description: 'Good Music doesnt have an expiration date',
    profileImg: 'https://i.postimg.cc/L68010dj/music.jpg'
  },
  {
    name: 'Film',
    description: 'Heres looking at you, kid',
    profileImg: 'https://i.postimg.cc/yYppXXBt/film.jpg'
  },
  {
    name: 'Art',
    description: 'Art is too important not to share',
    profileImg: 'https://i.postimg.cc/vHT3Bg9z/starry-night.jpg'
  },
  {
    name: 'Pets',
    description: 'What greater gift than the love of a pet',
    profileImg: 'https://i.postimg.cc/HL9LFLSG/pets.jpg'
  },
  {
    name: 'Books',
    description: 'Once you learn to read, you will be forever free',
    profileImg: 'https://i.postimg.cc/fbNcxJ31/book.jpg'
  },
  {
    name: 'Career',
    description: 'All progress takes place outside the comfort Zone',
    profileImg: 'https://i.postimg.cc/zXHK6nK9/career.jpg'
  },
  {
    name: 'Games',
    description: 'Life is More fun if you Play Games',
    profileImg: 'https://i.postimg.cc/mgxCstSh/game.jpg'
  },
  {
    name: 'Sports',
    description: 'You re never a loser until you quit',
    profileImg: 'https://i.postimg.cc/T3rmYfk0/sports.jpg'
  },
  {
    name: 'Meme',
    description: 'I never said that',
    profileImg: 'https://i.postimg.cc/7L920XrT/meme.jpg'
  },
  {
    name: 'Outdoors',
    description: 'The greatest adventure is what lies ahead',
    profileImg: 'https://i.postimg.cc/Cx3YhnPB/outdoor.jpg'
  },
  {
    name: 'Health',
    description: 'Happiness is the highest form of health',
    profileImg: 'https://i.postimg.cc/Rh6JrB6c/health.jpg'
  }
]

// store 10 new communities created by generateUser into in the communityArray
const communityArray = Array.from({length: 0}, generateCommunity)
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

  // // loop through locations in case communityId is null...
  // for (let i = 0; i < locations.length; i++) {
  //   if (locations[i].communityId === undefined) {
  //     locations[i].communityId = 1
  //     await locations[i].save()
  //   }
  // }

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
