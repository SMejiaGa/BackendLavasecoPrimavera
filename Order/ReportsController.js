// ReportsController.js

const db = require('../config/database');

// Generar informe de ingresos y egresos
exports.generateFinancialReport = (req, res) => {
    const { mes } = req.query;

    const query = `
    SELECT 
      SUM(ingresos_totales) AS total_ingresos, 
      SUM(gastos_insumos + gastos_mantenimiento + pagos_empleabilidad + gastos_servicios_publicos) AS total_egresos
    FROM Costos 
    WHERE mes = ?
  `;

    db.query(query, [mes], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al generar el informe financiero' });
        }
        res.status(200).json({ data: results });
    });
};
