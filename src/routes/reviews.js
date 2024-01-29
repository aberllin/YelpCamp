const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsyncWrapper = require('../utils/catchAsyncWrapper');
const {
  isLoggedIn,
  isReviewAuthor,
  validateReview,
} = require('../../middlewareFns');
const reviewControllers = require('../controllers/review');

router.post(
  '/',
  isLoggedIn,
  validateReview,
  catchAsyncWrapper(reviewControllers.addReview),
);

router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsyncWrapper(reviewControllers.deleteReview),
);

module.exports = router;
