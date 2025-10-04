const Home = require('../models/home')
const User = require('../models/userCollection')
const fs = require('fs')
const path = require('path')

exports.getAddHome = (req, res, next) => {
  res.render('host/add-edit-home', {
    pageTitle: "Add Home",
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user
  })
}

exports.getHostHome = (req, res, next) => {
  Home.fetchAll().then((registerHome) => {
    res.render('host/host-home-list', {
      pageTitle: "Edit Home", registerHome: registerHome,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user
      })
  })
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.id
  const editing = req.query.editing === 'true'
  Home.findHome(homeId).then((homes) => {
    if (!homes) {
      return res.redirect('/host/home-list')
    }
    res.render('host/add-edit-home', {
      pageTitle: 'Edit Home',
      homes,
      editing,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user
    })
  }).catch(err => {
    console.error('DB error in getEditHome:', err);
    next(err);
  })
}

exports.postEditHome = (req, res, next) => {
  const { _id, houseName, price, location, rating, UpdatePhotoUrl, description } = req.body;
  let photoUrl = UpdatePhotoUrl
  if (req.file) {
    const deleteFileUrl = path.join(__dirname, '../', 'public', photoUrl.replace(/^\//, ''));
    fs.unlink(deleteFileUrl, err=>{
      if (err) {
        console.log('Error while delete file',err);
      }
    })
    photoUrl = `/upload/${req.file.filename}`
  }
  const home = new Home(houseName, price, location, rating, photoUrl, description, _id);
  home.save()
    .then(()=>{
      res.redirect('/host/home-list')
    })
    .catch(err=>{
      console.error('DB error on edit save:', err);
      next(err);
    })
}


exports.postAddHome = (req, res, next) => {  
  if (!req.file) {
    console.log('No image provided');
    res.status(400).redirect('host/add-home')
  }
  const { houseName, price, location, rating, description, id } = req.body;
  const photoUrl = `/upload/${req.file.filename}`
  const home = new Home(houseName, price, location, rating, photoUrl, description, id);
  home.save();

  res.render("host/submit-home", {
    pageTitle: "Home Added Successfully",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user
  });
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.id
  await Home.findHome(homeId).then((home)=>{
    if (home.photoUrl) {
      const deleteFileUrl = path.join(__dirname, '../', 'public', home.photoUrl.replace(/^\//, ''));
      fs.unlink(deleteFileUrl, err=>{
        if (err) {
          console.log('Error while delete file',err);
        }
      })
    }
  })
  await Home.deleteHome(homeId).then(()=>{
    User.deleteToFavouriteAllUser(homeId).catch((err)=>{
      console.log('favourite not delete',err);
    })
  }).catch(err => {
    console.log('home not deleted:', err);
  })
  res.redirect('/host/home-list')
}