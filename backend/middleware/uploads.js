const path = require('path')
const fs = require('fs')
const multer = require('multer')
const crypto = require('crypto')

const { response, badRequest, notFound } = require('../utils/responseUtils')

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const randomName = crypto.randomBytes(10).toString('hex')
    const originalExtension = path.extname(file.originalname)
    cb(null, randomName + originalExtension)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.png']
  const fileExtension = path.extname(file.originalname)

  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true)
  } else {
    cb(new Error('Chỉ chấp nhận file jpg và png.'))
  }
}

const uploadResult = (err, req, res, next) => {
  if (err) return response(res, badRequest(err.message))
  next()
}

const uploadSuccess = (req, res) => {
  const url = `${req.protocol}://${req.get('host')}/assets/${req.file.filename}`
  return response(res, { url })
}

const getFile = (req, res) => {
  const fileName = req.params.fileName
  const uploadsDirectory = path.join(__dirname, '../uploads')
  const filePath = path.join(uploadsDirectory, fileName)
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      return res.sendFile(filePath)
    }
    return response(res, notFound('File không tồn tại'))
  })
}

module.exports = { storage, fileFilter, uploadResult, uploadSuccess, getFile }
