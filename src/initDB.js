const ProductModel = require("./productModel");
const products = [
  {
    name: "Pineapple",
    price: 20,
    description: "Fresh and Sweet pineapple from Cuba",
    image:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2749&q=80",
  },
  {
    name: "Strawberry",
    price: 10,
    description: "Hand-picked by local farmers",
    image:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJ1aXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Minced Meat",
    price: 45,
    description: "Locally grown beef, minced on the spot",
    image:
      "https://media.istockphoto.com/id/958146400/photo/ground-beef.jpg?b=1&s=170667a&w=0&k=20&c=oMcFiXPl3TOG9dOXLJBEoX0y7eJRl8n3AD58py0_bbg=",
  },
  {
    name: "Ribs",
    price: 60,
    description: "Freshly cooked ribs",
    image:
      "https://images.unsplash.com/photo-1567932847833-ecb7e227c2a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmlic3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Pears",
    price: 8,
    description: "Farm-to-table supply",
    image:
      "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Ice Cream",
    price: 5,
    description: "Multi flavored ice cream",
    image:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aWNlY3JlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Milk",
    price: 7,
    description: "Jug of Milk",
    image:
      "https://images.unsplash.com/photo-1634141510639-d691d86f47be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1pbGt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Bread",
    price: 3,
    description: "Freshly baked every day",
    image:
      "https://images.unsplash.com/photo-1586765501019-cbe3973ef8fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGJyZWFkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Donuts",
    price: 15,
    description: "freshly baked every day. Multiple flavours",
    image:
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Gummy Worms",
    price: 2,
    description: "Multi-colored gummy worms",
    image:
      "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
];

async function initDbProducts() {
  await ProductModel.deleteMany({});
  products.forEach(async (product, index) => {
    await new ProductModel({ id: parseInt(index + 1), ...product }).save();
  });
}

module.exports = { initDbProducts };
