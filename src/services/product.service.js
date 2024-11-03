import productModel from '../models/product.model.js'

class ProductService {
  createProduct = async (data) => {
    const newProduct = await productModel.create(data)
    return newProduct
  }
  getAllProduct = async (slug) => {
    if (slug === 'all') {
      const products = await productModel.find().lean()
      return products
    }
    else {
      const product = await productModel.findOne({ product_slug: slug }).lean()
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