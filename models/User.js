// models/User.js
import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  accessToken: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
