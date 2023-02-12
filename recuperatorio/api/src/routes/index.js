/*var router = require("./users");*/
import router from "./users.js";

router.route("/").get(function(req, res) {
    res.send("Bienvenido a la api de usuarios");
});

export default router;