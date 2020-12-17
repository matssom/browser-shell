import process from './process.js'
import { Id, Metadata } from '../lib/types.js'

const pathToArray = (path: string):Array<string> => {
    return path.split('/').filter(e => e.length > 0)
}

const arrayToPath = (array: Array<string>):string => {
    return array.join('/')
}

const getParrentPath = (path: Array<string>): Array<string> => {
    if (path.length === 0) throw new Error('Path is empty')
    else if (path.length === 1) return path
    else return path.slice(0, -1)
}

const getCurrentDir = (path: string):string => {
    const splitPath = pathToArray(path)
    return splitPath[splitPath.length - 1]
}

const next = (path: Array<string>, next: string, cwd: string) => {
    let newPath = [...path]

    switch(next) {
        case '~':
            newPath = ['~']
            break
        case '.':
            if (newPath.length === 0) newPath = pathToArray(cwd)
            break
        case '..':
            if (newPath.length === 0) newPath = getParrentPath(pathToArray(cwd))
            else if (newPath.length !== 1) newPath.pop()
            break
        default:
            if (newPath.length === 0) newPath = [...pathToArray(cwd), next]
            else newPath.push(next)
    }

    return  newPath
}

const getFile = (absolutePath: Array<string>) => {

    absolutePath.shift()
    let fileId = 'root'

    absolutePath.forEach((file, i) => {
        try {
            fileId = nextFile(fileId, file)
        } catch (err) {
            if (err.message !== 'File is not a directory' || i < absolutePath.length - 1) throw err
        }
    })

    const file = process.fs.readMetadata(fileId)

    return file
}

const nextFile = (dirId: Id, name: string):Id => {
    const files = process.fs.listFiles(dirId)
    const fileId = files.get(name)

    if (!fileId) throw new Error('File does not exist')
    return fileId
}

const relativeToAbsolute = (relative: string, cwd?: string, array?: boolean):any => {
    cwd = cwd ? cwd : process.env.path
    let absolutePath = []

    for (let path of pathToArray(relative)) {
        absolutePath = next(absolutePath, path, cwd)
    }

    if (array) return absolutePath
    else return arrayToPath(absolutePath)
}

const isAbsolute = (path: string): boolean => pathToArray(path)[0] === '~'

const join = (first: string, second:string):string => {
    if (isAbsolute(second)) throw new Error('Second parameter cannot be an absolute path')
    
    const absolute = relativeToAbsolute(first)
    return relativeToAbsolute(second, absolute)
}

export default {
    get: (path: string, cwd?: string):Metadata => getFile(relativeToAbsolute(path, cwd, true)),
    parrent: (path: string): string => arrayToPath(getParrentPath(relativeToAbsolute(path, process.env.path, true))),
    current: (path: string): string => getCurrentDir(path),
    parse: (path: string, cwd?: string):string => relativeToAbsolute(path, cwd),
    join: (first: string, second: string):string => join(first, second)
}