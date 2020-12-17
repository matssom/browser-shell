import CORE_PROCESS from './core/process.js'
import { FileSystem, Perm } from './lib/types.js'
import PATH from './core/path'

class process {
    private static _instance: process
    private system : FileSystem

    public env = CORE_PROCESS.env
    public fs

    private constructor() {
        this.system = CORE_PROCESS.fs
        this.fs = {
            touch: (path: string, data?: string, permission?: string) => {
                const parrentpath = PATH.parrent(path)
                const name = PATH.current(path)
                data = data ? data : ''
                
                const dirId = PATH.get(parrentpath).file.id

                const perm: Perm = {
                    user: 'rw-',
                    group: 'r--',
                    other: 'r--'
                }

                return this.system.writeFile(name, dirId, '-', perm, data)
            },
            mkdir: (path: string) => {
                const parrentpath = PATH.parrent(path)
                const name = PATH.current(path)
                
                const dirId = PATH.get(parrentpath).file.id

                const perm: Perm = {
                    user: 'rwx',
                    group: 'r-x',
                    other: 'r-x'
                }

                return this.system.writeFile(name, dirId, 'd', perm, '')
            }
        }
    }

    public static getInstance() {
        return this._instance || (this._instance = new this())
    }



}

const setter = {
    set: (obj, prop, value) => {
        return true
    }
}

export default new Proxy(process.getInstance(), setter)