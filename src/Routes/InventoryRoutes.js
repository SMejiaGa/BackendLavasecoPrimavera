// /src/routes/inventoryRoutes.js

const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/Postgres/PostgresInventoryController');

router.post('/inventario', InventoryController.createInventoryItem);
router.get('/inventario', InventoryController.searchInventoryItems);
router.get('/inventario/:id', InventoryController.searchInventoryItems);
router.put('/inventario/:id', InventoryController.updateInventoryItem);
router.delete('/inventario/:id', InventoryController.deleteInventoryItem);

module.exports = router;
