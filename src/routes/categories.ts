const express = require('express');
const router = express.Router({});

import CategoriesController from '../controllers/categories';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const Categories = new CategoriesController();

router.post('/categories/fetch', [DB.ConnectToDB], Categories.FetchCategory);
router.post('/categories/fetch-all', [DB.ConnectToDB], Categories.FetchCategories);
router.post('/categories/update', [DB.ConnectToDB], Categories.UpdateCategory);
 
export default router;
