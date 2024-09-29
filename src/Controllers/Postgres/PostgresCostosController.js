const db = require('../../../config/Postgres/PostgresDB');

// Crear Costo
exports.createCosto = async (req, res) => {
    const { costo, codigo_gasto, descripcion } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO costos (costo, codigo_gasto, descripcion) VALUES ($1, $2, $3) RETURNING *',
            [costo, codigo_gasto, descripcion]
        );
        res.status(201).json({ message: 'Costo creado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al crear el costo:', err);
        res.status(500).json({ error: 'Error al crear el costo', details: err.message });
    }
};

// Obtener todos los Costos
exports.getCostos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM costos');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron costos' });
        }
        res.status(200).json({ data: result.rows });
    } catch (err) {
        console.error('Error al obtener los costos:', err);
        res.status(500).json({ error: 'Error al obtener los costos', details: err.message });
    }
};

// Obtener Costo por ID
exports.getCostoById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM costos WHERE codigo_costo = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Costo no encontrado' });
        }
        res.status(200).json({ data: result.rows[0] });
    } catch (err) {
        console.error('Error al obtener el costo:', err);
        res.status(500).json({ error: 'Error al obtener el costo', details: err.message });
    }
};

// Actualizar Costo
exports.updateCosto = async (req, res) => {
    const { id } = req.params;
    const { costo, codigo_gasto, descripcion } = req.body;

    try {
        const result = await db.query(
            'UPDATE costos SET costo = $1, codigo_gasto = $2, descripcion = $3 WHERE codigo_costo = $4 RETURNING *',
            [costo, codigo_gasto, descripcion, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Costo no encontrado' });
        }
        res.status(200).json({ message: 'Costo actualizado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar el costo:', err);
        res.status(500).json({ error: 'Error al actualizar el costo', details: err.message });
    }
};

// Eliminar Costo
exports.deleteCosto = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM costos WHERE codigo_costo = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Costo no encontrado' });
        }
        res.status(200).json({ message: 'Costo eliminado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al eliminar el costo:', err);
        res.status(500).json({ error: 'Error al eliminar el costo', details: err.message });
    }
};
