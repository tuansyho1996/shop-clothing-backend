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
  getCategorySitemap = async (req, res) => {
    return new OK({
      message: "Get successful category sitemap",
      metadata: await CategoryService.getCategorySitemap()
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
  getTopCategory = async (req, res) => {
    return new OK({
      message: "Get successful top category",
      metadata: await CategoryService.getTopCategory()
    }).send(res)
  }
  updateTopCategory = async (req, res) => {
    return new OK({
      message: "Update successful op category",
      metadata: await CategoryService.updateTopCategory(req.body)
    }).send(res)
  }
  getTopCategory = async (req, res) => {
    return new OK({
      message: "Get successful top category",
      metadata: await CategoryService.getTopCategory()
    }).send(res)
  }
  deleteTopCategory = async (req, res) => {
    return new OK({
      message: "Delete successful top category",
      metadata: await CategoryService.deleteTopCategory(req.params.id)
    }).send(res)
  }
}

export default new CategoryController
