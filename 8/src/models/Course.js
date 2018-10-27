import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const courseSchema = new Schema({
  id: ObjectId,
  imageUrl: String,
  name: String,
  details: String
});

const Course = mongoose.model('Course', courseSchema);

export default Course;