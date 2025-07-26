import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,  // Note: fixed typo from 'require' to 'required'
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {  // Note: fixed typo from 'jobTitel' to 'jobTitle'
    type: String,
  },
  gender: {
    type: String,
  },
});

export default model('User', userSchema);