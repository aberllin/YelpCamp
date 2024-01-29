const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');
const catchAsyncWrapper = require('../utils/catchAsyncWrapper');
const passport = require('passport');
const { storeReturnTo } = require('../../middlewareFns');
const userControllers = require('../controllers/user');

router
  .route('/register')
  .get(userControllers.showRegisterForm)
  .post(catchAsyncWrapper(userControllers.registerUser));

router
  .route('/login')
  .get(userControllers.showLoginForm)
  .post(
    storeReturnTo,
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    catchAsyncWrapper(userControllers.loginUser),
  );

router.get('/logout', userControllers.logoutUser);

module.exports = router;
