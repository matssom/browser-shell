import { storable } from 'storable-state';
import { createId } from './helpers.js';
import { activity } from '../core.js';
const defaultActivity = {
    user: 'system',
    group: 'system'
};
export const createActivity = (activity = defaultActivity, key = 'activity') => {
    const { subscribe, set, update } = storable(key, activity);
    return {
        subscribe,
        set,
        update,
        get: (key) => {
            let state;
            subscribe(value => state = value[key])();
            return state;
        }
    };
};
const defaultData = {
    inodes: new Map(),
    files: new Map(),
    data: new Map()
};
export const createFileSystem = (data = defaultData, key = 'fs') => {
    const { subscribe, set, update } = storable(key, data);
    const updateFile = (fileId, callback) => update((value) => {
        return callback(value);
    });
    const createFile = (name, parrent, type, permission, data) => {
        const address = createId();
        const inodeId = createId();
        const fileId = createId();
        update((value) => {
            const permString = permission.user + permission.group + permission.other;
            const inode = {
                type,
                permission: permString,
                modified: new Date(),
                user: activity.get('user'),
                group: activity.get('group'),
                links: [fileId],
                size: (new Blob([data])).size,
                address: address
            };
            const file = {
                name,
                links: [parrent],
                inode: inodeId
            };
            const newValue = Object.assign({}, value);
            newValue.inodes.set(inodeId, inode);
            newValue.files.set(fileId, file);
            newValue.data.set(address, data);
            updateFile(parrent, (value) => {
                // Update parrent file here
                return value;
            });
            return newValue;
        });
        return fileId;
    };
    return {
        subscribe,
        createFile,
        updateFile
    };
};
