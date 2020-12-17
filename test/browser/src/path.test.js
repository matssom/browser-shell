import path from '../../../dist/lib/path.js'
import process from '../../../dist/lib/process.js'

let expect = chai.expect;

const test = () => {
    describe('Path', () => {
        describe('path.parse()', () => {
            const perm = {
                user : 'rwx',
                group : 'rwx',
                other : 'rwx'
            }

            const path1 = process.fs.writeFile('path', 'root', 'd', perm)
            const path2 = process.fs.writeFile('path2', path1, 'd', perm)
            const path3 = process.fs.writeFile('path3', path1, 'd', perm)
            const path4 = process.fs.writeFile('path4', path3, 'd', perm)

            it('finds file from relative and absolute path', () => {
                expect(
                    path.parse('path/~/path/./path2/../path3/path4/.')
                ).to.eql(process.fs.readMetadata(path4))
            })
        })

        describe('path.absolute()', () => {
            it('returns an absolute representation of a relative path', () => {
                expect(path.absolute('./path1')).to.equal('~/path1')
            })
        })
    })
}

export default () => test()