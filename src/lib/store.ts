import { serializable } from 'storable-state'
import { File, Inode, Fs, Perm, Type, Id, FileData, Metadata } from './types.js'
import { createId, validateArgs, hasPermission } from './helpers.js'
import env from './env';

const rootInode: Inode = {
    type: 'd',
    permission: 'r-xr-xr-x',
    modified: new Date,
    user: 'system',
    group: 'admin',
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

        if (!file) throw new Error('File does not exist')

        const inode = fs.inodes.get(file.inode)
        const data = fs.data.get(inode.address)
        const fileData = { file, inode, data }
        return  { ...fileData }
    }

    const updateFile = (fileId: Id, callback: (data: string) => string) => {
        const args = {fileId, callback}
        validateArgs(args, 'is a required field')

        const fileData = getFileById(fileId)

        if (!hasPermission(fileData.inode, 'w')) throw new Error("Permission denied")

        const data = hasPermission(fileData.inode, 'r') ? fileData.data : null

        const updatedData = callback(data)

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
        const fileData = getFileById(fileId)
        if (!hasPermission(fileData.inode, 'r')) throw new Error("Permission denied")

        return fileData.data
    }

    const writeFile = (name: string, parrentId: Id, type: Type, permission : Perm, data: string) => {
        const args = { name, parrentId, type, permission }
        validateArgs(args, 'is a required field')
        data = type === '-' ? data === undefined ? '' : data : ''
        
        const parrent = readMetadata(parrentId)
        if (!isDirectory(parrent.inode)) throw new Error('Parrent of file must be a directory')
        if (!hasPermission(parrent.inode, 'w')) throw new Error("Permission denied")

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
            updateFile(parrentId, (files) => {
                return files !== '' ? `${files}\n${fileId}` : fileId
            })

            return newValue
        })
        return fileId;
    }

    const updateMetadata = (fileId: Id, callback: (metadata: Metadata) => Metadata) => {
        const metadata = readMetadata(fileId)

        if(!hasPermission(metadata.inode, 'w')) throw new Error('Permission denied')

        const newMetadata = callback(metadata)

        update((value: Fs) => {
            const newValue = {...value}

            const inodeId = metadata.file.inode

            newValue.inodes.set(inodeId, newMetadata.inode)
            newValue.files.set(fileId, newMetadata.file)

            return newValue
        })
    }

    const removeFileFromDirectory = (fileId: Id, parrentId: Id) => {
        updateMetadata(fileId, (metadata) => {

            try {
                updateFile(parrentId, data => {
                    let fileIds = parseDirectory(data)
                    fileIds = fileIds.filter(id => id !== fileId)

                    return writeDirectory(fileIds)
                })

            } catch (err) {
                return metadata
            }


            return {
                file: {...metadata.file, links: [...metadata.file.links].filter(link => link !== parrentId)},
                inode: {...metadata.inode}
            }
        })
    }

    const parseDirectory = (data: string) => {
        return data.split('\n')
    }

    const writeDirectory = (fileIds : Array<Id>) => {
        const data = ''
        for (let fileId of fileIds) {
            data !== '' ? `${data}\n${fileId}` : fileId
        }
        return data
    }

    const removeFile = (fileId: Id) => {
        update((value: Fs) => {
            const newValue = {...value}
            const file = newValue.files.get(fileId)
            
            for (let parent of file.links) removeFileFromDirectory(fileId, parent)
            removeFileFromInode(fileId, file.inode)

            newValue.files.delete(fileId)
            return newValue
        })
    }

    const removeFileFromInode = (fileId: Id, inodeId: Id) => {
        updateMetadata(fileId, metadata => {
            return {
                file: {...metadata.file},
                inode: {...metadata.inode, links: [...metadata.inode.links].filter(link => link !== inodeId)}
            }
        })
    }

    const removeData = (inodeId: Id) => {
        update((value: Fs) => {
            const newValue = {...value}

            const inode = newValue.inodes.get(inodeId)
            
            for(let file of inode.links) {
                removeFile(file)
            }

            newValue.data.delete(inode.address)
            newValue.inodes.delete(inodeId)

            return newValue
        })
    }

    const deleteFile = (name : string, parrentId: Id) => {
        const parrent: any = {}

        try {
            parrent.metadata = readMetadata(parrentId)
            parrent.files = parseDirectory(readFile(parrentId))
        } catch (err) {
            throw new Error('Directory does not exist')
        }

        if (!isDirectory(parrent.metadata.inode)) throw new Error('Parrent of file must be a directory')

        const fileIdToDelete = parrent.files.find(id => readMetadata(id).file.name === name)
        const fileToDelete = readMetadata(fileIdToDelete)

        if (!fileIdToDelete) throw new Error('File does not exist')

        if (fileToDelete.file.links.length > 1) {
            removeFileFromDirectory(fileIdToDelete, parrentId)
        }
        else {
            if (fileToDelete.inode.links.length > 1) {
                removeFile(fileIdToDelete)
            } else {
                removeData(fileToDelete.file.inode)
            }
        }
    }

    return {
        subscribe,
        writeFile,
        updateFile,
        readFile,
        deleteFile,
        readMetadata
    }
}