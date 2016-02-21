var express = require('express');
var router = express.Router();
module.exports = function(db) {

    //HTTP STATUS CHEAT
    /*
        200 OK
        304 Use Cache
        400 Bad Request
        401 Not Authorized
        403 Forbidden
        404 Not Found
        408 Request Timeout
        501 Not Implemented
    */

    /* HTTP Methods  <---> CRUD
            get /  select
            post / insert
            put /  update
            delete / delete
    */

    //Public API
    router.post('/login', function(req,res){
        res.status(501).json({"error":"Not Implemented"});
    });




    //Private API
    router.use(function(req,res,next){
        if(req.session.logged){
            next();
        }else{
            res.status(401).json({"error":"No puede usar el api sin estar autorizado"});
        }
    });

    //from here on

    router.get('/', function(req, res, next) {
        res.status(501).json({"error":"Not Implemented"});
    });

    return router;
};
