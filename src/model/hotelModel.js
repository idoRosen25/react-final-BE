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
      type: [
        {
          room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
          available: Number,
          booked: Number,
        },
      ],
      required: true,
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
