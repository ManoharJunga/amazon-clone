// backend/routes/products.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import upload from '../config/multer.js';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, .png files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Product Routes
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', upload.array('images'), createProduct);
router.put('/products/:id', upload.array('images'), updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
