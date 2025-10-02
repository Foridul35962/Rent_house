const { getDb } = require("../utils/database");

module.exports = class User {
  constructor(firstName, lastName, email, password, userType) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userType = userType;
  }

  save() {
    const db = getDb()
    return db.collection('users').insertOne(this)
  }
}