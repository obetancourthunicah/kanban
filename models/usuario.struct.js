module.exports = {
    usuario : function(){
        return {
            "correo":"",
            "nombreCompleto":"",
            "contrasena":"",
            "fechaIngreso":0,
            "fechaCambioContrasena":0,
            "intentosFallidos":0,
            "ultimasContrasenas":[],
            "estado":"ACT",
            "proyectos":[]
        };
    },
    proyecto : function(){
        return {"codigo":"","nombre":""};
    }
};
