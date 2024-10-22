import { BadRequestError } from '../core/error.response.js'
import mediaModel from '../models/media.model.js'
import { s3,PutObjectCommand,DeleteBucketCommand } from '../configs/config.awsS3.js'
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
    if(!result){
        throw new BadRequestError('Request file to s3 invalid')
    }
    const media = await mediaModel.create({
        media_name:imageName,
        media_path: cloudfrontDistributionDomain+imageName
    })
    return media
  }
  getMedia = async () => {
   const images = await mediaModel.find().lean()
   return images
  }
  // deleteMedia = async (name) => {
  //   const command =  new DeleteBucketCommand({
  //       Bucket: bucketName,
  //     Key: objectKey,
  //   })
  //   const deleteMedia = await mediaModel.deleteOne({ _id: id })
  //   return deleteMedia
  // }
}
export default new MediaService

