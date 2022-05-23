const { 
  readdir, 
  mkdir, 
  rm, 
  copyFile, 
  readFile, 
  writeFile, 
  appendFile 
} = require('fs/promises');
const path = require('path');


// ============== сборка компонентов в index.html
const pathToComponents = path.join(__dirname, 'components');
const pathToTemplate = path.join(__dirname, 'template.html');

const pathToDist = path.join(__dirname, 'project-dist');
(async () => {
  await mkdir(pathToDist, { recursive: true});
} )()

async function addComponentsToTemplate() {
  await writeFile(path.join(pathToDist, 'index.html'), '')
  const components = await readdir(pathToComponents);
  const template = (await readFile(pathToTemplate)).toString();
  let index = template;
  for (const component of components) {
    if (component.slice(-5) === '.html') {
      const componentData = (await readFile(path.join(pathToComponents, component))).toString();
      const templateTag = component.slice(0, -5);
      let regex = new RegExp('{{' + templateTag + '}}', 'gi');
      index = index.replace(regex, componentData);
    }
  }
  await appendFile(path.join(pathToDist, 'index.html'), index)
}
addComponentsToTemplate()


// =============== сборка стилей в один файл
async function mergeStyles() {
  const pathToStyleFiles = path.join(__dirname, 'styles');
  const pathToBundle = path.join(__dirname, 'project-dist', 'style.css');
  await writeFile(pathToBundle, '')
      const files = (await readdir(pathToStyleFiles, { withFileTypes: true})).reverse();
    for (const file of files) {
      const pathToFile = path.join(`${pathToStyleFiles}`, `${file.name}`);
      if (path.extname(pathToFile) === '.css') {
      const input = await readFile(pathToFile, 'utf-8');
      await appendFile(pathToBundle, input);
      await appendFile(pathToBundle, '\n\n');
      }
    }
}
mergeStyles()


// ================= копирование assets
const pathCopyFrom = path.join(__dirname, 'assets');
const pathCopyTo = path.join(__dirname, 'project-dist', 'assets');

async function copyFiles(pathFromDir, pathToDir) {

  await rm(pathToDir, { recursive: true, force: true });
  await mkdir(pathToDir, { recursive: true});
    const files = await readdir(pathFromDir, { withFileTypes: true});
    for (const file of files) {
      if (file.isFile()) {
        await copyFile(path.join(pathFromDir, file.name), path.join(pathToDir, file.name))
      }
      else {
        const from = path.join(pathFromDir, file.name);
        const to = path.join(pathToDir, file.name);
        await copyFiles(from, to)
      }
    }
}
copyFiles(pathCopyFrom, pathCopyTo)
