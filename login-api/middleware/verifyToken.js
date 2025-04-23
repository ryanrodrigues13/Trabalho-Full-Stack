const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token)
    return res.status(403).json({ mensagem: 'Token não fornecido' });

  try {
    const tokenValido = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenValido, process.env.JWT_SECRET);
    req.usuario = decoded; // Adiciona os dados do token à req
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
};

module.exports = verifyToken;
