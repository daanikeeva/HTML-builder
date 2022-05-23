const { readdir, mkdir, rm, copyFile } = require('fs/promises');
const path = require('path');

const pathCopyFrom = path.join(__dirname, 'files');
const pathCopyTo = path.join(__dirname, 'files-copy')

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
