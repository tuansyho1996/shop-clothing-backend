'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import PaymentController from "../../controllers/payment.controller.js"

const router = express.Router()

router.post('/create-payment', asyncHandle(PaymentController.createPayment))
router.post('/:orderID/capture', asyncHandle(PaymentController.capturePayment))

// router.get('/:id', asyncHandle(ProductController.getProductById))

export default router