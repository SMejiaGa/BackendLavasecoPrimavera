const express = require('express');
const router = express.Router();

// registro analisis (funciones almacenadas)
// Add a new cost
router.post('/costs', (req, res) => {
});

// Get all costs
router.get('/costs', (req, res) => {
});

// Get a specific cost by ID
router.get('/costs/:id', (req, res) => {
});

// Update a cost entry by ID
router.put('/costs/:id', (req, res) => {
});

// Delete a cost entry by ID
router.delete('/costs/:id', (req, res) => {
});

module.exports = router;
