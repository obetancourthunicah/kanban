for(var i = 0; i < 1000 ; i++){
  var d = {
    "title" : "Titulo # " + (i+1),
    "random1": Math.trunc(Math.random() * 1000),
    "random2": Math.trunc(Math.random() * 1000),
    "random3": Math.trunc(Math.random() * 1000)
  };
  db.cards.insert(d);
} //9000, random1 <= 300; random4 >= 1000;
  //random1 = 100; random5 <> 200;

// Para encontrar todos los documentos donde el valor de random1 sea igual a
// 500
db.cards.find({"random1":500});

// Para encontrar todos los documentos donde el valor de random1 es igual a
// 500 y random2 es igual a 800
db.cards.find({"random1":500,"random2":8000});

// Para encontrar todos los documentos donde el valor de random1 sea menor a
// 100
db.cards.find({"random1":{"$lt":100}});

// Para encontrar todos los documentos donde el valor de random1 sea menor o
// igaul a 100
db.cards.find({"random1":{"$lte":100}});

// Para encontrar todos los documentos donde el valor de random1 sea mayor a
// 900
db.cards.find({"random1":{"$gt":900}});

// Para encontrar todos los documentos donde el valor de random1 sea mayor o
// igaul a 900
db.cards.find({"random1":{"$gte":900}});

// Para encontrar todos los documentos donde el valor de random1 no sea igual a
// 500
db.cards.find({"random1":{"$ne":500}});
