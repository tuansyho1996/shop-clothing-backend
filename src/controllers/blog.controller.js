import { CREATED } from "../core/success.response";
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
            metadata: await BlogService.getBlog()
        }).send(res);
    }
}

export default new BlogController();