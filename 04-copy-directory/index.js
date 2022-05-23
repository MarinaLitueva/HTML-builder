const path = require('path');
const fs = require('fs').promises;


const pathMain = path.join(__dirname, 'files');
const pathSecond = path.join(__dirname, 'file-copy');

async function deleteFolder() {
  let files = [];
  files = await fs.readdir(pathSecond);
  for (let file of files) {
    let currentPath = path.join(pathSecond, file);
    const stats  = await fs.stat(path.join(pathSecond, file));
    if(stats.isDirectory()) {
      deleteFolder();
    } else {
      await  fs.unlink(currentPath);
    }
  }
  await fs.rmdir(pathSecond);
}


async function readFiles() {
  try {
    await fs.mkdir(pathSecond, { recursive: true });
    const files = await fs.readdir(pathMain);
    for (const file of files) {
      await fs.copyFile(path.join(pathMain, file), path.join(pathSecond, file));     
    }
  } catch (err) {
    console.error(err);
  }
}

async function runFunctions() {
  const stat = await fs.stat(pathSecond).catch(() => null);
  if (stat) {
    await deleteFolder();
  }
  await readFiles();
}


runFunctions();



