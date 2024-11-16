import { OK, CREATED } from "../core/success.response.js";
import UserService from "../services/user.service.js";
class ProductController {
  createUser = async (req, res) => {
    return new CREATED({
      message: "Create successful user",
      metadata: await UserService.createUser(req.body)
    }).send(res)
  }
  login = async (req, res) => {
    return new OK({
      message: "Login successful",
      metadata: await UserService.login(req.body)
    }).send(res)
  }
}

export default new ProductController
