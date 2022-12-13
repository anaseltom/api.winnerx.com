const express = require('express');
const router = express.Router({});

import ShippingAddressesController from '../controllers/shipping_addresses';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const ShippingAddresses = new ShippingAddressesController();

router.post('/shipping_addresses/fetch', [DB.ConnectToDB], ShippingAddresses.FetchShippingAddress);
router.post('/shipping_addresses/fetch-all', [DB.ConnectToDB], ShippingAddresses.FetchShippingAddresses);
router.post('/shipping_addresses/update', [DB.ConnectToDB], ShippingAddresses.UpdateShippingAddress);
 
export default router;
