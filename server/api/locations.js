const router = require('express').Router()
const {Location, User, LocationReview, Community} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

// get locations by community
router.get('/of/:id', async (req, res, next) => {
  try {
    const locations = await Location.findAll({
      where: {
        communityId: req.params.id,
        geometry: {[Op.ne]: null}
      }
    })
    res.json(locations)
  } catch (err) {
    next(err)
  }
})
// get locations by user
router.get('/from/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {username: req.params.username}
    })
    const locations = await Location.findAll({
      where: {
        userId: user.id,
        geometry: {[Op.ne]: null}
      }
    })
    res.json(locations)
  } catch (err) {
    next(err)
  }
})
// get locations for logged in user's home feed
router.get('/home', async (req, res, next) => {
  try {
    const loggedInUser = await User.findOne({
      where: {
        id: req.user.id
      }
    })

    const allFollowing = await loggedInUser.getFollowing()
    const allSubs = await loggedInUser.getSubscriber()

    let arrOfIds = allFollowing.map(user => {
      return user.id
    })
    let arrOfComIds = allSubs.map(sub => {
      return sub.id
    })

    arrOfIds.push(loggedInUser.id)

    const locations = await Location.findAll({
      where: {
        geometry: {[Op.ne]: null},
        [Op.or]: [{userId: arrOfIds}, {communityId: arrOfComIds}]
      },
      include: [
        {model: User},
        {model: Community, attributes: ['name']},
        // {model: Photo, include: [{model: Tag}]},
        {
          model: LocationReview,
          include: [{model: User}],
          order: [['createdAt', 'DESC']]
        }
      ],
      order: [['createdAt', 'DESC']]
    })
    res.json(locations)
  } catch (err) {
    next(err)
  }
})
// single location routes
router.post('/add', async (req, res, next) => {
  try {
    const {
      id,
      place_type,
      properties,
      text,
      place_name,
      center,
      geometry,
      context,
      name,
      city,
      address,
      description
    } = req.body
    const location = await Location.create({
      mapId: id,
      place_type,
      properties,
      text,
      place_name,
      center,
      geometry,
      context,
      name,
      city,
      address,
      description,
      popup: false
    })
    res.json(location)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const location = await Location.findByPk(req.params.id, {
      include: [
        {model: LocationReview, include: [{model: User}]},
        {model: Community},
        {model: User}
      ]
    })
    res.json(location)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    //below will only return locations with coordinates
    const locations = await Location.findAll({
      where: {geometry: {[Op.ne]: null}}
    })
    res.json(locations)
  } catch (err) {
    next(err)
  }
})
