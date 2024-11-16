'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import UserController from "../../controllers/user.controller.js"
const router = express.Router()

router.post('/', asyncHandle(UserController.createUser))
router.post('/login', asyncHandle(UserController.login))

// router.get('/:id', asyncHandle(ProductController.getProductById))

export default router