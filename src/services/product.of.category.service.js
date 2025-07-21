import { BadRequestError } from '../core/error.response.js'
import categoryModel from '../models/category.model.js'
import productModel from '../models/product.model.js';

class ProductsOfCategoryService {
  getProductsCategory = async (category, limit, page) => {
    const categoryArray = category.split("--");
    // Đảm bảo limit và page là số nguyên hợp lệ
    limit = parseInt(limit) || 12;
    page = parseInt(page) || 1;
    const skip = (page - 1) * limit;

    // Đếm tổng số sản phẩm thỏa điều kiện
    const totalProducts = await productModel.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'product_list_categories',
          foreignField: 'category_slug',
          as: 'categoryDetails',
        },
      },
      {
        $match: {
          'categoryDetails.category_slug': { $all: categoryArray },
        },
      },
      {
        $count: "total",
      },
    ]);

    const total = totalProducts[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Truy vấn sản phẩm phân trang
    const products = await productModel.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'product_list_categories',
          foreignField: 'category_slug',
          as: 'categoryDetails',
        },
      },
      {
        $match: {
          'categoryDetails.category_slug': { $all: categoryArray },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          categoryDetails: 0,
        },
      },
    ]);

    return { products, totalPages };
  }
}
export default new ProductsOfCategoryService

