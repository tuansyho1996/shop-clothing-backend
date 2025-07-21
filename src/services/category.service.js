'use strict'
import categoryModel from '../models/category.model.js'
import topCategory from '../models/top.category.model.js'

class CategoryService {
  createCategory = async (data) => {
    const newCategory = await categoryModel.create(data)
    return newCategory
  }
  getCategory = async (slug) => {
    if (slug === 'all') {
      const categories = await categoryModel.find().sort({ category_level: 1, }).lean()
      return categories
    }
    else {
      const categoriesArray = slug.split('&')
      const category = await categoryModel.find({
        category_slug: { $in: categoriesArray }
      }).sort({ category_level: 1, }).lean()
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
  getTopCategory = async () => {
    const category = await topCategory.find().lean()
    return category
  }
  updateTopCategory = async (bodyUpdate) => {
    const { top_ct_name_old, ...updateFields } = bodyUpdate;
    const category = await topCategory.findOneAndUpdate(
      { _id: bodyUpdate._id },
      {
        $set: updateFields
      }
      ,
      { new: true, upsert: true, projection: { __v: 0 } })
    const categories = await topCategory.find();
    return categories
  }
  deleteTopCategory = async (id) => {
    const deleteCategory = await topCategory.deleteOne({ _id: id })
    const categories = await topCategory.find();
    return categories
  }
}
export default new CategoryService

