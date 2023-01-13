var mongoose = require("mongoose");
const Room = mongoose.Schema(
  {
    roomId: {
      required: true,
      type: String,
      dropDups: true,
    },
    roomType: {
      type: String,
      default: "standard",
      required: false,
    },
    roomCost: {
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
