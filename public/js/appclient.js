$("#page_proyectList").on("pagecreate",page_proyectList_onload);

function page_proyectList_onload(e){
  cargarDocumentos();
}


function cargarDocumentos(){
  $.get(
    '/api/obtenerproyectos',
    {},
    function(data,successtxt,xhr){
      var htmlstr = "";
      data.map(function(doc, index){
        htmlstr += "<li>" + doc.nombre +"</li>";
      })
      var lst = $("#proyectsListView");
      lst.html(htmlstr);
      lst.listview("refresh");
      //console.log(data);
    },
    'json'
  );
}
