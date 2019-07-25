import { Schema, Model, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string,
  password: string,
  email: string
}

const UserSchema: Schema = new Schema({
  username:{
    type:String,
    unique:true,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  }
});

export const User: Model<UserDocument> = model('User', UserSchema);
