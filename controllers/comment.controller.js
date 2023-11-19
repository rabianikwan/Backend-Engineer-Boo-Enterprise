'use strict';
const CommentModel = require('../models/comment.model');
const { ErrorServer, ErrorUserInput } = require('../common/error.common');

const fetchComments = async() => {
    try {
        const comments = await CommentModel.find();
        return comments;
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}

const getComment = async (id) => {
    try {
        const comment = await CommentModel.findById(id);
        return comment;
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}

// sorting by most recent and most likes
const sortRecent = async() => {
    try {
        const posts = await CommentModel.find().sort({ created_at: -1 });
        return posts;
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}

const sortBest = async() => {
    try {
        const comments = await CommentModel.find().sort({ likes: -1 });
        return comments;
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}


const giveComment = async (comment) => {
    try {
        const savedComment = await CommentModel.create(comment);
        return savedComment;
    } catch(error) {
        console.log(error)
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}

const givepollings = async (commentId, pollings) => {
        const update = await CommentModel.findByIdAndUpdate(commentId, {
            $set: {
                pollings: {
                    "mbti": pollings.mbti,
                    "zodiac": pollings.zodiac,
                    "enneagram": pollings.enneagram
                }
            }
        })
        return update;
}

const deleteComment = async (id) => {
    try {
        const comment = await getComment(id);
        if (!comment) {
            const errorRes = new ErrorUserInput("comment not found");
            return errorRes;
        }
        const deleted = await CommentModel.findByIdAndDelete(id);
        return deleted;
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}

const updateComment = async (id, comment) => {
    try {
        const updated = await CommentModel.findByIdAndUpdate(id, comment);
        return updated;
    } catch(error) {
        const errorRes = new ErrorServer("server error");
        return errorRes;
    }
}

module.exports = {
    sortRecent,
    sortBest,
    getComment,
    giveComment,
    givepollings,
    fetchComments,
    deleteComment,
    updateComment
}