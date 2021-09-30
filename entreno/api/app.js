var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Bienvenido a la api de entreno");
});

app.listen(3000, function() {
    console.log("Api de entreno corriendo en http://localhost:3000");
});