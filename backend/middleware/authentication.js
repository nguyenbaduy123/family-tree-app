require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authorization = req.headers['authorization']
  if (!authorization) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  const token = authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY)
    req.userId = user.id
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }
}

module.exports = { verifyToken }