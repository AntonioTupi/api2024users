const fs = require('fs');
function lerArquivoPromise(caminho) {
    return new Promise((resolve, reject) => {
        fs.readFile(caminho, 'utf8', (err, data) => {
            if (err) {
                reject(err); // Chama o reject se houver um erro
            } else {
                resolve(data); // Chama o resolve se a leitura for bem-sucedida
            }
        });
    });
}
lerArquivoPromise('arquivo.txt')
    .then(data => {
        console.log('Conteúdo do arquivo usando Promise:', data);
    })
    .catch(err => {
        console.error('Erro na leitura do arquivo com Promise:', err);
    });
