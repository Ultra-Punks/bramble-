const router = require('express').Router()
const {Community} = require('../db/models')
module.exports = router

// get all community
router.get('/', async (req, res, next) => {
  try {
    const allCommunity = await Community.findAll()
    console.log(allCommunity)

    res.json(allCommunity)
  } catch (error) {
    next(error)
  }
})

// get community by name
router.get('/:communityName', async (req, res, next) => {
  try {
    const CName = req.params.communityName
    const selectCommunity = await Community.findOne({
      where: {name: CName}
    })
    res.json(selectCommunity)
  } catch (error) {
    next(error)
  }
})

// get community by id
router.get('/list/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const selectedCommunity = await Community.findOne({
      where: {id: id}
    })
    res.json(selectedCommunity)
  } catch (error) {
    next(error)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     const newCommunity = await Community.create(req.body)
//     res.json(newCommunity)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const communityId = req.params.id
//     const removeCommunity = await communityId.destroy({
//       where: {
//         id: communityId
//       }
//     })
//     res.json(removeCommunity)
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:id', async (req, res, next) => {
//   try {
//     const communityId = req.params.id
//     const [, community] = await Community.create(req.body, {
//       where: {
//         id: communityId,
//         returning: true
//       }
//     })
//     res.json(community)
//   } catch (error) {
//     next(error)
//   }
// })
