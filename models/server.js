const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PUERTO;
        this.usuariosPath = "/api/usuarios";

        //conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //directorio publicp
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.usuariosPath, require("../routes/user"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el Puerto:", this.port);
        });
    }
}

module.exports = Server;