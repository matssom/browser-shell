const path = require('path');

module.exports = {
  entry: './example/src/app.js',
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'app.js'
  },
  watch: true,
  mode: 'development'
};