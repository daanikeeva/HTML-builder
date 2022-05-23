const { readdir, stat } = require('fs/promises');
const path = require('path');
const pathToDir = path.join(__dirname, 'secret-folder');

async function filesInFolder() {
try {
  const files = await readdir(pathToDir, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const pathToFile = path.join(`${pathToDir}`, `${file.name}`);
      const fileName = path.parse(pathToFile).name;
      const fileExtension = path.extname(pathToFile);
      const info = await stat(pathToFile);
      const sizeFile = info.size+'b';
      console.log(`${fileName} - ${fileExtension} - ${sizeFile}`);
    }
  }
} catch (err) {
  console.error(err);
}
};
filesInFolder()
