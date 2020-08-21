const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commenter_name: {
        type: String,
        required: true,
    },
    description: String,
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
    comments: [commentSchema]
})

PostModel = mongoose.model('Posting', postSchema)
CommentModel = mongoose.model('Comments', commentSchema)
module.exports = mongoose.model('Post', postSchema)