import { serializable } from 'storable-state';
import { createId, validateArgs } from './helpers.js';
import env from './env';
const rootInode = {
    type: 'd',
    permission: 'r-xr-xr-x',
    modified: new Date,
    user: 'system',
    group: 'system',
    links: ['root'],
    size: 0,
    address: 'root'
};
const rootFile = {
    name: 'root',
    links: undefined,
    inode: 'root'
};
const defaultData = {
    inodes: (new Map()).set('root', rootInode),
    files: (new Map()).set('root', rootFile),
    data: (new Map()).set('root', '')
};
const isDirectory = (inode) => {
    return inode.type === 'd';
};
export const createFileSystem = (data = defaultData, key = 'fs') => {
    const { subscribe, set, update } = serializable(key, data);
    const getFileById = (fileId) => {
        let fs;
        subscribe((state) => fs = state)();
        const file = fs.files.get(fileId);
        const inode = fs.inodes.get(file.inode);
        const data = fs.data.get(inode.address);
        const fileData = { file, inode, data };
        return Object.assign({}, fileData);
    };
    const updateFile = (fileId, callback) => {
        const args = { fileId, callback };
        validateArgs(args, 'is a required field');
        const fileData = getFileById(fileId);
        const updatedData = callback(fileData.data);
        update(state => {
            const newState = Object.assign({}, state);
            newState.data.set(fileData.inode.address, updatedData);
            return newState;
        });
    };
    const readMetadata = (fileId) => {
        const { file, inode } = getFileById(fileId);
        return { file, inode };
    };
    const readFile = (fileId) => {
        const { data } = getFileById(fileId);
        return data;
    };
    const createFile = (name, parrentId, type, permission, data) => {
        const args = { name, parrentId, type, permission, data };
        validateArgs(args, 'is a required field');
        const parrent = readMetadata(parrentId);
        if (!isDirectory(parrent.inode))
            throw new Error('Parrent of file must be a directory');
        const address = createId();
        const inodeId = createId();
        const fileId = createId();
        update((value) => {
            const permString = permission.user + permission.group + permission.other;
            const inode = {
                type,
                permission: permString,
                modified: new Date(),
                user: env.user,
                group: env.group,
                links: [fileId],
                size: (new Blob([data])).size,
                address: address
            };
            const file = {
                name,
                links: [parrentId],
                inode: inodeId
            };
            const newValue = Object.assign({}, value);
            newValue.inodes.set(inodeId, inode);
            newValue.files.set(fileId, file);
            newValue.data.set(address, data);
            //add parent link
            return newValue;
        });
        return fileId;
    };
    return {
        subscribe,
        createFile,
        updateFile,
        readFile,
        readMetadata
    };
};
