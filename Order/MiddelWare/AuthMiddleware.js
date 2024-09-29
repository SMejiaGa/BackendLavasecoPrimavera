//AuthMiddleware.js

const jwt = require('jsonwebtoken');

// Generar un token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, 'tu_secreto_super_seguro', { expiresIn: '1h' });
};

// Autenticación
exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = { id: 1, username: 'ejemplo' }; 
    const token = generateToken(user);
    res.json({ token });
};
