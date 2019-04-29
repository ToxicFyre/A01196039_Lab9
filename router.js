/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const path = require('path');
const uuidv4 = require('uuid/v4');
const {ListPosts} = require('./model.js');

//error handler
function errorHandler(err, req, res, next) {
    let code = err.code;
    let message = err.message;

    return res.status(code).send(message);
};

router.use(errorHandler);

router.get('/blog-posts', (req, res, next) => {

    ListPosts.get()
        .then(posts => {
            res.status(200).json({
                message: "Successfully sent the list of posts",
                status: 200,
                posts: posts
            });
        }).catch(err => {
        err = new Error(`Internal server error.`);
        err.code = 500;
        return next(err);
    });
});

router.get('/blog-posts/:author', (req, res, next) => {

    if (!('author' in req.params)) {
        let err = new Error("Parameter not passed correctly");
        err.code = 406;
        return next(err);
    }

    let postAuthor = req.params.author;

    ListPosts.getAllOf("author", postAuthor)
        .then(posts => {
            res.status(200).json({
                message: "Successfully sent the post",
                status: 200,
                posts: posts
            });
        }).catch(err => {
        err = new Error("Author not found in the list");
        err.code = 404;
        return next(err);
    });
});

router.post('/blog-posts', (req, res, next) => {

    let requiredFields = ['title', 'content', 'author'];

    for (let i = 0; i < requiredFields.length; i++) {
        let currentField = requiredFields[i];

        if (!(currentField in req.body)) {
            let err = new Error(`Missing field ${currentField} in body.`);
            err.code = 406;
            return next(err);
        }
    }

    let objectToAdd = {
        uid: uuidv4(),
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: new Date()
    };

    ListPosts.post(objectToAdd)
        .then(posts => {
            res.status(201).json({
                message: "Successfully added the post",
                status: 201,
                posts: posts
            });
        }).catch(err => {
        err = new Error(err);
        return next(err);
    });
});


router.delete('/blog-posts/', (req, res, next) => {
    let err = new Error("Send uid to delete as parameter");
    err.code = 406;
    return next(err);
});

router.delete('/blog-posts/:uid', (req, res, next) => {

    let postUid = "postUid Error";

    if (!('uid' in req.params)) {
        let err = new Error("Parameter not passed correctly");
        err.code = 406;
        return next(err);
    }
    if (!('uid' in req.body)) {
        let err = new Error(`Missing field uid in body.`);
        err.code = 406;
        return next(err);
    }
    if (req.params.uid === req.body.uid)
        postUid = req.params.uid;
    else {
        let err = new Error(`uid passed in body must match uid passed in path vars`);
        err.code = 406;
        return next(err);
    }

    ListPosts.delete(postUid)
        .then(deletedpost => {
            res.status(200).json({
                message: `Post with uid:${postUid} deleted.`,
                status: 204,
                deletedpost: deletedpost
            });
        }).catch(err => {
        err = new Error(`Post uid not found.`);
        err.code = 400;
        return next(err);
    });
});

router.put('/blog-posts/:uid', (req, res, next) => {

    if (!('uid' in req.params)) {
        let err = new Error("Parameter not passed correctly");
        err.code = 406;
        return next(err);
    }

    let postUid = req.params.uid;

    ListPosts.put(postUid, req.body)
        .then(posts => {
            res.status(200).json({
                message: `Post successfully updated.`,
                status: 200,
                posts: posts
            });
        }).catch(err => {
        err = new Error(`Post uid not found.`);
        err.code = 400;
        return next(err);
    });
});

module.exports = router;