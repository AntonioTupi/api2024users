//index.js
const express = require('express');
const app = express();
const alunoRoutes = require('./routes/alunoRoutes');  // Importa as rotas de alunos

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Usa as rotas definidas no arquivo alunoRoutes
app.use(alunoRoutes);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor alunos rodando em http://localhost:3000');
});
