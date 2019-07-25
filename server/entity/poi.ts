import { Schema, Model, model, Document } from 'mongoose';

export interface PoiDocument extends Document {
  name: string,
  province: string,
  city: string,
  county: string,
  areaCode: string,
  tel: string,
  area: string,
  addr: string,
  type: string,
  module: string,
  longitude: number,
  latitude: number
}

const PoiSchema: Schema = new Schema({
  name: {
    type: String//景点名
  },
  province: {
    type: String
  },
  city:{
    type:String
  },
  county:{
    type:String
  },
  areaCode:{
    type:String
  },
  tel:{
    type:String
  },
  area:{
    type:String
  },
  addr:{
    type:String
  },
  type:{
    type:String
  },
  module:{
    type:String
  },
  longitude:{
    type:Number
  },
  latitude:{
    type:Number
  }
});

export const Poi: Model<PoiDocument> = model('Poi', PoiSchema);
