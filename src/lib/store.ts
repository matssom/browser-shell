import { storable } from 'storable-state'
import { File, Activity, Inode, Fs, Perm, Type, Id} from './types.js'
import { createId } from './helpers.js'
import { activity } from '../core.js'

const defaultActivity = {
    user: 'system',
    group: 'system'
}

export const createActivity = (activity : Activity = defaultActivity, key : string = 'activity') => {
    const { subscribe, set, update } = storable(key, activity);

    return {
        subscribe,
        set,
        update,
        get: (key: string) => {
            let state;
            subscribe(value => state = value[key])();
            return state;
        }
    }
}

const defaultData = { 
    inodes: new Map(), 
    files: new Map(), 
    data: new Map() 
}

export const createFileSystem = (data : Fs = defaultData, key : string = 'fs') => {
    const { subscribe, set, update } = storable(key, data);

    const updateFile = (fileId: Id, callback: (value: Fs) => Fs) => update((value : Fs) => {
        return callback(value)
    })

    const createFile = (name: string, parrent: Id, type: Type, permission : Perm, data: string) => {
        const address = createId()
        const inodeId = createId()
        const fileId  = createId()
        update((value: Fs) => {
            const permString = permission.user + permission.group + permission.other;
            const inode: Inode = {
                type,
                permission: permString,
                modified: new Date(),
                user: activity.get('user'),
                group: activity.get('group'),
                links: [fileId],
                size: (new Blob([data])).size,
                address: address
            }
            const file: File = {
                name,
                links: [parrent],
                inode: inodeId
            }
            const newValue = {...value};
            newValue.inodes.set(inodeId, inode)
            newValue.files.set(fileId, file)
            newValue.data.set(address, data)
            updateFile(parrent, (value: Fs) => {
                // Update parrent file here
                return value
            })
            return newValue
        })
        return fileId;
    }

    return {
        subscribe,
        createFile,
        updateFile
    }
}