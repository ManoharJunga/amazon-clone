import express from 'express';
import { createCart, getCarts, updateCart, deleteCart } from '../controllers/cart.controllers.js';

const router = express.Router();

router.post('/', createCart);
router.get('/', getCarts);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

export default router;
