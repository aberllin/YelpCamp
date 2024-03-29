const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./helpers');

const axios = require('axios');

const getRandomImageUrl = async () => {
  const response = await axios.get(
    'https://source.unsplash.com/random/500x300/?camping',
    {
      responseType: 'json',
    },
  );
  return response.request.res.responseUrl;
};

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const chooseRandom = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i <= 200; i++) {
    const imageUrl = await getRandomImageUrl();
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${chooseRandom(descriptors)} ${chooseRandom(places)}`,
      images: [
        {
          url: imageUrl,
          filename: `YelpCamp/${imageUrl}`,
        },
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      author: '65abc0420ec1346a067f7627',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
