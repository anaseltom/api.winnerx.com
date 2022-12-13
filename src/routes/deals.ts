const express = require('express');
const router = express.Router({});

import DealsController from '../controllers/deals';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const Deals = new DealsController();

router.post('/deals/fetch', [DB.ConnectToDB], Deals.FetchDeal);
router.post('/deals/fetch-all', [DB.ConnectToDB], Deals.FetchDeals);
router.post('/deals/update', [DB.ConnectToDB], Deals.UpdateDeal);

export default router;
