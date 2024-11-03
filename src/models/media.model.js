'use strict'

import mongoose from "mongoose"

const mediaSchema = mongoose.Schema(
  {
    media_name: {
      type: String,
      trim: true
    },
    media_path: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
)

export default mongoose.model('Media', mediaSchema)