const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(pathToFile, 'utf-8');
readableStream.on('error', error => console.log('Error', error.message));
let text = '';
readableStream.on('data', chunk => text += chunk);
readableStream.on('end', () => console.log(text));

