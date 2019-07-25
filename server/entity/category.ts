import { Schema, Model, model, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  city: string,
  types: Array<any>,
  areas: Array<any>
}

const CategorySchema: Schema = new Schema({
  city: {
    type: String
  },
  types: {
    type: Array,
    require: true
  },
  areas:{
    type:Array,
    require:true
  }
});

export const Category: Model<CategoryDocument> = model('Category', CategorySchema);
