'use strict';

const express = require('express');
const app = express();
const Mongodb = require('./common/dbutil.common');
const port =  process.env.PORT || 3000;
const commentRoutes = require('./routes/comment.routes');
const profilRoutes = require('./routes/profile.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// set middlewares
let connectionDB = Mongodb.connect().then((res) => {}).catch((err) => {
    console.log("invalid connections")
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors());

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use(postRoutes);
app.use(profilRoutes);
app.use(userRoutes);
app.use(commentRoutes);

app.use((_req, res) => {
    res.status(404).send("Page not Found");
});


module.exports = app;
