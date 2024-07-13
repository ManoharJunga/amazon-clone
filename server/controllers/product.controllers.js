import Product from '../models/product.models.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { productName, urlSlug, categoryId, description, price, stockQuantity, status } = req.body;
    try {
        const product = new Product({
            productName,
            urlSlug,
            categoryId,
            description,
            price,
            stockQuantity,
            status
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, urlSlug, categoryId, description, price, stockQuantity, status } = req.body;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.productName = productName || product.productName;
        product.urlSlug = urlSlug || product.urlSlug;
        product.categoryId = categoryId || product.categoryId;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stockQuantity = stockQuantity || product.stockQuantity;
        product.status = status || product.status;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
