const express = require('express');
const router = express.Router({});

import BillingAddressesController from '../controllers/billing_addresses';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const BillingAddresses = new BillingAddressesController();

router.post('/billing_addresses/fetch', [DB.ConnectToDB], BillingAddresses.FetchBillingAddress);
router.post('/billing_addresses/fetch-all', [DB.ConnectToDB], BillingAddresses.FetchBillingAddresses);
router.post('/billing_addresses/update', [DB.ConnectToDB], BillingAddresses.UpdateBillingAddress);
 
export default router;
