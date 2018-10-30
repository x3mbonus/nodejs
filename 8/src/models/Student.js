import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  sex: String,
  age: Number
});

const Student = mongoose.model('Student', studentSchema);

export default Student;

