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
            "categoria": "",
            "tarjetasNumero":0,
            "tarjetas":[]
        };
    },
    paso: function(){
        return {
            "codigo":0,
            "orden":0,
            "nombre":"",
            "color":""
        };
    },
    colaborador: function(){
        return {
            "codigo":"",
            "nombre":"",
            "tipo":"",
            "iniciales":""
        };
    }
};
