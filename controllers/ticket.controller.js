import express from 'express';
import { getSocket } from '../socket/socket.js';
import { v4 as uuidv4 } from 'uuid';
import { getNextTicketAndAmount, ticketGenerator } from '../helpers/ticket-list-handler.js';

class TicketController {
    getNewTicket(  req = express.request, res = express.response   ){
        //todo tengo que generar una queue de tickets
        const io = getSocket();
        const ticketNumber = ticketGenerator();
        io.emit('new-ticket', {ticket: ticketNumber});
        res.status(200).json({
            ticket: ticketNumber
        });
    }

    getTicketQueue(req = express.request, res = express.response) {
        //todo deberia de tener un array de tickets para sacar uno de ahi y enviarlo
        const { nextTicket, totalTickets} = getNextTicketAndAmount();
        
        const io = getSocket();
        io.emit('get-ticket-queue',
             {
                ticket: nextTicket,
                totalTickets
             }
        );
        res.status(200).json(           {
                ticket: nextTicket,
                totalTickets
             });

    }
}

export const ticketController = new TicketController();