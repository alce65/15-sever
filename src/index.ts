import fs from 'fs';
import fsp from 'fs/promises';
import http from 'http';
import url from 'url';

const PORT = process.env.PORT || 3204;

// const buffer = fs.readFileSync('./data/data.txt', { encoding: 'utf-8' });
// console.log(buffer);

export const server = http.createServer((req, res) => {
    const path = url.parse(req.url as string).path;
    let dataFile: string = `./data/${path}.txt`;
    fsp.readFile();
    /* fs.readFile(dataFile, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            res.end('Error de lectura');
            console.log(err.message);
            return;
        }
        console.log(data);
        const template = `<h1>Hola Mundo</h1><p>${data}</p>`;
        res.end(template);
    }); */
});
server.listen(PORT);
console.log(`Server listening in port ${PORT}`);
