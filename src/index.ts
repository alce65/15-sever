// import fs from 'fs';
import fs from 'fs/promises';
import http from 'http';
import url from 'url';
import { iInquirerAnswers, setup } from './setup.js';

const PORT = process.env.PORT || 3204;

// const buffer = fs.readFileSync('./data/data.txt', { encoding: 'utf-8' });
// console.log(buffer);

const answers: iInquirerAnswers = await setup();

interface ServerError extends Error {
    info: string;
}

export const server = http.createServer(async (req, res) => {
    const path = url.parse(req.url as string).path;
    let dataFile: string = `./data/${path}.txt`;

    try {
        const data = await fs.readFile(dataFile, { encoding: 'utf-8' });
        console.log(data);
        const template = `<h1>Hola, soy ${answers.name}</h1><p>${data}</p>`;
        res.end(template);
    } catch (err) {
        (err as ServerError).info = 'Error de lectura';
        server.emit('error', err, res);
    }

    /*     const path = url.parse(req.url as string).path;
    let dataFile: string = `./data/${path}.txt`;
    fs.readFile(dataFile, { encoding: 'utf-8' })
        .then((data) => {
            console.log(data);
            const template = `<h1>Hola Mundo</h1><p>${data}</p>`;
            res.end(template);
        })
        .catch((err: Error) => {
            res.end('Error de lectura');
            console.error(err.message);
        }); */

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
console.log(`Server de ${answers.name}
listening from ${answers.country} in port ${PORT}`);

server.on('error', (err: ServerError, res: http.ServerResponse) => {
    res.end(err.info);
    console.error(err.message);
});
