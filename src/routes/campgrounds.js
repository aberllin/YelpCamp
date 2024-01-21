const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require('../../middleware');

const { campgroundJoiSchema } = require('../schema');
const Campground = require('../models/campground');
const catchAsyncWrapper = require('../utils/catchAsyncWrapper');
const ExpressError = require('../utils/ExpressError');

const validateCampground = (req, res, next) => {
  const { error } = campgroundJoiSchema.validate(req.body);
  console.log('req.body', req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(',');

    throw new ExpressError('400', message);
  } else {
    next();
  }
};

// SHOW ALL
router.get(
  '/',
  catchAsyncWrapper(async (req, res) => {
    const allCampgrounds = await Campground.find({});

    res.render('campground/index', { campgrounds: allCampgrounds });
  }),
);

// CREATE NEW FORM
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campground/new');
});

// SHOW ONE
router.get(
  '/:id',
  catchAsyncWrapper(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    if (!campground) {
      req.flash('error', 'Campground with this ID does not exist');
      return res.redirect('/campgrounds');
    }
    res.render('campground/view', { campground });
  }),
);

// EDIT ONE
router.get(
  '/edit/:id',
  isLoggedIn,
  catchAsyncWrapper(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash('error', 'Campground with this ID does not exist');
      return res.redirect('/campgrounds');
    }

    res.render('campground/edit', { campground });
  }),
);

// UPDATE ONE
router.put(
  '/:id',
  validateCampground,
  isLoggedIn,
  catchAsyncWrapper(async (req, res) => {
    const { id } = req.params;
    const updatedPorduct = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });

    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${updatedPorduct._id}`);
  }),
);

// CREATE NEW
router.post(
  '/',
  validateCampground,
  isLoggedIn,
  catchAsyncWrapper(async (req, res) => {
    const newCamp = new Campground(req.body.campground);
    await newCamp.save();

    req.flash('success', 'Successfully created campground!');
    res.redirect(`/campgrounds/${newCamp._id}`);
  }),
);

// DELETE ONE
router.delete(
  '/:id',
  isLoggedIn,
  catchAsyncWrapper(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);

    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
  }),
);

module.exports = router;
