import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const PostSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: { type: String },
        image: { type: String },
        timestamp: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

const Post = models.Post || model('Post', PostSchema);

export default Post;
