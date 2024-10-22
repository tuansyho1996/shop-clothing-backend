'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import MediaController from "../../controllers/media.controller.js"
import { uploadMemory } from "../../configs/config.multer.js"

const router = express.Router()

router.get('/',asyncHandle(MediaController.getMedia))
router.post('/',uploadMemory.single('image'), asyncHandle(MediaController.createMedia))
// router.delete('/:id', asyncHandle(MediaController.deleteMedia))

// router.get('/:id', asyncHandle(ProductController.getProductById))

export default router