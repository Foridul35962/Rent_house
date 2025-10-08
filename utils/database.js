const mongo = require('mongodb')

const mongoClient = mongo.MongoClient
const mongoUrl = process.env.mongoUrl


let _db

const mongoConnect = (callback)=>{
    mongoClient.connect(mongoUrl).then(client=>{
        _db=client.db('rent_house')
        callback()
    }).catch(err=>{
        console.log('mongodb is connected error: ',err);
    })
}

const getDb=()=>{
    if (!_db) {
        throw new Error('database is not connected')
    }
    return _db
}

module.exports = {mongoConnect, getDb}