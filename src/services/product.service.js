import productModel from '../models/product.model.js'
import categoryModel from '../models/category.model.js'

class ProductService {
  createProduct = async (data) => {
    const newProduct = await productModel.create(data)
    return newProduct
  }
  getAllProduct = async (slug) => {
    if (slug === 'all') {
      const products = await productModel.find().sort({ createdAt: -1 }).lean()
      return products
    }
    else {
      const product = await productModel.findOne({ product_slug: slug }).lean()
      if (product.product_list_categories.includes('unisex')) {
        product.product_list_categories = product.product_list_categories.filter((cat) => cat !== 'men' && cat !== 'women')
      }
      const categories = await categoryModel.find({ category_slug: { $in: product.product_list_categories } }).sort({ category_level: 1, }).lean()
      const categoryNames = categories.map((cat) => cat.category_name);
      product.product_list_categories_name = categoryNames
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