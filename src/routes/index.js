'use strict'
import express from "express"
import product from './product/index.js'
import category from './category/index.js'

const router = express.Router()

router.use('/api/product', product)
router.use('/api/category', category)

export default router