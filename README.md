# Red P2P con Servidor Central para Registro de Clientes

###

## 🌍 Objetivo General
Diseñar una red **Peer-to-Peer (P2P)** donde:
- Los **clientes se conectan entre sí directamente** para compartir archivos.
- Un **servidor central solo registra** a los clientes y gestiona la lista de nodos conectados.
- La **transferencia de archivos es 100% entre clientes**, sin pasar por el servidor.

---

# 🖥️ Instalación de Dependencias

Para ejecutar este proyecto en tu entorno local, sigue los pasos a continuación POR CADA CARPETA:

```bash
npm install

```

## 🔌 1. Servidor Central (Servidor de Registro)
### Propósito:
Actúa como una libreta de direcciones para registrar y consultar clientes conectados.

### Funcionalidad Clave:
- ✅ **Registro de Clientes:** Guarda ID y dirección IP al conectarse.
- 🗂️ **Lista de Clientes Activos:** Retorna la lista completa de clientes conectados.

### Rutas:
- **`/register`**: Registra cliente con su ID/IP.
- **`/clients`**: Devuelve lista de clientes activos.

> ❌ **No gestiona archivos ni los almacena.**

---

## 💻 2. Cliente (Cliente P2P)
### Propósito:
Intercambiar archivos con otros clientes directamente.

### Funciones Principales:
- ⚙️ **Configuración de Carpetas**:
  - Carpeta para compartir archivos.
  - Carpeta de descargas.

- 📂 **Escaneo de Archivos Locales:**
  - Lista los archivos disponibles para compartir.

- 📝 **Registro en el Servidor:**
  - Envía su ID/IP al servidor central al iniciar.

- 📋 **Descarga desde otros Clientes:**
  - Consulta lista de clientes.
  - Selecciona uno y obtiene su lista de archivos.
  - Solicita descarga directa (sin pasar por el servidor).

- 🖥️ **UI Dividida:**
  - Archivos descargados.
  - Archivos compartidos con info del cliente emisor.

- ⚡ **Transferencia Directa:**
  - Enlace directo entre clientes para enviar archivos.

- 🔄 **Actualización Dinámica de Archivos:**
  - Al agregar/eliminar archivos en la carpeta compartida, se actualiza localmente.

- ❌ **Manejo de Desconexiones:**
  - El servidor elimina a clientes desconectados.

---

## ⚙️ 3. Funcionamiento General
1. ▶️ **Servidor se inicia:**
   - Escucha conexiones entrantes para registrar clientes.

2. ▶️ **Cliente se inicia:**
   - Configura carpetas.
   - Escanea archivos.
   - Se registra en el servidor.
   - Consulta clientes activos.

3. ↔️ **Interacción entre Clientes:**
   - Un cliente A ve la lista de archivos de cliente B.
   - Solicita un archivo y lo descarga directamente.

4. 🔄 **Actualización de Archivos:**
   - Al modificar archivos compartidos, se reflejan en la siguiente consulta entre pares.

---

## ⚠️ Consideraciones Importantes
### 🔐 Seguridad:
- Autenticación básica para registrar clientes.
- Cifrado durante transferencia de archivos.

### 📈 Escalabilidad:
- Balanceo de carga con múltiples servidores de registro.

### ❌ Manejo de Errores:
- Detección y eliminación de clientes desconectados.
- Manejadores para intentos fallidos de descarga.

### 📲 Interfaz de Usuario:
- Lista de archivos compartidos.
- Clientes disponibles para conectarse.
- Historial de descargas.

---

## 🔄 Resumen Visual
| Elemento | Rol |
|---------|-----|
| **Servidor Central** | Registra clientes, mantiene lista activa |
| **Cliente P2P** | Comparte y descarga archivos directamente |
| **Transferencia** | Directa entre clientes, sin servidor |
| **Gestión de Archivos** | Se actualiza localmente en cada cliente |

---

## ✨ Resultado Esperado
Una red simple, funcional y escalable, donde los usuarios pueden intercambiar archivos entre ellos sin sobrecargar un servidor central.

**🚀 Arquitectura híbrida eficiente y moderna para compartir archivos P2P.**
