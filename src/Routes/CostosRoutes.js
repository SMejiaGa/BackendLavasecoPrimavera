// src/routes/CostosRoutes.js

const express = require('express');
const router = express.Router();
const costosController = require('../Controllers/Postgres/PostgresCostosController');

router.post('/costos', costosController.createCosto);
router.get('/costos', costosController.getCostos);
router.get('/costos/:id', costosController.getCostoById);
router.put('/costos/:id', costosController.updateCosto);
router.delete('/costos/:id', costosController.deleteCosto);

module.exports = router;
