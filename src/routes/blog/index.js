'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import UrlController from "../../controllers/url.controller.js"

const router = express.Router()
router.get('/:nameUrl', asyncHandle(UrlController.getUrl))

export default router