import mongoose, { Schema } from "mongoose";

const ClassSchema = new Schema({
  id: String,
  name: String,
});

export default mongoose.model("Class", ClassSchema);
