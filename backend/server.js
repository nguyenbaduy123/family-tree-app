require('dotenv').config()
const express = require('express')
// const cors = require("cors");
const app = express()
// app.use(cors());

const userRoutes = require('./routes/userRoutes')
const peopleRoutes = require('./routes/peopleRoutes')
const familyRoutes = require('./routes/familyRoutes')
const { verifyToken } = require('./middleware/authentication')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.customParams = {
    ...req.body,
    ...req.query,
  }
  next()
})

app.use('/api/users', userRoutes)
app.use('/api/families', verifyToken, familyRoutes)
app.use('/api/people', verifyToken, peopleRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found!!!123' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

const port = process.env.PORT || 1234
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
