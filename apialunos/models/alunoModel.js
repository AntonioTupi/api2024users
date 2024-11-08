// models/alunoModel.js
const createConnection = require('../db'); // Importa a função para criar a conexão com o banco de dados
const { Request, TYPES } = require('tedious'); // Importa a classe Request e TYPES do pacote tedious para manipulação de SQL Server

// Função para buscar todos os alunos
exports.getAllAlunos = (callback) => {
    const connection = createConnection(); // Cria a conexão com o banco de dados
    connection.on('connect', err => {
        if (err) return callback(err, null); // Retorna erro se houver problema de conexão

        const query = `SELECT * FROM ALUNOS`; // Consulta SQL para buscar todos os alunos
        const request = new Request(query, (err, rowCount) => {
            if (err) return callback(err, null); // Retorna erro se houver problema na consulta
            if (rowCount === 0) return callback(null, []); // Retorna array vazio se não houver registros
        });

        const result = []; // Array para armazenar os resultados
        request.on('row', columns => {
            // Adiciona cada linha de resultado ao array
            result.push({
                rm: columns[0].value,
                nome: columns[1].value,
                idade: columns[2].value,
                turma: columns[3].value
            });
        });

        // Retorna o array com os resultados ao final da consulta
        request.on('requestCompleted', () => callback(null, result));
        connection.execSql(request); // Executa a consulta SQL
    });
    connection.connect(); // Inicia a conexão com o banco
}

// Função para buscar aluno por RM (ID único)
exports.getAlunoByRM = (rm, callback) => {
    const connection = createConnection();
    connection.on('connect', err => {
        if (err) return callback(err, null);

        const query = `SELECT * FROM ALUNOS WHERE RM = @rm`; // Consulta SQL para buscar aluno por RM
        const request = new Request(query, (err) => {
            if (err) return callback(err, null);
        });

        request.addParameter('rm', TYPES.Int, rm); // Define o parâmetro RM como um inteiro

        let aluno = null; // Variável para armazenar o aluno encontrado
        request.on('row', columns => {
            aluno = {
                rm: columns[0].value,
                nome: columns[1].value,
                idade: columns[2].value,
                turma: columns[3].value
            };
        });

        request.on('requestCompleted', () => callback(null, aluno)); // Retorna o aluno encontrado
        connection.execSql(request);
    });
    connection.connect();
}

// Função para buscar alunos por nome parcial usando LIKE
exports.getAlunoByNome = (nome, callback) => {
    const connection = createConnection();
    connection.on('connect', err => {
        if (err) return callback(err, null);

        const query = `SELECT * FROM ALUNOS WHERE NOME LIKE @nome`; // Consulta SQL com LIKE para busca parcial
        const request = new Request(query, (err) => {
            if (err) return callback(err, null);
        });

        request.addParameter('nome', TYPES.VarChar, `%${nome}%`); // Adiciona o parâmetro de nome com % para busca parcial

        const result = [];
        request.on('row', columns => {
            result.push({
                rm: columns[0].value,
                nome: columns[1].value,
                idade: columns[2].value,
                turma: columns[3].value
            });
        });

        request.on('requestCompleted', () => callback(null, result)); // Retorna os alunos encontrados
        connection.execSql(request);
    });
    connection.connect();
}

// Função para criar um novo aluno
exports.createAluno = (data, callback) => {
    const connection = createConnection();
    connection.on('connect', err => {
        if (err) return callback(err, null);

        const query = `INSERT INTO ALUNOS (RM, NOME, IDADE, TURMA) VALUES (@rm, @nome, @idade, @turma)`;
        const request = new Request(query, (err) => {
            if (err) return callback(err);
            callback(null, { message: "Aluno inserido com sucesso!" });
        });
        request.addParameter('rm', TYPES.Int, data.rm);
        request.addParameter('nome', TYPES.VarChar, data.nome);
        request.addParameter('idade', TYPES.Int, data.idade);
        request.addParameter('turma', TYPES.VarChar, data.turma);

        connection.execSql(request);
    });
    connection.connect();
}

// Função para atualizar um aluno existente
exports.updateAluno = (rm, data, callback) => {
    const connection = createConnection();
    connection.on('connect', err => {
        if (err) return callback(err, null);

        const query = `UPDATE ALUNOS SET NOME = @nome, IDADE = @idade, TURMA = @turma WHERE RM = @rm`;
        const request = new Request(query, (err) => {
            if (err) return callback(err);
            callback(null, { message: "Aluno atualizado com sucesso!" });
        });
        request.addParameter('rm', TYPES.Int, rm);
        request.addParameter('nome', TYPES.VarChar, data.nome);
        request.addParameter('idade', TYPES.Int, data.idade);
        request.addParameter('turma', TYPES.VarChar, data.turma);

        connection.execSql(request);
    });
    connection.connect();
}

// Função para deletar um aluno existente
exports.deleteAluno = (rm, callback) => {
    const connection = createConnection();
    connection.on('connect', err => {
        if (err) return callback(err, null);

        const query = `DELETE FROM ALUNOS WHERE RM = @rm`;
        const request = new Request(query, (err) => {
            if (err) return callback(err);
            callback(null, { message: "Aluno deletado com sucesso!" });
        });
        request.addParameter('rm', TYPES.Int, rm);

        connection.execSql(request);
    });
    connection.connect();
}
