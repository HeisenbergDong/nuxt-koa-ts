import { Schema, Model, model, Document } from 'mongoose';

export interface ProvinceDocument extends Document {
  id: string,
  value: Array<string>
}

const ProvinceSchema: Schema = new Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
});

export const Province: Model<ProvinceDocument> = model('Province', ProvinceSchema);
