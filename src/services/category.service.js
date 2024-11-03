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
  getCategory = async (name) => {
    if (name === 'all') {
      const categories = await categoryModel.find().lean()
      return categories
    }
    else {
      const category = await categoryModel.findById(name)
      return category
    }
  }
  updateCategory = async (id, bodyUpdate) => {
    if (bodyUpdate.category_parent) {
      const categoryParent = await categoryModel.findOne({ category_name: bodyUpdate.category_parent }).lean()
      bodyUpdate.category_parent_id = categoryParent._id
    }
    else {
      bodyUpdate.category_parent_id = null
    }
    const category = await categoryModel.findOneAndUpdate({ _id: id }, bodyUpdate, { new: true })
    return category
  }
  deleteCategory = async (id) => {
    const deleteCategory = await categoryModel.deleteOne({ _id: id })
    return deleteCategory
  }
}
export default new CategoryService

