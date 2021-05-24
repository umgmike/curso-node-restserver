const { Router } = require("express");
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", usuariosGet);

router.post("/", usuariosPost);

router.put("/:id", usuariosPut);

module.exports = router;