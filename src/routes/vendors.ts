const express = require('express');
const router = express.Router({});

import VendorsController from '../controllers/vendors';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const Vendors = new VendorsController();

router.post('/vendors/fetch', [DB.ConnectToDB], Vendors.FetchVendor);
router.post('/vendors/fetch-all', [DB.ConnectToDB], Vendors.FetchVendors);
router.post('/vendors/update', [DB.ConnectToDB], Vendors.UpdateVendor);
 
export default router;
