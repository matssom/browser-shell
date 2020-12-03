export declare type Id = string;
export declare type Dir = Array<Id>;
export declare type Type = '-' | 'd';
export declare type PermGroup = '---' | '--x' | '-w-' | '-wx' | 'r--' | 'r-x' | 'rw-' | 'rwx';
export declare type File = {
    name: string;
    links: Array<Id>;
    inode: Id;
};
export declare type FileData = {
    file: File;
    inode: Inode;
    data: string;
};
export declare type Fs = {
    inodes: Map<Id, Inode>;
    files: Map<Id, File>;
    data: Map<Id, string>;
};
export declare type Perm = {
    user: PermGroup;
    group: PermGroup;
    other: PermGroup;
};
export declare type Inode = {
    type: '-' | 'd';
    permission: string;
    modified: Date;
    user: string;
    group: string;
    links: Array<Id>;
    size: number;
    address: Id;
};
