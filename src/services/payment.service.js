import "dotenv/config";
import {
  Client,
  Environment,
  LogLevel,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import orderModel from "../models/order.model.js";
import globalModel from "../models/global.model.js";
import sendOrderConfirmation from "../utils/mailer.js";

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment: process.env.ENV_PAYPAL === 'production' ? Environment.Production : Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});
const ordersController = new OrdersController(client);


class PaymentService {
  createPayment = async (data) => {
    console.log('data', data)
    const items = data.items.map((item) => ({
      name: item.product_name, // Name of the item
      unitAmount: {
        currencyCode: "USD",
        value: item.product_price.toFixed(2), // Price of each unit
      },
      quantity: item.product_count.toString(), // Quantity of the item
    }));
    const collect = {
      body: {
        intent: "CAPTURE",
        purchaseUnits: [
          {
            amount: {
              currencyCode: "USD",
              value: (data.itemTotal + data.shipping).toFixed(2),
              breakdown: {
                itemTotal: {
                  currencyCode: "USD",
                  value: data.itemTotal.toFixed(2), // Item total
                },
                shipping: {
                  currencyCode: "USD",
                  value: data.shipping.toFixed(2), // Shipping fee
                },
              },
            },
            items,
            shipping: {
              name: {
                fullName: `${data.givenName} ${data.surname}`
              },
              address: {
                addressLine1: data.addressLine1,
                addressLine2: data?.addressLine2 || '',
                adminArea2: data.adminArea2, // City
                adminArea1: data.adminArea1, // State
                postalCode: data.postalCode,
                conuntry: data.country,
                countryCode: data.countryCode
              },
            },
          },
        ],
        payer: {
          name: {
            givenName: data.givenName, // Replace with dynamic values
            surname: data.surname,      // Replace with dynamic values
          },
          emailAddress: data.emailAddress, // Replace with dynamic value
        },
        applicationContext: {
          shippingPreference: 'SET_PROVIDED_ADDRESS',
          userAction: 'PAY_NOW', // Ensures "Pay Now" button appears
        },
      }
    };
    const { body } = await ordersController.ordersCreate(
      collect
    );
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(body),
    }
  }
  capturePayment = async (orderID) => {
    const collect = {
      id: orderID,
      prefer: "return=minimal",
    };
    const { body } = await ordersController.ordersCapture(
      collect
    );
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(body),
    };

  };
  completeOrder = async (body) => {

    const data = body
    data.items = JSON.parse(data.items)

    const quantity = await globalModel.findOne({ global_name: 'quantity_sell' })
    let nextNumberOrder = 1;
    const latestOrder = await orderModel.countDocuments()
    if (latestOrder) {
      nextNumberOrder = latestOrder + 1;
    }
    const newOrder = await orderModel.create({ order_info: data, number_order: parseInt(nextNumberOrder) + parseInt(quantity?.global_value) });
    if (newOrder) {
      sendOrderConfirmation(newOrder)
    }
    return newOrder
  }
  getOrder = async (_id) => {
    if (_id === 'all') {
      const orders = await orderModel.find().lean()
      return orders
    }
    else {
      const order = await orderModel.findById(_id)
      return order
    }
  }

}
export default new PaymentService
