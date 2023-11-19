
class User {
    constructor(id, name, description, mbti, enneagram, variant, tritype, socionics, sloan, psyche) {
        this.id = id;
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