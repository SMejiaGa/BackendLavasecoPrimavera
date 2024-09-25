const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const facturaRoutes = require('./src/Routes/FacturasRoutes');
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(bodyParser.json());
app.use('/api', facturaRoutes);

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
