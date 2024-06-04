import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String,  },
  isActive: { type: Boolean, default:true },
  status: { type: String, default: null },
  lastUpdated:{type:String,default:null},
  
});

const User = models?.User || model('User', UserSchema);

export default User;
