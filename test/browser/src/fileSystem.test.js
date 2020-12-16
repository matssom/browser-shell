import { createFileSystem } from '../../../dist/lib/store.js'
import env from '../../../dist/lib/env'

let expect = chai.expect
localStorage.removeItem('fs')

const test = () => {
    describe('File System', () => {
        const fs = createFileSystem()

        describe('createFileSystem()', () => {
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
            it('updates content of file in system', () => {
                env.user = 'system'

                fs.updateFile('root', data => {
                    return 'test data'
                })
                expect(fs.readFile('root')).to.equal('test data')
            })

            it('throws exeption if user does not have permission', () => {
                env.user = 'admin'

                expect(
                    () => {
                        fs.updateFile('root', data => {
                            return 'test data'
                        })
                    }
                ).to.throw('Permission denied')
            })
        })
        describe('writeFile()', () => {
            const data = 'This is some cool file data stuff'
            const perm = {
                user : 'rwx',
                group : 'r-x',
                other : '---'

            }
            const fileId = fs.writeFile('coolfile', 'root', '-', perm, data)
            it('saves data', () => {
                expect(fs.readFile(fileId)).to.equal(data)
            })

            const metadata = fs.readMetadata(fileId)

            it('links to parrent', () => {
                expect(metadata.file.links[0]).to.equal('root')
            })
            it('has correct name', () => {
                expect(metadata.file.name).to.equal('coolfile')
            })
            it('user and group are strings', () => {
                expect(metadata.inode.user).to.be.a('string')
                expect(metadata.inode.group).to.be.a('string')
            })
        })
    })
}

export default () => test()