import User from '../models/user.models.js';
import UserRole from '../models/userRole.models.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { fullName, email, password, phoneNumber, role, status } = req.body;
    try {
        // Find the role by name and get its ObjectId
        const userRole = await UserRole.findOne({ roleName: role });
        if (!userRole) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            role: userRole._id,
            status
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};