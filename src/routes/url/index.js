'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import BlogController from "../../controllers/blog.controller.js"

const router = express.Router()
router.get('/:slug', asyncHandle(BlogController.getBlog))
router.post('/', asyncHandle(BlogController.createBlog))
router.delete('/:id', asyncHandle(BlogController.deleteBlog))
router.put('/:id', asyncHandle(BlogController.updateBlog))

export default router