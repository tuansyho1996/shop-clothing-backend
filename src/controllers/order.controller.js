import { OK } from "../core/success.response.js";
import OrderService from "../services/order.service.js";

class OrderController {
    getOrder = async (req, res) => {
        return new OK({
            message: "Get successful order",
            metadata: await OrderService.getOrder(req.params.id)
        }).send(res);
    };

    updateOrderStatus = async (req, res) => {
        return new OK({
            message: "Update successful order",
            metadata: await OrderService.updateOrderStatus(req.params.id, req.body.status)
        }).send(res);
    };
}
export default new OrderController();