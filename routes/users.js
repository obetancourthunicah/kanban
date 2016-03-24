var express = require('express');
var router = express.Router();

module.exports = function(db) {
    router.route('/login')
        .get(function(req, res) {
            res.render('login',{});
        })
        .post(function(req, res) {
            res.send("Post Trying to login");
        });

    router.route('/signin')
        .get(function(req, res) {
            res.render('signup',{});
        })
        .post(function(req,res){

        });

    return router;
};
