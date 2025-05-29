'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import ProductController from '../../controllers/product.controller.js'

const router = express.Router()

router.get('/shop', asyncHandle(ProductController.getProductShop))
router.get('/best-seller', asyncHandle(ProductController.getProductBestSeller))
router.get('/:slug', asyncHandle(ProductController.getProduct))


router.post('/', asyncHandle(ProductController.createProduct))
router.post('/update/:id', asyncHandle(ProductController.updateProduct))

router.delete('/:id', asyncHandle(ProductController.deleteProduct))

// router.get('/:id', asyncHandle(ProductController.getProductById))

export default router