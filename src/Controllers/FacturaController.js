
const db = require('../../config/DB');

exports.createFactura = async (req, res) => {
    const { fecha_ingreso, fecha_despacho, nombre_cliente, telefono_cliente, codigo_especificacion, total, entregado } = req.body;

    try {
        const [result] = await db.query(
            // Hablar del procedimiento almacenado para fabricar los registros de inventario
            //'CALL crearFactura(?, ?, ?, ?, ?, ?, ?)',
            //[fecha_ingreso, fecha_despacho, nombre_cliente, telefono_cliente, codigo_especificacion, total, entregado]
        );
        res.status(201).json({ message: 'Factura creada y inventario actualizado exitosamente', data: result });
    } catch (err) {
        console.error('Error al crear la factura:', err);
        res.status(500).json({ error: 'Error al crear la factura', details: err.message });
    }
};

exports.getFacturas = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM facturacion');
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron facturas' });
        }
        res.status(200).json({ data: result });
    } catch (err) {
        console.error('Error al obtener las facturas:', err);
        res.status(500).json({ error: 'Error al obtener las facturas', details: err.message });
    }
};

exports.getFacturaById = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('SELECT * FROM Facturas WHERE codigo_factura = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json({ data: result });
    } catch (err) {
        console.error('Error al obtener la factura:', err);
        res.status(500).json({ error: 'Error al obtener la factura', details: err.message });
    }
};

exports.updateFacturaStatus = async (req, res) => {
    const { id } = req.params;
    const { entregado } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE Facturas SET entregado = ? WHERE codigo_factura = ?',
            [entregado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json({ message: 'Estado de la factura actualizado exitosamente' });
    } catch (err) {
        console.error('Error al actualizar el estado de la factura:', err);
        res.status(500).json({ error: 'Error al actualizar el estado de la factura', details: err.message });
    }
};

exports.deleteFactura = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM Facturas WHERE codigo_factura = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(200).json({ message: 'Factura eliminada exitosamente' });
    } catch (err) {
        console.error('Error al eliminar la factura:', err);
        res.status(500).json({ error: 'Error al eliminar la factura', details: err.message });
    }
};
