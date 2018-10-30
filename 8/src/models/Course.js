import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
const courseSchema = new Schema({
  imageUrl: String,
  name: String,
  details: String
});

const Course = mongoose.model('Course', courseSchema);

export default Course;