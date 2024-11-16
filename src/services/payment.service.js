import "dotenv/config";
import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
  PaymentsController,
} from "@paypal/paypal-server-sdk";


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
const paymentsController = new PaymentsController(client);


class PaymentService {
  createPayment = async (data) => {
    const collect = {
      body: {
        intent: "CAPTURE",
        purchaseUnits: [
          {
            amount: {
              currencyCode: "USD",
              value: "9",
            },
            shipping: {
              address: {
                addressLine1: "tuan St",
                addressLine2: "Apt 4B",
                adminArea2: "San Jose", // City
                adminArea1: "CA", // State
                postalCode: "95131",
                countryCode: "US"
              }
            }
          },
        ],
        application_context: {
          shipping_preference: 'SET_PROVIDED_ADDRESS', // Ensures provided address is used
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
}
export default new PaymentService
