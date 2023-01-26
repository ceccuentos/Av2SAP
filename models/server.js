const express = require('express');
const cors = require('cors');
require('dotenv').config()

class Server {
    constructor() {
        
        this.app = express();
        this.router = express.Router();
        this.port = process.env.PORTSERVER;

        // Routes Jompy
        //this.routeJompy_query = "/query"
        //this.routeJompy_loadquery = "/loadquery"

        //Middlewares
        this.middlewares();

        // Rutas
        //this.routes();
    }
    middlewares() {

        // Deprecado: Express viene con BodyParser!!
            // this.app.use(bodyParser.urlencoded({ extended: true }));  
            // this.app.use(bodyParser.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/api', this.router);
    }

    routes() {
        // Ruta vía Routers
        //this.router.use(this.routeJompy_query, require('../routes/query.js'))
        //this.router.use(this.routeJompy_loadquery, require('../routes/query.js'))
        //this.router.use('/status', require('../routes/status.js'))
        // TODO: Ruta carga archivo para FrontEnd??? 
    }

    listen() {
        const port = this.port || 8090;
        this.app.listen(port);
        console.log('AV2SAP is runnning at ' + port);
    }


}


module.exports = Server;