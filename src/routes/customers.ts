const express = require('express');
const router = express.Router({});

import CustomersController from '../controllers/customers';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const Customers = new CustomersController();

router.post('/customers/fetch', [DB.ConnectToDB], Customers.FetchCustomer);
router.post('/customers/fetch-all', [DB.ConnectToDB], Customers.FetchCustomers);
router.post('/customers/update', [DB.ConnectToDB], Customers.UpdateCustomer);
 
export default router;
