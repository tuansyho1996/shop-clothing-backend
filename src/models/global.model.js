'use strict'

import mongoose, { Schema } from "mongoose"

const globalSchema = mongoose.Schema(
    {
        global_name: {
            type: String,
            trim: true,
            required: true
        },
        global_value: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true, // Automatically creates `createdAt` and `updatedAt`
    }
)

export default mongoose.model('Global', globalSchema)