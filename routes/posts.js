var express = require('express');
var router = express.Router();

const Post = require('../models/post');



// all posting route
router.get('/', async (req, res) => {
  let my_data = await Post.find({});
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
  console.log(req.body.posting)
  try {
    const newPost = await post.save();
    res.redirect(`posts`)
  } catch {
    res.render('posts/new', {
      post: post,
      errorMessage: 'Error Creating Post'
    })
  }
})




// create comments

router.post('/newComments', async (req, res) => {

  try {
    let postfinder = await Post.findById(req.body.hidden_input)

    let comments_obj = {
      commenter_name: req.body.commenter_name,
      description: req.body.comments,
    }
    postfinder.comments.push(comments_obj) // put "mama" in contacts[] array
    let save = await postfinder.save()
  } catch (error) {
    console.log("error=" + error)
  }
  res.redirect('/posts/' + req.body.hidden_input)
})


// delete comments

// router.delete('/:id', async (req, res) => {
//   const commentDelete = await Post
//    .findByIdAndRemove(req.params.deleteId)
//    .then(() => 'Entry deleted');
 
//   res.json({ commentDelete });
//  });



//  router.post("/delete" , async function(req, res){
//    try{
//   let deletefinder = await Post.findById(req.body.deleteId)
//  },
//   deletefinder.comments.pop(comments_obj)
//   await deletefinder.save(comments_obj)
//   res.send("comment removed")

// })



module.exports = router;
