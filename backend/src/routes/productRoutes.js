import express from 'express';
import {
  getProducts, getProductBySlug, getProductById,
  createProduct, updateProduct, deleteProduct, getRelatedProducts,
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.get('/',              getProducts);
router.get('/id/:id',        getProductById);
router.get('/:slug',         getProductBySlug);
router.get('/:id/related',   getRelatedProducts);
router.post('/',             protect, adminOnly, createProduct);
router.put('/:id',           protect, adminOnly, updateProduct);
router.delete('/:id',        protect, adminOnly, deleteProduct);

export default router;
