# Entreno Api

Api para aplicación de entrenamiento realizada con Express y Mongodb

## Prerequisitos

Instale MongoDB

```bash
sudo apt install mongodb-server
```

Chequeo de version

```bash
mongod --version
```
## Lección 1

Creamos el directorio api y nos posicionamos en el mismo

```bash
mkdir api
cd api
```

Inicializo el proyecto de la api indicando propiedades generales, el resultado es el archivo package.json

```bash
npm init
```

Edito package.json para agregar las dependencias del proyecto:

```json
"dependencies": {
 "mongoose": "~3.6.11",
 "express": "^4.7.1",
 "method-override": "^2.1.2",
 "body-parser": "^1.5.1"
}
```
Para descargar las dependencias, así como las dependencias de las dependencias, alojándolas en el directorio node_modules. Si el comando anterior indica que existen vulnerabilidades entonces ejecutar el siguiente comando:

```bash
npm install
```

Luego de instalar me indica problemas de vulnerabilidades, para chequear en detalle las mismas se ejecuta:

```bash
npm audit
```

Allí me indica los problemas de vulnerabilidades y me sugiere hacer: Run  npm install mongoose@6.0.8  to resolve 7 vulnerabilities

```bash
npm install mongoose@6.0.8
```

Vamos ahora a crear el archivo app.js con el siguiente código:

```js
var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Bienvenido a la api de entreno");
});

app.listen(3000, function() {
    console.log("Api de entreno corriendo en http://localhost:3000");
});
```

Para levantar la api ejecutamos:

```bash
nodejs app.js
```

Si ahora abrimos el navegador y ponemos la url http://localhost:3000 veremos el mensaje de bienvenida de la api.

## Lección 2

Vamos a crear un modelo usando mongoose que nos permitirá persistir los datos relacionados a ejercicios de la api de entrenamiento. Los datos serán almacenados en la base de datos mongodb que es una base de datos NoSQL orientada a documentos JSON.

En primer lugar creamos la carpeta model donde alojaremos todos los archivos de modelos

```bash
mkdir model
```

Dentro de la carpeta model creamos el archivo ejercicio.js con el siguiente código:

```js
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ejercicioSchema = new Schema({
    codigo: {type: String},
    nombre: {type: String},
    descripcion: {type: String}
});

module.exports = mongoose.model("ejercicio", ejercicioSchema);
```

Ahora vamos a implentar la conexión a la base de datos en el archivo app.js para lo cual agregamos en la línea 2:

```js
var mongoose = require("mongoose");
```

Y reestructuramos la parte del app.listen de la siguiente manera:

```js
mongoose.connect("mongodb://localhost/entreno", function(err, res) {
    if (err) {
        console.log(`Error conectando a la base de datos entreno. Err: ${err}`);
    }   
    app.listen(3000, function() {
        console.log("Api de entreno corriendo en http://localhost:3000");
    });
});
```

Al ejecutar la api con nodejs se me presentó un error de sintaxis en la línea 46 del archivo node_modules/mongodb/lib/cursor/abstract_cursor.js. Aparentemente hay alguna incompatibilidad con la versión 6 de mongoose y, quizás nuestro versión de node. Decidí entonces hacer un downgrade de la versión de mongoose quedando mis dependencias en package.json de la siguiente forma:

```js
"dependencies": {
    "body-parser": "^1.5.1",
    "express": "^4.7.1",
    "method-override": "^2.1.2",
    "mongoose": "^5.0.1"
}
```
Borré la carpeta node_modules y voví a ejecutar 

```bash
npm install
```

Con dicha versión, a pesar de tener vulnerabilidades, dejó de presentarse el error de sintaxis al ejecutar la api

A continuación crearemos los controladores que manejarán las peticiones que arriben a la api, para ello creamos la carpeta controller

```bash
mkdir controller
```

Y dentro de esta carpeta crearemos el archivo ejercicios.js con el siguiente código:

```js
var mongoose = require("mongoose");
var modelEjercicio = require("../model/ejercicio");

exports.findAll = function(req, res) {
    modelEjercicio.find(function(err, ejercicios) {
        if (err)
            res.send(500, err.message);
        console.log("Obteniendo ejercicios");
        res.status(200).jsonp(ejercicios);
    });
};

exports.findById = function(req, res) {
    modelEjercicio.findById(req.params.id, function(err, ejercicio) {
        if (err)
            res.send(500, err.message);
        console.log(`obteniendo ejercicio con id ${req.params.id}`);
        res.status(200).jsonp(ejercicio);
    });
};

var validate = (body) => {
    if (body.codigo==null || body.codigo=='') {
        return "Debe indicar un código";
    }
    if (body.nombre==null || body.nombre=='') {
        return "Debe indicar un nombre";
    }
}

exports.create = function(req, res) {
    
    var msg = validate(req.body);
    if (msg) {
        res.status(400).send(msg);
        return
    }
        
    var ejecicio = new modelEjercicio({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });

    ejecicio.save(function (err, ejercicio) {
        if (err)
            res.status(500).send(err.message);
        console.log("Creando ejercicio");
        res.status(200).jsonp(ejercicio);
    });
};
```

Como se observa hemos creado una función para recuperar todos los ejercicios, otra función para recuperar un ejercicio a partir de su id y, finalmente, una función para crear nuevos ejercicios. Para poder hacer uso de nuestras funciones de controller modificaremos el archivo app.js de la siguiente forma:

```bash
// Utilizar funcionalidades del Ecmascript 6
'use strict'

var express = require("express");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require("body-parser");
var ejerciciosController = require("./controller/ejercicios");

app.use(bodyParser.json());

var router = express.Router();

router.route("/ejercicios")
    .get(ejerciciosController.findAll)
    .post(ejerciciosController.create);
router.route("/ejercicios/:id")
    .get(ejerciciosController.findById);

app.use(router);

app.get("/", function(req, res) {
    res.send("Bienvenido a la api de entreno");
});

mongoose.connect("mongodb://localhost/entreno", function(err, res) {
    if (err) {
        console.log(`Error conectando a la base de datos entreno. Err: ${err}`);
    }   
    app.listen(3000, function() {
        console.log("Api de entreno corriendo en http://localhost:3000");
    });
});
```

Ahora, al levantar la api, podremos realizar las operaciones de POST a la url http://localhost:3000/ejercicios para crear nuevos ejercicios, y los GETs para recuperar todos los ejercicios y un ejercicio puntual a las urls http://localhost:3000/ejercicios y http://localhost:3000/ejercicios/:id respectivamente.

## Referencias

https://carlosazaustre.es/como-crear-una-api-rest-usando-node-js

https://medium.com/williambastidasblog/estructura-de-una-api-rest-con-nodejs-express-y-mongodb-cdd97637b18b