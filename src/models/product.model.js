  'use strict'

import mongoose, { Schema } from "mongoose"
import { Types } from "mongoose"

const productSchema = mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  product_description: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  product_category_id: {
    type: Types.ObjectId,
  },
  product_images: {
    type: [String],
  },
  product_attribute: {
    type: Schema.Types.Mixed,
  }
})

export default mongoose.model('Product', productSchema)