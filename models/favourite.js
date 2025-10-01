const { ObjectId } = require("mongodb")
const { getDb } = require("../utils/database")

module.exports = class Favourite{
    static getFavourite(){
        const db = getDb()
        return db.collection('favourite').find().toArray()
    }

    static addToFavourite(houseId){
        const db = getDb()
        return db.collection('favourite').insertOne({houseId: new ObjectId(houseId)})
    }

    static deleteToFavourite(id){
        const db = getDb()
        return db.collection('favourite').deleteOne({houseId: new ObjectId(String(id))})
    }

    static findOnFavourite(id){
        const db= getDb()
        return db.collection('favourite').find({houseId: new ObjectId(String(id))}).next()
    }
}