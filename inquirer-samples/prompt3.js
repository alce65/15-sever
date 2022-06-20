import inquirer from 'inquirer';
const getPetCount = () => {
    inquirer
        .prompt([
            {
                name: 'pet_count',
                type: 'number',
                message: 'How many pets do you own?',
            },
        ])
        .then((answer) => {
            if (!answer.pet_count) {
                console.log("That wasn't a number!");
                getPetCount();
            } else {
                console.log('You own', answer.pet_count, 'pets');
            }
        });
};
getPetCount();
