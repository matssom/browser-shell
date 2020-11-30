export type Id = string
export type Dir = Array<Id>
export type Type = '-' | 'd'
export type PermGroup = '---'|'--x'|'-w-'|'-wx'|'r--'|'r-x'|'rw-'|'rwx'

export type File = {
    name: string,
    links: Array<Id>,
    inode: Id
}

export type Fs = {
    inodes: Map<Id, Inode>,
    files: Map<Id, File>,
    data: Map<Id, string>
}

export type Activity = {
    user: string,
    group: string
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