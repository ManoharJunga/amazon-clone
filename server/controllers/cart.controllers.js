import Cart from '../models/cart.models.js';

export const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate('userId productId productVariantId');
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCart = async (req, res) => {
    const { userId, productId, productVariantId, quantity } = req.body;
    try {
        const cart = new Cart({
            userId,
            productId,
            productVariantId,
            quantity
        });

        const savedCart = await cart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCart = async (req, res) => {
    const { id } = req.params;
    const { userId, productId, productVariantId, quantity } = req.body;
    try {
        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.userId = userId || cart.userId;
        cart.productId = productId || cart.productId;
        cart.productVariantId = productVariantId || cart.productVariantId;
        cart.quantity = quantity || cart.quantity;

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
