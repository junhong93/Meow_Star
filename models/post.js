const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commenter_name: {
        type: String,
        required: true,
    },
    description: String,
    comment_created: {
        type: Number,
        default: new Date().now
    }, 
})

const postSchema = new mongoose.Schema({
    poster_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    file_url: String,
    post_created: {
        type: Number,
        default: new Date().now
    },
    comments: [commentSchema]
})

PostModel = mongoose.model('Posting', postSchema)
module.exports = mongoose.model('Post', postSchema)