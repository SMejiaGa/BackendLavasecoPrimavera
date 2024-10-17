const express = require('express');
const router = express.Router();
const facturaController = require('../Controllers/Postgres/PostgresFacturaController');

// Crear factura
router.post('/facturas', facturaController.createFactura);

// Obtener todas las facturas
router.get('/facturas', facturaController.getFacturas);

// Obtener factura por ID
router.get('/facturas/:id', facturaController.getFacturaById);

// Actualizar estado de la factura
router.put('/facturas/:id', facturaController.updateFacturaStatus);

// Eliminar factura
router.delete('/facturas/:id', facturaController.deleteFactura);

module.exports = router;
