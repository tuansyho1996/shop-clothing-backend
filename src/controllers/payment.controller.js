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
}

export default new PaymentController
