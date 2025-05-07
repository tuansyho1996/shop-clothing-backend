'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import BlogController from "../../controllers/blog.controller.js"

const router = express.Router()
router.get('/', asyncHandle(BlogController.getBlog))
router.post('/', asyncHandle(BlogController.createBlog))

export default router