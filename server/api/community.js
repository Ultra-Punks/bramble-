const router = require('express').Router()
const {Community, User} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router
const isCurrentUserMiddleware = require('./middleware')

// get all community
router.get('/', async (req, res, next) => {
  try {
    const allCommunity = await Community.findAll()

    res.json(allCommunity)
  } catch (error) {
    next(error)
  }
})

// get community by name
router.get('/:communityName', async (req, res, next) => {
  try {
    const CName = req.params.communityName.toLowerCase()
    const selectCommunity = await Community.findAll({
      where: {
        name: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('name')),
          'LIKE',
          '%' + CName + '%'
        )
      }
    })
    res.json(selectCommunity)
  } catch (error) {
    next(error)
  }
})

router.put('/random', async (req, res, next) => {
  try {
    const arrOfIds = req.body.communityIds
    const randomCommunities = await Community.findAll({
      where: {id: arrOfIds}
    })
    res.json(randomCommunities)
  } catch (error) {
    next(error)
  }
})

// get community by id
router.get('/list/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const selectedCommunity = await Community.findByPk(id, {
      include: [{model: User}]
    })

    if (req.session.passport) {
      const loggedIn = await User.findByPk(req.session.passport.user)
      const isSubscribed = await loggedIn.hasSubscriber(selectedCommunity)

      res.json({
        communityProfile: selectedCommunity,
        isSubscribed: isSubscribed
      })
    } else {
      res.json({communityProfile: selectedCommunity, isSubscribed: false})
    }
  } catch (error) {
    next(error)
  }
})

//logged in user subscribe to a community
router.put('/subscribe', isCurrentUserMiddleware, async (req, res, next) => {
  try {
    let loggedIn = await User.findByPk(req.session.passport.user)

    let subToCommunity = await Community.findByPk(req.body.communityId)

    loggedIn.addSubscriber(subToCommunity)
    subToCommunity.subscribers++
    await loggedIn.save()
    await subToCommunity.save()

    const isSubscribed = await loggedIn.hasSubscriber(subToCommunity)

    let updatedCommunity = await Community.findByPk(req.body.communityId, {
      include: [{model: User}]
    })

    res.json({communityProfile: updatedCommunity, isSubscribed: isSubscribed})
  } catch (error) {
    next(error)
  }
})

//logged in user unsubscribe from community
router.put('/unsubscribe', isCurrentUserMiddleware, async (req, res, next) => {
  try {
    let loggedIn = await User.findByPk(req.session.passport.user)

    let unSubToCommunity = await Community.findByPk(req.body.communityId)

    loggedIn.removeSubscriber(unSubToCommunity)
    unSubToCommunity.subscribers--
    await loggedIn.save()
    await unSubToCommunity.save()

    const isSubscribed = await loggedIn.hasSubscriber(unSubToCommunity)

    let updatedCommunity = await Community.findByPk(req.body.communityId, {
      include: [{model: User}]
    })

    res.json({communityProfile: updatedCommunity, isSubscribed: isSubscribed})
  } catch (error) {
    next(error)
  }
})
