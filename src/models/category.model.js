'use strict'

import mongoose, { Schema } from "mongoose"
import { Types } from "mongoose"

const categorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category_description: {
      type: String,
      required: true,
      trim: true
    },
    category_parent_id: {
      type: Types.ObjectId
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
)

export default mongoose.model('Category', categorySchema)