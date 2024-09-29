const db = require('../../../config/Postgres/PostgresDB');

// Crear Tipo de Costo
exports.createTipoCosto = async (req, res) => {
    const { descripcion } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO tipo_costo (descripcion) VALUES ($1) RETURNING *',
            [descripcion]
        );
        res.status(201).json({ message: 'Tipo de Costo creado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al crear el tipo de costo:', err);
        res.status(500).json({ error: 'Error al crear el tipo de costo', details: err.message });
    }
};

// Obtener todos los Tipos de Costo
exports.getTipoCostos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tipo_costo');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tipos de costo' });
        }
        res.status(200).json({ data: result.rows });
    } catch (err) {
        console.error('Error al obtener los tipos de costo:', err);
        res.status(500).json({ error: 'Error al obtener los tipos de costo', details: err.message });
    }
};

// Obtener Tipo de Costo por ID
exports.getTipoCostoById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM tipo_costo WHERE codigo_gasto = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tipo de Costo no encontrado' });
        }
        res.status(200).json({ data: result.rows[0] });
    } catch (err) {
        console.error('Error al obtener el tipo de costo:', err);
        res.status(500).json({ error: 'Error al obtener el tipo de costo', details: err.message });
    }
};

// Actualizar Tipo de Costo
exports.updateTipoCosto = async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;

    try {
        const result = await db.query(
            'UPDATE tipo_costo SET descripcion = $1 WHERE codigo_gasto = $2 RETURNING *',
            [descripcion, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Tipo de Costo no encontrado' });
        }
        res.status(200).json({ message: 'Tipo de Costo actualizado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar el tipo de costo:', err);
        res.status(500).json({ error: 'Error al actualizar el tipo de costo', details: err.message });
    }
};

// Eliminar Tipo de Costo
exports.deleteTipoCosto = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM tipo_costo WHERE codigo_gasto = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Tipo de Costo no encontrado' });
        }
        res.status(200).json({ message: 'Tipo de Costo eliminado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al eliminar el tipo de costo:', err);
        res.status(500).json({ error: 'Error al eliminar el tipo de costo', details: err.message });
    }
};
