import process from './process.js'
import { Id, FileData, Metadata } from './types.js'

const parsePath = (path: string) => {
    let splitPath = pathToArray(path)

    //check that path length is not 0

    let absolutePath = []

    for (let path of splitPath) {
        absolutePath = next(absolutePath, path)
    }

    const file = getFile(absolutePath)

    return file
}

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

const next = (path: Array<string>, next: string) => {
    let newPath = [...path]

    switch(next) {
        case '~':
            newPath = ['~']
            break
        case '.':
            if (newPath.length === 0) newPath = pathToArray(process.env.path)
            break
        case '..':
            if (newPath.length === 0) newPath = getParrentPath(pathToArray(process.env.path))
            else if (newPath.length !== 1) newPath.pop()
            break
        default:
            if (newPath.length === 0) newPath = [...pathToArray(process.env.path), next]
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

const relativeToAbsolute = (relative: string):string => {

    let absolutePath = []

    for (let path of pathToArray(relative)) {
        absolutePath = next(absolutePath, path)
    }

    return arrayToPath(absolutePath)
}

export default {
    parse: (path: string):Metadata => parsePath(path),
    absolute: (path: string):string => relativeToAbsolute(path)
}