const express = require("express");
const bp = require("body-parser");
const app = express();
const cors = require("cors");
var mongoose = require("mongoose");
const ProductModel = require("./productModel");
const OrderModel = require("./orderModal");
const { initDbProducts } = require("./initDB");

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors({ origin: "*" }));

app.get("/products", async (req, res) => {
  try {
    res.status(200).json({
      products: await ProductModel.find({}),
    });
  } catch (error) {
    res.status(400).json({ products: null });
  }
});

app.post("/order", async (req, res) => {
  const { items, userData } = req.body;
  if (items.length && userData) {
    const order = await OrderModel.create({
      id: require("uuid").v4(),
      items,
      userData,
    });
    res.status(200).json({ order, message: "order created successfully" });
  } else {
    res.status(400).json({ order: null, message: "order not created" });
  }
});

app.listen(5200, async () => {
  console.log("server running on port:5200");
  mongoose.set("strictQuery", false);
  mongoose
    .connect("mongodb://localhost:27017/myapp")
    .then(async () => {
      console.log("connected to db using mongoose");
      await initDbProducts();
    })
    .catch((err) => {
      console.log("couldnt connect to db from mongoose");
    });
});
