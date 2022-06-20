import inquirer from 'inquirer';

inquirer
    .prompt([
        { name: 'greetings', message: 'Como te llamas?', type: 'input' },
        { name: 'age', message: 'Que edad tienes?', type: 'number' },
    ])
    .then((resp) => {
        console.log(`Hola ${resp.greetings}`);
        console.log(resp);
    });
