const router = require("express").Router();
const HotelModel = require("../model/hotelModel");
const RoomModel = require("../model/roomModel");
const ReservationModel = require("../model/reservationModel");

router.get("", async (req, res) => {
  const allHotels = await HotelModel.find();

  res.json({ code: 200, hotels: allHotels });
});

router.post("", async (req, res) => {
  const roomIds = await RoomModel.find({}, "_id roomType");

  const { name, address, rooms } = req.body;

  if (!(name && address)) {
    res.status(400).json({ message: "INVALID_DATA" });
  }

  try {
    const hotel = await HotelModel({
      id: require("uuid").v4(),
      name,
      address,
      rooms: {
        standard: {
          id: roomIds.find((room) => room.roomType === "standard")?._id,
          count: parseInt(rooms.standard),
        },
        delux: {
          id: roomIds.find((room) => room.roomType === "delux")?._id,
          count: parseInt(rooms.delux),
        },
        luxury: {
          id: roomIds.find((room) => room.roomType === "luxury")?._id,
          count: parseInt(rooms.luxury),
        },
      },
    }).save();

    res.json({ code: 200, hotel });
  } catch (error) {
    console.error("error adding new hotel: ", error);
    res
      .status(400)
      .json({ code: 400, status: "error", message: error?.message || error });
  }
});
router.get("/:id/reservations", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) throw new Error("INVALID_ID");
    const hotel = await HotelModel.findOne({ id });
    if (!hotel) throw new Error("HOTEL_NOT_FOUND");

    const reservations = await ReservationModel.find({ hotelId: hotel._id });
    res.json({ code: 200, reservations: reservations || [] });
  } catch (error) {
    res.json({ code: 400, status: "error", message: error?.message || error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) throw new Error("INVALID_ID");
    const hotel = await HotelModel.findOne({ id }).populate(
      "rooms.standard.id rooms.delux.id rooms.luxury.id"
    );

    res.json({ code: 200, hotel });
  } catch (error) {
    console.error("error fetching hotel: ", error);
    res
      .status(400)
      .json({ code: 400, status: "error", message: error?.message || error });
  }
});

router.put("", async (req, res) => {
  const { hotel } = req.body;
  try {
    await HotelModel.findOneAndUpdate({ id: hotel.id }, hotel);

    res.status(200).json({
      code: 200,
      status: "success",
      hotel,
    });
  } catch (error) {
    console.error("update error: ", error);
    res
      .status(400)
      .json({ code: 400, status: "error", message: error?.message || error });
  }
});

router.delete("", async (req, res) => {
  const { hotelId } = req.body;

  try {
    const hotel = await HotelModel.deleteOne({ id: hotelId });
    res.json({ code: 200, hotel });
  } catch (err) {
    res.json({ code: 500, status: "error", message: error?.message || error });
  }
});

module.exports = router;
