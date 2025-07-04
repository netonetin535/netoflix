const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'netflix.html'));
});

// Rota para o JSON (ex: /catalogo.json)
app.get('/catalogo.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'catalogo.json'));
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
