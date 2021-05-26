const { Router } = require("express");
const { check } = require("express-validator");
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
} = require("../controllers/user.controller");
const {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
} = require("../helpers/db-Validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);

router.post(
    "/", [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check(
            "password",
            "El password debe de tener al menos 6 caracteres"
        ).isLength({ min: 6 }),
        check("correo", "El correo no es valido").isEmail(),
        check("correo").custom(emailExiste),
        //check("rol", "No es un rol permitido").isIn("ADMIN_ROLE", "USER_ROLE"),
        check("rol").custom(esRoleValido),
        validarCampos,
    ],
    usuariosPost
);

router.put(
    "/:id", [
        check("id", "No es un id válido").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        check("rol").custom(esRoleValido),
        validarCampos,
    ],
    usuariosPut
);

router.delete(
    "/:id", [
        check("id", "No es un id válido").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        validarCampos,
    ],
    usuariosDelete
);

module.exports = router;