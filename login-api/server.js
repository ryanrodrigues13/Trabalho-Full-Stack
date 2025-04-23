const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes); // ✅ ESSA LINHA É FUNDAMENTAL

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
