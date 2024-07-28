// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../models/customer.model.js';

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  const { name, email, phoneNumber, password, status } = req.body;
  try {
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) return res.status(400).json({ message: 'Customer already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newCustomer = new Customer({ name, email, phoneNumber, status, password: hashedPassword });

    await newCustomer.save();

    const token = jwt.sign({ email: newCustomer.email, id: newCustomer._id }, 'secret', { expiresIn: '1h' });

    res.status(201).json({ result: newCustomer, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Sign in
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingCustomer = await Customer.findOne({ email });
    if (!existingCustomer) return res.status(404).json({ message: 'Customer not found' });

    const isPasswordCorrect = await bcrypt.compare(password, existingCustomer.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: existingCustomer.email, id: existingCustomer._id }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ result: existingCustomer, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
