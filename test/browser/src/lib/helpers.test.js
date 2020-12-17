import process from '../../../../dist/core/process.js'
import { hasPermission } from '../../../../dist/lib/helpers.js'

let expect = chai.expect;

const test = () => {
    describe('Helpers', () => {
        describe('hasPermission()', () => {
            it('correctly determines user permissions', () => {
                process.env.user = 'system'
                process.env.group = 'admin'

                const inode = {
                    type: 'd',
                    permission: '-w---xr--',
                    modified: new Date,
                    user: 'admin',
                    group: 'admin',
                    links: ['root'],
                    size: 0,
                    address: 'root'
                }

                expect(hasPermission(inode, 'w')).to.be.true
                expect(hasPermission(inode, 'r')).to.be.true
                expect(hasPermission(inode, 'x')).to.be.true

                process.env.user = 'admin'

                expect(hasPermission(inode, 'w')).to.be.true
                expect(hasPermission(inode, 'r')).to.be.false
                expect(hasPermission(inode, 'x')).to.be.false

                process.env.user = 'someone'
                
                expect(hasPermission(inode, 'w')).to.be.false
                expect(hasPermission(inode, 'r')).to.be.false
                expect(hasPermission(inode, 'x')).to.be.true

                process.env.group = 'user'

                expect(hasPermission(inode, 'r')).to.be.true
                expect(hasPermission(inode, 'w')).to.be.false
                expect(hasPermission(inode, 'x')).to.be.false
            })
        })
    })
}

export default () => test()