$(document).ready(function(){
    "strict only";
    var _proyectStore = {},
        _appData = {},
        sidebar = $("#sidebar"),
        sidebarRight = $(".sidebarRight"),
        sidebarRightPry = $(".sidebarRightProyect"),
        proyectTitle = $(".proyectTitle"),
        closeBtn = $(".close"),
        closeBtnPry = $(".closeProyect"),
        btnAddTarjeta = $("#btnAddTarjeta"),
        addNewTarjeta = $("#addNewTarjeta"),
        btnAddNewProyect = $('#addNewProyect'),
        processContainer = $("#prcContainer"),
        tarjetas_color = ["89,185,157","0,113,49","140,134,46","255,203,0","244,100,64","64,79,244"];

    //utilities
    function setSideBar(){
        var buffer =[];
        _appData.proyects.forEach(function(proyect,i){
            buffer.push('<li><a');
            if(proyect._id === _appData.currentProyect._id){
                buffer.push(' class="active" ');
            }
            buffer.push('>');
            buffer.push(proyect.nombre);
            buffer.push('</a></li>');
        });
        buffer.push('<li><a id="addProyect"><span class="glyphicon glyphicon-plus"></span> Nuevo Proyecto</a><li>');
        sidebar.html(buffer.join(''));
    }

    function setCurrentProyect(){
        var buffer = [],
            data = _proyectStore,
            cols = Math.floor(12 / data.pasos.length);
        proyectTitle.html(data.nombre);
        data.pasos.forEach(function(paso,i){
            buffer.push('<div class="col-sm-');
            buffer.push(cols);
            buffer.push(' prc text-center" data-id="');
            buffer.push(paso.codigo);
            buffer.push('">');
            buffer.push('<div class="title">');
            buffer.push(paso.nombre);
            buffer.push('</div>');

            data.tarjetas.filter(function(tarjeta){
                        return tarjeta.paso === paso.nombre;
                    }).forEach(function(tarjeta,k){
                        buffer.push('<div draggable="true" class="tarjeta" style="border-color: rgb(');
                        buffer.push(paso.color);
                        buffer.push(');');
                        buffer.push(' background-color:rgba(');
                        buffer.push(paso.color);
                        buffer.push(',.05)"');
                        buffer.push(' data-id="');
                        buffer.push(tarjeta._id);
                        buffer.push('">');
                        buffer.push('<div class="enc">');
                        buffer.push(tarjeta.titulo);
                        buffer.push('</div>');
                        buffer.push('<div class="detail">');
                        buffer.push(tarjeta.descripcion);
                        buffer.push('</div>');

                        buffer.push('<ul class="tasks">');
                            tarjeta.tareas.forEach(function(tarea, j){
                                buffer.push('<li');
                                if(tarea.completado){
                                    buffer.push(' class="complete" ');
                                }else{
                                    buffer.push(' data-index="' + j + '" data-id="'+ tarjeta._id + '" class="nocomplete" ');
                                }
                                buffer.push('>');
                                buffer.push(tarea.descripcion);
                                buffer.push('</li>');
                            });
                        buffer.push('<li class="editable" data-id="'+tarjeta._id+'" contenteditable="true">Nueva Tarea</li></ul>');

                        buffer.push('<div class="btn-group pull-right" role="group"><button class="btn btn-default">');
                        buffer.push(tarjeta.responsable.inicales);
                        buffer.push('</button><button class="btn btn-default"><span class="glyphicon glyphicon-cog"></span></button><button class="btn btn-default"><span class="glyphicon glyphicon-trash"></span></button></div></div>');
                    });
            buffer.push('</div>');
        });

        processContainer.html(buffer.join(''));
    }

    function agregarTareaATarjeta(tarjetaId, tarea){
        _proyectStore.tarjetas.forEach(function(tarjeta){
            if(tarjeta._id === tarjetaId){
                tarjeta.tareas.push({
                    "descripcion": tarea,
                    "completado": false
                });
            }
        });
        sessionStorage.proyectStore = JSON.stringify(_proyectStore);
        setCurrentProyect();
    }

    function agregarProyecto(proyectData,proyectDetail){
        _appData.proyects.push(proyectData);
        _appData.currentProyect._id=proyectData._id;
        _proyectStore=proyectDetail;
        sessionStorage.appData = JSON.stringify(_appData);
        sessionStorage.proyectStore = JSON.stringify(_proyectStore);
        closeBtnPry.trigger("click");
        setSideBar();
        setCurrentProyect();
    }

    function setearCompletoTarea(tarjetaId, index){

        _proyectStore.tarjetas.forEach(function(tarjeta){
            if(tarjeta._id==tarjetaId){
                tarjeta.tareas[index].completado = true;
            }
        });
        sessionStorage.proyectStore = JSON.stringify(_proyectStore);
        setCurrentProyect();
    }

    function moverTarjetaAProceso(tarjetaId, PasoId){
        //use api
        //set store
        var pasos = _proyectStore.pasos.filter(function(paso){
            return paso.codigo == PasoId;
        });
        if(pasos.length){
            _proyectStore.tarjetas.forEach(function(tarjeta,i){
                if(tarjeta._id === tarjetaId){
                    tarjeta.paso = pasos[0].nombre;
                }
            });
        }
        //enviar a api el cambio;
        sessionStorage.proyectStore = JSON.stringify(_proyectStore);
        setCurrentProyect();
    }

    function agregarTarjeta(){
        var nuevaTarjeta = {
            "_id":"notSaved" + Date.now(),
            "titulo": $("#txtTitulo").val(),
            "descripcion": $("#txtDescripcion").val(),
            "paso": _proyectStore.pasos[0].nombre,
            "fechaCambio": Date.now(),
            "responsable": {
                "codigo": "",
                "nombre": "Orlando J Betanourth",
                "inicales": "OB"
            },
            "tareas": [],
            "bitacora": []
        };
        _proyectStore.tarjetas.push(nuevaTarjeta);
        sessionStorage.proyectStore=JSON.stringify(_proyectStore);
         $("#txtTitulo").val("");
         $("#txtDescripcion").val("");
        setCurrentProyect();

    }

    //Check if data is in local storage
    if(sessionStorage.proyectStore){
        _proyectStore = JSON.parse(sessionStorage.proyectStore);
        setCurrentProyect();
    }
    if(sessionStorage.appData){
        _appData = JSON.parse(sessionStorage.appData);
        setSideBar();
    }

    //Getting data from api
    $.get('/api/getappstate/',{},function(data,succtxt,xhr){
        _appData = data;
        sessionStorage.appData = JSON.stringify(data);
        setSideBar();
        //generating navs;
    },'json').fail(function(xhr,errtxt,data){
        console.log(xhr);
    });

    $.get('/api/getcurrentproyect/',{},function(data,succtxt,xhr){
        _proyectStore = data;
        sessionStorage.proyectStore = JSON.stringify(data);
        setCurrentProyect();
        //generating navs;
    },'json').fail(function(xhr,errtxt,data){
        console.log(xhr);
    });

    //functions
    //Drag and Drop Functions
    processContainer.on('dragstart','.tarjeta',function(ev){
        processContainer.addClass('dragging');
        ev.originalEvent.dataTransfer.setData('tjid',$(this).data('id'));
    });
    processContainer.on('dragenter','.prc',function(ev){
        $(this).addClass("dragged");
    });
    processContainer.on('dragover','.prc',function(ev){
        ev.preventDefault();
    });
    processContainer.on('dragleave','.prc',function(ev){
        $(this).removeClass("dragged");
    });
    processContainer.on('drop','.prc',function(ev){
        ev.preventDefault();
        processContainer.removeClass('dragging');
        moverTarjetaAProceso(ev.originalEvent.dataTransfer.getData('tjid'),$(this).data('id'));
    });

    sidebar.on("click","#addProyect",function(e){
        e.preventDefault();
        e.stopPropagation();
        sidebarRightPry.removeClass("hide");
    });

    btnAddNewProyect.on("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        var proyect = {"_id":"new_" + Date.now(),"tarjetas":0};
        var proyectDetail = {"_id":proyect._id, "colaboradores":[],"estado":"Activo","pasos":[],"tarjetas":[], "categoria":"Categoria", "tarjetasNumero":0};

        // {
        //     _id: pryid,
        //     'nombre': 'Proyecto 1',
        //     'tarjetas': 5
        // }

        sidebarRightPry.find('input[type="text"]').each(function(index){
            //console.log(index, this);
            var t = $(this);
            switch (index) {
                case 0:
                    proyect.nombre=t.val();
                    proyectDetail.nombre = proyect.nombre;
                    break;
                default:
                    if(t.val()!==""){
                        proyectDetail.pasos.push({
                            "codigo": index,
                            "orden": index,
                            "nombre": t.val(),
                            "color": tarjetas_color[index]
                        });
                    }
                    break;
            }
            t.val("");
        });

        agregarProyecto(proyect,proyectDetail);

    });

    closeBtn.on('click',function(e){
        sidebarRight.addClass("hide");
    });

    closeBtnPry.on('click',function(e){
        sidebarRightPry.addClass("hide");
    });

    btnAddTarjeta.on('click',function(e){
        sidebarRight.removeClass("hide");
    });

    //Add Task functiones
    processContainer.on('click','.editable',function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        if($(this).html()==="Nueva Tarea"){
            $(this).html("");
        }else{
            $(this).select();
        }
    });
    addNewTarjeta.on('click',function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        agregarTarjeta();
        closeBtn.trigger('click');
    });

    processContainer.on('keypress','.editable',function(ev){
        if(ev.charCode === 13){
            ev.preventDefault();
            ev.stopPropagation();
            //agregarTareaATarjeta($(this).data('id'),$(this).html());
            $(this).trigger('blur');
        }
    });

    processContainer.on('blur','.editable',function(ev){

        if($(this).html()==="" || $(this).html()==="Nueva Tarea"){
            $(this).html("Nueva Tarea");
        }else{
            agregarTareaATarjeta($(this).data('id'),$(this).html());
        }
    });


    processContainer.on('dblclick','.nocomplete',function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        setearCompletoTarea($(this).data('id'), $(this).data('index'));
    });


});
