'use strict'

import mongoose from "mongoose"

const blogSchema = mongoose.Schema(
    {
        blog_title: {
            type: String,
            required: true,
            trim: true
        },
        blog_content: {
            type: String,
            required: true,
            trim: true
        },
        blog_image: {
            type: String,
            required: true,
            trim: true
        },
        blog_category: {
            type: String,
            required: true,
            trim: true
        },
        blog_tags: {
            type: [String],
            required: true,
            trim: true
        }
    },
    {
        timestamps: true, // Automatically creates `createdAt` and `updatedAt`
    }
)
export default mongoose.model('Blog', blogSchema)