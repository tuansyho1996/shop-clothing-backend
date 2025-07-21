import { BadRequestError } from '../core/error.response.js'
import mediaModel from '../models/media.model.js'
import { s3, PutObjectCommand, DeleteObjectCommand } from '../configs/config.awsS3.js'
import crypto from 'crypto'
import 'dotenv/config.js'
import path from 'path'

class MediaService {
  createMedia = async (file) => {
    const cloudfrontDistributionDomain = 'https://d2jfx0w9sp915a.cloudfront.net/'
    const randomName = () => crypto.randomBytes(16).toString('hex')
    const imageName = randomName()
    console.log('imageName', path.parse(file.originalname).name)
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
      media_name: path.parse(file.originalname).name,
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
        media_name: path.parse(files[i].originalname).name,
        media_path: cloudfrontDistributionDomain + imageName
      })
      images.push(media)
    }
    return images
  }
  getMedia = async (page) => {
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
  getMediaByName = async (name, limit) => {
    console.log('name', name, limit)
    const medias = await mediaModel.find({
      media_name: {
        $regex: name,
        $options: "i"
      }
    })
      .sort({ createdAt: 1 })
      .limit(parseInt(limit) || 20)
      .lean()

    return medias
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
  deleteMediaMultiple = async (names) => {

    const regexConditions = names.map(name => ({
      media_name: { $regex: name, $options: 'i' }  // 'i' để không phân biệt hoa thường
    }));
    console.log('regexConditions', regexConditions)
    const medias = await mediaModel.find({ $or: regexConditions });
    console.log('medias', medias)

    const deletePromises = medias.map(media => {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: media.media_path.split('.net/')[1]
      })
      return s3.send(command)
    })
    const results = await Promise.all(deletePromises)
    if (results.some(result => !result)) {
      throw new BadRequestError('Some requests to S3 failed')
    }
    const mepaths = medias.map(media => media.media_path)
    const deleteMedia = await mediaModel.deleteMany({ media_path: { $in: mepaths } })
    return deleteMedia
  }
}
export default new MediaService

