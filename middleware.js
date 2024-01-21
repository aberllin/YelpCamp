const Campground = require('./src/models/campground');
const Review = require('./src/models/review');

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be logged in');
    return res.redirect('/login');
  }
  next();
};

const storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);

  if (!campground.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permissions to do that.');
    return res.redirect(`/campgrounds/${id}`);
  }

  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permissions to do that.');
    return res.redirect(`/campgrounds/${id}`);
  }

  next();
};

module.exports = { isLoggedIn, storeReturnTo, isAuthor, isReviewAuthor };
