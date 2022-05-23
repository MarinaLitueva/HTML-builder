const path = require('path');
const fs = require('fs').promises;

const fileName = path.join(__dirname, 'secret-folder');

async function readFiles() {
  try {
    const files = await fs.readdir(fileName);
    for (const file of files) {
      const stats  = await fs.stat(path.join(fileName, file));
      if (stats.isFile()) {
        let pathItem = path.join(fileName, file);
        const res = await fs.stat(pathItem);
        console.log(`${path.parse(file).name} - ${path.parse(file).ext.slice(1)} - ${res.size}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

readFiles();


