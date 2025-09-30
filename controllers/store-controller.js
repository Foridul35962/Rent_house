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
  Home.findHome(homeId).then((home) => {
    if (!home) {
      res.redirect('/homes')
    }
    else {
      res.render("store/home-details", {
        pageTitle: "Homes Details",
        home
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
  Favourite.getFavourite().then(favouriteHome => {
    res.render("store/favourite-list", {
      favouriteHome: favouriteHome,
      pageTitle: "My Favourites"
    })
  })
}

exports.postFavourite = (req, res, next) => {
  const id = req.body._id
  Home.findHome(id).then((home) => {
    Favourite.findOnFavourite(home._id).then((favouriteHome) => {
      if (favouriteHome) {
        console.log('favourite already added');
      } else {
        Favourite.addToFavourite(home).then(() => {
        }).catch((err) => {
          console.log('favourite add failed', err);
        })
      }
      res.redirect('/homes')
    })
  })
}

exports.postFavouriteHomeDelete = (req, res, next) => {
  const _id = req.params.homeId
  Favourite.deleteToFavourite(_id).then(() => {
    res.redirect('/favourites')
  }).catch((err) => {
    console.log('home not deleted:', err);
  })
}
