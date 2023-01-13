var mongoose = require("mongoose");
const Reservation = mongoose.Schema(
  {
    userId: { type: String, required: true },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkInDate: { type: String, required: true },
    checkOutDate: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", Reservation);
