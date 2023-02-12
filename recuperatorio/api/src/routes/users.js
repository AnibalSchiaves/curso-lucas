import {findAll, findOne, findByEmail, findByDni, save, update, clear} from "../controllers/users.js";
import express from "express";

var router = express.Router();

router.route("/users")
    .get(findAll)
    .post(save)

router.route("/users/:id")
    .get(findOne)
    .delete(clear)
    .patch(update)

router.route("/users/byEmail/:email")
    .get(findByEmail)

router.route("/users/byDni/:dni")
    .get(findByDni)

export default router;
