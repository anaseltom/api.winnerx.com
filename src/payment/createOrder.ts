require("dotenv").config();
var axios = require("axios");

const createOrder = async (token: string, amount: any) => {
  var data = JSON.stringify({
    action: "SALE",
    amount: {
      currencyCode: "AED",
      value: amount,
    },
    merchantAttributes: {
      redirectUrl: "http://13.42.13.212:3000/payment",
      cancelUrl: "http://13.42.13.212:3000",
      cancelText: "Return to winnerX",
    },
  });
  var config = {
    method: "post",
    url:
      "https://api-gateway.ngenius-payments.com/transactions/outlets/be2c5834-6dbb-4516-9890-18731e00d83d/orders",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.ni-payment.v2+json",
      Accept: "application/vnd.ni-payment.v2+json",
      Cookie: process.env.PAYMENT_COOKIE,
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return error;
  }
};

export default createOrder;
