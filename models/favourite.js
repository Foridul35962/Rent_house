const { ObjectId } = require("mongodb")
const { getDb } = require("../utils/database")

module.exports = class Favourite{
    static getFavourite(){
        const db = getDb()
        return db.collection('favourite').find().toArray()
    }

    static addToFavourite(home){
        const db = getDb()
        return db.collection('favourite').insertOne(home)
    }

    static deleteToFavourite(id){
        const db = getDb()
        return db.collection('favourite').deleteOne({_id: new ObjectId(String(id))})
    }

    static findOnFavourite(id){
        const db= getDb()
        return db.collection('favourite').find({_id: new ObjectId(String(id))}).next()
    }
}