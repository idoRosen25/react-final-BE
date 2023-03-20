var mongoose = require("mongoose");
const Room = mongoose.Schema(
  {
    room: {
      required: true,
      type: String,
      dropDups: true,
    },
    type: {
      type: String,
      default: "standard",
      required: false,
    },
    cost: {
      type: Number,
      required: true,
    },
    numOfBeds: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", Room);
