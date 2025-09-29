const db = require('../utils/database')

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    return db.execute(
      'INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)',
      [
        this.houseName ?? null,
        this.price ?? null,
        this.location ?? null,
        this.rating ?? null,
        this.photoUrl ?? null,
        this.description ?? null,
      ]
    );
  }



  static fetchAll() {
    return db.execute('SELECT * FROM homes')
  }

  static findHome(homeId) {
  }

  static deleteHome(homeId) {
  }
}