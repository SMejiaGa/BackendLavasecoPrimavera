const db = require('../../../config/Postgres/PostgresDB');

exports.createInventoryItem = async (req, res) => {
    const { codigo_inventario, codigo_factura_fk, fecha_ingreso, fecha_despacho } = req.body;

    const query = 'INSERT INTO inventario (codigo_inventario, codigo_factura_fk, fecha_ingreso, fecha_despacho) VALUES ($1, $2, $3, $4) RETURNING *';

    try {
        const result = await db.query(query, [codigo_inventario, codigo_factura_fk, fecha_ingreso, fecha_despacho]);
        res.status(201).json({ message: 'Ítem de inventario creado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al crear el ítem de inventario:', err);
        res.status(500).json({ error: 'Error al crear el ítem de inventario' });
    }
};

exports.searchInventoryItems = async (req, res) => {
    const { codigo, fecha } = req.query;

    let query = 'SELECT * FROM inventario WHERE 1=1';
    const params = [];

    if (codigo) {
        query += ' AND id_insumo = $1';
        params.push(codigo);
    }
    if (fecha) {
        query += ' AND fecha_ingreso = $2';
        params.push(fecha);
    }

    try {
        const result = await db.query(query, params);
        res.status(200).json({ data: result.rows });
    } catch (err) {
        console.error('Error al buscar ítems de inventario:', err);
        res.status(500).json({ error: 'Error al buscar ítems de inventario' });
    }
};

exports.updateInventoryItem = async (req, res) => {
    const { id } = req.params;
    const { nombre, valor, fechaIngreso } = req.body;

    const query = 'UPDATE inventario SET nombre_insumo = $1, valor_insumo = $2, fecha_ingreso = $3 WHERE id_insumo = $4 RETURNING *';

    try {
        const result = await db.query(query, [nombre, valor, fechaIngreso, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Ítem de inventario no encontrado' });
        }
        res.status(200).json({ message: 'Ítem de inventario actualizado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar el ítem de inventario:', err);
        res.status(500).json({ error: 'Error al actualizar el ítem de inventario' });
    }
};

exports.deleteInventoryItem = async (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM inventario WHERE id_insumo = $1 RETURNING *';

    try {
        const result = await db.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Ítem de inventario no encontrado' });
        }
        res.status(200).json({ message: 'Ítem de inventario eliminado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al eliminar el ítem de inventario:', err);
        res.status(500).json({ error: 'Error al eliminar el ítem de inventario' });
    }
};
