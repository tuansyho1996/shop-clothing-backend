import { OK, CREATED } from "../core/success.response.js";
import ReviewService from "../services/review.service.js";

class ReviewController {
    createReview = async (req, res) => {
        return new CREATED({
            message: "Create successful review",
            metadata: await ReviewService.createReview(req.body, req.file)
        }).send(res)
    }
    getReview = async (req, res) => {

        return new OK({
            message: "Get successful all review",
            metadata: await ReviewService.getReviews(req.params.slug)
        }).send(res)
    }
    deleteReview = async (req, res) => {

        return new OK({
            message: "Delete successful review",
            metadata: await ReviewService.deleteReview(req.params.id)
        }).send(res)
    }
    //   getAllReview = async (req, res) => {
    //     return new OK({
    //       message: 'Get successful all review',
    //       metadata: await ReviewService.getAllReview(req.params.slug)
    //     }).send(res)
    //   }
    //   updateReview = async (req, res) => {
    //     return new OK({
    //       message: 'Update successful review',
    //       metadata: await ReviewService.updateReview(req.params.id, req.body)
    //     }).send(res)
    //   }
    //   deleteReview = async (req, res) => {
    //     return new OK({
    //       message: 'Delete successful review',
    //       metadata: await ReviewService.deleteReview(req.params.id)
    //     }).send(res)
    //   }
}

export default new ReviewController();