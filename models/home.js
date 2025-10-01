const fs = require('fs')
const path = require('path')
const homeDataPath = path.join(__dirname,'../', "data", "homes.json");

module.exports = class Home{
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  save() {
    this.id= Math.random().toString()
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findHome(homeId,callback){
    this.fetchAll((homes)=>{
      const homeFound = homes.find((home)=>home.id===homeId)
      callback(homeFound)
    })
  }
}