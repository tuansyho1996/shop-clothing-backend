import { OK, CREATED } from "../core/success.response.js";
import ProductService from "../services/product.service.js";

class ProductController {
  createProduct = async (req, res) => {
    return new CREATED({
      message: "Create successful product",
      metadata: await ProductService.createProduct(req.body)
    }).send(res)
  }
  getProductById = async (req, res) => {
    return new OK({
      message: "Get successful product",
      metadata: await ProductService.getProductById(req.params.id)
    }).send(res)
  }
  getAllProduct = async (req, res) => {
    return new OK({
      message: 'Get successful all product',
      metadata: await ProductService.getAllProduct()
    }).send(res)
  }
  updateProduct = async (req, res) => {
    return new OK({
      message: 'Update successful product',
      metadata: await ProductService.updateProduct(req.params.id, req.body)
    }).send(res)
  }
  deleteProduct = async (req, res) => {
    return new OK({
      message: 'Delete successful product',
      metadata: await ProductService.deleteProduct(req.params.id)
    }).send(res)
  }
}

export default new ProductController
