import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  id: String,
  name: String,
  image: String,
});

export default mongoose.model("Category", CategorySchema);
