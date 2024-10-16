const db = require('../../../config/Postgres/PostgresDB');

// Crear un detalle de factura
exports.createFacturaDetalle = async (req, res) => {
    const { detalles } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO factura_detalle (detalles) VALUES ($1) RETURNING *',
            [detalles]
        );
        res.status(201).json({ message: 'Detalle de factura creado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al crear el detalle de factura:', err);
        res.status(500).json({ error: 'Error al crear el detalle de factura', details: err.message });
    }
};

// Obtener todos los detalles de facturas
exports.getAllFacturaDetalles = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM factura_detalle');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron detalles de facturas' });
        }
        res.status(200).json({ data: result.rows });
    } catch (err) {
        console.error('Error al obtener los detalles de facturas:', err);
        res.status(500).json({ error: 'Error al obtener los detalles de facturas', details: err.message });
    }
};

// Obtener un detalle de factura por ID
exports.getFacturaDetalleById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM factura_detalle WHERE codigo_detalle = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Detalle de factura no encontrado' });
        }
        res.status(200).json({ data: result.rows[0] });
    } catch (err) {
        console.error('Error al obtener el detalle de factura:', err);
        res.status(500).json({ error: 'Error al obtener el detalle de factura', details: err.message });
    }
};

// Actualizar un detalle de factura
exports.updateFacturaDetalle = async (req, res) => {
    const { id } = req.params;
    const { detalles } = req.body;

    try {
        const result = await db.query(
            'UPDATE factura_detalle SET detalles = $1 WHERE codigo_detalle = $2 RETURNING *',
            [detalles, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Detalle de factura no encontrado' });
        }
        res.status(200).json({ message: 'Detalle de factura actualizado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar el detalle de factura:', err);
        res.status(500).json({ error: 'Error al actualizar el detalle de factura', details: err.message });
    }
};

// Eliminar un detalle de factura
exports.deleteFacturaDetalle = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM factura_detalle WHERE codigo_detalle = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Detalle de factura no encontrado' });
        }
        res.status(200).json({ message: 'Detalle de factura eliminado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al eliminar el detalle de factura:', err);
        res.status(500).json({ error: 'Error al eliminar el detalle de factura', details: err.message });
    }
};
