const mongoose = require('mongoose')
const { MONGO_URI_DEV, MONGO_URI_PROD, MONGO_URI_TEST, NODE_ENV } = process.env

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const uriString = {
    production: MONGO_URI_PROD,
    development: MONGO_URI_DEV,
    test: MONGO_URI_TEST
}

mongoose
    .connect(uriString[NODE_ENV], mongooseOptions)
    .then((db) => console.log('DB is connected to:', db.connection.name))
    .catch((err) => console.error(err))
