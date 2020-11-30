import { createFileSystem } from '../../../dist/lib/store.js';

let expect = chai.expect;

const test = () => {
    describe('File System', () => {
        describe('createFileSystem()', () => {

            const fs = createFileSystem()

            it('returns a file system', () => {
                expect(fs).to.be.an('object')
            })

            let store;
            fs.subscribe(value => store = value)()

            it('is an empty store', () => {
                expect(store).to.eql({
                    inodes: new Map(),
                    files: new Map(),
                    data: new Map()
                })
            })
        })
    })
}

export default () => test()