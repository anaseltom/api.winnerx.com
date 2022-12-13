const express = require('express');
const router = express.Router({});

import ProductsController from '../controllers/products';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const Products = new ProductsController();

router.post('/products/fetch', [DB.ConnectToDB], Products.FetchProduct);
router.post('/products/fetch-all', [DB.ConnectToDB], Products.FetchProducts);
router.post('/products/update', [DB.ConnectToDB], Products.UpdateProduct);
router.post('/products/update-list', [DB.ConnectToDB], Products.UpdateProductList);
router.post('/products/import', [DB.ConnectToDB], Products.ImportProducts);
router.post('/products/deals', [DB.ConnectToDB], Products.FetchProductDeals);
 
export default router;
