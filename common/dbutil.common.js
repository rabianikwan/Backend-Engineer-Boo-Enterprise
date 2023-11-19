'use strict';
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose= require("mongoose");


const connect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
        dbName: "testing-db"
    })
    return mongoUri
}

module.exports = {
    connect
}