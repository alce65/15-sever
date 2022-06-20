import inquirer from 'inquirer';

const crustArray = ['Thin Crust', 'Stuffed Crust', 'Pan'];
const toppingArray = [
    'Cheese',
    'Pepperoni',
    'Onions',
    'Peppers',
    'Jalapeños',
    'Chicken',
];

inquirer
    .prompt([
        {
            name: 'pizza_crust',
            type: 'list',
            message: 'Choose your crust:',
            choices: crustArray,
        },
        {
            name: 'pizza_toppings',
            type: 'checkbox',
            message: 'Choose your toppings:',
            choices: toppingArray,
        },
    ])
    .then((answer) => {
        console.log(answer.pizza_crust);
        console.log(answer.pizza_toppings);
    });
