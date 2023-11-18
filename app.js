'use strict';

const express = require('express');
const app = express();
const Mongodb = require('./common/dbutil.common');
const port =  process.env.PORT || 3000;

// set middlewares
Mongodb.connect().then(() => {
    console.log("database has been connected...")
}).catch((err) => {
    console.log("invalid connections")
})

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());


// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);
