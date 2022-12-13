const express = require('express');
const router = express.Router({});

import SupportController from '../controllers/support';
import ConnectDB from '../middlewares/ConnectDB';
const Support = new SupportController();
const DB = new ConnectDB();
 
router.post('/support/create', [DB.ConnectToDB], Support.CreateSupportTicket);
router.post('/support/fetch-all', [DB.ConnectToDB], Support.FetchSupportTickets);
router.post('/support/fetch-details', [DB.ConnectToDB], Support.FetchSupportTicketDetails);
router.post('/support/change-ticket-status', [DB.ConnectToDB], Support.CloseDeleteSupportTicket);

export default router;
