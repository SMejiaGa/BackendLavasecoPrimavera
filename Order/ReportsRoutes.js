const express = require('express');
const router = express.Router();

// crear buscar gestionar
// Generate a report for revenues and expenses
router.get('/reports/finance', (req, res) => {
});

// Generate a report for inventory status
router.get('/reports/inventory', (req, res) => {
});

// Get all reports
router.get('/reports', (req, res) => {
});

module.exports = router;
