'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import OrderController from "../../controllers/order.controller.js"

const router = express.Router()
router.get('/:id', asyncHandle(OrderController.getOrder))
router.patch('/:id', asyncHandle(OrderController.updateOrderStatus))
export default router