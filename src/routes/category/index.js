'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import CategoryController from "../../controllers/category.controller.js"

const router = express.Router()

router.get('/:id', asyncHandle(CategoryController.getCategory))
router.post('/', asyncHandle(CategoryController.createCategory))
router.put('/:id', asyncHandle(CategoryController.updateCategory))
router.delete('/:id', asyncHandle(CategoryController.deleteCategory))

// router.get('/:id', asyncHandle(ProductController.getProductById))

export default router