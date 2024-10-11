// app.js
const express = require('express');
const app = express();
const employeeRoutes = require('./routes/employeeRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  };
  
require('dotenv').config();

// Middleware para parsear JSON
app.use(express.json());
app.use(cors(corsOptions))

// Rutas
app.use('/api/employees', employeeRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de BazaSalon!');
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.post

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
