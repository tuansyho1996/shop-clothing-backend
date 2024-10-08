'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import ProductController from '../../controllers/product.controller.js'

const router = express.Router()

router.post('/', asyncHandle(ProductController.createProduct))
router.get('/:id', asyncHandle(ProductController.getProductById))

export default router