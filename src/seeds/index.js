const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./helpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const chooseRandom = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i <= 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${chooseRandom(descriptors)} ${chooseRandom(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dipjyyshp/image/upload/v1706027527/YelpCamp/j64mvcy2vjvyjbl4cs8y.jpg',
          filename: 'YelpCamp/j64mvcy2vjvyjbl4cs8y',
        },
        {
          url: 'https://res.cloudinary.com/dipjyyshp/image/upload/v1706027530/YelpCamp/xvl27aoqoveylaeicch7.jpg',
          filename: 'YelpCamp/xvl27aoqoveylaeicch7',
        },
        {
          url: 'https://res.cloudinary.com/dipjyyshp/image/upload/v1706028001/YelpCamp/mzrdtocvwuygshtfttqk.jpg',
          filename: 'YelpCamp/mzrdtocvwuygshtfttqk',
        },
      ],
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
