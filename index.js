const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./src/models/campground');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./src/utils/ExpressError');
const campgroundRoutes = require('./src/routes/campgrounds');
const reviewRoutes = require('./src/routes/reviews');
const userRoutes = require('./src/routes/users');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./src/models/user');

/** ----------- MONGOOSE CONNECTION ----------- */
const dbName = 'yelp-camp';
mongoose.connect(`mongodb://localhost:27017/${dbName}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => console.log('Database connected!'));

/** ----------- EXPRESS ----------- */
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  secret: 'thisismysecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

/** PASSPORT SHINANNIGANS  */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

/** ----------- EXPRESS ROUTES ----------- */
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

/** For the unhandled routes send Page is not found error to the next middleware */
app.all('*', (req, res, next) => {
  next(new ExpressError(404, `Page is not found`));
});

/** Is responsible for all passed errors and displaying the error view */
app.use((err, req, res, next) => {
  if (!err.message) {
    err.message = 'Oops, something went wrong!';
  }
  res.render('error', { err });
});

app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000!');
});
