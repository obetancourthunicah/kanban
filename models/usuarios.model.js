var usuarioStruct = require('./usuario.struct.js'),
    md5 = require('md5');
;

var UsuarioModel = function(db){
    if(!(this instanceof UsuarioModel)){
      console.log("NO fue llamado como instancia");
      return new UsuarioModel(db);
    }
    this.usuarioColl = db.collection('usuarios');
};

UsuarioModel.prototype.nuevoUsuario = function(data,handler){
  //se asume que data tiene correo y contrasena
  var newUser = usuarioStruct.usuario();
  newUser.fechaIngreso = Date.now();
  newUser.correo = data.correo;
  var saltPswd = (newUser.fechaIngreso%2)==0 ?
                  newUser.fechaIngreso.toString().substr(1,5)
                  + data.password
                  :data.password + newUser.fechaIngreso.toString().substr(1,5);
  newUser.contrasena = md5(saltPswd);

  this.usuarioColl.insertOne(newUser,function(err, rslt){
    if(err){
      console.log(err);
      handler(err, null);
    }else{
      handler(null, rslt.insertedId);
    }
  });
}

module.exports = UsuarioModel;
