const Home = require('../models/home')
const Favourite = require('../models/favourite')

exports.getAddHome = (req, res, next) => {
  res.render('host/add-edit-home', { pageTitle: "Add Home", editing: false, isLoggedIn: req.session.isLoggedIn })
}

exports.getHostHome = (req, res, next) => {
  Home.fetchAll().then((registerHome) => {
    res.render('host/host-home-list', { pageTitle: "Edit Home", registerHome: registerHome, isLoggedIn: req.session.isLoggedIn })
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
      isLoggedIn: req.session.isLoggedIn
    })
  }).catch(err => {
    console.error('DB error in getEditHome:', err);
    next(err);
  })
}

exports.postEditHome = (req, res, next) => {
  const { _id, houseName, price, location, rating, photoUrl, description } = req.body;
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
  const { houseName, price, location, rating, photoUrl, description, id } = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl, description, id);
  home.save();

  res.render("host/submit-home", {
    pageTitle: "Home Added Successfully",
    isLoggedIn: req.session.isLoggedIn
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.id
  Home.deleteHome(homeId).then(()=>{
    Favourite.deleteToFavourite(homeId).catch((err)=>{
      console.log('favourite not delete',err);
    })
  }).catch(err => {
    console.log('home not deleted:', err);
  })
  res.redirect('/host/home-list')
}