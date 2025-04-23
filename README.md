
# 🛠️ Projeto Fullstack - Sistema de Login e Loja

Este projeto é um sistema completo de login e autenticação, dividido entre frontend (React + Vite) e backend (Node.js + Express) com banco de dados PostgreSQL. Ele é voltado para fins acadêmicos e demonstra boas práticas de desenvolvimento moderno com foco em segurança, arquitetura em camadas e integração entre serviços.

---

## 📚 Objetivo do Projeto

O objetivo é construir um sistema de loja completo do zero, iniciando com uma tela de login funcional. Cada etapa do projeto representa um módulo educacional, ensinando conceitos como:

- Componentização com React
- Comunicação frontend-backend via API REST
- Autenticação com JWT
- Hash de senha com Bcrypt
- Integração com banco relacional (PostgreSQL)
- Separação de responsabilidades no backend

---

## 📦 login-app (Frontend)

### Tecnologias:
- **React**: Biblioteca para construção de interfaces reativas
- **Vite**: Ferramenta de build ultrarrápida e moderna
- **React Icons**: Biblioteca de ícones vetoriais

### Funcionalidades:
- Tela de login com inputs para e-mail e senha
- Integração com API `/login` usando `fetch`
- Exibição de mensagens coloridas:
  - Azul para sucesso (`Login realizado com sucesso`)
  - Rosa para erro (`Login inválido`, `Erro ao conectar`)
- Armazenamento de token JWT em `localStorage`

### Estrutura:
```
login-app/
├── public/                     # Arquivos públicos
├── src/
│   ├── App.jsx                 # Componente principal com tela de login
│   ├── App.css                 # Estilo da tela com feedback visual
│   └── main.jsx                # Entrada do app React
├── index.html                  # Estrutura base HTML
└── package.json                # Dependências e scripts
```

---

## 🔐 login-api (Backend)

### Tecnologias:
- **Node.js**: Plataforma JavaScript para backend
- **Express**: Framework para APIs REST
- **PostgreSQL**: Banco de dados relacional
- **Bcrypt**: Para hash seguro de senha
- **jsonwebtoken (JWT)**: Para geração de tokens de autenticação

### Endpoints existentes:

#### `POST /login`
- Verifica se o e-mail existe
- Compara senha com hash armazenado usando `bcrypt.compare`
- Retorna mensagem + token JWT (válido por 2h)

#### Exemplo de Requisição:
```json
{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

#### Exemplo de Resposta:
```json
{
  "mensagem": "Login realizado com sucesso",
  "token": "JWT_TOKEN_AQUI"
}
```

### Estrutura:
```
login-api/
├── config/
│   └── db.js                  # Conexão com banco PostgreSQL
├── controllers/
│   └── authController.js      # Lógica do login (validação + JWT)
├── routes/
│   └── authRoutes.js          # Rota POST /login
├── middleware/                # (futuro) validação de token JWT
├── models/                    # (futuro) schema de usuário
├── server.js                  # Início do servidor Express
├── .env                       # Variáveis de ambiente
└── package.json               # Dependências e scripts
```

---

## 🗄️ Banco de Dados

Banco utilizado: **PostgreSQL**

### Estrutura da tabela `usuarios`:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);
```

> A senha é armazenada com hash (`bcrypt.hash`), não em texto puro.

---

## 🚀 Como executar o projeto localmente

### Pré-requisitos:
- Node.js instalado (v18 ou superior)
- PostgreSQL instalado e rodando
- Criação manual da tabela `usuarios`
- Configuração do arquivo `.env` no backend

### 1. Rodar o backend:
```bash
cd login-api
npm install
npm start
```

### 2. Rodar o frontend:
```bash
cd login-app
npm install
npm run dev
```

### 3. Acessar no navegador:
```
http://localhost:5173
```

---

## 🧪 Testando

1. Insira um usuário diretamente no banco com senha criptografada:
```js
const bcrypt = require('bcrypt')
bcrypt.hash('123456', 10).then(console.log)
```

2. Insira o hash no banco:
```sql
INSERT INTO usuarios (email, senha) VALUES ('teste@email.com', 'HASH_AQUI');
```

3. Faça login no frontend com esse e-mail e senha: a mensagem azul será exibida se for válido, rosa se for inválido.

---

## 🧱 Em construção (próximos passos):

- Tela de cadastro
- Rota POST `/register`
- Autenticação de rotas protegidas
- Tela de dashboard com produtos
- Carrinho de compras

---

## 👨‍💻 Autor

**Ryan Fonseca Rodrigues**  
Desenvolvedor Fullstack — Projeto acadêmico

---

## 📩 Contato
Caso queira contribuir ou tirar dúvidas:
**Email**: ryanfonsecarod@gmail.com  
**GitHub**: https://github.com/ryanrodrigues13
