/* jshint esversion: 6 */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let blogSchema = mongoose.Schema({
    uid: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    publishDate: {type: Date, required: true}
});

let Posts = mongoose.model('Blog', blogSchema);

const ListPosts = {
    get: function () {
        return Posts.find()
            .then(posts => {
                return posts;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    getAllOf: function (field, value) {
        let query = {};
        query[field] = value;
        return Posts.find(query)
            .then(posts => {
                if (typeof posts !== 'undefined' && posts.length > 0) {
                    return posts;
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    post: function (newPost) {
        console.log(newPost);
        return Posts.create(newPost)
            .then(post => {
                return post;
            }).catch(err => {
                throw new Error(err);
            });
    },
    delete: function (id) {
        return Posts.findOneAndDelete({uid: id})
            .then(post => {
                return post;
            }).catch(err => {
                throw new Error(err);
            });
    },
    put: function (uid, body) {
        let query = {'uid' : uid};
        let newData = body;

        return Posts.findOneAndUpdate(query, newData, {upsert : true, new : true})
            .then(post => {
                return post;
            }).catch(err => {
                throw new Error(err);
            });
    }
};

module.exports = {ListPosts};