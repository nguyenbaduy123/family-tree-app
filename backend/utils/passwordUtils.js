const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

const comparePassword = async (password, hashPassword) => {
  const isMatch = await bcrypt.compare(password, hashPassword)
  return isMatch
}

module.exports = {
  hashPassword,
  comparePassword,
}
