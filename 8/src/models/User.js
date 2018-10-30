import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
const schema = new Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', schema);

export default User;