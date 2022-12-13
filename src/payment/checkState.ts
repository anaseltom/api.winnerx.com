require("dotenv").config();
var axios = require("axios");

const checkstate = async (token: string, ref: any) => {
  var config = {
    method: "get",
    url: `https://api-gateway.ngenius-payments.com/transactions/outlets/be2c5834-6dbb-4516-9890-18731e00d83d/orders/${ref}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.ni-payment.v2+json",
      Accept: "application/vnd.ni-payment.v2+json",
      Cookie: process.env.PAYMENT_COOKIE,
    },
  };

  try {
    const response = await axios(config);
    if (response.data) return response;
    return;
  } catch (error) {
    return error;
  }
};

export default checkstate;
