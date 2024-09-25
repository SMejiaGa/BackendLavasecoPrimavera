// /src/routes/inventoryRoutes.js

const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/InventoryController');

router.post('/', InventoryController.createInventoryItem);
router.get('/', InventoryController.searchInventoryItems);
router.get('/:id', InventoryController.searchInventoryItems);
router.put('/:id', InventoryController.updateInventoryItem);
router.delete('/:id', InventoryController.deleteInventoryItem);

module.exports = router;
