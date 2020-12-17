import process from '../../../dist/process.js'
import CORE_PROCESS from './../../../dist/core/process.js'

let expect = chai.expect;

const test = () => {
    describe('Process', () => {
        describe('File system', () => {
            describe('fs.touch()', () => {
                it('creates a file on a specified path', () => {
                    const fileId = process.fs.touch('touchfile', 'filedata')

                    expect(CORE_PROCESS.fs.readFile(fileId)).to.eql('filedata')
                })
            })

            describe('fs.mkdir()', () => {
                it('creates a directory on a spesified path', () => {
                    const dirId = process.fs.mkdir('mkdir')

                    expect(CORE_PROCESS.fs.readMetadata(dirId).inode.type).to.eql('d')
                })
            })
        })
        
        describe('change process properties', () => {
            it('denies direct change to process variable', () => {
                process.fs = 'another file system'
                expect(process.fs).to.not.eql('another file system')
            })
        })
    })
}

export default () => test()