import "dotenv/config";
import {
  Client,
  Environment,
  LogLevel,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import orderModel from "../models/order.model.js";


const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});
const ordersController = new OrdersController(client);


class PaymentService {
  createPayment = async (data) => {
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
    const { infoOrder, infoCustomer, userId } = body
    console.log('body', body)
    const newOrder = await orderModel.create({ order_info: infoOrder, order_info_customer: infoCustomer, order_user_id: userId })
    return newOrder
  }
  getOrder = async (_id) => {
    if (_id === 'all') {
      const orders = await orderModel.find().lean()
      return orders
    }
    else {
      const order = await orderModel.findById(_id)
      console.log(order)
      return order
    }
  }
}
export default new PaymentService
