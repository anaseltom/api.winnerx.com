const express = require('express');
const router = express.Router({});

import DeliveriesController from '../controllers/deliveries';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const Deliveries = new DeliveriesController();

router.post('/deliveries/fetch-countries',  Deliveries.FetchDeliveryCountries);
router.post('/deliveries/request-orders', [DB.ConnectToDB], Deliveries.RequestDeliveryOrders);
router.post('/deliveries/fetch-orders',  Deliveries.FetchDeliveryOrders);
router.post('/deliveries/update-orders',  Deliveries.UpdateDeliveryOrders);
router.post('/deliveries/print-orders',  Deliveries.PrintDeliveryOrders);
router.post('/deliveries/cancel-orders',  Deliveries.CancelDeliveryOrders);
router.post('/deliveries/story-orders',  Deliveries.StoryDeliveryOrders);
 
export default router;
