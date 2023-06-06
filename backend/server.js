require('dotenv').config()
const express = require('express')
const app = express()

const userRoutes = require('./routes/userRoutes')
const peopleRoutes = require('./routes/peopleRoutes')
const { verifyToken } = require('./middleware/authentication')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)
app.use('/api/people', verifyToken, peopleRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

const port = process.env.PORT || 1234
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
