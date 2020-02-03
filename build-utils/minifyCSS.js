/* eslint-disable */
const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');
const chalk = require('chalk');

minify({
  compressor: cleanCSS,
  input: './src/assets/index.css',
  output: './dist/index.min.css',
  callback: (err, _) => {
    if (err) {
      console.log(`🎁 ${chalk.bold.red('error')} while minifying the CSS.`);
    } else {
      console.log(`🎁 ${chalk.bold.green('success')} CSS minified.`);
    }
  },
});
