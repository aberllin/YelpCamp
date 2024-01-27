const Campground = require('../models/campground');
const cloudinary = require('cloudinary');
const mapboxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mapboxGeocoding({ accessToken: mapboxToken });

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
  const images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  const campToUpdate = await Campground.findById(id);

  campToUpdate.images.push(...images);
  Object.assign(campToUpdate, req.body.campground);

  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
      // Remove filename of the image if it presents in a deletedImages array
      await campToUpdate.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } },
      });
    }
  }
  await campToUpdate.save();
  req.flash('success', 'Successfully updated campground!');
  res.redirect(`/campgrounds/${campToUpdate._id}`);
};

const createNew = async (req, res) => {
  const files = req.files;
  const geoLocation = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  const newCamp = new Campground(req.body.campground);
  newCamp.images = files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  newCamp.author = req.user._id;
  newCamp.geometry = geoLocation.body.features[0].geometry;
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
