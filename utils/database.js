const mongo = require('mongodb')

const mongoClient = mongo.MongoClient
const mongoUrl = "mongodb+srv://foridulislam35962_database:foridulislam35962_database@cluster35962.maduxse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster35962"


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