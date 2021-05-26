const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },

    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "El password es obligatorio"],
    },

    img: {
        type: String,
    },

    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
    },

    estado: {
        type: Boolean,
        default: true,
    },

    google: {
        type: Boolean,
        default: false,
    },
});

//funcion para remover campos que no queramos que sean mostrados en el JSON
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
};

module.exports = model("Usuario", UsuarioSchema);