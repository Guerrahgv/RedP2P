const socket = io('http://localhost:3000');
let clientId = null;

// Conectar cliente
document.getElementById('connectButton').addEventListener('click', () => {
    clientId = document.getElementById('clientId').value.trim();
    if (!clientId) {
        alert('Ingrese un ID de cliente.');
        return;
    }

    socket.emit('register', { clientId });
    alert(`Cliente ${clientId} conectado.`);
});

// Enviar archivo
document.getElementById('sendFileButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const receiverId = document.getElementById('receiverId').value.trim();

    if (!receiverId) {
        alert('Debe ingresar el ID del receptor.');
        return;
    }

    if (fileInput.files.length === 0) {
        alert('Seleccione un archivo.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
        socket.emit('sendFile', {
            sender: clientId,
            receiver: receiverId,
            fileName: file.name,
            fileData: reader.result
        });

        updateFileList(file.name, 'Enviado');
    };
});

// Recibir archivo
socket.on('receiveFile', ({ sender, fileName, fileData }) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([fileData]));
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    updateFileList(fileName, `Recibido de ${sender}`);
});

// Actualizar la lista de archivos
function updateFileList(fileName, status) {
    const fileList = document.getElementById('fileList');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${fileName}</td><td>${status}</td>`;
    fileList.appendChild(row);
}
