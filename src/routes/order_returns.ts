const express = require('express');
const router = express.Router({});

import OrderReturnsController from '../controllers/order_returns';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const OrderReturns = new OrderReturnsController();

router.post('/order_returns/fetch', [DB.ConnectToDB], OrderReturns.FetchOrderReturn);
router.post('/order_returns/fetch-all', [DB.ConnectToDB], OrderReturns.FetchOrderReturns);
router.post('/order_returns/update', [DB.ConnectToDB], OrderReturns.UpdateOrderReturn);
router.post('/order_returns/update-list', [DB.ConnectToDB], OrderReturns.UpdateOrderReturnList);
router.post('/order_returns/create', [DB.ConnectToDB], OrderReturns.CreateOrderReturn);
router.post('/order_returns/delete', [DB.ConnectToDB], OrderReturns.DeleteOrderReturn);

export default router;
