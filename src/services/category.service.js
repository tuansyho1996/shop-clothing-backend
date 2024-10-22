import { BadRequestError } from '../core/error.response.js'
import categoryModel from '../models/category.model.js'

class CategoryService {
  createCategory = async (data) => {
    const { category_name, category_description, category_parent } = data
    const body = { category_name, category_description }
    const categoryParent = await categoryModel.findOne({ category_name: category_parent }).lean()
    if (categoryParent) {
      body.category_parent_id = categoryParent._id
    }
    const newCategory = await categoryModel.create(body)
    return newCategory
  }
  getCategory = async (id) => {
    if (id === 'all') {
      const categories = await categoryModel.aggregate([
        {
          $lookup: {
            from: "categories",  // Join the categories collection with itself to get parent details
            localField: "category_parent_id",
            foreignField: "_id",
            as: "parentCategory"
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
            "category_name": 1,
            "category_description": 1,
            "category_parent": "$parentCategory.category_name", // Display the parent category's name
            "category_parent_id": 1
          }
        }
      ])
      return categories
    }
    else {
      const category = await categoryModel.findById(id)
      return category
    }
  }
  updateCategory = async (id, bodyUpdate) => {
    const categoryParent = await categoryModel.findOne({ category_name: bodyUpdate.category_parent }).lean()
    const category = await categoryModel.findOneAndUpdate({ _id: id }, { ...bodyUpdate, category_parent_id: categoryParent._id }, { new: true })
    return category
  }
  deleteCategory = async (id) => {
    const deleteCategory = await categoryModel.deleteOne({ _id: id })
    return deleteCategory
  }
}
export default new CategoryService

