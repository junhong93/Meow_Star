var express = require('express');
var router = express.Router();
const Post = require('../models/post');


// all posting route
router.get('/', async (req, res) => {
  let my_data = await Post.find({});
  // console.log("this are posts", my_data)
  res.render('posts/index', { my_data: my_data })
});


router.get('/new', (req, res) => {
  res.render('posts/new')
});


// id post route

router.get('/:id', async (req, res) => {
  let id_data = await Post.findById(req.params.id);
  res.render('posts/details', {
     id_data: id_data,
     postId: req.params.id
    })
})

// create post

router.post('/', async (req, res) => {
  const post = new Post({
    poster_name: req.body.posting,
    title: req.body.posting,
    file_url: req.body.file,
  })
  // console.log(req.body.posting)
  try {
    const newPost = await post.save();
    //     // res.redirect(`posts/${newPost.id}`)

    console.log(newPost)
    res.redirect(`posts`)
  } catch {
    res.render('posts/new', {
      post: post,
      errorMessage: 'Error Creating Post'
    })
  }
})




// create comments

router.post('/newComment', async (req, res) => {
  console.log(req.body.hidden_input)
  const comment = new Post({
    description: req.body.comments
  })

  try {
    const newComment = await comment.save();
    console.log(newComment)
    res.redirect(`/:id`)
  } catch {
    res.render('posts/details', {
      comment, comment,
      errorMessage: 'Error Creating comment'
    })
  }
})





module.exports = router;
