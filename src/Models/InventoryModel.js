// /src/models/inventoryModel.js
const db = require('../../config/DB');

const Inventory = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM InventarioPrendas');
        return rows;
    },

    create: async (data) => {
        const { codigoFactura, nombreCliente, telefonoCliente, fechaIngreso, fechaDespacho } = data;
        const [result] = await db.query(
            'INSERT INTO InventarioPrendas (CodigoFactura, NombreCliente, TelefonoCliente, FechaIngreso, FechaDespacho) VALUES (?, ?, ?, ?, ?)',
            [codigoFactura, nombreCliente, telefonoCliente, fechaIngreso, fechaDespacho]
        );
        return result;
    },

    // Otros métodos para actualizar y eliminar registros
};

module.exports = Inventory;
