import express from 'express';
import {
  createOrder, getOrders, getOrderById,
  getOrderByNumber, updateOrderStatus,
  updatePaymentStatus, deleteOrder,
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.post('/',                       protect, createOrder);
router.get('/',                        protect, getOrders);
router.get('/number/:orderNumber',     protect, getOrderByNumber);
router.get('/:id',                     protect, getOrderById);
router.put('/:id/status',              protect, adminOnly, updateOrderStatus);
router.put('/:id/payment',             protect, adminOnly, updatePaymentStatus);
router.delete('/:id',                  protect, adminOnly, deleteOrder);

export default router;
