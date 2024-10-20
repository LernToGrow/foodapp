import express from 'express';
import authmiddleware from '../middleware/auth.js'
import { listOrders, placeOrder, updatestatus, userOrders, verifyOrder  } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place',authmiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.post('/userorders',authmiddleware,userOrders);
orderRouter.get('/list',listOrders);
orderRouter.post('/status',updatestatus)

export default orderRouter;