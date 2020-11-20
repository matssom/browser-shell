import { commands } from './commands.js';

const state = {
    fs: {},
    path: ['root'],
    root: '',
    output: [
        {}
    ]
}

const interact = (command) => {
    state = commands[command](state);
    return state;
}

export const createCli = (structure, root) => {
    state.fs = typeof structure == 'object' ? structure : state.fs;
    if(root instanceof Element) state.root = root;
    else throw new Error('No root element provided');
    return interact;
}