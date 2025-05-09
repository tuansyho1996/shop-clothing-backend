'use strict'

import mongoose from "mongoose"
import slugify from "slugify"

const blogSchema = mongoose.Schema(
    {
        blog_title: {
            type: String,
            required: true,
            trim: true
        },
        blog_slug: {
            type: String,
            trim: true,
            unique: true
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
    },
    {
        timestamps: true, // Automatically creates `createdAt` and `updatedAt`
    }
)
blogSchema.pre('save', async function (next) {
    let baseSlug = slugify(this.blog_title, { lower: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    // Check if a blog with the same slug already exists
    while (await mongoose.models.Blog.exists({ blog_slug: uniqueSlug })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
    }
    this.blog_slug = uniqueSlug;
    next();
}
)
export default mongoose.model('Blog', blogSchema)