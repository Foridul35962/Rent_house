const Home = require('../models/home')

exports.getAddHome = (req, res, next) => {
  res.render('host/add-edit-home', { pageTitle: "Add Home", editing: false })
}

exports.getHostHome = (req, res, next) => {
  Home.fetchAll((registerHome) => {
    res.render('host/host-home-list', { pageTitle: "Edit Home", registerHome: registerHome })
  })
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.id
  const editing = req.query.editing === 'true'
  Home.findHome(homeId, homes => {
    if (!homes) {
      return res.redirect('/host/home-list')
    }
    res.render('host/add-edit-home', {
      pageTitle: "Edit Home",
      homes,
      editing
    })
  })
}

exports.postEditHome = (req, res, next) => {
  console.log('post Edit');
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description, id);
  home.save();
  res.redirect("/host/home-list");
}


exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description, id } = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl, description, id);
  home.save();

  res.render("host/submit-home", {
    pageTitle: "Home Added Successfully"
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.id
  Home.deleteHome(homeId, err => {
    if (err) {
      console.log('home not deleted:', err);
    }
    res.redirect('/host/home-list')
  })
}