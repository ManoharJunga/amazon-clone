import express from 'express';
import upload from '../config/multer.js';

// Import controllers
import {
  getRevenues, getRevenue, createRevenue, updateRevenue, deleteRevenue
} from '../controllers/revenue.controller.js';

import {
  createCategory, getCategories, getCategoryById, updateCategory, deleteCategory
} from '../controllers/category.controller.js';

import {
  getDashboard, createDashboard, updateDashboard, deleteDashboard
} from '../controllers/dashboard.controller.js';
import {
  getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer
} from '../controllers/customer.controller.js';
import {
  getPayments, getPayment, createPayment, updatePayment, deletePayment
} from '../controllers/payment.controller.js';
import {
  getOrders, getOrder, createOrder, updateOrder, deleteOrder
} from '../controllers/order.controller.js';
import {
  getOrderItems, getOrderItem, createOrderItem, updateOrderItem, deleteOrderItem
} from '../controllers/order_item.controller.js';
import {
  getChats, getChat, createChat, updateChat, deleteChat
} from '../controllers/chat.controller.js';
import {
  getMails, getMail, createMail, updateMail, deleteMail
} from '../controllers/mail.controller.js';
import {
  getCalendarEvents, getCalendarEvent, createCalendarEvent, updateCalendarEvent, deleteCalendarEvent
} from '../controllers/calendar.controller.js';
import {
  getBrands, getBrand, createBrand, updateBrand, deleteBrand
} from '../controllers/brand.controller.js';
import {
  getUsers, getUser, createUser, updateUser, deleteUser
} from '../controllers/user.controller.js';

// Routes
const router = express.Router();

// Dashboard Routes
router.get('/dashboard', getDashboard);
router.post('/dashboard', createDashboard);
router.put('/dashboard/:id', updateDashboard);
router.delete('/dashboard/:id', deleteDashboard);

// Customer Routes
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomer);
router.post('/customers', createCustomer);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

// Payment Routes
router.get('/payments', getPayments);
router.get('/payments/:id', getPayment);
router.post('/payments', createPayment);
router.put('/payments/:id', updatePayment);
router.delete('/payments/:id', deletePayment);

// Order Routes
router.get('/orders', getOrders);
router.get('/orders/:id', getOrder);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

// Order Item Routes
router.get('/order_items', getOrderItems);
router.get('/order_items/:id', getOrderItem);
router.post('/order_items', createOrderItem);
router.put('/order_items/:id', updateOrderItem);
router.delete('/order_items/:id', deleteOrderItem);

// Chat Routes
router.get('/chats', getChats);
router.get('/chats/:id', getChat);
router.post('/chats', createChat);
router.put('/chats/:id', updateChat);
router.delete('/chats/:id', deleteChat);

// Mail Routes
router.get('/mails', getMails);
router.get('/mails/:id', getMail);
router.post('/mails', createMail);
router.put('/mails/:id', updateMail);
router.delete('/mails/:id', deleteMail);

// Calendar Routes
router.get('/calendar', getCalendarEvents);
router.get('/calendar/:id', getCalendarEvent);
router.post('/calendar', createCalendarEvent);
router.put('/calendar/:id', updateCalendarEvent);
router.delete('/calendar/:id', deleteCalendarEvent);

// Brand Routes
router.get('/brands', getBrands);
router.get('/brands/:id', getBrand);
router.post('/brands', createBrand);
router.put('/brands/:id', updateBrand);
router.delete('/brands/:id', deleteBrand);

// User Routes
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Revenue Routes
router.get('/revenues', getRevenues);
router.get('/revenues/:id', getRevenue);
router.post('/revenues', createRevenue);
router.put('/revenues/:id', updateRevenue);
router.delete('/revenues/:id', deleteRevenue);

// Category Routes
router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
