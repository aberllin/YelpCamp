const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require('../../middleware');
const catchAsyncWrapper = require('../utils/catchAsyncWrapper');
const campgroundControllers = require('../controllers/campground');

router
  .route('/')
  .get(catchAsyncWrapper(campgroundControllers.showAll))
  .post(
    validateCampground,
    isLoggedIn,
    catchAsyncWrapper(campgroundControllers.createNew),
  );

router.get('/new', isLoggedIn, campgroundControllers.createNewForm);

router
  .route('/:id')
  .get(catchAsyncWrapper(campgroundControllers.showOne))
  .put(
    validateCampground,
    isLoggedIn,
    isAuthor,
    catchAsyncWrapper(campgroundControllers.updateOne),
  )
  .delete(
    isLoggedIn,
    isAuthor,
    catchAsyncWrapper(campgroundControllers.deleteOne),
  );

router.get(
  '/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsyncWrapper(campgroundControllers.editForm),
);

module.exports = router;
