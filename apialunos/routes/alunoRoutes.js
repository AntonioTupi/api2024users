// routes/alunoRoutes.js
const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Rota para listar todos os alunos
router.get('/alunos', alunoController.getAlunos);

// Rota para buscar um aluno por RM
router.get('/alunos/rm/:rm', alunoController.getAlunoByRM);

// Rota para buscar alunos por nome parcial
router.get('/alunos/nome/:nome', alunoController.getAlunoByNome);

// Rota para criar um novo aluno
router.post('/alunos', alunoController.createAluno);

// Rota para atualizar um aluno existente
router.put('/alunos/:rm', alunoController.updateAluno);

// Rota para deletar um aluno
router.delete('/alunos/:rm', alunoController.deleteAluno);

module.exports = router;
