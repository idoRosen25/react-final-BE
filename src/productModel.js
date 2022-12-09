var mongoose = require("mongoose");
const Product = mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  image: String,
});

module.exports = mongoose.model("Product", Product);
