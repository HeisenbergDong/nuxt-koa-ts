import { Schema, Model, model, Document } from 'mongoose';

export interface MenuDocument extends Document {
  menu: Array<string>
}

const MenuSchema: Schema = new Schema({
  menu: {
    type: Array,
    require: true
  }
});

export const Menu: Model<MenuDocument> = model('Menu', MenuSchema);
