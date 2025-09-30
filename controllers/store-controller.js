const Home = require("../models/home");
const Favourite = require('../models/favourite')

exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then((registeredHomes) => {
      res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "Home"
      })
    })
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll()
    .then((registeredHomes) => {
      res.render("store/home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Homes List"
      })
    })
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId
  Home.findHome(homeId).then(([home])=>{
    if (!home) {
      res.redirect('/homes')
    }
    else {
      res.render("store/home-details", {
        pageTitle: "Homes Details",
        home:home[0]
      })
    }
  })
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings"
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite((favourite) => {
    Home.fetchAll()
      .then((registeredHomes) => {
        const favouriteHome = registeredHomes.filter((home) => favourite.includes(home.id))
        res.render("store/favourite-list", {
          favouriteHome: favouriteHome,
          pageTitle: "My Favourites"
        })
      })
  })
};

exports.postFavourite = (req, res, next) => {
  const id = req.body.id

  Favourite.addToFavourite(id, err => {
    if (err) {
      console.log('failed to add favourite.', err);
    }
    res.redirect('/homes')
  })
}

exports.postFavouriteHomeDelete = (req, res, next) => {
  const id = req.params.homeId
  Favourite.deleteToFavourite(id, err => {
    if (err) {
      console.log('home not deleted:', err);
    }
    res.redirect('/favourites')
  })
}
