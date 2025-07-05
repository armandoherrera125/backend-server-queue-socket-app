import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import { initSocket } from './socket/socket.js';
import { ticketroute } from './routes/ticket.routes.js';

class App {

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        initSocket(this.server);
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use('/api/v1/socketqueue', ticketroute);
    }
    listen(port){
        this.server.listen(port, ()=> console.log(`Listening in port ${port}`));
    }

}
const app = new App();
app.listen(process.env.PORT);