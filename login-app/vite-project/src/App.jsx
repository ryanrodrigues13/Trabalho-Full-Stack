import './App.css';
import { useState } from 'react';
import {
  FaGoogle, FaTelegramPlane, FaWhatsapp,
  FaFacebookF, FaTiktok, FaInstagram, FaTwitter,
  FaUser, FaLock
} from 'react-icons/fa';

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(data.mensagem);
        setSucesso(true);
        localStorage.setItem('token', data.token);
      } else {
        setMensagem(data.mensagem || 'Erro ao fazer login');
        setSucesso(false);
      }
    } catch (error) {
      setMensagem('Erro de conexão com o servidor');
      setSucesso(false);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h2>BEM VINDO</h2>
        <p>Novo Login</p>
        <button>Criar conta</button>
        <div className="social-icons">
          <FaGoogle color="#ea4335" />
          <FaTelegramPlane color="#0088cc" />
          <FaWhatsapp color="#25d366" />
        </div>
      </div>

      <div className="right">
        <h2>FAÇA LOGIN</h2>

        <div className="input-group">
          <FaUser />
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="options">
          <label>
            <input type="checkbox" /> Lembrar
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>

        <button onClick={handleLogin}>Entrar</button>

        {/* Mensagens com estilos separados */}
        {mensagem && sucesso === false && (
          <p className="error-message">{mensagem}</p>
        )}

        {mensagem && sucesso === true && (
          <p className="success-message">{mensagem}</p>
        )}

        <div className="social-icons-right">
          <FaFacebookF color="#1877f2" />
          <FaTiktok color="#000" />
          <FaInstagram color="#e4405f" />
          <FaTwitter color="#1da1f2" />
        </div>
      </div>
    </div>
  );
}

export default App;
