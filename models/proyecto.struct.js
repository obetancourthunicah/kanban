module.exports = {
    proyecto: function() {
        return {
            "nombre": "",
            "colaboradores": [],
            "estado": "",
            "pasos": [],
            "descripcion": "",
            "creador": {
                "codigo": "",
                "nombre": ""
            },
            "categoria": ""
        };
    },
    paso: function(){
        return {
            "codigo":0,
            "orden":0,
            "nombre":""
        };
    },
    colaborador: function(){
        return {
            "codigo":"",
            "nombre":"",
            "tipo":""
        };
    }
};
