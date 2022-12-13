const express = require("express");
const router = express.Router({});

import UserAddressesController from "../controllers/user_addresses";
import AuthMiddleware from "../middlewares/Auth";
import ConnectDB from "../middlewares/ConnectDB";

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const UserAddresses = new UserAddressesController();

router.post(
  "/user_addresses/fetch",
  [DB.ConnectToDB],
  UserAddresses.FetchUserAddress
);
router.post(
  "/user_addresses/fetch-all",
  [DB.ConnectToDB],
  UserAddresses.FetchUserAddresses
);
router.post(
  "/user_addresses/update",
  [DB.ConnectToDB],
  UserAddresses.UpdateUserAddress
);

export default router;
