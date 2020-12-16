import env from '../../../dist/lib/env.js'
import { hasPermission } from '../../../dist/lib/helpers.js'

let expect = chai.expect;

const test = () => {
    describe('Helpers', () => {
        describe('hasPermission()', () => {
            it('correctly determines user permissions', () => {
                env.user = 'system'
                env.group = 'admin'

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

                env.user = 'admin'

                expect(hasPermission(inode, 'w')).to.be.true
                expect(hasPermission(inode, 'r')).to.be.false
                expect(hasPermission(inode, 'x')).to.be.false

                env.user = 'someone'
                
                expect(hasPermission(inode, 'w')).to.be.false
                expect(hasPermission(inode, 'r')).to.be.false
                expect(hasPermission(inode, 'x')).to.be.true

                env.group = 'user'

                expect(hasPermission(inode, 'r')).to.be.true
                expect(hasPermission(inode, 'w')).to.be.false
                expect(hasPermission(inode, 'x')).to.be.false
            })
        })
    })
}

export default () => test()