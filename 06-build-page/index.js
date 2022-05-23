const path = require('path');
const fs = require('fs').promises;

//Создаем папку
fs.mkdir(path.join(__dirname, 'project-dist'),{ recursive: true });

async function buildLanding () {
  const pathMainStyles = path.join(__dirname, 'styles');
  const fileCssBundle = path.join(__dirname, 'project-dist/style.css');
  const fileIndexBundle = path.join(__dirname, 'project-dist/index.html');

  //assets
  const fileAssetsBundle = path.join(__dirname, 'project-dist/assets');
  const fileAssets = path.join(__dirname, 'assets');

  const styles = [];

  copyAssets(fileAssets,fileAssetsBundle);
  createHtmlDist(fileIndexBundle);
  createStyles(pathMainStyles,styles,fileCssBundle);
  
}

async function createHtmlDist(fileIndexBundle) {
  try {
    const fileTemplate = await fs.readFile(path.join(__dirname, 'template.html'));
    const filesComponents = await fs.readdir(path.join(__dirname, 'components'));

    let fileTemplateStr = fileTemplate.toString();

    for(let item of filesComponents) {
      let stats =  await fs.stat(path.join(path.join(__dirname, 'components/' + item)));
      if (stats.isFile() && path.parse(item).ext.slice(1) === 'html') {
        let itemName = path.basename(item, path.extname(item));
        let itemReader =  await fs.readFile(path.join(__dirname, 'components/' + item));
        fileTemplateStr = fileTemplateStr.replace((`{{${itemName}}}`), itemReader.toString());
        await fs.writeFile(fileIndexBundle, fileTemplateStr);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function createStyles(pathMainStyles,styles,fileCssBundle) {
  try {
    const files = await fs.readdir(pathMainStyles);
    for (const file of files) {
      const stats  = await fs.stat(path.join(pathMainStyles, file));
      if(stats.isFile() && (path.parse(file).ext.slice(1) === 'css')) {
        let reader = await fs.readFile(path.join(__dirname, 'styles/' + file));
        styles.push(reader);
        await fs.writeFile(fileCssBundle, styles);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function copyAssets(fileAssets,fileAssetsBundle ) {
  try {
    const files = await fs.readdir(fileAssets);
    for (const file of files) {
      const stats  = await fs.stat(path.join(fileAssets,file));
      if(stats.isDirectory()) {
        fs.mkdir(path.join(path.join(fileAssetsBundle, file)),{ recursive: true });
        await copyAssets(path.join(fileAssets, file),path.join(fileAssetsBundle , file));
      } else {
        await fs.copyFile(path.join(fileAssets, file), path.join(fileAssetsBundle , file));
      }
    }
  } catch (err) {
    console.error(err);
  }
}

buildLanding();
