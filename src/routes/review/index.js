import express from 'express';
import { asyncHandle } from '../../auth/checkAuth.js';
import ReviewController from '../../controllers/review.controller.js';
import { uploadMemory } from '../../configs/config.multer.js';

const router = express.Router();
// Create a new review
router.post('/', uploadMemory.single('media'), asyncHandle(ReviewController.createReview));
router.get('/:slug', asyncHandle(ReviewController.getReview));
router.delete('/:id', asyncHandle(ReviewController.deleteReview));

export default router;