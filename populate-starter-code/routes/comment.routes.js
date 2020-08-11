const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

// ****************************************************************************************
// POST route - create a comment of a specific post
// ****************************************************************************************
router.post('/posts/:postId/comment', (req, res)=> {
    const {postId} = req.params;
    const {author, content} = req.body;

    User.findOne({username: author})
    .then(userFromDB => {
        user = userFromDB

        if(userFromDB == null){
          return User.create({username: author})
        }

    })
    .then( newUser =>{
        Post.findById(postId)
        .then(dbPost =>{
            let newComment;

            if( newUser){
                newComment = new Comment({author: newUser._id, content})
            }else{
                newComment = new Comment({author: user._id, content})
            }

            newComment
            .save()
            .then(dbComment => {
                dbPost.comments.push(dbComment._id);

                dbPost.save()
                .then( updatedPost => res.redirect(`/posts/${updatedPost}))
            })

        })
    })
    .catch(err => console.log(`Err while...BB: ${err}`))
})
// ... your code here

module.exports = router;
