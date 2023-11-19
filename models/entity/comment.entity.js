'use strict';

class Pollings {
    constructor(mbti, zodiac, enneagram) {
        this.mbti = mbti;
        this.zodiac = zodiac;
        this.enneagram = enneagram;
    }
}

class CommentCreate {
    constructor(title, description, pollings ,post_id, author_id) {
        this.title = title;
        this.description = description;
        this.post_id = post_id;
        this.author_id = author_id;
        const mbti  = pollings.mbti;
        const zodiac = pollings.zodiac;
        const enneagram = pollings.enneagram;
        this.pollings = { mbti: mbti, zodiac: zodiac, enneagram: enneagram };
        this.likes_users = [];
        this.likes=0;
        this.created_at = Date.now();
        this.updated_at = Date.now();
    }
}

module.exports = {
    CommentCreate,
    Pollings
};