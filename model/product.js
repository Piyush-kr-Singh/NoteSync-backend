const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  email: { type: String, required: true },
  topic: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  college: { type: String, unique: false },
  about: [{ type: String, required: true, unique: true }],
  owner: { type: String },
  like: { default: 0, type: Number },
  date: { type: String },
  thumbnail: { type: String },
  images: [String],
  phoneNo: { type: Number },
  flag: { default: false, type: Boolean },
  sidebarFlag: { default: false, type: String }

});

exports.Product = mongoose.model('Product', productSchema);