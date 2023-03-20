const router = require("express").Router();
const HotelModel = require("../model/hotelModel");
const ReservationModel = require("../model/reservationModel");
const RoomModel = require("../model/roomModel");

router.get("/", async (req, res) => {
  try {
    res.json({
      code: 200,
      reservations: await ReservationModel.find(),
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      throw new Error("INVALID_USER_ID");
    }

    res.json({
      code: 200,
      reservations: await ReservationModel.find({ userId })
        .populate("hotelId roomId")
        .sort({
          createdAt: -1,
        }),
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("INVALID_RESERVTION_ID");
    }

    res.json({
      code: 200,
      reservation: await ReservationModel.findById(id).populate(
        "hotelId roomId"
      ),
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

router.post("/", async (req, res) => {
  const {
    userId,
    hotelId,
    roomId,
    checkInDate,
    checkOutDate,
    numberOfGuests,
    guest,
  } = req.body;

  try {
    if (!(userId && hotelId && roomId && checkInDate && checkOutDate)) {
      throw new Error("ReservationData is not valid. Try Again");
    }

    const reservation = await new ReservationModel({
      userId,
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      guest,
    }).save();

    const hotel = await HotelModel.findById(hotelId);
    await HotelModel.findByIdAndUpdate(hotelId, {
      rooms: hotel.rooms.map((room) =>
        room.room.toString() === roomId
          ? {
              room: room.room,
              available: room.available,
              booked: room.booked + 1,
            }
          : room
      ),
    });

    res.json({
      code: 200,
      reservation,
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

router.put("/", async (req, res) => {
  const reservation = req.body;

  try {
    const room = await RoomModel.findOne({ type: reservation.type });
    const update = await ReservationModel.findOneAndUpdate(
      { _id: reservation._id },
      {
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate,
        numberOfGuests: reservation.numberOfGuests,
        roomId: room._id,
      }
    );

    res.json({
      code: 200,
      status: "updated successfully",
      reservation: { ...update },
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id: reservationId } = req.params;

  try {
    if (!reservationId) {
      throw new Error("INVALID_RESERVATION_ID");
    }
    const reservation = await ReservationModel.findById(reservationId).populate(
      "roomId"
    );

    const resDelete = await ReservationModel.deleteOne({ _id: reservationId });
    const hotel = await HotelModel.findById(reservation.hotelId);
    await HotelModel.findByIdAndUpdate(reservation.hotelId, {
      rooms: hotel.rooms.map((room) =>
        room.room.toString() === reservation.roomId.toString()
          ? {
              room: room.room,
              available: room.available,
              booked: room.booked + 1,
            }
          : room
      ),
    });
    res.json({
      code: 200,
      status: "deleted successfully",
      data: { ...resDelete },
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

module.exports = router;
