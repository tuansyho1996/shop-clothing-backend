'use strict'
import express from "express"
import product from './product/index.js'
import category from './category/index.js'
import media from './media/index.js'
import productOfCategory from './products-of-category/index.js'
import payment from './payment/index.js'
import user from './user/index.js'

const router = express.Router()

router.use('/api/product', product)
router.use('/api/product-category', productOfCategory)
router.use('/api/category', category)
router.use('/api/media', media)
router.use('/api/payment', payment)
router.use('/api/user', user)

export default router