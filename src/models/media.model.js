'use strict'

import mongoose from "mongoose"

const mediaSchema = mongoose.Schema({
  media_name: {
    type: String,
  },
  media_path: {
    type: String,
    required: true
  }
})

export default mongoose.model('Media', mediaSchema)