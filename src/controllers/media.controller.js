import { BadRequestError } from "../core/error.response.js";
import { OK, CREATED } from "../core/success.response.js";
import MediaService from "../services/media.service.js";

class MediaController {
  createMedia = async (req, res) => {
    if (!req.file) {
      throw new BadRequestError('Request file invalid')
    }
    return new CREATED({
      message: "Create successful media",
      metadata: await MediaService.createMedia(req.file)
    }).send(res)
  }
  getMedia = async (req, res) => {
    return new OK({
      message: "Get successful media",
      metadata: await MediaService.getMedia(req.params.page)
    }).send(res)
  }
  deleteMedia = async (req, res) => {
    return new OK({
      message: "Delete successful media",
      metadata: await MediaService.deleteMedia(req.params.name)
    }).send(res)
  }
  deleteMediaMultiple = async (req, res) => {
    return new OK({
      message: "Delete successful multiple media",
      metadata: await MediaService.deleteMediaMultiple(req.body)
    }).send(res)
  }
  uploadManyImages = async (req, res) => {
    return new CREATED({
      message: "Upload successful many image",
      metadata: await MediaService.uploadManyImages(req.files)
    }).send(res)
  }
}

export default new MediaController
