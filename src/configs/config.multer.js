'use strict'

import multer from "multer"

const uploadDisk = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})
const uploadMemory = multer({
  storage: multer.memoryStorage()
})

export {
  uploadDisk,
  uploadMemory
}