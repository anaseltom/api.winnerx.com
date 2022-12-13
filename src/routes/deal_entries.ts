const express = require('express');
const router = express.Router({});

import DealEntriesController from '../controllers/deal_entries';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const DealEntries = new DealEntriesController();

router.post('/deal_entries/fetch', [DB.ConnectToDB], DealEntries.FetchDealEntry);
router.post('/deal_entries/fetch-all', [DB.ConnectToDB], DealEntries.FetchDealEntries);
router.post('/deal_entries/update', [DB.ConnectToDB], DealEntries.UpdateDealEntry);
 
export default router;
