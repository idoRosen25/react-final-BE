const express = require("express");
const bp = require("body-parser");
const app = express();
const cors = require("cors");
var mongoose = require("mongoose");

const { initDbProducts } = require("./initDB");

const userRoutes = require("./routes/user");
const hotelRoutes = require("./routes/hotels");
const roomRoutes = require("./routes/rooms");
const reservationRoutes = require("./routes/reservations");
const statsRoutes = require("./routes/stats");

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors({ origin: "*" }));

app.use("/user", userRoutes);
app.use("/hotels", hotelRoutes);
app.use("/room", roomRoutes);
app.use("/reservation", reservationRoutes);
app.use("/stats", statsRoutes);

app.use("*", async (req, res) => {
  res.status(404).json({ message: "not found" });
});

app.listen(5200, async () => {
  console.log("server running on port:5200");
  mongoose.set("strictQuery", false);
  mongoose
    .connect("mongodb://localhost:27017/myapp")
    .then(async () => {
      console.log("connected to db using mongoose");
      initDbProducts().then(() => console.log("db init done"));
    })
    .catch((err) => {
      console.log("couldnt connect to db from mongoose: ", err);
    });
});
