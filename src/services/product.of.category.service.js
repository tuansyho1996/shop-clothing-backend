import { BadRequestError } from '../core/error.response.js'
import categoryModel from '../models/category.model.js'
import productModel from '../models/product.model.js';

class ProductsOfCategoryService {
  getProductsCategory = async (category) => {
    const categoryArray = category.split("&")
    const productsOfCategory = await productModel.aggregate([
      {
        $lookup: {
          from: 'categories', // Collection name for `Category`
          localField: 'product_list_categories', // Field in `Product` schema
          foreignField: 'category_slug', // Field in `Category` schema
          as: 'categoryDetails', // Output array field
        },
      },
      {
        $match: {
          'categoryDetails.category_slug': { $all: categoryArray },
        },
      },
      {
        $sort: {
          createdAt: -1, // Sắp xếp giảm dần theo ngày tạo (mới nhất trước)
        },
      },
      {
        $project: {
          categoryDetails: 0, // Exclude category details if needed
        },
      },
    ])
      ;
    return productsOfCategory
  }
}
export default new ProductsOfCategoryService

