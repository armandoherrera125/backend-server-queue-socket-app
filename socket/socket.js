let io;
import { Server } from "socket.io";

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT']
        }
    });
    io.on('connection', (socket) => {
        console.log(socket.id);
        socket.on('disconnect', () => console.log('Client got disconnected'));
    });
    return io;
}

export const getSocket = () => {
    return io;
}