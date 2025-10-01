const fs = require('fs')
const path = require('path')
const favouriteDataPath = path.join(__dirname,'../', "data", "favouriteList.json");

module.exports = class Favourite{
    static getFavourite(callback){
        fs.readFile(favouriteDataPath,(err,data)=>{
            callback(!err? JSON.parse(data) : [])
        })
    }

    static addToFavourite(id, callback){
        this.getFavourite((favourite)=>{
            if (favourite.includes(id)) {
                callback('It already has');
            }else{
                favourite.push(id)
                fs.writeFile(favouriteDataPath,JSON.stringify(favourite),callback)
            }
        })
    }
}