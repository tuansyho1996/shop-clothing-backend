'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import ProductController from '../../controllers/product.controller.js'

const router = express.Router()

router.get('/', asyncHandle(ProductController.getAllProduct))

router.post('/', asyncHandle(ProductController.createProduct))
router.post('/update/:id', asyncHandle(ProductController.updateProduct))

router.delete('/:id', asyncHandle(ProductController.deleteProduct))

// router.get('/:id', asyncHandle(ProductController.getProductById))

export default router