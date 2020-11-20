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

    state.commands[splitCommand[0]].action(state, splitCommand.shift());
    return state;
}

export const createCli = (structure, root) => {
    state.fs = typeof structure == 'object' ? structure : state.fs;
    if(root instanceof Element) state.root = root;
    else throw new Error('No root element provided');
    return interact;
}