const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db('test').collection('contacts').find();
    result.toArray().then((users) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(users)
    }
)};

const getSingle = async (req, res) => {
    const userId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().db('test').collection('contacts').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(users[0])
    }
)};

module.exports = {
    getAll,
    getSingle
}