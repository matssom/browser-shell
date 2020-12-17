import { createFileSystem } from './filesystem.js'
import env from './env.js'
import { FileSystem } from '../lib/types.js'

class process {
    private static _instance: process
    public env = env
    public fs : FileSystem

    private constructor() {
        //@TODO remove line below
        localStorage.removeItem('fs')
        this.fs = createFileSystem()
    }

    public static getInstance() {
        return this._instance || (this._instance = new this())
    }

}

export default process.getInstance()