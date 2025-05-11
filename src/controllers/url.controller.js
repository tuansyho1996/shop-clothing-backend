import { OK } from "../core/success.response.js";
import UrlService from "../services/url.service.js";
class UrlController {
    getUrl = async (req, res) => {
        const { nameUrl } = req.params;
        return new OK({
            message: "Get all urls successfully",
            metadata: await UrlService.getUrl(nameUrl)
        }).send(res);
    };
}
export default new UrlController();