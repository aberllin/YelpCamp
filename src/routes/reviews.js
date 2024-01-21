const express = require('express');
const router = express.Router({ mergeParams: true });
const { reviewJoiSchema } = require('../schema');
const Review = require('../models/review');
const Campground = require('../models/campground');
const catchAsyncWrapper = require('../utils/catchAsyncWrapper');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../../middleware');

const validateReview = (req, res, next) => {
  const { error } = reviewJoiSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(',');

    throw new ExpressError('400', message);
  } else {
    next();
  }
};

router.post(
  '/',
  validateReview,
  isLoggedIn,
  catchAsyncWrapper(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    const review = new Review(req.body.review);
    camp.reviews.push(review);
    await review.save();
    await camp.save();

    req.flash('success', 'Successfully added review!');
    res.redirect(`/campgrounds/${id}`);
  }),
);

router.delete(
  '/:reviewId',
  isLoggedIn,
  catchAsyncWrapper(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
  }),
);

module.exports = router;
