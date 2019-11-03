import { Schema, Model, model, Document } from 'mongoose';

export interface LotteryDocument extends Document {
  d: string,
  s: string,
  n1: number,
  n2: number,
  n3: number,
  n4: number,
  n5: number
}

const LotterySchema: Schema = new Schema({
  d:{
    type: String,
    require: true
  },
  s:{
    type:String,
    require:true
  },
  n1:{
    type:Number,
    require:true
  },
  n2:{
    type:Number,
    require:true
  },
  n3:{
    type:Number,
    require:true
  },
  n4:{
    type:Number,
    require:true
  },
  n5:{
    type:Number,
    require:true
  }
});

export const Lottery: Model<LotteryDocument> = model('Lottery', LotterySchema);
