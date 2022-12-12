var mongoose = require("mongoose");
const Order = mongoose.Schema({
  id: String,
  items: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  userData: {
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    zip: String,
  },
});

module.exports = mongoose.model("Order", Order);
