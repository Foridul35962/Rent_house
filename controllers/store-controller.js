const Home = require("../models/home");
const Favourite = require('../models/favourite')

exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then((registeredHomes) => {
      res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "Home",
        isLoggedIn: req.session.isLoggedIn
      })
    })
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll()
    .then((registeredHomes) => {
      res.render("store/home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Homes List",
        isLoggedIn: req.session.isLoggedIn
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
        home,
        isLoggedIn: req.session.isLoggedIn
      })
    }
  })
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    isLoggedIn: req.session.isLoggedIn
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite().then(favouriteHomeList => {
    favouriteHomeList = favouriteHomeList.map(fav => fav.houseId.toString())
    Home.fetchAll().then((registeredHome) => {
      const favouriteHome = registeredHome.filter((home) => {
        return favouriteHomeList.includes(home._id.toString())
      })
      res.render("store/favourite-list", {
        favouriteHome: favouriteHome,
        pageTitle: "My Favourites",
        isLoggedIn: req.session.isLoggedIn
      })
    })
  })
}

exports.postFavourite = (req, res, next) => {
  const id = String(req.body._id)
  Favourite.findOnFavourite(id).then((favouriteHome) => {
    if (favouriteHome) {
      console.log('favourite already added');
    } else {
      Favourite.addToFavourite(id)
    }
  }).catch((err) => {
    console.log('favourite add failed', err);
  }).finally(() => {
    res.redirect('/homes')
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
