var mongoose = require("mongoose");
const Hotel = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: { type: String, dropDups: true },
    rooms: {
      standard: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
        },
      },
      delux: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
      },
      luxury: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
      },

      index: false,
      unique: false,
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
