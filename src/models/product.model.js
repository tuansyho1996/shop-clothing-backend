'use strict'

import mongoose, { Schema } from "mongoose"
import slugify from "slugify"

const productSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true
    },
    product_slug: {
      type: String,
      trim: true
    },
    product_description: {
      type: String,
      trim: true
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_list_categories: {
      type: [String],
    },
    product_images: {
      type: [String],
      trim: true
    },
    product_colors: {
      type: [String],
      trim: true
    },
    product_color_images: {
      type: [String],
      trim: true
    },
    product_attribute: {
      type: Schema.Types.Mixed,
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
)

productSchema.pre('save', async function (next) {
  let baseSlug = slugify(this.product_name, { lower: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Check if a product with the same slug already exists
  while (await mongoose.models.Product.exists({ product_slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.product_slug = uniqueSlug;
  next();
});

export default mongoose.model('Product', productSchema)