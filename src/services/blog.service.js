class BlogService {
    constructor(BlogModel) {
        this.BlogModel = BlogModel;
    }

    async createBlog(blogData) {
        try {
            const blog = new this.BlogModel(blogData);
            await blog.save();
            return blog;
        } catch (error) {
            throw new Error('Error creating blog: ' + error.message);
        }
    }

    async getAllBlogs() {
        try {
            const blogs = await this.BlogModel.find();
            return blogs;
        } catch (error) {
            throw new Error('Error fetching blogs: ' + error.message);
        }
    }

    async getBlogById(blogId) {
        try {
            const blog = await this.BlogModel.findById(blogId);
            if (!blog) {
                throw new Error('Blog not found');
            }
            return blog;
        } catch (error) {
            throw new Error('Error fetching blog: ' + error.message);
        }
    }
    async updateBlog(blogId, blogData) {
        try {
            const blog = await this.BlogModel.findByIdAndUpdate(blogId, blogData, { new: true });
            if (!blog) {
                throw new Error('Blog not found');
            }
            return blog;
        }
        catch (error) {
            throw new Error('Error updating blog: ' + error.message);
        }
    }
    async deleteBlog(blogId) {
        try {
            const blog = await this.BlogModel.findByIdAndDelete(blogId);
            if (!blog) {
                throw new Error('Blog not found');
            }
            return blog;
        } catch (error) {
            throw new Error('Error deleting blog: ' + error.message);
        }
    }
}
export default BlogService;