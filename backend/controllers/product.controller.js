// backend/controllers/product.controller.js
import Product from '../models/product.model.js';
import Category from '../models/category.model.js';
import cloudinary from '../config/cloudinary.js';

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  try {
    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Upload images to Cloudinary
    const imageUploadPromises = Array.from(req.files.images).map(file =>
      cloudinary.v2.uploader.upload(file.path)
    );
    const uploadResponses = await Promise.all(imageUploadPromises);
    const imageUrls = uploadResponses.map(response => response.secure_url);

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images: imageUrls
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const updates = req.body;
  if (req.files && req.files.images) {
    // Upload images to Cloudinary
    const imageUploadPromises = Array.from(req.files.images).map(file =>
      cloudinary.v2.uploader.upload(file.path)
    );
    const uploadResponses = await Promise.all(imageUploadPromises);
    updates.images = uploadResponses.map(response => response.secure_url);
  }

  try {
    // If category is being updated, check if it exists
    if (updates.category) {
      const categoryExists = await Category.findById(updates.category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category' });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('category', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted Product' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
