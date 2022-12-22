const express = require("express");
const router = express.Router({});

import OrdersController from "../controllers/orders";
import AuthMiddleware from "../middlewares/Auth";
import ConnectDB from "../middlewares/ConnectDB";

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const Orders = new OrdersController();

router.post("/orders/fetch", [DB.ConnectToDB], Orders.FetchOrder);
router.post("/orders/fetch-all", [DB.ConnectToDB], Orders.FetchOrders);
router.post("/orders/update-state", [DB.ConnectToDB], Orders.updateOrderState);
router.post("/orders/update", [DB.ConnectToDB], Orders.UpdateOrder);
router.post("/orders/summary", [DB.ConnectToDB], Orders.Summary);
router.post("/orders/test", [DB.ConnectToDB], Orders.Test);

export default router;
