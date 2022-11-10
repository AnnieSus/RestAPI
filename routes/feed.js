const express = require('express');

const feedcontroller = require('../controllers/feed');

const router = express.Router();

router.get('/posts',feedcontroller.getPosts);
router.post('/post',feedcontroller.createPost);

module.exports =router;