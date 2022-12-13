require("dotenv").config();
var axios = require("axios");

const createToken = async () => {
  var data = JSON.stringify({
    realm: "networkinternational",
    grant_type: "client_credentials",
  });

  var config = {
    method: "post",
    url: "https://api-gateway.ngenius-payments.com/identity/auth/access-token",
    headers: {
      Authorization: `Basic ${process.env.PAYMENT_AUTH}`,
      "Content-Type": "application/vnd.ni-identity.v1+json",
      Accept: "application/vnd.ni-identity.v1+json",
      // Cookie: process.env.PAYMENT_COOKIE,
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

export default createToken;
