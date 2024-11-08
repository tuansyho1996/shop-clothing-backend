import { BadRequestError } from '../core/error.response.js'
import categoryModel from '../models/category.model.js'

class CategoryService {
  createCategory = async (data) => {
    const newCategory = await categoryModel.create(data)
    return newCategory
  }
  getCategory = async (slug) => {
    if (slug === 'all') {
      const categories = await categoryModel.find().lean()
      return categories
    }
    else {
      const categoriesArray = slug.split('&')
      const category = await categoryModel.find({
        category_slug: { $in: categoriesArray }
      })
      return category
    }
  }
  updateCategory = async (id, bodyUpdate) => {
    const category = await categoryModel.findOneAndUpdate({ _id: id }, bodyUpdate, { new: true })
    return category
  }
  deleteCategory = async (id) => {
    const deleteCategory = await categoryModel.deleteOne({ _id: id })
    return deleteCategory
  }
}
export default new CategoryService

