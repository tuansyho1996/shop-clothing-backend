import productModel from '../models/product.model.js'
import categoryModel from '../models/category.model.js'
import reviewModel from '../models/review.model.js'
import globalModel from '../models/global.model.js'
import slugify from 'slugify'

class ProductService {
  generateUniqueSlug = async (productName) => {
    let baseSlug = slugify(productName, { lower: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await productModel.exists({ product_slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  }
  createProduct = async (data) => {
    const categories = await categoryModel.find({ category_slug: { $in: data.product_list_categories } }).sort({ category_level: 1, }).lean()
    data.product_list_categories = categories.map((cat) => cat.category_slug);
    const slug = await this.generateUniqueSlug(data.product_name);
    data.product_slug = slug;
    const newProduct = await productModel.create(data)
    return newProduct
  }
  getProductShop = async (page) => {
    page = parseInt(page);
    const limit = 12;
    const skip = (page - 1) * limit;

    if (!isNaN(page) && page > 0) {
      const [totalProducts, products] = await Promise.all([
        productModel.countDocuments({
          product_list_categories: { $nin: ['kid'] }
        }),
        productModel.find({
          product_list_categories: { $nin: ['kid'] }
        }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
      ]);
      const totalPage = Math.ceil(totalProducts / limit);
      return {
        products,
        totalPage
      };
    }
  }
  getProduct = async (slug) => {
    if (slug === 'all') {
      const products = await productModel.find().sort({ createdAt: -1 }).lean()
      return products
    }
    if (slug === 'products_home') {
      const limit = await globalModel.findOne({ global_name: 'products_home' })
      const query = productModel.find({
        product_list_categories: { $nin: ['kid'] }
      }).sort({ createdAt: -1 });
      if (!isNaN(limit) && limit > 0) {
        query.limit(limit); // 
      }
      const products = await query.lean();
      return products
    }
    else {
      const product = await productModel.findOne({ product_slug: slug }).lean();
      if (!product) return null;
      const [reviews, categories] = await Promise.all([
        reviewModel.find({ review_product_id: product._id }).lean(),
        categoryModel
          .find({ category_slug: { $in: product.product_list_categories } })
          .sort({ category_level: 1 })
          .lean(),
      ]);

      const filteredCategories = categories.filter(cat => cat.category_slug !== 'best-seller');
      const countNumberProducts = await productModel.countDocuments()
      return {
        ...product,
        product_reviews: reviews,
        product_list_categories_name: filteredCategories.map(cat => cat.category_name),
        product_list_categories: filteredCategories.map(cat => cat.category_slug),
      };
    }
  }
  getProductBestSeller = async () => {
    const products = await productModel.find({ product_list_categories: 'best-seller' }).sort({ createdAt: -1 }).lean()
    return products
  }
  updateProduct = async (_id, bodyUpdate) => {
    const categories = await categoryModel.find({ category_slug: { $in: bodyUpdate.product_list_categories } }).sort({ category_level: 1, }).lean()
    bodyUpdate.product_list_categories = categories.map((cat) => cat.category_slug);
    const slug = await this.generateUniqueSlug(bodyUpdate.product_name);
    bodyUpdate.product_slug = slug;
    const product = await productModel.findByIdAndUpdate(_id, bodyUpdate, { new: true })
    return product
  }
  deleteProduct = async (id) => {
    return await productModel.deleteOne({ _id: id })
  }
}
export default new ProductService