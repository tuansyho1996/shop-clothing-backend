import { BadRequestError } from "../core/error.response.js";
class UrlService {
    getUrl = async (nameUrl) => {
        // Logic to get all urls
        if (nameUrl === 'all') {
            const urls = await urlModel.find();
            if (!urls) {
                throw new BadRequestError('Error fetching urls');
            }
            return urls;
        } else {
            const url = await urlModel.findOne({ nameUrl });
            if (!url) {
                throw new BadRequestError('Url not found');
            }
            return url;
        }
    }
    createUrl = async (data) => {
        // Logic to create a url
        const newUrl = await urlModel.create(data);
        if (!newUrl) {
            throw new BadRequestError('Error creating url');
        }
        return newUrl;
    }
    deleteUrl = async (id) => {
        // Logic to delete a url
        const deletedUrl = await urlModel.findByIdAndDelete(id);
        if (!deletedUrl) {
            throw new BadRequestError('Error deleting url');
        }
        return deletedUrl;
    }
    updateUrl = async (id, data) => {
        // Logic to update a url
        const updatedUrl = await urlModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedUrl) {
            throw new BadRequestError('Error updating url');
        }
        return updatedUrl;
    }
}
export default new UrlService();