# Aplicaciones React de Ejemplo

## App Saludos

Creamos el proyecto utilizando el ejecutor de paquetes de npm que se llama npx. Esto nos permitira ejecutar el paquete create-react-app sin necesidad de descargarlo. De esta forma tendremos una plantilla de aplicación react básica

```bash
npx create-react-app saludos
```

Vamos a encontrarnos, dentro del proyecto, con la carpeta public donde se alojan los recursos que usaremos en la aplicación (imágenes, videos, audios, etc) y con la carpeta src donde están los fuentes de la aplicación. Obviamente la carpeta node_modules contendrá todas las dependencias definidas en el package.json. Si dicha carpeta no se encuentra podremos crearla ejecutando el comando:

```bash
npm install
```

Accedemos a la carpeta del proyecto e instalamos una librería que vamos a necesitar

```bash
cd saludos
npm install styled-components
```

Ahora podemos levantar la aplicación, para esto ejecutamos:

```bash
npm start
```

Al momento de correr la aplicación se pueden presentar algunos errores.
Un posible error es el mensaje "react-scripts.js: not found". Para solucionar este problemas abrimos el archivo package.json y reemplazamos a línea

```js
"start": "react-scripts.js start",
```

Por 

```js
"start": "./node_modules/react-scripts/bin/react-scripts.js start",
```

Otro posible error a presentarse puede ser el de "Module not found: Can't resolve 'web-vitals'". En este caso tendremos que instalar el modulo web-vitals para el desarrollo:

```bash
npm install web-vitals --save-dev
```

Ahora, vamos a abrir el fichero App.js que es nuestro archivo principal y vamos a borrar todo el contenido dentro del header a excepción del logo y vamos a agregar el siguiente código jsx:

```html
<h1>Prueba con React</h1>
<label>Ingrese su nombre</label><input type="text" ref={input}/>
<button onClick={saludar}>Saludar</button>
<div ref={saludo}></div>
<p></p>
<label>Ingrese su nombre para saludo instantáneo</label><input type="text" onChange={e => cambiar(e)}/>
<div>{saludoIns}</div>
```

Y luego, dentro de la función App, antes de realizar el return vamos a agregar el siguiente código javascript:

```js
const saludar = () => saludo.current.innerHTML = "Hola "+input.current.value;

let input = useRef(null);
let saludo = useRef(null);
let [saludoIns, setSaludoIns] = useState('');

const cambiar = (e) => {
  setSaludoIns('Hola '+e.target.value);
};
```

Previamente tuvimos que agregar la siguiente importación:

```js
import { useRef, useState } from 'react';
```

Ahora, al ejecutar la app con npm start podremos comprobar las funciones agregadas.
Si en el campo "Ingrese su nombre" ponemos un nombre cualquiera como Lucas y presionamos el botón "Saludar" comprobaremos que abajo del botón nos aparece el mensaje "Hola Lucas". En este caso el botón invoca a la funcion saludar definida en App.js que toma el valor del campo ingresado y se lo concatena a la cadena "Hola" para setaerlo en el innerHTML del div con la referencia al useRef saludo.
Ahora si en el campo "Ingrese su nombre para saludo instantáneo" ponemos Lucas se dispara el evento onChange en cada letra ingresada actualizado el useState saludoIns, lo que dispara automáticamente la actualización del contenido del div con la referencia al estado.

A continuación seguiremos con la creación de una nueva App para entender el uso de los router de react.

## App Productos

En el directorio ejemplo3 creamos la nueva app con el ejecutor npx:

```bash
npx create-react-app productos
```

Instalamos también web-vitals para que funcione nuestra app

```bash
cd productos
npm install web-vitals --save-dev
```

Probamos que el template por defecto funcione, haciendo:

```bash
npm start
```

Lo primero será crear la carpeta components donde alojaremos los componentes comunes de la aplicacion.

```bash
mkdir components
```

A continuación vamos a crear componentes que harán uso del modulo react-router así que tendremos que instalar las librerías react-router y react-router-dom

```bash
cd ..
npm install react-router
npm install react-router-dom
```

Ahora si podremos crear nuestro componente Menu.js. Pero previamente vamos a crear el archivo Menu.css con las definiciones de estilo para nuestro menú.

```css
ul {
    margin: 0;
    padding: 0;
    border-radius: 0.5em;
    background-color:goldenrod;
}
ul li {
    list-style: none;
    display: inline-block;
    padding: 1em;
    
}
ul li:hover {
    background-color: darkgoldenrod;
}
ul li a {
    text-decoration: none;
    color: black;
}
```

Ahora si creamos el archivo Menu.js con el código:

```js
import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    return (
        <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/productos'}>Productos</Link></li>
            <li><Link to={'/quienesomos'}>Quienes Somos</Link></li>
        </ul>
    );
};

export default Menu;
```

A continuación vamos a crear la carpeta pages donde crearemos los componentes que serán las páginas de la aplicación

```bash
cd src
mkdir pages
```

Dentro de la carpeta pages crearemos el archivo Home.js con el siguiente código:

```js
import React from 'react';
import Menu from '../components/Menu';
import logo from '../logo.svg';


const Home = () => {
    return (
        <>
            <Menu></Menu>
            <img src={logo} className="App-logo" alt="logo" />
        </>
    );
}

export default Home;
```

Luego, el archivo QuienesSomos.js con el siguiente código:

```js
import React from 'react';
import Menu from '../components/Menu';

const QuienesSomos = () => {
    return (
        <>
            <Menu></Menu>
            <h2>Quienes Somos</h2>
            <p>MAO Software es una empresa que se dedica al desarrollo de software de primera calidad</p>
        </>
    );
};

export default QuienesSomos;
```

También la página de productos a través del archivo Productos.js

```js
import React from 'react';
import Menu from '../components/Menu';

const Productos = () => {

    return (
        <>
            <Menu></Menu>
            <h2>Productos</h2>
            <p>Próximamente los productos de la empresa</p>
        </>
    )
};

export default Productos;
```

Crearemos ahora el archivo routes.js para definir las rutas de la aplicación. Agregamos el siguiente código:

```js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Productos from './pages/Productos';

const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/productos/:id" component={Productos} />
                <Route exact path="/quienesomos" component={QuienesSomos} />
            </Switch>
        </BrowserRouter>
    )
}
```

Vamos a modificar un poco el estilo de la aplicación, para esto modificamos el código css del archivo index.css para que quedé de la siguiente forma:

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 1em;
  text-align: center;
  background-color: #282c34;
  color: white;
  
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

Y editamos el archivo App.js para que quedé de la siguiente manera:

```js
import logo from './logo.svg';
import './App.css';

import Routes from './routes';

function App() {
  return (
    <>
      <h1>MAO Software y nuestros productos</h1>
      <Routes></Routes>
    </>
  );
}

export default App;
```

Si ahora ejecutamos nuestra aplicación con npm start podemos verla en funcionamiento y corroborar como va cambiando su contenido en función de la opción de menú que elijamos.

El próximo paso será crear una api que nos provea de la información de los distintos productos de la empresa. Para ello vamos a recurrir a express.js

Primero nos dirigimos a la raiz del directorio ejemplo3, para eso retrocedemos dos niveles ya que estamos parados en el directorio src de la app de react que se llama productos:

```bash
cd ../..
```

Creamos el directorio donde alojaremos la api y nos paramos en el:

```bash
mkdir productos-api
cd productos-api
```

Inicializamos nuestro package.json a través de npm, nos pedirá los datos básicos de la api.

```bash
npm init
```

Luego instalamos la dependencia de express:

```bash
npm install express@4.17.1
```

Ahora creamos el archivo index.js con el siguiente código:

```js
var Express = require("express");

var app = new Express();

app.get("/productos", function(req, res) {
    var producto1 = {
        "nombre":"Desarrollos a Medida",
        "descripcion":"Desarrollamos software a medida de sus necesidades"
    };
    var producto2 = {
        "nombre":"Mantenemos tu sitio",
        "descripcion":"Realizamos mejoras y mantenimientos de sitios que tengas en producción"
    };
    var producto3 = {
        "nombre":"Desarrollo web",
        "descripcion":"Nos especializamos en el desarrollo de aplicaciones web"
    };
    var productos = [producto1, producto2, producto3];
    res.header("Content-type","application/json");
    res.send(productos);
})

app.listen(3001, function() {
    console.log("Api de productos escuchando en puerto 3001");
});
```

Ejecutamos el archivo index.js para que levante la api:

```bash
node index.js
```

Ahora volvemos a nuestra app de React. Vamos a invocar a la api de productos en nuestro componente Productos.js, para ello modificamos su código para que quede de la siguiente manera:

```js
import React from 'react';
import { useState } from 'react';
import Menu from '../components/Menu';
import './Productos.css';

const Productos = () => {
    const [arrayProductos, setProductos] = useState([]);
    useEffect(
        () => {
            fetch("http://localhost:3001/productos")
                .then(res => res.json())
                .then(data => setProductos(data));
        },[]
    ); //Debemos usar useEffect para que el fetch no haga que la aplicación entre en loop
    return (
        <>
            <Menu></Menu>
            <h2>Productos</h2>
            <ul className="productos">
                {arrayProductos.length==0?
                <li>Cargando</li>:
                arrayProductos.map(function(p, index) {
                    return (
                        <li key={index}>
                            <h3>{p.nombre}</h3>
                            <p>{p.descripcion}</p>
                        </li>
                    )
                })
                }
            </ul>
        </>
    )
};

export default Productos;
```

Tambien creamos el archivo Productos.css para retocar el estilo:

```cs
.productos {
    background-color: transparent;
}

.productos li {
    display: block;
    border: 3px #61dafb solid;
    border-radius: 1em;
}

.productos li:hover {
    background-color: transparent;
}
```

Si volvemos a ejecutar la aplicación veremos que la página de productos ahora nos mostrará la información de los 3 productos que nos devuelve la api creada previamente.

Ahora, vamos a modificar nuestra llamada a la api para utilizar Axios, que es una librería que simplifica las llamadas a apis. Para esto, en primer lugar, vamos a instalarla:

```bash
npm install axios
```

Luego, vamos a retocar nuestro archivo Productos.js haciendo algunas modificaciones. Agregamos el import a axios y reemplazamos el fetch por el método get de axios:

```js
import axios from 'axios';

...

axios.get("http://localhost:3001/productos")
        .then(res => setProductos(res.data));
```

Si volvemos a ajecutar la aplicación comprobaremos que la página de productos seguirá mostrando correctamente los productos que devuelve la api


## Referencias
https://www.udemy.com/course/react-js-curso/

https://www.freecodecamp.org/espanol/news/npm-vs-npx-cual-es-la-diferencia/

https://stackoverflow.com/questions/39959900/npm-start-error-with-create-react-app

https://stackoverflow.com/questions/65396568/react-js-npm-start-shows-failed-to-compile-web-vitals

https://thinkster.io/tutorials/iterating-and-rendering-loops-in-react