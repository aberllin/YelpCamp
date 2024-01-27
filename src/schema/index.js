const Joi = require('joi');

const campgroundJoiSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    images: Joi.array().min(1),
    description: Joi.string().required(),
    location: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.campgroundJoiSchema = campgroundJoiSchema;

const reviewJoiSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required(),
  }).required(),
});

module.exports.reviewJoiSchema = reviewJoiSchema;
