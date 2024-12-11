'use strict'
import mongoose from "mongoose"

const topCategorySchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true }, // Define "name" in the schema
        categories: { type: [String], default: [] },          // Define "categories" in the schema
    }
)

export default mongoose.model('TopCategory', topCategorySchema)