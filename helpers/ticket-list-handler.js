//todo tengo que leer la info
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import shortUUID from "short-uuid";

const ticketListPath = path.join('data/ticket-list.json');

const getListTickets = () => {
    const data = readFileSync(ticketListPath , {encoding: 'utf8'});
    return JSON.parse(data);
}
const getTicketFromQueueAndDelete = () => {
    if (getListTickets().length < 1) {
        return;
    }
    const data = getListTickets();
    const nextTicket = data.shift();
    writerDB(data);
    return nextTicket.ticket;
}
const writerDB = ( data ) => {
    writeFileSync(ticketListPath, JSON.stringify(data), {encoding: 'utf8'});
}

export const getNextTicketAndAmount = () => {
    const totalTickets = getListTickets();
    const nextTicket = getTicketFromQueueAndDelete();
    return {
        nextTicket: nextTicket,
        totalTickets: totalTickets.length
    };
}

export const ticketGenerator = () => {
    const data = getListTickets();
    const idTicket = shortUUID.generate();
    data[data.length] = { ticket: idTicket };
    console.log(` info: ${data}`);
    writerDB(data);
    //writeFileSync(ticketListPath, JSON.stringify(data), {encoding: 'utf8'});
    return idTicket;
}