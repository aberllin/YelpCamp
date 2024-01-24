const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require('../../middleware');
const catchAsyncWrapper = require('../utils/catchAsyncWrapper');
const campgroundControllers = require('../controllers/campground');
const multer = require('multer');

const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
  .route('/')
  .get(catchAsyncWrapper(campgroundControllers.showAll))
  .post(
    isLoggedIn,
    upload.array('image'),
    validateCampground,
    catchAsyncWrapper(campgroundControllers.createNew),
  );

router.get('/new', isLoggedIn, campgroundControllers.createNewForm);

router
  .route('/:id')
  .get(catchAsyncWrapper(campgroundControllers.showOne))
  .put(
    isLoggedIn,
    upload.array('image'),
    validateCampground,
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
