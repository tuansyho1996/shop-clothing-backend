'use strict'
import express from "express"
import { asyncHandle } from "../../auth/checkAuth.js"
import globalController from "../../controllers/global.controller.js"

const router = express.Router()
router.get("/:nameGlobal", asyncHandle(globalController.getGlobal))
router.post("/", asyncHandle(globalController.createGlobal))
router.delete("/:id", asyncHandle(globalController.deleteGlobal))
router.put("/:id", asyncHandle(globalController.updateGlobal))

export default router