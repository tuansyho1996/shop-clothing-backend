import { CREATED, OK } from "../core/success.response.js";
import BlogService from "../services/blog.service.js";

class BlogController {
    createBlog = async (req, res) => {
        // Logic to create a blog
        return new CREATED({
            message: "Blog created successfully",
            metadata: await BlogService.createBlog(req.body)
        }).send(res);
    }
    getBlog = async (req, res) => {
        // Logic to get all blogs
        return new OK({
            message: "Blogs retrieved successfully",
            metadata: await BlogService.getBlog(req.params.slug)
        }).send(res);
    }
    deleteBlog = async (req, res) => {
        // Logic to delete a blog
        return new OK({
            message: "Blog deleted successfully",
            metadata: await BlogService.deleteBlog(req.params.id)
        }).send(res);
    }
    updateBlog = async (req, res) => {
        // Logic to update a blog
        return new OK({
            message: "Blog updated successfully",
            metadata: await BlogService.updateBlog(req.params.id, req.body)
        }).send(res);
    }
}

export default new BlogController();