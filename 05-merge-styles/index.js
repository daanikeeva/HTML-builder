const { readdir, readFile, appendFile, writeFile} = require('fs/promises');
const path = require('path');

const pathToFiles = path.join(__dirname, 'styles');
const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
  await writeFile(pathToBundle, '');
  const files = await readdir(pathToFiles, { withFileTypes: true});
    for (const file of files) {
      const pathToFile = path.join(`${pathToFiles}`, `${file.name}`);
      if (path.extname(pathToFile) === '.css') {
      const input = await readFile(pathToFile, 'utf-8');
      await appendFile(pathToBundle, input);
      await appendFile(pathToBundle, '\n\n');

      }
    }
}
mergeStyles()

