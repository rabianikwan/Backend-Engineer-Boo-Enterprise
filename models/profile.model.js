'use strict';
const mongoose = require('mongoose');

        // change  id increment
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

class User {
    constructor(total_users, name, description, mbti, enneagram, variant, tritype, socionics, sloan, psyche) {
        this.id = total_users;
        this.name = name;
        this.description = description;
        this.mbti = mbti;
        this.enneagram = enneagram;
        this.variant = variant;
        this.tritype = tritype;
        this.socionics = socionics;
        this.sloan = sloan;
        this.psyche = psyche;
        this.image = "https://soulverse.boo.world/images/1.png";
    }
}

module.exports = mongoose.models.users || mongoose.model('user', UserModel);