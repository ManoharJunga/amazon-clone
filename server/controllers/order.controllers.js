import Order from '../models/order.models.js';

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createOrder = async (req, res) => {
    const { orderNumber, userId, totalAmount, discountAmount, grossAmount, shippingAmount, netAmount, status, paymentStatus, paymentType, paymentTransactionId } = req.body;
    try {
        const order = new Order({
            orderNumber,
            userId,
            totalAmount,
            discountAmount,
            grossAmount,
            shippingAmount,
            netAmount,
            status,
            paymentStatus,
            paymentType,
            paymentTransactionId
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { orderNumber, userId, totalAmount, discountAmount, grossAmount, shippingAmount, netAmount, status, paymentStatus, paymentType, paymentTransactionId } = req.body;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderNumber = orderNumber || order.orderNumber;
        order.userId = userId || order.userId;
        order.totalAmount = totalAmount || order.totalAmount;
        order.discountAmount = discountAmount || order.discountAmount;
        order.grossAmount = grossAmount || order.grossAmount;
        order.shippingAmount = shippingAmount || order.shippingAmount;
        order.netAmount = netAmount || order.netAmount;
        order.status = status || order.status;
        order.paymentStatus = paymentStatus || order.paymentStatus;
        order.paymentType = paymentType || order.paymentType;
        order.paymentTransactionId = paymentTransactionId || order.paymentTransactionId;

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
