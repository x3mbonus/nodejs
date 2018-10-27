import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const studentSchema = new Schema({
  id: ObjectId,
  firstName: String,
  lastName: String,
  sex: String,
  age: Number
});

const Student = mongoose.model('Student', studentSchema);

export default Student;