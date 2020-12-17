import process from '../../../../dist/core/process.js'
import { createFileSystem } from '../../../../dist/core/filesystem.js'

let expect = chai.expect
let fs = process.fs

const test = () => {
    describe('File System', () => {
        describe('createFileSystem()', () => {
            const fs = createFileSystem()
            it('returns a file system', () => {
                expect(fs).to.be.an('object')
            })

            let store;
            fs.subscribe(value => store = value)()

            it('is a store', () => {
                expect(store.inodes).to.be.an.instanceof(Map)
                expect(store.files).to.be.an.instanceof(Map)
                expect(store.data).to.be.an.instanceof(Map)
            })
        })
        describe('updateFile()', () => {
            // Write mock file
            const data = 'This is some cool file data stuff'
            const perm = {
                user : 'rwx',
                group : 'r-x',
                other : '-w-'
            }

            process.env.user = 'system'
            process.env.group = 'admin'
            const fileId = fs.writeFile('testFile', 'root', '-', perm, data)

            it('updates content of file in system', () => {
                process.env.user = 'system'

                fs.updateFile(fileId, data => {
                    return 'test data 1'
                })
                expect(fs.readFile(fileId)).to.equal('test data 1')
            })

            it('throws exeption if user does not have write permission', () => {
                process.env.user = 'someone'

                expect(
                    () => {
                        fs.updateFile(fileId, data => {
                            return 'test data'
                        })
                    }
                ).to.throw('Permission denied')
            })

            it('leaves callback parameter as null if the user does not have read access', () => {
                process.env.user = 'someone'
                process.env.group = 'user'

                let previousData

                fs.updateFile(fileId, data => {
                    previousData = data
                    return 'test data'
                })

                expect(previousData).to.be.null
            })
        })
        describe('writeFile()', () => {
            const data = 'This is some file data'
            const perm = {
                user : 'rwx',
                group : 'r-x',
                other : '---'
            }

            process.env.user = 'system'
            process.env.group = 'admin'

            const fileId = fs.writeFile('newFile', 'root', '-', perm, data)
            it('saves data', () => {

                process.env.user = 'system'
                process.env.group = 'admin'
                expect(fs.readFile(fileId)).to.equal(data)
            })

            const metadata = fs.readMetadata(fileId)

            it('links to parrent', () => {
                expect(metadata.file.links[0]).to.equal('root')
            })
            it('has correct name', () => {
                expect(metadata.file.name).to.equal('newFile')
            })
            it('user and group are strings', () => {
                expect(metadata.inode.user).to.be.a('string')
                expect(metadata.inode.group).to.be.a('string')
            })
            it('throws error if user does not have write permission in directory', () => {
                process.env.user = 'system'

                const data = 'This data will not be saved'
                const perm = {
                    user : 'rwx',
                    group : '---',
                    other : '---'
                }

                const dirId = fs.writeFile('noPermissionDirectory', 'root', 'd', perm, '')

                process.env.user = 'someone'
                expect(() => fs.writeFile('uncreatableFile', dirId, '-', perm, data)).to.throw('Permission denied')
            })
        })

        describe('deleteFile()', () => {
            it('deletes file and data', () => {
                process.env.user = 'system'

                const data = 'This file is created to be deleted'
                const perm = {
                    user : 'rwx',
                    group : 'rwx',
                    other : 'rwx'

                }

                const fileId = fs.writeFile('fileToDelete', 'root', '-', perm, data)
                expect(fs.readFile(fileId)).to.equal('This file is created to be deleted')

                fs.deleteFile('fileToDelete', 'root')   
                expect(() => fs.readFile(fileId)).to.throw('File does not exist')
            })

            it('throws error if file does not exist', () => {
                expect(() => fs.deleteFile('fileToDelete', 'root').to.throw('File does not exist'))
            })

            it('throws error if directory does not exist', () => {
                expect(() => fs.deleteFile('fileToDelete', 'somefolder').to.throw('Directory does not exist'))
            })

            it('throws error if user does not have permission', () => {
                process.env.user = 'system'

                const data = 'This file is created to be deleted'
                const perm = {
                    user : '---',
                    group : '---',
                    other : '---'

                }

                const fileId = fs.writeFile('fileToDelete', 'root', '-', perm, data)

                process.env.user = 'someone'

                expect(() => fs.deleteFile('fileToDelete', 'root').to.throw('Permission denied'))
            })
        })
    })
}

export default () => test()