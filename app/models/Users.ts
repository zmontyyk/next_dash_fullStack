import moment from 'moment';
import {  Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const UserSchema = new Schema(
    {
        name: { type: String, require: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        username: { type: String, default: 'default' },
        isActive: { type: Boolean, default: true },
        status: { type: String, default: null },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Number, default: moment().unix() },
        avatar: { type: String ,default: null},
        bio: { type: String ,default: null},
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    },
);

const User = models?.User || model('User', UserSchema);

export default User;
