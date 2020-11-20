import { createCli } from '../src/cli.js';

let expect = chai.expect;

describe('Cli', () => {
    describe('createCli()', () => {
        it('returns invoke method', () => {
            expect(
                createCli(
                    {}, 
                    document.querySelector("#cli-root")
                )
            ).to.be.a('function');
        });
        it('throws error when no root node is provided', () => {
            expect(
                () => createCli()
            ).to.throw('No root element provided');
        });
        it('throws error when root node is not a DOM element', () => {
            expect(
                () => createCli({}, 'not a DOM element')
            ).to.throw('No root element provided');
        });
    });
});