const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async(req = request, res = response) => {
    //pagineo
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
        total,
        usuarios,
    });
};

const usuariosPost = async(req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //verificar si el correo existe vea db-Varidators

    //Encriptar la contrasenya
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario,
    });
};

const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // Todo validae contra base de datos
    if (password) {
        //Encriptar la contrasenya
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: "Put API - controlador",
        usuario,
    });
};

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    const cambiarEstado = { estado: false };

    //Fisicamente borrar el dato
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, cambiarEstado);

    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
};