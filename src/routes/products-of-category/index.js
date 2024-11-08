'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import productOfCategoryController from "../../controllers/product.of.category.controller.js"

const router = express.Router()

router.get('/:category', asyncHandle(productOfCategoryController.getProductsCategory))

export default router