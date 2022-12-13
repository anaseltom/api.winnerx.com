const express = require('express');
const router = express.Router({});

import PromotionsController from '../controllers/promotions';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const Promotions = new PromotionsController();

router.post('/promotions/fetch', [DB.ConnectToDB], Promotions.FetchPromotion);
router.post('/promotions/fetch-all', [DB.ConnectToDB], Promotions.FetchPromotions);
router.post('/promotions/update', [DB.ConnectToDB], Promotions.UpdatePromotion);
 
export default router;
