// controllers/alunoController.js
const alunoModel = require('../models/alunoModel'); // Importa o modelo de alunos

// Função para listar todos os alunos
exports.getAlunos = (req, res) => {
    alunoModel.getAllAlunos((err, alunos) => {
        if (err) return res.status(500).send('Erro ao buscar alunos');
        res.json(alunos);
    });
};

// Função para buscar aluno pelo RM
exports.getAlunoByRM = (req, res) => {
    const { rm } = req.params;
    alunoModel.getAlunoByRM(rm, (err, aluno) => {
        if (err) return res.status(500).send('Erro ao buscar aluno');
        res.json(aluno);
    });
};

// Função para buscar alunos por nome parcial
exports.getAlunoByNome = (req, res) => {
    const { nome } = req.params;
    alunoModel.getAlunoByNome(nome, (err, alunos) => {
        if (err) return res.status(500).send('Erro ao buscar alunos');
        res.json(alunos);
    });
};

// Função para criar um novo aluno
exports.createAluno = (req, res) => {
    const data = req.body;
    alunoModel.createAluno(data, (err) => {
        if (err) return res.status(500).send('Erro ao criar aluno');
        res.status(201).send('Aluno criado com sucesso');
    });
};

// Função para atualizar um aluno existente
exports.updateAluno = (req, res) => {
    const { rm } = req.params;
    const data = req.body;
    alunoModel.updateAluno(rm, data, (err) => {
        if (err) return res.status(500).send('Erro ao atualizar aluno');
        res.send('Aluno atualizado com sucesso');
    });
};

// Função para deletar um aluno
exports.deleteAluno = (req, res) => {
    const { rm } = req.params;
    alunoModel.deleteAluno(rm, (err) => {
        if (err) return res.status(500).send('Erro ao deletar aluno');
        res.send('Aluno deletado com sucesso');
    });
};
