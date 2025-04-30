'use strict'
import reviewModel from "../models/review.model.js"
import { BadRequestError } from '../core/error.response.js'
import { s3, PutObjectCommand, DeleteObjectCommand } from '../configs/config.awsS3.js'
import crypto from 'crypto'

class ReviewService {
    createReview = async (data, file) => {
        const cloudfrontDistributionDomain = 'https://d2jfx0w9sp915a.cloudfront.net/'
        const randomName = () => crypto.randomBytes(16).toString('hex')
        const imageName = randomName()
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageName || 'unknow',
            Body: file.buffer,
            ContentType: 'image/jpeg' //that is what you need
        })
        const result = await s3.send(command)
        if (!result) {
            throw new BadRequestError('Request file to s3 invalid')
        }
        else {

            data.review_media = cloudfrontDistributionDomain + imageName
            const newReview = await reviewModel.create(data)
            return newReview
        }
    }
    getReviews = async (productId) => {
        if (productId === 'all') {
            const reviews = await reviewModel.find().sort({ createdAt: -1 }).lean()
            return reviews
        }
        else {
            const reviews = await reviewModel.find({ review_product_id: productId }).lean()
            return reviews
        }
    }
    deleteReview = async (id) => {
        const review = await reviewModel.findOne({ _id: id })
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: review.review_media.split('/').pop(),
        })
        const result = await s3.send(command)
        if (!result) {
            throw new BadRequestError('Request name image invalid')
        }
        return await reviewModel.deleteOne({ _id: id })
    }
}

export default new ReviewService