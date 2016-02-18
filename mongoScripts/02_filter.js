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
