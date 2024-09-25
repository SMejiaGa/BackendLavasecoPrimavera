// CostsController.js

const db = require('../config/DB');

exports.createCost = (req, res) => {
    const { ingresosTotales, gastosInsumos, gastosMantenimiento, pagosEmpleabilidad, gastosServiciosPublicos, mes } = req.body;

    const query = 'INSERT INTO Costos (ingresos_totales, gastos_insumos, gastos_mantenimiento, pagos_empleabilidad, gastos_servicios_publicos, mes) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [ingresosTotales, gastosInsumos, gastosMantenimiento, pagosEmpleabilidad, gastosServiciosPublicos, mes], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar el costo' });
        }
        res.status(201).json({ message: 'Costo registrado exitosamente', data: result });
    });
};

exports.analyzeCosts = (req, res) => {
    const { mes } = req.query;

    const query = 'SELECT * FROM Costos WHERE mes = ?';

    db.query(query, [mes], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al analizar los costos' });
        }
        res.status(200).json({ data: results });
    });
};
