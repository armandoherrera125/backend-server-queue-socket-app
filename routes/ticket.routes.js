import { Router } from "express";
import { ticketController } from "../controllers/ticket.controller.js";

class TicketRoute {
    constructor(){
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.get('/newticket', ticketController.getNewTicket);
        this.router.get('/ticketqueue', ticketController.getTicketQueue);
    }
}

export const ticketroute = new TicketRoute().router;