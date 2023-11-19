'use strict';
const mongoose = require('mongoose');

const CommentModel = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    post_id: {
        type: String,
    },
    author_id: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    },
    likes_users: {
        type: Array,
        default: []
    },
    pollings: {
        type: Object,
        default: {
            'mbti': "",
            'enneagram': "",
            'zodiac': "",
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.models.comments || mongoose.model('comment', CommentModel);