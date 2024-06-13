import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';


const CommentSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  const LikeSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  });

const PostSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        image: { type: String },
        content: { type: String },
        timestamp: { type: Date, default: Date.now },
        comments: [CommentSchema],
        likes: [LikeSchema],
    },
    {
        timestamps: true,
    },
);

const Post = models.Post || model('Post', PostSchema);

export default Post;


