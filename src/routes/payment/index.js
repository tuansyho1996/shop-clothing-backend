'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import PaymentController from "../../controllers/payment.controller.js"
import multer from "multer"

const router = express.Router()
const upload = multer()

router.post('/create-payment', asyncHandle(PaymentController.createPayment))
router.post('/checkout/order-received/', upload.none(), asyncHandle(PaymentController.completeOrder))
router.post('/:orderID/capture', asyncHandle(PaymentController.capturePayment))
router.get('/fetch-order/:id', asyncHandle(PaymentController.getOrder))


// router.get('/:id', asyncHandle(ProductController.getProductById))

export default router