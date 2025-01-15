'use strict'
import slugify from "slugify"
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
    category_slug: {
      type: String,
      unique: true,
      trim: true,
    },
    category_level: {
      type: Number,
      default: 0
    },
    category_description: {
      type: String,
      required: true,
      trim: true
    },
    category_parent: {
      type: String,
      trim: true
    },
    category_image: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
)
categorySchema.pre('save', function (next) {
  this.category_slug = slugify(this.category_name, { lower: true })
  next()
})

export default mongoose.model('Category', categorySchema)