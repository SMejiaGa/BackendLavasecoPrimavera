// /src/routes/FacturasRoutes.js

const express = require('express');
const router = express.Router();
const facturaController = require('../Controllers/Postgres/PostgresFacturaController');
router.post('/facturas', facturaController.createFactura);
router.get('/facturas', facturaController.getFacturas);
router.get('/facturas/:id', facturaController.getFacturaById);
router.put('/facturas/:id', facturaController.updateFacturaStatus);
router.delete('/facturas/:id', facturaController.deleteFactura);

module.exports = router;
