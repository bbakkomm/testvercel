import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: String,
  password: String,
  name: String,
  email: String,
  thumb: {
    type: String,
    default: 'https://res.cloudinary.com/dvlunddak/image/upload/v1727637542/default_f7j3nd.jpg'
  },
  thumbPublicId: String,
  job: {
    type: String,
    enum: ['planner', 'designer', 'developer'],
  },
  skillTag: {
    type: Array,
    item: [],
  },
  like: {
    type: Number,
    default: 0,
  },
  study: {
    type: Number,
    default: 0,
  },
  complete: {
    type: Number,
    default: 0,
  },
  introduce: {
    type: String,
    default: '소개글을 작성하세요.'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

UserSchema.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj.password;
  return obj;
}

export default mongoose.model('User', UserSchema);