const dotenv = require('dotenv');

dotenv.config();

const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI)
let database;

const initDb = (callback) => {
    if(database){
        console.log('Db is already initialized');
        return callback(null, database);
    } 
    client.connect()
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if(!database){
        throw error('Database not initialized')
    }
    return database;

};

module.exports = {
    initDb,
    getDatabase
}