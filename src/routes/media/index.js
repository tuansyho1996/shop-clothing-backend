'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import MediaController from "../../controllers/media.controller.js"
import { uploadMemory } from "../../configs/config.multer.js"

const router = express.Router()

router.get('/:page', asyncHandle(MediaController.getMedia))
router.post('/', uploadMemory.single('image'), asyncHandle(MediaController.createMedia))
router.delete('/multiple', asyncHandle(MediaController.deleteMediaMultiple))
router.delete('/:name', asyncHandle(MediaController.deleteMedia))
router.post('/many', uploadMemory.array('images', 20), asyncHandle(MediaController.uploadManyImages))


export default router