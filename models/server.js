const express = require("express");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PUERTO;
        this.usuariosPath = "/api/usuarios";

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
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