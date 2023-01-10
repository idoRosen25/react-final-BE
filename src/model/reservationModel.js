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
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", Reservation);
