import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
const lectorsSchema = new Schema({
  fullName: String,
  photoUrl: String,
  shortText: String,
  longText: String
});

const Lector = mongoose.model('Lector', lectorsSchema);

export default Lector;
