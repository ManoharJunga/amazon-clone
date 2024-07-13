import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive', 'block'], required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
