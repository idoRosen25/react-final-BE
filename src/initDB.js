const HotelModel = require("./model/hotelModel");
const RoomModel = require("./model/roomModel");
const ReservationModel = require("./model/reservationModel");
const { ObjectId } = require("mongodb");

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
    room: uuid.v4(),
    type: "standard",
    cost: commerceFaker.price(15, 50, 0),
    numOfBeds: 2,
  }).save();

  const delux = await RoomModel({
    room: uuid.v4(),
    type: "delux",
    cost: commerceFaker.price(80, 140, 0),
    numOfBeds: 4,
  }).save();

  const luxury = await RoomModel({
    room: uuid.v4(),
    type: "luxury",
    cost: commerceFaker.price(160, 220, 0),
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
        rooms: [
          {
            room: standard._id,
            available: 30,
            booked: 0,
          },
          {
            room: delux._id,
            available: 15,
            booked: 0,
          },
          {
            room: luxury._id,
            available: 6,
            booked: 0,
          },
        ],
      }).save();
    } catch (error) {
      console.error(`Couldn't add hotel with this params`);
      i--;
    }
  }
}

module.exports = { initDbProducts };
