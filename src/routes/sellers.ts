const express = require('express');
const router = express.Router({});

import SellersController from '../controllers/sellers';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const Sellers = new SellersController();

router.post('/sellers/fetch', [DB.ConnectToDB], Sellers.FetchSeller);
router.post('/sellers/fetch-all', [DB.ConnectToDB], Sellers.FetchSellers);
router.post('/sellers/update', [DB.ConnectToDB], Sellers.UpdateSeller);
 
export default router;
