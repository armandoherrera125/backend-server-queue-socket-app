import express from 'express';
import { getSocket } from '../socket/socket.js';
import { getNextTicketAndAmount, getTotalTicket, ticketGenerator } from '../helpers/ticket-list-handler.js';

class TicketController {
    getNewTicket(  req = express.request, res = express.response   ){
        const io = getSocket();
        const ticketNumber = ticketGenerator();
        const totalTickets = getTotalTicket();
        io.emit('new-ticket', {ticket: ticketNumber});
        io.emit('get-total-tickets', totalTickets);
        res.status(200).json({
            ticket: ticketNumber
        });
    }

    getTicketQueue(req = express.request, res = express.response) {
        //todo: read the id the is coming from the fronted
        const {id} = req.params;
        const { nextTicket, totalTickets} = getNextTicketAndAmount();
        console.log(totalTickets);
        const io = getSocket();
        io.emit('ticket-list', {
            ticket: nextTicket,
            desk: id
        });
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