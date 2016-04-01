$("#page_proyectList").on("pagecreate",page_proyectList_onload);

$("#page_newUser").on("pagecreate",page_newUser_onload);

var _proyectos = [];
var _selectedProyectId = "";

function page_proyectList_onload(e){
  cargarDocumentos();
  onListItemClick();
}
function page_newUser_onload(e){
  $("#btnNewUser").on("click", function(e){
    var query={};
    $("form").find("input").each(function(i,obj){
      var ip = $(obj);
      if(ip.attr("name")==="txtEmail"){
        query.txtEmail = ip.val();
      }
      if(ip.attr("name")==="txtPswd"){
        query.txtPswd = ip.val();
      }
    });
    $.post(
      "/api/newuser",
      query,
      function(data,successtst,xhr){
        console.log(data);
      },
      "json"
    );
  });
}

function onListItemClick(){
  $("#proyectsListView").on("click","a",
    function(e){
      //e.preventDefault();
      //e.stopPropagation();
      var idClicked = $(this).data("id");
      _selectedProyectId = idClicked;
      getSelectedProyect();
    }
  );
}

function cargarDocumentos(){
  $.get(
    '/api/obtenerproyectos',
    {},
    function(data,successtxt,xhr){
      console.log(data);
      var htmlstr = "";
      _proyectos = data;
      data.map(function(doc, index){
        htmlstr += '<li><a data-id="'+ doc._id +'" href="#page_proyectDetail">' + doc.nombre +"</a></li>";
      })
      var lst = $("#proyectsListView");
      lst.html(htmlstr);
      lst.listview("refresh");
      //console.log(data);
    },
    'json'
  );
}

function getSelectedProyect(){
  _proyectos.map(
    function(proyect,index){
      if(proyect._id === _selectedProyectId){
        var htmlstr = "";
        htmlstr += "<h3>" + proyect.nombre + "</h3>";
        htmlstr += "<p>" + proyect.descricion+ "</p>";
        htmlstr += "<h4>Tareas</h4><ol>";
        proyect.tareas.map(function(tarea,it){
          htmlstr += "<li class=\"" + ((tarea.estado === "completo")? "complete\">":"\">" ) + tarea.nombre +"</li>";     ;
        });
        htmlstr += "</ol>";

        $("#proyectDetail").html(htmlstr);
      }
    }
  );
  _selectedProyectId;
}
