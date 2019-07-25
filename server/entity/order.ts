import { Schema, Model, model, Document } from 'mongoose';

export interface OrderDocument extends Document {
  id: string,
  user: string,
  time: string,
  total: number,
  images: Array<string>,
  name: string,
  status: number
}

const OrderSchema: Schema = new Schema({
  id: {
    type: String,
    require: true
  },
  user:{
    type:String,
    require:true
  },
  time:{
    type:String,
    require:true
  },
  total:{
    type:Number,
    require:true
  },
  imgs:{
    type:Array,
    require:true
  },
  name:{
    type:String,
    require:true
  },
  status:{
    type:Number,
    require:true
  }
});

export const Order: Model<OrderDocument> = model('Order', OrderSchema);

// ----------------js-----------------
// import mongoose from 'mongoose'
// const Schema = mongoose.Schema
// const Order = new Schema({
//   id: {
//     type: String,
//     require: true
//   },
//   user:{
//     type:String,
//     require:true
//   },
//   time:{
//     type:String,
//     require:true
//   },
//   total:{
//     type:Number,
//     require:true
//   },
//   imgs:{
//     type:Array,
//     require:true
//   },
//   name:{
//     type:String,
//     require:true
//   },
//   status:{
//     type:Number,
//     require:true
//   }
// })
//
// export default mongoose.model('Order', Order)
