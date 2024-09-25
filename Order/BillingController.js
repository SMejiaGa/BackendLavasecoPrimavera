// BillingController.js

const db = require('../config/DB');

// Registrar una nueva factura
exports.createInvoice = (req, res) => {
    const { codigoFactura, fechaIngreso, fechaDespacho, nombreCliente, telefonoCliente, especificacionesServicio, totalFactura, entregado } = req.body;

    const query = 'INSERT INTO Facturacion (codigo_factura, fecha_ingreso, fecha_despacho, nombre_cliente, telefono_cliente, especificaciones_servicio, total_factura, entregado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [codigoFactura, fechaIngreso, fechaDespacho, nombreCliente, telefonoCliente, especificacionesServicio, totalFactura, entregado], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar la factura' });
        }
        res.status(201).json({ message: 'Factura registrada exitosamente', data: result });
    });
};

// Buscar facturas
exports.searchInvoices = (req, res) => {
    const { codigo, fecha } = req.query;

    let query = 'SELECT * FROM Facturacion WHERE 1=1';
    const params = [];

    if (codigo) {
        query += ' AND codigo_factura = ?';
        params.push(codigo);
    }
    if (fecha) {
        query += ' AND fecha_ingreso = ?';
        params.push(fecha);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al buscar facturas' });
        }
        res.status(200).json({ data: results });
    });
};
