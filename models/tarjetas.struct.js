module.exports = {
    tarjeta:function(){
        return {
            "titulo":"",
            "descripcion":"",
            "proyecto":{"codigo":"","nombre":""},
            "paso":"",
            "fechaCambio":0,
            "tipo":"",
            "responsable":{"codigo":"","nombre":""},
            "tareas":[],
            "bitacora":[]
        };
    },
    tarea: function(){
        return {
            "descripcion":"",
            "completado":false
        };
    },
    historia:function(){
        return {"fecha":Date.now(),
                "observacion":"",
                "tipo":"",
                "movimiento":"",
                "usuario":""};
    }
};
