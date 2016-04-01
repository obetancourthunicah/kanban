var express = require('express');
var router = express.Router();
var validator = require('./validator.js');
var dummyData = require('../models/dummyData.js');
var Proyectos = require('../models/proyectos.model.js');
var Usuarios = require('../models/usuarios.model.js');
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
    /*router.use(function(req,res,next){
        if(req.session.logged){
            next();
        }else{
            res.status(401).json({"error":"No puede usar el api sin estar autorizado"});
        }
    });*/
    console.log(dummyData);
    router.get('/getappstate',validator,function(req,res,next){
        res.status(200).json(dummyData.getAppState());
    });

    router.get('/getcurrentproyect',validator,function(req,res,next){
        res.status(200).json(dummyData.getProyectData());
    });

    var proyectos = new Proyectos(db);
    router.get('/obtenerproyectos',function(req,res,next){
      proyectos.getAllProyects(
        function(err, proyectosDoc){
          if(err){
            console.log(err);
            res.status(500).json({"error":"No se pudo obtener los proyectos"});
          }else{
            res.status(200).json(proyectosDoc);
          }
        }
      );
    });
    var usuariosModel = new Usuarios(db);
    router.post('/newuser',function(req,res,next){
      var newUser = {"correo":req.body.txtEmail,
                     "password":req.body.txtPswd};
      usuariosModel.nuevoUsuario(newUser,
        function(err, id){
          if(err){
            res.status(500).json({"error":"No se pudo Guardar Usuario"});
          }else{
            //req.session.userid= id;
            res.status(200).json(id);
          }

        }
      );
    });
    return router;
};
