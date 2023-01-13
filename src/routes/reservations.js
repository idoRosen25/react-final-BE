const router = require("express").Router();
const ReservationModel = require("../model/reservationModel");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      throw new Error("INVALID_USER_ID");
    }

    res.json({
      code: 200,
      data: await ReservationModel.find({ userId }).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

router.get("/:hotelId", async (req, res) => {
  try {
    const { hotelId } = req.params;
    if (!hotelId) {
      throw new Error("INVALID_HOTEL_NAME");
    }

    res.json({
      code: 200,
      data: await Reservation.find({ hotelId }).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    res.json({
      code: 200,
      data: await ReservationModel.find({}).sort({ createdAt: -1 }),
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
  const { userId, hotelId, roomId, checkInDate, checkOutDate } = req.body;

  try {
    if (!(userId && hotelId && roomId && checkInDate && checkOutDate)) {
      throw new Error("INVALID_RESERVATION_DATA");
    }

    const reservation = await new ReservationModel({
      userId,
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
    }).save();

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
  const { reservation } = req.body;

  try {
    const update = await ReservationModel.findOneAndUpdate(
      { _id: reservation._id },
      reservation
    );

    res.json({
      code: 200,
      status: "updated successfully",
      data: { ...update },
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

router.delete("/", async (req, res) => {
  const { reservationId } = req.body;

  try {
    if (!reservationId) {
      throw new Error("INVALID_RESERVATION_ID");
    }

    const resDelete = await ReservationModel.deleteOne({ _id: reservationId });
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
