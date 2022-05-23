const path = require('path');
const fs = require('fs').promises;

const pathMain = path.join(__dirname, 'styles');
const fileCssBundle = path.join(__dirname, 'project-dist/bundle.css');

const data = [];

async function readFiles() {
  try {
    const files = await fs.readdir(pathMain);
    for (const file of files) {
      const stats  = await fs.stat(path.join(pathMain, file));
      if(stats.isFile() && (path.parse(file).ext.slice(1) === 'css')) {
        let reader = await fs.readFile(path.join(__dirname, 'styles/' + file));
        data.push(reader);
        await fs.writeFile(fileCssBundle, data);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

readFiles();
