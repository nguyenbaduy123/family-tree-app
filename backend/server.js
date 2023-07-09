const multer = require('multer')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')
const peopleRoutes = require('./routes/peopleRoutes')
const familyRoutes = require('./routes/familyRoutes')
const eventRoutes = require('./routes/eventRoutes')
const { verifyToken } = require('./middleware/authentication')

const {
  storage,
  fileFilter,
  uploadResult,
  uploadSuccess,
  getFile,
} = require('./middleware/uploads')
const upload = multer({
  dest: 'uploads/',
  storage: storage,
  fileFilter: fileFilter,
})

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.customParams = {
    ...req.body,
    ...req.query,
  }
  next()
})

app.get('/assets/:fileName', getFile)

app.use('/api/users', userRoutes)

app.use(verifyToken)

app.use('/api/families', familyRoutes)
app.use('/api/people', peopleRoutes)
app.use('/api/events', eventRoutes)

app.post('/api/uploads', upload.single('file'), uploadResult, uploadSuccess)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found!' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

const port = process.env.PORT || 1234
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
