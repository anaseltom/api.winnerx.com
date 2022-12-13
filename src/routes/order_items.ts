const express = require('express');
const router = express.Router({});

import OrderItemsController from '../controllers/order_items';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const OrderItems = new OrderItemsController();

router.post('/order_items/fetch', [DB.ConnectToDB], OrderItems.FetchOrderItem);
router.post('/order_items/fetch-all', [DB.ConnectToDB], OrderItems.FetchOrderItems);
router.post('/order_items/update', [DB.ConnectToDB], OrderItems.UpdateOrderItem);
 
export default router;
