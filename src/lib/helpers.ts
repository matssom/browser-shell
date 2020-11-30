import { Id } from './types';

export const createId = () => {
    const id: Id = [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
    return id;
}

export const validateArgs = (args : Object, message : string) => {
    for (let arg of Object.keys(args)) {
        if (!args[arg]) throw new Error(`\`${arg}\` ${message}`)
    }
}