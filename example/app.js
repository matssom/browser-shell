import { createCli } from '../src/cli';

const snakegame = () => {
    console.log('started snake game');
}

const cli = createCli(
    {
        'games' : {
            'snake.exe' : snakegame
        },
        'about.txt' : 'Hi there,\nMy name is Mats Sommervold'
    },
    document.querySelector('#cli-root')
);