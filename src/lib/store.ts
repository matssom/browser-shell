import { serializable } from 'storable-state'
import { File, Inode, Fs, Perm, Type, Id, FileData } from './types.js'
import { createId, validateArgs } from './helpers.js'
import env from './env';

const rootInode: Inode = {
    type: 'd',
    permission: 'r-xr-xr-x',
    modified: new Date,
    user: 'system',
    group: 'system',
    links: ['root'],
    size: 0,
    address: 'root'
}

const rootFile: File = {
    name: 'root',
    links: undefined,
    inode: 'root'
}

const defaultData : Fs = { 
    inodes: (new Map()).set('root', rootInode), 
    files: (new Map()).set('root', rootFile), 
    data: (new Map()).set('root', '')
}

const isDirectory = (inode : Inode) => {
    return inode.type === 'd'
}

export const createFileSystem = (data : Fs = defaultData, key : string = 'fs') => {
    const { subscribe, set, update } = serializable(key, data);

    const getFileById = (fileId: Id):FileData => {
        let fs : Fs
        subscribe((state : Fs) => fs = state)()

        const file = fs.files.get(fileId)
        const inode = fs.inodes.get(file.inode)
        const data = fs.data.get(inode.address)
        const fileData = { file, inode, data }
        return  { ...fileData }
    }

    const updateFile = (fileId: Id, callback: (data: string) => string) => {
        const args = {fileId, callback}
        validateArgs(args, 'is a required field')

        const fileData = getFileById(fileId)
        const updatedData = callback(fileData.data)

        update(state => {
            const newState = { ...state }
            newState.data.set(fileData.inode.address, updatedData)
            return newState
        })
    }

    const readMetadata = (fileId: Id) => {
        const { file, inode } = getFileById(fileId)
        return { file, inode }
    }

    const readFile = (fileId: Id) => {
        const { data } = getFileById(fileId)
        return data
    }

    const writeFile = (name: string, parrentId: Id, type: Type, permission : Perm, data: string) => {
        const args = { name, parrentId, type, permission, data }
        validateArgs(args, 'is a required field')
        const parrent = readMetadata(parrentId)
        if (!isDirectory(parrent.inode)) throw new Error('Parrent of file must be a directory')

        const address = createId()
        const inodeId = createId()
        const fileId  = createId()
        update((value: Fs) => {
            const permString = permission.user + permission.group + permission.other;
            const inode: Inode = {
                type,
                permission: permString,
                modified: new Date(),
                user: env.user,
                group: env.group,
                links: [fileId],
                size: (new Blob([data])).size,
                address: address
            }
            const file: File = {
                name,
                links: [parrentId],
                inode: inodeId
            }
            const newValue = {...value};
            newValue.inodes.set(inodeId, inode)
            newValue.files.set(fileId, file)
            newValue.data.set(address, data)
            //add parent link
            return newValue
        })
        return fileId;
    }

    return {
        subscribe,
        writeFile,
        updateFile,
        readFile,
        readMetadata
    }
}