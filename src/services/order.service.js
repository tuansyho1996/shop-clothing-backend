import orderModel from "../models/order.model.js";

class OrderService {
    getOrder = async (id) => {
        if (id === 'all') {
            const orders = await orderModel.find().lean();
            return orders;
        }
        else {
            const order = await orderModel.findById(id);
            return order;
        }
    };

    updateOrderStatus = async (id, status) => {
        return await orderModel.findByIdAndUpdate(id, { order_status: status }, { new: true });
    };
}
export default new OrderService();