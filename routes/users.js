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

    //Esta ruta es la que permite verificar que el sistema esté arriba
    // y funcionando adecuadamente.


    router.use(function(req, res, next) {
        if (req.session.islogged) {
            console.log(req.session);
            next();
        } else {
            console.log("not Authorized");
            res.redirect('/users/login');
        }
    });

    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });

    return router;
};
