const router = require("express").Router();
const HotelModel = require("../model/hotelModel");
const RoomModel = require("../model/roomModel");
const roomIds = RoomModel.find({}).then((res) => res.map((room) => room._id));

router.get("/", async (req, res) => {
  const allHotels = await HotelModel.find();

  res.json({ code: 200, hotel: allHotels });
});

router.post("/", async (req, res) => {
  const { name, address, rooms } = req.body;

  console.log("hotel data: ", { name, address, rooms });
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
          id: roomIds[0],
          count: parseInt(rooms.standard),
        },
        delux: {
          id: roomIds[1],
          count: parseInt(rooms.delux),
        },
        luxury: {
          id: roomIds[2],
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

router.put("/", async (req, res) => {
  res.json({ message: "update products" });
});

router.delete("/", async (req, res) => {
  const { hotelId } = req.body;

  try {
    const hotel = await HotelModel.deleteOne({ id: hotelId });
    res.json({ code: 200, hotel });
  } catch (err) {
    console.log("error deleting hotel: ", err);
    res.json({ code: 500, status: "error", message: error?.message || error });
  }
});

module.exports = router;
