const HotelModel = require("./model/hotelModel");
const RoomModel = require("./model/roomModel");
const uuid = require("uuid");
const { faker } = require("@faker-js/faker");

const companyFaker = faker.company;

const roomIds = [];
async function initDbProducts() {
  await RoomModel.deleteMany({});
  await HotelModel.deleteMany({});

  const standard = await RoomModel({
    roomId: uuid.v4(),
    roomType: "standard",
    roomCost: faker.commerce.price(15, 50, 0),
    numOfBeds: 2,
  }).save();

  const delux = await RoomModel({
    roomId: uuid.v4(),
    roomType: "delux",
    roomCost: faker.commerce.price(80, 140, 0),
    numOfBeds: 4,
  }).save();

  const luxury = await RoomModel({
    roomId: uuid.v4(),
    roomType: "luxury",
    roomCost: faker.commerce.price(160, 220, 0),
    numOfBeds: 4,
  }).save();

  for (let i = 0; i < 5; i++) {
    const hotelName = `${faker.company.name()} Hotel`;
    const address = {
      long: parseInt(faker.address.longitude()),
      lat: parseInt(faker.address.latitude()),
      city: faker.address.city(),
      street: faker.address.streetAddress(),
      country: faker.address.country(),
    };

    await HotelModel({
      id: uuid.v4(),
      name: hotelName,
      address,
      rooms: {
        standard: {
          id: standard._id,
          count: faker.commerce.price(10, 15, 0),
        },
        delux: {
          id: delux._id,
          count: faker.commerce.price(5, 10, 0),
        },
        luxury: {
          id: luxury._id,
          count: faker.commerce.price(0, 5, 0),
        },
      },
    }).save();
  }
}

module.exports = { initDbProducts };
