import path from '../../../dist/lib/path.js'
import process from '../../../dist/lib/process.js'

let expect = chai.expect;

const test = () => {
    describe('Path', () => {
        describe('path.get()', () => {
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
                    path.get('path/~/path/./path2/../path3/path4/.')
                ).to.eql(process.fs.readMetadata(path4))
            })
        })

        describe('path.parse()', () => {
            it('returns an absolute representation of a relative path', () => {
                expect(path.parse('./path1')).to.equal('~/path1')
            })
        })

        describe('path.join()', () => {
            it('joins two relative paths', () => {
                expect(path.join('./path','../')).to.equal('~')
            })
            it('joins an absolute path with a relative path', () => {
                expect(path.join('~', '../path')).to.equal('~/path')
            })
            it('throws error if second parameter is an absolute path', () => {
                expect(() => path.join('~', '~')).to.throw('Second parameter cannot be an absolute path')
            })
        })
    })
}

export default () => test()