const router = require("express").Router();
const RoomModel = require("../model/roomModel");

router.get("/", async (req, res) => {
  try {
    res.json({
      code: 200,
      data: await RoomModel.find({}),
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error?.message || error });
  }
});

router.post("/", async (req, res) => {
  const { roomType, roomCost, numOfBeds } = req.body;

  try {
    if (!(roomType && roomCost && numOfBeds)) {
      throw new Error("INVALID_ROOM_DATA");
    }

    const room = await new RoomModel({
      roomId: require("uuid").v4(),
      roomType,
      roomCost: parseInt(roomCost),
      numOfBeds: parseInt(numOfBeds),
    }).save();

    res.json({
      code: 200,
      room,
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
  const { room } = req.body;

  try {
    const update = await RoomModel.findOneAndUpdate(
      { roomId: room.roomId },
      room,
      { new: true }
    );

    console.log("update", update);

    res.json({
      code: 200,
      status: "updated successfully",
      data: room,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, status: "error", message: error?.message || error });
  }
});

router.delete("/", async (req, res) => {
  const { roomId } = req.body;
  try {
    const roomDelete = await RoomModel.findOneAndDelete({ roomId });
    res.json({
      code: 200,
      status: "deleted successfully",
      room: { ...roomDelete },
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
