import { BadRequestError } from '../core/error.response.js'
import productModel from '../models/product.model.js'

class ProductService {
  createProduct = async (data) => {
    const newProduct = await productModel.create(data)
    return newProduct
  }
  getProductById = async (_id) => {
    const product = await productModel.findById(_id)
    if (!product) {
      throw new BadRequestError('Product id invalid!')
    }
    return product
  }
  getAllProduct = async () => {
    const products = await productModel.find().lean()
    return products
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