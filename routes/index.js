var express = require('express');
var router = express.Router();
// var Comment = require('../models/comment')

/* GET home page. */
router.get('/', (req,res) => {
  res.render('index')
})

module.exports = router;