const { response, request } = require("express");

const usuariosGet = (req, res = response) => {
    const params = req.query;
    res.json({
        msg: "Get API - controlador",
        params,
    });
};

const usuariosPost = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: "Post API - controlador",
        body,
    });
};

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: "Put API - controlador",
        id,
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
};