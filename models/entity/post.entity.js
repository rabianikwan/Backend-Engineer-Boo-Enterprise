'use strict';
class PostCreate {
    constructor(title, content, author) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.created_at = Date.now();
        this.updated_at = Date.now();
    }
}

module.exports = PostCreate;