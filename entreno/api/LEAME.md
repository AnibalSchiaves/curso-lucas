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

## Referencias

https://carlosazaustre.es/como-crear-una-api-rest-usando-node-js