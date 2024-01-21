const Review = require('../models/review');
const Campground = require('../models/campground');

const addReview = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  camp.reviews.push(review);
  await review.save();
  await camp.save();

  req.flash('success', 'Successfully added review!');
  res.redirect(`/campgrounds/${id}`);
};

const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash('success', 'Successfully deleted review!');
  res.redirect(`/campgrounds/${id}`);
};

module.exports = { addReview, deleteReview };
