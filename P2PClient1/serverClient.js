const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;  

// Servir los archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
