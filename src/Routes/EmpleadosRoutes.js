const express = require('express');
const router = express.Router();
const empleadoController = require('../Controllers/Postgres/PostgresEmpleadoController');

router.post('/empleados', empleadoController.createEmpleado);
router.get('/empleados', empleadoController.getEmpleados);
router.get('/empleados/:id', empleadoController.getEmpleadoById);
router.put('/empleados/:id', empleadoController.updateEmpleado);
router.delete('/empleados/:id', empleadoController.deleteEmpleado);

module.exports = router;
