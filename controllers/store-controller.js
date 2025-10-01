const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Home"
    })
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List"
    })
  );
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId
  Home.findHome(homeId,home=>{
    if (!home) {
      res.redirect('/homes')
    }
    else{
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
  Home.fetchAll((registeredHomes) =>
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourites"
    })
  );
};