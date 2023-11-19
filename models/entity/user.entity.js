
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

module.exports = User;