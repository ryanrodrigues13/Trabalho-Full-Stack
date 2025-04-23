const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.json({ mensagem: 'Login inválido' });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.password);
    if (!senhaCorreta) {
      return res.json({ mensagem: 'Login inválido' });
    }

    // 🔐 Gerar Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ✅ Retornar token junto com mensagem
    res.json({
      mensagem: 'Login válido',
      token: token
    });

  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);

    res.json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const rotaProtegida = (req, res) => {
  res.json({
    mensagem: 'Acesso autorizado à rota protegida!',
    usuario: req.usuario
  });
};

module.exports = {
  login,
  register,
  rotaProtegida
};
