export type Id = string
export type Dir = Array<Id>
export type Type = '-' | 'd'
export type PermGroup = '---'|'--x'|'-w-'|'-wx'|'r--'|'r-x'|'rw-'|'rwx'

export type File = {
    name: string,
    id: Id,
    links: Array<Id>,
    inode: Id
}

export type FileData = {
    file: File,
    inode: Inode,
    data: string
}

export type Metadata = {
    file: File,
    inode: Inode
}

export type Fs = {
    inodes: Map<Id, Inode>,
    files: Map<Id, File>,
    data: Map<Id, string>
}

export type Perm = {
    user: PermGroup,
    group: PermGroup,
    other: PermGroup
}

export type Inode = {
    type: '-' | 'd',
    permission: string,
    modified: Date,
    user: string,
    group: string,
    links: Array<Id>,
    size: number,
    address: Id
}

export type FileSystem = {
    subscribe: () => void,
    writeFile: (name: string, parrentId: Id, type: Type, permission: Perm, data: string) => string,
    updateFile: (fileId: Id, callback: (data: string) => string) => void,
    readFile: (fileId: Id) => string,
    deleteFile: (name: string, parrentId: Id) => void,
    readMetadata: (fileId: Id) => {
        file: File;
        inode: Inode;
    },
    listFiles: (dirId: Id) => Map<string, Id>
}