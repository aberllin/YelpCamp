const User = require('../models/user');

const showRegisterForm = (req, res) => {
  res.render('auth/register');
};

const registerUser = async (req, res, next) => {
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
};

const showLoginForm = async (req, res) => {
  res.render('auth/login');
};

const loginUser = async (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = res.locals.returnTo || '/campgrounds';
  res.redirect(redirectUrl);

  delete res.locals.returnTo;
};

const logoutUser = (req, res) => {
  req.logout((error) => {
    if (error) {
      return req.flash('erorr', 'Something went wrong! Try again');
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
  });
};

module.exports = {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
  logoutUser,
};
