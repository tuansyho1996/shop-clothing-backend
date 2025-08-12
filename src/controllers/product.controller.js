import { OK, CREATED } from "../core/success.response.js";
import ProductService from "../services/product.service.js";

class ProductController {
  createProduct = async (req, res) => {
    return new CREATED({
      message: "Create successful product",
      metadata: await ProductService.createProduct(req.body)
    }).send(res)
  }
  getProduct = async (req, res) => {
    return new OK({
      message: 'Get successful all product',
      metadata: await ProductService.getProduct(req.params.slug, req.query)
    }).send(res)
  }
  getProductSiteMap = async (req, res) => {
    return new OK({
      message: 'Get successful product sitemap',
      metadata: await ProductService.getProductSiteMap()
    }).send(res)
  }
  getProductShop = async (req, res) => {
    return new OK({
      message: 'Get successful product for shop',
      metadata: await ProductService.getProductShop(req.query.page)
    }).send(res)
  }
  getProductBestSeller = async (req, res) => {
    return new OK({
      message: 'Get successful best seller product',
      metadata: await ProductService.getProductBestSeller()
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
  convertPriceToEth = async (req, res) => {
    return new OK({
      message: 'Convert successful price product to eth',
      metadata: await ProductService.convertPriceToEth()
    }).send(res)
  }
  removeProductFromBestSeller = async (req, res) => {
    return new OK({
      message: 'Remove product from best seller category',
      metadata: await ProductService.removeProductFromBestSeller(req.params.id)
    }).send(res)
  }
}

export default new ProductController
