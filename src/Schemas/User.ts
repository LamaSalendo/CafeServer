import mongoose, { Schema, now } from "mongoose";

const Order = new Schema({
  name: String,
  amount: Number,
  price: Number,
  image: String,
  id: String,
  currency: String,
  categoryID: String,
});

const RecentOrder = new Schema({
  price: Number,
  currency: {
    type: String,
    default: "EUR",
  },
  date: { type: Date, default: now },
  items: { type: [Order], default: [] },
  id: String,
  orderID: Number,
});

const UserSchema = new Schema({
  id: String,
  age: String,
  username: String,
  classID: String,
  credit: {
    type: Number,
    default: 1,
  },
  currency: {
    type: String,
    default: "EUR",
  },
  password: String,
  recentOrder: { type: [RecentOrder], default: [] },
  admin: { type: Boolean, default: false },
});

export default mongoose.model("User", UserSchema);
