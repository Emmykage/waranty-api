import express from 'express';
import {
  createProduct,
  delProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controller/productController.js';
import validateToken from '../middleware/validateTokenHandler.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', validateToken, createProduct);
router.patch('/:id', validateToken, updateProduct);
router.delete('/:id', validateToken, delProduct);

export default router;
