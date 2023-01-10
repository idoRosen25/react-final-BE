const router = require("express").Router();
const { faker } = require("@faker-js/faker");
const HotelModel = require("../model/hotelModel");
const RoomModel = require("../model/roomModel");
const roomIds = RoomModel.find({}).then((res) => res.map((room) => room._id));

router.get("/", async (req, res) => {
  const allHotels = await HotelModel.find();

  res.status(200).json({ hotel: allHotels });
});

router.post("/", async (req, res) => {
  const { name, address, rooms } = req.body;

  console.log("hotel data: ", { name, address, rooms });
  if (!(name && address)) {
    res.status(400).json({ message: "INVALID_DATA" });
  }

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
  res.json({ hotel });
});

router.put("/", async (req, res) => {
  res.json({ message: "update products" });
});

router.delete("/", async (req, res) => {
  const { hotelId } = req.body;

  const hotel = await HotelModel.deleteOne({ id: hotelId });
  res.json({ hotel });
});

module.exports = router;
