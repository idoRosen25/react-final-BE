var mongoose = require("mongoose");
const Hotel = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, dropDups: true },
    rooms: {
      standard: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
        },
        count: {
          type: Number,
          default: 1,
        },
      },
      delux: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
        },
        count: {
          type: Number,
          default: 1,
        },
      },
      luxury: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
        },
        count: {
          type: Number,
          default: 1,
        },
      },
    },
    address: {
      city: { type: String, required: true },
      street: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", Hotel);
