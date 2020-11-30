import { commands } from './commands.js';

let state = {
    fs: {},
    path: ['root'],
    root: '',
    commands,
    output: [
        
    ]
}

const interact = (command) => {
    const splitCommand = command.split(' ');

    let mainCommand = state.commands[splitCommand[0]];
    if (mainCommand === undefined) mainCommand = state.commands.default;
    mainCommand.action(state, splitCommand.shift());
    return state;
}

const addKeyHandler = (root) => {
    root.addEventListener('keydown', e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            interact(getCommand());
        }
    });
    root.addEventListener('click', e => {
        getCurrentInput().focus();
    })
}

const getCurrentInput = () => {
    return state.output[state.output.length - 1].children[1];
}

const getCommand = () => {
    return getCurrentInput().innerText;
}

export const createCli = (structure, root) => {
    state.fs = typeof structure == 'object' ? structure : state.fs;
    if(root instanceof Element) state.root = root;
    else throw new Error('No root element provided');
    addKeyHandler(root);
    return interact;
}