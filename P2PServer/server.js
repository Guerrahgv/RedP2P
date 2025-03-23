const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;


let clients = [];

// Middlewares
app.use(cors());
app.use(bodyParser.json());


//ruta para registrar un cliente
app.post('/register', (req, res) => {
 
    const { clientId, downloadPath, sharedPath } = req.body;

    if (!clientId || !downloadPath || !sharedPath) {
        return res.status(400).send('Faltan datos. Asegúrate de incluir clientId, downloadPath y sharedPath.');
    }

    const existingClient = clients.find(client => client.clientId === clientId);
    
    if (existingClient) {
        let stateClient = updateStateClient(clientId);
        if (stateClient) {
            return res.status(200).send(`Cliente ${clientId} ya estaba registrado. Su estado ha sido actualizado.`);
        } else {
            return res.status(400).send('Hubo un problema al actualizar el estado del cliente.');
        }
    }
  
    clients.push({
        clientId,
        downloadPath,
        sharedPath,
        state: 'activo', 
        lastPing: Date.now() 
    });

    console.log(`Cliente registrado: ${clientId}`);

    res.status(200).send(`Cliente ${clientId} registrado correctamente.`);
});

// Ruta para obtener la lista de clientes
app.get('/clients', (req, res) => {
    res.status(200).json(clients);
});

// Ruta para que los clientes envíen un "ping"
app.post('/ping', (req, res) => {
    const { clientId } = req.body;

    if (!clientId) {
        return res.status(400).send('ID del cliente requerido.');
    }
    const stateclient =updateStateClient(clientId);
    if(stateclient){
        return res.status(200).send('Ping recibido');
    }

    res.status(404).send('Cliente no encontrado');
});

// Función para comprobar los clientes activos e inactivos
function checkClients() {
    const now = Date.now();
    const timeout = 10000; 

    clients.forEach(client => {
        // Si el cliente no ha enviado un ping dentro del timeout, lo marcamos como inactivo
        if (now - client.lastPing > timeout) {
            client.state = 'inactivo'; // El cliente se marca como inactivo
        }
    });

    console.log(`Clientes activos: ${clients.filter(client => client.state === 'activo').length}`);
    console.log(`Clientes inactivos: ${clients.filter(client => client.state === 'inactivo').length}`);
}


setInterval(checkClients, 10000);


function updateStateClient(clientId) {
    const client = clients.find(client => client.clientId === clientId);
    if (client) {
        client.state = 'activo';
        client.lastPing = Date.now();
        return true;
    }
    return false;
}


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
