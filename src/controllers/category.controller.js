import { OK, CREATED } from "../core/success.response.js";
import CategoryService from "../services/category.service.js";

class CategoryController {
  createCategory = async (req, res) => {
    return new CREATED({
      message: "Create successful category",
      metadata: await CategoryService.createCategory(req.body)
    }).send(res)
  }
  getCategory = async (req, res) => {
    return new OK({
      message: "Get successful category",
      metadata: await CategoryService.getCategory(req.params.id)
    }).send(res)
  }
  updateCategory = async (req, res) => {
    return new OK({
      message: "Update successful category",
      metadata: await CategoryService.updateCategory(req.params.id, req.body)
    }).send(res)
  }
  deleteCategory = async (req, res) => {
    return new OK({
      message: "Delete successful category",
      metadata: await CategoryService.deleteCategory(req.params.id)
    }).send(res)
  }
}

export default new CategoryController
