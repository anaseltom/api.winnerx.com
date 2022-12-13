const express = require('express');
const router = express.Router({});

import WinnersController from '../controllers/winners';
import AuthMiddleware from '../middlewares/Auth';
import ConnectDB from '../middlewares/ConnectDB';

const Auth = new AuthMiddleware();
const DB = new ConnectDB();
const Winners = new WinnersController();

router.post('/winners/fetch', [DB.ConnectToDB], Winners.FetchWinner);
router.post('/winners/fetch-all', [DB.ConnectToDB], Winners.FetchWinners);
router.post('/winners/update', [DB.ConnectToDB], Winners.UpdateWinner);

export default router;
