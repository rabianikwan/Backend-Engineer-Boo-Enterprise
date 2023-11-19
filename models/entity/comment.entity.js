'use strict';

const listMbti = [
    "ISTJ", "ISFJ", "INFJ", "INTJ", 
    "ISTP", "ISFP", "INFP", "INTP", 
    "ESTP", "ESFP", "ENFP", "ENTP", 
    "ESTJ", "ESFJ", "ENFJ", "ENTJ", ""
];

const listZodiac = [
    "Aries", "Taurus", "Gemini", 
    "Cancer", "Leo", "Virgo", 
    "Libra", "Scorpio", "Sagittarius", 
    "Capricorn", "Aquarius", "Pisces", ""
]

const listEnneagram = [
    "1w2", "2w3", "3w2", "3w4", 
    "4w3", "4w5", "5w4", "5w6", 
    "6w5", "6w7", "7w6", "7w8", 
    "8w7", "8w9", "9w8", "9w1", ""
]

class Pollings {
    constructor(mbti, zodiac, enneagram) {
        if (!listMbti.includes(mbti)) {
            throw new Error("mbti is not in the list");
        } 
        if(listEnneagram.includes(this.enneagram)) {
            throw new Error("enneagram is not in the list");
        }

        if(listZodiac.includes(this.zodiac)) {
            throw new Error("zodiac is not in the list");
        }
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
        if (!listMbti.includes(mbti)) {
            throw new Error("mbti is not in the list");
        } 
        if(listEnneagram.includes(this.enneagram)) {
            throw new Error("enneagram is not in the list");
        }

        if(listZodiac.includes(this.zodiac)) {
            throw new Error("zodiac is not in the list");
        }
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