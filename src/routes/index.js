'use strict'
import express from "express"
import product from './product/index.js'

const router = express.Router()

router.use('/api/product', product)

export default router