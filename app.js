'use strict';

const express = require('express');
const app = express();
const Mongodb = require('./common/dbutil.common');
const port =  process.env.PORT || 3000;
const userRoutes = require('./routes/profile');

// set middlewares
Mongodb.connect().then(() => {
    console.log("database has been connected...")
}).catch((err) => {
    console.log("invalid connections")
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', userRoutes);

app.use((_req, res) => {
    res.status(404);
});


// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);
