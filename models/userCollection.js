const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/database");

module.exports = class User {
  constructor(firstName, lastName, email, password, userType, favourite) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userType = userType;
    this.favourite = [favourite]
  }

  save() {
    const db = getDb()
    return db.collection('users').insertOne(this)
  }


  static findUser = (email) => {
    const db = getDb()
    return db.collection('users').find({ email }).next()
  }

  static addFavourite = async (id, favouriteId) => {
    const db = getDb();
    // 1. Find user
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new Error("User not found");
    }
    
    // 2. Check if favourite already exists
    if (user.favourite && user.favourite.includes(favouriteId)) {
      throw new Error("Favourite already assist");
    }

    return db.collection("users").updateOne(
      { _id: new ObjectId(id) },  // filter (ekhane email diye user find hobe)
      { $push: { favourite: favouriteId } } // update (favourite array te push hobe)
    );
  }

  static async getFavourite(id) {
    const db = getDb();
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(id) },
      { projection: { favourite: 1, _id: 0 } }  // only favourite field return
    );
    return user ? user.favourite : [];
  }

  static deleteToFavourite = (id, homeId) => {
    const db = getDb()

    return db.collection("users").updateOne(
      { _id: new ObjectId(id) },                     // filter by email
      { $pull: { favourite: homeId } } // remove homeId from favourite array
    );
  }
  
  static deleteToFavouriteAllUser = (homeId) => {
    const db = getDb()

    return db.collection("users").updateMany(
      { },                     // filter for find all
      { $pull: { favourite: homeId } } // remove homeId from favourite array
    );
  }

}