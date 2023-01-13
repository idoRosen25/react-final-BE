const router = require("express").Router();
const ReservationModel = require("../model/reservationModel");

router.get("/hotel", async (req, res) => {
  const { id, span } = req.body;

  try {
    if (!id) {
      throw new Error("INVALID_HOTEL_ID");
    }

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
      hotelId: id,
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
