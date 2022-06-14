import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  name: String,
  id: String,
  price: Number,
  categoryID: String,
  currency: String,
  image: String,
});

export default mongoose.model("ItemSchema", ItemSchema);
