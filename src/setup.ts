import inquirer from 'inquirer';

export interface iInquirerAnswers {
    name: string;
    age: string;
    country: string;
}

interface iQuestions {
    name: string;
    message: string;
    type: string;
}

const questions: Array<iQuestions> = [
    { name: 'name', message: 'Cual es tu nombre', type: 'input' },
    { name: 'age', message: 'Cual es tu edad', type: 'input' },
    { name: 'country', message: 'Cual es tu país', type: 'input' },
];

export function setup(): Promise<iInquirerAnswers> {
    return inquirer.prompt(questions);
}
