const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');

readableStream.on('error', error => console.log('Error', error.message));
const readableStream = fs.createReadStream(pathToFile, 'utf-8');
let text = '';
readableStream.on('data', chunk => text += chunk);
readableStream.on('end', () => console.log(text));

