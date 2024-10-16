// src/routes/ClientesRoutes.js

const express = require('express');
const router = express.Router();
const tipoCostoController = require('../Controllers/Postgres/PostgresTipoCostoController');

router.post('/tipocostos', tipoCostoController.createTipoCosto);
router.get('/tipocostos', tipoCostoController.getTipoCostos);
router.get('/tipocostos/:id', tipoCostoController.getTipoCostoById);
router.put('/tipocostos/:id', tipoCostoController.updateTipoCosto);
router.delete('/tipocostos/:id', tipoCostoController.deleteTipoCosto);

module.exports = router;
