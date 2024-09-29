const db = require('../../../config/Postgres/PostgresDB');

// Crear Empleado
exports.createEmpleado = async (req, res) => {
    const { nombre_empleado, valor_nomina } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO empleado (nombre_empleado, valor_nomina) VALUES ($1, $2) RETURNING *',
            [nombre_empleado, valor_nomina]
        );
        res.status(201).json({ message: 'Empleado creado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al crear el empleado:', err);
        res.status(500).json({ error: 'Error al crear el empleado', details: err.message });
    }
};

// Obtener todos los empleados
exports.getEmpleados = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM empleado');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron empleados' });
        }
        res.status(200).json({ data: result.rows });
    } catch (err) {
        console.error('Error al obtener los empleados:', err);
        res.status(500).json({ error: 'Error al obtener los empleados', details: err.message });
    }
};

// Obtener empleado por ID
exports.getEmpleadoById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM empleado WHERE codigo_empleado = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.status(200).json({ data: result.rows[0] });
    } catch (err) {
        console.error('Error al obtener el empleado:', err);
        res.status(500).json({ error: 'Error al obtener el empleado', details: err.message });
    }
};

// Actualizar Empleado
exports.updateEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombre_empleado, valor_nomina } = req.body;

    try {
        const result = await db.query(
            'UPDATE empleado SET nombre_empleado = $1, valor_nomina = $2 WHERE codigo_empleado = $3 RETURNING *',
            [nombre_empleado, valor_nomina, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado actualizado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar el empleado:', err);
        res.status(500).json({ error: 'Error al actualizar el empleado', details: err.message });
    }
};

// Eliminar Empleado
exports.deleteEmpleado = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM empleado WHERE codigo_empleado = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado eliminado exitosamente', data: result.rows[0] });
    } catch (err) {
        console.error('Error al eliminar el empleado:', err);
        res.status(500).json({ error: 'Error al eliminar el empleado', details: err.message });
    }
};
