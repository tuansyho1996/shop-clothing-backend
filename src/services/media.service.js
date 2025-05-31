import { BadRequestError } from '../core/error.response.js'
import mediaModel from '../models/media.model.js'
import { s3, PutObjectCommand, DeleteObjectCommand } from '../configs/config.awsS3.js'
import crypto from 'crypto'
import 'dotenv/config.js'

class MediaService {
  createMedia = async (file) => {
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
    const media = await mediaModel.create({
      media_name: imageName,
      media_path: cloudfrontDistributionDomain + imageName
    })
    return media
  }
  uploadManyImages = async (files) => {
    const cloudfrontDistributionDomain = 'https://d2jfx0w9sp915a.cloudfront.net/'
    const images = []
    for (let i = 0; i < files.length; i++) {
      const randomName = () => crypto.randomBytes(16).toString('hex')
      const imageName = randomName()
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName || 'unknow',
        Body: files[i].buffer,
        ContentType: 'image/jpeg' //that is what you need
      })
      const result = await s3.send(command)
      if (!result) {
        throw new BadRequestError('Request file to s3 invalid')
      }
      const media = await mediaModel.create({
        media_name: imageName,
        media_path: cloudfrontDistributionDomain + imageName
      })
      images.push(media)
    }
    return images
  }
  getMedia = async (page) => {
    console.log('page', page)
    const pageNumber = parseInt(page)
    const pageSize = 40
    const skip = (pageNumber - 1) * pageSize

    const images = await mediaModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
    const totalCount = await mediaModel.countDocuments()
    return {
      images,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: pageNumber,
    }
  }
  deleteMedia = async (name) => {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: name,
    })
    const result = await s3.send(command)
    if (!result) {
      throw new BadRequestError('Request name image invalid')
    }
    const deleteMedia = await mediaModel.deleteOne({ media_name: name })
    return deleteMedia
  }
}
export default new MediaService

