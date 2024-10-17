const express = require('express');
const router = express.Router();
const facturaDetalleController = require('../Controllers/Postgres/PostgresFacturaDetalleController');

router.post('/facturadetalles', facturaDetalleController.createFacturaDetalle);
router.get('/facturadetalles', facturaDetalleController.getAllFacturaDetalles);
router.get('/facturadetalles/:id', facturaDetalleController.getFacturaDetalleById);
router.put('/facturadetalles/:id', facturaDetalleController.updateFacturaDetalle);
router.delete('/facturadetalles/:id', facturaDetalleController.deleteFacturaDetalle);

module.exports = router;
