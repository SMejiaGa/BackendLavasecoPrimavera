const db = require('../../config/DB');

exports.createInventoryItem = async (req, res) => {
    const { nombre, valor, fechaIngreso } = req.body;

    const query = 'INSERT INTO Inventario_insumos (nombre_insumo, valor_insumo, fecha_ingreso) VALUES (?, ?, ?)';

    try {
        const [result] = await db.query(query, [nombre, valor, fechaIngreso]);
        res.status(201).json({ message: '�tem de inventario creado exitosamente', data: result });
    } catch (err) {
        console.error('Error al crear el �tem de inventario:', err);
        res.status(500).json({ error: 'Error al crear el �tem de inventario' });
    }
};

exports.searchInventoryItems = async (req, res) => {
    const { codigo, fecha } = req.query;

    let query = 'SELECT * FROM Inventario_insumos WHERE 1=1';
    const params = [];

    if (codigo) {
        query += ' AND id_insumo = ?';
        params.push(codigo);
    }
    if (fecha) {
        query += ' AND fecha_ingreso = ?';
        params.push(fecha);
    }

    try {
        const [results] = await db.query(query, params);
        res.status(200).json({ data: results });
    } catch (err) {
        console.error('Error al buscar �tems de inventario:', err);
        res.status(500).json({ error: 'Error al buscar �tems de inventario' });
    }
};

exports.updateInventoryItem = async (req, res) => {
    const { id } = req.params;
    const { nombre, valor, fechaIngreso } = req.body;

    const query = 'UPDATE Inventario_insumos SET nombre_insumo = ?, valor_insumo = ?, fecha_ingreso = ? WHERE id_insumo = ?';

    try {
        const [result] = await db.query(query, [nombre, valor, fechaIngreso, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: '�tem de inventario no encontrado' });
        }
        res.status(200).json({ message: '�tem de inventario actualizado exitosamente' });
    } catch (err) {
        console.error('Error al actualizar el �tem de inventario:', err);
        res.status(500).json({ error: 'Error al actualizar el �tem de inventario' });
    }
};

exports.deleteInventoryItem = async (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Inventario_insumos WHERE id_insumo = ?';

    try {
        const [result] = await db.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: '�tem de inventario no encontrado' });
        }
        res.status(200).json({ message: '�tem de inventario eliminado exitosamente' });
    } catch (err) {
        console.error('Error al eliminar el �tem de inventario:', err);
        res.status(500).json({ error: 'Error al eliminar el �tem de inventario' });
    }
};
