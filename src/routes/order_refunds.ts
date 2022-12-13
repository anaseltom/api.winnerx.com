const express = require('express');
const router = express.Router({});

import OrderRefundsController from '../controllers/order_refunds';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const OrderRefunds = new OrderRefundsController();

router.post('/order_refunds/fetch', [DB.ConnectToDB], OrderRefunds.FetchOrderRefund);
router.post('/order_refunds/fetch-all', [DB.ConnectToDB], OrderRefunds.FetchOrderRefunds);
router.post('/order_refunds/update', [DB.ConnectToDB], OrderRefunds.UpdateOrderRefund);

export default router;
