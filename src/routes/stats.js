const router = require("express").Router();
const ReservationModel = require("../model/reservationModel");
const { ObjectId } = require("mongodb");
const HotelModel = require("../model/hotelModel");
const RoomModel = require("../model/roomModel");

router.get("/hotel/:id/months", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error("INVALID_HOTEL_ID");
    }

    const rooms = await RoomModel.find({});
    const hotelRes = await HotelModel.findOne({
      id,
    });

    const reservations = rooms.map((room) =>
      ReservationModel.aggregate([
        {
          $match: {
            hotelId: hotelRes._id,
            roomId: room._id,
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
      ])
    );

    const resolvedReservations = await Promise.all(reservations);
    const reducedReservations = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    };

    for (const bookingCount of resolvedReservations) {
      for (const booking of bookingCount) {
        reducedReservations[booking._id] = [
          ...reducedReservations[booking._id],
          booking.count,
        ];
      }
    }

    res.json({
      code: 200,
      data: reducedReservations,
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

router.get("/reservations", async (req, res) => {
  const { span } = req.body;

  try {
    // timeSpan is 24 hours by default;
    let spanTime = 24 * 60 * 60 * 1000;

    if (span !== "day") {
      switch (span) {
        case "week":
          spanTime *= 7;
          break;
        case "month":
          spanTime *= 30;
          break;
        case "year":
          spanTime *= 365;
          break;
      }
    }

    const reservations = await ReservationModel.find({
      createdAt: {
        $gte: new Date(Date.now() - spanTime).toISOString().split("T")[0],
        $lte: new Date(Date.now()).toISOString().split("T")[0],
      },
    }).sort({ createdAt: -1 });

    res.json({
      code: 200,
      data: reservations,
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "error",
      message: error?.message || error,
    });
  }
});

router.get("/totalByUser", async (req, res) => {
  const { id } = req.body;

  let reservations;
  try {
    if (id) {
      reservations = await ReservationModel.find({ userId: id }).sort({
        createdAt: -1,
      });
    } else {
      reservations = await ReservationModel.find(
        {},
        { $group: { _id: "$userId", total: { $sum: 1 } } }
      ).sort({ createdAt: -1 });
    }

    res.json({
      code: 200,
      data: reservations,
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
