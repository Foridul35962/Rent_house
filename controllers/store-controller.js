const Home = require("../models/home");
const User = require("../models/userCollection");

exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then((registeredHomes) => {
      res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "Home",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
      })
    })
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll()
    .then((registeredHomes) => {
      res.render("store/home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Homes List",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
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
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
      })
    }
  })
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user
  })
};

exports.getFavouriteList = (req, res, next) => {
  User.getFavourite(req.session.user._id)
    .then((favouriteHomeList) => {
      // jodi favouriteHomeList null hoy -> empty array
      if (!favouriteHomeList) {
        favouriteHomeList = [];
      }

      // safe mapping (null check)
      favouriteHomeList = favouriteHomeList
        .filter(fav => fav) // null/undefined remove kore
        .map(fav => fav.toString());

      Home.fetchAll()
        .then((registeredHome) => {
          const favouriteHome = registeredHome.filter((home) =>
            favouriteHomeList.includes(home._id.toString())
          );

          res.render("store/favourite-list", {
            favouriteHome: favouriteHome,
            pageTitle: "My Favourites",
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postFavourite = (req, res, next) => {
  const id = String(req.body._id)
  User.addFavourite(req.session.user._id, id).catch((err) => {
    console.log('favourite add failed :', err);
  }).finally(() => {
    res.redirect('/homes')
  })
}

exports.postFavouriteHomeDelete = (req, res, next) => {
  const _id = req.params.homeId
  User.deleteToFavourite(req.session.user._id, _id).catch((err)=>{
    console.log('home not deleted:', err);
  }).finally(()=>{
    res.redirect('/favourites')
  })
}
