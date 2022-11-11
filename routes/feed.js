const express = require('express');
const { body } = require('express-validator/check');

const feedcontroller = require('../controllers/feed');

const router = express.Router();

router.get('/posts',feedcontroller.getPosts);
router.post('/post',[
    body('title')
    .trim()
    .isLength({min:5}),    
    body('content')                                                                                                     
    .trim()
    .isLength({min:5})
],
feedcontroller.createPost);

router.get('/post/:postId', feedcontroller.getPost);

module.exports =router;