import { File, Inode, Fs, Perm, Type, Id } from './types.js';
export declare const createFileSystem: (data?: Fs, key?: string) => {
    subscribe: any;
    createFile: (name: string, parrentId: Id, type: Type, permission: Perm, data: string) => string;
    updateFile: (fileId: Id, callback: (data: string) => string) => void;
    readFile: (fileId: Id) => string;
    readMetadata: (fileId: Id) => {
        file: File;
        inode: Inode;
    };
};
