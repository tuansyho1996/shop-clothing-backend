'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import MediaController from "../../controllers/media.controller.js"
import { uploadMemory } from "../../configs/config.multer.js"

const router = express.Router()

router.get('/', asyncHandle(MediaController.getMedia))
router.post('/', uploadMemory.single('image'), asyncHandle(MediaController.createMedia))
router.delete('/:name', asyncHandle(MediaController.deleteMedia))
router.post('/many', uploadMemory.array('images', 10), asyncHandle(MediaController.uploadManyImages))


export default router