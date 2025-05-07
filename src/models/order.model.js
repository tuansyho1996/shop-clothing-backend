'use strict'

import mongoose, { Schema } from "mongoose"

const orderSchema = mongoose.Schema(
  {
    order_info: {
      type: Schema.Types.Mixed,
      required: true
    },
    order_info_customer: {
      type: Schema.Types.Mixed,
    },
    order_status: {
      type: String,
      enum: ['Comfirmed', 'Processing', 'Shipped', 'Completed'],
      default: 'Comfirmed'
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
)



export default mongoose.model('Order', orderSchema)