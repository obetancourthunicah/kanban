var proyectosStruct = require('./proyecto.struct.js'),
    tarjetasStruct = require('./tarjetas.struct.js'),
    usuariosStruct = require('./usuario.struct.js'),
    ObjectID = require('mongodb').ObjectID,
    pryid = new ObjectID();

module.exports =  {
    getAppState : function() {
        return {
            'currentProyect': {
                _id: pryid
            },
            'proyects': [{
                _id: pryid,
                'nombre': 'Proyecto 1',
                'tarjetas': 5
            }, {
                _id: new ObjectID(),
                'nombre': 'Proyecto 2',
                'tarjetas': 6
            }, {
                _id: new ObjectID(),
                'nombre': 'Proyecto 3',
                'tarjetas': 7
            }]
        };
    },
    getProyectData : function() {
        return {
            "_id":pryid,
            "nombre": "Proyecto 1",
            "colaboradores": [{
                "codigo": new ObjectID(),
                "nombre": "Fulano de Tal",
                "tipo": "Editor",
                "iniciales": "FT"
            }, {
                "codigo": new ObjectID(),
                "nombre": "Menganito Yute",
                "tipo": "Editor",
                "iniciales": "MY"
            }, {
                "codigo": new ObjectID(),
                "nombre": "Carlos Villagran",
                "tipo": "Lector",
                "iniciales": "CV"
            }],
            "estado": "Activo",
            "pasos": [{
                "codigo": 1,
                "orden": 1,
                "nombre": "Product Backlog",
                "color":"30,88,235"
            }, {
                "codigo": 2,
                "orden": 2,
                "nombre": "Analisis",
                "color":"235,159,30"
            }, {
                "codigo": 3,
                "orden": 3,
                "nombre": "Diseño",
                "color":"25,164,52"
            }, {
                "codigo": 4,
                "orden": 4,
                "nombre": "Desarrollo",
                "color":"210,65,12"
            }],
            "descripcion": "Proyecto Dummy para los datos del Dashboard",
            "creador": {
                "codigo": new ObjectID(),
                "nombre": "Fulano de Tal"
            },
            "categoria": "Categoría",
            "tarjetasNumero": 0,
            "tarjetas": [{
                "_id": new ObjectID(),
                "titulo": "Requisito de Tarea 1",
                "descripcion": "Esto es un ejemplo de un requisito",
                "paso": "Product Backlog",
                "fechaCambio": Date.now(),
                "responsable": {
                    "codigo": ObjectID(),
                    "nombre": "Menganito Yute",
                    "inicales": "MY"
                },
                "tareas": [{
                    "descripcion": "Tarea del Requisito",
                    "completado": true
                }, {
                    "descripcion": "Tarea del Requisito 2",
                    "completado": false
                }],
                "bitacora": []
            }, {
                "_id":new ObjectID(),
                "titulo": "Requisito de Tarea 2",
                "descripcion": "Esto es un ejemplo de un requisito",
                "paso": "Desarrollo",
                "fechaCambio": Date.now(),
                "responsable": {
                    "codigo": ObjectID(),
                    "nombre": "Menganito Yute",
                    "inicales": "MY"
                },
                "tareas": [],
                "bitacora": []
            }]
        };
    }
};
