const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const facturaRoutes = require('./src/Routes/FacturasRoutes');
const clienteRoutes = require('./src/Routes/ClienteRoutes');
const empleadosRoutes = require('./src/Routes/EmpleadosRoutes');
const costosRoutes = require('./src/Routes/CostosRoutes');
const tipoCostoRoutes = require('./src/Routes/TipoCostoRoutes');

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(bodyParser.json());
app.use('/api', facturaRoutes);
app.use('/api', clienteRoutes);
app.use('/api', empleadosRoutes);
app.use('/api', costosRoutes);
app.use('/api', tipoCostoRoutes);

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
