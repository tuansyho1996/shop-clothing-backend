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
        productModel.find({ product_list_categories: { $in: ['og-crypto-series-honoring-the-pioneers-of-blockchain', 'defi-culture-wear-the-protocols-that-power-web3', 'meme-coins-for-the-culture-for-the-chaos'] } }).countDocuments(),
        productModel.find({ product_list_categories: { $in: ['og-crypto-series-honoring-the-pioneers-of-blockchain', 'defi-culture-wear-the-protocols-that-power-web3', 'meme-coins-for-the-culture-for-the-chaos'] } }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
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
      const products = await productModel.find({ product_list_categories: { $in: ['og-crypto-series-honoring-the-pioneers-of-blockchain', 'defi-culture-wear-the-protocols-that-power-web3', 'meme-coins-for-the-culture-for-the-chaos'] } }).sort({ createdAt: -1 }).lean()
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
    const products = await productModel.find({ product_list_categories: 'best-seller' }).sort({ createdAt: -1 }).limit(12).lean()
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
  // convert eth
  convertPriceToEth = async () => {
    const ethPrice = 2700; // Example ETH price, replace with actual logic to fetch current ETH price
    const products = await productModel.find().lean();
    console.log('check')
    const updatedProducts = products.map(product => {
      const ethValue = (product.product_price / ethPrice).toFixed(6);
      return {
        ...product,
        product_price_eth: ethValue
      };
    });
    await Promise.all(updatedProducts.map(product =>
      productModel.updateOne({ _id: product._id }, { product_price_eth: product.product_price_eth })
    ));
    return updatedProducts;
  }
  removeProductFromBestSeller = async (productId) => {
    return await productModel.updateOne(
      { _id: productId },
      { $pull: { product_list_categories: 'best-seller' } }
    );
  }
}
export default new ProductService