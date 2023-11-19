'use strict';
const mongoose = require('mongoose');

const PostModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    }

});


module.exports = mongoose.models.posts || mongoose.model('post', PostModel);