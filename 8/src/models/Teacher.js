import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const teacherSchema = new Schema({
  id: ObjectId,
  fullName: String,
  photoUrl: String,
  shortDescr: String,
  longDescr: String
});

const Teacher = mongoose.model('Teacher', teacherSchema);


export default Teacher;