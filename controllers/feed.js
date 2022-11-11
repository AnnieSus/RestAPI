const {validationResult} = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = (req,res,next) => {
    res.status(200).json({
        posts:[{
        _id:"1",
        title:"FirstPost", 
        content:"This is my first post", 
        imageUrl:"/images/olp.jpg",
        creator:{
            name:"Sus"
        },
        createdAt: new Date()
    }]
    });
};

exports.createPost = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, Incorrect Data');
        error.status = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/olp.jpg',
        creator:{name:'Sus'}
    });
    post.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:"Post saved successfully!",
            post:result
        });
    })
    .catch(err => {
        if(!err.statusCode)
        {
            err.statusCode =500;
        }
        next(err);
    });
    console.log(title,content);    
};

exports.getPost = (req,res,next) => {
    const postId = req.params.postId;
    Post.findById()
    .then(post => {
        if(!post){
            const error = new Error("Could not find post.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'Post fetched.', post:post });
    })
    .catch(err => {
        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        next(err);
    });
};