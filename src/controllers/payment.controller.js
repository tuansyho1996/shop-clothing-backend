import { OK, CREATED } from "../core/success.response.js";
import paymentService from "../services/payment.service.js";

class PaymentController {
  createPayment = async (req, res) => {
    return new CREATED({
      message: "Create successful payment",
      metadata: await paymentService.createPayment(req.body)
    }).send(res)
  }
  capturePayment = async (req, res) => {
    return new OK({
      message: "Capture successful payment",
      metadata: await paymentService.capturePayment(req.params.orderID)
    }).send(res)
  }
  completeOrder = async (req, res) => {
    return new CREATED({
      message: "Order completed",
      metadata: await paymentService.completeOrder(req.body)
    }).send(res)
  }
  getOrder = async (req, res) => {
    return new OK({
      message: "Fetch successful order",
      metadata: await paymentService.getOrder(req.params.id)
    }).send(res)
  }
}

export default new PaymentController
