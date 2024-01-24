const Campground = require('../models/campground');

const showAll = async (req, res) => {
  const allCampgrounds = await Campground.find({});
  res.render('campground/index', { campgrounds: allCampgrounds });
};

const createNewForm = (req, res) => {
  res.render('campground/new');
};

const showOne = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    })
    .populate('author');

  if (!campground) {
    req.flash('error', 'Campground with this ID does not exist');
    return res.redirect('/campgrounds');
  }
  res.render('campground/view', { campground });
};

const editForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash('error', 'Campground with this ID does not exist');
    return res.redirect('/campgrounds');
  }

  if (!campground.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permissions to do that');
    return req.redirect(`/campgrounds/${campground._id}`);
  }

  res.render('campground/edit', { campground });
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const updatedPorduct = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });

  req.flash('success', 'Successfully updated campground!');
  res.redirect(`/campgrounds/${updatedPorduct._id}`);
};

const createNew = async (req, res) => {
  const newCamp = new Campground(req.body.campground);
  newCamp.author = req.user._id;
  await newCamp.save();

  req.flash('success', 'Successfully created campground!');
  res.redirect(`/campgrounds/${newCamp._id}`);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);

  req.flash('success', 'Successfully deleted campground!');
  res.redirect('/campgrounds');
};

module.exports = {
  showAll,
  createNewForm,
  showOne,
  editForm,
  updateOne,
  createNew,
  deleteOne,
};
