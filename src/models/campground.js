const mongoose = require('mongoose');
const Review = require('./review');

const Schema = mongoose.Schema;

const CampgroundSchema = Schema({
  title: String,
  description: String,
  location: String,
  image: String,
  price: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

/** Delete assosiated reviews after campground is removed */
CampgroundSchema.post('findOneAndDelete', async (data) => {
  if (data) {
    await Review.deleteMany({
      _id: {
        $in: data.reviews,
      },
    });
  }
});

module.exports = mongoose.model('Campground', CampgroundSchema);
