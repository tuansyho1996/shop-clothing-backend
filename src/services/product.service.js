import { BadRequestError } from '../core/error.response.js'
import productModel from '../models/product.model.js'

class ProductService {
  createProduct = async (data) => {
    const newProduct = await productModel.create(data)
    return newProduct
  }
  getAllProduct = async (id) => {
    if (id === 'all') {
      const products = await productModel.aggregate([
        {
          $lookup: {
            from: "categories",              // Collection to join
            localField: "product_category_id",       // Field from products collection
            foreignField: "_id",             // Field from categories collection
            as: "category_details"           // Output array field to hold the joined data
          }
        },
        {
          $unwind: {
            path: "$parentCategory",
            preserveNullAndEmptyArrays: true // Keep categories without parents
          }
        },
        {
          $project: {
            _id: 1,                          // Include product ID
            product_name: 1,                         // Include product name
            product_description: 1,                         // Include product name
            product_price: 1,                         // Include product name
            product_images: 1,                         // Include product name
            "category_details.category_name": 1       // Include category name
          }
        }
      ])
      return products
    }
    else {
      const product = await productModel.aggregate([
        {
          $match: { _id: ObjectId(id) }  // Filter to find the product by its _id
        },
        {
          $lookup: {
            from: "categories",              // Collection to join
            localField: "product_category_id",       // Field from products collection
            foreignField: "_id",             // Field from categories collection
            as: "category_details"           // Output array field to hold the joined data
          }
        },
        {
          $unwind: {
            path: "$parentCategory",
            preserveNullAndEmptyArrays: true // Keep categories without parents
          }
        },
        {
          $project: {
            _id: 1,                          // Include product ID
            product_name: 1,                         // Include product name
            product_description: 1,                         // Include product name
            product_price: 1,                         // Include product name
            product_images: 1,                         // Include product name
            "category_details.category_name": 1       // Include category name
          }
        }
      ])
      return product
    }
  }
  updateProduct = async (_id, bodyUpdate) => {
    const product = await productModel.findByIdAndUpdate(_id, bodyUpdate, { new: true })
    return product
  }
  deleteProduct = async (id) => {
    return await productModel.deleteOne({ _id: id })
  }
}
export default new ProductService