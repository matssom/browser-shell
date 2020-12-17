import { Id, Inode } from './types.js'
import process from '../core/process.js'

export const createId = () => {
    const id: Id = [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
    return id
}

export const validateArgs = (args : Object, message : string) => {
    for (let arg of Object.keys(args)) {
        if (!args[arg]) throw new Error(`\`${arg}\` ${message}`)
    }
}

export const hasPermission = (inode: Inode, action: 'r' | 'w' | 'x') => {
    if (process.env.user === 'system') return true

    const owner = inode.user
    const ownerGroup = inode.group

    const accessLevel = process.env.user === owner ? 'user' : process.env.group === ownerGroup ? 'group' : 'other';
    
    const permArray = [...inode.permission]

    const permissions = {
        user: {
            r: permArray[0] !== '-',
            w: permArray[1] !== '-',
            x: permArray[2] !== '-'
        },
        group: {
            r: permArray[3] !== '-',
            w: permArray[4] !== '-',
            x: permArray[5] !== '-'
        },
        other: {
            r: permArray[6] !== '-',
            w: permArray[7] !== '-',
            x: permArray[8] !== '-'
        }
    }

    return permissions[accessLevel][action]
}