const db = require('../../../config/Postgres/PostgresDB');

// Crear Factura
exports.createFactura = async (req, res) => {
    const { fecha_ingreso, fecha_despacho, nombre_cliente, telefono_cliente, codigo_especificacion, total, entregado } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO facturacion (fecha_ingreso, fecha_despacho, nombre_cliente, telefono_cliente, codigo_especificacion, total, entregado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [fecha_ingreso, fecha_despacho, nombre_cliente, telefono_cliente, codigo_especificacion, total, entregado]
        );
        res.status(201).json({ message: 'Factura creada y inventario actualizado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al crear la factura:', err);
        res.status(500).json({ error: 'Error al crear la factura', details: err.message });
    }
};

// Obtener todas las facturas
exports.getFacturas = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM facturacion');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron facturas' });
        }
        res.status(200).json({ data: result.rows });
    } catch (err) {
        console.error('Error al obtener las facturas:', err);
        res.status(500).json({ error: 'Error al obtener las facturas', details: err.message });
    }
};

// Obtener factura por ID
exports.getFacturaById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM facturacion WHERE codigo_factura = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json({ data: result.rows[0] });
    } catch (err) {
        console.error('Error al obtener la factura:', err);
        res.status(500).json({ error: 'Error al obtener la factura', details: err.message });
    }
};

// Actualizar estado de la factura
exports.updateFacturaStatus = async (req, res) => {
    const { id } = req.params;
    const { entregado } = req.body;

    try {
        const result = await db.query(
            'UPDATE facturacion SET entregado = $1 WHERE codigo_factura = $2 RETURNING *',
            [entregado, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json({ message: 'Estado de la factura actualizado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar el estado de la factura:', err);
        res.status(500).json({ error: 'Error al actualizar el estado de la factura', details: err.message });
    }
};

// Eliminar factura
exports.deleteFactura = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM facturacion WHERE codigo_factura = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json({ message: 'Factura eliminada exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al eliminar la factura:', err);
        res.status(500).json({ error: 'Error al eliminar la factura', details: err.message });
    }
};
