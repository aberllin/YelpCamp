const mongoose = require('mongoose');
const Review = require('./review');
const cloudinary = require('cloudinary');
const Schema = mongoose.Schema;

const options = {
  toJSON: { virtuals: true },
};

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema(
  {
    title: String,
    description: String,
    location: {
      type: String,
      required: true,
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: [ImageSchema],
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
  },
  options,
);

CampgroundSchema.virtual('properties.popupHTML').get(function () {
  return `
    <strong><div>${this.title}</div></strong>
    <a href='/campgrounds/${this._id}'>View</a>
    `;
});

/** Delete assosiated reviews and images after campground is removed */
CampgroundSchema.post('findOneAndDelete', async function (data) {
  if (data) {
    await Review.deleteMany({
      _id: {
        $in: data.reviews,
      },
    });
    for (let image of data.images) {
      await cloudinary.uploader.destroy(image.filename);
    }
  }
});

module.exports = mongoose.model('Campground', CampgroundSchema);
