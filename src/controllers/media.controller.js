import { BadRequestError } from "../core/error.response.js";
import { OK, CREATED } from "../core/success.response.js";
import MediaService from "../services/media.service.js";

class MediaController {
  createMedia = async (req, res) => {
    if(!req.file){
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
      metadata: await MediaService.getMedia(req.params.id)
    }).send(res)
  }
//   deleteMedia = async (req, res) => {
//     return new OK({
//       message: "Delete successful media",
//       metadata: await MediaService.deleteMedia(req.params.id)
//     }).send(res)
//   }
}

export default new MediaController
