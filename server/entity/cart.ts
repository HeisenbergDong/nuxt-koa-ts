import { Schema, Model, model, Document } from 'mongoose';

export interface CartDocument extends Document {
  id: string,
  detail: Array<string>,
  cartNo: string,
  user: string,
  time: string
}

const CartSchema: Schema = new Schema({
  id: {
    type: String,
    require: true
  },
  detail: {
    type: Array,
    require: true
  },
  cartNo: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  }
});

export const Cart: Model<CartDocument> = model('Cart', CartSchema);
