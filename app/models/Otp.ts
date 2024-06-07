// models/otp.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';
import moment from 'moment';

export interface OtpDocument extends Document {
    email: string;
    otp: string;
    createdAt: Date;
}

const OtpSchema: Schema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Number, default: moment().unix() },
});

const Otp = models?.Otp || model('Otp', OtpSchema);

export default Otp;
