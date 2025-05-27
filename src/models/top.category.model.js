'use strict'
import mongoose from "mongoose"

const topCategorySchema = mongoose.Schema(
    {
        top_ct_name: { type: String }, // Define "name" in the schema
        top_ct_categories: { type: [String], default: [] },          // Define "categories" in the schema
        top_ct_name_categories: { type: [String], default: [] }, // Define "name_categories" in the schema
        top_ct_image: { type: [String] }
    }
)

export default mongoose.model('TopCategory', topCategorySchema)

