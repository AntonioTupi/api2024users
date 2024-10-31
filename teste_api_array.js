const express = require('express');
const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Simulação de um banco de dados (em memória) de usuários
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
];

// Rota GET para buscar todos os usuários
app.get('/users', (req, res) => {
    res.json(users);  // Retorna os usuários em formato JSON
});
// Rota GET para buscar um determinando usuário
app.get('/users/:id', (req, res) => {
    // const { id } = req.params; // Extrai o índice da URL
    const user = users.find(u => u.id === parseInt(req.params.id));  // Busca o usuário pelo ID
    if (!user) return res.status(404).send('Usuário não encontrado');  // Retorna 404 se o usuário não existir
    res.json(user);
})

// Rota POST para criar um novo usuário
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };  // Cria um novo usuário
    users.push(newUser);  // Adiciona o novo usuário à lista
    res.status(201).json(newUser);  // Retorna o novo usuário com o status 201 (Criado)
});

// Rota PUT para atualizar um usuário existente
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));  // Busca o usuário pelo ID
    if (!user) return res.status(404).send('Usuário não encontrado');  // Retorna 404 se o usuário não existir
    user.name = req.body.name;  // Atualiza o nome do usuário
    res.json(user);  // Retorna o usuário atualizado
});
// Rota DELETE para remover um usuário
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));  // Busca o usuário pelo ID
    if (userIndex === -1) return res.status(404).send('Usuário não encontrado');  // Retorna 404 se o usuário não existir
    const deletedUser = users.splice(userIndex, 1);  // Remove o usuário da lista
    res.json(deletedUser);  // Retorna o usuário removido
});
// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
