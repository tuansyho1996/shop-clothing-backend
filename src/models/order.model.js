'use strict'

import mongoose, { Schema } from "mongoose"
import slugify from "slugify"

const orderSchema = mongoose.Schema(
  {
    order_info: {
      type: Schema.Types.Mixed,
      required: true
    },
    order_info_customer: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
)



export default mongoose.model('Order', orderSchema)