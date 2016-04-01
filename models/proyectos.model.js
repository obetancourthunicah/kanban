var ObjectID = require("mongodb").ObjectID
  ;

function Proyectos(db){
  if(!(this instanceof Proyectos)){
    console.log("No fue instanciado");
    return new Proyectos(db);
  }
  this.proyectos = db.collection("proyectos");
};
Proyectos.prototype.getAllProyects = function(handler){
    this.proyectos.find({}).toArray(
      function(err, docs){
        if(err){
          console.log(err);
          handler(err, null);
        }else{
          handler(null, docs);
        }
      }
    );
};

module.exports = Proyectos;
