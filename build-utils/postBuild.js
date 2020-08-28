const fs = require('fs');
const pkg = require('../package.json');

(async () => {
  fs.copyFileSync('LICENSE', './build/LICENSE');
  fs.copyFileSync('README.md', './build/README.md');
  fs.writeFileSync('./build/package.json', JSON.stringify({ ...pkg }, null, 2));
})();
