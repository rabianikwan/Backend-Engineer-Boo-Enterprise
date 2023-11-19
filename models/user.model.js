'use strict';
const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    description: { type: String },
    mbti: { type: String },
    enneagram: { type: String },
    variant: { type: String },
    tritype: { type: Number },
    socionics: { type: String },
    sloan: { type: String },
    psyche: { type: String },
    image: { type: String },
});

module.exports = mongoose.models.users || mongoose.model('user', UserModel);