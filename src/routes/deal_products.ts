const express = require('express');
const router = express.Router({});

import DealProductsController from '../controllers/deal_products';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const DealProducts = new DealProductsController();

router.post('/deal_products/fetch', [DB.ConnectToDB], DealProducts.FetchDealProduct);
router.post('/deal_products/fetch-all', [DB.ConnectToDB], DealProducts.FetchDealProducts);
router.post('/deal_products/update', [DB.ConnectToDB], DealProducts.UpdateDealProduct);
// router.post('/deal_products/fetch-products', [DB.ConnectToDB], DealProducts.FetchProducts);

export default router;
