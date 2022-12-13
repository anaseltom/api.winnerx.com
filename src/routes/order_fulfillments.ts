const express = require('express');
const router = express.Router({});

import OrderFulfillmentsController from '../controllers/order_fulfillments';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const OrderFulfillments = new OrderFulfillmentsController();

router.post('/order_fulfillments/fetch', [DB.ConnectToDB], OrderFulfillments.FetchOrderFulfillment);
router.post('/order_fulfillments/fetch-all', [DB.ConnectToDB], OrderFulfillments.FetchOrderFulfillments);
router.post('/order_fulfillments/create', [DB.ConnectToDB], OrderFulfillments.CreateOrderFulfillment);
router.post('/order_fulfillments/update', [DB.ConnectToDB], OrderFulfillments.UpdateOrderFulfillment);
router.post('/order_fulfillments/delete', [DB.ConnectToDB], OrderFulfillments.DeleteOrderFulfillment);
 
export default router;
