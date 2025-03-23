const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

const clients = {};

app.use(cors());
app.use(express.json());

// Manejar conexiones de clientes
io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('register', ({ clientId }) => {
        clients[clientId] = { socketId: socket.id };
        console.log(`✅ Cliente registrado: ${clientId}`);
    });

    socket.on('sendFile', ({ sender, receiver, fileName, fileData }) => {
        if (!clients[receiver]) {
            io.to(clients[sender].socketId).emit('errorMessage', `El receptor ${receiver} no está conectado.`);
            return;
        }

        io.to(clients[receiver].socketId).emit('receiveFile', { sender, fileName, fileData });
        console.log(`📤 Archivo "${fileName}" enviado de ${sender} a ${receiver}`);
    });

    socket.on('disconnect', () => {
        for (const client in clients) {
            if (clients[client].socketId === socket.id) {
                delete clients[client];
                console.log(`❌ Cliente desconectado: ${client}`);
                break;
            }
        }
    });
});

server.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
});
