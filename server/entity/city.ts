import { Schema, Model, model, Document } from 'mongoose';

export interface CityDocument extends Document {
  id: string,
  value: Array<Detail>
}

interface Detail {
  province: string,
  name: string,
  id: string
}

const CitySchema: Schema = new Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
});

export const City: Model<CityDocument> = model('City', CitySchema);
