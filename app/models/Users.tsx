import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
        name: { type: String, require: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        username: { type: String , default:'default' },
        isActive: { type: Boolean, default: true },
        status: { type: String, default: null },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

const User = models?.User || model('User', UserSchema);

export default User;
