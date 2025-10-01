const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/database");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb()
    if (this._id) {// update
      return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))},{$set:{
        houseName : this.houseName,
        price : this.price,
        location : this.location,
        rating : this.rating,
        photoUrl : this.photoUrl,
        description : this.description
      }})
    }
    else{ // adding
      return db.collection('homes').insertOne(this)
    }
  }

  static fetchAll() {
    const db= getDb()
    return db.collection('homes').find().toArray()
  }

  static findHome(homeId) {    
    const db = getDb()
    return db.collection('homes').find({_id: new ObjectId(String(homeId))}).next()
  }

  static deleteHome(homeId) {
    const db = getDb()
    return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))})
  }
}