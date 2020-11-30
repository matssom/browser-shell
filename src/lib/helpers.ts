import { Id } from './types';

export const createId = () => {
    const id: Id = [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
    return id;
}