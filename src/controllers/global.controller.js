import { CREATED, OK } from "../core/success.response.js";
import GlobalService from "../services/global.service.js";
class GlobalController {
    getGlobal = async (req, res) => {
        const { nameGlobal } = req.params;
        return new OK({
            message: "Get all globals successfully",
            metadata: await GlobalService.getGlobal(nameGlobal)
        }).send(res);
    };
    createGlobal = async (req, res) => {
        const { body } = req;
        return new CREATED({
            message: "Create global successfully",
            metadata: await GlobalService.createGlobal(body)
        }).send(res);
    };
    deleteGlobal = async (req, res) => {
        const { id } = req.params;
        return new OK({
            message: "Delete global successfully",
            metadata: await GlobalService.deleteGlobal(id)
        }).send(res);
    };
    updateGlobal = async (req, res) => {
        const { id } = req.params;
        const { body } = req;
        return new OK({
            message: "Update global successfully",
            metadata: await GlobalService.updateGlobal(id, body)
        }).send(res);
    };
}
export default new GlobalController();