'use strict'

import mongoose, { Schema } from "mongoose"

const orderSchema = mongoose.Schema(
  {
    order_info: {
      type: Schema.Types.Mixed,
      required: true
    },
    order_status: {
      type: String,
      enum: ['Comfirmed', 'Processing', 'Shipped', 'Completed'],
      default: 'Comfirmed'
    },
    number_order: {
      type: Number,
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
)



export default mongoose.model('Order', orderSchema)