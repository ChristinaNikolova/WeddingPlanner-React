const { Schema, model, Types: { ObjectId } } = require('mongoose');
const { comment } = require('../utils/constants/model');

const commentSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [comment.TITLE_MIN_LEN, `Title should be at least ${comment.TITLE_MIN_LEN} characters long`],
        maxlength: [comment.TITLE_MAX_LEN, `Title should be maximal ${comment.TITLE_MAX_LEN} characters long`],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [comment.CONTENT_MIN_LEN, `Content should be at least ${comment.CONTENT_MIN_LEN} characters long`],
        maxlength: [comment.CONTENT_MAX_LEN, `Content should be maximal ${comment.CONTENT_MAX_LEN} characters long`],
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
},
    {
        timestamps: true,
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;