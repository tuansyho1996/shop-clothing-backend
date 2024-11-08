import { OK, CREATED } from "../core/success.response.js";
import ProductOfCategoryService from "../services/product.of.category.service.js";
class ProductsOfCategoryController {
  getProductsCategory = async (req, res) => {
    return new OK({
      message: "Get successful products category",
      metadata: await ProductOfCategoryService.getProductsCategory(req.params.category)
    }).send(res)
  }

}

export default new ProductsOfCategoryController