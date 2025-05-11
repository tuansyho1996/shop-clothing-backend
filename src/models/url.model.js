'use strict'

import mongoose from "mongoose"

const urlSchema = mongoose.Schema(
    {
        url_name: {
            type: String,
            trim: true,
            required: true
        },
        url_path: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true, // Automatically creates `createdAt` and `updatedAt`
    }
)

export default mongoose.model('Media', urlSchema)