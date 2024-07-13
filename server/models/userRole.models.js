import mongoose from 'mongoose';

const userRoleSchema = new mongoose.Schema({
    roleName: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null }
});

const UserRole = mongoose.model('UserRole', userRoleSchema);

export default UserRole;
