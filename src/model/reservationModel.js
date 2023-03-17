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
    numberOfGuests: { type: Number, default: 1 },
    guest: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      address: {
        city: { type: String },
        street: { type: String },
        country: { type: String },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", Reservation);
