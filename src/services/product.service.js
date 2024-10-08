import { BadRequestError } from '../core/error.response.js'
import productModel from '../models/product.model.js'

class ProductService {
  createProduct = async (data) => {
    const newProduct = await productModel.create({
      product_name: data.name,
      product_description: data.description,
      product_price: data.price
    })
    return newProduct
  }
  getProductById = async (_id) => {
    const product = await productModel.findById(_id)
    if (!product) {
      throw new BadRequestError('Product id invalid!')
    }
    return product
  }
}
export default new ProductService