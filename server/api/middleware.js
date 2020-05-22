const isCurrentUserMiddleware = (req, res, next) => {
  const currentUser = req.session.passport.user
  if (currentUser === req.currentUser.dataValues.id) {
    next()
  } else {
    const error = new Error('Access Denied! Not current User!')
    next(error)
  }
}

module.exports = {
  isCurrentUserMiddleware
}
