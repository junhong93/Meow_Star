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
    // commenter_name: req.body.commenter_name,
    // commments: req.body.comments
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
  console.log(req.body.commenter_name)
  console.log(req.body.comments)
  console.log(req.body.hidden_input)

  try {
    let postfinder = await Post.findById(req.body.hidden_input)
    console.log(postfinder)
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




module.exports = router;

  // router.post('/:id', async (req, res) => {
  //   const comments = new Post.findById(req.params.id)({
  //     commenter_name: req.body.commenter_name,
  //     commments: req.body.comments
  //   })
  //   try {
  //     const newCommennt = await comments.save();
  //     res.redirect(`posts/${req.params.id}`)
  //   } catch {
  //     res.render('posts/details', {
  //      comments: comments,
  //       errorMessage: 'Error Creating Post'
  //     })
  //   }
  // })




  // router.get('/comments', async (req, res) => {
  //   try {
  //     const comment = await Post.findById(req.params.id)
  //     res.render('posts/details', { comment: comment })
  //   } catch {
  //     res.redirect('/posts')
  //   }
  // })




  // router.get('/:id/comments', async (req, res) => {
  //   try {
  //     const comment = await Post.findById(req.params.id)
  //     res.render('posts/comments', { comment: comment })
  //   } catch {
  //     res.redirect('/posts')
  //   }
  // })

  // router.put("/:id", async (req, res) => {
  //   const post = new Post({
  //    commments: req.body.hidden_input
  //   })
  //   // console.log(req.body.posting)
  //   try {
  //     comments = await Post.findById(req.params.id)
  //     await comments.save();
  //     res.redirect(`/posts/${comments.id}`)
  //   } catch {
  //     if (comments == null) {
  //       res.redirect('/')
  //     }
  //     res.render('posts/comments', {
  //       comments: comments,
  //       errorMessage: 'Error Creating Post'
  //     })
  //   }
  // })






  // router.post('/newComment', async (req, res) => {
  //   console.log(req.body.id)
  //   try {
  //     let newComment = await CommentModel.findById(req.params.id)
  //     let comment_obj = {
  //       commments: req.body.comments
  //     }
  //     newComment.comments.push(comment_obj)
  //     let commentSave = await newComment.save()
  //   } catch (error) {
  //     console.log("error=" + error)
  //   }
  //   res.send("Thank you for submitting comments")
  // });


  // router.post('/newComment', async (req, res) => {
  //   // console.log(req.body.hidden_input)
  //   const comment = new Post({
  //     description: req.body.hidden_input
  //   })

  //   try {
  //     const newComment = await comment.save();
  //     // console.log(newComment)
  //     res.redirect(`/:id`)
  //   } catch {
  //     res.render('posts/details', {
  //       comments, comments,
  //       errorMessage: 'Error Creating comment'
  //     })
  //   }
  // })




  // // edit comment
  // router.get('/:id/edit', async (req, res) => {
  //   try {
  //     const comments = await Post.findById(req.params.id)
  //     res.render('posts/edit', { comments: comments })
  //   } catch {
  //     res.redirect('/posts/:id')
  //   }
  // })



  // // delete comment

  // router.delete('/:id', async (req, res) => {
  //   let comments
  //   try {
  //     comments = await Post.findById(req.params.id)
  //     await comments.remove()
  //     res.redirect('/posts')
  //   } catch {
  //     if (comments == null) {
  //       res.redirect('/')
  //     } else {
  //       res.redirect(`/posts/${comments.id}`)
  //     }
  //   }
  // })

