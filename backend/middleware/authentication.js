const jwt = require('jsonwebtoken')
const {
  unauthorized,
  response,
  serverError,
} = require('../utils/responseUtils')

const verifyToken = (req, res, next) => {
  req.customParams = { ...req.customParams, ...req.params }
  const authorization = req.headers['authorization']
  if (!authorization) {
    return response(res, unauthorized())
  }

  const token = authorization.split(' ')[1]
  if (!token) {
    return response(res, unauthorized())
  }

  try {
    const { user } = jwt.verify(token, process.env.SECRET_KEY)
    if (user) {
      req.customParams = { ...req.customParams, user_id: user.id }
      next()
    } else {
      return response(res, unauthorized())
    }
  } catch (err) {
    console.log('Auth failed: ', err)
    return response(res, serverError(err.message))
  }
}

module.exports = { verifyToken }
