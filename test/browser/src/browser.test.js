import fileSystem from './core/fileSystem.test.js';
import env from './core/env.test.js';
import helpers from './lib/helpers.test.js';
import path from './core/path.test.js';
import process from './process.test.js';

localStorage.removeItem('fs')

fileSystem()
env()
helpers()
path()
process()