const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');
const catchAsyncWrapper = require('../utils/catchAsyncWrapper');
const passport = require('passport');
const { storeReturnTo } = require('../../middleware');

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post(
  '/register',
  catchAsyncWrapper(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
      });
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('register');
    }
  }),
);

router.get('/login', async (req, res) => {
  res.render('auth/login');
});

router.post(
  '/login',
  storeReturnTo,
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  catchAsyncWrapper(async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);

    delete res.locals.returnTo;
  }),
);

router.get('/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      return req.flash('erorr', 'Something went wrong! Try again');
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
  });
});

module.exports = router;
