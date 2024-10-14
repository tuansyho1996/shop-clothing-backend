'use strict'

import mongoose, { Schema } from "mongoose"
import { Types } from "mongoose"

const categorySchema = mongoose.Schema({
  category_name: {
    type: String,
    required: true
  },
  category_description: {
    type: String,
    required: true
  },
  category_parent_id: {
    type: Types.ObjectId
  }
})

export default mongoose.model('Category', categorySchema)