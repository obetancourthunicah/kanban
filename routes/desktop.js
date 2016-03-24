var express = require('express');
var router = express.Router();
var validator = require('./validator.js');

module.exports = function(db) {
    router.get('/', function(req, res, next) {
        if(req.session.islogged){
            res.redirect('/dashboard');
        }else{
            res.render('index', {});
        }
    });

    router.use(function(req,res,next){
        res.locals.layout = 'layoutdesktop';
        res.locals.UserName = 'Some User';
        res.locals.stylesheets = [];
        res.locals.javascripts = [];
        next();
    });

    router.get('/dashboard',validator,function(req, res, next) {
        res.locals.stylesheets.push('/css/dashboard.css');
        res.locals.javascripts.push('/js/l/dashboard.js');
        res.render('dashboard', {});
    });

    return router;
};
