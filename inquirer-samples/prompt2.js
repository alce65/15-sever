import inquirer from 'inquirer';

inquirer
    .prompt([
        {
            name: 'pet_count',
            type: 'number',
            message: 'How many pets do you own?',
        },
        {
            name: 'wants_pizza',
            type: 'confirm',
            message: 'Do you want a free pizza?',
        },
        {
            name: 'user_password',
            type: 'password',
            message: 'Enter Password:',
        },
    ])
    .then(function (answer) {
        console.log(answer);
    });
