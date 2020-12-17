import { createFileSystem } from './filesystem.js'
import env from './env.js'
import { FileSystem } from './types.js'

class process {
    private static _instance: process
    public env = env
    public fs : FileSystem

    private constructor() {
        this.fs = createFileSystem()
    }

    public static getInstance() {
        return this._instance || (this._instance = new this())
    }

}

export default process.getInstance()