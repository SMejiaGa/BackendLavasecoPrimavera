const db = require('../../../config/Postgres/PostgresDB');

// Crear Cliente
exports.createCliente = async (req, res) => {
    const { detalles, nombre_cliente, telefono_cliente } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO cliente (detalles, nombre_cliente, telefono_cliente) VALUES ($1, $2, $3) RETURNING *',
            [detalles, nombre_cliente, telefono_cliente]
        );
        res.status(201).json({ message: 'Cliente creado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al crear el cliente:', err);
        res.status(500).json({ error: 'Error al crear el cliente', details: err.message });
    }
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM cliente');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron clientes' });
        }
        res.status(200).json({ data: result.rows });
    } catch (err) {
        console.error('Error al obtener los clientes:', err);
        res.status(500).json({ error: 'Error al obtener los clientes', details: err.message });
    }
};

// Obtener cliente por ID
exports.getClienteById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM cliente WHERE codigo_especificacion = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ data: result.rows[0] });
    } catch (err) {
        console.error('Error al obtener el cliente:', err);
        res.status(500).json({ error: 'Error al obtener el cliente', details: err.message });
    }
};

// Actualizar Cliente
exports.updateCliente = async (req, res) => {
    const { id } = req.params;
    const { detalles, nombre_cliente, telefono_cliente } = req.body;

    try {
        const result = await db.query(
            'UPDATE cliente SET detalles = $1, nombre_cliente = $2, telefono_cliente = $3 WHERE codigo_especificacion = $4 RETURNING *',
            [detalles, nombre_cliente, telefono_cliente, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente actualizado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar el cliente:', err);
        res.status(500).json({ error: 'Error al actualizar el cliente', details: err.message });
    }
};

// Eliminar Cliente
exports.deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM cliente WHERE codigo_especificacion = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente eliminado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al eliminar el cliente:', err);
        res.status(500).json({ error: 'Error al eliminar el cliente', details: err.message });
    }
};
