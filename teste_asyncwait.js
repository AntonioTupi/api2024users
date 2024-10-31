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
async function lerArquivos() {
    try {
        const data1 = await lerArquivoPromise('arquivo1.txt');
        console.log('Conteúdo do arquivo 1:', data1);

        const data2 = await lerArquivoPromise('arquivo2.txt');
        console.log('Conteúdo do arquivo 2:', data2);

        const data3 = await lerArquivoPromise('arquivo3.txt');
        console.log('Conteúdo do arquivo 3:', data3);
    } catch (err) {
        console.error('Erro na leitura dos arquivos:', err);
    }
}

lerArquivos();
