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
    res.header("Access-Control-Allow-Origin","*");
    res.send(productos);
})

app.listen(3001, function() {
    console.log("Api de productos escuchando en puerto 3001");
});