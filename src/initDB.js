const HotelModel = require("./model/hotelModel");
const RoomModel = require("./model/roomModel");
const ReservationModel = require("./model/reservationModel");

const uuid = require("uuid");
const { faker } = require("@faker-js/faker");

const commerceFaker = faker.commerce;
const addressFaker = faker.address;

async function initDbProducts() {
  const data = await HotelModel.find();

  if (data) {
    return;
  }
  await ReservationModel.deleteMany({});
  await RoomModel.deleteMany({});
  await HotelModel.deleteMany({});

  const standard = await RoomModel({
    roomId: uuid.v4(),
    roomType: "standard",
    roomCost: commerceFaker.price(15, 50, 0),
    numOfBeds: 2,
  }).save();

  const delux = await RoomModel({
    roomId: uuid.v4(),
    roomType: "delux",
    roomCost: commerceFaker.price(80, 140, 0),
    numOfBeds: 4,
  }).save();

  const luxury = await RoomModel({
    roomId: uuid.v4(),
    roomType: "luxury",
    roomCost: commerceFaker.price(160, 220, 0),
    numOfBeds: 4,
  }).save();

  for (let i = 0; i < 5; i++) {
    const hotelName = `${faker.company.name()} Hotel`;
    const address = {
      city: addressFaker.city(),
      street: addressFaker.streetAddress(),
      country: addressFaker.country(),
    };

    try {
      await HotelModel({
        id: uuid.v4(),
        name: hotelName,
        image: faker.image.city(640, 480, true),
        address,
        rooms: {
          standard: {
            id: standard._id,
          },
          delux: {
            id: delux._id,
          },
          luxury: {
            id: luxury._id,
          },
        },
      }).save();
    } catch (error) {
      console.error(`Couldn't add hotel with this params`);
      i--;
    }
  }
}

module.exports = { initDbProducts };
