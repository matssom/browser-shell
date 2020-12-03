import env from '../../../dist/lib/env.js';

let expect = chai.expect;

const test = () => {
    describe('Environment', () => {
        describe('env', () => {
            it('has a user', () => {
                expect(env.user).to.be.a('string')
            })
            it('has a group', () => {
                expect(env.group).to.be.a('string')
            })
        })
        describe('proxy', () => {
            it('updates localStorage on assignment', () => {
                env.user = 'system'
                env.user = 'admin'
                expect(env.user).to.equal('admin')
                expect(JSON.parse(localStorage.getItem('env')).user).to.equal('admin');
            })
        })
        describe('env.store', () => {
            it('is undefined', () => {
                expect(env.store).to.equal(undefined)
            })
        })
    })
}

export default () => test()